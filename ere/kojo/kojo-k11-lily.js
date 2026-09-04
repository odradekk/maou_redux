/* eslint-disable no-irregular-whitespace */
/**
 * @file 村娘口上 K11 莉莉：存在标志一对 + @EVENTTRAIN 主体 + @K11_KOJO2 +
 *       @EVENTEND + @KOJO_MESSAGE_COM_11 前段（SELECTCOM 0/1/2/3/5/6/7/8/9/10/
 *       11/12/13/14/15/16/19/20/21/22/23/26/27/28/29/30/31，issue #242，WIP 续轮，进行中）。
 *
 * 源: target/ERB/口上/EVENT_K11_リリィ.ERB  @EVENTTRAIN #PRI（:100-105，存在
 *     标志 FLAG:111 = 1）@EVENTEND #LATER（:106-113，清标志）
 *     @EVENTTRAIN（:114-514，调教开始口上：姉妹相认/寻妹对峙 CFLAG:201 +
 *     魔族化 CFLAG:400 + NTR 再捕获 CFLAG:650 + 屈服刻印 Lv1-3 + 淫乱/爱慕
 *     （各含魔族化分支）+ 崩坏 + 简易助手口上 CFLAG:202）
 *     @K11_KOJO2（:515-650，调教开始口上二回目以降）
 *     @EVENTEND（:651-748，普通档，调教结束口上）
 *     @KOJO_MESSAGE_COM_11（:749-10657，指令口上主体，本轮落地头部 7 项守卫
 *     :754-778 与 SELECTCOM 0/1/2/3/5/6/7/8/9/10/11/12/13/14/15/16/19/20/21/22/23/26/27/28/29/30
 *     二十七支 :786-4907——爱抚/舔阴/肛门爱抚/自慰/胸爱抚/接吻/自己扒开/指挿入/
 *     舔肛/振动宝石/壶虫/振动杖/肛门虫/阴蒂夹/乳头夹/榨乳器/肛珠/正常位/背后位/
 *     对面座位/背面座位/正常位肛交/背面座位肛交/手淫/口交，各含
 *     初めて/二回目以降、助手玛奥/非助手玛奥、素质与刻印分档，SELECTCOM 6
 *     另含首吻专属分支 TFLAG:13，SELECTCOM 7 另含处女/非处女文案分岔
 *     TALENT:0，SELECTCOM 11 另含 TEQUIP:11 装备/脱着两态（脱着时用独立
 *     CFLAG:372 计数，且初めて阶段自身再按处女/非处女分岔文案），SELECTCOM 12
 *     结构与 SELECTCOM 9 同构（淫乱→爱慕→屈服刻印Lv3→それ以外简单四选，
 *     不含组合判据），SELECTCOM 13 另含 TEQUIP:13 装备/脱着两态（脱着时用
 *     独立 CFLAG:374 计数，二回目以降层淫乱/爱慕各再按 A感覚Lv3以上二分，
 *     六选一档），SELECTCOM 14/15 结构均与 SELECTCOM 9/12 同构（简单四/
 *     三选，不含组合判据），SELECTCOM 16 结构亦与 SELECTCOM 9/12 同构（简单
 *     四/三选），但二回目以降层唯一新增 RAND:2 随机文案分岔（淫乱支下
 *     rand_n(2) 二选一台词，不影响 CFLAG:317 计数取值）。SELECTCOM 17
 *     （オナホール CFLAG:318／着脱 CFLAG:378，:2464-2519）在原作里整段以
 *     `;` 注释掉（连 IF 判断本身也被注释），属死代码，PRINTFORMW 台词全部
 *     留空未填，本移植按证据不落地任何行为、不占用真实指令号，跳过后直落
 *     SELECTCOM 19（肛珠 CFLAG:320／脱着 CFLAG:379）：结构与 SELECTCOM 13
 *     同构（TEQUIP:19 装备/脱着两态，脱着时用独立 CFLAG:379 计数），但
 *     初めて层只按「助手玛奥／淫乱／爱慕／それ以外」简单四选（不含 A感覚
 *     组合判据），二回目以降层才先分「助手玛奥」再各自按「淫乱＋A感覚Lv3
 *     以上→淫乱→爱慕＋A感覚Lv3以上→爱慕→A感覚Lv3以上→それ以外」六选一档，
 *     助手玛奥/非助手玛奥两支结构对称。SELECTCOM 20（正常位 CFLAG:321，
 *     :2650-2951）初めて层先按处女/非处女（TALENT:0）分岔，各自再按助手
 *     玛奥/非助手玛奥、淫乱/爱慕/それ以外三选一（共 12 支平行文案）；二回目
 *     以降层先分助手玛奥/非助手玛奥两支，各自按「淫乱（RAND:3 三选一 +
 *     ABL:2 私处感觉>=3 追加句）→爱慕（同构）→屈服刻印Lv3+V感覚Lv3以上
 *     （RAND:3 三选一）→屈服刻印Lv3→それ以外」五选一档，结构对称。全支
 *     复用同一枚局部 weapon（TALENT:PLAYER:121/122 判定电动假阳具/阴茎，
 *     :2647-2648），本条是文件内首次出现 PRINTFORML（era.print）与
 *     ABL:2（私处感觉，chara(target).system.私处感觉）阈值判据。SELECTCOM 21
 *     （背后位 CFLAG:322，:2957-3292）结构与 SELECTCOM 20 同构（初めて层处女/
 *     非处女×助手玛奥/非助手玛奥×淫乱/爱慕/それ以外 12 支平行；二回目以降层
 *     助手玛奥/非助手玛奥两支各按「淫乱→爱慕→屈服刻印Lv3+V感覚Lv3以上→
 *     屈服刻印Lv3→それ以外」五选一档），但每档下 RAND:3/RAND:2 分支内的
 *     ABL:2 私处感觉判据从 COM20 的「追加句」改为完整 IF/ELSE 两态分支（原作
 *     两态各自独立成句，非在同一句后追加）。另含一处原作自身的用词不一致
 *     需 1:1 保留：全支复用 weapon（TALENT:PLAYER:121/122 判定电动假阳具/
 *     阴茎，:2954-2955，与 SELECTCOM 20 共享同一判据文案），但初めて层与
 *     二回目以降淫乱支的 RAND:2 分支改用第二枚局部 weapon_doggy（同判据，
 *     震动假阳具/阴茎，:2967），源文件里两处三目运算式仅措辞不同（电动/
 *     震动）、判据完全相同，本移植按证据分别保留两枚局部常量，不做归并。
 *     SELECTCOM 22（对面座位 CFLAG:323，:3298-3505）初めて层处女支
 *     （TALENT:0）的 PRINTFORMW 原作为空、未填写的模板骨架，本移植按证据
 *     保留空输出（不落地任何台词）；非处女支按助手玛奥/非助手玛奥×淫乱/
 *     爱慕/それ以外三选一（6 支平行，比 SELECTCOM 20/21 少一层处女分岔，
 *     因处女支本身不再按助手玛奥二分）。二回目以降层助手玛奥/非助手玛奥
 *     两支各按「淫乱→爱慕→屈服刻印Lv3+V感覚Lv3以上→屈服刻印Lv3→それ以外」
 *     五选一档：助手玛奥支的淫乱/爱慕档为 RAND:3 三选一开场句 + 嵌套 ABL:2
 *     私处感觉二态追问句，与 SELECTCOM 21 同构；但非助手玛奥支的淫乱/爱慕
 *     档改为三段式——独立 RAND:3 三选一开场句、独立 ABL:2 二态追问句、
 *     再一次独立 RAND:3 三选一收尾句，三次判据互不共享同一次随机结果
 *     （原作字面两次单独的 IF RAND:3==0...ELSEIF RAND:2==0...ELSE 结构，
 *     本移植对应两次独立 rand_n(3) 调用，1:1 保真，不做合并缓存）。
 *     SELECTCOM 23（背面座位 CFLAG:324，:3511-3758）初めて层沿用 COM20/21
 *     的六支平行结构（处女支为空模板骨架，非处女支按助手玛奥/非助手玛奥×
 *     淫乱/爱慕/それ以外），不同于 COM22 的处女支不再二分。二回目以降层
 *     助手玛奥/非助手玛奥两支各按五档推进，前两档（淫乱、爱慕）均为
 *     RAND:3==0/ELSEIF RAND:2==0/ELSE 三选一开场句，每个分支内再各自嵌套
 *     一层 ABL:2 私处感觉二态追问句（与 COM20/21 同构）；但屈服刻印Lv3＋
 *     V感覚Lv3以上档改用两次独立的 RAND:2==0/ELSE 二选一（第一次选身体
 *     反应句、第二次选双乳描写句），互不共享同一次抽样结果——与 COM22
 *     非助手玛奥淫乱/爱慕档的双独立 RAND:3 结构同源、但落在不同档位，
 *     进一步印证原作口上模板本身就允许同一素质档内多次独立随机取样，
 *     不是单一 SELECTCOM 特例。武器三目沿用 COM20/21/22 的 weapon 局部
 *     常量（本节复用「电动假阳具」措辞，未见 COM21 式的 weapon_doggy
 *     变体）。
 *     SELECTCOM 26（正常位肛交 CFLAG:327，:3763-4002）初めて层不再按处女/
 *     非处女分岔（原作没有 TALENT:0 判据），直接是助手玛奥/非助手玛奥 ×
 *     淫乱/爱慕/それ以外六支平行；非助手玛奥それ以外档内部另按 ABL:3（肛门
 *     感觉）>=3 二态分岔文案，助手玛奥各档均无此二态分岔——这是 COM26 独有
 *     的初めて层内部不对称。二回目以降层改为六档（比 COM20-23 多一档）：
 *     淫乱＋A感覚Lv3以上（CFLAG=7）→淫乱（=6）→爱慕＋A感覚Lv3以上（=5）→
 *     爱慕（=4）→A感覚Lv3以上（=3）→それ以外（=2），素质与 ABL:3 组合判据
 *     比此前任何一支都更细。＋A感覚Lv3以上两档在守卫处已判过 ABL:3>=3，档内
 *     RAND:3==0/ELSEIF RAND:2==0/ELSE 三选一不再嵌套二态追问句；不带
 *     A感覚Lv3以上限定的淫乱/爱慕/それ以外三档则在开场句后接 RAND:3 三选一
 *     单句，同样不嵌套。独立的 A感覚Lv3以上档（未搭配淫乱/爱慕）另起一套
 *     开场句 + RAND:3 三选一收尾句。ERB :3984 原文出现连续两个句号（「呻吟
 *     了起来。。」），按证据 1:1 保真，不视为笔误改正。
 *     SELECTCOM 27（背后位肛交 CFLAG:328，:4008-4254）沿用 COM26 的初次
 *     六支与二回目六档结构，并复用 weapon 三目。原作二回目四处淫乱守卫
 *     误读 CFLAG:327（正常位肛交）而非本支 CFLAG:328；移植按 1:1 保留，
 *     测试与变异条目固定该缺陷，避免被无意“修正”。
 *     SELECTCOM 28（对面座位肛交 CFLAG:329，:4259-4451）沿用 COM26 的
 *     初次六支与二回目六档结构；二回目层在淫乱＋A感覚、爱慕＋A感覚等档
 *     保留原作各自独立的 RAND:3/RAND:2 文案分支。
 *     SELECTCOM 29（背面座位肛交 CFLAG:330，:4457-4671）同样沿用 COM26
 *     的初次六支与二回目六档结构，并复用 weapon 三目；二回目层助手玛奥
 *     淫乱＋A感覚档与非助手玛奥それ以外档各有一次独立 RAND:2 文案分支。
 *     SELECTCOM 30（手淫 CFLAG:331，:4676-4787）初次层按助手玛奥/非助手
 *     玛奥各分淫乱、爱慕、奉仕精神Lv3以上、其余四档；二回目层原作两侧
 *     都把标作「奉仕精神Lv3以上」的 CFLAG=3 档误写成与前一档完全相同的
 *     爱慕＋奉仕精神判据，因顺序遮蔽而不可达，本移植保留并以测试固定。
 *     SELECTCOM 31（口交 CFLAG:332，:4792-4907）初次层同样按助手玛奥/
 *     非助手玛奥各四档；二回目层两侧各按淫乱、爱慕、奉仕精神Lv3以上、
 *     其余四档，非助手前三档分别带三选一、三选一、二选一随机文案。
 *
 * 门面迁移（issue #242 复核补做）：WIP 1/N 范围内 CFLAG:21/201/202/400/650
 * 原 cflag 字面量模板串寻址（共 50 处）已全部改走
 * `chara(target).kojo.<字段>`（肉亲_0/初调教/简易助手_0/魔族化_K11/
 * NTR再捕获，均已在 tools/facade-names.js 登记），本文件因此并入
 * test/gen-facade.test.js 的口上严格检查清单（同 K3/K9/K10 先例）。
 *
 * 本票剩余工作（未落地，占全文 13468 行的约 63.5%）：@KOJO_MESSAGE_COM_11 的
 * SELECTCOM 32 起（源文件第 4912 至 10657 行，约 21 条剩余分支，见源文件
 * 内存根已占位）、@DOG_KOJO_11（第 10658 至 11462 行，兽奸）、
 * @KOJO_MESSAGE_PALAMCNG_11（第 11463 至 11793 行）、
 * @KOJO_MESSAGE_MARKCNG_11（第 11794 至 11880 行）、@SELF_KOJO_K11（第
 * 11881 至 12261 行），以及死斗场/NTR/处刑/展览/放逐/奖赏/惩罚等非调教
 * 口上（第 12262 至 13468 行）。见 issue #242 的进度评论获取认领点。
 *
 * == 姉妹判定（TARGET 是姐姐莉莉，NO:ASSI == 17 是妹妹玛奥） ==
 *
 * 助手是玛奥（角色 17）时，:126-129 先互标肉亲关系（CFLAG:TARGET:21 = 317
 * 姐姐、CFLAG:ASSI:21 = 224 妹妹），随后 :130 起的 CFLAG:201 状态机在初调教
 * （0）与简易助手分支都对「ASSI 是否玛奥」分叉出姉妹相认/寻妹对峙两套
 * 台词。此后素质分档（屈服刻印/淫乱/爱慕/崩坏）与其余口上文件同构。
 *
 * == CALL K11_KOJO2 四处（转译器初稿留成注释，本次复核改回真实调用） ==
 *
 * :370-371（崩坏后二回目以降）、:373-374（无助手）、:383-384
 * （TALENT:MASTER:122==0，主人非男性）、:507-508（助手非玛奥且无专属口上）——
 * 四处 ELSEIF 臂在原作里只有一句 CALL K11_KOJO2，落地为 `await k11_kojo2();`，
 * 返回值不读（同 kojo-k4-stoic.js k4_kojo2 先例）。
 *
 * == 锚鉴别力自查（#242 复核补做，判据见 issue 讨论，工具化见 #298） ==
 *
 * trace-refs/kojo-k11-lily.mjs 的 2008 条锚里，SELECTCOM 0/1/2/3/5 沿用整段
 * 字面量拼接的旧生成法；SELECTCOM 6/7/8/9/10/11/12/13/14/15/16（本轮新增十一支）起改用
 * K10（#241）的逐行独立锚定法——区间内每条非空白源码行各自包一层
 * `^\s*...\s*$`（大区间只取开头 8 行），真正多行、鉴别力更强，两种生成法
 * 在文件内并存，旧锚未随本轮重新生成（避免无关格式化改动）。全部锚对每
 * 条锚在源全文里做精确子串计数：1744 条恰好命中 1 行/1 段，可视为具备真实
 * 鉴别力。余下
 * 264 条命中 >1 处，且经验证无法在不破坏 text-fidelity 逐句绑定
 * （find_printform 要求 n..m 窗口内首条 PRINTFORM 系行即目标句，向前/
 * 向后扩窗只要越过相邻语句自身的 PRINTFORM 行就会误绑定）的前提下继续
 * 收窄——60 条来自 WIP 1/N 交付范围（存在标志/@EVENTTRAIN/@K11_KOJO2/
 * @EVENTEND，:100-748），落在 CFLAG:400 魔族化分支与 K11_KOJO2 RAND 分档
 * 里逐句复现的对白段落内，按 issue 讨论保持现状、不再动；4 条来自
 * SELECTCOM 0/1/2（:811/818/826/1022，姉妹相认/魔族化前后两套台词在平行
 * 分支里逐字复现）；4 条来自 SELECTCOM 6（:1304/1310/1314/1389，首吻/
 * 二回目以降两层里各一对逐字重复的对白句）；6 条来自 SELECTCOM 7
 * （:1485/1486/1534/1547/1586/1587，处女/非处女子分档与二回目以降两层
 * 里各一对逐字重复的对白句）；4 条来自 SELECTCOM 9（:1709/1713/1748/
 * 1770，初めて层淫乱/爱慕两支、二回目以降助手玛奥/非助手玛奥それ以外
 * 分档里各一对逐字重复的对白句）；2 条来自 SELECTCOM 11（:1927/1932，
 * 助手玛奥二回目以降淫乱/爱慕两支共用同一句反问台词）；2 条来自 SELECTCOM
 * 14（:2209/2246，淫乱初めて分支与二回目以降非助手玛奥分支共用同一句
 * 阴蒂夹刺激描写）；7 条来自 SELECTCOM 16（:2382/2386/2390/2407/2413/2419/
 * 2438，「夹在……乳房上的榨乳机，正在毫不留情地挤榨着母乳………」这句通用描写
 * 在初めて/二回目以降助手玛奥/非助手玛奥六个分支里逐字复现，且各自跟随不同
 * 的 CFLAG:317 写值，无法合并）；49 条来自 SELECTCOM 20（:2662/2663/2664/
 * 2669/2671/2672/2673/2678/2680/2681/2682/2689/2692/2696/2699/2714/2715/
 * 2717/2718/2721/2722/2728/2729/2738/2739/2744/2745/2766/2768/2769/2774/
 * 2775/2784/2797/2805/2806/2813/2814/2828/2834/2846/2866/2871/2881/2891/
 * 2892/2918/2923/2928，初めて层处女/非处女×助手玛奥/非助手玛奥×淫乱/爱慕/
 * それ以外多支共用同一句「被…一口气突入了」「处女的蜜穴被…贯通到底」
 * 「插进姐姐的小穴里了」等动作描写，二回目以降层助手玛奥/非助手玛奥两支的
 * 淫乱/爱慕/屈服刻印各档 RAND:3 分岔内同样共用「压在身下…一口气贯通到底」
 * 等描写，各自跟随不同的 CFLAG:321 写值与素质判据，无法合并）；53 条来自
 * SELECTCOM 21（:2966/2967/2970/2974/2975/2977/2978/2985/2986/2993/2996/
 * 3000/3003/3018/3019/3025/3026/3032/3033/3042/3043/3048/3049/3054/3095/
 * 3096/3110/3120/3121/3135/3136/3140/3151/3157/3164/3171/3172/3179/3191/
 * 3192/3195/3211/3215/3225/3226/3235/3249/3259/3264/3265/3269/3277/3284，
 * 初めて层处女×助手玛奥/非助手玛奥×淫乱/爱慕/それ以外多支与二回目以降层
 * 助手玛奥/非助手玛奥两支的淫乱/爱慕/屈服刻印各档 RAND:3/RAND:2 分岔内，
 * 共用「扶着…的腰，从背后进入了…的蜜穴之中」「一口气贯入到了最里面」等
 * 后背位动作描写的段落，且部分与 SELECTCOM 20 的正常位描写逐字重复，各自
 * 跟随不同的 CFLAG:322 写值与素质判据，无法合并）；11 条来自 SELECTCOM 22
 * （:3300-3340 为初めて层段级概览锚，前 8 行与其余口上文件里同样未填写的
 * 处女支模板骨架逐字相同，属已知的跨文件模板重复；:3302 为该模板骨架自身
 * 的空 PRINTFORMW 行，源文件里空 PRINTFORMW 出现 285 处，按 #235 先例整行
 * 锚定即可、不强求唯一；:3311/3316/3321 为初めて层非处女支助手玛奥三档
 * 共用同一句「被…抱在腿上，吸吮着乳头的同时侵犯着蜜穴……」收尾描写；
 * :3426/3432 为二回目以降层助手玛奥それ以外档与非助手玛奥それ以外档共用
 * 同一句「被…抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……」；
 * :3446/3448/3468/3470 为二回目以降层非助手玛奥淫乱/爱慕两档共用同一对
 * ABL:2 二态追问句「不，不行了……小穴……舒服得……要上天了啊啊啊」/
 * 「呜啊……小穴……实在是太舒服了啊啊啊」，各自跟随不同的 CFLAG:323 写值
 * 与素质判据，无法合并）；35 条来自 SELECTCOM 23（:3515 为初めて层处女支
 * 空模板骨架，跨文件已知模式；:3529/3531/3537/3549/3553 为初めて层爱慕/
 * それ以外档的下双腿展露描写句，与 COM20/21 的对应描写逐字或近逐字重复；
 * :3588/3592/3594、:3604/3606/3608、:3612/3614/3618、:3623 为二回目以降层
 * 助手玛奥淫乱/爱慕档 RAND:3/RAND:2 各分支内嵌套的 ABL:2 追问句/双腿展露
 * 描写句，与本文件其余 SELECTCOM 的同款素质分档句式重复；:3638、:3649/
 * :3656 为屈服刻印/それ以外档收尾句与双腿展露描写句重复；:3665/3669/3675/
 * 3686/3689/3690、:3699/3709/3713/3719/3723/3724 为二回目以降层非助手玛奥
 * 淫乱/爱慕档三选一开场句各分支下嵌套的 ABL:2 追问句重复；:3731/3733 为
 * 非助手玛奥屈服刻印Lv3＋V感覚档双独立 RAND:2 结构里第一次抽样的两支收尾
 * 句重复；:3747/3752 为屈服刻印Lv3/それ以外档双腿被用手（强行）分开展露
 * 描写句重复，各自跟随不同的 CFLAG:324 写值与素质判据，无法合并）；27 条
 * 来自 SELECTCOM 26（:3770/3774/3777/3784 为初めて层三档共用同一句开场
 * 邀约台词『姐姐还没体会过肛交吗♡ 保证会让你舒服上天的♡ 嘿嘿嘿！』，仅
 * 助手玛奥支特有；:3778/3785 为非淫乱两档共用的贯入动作描写句；:3835/
 * 3840/3868/3873/3900/3935 为「好舒服……已经舒服得……没有办法思考了
 * 啊啊啊♡」一类跨文件反复出现的高潮通用句，与本文件其余 SELECTCOM
 * 同款素质分档重复；:3842/3845/3848/3854/3863/3875/3878/3879/3887/
 * 3902/3914/3932/3940/3963/3967 为二回目以降层 RAND:3 三选一各分支内的
 * 过程描写/追问句，跨助手玛奥与非助手玛奥、跨淫乱/爱慕/それ以外/A感覚
 * Lv3以上多档重复出现，各自跟随不同的 CFLAG:327 写值与素质判据，无法
 * 合并）。SELECTCOM
 * 3/5/6/7/8/9/10/11/12/13/14/15/16/19/20/21/22/23/26 内非 print 语句
 * 自身收尾行的锚（守卫 SIF/RETURN、CFLAG 计数器赋值）已仿 K9（#240
 * commit 9716dee）的整改法向外扩窗到唯一邻行——只有 era.print(/
 * era.printAndWait( 语句自己收尾行的 `:N` 锚绝不参与扩窗（kojo-text-
 * fidelity 靠它做逐语句字面量绑定，扩窗会误绑邻行台词）。这 264 条即便
 * 行号漂移，落点也只会落到另一处内容完全相同的复现段落，不会静默通过
 * 成不相关文本——风险画像与结构性关键字锚（如裸 `RETURN 0`）不同，后者
 * 才是真正的零鉴别力。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { piercing_state } = require('#/system/train/piercing-state');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { kojo_message_com_family } = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;
/** RAND:N 的默认随机源（本文件的 on() 事件处理器不经分发注入 rand） */
const rand_n = (n) => Math.floor(Math.random() * n);
/** MASTER 恒为角色 0（K1 kojo-k1-confident.js 同款先例） */
const MASTER = 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['COLOSSEUM_KOJO_11'];

// @EVENTTRAIN #PRI（:100-105）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_11 = 1; // :102 FLAG:111 = 1（K11 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:106-113）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_11 = 0; // :108 FLAG:111 = 0
  },
  TIER.LATER,
);

/**
 * @EVENTTRAIN（:114-514，普通档）：调教开始时的口上。
 *
 * 守卫（:114-118）：FLAG:7 <= 0 跳过、TALENT:171 != 1 跳过；此后按
 * CFLAG:201 状态机推进：初调教（0，姉妹相认/寻妹对峙分档）→ 魔族化仅
 * 一次（<5 且 TALENT:314==9 未魔族化）→ NTR 再捕获（>=1 && CFLAG:650==1）
 * → 屈服刻印 Lv1/2/3（各一次）→ 淫乱（含魔族化分支）→ 爱慕（含魔族化
 * 分支）→ 崩坏 → 简易助手分支（TALENT:MASTER:122==0 或 ASSI<0 或助手
 * 非玛奥无专属口上 → K11_KOJO2；助手是玛奥 → CFLAG:202 三阶）。
 */
on(
  'EVENTTRAIN',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const assi = era_flag.assi; // NO:ASSI（ere 角色 ID 直接对应）
    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    const kojo = chara(target).kojo;
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:171`) != 1) {
      return 0;
    }

    // 姉妹判定（助手是玛奥 → 互标肉亲关系）
    if (assi > 0 && assi == 17) {
      kojo.肉亲_0 = 317;
      chara(assi).kojo.肉亲_0 = 224;
    }

    if (kojo.初调教 == 0) {
      era.drawLine();
      if (assi > 0 && assi == 17) {
        // 姉妹相认（助手是玛奥）
        await era.print(`『姐姐？你怎么会在这里？』`); // :141
        await era.printAndWait(
          `「${assi_name}！终于…终于找到你了！我们一起回村子里去吧！」`,
        ); // :142
        await era.printAndWait(
          `眼前这个叫${target_name}的年轻女性，自称是${assi_name}的姐姐`,
        ); // :143
        await era.printAndWait(
          `而${player_name}这才注意到，两人的音容神貌的确有几分相似。`,
        ); // :144
        await era.printAndWait(`还有那顶火红的头发，以及瞳色更是一模一样。`); // :145
        await era.print(`『姐姐……为什么过了这么久才来找我？……我，我已经…』`); // :146
        await era.printAndWait(`${assi_name}挽起了${player_name}的臂弯。`); // :147
        await era.print(
          `『我已经…将自己全身心献给魔王大人了${heart(1)} 村子什么的再也不想回去了${heart(1)}』`,
        ); // :148
        await era.print(
          `「说谎！说谎！你一定是被这个家伙强迫的对吧！快放了${assi_name}，奴隶什么的，让我来代替她！」`,
        ); // :149
        await era.printAndWait(
          `“你要是真的能代替${assi_name}来满足我的话，我倒是可以考虑放过${assi_name}。”听到${player_name}的话，${target_name}缓慢而坚定地点点头。`,
        ); // :150
        await era.print(`「只要放过我妹妹，你要随便怎样对我都好！」`); // :151
        await era.printAndWait(
          `看着姐姐的样子，${assi_name}却不满地翘起了嘴，用谁也听不到的声音嘟囔着。`,
        ); // :152
        await era.printAndWait(`『真是的，姐姐只会做多余的事………』`); // :153
        kojo.简易助手_0 = 1;
      } else {
        // 寻妹对峙（无玛奥或助手非玛奥）
        await era.print(`「我的妹妹呢！把我的妹妹还给我！」`); // :164
        await era.printAndWait(
          `站在面前的这个年轻女性――${target_name}，不顾自己的处境，不由分说地怒斥着${player_name}。`,
        ); // :165
        await era.print(`「是你把她抓到这里的吧！？我的妹妹——玛奥！！」`); // :166
        await era.printAndWait(
          `听这么一说，${player_name}发现这个女人的神情和那个可爱的乡下小姑娘挺相像的。`,
        ); // :167
        await era.printAndWait(`那头火红的头发，还有瞳孔的颜色都一模一样。`); // :168
        await era.printAndWait(
          `面对质问，${player_name}微微点了点头，${target_name}一下子神色激动了起来。`,
        ); // :169
        await era.print(
          `「果然是在这里！求求你，请把她还给我！还给我！她是我的妹妹啊！」`,
        ); // :170
        await era.printAndWait(
          `但她不知道的是，她的妹妹玛奥已经把全身心都献给${player_name}了，更不会愿意离开的。`,
        ); // :171
        await era.printAndWait(
          `但${player_name}还是饶有趣味地思考了一下${target_name}的要求。`,
        ); // :172
        await era.print(
          `「嗯…想要见她？想要让她回去？也不是不可以。但是你愿意代替她做我的性奴隶，接受我的调教吗？」`,
        ); // :173
        await era.printAndWait(
          `听到这样的话，${target_name}愣住了，脸上浮现出矛盾的复杂表情。`,
        ); // :174
        await era.print(
          `“毕竟，为我解开封印的是你的妹妹啊。你作为她的姐姐，我当然也要好好‘感谢’一番才对。”${player_name}俯身在她面前低语着，带着深深的恶意。`,
        ); // :175
        await era.printAndWait(`${target_name}的表情由恐惧变成了绝望。`); // :176
        await era.print(`「骗……骗人……不要啊……不要过来……」」`); // :177
        await era.printAndWait(`那么，是时候为姐妹重聚的最终舞台做准备了。`); // :178
      }
      kojo.初调教 = 1;
      return 1;
    } else if (
      kojo.初调教 < 5 &&
      kojo.魔族化_K11 == 0 &&
      era0(`talent:${target}:314`) == 9 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 魔族化（１回のみ，初回调教后、陷落前）
      await era.printAndWait(''); // :186-187 PRINTFORMW 空行
      kojo.魔族化_K11 = 2;
      return 1;
    } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
      // NTR 再捕获
      if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(''); // :196-198 PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      } else {
        era.drawLine();
        await era.printAndWait(''); // :201-203 PRINTFORMW 空行
        kojo.NTR再捕获 = 0;
      }
      return 1;
    } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
      // 屈服刻印Lv1
      era.drawLine();
      await era.printAndWait(`「呼…呼…这样的调教，才，才没有什么……」`); // :214
      await era.printAndWait(
        `在屈辱的调教中，${target_name}闭上了眼睛，似乎还在坚持着反抗的心态………`,
      ); // :215
      kojo.初调教 = 2;
      return 1;
    } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      // 屈服刻印Lv2
      era.drawLine();
      await era.printAndWait(`「都是因为救不了妹妹…我才会受到这样的惩罚」`); // :222
      await era.printAndWait(
        `${target_name}伏在床上，埋着脸哭泣着。她的样子反而更让${player_name}露出了愉悦的扭曲笑意。`,
      ); // :223
      await era.printAndWait(
        `从${target_name}为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………`,
      ); // :224
      kojo.初调教 = 3;
      return 1;
    } else if (
      kojo.初调教 < 4 &&
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3
      era.drawLine();
      await era.printAndWait(`「不，不要啊！不要用你的脏手碰我……啊啊」`); // :231
      await era.printAndWait(
        `尽管${target_name}语气还无比强硬、${player_name}继续爱抚着她的身体。`,
      ); // :232
      await era.printAndWait(
        `而${player_name}的身体也自己一点点放松了，诚实地接受并享受着爱抚。`,
      ); // :233
      await era.printAndWait(
        `「杀了你！总有一天…一定要杀了你！呜呜……啊嗯……啊啊……」`,
      ); // :234
      await era.printAndWait(
        `${player_name}愉快的听着${target_name}的威胁逐渐变成了略带享受的喘息。还有更多的可以期待。`,
      ); // :235
      kojo.初调教 = 4;
      return 1;
    } else if (
      kojo.初调教 < 5 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1 &&
      era0(`talent:${target}:314`) != 9
    ) {
      // 淫乱
      era.drawLine();
      await era.printAndWait(
        `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
      ); // :241-242
      await era.printAndWait(
        `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
      ); // :243
      await era.printAndWait(
        `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
      ); // :244
      await era.printAndWait(
        `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
      ); // :245-245
      await era.printAndWait(
        `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
      ); // :246-247
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
        ); // :247-248
        await era.printAndWait(
          `${target_name}舔着舌头说道，望着${player_name}的眼睛却露出了期待的光芒………`,
        ); // :249
      } else {
        await era.printAndWait(
          `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
        ); // :250-251
        await era.printAndWait(`${target_name}的双眼却露出了期待的光芒………`); // :252
      }
      kojo.初调教 = 5;
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 6 &&
      era0(`talent:${target}:85`) == 0 &&
      era0(`talent:${target}:76`) == 1
    ) {
      // 淫乱+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (kojo.魔族化_K11 == 1) {
        await era.printAndWait(
          `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
        ); // :260-261
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        ); // :262
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        ); // :263
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把已经被爱液湿透的私处展露在${player_name}前面。`,
        ); // :264
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在你的调教下变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        ); // :265
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :267
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          ); // :268
        } else {
          await era.printAndWait(
            `「你看……都，都湿透了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :270
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`); // :271-275
        }
        kojo.初调教 = 6;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」`,
        ); // :276-277
        await era.printAndWait(
          `虽然这么说着，但${target_name}的身体却在${player_name}的粗暴爱抚下一扭一扭地享受着。`,
        ); // :278
        await era.printAndWait(
          `「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」`,
        ); // :279
        await era.printAndWait(
          `${target_name}不自觉地张开了双腿，把私处展露在${player_name}前面，蜜穴已经被爱液湿透。`,
        ); // :280-280
        await era.printAndWait(
          `曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。`,
        ); // :281-281
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :283
          await era.printAndWait(
            `${target_name}舔着舌头说道，望着${player_name}却露出了期待的光芒………`,
          ); // :284
        } else {
          await era.printAndWait(
            `「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦${heart(1)}」`,
          ); // :286-286
          await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`); // :287-291
        }
        kojo.初调教 = 6;
        return 1;
      } else {
        await era.printAndWait(''); // :289-293 PRINTFORMW 空行（陥落后に魔族）
        kojo.初调教 = 6;
        return 1;
      }
    } else if (
      kojo.初调教 < 7 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:314`) != 9 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 爱慕
      era.drawLine();
      await era.printAndWait(
        `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
      ); // :299-300
      await era.printAndWait(
        `「那个、那个…比起玛奥，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
      ); // :301
      await era.printAndWait(
        `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
      ); // :302
      await era.printAndWait(
        `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
      ); // :303
      await era.printAndWait(
        `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
      ); // :304
      await era.printAndWait(`「有…有什么好笑的嘛？」`); // :305
      if (era0(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
        ); // :307
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        ); // :308
      } else {
        await era.printAndWait(
          `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
        ); // :310
        await era.printAndWait(
          `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
        ); // :311
        await era.printAndWait(
          `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
        ); // :312-313
      }
      kojo.初调教 = 7;
      return 1;
    } else if (
      era0(`talent:${target}:314`) == 9 &&
      kojo.初调教 < 8 &&
      era0(`talent:${target}:85`) == 1 &&
      era0(`talent:${target}:76`) == 0
    ) {
      // 爱慕+魔族化（调教前从魔族/初回调教后魔族/陥落后魔族三档）
      era.drawLine();
      if (kojo.魔族化_K11 == 1) {
        await era.printAndWait(
          `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
        ); // :320-321
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        ); // :322
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        ); // :323
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        ); // :324
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        ); // :325
        await era.printAndWait(`「有…有什么好笑的嘛？」`); // :326
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          ); // :328
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :329
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          ); // :331
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          ); // :332
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :333-337
        }
        kojo.初调教 = 8;
        return 1;
      } else if (kojo.魔族化_K11 == 2) {
        await era.printAndWait(
          `${target_name}靠在${player_name}的身边，轻轻地耳语着。`,
        ); // :338-339
        await era.printAndWait(
          `「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」`,
        ); // :340
        await era.printAndWait(
          `说罢抓着${player_name}的手按在了自己丰满的胸部上。`,
        ); // :341
        await era.printAndWait(
          `「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」`,
        ); // :342
        await era.printAndWait(
          `面对这个献媚的身姿，${player_name}嘴角裂出扭曲的笑意。`,
        ); // :343
        await era.printAndWait(`「有…有什么好笑的嘛？」`); // :344
        if (era0(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…${heart(1)}」`,
          ); // :346
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :347
        } else {
          await era.printAndWait(
            `「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了${heart(1)}」`,
          ); // :349
          await era.printAndWait(
            `边这样怜求着，${target_name}脸像被红霞染过了一般、声音也显得燥热难耐。`,
          ); // :350
          await era.printAndWait(
            `${target_name}已经完全沦为${player_name}爱的奴隶了、比起妹妹，更想要和${player_name}在一起……`,
          ); // :351-355
        }
        kojo.初调教 = 8;
        return 1;
      } else {
        await era.printAndWait(''); // :353-357 PRINTFORMW 空行（陥落后に魔族）
        kojo.初调教 = 8;
        return 1;
      }
    } else if (era0(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`${target_name}的眼睛失去了光彩。`); // :364
      await era.printAndWait(
        `因为过度的调教，看上去精神和身体都崩溃了的样子。`,
      ); // :365
      await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`); // :366
      kojo.初调教 = 9;
      return 1;
    } else if (era0(`talent:${target}:9`) == 1) {
      // 崩坏后（已崩坏，二回目以降）
      await k11_kojo2(); // :370-371 CALL K11_KOJO2
    } else if (assi < 0) {
      // 无助手
      await k11_kojo2(); // :373-374 CALL K11_KOJO2
    } else if (era0(`talent:${MASTER}:122`) == 0) {
      // 主人非男性时二回目以降（简易助手口上不适用）
      await k11_kojo2(); // :383-384 CALL K11_KOJO2
    } else if (assi == 17) {
      // 简易助手口上（助手是玛奥）：CFLAG:202 三阶
      era.drawLine();
      if (kojo.简易助手_0 == 0) {
        // 初めて
        if (era0(`talent:${target}:85`) == 1 && kojo.初调教 >= 5) {
          // 已持爱慕，爱慕取得时初口上（陷落事件）已发生过
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」`,
          ); // :392
          await era.printAndWait(
            `看到作为魔王的调教助手出现的${assi_name}，${target_name}脸上露出了吃惊的表情`,
          ); // :393
          await era.print(
            `『姐姐？好久不见了呀…话说在前，现在魔王大人才是我心中最重要的人了哦』`,
          ); // :394
          await era.printAndWait(
            `边这么说着，${assi_name}在${target_name}面前抱住了${player_name}，好像在炫耀一般。`,
          ); // :395
          await era.printAndWait(`「${assi_name}，你，你在做什么！？」`); // :396
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(`『唉？姐姐还没有把处女献给魔王大人？真是不懂。』`); // :398
            await era.printAndWait(
              `「真，真是的…说什么呢！我，我平时只是和魔王大人拥抱而已！」`,
            ); // :399
            await era.printAndWait(
              `${target_name}注意到${player_name}笑了起来，羞得整张脸都红了。`,
            ); // :400
            await era.printAndWait(
              `『总之，今天我会和魔王大人一起好好疼爱，调教你的，姐姐你做好心理准备了吗${heart(1)}』`,
            ); // :401
          } else {
            await era.print(
              `『魔王大人啊${heart(1)} 每天都会疼爱我，所以我们这样抱着，一点都不奇怪吧♪』`,
            ); // :403
            await era.printAndWait(
              `「说，说的是什么话啊！那个人，那个人可是邪恶的魔王啊！所以，你快离开，离开！」`,
            ); // :404
            await era.printAndWait(
              `『啊哈，姐姐其实也是想得到魔王的拥抱吗？为什么不坦率地说出来呢？』`,
            ); // :405
            await era.printAndWait(
              `「那，那种话说不出来的…呜呜呜…我，我想要魔王大人的拥抱，疼爱和调教………」`,
            ); // :406
            await era.printAndWait(
              `看着${target_name}话语自相矛盾，羞得满脸通红的样子、${player_name}和${assi_name}脸上浮现出了笑容………`,
            ); // :407
          }
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {
          // 已持淫乱，淫乱取得时初口上（陷落事件）已发生过
          await era.printAndWait(`「玛…玛奥！我们终于见面了…${heart(1)}」`); // :412
          await era.printAndWait(
            `看到${target_name}已经一派淫靡的样子，${assi_name}却觉得有点扫兴。`,
          ); // :413
          await era.print(`『哼，感觉姐姐完全变了一个人呢。』`); // :414
          if (era0(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呐…让我们一起在这里开始新生活吧……作为魔王大人的宠物？」`,
            ); // :416
            await era.print(
              `『姐姐这是什么话，可早在你被抓到之前，我就已经是魔王大人的东西了哦。』`,
            ); // :417
            await era.printAndWait(
              `${assi_name}把手伸到${target_name}的双腿之间，开始抚弄姐姐的下体。`,
            ); // :418
            await era.printAndWait(`「真，真是的！」`); // :419
            await era.print(
              `『姐姐先把这里献给魔王大人，再和我一起当魔王大人的性奴宠物吧${heart(1)}』`,
            ); // :420
            await era.printAndWait(
              `「啊…嗯啊…啊啊…愿意…我愿意把这里献给魔王大人！」`,
            ); // :421
            await era.printAndWait(
              `${assi_name}一边坏笑着一边继续用手责备着${target_name}的下体，而${target_name}对这个淫乱的提议表示完全赞成………`,
            ); // :422
          } else {
            await era.printAndWait(
              `「是啊、姐姐已经在魔王的疼爱中获得了新生…${heart(1)}」`,
            ); // :424
            await era.print(
              `『哼哼哼、我也是一样啊姐姐，从今天开始让我们一起当魔王大人的爱奴吧』`,
            ); // :425
            await era.printAndWait(
              `「嗯嗯！我们从此就是魔王大人的性奴宠物了呀！」`,
            ); // :426
            await era.printAndWait(
              `对于${assi_name}的提议，${target_name}笑颜满面地答应了………`,
            ); // :427
          }
          kojo.简易助手_0 = 2;
        } else {
          // それ以外（未持爱慕/淫乱，或未曾陷落）
          await era.printAndWait(
            `「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」`,
          ); // :432
          await era.printAndWait(
            `${assi_name}用邪秽的目光，如同猎人看待猎物一样注视着自己的姐姐。`,
          ); // :433
          await era.print(
            `『姐姐，为什么要到这种地方来呢？在村子里好好呆着不行吗…』`,
          ); // :434
          await era.printAndWait(`「你在说什么！我是为了找你才到这里来的…」`); // :435
          if (era0(`talent:${target}:0`) == 1) {
            await era.print(
              `『被抓到了就不能不管哦。这样好了，我决定要把姐姐变成魔王大人和我的宠物。』`,
            ); // :437
          } else {
            await era.print(
              `『结果蠢到在路上就被魔兽侵犯了吗、姐姐真是大笨蛋。』`,
            ); // :439
            await era.printAndWait(`「为，为什么要说这样的话！」`); // :440
            await era.printAndWait(
              `${target_name}泪流满面地蜷成一团，抱着自己的身体。`,
            ); // :441
            await era.print(
              `『不过无所谓，就算姐姐已经不是处女了，我还是决定要把你变成我和魔王大人的宠物。』`,
            ); // :442
          }
          await era.printAndWait(`「宠…宠物…？你在开什么玩笑？」`); // :444
          await era.print(
            `『才不是开玩笑啊！会把姐姐调教成只懂得取悦我的淫穴和魔王大人的肉棒的变态母猪性奴吧${heart(1)}』`,
          ); // :445
          await era.printAndWait(
            `「不，不要啊……撒谎！撒谎！不要再说了……求求你……呜呜呜………」`,
          ); // :446
          await era.printAndWait(
            `看着和过去判若两人的${assi_name}，${target_name}泣不成声………`,
          ); // :447
          kojo.简易助手_0 = 1;
        }
        return 1;
      } else if (
        kojo.简易助手_0 == 1 &&
        era0('flag:7') == 2 &&
        (era0(`talent:${target}:85`) == 1 || era0(`talent:${target}:76`) == 1)
      ) {
        // 二回目以降（爱慕＆淫乱取得时）
        if (era0(`talent:${target}:85`) == 1) {
          // 爱慕
          await era.print(`『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』`); // :456
          await era.printAndWait(`「没什么，什么事都没有，哼。」`); // :457
          await era.printAndWait(
            `${target_name}用嫉妒的目光看着被${player_name}搂在身上的${assi_name}。`,
          ); // :458
          await era.printAndWait(
            `不知道是不是故意的，${assi_name}继续和${player_name}大声聊着今天的调教内容。`,
          ); // :459
          await era.print(
            `『今天的计划是要狠狠地调教，惩罚姐姐的肛门呢，到时候姐姐哭起来的声音一定很好听』`,
          ); // :460
          await era.printAndWait(`「怎，怎样都好，魔王大人可是属于我的呢！」`); // :461
          await era.print(``); // :462 PRINTL 空行
          await era.printAndWait(
            `『哼哼哼、看来姐姐已经完全变成魔王大人的性奴了呢。不如就让魔王同时享用我们姐妹俩吧？』`,
          ); // :463
          await era.printAndWait(
            `看着已经彻底变样了的姐姐，${assi_name}微笑了起来………`,
          ); // :464
          kojo.简易助手_0 = 2;
        } else if (era0(`talent:${target}:76`) == 1) {
          // 淫乱
          await era.print(`『咦，姐姐怎么了？身体看上去很难受的样子呀？』`); // :468
          await era.printAndWait(
            `「快……快让魔王大人侵犯我…调教我吧……拜，拜托了…${heart(1)}」`,
          ); // :469
          await era.print(
            `『哦哦、姐姐终于变成了只想要肉棒的淫乱性奴了呀…这个样子真是可爱呢。』`,
          ); // :470
          await era.printAndWait(
            `${assi_name}和${player_name}窃窃私语了一阵。`,
          ); // :471
          await era.print(
            `『哼哼哼、姐姐，魔王大人这样说了、“你们姐妹俩愿意一起成为我的宠物的话，就赐予你们无上的快乐哦”。哎哎，我也要当宠物？一点问题都没有${heart(1)}』`,
          ); // :472
          await era.printAndWait(
            `${assi_name}红着脸，光着身子四肢着地趴在了${target_name}的身边。`,
          ); // :473
          await era.print(
            `『来吧，姐姐和我一起说，一起做吧。从现在起，我们姐妹俩就是魔王大人的淫乱母狗性奴，愿意一生侍奉魔王大人，请魔王大人用肉棒好好疼爱，调教我们吧，拜托了♪』`,
          ); // :474
          await era.printAndWait(
            `听着${assi_name}流利地在${player_name}面前念出了母狗性奴的誓言，${target_name}同样也趴下来，自豪地宣誓了。`,
          ); // :475
          await era.printAndWait(
            `「${target_name}我愿成为魔王大人的淫乱母狗。和母狗妹妹一起一生侍奉魔王大人、请魔王大人用肉棒奖赏我们吧${heart(1)}」`,
          ); // :476
          await era.printAndWait(
            `就这样，${target_name}和${assi_name}姐妹完全成为${player_name}的性奴宠物了………`,
          ); // :477
          kojo.简易助手_0 = 2;
        }
        return 1;
      } else if (kojo.简易助手_0 >= 2 && era0('flag:7') == 2) {
        // 二回目以降（CFLAG:202 >= 2）
        if (era0(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「啊啊…魔王大人…请给我今日的拥抱………${heart(1)}」`,
          ); // :485
          await era.print(`『我，我也要…魔王大人也请一起拥抱我…${heart(1)}』`); // :486
          await era.printAndWait(
            `${assi_name}完全忘记了要调教姐姐的事，一同投入了${player_name}的怀抱中。`,
          ); // :487
          await era.printAndWait(
            `${player_name}苦笑着将姐妹两人同时抱进了怀里、那么今天要怎么“疼爱”她们呢？`,
          ); // :488
        } else if (era0(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「今天也请尽情地疼爱，调教我们这对性奴母狗姐妹吧…汪♪」`,
          ); // :491
          await era.print(
            `『魔王大人，请尽情地疼爱我们吧…啊、嗯啊啊…${heart(1)}』`,
          ); // :492
          await era.printAndWait(
            `${player_name}把手分别伸到了两人的下体，抚弄着已经淫液满溢的蜜穴。`,
          ); // :493
          await era.printAndWait(
            `如今两人除了和${player_name}交媾之外，已经什么事情都不会去想了………`,
          ); // :494
        }
        return 1;
      } else {
        // それ以外
        await era.print(`『姐姐早点坦率地面对自己的欲望吧……』`); // :499
        await era.printAndWait(`「住、住手啊…离我远点！」`); // :500
        await era.printAndWait(
          `手臂被${assi_name}紧紧抓住、${target_name}回忆起上次被妹妹调教的不堪回首的经历，嚎啕大哭起来。`,
        ); // :501
        await era.print(
          `『哈……花不了多久就会把你调教成随便碰碰哪里都会高潮的母猪啦♪』`,
        ); // :502
        await era.printAndWait(`「不要…不要不要不要啊…神啊，救救我………」`); // :503
        return 1;
      }
    } else {
      // 口上のある助手が居ない場合（助手非玛奥，或无助手专属口上）
      await k11_kojo2(); // :507-508 CALL K11_KOJO2
    }
  },
  TIER.NORMAL,
);

/**
 * @K11_KOJO2（:515-650）：调教开始口上的二回目以降（助手无专属口上时，或
 * 简易助手三阶都命中默认档时的通用分档）。按「崩坏 → 反抗刻印Lv3 →
 * 屈服刻印Lv0/1/2/3（Lv3 再按 CFLAG:202 是否见过妹妹分档）→ 淫乱（含
 * 魔族化分支）→ 爱慕（含魔族化分支）」取首个命中；FLAG:7 == 2（全量模式）
 * 才出声，逐档 RAND 二/三选一。
 */
async function k11_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`); // :515-519
    await era.printAndWait(
      `已经无法期待精神崩溃的${target_name}会有正常的反应了………`,
    ); // :520
    return 1;
  } else if (era0(`mark:${target}:3`) == 3 && era0('flag:7') == 2) {
    // 反発刻印Lv3
    era.drawLine();
    await era.printAndWait(`「尽管来吧，别以为我不知道你想做什么。」`); // :525
    await era.printAndWait(`${target_name}丝毫不掩盖自己的反抗心理………`); // :526
    return 1;
  } else if (era0(`mark:${target}:2`) == 0 && era0('flag:7') == 2) {
    // 屈服刻印Lv0
    era.drawLine();
    await era.printAndWait(`「我不会怕的。」`); // :532
    await era.printAndWait(`${target_name}面无表情，语气冷漠`); // :533
    return 1;
  } else if (era0(`mark:${target}:2`) == 1 && era0('flag:7') == 2) {
    // 屈服刻印Lv1
    era.drawLine();
    await era.printAndWait(
      `「终……终于又来了，这张可憎的脸庞，又要打算对我做什么——放…放手！」`,
    ); // :539
    await era.printAndWait(
      `${target_name}被${player_name}一把抱了起来，无力反抗而不住地啜泣着………`,
    ); // :540
    return 1;
  } else if (era0(`mark:${target}:2`) == 2 && era0('flag:7') == 2) {
    // 屈服刻印Lv2
    era.drawLine();
    await era.printAndWait(`「不要啊…这种事情……真的不行…呜呜呜…」`); // :546
    await era.printAndWait(
      `${target_name}的手腕被${player_name}扭住，似乎已经失去了反抗的力量………`,
    ); // :547
    return 1;
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    era0('flag:7') == 2
  ) {
    // 屈服刻印Lv3＋爱慕/淫乱無し（按 CFLAG:202 是否见过妹妹分档）
    era.drawLine();
    if (kojo.简易助手_0 >= 1) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          `「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」`,
        ); // :556
        await era.printAndWait(
          `${target_name}带着急促的呼吸，凝视着${player_name}………`,
        ); // :557
      } else {
        await era.printAndWait(
          `「啊啊、妹妹她在……还在休息吗……那就不需要去打扰她了。调教什么的，让，让我来承受就可以了！」`,
        ); // :559
        await era.printAndWait(
          `${target_name}不知道的是，她所担心的妹妹在与${player_name}分开时一直靠着自慰在宣泄性欲………`,
        ); // :560
      }
    } else {
      if (rand_n(2) == 0) {
        await era.printAndWait(`「呜……呜呜……什么时候，才能让我和妹妹见面！」`); // :564
        await era.printAndWait(
          `虽然内心依旧怀着对${player_name}的厌恶，但是${target_name}还是老老实实地躺在了床上……`,
        ); // :565
      } else {
        await era.printAndWait(
          `「让，让我来当你的对手好了！只要别对我妹妹出手，让我做什么都可以……但，但是别以为我会屈服的！」`,
        ); // :567
        await era.printAndWait(
          `${target_name}口头上还在逞强，却完全不知道自己的妹妹已经完全沦陷在${player_name}的调教下了……`,
        ); // :568
      }
    }
    return 1;
  } else if (era0(`talent:${target}:76`) == 1 && era0('flag:7') == 2) {
    // 淫乱（含魔族化分支）
    era.drawLine();
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」`,
        ); // :577-579
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        ); // :580
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        ); // :581
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        ); // :583
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        ); // :584
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        ); // :585
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        ); // :587
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        ); // :588
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        ); // :589-591
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」`,
        ); // :592-594
        await era.printAndWait(
          `${target_name}冷淡的态度让${player_name}正有些扫兴，但转眼间${target_name}却突然捧起了${player_name}的手，挨个地舔着手指。`,
        ); // :595
        await era.printAndWait(
          `「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人${heart(1)}」`,
        ); // :596
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」`,
        ); // :598
        await era.printAndWait(
          `${player_name}拉着${target_name}的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。`,
        ); // :599
        await era.printAndWait(
          `「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…${heart(1)}」`,
        ); // :600
      } else {
        await era.printAndWait(
          `「向您请安，魔王大人，今天也请调教我吧${heart(1)}」`,
        ); // :602
        await era.printAndWait(
          `${target_name}三指着地跪坐着向${player_name}行礼。`,
        ); // :603
        await era.printAndWait(
          `「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢${heart(1)}」`,
        ); // :604-606
      }
    }
    return 1;
  } else if (era0(`talent:${target}:85`) == 1 && era0('flag:7') == 2) {
    // 爱慕（含魔族化分支）
    era.drawLine();
    if (era0(`talent:${target}:314`) == 9) {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」`,
        ); // :613-615
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        ); // :616
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        ); // :617
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        ); // :619
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        ); // :620
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        ); // :621
      } else {
        await era.printAndWait(
          `「就让我来侍奉魔王大人吧，妹妹就让她好好休息吧${heart(1)}」`,
        ); // :623
        await era.printAndWait(
          `${target_name}握着${player_name}的手，有些出神地说道。`,
        ); // :624
        await era.printAndWait(
          `「啊啊……其，其实只是想从妹妹，还有其他勇者底下独占魔王大人而已啦${heart(1)}」`,
        ); // :625
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(
          `「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」`,
        ); // :628-630
        await era.printAndWait(
          `${target_name}偎依在了${player_name}了的怀里，脸颊贴在${player_name}的胸前，一股淡淡的香味传到鼻子里。`,
        ); // :631
        await era.printAndWait(
          `「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」`,
        ); // :632
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」`,
        ); // :634
        await era.printAndWait(
          `${target_name}从后面抱住了${player_name}，用甜甜的语调说道。`,
        ); // :635
        await era.printAndWait(
          `「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦${heart(1)}」`,
        ); // :636
      } else {
        await era.printAndWait(
          `「在我被魔王大人调教的时候，妹妹就能平安无事了呢……这样的话，就让我一直来做魔王大人的对手好了${heart(1)}」`,
        ); // :638
        await era.printAndWait(
          `${target_name}握着${player_name}的手，神情羞涩地说道。`,
        ); // :639
        await era.printAndWait(
          `「啊啊……我独占你，其实也是为了其他勇者大人们好啊${heart(1)}」`,
        ); // :640
      }
    }
    return 1;
  }
  return 0; // 隐式（原作 ENDIF 后 RETURN 0，见文件头 :515-650）
}

/**
 * @EVENTEND（:651-748，普通档）：调教结束时的口上。
 *
 * 守卫（:651-659，含角色死亡 BASE:0 <= 0 跳过）：FLAG:7 <= 0 跳过、TALENT:171
 * != 1 跳过、角色已死亡跳过。
 * 无 → 屈服刻印Lv1以下+爱慕无 → 屈服刻印Lv2+爱慕无 → 屈服刻印Lv3+爱慕
 * 无 → 淫乱（按体力 500 分档）→ 爱慕（按体力 500 分档）」取首个命中，均
 * 判 CFLAG:202（是否见过妹妹）分支正文。
 */
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target); // %SAVESTR:TARGET%
    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    const kojo = chara(target).kojo;
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(`talent:${target}:171`) != 1) {
      return 0;
    }
    if (era0(`base:${target}:0`) <= 0) {
      return 0;
    }

    if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`); // :663-667
      await era.printAndWait(`少女眼中理性的光芒已经不复存在………`); // :668
      return 1;
    } else if (
      era0(`mark:${target}:3`) == 3 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 反発刻印Lv3+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「我，我是绝对不会认输的……」`); // :674
        await era.printAndWait(
          `虽然跪在${player_name}的面前，但是${target_name}丝毫不掩盖眼神里的反抗……`,
        ); // :675
      } else {
        await era.printAndWait(
          `「我是为了妹妹才忍受的这种事情的，但别以为我会原谅你！」`,
        ); // :677
        await era.printAndWait(
          `${target_name}边说着，边用目光怒视着${player_name}……`,
        ); // :678
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) <= 1 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 屈服刻印Lv1以下+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(`「终于结，结束了…」`); // :686
        await era.printAndWait(`${target_name}松了口气，稍微安心了一些。`); // :687
      } else {
        await era.printAndWait(`「什，什么时候让我和妹妹见面…？」`); // :689
        await era.printAndWait(
          `${target_name}满脸疲惫地问着你，但你完全无视了她的问题……`,
        ); // :690
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 2 &&
      (era0(`talent:${target}:85`) == 0 || era0(`talent:${target}:76`) == 0)
    ) {
      // 屈服刻印Lv2+爱慕无
      era.drawLine();
      if (kojo.简易助手_0 >= 1) {
        await era.printAndWait(
          `「这，这样就能满足魔王大人了吗……那，是不是可以放过我的妹妹了？」`,
        ); // :698
        await era.printAndWait(
          `${target_name}虽然被调教得疲惫不堪，但还是不顾自己的身体恳求着。`,
        ); // :699
        await era.printAndWait(`那副可怜的样子却只让你更加感觉身心愉悦………`); // :700
      } else {
        await era.printAndWait(
          `「还，还要再听话一些……才能让我和妹妹见面吗？」`,
        ); // :702
        await era.printAndWait(
          `${target_name}一脸疲惫地问着你，但你完全无视了她的问题………`,
        ); // :703
      }
      return 1;
    } else if (
      era0(`mark:${target}:2`) == 3 &&
      era0(`talent:${target}:85`) == 0
    ) {
      // 屈服刻印Lv3+爱慕无
      era.drawLine();
      await era.printAndWait(`「下，下次也请继续调教我吧？」`); // :709
      await era.printAndWait(
        `已经完全变得驯服的${target_name}犹豫地挽住了你的手，虽然你承诺等她体力恢复后会再来，但是是否遵守约定则是你的自由。`,
      ); // :710
      await era.printAndWait(`「我会好好休息等着的……」`); // :711
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 淫乱(体力500以上)
      era.drawLine();
      await era.printAndWait(
        `「哎哎，才到这种程度就结束了吗……这就要回去了？」`,
      ); // :716
      await era.printAndWait(`${target_name}有些欲求不满地说道。`); // :717
      await era.printAndWait(`「那，那下次一定……算了，当我没说吧……」`); // :718
      return 1;
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 淫乱(体力500未満)
      era.drawLine();
      await era.printAndWait(`「哈啊……哈啊……一本满足呢${heart(1)}」`); // :723
      await era.printAndWait(
        `${target_name}挽着你的胳膊，露出了心满意足的笑容。`,
      ); // :724
      await era.printAndWait(`「下次……还想要更多的调教哦。」`); // :725
      await era.printAndWait(`少女对欲望的坦率让你对自己的调教成果十分满意。`); // :726
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) >= 500
    ) {
      // 爱慕(体力500以上)
      era.drawLine();
      await era.printAndWait(`「是，是对人家的身体厌倦了吗？」`); // :731
      await era.printAndWait(`${target_name}带着不安的表情望着你。`); // :732
      await era.printAndWait(
        `「不过……身为魔王大人的奴隶……被抛弃也不能有任何怨言……」`,
      ); // :733
      return 1;
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      era0(`base:${target}:0`) <= 500
    ) {
      // 爱慕(体力500未満)
      era.drawLine();
      await era.printAndWait(
        `「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…${heart(1)}」`,
      ); // :738
      await era.printAndWait(
        `${target_name}一边笑着，一边用充满爱意的动人目光看着你。`,
      ); // :739
      await era.printAndWait(`「现在，魔王大人知道我比我妹妹要更好了吧…？」`); // :740
      return 1;
    }
    return 0; // 隐式（原作 ENDIF 后 RETURN 0，见文件头 :651-748）
  },
  TIER.NORMAL,
);

/**
 * @KOJO_MESSAGE_COM_11（:749-10657）：指令口上全量（本轮先落头部守卫 +
 * SELECTCOM 0/1/2/3/5/6/7/8/9，其余编号留续轮）。
 *
 * 头部七道守卫（:754-778，源 1:1 顺序）：ASSI 非玛奥助手调教 → 跳过；口塞
 * （TEQUIP:45 且非口塞指令）→ 跳过；失神（TFLAG:899）→ 跳过；兽奸
 * （TEQUIP:89）→ 专用口上（DOG_KOJO_11）；死斗场（TEQUIP:55）
 * → 专用口上（COLOSSEUM_KOJO_11，存根待认领）；崩坏（TALENT:9）→ 跳过；
 * 触手（TEQUIP:90）→ 跳过。
 *
 * SELECTCOM 0（爱抚 CFLAG:301，:786-861）：初めて按「助手玛奥／屈服刻印
 * Lv2以上／それ以外」三分档写 1；二回目以降先分「助手玛奥」再各自按
 * 「淫乱→爱慕→（それ以外，仅助手玛奥臂无写点，源作原样）／屈服刻印
 * Lv3→Lv2→それ以外」写 6/5/4/3/2。
 *
 * SELECTCOM 1（舔阴 CFLAG:302，:866-947）：初めて按「处女/それ以外 ×
 * 助手玛奥/否」四分档写 1；二回目以降先分「助手玛奥」（内部淫乱→爱慕→
 * それ以外三选，それ以外无写点）再各自按「淫乱→爱慕→屈服刻印Lv3→
 * 反抗刻印Lv1以上（且屈服Lv2以下）→それ以外」写 5/4/3/2/2。
 *
 * SELECTCOM 2（肛门爱抚 CFLAG:303，:952-1043）：初めて按「助手玛奥／否」
 * 二分档写 1；二回目以降按润滑（P = PALAM:3 + UP:3 对 PALAMLV:2）叠加素质
 * 分档：「淫乱+润滑Lv2以上→淫乱+润滑Lv2未満→爱慕+润滑Lv2以上→爱慕+
 * 润滑Lv2未満→润滑Lv2以上+A感覚Lv3以上→それ以外」写 7/6/5/4/3/2，每档
 * 再按「助手玛奥/否」二分。
 *
 * SELECTCOM 3（自慰 CFLAG:304，:1048-1198）：初めて按「助手玛奥／否」二
 * 分档写 1；二回目以降先判「助手玛奥」——命中则走自身内部「淫乱（含处女
 * 子分档）→爱慕（含处女子分档）→それ以外（无写点）」三选，写 7/5/－；
 * 未命中则走扁平九支 ELSEIF 链（与助手玛奥支互斥、彼此独立判据，非
 * 「各档再按助手玛奥二分」的对称结构，1:1 保留源作形状）：淫乱+处女→
 * 淫乱+自慰中毒Lv3以上（RAND:3 三选一台词）→淫乱+自慰中毒Lv3未満（RAND:2
 * 二选一）→爱慕+处女→爱慕+自慰中毒Lv3以上（RAND:3 三选一）→爱慕+自慰
 * 中毒Lv3未満（RAND:2 二选一）→屈服刻印Lv3+自慰中毒Lv1以上（RAND:2 二选
 * 一）→それ以外（RAND:2 二选一），写 9/8/7/6/5/4/3/2。ABL:31 自慰中毒经
 * `chara(target).train.自慰中毒` 门面读取。
 *
 * SELECTCOM 5（胸爱抚 CFLAG:306，:1203-1278）：初めて按「助手玛奥／否」
 * 二分档写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕→B感覚Lv3
 * 以上→それ以外」写 5/4/3/2，两支结构对称（与 SELECTCOM 0 同款）；助手
 * 玛奥支的淫乱台词有一处 RAND:2 裸真值三目（源无 == 0，预算 moan_word
 * 变量，同 SELECTCOM 1 的 lick_line_* 先例）。ABL:1 乳房感觉经
 * `chara(target).system.乳房感觉` 门面读取。
 *
 * SELECTCOM 6（接吻 CFLAG:307，:1283-1433）：三层结构。首吻专属分档
 * （CFLAG:307 == 0 && TFLAG:13 初吻与自我口上）按「淫乱且非助手陪玩／
 * 爱慕且非助手陪玩／助手玛奥（内部再按淫乱→爱慕→それ以外）／それ以外」
 * 四分档写 1，前两支另受 TEQUIP:89/90（兽奸/触手）排除，但头部守卫已把
 * 这两条路由到存根，本分支执行时恒为 0（1:1 保留原判断）；普通初めて
 * （CFLAG:307 == 0 非首吻）按「助手玛奥（内部淫乱→爱慕→それ以外）／
 * 淫乱→爱慕→それ以外」写 1；二回目以降先分「助手玛奥」再各自按
 * 「淫乱→爱慕→従順Lv2以上→それ以外」写 5/4/3/2，两支结构对称（与
 * SELECTCOM 0/5 同款）。本支起 trace-refs 新锚改用 K10 逐行独立锚定法
 * （见文件头「锚鉴别力自查」）。
 *
 * SELECTCOM 7（自己扒开 CFLAG:308，:1438-1611）：不含首吻专属层。初めて
 * （CFLAG:308 == 0）按「助手玛奥（内部淫乱→爱慕→それ以外，无处女分档）／
 * 非助手玛奥（内部淫乱、爱慕两支各再按 TALENT:0 处女/非处女分岔文案，
 * それ以外无处女分档）」写 1；二回目以降先分「助手玛奥」再各自按「淫乱
 * →爱慕（淫乱/爱慕两支内层再按处女分岔文案，爱慕另嵌套露出癖Lv3以上
 * 文案分岔）→露出癖Lv3以上（内层再按处女分岔追加一句）→それ以外（内层
 * 再按处女分岔追加一句）」写 5/4/3/2，两支结构对称。
 *
 * SELECTCOM 8（指挿入 CFLAG:309，:1616-1692）：不含处女分岔。初めて
 * （CFLAG:309 == 0）按「助手玛奥／淫乱／屈服刻印Lv3+爱慕／それ以外」四选
 * 写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕＋屈服刻印Lv3→
 * 屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构对称，MARK:2 屈服刻印经
 * `mark(2)` 局部帮手读取。
 *
 * SELECTCOM 9（舔肛 CFLAG:310，:1697-1776）：不含处女分岔、不含屈服刻印
 * 与爱慕的组合判据（与 SELECTCOM 8 的差异点）。初めて（CFLAG:310 == 0）
 * 按「助手玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手
 * 玛奥」再各自按「淫乱→爱慕→屈服刻印Lv3→それ以外」写 5/4/3/2，两支
 * 结构对称。
 *
 * SELECTCOM 10（振动宝石 CFLAG:311，:1781-1853）：与 SELECTCOM 8 同构，含
 * 屈服刻印Lv3+爱慕的组合判据。初めて（CFLAG:311 == 0）按「助手玛奥／淫乱／
 * 屈服刻印Lv3+爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕＋屈服刻印Lv3→屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构
 * 对称。
 *
 * SELECTCOM 11（壶虫 CFLAG:312／着脱 CFLAG:372，:1859-1987）：唯一同时含
 * TEQUIP:11 装备/脱着两态判定的分支。装备态（TEQUIP:11 真）初めて
 * （CFLAG:312 == 0）先按 TALENT:0 处女/非处女分岔文案，处女层再各按
 * 「助手玛奥（内部再按淫乱/爱慕/それ以外三选文案）／非助手玛奥・淫乱／
 * 爱慕／それ以外」写 1，非处女层同构但助手玛奥无进一步细分；二回目以降
 * 先分「助手玛奥」再各自按「淫乱→爱慕→ABL:2（私处感觉）Lv3以上→それ以外」
 * 写 5/4/3/2，两支结构对称。脱着态（TEQUIP:11 == 0）是独立三选一（淫乱/
 * 爱慕/それ以外），用另一枚 CFLAG:372 计数，写 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 12（振动杖 CFLAG:313，:1992-2066）：结构与 SELECTCOM 9 同构
 * （不含组合判据）。初めて（CFLAG:313 == 0）按「助手玛奥／淫乱／爱慕／
 * それ以外」四选写 1；二回目以降先分「助手玛奥」再各自按「淫乱→爱慕→
 * 屈服刻印Lv3→それ以外」写 5/4/3/2，两支结构对称。
 *
 * SELECTCOM 13（肛门虫 CFLAG:314／着脱 CFLAG:374，:2072-2191）：TEQUIP:13
 * 装备/脱着两态。已装（初めて，CFLAG:314 == 0）按「助手玛奥／淫乱／爱慕／
 * それ以外・ABL:3（肛门感觉）Lv3以上／それ以外・それ以外」五选写 1；二回目
 * 以降先分「助手玛奥」再各自按「淫乱＋ABL:3 Lv3以上→淫乱→爱慕＋ABL:3
 * Lv3以上→爱慕→ABL:3 Lv3以上→それ以外」六选写 6/6/5/4/3/2，两支结构对称。
 * 脱着态（TEQUIP:13 == 0）是独立四选一（淫乱/爱慕/ABL:3 Lv3以上/それ以外），
 * 用另一枚 CFLAG:374 计数，写 4/3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 14（阴蒂夹 CFLAG:315／着脱 CFLAG:375，:2197-2278）：结构与
 * SELECTCOM 9/12 同构（不含组合判据）。初めて（CFLAG:315 == 0）按「助手
 * 玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕→それ以外」写 4/3/2，两支结构对称。脱着态（TEQUIP:14 ==
 * 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:375 计数，写
 * 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 15（乳头夹 CFLAG:316／着脱 CFLAG:376，:2284-2364）：结构与
 * SELECTCOM 9/12/14 同构（不含组合判据）。初めて（CFLAG:316 == 0）按「助手
 * 玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手玛奥」再各自
 * 按「淫乱→爱慕→それ以外」写 4/3/2，两支结构对称。脱着态（TEQUIP:15 ==
 * 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:376 计数，写
 * 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 16（榨乳器 CFLAG:317／着脱 CFLAG:377，:2371-2460）：结构与
 * SELECTCOM 9/12 同构（不含组合判据）。初めて（TEQUIP:16 已装且 CFLAG:317
 * == 0）按「助手玛奥／淫乱／爱慕／それ以外」四选写 1；二回目以降先分「助手
 * 玛奥」再各自按「淫乱→爱慕→それ以外」写 4/3/2，助手玛奥+淫乱支下另有
 * RAND:2 二选一台词分岔（`rand_n(2)` 落地，不影响 CFLAG:317 写值）。脱着态
 * （TEQUIP:16 == 0）是独立三选一（淫乱/爱慕/それ以外），用另一枚 CFLAG:377
 * 计数，写 3/2/1，无助手玛奥分档。
 *
 * SELECTCOM 17（オナホール CFLAG:318／着脱 CFLAG:378，:2464-2519）在原作里
 * 整段以 `;` 注释掉（连 `IF SELECTCOM == 17` 本身也被注释），SELECTCOM 数字
 * 因此从未被判定为真，属于死代码——PRINTFORMW 台词也全部留空未填。原作从未
 * 执行过此分支，本移植按证据不落地任何行为，直接跳过、不占用真实指令号。
 *
 * SELECTCOM 19（肛珠 CFLAG:320／脱着 CFLAG:379，:2521-2644）：结构与
 * SELECTCOM 13 同构（TEQUIP:19 装备/脱着两态，脱着时用独立 CFLAG:379
 * 计数）。初めて（TEQUIP:19 已装且 CFLAG:320 == 0）按「助手玛奥／淫乱／
 * 爱慕／それ以外」简单四选写 1（不含 A感覚 组合判据）；二回目以降先分
 * 「助手玛奥」再各自按「淫乱＋A感覚Lv3以上→淫乱→爱慕＋A感覚Lv3以上→
 * 爱慕→A感覚Lv3以上→それ以外」六选一档写 7/6/5/4/3/2，助手玛奥/非助手
 * 玛奥两支结构对称。脱着态（TEQUIP:19 == 0）是独立四选一（淫乱/爱慕/
 * A感覚Lv3以上/それ以外），用另一枚 CFLAG:379 计数，写 4/3/2/1，无助手
 * 玛奥分档。
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0, n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_11(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(player); // %SAVESTR:PLAYER%
  const master_name = chara_callname(MASTER); // %SAVESTR:MASTER%
  const assi_name = era_flag.assi >= 0 ? chara_callname(era_flag.assi) : ''; // %SAVESTR:ASSI%
  const kojo = chara(target).kojo;
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  const assi_mao =
    era_flag.assi > 0 && era_flag.assiplay && era_flag.assi === 17;

  // :755-758 助手マオ以外が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
    return 0;
  }
  // :758-759 ボールギャグ着用時には口上をスキップする（SELECTCOM==45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :761-763 失神時には口上をスキップする
  if (game.train.失神) {
    return 0;
  }
  // :764-767 獣姦プレイ中は専用口上
  if (era.get(`tequip:${target}:89`)) {
    return dog_kojo_11(rand_n);
  }
  // :769-772 コロシアム中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_11', '死斗场调教中的专用口上');
    return 0;
  }
  // :774-776 崩坏した場合は口上をスキップする
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }
  // :777-780 触手調教中は口上をスキップする
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  // :786-861 IF SELECTCOM == 0（爱抚 CFLAG:301）
  if (era_flag.selectcom === 0) {
    // :788-803 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『姐姐的身材，真好，真漂亮…♪』`); // :791
        await era.printAndWait(`「不行…不行啊…啊啊！」`); // :792
      } else if (mark(2) >= 2) {
        // 屈服刻印Lv2以上
        await era.printAndWait(`「啊啊……再这样摸的话……！」`); // :795
        await era.printAndWait(
          `${target_name}的身体被手指来回抚弄，拼命忍耐着………`,
        ); // :796
      } else {
        // それ以外
        await era.printAndWait(`「又，又来了……真是令人讨厌……！」`); // :799
        await era.printAndWait(`${target_name}充满厌恶地扭动着身体躲避着………`); // :800
      }
      kojo.爱抚 = 1; // :800-802
      return 0;
    }

    // :805-859 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴${heart(1)}』`,
        ); // :810
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :811
        await era.printAndWait(
          `「嗯啊啊…因为你的手都摸在敏感点上了…啊啊…继续${heart(1)}」`,
        ); // :812
        await era.printAndWait(`${target_name}在爱抚下身子一扭一扭地享受着。`); // :813
        kojo.爱抚 = 6; // :814
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐、见到魔王大人，心情很愉快吧。』`); // :817
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :818
        await era.printAndWait(
          `「啊啊…快，快停手啦，不然姐姐生气了…嗯啊啊…真是的…！」`,
        ); // :819
        await era.printAndWait(
          `${target_name}在爱抚下身子一扭一扭，又是躲避又是享受着。`,
        ); // :820
        await era.printAndWait(
          `『不想被魔王大人看见这副色情的样子吗？明明超级想要被魔王大人疼爱嘛！』`,
        ); // :821
        kojo.爱抚 = 5; // :822
      } else {
        // それ以外（CFLAG:301 不推进——源作原样，助手玛奥臂唯一无写点档）
        await era.printAndWait(`『呀呀，姐姐的身体再放松一点嘛…♪』`); // :825
        await era.printAndWait(
          `${player_name}用手指驾轻就熟地爱抚着${target_name}全身上下。`,
        ); // :826
        await era.printAndWait(
          `「快住手啊……我们是亲姐妹啊…呜呜呜！这样怎么对得起死去的母亲啊！」`,
        ); // :827
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊嗯…不用这么温柔啦…嗯啊…摸我的时候再……再粗暴一点…${heart(1)}」`,
      ); // :831
      await era.printAndWait(`${target_name}边娇喘着，边淫荡地摇摆着身体。`); // :832
      await era.printAndWait(
        `「啊，啊哈……${heart(1)} 就是这样！啊啊…好…好舒服${heart(1)}」`,
      ); // :833
      kojo.爱抚 = 6; // :833-834
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…魔王大人的爱抚……${target_name}好舒服…好幸福…」`,
      ); // :837
      await era.printAndWait(
        `${target_name}温柔地搂住了${player_name}的脖颈，娇喘着享受着爱抚。`,
      ); // :838
      await era.printAndWait(
        `「魔……魔王大人……我爱你……我永远是你的人…${heart(1)}」`,
      ); // :839
      kojo.爱抚 = 5; // :839-840
    } else if (mark(2) === 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…哈…为什么会这么舒服的……啊啊」`); // :843
      await era.printAndWait(
        `${target_name}腰身扭动着，敏感的身体在${player_name}的爱抚下已经有了感觉。`,
      ); // :844
      await era.printAndWait(`「啊啊，我的…身体……嗯啊啊！」`); // :845
      kojo.爱抚 = 4; // :845-846
    } else if (mark(2) === 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv2
      await era.printAndWait(`「哈啊…哈啊……身体好像稍微习惯了……」`); // :849
      await era.printAndWait(`「嗯啊啊…为…为什么会有奇，奇怪的感觉！」`); // :850
      kojo.爱抚 = 3; // :850-851
    } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)) {
      // それ以外
      await era.printAndWait(`「一，一点舒服的感觉都没有…嗯啊…啊啊！」`); // :854
      if (rand_n(2)) {
        await era.printAndWait(`「别，别碰我…嗯啊啊！」`); // :856
      }
      kojo.爱抚 = 2; // :856-857
    }
    return 0; // :856-859 隐式（原作 RETURN 0）
  }

  // :866-947 IF SELECTCOM == 1（舔阴 CFLAG:302）
  if (era_flag.selectcom === 1) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    // :868-893 初めて（CFLAG:302 == 0）
    if (kojo.舔阴 === 0) {
      if (virgin) {
        if (assi_mao) {
          await era.printAndWait(
            `『啊呀、姐姐的蜜穴真好看…咦，还没有被魔王疼爱过这里吗？』`,
          ); // :873
          await era.printAndWait(`「住手……停下…快停下啊…哈啊…啊啊啊！」`); // :874
          await era.printAndWait(`『不好好回答的话，我就继续舔啦？ 啦啦啦♪』`); // :875
        } else {
          await era.printAndWait(
            `「住手……停下…快停下啊…那里是小便的地方啊！」`,
          ); // :877
          await era.printAndWait(
            `处女的纯洁，甘甜的气味涌入${player_name}的鼻子中，一阵发痒。`,
          ); // :878
          await era.printAndWait(
            `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
          ); // :879-881
        }
      } else if (assi_mao) {
        await era.printAndWait(
          `『啊呀、姐姐的蜜穴真好看…哟哟，好像已经被侵犯过了？』`,
        ); // :885
        await era.printAndWait(
          `「啊啊……快住手啊……那里已经……已经变脏了！不能舔那里啊……！」`,
        ); // :886
      } else {
        await era.printAndWait(
          `「住，住手啊！不要啊！那里……那里是已经被玷污的肮脏地方啊！」`,
        ); // :888
        await era.printAndWait(
          `${target_name}羞耻万分，拼命扭动着身体想要躲避。而${player_name}秉承着“性奴的蜜穴必须以最严格的方式调教”的使命感、按着${target_name}的腰，从阴蒂到阴唇的每一处都仔细地舔舐着………`,
        ); // :889-891
      }
      kojo.舔阴 = 1; // :890-893
      return 0;
    }

    // :895-946 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『哎呀，姐姐的蜜穴和豆豆都已经变得好敏感了呢…这么一舔就全湿透了……嘻嘻♪』`,
        ); // :900
        await era.printAndWait(
          `「啊啊……嗯啊……是，是啊，姐姐的小穴已经……这么淫荡了呢……啊啊，就是这里${heart(1)}」`,
        ); // :901
        const lick_line_1 = rand_n(2)
          ? '舔姐姐的这里，我也觉得很舒服哦'
          : '啊哈，姐姐感觉很舒服吧♪';
        await era.printAndWait(`『${lick_line_1}${heart(1)}』`); // :902
        kojo.舔阴 = 5; // :903
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐的这里，真是美味呢…呼呼…怎么魔王大人的味道也混在里面啊？』`,
        ); // :906
        await era.printAndWait(
          `「嗯啊…哪…哪有这种事……舌头…太深入了…啊啊啊！」`,
        ); // :907
        const lick_line_2 = rand_n(2)
          ? '姐姐的爱液都从蜜穴里流进妹妹嘴里了哦。'
          : '姐姐已经有感觉了呀，很舒服吧♪';
        await era.printAndWait(`『${lick_line_2} 我继续开动了哦♪』`); // :908
        await era.printAndWait(
          `${target_name}在${player_name}的舌尖下，不住地娇喘着………`,
        ); // :909
        kojo.舔阴 = 4; // :910
      } else {
        // それ以外（CFLAG:302 不推进——源作原样，助手玛奥臂唯一无写点档）
        const lick_line_3 = rand_n(2)
          ? '姐姐感觉舒服吗？'
          : '姐姐觉得我舔得舒服吗？♪';
        await era.printAndWait(`『${lick_line_3} 不回答的话我就再深入了哦♪』`); // :913
        await era.printAndWait(`「不，不要啊、快停止…停止啊…嗯啊啊啊！」`); // :914
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啦啦……魔王大人居然像狗一样舔着我的蜜穴……小母狗${target_name}真是三生有幸啊……嗯啊啊……太舒服了……」`,
      ); // :918
      await era.printAndWait(
        `${target_name}主动岔开了双腿，蜜穴和阴蒂在${player_name}舌头灵巧地舔弄下，已经有了明显的快感。`,
      ); // :919
      await era.printAndWait(
        `「嗯啊啊…再……魔王大人……再深入一点${heart(1)} 啊啊…要，要去了……嗯啊啊${heart(1)}」`,
      ); // :920
      kojo.舔阴 = 5; // :920-921
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊…嗯啊啊…不要啦，魔王大人…那，那里好脏的…啊啊啊${heart(1)}」`,
      ); // :924
      await era.printAndWait(
        `虽然这么说着，${target_name}却不自觉地用双手将${player_name}继续按在自己张开的双腿之间。`,
      ); // :925
      await era.printAndWait(
        `「被……被魔王大人舔得……好有感觉，好舒服，啊啊啊${heart(1)}」`,
      ); // :926
      kojo.舔阴 = 4; // :926-927
    } else if (mark(2) === 3 && (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「嗯啊…呜呜…不…不要啊……嗯啊啊」`); // :930
      await era.printAndWait(
        `${target_name}任由${player_name}舔舐着自己的蜜穴和阴蒂，已经完全放弃了抵抗，且似乎已经有了微微的快感。`,
      ); // :931
      await era.printAndWait(
        `只能拼命忍耐着，蜜穴时不时因为快意微微颤动起来………`,
      ); // :932
      kojo.舔阴 = 3; // :933-934
    } else if (
      mark(3) >= 1 &&
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)
    ) {
      // 反抗刻印Lv1以上（且屈服刻印Lv2以下）
      await era.printAndWait(
        `「居……居然像狗一样舔着下面……你这个人……一点尊严都不要的吗……嗯啊啊」`,
      ); // :936
      await era.printAndWait(
        `${target_name}拼命扭着身子逃避着，但是双腿却被${player_name}强行分开，脸埋在其中舔舐着蜜穴和阴蒂`,
      ); // :937
      kojo.舔阴 = 2; // :938-939
    } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(
        `「说，说了那里是尿尿的地方啊！肮脏！不洁！不要舔啊啊啊！」`,
      ); // :941
      await era.printAndWait(
        `${target_name}拼命扭动着身体想要逃避，却被${player_name}紧紧按着分开的双腿，借着唾液的润滑，在蜜穴和阴蒂处来回舔舐着………`,
      ); // :942
      kojo.舔阴 = 2; // :943-949
    }
    return 0; // :943-949 隐式（原作 RETURN 0）
  }

  // :952-1043 IF SELECTCOM == 2（肛门爱抚 CFLAG:303）
  if (era_flag.selectcom === 2) {
    // :954-965 初めて（CFLAG:303 == 0）
    if (kojo.肛门爱抚 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『魔王大人特别喜欢调教我们的肛门哦，让妹妹来先帮姐姐的屁股做好准备吧♪』`,
        ); // :957
        await era.printAndWait(`「不，不要啊！那个部位……太脏了啊啊！」`); // :958
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        ); // :959-960
      } else {
        await era.printAndWait(
          `「你……你在碰哪里！？不要啊，那种地方不可以的！」`,
        ); // :961
        await era.printAndWait(
          `${target_name}的肛门别${player_name}毫不留情地用手指玩弄着，发出了一阵阵悲鸣………`,
        ); // :962-963
      }
      kojo.肛门爱抚 = 1; // :964 CFLAG:TARGET:303 = 1（TARGET 即 target，二段三段等价）
      return 0;
    }

    // :967-1041 二回目以降
    const p = chara(target).train.润滑 + chara(target).train.润滑增量; // :968 P = PALAM:3 + UP:3
    if (
      era.get(`talent:${target}:76`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哇哇，姐姐的肛门已经变得超色情了呢♪　魔王大人你看，姐姐的这里已经是名器了呢${heart(1)}』`,
        ); // :973
        await era.printAndWait(
          `「嗯啊啊…要…要去了……屁股${heart(1)} 继…继续，不要停${heart(1)}」`,
        ); // :974
        await era.printAndWait(
          `『好像已经舒服到听不清我在说什么了。姐姐被玩弄肛门时的表情，一脸幸福啊${heart(1)}』`,
        ); // :975
        await era.printAndWait(
          `${player_name}舔着嘴唇，继续用手指抽插，玩弄着${target_name}的肛门………`,
        ); // :976
      } else {
        await era.printAndWait(
          `「哈啊！啊啊${heart(1)} 好…好舒服，屁股好舒服…${heart(1)}」`,
        ); // :978
        await era.printAndWait(
          `${target_name}流着口水，娇喘着，肛门一张一合地享受着被${player_name}的手指玩弄肛门的连绵快感。`,
        ); // :979
        await era.printAndWait(
          `「嗯啊啊……屁……屁股…光是被手指……就弄得快要去了${heart(1)}」`,
        ); // :980
      }
      kojo.肛门爱抚 = 7; // :982
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐、屁股还没湿透就把手指插进去，感觉是不是很痛呀？』`,
        ); // :986
        await era.printAndWait(
          `「呃啊啊…明明就是故，故意的！就不能稍微温柔一点嘛？」`,
        ); // :987
        await era.printAndWait(
          `『不过姐姐的肛门还是已经感觉到快感了对吧？看，都开始一张一合的了♪』`,
        ); // :988
        await era.printAndWait(
          `${target_name}一边抱怨着，一边却无比享受着${player_name}对肛门的玩弄和连绵的快感………`,
        ); // :989
      } else {
        await era.printAndWait(
          `「真，真是的！屁股都还没湿透就这么把手指插进来……啊别…别停下呀…嗯啊啊啊！」`,
        ); // :991
        await era.printAndWait(
          `${target_name}的肛门很快被爱液浸透，开始因为连绵的快感而一张一合着………`,
        ); // :992
      }
      kojo.肛门爱抚 = 6; // :994
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀，姐姐的肛门已经这么敏感地张开了呀…看来已经被魔王大人好好调教，疼爱过了呢…』`,
        ); // :998
        await era.printAndWait(
          `「嗯啊啊…哈啊！因……因为姐姐的肛门，是属于魔王大人的…玩具啊啊${heart(1)}」`,
        ); // :999
        await era.printAndWait(
          `${target_name}不住地娇喘着，感受着被${player_name}玩弄肛门带来的连绵快感。真是一对要好的姐妹呢………`,
        ); // :1000
      } else {
        await era.printAndWait(
          `「嗯啊啊……屁股……好舒服，好快乐${heart(1)}… ${target_name}是魔王大人的肛门性奴……请……请继续调教，侵犯${target_name}的肛门吧，魔王大人！」`,
        ); // :1002
        await era.printAndWait(
          `${target_name}尽情享受着肛门的快感，摇晃着光洁的臀部诱惑着${player_name}………`,
        ); // :1003
      }
      kojo.肛门爱抚 = 5; // :1005
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      p < PALAMLV[2] &&
      (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕+润滑Lv2未満
      if (assi_mao) {
        await era.printAndWait(
          `『嘿嘿嘿…姐姐的肛门已经被魔王大人充分调教过了的样子呢♪』`,
        ); // :1009
        await era.printAndWait(`「等……等等！润滑……还不够…嗯啊…啊啊啊！」`); // :1010
        await era.printAndWait(
          `${player_name}用舌头稍微做了一下润湿，然后又继续开始用手指玩弄，抽插着${target_name}的肛门………`,
        ); // :1011
      } else {
        await era.printAndWait(`「啊啊…魔，魔王大人……请稍微……再温柔一点！」`); // :1013
        await era.printAndWait(
          `${target_name}发出痛苦交杂着喜悦的呻吟，感受着${player_name}对肛门的爱抚………`,
        ); // :1014
      }
      kojo.肛门爱抚 = 4; // :1016
    } else if (
      p >= PALAMLV[2] &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 润滑Lv2以上+A感覚Lv3以上
      if (assi_mao) {
        await era.printAndWait(
          `『哎呀呀、姐姐的肛门，这么摸一下就舒服地张开了，还一扭一扭地吸着妹妹的手指呢。魔王大人快看呀♪』`,
        ); // :1020
        await era.printAndWait(
          `「讨…讨厌啊啊！停手，快停手啊！嗯啊啊…才没有感到…舒服！」`,
        ); // :1021
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        ); // :1022
        await era.printAndWait(
          `『看起来姐姐很快就可以当上魔王大人的肛门性奴了呢♪』`,
        ); // :1023
      } else {
        await era.printAndWait(
          `「停…停手啊！不…不可以这样…哈啊……嗯啊啊……屁股……为什么这么舒服！」`,
        ); // :1025
        await era.printAndWait(
          `${player_name}玩弄着${target_name}已经被充分调教开发的肛门，连绵的快感让${target_name}忍不住开始娇喘……`,
        ); // :1026-1027
      }
      kojo.肛门爱抚 = 3; // :1028
    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満；CFLAG:223 首次耻情Lv2）
      if (assi_mao) {
        await era.printAndWait(
          `『还是太紧了呢，不过没关系，我会把姐姐的这里开发成名器的♪』`,
        ); // :1032
        await era.printAndWait(`「住，住手啊、好痛…真的好痛啊啊！」`); // :1033
        await era.printAndWait(
          `${player_name}舔着舌头，坏笑着继续用手指来回抠弄着${target_name}的肛门………`,
        ); // :1034
      } else {
        await era.printAndWait(`「住手！好痛啊…求求你！」`); // :1036
        await era.printAndWait(
          `${target_name}泪流满面地忍耐着${player_name}对肛门的爱抚调教………`,
        ); // :1037
      }
      kojo.肛门爱抚 = 2; // :1039
    }
    return 0; // :1039-1042 隐式（原作 RETURN 0）
  }

  // :1048-1198 IF SELECTCOM == 3（自慰 CFLAG:304）
  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      // :1049-1062 初めて（CFLAG:304 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐自慰要更认真一点啊，还要告诉我你以前在家都是想着谁，怎么摸的。我可是每次都听见了的哦。』`,
        ); // :1053
        await era.printAndWait(
          `「不，不要说那样的谎话！才没，没有那种事！呜呜呜……」`,
        ); // :1054
        await era.printAndWait(
          `${target_name}在妹妹的命令下，继续屈辱地自慰着………`,
        ); // :1055
      } else {
        await era.printAndWait(
          `「开，开什么玩笑…为什么要我做……这种事情…呜呜呜…」`,
        ); // :1057
        await era.printAndWait(
          `${target_name}在${player_name}的命令下不得不开始自慰、屈辱的泪水从脸颊纵流而下。`,
        ); // :1058
        await era.printAndWait(`「什么…？还，还要继续？呜呜呜……谁来救救我？」`); // :1059
      }
      kojo.自慰 = 1; // :1061
      return 0; // :1061-1062
    }

    // :1066-1195 二回目以降
    if (assi_mao) {
      // 助手玛奥：内部淫乱/爱慕/それ以外三选（それ以外无写点，与非助手支各自独立分档）
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (era.get(`talent:${target}:0`) === 1) {
          // 处女
          await era.printAndWait(
            `『啊咧？姐姐的身体都这么色情了，居然还是处女？…』`,
          ); // :1071
          await era.printAndWait(`「那，那有什么不好的…恩恩啊…哈啊…嗯啊啊…」`); // :1072
          await era.printAndWait(
            `『爱液流了这么多出来，难道正在幻想着被魔王的肉棒狠狠地疼爱吗？』`,
          ); // :1073
          await era.printAndWait(
            `「笨蛋！不要说出来嘛…嗯啊…啊啊啊啊，魔王大人，${target_name}要去了${heart(1)}」`,
          ); // :1074
        } else {
          await era.printAndWait(
            `『姐姐这么激烈地同时自慰前后两边，好厉害啊…』`,
          ); // :1076
          await era.printAndWait(
            `「嗯啊啊…啊啊…在魔王大人和${player_name}的注视下…手淫…比平时…更加有快感啊${heart(1)}」`,
          ); // :1077
          await era.printAndWait(
            `『啊哈、我已经看出来了…姐姐是个喜欢自慰时被人看着的变态啊♪』`,
          ); // :1078
          await era.printAndWait(
            `「是啊…姐姐是变态色情狂…啊啊…嗯啊啊……好好欣赏姐姐被人看着自慰到高潮的样子吧${heart(1)}」`,
          ); // :1079
        }
        kojo.自慰 = 7; // :1081
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (era.get(`talent:${target}:0`) === 1) {
          // 处女
          await era.print(
            `『咦，姐姐居然还是处女？难道魔王大人不喜欢姐姐的这里吗？』`,
          ); // :1086
          await era.printAndWait(
            `「哪……哪有那样的事……是魔王大人珍…珍惜姐姐的处女之身…所以才……嗯啊啊」`,
          ); // :1087
          await era.printAndWait(
            `${target_name}岔开双腿，弓着腰，在妹妹的命令下进行着自慰，脸上的表情带着些许屈辱，又不可自拔地沉浸在快感中。`,
          ); // :1088
          await era.print(
            `「我说的没错吧魔王大人…但是…啊恩…什么时候…才能…真正疼爱我呢${heart(1)}」`,
          ); // :1089
          await era.printAndWait(
            `（『魔王大人，真正的原因是什么呢？』）${player_name}悄悄和你耳语着。`,
          ); // :1090
        } else {
          await era.printAndWait(
            `『哎呀呀，姐姐这么热情地自慰着，是希望一会儿能够得到魔王大人的疼爱吗？』`,
          ); // :1092
          await era.printAndWait(`「啊…啊……这不是你…你命令的吗……嗯啊啊！」`); // :1093
          await era.printAndWait(
            `『啊呀，我这一说，你就湿成这样了、爱液都喷到我身上了。你一定是边想着蜜穴被魔王大人狠狠地侵犯边自慰吧。姐姐真的完全变成魔王大人的性奴了呢…』`,
          ); // :1094
          await era.printAndWait(
            `${target_name}被${player_name}的话羞得脸红到了耳根，然而自慰的动作却一刻也没有放缓………`,
          ); // :1095
        }
        kojo.自慰 = 5; // :1097
      } else {
        // それ以外
        await era.print(
          `『哎呀呀，姐姐自慰的样子真下流，看得人家都兴奋起来了啊…♪』`,
        ); // :1100
        await era.printAndWait(`「不要看，不要看啊…太羞耻了…嗯啊……啊啊！」`); // :1101
        await era.print(
          `『姐姐再敢把腿夹起来还说这种话，我就让魔王大人把所有部下都叫过来一起来围观姐姐自慰了哦♪』`,
        ); // :1102
        await era.printAndWait(
          `「不，不要！对不起…对不起…原谅姐姐吧…求求你…！」`,
        ); // :1103
        await era.printAndWait(
          `${target_name}不敢忤逆${player_name}的命令，泪流满面地继续再度张开双腿，在妹妹面前自慰着………`,
        ); // :1104-1105（それ以外无 CFLAG:304 推进，源作原样）
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋处女
      await era.printAndWait(
        `「魔王大人为什么还不肯要了我的处子身呢，嫌弃我吗？…要是太过分的话，我会做什么可就不知道了哦？」`,
      ); // :1108
      await era.printAndWait(
        `「嗯啊…哈啊…为什么……嗯呀啊${heart(1)} 总是让我自己玩自己！嗯啊啊啊${heart(1)}」`,
      ); // :1109
      await era.printAndWait(
        `${target_name}故意张开双腿，挑逗似的在${player_name}动作夸张地自慰着………`,
      ); // :1110
      kojo.自慰 = 9; // :1111
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)} 自慰…真是世界上最棒的事了…啊哈啊…好想…被更多人视奸啊${heart(1)}」`,
        ); // :1116
        await era.printAndWait(
          `已经完全沦为自慰狂的${target_name}在${player_name}面前弓着身子，挺起腰不断忘我地自慰着前后两穴。`,
        ); // :1117
        await era.printAndWait(
          `「啊啊嗯${heart(1)} 淫液要喷出来了…啊啊……嗯啊啊啊${heart(1)}」`,
        ); // :1118
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「哎呀哎呀…要人家这个姿势来自慰…真，真是变态呢${heart(1)}」`,
        ); // :1120
        await era.printAndWait(
          `${target_name}按着${player_name}的命令后仰着弓起腰身、分开双腿，在${player_name}的注视下开始自慰。`,
        ); // :1121
        await era.printAndWait(
          `「吖吖${heart(1)}…哈啊…啊啊啊…感觉好棒…嗯啊啊…要去了${heart(1)} 嗯啊啊啊${heart(1)}」`,
        ); // :1122
      } else {
        await era.printAndWait(
          `「啊哈啊啊…这么想要看我手淫吗…啊啊${heart(1)} 真是受不了你啊…嗯啊啊…哈啊…啊啊${heart(1)}」`,
        ); // :1124
        await era.printAndWait(
          `${target_name}当着${player_name}面，两只手同时忘我地自慰着蜜穴和肛门。爱液飞洒到了床上，地板上、空气中弥散着淫靡的味道。`,
        ); // :1125
        await era.printAndWait(
          `「现在看的满意了吗…恩恩啊${heart(1)} 啊啊快感更强了${heart(1)} 要去了…舒服得要去了${heart(1)}」`,
        ); // :1126
      }
      kojo.自慰 = 8; // :1128
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「真是的……明明知道……自慰什么的根本满足不了我的欲火、还让我做这种……嗯啊啊！」`,
        ); // :1133
        await era.printAndWait(
          `${target_name}露出委屈的表情，在${player_name}的命令下，开始自慰。`,
        ); // :1134
        await era.printAndWait(
          `「啊哈啊…已经…全湿透了${heart(1)} 为什么魔王大人不肯亲自${heart(1)}…真是的…嗯啊啊！」`,
        ); // :1135
      } else {
        await era.printAndWait(
          `「嗯啊啊……就让我把宝贵的高潮这样浪费在自慰中……魔王大人真是残忍呢…嗯啊啊……哈啊${heart(1)}」`,
        ); // :1137
        await era.printAndWait(
          `${target_name}的自慰完全无法满足欲火、却又无可奈何，只能又爱又恨地瞪着${player_name}。`,
        ); // :1138
        await era.printAndWait(
          `「不过话说回来…这样看着你的脸…哈啊…好像更有快感一些…啊恩啊啊${heart(1)}」`,
        ); // :1139
      }
      kojo.自慰 = 7; // :1141-1142
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋处女
      await era.printAndWait(
        `「哈啊…哈啊…魔王大人……什么时候才，才会要走我的处子身…啊嗯啊啊${heart(1)}」`,
      ); // :1144
      await era.printAndWait(
        `${target_name}在${player_name}的面前，挑逗地张开双腿，持续自慰着。`,
      ); // :1145
      await era.printAndWait(`（明明人家早就已经准备好了…呜！）`); // :1146
      await era.printAndWait(
        `尽管已经知道了${target_name}的想法、${player_name}还是尽情欣赏，享受着${target_name}的自慰秀………`,
      ); // :1147
      kojo.自慰 = 6; // :1148
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「嗯啊啊${heart(1)}…哈啊…实在…太害羞了…但是手指…就是停不下来…啊啊啊魔王大人…人家这个姿势可以吗${heart(1)}」`,
        ); // :1153
        await era.printAndWait(
          `${target_name}的口中轻吐着娇喘，一边不住地自慰着………`,
        ); // :1154
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「${target_name}好…高兴在魔王大人命令下自慰啊${heart(1)} 嗯啊啊…嗯啊…好舒服啊${heart(1)}」`,
        ); // :1156
        await era.printAndWait(
          `${target_name}在${player_name}炽热的目光注视下，忘我地自慰着………`,
        ); // :1157
      } else {
        await era.printAndWait(
          `「嗯啊…嗯啊啊…哈啊${heart(1)} 手指…完全停不下来…不，不许看、不许看…人家要……要去了${heart(1)}」`,
        ); // :1159
        await era.printAndWait(
          `${target_name}沉浸在自慰带来的连绵快感中，连口水都流了出来………`,
        ); // :1160
      }
      kojo.自慰 = 5; // :1162-1163
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).train.自慰中毒 < 3 &&
      (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3未満
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「如果是魔王大人的命令的话…！再羞耻的事我也，我也愿意…哈啊…嗯啊啊${heart(1)}」`,
        ); // :1167
        await era.printAndWait(
          `${target_name}脸红耳赤地用手指爱抚着自己得下体、在${player_name}的注视下慢慢展开身体，开始自慰………`,
        ); // :1168
      } else {
        await era.printAndWait(
          `「太，太羞耻了…但如果魔王大人想要看的话…嗯啊…哈啊……嗯啊啊！」`,
        ); // :1170
        await era.printAndWait(
          `${target_name}双眼因为羞耻而微微湿润，在${player_name}的炽热目光下开始了自慰………`,
        ); // :1171
      }
      kojo.自慰 = 4; // :1173
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「讨厌，不要看啊…不要看我的脸啊…嗯啊…嗯啊啊！」`,
        ); // :1178
        await era.printAndWait(
          `${target_name}屈辱地躲避着${player_name}的视线，自慰着下体的手指却不自觉地动得更激烈了………`,
        ); // :1179
      } else {
        await era.printAndWait(
          `「哈啊…哈啊…可…可以停下来了吗？…啊啊，我知道了，我会继续的，我会继续的！嗯啊 啊」`,
        ); // :1181
        await era.printAndWait(
          `${target_name}屈服于${player_name}的命令，持续进行着自慰，却微微浮现了沉浸期其间的表情………`,
        ); // :1182
      }
      kojo.自慰 = 3; // :1184
    } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、自慰中毒Lv1未満）
      if (rand_n(2) === 0) {
        await era.printAndWait(`「为什么…要我做这样羞耻的事…嗯啊…哈啊」`); // :1189
      } else {
        await era.printAndWait(`「饶了我吧，求求你了…！」`); // :1191
      }
      await era.printAndWait(
        `${target_name}的脸一直红到了耳根，在极度的羞愧中开始自慰………`,
      ); // :1193
      kojo.自慰 = 2; // :1194
    }
    return 0; // :1194-1196 隐式（原作 RETURN 0）
  }

  // :1203-1278 IF SELECTCOM == 5（胸爱抚 CFLAG:306）
  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      // :1204-1217 初めて（CFLAG:306 == 0）
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的胸部比以前在村子里的时候更大了呢？』`,
        ); // :1208
        await era.printAndWait(
          `「才，才没有那种事呢！不要揉得那么用力！会痛的啊啊！」`,
        ); // :1209
        await era.printAndWait(
          `『呵呵，手感都不一样了，分明在撒谎！撒谎就要惩罚♪』`,
        ); // :1210
        await era.printAndWait(
          `粉红色的乳头被妹妹用力拧着，${target_name}不住地哀鸣………`,
        ); // :1211
      } else {
        await era.printAndWait(`「啊啊！不要揉得那么用力啊…好痛，好痛！」`); // :1213
        await era.printAndWait(
          `${target_name}哀鸣着想从${player_name}魔掌下逃脱、却被${player_name}紧紧压住，丰满双乳的调教还在继续………`,
        ); // :1214
      }
      kojo.胸爱抚 = 1; // :1214-1216
      return 0; // :1214-1217
    }

    // :1220-1275 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『姐姐的乳头轻轻摸舔一下就变得这么色情了、啊啊真好，我也想有这样色情的乳头让魔王大人玩弄${heart(1)}』`,
        ); // :1224
        await era.printAndWait(
          `${player_name}边笑着边继续玩弄着姐姐高耸饱满的双峰和因为快感而挺立着的乳头。感受着从乳头传来的连绵的快意，${target_name}从喉咙底发出一阵阵淫乱不堪的声音。。`,
        ); // :1225
        await era.printAndWait(
          `「啊哈…嗯啊啊啊${heart(1)} 姐姐跟你说${heart(1)} 多让魔王大人调教你的胸部，很快妹妹的乳头就会变得和姐姐一样色情了${heart(1)}」`,
        ); // :1226
        await era.printAndWait(
          `『啊哈太好了♪　然后就可以姐妹两人并排挺起色情的胸部，让魔王大人用乳环和链子把我们的乳头穿起来，牵着我们在地上爬${heart(1)}』`,
        ); // :1227
        kojo.胸爱抚 = 5; // :1228
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `『哎呀，姐姐乳房好像经常被魔王大人玩到高潮哟♪　咯咯咯』`,
        ); // :1231
        await era.printAndWait(
          `${player_name}露出坏笑，对着${target_name}挺起的乳头又摸又舔，还含进嘴里吸吮着。`,
        ); // :1232
        await era.printAndWait(
          `「呃啊啊！就…就是这样…姐姐的胸部…是属于魔王大人…性玩具${heart(1)}」`,
        ); // :1233
        await era.printAndWait(
          `『那这次，就由妹妹来让姐姐的乳房高潮吧${heart(1)} 嘻嘻嘻，我继续享用姐姐的乳头了${heart(1)}』`,
        ); // :1234
        await era.printAndWait(
          `「啊啊啊，别…别让…魔王大人看见……姐姐这个样子！拜…托了！嗯啊啊${heart(1)}」`,
        ); // :1235
        kojo.胸爱抚 = 4; // :1236
      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上
        await era.printAndWait(
          `『哎呀呀，姐姐的胸部变得好厉害，乳头挺得这么直…』`,
        ); // :1239
        await era.printAndWait(
          `${player_name}用手指捏着${target_name}两边的乳头，不断搓柔着，不时含进嘴里吸吮，听着${target_name}因为快感而止不住地娇喘着。`,
        ); // :1240
        await era.printAndWait(
          `「哈啊…嗯啊啊…不要再玩…啊啊…姐姐的乳头了…不然姐姐要…哈啊…要生气了！」`,
        ); // :1241
        await era.printAndWait(
          `『原来姐姐的弱点是乳头哦，再不用害怕姐姐生气了♪』`,
        ); // :1242
        kojo.胸爱抚 = 3; // :1243
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、B感覚Lv3未満）
        await era.printAndWait(`『哎呀，姐姐不喜欢被我这样玩弄胸部吗？』`); // :1246
        await era.printAndWait(
          `${target_name}被${player_name}肆意，甚至是恶意地玩弄着双乳和乳头，又无能反抗，只能拼命忍耐着。`,
        ); // :1247
        await era.printAndWait(
          `「被…被你这样玩，一点舒服的感觉……都没有！啊啊啊！」`,
        ); // :1248
        kojo.胸爱抚 = 2; // :1249
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「我的胸部会变得这么色情…哈啊${heart(1)} 都，都是你的责任${heart(1)} 哈啊，嗯啊啊${heart(1)}」`,
      ); // :1253
      await era.printAndWait(
        `${target_name}被彻底开发，调教的双乳被${player_name}捏在手中肆意玩弄着，舌尖和指尖来回拨弄着挺立的乳头。`,
      ); // :1254
      await era.printAndWait(
        `「嗯啊啊…魔王大人${heart(1)} 请再…粗暴一点…欺负我这对淫荡的巨乳和乳头吧${heart(1)}」`,
      ); // :1255
      const moan_word = rand_n(2) ? '继续、继续' : '去了、要去了';
      await era.printAndWait(
        `${target_name}似乎已经被快感弄得完全无法思考了，只是一味地浪叫着，口水不住地从嘴角流出「${moan_word}」………`,
      ); // :1256
      kojo.胸爱抚 = 5; // :1256-1257
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔王大人…哈啊…这个样子…真是像爱撒娇的孩子一样！嗯啊啊${heart(1)}」`,
      ); // :1260
      await era.printAndWait(
        `${target_name}抱着正把头埋在自己丰满双峰之间，吸吮着乳头的${player_name}，发出一阵阵幸福的娇喘，`,
      ); // :1261
      await era.printAndWait(
        `「嗯啊啊…嗯啊${heart(1)} 继续…魔王大人…哈啊嗯呃${heart(1)}」`,
      ); // :1262
      kojo.胸爱抚 = 4; // :1262-1263
    } else if (
      chara(target).system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // B感覚Lv3以上
      await era.printAndWait(
        `「嗯啊啊…不，不要这么用力的玩我的…胸部…乳头才不是，不是因为舒服才挺起来的、你，你可不要误会了……嗯呜呜」`,
      ); // :1266
      await era.printAndWait(
        `${target_name}已经被充分调教过的乳房很快就有了快感，只能紧抓着床单，拼命遏制自己的呻吟。`,
      ); // :1267
      await era.printAndWait(`「好，好难为情…呼哈…快…快停下啦…嗯啊啊！」`); // :1268
      kojo.胸爱抚 = 3; // :1268-1269
    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、B感覚Lv3未満）
      await era.printAndWait(`「无论你怎么弄，我，我也不会感觉舒服的…啊呒」`); // :1272
      await era.printAndWait(
        `面对${player_name}对自己乳房的爱抚、${target_name}只是双眼紧闭，咬紧牙关，默默忍受着………`,
      ); // :1273
      kojo.胸爱抚 = 2; // :1273-1274
    }
    return 0; // :1273-1276 隐式（原作 RETURN 0）
  }

  // :1283-1433 IF SELECTCOM == 6（接吻 CFLAG:307）
  if (era_flag.selectcom === 6) {
    // :1285-1328 ファーストキス（CFLAG:307 == 0 && TFLAG:13）
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 淫乱かつ主人
        await era.printAndWait(
          `「呣呣…呣呒…魔王大人…魔王大人…呣啾啾${heart(1)}」`,
        ); // :1288
        await era.printAndWait(
          `${target_name}一脸沉醉的表情，与${player_name}激吻着，舌头互相缠绕，交换、品尝着彼此的唾液。`,
        ); // :1289
        await era.printAndWait(
          `「呣呣…呣…我的初吻${heart(1)} 尝起来味道怎么样啊…${heart(1)}」`,
        ); // :1290
        await era.printAndWait(
          `${target_name}的双瞳里透着情欲的光芒，凝视着${player_name}，又投入新一轮激吻中………`,
        ); // :1291
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 爱慕かつ主人
        await era.printAndWait(`「呣呣呣呒…魔王大人？？呣啾啾${heart(1)}」`); // :1294
        await era.printAndWait(
          `${target_name}的初吻被${player_name}夺走时，露出了惊讶的表情，但这惊讶随即变成了惊喜，然后是沉醉。`,
        ); // :1295
        await era.printAndWait(
          `「呣呣…啾啾${heart(1)} 我的初吻属于您了魔王大人…嗯哈…呣呣${heart(1)}」`,
        ); // :1296
        await era.printAndWait(
          `${target_name}带着如梦似幻的陶醉表情，继续品尝着${player_name}的吻………`,
        ); // :1297
      } else if (assi_mao) {
        // それ以外 → 助手玛奥
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`); // :1304
          await era.printAndWait(`「呣呣呣、接吻舒服吧？这可是我的初吻哦…」`); // :1305
          await era.printAndWait(
            `『是真的吗姐姐，那我可太高兴了♪ 呣呣呣…姐姐的舌头…伸进来了…呣呣呣呒♪』`,
          ); // :1306
          await era.printAndWait(
            `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚，对两人亲生姐妹的身份没有丝毫顾忌。`,
          ); // :1307
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`); // :1310
          await era.printAndWait(
            `「本来是想把初吻奉献给魔王大人的………（不过${player_name}的话也不是不行）」`,
          ); // :1311
          await era.printAndWait(
            `『啊？姐姐还没和魔王大人……？为什么呢，姐姐？』`,
          ); // :1312
          await era.printAndWait(`「不，没什么。我们继续吧…呣呣呣…呣啾啾♪」`); // :1313
          await era.printAndWait(
            `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
          ); // :1314
        } else {
          // それ以外
          await era.printAndWait(
            `${player_name}刚刚把自己的嘴唇从${target_name}的唇上挪开，却猛然发现${target_name}正在不住地哭泣着。`,
          ); // :1317
          await era.printAndWait(
            `『啊咧…姐姐为什么在哭呢？难道…那是姐姐的初吻？哎呀呀，初吻给亲妹妹不是更好吗，姐妹相爱最棒了♪』`,
          ); // :1318
          await era.printAndWait(`「这…这种不伦的事情…呜呜呜…」`); // :1319
          await era.printAndWait(
            `${player_name}笑着安慰着她，但${target_name}只是哭得更伤心了………`,
          ); // :1320
        }
      } else {
        // それ以外 → 非助手玛奥
        await era.printAndWait(`「我，我的…初吻…呜呜…呜呜呜…」`); // :1323
        await era.printAndWait(
          `${target_name}正像一个纯洁到不经人事的乡下姑娘一样，为自己失去的初吻而潸然泪下，………`,
        ); // :1324
      }
      kojo.接吻 = 1; // :1324-1327
      return 0; // :1328-1331
    }

    // :1330-1374 （調教では）初めて（CFLAG:307 == 0，非首吻）
    if (kojo.接吻 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(`『最喜欢姐姐了♪』`); // :1335
          await era.printAndWait(
            `「啊啊，我也最喜欢妹妹你了…呣呣呣…啾啾…舌头，再伸进来一些${heart(1)}」`,
          ); // :1336
          await era.printAndWait(
            `${target_name}与${player_name}无比热烈地拥吻着，吸吮着彼此交缠的舌头。像这样的事情，在她们还生活在村子里时，恐怕连想都是不敢想的吧。`,
          ); // :1337
          await era.printAndWait(
            `直到嘴唇依依不舍地分开，流淌在两人的嘴角上的唾液还粘连在一起………`,
          ); // :1338
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「不，不要啦，${player_name}…这种事…一点都不想做」`,
          ); // :1341
          await era.printAndWait(
            `『就是要，就是要。因为${player_name}我……最喜欢姐姐了♪』`,
          ); // :1342
          await era.printAndWait(
            `”最喜欢姐姐了”这句以前${player_name}经常用来调戏${target_name}的话，在这种别样的场合，却异常的有效。`,
          ); // :1343
          await era.printAndWait(
            `${target_name}眼中的抗拒立即消失得无影无踪，和${player_name}，唇对着唇开始亲吻，彼此舌头伸入对方的嘴中，相互交缠着。`,
          ); // :1344
          await era.printAndWait(`『呣呣呣…啾啾…姐姐，姐姐，最喜欢你了。』`); // :1345
        } else {
          // それ以外
          await era.printAndWait(`「不，不要啊…我们，是姐妹啊…！」`); // :1348
          await era.printAndWait(
            `『姐姐的口里说不要，但是嘴唇可没在反抗哦…呣呣呣…啾啾♪』`,
          ); // :1349
          await era.printAndWait(
            `${target_name}的手被${player_name}紧紧抓住，按在床上。如果是以前的，${target_name}大概轻易就可以挣脱，但如今……`,
          ); // :1350
          await era.printAndWait(
            `但是一心牵挂着${player_name}的${target_name}却没办法逃走，更无力反抗，任由${player_name}摆布着。`,
          ); // :1351
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「呣呣呣…呣呒…魔王大人嘴里的味道…真好${heart(1)}呣呣呣…」`,
        ); // :1356
        await era.printAndWait(
          `${target_name}带着一脸沉醉的表情与${player_name}激吻着，交缠的舌头分享，品尝着彼此的唾液。`,
        ); // :1357
        await era.printAndWait(
          `「哈啊…呣呒…魔王大人${heart(1)} 再吻得的激烈一点好吗…${heart(1)}」`,
        ); // :1358
        await era.printAndWait(
          `${target_name}注视着${player_name}的双瞳里透着情欲的光芒，抓着${player_name}的手伸向自己的股间………`,
        ); // :1359
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「唔？！呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`,
        ); // :1362
        await era.printAndWait(
          `${target_name}被${player_name}吻上的时候，露出了些许惊讶的表情，在反应过来后就立即沉醉于期间，回以更热烈的吻。`,
        ); // :1363
        await era.printAndWait(
          `「呣啾…呣啾${heart(1)} 魔王大人…我的唇…味道好吗${heart(1)}呣呣」`,
        ); // :1364
        await era.printAndWait(
          `${target_name}怀着梦幻般的愉悦心情，与${player_name}继续接吻着………`,
        ); // :1365
      } else {
        // それ以外
        await era.printAndWait(`「不，不要啊！放过我吧，求求你……呣呣呣…呣呒」`); // :1368
        await era.printAndWait(
          `${target_name}被${player_name}按住双手的手腕，强行吻在了唇上。`,
        ); // :1369
        await era.printAndWait(`${target_name}的眼泪已经夺眶而出………`); // :1370
      }
      kojo.接吻 = 1; // :1370-1373
      return 0; // :1373-1377
    }

    // :1376-1431 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？${heart(1)}」`,
        ); // :1381
        await era.printAndWait(
          `『啊啊，姐姐的接吻技术…太棒了！嗯呣…呣呣呣${heart(1)} 姐姐的舌头…${player_name}还想要更多…呣啾啾${heart(1)}』`,
        ); // :1382
        await era.printAndWait(
          `${target_name}和${player_name}无比淫靡的深吻着，边互相爱抚身体，对两人亲姐妹的关系没有丝毫顾忌。`,
        ); // :1383
        kojo.接吻 = 5; // :1383-1384
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`『姐姐，好喜欢你…最喜欢了♪』`); // :1387
        await era.printAndWait(
          `「啊啊、真的吗？…呣呣呣…呣嗯…姐姐好高兴${heart(1)}」`,
        ); // :1388
        await era.printAndWait(
          `${target_name}与${player_name}热烈地拥吻着，对两人亲生姐妹的身份没有丝毫顾忌。`,
        ); // :1389
        kojo.接吻 = 4; // :1389-1390
      } else if (
        chara(target).system.顺从 >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 従順Lv2以上
        await era.printAndWait(`『来、姐姐，来亲亲♪』`); // :1393
        await era.printAndWait(
          `「啊啊…好，好的，但这是最后一次了…呣呣呣…呣嗯…！」`,
        ); // :1394
        await era.printAndWait(
          `${target_name}与${player_name}手牵着手，亲吻着………`,
        ); // :1395
        kojo.接吻 = 3; // :1395-1396
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『姐姐、来接吻吧？』`); // :1399
        await era.printAndWait(`「不行啊、我们是姐妹啊…不可以——呣呣呣！」`); // :1400
        kojo.接吻 = 2; // :1400-1401
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道${heart(1)}」`,
      ); // :1406
      await era.printAndWait(
        `${target_name}带着陶醉的表情与${player_name}激吻着，舌头交缠，呼吸灼热。`,
      ); // :1407
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)}光是，呣呣，被魔王大人吻着…呣呣呣${heart(1)} 就好像要高潮了一样…${heart(1)}」`,
      ); // :1408
      await era.printAndWait(
        `${target_name}用炽烈的眼神与${player_name}四目相望，拉着${player_name}的手伸向自己已经湿透的股间………`,
      ); // :1409
      kojo.接吻 = 5; // :1409-1410
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「唔——呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`); // :1413
      await era.printAndWait(
        `${target_name}被${player_name}吻着，露出全然陶醉的幸福表情。`,
      ); // :1414
      await era.printAndWait(
        `「呣呣…呣啾啾${heart(1)} 魔王大人的吻…好喜欢…最喜欢了！呣呣…呣呒…想要，还想要${heart(1)}」`,
      ); // :1415
      await era.printAndWait(
        `在${target_name}的恳求下，${player_name}继续深吻着她………`,
      ); // :1416
      kojo.接吻 = 4; // :1416-1417
    } else if (
      chara(target).system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 従順Lv2以上
      await era.printAndWait(`「呣呣…呣嗯…哈啊，终，终于结束了吗…」`); // :1420
      await era.printAndWait(
        `看到${target_name}在擦拭着自己的嘴唇，${player_name}抓着了${target_name}的双手，再次强吻了上去。`,
      ); // :1421
      await era.printAndWait(`「呣呣…呣呒…！又……又来…呣恩恩…」`); // :1422
      kojo.接吻 = 3; // :1422-1423
    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「这样…就行了吧？可以…放我走了吗？」`); // :1426
      await era.printAndWait(
        `${target_name}用手背擦拭着自己的嘴唇，眼角流出了屈辱的泪水………`,
      ); // :1427
      kojo.接吻 = 2; // :1427-1428
    }
    return 0; // :1428-1431 隐式（原作 RETURN 0）
  }

  // :1438-1611 IF SELECTCOM == 7（自己扒开 CFLAG:308）
  if (era_flag.selectcom === 7) {
    const virgin = era.get(`talent:${target}:0`) === 1;
    // :1440-1496 初めて（CFLAG:308 == 0）
    if (kojo.自己扒开 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊啊…还是有点害羞呢${heart(1)} 为什么老是要这么欺负姐姐呢${heart(1)}」`,
          ); // :1445
          await era.printAndWait(
            `『哎呀，姐姐别找借口啦♪明明自己都湿成这个样子了』`,
          ); // :1446
          await era.printAndWait(
            `${target_name}遵循着妹妹的命令，摆出了淫荡的姿势和动作。`,
          ); // :1447
          await era.printAndWait(
            `完全堕入淫乱深渊的${target_name}为了取悦${player_name}，毫无廉耻地展示着蜜穴，并且自己也沉浸于别样的心理快感中。`,
          ); // :1448
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比的幸福吧………？`,
          ); // :1449
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(`「啊啊…这样真是…太羞耻、饶了姐姐吧…」`); // :1452
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪』`,
          ); // :1453
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出了无比羞耻的姿势和动作。`,
          ); // :1454
          await era.printAndWait(
            `已经听到过很多次，妹妹这样充满恶意地对姐姐下达着淫乱的命令了。`,
          ); // :1455
          await era.printAndWait(
            `两人已经再也变不回以前那种纯洁的姐妹关系了，但现在的她们，某种程度上说也是无比地幸福吧………？`,
          ); // :1456
        } else {
          // それ以外（爱慕無し）
          await era.printAndWait(
            `『哎呀，姐姐，在人家面前摆出这么淫荡的姿势，不觉得害羞吗？』`,
          ); // :1459
          await era.printAndWait(
            `「当，当然会觉得羞耻了…但是，但是不是你命令我这么做的吗…呜呜呜」`,
          ); // :1460
          await era.printAndWait(
            `『哎呀，原来姐姐是只要被命令，就什么淫荡下流的事情都可以做的变态呀。姐姐以前的形象，在我心里彻底破灭了呢。』`,
          ); // :1461
          await era.printAndWait(
            `「不是的、不是这样的…不要再欺负姐姐了，求求你………」`,
          ); // :1462
          await era.printAndWait(
            `${player_name}恶意的话语，让${target_name}忍不住泪流满面………`,
          ); // :1463
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊、请吧，魔王大人，尽情欣赏少女最私密的地方吧………${heart(1)}」`,
        ); // :1468
        await era.printAndWait(
          `${target_name}扬起眉毛，献媚般地向${player_name}展示着自己的蜜穴深处。`,
        ); // :1469
        if (virgin) {
          await era.printAndWait(
            `「这个处女膜是为魔王大人保留的，但是也别让我等太久了……否则${heart(1)}」`,
          ); // :1471
          await era.printAndWait(
            `${target_name}舔着嘴唇，用手指一张一合地抚弄着蜜穴，诱惑着${player_name}………`,
          ); // :1472
        } else {
          await era.printAndWait(
            `「${target_name}的这里…现在最想要的，是魔王大人的精液哟…${heart(1)}」`,
          ); // :1474
          await era.printAndWait(
            `${target_name}露出淫靡的笑容，用语言挑逗，诱惑着${player_name}………`,
          ); // :1475
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「啊，啊啊…请，请尽情看吧，魔王大人………${heart(1)}」`,
        ); // :1479
        await era.printAndWait(
          `${target_name}边害羞地微微喘息着、边向${player_name}展示着自己的蜜穴及更深处。`,
        ); // :1480
        if (virgin) {
          await era.printAndWait(
            `「我，我的处女膜…漂亮吗…？啊啊啊，我居然说了这么害羞的话！」`,
          ); // :1482
          await era.printAndWait(
            `${target_name}变得脸红耳赤，羞愧地摇着头躲避着魔王的视线………`,
          ); // :1483
        } else {
          await era.printAndWait(
            `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
          ); // :1485
          await era.printAndWait(
            `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
          ); // :1486
        }
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(`「这种，这种事情实在太…羞耻…呜呜呜！」`); // :1490
        await era.printAndWait(
          `${target_name}擦了擦满脸的泪水，然后在${player_name}的命令下继续展示着蜜穴。`,
        ); // :1491
        await era.printAndWait(`「呜呜呜……给我记住、总有一天，总有一天………」`); // :1492
      }
      kojo.自己扒开 = 1; // :1495
      return 0; // :1495-1496
    }

    // :1497-1610 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (virgin) {
          await era.printAndWait(
            `「哈啊，能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？」`,
          ); // :1504
          await era.printAndWait(`『恩恩，姐姐的处女膜光鲜亮丽，真好看！』`); // :1505
          await era.printAndWait(
            `「谢谢夸奖，但其实更想尽早让魔王大人把它弄坏呢…呵呵呵呵${heart(1)}」`,
          ); // :1506
          await era.printAndWait(
            `${target_name}和${player_name}一齐意味深长地望着你，眼中满含秋波………`,
          ); // :1507
        } else {
          await era.printAndWait(
            `「哈啊、能看见吗，${player_name}，看见姐姐淫荡的蜜穴了吗？嘻嘻嘻${heart(1)}」`,
          ); // :1509
          await era.printAndWait(
            `『啊呀…姐姐这里已经湿得乱七八糟了，已经在想象着被魔王大人侵犯了吗…真是太色情了♪』`,
          ); // :1510
          await era.printAndWait(
            `「这样够一目了然了吗${heart(1)} 要不要姐姐再换个姿势给你看！还是想看姐姐的肛门呢？」`,
          ); // :1511
          await era.printAndWait(
            `${target_name}和${player_name}无比和谐地讨论着下流的话题………`,
          ); // :1512
        }
        kojo.自己扒开 = 5; // :1512-1514
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (virgin) {
          await era.printAndWait(
            `『姐姐怎么还是处女呀、快点把这里奉献给魔王大人吧。大人可是很温柔的哦？』`,
          ); // :1518
          await era.printAndWait(`「不，不要公然地说…这么羞耻的事啦…」`); // :1519
          await era.printAndWait(
            `『哎呀、这样的话，那我就替魔王大人收下啦？怎样？稍等片刻，我准备一下……哎哎哎，姐姐别把腿合上呀，真是的。』`,
          ); // :1520
          await era.printAndWait(`「不要开玩笑啦！」`); // :1521
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，蜜穴在妹妹调戏下已经爱液满溢………`,
            ); // :1523
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}强行分开大腿，捂着脸发出羞愧的声音………`,
            ); // :1525
          }
        } else {
          await era.printAndWait(`「太，太羞耻了！这个样子…呜呜呜…」`); // :1528
          await era.printAndWait(
            `『不行啊、我都说的清清楚楚了，不是这个姿势♪♪』`,
          ); // :1529
          await era.printAndWait(
            `${target_name}只能遵循着妹妹的命令，摆出更加屈辱的姿势和动作。`,
          ); // :1530
          if (chara(target).system.露出癖 >= 3) {
            await era.printAndWait(
              `『明明很享受被我和魔王大人视奸嘛，看，着淫荡的蜜穴都湿成这个样子了！说谎是不行的哦姐姐♪』`,
            ); // :1532
            await era.printAndWait(`「不，不是的…不是这样的………！」`); // :1533
            await era.printAndWait(
              `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
            ); // :1534
          } else {
            await era.printAndWait(`『被人这样看着，是不是有感觉了，姐姐？』`); // :1536
            await era.printAndWait(`「求求你，放过姐姐吧…呜呜呜」`); // :1537
          }
        }
        kojo.自己扒开 = 4; // :1538-1540
      } else if (
        chara(target).system.露出癖 >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 露出癖Lv3以上
        await era.printAndWait(`「啊啊…这个姿势…能全部看清楚了吗？」`); // :1543
        await era.printAndWait(
          `『哎呀，姐姐已经露出上瘾了呢！都不觉得羞耻的吗？』`,
        ); // :1544
        await era.printAndWait(`「当，当然会感觉羞耻啊…要不是你的命令………」`); // :1545
        await era.printAndWait(
          `『说谎是不行的呢，姐姐！看着你的样子我就明白你现在的感觉啦♪』`,
        ); // :1546
        await era.printAndWait(
          `妹妹的话让${target_name}羞愧得脸红到了耳根、但异样的心理快感却让蜜穴却不住地分泌出更多爱液………`,
        ); // :1547
        if (virgin) {
          await era.printAndWait(
            `『姐姐的蜜穴好色情，好有诱惑力啊。魔王大人居然还没有侵犯过姐姐这里。如果我是男人的话一定早就………』`,
          ); // :1549
          await era.printAndWait(`「在，再说什么呢啊你！」`); // :1550
        }
        kojo.自己扒开 = 3; // :1550-1552
      } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、露出癖Lv3未満）
        await era.printAndWait(`「这样…这样可以了吗…可以放过我了吧…呜呜」`); // :1555
        await era.printAndWait(`『哎呀呀，还是想看姐姐做些更羞耻的动作呢♪』`); // :1556
        await era.printAndWait(
          `${player_name}看着${target_name}万分羞愧的样子，笑的嘴巴都歪了。本是亲姐妹的两人，现在的关系已经完全不正常了。`,
        ); // :1557
        if (virgin) {
          await era.printAndWait(
            `『姐姐的处女膜还在呀、怎么还没有献给魔王大人呢？』`,
          ); // :1559
          await era.printAndWait(`「不要，不要啊……！」`); // :1560
        }
        kojo.自己扒开 = 2; // :1561-1562
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈啊…这个姿势就能全部看清了吧………${heart(1)}」`); // :1567
      await era.printAndWait(
        `${target_name}带着献媚的表情，向${player_name}展示着自己的蜜穴。`,
      ); // :1568
      if (virgin) {
        await era.printAndWait(
          `「这个处女膜是为魔王大人保留的，但是也别让我等太久哦${heart(1)}」`,
        ); // :1570
        await era.printAndWait(
          `${target_name}舔着嘴唇，又换了个更诱人的姿势，用手将蜜穴一张一合地诱惑着${player_name}。`,
        ); // :1571
        await era.printAndWait(
          `清晰可见得处女膜和满溢的淫液都在表达着对${player_name}的阴茎的渴望………`,
        ); // :1572
      } else {
        await era.printAndWait(
          `「${target_name}的淫荡蜜穴，现在最想要的…是魔王大人的阴茎和精液哦${heart(1)}」`,
        ); // :1574
        await era.printAndWait(
          `${target_name}露出淫媚的笑容，换了个更诱人的姿势，诱惑着${player_name}………`,
        ); // :1575
      }
      kojo.自己扒开 = 5; // :1575-1577
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「魔，魔王大人，请…看个够吧…${heart(1)}」`); // :1580
      await era.printAndWait(
        `${target_name}边害羞的喘息着，边向${player_name}展示着自己的蜜穴。`,
      ); // :1581
      if (virgin) {
        await era.printAndWait(
          `「我的处女膜，魔王大人觉得漂，漂亮吗？啊啊啊，说这种话好羞耻！」`,
        ); // :1583
        await era.printAndWait(
          `${target_name}羞得涨红了脸，别过脸躲避着${player_name}的眼光……`,
        ); // :1584
      } else {
        await era.printAndWait(
          `「${target_name}的这里…是属于魔王大人专用的…啊啊啊…${heart(1)}」`,
        ); // :1586
        await era.printAndWait(
          `${target_name}羞得脸红耳赤，撑开蜜穴的手指也松走了………`,
        ); // :1587
      }
      kojo.自己扒开 = 4; // :1587-1589
    } else if (
      chara(target).system.露出癖 >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        `「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」`,
      ); // :1592
      await era.printAndWait(`${target_name}红着脸，口中吐出了甘甜的娇喘。`); // :1593
      await era.printAndWait(
        `「啊……哈啊…这，这样就行了吧…什么，什么！还要继续吗？！」`,
      ); // :1594
      if (virgin) {
        await era.printAndWait(`「好，好吧…我继续，继续！」`); // :1596
        await era.printAndWait(
          `${target_name}再次向${player_name}分开自己的蜜穴，这次将完好的处女膜也展示出来了………`,
        ); // :1597
      }
      kojo.自己扒开 = 3; // :1597-1599
    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（爱慕無し、露出癖Lv3未満）
      await era.printAndWait(`「人家的这里…到底有什么好看的…要看那么多遍！」`); // :1602
      await era.printAndWait(`对于、咬着嘴唇对着${player_name}怒目而视。`); // :1603
      if (virgin) {
        await era.printAndWait(
          `「处女膜也看见了吧？…这样好了吧…你还想要怎么样！」`,
        ); // :1605
      }
      kojo.自己扒开 = 2; // :1605-1606
    }
    return 0; // :1606-1611 隐式（原作 RETURN 0）
  }

  // :1616-1692 IF SELECTCOM == 8（指挿入 CFLAG:309）
  if (era_flag.selectcom === 8) {
    // :1618-1636 初めて（CFLAG:309 == 0）
    if (kojo.插入手指 === 0) {
      if (assi_mao) {
        await era.printAndWait(`「不，不要啊…停下…好痛啊啊！」`); // :1621
        await era.printAndWait(
          `『我的手指插进去了哦姐姐！怎么用，感觉舒服吗？』`,
        ); // :1622
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「哈啊${heart(1)} 感觉到了，你湿漉漉的手指${heart(1)}」`,
        ); // :1626
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(`「魔王大人的话…想怎么做什么都可以…嗯啊啊！」`); // :1629
      } else {
        // それ以外
        await era.printAndWait(`「啊啊啊！不，不要那么粗暴啊、会痛的！」`); // :1632
      }
      kojo.插入手指 = 1; // :1635
      return 0; // :1635-1636
    }

    // :1638-1691 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊……请尽情地欺负…姐姐淫荡的蜜穴吧…嗯啊 ${heart(1)}」`,
        ); // :1643
        await era.printAndWait(
          `『哎呀，只是轻轻这样用手指插了几下，姐姐的表情就已经跟高潮了一样。真是的，在我心目中的形象完全破灭了啊』`,
        ); // :1644
        await era.printAndWait(
          `「因，因为，实在是太舒服了啊……姐姐的淫穴！嗯啊啊${heart(1)} 哈…呼…呼呼！」`,
        ); // :1645
        kojo.插入手指 = 5; // :1645-1646
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(`「再，再稍微，温柔一点…嗯啊啊！」`); // :1649
        await era.printAndWait(
          `『放松一些啦姐姐，明明比我手指更粗的东西都能进得去♪』`,
        ); // :1650
        await era.printAndWait(`「呜啊啊…因，因为太羞耻了啦……啊啊！」`); // :1651
        kojo.插入手指 = 4; // :1651-1652
      } else if (
        mark(2) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实得多了呢，是感觉到快感了吧？』`); // :1655
        await era.printAndWait(
          `「才，才不是这样的…嗯啊？…啊啊啊啊！不要，不要再里面搅动啊！」`,
        ); // :1656
        await era.printAndWait(
          `『这是对姐姐撒谎的惩罚哦♪为什么不坦率地承认很舒服呢？』`,
        ); // :1657
        kojo.插入手指 = 3; // :1657-1658
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住手，住手啊…啊啊啊！」`); // :1661
        await era.printAndWait(
          `『指头已经全部插进姐姐的里面去了哦。怎么样，感觉舒服吗？』`,
        ); // :1662
        await era.printAndWait(`「怎，怎么可能会舒服？！快拔出去啊啊啊！」`); // :1663
        kojo.插入手指 = 2; // :1663-1664
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哈啊${heart(1)} 蜜穴都湿透了，都是因为你${heart(1)}嗯啊」`,
      ); // :1669
      await era.printAndWait(
        `${target_name}感受着下体被手指抽插的快感，舒服得眼泪都流下来了，不停地娇喘着。`,
      ); // :1670
      await era.printAndWait(`「嗯啊啊…好舒服…舒服得…要去了${heart(1)}」`); // :1671
      kojo.插入手指 = 5; // :1671-1672
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「魔，魔王大人的话…想怎么玩${target_name}的那里…哈啊…都可以…嗯啊啊！」`,
      ); // :1675
      await era.printAndWait(
        `${target_name}弓起了腰身，让${player_name}的手指可以更加深入地抽插自己的下体，自己也不住地娇喘着。`,
      ); // :1676
      await era.printAndWait(
        `「哈啊…${target_name}的蜜穴…触感如何…魔王大人${heart(1)}嗯啊啊啊」`,
      ); // :1677
      kojo.插入手指 = 4; // :1677-1678
    } else if (
      mark(2) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(
        `「还要再这样弄多久？什么时候…可以结束？嗯啊啊！」`,
      ); // :1681
      await era.printAndWait(`「呼…呼…什么？还，还要再来？」`); // :1682
      kojo.插入手指 = 3; // :1682-1683
    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呜啊！这么粗暴的动作…讨厌死了！啊啊啊」`); // :1686
      kojo.插入手指 = 2; // :1686-1687
    }
    return 0; // :1687-1690
  }

  // :1697-1776 IF SELECTCOM == 9（舔肛 CFLAG:310）
  if (era_flag.selectcom === 9) {
    // :1699-1721 初めて（CFLAG:310 == 0）
    if (kojo.舔肛 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哇，姐姐的肛门粉粉嫩嫩的，真好看，这次换妹妹来侍奉姐姐一下${heart(1)}』`,
        ); // :1702
        await era.printAndWait(`「唔嗯？那里好脏，好脏的！不要啊！」`); // :1703
        await era.printAndWait(
          `『不脏啊，${player_name}觉得姐姐的肛门，很美味呢${heart(1)}』`,
        ); // :1704
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(`「真是的！连那种地方也要舔，你真是变态！」`); // :1708
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        ); // :1709
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」`,
        ); // :1712
        await era.printAndWait(
          `${target_name}有点不习惯肛门被舔舐的感觉，发出了混杂着不安与享受的声音……`,
        ); // :1713
      } else {
        // それ以外（爱慕無し）
        await era.printAndWait(
          `「为，为什么要舔这种地方！好脏的！不要那样啊！」`,
        ); // :1716
        await era.printAndWait(
          `${target_name}肛门第一次被舔舐，极度的不适和反感让她发出了屈辱的哀鸣……`,
        ); // :1717
      }
      kojo.舔肛 = 1; // :1717-1720
      return 0; // :1717-1721
    }

    // :1723-1774 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…继续，继续舔，${player_name}、把舌头伸进里面舔${heart(1)}」`,
        ); // :1728
        await era.printAndWait(
          `『姐姐是个喜欢被人舔肛门的变态呢…嚯嚯嚯…真的那么舒服吗♪』`,
        ); // :1729
        await era.printAndWait(
          `${target_name}享受着${player_name}舔舐自己的肛门带来的快感，发出一阵阵淫媚的娇喘…`,
        ); // :1730
        kojo.舔肛 = 5; // :1730-1731
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…这样太羞耻了…快停下，${player_name}…嗯啊啊」`,
        ); // :1734
        await era.printAndWait(
          `『为什么要停下呢？姐姐的肛门，多美味啊♪而且明明自己也是一脸享受的样子♪我继续了哦！』`,
        ); // :1735
        await era.printAndWait(
          `${target_name}享受着被${player_name}舔舐着肛门带来的快感，脸却红到了脖子根………`,
        ); // :1736
        kojo.舔肛 = 4; // :1736-1737
      } else if (
        mark(2) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」`,
        ); // :1740
        await era.printAndWait(
          `『不行哦姐姐，你要再放松一点，让妹妹舌头再进去一点就能感觉到舒服啦♪ 我继续开动啦！』`,
        ); // :1741
        await era.printAndWait(
          `${target_name}被${player_name}来回舔舐着肛门，只能屈着身子忍耐着……`,
        ); // :1742
        kojo.舔肛 = 3; // :1742-1743
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（屈服刻印Lv3未満）
        await era.printAndWait(
          `『姐姐的屁股再放松一点啦，妹妹的舌头都进不去，以后怎么接纳魔王大人的……嘻嘻♪』`,
        ); // :1746
        await era.printAndWait(`「呜呜！不要啊，那里好脏，好脏的…快停下啊！」`); // :1747
        await era.printAndWait(
          `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
        ); // :1748
        kojo.舔肛 = 2; // :1745-1749
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊…魔王大人真是变态…喜欢…舔人家的肛门${heart(1)}哈啊」`,
      ); // :1754
      await era.printAndWait(
        `${target_name}享受着肛门被舔舐的快感，发出一阵阵淫浪的娇喘………`,
      ); // :1755
      kojo.舔肛 = 5; // :1755-1756
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「魔，魔王大人，怎么能让你…做…做这种事！真是…嗯啊啊」`,
      ); // :1759
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，羞得面红耳赤，但是又不自觉地享受着……`,
      ); // :1760
      kojo.舔肛 = 4; // :1760-1761
    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3
      await era.printAndWait(`「啊啊…可以快，快点结束吗…嗯啊啊！」`); // :1764
      await era.printAndWait(
        `${target_name}被${player_name}仔细舔舐着肛门，只能拼命忍耐着不适感。`,
      ); // :1765
      kojo.舔肛 = 3; // :1765-1766
    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外（屈服刻印Lv3未満）
      await era.printAndWait(`「都说不要啊啊！那种肮脏的地方！」`); // :1769
      await era.printAndWait(
        `${target_name}被舔舐着肛门，发出了交织着不适、反感与屈辱的悲鸣……`,
      ); // :1770
      kojo.舔肛 = 2; // :1768-1771
    }
    return 0; // :1771-1774
  }

  // :1781-1853 IF SELECTCOM == 10（振动宝石 CFLAG:311）
  if (era_flag.selectcom === 10) {
    // :1783-1801 初めて（CFLAG:311 == 0）
    if (kojo.振动宝石 === 0) {
      if (assi_mao) {
        await era.printAndWait(`『这种震动玩具，很容易上瘾的哦，姐姐～♪』`); // :1786
        await era.printAndWait(`「呜啊！快…快拿开，${player_name}！啊啊啊」`); // :1787
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊，这样的震动…真让人…欲仙欲死${heart(1)}」`,
        ); // :1791
      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(
          `「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」`,
        ); // :1794
      } else {
        // それ以外
        await era.printAndWait(`「呃？这、这是什么！？快拿开，好难受！」`); // :1797
      }
      kojo.振动宝石 = 1; // :1800
      return 0; // :1800-1801
    }

    // :1803-1852 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `『这么简单的道具就能让姐姐舒服成这个样子，姐姐的身体，已经完全变得淫乱了呢${heart(1)}』`,
        ); // :1808
        await era.printAndWait(
          `「哈啊！是，是啊…这种能让姐姐阴蒂舒服的东西…最喜欢了…嗯啊啊，再，再压紧一点${heart(1)}…呼呼…啊啊啊」`,
        ); // :1809
        await era.printAndWait(`『真的好像已经高潮了呢，淫荡的姐姐………』`); // :1810
        kojo.振动宝石 = 5; // :1810-1811
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        mark(2) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3
        await era.printAndWait(
          `「真，真是的！为什么老要对姐姐、做，做恶作剧…嗯啊啊啊！」`,
        ); // :1814
        await era.printAndWait(
          `『因为人家想看到姐姐高潮时的脸嘛…你看你看，就是这个表情♪』`,
        ); // :1815
        kojo.振动宝石 = 4; // :1815-1816
      } else if (
        mark(2) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`『姐姐变得老实多了呢，是不是已经有快感了？』`); // :1819
        await era.printAndWait(`「哈啊…胡，胡说，才没有那种—呃啊啊」`); // :1820
        kojo.振动宝石 = 3; // :1820-1821
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`『你看，很舒服吧？姐姐老实点不要乱动啊』`); // :1824
        await era.printAndWait(`「呜呜…拿…拿开啊…那种东西…！嗯啊啊」`); // :1825
        kojo.振动宝石 = 2; // :1825-1826
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊${heart(1)}」`,
      ); // :1831
      await era.printAndWait(
        `${target_name}在宝石激烈的震动刺激下，整个腰身都弓了起来，不住地呻吟、娇喘………`,
      ); // :1832
      kojo.振动宝石 = 5; // :1832-1833
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      mark(2) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3
      await era.printAndWait(
        `「哈…啊…不，不需要那种东西啦…我，我更想要你的手指…嗯啊啊！」`,
      ); // :1836
      await era.printAndWait(
        `${target_name}在宝石的刺激下不住地随快感扭着腰，娇媚地呻吟着………`,
      ); // :1837
      kojo.振动宝石 = 4; // :1837-1838
    } else if (
      mark(2) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜呜！又，又是这个！关掉，关掉啊…呜啊啊！」`); // :1841
      await era.printAndWait(
        `${target_name}被震动宝石连续刺激着阴蒂、只能咬牙忍耐着………`,
      ); // :1842
      kojo.振动宝石 = 3; // :1842-1843
    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「住，住手啊…！这种东西…！呜呜呜！」`); // :1846
      await era.printAndWait(
        `无处躲避的${target_name}被震动宝石连续刺激着阴蒂，发出了屈辱的哀鸣………`,
      ); // :1847
      kojo.振动宝石 = 2; // :1847-1848
    }
    return 0; // :1848-1851
  }

  // :1859-1987 IF SELECTCOM == 11（壶虫 CFLAG:312／着脱 CFLAG:372，
  // TEQUIP:11 判定已装/未装两态）
  if (era_flag.selectcom === 11) {
    const virgin = era.get(`talent:${target}:0`) === 1;

    if (era.get(`tequip:${target}:11`)) {
      // :1861-1920 初めて（CFLAG:312 == 0，开始时）
      if (kojo.壶虫 === 0) {
        if (virgin) {
          // 处女
          if (assi_mao) {
            await era.printAndWait(
              `『哎哎，姐姐真可怜呢，明明更想把处女留给魔王大人对吧♪可惜再也不可能了呢。』`,
            ); // :1866
            await era.printAndWait(
              `${player_name}抓着已经大半进入${target_name}蜜穴里的虫子，用力捏着它，刺激着它继续往里钻来钻去。`,
            ); // :1867
            await era.printAndWait(
              `看着手中沾满${target_name}处女血的蠕虫，${player_name}笑得嘴都歪了，笑容里满是深深的恶意。`,
            ); // :1868
            if (era.get(`talent:${target}:76`) === 1) {
              // 淫乱
              await era.printAndWait(
                `「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊${heart(1)}哈……」`,
              ); // :1871
              await era.printAndWait(
                `${target_name}吃痛地叫了一声，但随即开始发出淫媚与享受的娇喘，淫乱的样子反而让${player_name}有些惊讶和失望……`,
              ); // :1872
            } else if (era.get(`talent:${target}:85`) === 1) {
              // 爱慕
              await era.printAndWait(
                `「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」`,
              ); // :1875
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的委屈与痛楚使得${target_name}泪如泉涌，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              ); // :1876
            } else {
              // それ以外
              await era.printAndWait(
                `「啊啊啊…好痛…好痛啊…为什么要对姐姐做这么残忍的事！！${player_name}，你原来不是这样的人啊……！呜呜呜…」`,
              ); // :1879
              await era.printAndWait(
                `虫子依旧在${target_name}的阴道内肆意爬动，极度的屈辱与痛楚使得${target_name}撕心裂肺地惨叫着，哭泣着，而看到姐姐这个样子的${player_name}，却更加兴奋………`,
              ); // :1880
            }
          } else if (era.get(`talent:${target}:76`) === 1) {
            // 非助手玛奥・淫乱
            await era.printAndWait(
              `「啊啊啊！钻进，进来了…我的处女…居然给了这么一个东西…${heart(1)}」`,
            ); // :1885
            await era.printAndWait(
              `${target_name}用交织着委屈与享受的表情，出神地凝视着已经半身钻入自己下体内，穿透了处女膜的虫子……`,
            ); // :1886
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 非助手玛奥・爱慕
            await era.printAndWait(
              `「这是…对我的惩罚吗？魔王大人…我甘心受罚啊啊啊！好痛！好痛啊啊！」`,
            ); // :1889
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，痛楚和委屈让她泪流满面地悲泣着……`,
            ); // :1890
          } else {
            // 非助手玛奥・それ以外
            await era.printAndWait(
              `「不要不要不要啊…拔出去拔出去——啊啊啊好痛，好痛啊！」`,
            ); // :1893
            await era.printAndWait(
              `蠕虫猛地钻进了${target_name}的蜜穴中，穿破了处女膜，沿着阴道往里钻，极度的痛楚和屈辱让她撕心裂肺地惨叫着，哭泣着……`,
            ); // :1894
          }
        } else if (assi_mao) {
          // 非处女・助手玛奥
          await era.printAndWait(`『啊哈哈、姐姐看，虫子从你下面钻进去了♪』`); // :1901
          await era.printAndWait(`「什，什么？！啊啊啊…好难受，好难受！」`); // :1902
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 非处女・淫乱
          await era.printAndWait(`「哈啊，钻，钻进去了…呃啊…啊啊！」`); // :1906
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，开始因为刺激和快感呻吟了起来………`,
          ); // :1907
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 非处女・爱慕
          await era.printAndWait(
            `「这，这样的东西和魔王大人的…比起来、啊，对，对不起…我…什么都没说！呃啊…哈啊」`,
          ); // :1910
          await era.printAndWait(
            `${target_name}感受着蠕虫从自己蜜穴中钻入，不由得大声地呻吟了起来。`,
          ); // :1911
        } else {
          // 非处女・それ以外
          await era.printAndWait(
            `「要，要让这样的东西进去…不，不，不要啊，这样的调教…求求你！」`,
          ); // :1914
          await era.printAndWait(
            `${target_name}想要伸手去把虫子拔出去，却被${player_name}按住了手、只能任由蠕虫继续往蜜穴的深处钻入……`,
          ); // :1915
        }
        kojo.壶虫 = 1; // :1919
        return 0; // :1919-1920
      }

      // :1922-1969 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          ); // :1927
          await era.printAndWait(
            `「哎呀呀…这样的问题怎么回答呢…哪种东西在姐姐的蜜穴里，就是哪种更舒服…所以，现在当然是虫子啦${heart(1)}」`,
          ); // :1928
          kojo.壶虫 = 5; // :1928-1929
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,
          ); // :1932
          await era.printAndWait(
            `「哎，哎…这种问题怎么回答的出口！啊啊啊，不要让它……爬太深进去啊啊啊！」`,
          ); // :1933
          kojo.壶虫 = 4; // :1933-1934
        } else if (
          chara(target).system.私处感觉 >= 3 &&
          (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // V感覚Lv3以上
          await era.printAndWait(
            `『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗${heart(1)}虫子已经要全部爬进去了哦哦』`,
          ); // :1937
          await era.printAndWait(
            `「哎，哎，才没露出那种表情…啊啊…在，在里面动起来了…啊哈…嗯啊啊！」`,
          ); // :1938
          kojo.壶虫 = 3; // :1938-1939
        } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『姐姐，开始习惯虫子在蜜穴里爬爬的感觉了吗？』`,
          ); // :1942
          await era.printAndWait(
            `「这，这种事…永远不会…不会习惯啊啊啊啊…拿出去啊啊，求求你！」`,
          ); // :1943
          kojo.壶虫 = 2; // :1943-1944
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服${heart(1)}」`,
        ); // :1949
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的话音被自己充满享受的娇喘声掩盖了……`,
        ); // :1950
        kojo.壶虫 = 5; // :1950-1951
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(`「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」`); // :1954
        await era.printAndWait(
          `着虫子渐渐钻入蜜穴之中，${target_name}发出了享受的娇喘声………`,
        ); // :1955
        kojo.壶虫 = 4; // :1955-1956
      } else if (
        chara(target).system.私处感觉 >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // V感覚Lv3以上
        await era.printAndWait(
          `「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」`,
        ); // :1959
        await era.printAndWait(
          `随着虫子渐渐钻入蜜穴之中，${target_name}的辩解被自己充满享受的娇喘声掩盖了……`,
        ); // :1960
        kojo.壶虫 = 3; // :1960-1961
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「慢，慢一点…稍微…温柔一些不行吗！不…不要再进来了啊啊！」`,
        ); // :1964
        await era.printAndWait(
          `${target_name}发出了不满的声音，为了让她明白自己的立场和身份，${player_name}立即粗暴地刺激着虫子继续深入………`,
        ); // :1965
        kojo.壶虫 = 2; // :1965-1966
      }
      return 0; // :1966-1969
    }

    // :1972-1986 脱着時（TEQUIP:11 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「哎，哎哎…虫子出去后，${target_name}的蜜穴好寂寞哦${heart(1)}，魔王大人」`,
      ); // :1975
      kojo.壶虫着脱 = 3; // :1976
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「哈…呼…呼呼…接，接下来，魔王大人${heart(1)}？」`,
      ); // :1979
      kojo.壶虫着脱 = 2; // :1980
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(
        `「突，突然拔出去…会，会痛的…啊，哈啊，为什么…有一种空虚的感觉……」`,
      ); // :1983
      kojo.壶虫着脱 = 1; // :1984
    }
    return 0; // :1984-1986
  }

  // :1992-2066 IF SELECTCOM == 12（振动杖 CFLAG:313）
  if (era_flag.selectcom === 12) {
    // :1994-2015 初めて（CFLAG:313 == 0）
    if (kojo.振动杖 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『这个震动起来很厉害的哦，不知道姐姐能坚持多久呢♪』`,
        ); // :1997
        await era.printAndWait(
          `「啊咧？什，什么……啊啊啊…拿开啊……哈啊…哈啊！」`,
        ); // :1998
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…这个震动的频率…太，太快……啊啊啊…好…好舒服啊…${heart(1)}」`,
        ); // :2002
        await era.printAndWait(
          `双腿之间的震动杖对私处的激烈刺激，${target_name}闭上了眼睛，一脸享受的表情………`,
        ); // :2003
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「这，这是？！这种东西不是用来按摩肩膀的——啊啊啊！」`,
        ); // :2006
        await era.printAndWait(
          `双腿之间的震动杖对私处的激烈刺激，，让${target_name}弓起了腰，全身颤抖了起来………`,
        ); // :2007
      } else {
        // それ以外
        await era.printAndWait(
          `「这，这是什么？！好痒，好痒，哈…啊哈，拿开啊…嗯啊啊！」`,
        ); // :2010
        await era.printAndWait(
          `${target_name}抿着嘴，忍耐着双腿之间的震动杖对阴蒂激烈刺激………`,
        ); // :2011
      }
      kojo.振动杖 = 1; // :2014
      return 0; // :2014-2015
    }

    // :2017-2064 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊啊…姐姐…要上天了…哈啊${heart(1)} 实在是……太棒了${heart(1)}」`,
        ); // :2022
        await era.printAndWait(
          `『哎哎、这个东西还真是厉害呢，碰一下姐姐就变成这个样子了………』`,
        ); // :2023
        kojo.振动杖 = 5; // :2023-2024
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「哈…啊…又是这个！快，快拿开啊，姐姐怕痒啊啊啊…呼…呼…呃啊啊啊！」`,
        ); // :2027
        await era.printAndWait(
          `『痒？明明是很舒服才对吧？哈啊，看我换个角度让姐姐更舒服一点${heart(1)}』`,
        ); // :2028
        kojo.振动杖 = 4; // :2028-2029
      } else if (
        mark(2) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `『姐姐也开始露出舒服和享受的表情了呢，真是可爱～』`,
        ); // :2032
        await era.printAndWait(
          `「才，才不会有那种表情…啊啊…哈啊…舒服，享受什么的…更不可能…呃啊啊…呜呜」`,
        ); // :2033
        kojo.振动杖 = 3; // :2033-2034
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `『哎呀呀，姐姐，怎么老乱动哦，又想要我惩罚你了吗♪』`,
        ); // :2037
        await era.printAndWait(
          `「不，不要啊…原谅${player_name}吧，求求你…呃啊啊…嗯啊啊！」`,
        ); // :2038
        kojo.振动杖 = 2; // :2038-2039
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「啊啊啊…这个感觉…好棒呃啊啊…简直太舒服了嗯啊啊啊…${heart(1)}」`,
      ); // :2044
      await era.printAndWait(
        `${target_name}张开了双腿，尽情享受着双腿之间震动杖的激烈刺激，娇喘个不停……`,
      ); // :2045
      kojo.振动杖 = 5; // :2045-2046
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「啊啊啊…太…太激烈了…嗯啊啊…哈…哈…呃啊啊啊${heart(1)}」`,
      ); // :2049
      await era.printAndWait(
        `${target_name}感受着双腿之间震动杖的激烈刺激，在快感之下弓起了腰，不住地娇喘着……`,
      ); // :2050
      kojo.振动杖 = 4; // :2050-2051
    } else if (
      mark(2) === 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「不，不行啊…再继续就…就啊啊…哈啊…哈啊…！」`); // :2054
      await era.printAndWait(
        `${target_name}只剩下口头上的微弱抗拒，双腿则老实地张开着，忍耐着震动杖对阴蒂的强烈刺激………`,
      ); // :2055
      kojo.振动杖 = 3; // :2055-2056
    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呃啊啊啊！停，停下啊！把它拿开啊啊啊！」`); // :2059
      await era.printAndWait(
        `震动杖激烈地刺激着${target_name}的敏感的阴蒂，让她不住地哀鸣着……`,
      ); // :2060
      kojo.振动杖 = 2; // :2060-2061
    }
    return 0; // :2061-2064
  }

  // :2072-2191 IF SELECTCOM == 13（肛门虫 CFLAG:314／着脱 CFLAG:374，
  // TEQUIP:13 判定已装/未装两态）
  if (era_flag.selectcom === 13) {
    if (era.get(`tequip:${target}:13`)) {
      // :2074-2100 初めて（CFLAG:314 == 0，开始时）
      if (kojo.肛门虫 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『接下来这个，姐姐一定会喜欢的，嘿嘿嘿、放松，放松………』`,
          ); // :2077
          await era.printAndWait(
            `「这，这种东西，无论如何也不可能会喜欢的吧！住，住手啊！呜呜呜…不要啊…求求你…！」`,
          ); // :2078
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…哈啊………肛门要被这样的东西侵犯了………这个感觉…嗯啊啊${heart(1)}」`,
          ); // :2082
          await era.printAndWait(
            `蠕虫钻入${target_name}的肛门时，她惊呼了一声，随即变成了享受的喘息………`,
          ); // :2083
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「如果…如果是魔王大人希望这样的话…我会…我会…呃呃…呃嗯…」`,
          ); // :2086
          await era.printAndWait(
            `${target_name}抿着嘴唇，浑身颤抖地忍耐着蠕虫钻入肛门的强烈不适感……`,
          ); // :2087
        } else if (chara(target).system.肛门感觉 >= 3) {
          // それ以外・A感覚Lv3以上
          await era.printAndWait(
            `「这，这种东西……不行不行不行啊！屁股里不可能容纳得了的啊！啊啊…呃呃啊啊！」`,
          ); // :2091
          await era.printAndWait(
            `虽然语气上抗拒强烈，但是${target_name}已经被充分调教过的肛门，很自然地扩张开来，让蠕虫顺利地爬了进去，并且开始感受到异样的快感……`,
          ); // :2092
        } else {
          // それ以外・それ以外
          await era.printAndWait(
            `「不，不要啊！屁股…怎么能让这种东西进去啊啊！呃啊啊啊…拿掉啊…拿掉啊啊！」`,
          ); // :2094
          await era.printAndWait(
            `${target_name}剧烈地反抗着，然而毫无意义，${player_name}压着她的身体，将虫子强行塞了进去………`,
          ); // :2095
        }
        kojo.肛门虫 = 1; // :2099
        return 0; // :2099-2100
      }

      // :2102-2169 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱＋A感覚Lv3以上
          await era.printAndWait(
            `「哈啊…哈啊！虫子…完全进去了${heart(1)} 哈啊…呀呀…呀啊啊…姐姐的肛门……舒服得…要说不出话来了！」`,
          ); // :2107
          await era.printAndWait(
            `『哎哎，再怎么舒服，也不能发出那么淫荡的声音吧姐姐♪』`,
          ); // :2108
          kojo.肛门虫 = 6; // :2108-2109
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `「哎…哎哟…稍微，稍微温柔一点啦…哈啊…啊啊！」`,
          ); // :2112
          await era.printAndWait(
            `『没关系啦、反正姐姐马上就会舒服得上天了的』`,
          ); // :2113
          kojo.肛门虫 = 6; // :2113-2114
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕＋A感覚Lv3以上
          await era.printAndWait(
            `「啊……哈啊…稍微…稍微慢一点…这样，这样就已经很舒服了！不，不需要再深入了！啊哈…啊啊…呀啊啊」`,
          ); // :2117
          await era.printAndWait(
            `『姐姐的肛门已经开发得这么彻底了…这舒服的表情真是可爱呢${heart(1)}』`,
          ); // :2118
          kojo.肛门虫 = 5; // :2118-2119
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「饶，饶了我吧，不要再欺负姐姐了…这样的东西…真的…不喜啊啊啊…啊哈…啊…！」`,
          ); // :2122
          await era.printAndWait(
            `『什么欺负不欺负的，姐姐给我高高兴兴地把这东西吸进屁股里吧…嘻嘻嘻』`,
          ); // :2123
          kojo.肛门虫 = 4; // :2123-2124
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // A感覚Lv3以上
          await era.printAndWait(
            `「哈…哈啊…进，进来…不，不可以…哈啊…呀呀…呀啊啊！」`,
          ); // :2127
          await era.printAndWait(
            `『亲爱的姐姐不要口是心非啦，才进去一半，都已经舒服成这个样子了？』`,
          ); // :2128
          kojo.肛门虫 = 3; // :2128-2129
        } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `「好痛…好痛…好难受啊啊啊！快把它拿掉，姐姐求求你了！」`,
          ); // :2132
          await era.printAndWait(
            `『放松，放松，姐姐很快就会习惯并且爱上它的♪』`,
          ); // :2133
          kojo.肛门虫 = 2; // :2133-2134
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        await era.printAndWait(
          `「哈…哈啊${heart(1)} 全部，全部进到肛门里面了${heart(1)} 啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,
        ); // :2139
        await era.printAndWait(
          `${target_name}感受着蠕虫慢慢钻入自己的肛门里，已经忍不住快感，忘我地娇喘了起来………`,
        ); // :2140
        kojo.肛门虫 = 6; // :2140-2141
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈啊…再，再稍微温柔一些…还是有点…哈啊，啊啊${heart(1)}」`,
        ); // :2144
        await era.printAndWait(
          `${target_name}的肛门还没有完全适应蠕虫的刺激，从喉咙底发出无所适从的喘息……`,
        ); // :2145
        kojo.肛门虫 = 6; // :2145-2146
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        await era.printAndWait(
          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,
        ); // :2149
        await era.printAndWait(
          `${target_name}感受着蠕虫在自己肛门里爬动，忍不住发出了舒服的呻吟………`,
        ); // :2150
        kojo.肛门虫 = 5; // :2150-2151
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「呃…还，还是有点害怕，但如果是魔王大人的要求的话…我会，我会——嗯啊啊啊…啊啊！」`,
        ); // :2154
        await era.printAndWait(
          `${target_name}感受着蠕虫慢慢钻入自己肛门中，抿着嘴拼命忍耐着不适感………`,
        ); // :2155
        kojo.肛门虫 = 4; // :2155-2156
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(
          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊${heart(1)}」`,
        ); // :2159
        await era.printAndWait(
          `${target_name}被充分调教，开发过的肛门，轻易就接纳了蠕虫的侵犯，并且已经感受到了快感………`,
        ); // :2160
        kojo.肛门虫 = 3; // :2160-2161
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「啊啊啊！不要啊！求求你，不要让这东西进来啊！求求你，求求你！」`,
        ); // :2164
        await era.printAndWait(
          `${target_name}无谓地抵抗着，但被${player_name}压着她的身体，将虫子强行塞了进去………`,
        ); // :2165
        kojo.肛门虫 = 2; // :2165-2166
      }
      return 0; // :2166-2169
    }

    // :2172-2190 脱着時（TEQUIP:13 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哎啊啊！真，真是的，不要拔得那么快………」`); // :2175
      kojo.肛门虫着脱 = 4; // :2176
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「呼…呼呼…下次…魔王大人…可以再温柔一点吗？」`); // :2179
      kojo.肛门虫着脱 = 3; // :2180
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「哈啊…啊啊…屁股感觉，好空虚………」`); // :2183
      kojo.肛门虫着脱 = 2; // :2184
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「啊…啊…屁股…会坏掉的……」`); // :2187
      kojo.肛门虫着脱 = 1; // :2188
    }
    return 0; // :2188-2190
  }

  // :2197-2278 IF SELECTCOM == 14（阴蒂夹 CFLAG:315／着脱 CFLAG:375，
  // TEQUIP:14 判定已装/未装两态）
  if (era_flag.selectcom === 14) {
    if (era.get(`tequip:${target}:14`)) {
      // :2199-2221 初めて（CFLAG:315 == 0，开始时）
      if (kojo.阴蒂夹 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『嘿嘿，姐姐来戴上这个可爱的饰品吧，保证让姐姐你舒服得上天哦！』`,
          ); // :2202
          await era.printAndWait(
            `「不，不，谢谢了，我一点都不觉得…啊啊啊…不要啊…不可以夹在那种地方啊…拿掉它，帮帮我！」`,
          ); // :2203
          await era.printAndWait(
            `『嘿嘿，想都别想。这个东西，姐姐自己一个人是拿不下来的哦♪』`,
          ); // :2204
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊哈…嗯啊啊啊啊${heart(1)} 这个小玩意，怎么这么…呃啊啊${heart(1)} 舒服啊啊啊${heart(1)}」`,
          ); // :2208
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激、没法自己一个人取下来，也根本就不打算这么做的${target_name}淫浪的娇喘着，尽情地享受着阴蒂传来的连绵快感，宛如来到了极乐的天堂……`,
          ); // :2209
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「啊啊？！这…这是什么…额啊啊……太，太激烈了，魔王大人…能不能稍微…呃啊啊啊！」`,
          ); // :2212
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激，没有${player_name}的帮助和允许，无法把夹子取下来的${target_name}只能呻吟，喘息着，被动地感受着来自阴蒂的一波又一波强烈的快感刺激，不知自己是到了天国还是地狱…`,
          ); // :2213
        } else {
          // それ以外
          await era.printAndWait(
            `「呃呃？！这…这东西是什么嗯啊啊啊？！太……太激烈…那里承受，承受不了的啊啊！」`,
          ); // :2216
          await era.printAndWait(
            `夹子开始对${target_name}的阴蒂施以强烈的刺激，没有${player_name}的帮助和允许，无法把夹子取下来的${target_name}只能哀鸣着忍受着来自阴蒂的，半是快感，半是痛苦的强烈刺激，好像身陷地狱一般……`,
          ); // :2217
        }
        kojo.阴蒂夹 = 1; // :2220
        return 0; // :2220-2221
      }

      // :2223-2260 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊、还能不能…开得再强烈…一点点…啊啊…哈啊${heart(1)}」`,
          ); // :2228
          await era.printAndWait(
            `『哎呀，姐姐已经完全上瘾了呢${heart(1)} 那么，接下来动力全开了哦${heart(1)}』`,
          ); // :2229
          kojo.阴蒂夹 = 4; // :2229-2230
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊，这，这样就行了…不要再…加强了！」`,
          ); // :2233
          await era.printAndWait(
            `『口是心非可是不行的哦姐姐，明明是一脸期待的表情嘛，小豆豆都舒服得胀起来了♪』`,
          ); // :2234
          kojo.阴蒂夹 = 3; // :2234-2235
        } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(`「呃啊啊…拿，拿掉它啊…姐姐求求你了…」`); // :2238
          await era.printAndWait(`『不行哦、姐姐不是已经尝过有多舒服了吗♪』`); // :2239
          kojo.阴蒂夹 = 2; // :2239-2240
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「哈…哈啊…又是这个${heart(1)} 阴蒂感觉…太棒了啊啊…整个人都要…嗯啊啊啊${heart(1)}」`,
        ); // :2245
        await era.printAndWait(
          `夹子开始对${target_name}的阴蒂施以强烈的刺激、没法自己一个人取下来，也根本就不打算这么做的${target_name}淫浪的娇喘着，尽情地享受着阴蒂传来的连绵快感，宛如来到了极乐的天堂……`,
        ); // :2246
        kojo.阴蒂夹 = 4; // :2246-2247
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「请、请魔王大人随意调教…${target_name}的阴蒂…嗯啊啊…啊啊${heart(1)}…震动…太强了…整个人好像都要…融化了${heart(1)}」`,
        ); // :2250
        await era.printAndWait(
          `${target_name}被阴蒂夹由弱渐渐转强的震动刺激得眼眶都湿润了，分开的双腿微微抽搐着，被动地感受着来自阴蒂的一波又一波强烈的快感刺激，不知自己是到了天国还是地狱…………`,
        ); // :2251
        kojo.阴蒂夹 = 3; // :2251-2252
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「呃啊啊！太…太强烈了啊啊…调弱一点…求求你！呜啊啊啊！」`,
        ); // :2255
        await era.printAndWait(
          `${player_name}将阴蒂夹的震动调到了最强档，细细品味着${target_name}在阴蒂刺激带来的快感和痛苦交织的地狱中发出的阵阵哀鸣……`,
        ); // :2256
        kojo.阴蒂夹 = 2; // :2256-2257
      }
      return 0; // :2257-2260
    }

    // :2263-2277 脱着時（TEQUIP:14 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哎，哎，不用急着取下来嘛……」`); // :2266
      kojo.阴蒂夹着脱 = 3; // :2267
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「哈…哈…身体还有点…有点…」`); // :2270
      kojo.阴蒂夹着脱 = 2; // :2271
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「终于…结束了吗…」`); // :2274
      kojo.阴蒂夹着脱 = 1; // :2275
    }
    return 0; // :2275-2277
  }

  // :2284-2364 IF SELECTCOM == 15（乳头夹 CFLAG:316／着脱 CFLAG:376，
  // TEQUIP:15 判定已装/未装两态）
  if (era_flag.selectcom === 15) {
    if (era.get(`tequip:${target}:15`)) {
      // :2286-2308 初めて（CFLAG:316 == 0，开始时）
      if (kojo.乳头夹 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『接下来就让姐姐的乳头和这个新玩具合体吧、魔王大人会喜欢姐姐这个样子的哦♪』`,
          ); // :2289
          await era.printAndWait(`「什，什么合体…啊啊啊…为什么…还会震动的！」`); // :2290
          await era.printAndWait(
            `『姐姐的乳头马上就挺立起来了呢。这么快就已经感觉到舒服了吗，姐姐的胸部果然是弱点呢${heart(1)}』`,
          ); // :2291
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)} 这个是…？夹在乳头上…感觉还挺合适的…${heart(1)}」`,
          ); // :2295
          await era.printAndWait(
            `${target_name}摇晃着自己的丰满双乳，炫耀般地向你展示着乳头上的“新饰品”………`,
          ); // :2296
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈，哈啊…这个…还会震动的…不过，好，好舒服…呼，呼，魔王大人…我这样…好看吗${heart(1)}」`,
          ); // :2299
          await era.printAndWait(
            `听着${player_name}的称赞、${target_name}露出了欣慰的笑容，随即沦陷在乳头夹的刺激带来的快感中…`,
          ); // :2300
        } else {
          // それ以外
          await era.printAndWait(
            `「这…这是什么啊啊…乳，乳头会坏掉的！拿下来，拿下来呃啊啊啊！」`,
          ); // :2303
          await era.printAndWait(
            `${target_name}忍受着着夹子对乳头施以的强烈震动刺激，不住地哀鸣着，全身都颤抖了起来。`,
          ); // :2304
        }
        kojo.乳头夹 = 1; // :2307
        return 0; // :2307-2308
      }

      // :2310-2347 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『很般配哦，姐姐粉红色的乳头，戴上这个夹子后更色情了♪』`,
          ); // :2315
          await era.printAndWait(
            `「哈…哈啊…又，又开始震动了…姐姐的乳头挺立起来了…感觉实在是…太棒了啊啊…啊啊${heart(1)}」`,
          ); // :2316
          kojo.乳头夹 = 4; // :2316-2317
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『这可是魔王大人赏赐的饰品哦，姐姐还不高高兴兴地戴上${heart(1)}』`,
          ); // :2320
          await era.printAndWait(
            `「哈啊…哈啊${heart(1)} 谢…谢谢魔王大人…啊啊…感觉…好兴奋…${heart(1)}」`,
          ); // :2321
          kojo.乳头夹 = 3; // :2321-2322
        } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『今天也继续用这个来调教，开发姐姐的乳头吧${heart(1)}』`,
          ); // :2325
          await era.printAndWait(`「住，住手啊！乳头…真的会坏掉的啊！」`); // :2326
          kojo.乳头夹 = 2; // :2326-2327
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊…嗯啊啊${heart(1)} 我的乳头…要是坏掉了…你可要…负责人…哈啊…啊啊啊${heart(1)}」`,
        ); // :2332
        await era.printAndWait(
          `${target_name}感受着夹子对乳头的强烈刺激带来的极度快感，泪水和口水都流了下来，带着仿佛要融化了一般的表情望着${player_name}…`,
        ); // :2333
        kojo.乳头夹 = 4; // :2333-2334
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「${target_name}更…更希望魔王大人亲自…用嘴…和手指…调教…疼爱${target_name}的乳头${heart(1)}，这，这种道具…根本比不上…啊啊啊…哈啊」`,
        ); // :2337
        await era.printAndWait(
          `面对${target_name}的请求，${player_name}置若罔闻地调高了乳头夹的震动强度，让${target_name}再度沦陷在乳头夹的刺激带来的快感中………`,
        ); // :2338
        kojo.乳头夹 = 3; // :2338-2339
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「不要，不要啊啊 ！好难受……好难受…乳头…会坏掉的啊啊啊！」`,
        ); // :2342
        await era.printAndWait(
          `${target_name}的乳头被夹上夹子，打开震动开关，进行着连续不断的，夹杂着痛苦与快感的刺激……`,
        ); // :2343
        kojo.乳头夹 = 2; // :2343-2344
      }
      return 0; // :2344-2347
    }

    // :2350-2363 脱着時（TEQUIP:15 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈…哈啊…乳头…变得越来越敏感了…${heart(1)}」`); // :2353
      kojo.乳头夹着脱 = 3; // :2354
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「夹子拿掉后…乳头还是有点…痛…」`); // :2357
      kojo.乳头夹着脱 = 2; // :2358
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「啊啊啊…乳头肿起来了……」`); // :2361
      kojo.乳头夹着脱 = 1; // :2362
    }
    return 0; // :2362-2363
  }

  // :2371-2460 IF SELECTCOM == 16（榨乳器 CFLAG:317／着脱 CFLAG:377，
  // TEQUIP:16 判定已装/未装两态）
  if (era_flag.selectcom === 16) {
    if (era.get(`tequip:${target}:16`)) {
      // :2373-2394 初めて（CFLAG:317 == 0，开始时）
      if (kojo.榨乳器 === 0) {
        if (assi_mao) {
          await era.printAndWait(
            `『啊嘿嘿，姐姐的大胸部，挤出来的奶一定很值钱♪』`,
          ); // :2376
          await era.printAndWait(
            `「不，不可以啊啊，乳汁是留给小宝宝的，怎么能拿去卖……呜呜！」`,
          ); // :2377
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「啊啊啊……分泌出乳汁了……不过感觉……好舒服${heart(1)}」`,
          ); // :2381
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2382
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「啊啊……乳汁，乳汁满满地出来了${heart(1)} 感觉……好奇怪……但是好舒服……${heart(1)}」`,
          ); // :2385
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2386
        } else {
          // それ以外
          await era.printAndWait(
            `「拿，拿掉啊啊！这不是……给母牛用的吗……好痛，好痛……呜呜呜！！」`,
          ); // :2389
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2390
        }
        kojo.榨乳器 = 1; // :2393
        return 0; // :2393-2394
      }

      // :2396-2442 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(
            `『哎嘿嘿，我又来给母牛姐姐挤奶了哦，这对淫乱的大胸部，不用来挤奶，真是太浪费了！』`,
          ); // :2401
          if (rand_n(2)) {
            // :2402-2406
            await era.printAndWait(
              `「请……请吧……姐姐的胸部……想要怎么玩都可以${heart(1)}」`,
            ); // :2403
          } else {
            await era.printAndWait(
              `「呜啊啊${heart(1)} 居然，居然会这么舒服啊啊${heart(1)}」`,
            ); // :2405
          }
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2407
          kojo.榨乳器 = 4; // :2407-2408
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `『哎嘿嘿，姐姐的乳汁，一会儿我会全部好好喝光的哦♪』`,
          ); // :2411
          await era.printAndWait(
            `「想，想要喝的话直接吸……不就行了……为什么还要用这种东西……」`,
          ); // :2412
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2413
          kojo.榨乳器 = 3; // :2413-2414
        } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『哎嘿嘿，姐姐的胸部好像被乳汁涨得满满的了，让我来给姐姐放松一下』`,
          ); // :2417
          await era.printAndWait(
            `「住，住手啊，${player_name}！求你了……好痛！好痛啊啊！」`,
          ); // :2418
          await era.printAndWait(
            `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
          ); // :2419
          kojo.榨乳器 = 2; // :2418-2420
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「啊啊……开始习惯这种感觉了呢${heart(1)} 其实……还挺舒服的${heart(1)} 」`,
        ); // :2425
        await era.printAndWait(`「啊啊啊……又出来了……乳汁${heart(1)}」`); // :2426
        await era.printAndWait(
          `榨夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
        ); // :2427
        kojo.榨乳器 = 4; // :2427-2428
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「明明是给宝宝喝的东西、不过……如果魔王大人想要品尝的话，我也不介意啦${heart(1)}！」`,
        ); // :2431
        await era.printAndWait(`「不过……一定不能拿去卖哦！」`); // :2432
        await era.printAndWait(
          `${target_name}说着一点说服力都没有的话，然而夹在${target_name}乳房上的榨乳机，依旧在毫不留情地挤榨着母乳………………`,
        ); // :2433
        kojo.榨乳器 = 3; // :2433-2434
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「饶，饶了我吧……再这样挤下去……胸部……真的会坏掉的……呜呜呜！」`,
        ); // :2437
        await era.printAndWait(
          `夹在${target_name}乳房上的榨乳机，正在毫不留情地挤榨着母乳………`,
        ); // :2438
        kojo.榨乳器 = 2; // :2437-2439
      }
      return 0; // :2439-2442
    }

    // :2445-2459 脱着時（TEQUIP:16 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(`「哈啊……哈啊……这些就是我分泌的乳汁……好多啊……」`); // :2448
      kojo.榨乳器着脱 = 3; // :2449
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(`「品尝一下可以……但是一定不能拿去卖啊……」`); // :2452
      kojo.榨乳器着脱 = 2; // :2453
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「呜呜呜……人家明明不是奶牛………」`); // :2456
      kojo.榨乳器着脱 = 1; // :2457
    }
    return 0; // :2457-2459
  }

  // :2464-2519 SELECTCOM 17（オナホール CFLAG:318／着脱 CFLAG:378）在原作
  // 里整段以 `;` 注释掉（连 `IF SELECTCOM == 17` 本身也被注释），SELECTCOM 数字
  // 因此从未被判定为真，属于死代码——PRINTFORMW 台词也全部留空未填。原作
  // 从未执行过此分支，本移植按证据不落地任何行为，直接跳过、不占用真实指令号。

  // :2521-2644 IF SELECTCOM == 19（肛珠 CFLAG:320／脱着 CFLAG:379，
  // TEQUIP:19 判定已装/未装两态）
  if (era_flag.selectcom === 19) {
    if (era.get(`tequip:${target}:19`)) {
      if (kojo.肛珠 === 0) {
        // :2522-2544 初めて
        if (assi_mao) {
          await era.printAndWait(
            `『嘿嘿嘿，待会儿一口气全部拔出来，保证姐姐舒服得上天…』`,
          ); // :2526
          await era.printAndWait(`「住…住手啊！不，不能再塞进去了…啊啊！」`); // :2527
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…哈呼…又，又进来一颗${heart(1)}一会儿…再一下全部拔出去…♪」`,
          ); // :2531
          await era.printAndWait(
            `${target_name}用手抱着张开的双腿，感受着小珠一颗颗被肛门吞入的异样快感……`,
          ); // :2532
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「这个姿势真是…好害羞…呃啊…稍…稍微温柔一点…魔王大人……嗯啊…啊啊！」`,
          ); // :2535
          await era.printAndWait(
            `${player_name}让${target_name}趴在，撅起光洁的臀部，将肛珠一颗颗从肛门塞了进去………`,
          ); // :2536
        } else {
          // それ以外
          await era.printAndWait(
            `「为什么我就偏要遇上这种事！放，放开我！不，不要碰我的屁股啊——！！」`,
          ); // :2539
          await era.printAndWait(
            `${player_name}把一直挣扎着的${target_name}用力按住，不由分说地将肛珠一颗颗塞了进去……`,
          ); // :2540
        }
        kojo.肛珠 = 1; // :2543
        return 0; // :2543-2544
      }

      // :2545-2618 二回目以降
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱＋A感覚Lv3以上
          await era.printAndWait(
            `「啊哈…啊啊${heart(1)} 全，全部塞进去了呢！姐姐已经准备好了…一口气全部拔出来…让姐姐上天吧${heart(1)}」`,
          ); // :2551
          await era.printAndWait(
            `『不行呐，姐姐。这么轻易就拔出去太没意思了？ 先忍一忍哦♪』`,
          ); // :2552
          await era.printAndWait(
            `「不要，不要就这么…晾着啊！明明以前姐姐说什么你都会听的！」`,
          ); // :2553
          kojo.肛珠 = 7; // :2553-2554
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // 淫乱
          await era.printAndWait(`「呃啊啊…居然…全部都塞进来了…呼…呼…」`); // :2557
          await era.printAndWait(`『本来就是这么打算的哦姐姐♪』`); // :2558
          kojo.肛珠 = 6; // :2558-2559
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕＋A感覚Lv3以上
          await era.printAndWait(`「哈啊…啊啊${heart(1)} 全，全部塞进来了」`); // :2562
          await era.printAndWait(
            `『是啊，多亏我们好好调教、开发了姐姐的肛门，才能把这么多珠子全部塞进去哦${heart(1)}、那么，姐姐是不是应该表示一下感谢呢？』`,
          ); // :2563
          await era.printAndWait(
            `「是，是的……感谢魔王大人，和${player_name}大人…调教${target_name}的肛门…」`,
          ); // :2564
          kojo.肛珠 = 5; // :2564-2565
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 爱慕
          await era.printAndWait(
            `「呃啊…啊啊啊…不，不行了…不能再放进去了…${player_name}，快停下…求求你…」`,
          ); // :2568
          await era.printAndWait(
            `『半途而废可是不行的哦姐姐，乖乖全部用肛门吃下去吧${heart(1)}』`,
          ); // :2569
          await era.printAndWait(
            `「啊啊！屁股里…真的已经塞满了啊啊…真的…饶了姐姐吧！」`,
          ); // :2570
          kojo.肛珠 = 4; // :2570-2571
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // A感覚Lv3以上
          await era.printAndWait(
            `『哎呀，姐姐的肛门现在这么厉害了，全部都塞进去了呢♪』`,
          ); // :2574
          await era.printAndWait(`「不，不要欺负姐姐啦…」`); // :2575
          await era.printAndWait(
            `『才不是欺负呢，姐姐真的很厉害～下次就来用更大号的肛门珠吧♪』`,
          ); // :2576
          kojo.肛珠 = 3; // :2576-2577
        } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
          // それ以外
          await era.printAndWait(
            `『才这么几颗就已经塞不进去了啊、姐姐的肛门还是缺乏调教啊♪』`,
          ); // :2580
          await era.printAndWait(`「呃啊啊！不行了，真的不行了！好痛！」`); // :2581
          await era.printAndWait(
            `「真是没办法啊，屁股外面还露着这么长一串，倒是很像猫咪的尾巴呢${heart(1)}」`,
          ); // :2582
          kojo.肛珠 = 2; // :2582-2583
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        await era.printAndWait(
          `「哎啊啊${heart(1)}…又，又进来一颗${heart(1)} 肛门好舒服${heart(1)} 舒服得要去了${heart(1)}」`,
        ); // :2588
        await era.printAndWait(
          `${target_name}像母狗一样趴在地上，翘着屁股，被充分调教和开发过的肛门，主动地开始一张一合将一颗颗珠子吞入，脸上的表情充满了享受与快意…`,
        ); // :2589
        kojo.肛珠 = 7; // :2589-2590
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「又，又有一颗更大的，进来了${heart(1)} 哈啊，哈啊，感觉…好奇怪${heart(1)}」`,
        ); // :2593
        await era.printAndWait(
          `${target_name}像母狗一样趴在地上，翘着屁股，感受着珠子一颗接一颗地塞入自己的肛门时带来的别样的快感…`,
        ); // :2594
        kojo.肛珠 = 6; // :2594-2595
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        await era.printAndWait(
          `「哈啊…啊啊…好，好羞耻啊…但如果是魔王大人的要求…再塞多少颗进来…都可以${heart(1)}」`,
        ); // :2598
        await era.printAndWait(
          `${target_name}遵循着${player_name}的命令，像母狗一样趴在地上，翘着屁股。被充分调教和开发过的肛门，主动地开始一张一合将一颗颗珠子吞入，脸上的表情充满了享受与快意……`,
        ); // :2599
        kojo.肛珠 = 5; // :2599-2600
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「啊啊…${target_name}的肛门…很敏感的，哈啊，哈啊，请魔王大人…塞珠子的时候…再稍微…温柔一点！」`,
        ); // :2603
        await era.printAndWait(
          `${player_name}遵循着${player_name}的命令，像母狗一样趴在地上，翘着屁股，感受着珠子一颗接一颗地塞入自己的肛门时带来的别样的快感…`,
        ); // :2604
        kojo.肛珠 = 4; // :2604-2605
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(
          `「为，为什么会这么舒服的…哈啊…啊啊…明明…完全不想…但是，真的好舒服啊${heart(1)}」`,
        ); // :2608
        await era.printAndWait(
          `${player_name}按着趴在地上的${target_name}的腰，将肛珠一颗接一颗塞进了肛门之中，聆听着${target_name}忍耐不住快感而发出的甘甜的喘息声………`,
        ); // :2609
        kojo.肛珠 = 3; // :2609-2610
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住，住手啊…这样欺负屁股，真的会坏掉的！」`); // :2613
        await era.printAndWait(
          `${player_name}用力按住挣扎着的${target_name}，将连串的肛珠强行塞入了肛门之中…`,
        ); // :2614
        kojo.肛珠 = 2; // :2614-2615
      }

      return 0; // :2613-2618
    }

    // :2621-2644 脱着時（TEQUIP:19 == 0）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        `「这，这就要——呃啊啊啊！${target_name}的肛门${heart(1)} 舒服得要登天了${heart(1)}」`,
      ); // :2624
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气全部拔了出来，极度的快感让她忍不住发出了淫浪的尖叫，腰身颤抖个不停，肛门痉挛得一张一合着………`,
      ); // :2625
      kojo.肛珠着脱 = 4; // :2626
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        `「哈啊…哈啊…不，不要这样…拔出几颗……就停下来一次…${target_name}的肛门…会受不了的…啊啊啊！」`,
      ); // :2629
      await era.printAndWait(
        `${player_name}故意时缓时急地抽弄着${target_name}肛门里的珠串，欣赏着${target_name}拼命忍耐的表情，再一下子突然全部抽出，看着${target_name}因为极度的快感刺激而全身脱力，瘫倒在地上，敏感的肛门还在一张一合……`,
      ); // :2630
      kojo.肛珠着脱 = 3; // :2631
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // A感覚Lv3以上
      await era.printAndWait(`「不……不能这样……一次全部拔出去啊啊啊！」`); // :2634
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气全部拔了出来，肛门极度的快感让她忍不住发出淫浪的尖叫声，双手紧紧地抓着床单，几乎要岔过气去…`,
      ); // :2635
      kojo.肛珠着脱 = 2; // :2636
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「好痛啊啊啊啊！会坏掉的，真的会坏掉的！」`); // :2639
      await era.printAndWait(
        `${target_name}肛门里的珠串被一口气强行拔了出来，整个人因为过度的刺激而脱力，瘫倒在地上，眼泪和口水全部流了出来，红肿的肛门还在一张一合……`,
      ); // :2640
      kojo.肛珠着脱 = 1; // :2641
    }
    return 0; // :2639-2643
  }

  // :2650-2951 IF SELECTCOM == 20（正常位 CFLAG:321）
  if (era_flag.selectcom === 20) {
    // :2647-2648 \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位 === 0) {
      // :2651-2757 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『哎哎，有点激动呢～姐姐的第一次，就由我收下了哦！』`,
            ); // :2659
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            ); // :2660
            await era.printAndWait(
              `「啊啊啊！插…插进来了…哈啊…哈啊${heart(1)} ${player_name}…姐姐现在开始就…成为女人了…第一次给了自己妹妹的感觉…好奇怪${heart(1)}」`,
            ); // :2661
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            ); // :2662
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            ); // :2663
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2664
            await era.printAndWait(
              `「哈啊…啊啊…已经…没法思考了。尽情地…侵犯姐姐吧…姐姐是属于${player_name}的东西了…哈啊…啊啊啊${heart(1)}」`,
            ); // :2665
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『哎哎，有点激动呢～姐姐的第一次，就由我收下了哦！！』`,
            ); // :2668
            await era.printAndWait(
              `${target_name}被${player_name}强行压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            ); // :2669
            await era.printAndWait(
              `「住手，住手啊！放开我！！我的处女…是属于魔王大人的啊！不要啊啊啊啊——」`,
            ); // :2670
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            ); // :2671
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            ); // :2672
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2673
            await era.printAndWait(
              `「为…为什么要这么做…魔王大人…为什么……呜呜呜呜」`,
            ); // :2674
          } else {
            // それ以外
            await era.printAndWait(
              `『嘿嘿嘿…魔王大人答应把姐姐的第一次赏给我了！』`,
            ); // :2677
            await era.printAndWait(
              `${target_name}被${player_name}强行压在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被${weapon}一口气突入了。`,
            ); // :2678
            await era.printAndWait(
              `「放开我，放开我！不要，不要啊！我们是姐妹啊，不可以这——啊啊啊好痛，痛死了！！救命啊…来人救救我！！」`,
            ); // :2679
            await era.printAndWait(
              `${target_name}处女的蜜穴被${player_name}一口气贯通到底。`,
            ); // :2680
            await era.printAndWait(
              `${player_name}大声喘息着，完全陶醉于夺走姐姐处女之身的强烈的心理快感中。`,
            ); // :2681
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2682
            await era.printAndWait(
              `「好痛…痛死了啊啊……拔出去，拔出去啊，求求你了！！」`,
            ); // :2683
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)} 终于…终于等到这一刻了${heart(1)} 啊啊…呃啊啊 ${heart(1)}」`,
          ); // :2688
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          ); // :2689
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，而${target_name}则回以淫媚的笑颜和极尽享受的娇声浪喘。`,
          ); // :2690
          await era.printAndWait(
            `「原来…做爱…是这么美妙的…事情…啊啊！你应该早一点让我领略的啊啊啊…干我…用力干我…再用力${heart(1)}」`,
          ); // :2691
          await era.printAndWait(
            `随着最后一处阵地的沦陷，${target_name}在${player_name}的侵犯中彻底蜕变，堕落。那个曾经纯洁无暇的乡下少女，终于彻底消失了……`,
          ); // :2692
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊${heart(1)}…魔王大人…我准备好了${heart(1)}」`,
          ); // :2695
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          ); // :2696
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，而${target_name}则回以欣喜的笑颜和痛苦与享受交织的喘息。`,
          ); // :2697
          await era.printAndWait(
            `「呃啊啊…啊啊${heart(1)} 虽然…有点痛…魔王大人…从现在开始…我就永远属于你了…${heart(1)}」`,
          ); // :2698
          await era.printAndWait(
            `${target_name}处女膜破裂，初经人事的痛楚，被与${player_name}第一次交合的感动与爱意淹没了………`,
          ); // :2699
        } else {
          // それ以外
          await era.printAndWait(
            `「住手，住手啊…放开我，快放开我！不——要——啊啊啊啊啊！」`,
          ); // :2702
          await era.printAndWait(
            `${target_name}被${player_name}强行抱在身下，分开的双腿之间，少女最私密的堡垒与最后的防线被一口气贯通到底。`,
          ); // :2703
          await era.printAndWait(
            `${player_name}丝毫没有顾虑${target_name}是第一次，无情地侵犯，蹂躏着身下的娇躯，聆听着${target_name}因为极度痛苦和屈辱而尖叫着。`,
          ); // :2704
          await era.printAndWait(
            `「啊啊…好痛，好痛。终于…要结，结束了吗？…什…什么！？不要…不要射在里面！不要！！！放开我！！」`,
          ); // :2705
        }
      } else {
        // 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            ); // :2714
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
            ); // :2715
            await era.printAndWait(
              `「啊啊…嗯啊啊…蜜穴…被塞的满满的了${heart(1)} 才刚刚插进来…就已经感觉…要高潮了一样${heart(1)}」`,
            ); // :2716
            await era.printAndWait(
              `${target_name}与${player_name}的身体交缠在一起，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
            ); // :2717
            await era.printAndWait(
              `『${player_name}最喜欢姐姐的蜜穴了…和魔王的肉棒一样喜欢${heart(1)}』`,
            ); // :2718
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            ); // :2721
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
            ); // :2722
            await era.printAndWait(
              `「啊啊啊…插…插进来了…不，不要那么用力，${player_name}…姐姐下面…撑得难受！」`,
            ); // :2723
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，持续地侵犯着蜜穴。`,
            ); // :2724
            await era.printAndWait(
              `『姐姐说什么呢？这样侵犯姐姐，我可是舒服得很呐，姐姐也应该学会享受才对${heart(1)}』`,
            ); // :2725
          } else {
            // それ以外
            await era.printAndWait(
              `『哈啊，${player_name}插进姐姐的小穴里了${heart(1)}』`,
            ); // :2728
            await era.printAndWait(
              `${target_name}被${player_name}压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
            ); // :2729
            await era.printAndWait(
              `「啊啊…好痛啊，饶了姐姐吧，求你了…不要再欺负姐姐了…」`,
            ); // :2730
            await era.printAndWait(
              `${player_name}对${target_name}的哀求置若罔闻，继续侵犯着${target_name}的蜜穴。`,
            ); // :2731
            await era.printAndWait(
              `『这怎么能算是欺负呢？姐姐应该学会享受才对${heart(1)}』`,
            ); // :2732
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊啊…再用力一点，再深一点…魔王大人…请像对待最下流的婊子那样粗暴地对待我吧${heart(1)}」`,
          ); // :2737
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，爱液泛滥的蜜穴被一口气贯通到底。`,
          ); // :2738
          await era.printAndWait(
            `而作为回应，${target_name}的蜜穴也紧紧裹住${player_name}的阴茎，像是在主动吸吮着一般。`,
          ); // :2739
          await era.printAndWait(
            `「啊啊啊…尽情地侵犯${target_name}的蜜穴吧…哈啊…啊啊…毫不留情地…顶到子宫口吧！」`,
          ); // :2740
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊啊…魔王大人…抱紧我…侵犯我${heart(1)}」`,
          ); // :2743
          await era.printAndWait(
            `${target_name}被${player_name}抱在身下，分开的双腿之间，爱液泛滥的蜜穴被一口气贯通到底。`,
          ); // :2744
          await era.printAndWait(
            `而作为回应，${target_name}的蜜穴也紧紧裹住${player_name}的阴茎，像是在主动吸吮着一般。`,
          ); // :2745
          await era.printAndWait(
            `「嗯啊…啊啊${heart(1)} 舒服得…整个人…感觉…都要融化了…${heart(1)}」`,
          ); // :2746
        } else {
          // それ以外
          await era.printAndWait(
            `「住手，住手啊啊…不要啊！啊啊啊插进来了…又插进来了……」`,
          ); // :2749
          await era.printAndWait(
            `${target_name}被${player_name}强行抱在身下，分开的双腿之间，少女的蜜穴被一口气贯通到底。`,
          ); // :2750
          await era.printAndWait(
            `${player_name}毫不留情地侵犯，蹂躏着${target_name}的娇躯，聆听着${target_name}因为痛苦和屈辱的尖叫和悲泣。`,
          ); // :2751
          await era.printAndWait(
            `「好痛，好痛啊啊啊！放过我吧，求求你，放过我吧！」`,
          ); // :2752
        }
      }
      kojo.正常位 = 1; // :2756
      return 0; // :2756-2757
    }

    // :2758-2949 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『姐姐的蜜穴……真是舒服得让人无法忍受啊啊${heart(1)}』`,
          ); // :2765
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          ); // :2766
          await era.printAndWait(
            `「啊啊…嗯啊啊…姐姐的…蜜穴，被${player_name}塞得慢慢的了…哈啊…哈啊${heart(1)}」`,
          ); // :2767
          await era.printAndWait(
            `${target_name}与${player_name}的身体交缠在一起，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
          ); // :2768
          await era.printAndWait(
            `『${player_name}最喜欢姐姐的蜜穴了…和魔王的肉棒一样喜欢${heart(1)}』`,
          ); // :2769
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「呼呼…哈啊…姐姐也是…舒服得…要说不出话了${heart(1)} 蜜穴被${player_name}侵犯的感觉…太棒了${heart(1)} 啊啊啊${heart(1)}」`,
            ); // :2771
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『哈啊啊…插进去了哦，姐姐…${heart(1)}』`); // :2773
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          ); // :2774
          await era.printAndWait(
            `紧接着，${player_name}动起腰，开始在${target_name}的蜜穴里连续地快速抽插着。`,
          ); // :2775
          await era.printAndWait(`「哈啊…嗯啊啊…好，好厉害…啊啊${heart(1)}」`); // :2776
          await era.printAndWait(
            `『哈啊…姐姐口水眼泪都一起出来了呢${heart(1)} 一副要登顶了一样的表情呢♪』`,
          ); // :2777
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「什，什么表情啊…哈啊…嗯啊啊…不，不行了……舒服得…说，说不出话了${heart(1)}」`,
            ); // :2779
            await era.printAndWait(`『哈啊…就是现在的表情啊！』`); // :2780
          }
        } else {
          await era.print(`『啊哈…插到姐姐的…小穴里了${heart(1)}姐姐…姐姐…』`); // :2783
          await era.printAndWait(
            `${player_name}将${target_name}压在身下，在${target_name}的蜜穴里一口气顶到了最深处。`,
          ); // :2784
          await era.printAndWait(
            `${weapon}抽插蜜穴时发出的不堪入耳的声音在房间里回荡着。`,
          ); // :2785
          await era.printAndWait(
            `「嗯啊啊…啊 啊${heart(1)} ${player_name}${heart(1)} ${player_name}${heart(1)} 啊啊啊${heart(1)}」`,
          ); // :2786
          await era.printAndWait(
            `${target_name}和${player_name}的身体交缠在一起，互相呼唤着对方，，沉沦在姐妹乱伦的心理和生理双重快感之中。`,
          ); // :2787
          await era.printAndWait(
            `『${player_name}好舒服啊……你感觉舒服吗，姐姐？』`,
          ); // :2788
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊啊${heart(1)} 舒服得…快说不出话了…${heart(1)} 整个人…好像要疯了一样${heart(1)}」`,
            ); // :2790
          }
        }
        kojo.正常位 = 6; // :2790-2792
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.print(
            `『啊啊啊，姐姐的蜜穴…真是舒服得让人无法忍受啊啊${heart(1)}』`,
          ); // :2796
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          ); // :2797
          await era.printAndWait(
            `「哈啊…嗯啊啊…${player_name}…稍微…不要那么粗暴……」`,
          ); // :2798
          await era.printAndWait(
            `${player_name}对${target_name}的话置若罔闻，只顾动着腰，毫不留情地侵犯着${target_name}的蜜穴。`,
          ); // :2799
          await era.printAndWait(`『要往更深的地方去了哦、姐姐♪』`); // :2800
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「哎啊啊…别…别…呃啊啊…子宫口…被顶到了啊啊…这个感觉…好奇怪啊啊${heart(1)}」`,
            ); // :2802
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『哈啊……插到姐姐的…小穴里了…${heart(1)}』`); // :2804
          await era.printAndWait(
            `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
          ); // :2805
          await era.printAndWait(
            `紧接着，${player_name}动起腰，开始在${target_name}的蜜穴里连续地快速抽插着。`,
          ); // :2806
          await era.printAndWait(
            `「哈啊…太…太激烈了…${player_name}…让姐姐…缓，缓一缓…！」`,
          ); // :2807
          await era.printAndWait(
            `『姐姐明明一脸很舒服的表情呢，别装含蓄啦，大声一点喊出来，让魔王大人也欣赏一下姐姐叫床的样子吧？』`,
          ); // :2808
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…啊啊啊，${player_name}…干得姐姐…好舒服…舒服得…要上天了……${heart(1)}」`,
            ); // :2810
          }
        } else {
          await era.print(
            `『姐姐${heart(1)} 姐姐${heart(1)}人家喜欢你啊啊啊！！』`,
          ); // :2812
          await era.printAndWait(
            `${player_name}将${target_name}压在身下，在${target_name}的蜜穴里一口气顶到了最深处。`,
          ); // :2813
          await era.printAndWait(
            `${weapon}在蜜穴抽插时发出的不堪入耳的声音在房间里回荡着。`,
          ); // :2814
          await era.printAndWait(
            `「哈啊…哈啊…快…不行了…蜜穴…感觉好奇怪…啊啊…呜啊啊！」`,
          ); // :2815
          await era.printAndWait(`『你看、变得更舒服了哦姐姐！姐姐！』`); // :2816
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…啊啊啊，姐姐…好舒服…舒服得…要上天了……${heart(1)}」`,
            ); // :2818
          }
        }
        kojo.正常位 = 5; // :2818-2820
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `『姐姐的小穴已经变得这么色情了，一下子就插到里面去了${heart(1)}』`,
          ); // :2824
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴已经完全接纳了${player_name}的${weapon}。`,
          ); // :2825
          await era.printAndWait(
            `「说，说什么呐…哈啊…哈啊…哪有…那种事…嗯啊啊啊！」`,
          ); // :2826
          await era.print(
            `『哎哎，都已经舒服成这样了、姐姐为什么就不肯坦率点呢${heart(1)}』`,
          ); // :2827
          await era.printAndWait(
            `蜜穴的强烈快感冲击下下，${target_name}无力的辩解被呻吟和娇喘取代`,
          ); // :2828
        } else if (rand_n(2) === 0) {
          await era.print(
            `『哇哇哇，姐姐的色情小穴、吸得…这么紧呐${heart(1)}』`,
          ); // :2830
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴紧紧包裹着${player_name}的${weapon}。`,
          ); // :2831
          await era.printAndWait(`「不行…不行啊…快拔出去…哈啊…嗯啊啊！」`); // :2832
          await era.print(
            `『从姐姐这么色情的小穴里拔出去？啊哈哈，别开玩笑了！我还没真正发力呢！』`,
          ); // :2833
          await era.printAndWait(
            `蜜穴的强烈快感冲击下下，${target_name}无力的辩解被呻吟和娇喘取代`,
          ); // :2834
        } else {
          await era.printAndWait(
            `「饶，饶了姐姐吧…啊啊…哈啊…真的…快不行了！」`,
          ); // :2836
          await era.print(
            `『姐姐都舒服成这个样子了，怎么就说不行了呢♪ 我继续了哦！』`,
          ); // :2837
          await era.printAndWait(
            `${target_name}爱液泛滥的蜜穴正在接受，或者说享受着${player_name}的${weapon}的连续蹂躏。`,
          ); // :2838
          await era.printAndWait(`「舒服什么的……才没有啊啊…哈啊……嗯啊啊啊！」`); // :2839
          await era.printAndWait(
            `『嘿嘿，上面的嘴还逞强，下面那张可是已经认输了${heart(1)}』`,
          ); // :2840
        }
        kojo.正常位 = 4; // :2840-2842
      } else if (
        mark(2) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.print(
          `『哈啊！姐姐，我要进去了哦${heart(1)}姐姐${heart(1)}』`,
        ); // :2845
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
        ); // :2846
        await era.printAndWait(`「为…为什么…这种事…呜呜呜」`); // :2847
        await era.printAndWait(
          `${target_name}已经完全放弃了抵抗，任由${player_name}侵犯着自己的蜜穴，只是从喉咙底发出哽咽的声音。`,
        ); // :2848
        await era.printAndWait(
          `『呼呼…啊哈哈，姐姐终于变得老实了，终于感觉到快感了吗？』`,
        ); // :2849
        kojo.正常位 = 3; // :2849-2850
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『哈啊…哈啊…侵犯姐姐的蜜穴，无论多少次都让人这么心情愉快呢${heart(1)}』`,
        ); // :2853
        await era.printAndWait(
          `${target_name}被${player_name}强行压在身下，张开的双腿之间，少女的蜜穴被${weapon}一口气贯通到底。`,
        ); // :2854
        await era.printAndWait(
          `「住，住手啊…呜呜呜…为什么…要这么对待姐姐，欺负姐姐…」`,
        ); // :2855
        await era.printAndWait(
          `面对${player_name}对蜜穴的侵犯，${target_name}只能在口头上做着无力的抵抗`,
        ); // :2856
        await era.printAndWait(
          `『欺负？才不是呢！姐姐没有也感觉到舒服吗${heart(1)}』`,
        ); // :2857
        kojo.正常位 = 2; // :2857-2858
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「哈啊…啊啊…还可以…再，再深一点…再往里一点…${heart(1)}」`,
        ); // :2864
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通直入。`,
        ); // :2865
        await era.printAndWait(
          `而作为回应，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        ); // :2866
        await era.printAndWait(
          `「尽情地侵犯我吧魔王大人…请毫不客气地…把${target_name}的蜜穴搞得一塌糊涂吧！」`,
        ); // :2867
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊…不行了…蜜穴…好舒服啊啊…舒服的…整个人都要疯了${heart(1)}」`,
          ); // :2869
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，张开的双腿之间，爱液泛滥的蜜穴被${weapon}一口气贯通到底。`,
        ); // :2871
        await era.printAndWait(
          `随后，${player_name}对着${target_name}的蜜穴深处，开始了连续的抽插，每一次都顶到了最底。`,
        ); // :2872
        await era.printAndWait(
          `「啊啊啊…太…太激烈了啊啊…哈啊啊${heart(1)} 魔王大人…原来…这么厉害${heart(1)}」`,
        ); // :2873
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `被充分调教，开发的蜜穴传来的极度的快感，完全冲垮了${target_name}的理性，让她变得语无伦次。`,
          ); // :2875
          await era.printAndWait(
            `「呼哈哈……肉穴肉穴肉穴爽上天了啊啊啊${heart(1)} 但是…还想要更多${heart(1)} 不要停，不要停呀啊啊${heart(1)}」`,
          ); // :2876
        }
      } else {
        await era.printAndWait(`「哈啊…啊啊啊…好厉害…魔王大人…${heart(1)}」`); // :2879
        await era.printAndWait(
          `${player_name}将${target_name}压在身下，毫不留情地侵犯着爱液泛滥的蜜穴。`,
        ); // :2880
        await era.printAndWait(
          `${weapon}在蜜穴抽插时发出的不堪入耳的声音在房间里回荡着。`,
        ); // :2881
        await era.printAndWait(
          `「咿呀…哈啊…蜜穴…舒服得${heart(1)} 说不出话来了啊啊啊${heart(1)}」`,
        ); // :2882
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「魔王大人…请毫不留情地…侵犯${target_name}，把${target_name}的蜜穴弄坏吧${heart(1)} 把里面搅得一团糟${heart(1)} 怎样都好…让…${target_name}登天吧${heart(1)}」`,
          ); // :2884
        }
      }
      kojo.正常位 = 6; // :2884-2886
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「哈啊……哈啊……${target_name}准备好迎接魔王大人…的阴茎了${heart(1)}」`,
        ); // :2890
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通至底。`,
        ); // :2891
        await era.printAndWait(
          `而作为回应，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        ); // :2892
        await era.printAndWait(
          `「啊哈…呜啊啊${heart(1)}好舒服…整个人…好像要融化……了一样${heart(1)}」`,
        ); // :2893
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊！不，不行了…太…舒服了…嗯啊…啊啊啊${heart(1)}」`,
          ); // :2895
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${player_name}抱着身下的${target_name}，对着爱液泛滥的蜜穴开始缓慢而有节奏地抽送着。`,
        ); // :2897
        await era.printAndWait(
          `「呜啊…魔王大人…为什么……要这么…慢慢的…哈啊${heart(1)}」`,
        ); // :2898
        await era.printAndWait(
          `似乎是等不及了一般，${target_name}的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮，摩擦了起来。`,
        ); // :2899
        await era.printAndWait(
          `「拜，拜托了…魔王大人…请…请再快点…再用力点……疼爱…${target_name}的淫穴吧${heart(1)}」`,
        ); // :2900
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `${player_name}听着身下娇躯的恳求，也终于认真了起来，突然加快了抽插的速度和力道。`,
          ); // :2902
          await era.printAndWait(
            `「哈啊…啊啊啊！感，感觉到了魔王大人的…爱意了！哈啊…啊啊…好舒服啊${heart(1)} 啊啊啊${heart(1)}」`,
          ); // :2903
        }
      } else {
        await era.printAndWait(
          `${player_name}将${target_name}压在身下，对着爱液泛滥的蜜穴，一口气贯通到了最深处。`,
        ); // :2906
        await era.printAndWait(
          `阴茎与蜜穴结合的地方连续撞击着，发出了“啪嗒”“啪嗒”的不堪入耳的淫秽声响。`,
        ); // :2907
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「哈啊…呜啊啊…蜜穴…好舒服…舒服得要上天了…${heart(1)}」`,
          ); // :2909
        }
        await era.printAndWait(
          `「啊啊啊…呜啊啊…魔王大人…我爱你…我爱你${heart(1)} 啊啊啊${heart(1)}」`,
        ); // :2910
        await era.printAndWait(
          `${target_name}被${player_name}紧抱着的身体，因为生理和心理上极度的快感而不住地颤抖了起来。`,
        ); // :2911
      }
      kojo.正常位 = 5; // :2911-2913
    } else if (
      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(`「哈啊…嗯啊啊…插，插进来了…」`); // :2917
        await era.printAndWait(
          `${target_name}被${player_name}抱在身下，爱液泛滥的蜜穴被贯通至底。`,
        ); // :2918
        await era.printAndWait(
          `似乎已经接受了自己的命运，${target_name}不再反抗，而是发出了甘甜的娇喘，享受着交媾的快感。`,
        ); // :2919
        await era.printAndWait(`「唔啊啊……哈啊…请稍微…稍微温柔一点……」`); // :2920
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「再稍…稍等一下啊啊…呜啊啊…哈啊」`); // :2922
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，阴茎径直插入了爱液泛滥的蜜穴最深处。`,
        ); // :2923
        await era.printAndWait(
          `「呜啊啊…啊啊！蜜穴被…被撑…得满满的……感觉…啊啊！」`,
        ); // :2924
        await era.printAndWait(
          `${target_name}蜜穴被${player_name}抽插的声音很快就被她自己因为快感而放声的娇喘盖过去了………`,
        ); // :2925
      } else {
        await era.printAndWait(
          `「呜啊啊…！一下就插到……最里面去了…！哈啊！呀啊啊啊！」`,
        ); // :2927
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，阴茎径直插入了爱液泛滥的蜜穴最深处。`,
        ); // :2928
        await era.printAndWait(
          `${target_name}被充分调教，开发过的蜜穴，将${player_name}的阴茎紧紧裹住，好像主动吸吮起来了一般。`,
        ); // :2929
        await era.printAndWait(`「哈啊…唔啊啊…为什么…会这么舒服的……」`); // :2930
      }
      kojo.正常位 = 4; // :2930-2932
    } else if (
      mark(2) === 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜啊啊…啊啊…插，插进来了……啊啊！」`); // :2935
      await era.printAndWait(
        `${target_name}被${player_name}抱在身下，少女的蜜穴被贯通至底。`,
      ); // :2936
      await era.printAndWait(
        `丝毫没有顾忌${target_name}的感受，${player_name}毫不留情地抽插了起来，持续侵犯着${target_name}的蜜穴。`,
      ); // :2937
      await era.printAndWait(
        `「呜啊啊…会，会痛的啊…请…请温柔一点…拜托了……！」`,
      ); // :2938
      kojo.正常位 = 3; // :2938-2939
    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「放开我！放开我！住手啊…不要——插进来啊啊啊！」`); // :2942
      await era.printAndWait(
        `${target_name}被${player_name}强行压在身下，阴茎径直插入了蜜穴最深处。`,
      ); // :2943
      await era.printAndWait(
        `丝毫不顾忌身下的${target_name}痛苦的哀鸣，${player_name}毫不留情地抽插了起来，持续侵犯着${target_name}的蜜穴。`,
      ); // :2944
      await era.printAndWait(
        `「啊啊啊啊…好痛啊啊！放过我吧，求求你，放过我吧！呜啊啊啊！」`,
      ); // :2945
      kojo.正常位 = 2; // :2945-2946
    }
    return 0; // :2946-2949
  }

  // :2957-3292 IF SELECTCOM == 21（背后位 CFLAG:322）
  if (era_flag.selectcom === 21) {
    // :2954-2955 \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    // :2967 \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 震动假阳具 # 阴茎\@
    const weapon_doggy =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '震动假阳具'
        : '阴茎';
    if (kojo.背后位 === 0) {
      // :2958-3061 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `『嘿嘿嘿…姐姐的处女身，就要到今天为止了呢${heart(1)}』`,
            ); // :2966
            await era.printAndWait(
              `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            ); // :2967
            await era.printAndWait(
              `「呜啊啊…不，不要这样啦…快点…给我肉棒…肉棒…${heart(1)}」`,
            ); // :2968
            await era.printAndWait(
              `${target_name}不断扭着腰肢，淫荡地诱惑着${player_name}。作为回应，${player_name}猛地插入了姐姐的处女蜜穴之中。`,
            ); // :2969
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2970
            await era.printAndWait(
              `「呜啊…啊啊啊…我的第一次…居然被自己的妹妹夺走了…但为什么…一点都不难过…反而感觉好…好快乐…好舒服…哈啊…嗯啊…啊啊啊${heart(1)}」`,
            ); // :2971
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `『嘿嘿嘿…姐姐的处女身，就要到今天为止了呢${heart(1)}』`,
            ); // :2974
            await era.printAndWait(
              `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            ); // :2975
            await era.printAndWait(
              `「住，住手啊啊…快放开姐姐…姐姐的第一次…是要献给魔王大人的啊啊…呜呜呜！」`,
            ); // :2976
            await era.printAndWait(
              `${target_name}拼命扭着腰想要从${player_name}身前逃脱，但少女最私密的堡垒与最后的防线依旧被${player_name}用${weapon_doggy}一口气贯通，夺走了处子之身。`,
            ); // :2977
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2978
            await era.printAndWait(
              `「不要啊啊啊啊——魔王大人…为，为什么…要这么对我…呜呜呜！」`,
            ); // :2979
          } else {
            // それ以外
            await era.printAndWait(
              `『嘿嘿嘿…魔王大人答应把姐姐你的第一次赏给我了！』`,
            ); // :2982
            await era.printAndWait(
              `${player_name}紧抱着趴在床上的${target_name}的腰，从身后用${weapon_doggy}在蜜穴口来回摩擦，挑逗着。`,
            ); // :2983
            await era.printAndWait(
              `「不要不要不要不要！我们是姐妹啊，不可以做这样的事情…住手，住手啊！！」`,
            ); // :2984
            await era.printAndWait(
              `${target_name}拼命扭着腰想要从${player_name}身前逃脱，但少女最私密的堡垒与最后的防线依旧被${player_name}用${weapon_doggy}一口气贯通，夺走了处子之身。`,
            ); // :2985
            await era.printAndWait(
              `『姐姐的处女……被我夺走了${heart(1)} 从今以后，姐姐就是属于我的了${heart(1)}』`,
            ); // :2986
            await era.printAndWait(
              `「啊啊啊——好痛，好痛啊…拔出去，快拔出去啊，姐姐求求你了！」`,
            ); // :2987
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「哈啊…啊啊…插进来了…整根都…嗯啊啊${heart(1)}…感觉…好棒${heart(1)}」`,
          ); // :2992
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}已经爱液泛滥的处女蜜穴之中，一直贯通到底。`,
          ); // :2993
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。心里和生理的双重快感下，${target_name}整个腰身挺了起来，淫浪地娇喘着。`,
          ); // :2994
          await era.printAndWait(
            `「哈啊…啊啊…第一次…做爱…居然用的是…这种动物一样的姿势…但是…哈啊…实在是…实在是太舒服了…${heart(1)}」`,
          ); // :2995
          await era.printAndWait(
            `随着最后一处阵地的沦陷，${target_name}在${player_name}的侵犯中彻底蜕变，堕落。那个曾经纯洁无暇的乡下少女，终于彻底消失了……`,
          ); // :2996
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「哈啊…啊啊！魔王大人…插进来了…整根都…嗯啊啊${heart(1)} …感觉…好棒${heart(1)}」`,
          ); // :2999
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}已经爱液泛滥的处女蜜穴之中，一直贯通到底。`,
          ); // :3000
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。心里和生理的双重快感下，${target_name}整个腰身挺了起来，发出了幸福的呻吟。`,
          ); // :3001
          await era.printAndWait(
            `「呜啊…嗯啊啊${heart(1)} 能把处女…奉献给…魔王大人${heart(1)} 是${target_name}…三生有幸啊啊啊${heart(1)}」`,
          ); // :3002
          await era.printAndWait(
            `${target_name}处女膜破裂，初经人事的痛楚，被与${player_name}第一次交合的感动与爱意淹没了………`,
          ); // :3003
        } else {
          // それ以外
          await era.printAndWait(
            `「不，不要，不要啊！放过我吧…求求你了，求求你了…不行啊啊啊啊啊！」`,
          ); // :3006
          await era.printAndWait(
            `${player_name}强行抓着${target_name}的腰，从背后进入了${target_name}未经人事的蜜穴之中，一直贯通到底。`,
          ); // :3007
          await era.printAndWait(
            `丝毫没有顾忌${target_name}处女的身份，${player_name}尽情地蹂躏，侵犯着${target_name}的蜜穴。`,
          ); // :3008
          await era.printAndWait(
            `「停…停下啊…好痛，痛死了！这样的姿势…不是把我当狗一样吗…住手啊，快住手啊！呜啊啊啊！！」`,
          ); // :3009
        }
      } else if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          ); // :3018
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          ); // :3019
          await era.printAndWait(
            `「呜啊啊！感觉到了…嗯啊啊…蜜穴被塞得满满的…好舒服…舒服得要上天了${heart(1)}」`,
          ); // :3020
          await era.printAndWait(
            `${target_name}感受着被妹妹从背后侵犯的极度快感，发出了仿佛融化一般的喘息。`,
          ); // :3021
          await era.printAndWait(
            `『啊啊！姐姐这就要去了吗，这可才刚刚开始呀${heart(1)}』`,
          ); // :3022
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          ); // :3025
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          ); // :3026
          await era.printAndWait(
            `「呜啊啊！真…真是的…为什么要用这样的…姿势……！」`,
          ); // :3027
          await era.printAndWait(
            `${target_name}忍受着妹妹从背后的侵犯，因为难受而呻吟了起来。`,
          ); // :3028
          await era.printAndWait(
            `『正戏才刚刚开始哦，姐姐${heart(1)} 我要开始发力了${heart(1)}』`,
          ); // :3029
        } else {
          // それ以外
          await era.printAndWait(
            `『哈啊…姐姐的蜜穴最深处，这次要一口气进入了哦…${heart(1)}』`,
          ); // :3032
          await era.printAndWait(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}径直插到了底。`,
          ); // :3033
          await era.printAndWait(
            `「住，住手啊…只有…狗才会……用这样的姿势交配……我们…不可以啊！」`,
          ); // :3034
          await era.printAndWait(
            `${target_name}被妹妹从背后侵犯着，发出了痛苦和屈辱的哀鸣。`,
          ); // :3035
          await era.printAndWait(
            `『哇啊…哈啊…就是要这样…侵犯母狗一样的姐姐…才更…舒服啊${heart(1)}』`,
          ); // :3036
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        // 淫乱
        await era.printAndWait(
          `「进…进来了${heart(1)} 像野兽一样的姿势…进到最里面了…啊啊…嗯啊啊啊${heart(1)}」`,
        ); // :3041
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        ); // :3042
        await era.printAndWait(
          `而${target_name}爱液泛滥的蜜穴也将${player_name}的阴茎紧紧裹住，不住地摩擦着。`,
        ); // :3043
        await era.printAndWait(
          `「哈啊…呜啊啊！还可以…再深一点…把我当成淫荡的小母狗那样侵犯吧${heart(1)}啊啊…啊啊啊…」`,
        ); // :3044
      } else if (era.get(`talent:${target}:85`) === 1) {
        // 爱慕
        await era.printAndWait(
          `「这样的姿势…有点害怕…看不见…魔王大人的脸…不过…呜啊啊！一，一下子就进到这么深里面去了…哈啊……啊啊${heart(1)}」`,
        ); // :3047
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        ); // :3048
        await era.printAndWait(
          `而${target_name}爱液泛滥的蜜穴也将${player_name}的阴茎紧紧裹住，不住地摩擦着。`,
        ); // :3049
        await era.printAndWait(
          `「真，真是${heart(1)} 毫不留情啊…啊啊…${heart(1)} 呜呜啊啊啊${heart(1)}」`,
        ); // :3050
      } else {
        // それ以外
        await era.printAndWait(
          `「这种…这种姿势…不是跟野兽没有区别吗…不要啊，不要啊啊啊！！！」`,
        ); // :3053
        await era.printAndWait(
          `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中，一直贯通到底。`,
        ); // :3054
        await era.printAndWait(
          `丝毫不顾及${target_name}因为痛苦和屈辱发出的哀鸣，${player_name}动着腰，开始毫不留情地抽插着${target_name}的蜜穴。`,
        ); // :3055
        await era.printAndWait(
          `「啊啊啊…太深了…太深了啊啊！放过我吧，求求你，放过我吧！」`,
        ); // :3056
      }
      kojo.背后位 = 1; // :3057-3060
      return 0; // :3057-3061
    }

    // :3062-3290 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『哈啊…姐姐的蜜穴…全部由我来填满吧啊啊啊啊…${heart(1)}』`,
          ); // :3069
          await era.printAndWait(
            `${player_name}扶着${target_name}的腰，从背后进入了${target_name}的蜜穴之中。`,
          ); // :3070
          await era.printAndWait(
            `「哈啊！真的…被塞得满满的了…啊啊…好…好舒服……${heart(1)}」`,
          ); // :3071
          await era.printAndWait(
            `蜜穴被妹妹连续抽插的快感让${target_name}发出了淫浪的喘息。`,
          ); // :3072
          await era.print(
            `『呼呼，姐姐别那么快就去了啊，我可还没开始发力呢${heart(1)}』`,
          ); // :3073
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊…哈啊…${player_name}好厉害${heart(1)} 我从来不知道…被自己的妹妹侵犯…是这么……舒服的事情啊啊${heart(1)}」`,
            ); // :3075
            await era.printAndWait(
              `『当然啦，我接下来还会让姐姐更舒服的哦${heart(1)}』`,
            ); // :3076
          }
        } else if (rand_n(2) === 0) {
          await era.print(
            `『这次不把姐姐的蜜穴侵犯到高潮，我是不会停下的哦！』`,
          ); // :3079
          await era.print(
            `${player_name}扶着趴在床上的${target_name}的腰，从身后用${weapon_doggy}不由分说地插了进去。`,
          ); // :3080
          await era.printAndWait(
            `${target_name}被侵犯的蜜穴，发出了“啪嗒”“啪嗒”的不堪入耳的淫秽声响。`,
          ); // :3081
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「哈啊…要，要去了…肉穴…被妹妹侵犯得…要去了啊啊啊啊${heart(1)}」`,
            ); // :3083
            await era.print(
              `被充分调教和开发过的蜜穴传来极度的快感，让${target_name}翻了白眼，意识不清地淫叫着。`,
            ); // :3084
            await era.printAndWait(
              `『哎呀呀哎呀呀，姐姐这就高潮了，还在魔王大人面前露出了啊嘿颜！！』`,
            ); // :3085
          } else {
            await era.printAndWait(
              `「呜啊……啊啊……继，继续这样侵犯姐姐吧，${player_name}${heart(1)}」`,
            ); // :3087
            await era.print(
              `蜜穴被持续侵犯传来的极度快感让${target_name}发出了甘甜悦耳的娇喘声。`,
            ); // :3088
            await era.printAndWait(`『好，我会一直侵犯到姐姐失神为止哦！』`); // :3089
          }
        } else {
          await era.printAndWait(
            `「啊……嗯啊啊……在魔王大人的注视下被侵犯……更有感觉了啊啊${heart(1)}」`,
          ); // :3092
          await era.print(`『哎哎，姐姐真的变成只想着交配的淫乱母猪了啊！』`); // :3093
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
            ); // :3095
            await era.printAndWait(
              `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
            ); // :3096
            await era.print(
              `「呜啊啊${heart(1)} 就，就是这样呢${heart(1)} 啊啊啊${heart(1)} 要，要去了……要在魔王大人的视线下高潮了啊啊${heart(1)}」`,
            ); // :3097
            await era.printAndWait(
              `『啊哈哈……被魔王大人这样看着就会高潮得更厉害的姐姐，真的无药可救了呢！』`,
            ); // :3098
          } else {
            await era.print(
              `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
            ); // :3100
            await era.print(`${target_name}的腰身一扭一扭地，不住地呻吟着。`); // :3101
            await era.printAndWait(
              `「呜啊……啊啊啊……就，就这样……毫不留情地侵，侵犯姐姐的小穴吧！」`,
            ); // :3102
          }
        }
        kojo.背后位 = 6; // :3102-3105
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.print(`『嗯啊啊……插到姐姐的最里面去了啊${heart(1)}』`); // :3109
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
          ); // :3110
          await era.printAndWait(
            `「呜……呜啊……太，太激烈了……稍微……温柔一点啦！」`,
          ); // :3111
          await era.print(
            `阴道完全容纳了妹妹胯间的${target_name}虽然嘴上这么说着，却忍不住娇喘了起来。`,
          ); // :3112
          await era.printAndWait(
            `『什么呀，才刚刚开始哦，姐姐${heart(1)} 更厉害的要来了！${heart(1)}』`,
          ); // :3113
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「唔啊……啊啊啊……被，被这样抽插的话……人家要，要高潮了啊啊！」`,
            ); // :3115
            await era.printAndWait(
              `被充分开发过的蜜穴被这样侵犯着，${target_name}已经完全沉浸在连绵的快感之中……`,
            ); // :3116
          }
        } else if (rand_n(2) === 0) {
          await era.print(`『来吧，姐姐……在妹妹的侵犯下尽情的高潮吧！』`); // :3119
          await era.print(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          ); // :3120
          await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`); // :3121
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不行啊……这样的姿势被侵犯的话……一下子……就要去了啊啊！」`,
            ); // :3123
            await era.print(
              `被充分开发过的蜜穴被妹妹用后背位侵犯着，${target_name}却只感觉到更强烈的快感…`,
            ); // :3124
            await era.printAndWait(
              `『哎呀呀，姐姐口水眼泪都出来了，要在魔王面前高潮得一塌糊涂了吗！！』`,
            ); // :3125
          } else {
            await era.printAndWait(`「哎……哎啊啊……饶了姐姐吧……！」`); // :3127
            await era.printAndWait(
              `蜜穴被妹妹连续抽插的快感让${target_name}发出了甘甜的喘息。`,
            ); // :3128
            await era.printAndWait(`『什么啦，明明很享受的样子！』`); // :3129
          }
        } else {
          await era.printAndWait(
            `「呜……呜啊啊……饶了姐姐吧……至少……不要当着魔王大人的面……这样侵犯姐姐啊啊！」`,
          ); // :3132
          await era.print(
            `『嘿嘿嘿，这可是魔王大人的命令哦，难道你想不听话吗${heart(1)}』`,
          ); // :3133
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
            ); // :3135
            await era.printAndWait(
              `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
            ); // :3136
            await era.print(
              `「咿啊……啊啊啊${heart(1)} 虽然这么说……但是这样被魔王大人看着……还是很羞耻啊啊啊${heart(1)}」`,
            ); // :3137
            await era.printAndWait(
              `『哼哼，明明喊的比平时都要大声呢，当着魔王大人的面被侵犯，感觉更舒服了吧！』`,
            ); // :3138
          } else {
            await era.printAndWait(
              `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
            ); // :3140
            await era.printAndWait(
              `${target_name}好像要逃避一样的扭动着腰身，却只让${player_name}更加兴奋起来。`,
            ); // :3141
            await era.print(
              `『姐姐的表情，好像马上就要高潮了呢，魔王大人快看啊！』`,
            ); // :3142
            await era.printAndWait(`「不，不要……不要看啊，魔王大人！」`); // :3143
          }
        }
        kojo.背后位 = 5; // :3143-3146
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(`『呜哇哇……姐姐的小穴……好暖好舒服！』`); // :3150
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
          ); // :3151
          await era.printAndWait(
            `「呜……呜啊啊……被，被这种姿势侵犯……啊啊啊！」`,
          ); // :3152
          await era.print(
            `激烈的交合下，${target_name}的蜜穴里爱液更泛滥地涌了出来`,
          ); // :3153
          await era.printAndWait(
            `『嘿嘿，姐姐的声音听起来也好像很享受呢，要高潮了吗？要高潮了吗？』`,
          ); // :3154
        } else if (rand_n(2) === 0) {
          await era.print(`『呜哇哇……姐姐真是最棒了……人也是，小穴也是！』`); // :3156
          await era.printAndWait(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          ); // :3157
          await era.printAndWait(
            `蜜穴交合处随着${player_name}的动作发出一声声下流的声响。`,
          ); // :3158
          await era.print(
            `『姐姐的蜜穴已经被开发的很好了呢，这样的话就可以取悦魔王大人了♪』`,
          ); // :3159
          await era.printAndWait(
            `「说，说谎……开发什么的……呜……呜啊啊……可是……为什么会……这么舒服啊啊！」`,
          ); // :3160
        } else {
          await era.printAndWait(
            `「呜……呜啊……稍微……稍微温柔一点吧……求你了！」`,
          ); // :3162
          await era.print(`『姐姐这就忍不住要高潮了吗${heart(1)}』`); // :3163
          await era.print(
            `${player_name}用${weapon}从后面毫不留情地侵犯着${target_name}的蜜穴。`,
          ); // :3164
          await era.print(
            `${target_name}的蜜穴交合时发出的声音越来越响，却还是被${target_name}的娇喘掩盖过去了。`,
          ); // :3165
          await era.printAndWait(
            `「求求你了……${player_name}！饶了姐姐吧……小穴真的，真的已经……啊啊啊！」`,
          ); // :3166
        }
        kojo.背后位 = 4; // :3166-3168
      } else if (
        mark(2) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.print(
          `『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』`,
        ); // :3171
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
        ); // :3172
        await era.printAndWait(`「呜……呜呜……好痛……温柔一点……求求你……！」`); // :3173
        await era.print(
          `被妹妹用后背位侵犯着的${target_name}只能拼命忍受着屈辱与痛苦，但是这个样子却让${player_name}更加兴奋了起来`,
        ); // :3174
        await era.printAndWait(
          `『嘿嘿，姐姐终于肯老老实实听话了么，那就把姐姐侵犯到高潮作为奖励吧${heart(1)}』`,
        ); // :3175
        kojo.背后位 = 3; // :3175-3176
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『唔哇哇……被这个姿势侵犯的姐姐……好像母狗一样呢……感觉是不是棒极了！』`,
        ); // :3179
        await era.printAndWait(
          `${player_name}强行抓着${target_name}的腰，用${weapon}在蜜穴里用力抽插着。`,
        ); // :3180
        await era.printAndWait(
          `「住，住手啊……快拔出去……我们，我们是姐妹啊！」`,
        ); // :3181
        await era.print(`${target_name}痛苦的呻吟丝毫无法打动${player_name}。`); // :3182
        await era.printAndWait(
          `『嘿嘿，一起做魔王大人的母狗姐妹也没问题哦${heart(1)}』`,
        ); // :3183
        kojo.背后位 = 2; // :3183-3184
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊……这种姿势……好像……狗在交配一样${heart(1)} 但是……好棒……好舒服${heart(1)}」`,
        ); // :3190
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面。`,
        ); // :3191
        await era.printAndWait(
          `作为回应，爱液泛滥的蜜穴也紧紧地夹住了${player_name}的阴茎`,
        ); // :3192
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「继……继续侵犯${target_name}吧${heart(1)} 就像侵犯母狗一样啊啊${heart(1)}」`,
          ); // :3194
          await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`); // :3195
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……好舒服……继续……继续这样侵犯人家吧${heart(1)}」`,
          ); // :3197
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「嗯啊……啊啊…${heart(1)} 顶，顶到子宫口了啊啊${heart(1)}」`,
        ); // :3200
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面`,
        ); // :3201
        await era.printAndWait(
          `然后，在${target_name}的蜜穴里开始缓慢而用力地抽送起来`,
        ); // :3202
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜……呜啊啊…${heart(1)} 要，要去了……小母狗要，要去了啊啊啊${heart(1)}」`,
          ); // :3204
          await era.printAndWait(
            `${target_name}不断扭动着腰，寻求着更激烈的快感……`,
          ); // :3205
        } else {
          await era.printAndWait(`「呜……呜啊啊！好，好舒服啊啊${heart(1)}！」`); // :3207
        }
      } else {
        await era.printAndWait(
          `「嗯啊啊！好，好厉害……魔王大人的阴茎${heart(1)} 在人家的淫穴里……${heart(1)} 啊啊啊，插，插到子宫口了啊啊${heart(1)}」`,
        ); // :3210
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
        ); // :3211
        await era.printAndWait(
          `爱液随着两人的交合，以及${target_name}的娇喘一次次喷洒出来。`,
        ); // :3212
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜啊啊${heart(1)} 要，要去了${heart(1)} 魔王大人的阴茎${heart(1)} 真的是……太棒了啊啊啊${heart(1)}」`,
          ); // :3214
          await era.printAndWait(
            `${target_name}的腰在${player_name}激烈侵犯下，一挺一挺的，完全沉浸在了交媾的快感中……`,
          ); // :3215
        } else {
          await era.printAndWait(`「呜……呜啊……要，要去了啊啊${heart(1)}！」`); // :3217
        }
      }
      kojo.背后位 = 6; // :3217-3220
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊啊啊${heart(1)} 被，被魔王大人……顶到……子宫口了啊啊啊${heart(1)}」`,
        ); // :3224
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，勃起的阴茎一口气贯入到了最里面。`,
        ); // :3225
        await era.printAndWait(
          `作为回应，爱液泛滥的蜜穴也紧紧地夹住了${player_name}的阴茎`,
        ); // :3226
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「尽情地侵，侵犯人家吧……侵犯到……怀孕为止啊啊啊${heart(1)}」`,
          ); // :3228
          await era.printAndWait(
            `${target_name}随着每次交合，发出一声声甜美的娇喘……`,
          ); // :3229
        } else {
          await era.printAndWait(`「嗯啊……啊啊……${target_name}……好幸福！」`); // :3231
        }
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「嗯啊……啊啊啊${heart(1)} 好像母狗一样……被魔王大人侵犯着……${heart(1)}」`,
        ); // :3234
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
        ); // :3235
        await era.printAndWait(
          `然后，在${target_name}紧致的蜜穴里开始缓慢而用力地抽送起来`,
        ); // :3236
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「呜……呜啊……魔王大人……不，不要故意这样……慢慢来啊啊${heart(1)} 对，对不起……是${target_name}心急了……呜呜」`,
          ); // :3238
          await era.printAndWait(
            `${target_name}沉浸在交媾的快感中，整个身体都弓了起来，发出一声声甘甜的娇喘。`,
          ); // :3239
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……好舒服……继续……继续这样侵犯人家吧${heart(1)}！」`,
          ); // :3241
        }
      } else {
        await era.printAndWait(
          `「呜……呜啊！好，好激烈……魔王大人的阴茎……在人家的小穴里……！」`,
        ); // :3244
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面，然后连续地抽插起来`,
        ); // :3245
        await era.printAndWait(
          `两人的交合处发出一声声不堪入耳的响声，却完全被${target_name}甘甜而尽情的娇喘掩盖了过去`,
        ); // :3246
        if (chara(target).system.私处感觉 >= 3) {
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 明明……被当成母狗一样${heart(1)} 但……但为什么……比平时${heart(1)} 还要舒服啊啊啊${heart(1)}」`,
          ); // :3248
          await era.printAndWait(
            `${target_name}的腰在${player_name}激烈侵犯下，一挺一挺的，完全沉浸在了交媾的快感中……`,
          ); // :3249
        } else {
          await era.printAndWait(
            `「嗯啊……啊啊……魔王大人……稍，稍微……温柔一点！！」`,
          ); // :3251
        }
      }
      kojo.背后位 = 5; // :3251-3254
    } else if (
      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜……呜啊啊……能，能换个姿势吗……这样实在……啊啊啊！」`,
        ); // :3258
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        ); // :3259
        await era.printAndWait(
          `${target_name}的蜜穴在一次次激烈的交合中不住地喷出爱液。`,
        ); // :3260
        await era.printAndWait(
          `「嗯啊……啊啊……魔，魔王大人……太……太激烈了啊啊！」`,
        ); // :3261
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「插，插到最深处了……魔王大人的阴茎……呜……呜啊啊！」`,
        ); // :3263
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        ); // :3264
        await era.printAndWait(`两人的交合处发出一声声不堪入耳的响声。。`); // :3265
        await era.printAndWait(
          `「呜……呜呜……明明不，不想……但为，为什么……会这么舒服啊啊啊！」`,
        ); // :3266
      } else {
        await era.printAndWait(
          `「魔，魔王大人……温柔一点……人家的小穴要坏……坏掉了啊啊！」`,
        ); // :3268
        await era.printAndWait(
          `${player_name}抓着${target_name}的腰，毫不留情地用${weapon}在蜜穴里用力抽插着。`,
        ); // :3269
        await era.printAndWait(
          `虽然嘴上这么说，但是随着每次交合，${target_name}却不住地娇喘起来`,
        ); // :3270
        await era.printAndWait(
          `「拜，拜托了……魔王大人……人家真的，真的已经……到极限了啊啊啊！」`,
        ); // :3271
      }
      kojo.背后位 = 4; // :3271-3273
    } else if (
      mark(2) === 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3
      await era.printAndWait(`「呜呜……插……插进来了……！」`); // :3276
      await era.printAndWait(
        `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
      ); // :3277
      await era.printAndWait(
        `在${player_name}毫不留情的连续抽插下，${target_name}只能咬着嘴唇拼命忍耐着`,
      ); // :3278
      await era.printAndWait(`「魔，魔王大人……求……求你……稍微……温柔一点！」`); // :3279
      kojo.背后位 = 3; // :3279-3280
    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
      // それ以外
      await era.printAndWait(`「放，放开我……不，不要啊啊啊！」`); // :3283
      await era.printAndWait(
        `${player_name}抱着${target_name}的腰，从背后将勃起的阴茎一口气贯入到了最里面。`,
      ); // :3284
      await era.printAndWait(
        `无力抵抗的${target_name}只能在自己的悲鸣声中拼命忍耐着。`,
      ); // :3285
      await era.printAndWait(`「这种姿势……这种……狗一样的姿势！呜呜呜……」`); // :3286
      kojo.背后位 = 2; // :3286-3287
    }
    return 0; // :3287-3290
  }

  // :3298-3505 IF SELECTCOM == 22（对面座位 CFLAG:323）
  if (era_flag.selectcom === 22) {
    if (kojo.对面座位 === 0) {
      // :3300-3340 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女（原作模板骨架未填写，PRINTFORMW 无正文）
        await era.printAndWait(''); // :3302
      } else {
        // 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呜……呜啊……${heart(1)} ${player_name}……请……请再……${heart(1)}」`,
            ); // :3309
            await era.printAndWait(
              `『啧啧，姐姐哟姐姐${heart(1)} 被这样一舔乳头，下面就夹得更紧了呀${heart(1)}』`,
            ); // :3310
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            ); // :3311
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「呜…呜啊啊……不，不可以……同时进攻……蜜穴和乳头啊啊！」`,
            ); // :3314
            await era.printAndWait(
              `『啧啧，姐姐哟姐姐${heart(1)} 下面就夹得这么紧，乳头是弱点呢${heart(1)}』`,
            ); // :3315
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            ); // :3316
          } else {
            // それ以外
            await era.printAndWait(
              `『姐姐的胸部真可爱，这样被同时侵犯着，感觉很舒服吧♪』`,
            ); // :3319
            await era.printAndWait(`「呜……呜呜……为，为什么要……这样！」`); // :3320
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，吸吮着乳头的同时侵犯着蜜穴……`,
            ); // :3321
          }
        } else {
          // 淫乱
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「嗯啊……啊啊……顶，顶到最里面了啊啊${heart(1)} 」`,
            ); // :3326
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，随着阴茎一次次顶入蜜穴最深处娇喘着……`,
            ); // :3327
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「抱，抱紧我……魔王大人……嗯啊……啊啊${heart(1)}」`,
            ); // :3330
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，在交合中不住地喘息着`,
            ); // :3331
          } else {
            // それ以外
            await era.printAndWait(`「好……好难受……这样姿势……呜呜！」`); // :3334
            await era.printAndWait(`${target_name}在你的腿上悲惨地呻吟着………`); // :3335
          }
        }
      }
      kojo.对面座位 = 1; // :3339
      return 0; // :3339-3340
    }
    // :3341-3502 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈……哈啊……！这样……这样好舒服……${heart(1)} 继续……舔姐姐的乳头吧……${player_name}${heart(1)}」`,
          ); // :3348
          await era.print(
            `『哎呀呀，姐姐居然已经这么淫乱了${heart(1)} 下面吸得紧紧的，真的有那么舒服吗${heart(1)}』`,
          ); // :3349
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「是……是的……姐姐就是一只淫乱的……母狗啊啊啊…${heart(1)}」`,
            ); // :3351
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，吸吮，舔舐着敏感的乳头，蜜穴也被连续的侵犯着，感受着双倍的快感……`,
            ); // :3352
          } else {
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，同时侵犯着双乳和蜜穴……`,
            ); // :3354
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好，好舒服……这个姿势……${heart(1)} 啊啊啊${heart(1)}」`,
          ); // :3357
          await era.print(
            `『我也是啊……这样边抱着边侵犯姐姐……嗯啊啊${heart(1)}』`,
          ); // :3358
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「再，再深一点……${heart(1)} 顶进姐姐的子宫……也可以的${heart(1)} 啊啊……好棒${heart(1)}」`,
            ); // :3360
            await era.printAndWait(
              `${target_name}蜜穴已经被开发，调教得无比敏感，传来的快感随着妹妹每次挺起腰而愈发强烈……`,
            ); // :3361
          } else {
            await era.printAndWait(
              `${player_name}抱着${target_name}，一次次挺起腰侵犯着姐姐的蜜穴……`,
            ); // :3363
          }
        } else {
          await era.printAndWait(
            `「呜啊……啊啊……不，不行了${heart(1)} 好舒服，好舒服啊啊${heart(1)}」`,
          ); // :3366
          await era.print(
            `『唔哇哇，姐姐不要老是乱动啊，这样插不到最里面了哇！』`,
          ); // :3367
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「好……好的……我会乖乖的${heart(1)}嗯啊啊……要，要去了……要被妹妹侵犯得……高潮了啊啊${heart(1)}」`,
            ); // :3369
            await era.printAndWait(
              `${target_name}被自己的妹妹侵犯得痴态毕露，已经完全抛却任何尊严了……`,
            ); // :3370
          } else {
            await era.printAndWait(
              `${player_name}一边抱怨着，一边动着腰，继续侵犯着${target_name}的蜜穴……`,
            ); // :3372
          }
        }
        kojo.对面座位 = 6; // :3373-3375
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯啊……不，不行啊……一边侵犯蜜穴……一边吸着乳头……是犯规的啊啊${heart(1)}」`,
          ); // :3379
          await era.print(
            `『哎嘿嘿${heart(1)} 发现姐姐弱点了呢，胸部一被攻击，小穴就夹得紧紧的${heart(1)}』`,
          ); // :3380
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不是这样的……呜啊啊……但是，但是……真的好舒服啊啊啊${heart(1)}」`,
            ); // :3382
            await era.printAndWait(
              `${target_name}被${player_name}抱在大腿上，吸吮，舔舐着敏感的乳头，蜜穴也被连续的侵犯着，整个人几乎融化在连绵的快感中了……`,
            ); // :3383
          } else {
            await era.printAndWait(
              `「才没，没有那样的弱点……呜啊……啊啊${heart(1)}」`,
            ); // :3385
            await era.printAndWait(
              `${target_name}被${player_name}抱在腿上，继续同时侵犯着双乳和蜜穴……`,
            ); // :3386
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊……不，不要再，再往里顶了，${player_name}……姐姐的小穴……会坏掉的啊啊！」`,
          ); // :3389
          await era.print(
            `『吓？真的是这样吗？嘴上这么说着，但是我怎么觉得姐姐的下面夹得更紧了呢	？』`,
          ); // :3390
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「才，才没有……嗯啊……啊啊啊！！插，插到最里面了……好，好舒服啊啊${heart(1)}」`,
            ); // :3392
            await era.print(
              `『嘿嘿，果然很舒服嘛，接下来就要顶到姐姐的子宫口了哦！』`,
            ); // :3393
            await era.printAndWait(
              `${player_name}嬉笑着，挺起腰，继续把阴茎顶入到${target_name}蜜穴更深处……`,
            ); // :3394
          } else {
            await era.printAndWait(
              `${target_name}交织着痛苦与舒服的表情，与${player_name}尽情享受着的笑颜相映着……`,
            ); // :3396
          }
        } else {
          await era.printAndWait(
            `「呜……呜啊啊！被${player_name}……侵犯得……要升天了啊啊${heart(1)}！」`,
          ); // :3399
          await era.print(
            `『哎呀呀，姐姐都舒服成这个样子了，这么喜欢被抱在腿上侵犯吗？』`,
          ); // :3400
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「嗯啊啊……不，不只是因为这个……更，更因为是被妹妹……被我最爱的${player_name}侵犯着……才更加舒服啊啊！」`,
            ); // :3402
            await era.print(
              `『哎呀呀，听到姐姐这么说，人家很高兴呢，再给姐姐一点奖励好了！顶到子宫口的奖励!${heart(1)}』`,
            ); // :3403
            await era.printAndWait(
              `${player_name}嬉笑着挺起腰，往${target_name}蜜穴的更深处顶入……`,
            ); // :3404
          } else {
            await era.printAndWait(
              `${target_name}交织着苦闷与舒服的表情，与${player_name}尽情享受着的笑颜相映着……`,
            ); // :3406
          }
        }
        kojo.对面座位 = 5; // :3407-3409
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……咿啊啊……为，为什么……会这么舒服的！」`,
          ); // :3413
          await era.print(
            `『嘿嘿，姐姐终于坦率地面对自己的欲望了么，我也为姐姐高兴呢${heart(1)}』`,
          ); // :3414
          await era.printAndWait(
            `${player_name}嬉笑着，将${target_name}抱在腿上，更加用力地侵犯着姐姐的蜜穴……`,
          ); // :3415
        } else {
          await era.print(`『姐姐准备被我侵犯到高潮吧♪』`); // :3417
          await era.printAndWait(
            `「呜啊……嗯啊啊……感觉好，好奇怪……但是好舒服啊啊！」`,
          ); // :3418
          await era.printAndWait(
            `${target_name}被自己的妹妹持续侵犯着蜜穴，在背德感与快感的双重折磨中呻吟了起来……`,
          ); // :3419
        }
        kojo.对面座位 = 4; // :3419-3421
      } else if (
        mark(2) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「求，求你了……稍微温柔一点吧……看在我是你的姐姐的份上……」`,
        ); // :3424
        await era.print(`『身体放松些啦姐姐，很快就会舒服起来的！』`); // :3425
        await era.printAndWait(
          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,
        ); // :3426
        kojo.对面座位 = 3; // :3426-3427
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.print(
          `『唔哇哇……边侵犯姐姐边把脸埋在姐姐淫乱的大胸部里面……真是太棒了！』`,
        ); // :3430
        await era.printAndWait(
          `「呜……呜呜……求求你了……不要再折磨姐姐了……呜呜呜」`,
        ); // :3431
        await era.printAndWait(
          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,
        ); // :3432
        kojo.对面座位 = 2; // :3432-3433
      }
    } else {
      // 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……尽情地，侵犯人家的淫穴吧魔王大人……侵犯到人家彻底坏掉吧啊啊啊${heart(1)} 」`,
          ); // :3439
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯啊……啊啊……顶，顶到最里面了……魔王大人的阴茎……顶到人家的子宫口了啊啊${heart(1)}」`,
          ); // :3441
        } else {
          await era.printAndWait(
            `「哈啊……哈啊……这样抱着魔王大人做爱……好舒服啊啊${heart(1)}」`,
          ); // :3443
        }
        if (chara(target).system.私处感觉 >= 3) {
          await era.print(
            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3446
        } else {
          await era.print(`「呜啊……小穴……实在是太舒服了啊啊啊」`); // :3448
        }
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上，淫浪的娇喘声伴随着每一次交合响彻整个房间……`,
          ); // :3451
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}紧抱着${player_name}，双乳在${player_name}的胸膛上摩擦着……`,
          ); // :3453
        } else {
          await era.printAndWait(
            `${target_name}享受着交合的极度快感，娇喘声连绵不绝。……`,
          ); // :3455
        }
        kojo.对面座位 = 6; // :3455-3457
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……魔王大人，魔王大人，尽情的侵犯你的性奴${target_name}吧${heart(1)}」`,
          ); // :3461
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊……顶，顶到……子宫口了啊啊啊${heart(1)}」`,
          ); // :3463
        } else {
          await era.printAndWait(`「魔，魔王大人……在吻我……好幸福……呣呣……」`); // :3465
        }
        if (chara(target).system.私处感觉 >= 3) {
          await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`); // :3468
        } else {
          await era.print(`「呜啊……小穴……实在是太舒服了啊啊啊」`); // :3470
        }
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上，娇喘着享受着交合的快感………`,
          ); // :3473
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `甜美地娇喘声中，${target_name}紧紧抱着${player_name}的身体……`,
          ); // :3475
        } else {
          await era.printAndWait(
            `${target_name}感受着交合的快感，表情仿佛要融化了一般………`,
          ); // :3477
        }
        kojo.对面座位 = 5; // :3477-3479
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        await era.printAndWait(
          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
        ); // :3482
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜……呜啊啊……再这样下去……身体就，就再也回不到……以前的样子了……」`,
          ); // :3484
          await era.printAndWait(
            `${target_name}被${player_name}抱在怀里无法挣脱，只能任由阴茎在自己的蜜穴里肆虐着……`,
          ); // :3485
        } else {
          await era.printAndWait(
            `「呜啊……嗯啊啊……感觉好奇怪……脑袋也是，身体也是……要，要不行了！」`,
          ); // :3487
          await era.printAndWait(
            `${target_name}被${player_name}抱在怀中、随着蜜穴被阴茎一次次顶入，快感也一波波传递向大脑……`,
          ); // :3488
        }
        kojo.对面座位 = 4; // :3488-3490
      } else if (
        mark(2) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`「饶，饶了我吧……魔王大人……已经不行了……」`); // :3493
        await era.printAndWait(
          `${target_name}被${player_name}强行抱在怀里蹂躏着蜜穴，只能边呻吟边拼命忍耐着`,
        ); // :3494
        kojo.对面座位 = 3; // :3494-3495
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「呜……呜啊啊，好痛……不，不能再进去了……呜呜！」`,
        ); // :3498
        await era.printAndWait(
          `${player_name}过于激烈的动作让${target_name}痛苦地悲鸣了起来……`,
        ); // :3499
        kojo.对面座位 = 2; // :3499-3500
      }
    }
    return 0; // :3500-3503
  }
  // :3511-3758 IF SELECTCOM == 23（背面座位 CFLAG:324）
  if (era_flag.selectcom === 23) {
    // :3508-3509 \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.背面座位 === 0) {
      // :3512-3556 初めて
      const virgin = era.get(`talent:${target}:0`) === 1;
      if (virgin) {
        // 处女（原作模板骨架未填写，PRINTFORMW 无正文）
        await era.printAndWait(''); // :3515 PRINTFORMW 空行
      } else {
        // :3517-3555 非处女
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呀啊啊……这样的姿势……真受不了啊${heart(1)}」`,
            ); // :3522
            await era.printAndWait(
              `『姐姐双腿分开一点，要好好让魔王大人欣赏啊♪』`,
            ); // :3523
            await era.printAndWait(
              `「好……好的……魔王大人……请，请欣赏${target_name}被妹妹侵犯到高潮的样子吧${heart(1)}」`,
            ); // :3524
            await era.printAndWait(
              `${target_name}顺从地岔开双腿，完全沉浸在被自己妹妹侵犯的背德快感之中……`,
            ); // :3525
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「呜…呜啊啊……太，太激烈了……这样姐姐……会坏掉的啊啊！！！」`,
            ); // :3528
            await era.printAndWait(
              `『姐姐的娇喘真动听呢，是因为被魔王大人看着的原因吗？我都不知道原来姐姐是变态暴露狂呢！』`,
            ); // :3529
            await era.printAndWait(
              `「什……什么……魔王大人在看吗？不，不要啊啊${heart(1)} 好，好丢脸……但是好舒服啊啊啊！」`,
            ); // :3530
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
            ); // :3531
          } else {
            // それ以外
            await era.printAndWait(
              `「饶……饶了姐姐吧……真的，真的已经不行了！」`,
            ); // :3534
            await era.printAndWait(
              `『说什么呢，姐姐，好好张开腿让魔王大人欣赏你被侵犯的样子啊♪』`,
            ); // :3535
            await era.printAndWait(`「什，什么？不要看，不要看呜呜……」`); // :3536
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏着的蜜穴一览无余地展露着……`,
            ); // :3537
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            // 淫乱
            await era.printAndWait(
              `「呜……呜啊啊${heart(1)} 这样的姿势……原来可以顶到这么里面……啊啊${heart(1)}」`,
            ); // :3542
            await era.printAndWait(
              `「魔王大人……手，手也不要闲着嘛……来吧，我的大胸部……你不是一直很喜欢吗${heart(1)}」`,
            ); // :3543
            await era.printAndWait(
              `${target_name}抓着${player_name}的手按在自己的双乳上，被侵犯的蜜穴传来的快感更加强烈了……`,
            ); // :3544
          } else if (era.get(`talent:${target}:85`) === 1) {
            // 爱慕
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)}魔王大人这样边揉胸部……边抽插小穴……是犯规的啊啊${heart(1)} ！」`,
            ); // :3547
            await era.printAndWait(
              `「不，不要分开人家的双腿啦……好，好害羞……还，还是摸胸部比较好一点${heart(1)}」`,
            ); // :3548
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
            ); // :3549
          } else {
            // それ以外
            await era.printAndWait(`「不，不要啊啊……这样的姿势……好羞耻！」`); // :3552
            await era.printAndWait(
              `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏着的蜜穴一览无余地展露着……`,
            ); // :3553
          }
        }
      }
      kojo.背面座位 = 1; // :3557
      return 0; // :3557-3558
    }
    // :3559-3756 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            `『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』`,
          ); // :3566
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :3568
            await era.printAndWait(
              `${target_name}无意识地岔开双腿，完全沉浸在与妹妹交合的背德快感之中……`,
            ); // :3569
          } else {
            await era.print(
              `「好……好的……魔王大人……请，请欣赏${target_name}被妹妹侵犯到高潮的样子吧${heart(1)}」`,
            ); // :3571
            await era.printAndWait(
              `${target_name}顺从地岔开双腿，展露着自己正被蹂躏着的蜜穴`,
            ); // :3572
          }
        } else if (rand_n(2) === 0) {
          await era.print(
            `『嗯啊……姐姐，这样舒服吗？舒服吗？快说呀，不然我就停下来了哦！』`,
          ); // :3575
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「嗯啊啊……啊啊……小穴……舒服得……像是要坏掉了一样啊啊」`,
            ); // :3577
            await era.printAndWait(
              `「呜……呜啊……太，太激烈了……姐姐真的要，要去了啊啊${heart(1)}」`,
            ); // :3578
            await era.printAndWait(
              `${target_name}娇喘着，尽情享受着同时被妹妹从身后侵犯胸部和小穴的快感……`,
            ); // :3579
          } else {
            await era.print(`「呜啊……顶，顶的太深了……不，不行了啊啊」`); // :3581
            await era.printAndWait(`「要去了，要去了啊啊啊！」`); // :3582
            await era.printAndWait(
              `${target_name}呻吟着，享受着被妹妹从身后侵犯胸部和小穴的快感………`,
            ); // :3583
          }
        } else {
          await era.print(
            `『嘿嘿嘿，我要开始认真了哦，姐姐！在妹妹的侵犯下高潮吧』`,
          ); // :3586
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :3588
            await era.print(
              `『唔哇哇，姐姐的声音这么淫乱，再让我和魔王大人听听呀${heart(1)}』`,
            ); // :3589
            await era.printAndWait(
              `${player_name}搓揉着${target_name}丰满的双乳，腰一挺一挺地侵犯着姐姐的蜜穴……`,
            ); // :3590
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`); // :3592
            await era.print(
              `『哎嘿嘿，好像还差一点火候呢，接下来就夹击的姐姐的大胸部好了${heart(1)}』`,
            ); // :3593
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            ); // :3594
          }
        }
        kojo.背面座位 = 6; // :3594-3597
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「嗯啊啊……啊啊……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :3602
          } else {
            await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`); // :3604
          }
          await era.printAndWait(
            `『姐姐的娇喘真动听呢，是因为被魔王大人看着的原因吗？我都不知道原来姐姐是变态暴露狂呢！』`,
          ); // :3606
          await era.printAndWait(
            `「什……什么……魔王大人在看吗？不，不要啊啊${heart(1)} 好，好丢脸……但是好舒服啊啊啊！${heart(1)} 」`,
          ); // :3607
          await era.printAndWait(
            `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏到爱液泛滥的蜜穴一览无余地展露着……`,
          ); // :3608
        } else if (rand_n(2) === 0) {
          await era.print(
            `『哎啊啊，姐姐的小穴真是太棒了，夹得这么紧，你也一定很舒服吧啊啊！』`,
          ); // :3610
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`); // :3612
            await era.print(
              `『啧啧，我都不知道姐姐原来可以发出这么淫乱的声音呢${heart(1)} 魔王大人快来看呀，姐姐要高潮了呢${heart(1)}』`,
            ); // :3613
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            ); // :3614
          } else {
            await era.print(`「呜……呜……」`); // :3616
            await era.print(
              `『舒服就大声喊出来呀姐姐${heart(1)} 老是憋着不发出声音，魔王大人会不高兴的！』`,
            ); // :3617
            await era.printAndWait(
              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,
            ); // :3618
          }
        } else {
          await era.print(
            `『双腿分开些啊姐姐，让魔王大人好好看着你的淫乱样子♪』`,
          ); // :3621
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            ); // :3623
            await era.print(
              `『哎呀呀，真的自己分开腿了呢！变态暴露狂姐姐被人看着会更有感觉吗？那就在魔王大人面前高潮吧！』`,
            ); // :3624
            await era.printAndWait(
              `${target_name}被${player_name}侮辱着，无论内心还是蜜穴的快感却更加强烈了………`,
            ); // :3625
          } else {
            await era.print(`「不，不行了……舒服得……要去了……」`); // :3627
            await era.print(
              `『魔王大人快看啊，姐姐要高潮了呢${heart(1)} 嘿！不许偷偷合上！』`,
            ); // :3628
            await era.printAndWait(
              `${target_name}在${player_name}命令下展开双腿，展露着自己正被侵犯着的蜜穴……`,
            ); // :3629
          }
        }
        kojo.背面座位 = 5; // :3629-3632
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`); // :3636
        } else {
          await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`); // :3638
        }
        await era.print(
          `『哎呀呀，真的那么舒服吗姐姐，我还没要求，腿就自己张开了，那么想让魔王大人看见你小穴高潮的样子吗？』`,
        ); // :3640
        await era.printAndWait(`「才，才没有……这种事……嗯啊啊！」`); // :3641
        await era.printAndWait(
          `${target_name}终于忍不住娇喘了起来，身体也随着妹妹的侵犯颤抖着…`,
        ); // :3642
        kojo.背面座位 = 4; // :3642-3643
      } else if (
        mark(2) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          `「呜……呜啊……不，不能再往里顶了……会，会坏掉的！」`,
        ); // :3646
        await era.print(
          `『感觉到舒服的话就把腿张开一些啊姐姐，让魔王大人欣赏一下你小穴高潮的样子。』`,
        ); // :3647
        await era.printAndWait(`「才……才没有感觉舒服……呜呜……」`); // :3648
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        ); // :3649
        kojo.背面座位 = 3; // :3648-3650
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(
          `「放，放开我啊，${player_name}！我是，我是你的姐姐啊……呜呜呜……不，不要再折磨我了……」`,
        ); // :3653
        await era.print(
          `『不要把腿合上，给我张开！让魔王大人好好看看你被自己的亲妹妹侵犯的样子吧♪』`,
        ); // :3654
        await era.printAndWait(`「住，住手……求你了！不要看，不要看啊啊啊！」`); // :3655
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        ); // :3656
        kojo.背面座位 = 2; // :3655-3657
      }
    } else {
      // 淫乱
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊…${heart(1)} 顶，顶到最里面了啊啊…${heart(1)}」`,
          ); // :3663
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`); // :3665
            await era.printAndWait(
              `「魔王大人，魔王大人${heart(1)} 尽情地把人家的……小淫穴侵犯得彻底坏掉吧啊啊${heart(1)}」`,
            ); // :3666
            await era.printAndWait(
              `${target_name}被${player_name}从身后托起双腿抱在空中，蜜穴被阴茎一次次顶到最深处，整个人完全沉浸在交合的快感中……`,
            ); // :3667
          } else {
            await era.print(`「呜啊……嗯啊啊……为，为什么会……这么舒服啊啊！」`); // :3669
            await era.printAndWait(
              ` ${target_name}被${player_name}从身后托起双腿抱在空中，阴茎一次次顶到小穴最深处……`,
            ); // :3670
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊……哈啊${heart(1)} 魔王大人……的阴茎……好热，好烫……${heart(1)}」`,
          ); // :3673
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            ); // :3675
            await era.printAndWait(
              `「还，还可以再深一点${heart(1)} 侵犯到……人家的子宫里面吧…${heart(1)}」`,
            ); // :3676
            await era.printAndWait(
              `${target_name}表情仿佛要融化一般，淫浪地娇喘着，享受着${player_name}的侵犯………`,
            ); // :3677
          } else {
            await era.print(
              `「嗯啊啊……啊啊……被，被这么激烈地侵犯着……但是……好舒服${heart(1)}」`,
            ); // :3679
            await era.printAndWait(
              `${target_name}的呻吟很快变成了享受的娇喘……`,
            ); // :3680
          }
        } else {
          await era.printAndWait(
            `「呜…呜啊啊……把，把人家的小穴和子宫……当成飞机杯那样尽情的侵犯吧${heart(1)}」`,
          ); // :3683
          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              `「啊啊……胸部，也被疼爱了……${heart(1)} 这样好舒服……${heart(1)} 舒服得……整个人都要融化了啊啊啊${heart(1)}」`,
            ); // :3685
            await era.print(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :3686
            await era.printAndWait(
              `交合的同时，${target_name}敏感的乳头被${player_name}揉捏着，快感更加强烈了……`,
            ); // :3687
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`); // :3689
            await era.printAndWait(
              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,
            ); // :3690
          }
        }
        kojo.背面座位 = 6; // :3690-3693
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊${heart(1)}」`,
          ); // :3697
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「尽情……尽情地把${target_name}的小穴……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            ); // :3699
            await era.printAndWait(
              `「不，不行了${heart(1)} 已经舒服得……没办法思考了${heart(1)} 被魔王大人……这么疼爱着……实在是天幸福了啊啊啊${heart(1)}」`,
            ); // :3700
            await era.printAndWait(
              `${target_name}岔开双腿、正被${weapon}抽插得爱液泛滥的蜜穴一览无余地展露着……`,
            ); // :3701
          } else {
            await era.print(`「呜啊……小穴……为什么会……这么舒服的啊啊啊」`); // :3703
            await era.printAndWait(
              `${target_name}被${player_name}从身后紧紧抱着，持续侵犯着蜜穴…`,
            ); // :3704
          }
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊啊……顶，顶到最里面了${heart(1)} 好……好舒服……${heart(1)}」`,
          ); // :3707
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :3709
            await era.printAndWait(
              `「尽情地……侵犯人家吧，魔王大人，把${target_name}的小穴当做飞机杯那样侵犯吧啊啊啊${heart(1)}」`,
            ); // :3710
            await era.printAndWait(
              `${target_name}靠在${player_name}身上，扭着腰，追求着更强烈的快感………`,
            ); // :3711
          } else {
            await era.print(`「嗯啊啊……啊啊……被，被这么激烈地侵犯着……」`); // :3713
            await era.printAndWait(
              `${target_name}的呻吟逐渐变成了享受的娇喘……`,
            ); // :3714
          }
        } else {
          await era.printAndWait(
            `「这样的姿势……好，好棒……好舒服${heart(1)} 」`,
          ); // :3717
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :3719
            await era.printAndWait(
              `「已，已经不行了……${heart(1)} 要去了，要去了啊啊啊${heart(1)}」`,
            ); // :3720
            await era.printAndWait(
              `${target_name}尽情享受着交合的快感，娇喘的声音不绝于耳`,
            ); // :3721
          } else {
            await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`); // :3723
            await era.printAndWait(
              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,
            ); // :3724
          }
        }
        kojo.背面座位 = 5; // :3724-3727
      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(
            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3731
        } else {
          await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`); // :3733
        }
        if (rand_n(2) === 0) {
          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`); // :3736
          await era.printAndWait(
            `${player_name}在侵犯蜜穴的同时，双手也没有闲下，肆意地玩弄着${target_name}的双乳………`,
          ); // :3737
        } else {
          await era.print(`「好……好舒服……这样的姿势……呜啊啊！」`); // :3739
          await era.printAndWait(`${target_name}的呻吟很快变成了享受的娇喘………`); // :3740
        }
        kojo.背面座位 = 4; // :3741-3742
      } else if (
        mark(2) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(`「饶，饶了我吧……真的要……坏掉了！」`); // :3745
        await era.printAndWait(
          `「让，让我做什么其他的都行……真的……放过我这次吧！」`,
        ); // :3746
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        ); // :3747
        kojo.背面座位 = 3; // :3746-3748
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外
        await era.printAndWait(`「住，住手！放开我啊啊！！」`); // :3751
        await era.printAndWait(
          `${target_name}的双腿被${player_name}用手强行分开，正被${weapon}蹂躏的蜜穴一览无余地展露着……`,
        ); // :3752
        kojo.背面座位 = 2; // :3751-3753
      }
    }
    return 0; // :3753-3758
  }
  // :3763-4002 IF SELECTCOM == 26（正常位肛交 CFLAG:327）
  if (era_flag.selectcom === 26) {
    // \@TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 ? 电动假阳具 # 阴茎\@
    // 本节无独立声明行，三目宏内联出现于各 PRINTFORMW 语句里，首次出现
    // 在初めて层助手玛奥淫乱支
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位肛交 === 0) {
      // :3764-3825 初めて（不分处女/非处女）
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          ); // :3770
          await era.printAndWait(
            `${player_name}抓着${target_name}的腰，将${weapon}慢慢地插入了肛门之中。`,
          ); // :3771
          await era.printAndWait(
            `「嗯啊啊……肛门……被撑开的感觉……啊啊啊${heart(1)}」`,
          ); // :3772
          await era.printAndWait(
            `被亲妹妹侵犯着肛门，却只让${target_name}更加兴奋和享受地娇喘着。而姐姐的反应也让${player_name}更加兴奋而激烈地抽插着${target_name}的肛门。`,
          ); // :3773
          await era.printAndWait(
            `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,
          ); // :3774
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          ); // :3777
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
          ); // :3778
          await era.printAndWait(`「呜……呜啊啊……稍微……再温柔一点啊啊！」`); // :3779
          await era.print(
            `『实在是对不起了……但是姐姐的肛门……实在太诱人了，实在是让人忍不住！』`,
          ); // :3780
          await era.printAndWait(
            `${player_name}丝毫没有减慢动作，反而更激烈地侵犯着姐姐的肛门。`,
          ); // :3781
        } else {
          // それ以外（爱慕無し）
          await era.print(
            `『姐姐还没体会过肛交吗${heart(1)} 保证会让你舒服上天的${heart(1)} 嘿嘿嘿！』`,
          ); // :3784
          await era.printAndWait(
            `${player_name}强行抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
          ); // :3785
          await era.printAndWait(
            `「不，不要啊啊！快，快住手……我们是……亲姐妹啊啊！」`,
          ); // :3786
          await era.printAndWait(
            `${target_name}被妹妹侵犯着肛门，却无力抗拒，哭泣了起来。`,
          ); // :3787
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          // 淫乱
          await era.printAndWait(
            `「嗯啊……啊啊啊 ${heart(1)} ${target_name}的肛，肛门……${heart(1)} 终于得到魔王大人的临幸了！」`,
          ); // :3792
          await era.printAndWait(
            `${target_name}体验着第一次肛交的快感，发出了享受的娇喘。`,
          ); // :3793
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `经过充分调教和开发的肛门，好像主动吸住了${player_name}的阴茎一般。`,
            ); // :3795
          } else {
            await era.printAndWait(
              `尚未充分开发的肛门被${player_name}的阴茎用力地抽插着。`,
            ); // :3797
          }
          await era.printAndWait(
            `「尽……尽情地侵犯人家的肛门吧……啊啊啊${heart(1)}」`,
          ); // :3799
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 爱慕
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 插进来了……${target_name}的肛门……终于得到魔王大人的临幸了……！」`,
          ); // :3802
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `经过充分调教和开发的肛门，主动地吸住了${player_name}的阴茎一般。`,
            ); // :3804
            await era.printAndWait(
              `「哈啊……哈啊…${heart(1)}……${player_name}的肛门……彻底属于魔王大人了啊啊啊${heart(1)}」`,
            ); // :3805
            await era.printAndWait(
              `${target_name}用双腿缠住了${player_name}的腰，脸上露出了幸福的笑容………`,
            ); // :3806
          } else {
            await era.printAndWait(
              `${target_name}尚未充分开发的肛门，被${player_name}的阴茎侵犯着。`,
            ); // :3808
            await era.printAndWait(
              `「呜啊……呜啊啊……肛门……有点痛，但是……也很舒服${heart(1)}」`,
            ); // :3809
            await era.printAndWait(
              `${target_name}体验着初次肛交带来的快感和痛楚，脸上的表情让${player_name}更加兴奋………`,
            ); // :3810
          }
        } else {
          // それ以外（爱慕無し）
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `「不，不行啊啊……那种地方……不，不是用来……呜啊啊！」`,
            ); // :3815
            await era.printAndWait(
              `${target_name}被充分调教和开发过的肛门，却主动地接纳了${player_name}阴茎的插入。`,
            ); // :3816
            await era.printAndWait(
              `肛交的快感让${target_name}后仰着头，呻吟了起来。`,
            ); // :3817
            await era.printAndWait(
              `「嗯啊……啊啊啊……为什么……会这么舒服的啊啊…」`,
            ); // :3818
          } else {
            await era.printAndWait(
              `「住，住手啊……这样插进去……屁股会裂开的啊啊啊！」`,
            ); // :3820
            await era.printAndWait(
              `尚未充分开发和调教的肛门被${target_name}无情地侵犯着，${player_name}痛苦地哀鸣着。`,
            ); // :3821
            await era.printAndWait(
              `「好痛，好痛啊啊啊啊……会死的，真的会死的……呜啊啊！」`,
            ); // :3822
          }
        }
      }
      kojo.正常位肛交 = 1; // :3826
      return 0; // :3826-3827
    }
    // :3828-4001 二回目以降
    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          ); // :3835
          await era.print(`『${player_name}最喜欢姐姐了${heart(1)}』`); // :3836
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰身，持续地侵犯着肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          ); // :3837
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 我……我也是最喜欢被${player_name}侵犯肛门了啊啊啊${heart(1)}」`,
          ); // :3838
        } else if (rand_n(2) === 0) {
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3840
          await era.print(
            `『哈，哈啊${heart(1)} 姐姐的肛门……完全变成性器了呢！』`,
          ); // :3841
          await era.printAndWait(
            `${player_name}前后动着腰，持续地侵犯着${target_name}的肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          ); // :3842
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 姐姐是个喜欢被${player_name}侵犯肛，肛门的变态啊啊啊${heart(1)}」`,
          ); // :3843
        } else {
          await era.print(
            `『原来姐姐被侵犯肛门时，会发出这么下流的声音呀${heart(1)}』`,
          ); // :3845
          await era.printAndWait(
            `「呜啊……啊啊啊${heart(1)} 真的是……太舒服了${heart(1)} 被${player_name}侵犯肛门……的感觉……太棒了啊啊啊${heart(1)}」`,
          ); // :3846
          await era.printAndWait(
            `${target_name}感受着肛门被${player_name}用${weapon}侵犯的快感，发出一阵阵淫浪的娇喘。`,
          ); // :3847
          await era.print(
            `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,
          ); // :3848
        }
        kojo.正常位肛交 = 7; // :3848-3850
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.print(
          `『这次一定要让姐姐的肛门高潮${heart(1)} 姐姐的肛门实在是太棒了${heart(1)} ！』`,
        ); // :3853
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
        ); // :3854
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜……呜啊！肛门……被撑得满满的了……${heart(1)}」`,
          ); // :3856
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜啊啊${heart(1)} 不，不要……那么激烈的抽插啊……肛门……感觉好奇怪啊啊${heart(1)}」`,
          ); // :3858
        } else {
          await era.printAndWait(`「呜……呜啊……肛门…感觉好奇怪${heart(1)}」`); // :3860
        }
        await era.printAndWait(
          `${target_name}被妹妹侵犯着肛门，发出了混杂和欣喜和痛苦的呻吟，让${player_name}更加兴奋起来了`,
        ); // :3862
        await era.printAndWait(
          `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,
        ); // :3863
        kojo.正常位肛交 = 6; // :3863-3864
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3868
          await era.print(`『哎嘿嘿，人家好喜欢姐姐现在这个样子${heart(1)}』`); // :3869
          await era.printAndWait(
            `${player_name}抱着${target_name}的腰身，抽插着肛门。被充分开发和调教的肛门也紧紧地吸着${player_name}的${weapon}。`,
          ); // :3870
          await era.printAndWait(
            `「哈……哈啊……不，不要当着魔王大人的面……侵犯姐姐的肛门啊啊${heart(1)}」`,
          ); // :3871
        } else if (rand_n(2) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          ); // :3873
          await era.print(`『哇啊${heart(1)} 姐姐的肛门……已经变成名器了！』`); // :3874
          await era.printAndWait(
            `${player_name}前后动着腰，持续地侵犯着${target_name}的肛门。${player_name}被充分开发和调教的肛门与${weapon}的交合处传来一阵阵淫秽不堪的声音。`,
          ); // :3875
          await era.printAndWait(
            `「不要……取笑姐姐啦${heart(1)} 嗯啊……啊啊啊${heart(1)}」`,
          ); // :3876
        } else {
          await era.print(
            `『原来姐姐被侵犯肛门时，会发出这么下流的声音呀${heart(1)}』`,
          ); // :3878
          await era.print(
            `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
          ); // :3879
          await era.printAndWait(
            `${target_name}感受着肛门被${player_name}用${weapon}侵犯的快感，忍不住娇喘了起来。`,
          ); // :3880
          await era.printAndWait(
            `「不……不要……这么激烈${heart(1)} ${player_name}把姐姐的肛门……弄得要去了啊啊啊${heart(1)}」`,
          ); // :3881
        }
        kojo.正常位肛交 = 5; // :3881-3883
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.print(
          `『姐姐感觉到舒服了吗${heart(1)} 我可是很舒服呢${heart(1)} 嘿嘿嘿！』`,
        ); // :3886
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}贯入肛门之中抽插了起来。`,
        ); // :3887
        if (rand_n(3) === 0) {
          await era.printAndWait(`「呜啊……有……有点痛……啊啊！」`); // :3889
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊……啊啊……慢，慢一点……姐姐的屁股……要裂开了！」`,
          ); // :3891
        } else {
          await era.printAndWait(`「停，停下来啊……拜托了……让姐姐……缓一下！」`); // :3893
        }
        await era.print(
          `『太用力了吗，真是不好意思……都是因为姐姐的肛门实在是让人太舒服了！』`,
        ); // :3895
        await era.printAndWait(
          `虽然这么说着，但是${player_name}丝毫没有减慢动作，反而更激烈地侵犯着${target_name}的肛门。`,
        ); // :3896
        kojo.正常位肛交 = 4; // :3896-3897
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.print(
          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
        ); // :3900
        await era.print(
          `『哎嘿嘿，姐姐看起来已经很享受肛交的样子了呢${heart(1)} 我也为姐姐感到开心呀${heart(1)}』`,
        ); // :3901
        await era.printAndWait(
          `${player_name}抱着${target_name}的腰，用${weapon}贯入肛门之中抽插了起来。`,
        ); // :3902
        if (rand_n(3) === 0) {
          await era.printAndWait(`「哈啊……啊啊……太，太激烈了啊啊！」`); // :3904
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「稍，稍微……慢一点……让姐姐……缓口气……」`); // :3906
        } else {
          await era.printAndWait(
            `「不，不是这样的！才没……没有享受什么的啊啊啊」`,
          ); // :3908
        }
        kojo.正常位肛交 = 3; // :3909-3910
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、A感覚Lv3未満）
        await era.print(
          `『姐姐${heart(1)} 肛交的感觉舒服吗${heart(1)} 嘿嘿嘿！』`,
        ); // :3913
        await era.printAndWait(
          `${player_name}强行抱着${target_name}的腰，用${weapon}慢慢贯入了肛门之中。`,
        ); // :3914
        if (rand_n(3) === 0) {
          await era.printAndWait(`「不可以，不可以啊啊啊！！！」`); // :3916
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「好，好痛啊啊……屁股……会坏掉的啊啊！」`); // :3918
        } else {
          await era.printAndWait(`「停，快停下来……好痛，好痛啊啊！」`); // :3920
        }
        await era.printAndWait(
          `${target_name}感受着被妹妹强暴着肛门的屈辱和痛苦，哭泣着。`,
        ); // :3922
        kojo.正常位肛交 = 2; // :3922-3923
      }
    } else {
      // 淫乱＋A感覚Lv3以上
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈啊……嗯啊啊${heart(1)} 淫荡的肛门……得到魔王大人的……疼爱了${heart(1)}」`,
          ); // :3929
          await era.printAndWait(
            `${target_name}尽情享受着${player_name}的肛交，无比享受地娇喘着`,
          ); // :3930
          await era.printAndWait(
            `被彻底调教，开发过的肛门，紧紧夹着${player_name}的阴茎，主动地摩擦着。`,
          ); // :3931
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3932
          await era.printAndWait(
            `阴茎与${target_name}肛门交合时发出的下流的声音让${player_name}更加兴奋地抽插着………`,
          ); // :3933
        } else if (rand_n(2) === 0) {
          await era.print(
            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
          ); // :3935
          await era.printAndWait(
            `${target_name}感受着肛交的极度快感，发出一阵阵淫浪的娇喘。`,
          ); // :3936
          await era.printAndWait(
            `「哈……哈啊……魔王大人……把人家的淫肛……撑得满满的${heart(1)} 」`,
          ); // :3937
          await era.printAndWait(
            `${target_name}向${player_name}露出了淫媚的笑容，完全沉浸在肛交的快感之中………`,
          ); // :3938
        } else {
          await era.print(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          ); // :3940
          await era.printAndWait(
            `${player_name}的肛门被${target_name}激烈的抽插着，淫荡的交合声不绝于耳。`,
          ); // :3941
          await era.printAndWait(
            `「魔王大人……请尽，尽情侵犯人家的肛门吧啊啊${heart(1)}」`,
          ); // :3942
          await era.printAndWait(
            `${target_name}已经完全沦为沉浸在肛交快感中的性奴了………`,
          ); // :3943
        }
        kojo.正常位肛交 = 7; // :3943-3945
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          `「呜，呜啊${heart(1)} 魔……魔王大人的阴茎……插进屁股里了${heart(1)}」`,
        ); // :3948
        await era.printAndWait(
          `${target_name}边呻吟着，边用肛门努力接纳着${player_name}的阴茎。`,
        ); // :3949
        await era.print(`「呜啊……屁股……原来也能这么舒服啊啊啊」`); // :3950
        await era.printAndWait(
          `${target_name}感受着肛门被慢慢撑开的奇异快感，呻吟了起来`,
        ); // :3951
        kojo.正常位肛交 = 6; // :3951-3952
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上
        if (rand_n(3) === 0) {
          await era.print(`「肛交……太棒了……真的是世界上最棒的事情了啊啊啊」`); // :3956
          await era.printAndWait(
            `${target_name}尽情地享受着${player_name}的肛交。`,
          ); // :3957
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 让${target_name}的肛门……永远当魔王大人的……专用飞机杯吧${heart(1)}」`,
          ); // :3958
          await era.printAndWait(
            `${target_name}带着幸福得要融化了一般的笑容，用双腿缠住了${player_name}的腰………`,
          ); // :3959
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈……哈啊……用肛门接受……魔王大人的……疼爱了呢……${heart(1)}」`,
          ); // :3961
          await era.printAndWait(
            `${target_name}向${player_name}露出幸福的笑容，已经成为性感带的肛门紧紧夹吸着阴茎。`,
          ); // :3962
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :3963
          await era.printAndWait(
            `肛交的快感让${target_name}的幸福娇喘在${player_name}的耳边不断响起………`,
          ); // :3964
        } else {
          await era.printAndWait(
            `${player_name}在交合中不断撞击着${target_name}的腰身，聆听着${target_name}幸福的娇喘。`,
          ); // :3966
          await era.print(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          ); // :3967
          await era.printAndWait(
            `作为回应，${target_name}用双腿缠住了${player_name}的腰，肛门也紧紧吸吮着阴茎。`,
          ); // :3968
          await era.printAndWait(
            `「魔，魔王大人……请尽情在……肛门里射精吧${heart(1)}」`,
          ); // :3969
        }
        kojo.正常位肛交 = 5; // :3969-3971
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          `「呜……还……还是有点点痛……不过，不要紧的……请魔王大人……尽情的……！」`,
        ); // :3974
        await era.printAndWait(
          `${target_name}有些吃痛地呻吟着，努力用肛门接纳着${player_name}的阴茎。`,
        ); // :3975
        await era.print(`「呜……呜呜……直肠壁……被这么摩擦着……感觉……好奇怪！」`); // :3976
        await era.printAndWait(
          `${target_name}被慢慢撑开的肛门却传来了奇特的满足感，让她忍不住呻吟了起来……`,
        ); // :3977
        kojo.正常位肛交 = 4; // :3977-3978
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上
        await era.printAndWait(`「呜……呜啊啊……插……插进屁股里了……！」`); // :3981
        await era.printAndWait(
          `${target_name}被充分开发的肛门，已经完全接纳了${player_name}的阴茎。`,
        ); // :3982
        await era.print(`「侵犯得……太激烈了……但，但是……感觉……又好奇怪啊啊！」`); // :3983
        await era.printAndWait(
          `感受着肛交的快感，${target_name}后仰着头，呻吟了起来。。`,
        ); // :3984 原作有连续两个句号，1:1 保真
        await era.printAndWait(`「为，为什么……屁股也会……这么舒服的啊啊！」`); // :3985
        kojo.正常位肛交 = 3; // :3985-3986
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // それ以外（爱慕無し、A感覚Lv3未満）
        if (rand_n(3) === 0) {
          await era.printAndWait(`「呜……呜呜……好痛啊啊！」`); // :3990
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「放……放开我啊啊……！」`); // :3992
        } else {
          await era.printAndWait(`「屁股……会坏掉的啊啊啊！」`); // :3994
        }
        await era.printAndWait(
          `${target_name}被${player_name}压在身下，侵犯着尚未经过充分调教和开发的肛门。`,
        ); // :3996
        await era.printAndWait(
          `意识到自己没有任何逃脱的机会，只能闭上眼睛拼命忍耐着`,
        ); // :3997
        kojo.正常位肛交 = 2; // :3997-3998
      }
    }
    return 0; // :3998-4003
  }

  // :4008-4254 IF SELECTCOM == 27（背后位肛交 CFLAG:328）
  if (era_flag.selectcom === 27) {
    // 原作缺陷：源第 4079、4102、4181、4201 行的前两档误读 CFLAG:327
    //（正常位肛交），1:1 保留。
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.背后位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`『姐姐的肛门……真是侵犯多少次都不会腻啊♪』`); // :4015
          await era.printAndWait(
            `${player_name}窃笑着，用后背位持续地侵犯，蹂躏着${target_name}的肛门。`,
          ); // :4016
          await era.printAndWait(
            `「呜……呜啊……啊啊啊${heart(1)} 姐姐的……肛门……就是为了……被侵犯而存在的啊啊啊${heart(1)}」`,
          ); // :4017
          await era.printAndWait(
            `${target_name}感受着被妹妹肛交的背德快感，淫浪地娇喘着……`,
          ); // :4018
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `『姐姐的肛门在被侵犯的时候……一张一合的特别好看呢♪』`,
          ); // :4021
          await era.printAndWait(
            `${player_name}嬉笑着，用后背位持续地侵犯，蹂躏着${target_name}的肛门`,
          ); // :4022
          await era.printAndWait(`「不……不要看啊啊……太害羞了！」`); // :4023
          await era.printAndWait(
            `${target_name}在肛交的同时被${player_name}视奸着，羞耻得几乎要背过气去………`,
          ); // :4024
        } else {
          await era.printAndWait(`『哎嘿嘿，姐姐你是跑不掉的…♪』`); // :4027
          await era.printAndWait(`「住，住手啊……那里是屁股啊啊啊啊！」`); // :4028
          await era.printAndWait(
            `${target_name}被${player_name}从后面按住腰，用${weapon}径直插入了肛门之中。`,
          ); // :4029
          await era.printAndWait(
            `被亲妹妹做出如此屈辱的行为，${target_name}泪流满面地哭泣着……`,
          ); // :4030
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊……啊啊……魔王大人……从后面进入我的……小淫肛了${heart(1)}」`,
          ); // :4035
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `${target_name}娇喘着，感受着肛交的快感，直肠紧紧夹着${player_name}的阴茎。`,
            ); // :4037
            await era.printAndWait(
              `被充分调教，开发过的肛门，如今完全变成了性器一样，享受着${player_name}的抽插。`,
            ); // :4038
            await era.printAndWait(
              `「嗯啊……啊啊啊……魔王大人……在，在人家的肛门里尽情地射精吧${heart(1)}」`,
            ); // :4039
            await era.printAndWait(
              `${player_name}按着${target_name}光的臀部，每一次都顶到了最里面……`,
            ); // :4040
          } else {
            await era.printAndWait(
              `${target_name}尚未经过充分开发的肛门被从后面侵犯着，紧致的直肠紧紧夹着${player_name}的阴茎。`,
            ); // :4042
            await era.printAndWait(
              `「哈啊……啊啊……肛门像性器一样……被魔王大人……侵犯着啊啊啊！」`,
            ); // :4043
            await era.printAndWait(
              `${player_name}舔着嘴唇，继续激烈地抽插着${target_name}的肛门………`,
            ); // :4044
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,
            ); // :4049
            await era.printAndWait(
              `「啊啊……啊啊啊……魔王大人全，全部插进来了……好……好厉害啊啊啊${heart(1)}」`,
            ); // :4050
            await era.printAndWait(
              `「尽，尽情侵，侵犯${target_name}的肛门吧${heart(1)}」`,
            ); // :4051
            await era.printAndWait(
              `在${target_name}一阵阵甘甜的娇喘声中、${player_name}前后动着腰抽插着………`,
            ); // :4052
          } else {
            await era.printAndWait(
              `「拜，拜托了……稍微温柔一点……这样突然从后面插进来！」`,
            ); // :4054
            await era.printAndWait(
              `${target_name}尚未经过充分开发的肛门被从后面侵犯着，不适感让她弓起了身子，紧致的直肠紧紧夹着${player_name}的阴茎。`,
            ); // :4055
            await era.printAndWait(
              `${player_name}舔着嘴唇，开始慢慢地品味着和姐姐肛交的感觉………`,
            ); // :4056
          }
        } else {
          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              `「呜……呜啊啊……这，这样突然插进来……但是……为什么会……感觉这么舒服的……呜啊！」`,
            ); // :4061
            await era.printAndWait(
              `已经被充分调教，开发过的肛门再勤侵犯下很快感受到了快感，让${target_name}的呻吟很快变成了甘甜的娇喘。`,
            ); // :4062
            await era.printAndWait(
              `「不……不行了……再这样下去……屁股会变得奇怪的……快点结束吧！」`,
            ); // :4063
            await era.printAndWait(
              `肛门的快感越来越强烈，让${target_name}的头脑逐渐变得混乱起来……`,
            ); // :4064
          } else {
            await era.printAndWait(
              `「不，不可以啊啊……这样……屁股会坏掉的啊啊啊！」`,
            ); // :4066
            await era.printAndWait(
              `${target_name}被${player_name}强行侵犯着肛门，极度的不适和疼痛让她发出了凄惨的悲鸣。`,
            ); // :4067
            await era.printAndWait(`「饶了……饶了我吧……真的……求你了………！」`); // :4068
          }
        }
      }
      kojo.背后位肛交 = 1; // :4068-4072
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :4081
            await era.printAndWait(
              `${target_name}的肛门已经被完全调教成了性器，完全容纳了${player_name}的阴茎，享受着侵犯和抽插。`,
            ); // :4082
            await era.printAndWait(
              `敏感的直肠壁如同阴道一样分泌着爱液，蠕动摩擦着${player_name}的阴茎`,
            ); // :4083
            await era.print(
              `『唔哇哇……姐姐的肛门，根本已经完全变成性器了嘛……我怎么会有这么变态的姐姐${heart(1)}』`,
            ); // :4084
            await era.printAndWait(
              `「是……是啊……姐姐是${player_name}……和魔王大人的……肛交性奴啊${heart(1)}」`,
            ); // :4085
            await era.printAndWait(
              `${player_name}带着鄙夷的表情看着${target_name}，然后抓着${target_name}的臀部，更加激烈地侵犯着自己姐姐的肛门……`,
            ); // :4086
          } else if (rand_n(2) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :4088
            await era.printAndWait(`强烈的快感让${target_name}夸张地娇喘着。`); // :4089
            await era.printAndWait(
              `已经被完全调教成性器的肛门，有规律地一张一合着，紧紧夹着${player_name}的阴茎，用敏感的直肠不住地摩擦着。`,
            ); // :4090
            await era.print(
              `『唔哇哇……姐姐的淫乱肛门……居然在自己摩擦着人家的小鸡鸡。这么淫乱的女人，才不是我的姐姐♪』`,
            ); // :4091
            await era.printAndWait(
              `「真……真是对不起呢，${player_name}……请，请尽情地把拥有这个淫乱肛门性器的姐姐……当成母猪性奴那样侵犯吧${heart(1)}」`,
            ); // :4092
          } else {
            await era.print(
              `「请尽情地侵犯${target_name}的肛门小穴吧${heart(1)}」`,
            ); // :4094
            await era.printAndWait(
              `${target_name}已经被调教成性器的肛门，在极度的快感下抽搐着，紧紧夹着阴茎。`,
            ); // :4095
            await era.printAndWait(
              `被自己的妹妹从后面这样侵犯着，背德的心理快感让${target_name}更加享受地娇喘着。`,
            ); // :4096
            await era.print(
              `『唔哇哇，姐姐肛交的样子，根本就像母狗一样，难道一点都不感到羞耻吗？』`,
            ); // :4097
            await era.printAndWait(
              `「是……是啊……姐姐是${player_name}和魔王大人的母狗${heart(1)} 母狗又怎么会感到羞耻呢…${heart(1)}　不，不行了……屁股太舒服了……舒服得……要去了啊啊${heart(1)}」`,
            ); // :4098
          }
          kojo.背后位肛交 = 7; // :4098-4100
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『啊嘿嘿，姐姐的屁股……真是调教多少次都不会腻啊♪』`); // :4103
          await era.printAndWait(
            `${player_name}嬉笑着，扭动着腰，激烈地侵犯，蹂躏着${target_name}的肛门。`,
          ); // :4104
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「是……是啊啊${heart(1)} 姐姐的肛门……就是用来给${player_name}和魔王大人……虐待的啊啊啊${heart(1)}」`,
            ); // :4106
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「是……是的……请……尽情地侵犯姐姐的淫乱肛门吧${heart(1)}……侵犯到坏掉……也没有关系！」`,
            ); // :4108
          } else {
            await era.printAndWait(
              `「啊啊啊……不，不行了……屁股被这么侵犯${heart(1)} 一下子就要去了啊啊${heart(1)}」`,
            ); // :4110
          }
          await era.printAndWait(
            `${target_name}被妹妹从身后侵犯着肛门，发出了享受的娇喘………`,
          ); // :4112
          kojo.背后位肛交 = 6; // :4112-4113
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :4117
            await era.printAndWait(
              `${target_name}被${player_name}从身后侵犯着，敏感的肛门在快感中微微抽搐着，紧紧夹着阴茎。`,
            ); // :4118
            await era.print(
              `『呜哇哇……姐姐的肛门……这么舒服的……真的是名器啊啊！』`,
            ); // :4119
            await era.printAndWait(
              `「还，……还不是被你们调教的${heart(1)} 哈啊……哈啊……不，不行了${heart(1)} 要用屁股去了啊啊啊${heart(1)}」`,
            ); // :4120
            await era.printAndWait(
              `${player_name}欣赏着${target_name}甘甜的娇喘，前后动着腰，更加激烈地抽插着姐姐的肛门……`,
            ); // :4121
          } else if (rand_n(2) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :4123
            await era.printAndWait(
              `被${player_name}从身后激烈地侵犯着，${target_name}敏感的肛门抽搐着一张一合，爱液一般的肠液不住地从交合处渗出。`,
            ); // :4124
            await era.print(
              `『唔哇哇……姐姐的肛门……完全变成性器了呢，真厉害呀${heart(1)} 决定了，以后姐姐的肛门就是我和魔王大人的专用飞机杯了${heart(1)}』`,
            ); // :4125
            await era.printAndWait(
              `「飞机杯……什么的……怎样都好${heart(1)}…… 呜啊啊……不，不行了……太舒服了，已经舒服得……没有办法思考了${heart(1)}」`,
            ); // :4126
            await era.printAndWait(
              `${player_name}抬起手，粗暴地拍打着${target_name}的屁股，边前后动着腰，更加激烈地抽插着姐姐的肛门……`,
            ); // :4127
          } else {
            await era.print(
              `『唔哇哇，姐姐的肛门居然这么淫乱了……那就给我好好地用屁股高潮到坏掉吧！』`,
            ); // :4129
            await era.printAndWait(
              `「太……太激烈了啊啊！这样……抽插的话……真的一下子就要去了啊啊啊！」`,
            ); // :4130
            await era.printAndWait(
              `${target_name}的肛门如今已经完全被调教成了称职的性器，将一阵阵强烈的快感传递到大脑中去。`,
            ); // :4131
            await era.print(
              `「呜呜……要，要去了，要用屁股……去了啊啊啊${heart(1)}」`,
            ); // :4132
            await era.printAndWait(
              `${player_name}享受着和姐姐的乱伦肛交，前后动着腰，更加激烈地抽插起来……`,
            ); // :4133
          }
          kojo.背后位肛交 = 5; // :4133-4135
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`); // :4138
          await era.printAndWait(
            `${player_name}坏笑着，前后动着腰，开始肆意地侵犯，蹂躏着${target_name}的肛门。`,
          ); // :4139
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「为……为什么……要用那种地方来做啦……太羞耻了……呜啊啊」`,
            ); // :4141
            await era.printAndWait(
              `被后入式侵犯着肛门的羞耻和不适让${target_name}几乎要窒息过去了………`,
            ); // :4142
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「不，不行啊啊……魔王大人……不要看啊啊啊！」`,
            ); // :4144
            await era.printAndWait(
              `${target_name}发现被自己妹妹侵犯着肛门的耻态让${master_name}目睹了、羞耻得满脸通红……`,
            ); // :4145
          } else {
            await era.printAndWait(
              `「漂亮什么的……呜啊啊……拜托你……温柔一点……！」`,
            ); // :4147
            await era.printAndWait(
              `还不是那么习惯肛交的${target_name}发出了微微的悲鸣，但还是努力地适应着………`,
            ); // :4148
          }
          kojo.背后位肛交 = 4; // :4148-4150
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(
            `「侵犯得……太激烈了……但，但是……真的好舒服啊啊！${heart(1)}」`,
          ); // :4153
          await era.print(
            `『姐姐快点说啊${heart(1)} 说自己是喜欢肛交的性奴${heart(1)}！』`,
          ); // :4154
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「才，才不要……说那样的话……呜啊啊……稍微……温柔一点……！」`,
            ); // :4156
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「说，说什么啊……呜啊啊……不，不要再……顶到里面来了……稍微出去……一点点！」`,
            ); // :4158
          } else {
            await era.printAndWait(
              `「唔啊啊……太，太激烈了……慢一点……求你了……让我……说什么都可以！」`,
            ); // :4160
          }
          await era.printAndWait(
            `敏感的肛门被自己的妹妹侵犯着，耻辱和快感交织着让${target_name}发出了灼热的呻吟。`,
          ); // :4162
          await era.printAndWait(
            `快感最终战胜了理智，让${target_name}迷迷糊糊地说出了羞耻的宣言………`,
          ); // :4163
          kojo.背后位肛交 = 3; // :4162-4164
        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.print(`『啊嘿嘿，性奴姐姐，屁股感觉舒服吗？』`); // :4167
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「住，住手啊……屁股……要坏掉了……真的要坏掉了！」`,
            ); // :4169
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「饶，饶了我吧……求你了……！」`); // :4171
          } else {
            await era.printAndWait(`「根本……不可能感觉舒服的啊……呜呜呜！」`); // :4173
          }
          await era.printAndWait(
            `${target_name}被${player_name}从后面侵犯着，过于紧致的肛门只是几次抽插就已经红肿了起来。`,
          ); // :4175
          await era.printAndWait(
            `肛交和乱伦的屈辱让${target_name}痛苦得泪流满面………`,
          ); // :4176
          kojo.背后位肛交 = 2; // :4175-4177
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :4183
            await era.printAndWait(
              `被${player_name}从后面侵犯着敏感的肛门，${target_name}发出一声声淫浪的娇喘，享受着肛交的极致快感。`,
            ); // :4184
            await era.printAndWait(
              `已经完全性器化的肛门，紧紧地包裹着阴茎，蠕动的直肠反复摩擦着。`,
            ); // :4185
            await era.printAndWait(
              `「魔王大人……魔王大人${heart(1)} 把${target_name}射得满满的，用精液给人家灌肠吧${heart(1)}」`,
            ); // :4186
            await era.printAndWait(
              `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着………`,
            ); // :4187
          } else if (rand_n(2) === 0) {
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            ); // :4189
            await era.printAndWait(
              `淫浪的娇喘声中，${target_name}的肛门在快感下一张一合地抽搐着。`,
            ); // :4190
            await era.printAndWait(
              `已经完全被调教成性器的肛门被从后面侵犯，${player_name}的阴茎一次次摩擦着直肠的敏感点`,
            ); // :4191
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 魔王大人……尽情地……把人家的屁股……侵犯到坏掉吧${heart(1)}」`,
            ); // :4192
          } else {
            await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`); // :4194
            await era.printAndWait(
              `${target_name}淫乱的肛门如今已经完全变成了性器，紧紧地夹着${player_name}的阴茎摩擦着。`,
            ); // :4195
            await era.printAndWait(
              `感受着激烈的抽插，${target_name}尽情地娇喘着，享受着。`,
            ); // :4196
            await era.printAndWait(
              `「啊啊……呜啊啊${heart(1)} 肛交……真的是……太舒服了……舒服的要上天了啊啊啊${heart(1)}」`,
            ); // :4197
          }
          kojo.背后位肛交 = 7; // :4197-4199
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `敏感的肛门尚未得到充足的调教就被侵犯了，疼痛、不适与异样的快感让${target_name}弓起了身子。`,
          ); // :4202
          await era.print(`「屁股……原来也能这么舒服啊啊啊！」`); // :4203
          await era.printAndWait(
            `「呜啊……啊啊啊……魔王大人……请尽情地将${target_name}的肛门……调教成您的专用飞机杯吧！」`,
          ); // :4204
          await era.printAndWait(
            `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着……`,
          ); // :4205
          kojo.背后位肛交 = 6; // :4204-4206
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「啊啊啊……魔王大人……在人家的肛门里……激烈地抽插着……好厉害${heart(1)}」`,
            ); // :4210
            await era.printAndWait(
              `已经完全被调教成性器的肛门紧紧地包裹着${player_name}的阴茎，蠕动的直肠反复摩擦着。`,
            ); // :4211
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :4212
            await era.printAndWait(
              `${player_name}欣赏着${target_name}甘甜的娇喘，前后动着腰继续侵犯着…`,
            ); // :4213
          } else if (rand_n(2) === 0) {
            await era.print(
              `「请尽情……尽情地侵犯${target_name}的肛门小穴吧${heart(1)}」`,
            ); // :4215
            await era.printAndWait(
              `被激烈侵犯着的肛门感受到了极致的快感，让${target_name}发出一声声甘甜的娇喘，享受着被心爱的${player_name}侵犯。`,
            ); // :4216
            await era.printAndWait(
              `「这样的姿势……好羞耻……但是……好舒服${heart(1)} 真的……舒服得要去了啊啊啊${heart(1)}」`,
            ); // :4217
            await era.printAndWait(
              `${player_name}按着${target_name}光洁的臀部，更加激烈地抽插着………`,
            ); // :4218
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人……请尽情地侵犯……这个专属于您的……肛门性器吧${heart(1)}」`,
            ); // :4220
            await era.printAndWait(
              `${target_name}的肛门，如今已经完全被${player_name}调教成适合阴茎插入的性器了。`,
            ); // :4221
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :4222
            await era.printAndWait(
              `${player_name}欣赏着自己的调教成果，更加激烈地抽插着……`,
            ); // :4223
          }
          kojo.背后位肛交 = 5; // :4223-4225
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「拜……拜托了……魔王大人……请温柔一点！」`); // :4228
          await era.printAndWait(
            `${target_name}还有点不适应肛交的感觉，整个背部都因为不适而弓了起来。`,
          ); // :4229
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `${player_name}抓着${target_name}光洁的臀部，毫不留情地继续抽插着着。`,
            ); // :4231
          } else {
            await era.printAndWait(
              `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，开始品味着直肠温热的触感……`,
            ); // :4233
          }
          await era.printAndWait(
            `「呜……呜啊啊……不行了，屁股感觉……好奇怪……又……又有点舒服！」`,
          ); // :4235
          kojo.背后位肛交 = 4; // :4235-4236
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……但，但是……感觉又好舒服……！」`); // :4239
          await era.printAndWait(
            `敏感的肛门被从后面侵犯着，${target_name}忍不住发出了享受的娇喘。`,
          ); // :4240
          await era.printAndWait(
            `「拜……拜托了……魔王大人……请温柔一些……呜啊……啊啊啊！」`,
          ); // :4241
          await era.printAndWait(
            `肛交的快感已经逐渐淹没了${target_name}的思维……`,
          ); // :4242
          kojo.背后位肛交 = 3; // :4241-4243
        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「为……为什么要用这种地方做……唔啊啊……会，会坏掉的啊啊！」`,
          ); // :4246
          await era.printAndWait(
            `${player_name}抓着${target_name}光洁的臀部，毫不留情地侵犯着过于紧致的肛门。痛苦和不适让${target_name}凄惨的悲鸣着。`,
          ); // :4247
          await era.printAndWait(
            `「呜啊啊……好痛……真的好痛！饶了我吧……求你了！」`,
          ); // :4248
          kojo.背后位肛交 = 2; // :4247-4249
        }
        return 0;
      }
    }
  }

  // :4259-4451 IF SELECTCOM == 28（对面座位肛交 CFLAG:329）
  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哎嘿嘿……姐姐已经准备好了${heart(1)} 快点来侵犯，虐待这个淫乱的肛门吧${heart(1)}」`,
          ); // :4266
          await era.print(
            `『唔哇哇……我都不知道姐姐已经变得这么淫乱了呢${heart(1)}』`,
          ); // :4267
          await era.printAndWait(
            `${player_name}欣赏着${target_name}甘甜的娇喘，更加激烈地侵犯着姐姐的肛门………`,
          ); // :4268
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「呜啊啊……不，不要……那样突然停住啊啊！」`); // :4271
          await era.print(`『怎么了，姐姐？想要我继续的话，就要大声请求啊♪』`); // :4272
          await era.printAndWait(
            `「真……真是的……请，请继续……侵犯${target_name}的肛门吧……拜托了！」`,
          ); // :4273
          await era.printAndWait(
            `${player_name}抓着${target_name}光洁的臀部，顶起腰再次开始侵犯姐姐的肛门，甘甜的娇喘在耳边响起了`,
          ); // :4274
        } else {
          await era.print(
            `『哎哎，姐姐不要遮住脸啊，让我好好看看姐姐的肛门被侵犯时是什么表情的呀！』`,
          ); // :4277
          await era.printAndWait(
            `「呜呜呜……为什么……为什么要对姐姐做这种事情……请停下吧！」`,
          ); // :4278
          await era.print(
            `『让我看着你的脸的话、我会更温柔的哦？为什么这都不明白呢…${heart(1)}』`,
          ); // :4279
          await era.printAndWait(
            `${player_name}将${target_name}抱在腿上，挺起腰部，继续侵犯着姐姐的肛门……`,
          ); // :4280
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}被${player_name}紧紧抱在大腿上侵犯着肛门，强烈的快感让她止不住地娇喘着。`,
        ); // :4285
        await era.printAndWait(
          `「呜啊……嗯啊啊……好舒服……屁股……好舒服…${heart(1)} 魔王大人……人家……还想要……更激烈的……啊啊啊${heart(1)}」`,
        ); // :4286
        await era.printAndWait(
          `淫浪的娇喘让${player_name}的阴茎更加兴奋地挺立着……`,
        ); // :4287
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}被${player_name}抱在怀里，发出了甘甜的喘息声。`,
        ); // :4290
        await era.printAndWait(
          `「呜啊啊……屁股……被魔王大人的阴茎撑开了……感觉好，好厉害……${heart(1)}」`,
        ); // :4291
        await era.printAndWait(
          `${player_name}慢慢地动着腰，开始品味着${target_name}肛门的触感……`,
        ); // :4292
      } else {
        await era.printAndWait(
          `${target_name}的双手被${player_name}反扣在背上，就以这样的姿势被侵犯着肛门。`,
        ); // :4295
        await era.printAndWait(`「好痛……好痛……放过我吧……求你了！」`); // :4296
        await era.printAndWait(
          `过于激烈的交合让${target_name}无比痛苦地悲鸣着……`,
        ); // :4297
      }
      kojo.对面座位肛交 = 1; // :4299-4300
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}被${player_name}抱在腿上侵犯着肛门，淫浪地娇喘了起来。`,
          ); // :4309
          await era.printAndWait(
            `「呜啊……啊啊${heart(1)} 好舒服……屁股……好舒服……舒服的要去了啊啊啊${heart(1)} 」`,
          ); // :4310
          await era.print(
            `『哎哎，姐姐要再大声一点啊，让魔王大人好好听一下姐姐有多喜欢肛交${heart(1)}』`,
          ); // :4311
          await era.printAndWait(
            `${player_name}边欣赏着${target_name}的娇喘，边更加激烈地抽插着着自己姐姐的肛门……`,
          ); // :4312
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}主动扭起了腰，如饥似渴地追求着更强烈的肛交快感。`,
          ); // :4314
          await era.print(
            `『唔哇哇……姐姐动得这么夸张${heart(1)} 真的有那么舒服吗，你这个淫乱的肛门性奴${heart(1)}』`,
          ); // :4315
          await era.printAndWait(
            `「不，不行了……${player_name}的阴茎……插得姐姐的屁股……太舒服了${heart(1)} 舒服得……要上天了啊啊啊${heart(1)} 」`,
          ); // :4316
          await era.printAndWait(
            `随着姐妹更加激烈的交合，淫浪的娇喘声在调教室里回荡着……`,
          ); // :4317
        } else {
          await era.printAndWait(
            `「请……尽情地把${target_name}的肛门${heart(1)} 侵犯到……高潮吧${heart(1)} 弄到……坏掉也没有关系啊啊啊${heart(1)}」`,
          ); // :4319
          await era.print(
            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
          ); // :4320
          await era.print(
            `『啊嘿嘿，那就好好配合我的动作吧姐姐${heart(1)} 让我们姐妹俩……一起高潮吧啊啊啊${heart(1)}』`,
          ); // :4321
          await era.printAndWait(
            `${player_name}撒娇一般地紧紧搂住${target_name}的腰，姐妹的乱伦肛交就这么在你的面前上映着……`,
          ); // :4322
        }
        kojo.对面座位肛交 = 7; // :4322-4324
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.print(
          `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
        ); // :4327
        await era.printAndWait(
          `『哎嘿嘿，变态姐姐这么喜欢被侵犯肛门么${heart(1)} 那接下来就要更激烈了哦！』`,
        ); // :4328
        await era.print(
          `「哈啊……哈啊${heart(1)} 姐姐的肛门……就是专门给${player_name}和魔王大人……虐待和侵犯用的啊啊${heart(1)}」`,
        ); // :4329
        await era.printAndWait(
          `${player_name}将${target_name}抱在腿上，加快了抽插的动作……`,
        ); // :4330
        kojo.对面座位肛交 = 6; // :4330-4331
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `被${player_name}抱在怀中的${target_name}甘甜地娇喘着，享受着被自己妹妹侵犯肛门的背德快感……`,
          ); // :4335
          await era.print(
            `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
          ); // :4336
          await era.print(`『哎哎，姐姐居然一点都不反抗，人家有点失望呢♪』`); // :4337
          await era.printAndWait(
            `${target_name}无力的回答很快就被娇喘淹没，${player_name}叹了口气，随后将怨气都发泄在激烈的抽插中……`,
          ); // :4338
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
          ); // :4340
          await era.printAndWait(
            `「对，对不起……${player_name}${heart(1)} 姐姐变成这个样子了……可是……真的已经没有办法忍耐下去了！」`,
          ); // :4341
          await era.print(
            `『那就给我好好忍耐啊笨蛋姐姐，没有我的允许擅自高潮的话，可是要惩罚的哦！』`,
          ); // :4342
          await era.printAndWait(
            `耳边响起的${target_name}拼命忍耐着的呻吟让${player_name}更加兴奋了……`,
          ); // :4343
        } else {
          await era.printAndWait(
            `「呜啊……嗯啊啊${heart(1)} 好舒服……${target_name}的屁股……舒服得要去了啊啊啊${heart(1)}」`,
          ); // :4345
          await era.print(
            `『哎呀哎呀，淫乱姐姐的淫乱肛门${heart(1)} 被自己的妹妹侵犯也能高潮的大变态！』`,
          ); // :4346
          await era.print(
            `「对，对不起……姐姐……真的已经变成……只会想着肛交的变态了啊啊啊${heart(1)}」`,
          ); // :4347
          await era.printAndWait(
            `被${player_name}紧紧抱在腿上的${target_name}，感受着被侵犯的肛门传来的极度快感，甘甜的娇喘在调教室里回荡着……`,
          ); // :4348
        }
        kojo.对面座位肛交 = 5; // :4348-4350
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不，不要插进来……就这么不动了啊……感觉……好奇怪！」`,
        ); // :4353
        await era.print(`『嘻嘻，姐姐想要人家做什么，要大声地请求啊…♪』`); // :4354
        await era.printAndWait(
          `「呜呜……请……请${player_name}大人……侵犯……性奴${target_name}的肛门……拜托了……」`,
        ); // :4355
        await era.printAndWait(
          `${player_name}满意地听着${target_name}羞耻的宣言，顶起腰开始激烈地抽插着姐姐的肛门，甘甜的娇喘在耳边不住地响起……`,
        ); // :4356
        kojo.对面座位肛交 = 4; // :4356-4357
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print(`「呜……呜啊啊……屁股……为什么会这么舒服……！」`); // :4360
        await era.print(
          `『哎呀呀，我怎么会有这么淫乱的姐姐，被妹妹侵犯肛门居然能感到舒服${heart(1)}』`,
        ); // :4361
        await era.printAndWait(
          `「不，不要说……这种话啊${player_name}………可，可是……真的好舒服啊啊啊！」`,
        ); // :4362
        await era.printAndWait(
          `${player_name}窃笑着顶起腰，开始激烈地抽插着${target_name}的肛门，聆听着姐姐炽热的呻吟和娇喘…`,
        ); // :4363
        kojo.对面座位肛交 = 3; // :4363-4364
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.print(
          `『哎嘿嘿，姐姐不要遮住脸啊，让我好好看看姐姐被侵犯肛门时会露出怎样的淫乱表情啊！』`,
        ); // :4367
        await era.printAndWait(
          `「呜……呜呜……为，为什么要这样折磨姐姐！啊啊啊！不，不能再往里顶了……真的……会坏掉的啊啊啊！」`,
        ); // :4368
        await era.print(
          `『坏掉？！放心，不会的啦，我和魔王大人呀，是打算把姐姐调教成除了肛交之外，什么都不会想的肛门性奴呢♪』`,
        ); // :4369
        await era.printAndWait(
          `${player_name}恶意地笑着，顶起腰，开始更加激烈地抽插着姐姐的肛门。`,
        ); // :4370
        kojo.对面座位肛交 = 2; // :4370-4371
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `被${player_name}抱在腿上的${target_name}，正在肛交的极度快感中淫浪地娇喘着。`,
        ); // :4377
        await era.print(
          `「呜啊……嗯啊啊……好舒服……屁股舒服得……简直要上天了啊啊啊${heart(1)}」`,
        ); // :4378
        await era.printAndWait(
          `${player_name}边欣赏着这甜美的声音，边细细品味着${target_name}肛门的触感…`,
        ); // :4379
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
        ); // :4381
        await era.printAndWait(
          `「实，实在是太舒服了${heart(1)} 已经……完全没有办法再忍下去了啊啊啊${heart(1)} 」`,
        ); // :4382
        await era.print(
          `「让，人家高潮吧，魔王大人！让人家的肛门……高潮到彻底坏掉吧啊啊啊！」`,
        ); // :4383
        await era.printAndWait(
          `耳边响起的${target_name}淫浪的娇喘，让${player_name}的阴茎更加兴奋地挺立着……`,
        ); // :4384
      } else {
        await era.printAndWait(
          `「呜啊……啊啊啊${heart(1)} 魔王大人！魔王大人${heart(1)}」`,
        ); // :4386
        await era.print(
          `「尽情地，把这个只属于您的……肛门性器……侵犯到彻底坏掉吧啊啊啊！」`,
        ); // :4387
        await era.printAndWait(
          `${target_name}靠在${player_name}身上，淫浪的娇喘着，享受着肛交的极度快感……`,
        ); // :4388
      }
      kojo.对面座位肛交 = 7; // :4388-4390
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `被${player_name}抱在腿上的${target_name}，正随着阴茎一次次突入肛门之中而炽热的呻吟着。`,
      ); // :4393
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「咿啊……呜啊啊…${heart(1)} 魔王大人……请……尽情地侵犯我吧${heart(1)}」`,
        ); // :4395
      } else {
        await era.printAndWait(
          `「呜啊啊……肛门……要被魔王大人……调教成性器了啊啊啊${heart(1)}！」`,
        ); // :4397
      }
      await era.printAndWait(
        `呻吟很快变成了享受的娇喘，甜美的声音让${player_name}的阴茎更加兴奋地挺立着，在直肠里抽插着………`,
      ); // :4399
      kojo.对面座位肛交 = 6; // :4399-4400
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `被${player_name}抱在腿上的${target_name}，正在肛交的极度快感中甘甜地娇喘着。`,
        ); // :4404
        await era.print(
          `「呜啊……嗯啊啊……好舒服${heart(1)}……能和魔王大人肛交……真的是……太幸福了啊啊啊${heart(1)}」`,
        ); // :4405
        await era.printAndWait(
          `${player_name}聆听着${target_name}甜美的娇喘，边细细品味着${target_name}肛门的触感………`,
        ); // :4406
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}主动扭起了腰，寻求着更强烈的肛交快感。`,
        ); // :4408
        await era.print(
          `「对，对不起……魔王大人……但是实在是，实在是……太舒服了……舒服得……完全停不下来啊啊啊」`,
        ); // :4409
        await era.printAndWait(
          `耳边响起的${target_name}甘甜的娇喘，让${player_name}的阴茎更加兴奋地挺立着……`,
        ); // :4410
      } else {
        await era.printAndWait(
          `「呜啊啊……好舒服……实在是……太舒服了${heart(1)}」`,
        ); // :4412
        await era.print(
          `「魔，魔王大人……让人家……永远当你的……肛交性奴吧啊啊啊${heart(1)}」`,
        ); // :4413
        await era.printAndWait(
          `${target_name}紧紧抱着${player_name}，敏感的肛门在极度的快感中微微抽搐着………`,
        ); // :4414
      }
      kojo.对面座位肛交 = 5; // :4414-4416
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `感受着被${player_name}侵犯肛门的异样快感，${target_name}发出了灼热的呻吟。`,
      ); // :4419
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `「呜啊啊……屁股……被一次次撑开的感觉……好奇怪……但是好舒服${heart(1)}」`,
        ); // :4421
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「原，原来……用屁股做……也可以这么舒服的……${heart(1)}」`,
        ); // :4423
      } else {
        await era.printAndWait(
          `「魔王大人……请尽情地把人家的肛门……当做性器那样侵犯吧${heart(1)}」`,
        ); // :4425
      }
      await era.printAndWait(
        `${player_name}聆听着${target_name}甜美的娇喘，边动着腰，细细品味着${target_name}肛门的触感………`,
      ); // :4427
      kojo.对面座位肛交 = 4; // :4427-4428
    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `肛交的极度快感一次次冲击着大脑，让${target_name}无意识地双手环抱着${player_name}的脖子。`,
      ); // :4431
      await era.print(
        `「呜啊……明明……明明是那么奇怪的地方……但是为什么……也会这么舒服啊啊啊！」`,
      ); // :4432
      await era.printAndWait(
        `${target_name}灼热地呻吟着，连眼神都变得朦胧了……`,
      ); // :4433
      kojo.对面座位肛交 = 3; // :4433-4434
    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `${target_name}痛苦地抱着${player_name}的脖子，忍耐着肛交的不适和痛苦。`,
      ); // :4437
      if (rand_n(3) === 0) {
        await era.printAndWait(`「呜呜……拔，拔出去吧……求你了……！」`); // :4439
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「明明……屁股不是用来做这种事的……呜呜呜！」`); // :4441
      } else {
        await era.printAndWait(`「饶了我吧……求你了……屁股会，会坏掉的！」`); // :4443
      }
      await era.printAndWait(
        `${player_name}毫不理会${target_name}的哀求，继续肆意地侵犯，蹂躏着${target_name}的肛门………`,
      ); // :4445
      kojo.对面座位肛交 = 2; // :4445-4446
    }
    return 0;
  }

  // :4457-4671 IF SELECTCOM == 29（背面座位肛交 CFLAG:330）
  if (era_flag.selectcom === 29) {
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.背面座位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呜……啊啊${heart(1)} 屁股……被塞得满满的……嗯啊啊${heart(1)}」`,
          ); // :4464
          await era.print(
            `『要把双腿分开啊，让魔王大人看看你淫乱的肛门被插的样子♪』`,
          ); // :4465
          await era.printAndWait(
            `「哈啊……魔王大人${heart(1)} 请，请尽情欣赏${target_name}自己的妹妹肛交侵犯的样子吧${heart(1)}」`,
          ); // :4466
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          ); // :4467
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「呜……啊啊……不，不要同时……攻击胸部啊！」`); // :4470
          await era.print(
            `『哎嘿嘿，姐姐的淫乱胸部一被摸，屁股就夹得更紧了呢♪』`,
          ); // :4471
          await era.printAndWait(`「真……真的……好舒服啊啊${heart(1)}」`); // :4472
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          ); // :4473
        } else {
          await era.printAndWait(`「不……不要做这种事啊啊！」`); // :4476
          await era.print(
            `『不好好分开双腿的话就要惩罚了哦？要好好让魔王大人欣赏性奴姐姐用肛门高潮的样子啊♪』`,
          ); // :4477
          await era.printAndWait(`「呜呜……不要说了，不要再说这种事了………」`); // :4478
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          ); // :4479
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「呜……啊啊…${heart(1)} 屁股……被塞得满满的……嗯啊啊…${heart(1)}」`,
          ); // :4484
          await era.printAndWait(
            `「被魔王大人……这样一边攻击胸部，一边侵犯着肛门${heart(1)} 好舒服……舒服得整个人都要融化了啊啊啊${heart(1)}」`,
          ); // :4485
          await era.printAndWait(
            `${target_name}淫浪的娇喘着，享受着肛交的快感……`,
          ); // :4486
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「唔啊……啊啊……魔王大人……不，不可以同时……侵犯屁股和胸部啊啊${heart(1)}」`,
          ); // :4489
          await era.printAndWait(
            `「不，不行了……肛门被这样抽插着……太舒服了啊啊…${heart(1)}」`,
          ); // :4490
          await era.printAndWait(
            `${target_name}的肛门在快感下一缩一缩地，紧紧夹着${player_name}的${weapon}……`,
          ); // :4491
        } else {
          await era.printAndWait(`「放，放开我啊啊……这样……好羞耻……呜呜呜！」`); // :4494
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          ); // :4495
        }
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1; // :4498
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 被，被${player_name}这样侵犯肛门……真是太舒服了啊啊！」`,
            ); // :4507
            await era.printAndWait(
              `${target_name}喊着妹妹的名字，扭动着腰，寻求着更强烈的快感。`,
            ); // :4508
            await era.print(
              `『哎嘿嘿，原来姐姐这么喜欢肛交的，真是变态呢${heart(1)}』`,
            ); // :4509
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            ); // :4510
            await era.printAndWait(
              `${target_name}更加大声的娇喘了起来，微微抽搐的肛门紧紧地夹着抽插中的阴茎………`,
            ); // :4511
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……嗯啊啊${heart(1)} 肛交……好舒服……真的是太棒了啊啊${heart(1)}」`,
            ); // :4513
            await era.printAndWait(
              `${target_name}微微抽搐的肛门，紧紧夹着${player_name}正在抽插的${weapon}。`,
            ); // :4514
            await era.print(
              `『姐姐喜欢的话就要大声说出来呀？不然我就拔出去了哦！』`,
            ); // :4515
            await era.printAndWait(
              `「喜欢，好喜欢！${target_name}最喜欢被${player_name}的阴茎侵犯肛门了啊啊啊${heart(1)}」`,
            ); // :4516
            await era.printAndWait(
              `${target_name}淫浪的话语让${player_name}无奈地微微叹了口气……`,
            ); // :4517
          } else {
            await era.printAndWait(
              `「啊啊……胸部，还想要被更用力地揉${heart(1)}」`,
            ); // :4519
            await era.print(
              `『嘿嘿，那就让魔王大人看看姐姐是屁股和胸部哪个先高潮好了${heart(1)}』`,
            ); // :4520
            await era.printAndWait(
              `敏感的乳头被妹妹的手指搓弄着，被侵犯着的肛门一张一合地抽搐着。`,
            ); // :4521
            await era.print(
              `『哎呀，屁股夹得这么紧，看来还是这个淫荡的肛门性器要先去了呢${heart(1)}』`,
            ); // :4522
            await era.printAndWait(
              `「是……是啊，姐姐的肛门是……淫乱的性器啊啊啊！好舒服……舒服得……要去了啊啊啊${heart(1)}」`,
            ); // :4523
            await era.printAndWait(
              `${player_name}抱着${target_name}双腿，坚挺的${weapon}持续侵犯着在快感中抽搐着的肛门……`,
            ); // :4524
          }
          // CFLAG:330  = 7（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 7; // :4526
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……啊啊……屁股……被塞得满满的${heart(1)}」`); // :4529
          await era.print(
            `『哎呀呀，姐姐这么喜欢被魔王大人看见自己肛门被侵犯的淫乱样子吗！？』`,
          ); // :4530
          await era.printAndWait(
            `「好，好啊……请魔王大人……尽情欣赏${target_name}用肛门高潮吧！」`,
          ); // :4531
          await era.printAndWait(
            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,
          ); // :4532
          // CFLAG:330  = 6（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 6; // :4533
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :4537
            await era.print(
              `『哎呀呀，姐姐也变得这么坦率了，娇喘得这么大声，终于承认自己是变态肛交性奴了吗${heart(1)}』`,
            ); // :4538
            await era.printAndWait(
              `${target_name}分开双腿，边娇喘边展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,
            ); // :4539
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 姐姐……这么变态……真是对不起${heart(1)}」`,
            ); // :4540
            await era.printAndWait(
              `肛交的同时，${target_name}丰满的胸部也被妹妹肆意地玩弄着。`,
            ); // :4541
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……嗯啊啊……屁股……被${player_name}塞得满满的…${heart(1)}」`,
            ); // :4543
            await era.print(
              `『哎嘿嘿，姐姐肛门的触感真的是一点都不输给小穴呢，完全变成性器了呢』`,
            ); // :4544
            await era.printAndWait(
              `「哈啊……是啊……姐姐的肛门……是专门服务${player_name}和魔王大人的……性器啊啊啊${heart(1)}……」`,
            ); // :4545
            await era.printAndWait(
              `${target_name}更加大声的娇喘了起来，微微抽搐的肛门紧紧地夹着抽插中的阴茎………`,
            ); // :4546
            await era.printAndWait(
              `${player_name}也变得更加兴奋了，更加激烈地侵犯着姐姐`,
            ); // :4547
          } else {
            await era.printAndWait(
              `「啊啊……不，不可以同时……揉捏胸部啊啊${heart(1)}」`,
            ); // :4549
            await era.print(
              `『哎嘿嘿，姐姐的乳头是弱点吗？一被捏，肛门就夹得更紧了${heart(1)}！』`,
            ); // :4550
            await era.printAndWait(
              `「呜……啊啊……不，不行了，要，要去了……要用肛门高潮了啊啊啊${heart(1)}」`,
            ); // :4551
            await era.printAndWait(
              `${target_name}的丰满双乳被${player_name}肆意玩弄着，乳头也被舌头舔舐着。`,
            ); // :4552
            await era.printAndWait(
              `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,
            ); // :4553
          }
          // CFLAG:330  = 5（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 5; // :4555
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哎……哎……不，不要同时摸姐姐的胸部啊啊${heart(1)}」`,
          ); // :4558
          await era.print(
            `『哎嘿嘿，姐姐的乳头是弱点吗${heart(1)} 一被捏，肛门就夹得更紧了${heart(1)}』`,
          ); // :4559
          await era.printAndWait(
            `「别当着……魔王大人说这种话啊……太，太害羞了……可是……可是真的好舒服啊啊啊！」`,
          ); // :4560
          await era.printAndWait(
            `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,
          ); // :4561
          // CFLAG:330  = 4（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 4; // :4562
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……屁股感觉好奇怪啊啊！」`); // :4565
          await era.print(
            `『哎嘿嘿，肛交的感觉很舒服吧姐姐，叫得这么大声${heart(1)}』`,
          ); // :4566
          await era.printAndWait(
            `「才……才没有什么……舒服……呃啊啊……我错了……真的，很舒服啊啊${heart(1)}！」`,
          ); // :4567
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          ); // :4568
          // CFLAG:330  = 3（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 3; // :4569
        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜呜呜……屁股……不是用来做这种事情的啊…」`); // :4572
          await era.print(
            `『啊哈哈，姐姐开始变得坦率了呢，屁股夹得紧紧的！快点把双腿分开让魔王大人看看姐姐的肛门调教结果吧！』`,
          ); // :4573
          await era.printAndWait(`「呜……啊啊，不，不要这么用力往里顶啊啊！」`); // :4574
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门……`,
          ); // :4575
          // CFLAG:330  = 2（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 2; // :4576
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「哈啊……魔王大人……尽情地把人家的屁股……侵犯得一塌糊涂吧${heart(1)}」`,
            ); // :4582
            await era.printAndWait(
              `${target_name}淫浪地扭着腰，追求着更强烈的快感………。`,
            ); // :4583
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            ); // :4584
            await era.printAndWait(
              `敏感的胸部被${player_name}肆意玩弄着，让肛门变得更加敏感，抽搐一般紧紧夹着………`,
            ); // :4585
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「嗯啊啊……啊啊……被魔王大人……的阴茎${heart(1)} 这样侵犯着${heart(1)} 想要，还想要更多啊啊${heart(1)}」`,
            ); // :4587
            await era.printAndWait(
              `${target_name}敏感的肛门在侵犯下紧紧夹着${player_name}的${weapon}。`,
            ); // :4588
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :4589
            await era.printAndWait(
              `肛交的极度快感让${target_name}淫浪的娇喘着，享受着………`,
            ); // :4590
          } else {
            await era.printAndWait(
              `「呜啊啊……屁股和胸部……被这样同时侵犯着${heart(1)} 好舒服啊啊${heart(1)}」`,
            ); // :4592
            await era.printAndWait(
              `「不，不行了……要去了${heart(1)} ${target_name}的肛门性器……要高潮了啊啊${heart(1)}」`,
            ); // :4593
            await era.printAndWait(
              `${target_name}双腿张开地被${player_name}抱着。`,
            ); // :4594
            await era.printAndWait(
              `坚挺的阴茎持续地侵犯，抽插着已经被彻底调教成性器的肛门……`,
            ); // :4595
          }
          // CFLAG:330  = 7（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 7; // :4597
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「哈啊……哈啊…${heart(1)} 魔王大人的阴茎……全部进到人家的屁股里了${heart(1)}」`,
            ); // :4601
            await era.printAndWait(
              `「这对淫乱的胸部……也请魔王大人……尽情蹂躏吧${heart(1)} 啊啊……好，好舒服……边被揉着胸部……边肛交……真的是……太舒服了啊啊啊${heart(1)}」`,
            ); // :4602
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「请，请尽情地调教人家的肛门吧${heart(1)}…… 用魔王大人的阴茎……把人家的肛门蹂躏，侵犯到彻底坏掉吧${heart(1)}」`,
            ); // :4604
          } else {
            await era.printAndWait(
              `「嗯啊啊……啊啊……肛门${heart(1)} 变成魔王大人的……专用飞机杯了啊啊${heart(1)}」`,
            ); // :4606
          }
          await era.printAndWait(
            `${target_name}被${player_name}托着双腿抱在身上侵犯着`,
          ); // :4608
          await era.printAndWait(
            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,
          ); // :4609
          // CFLAG:330  = 6（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 6; // :4610
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「…请……尽情地把${target_name}淫乱的肛门性器……侵犯得一塌糊涂吧${heart(1)}」`,
            ); // :4614
            await era.printAndWait(
              `${target_name}自己扭起了腰，寻求着更激烈的交合。`,
            ); // :4615
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :4616
            await era.printAndWait(
              `敏感而丰满的胸部也同时${player_name}肆意揉捏着，双重的快感让${target_name}发出了甘甜的享受的娇喘……`,
            ); // :4617
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人的阴茎……全部进到人家的……肛门小穴里了${heart(1)}」`,
            ); // :4619
            await era.print(
              `「嗯啊啊……啊啊……被，被这么激烈地侵犯着${heart(1)}……」`,
            ); // :4620
            await era.printAndWait(
              `敏感的肛门紧紧夹着${player_name}的阴茎，甚至主动摩擦了起来。`,
            ); // :4621
            await era.printAndWait(
              `极度的快感让${target_name}发出了甘甜的娇喘……`,
            ); // :4622
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人……这样同时……侵犯胸部和肛门……是犯规的啊啊啊${heart(1)}」`,
            ); // :4624
            await era.printAndWait(
              `「不，不行了……太舒服了……屁股一下子……就要去了啊啊啊${heart(1)}」`,
            ); // :4625
            await era.printAndWait(
              `${target_name}双腿大张着，满脸通红地展示着的肛交的姿态`,
            ); // :4626
            await era.printAndWait(
              `极度的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,
            ); // :4627
          }
          // CFLAG:330  = 5（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 5; // :4629
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……呜啊啊……屁股有点，有点痛………」`); // :4633
            await era.printAndWait(`「还请……温柔一点，魔王大人${heart(1)}」`); // :4634
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊啊……魔王大人……这样的姿势……好羞耻！」`,
            ); // :4636
          } else {
            await era.printAndWait(
              `「被，被这样的姿势侵犯着肛门……不过……只要魔王大人愿意${heart(1)}」`,
            ); // :4638
          }
          await era.printAndWait(
            `${target_name}双腿大张着，满脸通红地展示着的肛交的姿态`,
          ); // :4640
          await era.printAndWait(
            `异样的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,
          ); // :4641
          // CFLAG:330  = 4（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 4; // :4642
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「侵犯得……太激烈了……啊啊啊！」`); // :4645
          if (rand_n(3) === 0) {
            await era.printAndWait(`「屁股……为什么……会这么舒服啊啊啊！」`); // :4647
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「屁股不是用来做……这种事情的啊啊……可是……好舒服……呜呜呜」`,
            ); // :4649
          } else {
            await era.printAndWait(
              `「呜呜呜……居然用屁股做这种事情……传出去……就再也没脸见人了！可是……好舒服……呜啊啊」`,
            ); // :4651
          }
          await era.printAndWait(
            `敏感的肛门在快感下一张一合着，紧紧地夹着正在抽插的阴茎。`,
          ); // :4653
          await era.printAndWait(
            `${target_name}的肛门，如今已经被调教成了用来取悦${player_name}用的性器了……`,
          ); // :4654
          // CFLAG:330  = 3（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 3; // :4655
        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……呜啊啊……屁股……会被撑坏的！」`); // :4659
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「不，不可以全部……插进来啊……好痛！好痛！！」`,
            ); // :4661
          } else {
            await era.printAndWait(
              `「求，求你了……不要继续……往里顶了！真的……会死掉的！」`,
            ); // :4663
          }
          await era.printAndWait(
            `${target_name}的双腿被${player_name}强行分开，过于紧致的肛门已经被阴茎侵犯得有些红肿………`,
          ); // :4665
          // CFLAG:330  = 2（变量语义：CFLAG 族，330）
          kojo.背面座位肛交 = 2; // :4666
        }
      }
      return 0;
    }
  }

  // :4676-4787 IF SELECTCOM == 30（手淫 CFLAG:331）
  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `『姐姐弄得人家的小肉棒好舒服啊啊${heart(1)}』`,
          ); // :4683
          await era.printAndWait(
            `「哎嘿嘿，把精液射在姐姐的手上吧${heart(1)}」`,
          ); // :4684
          await era.printAndWait(
            `『啊啊……最喜欢这么温柔的姐姐了……姐姐纤细的手指……太灵活了啊啊♪』`,
          ); // :4685
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「居然会有给${player_name}……做这种事情的一天…」`,
          ); // :4688
          await era.printAndWait(
            `『怎么样，漂亮吧♪，是魔王大人帮我装上去的哦』`,
          ); // :4689
          await era.printAndWait(`「真，真是的……为什么要做这种事………」`); // :4690
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `『姐姐，要好好侍奉人家的小鸡鸡啊${heart(1)}』`,
          ); // :4693
          await era.printAndWait(`「明，明白了……是要做这种事吧……」`); // :4694
          await era.printAndWait(`『呼呼，姐姐的动作真温柔啊』`); // :4695
        } else {
          await era.printAndWait(`「为，为什么……你会长出这样的东西来啊啊！」`); // :4698
          await era.printAndWait(
            `『姐姐别哭了，快点给我——唔啊啊，被姐姐纤细的手指这么温柔地弄着……好像在做梦一样』`,
          ); // :4699
          await era.printAndWait(`「可，可是对我来说……是噩梦啊……呜呜呜…」`); // :4700
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊……魔王大人的阴茎……雄伟地树立在人家面前${heart(1)}」`,
          ); // :4705
          await era.printAndWait(
            `${target_name}舔了舔舌头，带着淫媚的表情，用手激烈地摩擦套弄着${player_name}的阴茎`,
          ); // :4706
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊……魔王大人的阴茎……在人家的手里变得硬邦邦的了${heart(1)}」`,
          ); // :4709
          await era.printAndWait(
            `${target_name}炽热地呼吸着，用纤细的手指温柔而仔细地按摩着${player_name}的阴茎………`,
          ); // :4710
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(`「真是的……这种……黏糊糊的感觉……」`); // :4713
          await era.printAndWait(
            `${target_name}合拢十指，用不熟练的手法侍奉着${player_name}的阴茎……`,
          ); // :4714
        } else {
          await era.printAndWait(`「完全不想做这，这种事情……呜呜呜！」`); // :4717
          await era.printAndWait(
            `${target_name}战战兢兢地用手侍奉着${player_name}的阴茎`,
          ); // :4718
        }
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1; // :4721
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啦啦、${player_name}的阴茎，让姐姐帮你变的更大吧${heart(1)}」`,
          ); // :4729
          await era.printAndWait(
            `『啊啊啊……姐姐弄得人家的小鸡鸡舒服得……快要疯了啊啊♪』`,
          ); // :4730
          await era.printAndWait(`「来吧，在姐姐的手上射精吧${heart(1)}」`); // :4731
          // CFLAG:331  = 5（变量语义：CFLAG 族，331）
          kojo.手淫 = 5; // :4732
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『嘿嘿，这个小鸡鸡可是魔王大人给我装上的哦，要温柔地对待呀♪』`,
          ); // :4735
          await era.printAndWait(`「哎哎，人家知道啦……这样弄可以吗？」`); // :4736
          await era.printAndWait(
            `『姐姐和小鸡鸡都好喜欢，但是最喜欢的还是给我侍奉小鸡鸡的姐姐，真是太棒了！』`,
          ); // :4737
          // CFLAG:331  = 4（变量语义：CFLAG 族，331）
          kojo.手淫 = 4; // :4738

          // 原作 :4740 重复上一档的「爱慕＋奉仕精神」判据，因此本档不可达。
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『姐姐，要好好伺候人家的小鸡鸡啊${heart(1)}』`,
          ); // :4741
          await era.printAndWait(
            `「就……就是要侍奉到射精为止对吧……可是……你为什么腿间会长出这种…」`,
          ); // :4742
          await era.printAndWait(`『唔唔，姐姐的指法真温柔……』`); // :4743
          // CFLAG:331  = 3（变量语义：CFLAG 族，331）
          kojo.手淫 = 3; // :4744
        } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「可，可以停下了吗，${player_name}」`); // :4747
          await era.printAndWait(`『说什么呐，要侍奉到射精为止啊笨蛋姐姐』`); // :4748
          await era.printAndWait(`「呜呜呜……」`); // :4749
          // CFLAG:331  = 2（变量语义：CFLAG 族，331）
          kojo.手淫 = 2; // :4750
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「嘿嘿，${target_name}的手交侍奉如何呀…一会儿可要满满地射出来哦${heart(1)}」`,
            ); // :4756
            await era.printAndWait(
              `${target_name}舔着嘴唇，带着一脸淫媚的表情，用手激烈地摩擦着${player_name}的阴茎……`,
            ); // :4757
          } else {
            await era.printAndWait(
              `「魔王大人这强烈的味道……弄得人家都晕乎乎的了${heart(1)} 真是的，不过好舒服啊${heart(1)} 」`,
            ); // :4759
            await era.printAndWait(
              `${target_name}用力嗅着阴茎的味道，露出了仿佛要融化了的表情，用手激烈地摩擦着${player_name}的阴茎……`,
            ); // :4760
          }
          // CFLAG:331  = 5（变量语义：CFLAG 族，331）
          kojo.手淫 = 5; // :4762
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……魔王大人的阴茎，在${target_name}的手里……变得硬邦邦的了${heart(1)}」`,
            ); // :4766
            await era.printAndWait(
              `${target_name}呼吸都变得炽热了起来，用纤细的手指仔细地爱抚，侍奉着${player_name}的阴茎。`,
            ); // :4767
          } else {
            await era.printAndWait(
              `「魔王大人……这样用手侍奉，感觉舒服吗…舒服的话就在${target_name}的手上射精吧${heart(1)}」`,
            ); // :4769
            await era.printAndWait(
              `${target_name}认真侍奉着${player_name}的阴茎，边红着脸说着不知廉耻的台词……`,
            ); // :4770
          }
          // CFLAG:331  = 4（变量语义：CFLAG 族，331）
          kojo.手淫 = 4; // :4772

          // 原作 :4774 同样重复上一档判据，因此本档不可达。
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「这，这样就行了吗……呜啊啊……阴茎在，在手中勃起了…！」`,
          ); // :4775
          await era.printAndWait(
            `${target_name}虽然技术不娴熟，但是仍然努力的用手指侍奉着${player_name}的阴茎……`,
          ); // :4776
          // CFLAG:331  = 3（变量语义：CFLAG 族，331）
          kojo.手淫 = 3; // :4777
        } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「就，就像这样做吗？」`); // :4780
          await era.printAndWait(
            `${target_name}战战兢兢地用手指侍奉着${player_name}的阴茎……`,
          ); // :4781
          // CFLAG:331  = 2（变量语义：CFLAG 族，331）
          kojo.手淫 = 2; // :4782
        }
      }
      return 0;
    }
  }

  // :4792-4907 IF SELECTCOM == 31（口交 CFLAG:332）
  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      // :4794

      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「唔呣……唔呣……阴茎……好喜欢${heart(1)}」`); // :4799
          await era.printAndWait(`『看到鸡鸡就这么兴奋，姐姐真是个变态呢…』`); // :4800
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「要……要姐姐去吸妹妹腿间长出来的…奇怪东西……这种事实在是…唔呣……唔唔」`,
          ); // :4803
          await era.printAndWait(
            `『噢噢，姐姐在为妹妹的扶他鸡鸡口交啊……果然是变态呢。不过放心好了，这样的变态姐姐才是我和魔王大人喜欢的！』`,
          ); // :4804
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣……这，这样可以吗……还要继续？」`,
          ); // :4807
          await era.printAndWait(
            `『当然要继续啦，姐姐的嘴巴很舒服呢……一会儿就射在姐姐的嘴里好了♪』`,
          ); // :4808
        } else {
          await era.printAndWait(
            `『哎嘿嘿 ，被姐姐舔着小鸡鸡的感觉，好像在做梦一样♪』`,
          ); // :4811
          await era.printAndWait(`「唔呣……唔呣……求求你，放过姐姐吧！」`); // :4812
          await era.printAndWait(
            `『笨蛋，要舔到射精为止啊${heart(1)}　要是在魔王大人面前说出“含在嘴里真讨厌”这样的话，可是会被拔掉所有牙齿的哦？』`,
          ); // :4813
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈啊……唔呣……呣呣……阴茎的味道……好棒${heart(1)}」`,
          ); // :4818
          await era.printAndWait(
            `${target_name}趴伏在${player_name}的双腿之间，积极地进行着口交侍奉………`,
          ); // :4819
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「${target_name}会好好侍奉陛下的阴茎的${heart(1)}……唔呣……唔呣${heart(1)}」`,
          ); // :4822
          await era.printAndWait(
            `${target_name}的眼睛里充满了爱意，卖力地吸吮着${player_name}的阴茎……`,
          ); // :4823
        } else if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「嗯哈…嗯啾…咻…哈呣…嗯噗…啊啊，可不要把我当那种看到阴茎就想舔上去的女人啊！这个是…没办法的事，所以……所以…嗯…啾……………」`,
          ); // :4826
          await era.printAndWait(
            `${player_name}听着${target_name}含糊辩解，笑了起来，继续享受着${target_name}的口交侍奉……`,
          ); // :4827
        } else {
          await era.printAndWait(
            `「呜呜……唔呣……如，如果我这么做了……能放过我的妹妹嘛……唔呣……嗯噗」`,
          ); // :4830
          await era.printAndWait(
            `${target_name}流着泪边进行着口交侍奉边乞求着…`,
          ); // :4831
        }
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1; // :4834
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……阴茎的味道……好喜欢……唔唔……呣呣${heart(1)}」`,
          ); // :4842
          await era.printAndWait(
            `『哈啊…原来姐姐这么喜欢鸡鸡啊……有点吃惊呢，算了反正舔得很舒服♪』`,
          ); // :4843
          // CFLAG:332  = 5（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 5; // :4844
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣………进，进到喉咙里了…呜呜……不能…再深入了唔唔」`,
          ); // :4847
          await era.printAndWait(
            `『加油啊姐姐，魔王大人也会给你打气的哦。呜哇哇……小鸡鸡进到喉咙里面好舒服！』`,
          ); // :4848
          await era.printAndWait(`「不，不行了——唔呣……唔唔…！」`); // :4849
          // CFLAG:332  = 4（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 4; // :4850
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣……唔唔……唔呣……在，在人家嘴里胀得这么大……好，好吃力……唔呣」`,
          ); // :4853
          await era.printAndWait(
            `『啊啊！姐姐在咕啾咕啾地吸着人家的小鸡鸡！对，就是这里！』`,
          ); // :4854
          // CFLAG:332  = 3（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 3; // :4855
        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「姐，姐姐会努力的……所以请早点射精吧…呜呜呜……唔呣，唔呣」`,
          ); // :4858
          await era.printAndWait(
            `『姐姐的嘴巴真是差劲，要好好地舔啊，对这里，还有这里♪』`,
          ); // :4859
          // CFLAG:332  = 2（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 2; // :4860
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            // COM31-RAND
            await era.printAndWait(
              `「哈啊……唔呣……呣呣……阴茎的味道……吸吮起来好棒${heart(1)}」`,
            ); // :4866
            await era.printAndWait(
              `${target_name}趴伏在${player_name}的双腿之间，积极地进行着口交侍奉………`,
            ); // :4867
          } else if (rand_n(2) === 0) {
            // COM31-RAND
            await era.printAndWait(
              `「唔呣……呣呣……魔王大人的……阴茎在${target_name}的嘴里……涨得好大${heart(1)} 哈啊……唔呣……呣呣……${heart(1)}」`,
            ); // :4869
            await era.printAndWait(
              `${target_name}含着${player_name}的阴茎，用舌头舔舐着，发出一阵阵下流的声音………`,
            ); // :4870
          } else {
            await era.printAndWait(
              `「还，还想要更多……唔呣${heart(1)} 唔呣${heart(1)} 再深入到${target_name}的嘴里吧${heart(1)}」`,
            ); // :4872
            await era.printAndWait(
              `${target_name}带着淫媚贪婪的表情，深深含住了${player_name}的阴茎，开始进行口交侍奉………`,
            ); // :4873
          }
          // CFLAG:332  = 5（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 5; // :4875
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「能侍奉魔王大人的阴茎……是我的幸运${heart(1)} 唔呣……呣呣……${heart(1)}」`,
            ); // :4879
            await era.printAndWait(
              `${target_name}眼神里充满了爱意，低头吸吮着${player_name}的阴茎………`,
            ); // :4880
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「哈啊……阴茎在${target_name}的嘴里……变得这么兴奋了${heart(1)}…唔呣……唔呣……呣呣……${heart(1)}」`,
            ); // :4882
            await era.printAndWait(
              `${target_name}用舌头缠绕，舔舐着${player_name}的阴茎，热情地进行着口交侍奉……`,
            ); // :4883
          } else {
            await era.printAndWait(
              `「在，在${target_name}的嘴里全部射出来吧，我会好好喝下去的${heart(1)}」`,
            ); // :4885
            await era.printAndWait(
              `${target_name}说完，努力地吸吮着${player_name}的阴茎，促进着射精……`,
            ); // :4886
          }
          // CFLAG:332  = 4（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 4; // :4888
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              `「我，我会努力的……唔呣……呣呣……魔王大人……这样舒服吗……唔呣」`,
            ); // :4892
          } else {
            await era.printAndWait(
              `「唔呣……呣呣……魔王大人的阴茎……在嘴巴里勃起了……唔呣……唔呣……呣呣」`,
            ); // :4894
          }
          await era.printAndWait(
            `${target_name}已经渐渐被你调教的热衷于侍奉了，正在仔细地舔舐着${player_name}的阴茎……`,
          ); // :4896
          // CFLAG:332  = 3（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 3; // :4897
        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「唔呣……呣呣……这么丢人的事……唔呣……」`); // :4900
          await era.printAndWait(
            `${target_name}瞥视着${player_name}，边进行着生疏的口交侍奉………`,
          ); // :4901
          // CFLAG:332  = 2（变量语义：CFLAG 族，332）
          kojo.口交_奴 = 2; // :4902
        }
      }
      return 0;
    }
  }

  // :4912-5015 IF SELECTCOM == 32（乳交 CFLAG:333）
  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『被姐姐的巨乳这么侍奉着小鸡鸡…啊啊我也想要这么大的胸部啊${heart(1)}』`,
        ); // :4917
        await era.printAndWait(`「呜呜……这样会很舒服吗${player_name}？」`); // :4918
        await era.printAndWait(
          `『简直……再舒服不过啦！啊啊，被姐姐的巨乳包裹着，小鸡鸡一下子就要射精了！』`,
        ); // :4919
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「听说男人都很喜欢被这样进行乳交侍奉呢、啊啊……乳房这样摩擦着，感觉也兴奋起来了${heart(1)}」`,
        ); // :4923
        await era.printAndWait(
          `${target_name}的眼神里充满了情欲，呼吸也变得急促了起来，更加卖力地进行着乳交侍奉……`,
        ); // :4924
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊……魔王大人喜欢${target_name}的乳交侍奉吗…好高兴${heart(1)}」`,
        ); // :4927
        await era.printAndWait(
          `${target_name}红着脸，边笑着边用乳房侍奉着的${player_name}的阴茎……`,
        ); // :4928
      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(`「呜啊啊…用，用胸部这样做……感觉舒服吗？」`); // :4931
        await era.printAndWait(
          `${target_name}小心翼翼地用巨乳夹着${player_name}的阴茎、摩擦着进行着乳交侍奉……`,
        ); // :4932
      } else {
        await era.printAndWait(`「呜呜……胸部…明明不是用来做这种事情的……」`); // :4935
        await era.printAndWait(`${target_name}皱着眉头，用双乳侍奉着阴茎……`); // :4936
      }
      // CFLAG:TARGET:333 = 1（乳交初次）
      kojo.乳交 = 1; // :4939
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        // 原作 :4946 误读 CFLAG:332（口交），而非本支 CFLAG:333，1:1 保留。
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈啊…${player_name}的阴茎在我的乳沟里面摩擦……感觉很舒服吧${heart(1)}」`,
          ); // :4948
          await era.printAndWait(
            `『嗯嗯、姐姐的乳沟真是太棒了……啊啊，要射精了！』`,
          ); // :4949
        } else {
          await era.printAndWait(
            `「感觉舒服了的话${heart(1)}　射在姐姐脸上也可以哦${heart(1)} 」`,
          ); // :4951
          await era.printAndWait(
            `『嗯嗯……要来了哦，会全部射在姐姐脸上的${heart(1)}』`,
          ); // :4952
        }
        kojo.乳交 = 5; // :4954
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `『啊啊……姐姐的胸部好舒服啊，平时也是这么侍奉魔王大人的吗？』`,
          ); // :4958
          await era.printAndWait(
            `「是，是啊，姐姐的胸部就是用来侍奉魔王大人和${player_name}的……」`,
          ); // :4959
        } else {
          await era.printAndWait(`「这，这样舒服吗…？能感到满意就好了…」`); // :4961
          await era.printAndWait(
            `『啊啊，侵犯姐姐的胸部太舒服了，舒服到要射精了、唔唔……再夹紧一点！』`,
          ); // :4962
        }
        kojo.乳交 = 4; // :4964
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `『哎哎，姐姐学得挺快呀，这样就可以满足魔王陛下了哦～』`,
        ); // :4967
        await era.printAndWait(
          `「这……这种事情人家不知道啦……如果觉得舒服……就快射精吧${player_name}…唔唔唔唔～！」`,
        ); // :4968
        kojo.乳交 = 3; // :4969
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`『啊啊，姐姐的乳交好舒服${heart(1)}』`); // :4972
        await era.printAndWait(`「呜，呜呜……快点射精然后结束吧…」`); // :4973
        kojo.乳交 = 2; // :4974
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      // 原作 :4978 同样误读 CFLAG:332，1:1 保留。
      (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊，魔王大人的阴茎……炽热地在乳沟里摩擦着${heart(1)}　哈啊……很快就要射精了吧${heart(1)}」`,
        ); // :4980
        await era.printAndWait(
          `${target_name}的眼睛里充满了情欲，呼吸也变得急促起来`,
        ); // :4981
      } else {
        await era.printAndWait(
          `「哈啊……我的胸部……就是为了侍奉魔王大人而存在的${heart(1)}　啊啊……感觉好舒服${heart(1)}」`,
        ); // :4983
        await era.printAndWait(
          `${target_name}像狗一样谄媚地伸着舌头，进行着乳交侍奉……`,
        ); // :4984
      }
      kojo.乳交 = 5; // :4986
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          `「啊啊……胸部在侍奉魔王大人的时候……也感觉好舒服${heart(1)}」`,
        ); // :4990
        await era.printAndWait(
          `${target_name}微微抬起头，笑着偷看了一下${player_name}的脸，然后继续进行着乳交侍奉………`,
        ); // :4991
      } else {
        await era.printAndWait(`「能侍奉魔王大人……是我的幸福${heart(1)}」`); // :4993
        await era.printAndWait(
          `${target_name}用乳交侍奉着阴茎，侍奉得欲火焚身了起来，双腿相互摩擦着……`,
        ); // :4994
      }
      kojo.乳交 = 4; // :4996
    } else if (
      chara(target).system.侍奉精神 >= 3 &&
      (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这，这样真得很舒服吗……乳房感觉……好奇怪…」`); // :4999
      await era.printAndWait(
        `${target_name}呼吸变得急促了起来，面红耳赤地侍奉着${player_name}的阴茎……`,
      ); // :5000
      kojo.乳交 = 3; // :5001
    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「这……这样真的……会感觉舒服吗……呜呜」`); // :5004
      await era.printAndWait(
        `${target_name}一边流着眼泪，一边战战兢兢地为${player_name}进行着乳交侍奉……`,
      ); // :5005
      kojo.乳交 = 2; // :5006
    }
    return 0;
  }

  // :5016-5100 IF SELECTCOM == 33（素股 CFLAG:334）
  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『姐姐那里都湿透了呢，哈哈，用那里摩擦着小鸡鸡很舒服吧♪』`,
        ); // :5021
        await era.printAndWait(
          `「这，这种事情……不要说出来啦！到底……还要多久……」`,
        ); // :5022
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「虽，虽然只在外面摩擦……但是……碰到的都是敏感点……魔王大人的阴茎好厉害啊啊${heart(1)}」`,
        ); // :5026
        await era.printAndWait(
          `${target_name}在${player_name}的命令下用蜜穴口摩擦着阴茎，口中已经不住地娇喘起来……`,
        ); // :5027
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈啊……啊啊！魔，魔王大人的阴茎……好热……光是摩擦着……人家的蜜穴就像要融化了一样${heart(1)}」`,
        ); // :5030
        await era.printAndWait(
          `${target_name}带着陶醉的表情，用蜜穴摩擦着的${player_name}的阴茎……`,
        ); // :5031
      } else {
        await era.printAndWait(
          `「呜呜！可，可以停下了吗……做这种奇怪的事情……真的会感觉舒服吗……」`,
        ); // :5034
        await era.printAndWait(`${target_name}泪流满面地用股间侍奉着阴茎………`); // :5035
      }
      kojo.股间性交 = 1; // :5038
      return 0;
    }

    if (assi_mao) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯啊……啊啊……干脆把姐姐的处女……也夺走好了……这样在外面摩擦，真的忍受不了了啊啊！」`,
        ); // :5046
        await era.printAndWait(
          `『哎呀，姐姐都淫乱成这个样子了……这样挑逗妹妹真的好吗♪』`,
        ); // :5047
        kojo.股间性交 = 6; // :5048
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎哎……不要光在外面摩擦啦${heart(1)} 快点插进来不行吗${heart(1)}」`,
        ); // :5051
        await era.printAndWait(
          `『还不行呢姐姐，我还没感到舒服，不会插进去的哦♪』`,
        ); // :5052
        kojo.股间性交 = 5; // :5053
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `『哎呀呀，姐姐的处女小穴，要是不小心插进去了怎么办？嘻嘻！』`,
        ); // :5056
        await era.printAndWait(
          `「不要说这种蠢话啦……啊啊……光这么摩擦就已经要，要去了！」`,
        ); // :5057
        kojo.股间性交 = 4; // :5058
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`『啊啊……姐姐的股间侍奉，超级舒服啊』`); // :5061
        await era.printAndWait(
          `「哈啊……这么说……姐姐很高兴……啊啊……要，要射精了吗！」`,
        ); // :5062
        kojo.股间性交 = 3; // :5063
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「可，可以停下了么……呜呜！」`); // :5066
        await era.printAndWait(
          `『姐姐的股间侍奉，超级舒服啊，我要发射了${heart(1)}』`,
        ); // :5067
        kojo.股间性交 = 2; // :5068
      }
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「嗯啊……哎啊！求你了，快点来夺走人家的处女吧……小穴里面比这样摩擦服多了啦${heart(1)}」`,
      ); // :5073
      await era.printAndWait(
        `${target_name}用敏感的蜜穴口摩擦着${player_name}的阴茎就已经兴奋了起来，不顾廉耻地说着诱惑的话……`,
      ); // :5074
      kojo.股间性交 = 6; // :5075
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜啊……啊啊！阴茎不插进去，就在外面摩擦敏感点…魔王大人好厉害啊啊${heart(1)}」`,
      ); // :5078
      await era.printAndWait(
        `${target_name}的蜜穴口被${player_name}的阴茎摩擦着，忍不住已经娇喘了起来……`,
      ); // :5079
      kojo.股间性交 = 5; // :5080
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:0`) === 1 &&
      (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊……啊啊${heart(1)} 要是控制不住了……像骑马这样坐下去……就可以献出处女了呢${heart(1)}」`,
      ); // :5083
      await era.printAndWait(
        `${target_name}边用股间侍奉着阴茎边开玩笑似地说道，但是眼神却是认真的……`,
      ); // :5084
      kojo.股间性交 = 4; // :5085
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈啊……啊啊……阴茎……热热的${heart(1)} 感觉……蜜穴要被融化了一样${heart(1)}」`,
      ); // :5088
      await era.printAndWait(
        `${target_name}一脸陶醉的表情，用股间侍奉着${player_name}的阴茎……`,
      ); // :5089
      kojo.股间性交 = 3; // :5090
    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「呜……呜啊！为，为什么会……有奇怪的感觉……好像很舒服……」`,
      ); // :5093
      await era.printAndWait(
        `${target_name}敏感的蜜穴摩擦着阴茎，忍不住呻吟了起来……`,
      ); // :5094
      kojo.股间性交 = 2; // :5095
    }
    return 0;
  }

  // :5106-5414 IF SELECTCOM == 34（骑乘位 CFLAG:335）
  if (era_flag.selectcom === 34) {
    const weapon =
      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「呜……我的处女……居然要献给妹妹了啊啊啊${heart(1)}」`,
            ); // :5115
            await era.printAndWait(
              `${target_name}屈服地落下了身子，骑在${player_name}身上、让自己的妹妹夺走了自己的处女身。`,
            ); // :5116
            await era.printAndWait(
              `『啊啊啊${heart(1)} 姐姐的处女，我就收下了！！最喜欢姐姐了♪』`,
            ); // :5117
            await era.printAndWait(
              `「唔……唔啊啊……我，我也喜欢${player_name}了啊啊！如果是别人……才不可能……有这么舒服啊啊啊！」`,
            ); // :5118
            await era.printAndWait(
              `『真，真的吗？听到姐姐这么说，好高兴！！那么姐姐小穴的第一次高潮，也由我来给予吧！』`,
            ); // :5119
            await era.printAndWait(
              `欣喜若狂的${player_name}，挺起腰，开始自下而上地侵犯${target_name}的处女蜜穴……`,
            ); // :5120
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(`「呜……呜啊……我的处女……就这样……」`); // :5123
            await era.printAndWait(
              `${target_name}屈服地落下了身子，骑在${player_name}身上、让自己的妹妹夺走了自己的处女身。`,
            ); // :5124
            await era.printAndWait(
              `『人家好高兴${heart(1)} 能够收下最爱的姐姐的处女♪』`,
            ); // :5125
            await era.printAndWait(
              `「哈啊……啊啊……其，其实不大……想让魔王大人……看见！」`,
            ); // :5126
            await era.printAndWait(
              `『知道姐姐喜欢魔王大人啦、不过事到如今，反悔也没有用了哦${heart(1)} 还是说……难道姐姐不喜欢${player_name}了吗？』`,
            ); // :5127
            await era.printAndWait(`「对，对不起……人家不是反悔啦……」`); // :5128
            await era.printAndWait(
              `${player_name}舔着嘴唇、挺起腰，开始自下而上地侵犯${target_name}的处女蜜穴……`,
            ); // :5129
          } else {
            await era.printAndWait(
              `「呜……呜呜……求你了……放过姐姐吧，姐姐还是处女啊……」`,
            ); // :5132
            await era.printAndWait(
              `${target_name}未经人事的蜜穴，被${player_name}挺起腰，慢慢穿透了。`,
            ); // :5133
            await era.printAndWait(
              `『哎嘿嘿，感觉到处女膜了……给我……破掉吧！』`,
            ); // :5134
            await era.printAndWait(`「住，住手，不可以不可以不可以啊啊啊！」`); // :5135
            await era.printAndWait(
              `${player_name}紧紧抓着${target_name}的腰，用${weapon}不由分说地贯穿了处女蜜穴`,
            ); // :5136
            await era.printAndWait(
              `『哈啊啊！姐姐的处女归我了！从此以后变成我的性奴吧${heart(1)}』`,
            ); // :5137
            await era.printAndWait(
              `「呜呜……呜呜呜……太过分了——等等！不，不能再往里进了！好痛，好痛啊啊」`,
            ); // :5138
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人……进到我的处女小穴里了……从今以后……我就是真正属于魔王大人的了啊啊啊${heart(1)}」`,
            ); // :5143
            await era.printAndWait(
              `${target_name}淫浪的摇着腰，用初经人事的蜜穴将${player_name}的阴茎完全吞入了。`,
            ); // :5144
            await era.printAndWait(
              `「魔王大人的阴茎……在人家的小穴里……搅动着……好舒服${heart(1)} 原来……做爱……是这么舒服的事情啊啊啊${heart(1)}」`,
            ); // :5145
            await era.printAndWait(
              `${target_name}背部绷得紧紧的，尽情享受着初次交媾的快感，蜜穴紧紧夹着阴茎。`,
            ); // :5146
            await era.printAndWait(
              `「不，不行了……舒服得……没有力气了${heart(1)} 接下来……魔王大人……尽情……啊啊啊${heart(1)}」`,
            ); // :5147
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「哈啊……哈啊……感受到……魔王大人的阴茎了……请，请收下${target_name}的处女吧${heart(1)}」`,
            ); // :5150
            await era.printAndWait(
              `${target_name}满脸通红，骑跨自${player_name}身上，慢慢沉下了腰。`,
            ); // :5151
            await era.printAndWait(
              `${player_name}的龟头刚刚穿透处女膜，上方就响起了${target_name}交织着痛苦与享受的呻吟。`,
            ); // :5152
            await era.printAndWait(
              `「呜……呜啊啊……有点痛${heart(1)} 但……但是……魔王大人……从此我就是属于你的了啊啊啊！」`,
            ); // :5153
            await era.printAndWait(
              `${target_name}一鼓作气地坐了下来，让阴茎完全进入了自己的处女小穴中。`,
            ); // :5154
            await era.printAndWait(
              `破处的疼痛让她流出了泪水，但是脸上却充满了幸福的笑容。`,
            ); // :5155
            await era.printAndWait(
              `「我爱你……魔王大人……永远爱你……${heart(1)}」`,
            ); // :5156
          } else {
            await era.printAndWait(`「不，不行！放开我，放开我……求你了……！」`); // :5159
            await era.printAndWait(
              `${player_name}抓着${target_name}的腰，勃起的阴茎自下而上穿透了未经人事的紧致蜜穴。`,
            ); // :5160
            await era.printAndWait(`「好，好痛！！快停下来，停下来啊啊！」`); // :5161
            await era.printAndWait(
              `破处的疼痛让${target_name}痛苦地悲鸣了起来，但这声音却只让${player_name}更加的兴奋……`,
            ); // :5162
          }
        }
      } else {
        if (assi_mao) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「呜啊……啊啊……顶，顶到最里面了……好舒服${heart(1)}」`,
            ); // :5171
            await era.printAndWait(
              `${target_name}前后扭着腰，让${player_name}的${weapon}在自己的蜜穴里一次次进出着。`,
            ); // :5172
            await era.print(
              `『哎呀呀，姐姐这么兴奋，那么喜欢被魔王大人视奸的感觉吗？』`,
            ); // :5173
            await era.printAndWait(
              `「是……是啊……姐姐，最喜欢被别人看着自己淫乱的样子了啊啊${heart(1)}」`,
            ); // :5174
            await era.printAndWait(
              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,
            ); // :5175
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「呜……呜啊……在魔王大人……面前用这种姿势……实在太害羞了！」`,
            ); // :5178
            await era.printAndWait(
              `${player_name}抱着${target_name}的腰，用股间高高耸立的${weapon}一次次顶入姐姐的蜜穴中。`,
            ); // :5179
            await era.print(
              `『哼，嘴上这么说，小穴却夹得更紧了，明明就是很想被魔王大人视奸吧，变态姐姐♪』`,
            ); // :5180
            await era.printAndWait(
              `「嗯啊……啊啊……姐姐这么变态……真是对，对不起啊啊……！」`,
            ); // :5181
            await era.printAndWait(
              `${target_name}在深爱的${master_name}的注视下，被自己的妹妹不断从身下侵犯着，内心却涌起了异样的快感……`,
            ); // :5182
          } else {
            await era.print(`『姐姐，腰要好好地动起来啊，难道你想挨罚吗？！』`); // :5185
            await era.printAndWait(
              `「呜……呜啊啊……饶了姐姐吧……姐姐真的……已经不行了！」`,
            ); // :5186
            await era.printAndWait(
              `${target_name}的蜜穴被${player_name}侵犯得一塌糊涂，痛苦地悲鸣着……`,
            ); // :5187
          }
        } else {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `像娼馆的妓女一样扭着腰的${target_name}，完全沉浸在交媾的快感之中。`,
            ); // :5192
            await era.printAndWait(
              `「哈啊……啊啊……这样自己动……真的是太舒服了啊啊${heart(1)}」`,
            ); // :5193
            await era.printAndWait(
              `${player_name}欣赏着${target_name}的娇喘，任由阴茎随着${target_name}的动过在爱液泛滥的蜜穴里进出着……`,
            ); // :5194
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${target_name}带着一脸的幸福，有些笨拙地扭动着腰，让${player_name}的阴茎在自己爱液泛滥的蜜穴里进出着。`,
            ); // :5197
            await era.printAndWait(
              `「哈啊……哈啊……魔王大人……这样信任我……让我自己动……好幸福${heart(1)}」`,
            ); // :5198
            await era.printAndWait(
              `为了寻求更多的快感，${target_name}加大了腰部动作的幅度…`,
            ); // :5199
          } else {
            await era.printAndWait(
              `${target_name}屈辱而痛苦的咬着嘴唇，在${player_name}的命令下上下扭动着腰。`,
            ); // :5202
            await era.printAndWait(
              `「呜啊啊……什么时候……才可以停下来……好难受！」`,
            ); // :5203
            await era.printAndWait(''); // :5204
          }
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1; // :5208
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :5217
            if (rand_n(4) === 0) {
              await era.print(
                `『哎呀呀，姐姐的叫声这么淫乱，魔王大人都听见了啊！』`,
              ); // :5219
              await era.printAndWait(
                `${target_name}扭着腰，尽情享受着与${player_name}交媾的快感，连绵的娇喘在调教室里回荡着。`,
              ); // :5220
              await era.printAndWait(
                `「呜啊啊……被，被自己的妹妹侵犯……原来是这么舒服的事情啊啊啊魔王大人${heart(1)}」`,
              ); // :5221
            } else if (rand_n(3) === 0) {
              await era.print(
                `『呜哇，姐姐的娇喘声音原来这么好听的${heart(1)} 真不愧是我的淫乱姐姐${heart(1)}』`,
              ); // :5223
              await era.printAndWait(
                `${player_name}一次次顶起腰，侵犯着骑在自己身上的${target_name}。`,
              ); // :5224
              await era.printAndWait(
                `${target_name}敏感的蜜穴在妹妹的侵犯下，向大脑传递着一阵又一阵强烈的快感。`,
              ); // :5225
              await era.printAndWait(
                `「嗯啊啊……好舒服${heart(1)} 这个姿势……比我想象的……还要舒服啊啊啊${heart(1)} 」`,
              ); // :5226
            } else if (rand_n(2) === 0) {
              await era.print(
                `『哎呀呀，我都还没说自己就动起腰来了，真的有那么舒服吗！』`,
              ); // :5228
              await era.printAndWait(
                `${target_name}带着淫媚而享受的笑容，一上一下地尽情地扭动着腰。`,
              ); // :5229
              await era.printAndWait(
                `「好舒服${heart(1)}…… 真的好舒服${heart(1)}…… ${player_name}的阴茎……插得姐姐……要去了啊啊${heart(1)}」`,
              ); // :5230
              await era.printAndWait(
                `${target_name}完全沉浸在被自己妹妹侵犯的背德快感之中，整个人都忘乎所以了……`,
              ); // :5231
            } else {
              await era.print(
                `『姐姐啊！姐姐啊${heart(1)} 魔王大人给人家装上的小鸡鸡，感觉如何啊${heart(1)}』`,
              ); // :5233
              await era.printAndWait(
                `${target_name}上下动着腰，让${player_name}的${weapon}在自己的蜜穴里反复进出着。`,
              ); // :5234
              await era.printAndWait(
                `「很……很舒服啊${heart(1)} 舒服得姐姐……要去了啊啊啊${heart(1)}」`,
              ); // :5235
              await era.printAndWait(
                `『哈啊……姐姐的蜜穴……也很紧很舒服啊啊啊${heart(1)} 』`,
              ); // :5236
              await era.printAndWait(
                `两人的交合处，爱液喷溅着，姐妹两人的乱伦之乐还在继续……`,
              ); // :5237
            }
          } else {
            await era.printAndWait(`「呜……呜啊……顶，顶到最里面了${heart(1)}」`); // :5240
            await era.printAndWait(
              `${target_name}上下扭动着腰，让${player_name}的${weapon}在自己的蜜穴里进出着。`,
            ); // :5241
            await era.print(
              `『哎哟哟，姐姐这么兴奋，那么喜欢被魔王大人视奸的感觉吗？』`,
            ); // :5242
            await era.printAndWait(
              `「是……是啊……姐姐，最喜欢被别人看着自己淫乱的样子了啊啊${heart(1)}」`,
            ); // :5243
            await era.printAndWait(
              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,
            ); // :5244
          }
          // CFLAG:335  = 6（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 6; // :5246
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「呜啊……啊啊啊……不，不行了……真的……要不行了${heart(1)}」`,
            ); // :5250
            if (rand_n(4) === 0) {
              await era.print(`『哎嘿嘿，姐姐的娇喘声被魔王大人听到了哦！』`); // :5252
              await era.printAndWait(
                `${player_name}顶着腰，持续地侵犯着${target_name}蜜穴的最深处。`,
              ); // :5253
              await era.printAndWait(
                `沉浸在快感中的${target_name}已经再也无法忍耐，甘甜的娇喘从唇边流泻而出。`,
              ); // :5254
              await era.printAndWait(
                `「真，真的好舒服${heart(1)}……舒服得……已经没有办法思考了啊啊啊${heart(1)} 」`,
              ); // :5255
            } else if (rand_n(3) === 0) {
              await era.print(
                `『呜哇，姐姐的娇喘声音原来这么好听的${heart(1)} 真不愧是我的姐姐${heart(1)}』`,
              ); // :5257
              await era.printAndWait(
                `${player_name}舔着嘴唇，一次次顶起腰，用${weapon}侵犯着姐姐的蜜穴里的敏感点。`,
              ); // :5258
              await era.printAndWait(
                `${target_name}享受而甘甜的娇喘，则是这场姐妹乱伦狂欢的最好伴奏。`,
              ); // :5259
              await era.printAndWait(
                `「嗯啊……啊啊啊${heart(1)} 好舒服……舒服得……已经不想思考了啊啊啊${heart(1)}」`,
              ); // :5260
            } else if (rand_n(2) === 0) {
              await era.print(
                `『哎呀呀，我都还没说自己就动起腰来了，真的有那么舒服吗，母猪姐姐！』`,
              ); // :5262
              await era.printAndWait(
                `尽管在身下的是自己的亲妹妹，${target_name}还是完全无法停住腰部的动作。`,
              ); // :5263
              await era.printAndWait(
                `经过充分开发和调教的蜜穴，在一次次的交合中，感受到了极致的快感。`,
              ); // :5264
              await era.printAndWait(
                `「好舒服……${player_name}的阴茎……插在姐姐的小穴里……舒服得不行了啊啊啊${heart(1)}」`,
              ); // :5265
            } else {
              await era.print(
                `『姐姐啊！姐姐啊${heart(1)} 这个东西，可是人家为了能让姐姐舒服，才让魔王大人给我装上的哦，感觉如何呀${heart(1)} 』`,
              ); // :5267
              await era.printAndWait(
                `${target_name}似乎是被妹妹的话感动了，更积极地扭着腰，寻求着更强烈的快感。`,
              ); // :5268
              await era.printAndWait(
                `「多，多谢${player_name}了……姐姐，的确很舒服……舒服得……要上天了啊啊${heart(1)}」`,
              ); // :5269
              await era.printAndWait(
                `『哎呀呀，姐姐要当着我和魔王大人的面高潮了吗！？』`,
              ); // :5270
            }
          } else {
            await era.printAndWait(
              `「呜……呜啊啊……可不可以……不要当着魔王大人的面……啊啊啊！」`,
            ); // :5273
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            ); // :5274
            await era.print(
              `『嘿嘿，虽然嘴上这么说，但是蜜穴却夹得更紧了呢，真是变态暴露狂姐姐啊♪』`,
            ); // :5275
            await era.printAndWait(`「呜……不，不是那样的啊啊！」`); // :5276
            await era.printAndWait(
              `当着深爱的${master_name}的面，${target_name}被${player_name}从下方持续地侵犯着，反而更加兴奋了………`,
            ); // :5277
          }
          // CFLAG:335  = 5（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 5; // :5279
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          chara(target).system.私处感觉 >= 3 &&
          (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「好舒服……已经舒服得……没有办法思考了${heart(1)}」`); // :5282
          if (rand_n(4) === 0) {
            await era.print(`『哎嘿嘿，姐姐也忍不住娇喘了呢♪』`); // :5284
            await era.printAndWait(
              `${player_name}舔着嘴唇，一次次顶起腰，用${weapon}侵犯着姐姐的蜜穴里的敏感点。`,
            ); // :5285
            await era.printAndWait(
              `内心的屈辱和悲伤很快就被强烈的快感淹没，${target_name}再次发出了享受的娇喘。`,
            ); // :5286
            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`); // :5287
          } else if (rand_n(3) === 0) {
            await era.print(
              `『哎呀，原来姐姐的身体这么淫乱的，亏我还被瞒了那么久。』`,
            ); // :5289
            await era.printAndWait(
              `「不，不是那样子的……都是因为你们……的调教啊啊啊！」`,
            ); // :5290
            await era.printAndWait(
              `${target_name}爱液泛滥的蜜穴被${player_name}从下身下一次次顶到最深处，强烈的快感让争辩变成了甘甜的喘息………`,
            ); // :5291
          } else if (rand_n(2) === 0) {
            await era.print(`『呜哇……听姐姐的娇喘，听得我也兴奋起来了呢♪』`); // :5293
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            ); // :5294
            await era.printAndWait(
              `「呜……呜啊啊……太激烈了……姐姐……已经不行了啊啊！」`,
            ); // :5295
            await era.printAndWait(
              `『哈啊啊，姐姐的小穴突然夹得……这么紧……人，人家也要高潮了！姐姐，一起在魔王大人面前高潮吧！』`,
            ); // :5296
          } else {
            await era.print(`『哎嘿嘿，姐姐没有我的允许不可以高潮哦♪』`); // :5298
            await era.printAndWait(
              `${player_name}不紧不慢地说着，而身上的${target_name}为了寻求更多的快感，红着脸，不断扭动着腰身。`,
            ); // :5299
            await era.printAndWait(
              `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
            ); // :5300
            await era.printAndWait(
              `「呜……呜啊啊……已，已经不行了……让，让姐姐高潮吧！」`,
            ); // :5301
            await era.printAndWait(
              `那纠结在屈辱与快感之中的表情，勾起了${master_name}强烈的欲望……`,
            ); // :5302
          }
          // CFLAG:335  = 4（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 4; // :5304
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`『哎呀，姐姐居然肯听话自己动了，我好感动♪』`); // :5307
          await era.printAndWait(
            `${target_name}在${player_name}的命令下，骑在妹妹身上，上下动着腰。`,
          ); // :5308
          await era.printAndWait(`「为，为什么要这么折磨姐姐……呜呜呜！」`); // :5309
          await era.printAndWait(
            `${player_name}紧抱着${target_name}的腰身，用自己股间的${weapon}用力侵犯着姐姐的蜜穴。`,
          ); // :5310
          await era.printAndWait(
            `『哎，姐姐技术还是不行，接下来还是让我来吧♪』`,
          ); // :5311
          // CFLAG:335  = 3（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 3; // :5312
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.print(`『笨蛋姐姐，腰也要自己动起来啊！』`); // :5315
          await era.printAndWait(
            `「呜呜……饶，饶了姐姐吧……不，不能再往里面顶了……真的会死的啊啊！」`,
          ); // :5316
          await era.printAndWait(
            `${target_name}被身下的${player_name}侵犯着蜜穴，痛苦不堪的悲鸣着……`,
          ); // :5317
          // CFLAG:335  = 2（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 2; // :5318
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「尽情……尽情地把${target_name}的小穴……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            ); // :5324
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `「呜啊${heart(1)}…… 好……好舒服${heart(1)} 舒服得……不行了啊啊${heart(1)}」`,
              ); // :5326
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `「好，好激烈……魔王大人${heart(1)} 不过……人家……人家还想要更多啊啊啊${heart(1)} 」`,
              ); // :5328
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「好，好舒服啊啊${heart(1)} 能够这么独占魔王大人的阴茎……实在是太棒了啊啊${heart(1)}」`,
              ); // :5330
            } else {
              await era.printAndWait(
                `「哈啊……腰部的动作……完全停不下来了${heart(1)} 因为……和魔王大人做爱，实在是太棒了啊啊啊${heart(1)}」`,
              ); // :5332
            }
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `${target_name}脸上浮现出充满享受的淫媚笑容，骑在${player_name}的身上扭动着腰………`,
              ); // :5335
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `${target_name}为了寻求更强烈的快感，更激烈地上下扭着腰………`,
              ); // :5337
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `随着${player_name}一次次顶起腰、${target_name}淫浪的娇喘声随着交合快感而增强了………`,
              ); // :5339
            } else {
              await era.printAndWait(
                `${target_name}已经完全被快感和欲望所支配，上下扭动着腰的动作已经完全停不下来了………`,
              ); // :5341
            }
          } else {
            await era.printAndWait(
              `「啊啊……人家的小穴……被${player_name}的阴茎……顶到最里面了啊啊！」`,
            ); // :5344
            await era.print(
              `「顶，顶到子宫口了……比刚刚……更舒服了啊啊啊${heart(1)}」`,
            ); // :5345
            await era.printAndWait(
              `${target_name}娇喘着，享受着骑乘位交合的快感………`,
            ); // :5346
          }
          // CFLAG:335  = 6（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 6; // :5348
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :5352
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `「好，好喜欢魔王大人${heart(1)}…… 最喜欢了${heart(1)} 让我永远呆在你的身边吧${heart(1)}」`,
              ); // :5354
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `「好……好激烈${heart(1)}…… 魔王大人……实在是太厉害了啊啊啊${heart(1)}」`,
              ); // :5356
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `「好，好舒服${heart(1)} 能够……被魔王大人……这样疼爱，实在是太幸福了啊啊啊${heart(1)}」`,
              ); // :5358
            } else {
              await era.printAndWait(
                `「哈啊……腰部的动作……完全停不下来了${heart(1)} 因为……和魔王大人做爱，实在是太幸福了啊啊啊${heart(1)}」`,
              ); // :5360
            }
            if (rand_n(4) === 0) {
              await era.printAndWait(
                `${target_name}脸上浮现出幸福的笑容，骑在${player_name}的身上扭动着腰，尽情地娇喘着………`,
              ); // :5363
            } else if (rand_n(3) === 0) {
              await era.printAndWait(
                `${target_name}上下扭着腰，呼唤着${player_name}的名字，……`,
              ); // :5365
            } else if (rand_n(2) === 0) {
              await era.printAndWait(
                `随着${player_name}一次次顶起腰、${target_name}在交合的快感下不住地娇喘着……`,
              ); // :5367
            } else {
              await era.printAndWait(
                `${target_name}已经完全被快感和对你的爱所支配，上下扭动着腰的动作已经完全停不下来了………`,
              ); // :5369
            }
          } else {
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :5372
            await era.printAndWait(
              `「我，我会自己动的，魔，魔王大人……请……好好享受就行了……！」`,
            ); // :5373
            await era.printAndWait(
              `${target_name}娇喘着，享受着骑乘位交合的快感………`,
            ); // :5374
          }
          // CFLAG:335  = 5（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 5; // :5376
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          chara(target).system.私处感觉 >= 3 &&
          (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「嗯啊……啊啊啊……呜呜${heart(1)}」`); // :5379
          if (rand_n(4) === 0) {
            await era.printAndWait(
              `「呜？！不要看……不要盯着我的脸看啊啊啊！」`,
            ); // :5381
          } else if (rand_n(3) === 0) {
            await era.printAndWait(
              `「这样的姿势……太羞耻了！但……但是真的……好舒服啊啊」`,
            ); // :5383
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「不，不行了……人家真的不行了啊啊啊！」`); // :5385
          } else {
            await era.printAndWait(`「为，为什么会这么舒服啊啊啊！」`); // :5387
          }
          if (rand_n(4) === 0) {
            await era.printAndWait(
              `${target_name}脸上露出了享受的表情，骑在${player_name}的身上扭动着腰，尽情地娇喘着………`,
            ); // :5390
          } else if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}上下扭着腰，甘甜的娇喘在调教室里回荡着……`,
            ); // :5392
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}的蜜穴被一次次贯入最深处，爱液不住地渗到你的身上……`,
            ); // :5394
          } else {
            await era.printAndWait(
              `${target_name}虽然一脸的屈辱与羞耻，但是按捺不住的娇喘却暴露着内心的真正感受………`,
            ); // :5396
          }
          // CFLAG:335  = 4（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 4; // :5398
        } else if (
          era.get(`mark:${target}:2`) === 3 &&
          (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.print(`「嗯啊啊……魔王大人……下面……还要人家做什么……」`); // :5401
          await era.printAndWait(
            `「呜……呜呜……我，我明白了……我会自己动起来的！」`,
          ); // :5402
          await era.printAndWait(
            `${target_name}咬着嘴唇，带着屈服的表情上下扭动着腰……`,
          ); // :5403
          // CFLAG:335  = 3（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 3; // :5404
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呜……呜呜……这种丢人的姿势……！」`); // :5407
          await era.printAndWait(
            `${target_name}咬着嘴唇，带着屈辱的表情上下扭动着腰……`,
          ); // :5408
          // CFLAG:335  = 2（变量语义：CFLAG 族，335）
          kojo.骑乘位 = 2; // :5409
        }
      }
      return 0;
    }
  }

  // :5419-5503 IF SELECTCOM === 35（泡踊り／全身擦洗 CFLAG:336）
  if (era_flag.selectcom === 35) {
    if (kojo.全身擦洗 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『嘻嘻，和姐姐一起洗澡真高兴，想起了以前的日子呢。不过一个人在这里的时候我也有好好洗澡呢，像这样♪』`,
        ); // :5424
        await era.printAndWait(
          `「咦……咦……不，不要乱摸呀，好好的用毛巾洗澡不行吗……」`,
        ); // :5425
        await era.printAndWait(
          `『说什么呢，姐姐也要好好学呀，除了用手之外，还要用你那大胸部还有淫乱的小穴帮我和魔王大人擦洗身体${heart(1)} 就像这样哦！～～』`,
        ); // :5426
        await era.printAndWait(`「呜啊啊……不，不要乱摸呀！」`); // :5427
      } else {
        if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(`「啊啊，魔王大人的身体……好有魅力……！」`); // :5431
          await era.printAndWait(
            `伴着粘滑的肥皂水，${target_name}用自己的双手，还有胸前的巨乳来回擦拭着${player_name}的身体………`,
          ); // :5432
        } else {
          await era.printAndWait(
            `「是，是要人家帮你……擦拭身体嘛……我，我会照做的……！」`,
          ); // :5435
          await era.printAndWait(
            `伴着粘滑的肥皂水，${target_name}用自己的双手战战兢兢地擦拭着${player_name}的身体……`,
          ); // :5436
        }
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1; // :5439
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啊啊……姐姐再帮人家擦一下背啦……用你那对淫乱大胸部！』`,
          ); // :5447
          await era.printAndWait(
            `「知道啦……你平时被魔王大人调教完应该好好洗澡啊，你看，这里还有污垢留着……」`,
          ); // :5448
          await era.printAndWait(
            `『那是魔王大人精液的痕迹啦……才不是污垢呢！』`,
          ); // :5449
          await era.printAndWait(
            `不仔细去分辨哪些对话的话，${target_name}和${player_name}好像又变回了在村子里纯洁而和睦共处的样子……`,
          ); // :5450
          // CFLAG:336  = 5（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 5; // :5451
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『哎嘿嘿，姐姐平时也是这样给魔王大人洗澡的吗？』`,
          ); // :5454
          await era.printAndWait(
            `「是，是呀……这也是侍奉魔王大人的工作的一部分呢${heart(1)}」`,
          ); // :5455
          await era.printAndWait(
            `『嚯嚯，用这样的大胸部代替浴巾摩擦身体的话，即使是魔王大人也不一定忍耐得住吧……我摸我摸我摸！』`,
          ); // :5456
          await era.printAndWait(`「好好洗澡啦！不要乱摸啊${heart(1)}」`); // :5457
          // CFLAG:336  = 4（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 4; // :5458
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `『啊……被姐姐的手这样搓着背，好舒服…${heart(1)} 好像回到了村子里一样${heart(1)}』`,
          ); // :5461
          await era.printAndWait(
            `「我……我也有这样的感觉呢……唉唉？！你的手在摸哪里呢？」`,
          ); // :5462
          await era.printAndWait(
            `『嘻嘻，姐姐的大胸部，不就是用来给人摸的吗♪』`,
          ); // :5463
          // CFLAG:336  = 3（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 3; // :5464
        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「好好洗澡啦，${player_name}……手，不要乱摸姐姐的身体啦…」`,
          ); // :5467
          await era.printAndWait(`『哎嘿嘿，不是乱摸，是帮姐姐洗白白啦～♪』`); // :5468
          await era.printAndWait(`「不，不要恶作剧啦！」`); // :5469
          // CFLAG:336  = 2（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 2; // :5470
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `浴室里，${target_name}正用肥皂水冲洗着${player_name}和自己的身体，。`,
          ); // :5475
          await era.printAndWait(
            `然后伸出手从后面抱住了${player_name}，开始用丰满的双乳上下摩擦着${player_name}的背。`,
          ); // :5476
          if (rand_n(2)) {
            await era.printAndWait(
              `「啊啊啊……这样用乳头摩擦着魔王大人的身体……好舒服${heart(1)} ！」`,
            ); // :5478
          } else {
            await era.printAndWait(
              `「魔王大人的身体……真是充满魅力${heart(1)} ！恐怕再没有比魔王大人更出色的男性了吧……」`,
            ); // :5480
          }
          // CFLAG:336  = 5（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 5; // :5482
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}沐浴在肥皂水中，用双手，还有丰满的双乳仔细地擦拭着${player_name}的背部。`,
          ); // :5485
          await era.printAndWait(
            `「哈啊……人家的胸部……光是这样接触到魔王大人的肌肤……就已经……舒服得不行了${heart(1)}」`,
          ); // :5486
          await era.printAndWait(
            `${player_name}感受着${target_name}柔软的乳头在自己背上摩擦传来舒适感觉……`,
          ); // :5487
          // CFLAG:336  = 4（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 4; // :5488
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「虽，虽然不愿意承认……但是魔王大人的身体……真的好有魅力……！」`,
          ); // :5491
          await era.printAndWait(
            `在粘滑的肥皂水冲洗下，${target_name}用自己的双手，还有丰满的胸部仔细地擦拭着${player_name}的身体……`,
          ); // :5492
          // CFLAG:336  = 3（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 3; // :5493
        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「要，要我用胸部帮你……擦身！？就不能……好好用毛巾吗……呜呜」`,
          ); // :5496
          await era.printAndWait(
            `在粘滑的肥皂水冲洗下，${target_name}用自己的双手，还有丰满的胸部勉为其难地擦拭着${player_name}的身体……`,
          ); // :5497
          // CFLAG:336  = 2（变量语义：CFLAG 族，336）
          kojo.全身擦洗 = 2; // :5498
        }
      }
      return 0;
    }
  }

  // :5508-5769 IF SELECTCOM === 36（骑乘位肛交 CFLAG:337）
  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if (assi_mao) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「呜啊……啊啊……好，好舒服……${heart(1)}」`); // :5515
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}忍不住娇喘了起来。`,
          ); // :5516
          await era.print(
            `『嘿嘿，我的小鸡鸡也很舒服啊，在姐姐热热的直肠里${heart(1)}』`,
          ); // :5517
          await era.printAndWait(
            `「是，是啊！姐姐的屁股……要……要去了${heart(1)}」`,
          ); // :5518
          await era.printAndWait(
            `${target_name}扭动着腰，尽情地让妹妹的阴茎继续从下方侵犯着自己的肛门……`,
          ); // :5519
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「呜……呜啊……${player_name}为什么会……长出这种奇怪的东西……！」`,
          ); // :5522
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}红着脸呻吟着。`,
          ); // :5523
          await era.print(
            `『就是为了侵犯姐姐才让魔王大人给人家遍出来的啊！啊啊……好棒……和姐姐肛交的刚绝』`,
          ); // :5524
          await era.printAndWait(`「唔啊……好粗……不行了，姐姐要不行了啊！」`); // :5525
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹的阴茎继续从下方侵犯着自己的肛门的背德快感……`,
          ); // :5526
        } else {
          await era.printAndWait(`「不，不可能……插进来啊啊…！」`); // :5529
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}吃力地呻吟着。`,
          ); // :5530
          await era.print(`『好好动起来啊笨蛋姐姐，就像骑马那样啊！』`); // :5531
          await era.printAndWait(
            `「明，明白了……姐姐会照做的……不，不要再顶得那么深了！」`,
          ); // :5532
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹的阴茎继续从下方侵犯着自己的肛门的感觉…`,
          ); // :5533
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
          ); // :5538
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 好舒服${heart(1)} 肛交的感觉……好舒服啊啊${heart(1)}」`,
          ); // :5539
          await era.printAndWait(
            `${target_name}扭动着腰，尽情地让${player_name}的阴茎在自己的直肠里进出……`,
          ); // :5540
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处`,
          ); // :5543
          await era.printAndWait(
            `「是，是的……我会自己……动起来的啊啊啊${heart(1)}」`,
          ); // :5544
          await era.printAndWait(
            `${target_name}扭动着腰边娇喘着，享受着骑乘式肛交的快感……`,
          ); // :5545
        } else {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下方径直插入到了深处`,
          ); // :5548
          await era.printAndWait(`「呜……呜呜……好胀，好难受！」`); // :5549
          await era.printAndWait(
            `${player_name}挺起腰，持续地侵犯着${target_name}…`,
          ); // :5550
        }
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1; // :5553
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
            ); // :5562
            await era.print(
              `「嗯啊啊……啊啊……肛门被，被这么激烈地侵犯着${heart(1)}……」`,
            ); // :5563
            await era.print(
              `『啊啊……和姐姐肛交……原来是这么舒服的事情啊啊${heart(1)} ！』`,
            ); // :5564
            await era.printAndWait(
              `「来吧……尽情地……${heart(1)} 把姐姐的肛门……侵犯得一塌糊涂吧，${player_name}啊啊啊${heart(1)}」`,
            ); // :5565
            await era.printAndWait(
              `${target_name}边扭动着腰，边发出一阵阵淫浪的娇喘，完全沉浸在肛交的快感中………`,
            ); // :5566
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}咬着嘴唇，带着沉醉的表情上下扭动着身体。`,
            ); // :5568
            await era.print(
              `『哎呀呀，姐姐这幅表情，完全变成喜欢肛交的母猪了吗！』`,
            ); // :5569
            await era.printAndWait(
              `${player_name}也挺着腰配合着${target_name}的动作，不断侵犯着${target_name}的肛门。`,
            ); // :5570
            await era.printAndWait(
              `「哈……谢谢……夸奖啊啊……姐姐……就是只让${target_name}和魔王大人肛交的母猪啊啊${heart(1)}」`,
            ); // :5571
            await era.printAndWait(
              `完全沉浸在肛交快感中的${target_name}，已经完全抛却任何尊严了……`,
            ); // :5572
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感。`,
            ); // :5574
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :5575
            await era.print(
              `『哎呀呀，姐姐真的是完全堕落了呢♪ 下次一定要当着村子里的大家的面侵犯姐姐的肛门，大家一定会忍不住对着姐姐手淫的。』`,
            ); // :5576
            await era.printAndWait(
              `「啊啊……真，真是好主意${heart(1)} 魔王大人……下次……就按${player_name}说的……在村子里对${target_name}进行公开肛门调教吧${heart(1)}」`,
            ); // :5577
            await era.printAndWait(
              `当着所有认识的人的面被侵犯，${target_name}光是这么想象着，就已经感觉无比兴奋了…`,
            ); // :5578
          }
          // CFLAG:337  = 7（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 7; // :5580
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「呜……啊啊……全，全部进来了……${heart(1)}」`); // :5583
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}忍不住呻吟了起来。`,
          ); // :5584
          if (rand_n(3) === 0) {
            await era.print(`『啊啊，姐姐的直肠……好紧，好热${heart(1)}』`); // :5586
            await era.printAndWait(`「嗯啊……啊啊，屁股感觉……好奇怪！」`); // :5587
          } else if (rand_n(2) === 0) {
            await era.print(
              `『呜哇哇……把人家的鸡鸡夹得这么紧，有那么舒服吗！』`,
            ); // :5589
            await era.printAndWait(`「是，是啊……姐姐……很舒服啊啊！」`); // :5590
          } else {
            await era.print(`『嘿嘿，让我来检验一下姐姐肛门的开发程度！』`); // :5592
            await era.printAndWait(
              `「呜……呜啊！感觉……好奇怪……又好舒服……${heart(1)}」`,
            ); // :5593
          }
          await era.printAndWait(
            `${target_name}扭动着腰，感受着被妹妹侵犯肛门的快感……`,
          ); // :5595
          // CFLAG:337  = 6（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 6; // :5596
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}的肛门被${player_name}从下方径直插入到了深处。`,
            ); // :5600
            await era.print(
              `「呜呜……要，要去了，要用肛门……去了啊啊啊${heart(1)}」`,
            ); // :5601
            await era.print(
              `『哎哎，听着姐姐这么舒服的娇喘，人家也要高潮了啊${heart(1)}』`,
            ); // :5602
            await era.printAndWait(
              `「哎哎……来吧……和姐姐一起高潮吧，${player_name}${heart(1)}」`,
            ); // :5603
            await era.printAndWait(
              `${target_name}边扭动着腰，边发出一阵阵甜美的娇喘，完全沉浸在肛交的快感中………`,
            ); // :5604
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}咬着嘴唇，带着沉醉的表情上下扭动着身体`,
            ); // :5606
            await era.print(`『嘿嘿，能让姐姐舒服，我很高兴啊！』`); // :5607
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :5608
            await era.printAndWait(
              `「都，都是你把姐姐的肛门……弄得和性器一样了，你可要负责啊${heart(1)}」`,
            ); // :5609
            await era.printAndWait(
              `${target_name}的嬉笑很快又变回了舒服的娇喘………`,
            ); // :5610
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感。`,
            ); // :5612
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :5613
            await era.print(`『哇哇……姐姐的动作好棒……好舒服……继续，不要停！』`); // :5614
            await era.printAndWait(
              `「啊啊${heart(1)} 要，要坏掉了……屁股舒服得要坏掉了啊啊………」`,
            ); // :5615
            await era.printAndWait(
              `${target_name}娇喘个不停，已经完全无法自拔了……`,
            ); // :5616
          }
          // CFLAG:337  = 5（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 5; // :5618
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `感受着${player_name}的阴茎在自己肛门内出入，${target_name}红着脸呻吟着。`,
          ); // :5621
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……啊啊！插到……最里面了！」`); // :5623
            await era.print(
              `『感觉如何，姐姐？要一直侵犯到姐姐的肛门合不上为止哦♪』`,
            ); // :5624
            await era.printAndWait(
              `「不，不行啊……会，会坏掉的……魔王大人，救命呀！」`,
            ); // :5625
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「呜啊……屁股被，被撑开了！」`); // :5627
            await era.print(
              `『姐姐的肛门还得再让魔王大人好好开发一下啊，太紧了，虽然人家很舒服就是了${heart(1)}』`,
            ); // :5628
            await era.printAndWait(`「不，不要啊……那里，又不是性器……！」`); // :5629
          } else {
            await era.print(
              `『哇哇……姐姐的肛门这么紧，这么舒服……会让人上瘾的♪』`,
            ); // :5631
            await era.printAndWait(
              `「嗯啊……谢谢，夸奖……不过，还请温柔一点……」`,
            ); // :5632
          }
          await era.printAndWait(
            `${target_name}感受着被妹妹侵犯肛门的背德快感，身体更加燥热了………`,
          ); // :5634
          // CFLAG:337  = 4（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 4; // :5635
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `感受着${player_name}的阴茎在自己肛门内出入的快感，${target_name}忍不住娇喘了起来。`,
            ); // :5639
            await era.print(
              `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,
            ); // :5640
            await era.print(
              `『嘿嘿，姐姐也要自己动起来啊，会更舒服的${heart(1)}』`,
            ); // :5641
            await era.printAndWait(`「是……是吗……我，我会照做的……嗯啊啊！」`); // :5642
            await era.printAndWait(`${target_name}红着脸，主动扭起腰来……`); // :5643
          } else if (rand_n(2) === 0) {
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :5645
            await era.printAndWait(
              `骑在妹妹身上的${target_name}完全无法抗拒肛门的快感，大声娇喘了起来。`,
            ); // :5646
            await era.print(
              `『嘿嘿，能让姐姐这么舒服，人家也很高兴啊${heart(1)}』`,
            ); // :5647
            await era.printAndWait(
              `「不，不要盯着人家的脸看啦…啊啊……嗯啊啊！」`,
            ); // :5648
            await era.printAndWait(
              `${target_name}羞红了脸，腰却不自觉地继续扭动着……`,
            ); // :5649
          } else {
            await era.printAndWait(
              `肛门被${player_name}的阴茎一次次顶入最深处，${target_name}的呻吟很快变成了大声的娇喘。`,
            ); // :5651
            await era.print(
              `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
            ); // :5652
            await era.printAndWait(
              `${player_name}欣赏着姐姐的痴态，舔着嘴唇，挺着腰继续侵犯着骑在自己身上的${target_name}。`,
            ); // :5653
            await era.print(
              `『哈哈，要高潮了吧，姐姐，彻底变成一个会用肛门高潮的变态吧！』`,
            ); // :5654
            await era.printAndWait(
              `「呜，呜啊啊……太激烈了！但是……但是，要，要去了，${player_name}，姐姐要去了啊啊！！」`,
            ); // :5655
          }
          // CFLAG:337  = 3（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 3; // :5657
        } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}流着眼泪呻吟着，感受着肛门被妹妹侵犯的生理和心理上的双重痛苦`,
          ); // :5660
          if (rand_n(3) === 0) {
            await era.printAndWait(`「呜……啊啊……不，不能再进来了！」`); // :5662
            await era.print(
              `『那姐姐就快点自己动起来啊，不然我就继续往里顶了哦！』`,
            ); // :5663
            await era.printAndWait(
              `「不……不行……真的会坏掉的……屁股会坏掉的……呜呜呜！」`,
            ); // :5664
          } else if (rand_n(2) === 0) {
            await era.printAndWait(`「呜……啊啊……好痛，好痛……！」`); // :5666
            await era.print(
              `『没关系没关系，人家的肛门也是这样被魔王大人调教的！』`,
            ); // :5667
            await era.printAndWait(
              `「不，不要再往里顶了……求你了……我，我会自己动的……！」`,
            ); // :5668
          } else {
            await era.printAndWait(`「呜……啊啊……太，太粗了……！」`); // :5670
            await era.print(
              `『呜哇，姐姐的肛门这么紧，有成为名器的潜质呢${heart(1)}』`,
            ); // :5671
            await era.printAndWait(`「不要羞辱姐姐了……求你了……」`); // :5672
          }
          await era.printAndWait(
            `${target_name}的肛门被妹妹一次次往上顶入到最深处……`,
          ); // :5674
          // CFLAG:337  = 2（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 2; // :5675
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
            ); // :5681
            await era.print(
              `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,
            ); // :5682
            await era.printAndWait(
              `「肛门……被魔王大人的……阴茎${heart(1)} 塞得满满的……好舒服啊啊${heart(1)}」`,
            ); // :5683
            await era.printAndWait(
              `${target_name}淫浪的娇喘着，享受着，被身下的${player_name}一次次顶入到肛门深处的快感…`,
            ); // :5684
          } else if (rand_n(2) === 0) {
            await era.print(
              `「肛交……太棒了……真的是世界上最棒的事情了啊啊啊${heart(1)}」`,
            ); // :5686
            await era.printAndWait(
              `${target_name}发出一声声淫浪的娇喘，扭动着腰让${player_name}的阴茎一次次在自己的肛门进出。`,
            ); // :5687
            await era.printAndWait(
              `丰满的双乳在胸前上下晃动着，整个人已经完全沉沦在快感之中了。`,
            ); // :5688
            await era.printAndWait(
              `「嗯啊啊${heart(1)} 好舒服……好想……一直被魔王大人……这么侵犯肛门啊啊啊${heart(1)} 」`,
            ); // :5689
          } else {
            await era.printAndWait(
              `${target_name}咬着嘴唇，上下扭动着腰身，寻求着更强烈的肛门快感。`,
            ); // :5691
            await era.print(
              `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,
            ); // :5692
            await era.printAndWait(
              `不绝于耳的淫浪娇喘让${player_name}也变得更加兴奋了，阴茎变得更加坚挺。`,
            ); // :5693
            await era.printAndWait(
              `「啊啊啊……人家的肛门……能够让魔王大人满意${heart(1)} 好高兴啊啊啊${heart(1)}」`,
            ); // :5694
          }
          // CFLAG:337  = 7（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 7; // :5696
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}的肛门被${player_name}从下面一次次顶入到深处。`,
          ); // :5699
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「嗯啊……啊啊啊${heart(1)} 尽情地……侵犯人家的肛门吧${heart(1)}」`,
            ); // :5701
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜啊……感觉好奇怪，但是好舒服${heart(1)}」`,
            ); // :5703
          } else {
            await era.printAndWait(
              `「呜啊啊……魔王大人的阴茎，好热，好舒服${heart(1)}」`,
            ); // :5705
          }
          await era.printAndWait(
            `骑在${player_name}身上的${target_name}扭动着腰，尽情享受着肛交的快感……`,
          ); // :5707
          // CFLAG:337  = 6（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 6; // :5708
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
            ); // :5712
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样${heart(1)}」`,
            ); // :5713
            await era.printAndWait(
              `「这种被一次次撑开的感觉……实在是太舒服啊啊啊${heart(1)}」`,
            ); // :5714
            await era.printAndWait(
              `${target_name}带着被融化了一般的表情，发出一阵阵甘甜的娇喘、沉浸在肛交的快感中……`,
            ); // :5715
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `${target_name}带着陶醉的表情上下扭动着身体，渴求着更强烈的肛门快感。`,
            ); // :5717
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            ); // :5718
            await era.printAndWait(
              `「都怪魔王大人……把人家的肛门……调教得……没有快感，就活不下去了啊啊${heart(1)}」`,
            ); // :5719
            await era.printAndWait(
              `${target_name}的嬉笑很快被强烈的快感淹没，再次淫浪的娇喘起来……`,
            ); // :5720
          } else {
            await era.printAndWait(
              `${target_name}前后上下扭动着腰，寻求着更强烈的肛交快感，但${player_name}却故意放慢了动作。`,
            ); // :5722
            await era.print(
              `「嗯啊啊……啊啊……肛门……舒服得……像是要坏掉了一样啊啊${heart(1)}」`,
            ); // :5723
            await era.printAndWait(
              `「魔，魔王大人……求，求你了……让，让人家的肛门……高潮吧${heart(1)}」`,
            ); // :5724
            await era.printAndWait(`${target_name}红着脸，大声乞求着……`); // :5725
          }
          // CFLAG:337  = 5（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 5; // :5727
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}的肛门被身下的${player_name}一次次顶入到深处。`,
          ); // :5730
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「好，好的……魔王大人……我，我会自己动起来的${heart(1)}」`,
            ); // :5732
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「啊啊……这个姿势……好羞耻……不过，好舒服${heart(1)}」`,
            ); // :5734
          } else {
            await era.printAndWait(
              `「魔王大人，请……尽情侵犯${target_name}的肛门吧${heart(1)} ！」`,
            ); // :5736
          }
          await era.printAndWait(
            `${target_name}边扭着腰，边发出甜美的，放佛要融化了一般的喘息……`,
          ); // :5738
          // CFLAG:337  = 4（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 4; // :5739
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `${target_name}被充分开发的肛门，将${player_name}整根阴茎吞了进去。`,
          ); // :5742
          await era.printAndWait(
            `「呜……呜呜……直肠壁……被这么摩擦着……感觉太舒服了啊啊啊${heart(1)}」`,
          ); // :5743
          if (rand_n(3) === 0) {
            await era.printAndWait(
              `「为，为什么这么舒服……已经，停不下来了啊啊啊……」`,
            ); // :5745
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜呜……才，才不是因为……喜欢肛交……才动起来的……嗯啊啊」`,
            ); // :5747
          } else {
            await era.printAndWait(
              `「啊啊……再这样下去……肛门就会……变成性器了啊啊」`,
            ); // :5749
          }
          await era.printAndWait(
            `${target_name}在肛门快感的驱使下，红着脸又扭动起腰来……`,
          ); // :5751
          // CFLAG:337  = 3（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 3; // :5752
        } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}流着眼泪呻吟着，肛门被强行撑开，顶了进去`,
          ); // :5755
          if (rand_n(3) === 0) {
            await era.printAndWait(`「好痛……好难受……呜呜！」`); // :5757
          } else if (rand_n(2) === 0) {
            await era.printAndWait(
              `「呜呜……不，不要再顶进来了……我，我会自己动的……！」`,
            ); // :5759
          } else {
            await era.printAndWait(
              `「要，要坏掉了……饶了我吧……屁股真的会坏掉的！」`,
            ); // :5761
          }
          await era.printAndWait(
            `${player_name}挺起腰，持续侵犯着骑在自己身上的${target_name}…`,
          ); // :5763
          // CFLAG:337  = 2（变量语义：CFLAG 族，337）
          kojo.骑乘位肛交 = 2; // :5764
        }
      }
      return 0;
    }
  }

  // :5774-5848 IF SELECTCOM === 37（肛门侍奉 CFLAG:338）
  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          `『哎啊啊…姐姐居然在舔我的肛门！这感觉真是太棒了，整个人都兴奋起来了呢！』`,
        ); // :5779
        await era.printAndWait(`「呜呜……饶，饶了姐姐吧……求你了……呜唔呣…」`); // :5780
        await era.printAndWait(
          `${target_name}泪流满面，却无可奈何继续用舌头舔舐着${player_name}的肛门………`,
        ); // :5781
      } else {
        if (chara(target).system.侍奉精神 >= 3) {
          await era.printAndWait(
            `「唔呣呣……呣呣……这都是，都是为了……救出妹妹才这么做的……所以，所以……呣呣呣」`,
          ); // :5785
          await era.printAndWait(
            `${target_name}带着麻木的表情，边喃喃自语，边舔舐着${player_name}的肛门。`,
          ); // :5786
        } else {
          await era.printAndWait(
            `「唔呣呣……好脏……但是，但是……这都是，都是为了……救出妹妹才这么做的……！」`,
          ); // :5789
          await era.printAndWait(
            `${target_name}用舌头费力而迟钝地舔着${player_name}的肛门、被感到不耐烦的${player_name}按住头，强行和肛门接吻了………`,
          ); // :5790
        }
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1; // :5793
      return 0;
    } else {
      if (assi_mao) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣…唔呣……${player_name}的肛门……姐姐会帮你舔得干干净净的${heart(1)}」`,
          ); // :5801
          await era.printAndWait(
            `『姐姐的舌头真灵巧啊，那么喜欢舔妹妹的肛门吗？』`,
          ); // :5802
          await era.printAndWait(
            `「是啊……最喜欢了${heart(1)} 会一直舔的${heart(1)}」`,
          ); // :5803
          // CFLAG:338  = 5（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 5; // :5804
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「唔呣…唔呣……${player_name}的肛门……姐姐会帮你舔得干干净净的…${heart(1)}」`,
          ); // :5807
          await era.printAndWait(
            `『哎嘿嘿，姐姐舔肛门已经舔得这么熟练了啊，那么喜欢妹妹的屁股吗？』`,
          ); // :5808
          await era.printAndWait(
            `「都…都是为了你……才学会这种害羞的事情的啦………${heart(1)}」`,
          ); // :5809
          // CFLAG:338  = 4（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 4; // :5810
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「唔呣……唔呣……这，这种事……唔呣！」`); // :5813
          await era.printAndWait(
            `『哎呀，姐姐现在舔肛舔得很熟练了呢，是不是感觉兴奋起来了！』`,
          ); // :5814
          await era.printAndWait(`「…这种夸奖……一点都不觉得高兴啊！」`); // :5815
          // CFLAG:338  = 3（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 3; // :5816
        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `「唔呣……唔呣……饶了姐姐吧，求求你了，${player_name}………」`,
          ); // :5819
          await era.printAndWait(
            `『在胡说什么呢，明明舔妹妹的屁股舔得都兴奋起来了啊，别以为我没发现！？姐姐就要堕落啦啦啦』`,
          ); // :5820
          // CFLAG:338  = 2（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 2; // :5821
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣${heart(1)} ${target_name}的舌头这样舔感觉舒服吗，魔王大人${heart(1)} 咕呣……唔呣……除了肛门之外……还想舔魔王大人的其他地方呢${heart(1)}」`,
          ); // :5826
          await era.printAndWait(
            `${target_name}就着自己的口水，仔细地舔舐着${player_name}的肛门，每一处皱褶都舔得干干净净……`,
          ); // :5827
          // CFLAG:338  = 5（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 5; // :5828
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣……为魔王大人……进行舔肛侍奉……是${target_name}的荣幸${heart(1)}」`,
          ); // :5831
          await era.printAndWait(
            `${target_name}用舌尖探入到${player_name}的肛门里，仔细地舔舐着………`,
          ); // :5832
          // CFLAG:338  = 4（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 4; // :5833
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「咕呣……咕呣……舔这种地方……是对我的惩罚吗……咕呣…」`,
          ); // :5836
          await era.printAndWait(
            `${target_name}用舌头继续舔舐着${player_name}的肛门……`,
          ); // :5837
          // CFLAG:338  = 3（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 3; // :5838
        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「是…是的……我会好好舔的……咕呣……咕呣……」`); // :5841
          await era.printAndWait(
            `${target_name}虽然泪流满面，但仍然明智地舔舐着${player_name}的肛门……`,
          ); // :5842
          // CFLAG:338  = 2（变量语义：CFLAG 族，338）
          kojo.肛门侍奉 = 2; // :5843
        }
      }
      return 0;
    }
  }

  // :5853-5921 IF SELECTCOM == 40（打屁股 CFLAG:341）
  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      // :5855

      if (assi_mao) {
        // :5857
        await era.printAndWait(
          `『姐姐以前还打过我的屁股，现在轮到妹妹十倍奉还了哈哈哈哈！』`,
        ); // :5858
        await era.printAndWait(
          `「住，住手啊——！好痛，好痛！饶了姐姐吧求你了！」`,
        ); // :5859
        await era.printAndWait(
          `${target_name}被妹妹狠狠打着屁股，屈辱得泪流满面……`,
        ); // :5860
      } else {
        // :5861
        await era.printAndWait(`「住，住手啊！好痛……屁股好痛啊啊！」`); // :5862
        await era.printAndWait(
          `${target_name}被${player_name}被妹妹狠狠打着屁股，痛得眼泪都出来了……`,
        ); // :5863
      } // :5864
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :5865
      kojo.打屁股 = 1; // :5865
      return 0; // :5866
    } else {
      // :5868

      if (assi_mao) {
        // :5870

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :5872
          await era.printAndWait(
            `「嗯啊……啊啊！狠狠得……打姐姐的屁股吧……打到通红为止${heart(1)}」`,
          ); // :5873
          await era.printAndWait(
            `『这么喜欢被妹妹打屁股，哼，这根本已经不是原来的姐姐了，只是一只母猪而已呀！看招！啪！啪！』`,
          ); // :5874
          await era.printAndWait(
            `「啊啊……哎啊……就是这样……姐姐……就是一只母猪性奴啊啊${heart(1)}」`,
          ); // :5875
          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :5876
          kojo.打屁股 = 5; // :5876
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :5878
          await era.printAndWait(
            `「呜……呜啊……不可以……再打了……啊啊${heart(1)}」`,
          ); // :5879
          await era.printAndWait(
            `『哼，虽然嘴上这么说，但是屁股却一晃一晃的，分明是没被打够嘛？』`,
          ); // :5880
          await era.printAndWait(`「不，不是的，是因为被打了才会……嗯啊啊……」`); // :5881
          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :5882
          kojo.打屁股 = 4; // :5882
        } else if (
          chara(target).system.苦痛刻印 === 3 &&
          chara(target).system.屈服刻印 === 3 &&
          (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :5884
          await era.printAndWait(
            `『嘿嘿，姐姐已经这么老实了？屁股被打得有感觉了吗？』`,
          ); // :5885
          await era.printAndWait(`「饶，饶了姐姐吧……求你了！」`); // :5886
          await era.printAndWait(
            `${target_name}在痛苦和恐惧的支配下，对${player_name}完全屈服了。`,
          ); // :5887
          // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :5888
          kojo.打屁股 = 3; // :5888
        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
          // :5890
          await era.printAndWait(`『不听话的话还要打哦♪』`); // :5891
          await era.printAndWait(`「快停下啊……我是你姐姐啊……啊啊啊……好痛！」`); // :5892
          await era.printAndWait(
            `${target_name}被妹妹狠狠打着屁股，流下了屈辱的泪水……`,
          ); // :5893
          // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :5894
          kojo.打屁股 = 2; // :5894
        } // :5895
      } else {
        // :5896

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :5898
          await era.printAndWait(
            `「嗯啊……啊啊……被这样打着……更加有感觉了啊啊${heart(1)} 狠狠地惩罚${target_name}下贱的臀部吧${heart(1)}」`,
          ); // :5899
          await era.printAndWait(
            `${target_name}被${player_name}狠狠拍打着屁股，却发出了享受的娇喘……`,
          ); // :5900
          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :5901
          kojo.打屁股 = 5; // :5901
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :5903
          await era.printAndWait(
            `「呜啊……请，请继续打把！被${player_name}惩罚……是奴隶的本分……${heart(1)}」`,
          ); // :5904
          await era.printAndWait(
            `${target_name}红着脸边呻吟着边被${player_name}打着屁股……`,
          ); // :5905
          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :5906
          kojo.打屁股 = 4; // :5906
        } else if (
          chara(target).system.苦痛刻印 === 3 &&
          chara(target).system.屈服刻印 === 3 &&
          (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :5908
          await era.printAndWait(
            `「呜啊啊……好痛，好痛啊……饶了我吧……饶了我吧……我会好好听话的。」`,
          ); // :5909
          await era.printAndWait(
            `${target_name}在痛苦和恐惧的支配下，对${player_name}完全屈服了。`,
          ); // :5910
          // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :5911
          kojo.打屁股 = 3; // :5911
        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
          // :5913
          await era.printAndWait(`「啊啊啊！好痛……好痛……住手啊啊！！」`); // :5914
          await era.printAndWait(
            `${target_name}的臀部被${player_name}拍打得通红，发出了痛苦不堪的悲鸣……`,
          ); // :5915
          // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :5916
          kojo.打屁股 = 2; // :5916
        } // :5917
      } // :5918
      return 0; // :5919
    } // :5920
  } // :5921

  // :5926-6062 IF SELECTCOM == 41（鞭 CFLAG:342）
  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      // :5928

      if (assi_mao) {
        // :5930
        await era.printAndWait(
          `『哈哈哈哈，以后姐姐不听话，就要用这个鞭子狠狠抽打！』`,
        ); // :5931
        await era.printAndWait(`「呜啊啊……住，住手啊啊！」`); // :5932
        await era.printAndWait(
          `鞭子抽击的声音中还夹杂着${player_name}歇斯底里的笑声和${target_name}痛苦的悲鸣……`,
        ); // :5933
      } else {
        // :5934

        if (era.get(`talent:${target}:76`) === 1) {
          // :5936
          await era.printAndWait(`「呜……呜啊啊……好痛啊啊……！」`); // :5937
          await era.printAndWait(
            `${target_name}在鞭子抽打下大声尖叫着，如同悦耳的乐声一样传入${player_name}的耳朵……`,
          ); // :5938
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :5940
          await era.printAndWait(`「我，我做错了什么吗——啊啊啊！！！」`); // :5941
          await era.printAndWait(
            `${player_name}丝毫不敢反抗，忍受着${target_name}挥下的鞭子，满足着${player_name}的嗜虐心……`,
          ); // :5942
        } else {
          // :5944
          await era.printAndWait(`「呜啊啊……住，住手啊啊啊！」`); // :5945
          await era.printAndWait(`${target_name}在鞭子下痛苦地惨叫着……`); // :5946
        } // :5947
      } // :5948
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :5949
      kojo.鞭 = 1; // :5949
      return 0; // :5950
    } else {
      // :5952

      if (assi_mao) {
        // :5954

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :5956
          await era.printAndWait(`「呜，呜啊，请再抽打我吧${heart(1)}」`); // :5957
          await era.printAndWait(
            `『被鞭子抽打得发情了吗？真是个变态呢！欠打！欠打！』`,
          ); // :5958
          await era.printAndWait(`「呜呜……啊啊啊……嗯啊啊！」`); // :5959
          await era.printAndWait(
            `${target_name}完全沉浸在妹妹施予的痛苦带来的扭曲的受虐快感中……`,
          ); // :5960
          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :5961
          kojo.鞭 = 9; // :5961
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :5963
          await era.printAndWait(`「呜……呜啊啊……嗯啊啊！」`); // :5964
          await era.printAndWait(
            `『哎哟，明明在被鞭笞，怎么会发出娇喘来呢姐姐？』`,
          ); // :5965
          await era.printAndWait(`「才……才不是娇喘呢！」`); // :5966
          await era.printAndWait(
            `『哈，明明听上去就是很舒服的样子嘛，变态，大变态！』`,
          ); // :5967
          await era.printAndWait(
            `${player_name}更加兴奋地挥着鞭子狠狠抽打着${target_name}……`,
          ); // :5968
          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :5969
          kojo.鞭 = 8; // :5969
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :5971
          await era.printAndWait(
            `「住，住手啊${player_name}！为，为什么要用鞭子打我！」`,
          ); // :5972
          await era.printAndWait(
            `『姐姐明明只是个便器母猪，居然总能得到魔王大人的宠爱，真是让人不能忍，所以要狠狠地鞭笞你！』`,
          ); // :5973
          await era.printAndWait(`「呜啊啊……魔王大人……救我……啊啊啊！」`); // :5974
          await era.printAndWait(
            `而你只是微笑着，欣赏着${player_name}鞭笞着${target_name}的样子……`,
          ); // :5975
          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :5976
          kojo.鞭 = 7; // :5976
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :5978
          await era.printAndWait(
            `「呜……呜啊啊……请，请尽情鞭打姐姐吧…${heart(1)}」`,
          ); // :5979
          await era.printAndWait(
            `『哎哎，没搞错吧姐姐，我是在惩罚你，不是在侍奉你啊！真是个大变态呢！』`,
          ); // :5980
          await era.printAndWait(
            `「是，是的……我是大变态，${player_name}大人${heart(1)}」`,
          ); // :5981
          await era.printAndWait(
            `${player_name}带着吃惊的表情，更用力地抽打着自己的姐姐………`,
          ); // :5982
          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :5983
          kojo.鞭 = 6; // :5983
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :5985
          await era.printAndWait(
            `『亲爱的姐姐，为什么被我打了还会露出高兴的表情呐？』`,
          ); // :5986
          await era.printAndWait(`「才……才没有……高兴的表情啊……」`); // :5987
          await era.printAndWait(`『还说谎！再打多10鞭！』`); // :5988
          await era.printAndWait(
            `${player_name}带着嗜虐的笑容，朝${target_name}再次挥起鞭子……`,
          ); // :5989
          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :5990
          kojo.鞭 = 5; // :5990
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :5992
          await era.printAndWait(
            `『姐姐居然也得到了魔王大人的宠爱，不可饶恕！要好好惩罚你♪』`,
          ); // :5993
          await era.printAndWait(`「在，在说什么啊……好痛！！好痛啊啊！！」`); // :5994
          await era.printAndWait(
            `『痛？被鞭子打当然会痛了，不然怎么叫惩罚！』`,
          ); // :5995
          await era.printAndWait(`${player_name}更加用力地挥动着鞭子……`); // :5996
          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :5997
          kojo.鞭 = 4; // :5997
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :5999
          await era.printAndWait(`『愿意好好听话了吗，母猪姐姐！？』`); // :6000
          await era.printAndWait(`「呜，呜呜……住手啊！」`); // :6001
          await era.printAndWait(
            `${player_name}太过于沉迷挥动鞭子的感觉，没有听到${target_name}的哀叫中时不时带着享受的娇喘……`,
          ); // :6002
          // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :6003
          kojo.鞭 = 3; // :6003
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          // :6005
          await era.printAndWait(`『哈哈哈，姐姐变成我的奴隶吧！』`); // :6006
          await era.printAndWait(`「呜啊啊啊！好痛！住手啊啊！」`); // :6007
          await era.printAndWait(
            `鞭子抽击的声音中还夹杂着${player_name}歇斯底里的笑声和${target_name}痛苦的悲鸣……`,
          ); // :6008
          // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :6009
          kojo.鞭 = 2; // :6009
        } // :6010
      } else {
        // :6011

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :6013
          await era.printAndWait(`「打我，再用力打我…嗯啊啊${heart(1)}」`); // :6014
          await era.printAndWait(
            `${target_name}的眼睛里闪烁着强烈的情欲，已经完全变成母猪受虐狂了。`,
          ); // :6015
          await era.printAndWait(
            `随着${player_name}的鞭子打出新的伤痕，在${target_name}却不住地娇喘着。`,
          ); // :6016
          await era.printAndWait(
            `「嗯啊……啊啊啊${heart(1)} 尽，尽情地打我吧${heart(1)} 呜啊啊啊${heart(1)}」`,
          ); // :6017
          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :6018
          kojo.鞭 = 9; // :6018
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :6020
          await era.printAndWait(
            `「呜啊啊！被，被${player_name}鞭打的感觉……原来这么好！」`,
          ); // :6021
          await era.printAndWait(
            `${target_name}每次被鞭子抽打，都会发出娇喘。`,
          ); // :6022
          await era.printAndWait(
            `「哈啊……啊啊啊${heart(1)} 再继续打我${heart(1)}」`,
          ); // :6023
          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :6024
          kojo.鞭 = 8; // :6024
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6026
          await era.printAndWait(
            `「呜啊啊……好痛！好痛！不，不要做这种事情啦！」`,
          ); // :6027
          await era.printAndWait(
            `${target_name}在鞭子抽打下发出了惨叫，${player_name}却乐在其中地欣赏着……`,
          ); // :6028
          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :6029
          kojo.鞭 = 7; // :6029
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6031
          await era.printAndWait(
            `「呜啊啊……啊啊…${heart(1)} 还，还想要继续被魔王大人鞭打${heart(1)} 呜啊啊！」`,
          ); // :6032
          await era.printAndWait(
            `${target_name}在${player_name}的鞭笞下不住地娇喘着，股间完全湿透了。`,
          ); // :6033
          await era.printAndWait(
            `对${target_name}的受虐调教已经彻底完成，${player_name}正在被卑微屈膝地乞求着更多的鞭笞。`,
          ); // :6034
          await era.printAndWait(
            `「呜哇……啊啊啊${heart(1)} 好痛……但是好舒服啊啊${heart(1)}」`,
          ); // :6035
          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :6036
          kojo.鞭 = 6; // :6036
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6038
          await era.printAndWait(`「呜……呜啊……啊啊啊，快……停下……已经……」`); // :6039
          await era.printAndWait(
            `${target_name}在${player_name}鞭笞下摩擦着双腿，发出了享受的娇喘。`,
          ); // :6040
          await era.printAndWait(`「哈……哈啊……不，不要这样对人家了啊啊……」`); // :6041
          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :6042
          kojo.鞭 = 5; // :6042
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6044
          await era.printAndWait(
            `「好痛！求，求你了……停手，停手啊啊啊！让${target_name}做什么其他事情都可以！」`,
          ); // :6045
          await era.printAndWait(
            `${player_name}毫不留情地继续对${target_name}的身体挥着鞭子，满足着自己的施虐心………`,
          ); // :6046
          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :6047
          kojo.鞭 = 4; // :6047
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6049
          await era.printAndWait(`「呜……呜啊……啊啊啊！」`); // :6050
          await era.printAndWait(
            `被${player_name}鞭笞着，${target_name}却在痛苦的喊叫中不时地发出了享受的娇喘`,
          ); // :6051
          // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :6052
          kojo.鞭 = 3; // :6052
        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
          // :6054
          await era.printAndWait(`「啊啊……饶了我吧……呜啊啊啊！」`); // :6055
          await era.printAndWait(
            `${player_name}的鞭笞下，${target_name}痛苦地悲鸣着……`,
          ); // :6056
          // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :6057
          kojo.鞭 = 2; // :6057
        } // :6058
      } // :6059
      return 0; // :6060
    } // :6061
  } // :6062

  // :6067-6188 IF SELECTCOM == 42（针 CFLAG:343）
  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      // :6069

      if (assi_mao) {
        // :6071
        await era.printAndWait(
          `『嘿嘿嘿，接下来就是惩罚时间了、不过已经事先消毒过了，所以姐姐可以放心♪』`,
        ); // :6072
        await era.printAndWait(`「不，不要……会，会死的……真的会的啊啊啊啊！」`); // :6073
        await era.printAndWait(
          `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
        ); // :6074
      } else {
        // :6075

        if (era.get(`talent:${target}:76`) === 1) {
          // :6077
          await era.printAndWait(
            `「呜……呜啊……不，不要啊……人家一点都不喜欢……这种玩法啊啊！」`,
          ); // :6078
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          ); // :6079
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6081
          await era.printAndWait(
            `「不，不要啊……这种调教……也太可怕了呜啊啊！」`,
          ); // :6082
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          ); // :6083
        } else {
          // :6085
          await era.printAndWait(
            `「骗……骗人……这么多根针……扎进去……会死的……啊啊啊！」`,
          ); // :6086
          await era.printAndWait(
            `${target_name}娇嫩的肌肤被细针刺破，忍不住惨叫了起来……`,
          ); // :6087
        } // :6088
      } // :6089
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :6090
      kojo.针 = 1; // :6090
      return 0; // :6091
    } else {
      // :6093

      if (assi_mao) {
        // :6095

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :6097
          await era.printAndWait(
            `『哎呀呀，被针这样扎着胸部，还叫的这么淫荡，姐姐真是变态受虐狂呢♪』`,
          ); // :6098
          await era.printAndWait(
            `「是……是啊……这样被刺着……虽然痛……但是也……好舒服啊啊啊${heart(1)}」`,
          ); // :6099
          await era.printAndWait(
            `已经完全沦为受虐狂的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,
          ); // :6100
          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :6101
          kojo.针 = 9; // :6101
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :6103
          await era.printAndWait(
            `『啧啧，姐姐的大胸部这样被针刺，居然还会兴奋起来？』`,
          ); // :6104
          await era.printAndWait(`「好……好像……就是这样呢！？」`); // :6105
          await era.printAndWait(
            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,
          ); // :6106
          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :6107
          kojo.针 = 8; // :6107
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.针 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6109
          await era.printAndWait(`『姐姐准备接受惩罚吧♪』`); // :6110
          await era.printAndWait(`「呜……好痛！好痛！不要啊啊！」`); // :6111
          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :6112
          kojo.针 = 7; // :6112
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6114
          await era.printAndWait(
            `『哎呀呀，明明是在受罚，姐姐居然还叫的这么舒服，已经彻底变成母猪受虐狂了呢♪』`,
          ); // :6115
          await era.printAndWait(
            `「呜……呜啊……已，已经舒服得……不行了啊啊${heart(1)}」`,
          ); // :6116
          await era.printAndWait(
            `受虐癖在心中完全绽开的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,
          ); // :6117
          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :6118
          kojo.针 = 6; // :6118
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6120
          await era.printAndWait(
            `『啧啧，姐姐的大胸部这样被针刺，居然还兴奋得起来？』`,
          ); // :6121
          await era.printAndWait(`「才……才没有感觉兴奋……很痛啊啊！！！」`); // :6122
          await era.printAndWait(
            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,
          ); // :6123
          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :6124
          kojo.针 = 5; // :6124
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.针 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6126
          await era.printAndWait(`『姐姐准备接受惩罚吧♪』`); // :6127
          await era.printAndWait(`「不，不要，好痛啊啊！好痛！！」`); // :6128
          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :6129
          kojo.针 = 4; // :6129
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6131
          await era.printAndWait(`「呜啊……好，好痛……不，不要再刺了啊！」`); // :6132
          await era.printAndWait(
            `『哼，口头上这么说着，但是乳头却兴奋得挺起来了呢，真是淫乱！』`,
          ); // :6133
          // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :6134
          kojo.针 = 3; // :6134
        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
          // :6136
          await era.printAndWait(`『姐姐淫乱的大胸部，接受惩罚吧♪』`); // :6137
          await era.printAndWait(`「住，住手啊啊！好痛！」`); // :6138
          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :6139
          kojo.针 = 2; // :6139
        } // :6140
      } else {
        // :6141

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :6143
          await era.printAndWait(
            `「呜……呜啊啊${heart(1)} 好……好痛……但，但是……这种感觉……好棒啊啊${heart(1)}」`,
          ); // :6144
          await era.printAndWait(
            `${player_name}用针肆意地扎着${target_name}丰满的双峰和挺立的乳头，直到针口渗出一颗颗血珠。`,
          ); // :6145
          await era.printAndWait(
            `然而受虐狂的本性驱使下，${target_name}痛苦的呻吟逐渐被享受的娇喘取代……`,
          ); // :6146
          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :6147
          kojo.针 = 9; // :6147
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :6149
          await era.printAndWait(
            `「啊啊啊！好痛……好痛！但，但是……也好……好舒服……呜啊啊！」`,
          ); // :6150
          await era.printAndWait(
            `${target_name}被针毫不留情地扎着胸部和下体，但是已经养成受虐癖的身体却愈发的兴奋起来……`,
          ); // :6151
          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :6152
          kojo.针 = 8; // :6152
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.针 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6154
          await era.printAndWait(
            `「呜……呜啊啊……好痛！这样的……调教……人家不想要啊啊！！」`,
          ); // :6155
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕着`,
          ); // :6156
          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :6157
          kojo.针 = 7; // :6157
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.针 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6159
          await era.printAndWait(
            `「呜……呜啊……魔，魔王大人${heart(1)} 请，请尽情的虐待${target_name}吧${heart(1)}」`,
          ); // :6160
          await era.printAndWait(
            `${player_name}用针肆意地扎着${target_name}丰满的双峰、挺立的乳头和阴蒂，直到针口渗出一颗颗血珠。`,
          ); // :6161
          await era.printAndWait(
            `已经完全沦为受虐狂的${target_name}却从痛苦中感受到了无上的快感和心理满足……`,
          ); // :6162
          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :6163
          kojo.针 = 6; // :6163
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6165
          await era.printAndWait(
            `「呜……呜呜……好痛啊，魔王大人……但，但是人家还忍得住……啊啊！」`,
          ); // :6166
          await era.printAndWait(
            `${target_name}在针刺下悲鸣，颤抖着，但是受虐癖的本性也将这痛苦转化成了异样的快感，渗血的乳头兴奋地坚挺着，下体也湿润了…`,
          ); // :6167
          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :6168
          kojo.针 = 5; // :6168
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.针 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6170
          await era.printAndWait(
            `「痛……好痛啊……求求你，魔王大人……饶了我吧！」`,
          ); // :6171
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕着。`,
          ); // :6172
          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :6173
          kojo.针 = 4; // :6173
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.针 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6175
          await era.printAndWait(`「呜……呜啊啊……好痛，但……但是……呜呜」`); // :6176
          await era.printAndWait(
            `${target_name}在针刺下痛苦地悲鸣着，然而受虐癖的本质却让她在痛苦的同时感受到了异样的兴奋和满足，渗血的乳头反而挺立了起来，下体也湿润了…`,
          ); // :6177
          // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :6178
          kojo.针 = 3; // :6178
        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
          // :6180
          await era.printAndWait(
            `「呜啊啊！饶……饶命啊……魔王大人……这样，这样真的会死掉的！！」`,
          ); // :6181
          await era.printAndWait(
            `${target_name}娇嫩的肌肤在针刺下渗出一颗颗血珠，痛哭流涕地惨叫着。`,
          ); // :6182
          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :6183
          kojo.针 = 2; // :6183
        } // :6184
      } // :6185
      return 0; // :6186
    } // :6187
  } // :6188

  // :6194-6262 SELECTCOM 43（眼罩 CFLAG:344 / CFLAG:380）
  if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) !== 0) {
    if (kojo.眼罩 === 0) {
      // :6196

      if (era.get(`talent:${target}:76`) === 1) {
        // :6198
        await era.printAndWait(
          `「啊啊……什么都看不见……身体反而更兴奋了${heart(1)}」`,
        ); // :6199
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6201
        await era.printAndWait(`「不，不要这样欺负人家啦………」`); // :6202
      } else {
        // :6204
        await era.printAndWait(`「这，这是要做什么？！」`); // :6205
      } // :6206
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :6207
      kojo.眼罩 = 1; // :6207
      return 0; // :6208
    } else {
      // :6210

      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :6212
        await era.printAndWait(
          `「呜啊……${player_name}想，想要对人家做什么呢……只能靠想象……反而更兴奋起来了${heart(1)}」`,
        ); // :6213
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :6214
        kojo.眼罩 = 9; // :6214
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :6216
        await era.printAndWait(
          `「啊啊……什么都看不见……更，更想被魔王大人调教了${heart(1)}」`,
        ); // :6217
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :6218
        kojo.眼罩 = 8; // :6218
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6220
        await era.printAndWait(`「咦咦……魔王大人是想出了什么新玩法吗？」`); // :6221
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :6222
        kojo.眼罩 = 7; // :6222
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6224
        await era.printAndWait(
          `「啊啊……什么都看不见……脑子里一片混乱……但，但是……好兴奋啊啊${heart(1)}」`,
        ); // :6225
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :6226
        kojo.眼罩 = 6; // :6226
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6228
        await era.printAndWait(`「哈，哈啊……心扑通扑通的，跳得好快……♪」`); // :6229
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :6230
        kojo.眼罩 = 5; // :6230
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6232
        await era.printAndWait(
          `「什，什么都看不见……有点害怕……你在哪里……魔王大人？」`,
        ); // :6233
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :6234
        kojo.眼罩 = 4; // :6234
      } else if (
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6236
        await era.printAndWait(
          `「人，人家才……才没有兴奋……但，但是……你在哪里，魔王大人……」`,
        ); // :6237
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :6238
        kojo.眼罩 = 3; // :6238
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :6240
        await era.printAndWait(`「才，才不会害怕呢……」`); // :6241
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :6242
        kojo.眼罩 = 2; // :6242
      } // :6243
      return 0; // :6244
    } // :6245
  } else if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) === 0) {
    // :6247

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6249
      await era.printAndWait(
        `「啊啊真是的……让人家……多沉浸在想象的世界里一会儿嘛……」`,
      ); // :6250
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :6251
      kojo.眼罩着脱 = 3; // :6251
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6253
      await era.printAndWait(`「终于又能看见${player_name}的面貌了……」`); // :6254
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :6255
      kojo.眼罩着脱 = 2; // :6255
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      // :6257
      await era.printAndWait(`「呼……呼…」`); // :6258
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :6259
      kojo.眼罩着脱 = 1; // :6259
    } // :6260
    return 0; // :6261
  } // :6262

  // :6268-6404 SELECTCOM 44（绳 CFLAG:345 / CFLAG:385）
  if (era_flag.selectcom === 44 && era0(`tequip:${target}:44`) !== 0) {
    if (kojo.绳子 === 0) {
      // :6270

      if (assi_mao) {
        // :6272
        await era.printAndWait(
          `『姐姐这样的身材绑起来才好看，这淫乱的胸部，被绳子一勒看上去更大了呢♪』`,
        ); // :6273
        await era.printAndWait(`「勒……勒得太紧了……稍微放松一点不行吗……」`); // :6274
        await era.printAndWait(`『想得美，这可不是过家家哦姐姐』`); // :6275
      } else {
        // :6276

        if (era.get(`talent:${target}:76`) === 1) {
          // :6278
          await era.printAndWait(
            `「把人家捆绑起来，是想做什么呢魔王大人${heart(1)}」`,
          ); // :6279
          await era.printAndWait(
            `${target_name}舔着嘴唇，配合地让${player_name}将自己的身体束缚起来……`,
          ); // :6280
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6282
          await era.printAndWait(
            `「魔，魔王大人……请不要绑得那么紧……可以吗，人家……会好好配合的！」`,
          ); // :6283
          await era.printAndWait(
            `被${player_name}用绳子粗暴地捆住了手脚和身体，${target_name}发出了吃痛的呻吟……`,
          ); // :6284
        } else {
          // :6286
          await era.printAndWait(
            `「绑，绑成这个样子……有什么意义！好，好痛啊！」`,
          ); // :6287
          await era.printAndWait(
            `${target_name}痛苦的呻吟被完全无视了，绳子一圈圈地将她牢牢捆成了魔王想要的造型……`,
          ); // :6288
        } // :6289
      } // :6290
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :6291
      kojo.绳子 = 1; // :6291
      return 0; // :6292
    } else {
      // :6294

      if (assi_mao) {
        // :6296

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :6298
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6299
          await era.printAndWait(
            `「没，没有啦……哪里有兴奋啦${heart(1)} 嗯啊啊」`,
          ); // :6300
          await era.printAndWait(
            `『什么，原来已经发情了呢，被绳子一摩擦下面就这么湿了！居然连我都骗过去了，真是变态受虐狂姐姐！』`,
          ); // :6301
          await era.printAndWait(
            `${player_name}哼笑着，继续用绳子将${target_name}的四肢反绑起来，吊在调教室中间……`,
          ); // :6302
          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :6303
          kojo.绳子 = 9; // :6303
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :6305
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6306
          await era.printAndWait(`「感觉什么的……才没有呢……哈啊${heart(1)}」`); // :6307
          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :6308
          kojo.绳子 = 8; // :6308
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6310
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6311
          await era.printAndWait(`「好，好痛……轻一点啦，${player_name}」`); // :6312
          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :6313
          kojo.绳子 = 7; // :6313
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6315
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6316
          await era.printAndWait(`「呜……呜啊……才，才没什么兴奋呢……！啊啊……」`); // :6317
          await era.printAndWait(
            `『都舒服成这个样子了还嘴硬，被绳结摩擦着阴蒂，那么舒服吗♪』`,
          ); // :6318
          await era.printAndWait(
            `「啊……嗯啊啊……不，不要这样玩了啦${heart(1)}！」`,
          ); // :6319
          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :6320
          kojo.绳子 = 6; // :6320
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6322
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6323
          await era.printAndWait(`「什……什么啦……哪有兴奋什么的！」`); // :6324
          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :6325
          kojo.绳子 = 5; // :6325
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6327
          await era.printAndWait(
            `『在魔王大人面前被捆绑，姐姐是不是更加兴奋了呢♪』`,
          ); // :6328
          await era.printAndWait(`「绳子……太紧了……只感觉痛而已啦！」`); // :6329
          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :6330
          kojo.绳子 = 4; // :6330
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6332
          await era.printAndWait(
            `『姐姐的身体，真是很适合被捆绑呢，胸部被这么一勒，显得更大了呢，啧啧啧』`,
          ); // :6333
          await era.printAndWait(`「不，不要……说这种话了……快点放姐姐下来！」`); // :6334
          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :6335
          kojo.绳子 = 3; // :6335
        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
          // :6337
          await era.printAndWait(
            `『姐姐，不要抵抗了，老老实实被吊起来，接受我和魔王大人的疼爱吧』`,
          ); // :6338
          await era.printAndWait(`「放，放开我啊啊！」`); // :6339
          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :6340
          kojo.绳子 = 2; // :6340
        } // :6341
      } else {
        // :6342

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :6344
          await era.printAndWait(
            `「哈啊……哈啊${heart(1)} 被这样绑起来侵犯的感觉${heart(1)} 啊啊……有点等不及了${heart(1)}」`,
          ); // :6345
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢，展露着下体的${target_name}只能一扭一扭地呻吟着，渴求着侵犯和调教……`,
          ); // :6346
          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :6347
          kojo.绳子 = 9; // :6347
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :6349
          await era.printAndWait(
            `「啊啊……来吧，魔王大人……就这样把人家侵犯得……乱七八糟吧，反正人家动不了了呢${heart(1)}」`,
          ); // :6350
          await era.printAndWait(
            `被绳子捆住四肢，展露着下体的${target_name}向${player_name}露出诱惑的媚笑`,
          ); // :6351
          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :6352
          kojo.绳子 = 8; // :6352
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6354
          await era.printAndWait(
            `「哎哎……人家明明什么都会听魔王大人的，为什么还要绑成这样呢！」`,
          ); // :6355
          await era.printAndWait(
            `${target_name}吐着舌头，被${player_name}捆住了四肢，展露着下体……`,
          ); // :6356
          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :6357
          kojo.绳子 = 7; // :6357
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 5 &&
          (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6359
          await era.printAndWait(
            `「魔，魔王大人……想对${target_name}做怎样的事情……都可以${heart(1)} 啊啊……绳结，摩擦到阴蒂了……嗯啊啊${heart(1)}」`,
          ); // :6360
          await era.printAndWait(
            `${player_name}用绳子捆住四肢，展露着下体的${target_name}扭动着身体，感受着绳子摩擦着身体的敏感点……`,
          ); // :6361
          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :6362
          kojo.绳子 = 6; // :6362
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6364
          await era.printAndWait(`「哼啊……魔王大人……这么想虐待人家吗♪」`); // :6365
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢${target_name}顺从地展露着下体……`,
          ); // :6366
          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :6367
          kojo.绳子 = 5; // :6367
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6369
          await era.printAndWait(
            `「哎……哎……有，有点痛……不过既然是魔王大人的要求……」`,
          ); // :6370
          await era.printAndWait(
            `被${player_name}用绳子捆住四肢、${target_name}忍耐着肌肤，还有双乳紧勒的痛楚……`,
          ); // :6371
          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :6372
          kojo.绳子 = 4; // :6372
        } else if (
          chara(target).system.抖M气质 >= 3 &&
          (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6374
          await era.printAndWait(`「嗯啊……还，还是有点痛……但，但是………」`); // :6375
          await era.printAndWait(
            `${target_name}痛得眼睛都湿润了，但却顺从地让${player_name}继续捆缚着自己的身体……`,
          ); // :6376
          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :6377
          kojo.绳子 = 3; // :6377
        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
          // :6379
          await era.printAndWait(`「放，放开我啊啊……捆绑什么的，超讨厌啊！」`); // :6380
          await era.printAndWait(
            `无视${target_name}的痛苦呻吟和挣扎、${player_name}继续用绳子一圈圈束缚着${target_name}诱人的身体……`,
          ); // :6381
          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :6382
          kojo.绳子 = 2; // :6382
        } // :6383
      } // :6384
      return 0; // :6385
    } // :6386
  } else if (era_flag.selectcom === 44 && era0(`tequip:${target}:44`) === 0) {
    // :6388

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6390
      await era.printAndWait(`「哎……啊……这就结束了么……其实，感觉还挺棒的…」`); // :6391
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :6392
      kojo.绳子着脱 = 2; // :6392
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6394
      await era.printAndWait(
        `「啊啊……皮肤上的勒痕……要很久才能消掉呢……不过只要魔王大人高兴就好…」`,
      ); // :6395
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :6396
      kojo.绳子着脱 = 2; // :6396
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      // :6398
      await era.printAndWait(`「终……终于……能轻松一些了」`); // :6399
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :6400
      kojo.绳子着脱 = 1; // :6400
    } // :6401
    return 0; // :6402
  } // :6403

  // :6409-6491 SELECTCOM 45（口塞 CFLAG:346 / CFLAG:386）
  if (era_flag.selectcom === 45 && era0(`tequip:${target}:45`) !== 0) {
    if (kojo.口塞 === 0) {
      // :6411

      if (era.get(`talent:${target}:76`) === 1) {
        // :6413
        await era.printAndWait(`「呣……呣呣呣——！」`); // :6414
        await era.printAndWait(
          `${target_name}似乎想要说什么，但最后只有口水从塞口球里流出来……`,
        ); // :6415
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6417
        await era.printAndWait(`「不，不要啦——呣呣……呣呣呣！」`); // :6418
        await era.printAndWait(
          `${target_name}的声音被口球堵住，变成了无力的呻吟……`,
        ); // :6419
      } else {
        // :6421
        await era.printAndWait(`「唔，这，这是——呣呣……呣呣呣！？」`); // :6422
        await era.printAndWait(
          `${target_name}被${player_name}强行塞进口球，只能发出含糊的痛苦呻吟……`,
        ); // :6423
      } // :6424
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :6425
      kojo.口塞 = 1; // :6425
      return 0; // :6426
    } else {
      // :6428

      if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :6430
        await era.printAndWait(`「啊啊——呣……呣呣呣${heart(1)}」`); // :6431
        await era.printAndWait(
          `${target_name}张开嘴，顺从地让${player_name}把球形口塞粗暴地塞了进去，呻吟声随即变得模糊不清，呼吸也灼热了起来……`,
        ); // :6432
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :6433
        kojo.口塞 = 9; // :6433
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :6435
        await era.printAndWait(`「好，好的——呣……呣呣呣${heart(1)}」`); // :6436
        await era.printAndWait(
          `${target_name}老实地让${player_name}把球形口塞粗暴地塞了进去，只有口水慢慢地从嘴角渗出……`,
        ); // :6437
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :6438
        kojo.口塞 = 8; // :6438
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6440
        await era.printAndWait(`「人，人家不喜欢这个东西啦——呣……呣呣呣！」`); // :6441
        await era.printAndWait(
          `${target_name}的话音变成了无力的呻吟，只有口水慢慢地从嘴角渗出……`,
        ); // :6442
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :6443
        kojo.口塞 = 7; // :6443
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6445
        await era.printAndWait(
          `「是，是的，魔王大人……请——呣……呣呣呣${heart(1)}」`,
        ); // :6446
        await era.printAndWait(
          `${target_name}张开嘴，顺从地让${player_name}把球形口塞粗暴地塞了进去，呻吟声随即变得模糊不清，呼吸也灼热了起来……`,
        ); // :6447
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :6448
        kojo.口塞 = 6; // :6448
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6450
        await era.printAndWait(`「啊——呣……呣呣呣……${heart(1)}」`); // :6451
        await era.printAndWait(
          `${target_name}老实地张开嘴，让${player_name}把球形口塞粗暴地塞了进去……`,
        ); // :6452
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :6453
        kojo.口塞 = 5; // :6453
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6455
        await era.printAndWait(
          `「虽，虽然不喜欢这个东西……但，但是只要魔王大人要求的话——呣……呣呣呣…！」`,
        ); // :6456
        await era.printAndWait(
          `${target_name}的话音变成了无力的呻吟，只有口水从塞口球里慢慢流出来……`,
        ); // :6457
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :6458
        kojo.口塞 = 4; // :6458
      } else if (
        chara(target).system.抖M气质 >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6460
        await era.printAndWait(`「好，好的——呣……呣呣呣……」`); // :6461
        await era.printAndWait(
          `${target_name}老实地张开嘴，让${player_name}把球形口塞粗暴地塞了进去……`,
        ); // :6462
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :6463
        kojo.口塞 = 3; // :6463
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        // :6465
        await era.printAndWait(`「不，不要这个！？」`); // :6466
        await era.printAndWait(
          `${target_name}被${player_name}强行塞进口球，只能发出含糊的痛苦呻吟……`,
        ); // :6467
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :6468
        kojo.口塞 = 2; // :6468
      } // :6469
      return 0; // :6470
    } // :6471
  } else if (era_flag.selectcom === 45 && era0(`tequip:${target}:45`) === 0) {
    // :6473

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6475
      await era.printAndWait(`「呜呜……呜啊……嘴巴好酸…」`); // :6476
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`); // :6477
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :6478
      kojo.口塞着脱 = 3; // :6478
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6480
      await era.printAndWait(`「咳，咳……嘴巴好酸……」`); // :6481
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`); // :6482
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :6483
      kojo.口塞着脱 = 2; // :6483
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      // :6485
      await era.printAndWait(`「呜……呜呜……咳咳咳………」`); // :6486
      await era.printAndWait(`口水还在慢慢地从${target_name}的嘴边流出……`); // :6487
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :6488
      kojo.口塞着脱 = 1; // :6488
    } // :6489
    return 0; // :6490
  } // :6491

  // :6497-6683 SELECTCOM 46（灌肠肛塞 CFLAG:347）
  if (era_flag.selectcom === 46 && era0(`tequip:${target}:46`) !== 0) {
    if (kojo.灌肠肛塞 === 0) {
      // :6499

      if (assi_mao) {
        // :6501
        await era.printAndWait(`「啊啊啊……肚子，肚子好胀啊啊……好难受！」`); // :6502
        if (chara(era_flag.assi).kojo.灌肠肛塞 >= 1) {
          // :6503
          await era.printAndWait(
            `『忍住啊姐姐，一定要忍住忍住再忍住——等到终于忍不住了再突然一次全部排出去，那个感觉可是不输给小穴高潮的哦${heart(1)}』`,
          ); // :6504
        } else {
          // :6505
          await era.printAndWait(`『忍住啊姐姐，这种感觉要慢慢体验呢……』`); // :6506
        } // :6507
        await era.printAndWait(
          `${player_name}舔着嘴唇，抚摸着${target_name}胀起的小腹，和塞住肛门的木栓。`,
        ); // :6508
        await era.printAndWait(`「不，不行了……真的，真的已经不行了！」`); // :6509
        await era.printAndWait(`『别说笑话啦姐姐，游戏才刚刚开始呢。』`); // :6510
      } else {
        // :6511

        if (era.get(`talent:${target}:76`) === 1) {
          // :6513
          await era.printAndWait(`「这，这种……一点都不好玩啦……好，好难受！」`); // :6514
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          ); // :6515
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6517
          await era.printAndWait(`「好，好难受……魔王大人……饶，饶了人家吧……」`); // :6518
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          ); // :6519
        } else {
          // :6521
          await era.printAndWait(
            `「肚……肚子好痛……要，要死了……让人家上厕所吧，求你了！」`,
          ); // :6522
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，可不会那么轻易就让她解放啊。`,
          ); // :6523
        } // :6524
      } // :6525
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :6526
      kojo.灌肠肛塞 = 1; // :6526
      return 0; // :6527
    } else {
      // :6529

      if (assi_mao) {
        // :6531

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6533
          await era.printAndWait(
            `「啊……啊啊……肚子，肚子胀鼓鼓的${heart(1)} 嗯啊 ${heart(1)}」`,
          ); // :6534
          await era.printAndWait(
            `『姐姐也挺厉害的呢，注入了这么多${heart(1)} 肛门夹得紧紧的，其实不用怕啦，这个木塞你自己是挤不出来的！』`,
          ); // :6535
          await era.printAndWait(
            `「啊……啊啊……肚子${heart(1)} 好像……要坏掉了${heart(1)}」`,
          ); // :6536
          await era.printAndWait(
            `${target_name}抱着自己胀起的小腹，拼命忍耐着排泄欲，内心却更加兴奋了……`,
          ); // :6537
          // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :6538
          kojo.灌肠肛塞 = 7; // :6538
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6540
          await era.printAndWait(
            `「${player_name}，不，不可以再注进去了……姐姐……要生气了…！」`,
          ); // :6541
          await era.printAndWait(
            `『哎呀呀，姐姐这个表情，人家好怕怕哦，不过你是想我突然拔出来，然后全部拉在魔王大人的床上吗♪』`,
          ); // :6542
          await era.printAndWait(
            `${player_name}恶意地笑着，边玩弄着肛塞，边看着${target_name}拼命忍耐着排泄欲的样子……`,
          ); // :6543
          // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :6544
          kojo.灌肠肛塞 = 6; // :6544
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6546
          await era.printAndWait(
            `「呜……呜呜……肚子，肚子明明好难受……可，可是……」`,
          ); // :6547
          await era.printAndWait(
            `『哎呀呀，姐姐的表情明明很期待呢，这么喜欢公开排泄吗，真的是变态暴露狂呢！那以后和魔王大人羞羞的时候，记得让我在旁边观摩一下啊♪』`,
          ); // :6548
          await era.printAndWait(`「那……那种事……才，才不要${heart(1)}」`); // :6549
          await era.printAndWait(
            `${target_name}光是想象着妹妹描述的场景，就已经面红耳赤，排泄欲更加强烈了，身体却愈发地兴奋……`,
          ); // :6550
          // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :6551
          kojo.灌肠肛塞 = 5; // :6551
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6553
          await era.printAndWait(
            `「不，不要这样……折磨姐姐了，求你了，${player_name}…啊啊啊！」`,
          ); // :6554
          await era.printAndWait(
            `『才不是虐待呢，姐姐，这是因为${player_name}喜欢姐姐才会对姐姐这样做呢，换别人我才懒得呢，你看，魔王大人也是这样想的♪』`,
          ); // :6555
          await era.printAndWait(
            `${player_name}坏笑着，边玩弄着肛塞，欣赏着${target_name}拼命忍耐着排泄欲的样子……`,
          ); // :6556
          // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :6557
          kojo.灌肠肛塞 = 4; // :6557
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6559
          await era.printAndWait(
            `『哎呀呀，灌肠很舒服的嘛，为什么姐姐还要做出苦闷的表情？』`,
          ); // :6560
          await era.printAndWait(
            `「明，明明很难受啊……以，以后不要这样了可以吗……算姐姐求你了……呜呜」`,
          ); // :6561
          await era.printAndWait(
            `虽然嘴上这么说着，但是肛门微微的抽搐下，${target_name}却露出了痛苦交杂着享受的表情……`,
          ); // :6562
          // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :6563
          kojo.灌肠肛塞 = 3; // :6563
        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
          // :6565
          await era.printAndWait(
            `『哎呀呀，姐姐满头大汗了，已经充分感觉到灌肠的舒服了呢』`,
          ); // :6566
          await era.printAndWait(`「呜……呜呜……快，快点让姐姐上厕所吧……」`); // :6567
          // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :6568
          kojo.灌肠肛塞 = 2; // :6568
        } // :6569
      } else {
        // :6570

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :6572
          await era.printAndWait(
            `「啊啊！肚子……肚子好胀${heart(1)} 呜？！塞子……太大了啊啊${heart(1)}」`,
          ); // :6573
          await era.printAndWait(
            `${target_name}在痛苦与快感的交织中摇晃着臀部，肛塞上的铃铛也随之响了起来……`,
          ); // :6574
          // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :6575
          kojo.灌肠肛塞 = 7; // :6575
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6577
          await era.printAndWait(
            `「魔，魔王大人……这，这种游戏一点……都不有趣啊啊！」`,
          ); // :6578
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          ); // :6579
          // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :6580
          kojo.灌肠肛塞 = 6; // :6580
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6582
          await era.printAndWait(
            `「啊啊……肚子好胀……明明好难受……但……但是……为什么……屁股……还会很舒服……呜呜${heart(1)}」`,
          ); // :6583
          await era.printAndWait(
            `${target_name}感受着灌肠液在体内的肆虐，不住地呻吟着，然而在震动肛塞刺激下抽搐着的肛门，却不住地传来快感…`,
          ); // :6584
          // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :6585
          kojo.灌肠肛塞 = 5; // :6585
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6587
          await era.printAndWait(
            `「呜……呜呜……魔，魔王大人……${target_name}已经，已经快要忍不住了………」`,
          ); // :6588
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          ); // :6589
          // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :6590
          kojo.灌肠肛塞 = 4; // :6590
        } else if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3 &&
          (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6592
          await era.printAndWait(`「啊啊……肚子，肚子好难受……魔王大人………」`); // :6593
          await era.printAndWait(
            `${target_name}在露出痛苦表情的同时，肛门却在肛塞刺激下抽搐着，明显是感觉到了快感……`,
          ); // :6594
          // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :6595
          kojo.灌肠肛塞 = 3; // :6595
        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
          // :6597
          await era.printAndWait(`「呜……呜呜……求，求你了，让我上厕所吧…」`); // :6598
          await era.printAndWait(
            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,
          ); // :6599
          // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :6600
          kojo.灌肠肛塞 = 2; // :6600
        } // :6601
      } // :6602
      return 0; // :6603
    } // :6604
  } else if (era_flag.selectcom === 46 && era0(`tequip:${target}:46`) === 0) {
    // :6606

    if (assi_mao) {
      // :6608

      if (era.get(`talent:${target}:76`) === 1) {
        // :6610

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6612
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊${heart(1)}」`); // :6613
          await era.printAndWait(
            `『嘿嘿，我说过了吧，这样忍到最后一次性全部排出来，很刺激很舒服吧♪？』`,
          ); // :6614
          await era.printAndWait(
            `排泄完的${target_name}边喘息着，边点头同意着妹妹的话……`,
          ); // :6615
        } else {
          // :6616
          await era.printAndWait(`「出，出来了，全部出来了啊……呜啊啊！」`); // :6617
          await era.printAndWait(
            `${target_name}激烈地排泄着，脸上露出了痛苦和耻辱的表情。`,
          ); // :6618
          await era.printAndWait(
            `『哎哎，姐姐看上去还不是很习惯啊，那就再来灌一次肠吧，可以吗，魔王大人？』`,
          ); // :6619
        } // :6620
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6622

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6624
          await era.printAndWait(
            `「呜呜……呜啊啊啊……这样突然拔掉塞子……全，全部出来了啊啊！」`,
          ); // :6625
          await era.printAndWait(
            `『哎呀呀，姐姐真应该照照镜子看看自己现在的表情，一脸享受呢，真的有那么舒服吗♪』`,
          ); // :6626
          await era.printAndWait(
            `${target_name}忍耐到扭曲了的脸一下子松弛了，甚至可以说是享受地喘息着………`,
          ); // :6627
        } else {
          // :6628
          await era.printAndWait(
            `「${player_name}，魔王大人！不，不要看啊啊！！！」`,
          ); // :6629
          await era.printAndWait(
            `『太迟了呢姐姐，你排泄时的下流样子已经被我和魔王大人看的清清楚楚了呢』`,
          ); // :6630
          await era.printAndWait(
            `${target_name}脱力地跪倒在地上，羞耻得泪流满面……`,
          ); // :6631
        } // :6632
      } else {
        // :6634

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6636
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会，会忍不住的啊啊啊！」`,
          ); // :6637
          await era.printAndWait(
            `${target_name}的排泄声，和呻吟娇喘的声音交织在了一起。${player_name}捂着鼻子皱起了眉头。`,
          ); // :6638
          await era.printAndWait(`『哎呀呀，姐姐这个样子，是想再来一次吗？』`); // :6639
        } else {
          // :6640
          await era.printAndWait(`「不，不要看，不要看啊啊啊！」`); // :6641
          await era.printAndWait(
            `${target_name}在痛苦的呻吟中排泄了出来。${player_name}捂着鼻子皱起了眉头。`,
          ); // :6642
          await era.printAndWait(
            `『哎呀，肚子里攒了这么多脏东西啊姐姐，看来还得再来一次呢！』`,
          ); // :6643
        } // :6644
      } // :6645
    } else {
      // :6646

      if (era.get(`talent:${target}:76`) === 1) {
        // :6648

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6650
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊${heart(1)}」`); // :6651
          await era.printAndWait(
            `${target_name}终于从痛苦的忍受中得到了解放，秽物从肛门一泄如注的同时发出了解脱和享受的娇喘。`,
          ); // :6652
          await era.printAndWait(`「好……好舒服啊啊${heart(1)}」`); // :6653
        } else {
          // :6654
          await era.printAndWait(`「出，出来了，全部出来了啊啊啊！」`); // :6655
          await era.printAndWait(
            `${target_name}激烈地排泄着，脸上露出了痛苦和耻辱的表情。`,
          ); // :6656
          await era.printAndWait(`「呼啊……呼啊……好，好累，好难受……」`); // :6657
        } // :6658
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6660

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6662
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会忍不住的啊啊啊啊！」`,
          ); // :6663
          await era.printAndWait(
            `${target_name}忍耐到扭曲了的脸一下子松弛了，甚至享受地娇喘了起来……`,
          ); // :6664
          await era.printAndWait(`「啊……啊啊……排泄的感觉……好舒服${heart(1)}」`); // :6665
        } else {
          // :6666
          await era.printAndWait(`「不，不要看，不要看啊啊啊……」`); // :6667
          await era.printAndWait(
            `被强制当着你的面排泄的${target_name}羞耻地哭泣了起来……`,
          ); // :6668
        } // :6669
      } else {
        // :6671

        if (
          chara(target).system.肛门感觉 >= 3 &&
          chara(target).system.抖M气质 >= 3
        ) {
          // :6673
          await era.printAndWait(
            `「这，这样突然拔掉塞子……会，会忍不住的啊啊啊！！」`,
          ); // :6674
          await era.printAndWait(
            `${target_name}的排泄声，和呻吟娇喘的声音交织在了一起。`,
          ); // :6675
        } else {
          // :6676
          await era.printAndWait(`「忍，忍不住了！不要看，不要看啊啊啊！」`); // :6677
          await era.printAndWait(`${target_name}在痛苦的呻吟中排泄了出来`); // :6678
        } // :6679
      } // :6680
    } // :6681
    return 0; // :6682
  } // :6683

  // :6688-6829 IF SELECTCOM == 55（放置PLAY CFLAG:356）
  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      // :6690

      if (era.get(`talent:${target}:76`) === 1) {
        // :6692
        await era.printAndWait(`「哎哎，这就结束了吗？真没劲。」`); // :6693
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6695
        await era.printAndWait(`「为，为什么不继续了呢？」`); // :6696
      } else {
        // :6698
        await era.printAndWait(`「不，不要用那种眼神看着人家………」`); // :6699
      } // :6700

      if (era.get(`tequip:${target}:11`)) {
        // :6703
        await era.printAndWait(
          `${target_name}的蜜穴里，蠕虫一直在躁动个不停，侵犯，刺激着每一处敏感点。`,
        ); // :6703
      } // :6703

      if (era.get(`tequip:${target}:13`)) {
        // :6706
        await era.printAndWait(
          `${target_name}的肛门里，蠕虫一直在躁动个不停，侵犯，刺激着敏感的直肠。`,
        ); // :6706
      } // :6706

      if (era.get(`tequip:${target}:19`)) {
        // :6709
        await era.printAndWait(
          `${target_name}肛门里的珠串慢慢地震动了起来，刺激着敏感的直肠。`,
        ); // :6709
      } // :6709

      if (era.get(`tequip:${target}:14`)) {
        // :6712
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹持续刺激着，已经有些红肿。`,
        ); // :6712
      } // :6712

      if (era.get(`tequip:${target}:15`)) {
        // :6715
        await era.printAndWait(
          `${target_name}的乳头被电动夹子持续刺激着，已经有些红肿。`,
        ); // :6715
      } // :6715

      if (era.get(`tequip:${target}:16`)) {
        // :6718
        await era.print(`${target_name}被榨乳机持续榨取着母乳。`); // :6718
      } // :6718

      if (era.get(`tequip:${target}:17`)) {
        // :6721
        await era.printAndWait(
          `${target_name}的阴茎还在被电动飞机杯持续摩擦刺激着，只能拼命忍耐着射精的欲望。`,
        ); // :6721
      } // :6721

      if (era.get(`tequip:${target}:43`)) {
        // :6724
        await era.printAndWait(`${target_name}眼前依旧漆黑一片。`); // :6724
      } // :6724

      if (era.get(`tequip:${target}:44`)) {
        // :6727
        await era.printAndWait(
          `${target_name}的身体依旧被紧紧束缚着，动弹不得。`,
        ); // :6727
      } // :6727

      if (era.get(`tequip:${target}:46`)) {
        // :6730
        await era.printAndWait(
          `${target_name}的肚子里，灌肠液依旧在肆虐着，只能拼命忍耐着排泄的欲望，但是还是有一丝丝液体从肛塞边缘漏出`,
        ); // :6730
      } // :6730

      if (era.get(`tequip:${target}:49`)) {
        // :6733
        await era.printAndWait(
          `${target_name}肛门里的电极还在传递着微微的电流，刺激得括约肌一阵阵抽搐。`,
        ); // :6733
      } // :6733

      if (era.get(`tequip:${target}:53`)) {
        // :6736
        await era.printAndWait(`水晶球忠实的记录下${target_name}此刻的身姿……`); // :6736
      } // :6736
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :6737
      kojo.放置PLAY = 1; // :6737
      return 0; // :6738
    } else {
      // :6740

      if (assi_mao) {
        // :6742

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6744
          await era.printAndWait(
            `『哎呀呀，姐姐，被放置play的感觉如何，想要的话就大声说出来呀♪』`,
          ); // :6745
          await era.printAndWait(
            `${target_name}体内的欲火被妹妹燎拨着，燃烧得更旺了……`,
          ); // :6746
          // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :6747
          kojo.放置PLAY = 6; // :6747
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6749
          await era.printAndWait(
            `『哼哼哼，那样的表情，姐姐等得受不了了吗？』`,
          ); // :6750
          // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :6751
          kojo.放置PLAY = 5; // :6751
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6753
          await era.printAndWait(`「不，不要那样让姐姐……等着了……${heart(1)}」`); // :6754
          await era.printAndWait(
            `${target_name}体内的欲火被妹妹用眼神和语言燎拨着，燃烧得更旺了……`,
          ); // :6755
          // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :6756
          kojo.放置PLAY = 4; // :6756
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6758
          await era.printAndWait(
            `『不，不要用那样的眼神看姐姐啦，${player_name}………』`,
          ); // :6759
          // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :6760
          kojo.放置PLAY = 3; // :6760
        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
          // :6762
          await era.printAndWait(`『哎呀，别用那样的眼神瞪我嘛……』`); // :6763
          // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :6764
          kojo.放置PLAY = 2; // :6764
        } // :6765
      } else {
        // :6766

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :6768
          await era.printAndWait(
            `「魔，魔王大人真是坏心眼…${heart(1)} 这么把人家……晾在一边……${heart(1)}」`,
          ); // :6769
          await era.printAndWait(
            `欲火难耐的${target_name}焦躁地摇摆着身体，诱惑着${player_name}，渴求着调教和侵犯……`,
          ); // :6770
          // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :6771
          kojo.放置PLAY = 6; // :6771
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6773
          await era.printAndWait(`「啊……啊……不，不会就这么结束了吧？」`); // :6774
          // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :6775
          kojo.放置PLAY = 5; // :6775
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).train.欲情 >= era0('palamlv:3') &&
          (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6777
          await era.printAndWait(`「不可以急躁，不可以急躁……」`); // :6778
          await era.printAndWait(
            `欲火难耐的${target_name}不断地自言自语着，然而渴望的视线却一直投向${player_name}……`,
          ); // :6779
          // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :6780
          kojo.放置PLAY = 4; // :6780
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6782
          await era.printAndWait(`「唔……我，我会……乖乖的……」`); // :6783
          // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :6784
          kojo.放置PLAY = 3; // :6784
        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
          // :6786
          await era.printAndWait(`「别，别用那样的眼神看人家……」`); // :6787
          // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :6788
          kojo.放置PLAY = 2; // :6788
        } // :6789
      } // :6790

      if (era.get(`tequip:${target}:11`)) {
        // :6793
        await era.printAndWait(
          `${target_name}的蜜穴里，蠕虫一直在躁动个不停，侵犯，刺激着每一处敏感点。`,
        ); // :6793
      } // :6793

      if (era.get(`tequip:${target}:13`)) {
        // :6796
        await era.printAndWait(
          `${target_name}的肛门里，蠕虫一直在躁动个不停，侵犯，刺激着敏感的直肠。`,
        ); // :6796
      } // :6796

      if (era.get(`tequip:${target}:19`)) {
        // :6799
        await era.printAndWait(
          `${target_name}肛门里的珠串慢慢地震动了起来，刺激着敏感的直肠。`,
        ); // :6799
      } // :6799

      if (era.get(`tequip:${target}:14`)) {
        // :6802
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹持续刺激着，已经有些红肿。`,
        ); // :6802
      } // :6802

      if (era.get(`tequip:${target}:15`)) {
        // :6805
        await era.printAndWait(
          `${target_name}的乳头被电动夹子持续刺激着，已经有些红肿。`,
        ); // :6805
      } // :6805

      if (era.get(`tequip:${target}:16`)) {
        // :6808
        await era.print(`${target_name}被榨乳机持续榨取着母乳。`); // :6808
      } // :6808

      if (era.get(`tequip:${target}:17`)) {
        // :6811
        await era.printAndWait(
          `${target_name}的阴茎还在被电动飞机杯持续摩擦刺激着，只能拼命忍耐着射精的欲望。`,
        ); // :6811
      } // :6811

      if (era.get(`tequip:${target}:43`)) {
        // :6814
        await era.printAndWait(`${target_name}眼前依旧漆黑一片。`); // :6814
      } // :6814

      if (era.get(`tequip:${target}:44`)) {
        // :6817
        await era.printAndWait(
          `${target_name}的身体依旧被紧紧束缚着，动弹不得。`,
        ); // :6817
      } // :6817

      if (era.get(`tequip:${target}:46`)) {
        // :6820
        await era.printAndWait(
          `${target_name}的肚子里，灌肠液依旧在肆虐着，只能拼命忍耐着排泄的欲望，但是还是有一丝丝液体从肛塞边缘漏出`,
        ); // :6820
      } // :6820

      if (era.get(`tequip:${target}:49`)) {
        // :6823
        await era.printAndWait(
          `${target_name}肛门里的电极还在传递着微微的电流，刺激得括约肌一阵阵抽搐。`,
        ); // :6823
      } // :6823

      if (era.get(`tequip:${target}:53`)) {
        // :6826
        await era.printAndWait(`水晶球忠实的记录下${target_name}此刻的身姿……`); // :6826
      } // :6826
      return 0; // :6827
    } // :6828
  } // :6829

  // :6835-7010 IF SELECTCOM == 56（交谈 CFLAG:357）
  if (era_flag.selectcom === 56) {
    // :6835

    if (kojo.交谈 === 0) {
      // :6837
      if (era.get(`tequip:${target}:53`) === 1) {
        // :6838

        await era.print(
          `在${player_name}的命令下，${target_name}进行了自我介绍、`,
        ); // :6840
        if (
          era.get(`talent:${target}:89`) ||
          chara(target).system.露出癖 >= 5
        ) {
          // :6841
          await era.print(`${target_name}介绍了自己的名字和迄今为止的性经验`); // :6842
          if (chara(target).train.自慰中毒 >= 3) {
            // :6844
            await era.print(`、自慰的时候幻想的内容和对象也说出来了`); // :6844
          } // :6844
          await era.print(`说得自己都兴奋起来了……`); // :6845
          await era.print(
            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,
          ); // :6846
          await era.printAndWait(
            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,
          ); // :6847
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6848
          game.kojo.录像内容 |= 2; // :6848
        } else if (
          chara(target).train.欲情 >= era0('palamlv:4') &&
          (era.get(`talent:${target}:76`) || chara(target).system.欲望 >= 5)
        ) {
          // :6849
          await era.print(`${target_name}开始对着水晶球说着不知廉耻的话。`); // :6850
          await era.printAndWait(
            `「我……${target_name}是魔王大人的性奴，每天都在渴望着魔王大人的调教和侵犯……♪」`,
          ); // :6851
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6852
          game.kojo.录像内容 |= 2; // :6852
        } else if (
          era.get(`talent:${target}:85`) ||
          chara(target).system.顺从 >= 3 ||
          chara(target).system.欲望 >= 4 ||
          chara(target).system.露出癖 >= 2
        ) {
          // :6853
          await era.print(`${target_name}向水晶球勉为其难地介绍着自己`); // :6854
          await era.printAndWait(
            `我……我是住在通往魔王宫殿的洞窟附近的村女……名叫${target_name}……」`,
          ); // :6855
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6856
          game.kojo.录像内容 |= 2; // :6856
        } else {
          // :6857
          await era.printAndWait(
            `${target_name}瞪视着水晶球，一副极不情愿的样子。`,
          ); // :6858
          await era.printAndWait(`「我，我的名字是……」`); // :6859
          await era.printAndWait(
            `还没有说完，就抿着嘴沉默了，看来还需要继续调教……`,
          ); // :6860
        } // :6861
      } else {
        // :6862

        if (assi_mao) {
          // :6864
          await era.print(`面对${player_name}`); // :6865
          if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔
          ) {
            // :6866
            await era.print(
              `的语言调戏、${target_name}扭着腰，边自慰边发出一声声享受的娇喘。`,
            ); // :6867
            await era.printAndWait(
              `「呜……呜啊啊……好，好舒服${heart(1)} 姐姐……这么淫乱……真是对不起呢……！」`,
            ); // :6868
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            // :6869
            await era.print(
              `边侵犯边用语言调戏、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            ); // :6870
            await era.printAndWait(
              `「嗯啊……啊啊……我，我正在，正在被妹妹看着自慰${heart(1)} 但是……但是好舒服……${heart(1)} …要，要去了啊啊${heart(1)}」`,
            ); // :6871
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // :6872
            await era.print(`的语言调戏，${target_name}`); // :6873
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :6874
              await era.print(`却乐在其中`); // :6875
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :6876
              await era.print(`无比痛苦`); // :6877
            } // :6878
            await era.print(`地回应着。`); // :6879
            await era.printAndWait(`「不，不要再，再对姐姐恶作剧了」`); // :6880
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            // :6881
            await era.print(
              `的语言调戏、${target_name}一点也不生气，看来姐妹关系已经很融洽了。`,
            ); // :6882
            await era.printAndWait(
              `「只，只要能和${player_name}在一起，即使是做魔王大人的性奴，姐姐也很高兴！」`,
            ); // :6883
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            // :6884
            await era.print(`的语言调戏、${target_name}小声地回答着`); // :6885
            await era.printAndWait(
              `「不，不要说这些了……和，和姐姐一起回家吧……好吗？」`,
            ); // :6886
          } else {
            // :6887
            await era.print(
              `的语言羞辱，${target_name}只是红着脸，低着头听着…`,
            ); // :6888
            await era.printAndWait(`「为，为什么……会变成这个样子…」`); // :6889
            await era.printAndWait(`「对不起……${player_name}…真的对不起…」`); // :6890
          } // :6891
        } else {
          // :6892
          await era.print(`${player_name}`); // :6893
          if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔
          ) {
            // :6894
            await era.print(
              `的语言挑逗、${target_name}扭着腰，边自慰边诉说着对你的爱慕。`,
            ); // :6895
            await era.printAndWait(
              `「魔，魔王大人……${heart(1)} 你，你是我的全部……嗯啊${heart(1)} 啊啊啊${heart(1)} 我的身体……全部是属于大人的啊啊啊${heart(1)}`,
            ); // :6896
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            // :6897
            await era.print(
              `的语言挑逗、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            ); // :6898
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 最，最喜欢……这样被魔王大人${heart(1)} 看着……自慰了${heart(1)} 啊啊啊${heart(1)}」`,
            ); // :6899
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // :6900
            await era.print(`的语言调戏，${target_name}`); // :6901
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :6902
              await era.print(`乐在其中`); // :6903
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :6904
              await era.print(`无比痛苦`); // :6905
            } // :6906
            await era.print(`地努力回答着`); // :6907
            await era.printAndWait(
              `「呜啊啊！人，人家没关系的……请，请魔王大人……随意调教！」`,
            ); // :6908
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            // :6909
            await era.print(`的语言挑逗、${target_name}有些害羞地应答着`); // :6910
            await era.printAndWait(
              `「请，请魔王大人……随意调教${target_name}」`,
            ); // :6911
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            // :6912
            await era.print(`的语言挑逗、${target_name}结结巴巴地回答着`); // :6913
            await era.printAndWait(`「应，应该回答什么…？」`); // :6914
          } else {
            // :6915
            await era.print(`的语言挑逗、${target_name}听清楚了吗…`); // :6916
            await era.printAndWait(`「…不，不太想说话…」`); // :6917
          } // :6918
        } // :6919
      } // :6920
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :6921
      kojo.交谈 = 1; // :6921
      return 0; // :6922
    } else {
      // :6924
      if (era.get(`tequip:${target}:53`) === 1) {
        // :6925

        await era.print(
          `在${player_name}的命令下，${target_name}进行了自我介绍、`,
        ); // :6927
        if (
          era.get(`talent:${target}:89`) ||
          chara(target).system.露出癖 >= 5
        ) {
          // :6928
          await era.print(`${target_name}介绍了自己的名字和迄今为止的性经验`); // :6929
          if (chara(target).train.自慰中毒 >= 3) {
            // :6931
            await era.print(`、自慰的时候幻想的内容和对象也说出来了`); // :6931
          } // :6931
          await era.print(`说得自己都兴奋起来了……`); // :6932
          await era.print(
            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,
          ); // :6933
          await era.printAndWait(
            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,
          ); // :6934
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6935
          game.kojo.录像内容 |= 2; // :6935
        } else if (
          chara(target).train.欲情 >= era0('palamlv:4') &&
          (era.get(`talent:${target}:76`) || chara(target).system.欲望 >= 5)
        ) {
          // :6936
          await era.print(`${target_name}开始对着水晶球说着不知廉耻的话。`); // :6937
          await era.printAndWait(
            `「我……${target_name}是魔王大人的性奴，每天都在渴望着魔王大人的调教和侵犯……♪」`,
          ); // :6938
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6939
          game.kojo.录像内容 |= 2; // :6939
        } else if (
          era.get(`talent:${target}:85`) ||
          chara(target).system.顺从 >= 3 ||
          chara(target).system.欲望 >= 4 ||
          chara(target).system.露出癖 >= 2
        ) {
          // :6940
          await era.print(`${target_name}向水晶球勉为其难地介绍着自己`); // :6941
          await era.printAndWait(
            `我……我是住在通往魔王宫殿的洞窟附近的村女……名叫${target_name}……」`,
          ); // :6942
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :6943
          game.kojo.录像内容 |= 2; // :6943
        } else {
          // :6944
          await era.printAndWait(
            `${target_name}瞪视着水晶球，一副极不情愿的样子。`,
          ); // :6945
          await era.printAndWait(`「我，我的名字是……」`); // :6946
          await era.printAndWait(
            `还没有说完，就抿着嘴沉默了，看来还需要继续调教……`,
          ); // :6947
        } // :6948
      } else {
        // :6949

        if (assi_mao) {
          // :6951
          await era.print(`面对${player_name}`); // :6952
          if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔
          ) {
            // :6953
            await era.print(
              `的语言调戏、${target_name}扭着腰，边自慰边发出一声声享受的娇喘。`,
            ); // :6954
            await era.printAndWait(
              `「呜……呜啊啊……好，好舒服${heart(1)} 姐姐……这么淫乱……真是对不起呢……！」`,
            ); // :6955
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            // :6956
            await era.print(
              `的语言调戏、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            ); // :6957
            await era.printAndWait(
              `「嗯啊……啊啊……我，我正在，正在被妹妹看着自慰${heart(1)} 但是……但是好舒服……${heart(1)} …要，要去了啊啊${heart(1)}」`,
            ); // :6958
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // :6959
            await era.print(`的语言调戏，${target_name}`); // :6960
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :6961
              await era.print(`害羞`); // :6962
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :6963
              await era.print(`无比痛苦`); // :6964
            } // :6965
            await era.print(`地回应着`); // :6966
            await era.printAndWait(`「不，不要再，再对姐姐恶作剧了」`); // :6967
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            // :6968
            await era.print(
              `的语言调戏、${target_name}一点也不生气，看来姐妹关系已经很融洽了。`,
            ); // :6969
            await era.printAndWait(
              `「只，只要能和${player_name}在一起，即使是做魔王大人的性奴，姐姐也很高兴！」`,
            ); // :6970
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            // :6971
            await era.print(`的语言调戏、${target_name}小声地回答着`); // :6972
            await era.printAndWait(
              `「不，不要说这些了……和，和姐姐一起回家吧……好吗？」`,
            ); // :6973
          } else {
            // :6974
            await era.print(
              `的语言羞辱，${target_name}只是红着脸，低着头听着…`,
            ); // :6975
            await era.printAndWait(`「为，为什么……会变成这个样子…」`); // :6976
            await era.printAndWait(`「对不起……${player_name}…真的对不起…」`); // :6977
          } // :6978
        } else {
          // :6979
          await era.print(`面对${player_name}`); // :6980
          if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:85`) ||
              chara(target).system.顺从 >= 5) &&
            game.event.插着不拔
          ) {
            // :6981
            await era.print(
              `的语言挑逗、${target_name}扭着腰，边自慰边诉说着对你的爱慕。`,
            ); // :6982
            await era.printAndWait(
              `「魔，魔王大人……${heart(1)} 你，你是我的全部……嗯啊${heart(1)} 啊啊啊${heart(1)} 我的身体……全部是属于大人的啊啊啊${heart(1)}`,
            ); // :6983
          } else if (
            chara(target).train.欲情 >= era0('palamlv:4') &&
            (era.get(`talent:${target}:76`) ||
              chara(target).system.欲望 >= 5) &&
            game.event.插着不拔
          ) {
            // :6984
            await era.print(
              `的语言挑逗、${target_name}弯着腰，不顾廉耻地边娇喘边大声说着`,
            ); // :6985
            await era.printAndWait(
              `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 最，最喜欢……这样被魔王大人${heart(1)} 看着……自慰了${heart(1)} 啊啊啊${heart(1)}」`,
            ); // :6986
          } else if (
            (era0(`palam:${target}:4`) >= era0('palamlv:4') ||
              chara(target).system.顺从 >= 5 ||
              era.get(`talent:${target}:76`) ||
              era.get(`talent:${target}:85`)) &&
            chara(target).train.欲情 >= era0('palamlv:4')
          ) {
            // :6987
            await era.print(`的语言调戏，${target_name}`); // :6988
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :6989
              await era.print(`乐在其中`); // :6990
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :6991
              await era.print(`无比痛苦`); // :6992
            } // :6993
            await era.print(`地努力回答着`); // :6994
            await era.printAndWait(
              `「呜啊啊！人，人家没关系的……请，请魔王大人……随意调教！」`,
            ); // :6995
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:4') ||
            era.get(`talent:${target}:85`) ||
            chara(target).system.顺从 >= 5
          ) {
            // :6996
            await era.print(`的语言挑逗、${target_name}有些害羞地应答着`); // :6997
            await era.printAndWait(
              `「请，请魔王大人……随意调教${target_name}」`,
            ); // :6998
          } else if (
            era0(`palam:${target}:4`) >= era0('palamlv:2') ||
            chara(target).system.顺从 >= 3
          ) {
            // :6999
            await era.print(`的语言挑逗、${target_name}结结巴巴地回答着`); // :7000
            await era.printAndWait(`「应，应该回答什么…？」`); // :7001
          } else {
            // :7002
            await era.print(`的语言挑逗、${target_name}听清楚了吗…`); // :7003
            await era.printAndWait(`「…不，不太想说话…」`); // :7004
          } // :7005
        } // :7006
      } // :7007
      return 0; // :7008
    } // :7009
  } // :7010

  // :7014-7167 IF SELECTCOM == 63（贝合 CFLAG:364）
  if (era_flag.selectcom === 63) {
    // :7014

    if (kojo.六九式 === 0) {
      // :7016

      if (assi_mao) {
        // :7018
        await era.printAndWait(
          `『啊啊……这样好舒服啊啊……姐姐${heart(1)} 姐姐${heart(1)}』`,
        ); // :7019
        await era.printAndWait(
          `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
        ); // :7020

        if (era.get(`talent:${target}:76`) === 1) {
          // :7022
          await era.printAndWait(
            `「是……是啊……真的很舒服啊啊……已，已经……要去了啊啊${heart(1)}」`,
          ); // :7023
          await era.printAndWait(
            `${target_name}也显得十分兴奋，继续和${player_name}用蜜穴和阴蒂相互摩擦着……`,
          ); // :7024
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :7026
          await era.printAndWait(
            `「好，好害羞啦……但是，但是……真的……好舒服啊啊${heart(1)}！」`,
          ); // :7027
          await era.printAndWait(
            `虽然满脸通红地摇着头，但是面对${player_name}更起劲的摩擦着，${target_name}也忍不住娇喘了起来……`,
          ); // :7028
        } else {
          // :7030
          await era.printAndWait(
            `「不，不可以这样做啊，${player_name}！ 快放开我啊！！」`,
          ); // :7031
          await era.printAndWait(
            `与妹妹的性器相互摩擦的背德感让${target_name}无比内疚，却怎么也逃不脱${player_name}的手掌心……`,
          ); // :7032
        } // :7033
      } else {
        // :7034

        if (era.get(`talent:${target}:76`) === 1) {
          // :7036
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
          ); // :7037
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好……好舒服……${heart(1)} 和魔王大人……百合……真是太舒服了啊啊${heart(1)}」`,
          ); // :7038
          await era.printAndWait(
            `${target_name}尽情的娇喘着，享受着和${player_name}蜜穴相互摩擦的极度快感……`,
          ); // :7039
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :7041
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，紧贴着彼此的下体摩擦着，爱液不断地从两人的交合处流出。`,
          ); // :7042
          await era.printAndWait(
            `「啊啊……这样的姿势……好，好害羞……不过好舒服啊啊${heart(1)}」`,
          ); // :7043
          await era.printAndWait(
            `${target_name}完全沉浸在与${player_name}用下体相互摩擦的快感之中，发出了甘甜的娇喘。`,
          ); // :7044
        } else {
          // :7046
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          ); // :7047
          await era.printAndWait(`「放，放开我……这样……这样好脏的……呜呜呜！」`); // :7048
          await era.printAndWait(
            `无力抵抗的${target_name}只能边抽噎边忍受着……`,
          ); // :7049
        } // :7050
      } // :7051
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :7052
      kojo.六九式 = 1; // :7052
      return 0; // :7053
    } else {
      // :7055

      if (assi_mao) {
        // :7057

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :7059
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7060
          await era.printAndWait(
            `『呜哇，姐姐你动得比我还激烈啊${heart(1)} 啊啊……好舒服${heart(1)} 嗯啊啊${heart(1)}』`,
          ); // :7061
          await era.printAndWait(
            `「我，我也很舒服啊啊${heart(1)} 和${player_name}姐妹百合……真的是太舒服了${heart(1)} 嗯啊啊……要，要去了啊啊${heart(1)} 」`,
          ); // :7062
          await era.printAndWait(
            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,
          ); // :7063
          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364） // :7064
          kojo.六九式 = 9; // :7064
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :7066
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7067
          await era.printAndWait(
            `『嗯啊……姐姐这样舒服吗${heart(1)} 我可是很舒服呢……啊啊啊${heart(1)}』`,
          ); // :7068
          await era.printAndWait(
            `「是，是啊…姐姐……也很兴奋${heart(1)} 很舒服啊啊${heart(1)} 」`,
          ); // :7069
          await era.printAndWait(`两人摇着腰肢，享受着姐妹百合之爱`); // :7070
          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364） // :7071
          kojo.六九式 = 8; // :7071
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.六九式 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :7073
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          ); // :7074
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……』`); // :7075
          await era.printAndWait(
            `「怎，怎么这样啦${heart(1)} 好，好害羞……姐妹做这样的事！」`,
          ); // :7076
          await era.printAndWait(
            `虽然嘴上这么说，但是${target_name}还是逐渐兴奋了起来，享受着和${player_name}摩擦下体的快感……`,
          ); // :7077
          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364） // :7078
          kojo.六九式 = 7; // :7078
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :7080
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7081
          await era.printAndWait(
            `『呜哇，姐姐你动得比我还激烈啊${heart(1)} 啊啊……好舒服${heart(1)} 嗯啊啊${heart(1)}』`,
          ); // :7082
          await era.printAndWait(
            `「是……是啊，能和我最心爱的${player_name}百合……真的是太幸福……太舒服了${heart(1)}」`,
          ); // :7083
          await era.printAndWait(
            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,
          ); // :7084
          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364） // :7085
          kojo.六九式 = 6; // :7085
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :7087
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7088
          await era.printAndWait(
            `『嗯啊……姐姐这样舒服吗${heart(1)} 我可是很舒服呢……啊啊啊${heart(1)}』`,
          ); // :7089
          await era.printAndWait(`「是的……我也……我也……${heart(1)}」`); // :7090
          await era.printAndWait(
            `${target_name}满脸通红地享受着和妹妹的百合之爱……`,
          ); // :7091
          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364） // :7092
          kojo.六九式 = 5; // :7092
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :7094
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          ); // :7095
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……！』`); // :7096
          await era.printAndWait(
            `「不，不要啦……姐妹……怎么可以做这种事……而且魔王大人……还在看着呢！」`,
          ); // :7097
          await era.printAndWait(
            `虽然嘴上这么说者，而且脸也红到了耳根，但是相互摩擦着的蜜穴传来的快感还是让${player_name}忍不住娇喘了起来`,
          ); // :7098
          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364） // :7099
          kojo.六九式 = 4; // :7099
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :7101
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7102
          await era.printAndWait(`『怎么样，这样很舒服吧，姐姐！嗯啊啊……！』`); // :7103
          await era.printAndWait(`「不要啊，不可以这样……但，但是……好舒服！」`); // :7104
          await era.printAndWait(
            `随着${player_name}晃动着腰肢，${target_name}被摩擦着的蜜穴逐渐传来了难以忍耐的快感……`,
          ); // :7105
          // CFLAG:TARGET:364  = 3（变量语义：CFLAG 族，TARGET:364） // :7106
          kojo.六九式 = 3; // :7106
        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
          // :7108
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,
          ); // :7109
          await era.printAndWait(
            `『这样明明最舒服了，为什么姐姐还要做出讨厌的表情呢！』`,
          ); // :7110
          await era.printAndWait(
            `「一，一点都不舒服……快放开……我们，我们是姐妹啊……不可以……呜呜呜！」」`,
          ); // :7111
          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364） // :7112
          kojo.六九式 = 2; // :7112
        } // :7113
      } else {
        // :7114

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :7116
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着敏感的蜜穴和阴蒂。`,
          ); // :7117
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好舒服${heart(1)} 和魔王大人……百合${heart(1)} 真的是太棒了啊啊啊${heart(1)} 」`,
          ); // :7118
          await era.printAndWait(
            `${target_name}尽情扭动着腰身，享受着百合之乐……`,
          ); // :7119
          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364） // :7120
          kojo.六九式 = 9; // :7120
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :7122
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          ); // :7123
          await era.printAndWait(
            `「哈啊……哈啊……魔王大人${heart(1)}让人家……当你的百合性奴吧${heart(1)} 嗯啊……啊啊${heart(1)} 」`,
          ); // :7124
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          ); // :7125
          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364） // :7126
          kojo.六九式 = 8; // :7126
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.六九式 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :7128
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体紧贴着，相互摩擦着蜜穴和阴蒂，爱液不住的流出。`,
          ); // :7129
          await era.printAndWait(
            `「嗯啊……啊啊${heart(1)} 好舒服……${heart(1)} 原来……百合……是这么舒服的事情${heart(1)}」`,
          ); // :7130
          await era.printAndWait(
            `${target_name}娇喘着，享受着蜜穴被摩擦传来的阵阵快感……`,
          ); // :7131
          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364） // :7132
          kojo.六九式 = 7; // :7132
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.六九式 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :7134
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着敏感的蜜穴和阴蒂。`,
          ); // :7135
          await era.printAndWait(
            `「呜啊……啊啊${heart(1)} 魔王大人……让，让${target_name}永远当你的百合性奴吧……${heart(1)}」`,
          ); // :7136
          await era.printAndWait(
            `${target_name}尽情扭动着腰身，享受着百合之乐……`,
          ); // :7137
          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364） // :7138
          kojo.六九式 = 6; // :7138
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :7140
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          ); // :7141
          await era.printAndWait(
            `「呜啊……嗯啊啊${heart(1)} 不，不行了……太舒服了${heart(1)} 要，要去了啊啊${heart(1)}」`,
          ); // :7142
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          ); // :7143
          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364） // :7144
          kojo.六九式 = 5; // :7144
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :7146
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着。`,
          ); // :7147
          await era.printAndWait(
            `「呜……嗯啊啊${heart(1)} 和魔王大人……这样摩擦小穴……也好棒啊啊！」`,
          ); // :7148
          await era.printAndWait(
            `${target_name}红着脸，完全沉浸在百合之乐的快感中……`,
          ); // :7149
          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364） // :7150
          kojo.六九式 = 4; // :7150
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :7152
          await era.printAndWait(
            `${player_name}和${target_name}岔开双腿，彼此的下体如同接吻一样紧贴着，借着爱液的润滑相互摩擦着蜜穴和阴蒂。`,
          ); // :7153
          await era.printAndWait(
            `「嗯啊……啊啊……为，为什么……会这么舒服啊啊！」`,
          ); // :7154
          await era.printAndWait(
            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,
          ); // :7155
          // CFLAG:TARGET:364  = 3（变量语义：CFLAG 族，TARGET:364） // :7156
          kojo.六九式 = 3; // :7156
        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
          // :7158
          await era.printAndWait(
            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的小穴相互摩擦起来。`,
          ); // :7159
          await era.printAndWait(`「不，不要！好恶心！放开我啊啊！」`); // :7160
          await era.printAndWait(`${target_name}无力抵抗，只能哭泣着忍受……`); // :7161
          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364） // :7162
          kojo.六九式 = 2; // :7162
        } // :7163
      } // :7164
      return 0; // :7165
    } // :7166
  } // :7167

  // :7179-8814 IF SELECTCOM == 64（3P CFLAG:391）
  if (era_flag.selectcom === 64) {
    // :7179

    if (era_flag.assi > 0 && era_flag.assi !== 17) {
      // :7181-7182
      return 0; // :7181-7182
    } // :7181-7182

    const assi_weapon =
      era_flag.assi > 0 &&
      era0(`talent:${era_flag.assi}:121`) === 0 &&
      era0(`talent:${era_flag.assi}:122`) === 0
        ? '电动假阳具'
        : '阴茎';
    const master_weapon =
      era0(`talent:${MASTER}:121`) === 0 && era0(`talent:${MASTER}:122`) === 0
        ? '电动假阳具'
        : '阴茎';

    if (kojo.三人PLAY === 0) {
      // :7184

      if (era.get(`talent:${target}:0`) === 1) {
        // :7186

        if (assi_mao) {
          // :7188

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7190
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7191
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7192
            if (era.get(`talent:${target}:85`)) {
              // :7193
              await era.printAndWait(`「呜……啊啊……我的处女！」`); // :7194
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7195
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              ); // :7196
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              ); // :7197
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              ); // :7198
            } else if (era.get(`talent:${target}:76`)) {
              // :7199
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              ); // :7200
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7201
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`); // :7202
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              ); // :7203
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7204
            } else {
              // :7205
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7206
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7207
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7208
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7209
            } // :7210
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7212
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7213
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7214
            if (era.get(`talent:${target}:85`)) {
              // :7215
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`); // :7216
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7217
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              ); // :7218
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7219
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              ); // :7220
            } else if (era.get(`talent:${target}:76`)) {
              // :7221
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              ); // :7222
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7223
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              ); // :7224
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7225
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7226
            } else {
              // :7227
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              ); // :7228
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7229
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7230
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7231
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              ); // :7232
            } // :7233
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7235
            if (era.get(`talent:${target}:85`)) {
              // :7236
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              ); // :7237
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7238
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              ); // :7239
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7240
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              ); // :7241
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              ); // :7242
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7243
            } else if (era.get(`talent:${target}:76`)) {
              // :7244
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              ); // :7245
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7246
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              ); // :7247
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7248
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              ); // :7249
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :7250
            } else {
              // :7251
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7252
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7253
              await era.printAndWait(`「不，不要啊啊！」`); // :7254
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :7255
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :7256
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7257
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7258
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7259
            } // :7260
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7262
            if (era.get(`talent:${target}:85`)) {
              // :7263
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              ); // :7264
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7265
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              ); // :7266
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7267
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              ); // :7268
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7269
            } else if (era.get(`talent:${target}:76`)) {
              // :7270
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              ); // :7271
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7272
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              ); // :7273
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7274
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7275
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :7276
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :7277
            } else {
              // :7278
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7279
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :7280
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              ); // :7281
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              ); // :7282
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :7283
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              ); // :7284
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7285
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7286
            } // :7287
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7289
            if (era.get(`talent:${target}:85`)) {
              // :7290
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7291
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              ); // :7292
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              ); // :7293
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              ); // :7294
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7295
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7296
            } else if (era.get(`talent:${target}:76`)) {
              // :7297
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7298
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              ); // :7299
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              ); // :7300
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              ); // :7301
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7302
            } else {
              // :7303
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7304
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7305
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              ); // :7306
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              ); // :7307
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              ); // :7308
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              ); // :7309
            } // :7310
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7312
            if (era.get(`talent:${target}:85`)) {
              // :7313
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7314
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              ); // :7315
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              ); // :7316
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7317
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7318
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              ); // :7319
            } else if (era.get(`talent:${target}:76`)) {
              // :7320
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7321
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              ); // :7322
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              ); // :7323
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7324
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              ); // :7325
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              ); // :7326
            } else {
              // :7327
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7328
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7329
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              ); // :7330
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7331
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              ); // :7332
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              ); // :7333
            } // :7334
          } else {
            // :7335
            await era.printAndWait(`出错了？`); // :7336
          } // :7337
        } else {
          // :7339

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7341
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7342
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7343
            if (era.get(`talent:${target}:85`)) {
              // :7344
              await era.printAndWait(`「呜……啊啊……我的处女！」`); // :7345
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7346
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              ); // :7347
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              ); // :7348
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              ); // :7349
            } else if (era.get(`talent:${target}:76`)) {
              // :7350
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              ); // :7351
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7352
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`); // :7353
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              ); // :7354
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7355
            } else {
              // :7356
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7357
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7358
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7359
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7360
            } // :7361
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7363
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7364
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7365
            if (era.get(`talent:${target}:85`)) {
              // :7366
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`); // :7367
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7368
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              ); // :7369
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7370
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              ); // :7371
            } else if (era.get(`talent:${target}:76`)) {
              // :7372
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              ); // :7373
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7374
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              ); // :7375
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7376
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7377
            } else {
              // :7378
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              ); // :7379
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7380
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7381
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7382
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              ); // :7383
            } // :7384
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7386
            if (era.get(`talent:${target}:85`)) {
              // :7387
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              ); // :7388
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7389
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              ); // :7390
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7391
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              ); // :7392
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              ); // :7393
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7394
            } else if (era.get(`talent:${target}:76`)) {
              // :7395
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              ); // :7396
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7397
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              ); // :7398
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7399
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              ); // :7400
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :7401
            } else {
              // :7402
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7403
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7404
              await era.printAndWait(`「不，不要啊啊！」`); // :7405
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :7406
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :7407
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7408
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7409
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7410
            } // :7411
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7413
            if (era.get(`talent:${target}:85`)) {
              // :7414
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              ); // :7415
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7416
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              ); // :7417
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7418
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              ); // :7419
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7420
            } else if (era.get(`talent:${target}:76`)) {
              // :7421
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              ); // :7422
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7423
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              ); // :7424
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7425
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7426
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :7427
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :7428
            } else {
              // :7429
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7430
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :7431
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              ); // :7432
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              ); // :7433
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :7434
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              ); // :7435
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7436
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7437
            } // :7438
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7440
            if (era.get(`talent:${target}:85`)) {
              // :7441
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7442
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              ); // :7443
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              ); // :7444
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              ); // :7445
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7446
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7447
            } else if (era.get(`talent:${target}:76`)) {
              // :7448
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7449
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              ); // :7450
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              ); // :7451
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              ); // :7452
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7453
            } else {
              // :7454
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7455
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7456
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              ); // :7457
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              ); // :7458
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              ); // :7459
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              ); // :7460
            } // :7461
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7463
            if (era.get(`talent:${target}:85`)) {
              // :7464
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7465
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              ); // :7466
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              ); // :7467
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7468
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7469
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              ); // :7470
            } else if (era.get(`talent:${target}:76`)) {
              // :7471
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7472
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              ); // :7473
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              ); // :7474
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7475
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              ); // :7476
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              ); // :7477
            } else {
              // :7478
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7479
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7480
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              ); // :7481
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7482
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              ); // :7483
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              ); // :7484
            } // :7485
          } else {
            // :7486
          } // :7488
        } // :7489
      } else {
        // :7491

        if (assi_mao) {
          // :7493

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7495
            if (era.get(`talent:${target}:85`)) {
              // :7496
              await era.printAndWait(
                `「不，不行啊啊！这样……两人一起插入什么的……人家会受不了的啊啊啊！」`,
              ); // :7497
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              ); // :7498
              await era.print(
                `『哼，不要得了便宜卖乖啊姐姐，能这样独占魔王大人！绝对不可饶恕！』`,
              ); // :7499
              await era.printAndWait(
                `${assi_name}嫉妒地扭着腰，激烈的侵犯着姐姐的肛门。`,
              ); // :7500
              await era.printAndWait(
                `「呜呜……饶，饶了我吧……屁股……这样会坏掉的啊啊啊！」`,
              ); // :7501
            } else if (era.get(`talent:${target}:76`)) {
              // :7502
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              ); // :7503
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感瞬间淹没了${target_name}。`,
              ); // :7504
              await era.print(
                `『啊啊……姐姐的肛门……夹得这么紧……真的是名器啊啊${heart(1)}』`,
              ); // :7505
              await era.printAndWait(
                `${assi_name}嬉笑着，开始激烈地侵犯着${target_name}的肛门，搅动着直肠的敏感点。`,
              ); // :7506
              await era.printAndWait(
                `「好，好舒服${heart(1)}…… 被两根阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              ); // :7507
            } else {
              // :7508
              await era.printAndWait(
                `「饶，饶了我吧……求求你们了……这样会裂开的，真的会裂开的啊啊！」`,
              ); // :7509
              await era.printAndWait(
                `蜜穴和肛门被同时强行插入，完全不能适应这种玩法的${target_name}惨叫了起来。`,
              ); // :7510
              await era.print(
                `『没关系，马上就会让姐姐舒服起来了哦${heart(1)}』`,
              ); // :7511
              await era.printAndWait(
                `${assi_name}这么说着，边配合着${master_name}的动作，扭着腰开始激烈地侵犯${target_name}的肛门……`,
              ); // :7512
            } // :7513
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7515
            if (era.get(`talent:${target}:85`)) {
              // :7516
              await era.printAndWait(
                `「呜啊啊……这样……两人一起插进来……人家……会受不了的啊啊！」`,
              ); // :7517
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              ); // :7518
              await era.print(
                `『哎呀呀，姐姐的肉穴……实在是太舒服了！舒服得人家完全停不下来啊啊！』`,
              ); // :7519
              await era.printAndWait(
                `${assi_name}舔着嘴唇，开始激烈地侵犯，蹂躏着${target_name}的蜜穴。`,
              ); // :7520
              await era.printAndWait(
                `「咿啊啊啊……屁股……还有小穴……都要被侵犯得一塌糊涂了啊啊啊！」`,
              ); // :7521
            } else if (era.get(`talent:${target}:76`)) {
              // :7522
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              ); // :7523
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感让${target_name}呼吸变得急促了起来，嘴也合不上了。`,
              ); // :7524
              await era.print(
                `『啊啊……姐姐的蜜穴……好紧好舒服${heart(1)} 真的是名器啊啊！』`,
              ); // :7525
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着${target_name}。`,
              ); // :7526
              await era.printAndWait(
                `「好，好舒服${heart(1)}……被两人的阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              ); // :7527
            } else {
              // :7528
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的肛门很适合调教成性器呢${heart(1)}』`,
              ); // :7529
              await era.printAndWait(
                `「不，不可以啊啊啊！这样同时插进来！姐姐真的会坏掉的啊啊！」`,
              ); // :7530
              await era.printAndWait(
                `蜜穴和肛门被同时贯穿的痛苦，让${target_name}的惨叫在调教室里回响着。`,
              ); // :7531
              await era.print(
                `『哎哎，有什么好哭的呢，能被我和魔王大人这样抱在中间侵犯，明明是性奴姐姐的福气才是！给我好好享受起来啊！』`,
              ); // :7532
              await era.printAndWait(
                `${assi_name}舔着嘴唇，坏笑着开始更加激烈地侵犯着${target_name}……`,
              ); // :7533
            } // :7534
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7536
            if (era.get(`talent:${target}:85`)) {
              // :7537
              await era.printAndWait(
                `「唔呣呣……嘴巴里充满了${assi_name}阴茎的味道……呣呣！」`,
              ); // :7538
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              ); // :7539
              await era.print(
                `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎也得到了哦${heart(1)}』`,
              ); // :7540
              await era.printAndWait(
                `身后${master_name}挺着腰，开始持续地侵犯着${target_name}的紧致的蜜穴。`,
              ); // :7541
              await era.printAndWait(
                `「呜啊啊……被，被魔王大人顶到……子宫口了${heart(1)}……唔啊啊……唔呣……唔呣！」`,
              ); // :7542
              await era.printAndWait(
                `${assi_name}也毫不留情地用${assi_weapon}侵犯着姐姐的嘴。`,
              ); // :7543
              await era.print(
                `『不要光顾着享受魔王大人的阴茎，也要好好地给我口交啊！』`,
              ); // :7544
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7545
            } else if (era.get(`talent:${target}:76`)) {
              // :7546
              await era.printAndWait(
                `「哈啊……唔呣……唔呣……这样……好舒服……呣呣${heart(1)}」`,
              ); // :7547
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              ); // :7548
              await era.print(`『嘿嘿，姐姐好像很舒服啊………』`); // :7549
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7550
              await era.printAndWait(
                `「是……是啊……真的很舒服${heart(1)} 被这样同时侵犯着肛门和嘴巴小穴……真是太舒服了啊呣呣${heart(1)}」`,
              ); // :7551
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :7552
            } else {
              // :7553
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7554
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头顶入了蜜穴中。`,
              ); // :7555
              await era.printAndWait(
                `「不，不行啊……这样前后一起侵犯……唔呣呣……呣呣！」`,
              ); // :7556
              await era.printAndWait(
                `无视${target_name}的哀求，${master_name}挺着腰，开始持续侵犯着紧致的蜜穴。`,
              ); // :7557
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :7558
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :7559
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7560
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7561
            } // :7562
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7564
            if (era.get(`talent:${target}:85`)) {
              // :7565
              await era.printAndWait(
                `「唔呣？不，不可以这样同时啊！${assi_name}……稍微等一下……唔呣……唔呣${heart(1)}」`,
              ); // :7566
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              ); // :7567
              await era.print(`『啊啊……姐姐的蜜穴……好舒服啊啊！』`); // :7568
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7569
              await era.printAndWait(
                `「不，不要……顶的这么深啊啊……没有办法……好好给魔王大人……口交了啊唔……呣呣！」`,
              ); // :7570
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7571
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7572
            } else if (era.get(`talent:${target}:76`)) {
              // :7573
              await era.printAndWait(
                `「啊啊……好棒……这样一前一后……同时用蜜穴和嘴巴小穴……侍奉${assi_name}和魔王大人……唔呣……唔呣…${heart(1)}」`,
              ); // :7574
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              ); // :7575
              await era.print(
                `『嘿啊，吸吮着魔王大人的阴茎有那么舒服吗，小穴夹得更紧了啊姐姐♪』`,
              ); // :7576
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7577
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7578
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 3p……好棒……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :7579
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :7580
            } else {
              // :7581
              await era.printAndWait(
                `「唔呣……不，不可以……这样……太，太羞耻了啊啊！」`,
              ); // :7582
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边悲惨地感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :7583
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的嘴巴小穴现在和蜜穴已经没有区别了呢，都变成淫乱性器了！』`,
              ); // :7584
              await era.printAndWait(
                `边嘲笑着${target_name}，${assi_name}边开始毫不留情地侵犯着姐姐的蜜穴。`,
              ); // :7585
              await era.printAndWait(
                `「呜呜！好痛！不要那么激烈……唔呣……唔呣！？」`,
              ); // :7586
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :7587
              await era.printAndWait(
                `『嘿嘿，姐姐给我老实用喉咙小穴和蜜穴同时高潮吧！』`,
              ); // :7588
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7589
            } // :7590
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7592
            if (era.get(`talent:${target}:85`)) {
              // :7593
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7594
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              ); // :7595
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              ); // :7596
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              ); // :7597
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7598
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7599
            } else if (era.get(`talent:${target}:76`)) {
              // :7600
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7601
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              ); // :7602
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              ); // :7603
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              ); // :7604
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7605
            } else {
              // :7606
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7607
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7608
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              ); // :7609
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              ); // :7610
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              ); // :7611
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              ); // :7612
            } // :7613
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7615
            if (era.get(`talent:${target}:85`)) {
              // :7616
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7617
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              ); // :7618
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              ); // :7619
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7620
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7621
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              ); // :7622
            } else if (era.get(`talent:${target}:76`)) {
              // :7623
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7624
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              ); // :7625
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              ); // :7626
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7627
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              ); // :7628
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              ); // :7629
            } else {
              // :7630
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7631
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7632
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              ); // :7633
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7634
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              ); // :7635
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              ); // :7636
            } // :7637
          } else {
            // :7638
            await era.printAndWait(`出错了？`); // :7639
          } // :7640
        } else {
          // :7642

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7644
            if (era.get(`talent:${target}:85`)) {
              // :7645
              await era.printAndWait(
                `「不，不行啊啊！这样……两人一起插入什么的……人家会受不了的啊啊啊！」`,
              ); // :7646
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              ); // :7647
              await era.print(
                `『哼，不要得了便宜卖乖啊姐姐，能这样独占魔王大人！绝对不可饶恕！』`,
              ); // :7648
              await era.printAndWait(
                `${assi_name}嫉妒地扭着腰，激烈的侵犯着姐姐的肛门。`,
              ); // :7649
              await era.printAndWait(
                `「呜呜……饶，饶了我吧……屁股……这样会坏掉的啊啊啊！」`,
              ); // :7650
            } else if (era.get(`talent:${target}:76`)) {
              // :7651
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              ); // :7652
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感瞬间淹没了${target_name}。`,
              ); // :7653
              await era.print(
                `『啊啊……姐姐的肛门……夹得这么紧……真的是名器啊啊${heart(1)}』`,
              ); // :7654
              await era.printAndWait(
                `${assi_name}嬉笑着，开始激烈地侵犯着${target_name}的肛门，搅动着直肠的敏感点。`,
              ); // :7655
              await era.printAndWait(
                `「好，好舒服${heart(1)}…… 被两根阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              ); // :7656
            } else {
              // :7657
              await era.printAndWait(
                `「饶，饶了我吧……求求你们了……这样会裂开的，真的会裂开的啊啊！」`,
              ); // :7658
              await era.printAndWait(
                `蜜穴和肛门被同时强行插入，完全不能适应这种玩法的${target_name}惨叫了起来。`,
              ); // :7659
              await era.print(
                `『没关系，马上就会让姐姐舒服起来了哦${heart(1)}』`,
              ); // :7660
              await era.printAndWait(
                `${assi_name}这么说着，边配合着${master_name}的动作，扭着腰开始激烈地侵犯${target_name}的肛门……`,
              ); // :7661
            } // :7662
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7664
            if (era.get(`talent:${target}:85`)) {
              // :7665
              await era.printAndWait(
                `「呜啊啊……这样……两人一起插进来……人家……会受不了的啊啊！」`,
              ); // :7666
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹夹在中间，拼命忍耐着肛门与蜜穴被同时侵犯的极度快感。`,
              ); // :7667
              await era.print(
                `『哎呀呀，姐姐的肉穴……实在是太舒服了！舒服得人家完全停不下来啊啊！』`,
              ); // :7668
              await era.printAndWait(
                `${assi_name}舔着嘴唇，开始激烈地侵犯，蹂躏着${target_name}的蜜穴。`,
              ); // :7669
              await era.printAndWait(
                `「咿啊啊啊……屁股……还有小穴……都要被侵犯得一塌糊涂了啊啊啊！」`,
              ); // :7670
            } else if (era.get(`talent:${target}:76`)) {
              // :7671
              await era.printAndWait(
                `「哈啊……哈啊${heart(1)} 被魔王大人和${assi_name}的阴茎……一起插进来了${heart(1)}」`,
              ); // :7672
              await era.printAndWait(
                `蜜穴与肛门被同时插入，极度的快感让${target_name}呼吸变得急促了起来，嘴也合不上了。`,
              ); // :7673
              await era.print(
                `『啊啊……姐姐的蜜穴……好紧好舒服${heart(1)} 真的是名器啊啊！』`,
              ); // :7674
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着${target_name}。`,
              ); // :7675
              await era.printAndWait(
                `「好，好舒服${heart(1)}……被两人的阴茎……同时在身体里抽插着${heart(1)}……一下子就要去了啊啊！」`,
              ); // :7676
            } else {
              // :7677
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的肛门很适合调教成性器呢${heart(1)}』`,
              ); // :7678
              await era.printAndWait(
                `「不，不可以啊啊啊！这样同时插进来！姐姐真的会坏掉的啊啊！」`,
              ); // :7679
              await era.printAndWait(
                `蜜穴和肛门被同时贯穿的痛苦，让${target_name}的惨叫在调教室里回响着。`,
              ); // :7680
              await era.print(
                `『哎哎，有什么好哭的呢，能被我和魔王大人这样抱在中间侵犯，明明是性奴姐姐的福气才是！给我好好享受起来啊！』`,
              ); // :7681
              await era.printAndWait(
                `${assi_name}舔着嘴唇，坏笑着开始更加激烈地侵犯着${target_name}……`,
              ); // :7682
            } // :7683
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7685
            if (era.get(`talent:${target}:85`)) {
              // :7686
              await era.printAndWait(
                `「唔呣呣……嘴巴里充满了${assi_name}阴茎的味道……呣呣！」`,
              ); // :7687
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              ); // :7688
              await era.print(
                `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎也得到了哦${heart(1)}』`,
              ); // :7689
              await era.printAndWait(
                `身后${master_name}挺着腰，开始持续地侵犯着${target_name}的紧致的蜜穴。`,
              ); // :7690
              await era.printAndWait(
                `「呜啊啊……被，被魔王大人顶到……子宫口了${heart(1)}……唔啊啊……唔呣……唔呣！」`,
              ); // :7691
              await era.printAndWait(
                `${assi_name}也毫不留情地用${assi_weapon}侵犯着姐姐的嘴。`,
              ); // :7692
              await era.print(
                `『不要光顾着享受魔王大人的阴茎，也要好好地给我口交啊！』`,
              ); // :7693
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7694
            } else if (era.get(`talent:${target}:76`)) {
              // :7695
              await era.printAndWait(
                `「哈啊……唔呣……唔呣……这样……好舒服……呣呣${heart(1)}」`,
              ); // :7696
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢顶入了蜜穴中。`,
              ); // :7697
              await era.print(`『嘿嘿，姐姐好像很舒服啊………』`); // :7698
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7699
              await era.printAndWait(
                `「是……是啊……真的很舒服${heart(1)} 被这样同时侵犯着肛门和嘴巴小穴……真是太舒服了啊呣呣${heart(1)}」`,
              ); // :7700
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :7701
            } else {
              // :7702
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7703
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头顶入了蜜穴中。`,
              ); // :7704
              await era.printAndWait(
                `「不，不行啊……这样前后一起侵犯……唔呣呣……呣呣！」`,
              ); // :7705
              await era.printAndWait(
                `无视${target_name}的哀求，${master_name}挺着腰，开始持续侵犯着紧致的蜜穴。`,
              ); // :7706
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :7707
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :7708
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7709
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7710
            } // :7711
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7713
            if (era.get(`talent:${target}:85`)) {
              // :7714
              await era.printAndWait(
                `「唔呣？不，不可以这样同时啊！${assi_name}……稍微等一下……唔呣……唔呣${heart(1)}」`,
              ); // :7715
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              ); // :7716
              await era.print(`『啊啊……姐姐的蜜穴……好舒服啊啊！』`); // :7717
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7718
              await era.printAndWait(
                `「不，不要……顶的这么深啊啊……没有办法……好好给魔王大人……口交了啊唔……呣呣！」`,
              ); // :7719
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7720
              await era.printAndWait(
                `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7721
            } else if (era.get(`talent:${target}:76`)) {
              // :7722
              await era.printAndWait(
                `「啊啊……好棒……这样一前一后……同时用蜜穴和嘴巴小穴……侍奉${assi_name}和魔王大人……唔呣……唔呣…${heart(1)}」`,
              ); // :7723
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，顶入了敏感的蜜穴中。`,
              ); // :7724
              await era.print(
                `『嘿啊，吸吮着魔王大人的阴茎有那么舒服吗，小穴夹得更紧了啊姐姐♪』`,
              ); // :7725
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7726
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7727
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 3p……好棒……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :7728
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :7729
            } else {
              // :7730
              await era.printAndWait(
                `「唔呣……不，不可以……这样……太，太羞耻了啊啊！」`,
              ); // :7731
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边悲惨地感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :7732
              await era.print(
                `『哎嘿嘿，魔王大人说姐姐的嘴巴小穴现在和蜜穴已经没有区别了呢，都变成淫乱性器了！』`,
              ); // :7733
              await era.printAndWait(
                `边嘲笑着${target_name}，${assi_name}边开始毫不留情地侵犯着姐姐的蜜穴。`,
              ); // :7734
              await era.printAndWait(
                `「呜呜！好痛！不要那么激烈……唔呣……唔呣！？」`,
              ); // :7735
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :7736
              await era.printAndWait(
                `『嘿嘿，姐姐给我老实用喉咙小穴和蜜穴同时高潮吧！』`,
              ); // :7737
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7738
            } // :7739
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7741
            if (era.get(`talent:${target}:85`)) {
              // :7742
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7743
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为${assi_name}口交了啊！」`,
              ); // :7744
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，可是要惩罚的哦』`,
              ); // :7745
              await era.printAndWait(
                `被妹妹的话羞辱得脸红满面的${target_name}只能努力集中精神，吸吮着${assi_name}的${assi_weapon}。`,
              ); // :7746
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7747
              await era.printAndWait(
                `${master_name}欣赏着姐姐努力用嘴巴侍奉着妹妹的样子，更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7748
            } else if (era.get(`talent:${target}:76`)) {
              // :7749
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7750
              await era.printAndWait(
                `「呜啊……啊啊……这样……边口交，边被侵犯着肛门……感觉太棒了啊啊………」`,
              ); // :7751
              await era.printAndWait(
                `${assi_name}用嫉恨的眼神看着边为自己口交，边一脸幸福的表情享受着被魔王大人肛交的${target_name}。`,
              ); // :7752
              await era.print(
                `『哎哎……看姐姐这么享受，我都不知道是该嫉妒姐姐呢还是嫉妒魔王大人？喂，姐姐的嘴巴也不能松懈啊，好好地给人家口交啊！』`,
              ); // :7753
              await era.printAndWait(
                `${assi_name}的话让${master_name}更加兴奋的蹂躏，侵犯着${target_name}的肛门……`,
              ); // :7754
            } else {
              // :7755
              await era.printAndWait(
                `${target_name}被强制边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，用勃起的阴茎插入了肛门中。`,
              ); // :7756
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7757
              await era.print(
                `『哎呀，姐姐的屁股那么舒服吗？怎么肛门一被魔王大人插进去，嘴巴和舌头就不会动了呢！给我好好口交啊！』`,
              ); // :7758
              await era.printAndWait(
                `${assi_name}哼了一声，用${assi_weapon}开始侵犯，抽插着姐姐的嘴和喉咙。`,
              ); // :7759
              await era.print(
                `『哼，能被我们3p，是姐姐你的福气，再这样一脸不高兴，魔王大人可就真的要不高兴了哦？』`,
              ); // :7760
              await era.printAndWait(
                `${assi_name}的表情和语气让${master_name}忍不住笑了起来……`,
              ); // :7761
            } // :7762
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7764
            if (era.get(`talent:${target}:85`)) {
              // :7765
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7766
              await era.printAndWait(
                `「呜啊啊……不，不行啊……这样侵犯着……屁股……没有办法好好为魔王大人口交了啊！」`,
              ); // :7767
              await era.print(
                `『哎哎，姐姐别让魔王大人失望啊，连边被侵犯肛门边口交都做不好的话，证明还缺乏调教啊${heart(1)}』`,
              ); // :7768
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7769
              await era.printAndWait(
                `「我，我会……努力的……唔呣……唔呣${heart(1)}呣呣……不，不行了……屁股好舒服${heart(1)}」`,
              ); // :7770
              await era.printAndWait(
                `${target_name}集中精神，忍耐着肛门的快感，努力吸吮着${master_name}的阴茎…`,
              ); // :7771
            } else if (era.get(`talent:${target}:76`)) {
              // :7772
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7773
              await era.printAndWait(
                `「呜……呜啊啊……这样……太激烈了${heart(1)} 但是……好舒服……唔呣呣……唔唔${heart(1)}」`,
              ); // :7774
              await era.print(
                `『哎呀呀，边被侵犯着肛门，边这么兴奋地吸着魔王大人的阴茎……姐姐真是变成淫乱便器了呢！』`,
              ); // :7775
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7776
              await era.printAndWait(
                `「不，不行了……舒服得……已经没法思考了……也没办法……好好口交了……只能，只能让魔王大人自己……动了${heart(1)}」`,
              ); // :7777
              await era.printAndWait(
                `肛交的极度快感让${target_name}几乎无法集中精神，吸吮${master_name}阴茎的动作也停了下来……`,
              ); // :7778
            } else {
              // :7779
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，坚挺的${assi_weapon}插入了肛门中。`,
              ); // :7780
              await era.printAndWait(
                `「不，不要啊……饶了我吧……求求你们了……唔唔……唔呣呣？！」`,
              ); // :7781
              await era.print(
                `『哎嘿嘿，这样明明很舒服才对，边被侵犯肛门，边吸吮魔王大人的阴茎，不是吗，姐姐♪』`,
              ); // :7782
              await era.printAndWait(
                `${assi_name}边嘲笑着${target_name}，边前后动着腰，更激烈地侵犯着姐姐的肛门。`,
              ); // :7783
              await era.print(
                `『唔哇哇……姐姐的肛门夹得这么紧……真的是名器啊！』`,
              ); // :7784
              await era.printAndWait(
                `痛苦万分，又无力违抗的${target_name}只能边忍受着，边努力吸吮着的${master_name}的阴茎……`,
              ); // :7785
            } // :7786
          } else {
            // :7787
          } // :7789
        } // :7790
      } // :7791
      // CFLAG:TARGET:391  = 1（变量语义：CFLAG 族，TARGET:391） // :7792
      kojo.三人PLAY = 1; // :7792
      return 0; // :7793
    } else {
      // :7795

      if (assi_mao) {
        // :7797

        if (era.get(`talent:${target}:0`) === 1) {
          // :7799

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7801
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7802
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7803
            if (era.get(`talent:${target}:85`)) {
              // :7804
              await era.printAndWait(`「呜……啊啊……我的处女！」`); // :7805
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7806
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              ); // :7807
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              ); // :7808
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              ); // :7809
            } else if (era.get(`talent:${target}:76`)) {
              // :7810
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              ); // :7811
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7812
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`); // :7813
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              ); // :7814
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7815
            } else {
              // :7816
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7817
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7818
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7819
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :7820
            } // :7821
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7823
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            ); // :7824
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :7825
            if (era.get(`talent:${target}:85`)) {
              // :7826
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`); // :7827
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :7828
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              ); // :7829
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7830
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              ); // :7831
            } else if (era.get(`talent:${target}:76`)) {
              // :7832
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              ); // :7833
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :7834
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              ); // :7835
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :7836
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :7837
            } else {
              // :7838
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              ); // :7839
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :7840
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :7841
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :7842
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              ); // :7843
            } // :7844
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7846
            if (era.get(`talent:${target}:85`)) {
              // :7847
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              ); // :7848
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7849
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              ); // :7850
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7851
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              ); // :7852
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              ); // :7853
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7854
            } else if (era.get(`talent:${target}:76`)) {
              // :7855
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              ); // :7856
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7857
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              ); // :7858
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7859
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              ); // :7860
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :7861
            } else {
              // :7862
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7863
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7864
              await era.printAndWait(`「不，不要啊啊！」`); // :7865
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :7866
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :7867
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7868
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7869
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7870
            } // :7871
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :7873
            if (era.get(`talent:${target}:85`)) {
              // :7874
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              ); // :7875
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7876
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              ); // :7877
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7878
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              ); // :7879
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :7880
            } else if (era.get(`talent:${target}:76`)) {
              // :7881
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              ); // :7882
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :7883
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              ); // :7884
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :7885
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :7886
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :7887
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :7888
            } else {
              // :7889
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :7890
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :7891
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              ); // :7892
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              ); // :7893
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :7894
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              ); // :7895
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :7896
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :7897
            } // :7898
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :7900
            if (era.get(`talent:${target}:85`)) {
              // :7901

              if (chara(target).system.肛门感觉 >= 3) {
                // :7903
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！」`,
                ); // :7904
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！』`,
                ); // :7905
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                ); // :7906
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                ); // :7907
                await era.printAndWait(
                  `${target_name}顺从地吸吮着${assi_name}的${assi_weapon}，边让${master_name}侵犯着自己敏感的肛门………`,
                ); // :7908
              } else {
                // :7909
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :7910
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪』`,
                ); // :7911
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                ); // :7912
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :7913
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的羞耻姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                ); // :7914
              } // :7915
            } else if (era.get(`talent:${target}:76`)) {
              // :7916

              if (chara(target).system.肛门感觉 >= 3) {
                // :7918
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                ); // :7919
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                ); // :7920
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                ); // :7921
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :7922
              } else {
                // :7923
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                ); // :7924
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                ); // :7925
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                ); // :7926
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :7927
              } // :7928
            } else {
              // :7929

              if (chara(target).system.肛门感觉 >= 3) {
                // :7931
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :7932
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                ); // :7933
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                ); // :7934
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                ); // :7935
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着。`,
                ); // :7936
              } else {
                // :7937
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :7938
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                ); // :7939
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                ); // :7940
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着。`,
                ); // :7941
              } // :7942
            } // :7943
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7945
            if (era.get(`talent:${target}:85`)) {
              // :7946

              if (chara(target).system.肛门感觉 >= 3) {
                // :7948
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣？！……唔唔……呣呣呣${heart(1)} 」`,
                ); // :7949
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                ); // :7950
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                ); // :7951
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                ); // :7952
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                ); // :7953
              } else {
                // :7954
                await era.printAndWait(
                  `「呜……啊啊啊，不，不可以啊……这样被侵犯屁股的话……没有办法……好好为魔王大人口交了唔呣呣！」`,
                ); // :7955
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                ); // :7956
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                ); // :7957
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :7958
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                ); // :7959
              } // :7960
            } else if (era.get(`talent:${target}:76`)) {
              // :7961

              if (chara(target).system.肛门感觉 >= 3) {
                // :7963
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                ); // :7964
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                ); // :7965
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                ); // :7966
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :7967
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                ); // :7968
              } else {
                // :7969
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                ); // :7970
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                ); // :7971
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                ); // :7972
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                ); // :7973
                await era.printAndWait(
                  `被${target_name}不知廉耻的宣言刺激得更加兴奋的${assi_name}和${master_name}，更加激烈地侵犯，抽插着${target_name}的喉咙和肛门……`,
                ); // :7974
              } // :7975
            } else {
              // :7976

              if (chara(target).system.肛门感觉 >= 3) {
                // :7978
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣……啊啊啊」`,
                ); // :7979
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                ); // :7980
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                ); // :7981
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                ); // :7982
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                ); // :7983
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                ); // :7984
              } else {
                // :7985
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :7986
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                ); // :7987
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                ); // :7988
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                ); // :7989
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                ); // :7990
              } // :7991
            } // :7992
          } else {
            // :7993
          } // :7995
        } else {
          // :7997

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :7999
            if (era.get(`talent:${target}:85`)) {
              // :8000

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8002
                await era.printAndWait(
                  `「请，请尽情地侵犯${target_name}的小穴吧……魔王大人${heart(1)} 什么……${assi_name}也要一起么……当，当然可以……」`,
                ); // :8003
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                ); // :8004
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门……完全变成性器了呢！』`,
                ); // :8005
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                ); // :8006
                await era.printAndWait(
                  `「呜呜……啊啊啊……不，不行了……舒服得已经没有办法思考了……魔王大人，还有${assi_name}……请尽情地把${target_name}侵犯得一塌糊涂吧啊啊啊！」`,
                ); // :8007
              } else {
                // :8008
                await era.printAndWait(
                  `「哎哎？要，要两个人一起吗……是叫做三明治什么的玩法吗${heart(1)}」`,
                ); // :8009
                await era.printAndWait(
                  `被夹在中间同时侵犯着肛门和蜜穴，${target_name}只能拼命忍耐着强烈的快感。`,
                ); // :8010
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门好紧好舒服……真的有成为名器的潜质呢！』`,
                ); // :8011
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8012
                await era.printAndWait(
                  `「呜……啊啊……不，不可以这么激烈啊……会，会坏掉的${heart(1)}！」`,
                ); // :8013
              } // :8014
            } else if (era.get(`talent:${target}:76`)) {
              // :8015

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8017
                await era.printAndWait(
                  `「哎哎，要两人一起上？其实人家早已经等不及了啦${heart(1)}」`,
                ); // :8018
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                ); // :8019
                await era.print(
                  `『哎哎，姐姐真是贪心啊，居然一次要两人才能满足！』`,
                ); // :8020
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                ); // :8021
                await era.printAndWait(
                  `「好，好舒服……太舒服了${heart(1)}都怪你们，把姐姐调教得……不做爱就活不下去了啊啊啊${heart(1)}」`,
                ); // :8022
              } else {
                // :8023
                await era.printAndWait(
                  `「哎哎……被，被两人的阴茎这样一起侵犯……呜啊啊${heart(1)}」`,
                ); // :8024
                await era.printAndWait(
                  `肛门和蜜穴被同时插入让${target_name}发出了灼热的呻吟。`,
                ); // :8025
                await era.print(
                  `『哎嘿嘿，姐姐的淫乱肛门好紧啊，有继续开发的必要呢！魔王大人，让我们一起把姐姐的前后两穴都弄得乱七八糟吧${heart(1)}』`,
                ); // :8026
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8027
                await era.printAndWait(
                  `「嗯啊……啊啊啊……请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                ); // :8028
              } // :8029
            } else {
              // :8030

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8032
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜……可，可是……好舒服……真的好舒服啊啊」`,
                ); // :8033
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                ); // :8034
                await era.print(
                  `『哎嘿嘿，姐姐准备好了吗，接下来才是开始呢！』`,
                ); // :8035
                await era.printAndWait(
                  `${assi_name}舔着嘴唇，动起腰，开始和${master_name}一同激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8036
                await era.printAndWait(
                  `「太，太激烈了……姐姐会……会坏掉的啊啊……！」`,
                ); // :8037
              } else {
                // :8038
                await era.printAndWait(
                  `「两，两个人一起……不，不可以啊……那，那样会坏掉的……真的会坏掉的！」`,
                ); // :8039
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                ); // :8040
                await era.print(
                  `『加油啊姐姐，在你在两穴同时高潮之前，我们可是不会停下的哦♪』`,
                ); // :8041
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的肛门………`,
                ); // :8042
              } // :8043
            } // :8044
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8046
            if (era.get(`talent:${target}:85`)) {
              // :8047

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8049
                await era.printAndWait(
                  `「嗯啊啊……魔，魔王大人……这样激烈地侵犯着……我的肛门${heart(1)}小穴……也被${assi_name}一起侵犯了……感觉好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                ); // :8050
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着爱液泛滥的蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下甘甜的娇喘。`,
                ); // :8051
                await era.print(
                  `『呜哇啊，性奴姐姐的小穴已经被魔王大人开发的……这么棒了！』`,
                ); // :8052
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺起腰，激烈地侵犯着${target_name}的蜜穴。`,
                ); // :8053
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……好舒服……好舒服啊啊${heart(1)} 这样被同时侵犯着……一下子……就要去了啊啊${heart(1)}」`,
                ); // :8054
              } else {
                // :8055
                await era.printAndWait(
                  `「请，请稍微温柔一点……拜托了……还有${assi_name}…不要兴奋成那个样子啊！」`,
                ); // :8056
                await era.printAndWait(
                  `话音未落，${assi_name}已经迫不及待地插入了姐姐的蜜穴之中。`,
                ); // :8057
                await era.print(
                  `『哼哼，温柔，别开玩笑了！我和魔王大人今天就是打算把姐姐侵犯到彻底坏掉的呀！』`,
                ); // :8058
                await era.printAndWait(
                  `${assi_name}坏笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8059
                await era.printAndWait(
                  `「呜啊啊……太，太激烈了……感，感觉好奇怪……整个人……都要变得奇怪了啊啊！」`,
                ); // :8060
              } // :8061
            } else if (era.get(`talent:${target}:76`)) {
              // :8062

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8064
                await era.printAndWait(
                  `「哈啊……哈啊……两人的阴茎……一起在身体里${heart(1)}……感觉实在是太棒了啊啊啊${heart(1)}」`,
                ); // :8065
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                ); // :8066
                await era.print(
                  `『给我用屁股和小穴同时高潮吧，淫乱的性奴姐姐！』`,
                ); // :8067
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8068
                await era.printAndWait(
                  `「呜啊……嗯啊啊……好舒服……实在是太舒服了${heart(1)} 真的要……高潮得……一塌糊涂了啊啊啊${heart(1)}」`,
                ); // :8069
              } else {
                // :8070
                await era.printAndWait(
                  `「咦咦，要两个人一起上吗……好，好吧。其实还有点……期待呢${heart(1)}」`,
                ); // :8071
                await era.printAndWait(
                  `蜜穴和肛门被同时插入，${target_name}忍不住灼热地呻吟了起来。`,
                ); // :8072
                await era.print(
                  `『呼呼，姐姐的淫乱小穴……属于人家的啦啦啦！给我高潮吧！』`,
                ); // :8073
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8074
                await era.printAndWait(
                  `「呜……呜啊啊${heart(1)} ${assi_name}！魔王大人！请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                ); // :8075
              } // :8076
            } else {
              // :8077

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8079
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜，可，可是……为什么……感觉好舒服${heart(1)}…」`,
                ); // :8080
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下灼热的呻吟。`,
                ); // :8081
                await era.print(
                  `『嘴上说着不行，下面已经夹得这么紧了！被两人同时侵犯，更兴奋了吗，我的变态姐姐！』`,
                ); // :8082
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8083
                await era.printAndWait(
                  `「才，才不是……变态！呜……呜啊啊${heart(1)}……可，可是……真的好舒服……舒服得……不行了啊啊啊！」`,
                ); // :8084
              } else {
                // :8085
                await era.printAndWait(
                  `「放，放开我啊……两个人一起……这种事情……怎么可以啊啊啊！」`,
                ); // :8086
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                ); // :8087
                await era.print(
                  `『说什么呢姐姐，我们可是打算侵犯到姐姐两个淫穴一起高潮呢♪』`,
                ); // :8088
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的蜜穴………`,
                ); // :8089
              } // :8090
            } // :8091
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8093
            if (era.get(`talent:${target}:85`)) {
              // :8094

              if (chara(target).system.私处感觉 >= 3) {
                // :8096
                await era.printAndWait(
                  `「呜……呜啊啊……这样边被魔王大人……侵犯着${heart(1)} ……边口交……感觉${assi_name}的阴茎……更加美味了啊啊啊${heart(1)} 唔呣……唔呣……唔唔唔♪」`,
                ); // :8097
                await era.printAndWait(
                  `被${master_name}抽插着爱液泛滥的蜜穴、${target_name}更加兴奋不已地舔吮着妹妹的阴茎。`,
                ); // :8098
                await era.print(
                  `『嘿嘿，被我和魔王大人一起侵犯，身为性奴的姐姐一定感觉很幸福吧？』`,
                ); // :8099
                await era.printAndWait(
                  `${target_name}满脸通红地边点头，边继续努力地为妹妹口交着。`,
                ); // :8100
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}…… 的，的确是这样啊啊……能被魔王大人和${assi_name}这样疼爱……真的是太幸福了${heart(1)} 」`,
                ); // :8101
              } else {
                // :8102
                await era.printAndWait(
                  `「唔呣……唔呣……${assi_name}的阴茎……味道好好……好喜欢${heart(1)} 还有……魔王大人，请吧……人家已经准备好了${heart(1)}」`,
                ); // :8103
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，撅起的臀部一扭一扭地诱惑着${master_name}。`,
                ); // :8104
                await era.print(
                  `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎要进来了哦${heart(1)}』`,
                ); // :8105
                await era.printAndWait(
                  `${master_name}挺起腰，开始侵犯着${target_name}已经爱液泛滥的蜜穴。`,
                ); // :8106
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……魔王大人……一下子就顶到最里面了……好厉害啊啊啊${heart(1)}！」`,
                ); // :8107
                await era.printAndWait(
                  `${assi_name}也抱着${target_name}的脸，用阴茎顶着姐姐的口腔。`,
                ); // :8108
                await era.print(
                  `『不要光顾着享受，嘴巴也要好好地给我吸吮啊！』`,
                ); // :8109
                await era.printAndWait(
                  `${target_name}就这样被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                ); // :8110
              } // :8111
            } else if (era.get(`talent:${target}:76`)) {
              // :8112

              if (chara(target).system.私处感觉 >= 3) {
                // :8114
                await era.printAndWait(
                  `「呜……啊啊啊……蜜穴……被魔王大人的阴茎……塞得满满的${heart(1)} 这样……边做爱……边口交……实在是太舒服了啊唔唔……唔呣……唔呣${heart(1)}」`,
                ); // :8115
                await era.print(
                  `『呜哇哇……姐姐在被魔王大人侵犯的时候……口交居然比平时还厉害了${heart(1)}』`,
                ); // :8116
                await era.printAndWait(
                  `${assi_name}感受着姐姐激烈地吸吮着自己的阴茎，忍不住也呻吟了起来。`,
                ); // :8117
                await era.printAndWait(
                  `「啊啊啊……魔王大人……更加激烈地侵犯……${target_name}的淫穴吧${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :8118
                await era.printAndWait(
                  `${target_name}含糊不清地娇喘着，享受着心理和生理的双重快感……`,
                ); // :8119
              } else {
                // :8120
                await era.printAndWait(
                  `「呜啊啊……在，在人家口交的时候……侵犯小穴……魔王大人……太狡猾了${heart(1)}」`,
                ); // :8121
                await era.printAndWait(
                  `在${target_name}吸吮着自己妹妹的阴茎的时候，${master_name}趁机抱住了${target_name}的腰，将龟头抵入了蜜穴中。`,
                ); // :8122
                await era.print(
                  `『哎嘿嘿，姐姐一会儿享受的时候，嘴巴记得不要停下来哦♪』`,
                ); // :8123
                await era.printAndWait(
                  `${master_name}挺着腰，开始激烈地侵犯着${target_name}爱液泛滥的蜜穴。`,
                ); // :8124
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 不，不行了……这样……太舒服了啊啊啊${heart(1)}」`,
                ); // :8125
                await era.print(`『啊啊……姐姐的口交……太厉害了……好舒服啊啊！』`); // :8126
                await era.print(
                  `被两人的阴茎一前一后侵犯着的${target_name}，因为心里和生理的双重快感而含糊不清地呻吟着………`,
                ); // :8127
              } // :8128
            } else {
              // :8129

              if (chara(target).system.私处感觉 >= 3) {
                // :8131
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                ); // :8132
                await era.printAndWait(
                  `敏感的小穴被${master_name}肆意地抽插着，${target_name}只能拼命忍耐着快感，同时还要努力为妹妹口交。`,
                ); // :8133
                await era.print(
                  `『哎嘿嘿，姐姐真不错呢，被魔王大人插得那么舒服，嘴巴还没有松懈♪』`,
                ); // :8134
                await era.printAndWait(
                  `边嘲弄着${target_name}，${assi_name}边用阴茎继续侵犯着姐姐的喉咙。`,
                ); // :8135
                await era.printAndWait(
                  `「唔呣呣……唔呣呣……太，太激烈了${heart(1)}…呜啊啊……被魔王大人……顶到子宫口了唔呣呣呣！」`,
                ); // :8136
                await era.printAndWait(
                  `蜜穴传来的极度快感让${target_name}几乎无法思考………`,
                ); // :8137
              } else {
                // :8138
                await era.printAndWait(
                  `「不，不可以在口交的时候……侵犯小穴啊……唔呣呣……呣呣……」`,
                ); // :8139
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，蜜穴突然被侵犯，一时惊慌失措。`,
                ); // :8140
                await era.print(
                  `『别光顾着享受啊，笨蛋姐姐，给我好好口交啊！』`,
                ); // :8141
                await era.printAndWait(
                  `「不，不行啊……这样的事情……呜呜……唔呣！？」`,
                ); // :8142
                await era.printAndWait(
                  `${assi_name}不满地抓着${target_name}的头发，用勃起的阴茎强行侵犯着姐姐的喉咙`,
                ); // :8143
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
                ); // :8144
              } // :8145
            } // :8146
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8148

            if (era.get(`talent:${target}:85`)) {
              // :8150

              if (chara(target).system.私处感觉 >= 3) {
                // :8152
                await era.printAndWait(
                  `「唔呣呣？在……在口交的时候……侵犯小穴……感觉……好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                ); // :8153
                await era.printAndWait(
                  `${target_name}一边被妹妹侵犯着，一边把脸埋在${master_name}双腿之间，努力地吸吮着阴茎。`,
                ); // :8154
                await era.print(
                  `『哎嘿嘿，姐姐不知不觉之间已经完全适应性奴的身份了呢${heart(1)}』`,
                ); // :8155
                await era.printAndWait(
                  `${assi_name}带着享受的表情，激烈地侵犯着${target_name}的蜜穴。`,
                ); // :8156
                await era.printAndWait(
                  `「呜……呣呣……不，不要对姐姐恶作剧了啦……没有办法好好……为魔王大人口交了${heart(1)} 对，对不起……魔王大人……因为实在是太舒服了${heart(1)}我，我会努力的……咕呣……咕呣……呣呣呣」`,
                ); // :8157
                await era.printAndWait(
                  `${target_name}自己积极的寻求着阴茎、被${master_name}和${assi_name}前后一起侵犯着………`,
                ); // :8158
              } else {
                // :8159
                await era.printAndWait(
                  `「不，不可以……在这个时候……侵犯小穴啊……会没有办法好好为魔王大人口交的！」`,
                ); // :8160
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了蜜穴之中。`,
                ); // :8161
                await era.print(
                  `『其实人家还有点嫉妒姐姐呢，能同时享受两根阴茎……唔哇哇……姐姐的小穴好紧好舒服♪』`,
                ); // :8162
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8163
                await era.printAndWait(
                  `「呜……呜啊啊……不，不能顶得这么深……唔呣呣……这样……边口交边被侵犯……感觉……整个人都要变得奇怪了啊啊——唔呣……呣呣呣……呣呣♪」`,
                ); // :8164
                await era.printAndWait(
                  `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                ); // :8165
              } // :8166
            } else if (era.get(`talent:${target}:76`)) {
              // :8167

              if (chara(target).system.私处感觉 >= 3) {
                // :8169
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}……这样……边口交……边被侵犯小穴……感觉……太舒服了啊啊啊${heart(1)}」`,
                ); // :8170
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了爱液泛滥的敏感蜜穴之中。`,
                ); // :8171
                await era.print(
                  `『唔哇哇……原来姐姐已经变得这么淫乱了……魔王大人真是调教有方啊！』`,
                ); // :8172
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8173
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                ); // :8174
                await era.printAndWait(
                  `「唔呣呣？！唔呣……唔呣……好，好舒服${heart(1)}……舒服得……已经没有办法思考了啊呣呣……呣呣${heart(1)}」`,
                ); // :8175
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
                ); // :8176
              } else {
                // :8177
                await era.printAndWait(
                  `「呜啊啊……要边口交边被侵犯小穴了……好期待${heart(1)}」`,
                ); // :8178
                await era.printAndWait(
                  `正在为${assi_name}口交的${master_name}，撅起的臀部一扭一扭地诱惑着${target_name}。`,
                ); // :8179
                await era.print(
                  `『看来姐姐已经准备好了呢……接下来就是要侵犯到姐姐失神为止喽！！』`,
                ); // :8180
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8181
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                ); // :8182
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 这样好舒服……比想象中的还要舒服啊啊……呣呣……呣呣${heart(1)}」`,
                ); // :8183
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在难以言喻的快感中颤抖着……`,
                ); // :8184
              } // :8185
            } else {
              // :8186

              if (chara(target).system.私处感觉 >= 3) {
                // :8188
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                ); // :8189
                await era.printAndWait(
                  `${target_name}嘴里含着${master_name}的阴茎，拼命忍耐着被${assi_name}从身后侵犯的强烈快感。`,
                ); // :8190
                await era.print(
                  `『不能光顾享受啊姐姐，要好好用你的淫乱嘴巴小穴服务魔王大人，听到了没！』`,
                ); // :8191
                await era.printAndWait(
                  `「对，对不起……我，我会好好用嘴巴做的……唔呣……唔呣……唔唔！」`,
                ); // :8192
                await era.printAndWait(
                  `不耐烦的${master_name}抓着${target_name}的头发，将阴茎顶到了喉咙深处，肆意抽插着。`,
                ); // :8193
                await era.print(
                  `『哼，魔王大人已经不满意了，做好受惩罚的觉悟吧笨蛋姐姐！』`,
                ); // :8194
                await era.printAndWait(
                  `${target_name}泪流满面，却又无可奈何地忍耐着两人的侵犯和肆虐………`,
                ); // :8195
              } else {
                // :8196
                await era.printAndWait(
                  `「呜呜呜……求求你们了……饶了我吧……真的……唔呣呣？！呣呣……唔呣……」`,
                ); // :8197
                await era.printAndWait(
                  `对${target_name}的求饶无动于衷，${assi_name}和${master_name}开始一前一后，毫不留情地侵犯着${target_name}。`,
                ); // :8198
                await era.print(
                  `『啊哈哈……魔王大人好像很喜欢姐姐的淫乱嘴巴小穴呢♪』`,
                ); // :8199
                await era.printAndWait(
                  `「饶，饶了我吧……不能呼吸了……唔呣……呣呣……呣呣……」`,
                ); // :8200
                await era.printAndWait(
                  `${master_name}不满地抓着${target_name}的头发，用勃起的阴茎强行在喉咙里抽插着`,
                ); // :8201
                await era.print(
                  `『哎嘿，姐姐的喉咙小穴被魔王大人塞满了呢，人家有点嫉妒呢！』`,
                ); // :8202
                await era.printAndWait(
                  `${target_name}怎么挣扎都无法挣脱，只能泪流满面地任由两人激烈地侵犯着自己……`,
                ); // :8203
              } // :8204
            } // :8205
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8207
            if (era.get(`talent:${target}:85`)) {
              // :8208

              if (chara(target).system.肛门感觉 >= 3) {
                // :8210
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8211
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                ); // :8212
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                ); // :8213
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                ); // :8214
                await era.printAndWait(
                  `${target_name}拼命忍耐着快感，继续努力地吸吮着${assi_name}的${assi_weapon}………`,
                ); // :8215
              } else {
                // :8216
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8217
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                ); // :8218
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                ); // :8219
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8220
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                ); // :8221
              } // :8222
            } else if (era.get(`talent:${target}:76`)) {
              // :8223

              if (chara(target).system.肛门感觉 >= 3) {
                // :8225
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                ); // :8226
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                ); // :8227
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                ); // :8228
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8229
              } else {
                // :8230
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                ); // :8231
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                ); // :8232
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                ); // :8233
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8234
              } // :8235
            } else {
              // :8236

              if (chara(target).system.肛门感觉 >= 3) {
                // :8238
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8239
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                ); // :8240
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                ); // :8241
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                ); // :8242
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                ); // :8243
              } else {
                // :8244
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8245
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                ); // :8246
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                ); // :8247
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                ); // :8248
              } // :8249
            } // :8250
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :8252
            if (era.get(`talent:${target}:85`)) {
              // :8253

              if (chara(target).system.肛门感觉 >= 3) {
                // :8255
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                ); // :8256
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                ); // :8257
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                ); // :8258
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                ); // :8259
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                ); // :8260
              } else {
                // :8261
                await era.printAndWait(
                  `「呜……啊啊……不，不可以……在这个时候插进来啊啊${heart(1)} 没有办法……好好为魔王大人口交了……唔呣……唔呣……呜啊啊啊」`,
                ); // :8262
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                ); // :8263
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                ); // :8264
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8265
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                ); // :8266
              } // :8267
            } else if (era.get(`talent:${target}:76`)) {
              // :8268

              if (chara(target).system.肛门感觉 >= 3) {
                // :8270
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                ); // :8271
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                ); // :8272
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                ); // :8273
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :8274
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                ); // :8275
              } else {
                // :8276
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                ); // :8277
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                ); // :8278
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                ); // :8279
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                ); // :8280
                await era.printAndWait(
                  `${assi_name}兴奋不已地抓着${target_name}的腰，更加激烈地侵犯着姐姐的肛门，强烈的快感让${target_name}更加忘我地为${master_name}口交着……`,
                ); // :8281
              } // :8282
            } else {
              // :8283

              if (chara(target).system.肛门感觉 >= 3) {
                // :8285
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8286
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                ); // :8287
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                ); // :8288
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                ); // :8289
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                ); // :8290
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                ); // :8291
              } else {
                // :8292
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8293
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                ); // :8294
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                ); // :8295
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                ); // :8296
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                ); // :8297
              } // :8298
            } // :8299
          } else {
            // :8300
          } // :8302
        } // :8303
        return 0; // :8304
      } else {
        // :8305

        if (era.get(`talent:${target}:0`) === 1) {
          // :8307

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :8309
            await era.printAndWait(
              `${master_name}毫不留情地夺走了${target_name}的处女`,
            ); // :8310
            await era.printAndWait(
              `${assi_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :8311
            if (era.get(`talent:${target}:85`)) {
              // :8312
              await era.printAndWait(`「呜……啊啊……我的处女！」`); // :8313
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :8314
              await era.print(
                `『啊啊……姐姐的肛门……太舒服了，舒服得我的小鸡鸡停不下来了啦！』`,
              ); // :8315
              await era.printAndWait(
                `${assi_name}舔着嘴唇，激烈地侵犯着姐姐的后庭。`,
              ); // :8316
              await era.printAndWait(
                `「啊啊……这样被夹击……一下子……就要去了啊啊啊！」`,
              ); // :8317
            } else if (era.get(`talent:${target}:76`)) {
              // :8318
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)}」`,
              ); // :8319
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :8320
              await era.print(`『嘿嘿，姐姐，处女三明治的感觉如何啊？』`); // :8321
              await era.printAndWait(
                `${assi_name}嬉笑着，用阴茎激烈地侵犯着${target_name}的后庭。`,
              ); // :8322
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :8323
            } else {
              // :8324
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :8325
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :8326
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :8327
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的后庭。`,
              ); // :8328
            } // :8329
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8331
            await era.printAndWait(
              `${assi_name}毫不留情地夺走了${target_name}的处女`,
            ); // :8332
            await era.printAndWait(
              `${master_name}也兴奋不已地同时侵犯了${target_name}的肛门。`,
            ); // :8333
            if (era.get(`talent:${target}:85`)) {
              // :8334
              await era.printAndWait(`「呜啊啊……我，我的第一次……啊啊啊！」`); // :8335
              await era.printAndWait(
                `${target_name}被${master_name}和妹妹抱着夹在中间，破处的痛苦和前后两穴同时传来的快感交织在一起。`,
              ); // :8336
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴！』`,
              ); // :8337
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :8338
              await era.printAndWait(
                `「嗯啊……那样……被两人同时侵犯……会不行的啊啊啊！」`,
              ); // :8339
            } else if (era.get(`talent:${target}:76`)) {
              // :8340
              await era.printAndWait(
                `「呜啊啊……两人的阴茎……这样同时插进来${heart(1)} 好……好奇怪的感觉啊啊${heart(1)}」`,
              ); // :8341
              await era.printAndWait(
                `${target_name}感受着肛门和处女蜜穴同时被插入的异样快感。`,
              ); // :8342
              await era.print(
                `『啊啊啊姐姐的第一次，归我了！！${assi_name}好高兴，好高兴${heart(1)}』`,
              ); // :8343
              await era.printAndWait(
                `${assi_name}带着兴奋的表情，开始激烈地侵犯着着姐姐的处女蜜穴。`,
              ); // :8344
              await era.printAndWait(
                `「好舒服……这样好舒服${heart(1)}被魔王大人和${assi_name}的阴茎……同时在身体里搅动着${heart(1)}」`,
              ); // :8345
            } else {
              // :8346
              await era.print(
                `『啊啊啊姐姐的处女蜜穴……真是紧的让人无法忍受啊！』`,
              ); // :8347
              await era.printAndWait(
                `「不，不行啊啊啊……要裂开了……真的会裂开的啊啊啊！」`,
              ); // :8348
              await era.printAndWait(
                `处女蜜穴和肛门被同时贯穿的痛苦，让${target_name}的哀叫在调教室里回响着。`,
              ); // :8349
              await era.print(
                `『别瞎喊了姐姐，吵死人了，学会好好享受我和魔王大人的阴茎吧，以后还要很多次的哦！』`,
              ); // :8350
              await era.printAndWait(
                `${assi_name}舔着嘴唇，继续激烈地侵犯着姐姐的初经人事的蜜穴`,
              ); // :8351
            } // :8352
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8354
            if (era.get(`talent:${target}:85`)) {
              // :8355
              await era.printAndWait(
                `「唔呣……唔呣……我的一次……奉献给魔王大人了啊啊啊${heart(1)} 呣呣${heart(1)}……」`,
              ); // :8356
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :8357
              await era.print(
                `『哎嘿嘿，姐姐的处女今天正式属于魔王大人了${heart(1)}』`,
              ); // :8358
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :8359
              await era.printAndWait(
                `「啊啊啊……魔王大人……魔王大人，从今天开始，我，我就是你的人了啊啊${heart(1)} 」`,
              ); // :8360
              await era.print(
                `『哎哎姐姐不要光顾着高兴，给我认真吸吮小鸡鸡啊${heart(1)}』`,
              ); // :8361
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :8362
            } else if (era.get(`talent:${target}:76`)) {
              // :8363
              await era.printAndWait(
                `「唔呣……唔呣……呜啊啊！？魔王大人……的阴茎……啊啊啊${heart(1)}」`,
              ); // :8364
              await era.printAndWait(
                `${target_name}边为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :8365
              await era.print(
                `『哎嘿嘿，姐姐，被你最喜欢的魔王大人的阴茎破处的感觉如何呀${heart(1)}』`,
              ); // :8366
              await era.printAndWait(
                `${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :8367
              await era.printAndWait(
                `「好舒服……唔呣……唔呣${heart(1)} 这样同时……侍奉两根阴茎……实在是太棒了唔唔${heart(1)}」`,
              ); // :8368
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
              ); // :8369
            } else {
              // :8370
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :8371
              await era.printAndWait(
                `${target_name}边被强迫为${assi_name}口交着，边感受着身后的${master_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :8372
              await era.printAndWait(`「不，不要啊啊！」`); // :8373
              await era.print(`『姐姐，嘴巴不许停下啊，给我好好吸吮啊！』`); // :8374
              await era.printAndWait(
                `${assi_name}抓着${target_name}的头，用${assi_weapon}强行侵犯着姐姐的喉咙。`,
              ); // :8375
              await era.printAndWait(
                `身后的${master_name}挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :8376
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :8377
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :8378
            } // :8379
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8381
            if (era.get(`talent:${target}:85`)) {
              // :8382
              await era.printAndWait(
                `「呜呜……唔呣${heart(1)}！${assi_name}？！不，不可以……」`,
              ); // :8383
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :8384
              await era.print(
                `『啊嘿嘿，和魔王大人一起用阴茎把姐姐前后串起来了——姐姐的处女，我就收下了！』`,
              ); // :8385
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :8386
              await era.printAndWait(
                `「不，不要啊……我是想留给……魔王大人的——唔唔……呣呣！」`,
              ); // :8387
              await era.printAndWait(
                `${target_name}${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
              ); // :8388
            } else if (era.get(`talent:${target}:76`)) {
              // :8389
              await era.printAndWait(
                `「唔呣……唔唔……我的处女……就这样……${heart(1)}」`,
              ); // :8390
              await era.printAndWait(
                `${target_name}边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头慢慢捅穿了处女膜。`,
              ); // :8391
              await era.print(
                `『啊啊，梦寐以求的姐姐的第一次，我就这么收下了${heart(1)}』`,
              ); // :8392
              await era.printAndWait(
                `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的处女蜜穴。`,
              ); // :8393
              await era.printAndWait(
                `像是在配合着${assi_name}的动作一样，${master_name}也将阴茎插入到了${target_name}的喉咙深处。`,
              ); // :8394
              await era.printAndWait(
                `「唔呣……唔唔……${heart(1)} 这样……好舒服……唔唔……唔呣${heart(1)}」`,
              ); // :8395
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，却感受到了心理和生理的双重快感……`,
              ); // :8396
            } else {
              // :8397
              await era.printAndWait(`「住，住手啊……唔呣……呜呜呜！」`); // :8398
              await era.printAndWait(
                `${target_name}被强制边为${master_name}口交着，边感受着身后的${assi_name}抱着自己的腰，龟头抵在蜜穴上。`,
              ); // :8399
              await era.print(
                `『嘿嘿嘿，姐姐的第一次就由我收下了！这样同时被侵犯着嘴巴和处女蜜穴，很舒服吧！』`,
              ); // :8400
              await era.printAndWait(
                `「怎，怎么可能会舒服……呜呜呜……唔呣……呣呣呣！？」`,
              ); // :8401
              await era.printAndWait(
                `${master_name}抓着${target_name}的头，将阴茎插到了喉咙的最深处。`,
              ); // :8402
              await era.printAndWait(
                `身后的${assi_name}也无情地夺去了${target_name}的处女身。`,
              ); // :8403
              await era.printAndWait(
                `「饶，饶了我吧，求你们了……唔唔……呣呣呣……！」`,
              ); // :8404
              await era.printAndWait(
                `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
              ); // :8405
            } // :8406
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8408
            if (era.get(`talent:${target}:85`)) {
              // :8409

              if (chara(target).system.肛门感觉 >= 3) {
                // :8411
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8412
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                ); // :8413
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                ); // :8414
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                ); // :8415
                await era.printAndWait(
                  `${target_name}会老实的一边舔${assi_name}的${assi_weapon}一边被${master_name}侵犯肛门的………`,
                ); // :8416
              } else {
                // :8417
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8418
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                ); // :8419
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                ); // :8420
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8421
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                ); // :8422
              } // :8423
            } else if (era.get(`talent:${target}:76`)) {
              // :8424

              if (chara(target).system.肛门感觉 >= 3) {
                // :8426
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                ); // :8427
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                ); // :8428
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                ); // :8429
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8430
              } else {
                // :8431
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                ); // :8432
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                ); // :8433
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                ); // :8434
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8435
              } // :8436
            } else {
              // :8437

              if (chara(target).system.肛门感觉 >= 3) {
                // :8439
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8440
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                ); // :8441
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                ); // :8442
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                ); // :8443
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                ); // :8444
              } else {
                // :8445
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8446
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                ); // :8447
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                ); // :8448
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                ); // :8449
              } // :8450
            } // :8451
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :8453
            if (era.get(`talent:${target}:85`)) {
              // :8454

              if (chara(target).system.肛门感觉 >= 3) {
                // :8456
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                ); // :8457
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                ); // :8458
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                ); // :8459
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                ); // :8460
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                ); // :8461
              } else {
                // :8462
                await era.printAndWait(
                  `「啊呜…唔…魔王大人${heart(1)} 咕啾咕啾…啊、嗯！肛门不行啊…啊啊啊！」`,
                ); // :8463
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                ); // :8464
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                ); // :8465
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8466
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                ); // :8467
              } // :8468
            } else if (era.get(`talent:${target}:76`)) {
              // :8469

              if (chara(target).system.肛门感觉 >= 3) {
                // :8471
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                ); // :8472
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                ); // :8473
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                ); // :8474
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :8475
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                ); // :8476
              } else {
                // :8477
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                ); // :8478
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                ); // :8479
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                ); // :8480
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                ); // :8481
                await era.printAndWait(
                  `${assi_name}兴奋地抓住${target_name}的腰不停地反复抽送着。然后${target_name}输给了肛门被侵犯的快感，继续舔着${master_name}的股间………`,
                ); // :8482
              } // :8483
            } else {
              // :8484

              if (chara(target).system.肛门感觉 >= 3) {
                // :8486
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8487
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                ); // :8488
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                ); // :8489
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                ); // :8490
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                ); // :8491
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                ); // :8492
              } else {
                // :8493
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8494
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                ); // :8495
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                ); // :8496
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                ); // :8497
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                ); // :8498
              } // :8499
            } // :8500
          } else {
            // :8501
          } // :8503
        } else {
          // :8505

          if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :8507
            if (era.get(`talent:${target}:85`)) {
              // :8508

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8510
                await era.printAndWait(
                  `「请，请尽情地侵犯${target_name}的小穴吧……魔王大人${heart(1)} 什么……${assi_name}也要一起么……当，当然可以……」`,
                ); // :8511
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                ); // :8512
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门……完全变成性器了呢！』`,
                ); // :8513
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                ); // :8514
                await era.printAndWait(
                  `「呜呜……啊啊啊……不，不行了……舒服得已经没有办法思考了……魔王大人，还有${assi_name}……请尽情地把${target_name}侵犯得一塌糊涂吧啊啊啊！」`,
                ); // :8515
              } else {
                // :8516
                await era.printAndWait(
                  `「哎哎？要，要两个人一起吗……是叫做三明治什么的玩法吗${heart(1)}」`,
                ); // :8517
                await era.printAndWait(
                  `被夹在中间同时侵犯着肛门和蜜穴，${target_name}只能拼命忍耐着强烈的快感。`,
                ); // :8518
                await era.print(
                  `『唔哇哇……姐姐的淫乱肛门好紧好舒服……真的有成为名器的潜质呢！』`,
                ); // :8519
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8520
                await era.printAndWait(
                  `「呜……啊啊……不，不可以这么激烈啊……会，会坏掉的${heart(1)}！」`,
                ); // :8521
              } // :8522
            } else if (era.get(`talent:${target}:76`)) {
              // :8523

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8525
                await era.printAndWait(
                  `「哎哎，要两人一起上？其实人家早已经等不及了啦${heart(1)}」`,
                ); // :8526
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                ); // :8527
                await era.print(
                  `『哎哎，姐姐真是贪心啊，居然一次要两人才能满足！』`,
                ); // :8528
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺着腰，激烈地侵犯着姐姐的肛门。`,
                ); // :8529
                await era.printAndWait(
                  `「好，好舒服……太舒服了${heart(1)}都怪你们，把姐姐调教得……不做爱就活不下去了啊啊啊${heart(1)}」`,
                ); // :8530
              } else {
                // :8531
                await era.printAndWait(
                  `「哎哎……被，被两人的阴茎这样一起侵犯……呜啊啊${heart(1)}」`,
                ); // :8532
                await era.printAndWait(
                  `肛门和蜜穴被同时插入让${target_name}发出了灼热的呻吟。`,
                ); // :8533
                await era.print(
                  `『哎嘿嘿，姐姐的淫乱肛门好紧啊，有继续开发的必要呢！魔王大人，让我们一起把姐姐的前后两穴都弄得乱七八糟吧${heart(1)}』`,
                ); // :8534
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺着腰，和${master_name}一同更加激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8535
                await era.printAndWait(
                  `「嗯啊……啊啊啊……请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                ); // :8536
              } // :8537
            } else {
              // :8538

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8540
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜……可，可是……好舒服……真的好舒服啊啊」`,
                ); // :8541
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没了。`,
                ); // :8542
                await era.print(
                  `『哎嘿嘿，姐姐准备好了吗，接下来才是开始呢！』`,
                ); // :8543
                await era.printAndWait(
                  `${assi_name}舔着嘴唇，动起腰，开始和${master_name}一同激烈地侵犯着${target_name}的肛门和蜜穴。`,
                ); // :8544
                await era.printAndWait(
                  `「太，太激烈了……姐姐会……会坏掉的啊啊……！」`,
                ); // :8545
              } else {
                // :8546
                await era.printAndWait(
                  `「两，两个人一起……不，不可以啊……那，那样会坏掉的……真的会坏掉的！」`,
                ); // :8547
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                ); // :8548
                await era.print(
                  `『加油啊姐姐，在你在两穴同时高潮之前，我们可是不会停下的哦♪』`,
                ); // :8549
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的肛门………`,
                ); // :8550
              } // :8551
            } // :8552
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8554
            if (era.get(`talent:${target}:85`)) {
              // :8555

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8557
                await era.printAndWait(
                  `「嗯啊啊……魔，魔王大人……这样激烈地侵犯着……我的肛门${heart(1)}小穴……也被${assi_name}一起侵犯了……感觉好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                ); // :8558
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着爱液泛滥的蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下甘甜的娇喘。`,
                ); // :8559
                await era.print(
                  `『呜哇啊，性奴姐姐的小穴已经被魔王大人开发的……这么棒了！』`,
                ); // :8560
                await era.printAndWait(
                  `兴奋不已的${assi_name}挺起腰，激烈地侵犯着${target_name}的蜜穴。`,
                ); // :8561
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……好舒服……好舒服啊啊${heart(1)} 这样被同时侵犯着……一下子……就要去了啊啊${heart(1)}」`,
                ); // :8562
              } else {
                // :8563
                await era.printAndWait(
                  `「请，请稍微温柔一点……拜托了……还有${assi_name}…不要兴奋成那个样子啊！」`,
                ); // :8564
                await era.printAndWait(
                  `话音未落，${assi_name}已经迫不及待地插入了姐姐的蜜穴之中。`,
                ); // :8565
                await era.print(
                  `『哼哼，温柔，别开玩笑了！我和魔王大人今天就是打算把姐姐侵犯到彻底坏掉的呀！』`,
                ); // :8566
                await era.printAndWait(
                  `${assi_name}坏笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8567
                await era.printAndWait(
                  `「呜啊啊……太，太激烈了……感，感觉好奇怪……整个人……都要变得奇怪了啊啊！」`,
                ); // :8568
              } // :8569
            } else if (era.get(`talent:${target}:76`)) {
              // :8570

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8572
                await era.printAndWait(
                  `「哈啊……哈啊……两人的阴茎……一起在身体里${heart(1)}……感觉实在是太棒了啊啊啊${heart(1)}」`,
                ); // :8573
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下淫浪的娇喘。`,
                ); // :8574
                await era.print(
                  `『给我用屁股和小穴同时高潮吧，淫乱的性奴姐姐！』`,
                ); // :8575
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8576
                await era.printAndWait(
                  `「呜啊……嗯啊啊……好舒服……实在是太舒服了${heart(1)} 真的要……高潮得……一塌糊涂了啊啊啊${heart(1)}」`,
                ); // :8577
              } else {
                // :8578
                await era.printAndWait(
                  `「咦咦，要两个人一起上吗……好，好吧。其实还有点……期待呢${heart(1)}」`,
                ); // :8579
                await era.printAndWait(
                  `蜜穴和肛门被同时插入，${target_name}忍不住灼热地呻吟了起来。`,
                ); // :8580
                await era.print(
                  `『呼呼，姐姐的淫乱小穴……属于人家的啦啦啦！给我高潮吧！』`,
                ); // :8581
                await era.printAndWait(
                  `${assi_name}嬉笑着，挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8582
                await era.printAndWait(
                  `「呜……呜啊啊${heart(1)} ${assi_name}！魔王大人！请，请尽情地……把${target_name}侵犯到坏掉吧${heart(1)}」`,
                ); // :8583
              } // :8584
            } else {
              // :8585

              if (
                chara(target).system.私处感觉 >= 3 &&
                chara(target).system.肛门感觉 >= 3
              ) {
                // :8587
                await era.print(
                  `「呜……呜啊啊……不，不可以这样同时……侵犯屁股和小穴！呜呜，可，可是……为什么……感觉好舒服${heart(1)}…」`,
                ); // :8588
                await era.printAndWait(
                  `${target_name}被${master_name}和妹妹抱在中间，同时侵犯着蜜穴和肛门，双重的快感瞬间将${target_name}淹没，只剩下灼热的呻吟。`,
                ); // :8589
                await era.print(
                  `『嘴上说着不行，下面已经夹得这么紧了！被两人同时侵犯，更兴奋了吗，我的变态姐姐！』`,
                ); // :8590
                await era.printAndWait(
                  `兴奋不已${assi_name}挺起腰，配合着${master_name}的动作，开始一同激烈地侵犯着${target_name}的蜜穴和肛门。`,
                ); // :8591
                await era.printAndWait(
                  `「才，才不是……变态！呜……呜啊啊${heart(1)}……可，可是……真的好舒服……舒服得……不行了啊啊啊！」`,
                ); // :8592
              } else {
                // :8593
                await era.printAndWait(
                  `「放，放开我啊……两个人一起……这种事情……怎么可以啊啊啊！」`,
                ); // :8594
                await era.printAndWait(
                  `${target_name}似乎还无法适应如此激烈的玩法，痛苦地哀鸣了起来。`,
                ); // :8595
                await era.print(
                  `『说什么呢姐姐，我们可是打算侵犯到姐姐两个淫穴一起高潮呢♪』`,
                ); // :8596
                await era.printAndWait(
                  `${assi_name}带着恶意的笑容，舔着嘴角，更加激烈地侵犯着${target_name}的蜜穴………`,
                ); // :8597
              } // :8598
            } // :8599
          } else if (
            game.train.三人PLAY主人部位 === 1 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8601
            if (era.get(`talent:${target}:85`)) {
              // :8602

              if (chara(target).system.私处感觉 >= 3) {
                // :8604
                await era.printAndWait(
                  `「呜……呜啊啊……这样边被魔王大人……侵犯着${heart(1)} ……边口交……感觉${assi_name}的阴茎……更加美味了啊啊啊${heart(1)} 唔呣……唔呣……唔唔唔♪」`,
                ); // :8605
                await era.printAndWait(
                  `被${master_name}抽插着爱液泛滥的蜜穴、${target_name}更加兴奋不已地舔吮着妹妹的阴茎。`,
                ); // :8606
                await era.print(
                  `『嘿嘿，被我和魔王大人一起侵犯，身为性奴的姐姐一定感觉很幸福吧？』`,
                ); // :8607
                await era.printAndWait(
                  `${target_name}满脸通红地边点头，边继续努力地为妹妹口交着。`,
                ); // :8608
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}…… 的，的确是这样啊啊……能被魔王大人和${assi_name}这样疼爱……真的是太幸福了${heart(1)} 」`,
                ); // :8609
              } else {
                // :8610
                await era.printAndWait(
                  `「唔呣……唔呣……${assi_name}的阴茎……味道好好……好喜欢${heart(1)} 还有……魔王大人，请吧……人家已经准备好了${heart(1)}」`,
                ); // :8611
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，撅起的臀部一扭一扭地诱惑着${master_name}。`,
                ); // :8612
                await era.print(
                  `『哎嘿嘿，姐姐最喜欢的魔王大人的阴茎要进来了哦${heart(1)}』`,
                ); // :8613
                await era.printAndWait(
                  `${master_name}挺起腰，开始侵犯着${target_name}已经爱液泛滥的蜜穴。`,
                ); // :8614
                await era.printAndWait(
                  `「呜啊……嗯啊啊${heart(1)}……魔王大人……一下子就顶到最里面了……好厉害啊啊啊${heart(1)}！」`,
                ); // :8615
                await era.printAndWait(
                  `${assi_name}也抱着${target_name}的脸，用阴茎顶着姐姐的口腔。`,
                ); // :8616
                await era.print(
                  `『不要光顾着享受，嘴巴也要好好地给我吸吮啊！』`,
                ); // :8617
                await era.printAndWait(
                  `${target_name}就这样被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                ); // :8618
              } // :8619
            } else if (era.get(`talent:${target}:76`)) {
              // :8620

              if (chara(target).system.私处感觉 >= 3) {
                // :8622
                await era.printAndWait(
                  `「呜……啊啊啊……蜜穴……被魔王大人的阴茎……塞得满满的${heart(1)} 这样……边做爱……边口交……实在是太舒服了啊唔唔……唔呣……唔呣${heart(1)}」`,
                ); // :8623
                await era.print(
                  `『呜哇哇……姐姐在被魔王大人侵犯的时候……口交居然比平时还厉害了${heart(1)}』`,
                ); // :8624
                await era.printAndWait(
                  `${assi_name}感受着姐姐激烈地吸吮着自己的阴茎，忍不住也呻吟了起来。`,
                ); // :8625
                await era.printAndWait(
                  `「啊啊啊……魔王大人……更加激烈地侵犯……${target_name}的淫穴吧${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :8626
                await era.printAndWait(
                  `${target_name}含糊不清地娇喘着，享受着心理和生理的双重快感……`,
                ); // :8627
              } else {
                // :8628
                await era.printAndWait(
                  `「呜啊啊……在，在人家口交的时候……侵犯小穴……魔王大人……太狡猾了${heart(1)}」`,
                ); // :8629
                await era.printAndWait(
                  `在${target_name}吸吮着自己妹妹的阴茎的时候，${master_name}趁机抱住了${target_name}的腰，将龟头抵入了蜜穴中。`,
                ); // :8630
                await era.print(
                  `『哎嘿嘿，姐姐一会儿享受的时候，嘴巴记得不要停下来哦♪』`,
                ); // :8631
                await era.printAndWait(
                  `${master_name}挺着腰，开始激烈地侵犯着${target_name}爱液泛滥的蜜穴。`,
                ); // :8632
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 不，不行了……这样……太舒服了啊啊啊${heart(1)}」`,
                ); // :8633
                await era.print(`『啊啊……姐姐的口交……太厉害了……好舒服啊啊！』`); // :8634
                await era.print(
                  `被两人的阴茎一前一后侵犯着的${target_name}，因为心里和生理的双重快感而含糊不清地呻吟着………`,
                ); // :8635
              } // :8636
            } else {
              // :8637

              if (chara(target).system.私处感觉 >= 3) {
                // :8639
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                ); // :8640
                await era.printAndWait(
                  `敏感的小穴被${master_name}肆意地抽插着，${target_name}只能拼命忍耐着快感，同时还要努力为妹妹口交。`,
                ); // :8641
                await era.print(
                  `『哎嘿嘿，姐姐真不错呢，被魔王大人插得那么舒服，嘴巴还没有松懈♪』`,
                ); // :8642
                await era.printAndWait(
                  `边嘲弄着${target_name}，${assi_name}边用阴茎继续侵犯着姐姐的喉咙。`,
                ); // :8643
                await era.printAndWait(
                  `「唔呣呣……唔呣呣……太，太激烈了${heart(1)}…呜啊啊……被魔王大人……顶到子宫口了唔呣呣呣！」`,
                ); // :8644
                await era.printAndWait(
                  `蜜穴传来的极度快感让${target_name}几乎无法思考………`,
                ); // :8645
              } else {
                // :8646
                await era.printAndWait(
                  `「不，不可以在口交的时候……侵犯小穴啊……唔呣呣……呣呣……」`,
                ); // :8647
                await era.printAndWait(
                  `正在为${assi_name}口交的${target_name}，蜜穴突然被侵犯，一时惊慌失措。`,
                ); // :8648
                await era.print(
                  `『别光顾着享受啊，笨蛋姐姐，给我好好口交啊！』`,
                ); // :8649
                await era.printAndWait(
                  `「不，不行啊……这样的事情……呜呜……唔呣！？」`,
                ); // :8650
                await era.printAndWait(
                  `${assi_name}不满地抓着${target_name}的头发，用勃起的阴茎强行侵犯着姐姐的喉咙`,
                ); // :8651
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，连悲鸣都发不出，只能忍受着痛苦与折磨………`,
                ); // :8652
              } // :8653
            } // :8654
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 1
          ) {
            // :8656
            if (era.get(`talent:${target}:85`)) {
              // :8657

              if (chara(target).system.私处感觉 >= 3) {
                // :8659
                await era.printAndWait(
                  `「唔呣呣？在……在口交的时候……侵犯小穴……感觉……好奇怪……但是好舒服啊啊啊${heart(1)}」`,
                ); // :8660
                await era.printAndWait(
                  `${target_name}一边被妹妹侵犯着，一边把脸埋在${master_name}双腿之间，努力地吸吮着阴茎。`,
                ); // :8661
                await era.print(
                  `『哎嘿嘿，姐姐不知不觉之间已经完全适应性奴的身份了呢${heart(1)}』`,
                ); // :8662
                await era.printAndWait(
                  `${assi_name}带着享受的表情，激烈地侵犯着${target_name}的蜜穴。`,
                ); // :8663
                await era.printAndWait(
                  `「呜……呣呣……不，不要对姐姐恶作剧了啦……没有办法好好……为魔王大人口交了${heart(1)} 对，对不起……魔王大人……因为实在是太舒服了${heart(1)}我，我会努力的……咕呣……咕呣……呣呣呣」`,
                ); // :8664
                await era.printAndWait(
                  `${target_name}感受生理和心理的双重快感，任凭${master_name}好${assi_name}一前一后地侵犯着自己……`,
                ); // :8665
              } else {
                // :8666
                await era.printAndWait(
                  `「不，不可以……在这个时候……侵犯小穴啊……会没有办法好好为魔王大人口交的！」`,
                ); // :8667
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了蜜穴之中。`,
                ); // :8668
                await era.print(
                  `『其实人家还有点嫉妒姐姐呢，能同时享受两根阴茎……唔哇哇……姐姐的小穴好紧好舒服♪』`,
                ); // :8669
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8670
                await era.printAndWait(
                  `「呜……呜啊啊……不，不能顶得这么深……唔呣呣……这样……边口交边被侵犯……感觉……整个人都要变得奇怪了啊啊——唔呣……呣呣呣……呣呣♪」`,
                ); // :8671
                await era.printAndWait(
                  `${target_name}被${master_name}和${assi_name}当做性玩具一般，一前一后的侵犯着……`,
                ); // :8672
              } // :8673
            } else if (era.get(`talent:${target}:76`)) {
              // :8674

              if (chara(target).system.私处感觉 >= 3) {
                // :8676
                await era.printAndWait(
                  `「唔呣……唔呣${heart(1)}……这样……边口交……边被侵犯小穴……感觉……太舒服了啊啊啊${heart(1)}」`,
                ); // :8677
                await era.printAndWait(
                  `正在为${master_name}口交的${target_name}，感受着身后的${assi_name}抱着自己的腰，龟头顶入了爱液泛滥的敏感蜜穴之中。`,
                ); // :8678
                await era.print(
                  `『唔哇哇……原来姐姐已经变得这么淫乱了……魔王大人真是调教有方啊！』`,
                ); // :8679
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8680
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                ); // :8681
                await era.printAndWait(
                  `「唔呣呣？！唔呣……唔呣……好，好舒服${heart(1)}……舒服得……已经没有办法思考了啊呣呣……呣呣${heart(1)}」`,
                ); // :8682
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在心里和生理的双重快感中颤抖着……`,
                ); // :8683
              } else {
                // :8684
                await era.printAndWait(
                  `「呜啊啊……要边口交边被侵犯小穴了……好期待${heart(1)}」`,
                ); // :8685
                await era.printAndWait(
                  `正在为${assi_name}口交的${master_name}，撅起的臀部一扭一扭地诱惑着${target_name}。`,
                ); // :8686
                await era.print(
                  `『看来姐姐已经准备好了呢……接下来就是要侵犯到姐姐失神为止喽！！』`,
                ); // :8687
                await era.printAndWait(
                  `${assi_name}兴奋地挺着腰，开始持续地侵犯着${target_name}的蜜穴。`,
                ); // :8688
                await era.printAndWait(
                  `${master_name}也配合着${assi_name}的动作，将阴茎顶到了${target_name}喉咙深处，开始抽插起来。`,
                ); // :8689
                await era.printAndWait(
                  `「唔呣呣……唔唔${heart(1)} 这样好舒服……比想象中的还要舒服啊啊……呣呣……呣呣${heart(1)}」`,
                ); // :8690
                await era.printAndWait(
                  `被两人的阴茎一前一后侵犯着的${target_name}，身体在难以言喻的快感中颤抖着……`,
                ); // :8691
              } // :8692
            } else {
              // :8693

              if (chara(target).system.私处感觉 >= 3) {
                // :8695
                await era.printAndWait(
                  `「饶，饶了我吧……不，不可以这样同时侵犯嘴巴和小穴啊……唔呣呣……唔呣……」`,
                ); // :8696
                await era.printAndWait(
                  `${target_name}嘴里含着${master_name}的阴茎，拼命忍耐着被${assi_name}从身后侵犯的强烈快感。`,
                ); // :8697
                await era.print(
                  `『不能光顾享受啊姐姐，要好好用你的淫乱嘴巴小穴服务魔王大人，听到了没！』`,
                ); // :8698
                await era.printAndWait(
                  `「对，对不起……我，我会好好用嘴巴做的……唔呣……唔呣……唔唔！」`,
                ); // :8699
                await era.printAndWait(
                  `不耐烦的${master_name}抓着${target_name}的头发，将阴茎顶到了喉咙深处，肆意抽插着。`,
                ); // :8700
                await era.print(
                  `『哼，魔王大人已经不满意了，做好受惩罚的觉悟吧笨蛋姐姐！』`,
                ); // :8701
                await era.printAndWait(
                  `${target_name}泪流满面，却又无可奈何地忍耐着两人的侵犯和肆虐………`,
                ); // :8702
              } else {
                // :8703
                await era.printAndWait(
                  `「呜呜呜……求求你们了……饶了我吧……真的……唔呣呣？！呣呣……唔呣……」`,
                ); // :8704
                await era.printAndWait(
                  `对${target_name}的求饶无动于衷，${assi_name}和${master_name}开始一前一后，毫不留情地侵犯着${target_name}。`,
                ); // :8705
                await era.print(
                  `『啊哈哈……魔王大人好像很喜欢姐姐的淫乱嘴巴小穴呢♪』`,
                ); // :8706
                await era.printAndWait(
                  `「饶，饶了我吧……不能呼吸了……唔呣……呣呣……呣呣……」`,
                ); // :8707
                await era.printAndWait(
                  `${master_name}不满地抓着${target_name}的头发，用勃起的阴茎强行在喉咙里抽插着`,
                ); // :8708
                await era.print(
                  `『哎嘿，姐姐的喉咙小穴被魔王大人塞满了呢，人家有点嫉妒呢！』`,
                ); // :8709
                await era.printAndWait(
                  `${target_name}怎么挣扎都无法挣脱，只能泪流满面地任由两人激烈地侵犯着自己……………`,
                ); // :8710
              } // :8711
            } // :8712
          } else if (
            game.train.三人PLAY主人部位 === 2 &&
            game.train.三人PLAY助手部位 === 3
          ) {
            // :8714
            if (era.get(`talent:${target}:85`)) {
              // :8715

              if (chara(target).system.肛门感觉 >= 3) {
                // :8717
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8718
                await era.print(
                  `『哎哎姐姐，肛交有那么舒服吗！怎么一被魔王大人侵犯屁股，嘴巴的动作就停下来了呢！真是的，还要人家自己动！！』`,
                ); // :8719
                await era.printAndWait(
                  `${assi_name}抱着${target_name}的脸，用自己双腿间的${assi_weapon}肆意地侵犯着姐姐的喉咙。`,
                ); // :8720
                await era.printAndWait(
                  `「唔呣……唔呣……对，对不起，${assi_name}……因为一边口交一边肛交的感觉……太舒服了……整个人都要变得奇怪了啊啊${heart(1)}」`,
                ); // :8721
                await era.printAndWait(
                  `${target_name}老老实实地忍受，应该说是享受着${assi_name}和${master_name}两人对自己的同时侵犯………`,
                ); // :8722
              } else {
                // :8723
                await era.printAndWait(
                  `「唔呣……唔呣……啊啊魔王大人，不，不能这样同时侵犯屁股啊啊！！」`,
                ); // :8724
                await era.print(
                  `『哎嘿嘿，姐姐现在已经能熟练地一边被侵犯肛门一边口交了呢，完全变成我和魔王大人的性奴了呀♪♪』`,
                ); // :8725
                await era.printAndWait(
                  `被妹妹羞辱得面红耳赤的${target_name}，却依旧顺从地吸吮着${assi_name}股间的的${assi_weapon}。`,
                ); // :8726
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8727
                await era.printAndWait(
                  `${master_name}欣赏着姐姐为妹妹口交侍奉的淫乱姿态，也兴奋地挺起腰，更加激烈地侵犯着${target_name}的肛门……`,
                ); // :8728
              } // :8729
            } else if (era.get(`talent:${target}:76`)) {
              // :8730

              if (chara(target).system.肛门感觉 >= 3) {
                // :8732
                await era.printAndWait(
                  `「唔呣……唔呣……这样边吸吮着……阴茎……边被侵犯肛门……实在是……太舒服了啊呣呣${heart(1)}……不，不行了，屁股舒服的要去了啊啊${heart(1)}！」`,
                ); // :8733
                await era.printAndWait(
                  `肛门的强烈快感让${target_name}更加兴奋地为${assi_name}口交着，整个人都忘乎所以了。`,
                ); // :8734
                await era.print(
                  `『哎哎哎，姐姐已经这么淫荡了啊，完全变成我和魔王大人的性奴了呢！』`,
                ); // :8735
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8736
              } else {
                // :8737
                await era.printAndWait(
                  `「呜啊啊……这样被同时侵犯着……肛门和嘴巴小穴……感觉好奇怪……但是好舒服啊啊」`,
                ); // :8738
                await era.printAndWait(
                  `感受着肛门的快感，${target_name}更加兴奋地为自己的妹妹口交着`,
                ); // :8739
                await era.print(
                  `『啊啊姐姐！姐姐！就这样彻底变成我和魔王大人的性奴吧！』`,
                ); // :8740
                await era.printAndWait(
                  `兴奋不已的${assi_name}抓着${target_name}头发，更加激烈地侵犯着自己姐姐的喉咙，另一边${master_name}抽插肛门的节奏也加快了……`,
                ); // :8741
              } // :8742
            } else {
              // :8743

              if (chara(target).system.肛门感觉 >= 3) {
                // :8745
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8746
                await era.printAndWait(
                  `${target_name}把脸埋在妹妹的腿间，吸吮着${assi_name}的阴茎，然而肛门被${master_name}侵犯的快感很快就让她无法集中精神继续口交，只是无力地呻吟着`,
                ); // :8747
                await era.print(
                  `『哎哎姐姐真没用，屁股再这么舒服，嘴巴的动作也不能停下来啊！！』`,
                ); // :8748
                await era.printAndWait(
                  `「对，对不起……但是真的已经……唔呣……唔呣……呜呜！」`,
                ); // :8749
                await era.printAndWait(
                  `话音未落，${assi_name}就已经强行把阴茎插到了${target_name}的喉咙深处，强行侵犯着`,
                ); // :8750
              } else {
                // :8751
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8752
                await era.printAndWait(
                  `${target_name}被${master_name}持续侵犯着肛门的同时，被迫继续把脸埋在${assi_name}的腿间，吸吮着妹妹的阴茎。`,
                ); // :8753
                await era.print(
                  `『呵呵呵，嘴上说着不喜欢，但是吸吮阴茎却很卖力啊，那么喜欢口交吗我的好姐姐？』`,
                ); // :8754
                await era.printAndWait(
                  `${target_name}绝望地摇着头，忍耐着肛门被侵犯的不适感，边屈服地为妹妹口交着`,
                ); // :8755
              } // :8756
            } // :8757
          } else if (
            game.train.三人PLAY主人部位 === 3 &&
            game.train.三人PLAY助手部位 === 2
          ) {
            // :8759
            if (era.get(`talent:${target}:85`)) {
              // :8760

              if (chara(target).system.肛门感觉 >= 3) {
                // :8762
                await era.printAndWait(
                  `「请……请两位随意地侵犯${target_name}的肛门和嘴巴小穴吧${heart(1)} ……唔呣……唔唔？！」`,
                ); // :8763
                await era.print(
                  `『比比看看看是我先让姐姐的屁股高潮，还是姐姐先用嘴巴让魔王大人射精吧～加油啊姐姐♪』`,
                ); // :8764
                await era.printAndWait(
                  `${assi_name}用手指肆意地玩弄了一会儿${target_name}的肛门，然后用自己双腿间的${assi_weapon}开始持续地侵犯着姐姐的后庭。`,
                ); // :8765
                await era.printAndWait(
                  `「呜呣呣${heart(1)} 好，好舒服啊啊啊${heart(1)} 边吸吮着……魔王大人的阴茎……边被妹妹侵犯肛门${heart(1)}……不行了……已经舒服得没有办法思考了啊呣呣${heart(1)}！」`,
                ); // :8766
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己的亲妹妹侵犯肛门的下流姿态，边用${master_weapon}侵犯着${target_name}的喉咙深处……`,
                ); // :8767
              } else {
                // :8768
                await era.printAndWait(
                  `「不，不可以……这样……同时侵犯肛门啊啊${heart(1)} 没有办法……好好为魔王大人口交了……唔呣呣……呜啊啊！」`,
                ); // :8769
                await era.print(
                  `『这样不行啊姐姐，不管是被侵犯肛门还是侵犯小穴，口交都不能停下来，这可是作为性奴的基本功呢♪』`,
                ); // :8770
                await era.printAndWait(
                  `边羞辱着自己的姐姐，${assi_name}边用${assi_weapon}更加激烈地侵犯着${target_name}的后庭。`,
                ); // :8771
                await era.printAndWait(
                  `「不，不要说这种……害羞的话啊${heart(1)}唔呣……唔呣${heart(1)} 啊啊啊……整个人……都要变得奇怪了！」`,
                ); // :8772
                await era.printAndWait(
                  `${master_name}欣赏着${target_name}被自己妹妹羞辱的姿态，更加兴奋的侵犯着${target_name}的嘴巴和喉咙。`,
                ); // :8773
              } // :8774
            } else if (era.get(`talent:${target}:76`)) {
              // :8775

              if (chara(target).system.肛门感觉 >= 3) {
                // :8777
                await era.printAndWait(
                  `「来吧，魔王大人，还有${assi_name}……请一起侵犯${target_name}淫乱的肛门性器和嘴巴小穴吧……人家已经等不及了啦${heart(1)}」`,
                ); // :8778
                await era.printAndWait(
                  `肛门被侵犯的极度快感，让${target_name}整个人都颤抖了起来，更加兴奋而积极地吸吮着${master_name}的阴茎。`,
                ); // :8779
                await era.print(
                  `『啊啊……姐姐的肛门真的被魔王大人调教成名器了啊啊！侵犯起来好舒服！！』`,
                ); // :8780
                await era.printAndWait(
                  `「是……是啊${heart(1)} 姐姐的……肛门就是……专门服务${assi_name}和魔王大人的淫乱性器啊啊${heart(1)} 唔呣……唔呣……唔唔唔${heart(1)}」`,
                ); // :8781
                await era.printAndWait(
                  `${target_name}淫乱的话语激起了${assi_name}和${master_name}的兴致，更加激烈地一前一后侵犯着${target_name}……`,
                ); // :8782
              } else {
                // :8783
                await era.printAndWait(
                  `「呜啊啊……居，居然……要边被侵犯肛门……边为魔王大人口交${heart(1)}……不过算了……这样也很舒服就是了——唔呣呣！？呣呣呣」`,
                ); // :8784
                await era.printAndWait(
                  `${target_name}身体颤抖着，完全沉醉在肛交的快感之中，嘴也更加热情地吸吮着${master_name}的阴茎。`,
                ); // :8785
                await era.print(
                  `『哎嘿嘿，姐姐完全变成淫乱性奴了呢，真是变态，我怎么会有你这样的姐姐！』`,
                ); // :8786
                await era.printAndWait(
                  `「是……是啊……姐姐是${assi_name}和魔王大人的淫乱性奴……请随意地把姐姐……侵犯到坏掉吧啊啊啊${heart(1)}」`,
                ); // :8787
                await era.printAndWait(
                  `${assi_name}兴奋不已地抱着${target_name}的腰，激烈地侵犯着姐姐的肛门。强烈的快感让${target_name}更加忘我地为${master_name}口交着………`,
                ); // :8788
              } // :8789
            } else {
              // :8790

              if (chara(target).system.肛门感觉 >= 3) {
                // :8792
                await era.printAndWait(
                  `「呜啊……不，不可以在口交的时候……侵犯屁股啊啊……但是……感觉好奇怪……好舒服……唔呣……唔呣」`,
                ); // :8793
                await era.printAndWait(
                  `敏感的肛门传来的快感让${target_name}几乎无法忍耐，大声地呻吟了起来，连为${master_name}口交的动作都停了下来。`,
                ); // :8794
                await era.print(
                  `『没用的姐姐，好好给魔王大人口交啊，难道你想挨罚吗？！♪』`,
                ); // :8795
                await era.printAndWait(
                  `「对，对不起……我会好好……吸吮的……唔呣……唔呣……啊啊啊……不，不行了，屁股……真的不行了，舒服得……要去了啊啊啊${heart(1)}」`,
                ); // :8796
                await era.printAndWait(
                  `已经被调教成性器的肛门依旧被自己的妹妹毫不留情地侵犯着，快感已经逐渐淹没了${target_name}`,
                ); // :8797
                await era.printAndWait(
                  `几乎无法思考的${target_name}只能本能地搂着${master_name}的腰，吸吮着口中的阴茎`,
                ); // :8798
              } else {
                // :8799
                await era.printAndWait(
                  `「呜呜……求你们了……放过我吧……真的，真的不要两个人一起上啊……唔呣……呣呣？！」`,
                ); // :8800
                await era.printAndWait(
                  `完全无视了${target_name}的哀求，${assi_name}和${master_name}开始一前一后同时侵犯着${target_name}的肛门和嘴。`,
                ); // :8801
                await era.print(
                  `『啊啊……姐姐的淫乱屁股小穴夹得这么紧，好舒服啊！』`,
                ); // :8802
                await era.printAndWait(
                  `「呜呜……饶了我吧……真的，真的会坏掉的……唔呣！？唔唔……唔呣……」`,
                ); // :8803
                await era.printAndWait(
                  `${target_name}只能拼命忍耐着肛门被侵犯的不适，同时竭力吸吮着${master_name}的阴茎……直到两人满意为止`,
                ); // :8804
              } // :8805
            } // :8806
          } else {
            // :8807
          } // :8809
        } // :8810
      } // :8811
      return 0; // :8812
    } // :8813
  } // :8814

  if (era_flag.selectcom === 65) {
    // :8818

    if (kojo.侵犯助手 === 0) {
      // :8822

      if (assi_mao) {
        // :8824

        if (era.get(`cflag:${player}:15`) === 305) {
          // :8827

          if (era.get(`talent:${target}:76`) === 1) {
            // :8829
            await era.printAndWait(
              `「哎哎？原来你还没有被魔王大人疼爱过呀……那就让姐姐来帮你变成真正的女人吧${heart(1)}」`,
            ); // :8830
            await era.printAndWait(
              `『不，不要啊……是想留给魔王大人的啊啊……绝对不会原谅你的！！！』`,
            ); // :8831
            await era.printAndWait(
              `${target_name}听从着你的命令，嬉笑着抱住${player_name}，夺走了妹妹的处女。`,
            ); // :8832
            await era.printAndWait(
              `激烈的交合下，${player_name}的蜜穴里流出的纯洁的处女之血四溅到了地上，床上。`,
            ); // :8833
            await era.printAndWait(
              `「身体放松，再放松一些${heart(1)} 马上就会舒服起来的${heart(1)}」`,
            ); // :8834
            await era.printAndWait(`『呜啊啊！好痛！好痛！温柔一点啊啊！』`); // :8835
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :8837
            await era.printAndWait(`『呜……呜啊……姐姐，慢一点，有点痛……！』`); // :8838
            await era.printAndWait(
              `「咦咦？难道……${player_name}你是第一次？」`,
            ); // :8839
            await era.printAndWait(
              `『是啊……姐姐，虽说本来是想留给魔王大人的${heart(1)} 不过给姐姐的话我也不介意啦！』`,
            ); // :8840
            await era.printAndWait(
              `这个意外的发现让${target_name}有些震撼，交合的动作也停了下来。`,
            ); // :8841
            await era.printAndWait(
              `但是${player_name}却撒娇似地环住了姐姐的脖子，坐在${target_name}的腿上，自己动起了腰`,
            ); // :8842
            await era.printAndWait(
              `『没关系的姐姐，尽情侵犯我吧！因为人家最喜欢姐姐了啊啊${heart(1)}』`,
            ); // :8843
            await era.printAndWait(
              `「呜啊啊！对不起，${player_name}！我也最喜欢你了！」`,
            ); // :8844
            await era.printAndWait(
              `从${player_name}的蜜穴里慢慢淌出了纯洁的处女之血……`,
            ); // :8845
          } else {
            // :8847
            await era.printAndWait(
              `『啊啊……被，被姐姐夺去处女了啊啊${heart(1)}』`,
            ); // :8848
            await era.printAndWait(
              `「呜呜，对不起，对不起，${player_name}……真的……呜呜呜」`,
            ); // :8849
            await era.printAndWait(
              `在${master_name}的命令下，${target_name}，哭泣着侵犯了自己妹妹，夺去了${player_name}的处女身。`,
            ); // :8850
            await era.printAndWait(
              `极度的屈辱，痛苦与内疚让她眼泪不住地往下流，而${master_name}抓着她的腰，强迫她继续着。`,
            ); // :8851
            await era.printAndWait(
              `从${player_name}的蜜穴里慢慢淌出了纯洁的处女之血……`,
            ); // :8852
          } // :8853
        } else {
          // :8854

          if (era.get(`talent:${target}:76`) === 1) {
            // :8856
            await era.printAndWait(
              `「哎哎……差点都忘记${player_name}已经不再是女孩子了呢！那就不用客气了呢！」`,
            ); // :8857
            await era.printAndWait(
              `${target_name}兴奋地扭动着腰，尽情地侵犯着${player_name}。`,
            ); // :8858
            await era.printAndWait(
              `「哎呀呀，被姐姐侵犯也会这么有感觉呢，不过反正都不是处女了，也不奇怪！」`,
            ); // :8859
            await era.printAndWait(
              `『呜……啊啊……姐姐好棒……一点都不输给男人啊啊啊${heart(1)}』`,
            ); // :8860
            await era.printAndWait(
              `已经被充分调教过的${player_name}在如此激烈的交合下，感受到了无上的快感。`,
            ); // :8861
            await era.printAndWait(`这场姐妹的乱伦盛宴让你大饱眼福……`); // :8862
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :8864
            await era.printAndWait(`『哎呀呀……姐姐技术很生疏呢${heart(1)}』`); // :8865
            await era.printAndWait(
              `${player_name}被${target_name}抱在怀里，很快就适应了姐姐腰部动作的节奏，甚至自己扭起腰来。`,
            ); // :8866
            await era.printAndWait(`「…为什么……会这么熟练的？」`); // :8867
            await era.printAndWait(
              `『嘿嘿……是因为已经被魔王大人用各种方式调教过了呢${heart(1)} 』`,
            ); // :8868
            await era.printAndWait(
              `${player_name}从容的姿态让${target_name}皱起了眉头，但很快就恢复了笑容，加快了抽插的速度。`,
            ); // :8869
            await era.printAndWait(
              `「这样的话会舒服一些吗，${player_name}……嗯啊啊？」`,
            ); // :8870
            await era.printAndWait(`『哈啊……舒服多了……姐姐好棒啊！』`); // :8871
          } else {
            // :8873
            await era.printAndWait(
              `${target_name}在你的命令下，不得不开始侵犯自己的妹妹。`,
            ); // :8874
            await era.printAndWait(
              `「呜呜……对不起，${player_name}，对不起……」`,
            ); // :8875
            await era.printAndWait(
              `无法违抗你的命令的${target_name}只能泪流满面地扭动着腰。`,
            ); // :8876
            await era.printAndWait(
              `『哎呀呀……姐姐技术不行啊！腰动得这么慢，一点感觉都没有，哼♪』`,
            ); // :8877
            await era.printAndWait(`「可，可是……呜呜呜！」`); // :8878
            await era.printAndWait(
              `${player_name}毫无廉耻的态度和语气让${target_name}羞得满脸通红，无奈地加快了抽插的速度………`,
            ); // :8879
          } // :8880
        } // :8881
      } // :8882
      // CFLAG:TARGET:366  = 1（变量语义：CFLAG 族，TARGET:366） // :8883
      kojo.侵犯助手 = 1; // :8883
      return 0; // :8884
    } else {
      // :8886

      if (assi_mao) {
        // :8888

        if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.侵犯助手 <= 8 || game.kojo.口上开关 === 2)
        ) {
          // :8890
          await era.printAndWait(`『哈啊……姐姐来吧……我准备好了哦${heart(1)}』`); // :8891
          await era.printAndWait(
            `${player_name}用四肢趴在床上，让${target_name}从后面进入了自己的身体。`,
          ); // :8892
          await era.printAndWait(
            `「嘿嘿，妹妹变这么坦率，姐姐真高兴${heart(1)} 接下来就要一直侵犯到高潮为止了哦${heart(1)}」`,
          ); // :8893
          await era.printAndWait(
            `『呜啊……啊啊啊……姐姐好棒${heart(1)} 最喜欢姐姐了……最喜欢了啊啊啊${heart(1)}』`,
          ); // :8894
          await era.printAndWait(
            `${target_name}听到妹妹的夸奖，心满意足地加快了抽插的动作……`,
          ); // :8895
          // CFLAG:TARGET:366  = 9（变量语义：CFLAG 族，TARGET:366） // :8896
          kojo.侵犯助手 = 9; // :8896
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 7 || game.kojo.口上开关 === 2)
        ) {
          // :8898
          await era.printAndWait(
            `「${player_name}乖乖趴着，屁股再翘高一点……对，就是这样……恩恩，姐姐最喜欢坦率的${player_name}了${heart(1)}」`,
          ); // :8899
          await era.printAndWait(
            `『哎哎……这次要稍微温柔一点哦姐姐，不要弄痛我！』`,
          ); // :8900
          await era.printAndWait(
            `${target_name}舔着嘴唇，抓着${player_name}的臀部，一口气贯入到了蜜穴最深处。`,
          ); // :8901
          await era.printAndWait(
            `『呜……呜啊啊……太深了，都说……温柔一点了啊啊！』`,
          ); // :8902
          await era.printAndWait(
            `「这可不是你说了算哦，接下来就要侵犯到${player_name}失神为止了哦，嘿嘿嘿。」`,
          ); // :8903
          // CFLAG:TARGET:366  = 8（变量语义：CFLAG 族，TARGET:366） // :8904
          kojo.侵犯助手 = 8; // :8904
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.侵犯助手 <= 6 || game.kojo.口上开关 === 2)
        ) {
          // :8906
          await era.printAndWait(
            `「老实一点啊，${player_name}，不然会很痛的哦${heart(1)}」`,
          ); // :8907
          await era.printAndWait(
            `${target_name}舔着嘴唇，开始侵犯妹妹${player_name}幼小而紧致的蜜穴。`,
          ); // :8908
          await era.printAndWait(`『呜……啊啊……姐姐……不，不能再进去了啊啊！』`); // :8909
          await era.printAndWait(
            `「哎呀呀！不好意思……不过呢，我可没打算停下来呀${heart(1)}」`,
          ); // :8910
          await era.printAndWait(
            `${target_name}脸上浮现了兴奋的笑容，继续侵犯着${player_name}……`,
          ); // :8911
          // CFLAG:TARGET:366  = 7（变量语义：CFLAG 族，TARGET:366） // :8912
          kojo.侵犯助手 = 7; // :8912
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 5 &&
          (kojo.侵犯助手 <= 5 || game.kojo.口上开关 === 2)
        ) {
          // :8914
          await era.printAndWait(
            `「嗯啊……${heart(1)} 虽然一直喜欢你，但只有这样，${player_name}才会真正变成属于我的了啊啊啊！」`,
          ); // :8915
          await era.printAndWait(`『我，我也最爱姐姐啊${heart(1)}』`); // :8916
          await era.printAndWait(
            `${target_name}和${player_name}两具身躯淫靡的交缠在一起，尽情享受着百合之交的极度快感。`,
          ); // :8917
          await era.printAndWait(
            `姐妹百合淫靡而甘甜的气味，飘散在调教室的空气中……`,
          ); // :8918
          // CFLAG:TARGET:366  = 6（变量语义：CFLAG 族，TARGET:366） // :8919
          kojo.侵犯助手 = 6; // :8919
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :8921
          await era.printAndWait(`「啊啊，姐姐最爱你了，${player_name}♪」`); // :8922
          await era.printAndWait(
            `${target_name}的眼中泛着爱的光芒，将${player_name}压在自己的身下，侵犯着小小的蜜穴。`,
          ); // :8923
          await era.printAndWait(
            `『说，说什么呢啊姐姐……我，我可是属于魔王大人的呢${heart(1)} 不过……姐姐的动作好温柔，好舒服啊啊…${heart(1)}』`,
          ); // :8924
          await era.printAndWait(
            `「姐姐也很舒服啊，${player_name}，${player_name}……让我们永远在一起吧${heart(1)}」`,
          ); // :8925
          // CFLAG:TARGET:366  = 5（变量语义：CFLAG 族，TARGET:366） // :8926
          kojo.侵犯助手 = 5; // :8926
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.侵犯助手 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :8928
          await era.printAndWait(`『呜……啊啊……姐姐的身体……好温暖！』`); // :8929
          await era.printAndWait(
            `「啊啊，${player_name}！${player_name}的身体也是啊！」`,
          ); // :8930
          await era.printAndWait(
            `${target_name}抱着身下的${player_name}，温和地侵入着妹妹小小的蜜穴……`,
          ); // :8931
          // CFLAG:TARGET:366  = 4（变量语义：CFLAG 族，TARGET:366） // :8932
          kojo.侵犯助手 = 4; // :8932
        } else if (
          chara(target).chara.百合气质 >= 3 &&
          (kojo.侵犯助手 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :8934
          await era.printAndWait(
            `「对不起，${player_name}…真的对不起……呜呜……姐姐也不知道为什么自己会变成这样！」`,
          ); // :8935
          await era.printAndWait(
            `${target_name}道着歉的同时，动作也停了下来。`,
          ); // :8936
          await era.printAndWait(
            `『没关系的……姐姐${heart(1)} 来吧……侵犯${player_name}吧${heart(1)} 因为……${player_name}…最喜欢姐姐了啊！』`,
          ); // :8937
          await era.printAndWait(
            `听到${player_name}呻吟着的回答，${target_name}吻着自己的妹妹，重新动起了腰……`,
          ); // :8938
          // CFLAG:TARGET:366  = 3（变量语义：CFLAG 族，TARGET:366） // :8939
          kojo.侵犯助手 = 3; // :8939
        } else if (kojo.侵犯助手 <= 1 || game.kojo.口上开关 === 2) {
          // :8941
          await era.printAndWait(
            `${target_name}在你的命令下，无可奈何地开始侵犯自己的妹妹。`,
          ); // :8942
          await era.printAndWait(`「呜呜……对不起，对不起，${player_name}………」`); // :8943
          await era.printAndWait(
            `『哈啊……姐姐……没关系啦。被姐姐侵犯，${player_name}其实……一点都不介意呀${heart(1)}』`,
          ); // :8944
          await era.printAndWait(
            `${target_name}脸颊上满是屈辱的泪水，动作缓慢地侵犯着自己的妹妹。`,
          ); // :8945
          // CFLAG:TARGET:366  = 2（变量语义：CFLAG 族，TARGET:366） // :8946
          kojo.侵犯助手 = 2; // :8946
        } // :8947
      } // :8948
      return 0; // :8949
    } // :8950
  } // :8951

  if (era_flag.selectcom === 66) {
    // :8957

    if (kojo.双人口交 === 0) {
      // :8959

      if (assi_mao) {
        // :8961

        if (era.get(`talent:${target}:76`) === 1) {
          // :8963
          await era.printAndWait(
            `「哈啊……魔王大人和${assi_name}的阴茎……都好棒啊${heart(1)}」`,
          ); // :8964
          await era.printAndWait(`『姐姐，快点吸人家的小鸡鸡啦♪』`); // :8965
          await era.printAndWait(
            `正在为${master_name}口交的${target_name}，卖力地吸吮着口中的阴茎，${assi_name}在一旁看得急不可耐的样子。`,
          ); // :8966
          await era.printAndWait(
            `「别急啦……让我先帮魔王大人口完就轮到你了${heart(1)} 咕呣……咕呣……${heart(1)} 魔王大人的阴茎的味道……好棒${heart(1)}」`,
          ); // :8967
          await era.printAndWait(
            `『魔王大人快点啦，快点把精液射在姐姐这淫荡的嘴巴小穴里……然后让我也享受一下啦${heart(1)}』`,
          ); // :8968
          await era.printAndWait(
            `${assi_name}，用勃起的阴茎在${target_name}的脸上来回摩擦着，见状，${target_name}无奈地吐出了${master_name}的阴茎，转而舔着妹妹的。`,
          ); // :8969
          await era.printAndWait(
            `「哎哎，别那么急嘛${heart(1)} 你和魔王大人的阴茎，我都会用嘴巴小穴好好侍奉的${heart(1)}」`,
          ); // :8970
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :8972
          await era.printAndWait(
            `「啊啊……两人的阴茎都已经……勃起得硬邦邦的了呀${heart(1)}」`,
          ); // :8973
          await era.printAndWait(`『快点啊姐姐，要好好舔到我们满意为止哦！』`); // :8974
          await era.printAndWait(`「好，好啦……不要那么急嘛♪」`); // :8975
          await era.printAndWait(
            `${target_name}红着脸将两人的阴茎温柔地握在手心、然后低下头含住了${master_name}的阴茎，努力地吸吮着。`,
          ); // :8976
          await era.printAndWait(
            `「咕呣……咕呣……魔王大人的阴茎的味道${heart(1)} 光是这么含着……就感觉好舒服${heart(1)} ${assi_name}不要着急，我也会让你一起舒服的${heart(1)} 请两位……尽情享用${target_name}的嘴巴小穴吧${heart(1)} 」`,
          ); // :8977
          await era.printAndWait(
            `${target_name}伸出舌头，轮流舔着两人的龟头，双手也抓着阴茎来回摩擦着。`,
          ); // :8978
          await era.printAndWait(
            `『啊啊……姐姐的舌头……好棒${heart(1)} 光是这么舔着……人家就已经要射了啊啊${heart(1)}』`,
          ); // :8979
        } else {
          // :8981
          await era.printAndWait(
            `「一，一定要两个人一起来吗（明明……是这么讨厌的事情……为什么……视线完全移不开？）」`,
          ); // :8982
          await era.printAndWait(
            `${master_name}和${assi_name}的阴茎从左右两边逼近了${target_name}的脸，抵在了鼻子和嘴唇上。`,
          ); // :8983
          await era.printAndWait(
            `『努力用嘴巴让我们射出来就行了，加油啊姐姐♪』`,
          ); // :8984
          await era.printAndWait(
            `望着妹妹那急不可耐的样子，${target_name}叹息了一声、张开嘴含住了妹妹的阴茎吸吮了起来。`,
          ); // :8985
          await era.printAndWait(`「我会……好好口交的……咕呣……咕呣……！」`); // :8986
          await era.printAndWait(
            `『唔哇哇……姐姐的口交好舒服！已经被调教的这么好了呀！看，魔王大人也兴奋起来了呢♪』`,
          ); // :8987
          await era.printAndWait(
            `${master_name}用勃起的阴茎在${target_name}脸上来回摩擦着，${target_name}的眼神黯淡了下去，露出完全屈服的表情，开始用嘴巴侍奉着${master_name}的阴茎……`,
          ); // :8988
        } // :8989
      } else {
        // :8990

        if (era.get(`talent:${target}:76`) === 1) {
          // :8992
          await era.printAndWait(''); // :8993
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :8995
          await era.printAndWait(''); // :8996
        } else {
          // :8998
          await era.printAndWait(''); // :8999
        } // :9000
      } // :9001
      // CFLAG:TARGET:367  = 1（变量语义：CFLAG 族，TARGET:367） // :9002
      kojo.双人口交 = 1; // :9002
      return 0; // :9003
    } else {
      // :9005

      if (assi_mao) {
        // :9007

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9009
          switch (
            rand_n(3) // :9010
          ) {
            case 2: {
              // :9011
              await era.printAndWait(
                `「呣啊……呣啊${heart(1)} 魔王大人……还有${assi_name}的阴茎${heart(1)} 都好棒${heart(1)} 好好吃${heart(1)}」`,
              ); // :9012
              await era.printAndWait(
                `${target_name}交替吸吮着${master_name}和${assi_name}的阴茎，用灵巧的舌头不断刺激着龟头的敏感点。`,
              ); // :9013
              await era.print(
                `『唔哇哇……姐姐的舌头${heart(1)} 好棒好舒服……表情也变得这么淫乱了，小鸡鸡真的那么好吃吗！？』`,
              ); // :9014
              await era.printAndWait(
                `${target_name}精湛的口交技术让${assi_name}和${master_name}的腰一阵阵酥麻，快感沿着脊髓一路上传到大脑。`,
              ); // :9015
              await era.printAndWait(
                `「咕呣……呣呣${heart(1)}…来吧……一起在我的嘴巴小穴射的满满的吧${heart(1)}」`,
              ); // :9016
              await era.printAndWait(
                `${target_name}从口交侍奉中感到了极大的心理满足和快感，带着无比兴奋的表情，继续轮流吸吮着两人的阴茎……`,
              ); // :9017
              break; // :9018
            } // :9018
            case 1: {
              // :9018
              await era.printAndWait(
                `${target_name}轮流吸吮着两人的阴茎，唾液从贪婪的嘴里不住地流出，沾满了整根茎身。`,
              ); // :9019
              await era.printAndWait(
                `「咕呣……呣呣${heart(1)} 阴茎……好棒……好好吃${heart(1)}」`,
              ); // :9020
              await era.print(
                `『哎呀呀，姐姐吸小鸡鸡吸得这么起劲，在嘴里进进出出的…${heart(1)} 完全变成口交性奴了呢${heart(1)}』`,
              ); // :9021
              await era.printAndWait(
                `「是啊……是啊${heart(1)}…要让姐姐一次吸吮两根吗……也好啊，不过作为回报，你们得一起射在我的嘴里哦${heart(1)}」`,
              ); // :9022
              await era.printAndWait(
                `${target_name}说着淫乱不堪的台词，然后低下头继续用嘴侍奉着两人的阴茎……`,
              ); // :9023
              break; // :9024
            } // :9024
            case 0: {
              // :9024
              await era.printAndWait(
                `「咕啾……咕啾${heart(1)} 居然能独占${assi_name}和魔王大人两人的阴茎……${heart(1)} 真是太幸福了${heart(1)}」`,
              ); // :9025
              await era.print(
                `『啊啊……姐姐吸吮得那么起劲！真的有那么好吃吗？』`,
              ); // :9026
              await era.printAndWait(
                `${target_name}带着急促的呼吸，卖力地舔舐，吸吮着妹妹的阴茎，灵巧的舌头不断地刺激着龟头的敏感点。`,
              ); // :9027
              await era.printAndWait(
                `「是啊……人家的嘴巴小穴……最喜欢被阴茎塞得满满的${heart(1)} 咕呣……咕呣……咕呣${heart(1)} 精液……快点给我吧……${heart(1)} 咕呣咕呣${heart(1)}」`,
              ); // :9028
              await era.print(
                `『啊啊……姐姐的口交好舒服，舒服得腰都快软掉了${heart(1)} 』`,
              ); // :9029
              await era.printAndWait(
                `「接下来是魔王大人的阴茎了哦${heart(1)} 来吧……尽情地侵犯${target_name}淫乱的嘴巴小穴里吧${heart(1)} 呣啾……呣啾${heart(1)}」`,
              ); // :9030
              await era.printAndWait(
                `在妹妹的称赞下得到极大心理满足的${target_name}向${master_name}露出娇媚而得意的表情，转而开始吸吮${master_name}的阴茎……`,
              ); // :9031
              break; // :9032
            } // :9032
          } // :9032
          // CFLAG:367  = 5（变量语义：CFLAG 族，367） // :9033
          kojo.双人口交 = 5; // :9033
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9035
          switch (
            rand_n(3) // :9036
          ) {
            case 2: {
              // :9037
              await era.printAndWait(
                `「请尽情享用${target_name}的嘴巴小穴吧${heart(1)} 咕呣……呣呣呣${heart(1)} ♪」`,
              ); // :9038
              await era.print(`『姐姐，快点也吸一下人家的小鸡鸡${heart(1)}』`); // :9039
              await era.printAndWait(
                `${target_name}低着头，轮流用嘴侍奉着${master_name}和${assi_name}两人的阴茎。`,
              ); // :9040
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)}…两人的阴茎${heart(1)} 都好热，好硬……咕呣呣${heart(1)}」`,
              ); // :9041
              await era.printAndWait(
                `『啊啊……对！就是那里！快点再舔那个位置${heart(1)}』`,
              ); // :9042
              break; // :9043
            } // :9043
            case 1: {
              // :9043
              await era.printAndWait(
                `${target_name}低着头，轮流用嘴热情地侍奉着${master_name}和${assi_name}两人的阴茎。`,
              ); // :9044
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)}…阴茎在嘴巴里的感觉……好棒……咕呣呣${heart(1)}」`,
              ); // :9045
              await era.print(
                `『啊啊……姐姐，快点吞到最里面啊${heart(1)} 让我感受一下姐姐的喉咙小穴${heart(1)}』`,
              ); // :9046
              await era.printAndWait(
                `「不，不要急啦……你和魔王大人都会有的${heart(1)}」`,
              ); // :9047
              await era.printAndWait(
                `${target_name}微笑着，温柔地含住了${assi_name}的阴茎，一直吞到了喉咙深处……`,
              ); // :9048
              break; // :9049
            } // :9049
            case 0: {
              // :9049
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)} 呜啊……两人的阴茎……都在嘴里坚挺起来了${heart(1)}」`,
              ); // :9050
              await era.print(
                `『哎呀呀，姐姐完全兴奋起来了呢，连嘴巴小穴也能感觉到快感吗${heart(1)} 哈哈，魔王大人你看，以后就让姐姐当我们的口交性奴好了呢！』`,
              ); // :9051
              await era.printAndWait(
                `「才，才不会……有快感……呣呣呣……咕呣……咕呣${heart(1)}」`,
              ); // :9052
              await era.printAndWait(
                `被妹妹羞辱得满脸通红的${target_name}，内心却更加兴奋，继续卖力地吸吮着两人的阴茎	。`,
              ); // :9053
              await era.printAndWait(
                `「咕呣……咕呣${heart(1)} 呣呣呣……${heart(1)} 要，要射精的时候……记得说一声${heart(1)}」`,
              ); // :9054
              await era.print(
                `『啊啊${heart(1)} 看到姐姐口交时的淫荡样子就已经让人受不了了${heart(1)}』`,
              ); // :9055
              await era.printAndWait(
                `${target_name}低着头，用舌尖缠卷着龟头，继续用嘴和喉咙侍奉着两人的阴茎……`,
              ); // :9056
              break; // :9057
            } // :9057
          } // :9057
          // CFLAG:367  = 4（变量语义：CFLAG 族，367） // :9058
          kojo.双人口交 = 4; // :9058
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9060
          switch (
            rand_n(3) // :9061
          ) {
            case 2: {
              // :9062
              await era.printAndWait(
                `「请……按顺序来啊……不要把阴茎……在人家的脸上来回蹭♪」`,
              ); // :9063
              await era.print(
                `『哎呀，姐姐我实在是等不及了嘛……快点也给我舔啊♪』`,
              ); // :9064
              await era.printAndWait(
                `「好……好吧……咕呣……咕呣……呣呣呣（呜呜……为什么还不射……还要舔多久！）」`,
              ); // :9065
              break; // :9066
            } // :9066
            case 1: {
              // :9066
              await era.printAndWait(
                `「咕呣……咕呣……两，两根一起吸的话……会有奖励吗♪」`,
              ); // :9067
              await era.print(
                `『奖励？能让性奴姐姐和魔王大人的鸡鸡亲吻，还有什么不知足的${heart(1)} 快点吸啦${heart(1)}』`,
              ); // :9068
              await era.printAndWait(`「好……好的……咕呣……呣呣呣♪」`); // :9069
              break; // :9070
            } // :9070
            case 0: {
              // :9070
              await era.printAndWait(
                `「咕呣咕呣……呣呣……阴茎好烫，好硬……呣呣♪」`,
              ); // :9071
              await era.print(
                `『哎嘿嘿，姐姐的嘴巴小穴还挺舒服的。${heart(1)} 呐，我和魔王大人的阴茎，哪一根吃起来比较舒服啊？不许思考，马上回答。答错了就要惩罚哦。』`,
              ); // :9072
              await era.printAndWait(`「这……这种问题……咕呣……呣呣呣…♪」`); // :9073
              await era.printAndWait(
                `${target_name}只能通过努力口交来回避这种怎么回答都是错误的问题……`,
              ); // :9074
              break; // :9075
            } // :9075
          } // :9075
          // CFLAG:367  = 3（变量语义：CFLAG 族，367） // :9076
          kojo.双人口交 = 3; // :9076
        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9078
          switch (
            rand_n(3) // :9079
          ) {
            case 2: {
              // :9080
              await era.printAndWait(`「呜呜……味道……好难闻……咕呣……咕呣！」`); // :9081
              await era.print(`『该吸吮人家的小鸡鸡了啦！快点快点』`); // :9082
              await era.printAndWait(`「呜呜……饶，饶了姐姐吧……下巴好酸……」`); // :9083
              break; // :9084
            } // :9084
            case 1: {
              // :9084
              await era.printAndWait(
                `「唔呣……唔呣……不，不可以啊……两根……不能一起进到嘴巴里的！」`,
              ); // :9085
              await era.print(
                `『那就要更努力地舔啊！不然的话就把姐姐的下巴卸脱臼，就可以两根一起进去了！』`,
              ); // :9086
              await era.printAndWait(
                `「不……不要对姐姐做那么可怕的事情……求你了……我，我会好好舔的…」`,
              ); // :9087
              break; // :9088
            } // :9088
            case 0: {
              // :9088
              await era.printAndWait(
                `「呜呜……什么时候才能结束……咕呣……咕呣……」`,
              ); // :9089
              await era.print(
                `『哎嘿嘿，姐姐的嘴巴小穴，还挺舒服呢${heart(1)}』`,
              ); // :9090
              await era.printAndWait(
                `「然，然后轮到魔王大人了吗……咕呣……咕呣！」`,
              ); // :9091
              break; // :9092
            } // :9092
          } // :9092
          // CFLAG:367  = 2（变量语义：CFLAG 族，367） // :9093
          kojo.双人口交 = 2; // :9093
        } // :9094
      } else {
        // :9095

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9097
          await era.printAndWait(''); // :9098
          // CFLAG:367  = 5（变量语义：CFLAG 族，367） // :9099
          kojo.双人口交 = 5; // :9099
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9101
          await era.printAndWait(''); // :9102
          // CFLAG:367  = 4（变量语义：CFLAG 族，367） // :9103
          kojo.双人口交 = 4; // :9103
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9105
          await era.printAndWait(''); // :9106
          // CFLAG:367  = 3（变量语义：CFLAG 族，367） // :9107
          kojo.双人口交 = 3; // :9107
        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9109
          await era.printAndWait(''); // :9110
          // CFLAG:367  = 2（变量语义：CFLAG 族，367） // :9111
          kojo.双人口交 = 2; // :9111
        } // :9112
      } // :9113
      return 0; // :9114
    } // :9115
  } // :9116

  if (era_flag.selectcom === 68) {
    // :9124

    if (kojo.双人侍奉口交 === 0) {
      // :9126

      if (assi_mao) {
        // :9128

        if (era.get(`talent:${target}:76`) === 1) {
          // :9130
          await era.printAndWait(
            `姐妹两人顺从地跪在${master_name}的腿前，一同侍奉着${master_name}的阴茎。`,
          ); // :9131
          await era.printAndWait(
            `「魔王大人……请享用人家的嘴和喉咙小穴吧${heart(1)} 咕呣……咕呣……呣呣……好美味……魔王大人的阴茎${heart(1)}」`,
          ); // :9132
          await era.printAndWait(
            `『啊啊啊，姐姐太狡猾了，居然一人独占了！还整根都吞到嘴里了！』`,
          ); // :9133
          await era.printAndWait(
            `被姐姐抢了先机的${assi_name}慌慌张张地抱着${master_name}的脚，寻找着机会从${target_name}的嘴边夺回侍奉${master_name}阴茎的机会。`,
          ); // :9134
          await era.printAndWait(
            `『啊啊，我也想被魔王大人侵犯嘴巴啊……姐姐一个人独占真是太卑鄙了！呜呜呜！』`,
          ); // :9135
          await era.printAndWait(
            `「咕呣……咕呣……对不起啦……人家只是一看到魔王大人的阴茎，就完全无法自控了而已……来吧，接下来我们就一起侍奉吧。」`,
          ); // :9136
          await era.printAndWait(
            `${target_name}又吸吮了几次，然后将被唾液沾满的阴茎让到了妹妹的那一边。`,
          ); // :9137
          await era.printAndWait(
            `『耶耶……姐姐真是好人，接下来就请魔王大人享用${assi_name}的嘴巴小穴吧……咕呣……呣呣呣${heart(1)}』`,
          ); // :9138
          await era.printAndWait(
            `「哎呀，那么开心的样子……那，剩下的地方就交给我的舌头吧${heart(1)} 呣啾……呣啾……呣啾${heart(1)}」`,
          ); // :9139
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :9141
          await era.printAndWait(
            `姐妹两人跪在${master_name}的腿前，一同用嘴侍奉着${master_name}的阴茎。`,
          ); // :9142
          await era.printAndWait(`「啊啊……魔王大人的阴茎，好坚挺好雄伟♪」`); // :9143
          await era.printAndWait(`『是啊……人家最喜欢了…咕呣……咕呣……呣呣♪』`); // :9144
          await era.printAndWait(
            `「喂！不是说好一人一半吗！不能一人独占啊${heart(1)}」`,
          ); // :9145
          await era.printAndWait(
            `『哎呀呀，姐姐，我只是忍不住先舔一下而已啦……来吧，一起来侍奉魔王大人的阴茎吧${heart(1)}』`,
          ); // :9146
          await era.printAndWait(
            `关系融洽的姐妹两人，如同商量好了一般，一人一边舔舐着${master_name}的阴茎，轮流含进嘴里吸吮着。`,
          ); // :9147
          await era.printAndWait(
            `「呣呣……呣呣……魔王大人……请尽情享用我们姐妹性奴的嘴巴和喉咙小穴吧…${heart(1)} 」`,
          ); // :9148
          await era.printAndWait(
            `在两人卖力地用嘴，舌头和喉咙侍奉下，${master_name}的阴茎更加坚挺了……`,
          ); // :9149
        } else {
          // :9151
          await era.printAndWait(
            `姐妹两人跪在${master_name}的腿前，一同用嘴侍奉着${master_name}的阴茎。`,
          ); // :9152
          await era.printAndWait(`『嘿嘿，姐姐先来，我后补……♪』`); // :9153
          await era.printAndWait(`「让，让我先吗……好，好的……呣呣……呣呣」`); // :9154
          await era.printAndWait(
            `『不用客气，要好好用你的嘴巴小穴侍奉魔王大人的阴茎啊』`,
          ); // :9155
          await era.printAndWait(
            `${assi_name}看着姐姐努力地口交着，也忍不住低下头，用舌头舔着${master_name}的睾丸。`,
          ); // :9156
          await era.printAndWait(
            `『哈啊，魔王大人……我们姐妹性奴一起侍奉的感觉如何呀${heart(1)}』`,
          ); // :9157
          await era.printAndWait(`「啊啊……下巴好酸……」`); // :9158
          await era.printAndWait(
            `${target_name}带着些许悲伤和绝望的神情、和妹妹继续进行口交侍奉……`,
          ); // :9159
        } // :9160
      } else {
        // :9161

        if (era.get(`talent:${target}:76`) === 1) {
          // :9163
          await era.printAndWait(''); // :9164
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :9166
          await era.printAndWait(''); // :9167
        } else if (chara(target).system.侍奉精神 >= 3) {
          // :9169
          await era.printAndWait(''); // :9170
        } else {
          // :9172
          await era.printAndWait(''); // :9173
        } // :9174
      } // :9175
      // CFLAG:TARGET:369  = 1（变量语义：CFLAG 族，TARGET:369） // :9176
      kojo.双人侍奉口交 = 1; // :9176
      return 0; // :9177
    } else {
      // :9179

      if (assi_mao) {
        // :9181

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人侍奉口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9183

          if (era.get(`talent:${era_flag.assi}:85`)) {
            // :9185
            switch (
              rand_n(3) // :9186
            ) {
              case 2: {
                // :9187
                await era.printAndWait(
                  `「咕呣……咕呣……${heart(1)} 魔王大人的阴茎……好美味${heart(1)} 呣呣……呣呣呣${heart(1)}」`,
                ); // :9188
                await era.print(
                  `『姐姐，也让我舔一下啊${heart(1)} 咕呣呣${heart(1)}』`,
                ); // :9189
                await era.printAndWait(
                  `姐妹两人口舌并用地一起侍奉着${master_name}的阴茎，交缠的舌头和飞溅的唾液，连同两人的淫靡的表情和动作一同构成了一副无比动人的景象。`,
                ); // :9190
                await era.printAndWait(
                  `「只有我的嘴巴小穴才是最适合魔王大人的阴茎的呢…${assi_name}肯定就做不到这么好${heart(1)} 咕呣……咕呣……咕呣${heart(1)}」`,
                ); // :9191
                await era.print(
                  `『人家的口交才，才不会输给姐姐你呢…！魔王大人你说是不是${heart(1)} 呣呣……呣呣${heart(1)} 唔唔～♪』`,
                ); // :9192
                await era.printAndWait(
                  `${assi_name}一副不愿意输给姐姐的样子，从下边舔着，吸吮着${master_name}的睾丸………`,
                ); // :9193
                break; // :9194
              } // :9194
              case 1: {
                // :9194
                await era.print(
                  `『呜哇哇……姐姐的口水流得这么多出来${heart(1)}』`,
                ); // :9195
                await era.printAndWait(
                  `「咕啾……咕啾${heart(1)} 呣呣呣……魔王大人的阴茎${heart(1)} …在我的嘴巴小穴里……搅拌着……咕呣……咕呣${heart(1)}」`,
                ); // :9196
                await era.printAndWait(
                  `${target_name}稍微吐出了阴茎，让妹妹舔着上面残留的口水，亲吻着龟头的敏感点。`,
                ); // :9197
                await era.print(
                  `『真是的……姐姐的嘴巴已经完全变成性器了呢呣呣……呣呣……${heart(1)}』`,
                ); // :9198
                await era.printAndWait(
                  `「是啊……姐姐的嘴和喉咙……就是魔王大人的专用小穴啊啊${heart(1)}」`,
                ); // :9199
                await era.printAndWait(
                  `${target_name}将阴茎的掌控权从妹妹的手中强夺了回来，继续含进口中，无比热情地吸吮着，舔舐着。`,
                ); // :9200
                await era.printAndWait(
                  `「哎哎……我还没侍奉够呢，姐姐怎么这样呢${heart(1)} 好吧……那我就舔其他的地方好了……呣呣……呣呣${heart(1)}」`,
                ); // :9201
                break; // :9202
              } // :9202
              case 0: {
                // :9202
                await era.printAndWait(
                  `「咕啾……咕啾${heart(1)} 呣呣呣……魔王大人的阴茎${heart(1)} 好热……好硬${heart(1)}」`,
                ); // :9203
                await era.print(
                  `『唔哇哇……姐姐居然会露出这样的表情……真的那么喜欢给魔王大人口交吗${heart(1)} 喂，也让我舔舔，人家也要侍奉魔王大人${heart(1)}』`,
                ); // :9204
                await era.printAndWait(
                  `${assi_name}从姐姐的旁边加入，用灵巧的舌头来回舔舐着${master_name}的阴茎根部和睾丸，唾液都流到了大腿根上。`,
                ); // :9205
                await era.printAndWait(
                  `姐妹两人热情侍奉带来的强烈快感沿着${player_name}的腰一路向上传递。`,
                ); // :9206
                await era.print(
                  `『唔呣呣……魔王大人的阴茎，一跳一跳的，好像要射精了呢${heart(1)} 』`,
                ); // :9207
                await era.printAndWait(
                  `「呣呣？${heart(1)} 魔王大人……请一定要射在我的嘴里啊${heart(1)} 在${target_name}的嘴巴小穴里射的满满的吧${heart(1)}」`,
                ); // :9208
                break; // :9209
              } // :9209
            } // :9209
          } else if (era.get(`talent:${era_flag.assi}:76`)) {
            // :9211
            switch (
              rand_n(3) // :9212
            ) {
              case 2: {
                // :9213
                await era.print(
                  `『唔呣……唔呣${heart(1)} 魔王大人的阴茎……喜欢${assi_name}的嘴巴小穴吗${heart(1)}』`,
                ); // :9214
                await era.printAndWait(
                  `「快点……让我来${heart(1)} 呣呣呣……咕呣……咕呣${heart(1)} 魔王大人的阴茎……好棒……好喜欢${heart(1)}」`,
                ); // :9215
                await era.printAndWait(
                  `姐妹两人激烈地吸吮，舔舐着${master_name}的阴茎，为了争夺龟头，两根舌头卷绕在一起互不相让，唾液不住地从嘴角滴落在${master_name}的阴茎和大腿上。`,
                ); // :9216
                await era.printAndWait(
                  `「适可而止吧妹妹！魔王大人的阴茎是属于我的啊${heart(1)} 呣呣……呣呣……魔王大人你说是不是……${heart(1)}」`,
                ); // :9217
                await era.print(
                  `『哼，开什么玩笑${heart(1)} 我侍奉魔王大人的时候……你可还在村子里不知道想着谁自慰呢${heart(1)}』`,
                ); // :9218
                await era.printAndWait(
                  `两个奴隶居然在可笑地互相声明对${master_name}阴茎的所有权，但你只是冷笑了一下，什么话都没说，继续享受着两人的口交侍奉……`,
                ); // :9219
                break; // :9220
              } // :9220
              case 1: {
                // :9220
                await era.print(
                  `『魔王大人的阴茎的味道${heart(1)}…咕呣……咕呣${heart(1)}……好喜欢，最喜欢了${heart(1)}』`,
                ); // :9221
                await era.printAndWait(
                  `「人家比你更喜欢呢……快点轮到我了${heart(1)} 呸咯……呸咯……${heart(1)}」`,
                ); // :9222
                await era.printAndWait(
                  `作为妹妹的${assi_name}带着急促的呼吸，贪婪地吸吮着阴茎，${target_name}则不时向你投来淫媚的眼神，用灵巧的舌头刺激着敏感点。`,
                ); // :9223
                await era.printAndWait(
                  `「咕呣……咕呣${heart(1)}…… 如何……魔王大人${heart(1)} 还是人家的口交技术比较好吧${heart(1)} 」`,
                ); // :9224
                await era.print(
                  `『胡说……什么呢${heart(1)} 呣呣呣……呣呣${heart(1)} 明明就是人家的嘴巴小穴……更适合魔王大人${heart(1)}』`,
                ); // :9225
                await era.printAndWait(
                  `「明明是我……呣呣呣${heart(1)} …魔王大人……你说呢${heart(1)}」`,
                ); // :9226
                break; // :9227
              } // :9227
              case 0: {
                // :9227
                await era.printAndWait(
                  `「咕呣……咕呣${heart(1)}…… 感觉如何，魔王大人……要射精的话……记得说一声哦${heart(1)}」`,
                ); // :9228
                await era.printAndWait(
                  `${target_name}将${master_name}的阴茎含在嘴里吸吮着，用灵巧的舌头借着唾液搅拌着。`,
                ); // :9229
                await era.print(
                  `『姐姐好卑鄙${heart(1)} 留一点给人家啦${heart(1)} 我也想要魔王大人的阴茎在人家的嘴巴里搅拌啦${heart(1)}』`,
                ); // :9230
                await era.printAndWait(
                  `而${assi_name}则趴在下面，摇着屁股，看着姐姐贪婪地吸吮着龟头，自己却无从下嘴，气得脸颊鼓鼓的，只能用舌头舔着剩下的部位。`,
                ); // :9231
                await era.printAndWait(
                  `姐妹两人热情的侍奉带来的强烈快感刺激得${master_name}的阴茎一跳一跳的，见状，两人同时张开嘴，异口同声地说道。`,
                ); // :9232
                await era.print(
                  `「啊啊——魔王大人要射精了吗${heart(1)} 请把精液赏给这淫乱的嘴巴小穴吧${heart(1)}」`,
                ); // :9233
                await era.printAndWait(
                  `『啊啊——魔王大人要射精了吗${heart(1)} 请把精液赏给这淫乱的嘴巴小穴吧${heart(1)}』`,
                ); // :9234
                break; // :9235
              } // :9235
            } // :9235
          } // :9236
          // CFLAG:369  = 5（变量语义：CFLAG 族，369） // :9237
          kojo.双人侍奉口交 = 5; // :9237
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人侍奉口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9239

          if (era.get(`talent:${era_flag.assi}:85`)) {
            // :9241
            switch (
              rand_n(3) // :9242
            ) {
              case 2: {
                // :9243
                await era.printAndWait(
                  `「呣呣……呣呣${heart(1)}……请尽情享用我们两姐妹的嘴巴小穴吧${heart(1)}」`,
                ); // :9244
                await era.print(
                  `『哎呀……姐姐的口水都流出来了呢${heart(1)} 没关系，我来帮你舔干净${heart(1)}』`,
                ); // :9245
                await era.printAndWait(
                  `关系融洽的姐妹两人，如同商量好了一般，配合无间地侍奉着阴茎。`,
                ); // :9246
                await era.printAndWait(
                  `两根灵巧的舌头完美地配合着，缠绕着${master_name}的阴茎。`,
                ); // :9247
                await era.print(
                  `『魔王大人的阴茎……好坚挺好雄伟…${heart(1)} 呣呣呣……唔呣呣${heart(1)}』`,
                ); // :9248
                await era.printAndWait(
                  `「唔呣……魔王大人好像很满意呢${heart(1)} 作为奖励……请把精液射在我们姐妹两人的脸上吧${heart(1)} 」`,
                ); // :9249
                break; // :9250
              } // :9250
              case 1: {
                // :9250
                await era.printAndWait(
                  `「咕呣……咕呣……魔王大人的阴茎……好喜欢${heart(1)} 好美味${heart(1)}」`,
                ); // :9251
                await era.print(
                  `『哎呀姐姐……不要越线啊${heart(1)} 之前不是说得好好的吗……唔呣……唔呣……${heart(1)}』`,
                ); // :9252
                await era.printAndWait(
                  `姐妹两人沿着阴茎的正中线分成两边，用嘴热心地侍奉着自己的那一半，舌头时不时交缠在一起，一同刺激着龟头的敏感点。`,
                ); // :9253
                await era.printAndWait(
                  `「唔呣……唔呣……${heart(1)} 为魔王大人口交……好幸福啊${heart(1)} 魔王大人好像也兴奋起来了呢……呣呣……呣呣${heart(1)}」`,
                ); // :9254
                await era.print(
                  `『舒服的话，就请把精液在我们的嘴巴小穴里射的满满的吧，魔王大人${heart(1)} 呣呣……呣呣呣${heart(1)}』`,
                ); // :9255
                await era.printAndWait(
                  `两人热情而娴熟的口交侍奉下，${master_name}的阴茎感受到了强烈的快感……`,
                ); // :9256
                break; // :9257
              } // :9257
              case 0: {
                // :9257
                await era.print(
                  `『姐姐，该换人啦，轮到你来舔下面了，上面该我了${heart(1)}』`,
                ); // :9258
                await era.printAndWait(
                  `「知道啦……姐姐知道你的嘴巴小穴喜欢被魔王大人的阴茎侵犯啦${heart(1)} 不过……真的很舒服呢${heart(1)}」`,
                ); // :9259
                await era.printAndWait(
                  `姐姐露出荡漾而迷人的表情，看着妹妹张开嘴，含住了${master_name}的阴茎，卖力地吸吮起来，于是自己也低下头，舔着阴茎的根部和从妹妹嘴边落下的口水。`,
                ); // :9260
                await era.print(
                  `『魔王大人的阴茎……唔呣……唔呣…魔王大人的阴茎……${heart(1)} 最喜欢了！呣呣…呣呒…${heart(1)} ♪』`,
                ); // :9261
                await era.printAndWait(
                  `「魔王大人……如果您感觉满意的话…${heart(1)} 请射在我们的嘴里，让我们姐妹喝下您的精液吧${heart(1)}」`,
                ); // :9262
                break; // :9263
              } // :9263
            } // :9263
          } else if (era.get(`talent:${era_flag.assi}:76`)) {
            // :9265
            switch (
              rand_n(3) // :9266
            ) {
              case 2: {
                // :9267
                await era.print(
                  `『咕呣……唔呣呣${heart(1)}…… 魔王大人，这样舒服吗……呣呣……呣呣${heart(1)}』`,
                ); // :9268
                await era.printAndWait(
                  `妹妹${assi_name}含着${master_name}的龟头，激烈地吸吮着，而姐姐${target_name}则温柔地舔着阴茎根部和睾丸。`,
                ); // :9269
                await era.printAndWait(
                  `「呣呣……呣呣…${heart(1)} 呐，魔王大人……舒服的话就在${assi_name}的嘴里全部射出来吧${heart(1)} 我不会介意的♪」`,
                ); // :9270
                await era.print(
                  `『姐姐放心啦，我不会一个人独吞的啦……唔呣……唔呣……唔呣${heart(1)}』`,
                ); // :9271
                await era.printAndWait(
                  `显然已经兴奋起来的${assi_name}更卖力地吸吮着阴茎，而姐姐的舌头的动作也加快了。${master_name}尽情地享受着两人配合无间的侍奉……`,
                ); // :9272
                break; // :9273
              } // :9273
              case 1: {
                // :9273
                await era.print(
                  `『唔呣呣……呣呣${heart(1)}……呣呣……呣呣${heart(1)} ……呣呣……呣呣${heart(1)}』`,
                ); // :9274
                await era.printAndWait(
                  `${assi_name}无比热情地侍奉着${master_name}的阴茎，一次次吞到喉咙最深处，直到快要窒息才依依不舍地吐出来，这幅样子让一旁的${target_name}看得有些惊呆了。`,
                ); // :9275
                await era.printAndWait(
                  `「我都不知道……原来妹妹这么喜欢阴茎的♪」`,
                ); // :9276
                await era.printAndWait(
                  `${target_name}带着出神的表情看着妹妹全心全意侍奉着${master_name}的阴茎，卖力的吸吮，舔舐着，然后好像突然醒悟过来了一样。`,
                ); // :9277
                await era.printAndWait(
                  `「啊啊……也，也让我来一下嘛${heart(1)} 我的嘴巴和喉咙小穴……魔王大人也一定会喜欢的${heart(1)}」`,
                ); // :9278
                break; // :9279
              } // :9279
              case 0: {
                // :9279
                await era.printAndWait(
                  `「唔呣呣……呣呣${heart(1)}……呣呣……呣呣${heart(1)} ……阴茎在嘴里搅动的感觉…好舒服${heart(1)}」`,
                ); // :9280
                await era.printAndWait(
                  `${target_name}卖力地吸吮着${master_name}的阴茎，灵巧的舌头温柔地摩擦着龟头。`,
                ); // :9281
                await era.print(
                  `『那我就从后面来好了${heart(1)} 魔王大人一定会喜欢的……呣呣……呣呣${heart(1)}』`,
                ); // :9282
                await era.printAndWait(
                  `${assi_name}则跪在${master_name}身后，细心地舔舐着${master_name}的肛门。`,
                ); // :9283
                await era.printAndWait(
                  `姐妹两人一前一后的侍奉让${master_name}无比享受，产生了强烈的射精欲望。`,
                ); // :9284
                await era.printAndWait(
                  `「唔呣？！魔王大人的阴茎……在嘴里一跳一跳…${heart(1)} 啊啊～ 请尽情的把精液射在${target_name}的舌头上吧${heart(1)}」`,
                ); // :9285
                break; // :9286
              } // :9286
            } // :9286
          } // :9287
          // CFLAG:369  = 4（变量语义：CFLAG 族，369） // :9288
          kojo.双人侍奉口交 = 4; // :9288
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人侍奉口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9290
          switch (
            rand_n(3) // :9291
          ) {
            case 2: {
              // :9292
              await era.print(
                `『姐姐，龟头也要和我一起好好地舔啊，这样魔王大人才会满意…♪』`,
              ); // :9293
              await era.printAndWait(
                `「是，是吗……我，我明白了……呣呣……呣呣……♪」`,
              ); // :9294
              await era.printAndWait(
                `${target_name}和妹妹两人一起用灵巧的舌头舔舐着${master_name}阴茎的每一处敏感点……`,
              ); // :9295
              break; // :9296
            } // :9296
            case 1: {
              // :9296
              await era.printAndWait(
                `「咕呣……咕呣……阴茎在口腔里搅动的感觉……好奇怪♪」`,
              ); // :9297
              await era.print(
                `『呀呀，姐姐看起来完全掌握给魔王大人口交的技术了呢…${heart(1)} 我也不能输呢……唔呣……唔呣${heart(1)}』`,
              ); // :9298
              await era.printAndWait(`「才，才没有掌握那样的技术……呣呣……！」`); // :9299
              break; // :9300
            } // :9300
            case 0: {
              // :9300
              await era.printAndWait(`「咕呣……咕呣……阴茎的味道……好强烈♪」`); // :9301
              await era.print(
                `『嘿嘿，姐姐也吸吮得很努力呢，那我就来侍奉剩下的部位好了${heart(1)}』`,
              ); // :9302
              await era.printAndWait(
                `姐妹两人跪在${master_name}的身前，用嘴和舌头努力为阴茎服务着`,
              ); // :9303
              break; // :9304
            } // :9304
          } // :9304
          // CFLAG:369  = 3（变量语义：CFLAG 族，369） // :9305
          kojo.双人侍奉口交 = 3; // :9305
        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9307
          switch (
            rand_n(3) // :9308
          ) {
            case 2: {
              // :9309
              await era.print(
                `『姐姐要认真一点吸吮啊，不要一副心不在焉的样子……呣呣……唔呣呣${heart(1)}』`,
              ); // :9310
              await era.printAndWait(`「这，这种事情……唔呣……唔呣………」`); // :9311
              await era.printAndWait(
                `无比卖力地吸吮着阴茎的${assi_name}与提心吊胆，小心翼翼地用舌头舔着的${target_name}形成了鲜明的对比………`,
              ); // :9312
              break; // :9313
            } // :9313
            case 1: {
              // :9313
              await era.printAndWait(`「咕呣……咕呣……下巴好酸……」`); // :9314
              await era.print(
                `『姐姐这么不用心，一会儿是要惩罚的哦……算了，让我来用嘴巴小穴侍奉魔王大人吧……你要好好学啊……咕呣咕呣咕呣…${heart(1)}』`,
              ); // :9315
              await era.printAndWait(
                `「呜呜……为，为什么你会舔得这么激烈……以前明明……是多么纯洁的孩子！」`,
              ); // :9316
              break; // :9317
            } // :9317
            case 0: {
              // :9317
              await era.printAndWait(`「呣呣……呣呣……好难闻……这个味道！」`); // :9318
              await era.print(
                `『哎嘿嘿，姐姐接下来就交给你来吸吮了哦，我就来舔其他部位好了♪』`,
              ); // :9319
              await era.printAndWait(`「这，这种事情……才不要……呜呜呜！」`); // :9320
              break; // :9321
            } // :9321
          } // :9321
          // CFLAG:369  = 2（变量语义：CFLAG 族，369） // :9322
          kojo.双人侍奉口交 = 2; // :9322
        } // :9323
      } else {
        // :9324

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.双人侍奉口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9326
          await era.printAndWait(''); // :9327
          // CFLAG:369  = 5（变量语义：CFLAG 族，369） // :9328
          kojo.双人侍奉口交 = 5; // :9328
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.双人侍奉口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9330
          await era.printAndWait(''); // :9331
          // CFLAG:369  = 4（变量语义：CFLAG 族，369） // :9332
          kojo.双人侍奉口交 = 4; // :9332
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.双人侍奉口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9334
          await era.printAndWait(''); // :9335
          // CFLAG:369  = 3（变量语义：CFLAG 族，369） // :9336
          kojo.双人侍奉口交 = 3; // :9336
        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9338
          await era.printAndWait(''); // :9339
          // CFLAG:369  = 2（变量语义：CFLAG 族，369） // :9340
          kojo.双人侍奉口交 = 2; // :9340
        } // :9341
      } // :9342
      return 0; // :9343
    } // :9344
  } // :9345

  if (era_flag.selectcom === 123) {
    // :9352

    if (kojo.乳夹口交 === 0) {
      // :9354

      if (era.get(`talent:${target}:76`) === 1) {
        // :9356
        await era.printAndWait(
          `「光是用胸部…和嘴巴…碰到阴茎…就好舒服了啊…${heart(1)}」`,
        ); // :9357
        await era.printAndWait(
          `${target_name}带着淫媚的笑容，用双乳夹住了${player_name}的阴茎，低下头开始吸吮露出的龟头…`,
        ); // :9358
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9360
        await era.printAndWait(
          `「啊啊……身体好兴奋……嘴巴和胸部也好舒服……被魔王大人的阴茎摩擦的感觉${heart(1)}」`,
        ); // :9361
        await era.printAndWait(
          `${target_name}带着浓浓的爱意，低下头，继续用双乳和舌尖侍奉着${player_name}的阴茎……`,
        ); // :9362
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9364
        await era.printAndWait(`「魔王大人……这样舒服吗？♪」`); // :9365
        await era.printAndWait(
          `${target_name}眼眶微微有些湿润，但还是努力地用双乳和嘴巴侍奉着${player_name}的阴茎……`,
        ); // :9366
      } else {
        // :9368
        await era.printAndWait(`「这种事情……到底有什么好的………」`); // :9369
        await era.printAndWait(
          `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
        ); // :9370
      } // :9371
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :9372
      kojo.乳夹口交 = 1; // :9372
      return 0; // :9373
    } else {
      // :9375

      if (assi_mao) {
        // :9377

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9379
          await era.printAndWait(
            `「嘿嘿，被我的胸部和嘴巴这样服务，${player_name}的小鸡鸡很舒服吧${heart(1)}」`,
          ); // :9380
          await era.printAndWait(
            `${target_name}微笑着，继续低下头舔着${player_name}的阴茎。`,
          ); // :9381
          await era.printAndWait(`「哇……阴茎颤抖得好厉害，要射了吗？」`); // :9382
          await era.printAndWait(
            `『嗯啊……是啊……姐姐快把嘴张开，我要射在你的舌头上${heart(1)}』`,
          ); // :9383
          // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :9384
          kojo.乳夹口交 = 5; // :9384
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9386
          await era.printAndWait(
            `${target_name}眨着眼睛，用丰满的双乳夹着${player_name}的阴茎，灵巧的舌头也卖力地舔舐着。`,
          ); // :9387
          await era.printAndWait(
            `「啊啊……这样摩擦着……我的胸部也好舒服，${player_name}的阴茎……好烫好硬啊${heart(1)}」`,
          ); // :9388
          await era.printAndWait(
            `『人家……也很舒服啊${heart(1)} 啊啊啊姐姐张开嘴……我要射了，你要全部喝下去啊${heart(1)}』`,
          ); // :9389
          // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :9390
          kojo.乳夹口交 = 4; // :9390
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9392
          await era.printAndWait(`「这，这样会很舒服吗……呣呣……呣呣♪」`); // :9393
          await era.printAndWait(
            `『嘿嘿，姐姐终于肯老老实实地侍奉我和魔王大人了吗，一会儿精液也得全部喝下去啊！』`,
          ); // :9394
          await era.printAndWait(
            `${target_name}眼里含着泪水，但还是努力用双乳夹着${player_name}的阴茎，吸吮着龟头………`,
          ); // :9395
          // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :9396
          kojo.乳夹口交 = 3; // :9396
        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9398
          await era.printAndWait(
            `『哇啊啊……被姐姐这对淫荡的大胸部乳交起来真舒服啊……不过嘴也不能闲着，得好好舔啊？』`,
          ); // :9399
          await era.printAndWait(
            `「呜呜呜……一点都不舒服……为什么要让姐姐……做这么恶心的事情……」`,
          ); // :9400
          await era.printAndWait(
            `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
          ); // :9401
          // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :9402
          kojo.乳夹口交 = 2; // :9402
        } // :9403
      } else {
        // :9404

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9406
          await era.printAndWait(
            `「嘿嘿……魔王大人，阴茎被人家的胸部和嘴巴侍奉的舒服吗${heart(1)}」`,
          ); // :9407
          await era.printAndWait(
            `${target_name}脸上露出沉醉的笑意，继续用双乳夹着${player_name}的阴茎，低下头用舌尖舔着。`,
          ); // :9408
          await era.printAndWait(
            `「呣呣……呣呣……人家的乳沟小穴，一点都不输给下面的两个淫穴吧？」`,
          ); // :9409
          await era.printAndWait(
            `「魔王大人要射精的话……记得全部射在我的嘴里哦${heart(1)}」`,
          ); // :9410
          // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :9411
          kojo.乳夹口交 = 5; // :9411
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9413
          await era.printAndWait(
            `${target_name}眨着充满爱意的眼睛，继续用双乳夹着${player_name}的阴茎，低下头用舌尖舔着。`,
          ); // :9414
          await era.printAndWait(
            `「啊啊……连自己都兴奋起来了……这样用胸部摩擦着${heart(1)}」`,
          ); // :9415
          await era.printAndWait(
            `「唔呣……唔呣……唔呣${heart(1)} 魔王大人这次想要射在什么地方呢${heart(1)}」`,
          ); // :9416
          // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :9417
          kojo.乳夹口交 = 4; // :9417
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9419
          await era.printAndWait(`「呜呜……魔王大人……这样舒服吗？♪」`); // :9420
          await era.printAndWait(
            `${target_name}眼眶微微有些湿润，但还是努力地用双乳和嘴巴侍奉着${player_name}的阴茎……`,
          ); // :9421
          // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :9422
          kojo.乳夹口交 = 3; // :9422
        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9424
          await era.printAndWait(`「呜呜呜……这种事情……到底有什么好的………」`); // :9425
          await era.printAndWait(
            `${target_name}被${player_name}要求回答进行乳交侍奉的感想，一脸嫌恶地答道……`,
          ); // :9426
          // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :9427
          kojo.乳夹口交 = 2; // :9427
        } // :9428
      } // :9429
      return 0; // :9430
    } // :9431
  } // :9432

  if (era_flag.selectcom === 125) {
    // :9436

    if (kojo.口交时自慰 === 0) {
      // :9438

      if (era.get(`talent:${target}:76`) === 1) {
        // :9440
        await era.printAndWait(
          `「咕呣……咕呣……啊啊啊啊…边吸吮着魔王大人的肉棒，边自慰……这感觉真是太棒了${heart(1)}」`,
        ); // :9441
        await era.printAndWait(
          `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，而手已经忍不住伸到自己的下体自慰了起来。`,
        ); // :9442
        await era.printAndWait(
          `「唔唔唔${heart(1)} 不知道是魔王大人会先在${target_name}的嘴里射出来，还是${target_name}会自己先自慰到高潮呢？」`,
        ); // :9443
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9445
        await era.printAndWait(
          `「有…有点不好意思呢…魔王大人…不要这么盯着${target_name}看啦${heart(1)}」`,
        ); // :9446
        await era.printAndWait(
          `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，同时手也伸到了自己的下体，慢慢开始自慰。`,
        ); // :9447
        await era.printAndWait(
          `「唔呣呣…边口交…边自慰${heart(1)} 比平时…更有感觉啊啊${heart(1)}」`,
        ); // :9448
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9450
        await era.printAndWait(`「咕呣……咕呣……！」`); // :9451
        await era.printAndWait(
          `${target_name}遵循着${player_name}的命令，顺从地张开嘴含住了${player_name}的肉棒，仔细地舔吮着，手也伸到了自己的下体开始自慰……`,
        ); // :9452
      } else {
        // :9454
        await era.printAndWait(
          `「别，别催了…我，我会照做的……这样…这种事情…就能让你满足了吗？」`,
        ); // :9455
        await era.printAndWait(
          `${target_name}在命令下，不情愿地张开嘴含住了${player_name}的肉棒，手也伸到了自己的下体开始自慰。`,
        ); // :9456
      } // :9457
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :9458
      kojo.口交时自慰 = 1; // :9458
      return 0; // :9459
    } else {
      // :9461

      if (assi_mao) {
        // :9463

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9465
          await era.printAndWait(
            `「哈啊啊……边吸吮${player_name}的阴茎…边自慰…感觉比平时…还要棒呢……${heart(1)}」`,
          ); // :9466
          await era.printAndWait(
            `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，而手已经忍不住伸到自己的下体自慰了起来。`,
          ); // :9467
          await era.printAndWait(
            `「唔呣呣…${heart(1)} 比赛一下…谁能忍住高潮吧…？」`,
          ); // :9468
          await era.printAndWait(
            `『这样好了，姐姐先高潮的话，就要惩罚，让人家先高潮了，那就表扬${heart(1)}』`,
          ); // :9469
          await era.printAndWait(
            `「哈啊${heart(1)} 那我得好好努力了${heart(1)} 我开动了哦…唔呣呣…${heart(1)}」`,
          ); // :9470
          await era.printAndWait(
            `${target_name}再度张开嘴，将${player_name}的阴茎含进口中卖力地吸吮起来………`,
          ); // :9471
          // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :9472
          kojo.口交时自慰 = 5; // :9472
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9474
          await era.printAndWait(
            `「不要盯着人家看啦……怪难为情的…唔唔…唔呣呣${heart(1)}」`,
          ); // :9475
          await era.printAndWait(
            `${target_name}用舌头缠卷着${player_name}的阴茎，在口内吸吮着，同时手也伸到了自己的下体，自慰了起来。`,
          ); // :9476
          await era.printAndWait(
            `「唔呣……咕呣${heart(1)} 哎哎……都说了不要用那样的眼神看着人家啦${heart(1)}」`,
          ); // :9477
          await era.printAndWait(
            `『不能偷懒呀姐姐……继续给人家口交啊！在顾着自己舒服的时候，也要让人家舒服嘛！』`,
          ); // :9478
          await era.printAndWait(`「好啦，知道啦……咕呣……咕呣…${heart(1)}」`); // :9479
          // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :9480
          kojo.口交时自慰 = 4; // :9480
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9482
          await era.printAndWait(`「我，我知道了……唔呣……咕呣……！」`); // :9483
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          ); // :9484
          await era.print(`『姐姐有干劲一点嘛，不要一副心不在焉的样子。』`); // :9485
          await era.printAndWait(
            `${player_name}坏笑着用脚趾刺激着${target_name}的蜜穴。`,
          ); // :9486
          await era.print(`「不……不要恶作剧啊，${player_name}！」`); // :9487
          await era.printAndWait(
            `${target_name}在${player_name}的逗弄下不得不加快了动作……`,
          ); // :9488
          // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :9489
          kojo.口交时自慰 = 3; // :9489
        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
          // :9491
          await era.printAndWait(
            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？」`,
          ); // :9492
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          ); // :9493
          await era.printAndWait(
            `『真是一点不行呢，这样敷衍了事的话，可是会受罚的哦♪』`,
          ); // :9494
          // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :9495
          kojo.口交时自慰 = 2; // :9495
        } // :9496
      } else {
        // :9497

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9499
          await era.printAndWait(
            `「唔啊啊……能够边为魔王大人口交边自慰……真的是太幸福了${heart(1)}」`,
          ); // :9500
          await era.printAndWait(
            `${target_name}用舌头舔舐着${player_name}的阴茎，边激烈地自慰着。`,
          ); // :9501
          await era.printAndWait(
            `「咕呣……咕呣……${heart(1)} 已经……舒服得停不下来了……${heart(1)}」`,
          ); // :9502
          await era.printAndWait(
            `「魔王大人……${heart(1)} 要记得射在人家的嘴里啊${heart(1)} 咕呣……咕呣……${heart(1)} 」`,
          ); // :9503
          await era.printAndWait(
            `${target_name}继续卖力地吸吮着${player_name}的阴茎，发出一阵阵淫秽不堪的声音……`,
          ); // :9504
          // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :9505
          kojo.口交时自慰 = 5; // :9505
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9507
          await era.printAndWait(
            `「别，别这样盯着人家看啦……咕呣……咕呣${heart(1)}」`,
          ); // :9508
          await era.printAndWait(
            `${target_name}用舌头舔舐着${player_name}的阴茎，手伸到了下体开始自慰`,
          ); // :9509
          await era.printAndWait(
            `「要，要看也行……但是……不要用那样的眼神啦${heart(1)} 直勾勾地盯着……怪不好意思的${heart(1)}」`,
          ); // :9510
          await era.printAndWait(
            `${player_name}边享受着${target_name}的口交，边欣赏着对方的耻态，灼热的视线让${target_name}变得面红耳赤。`,
          ); // :9511
          await era.printAndWait(`「好，好丢人……咕呣……咕呣${heart(1)}」`); // :9512
          // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :9513
          kojo.口交时自慰 = 4; // :9513
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9515
          await era.printAndWait(`「咕呣……咕呣……魔王大人……这，这样可以吗！」`); // :9516
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          ); // :9517
          await era.printAndWait(
            `但是还不满足的${player_name}露出不怀好意的笑容，用脚趾刺激着${target_name}的蜜穴和肛门。`,
          ); // :9518
          await era.print(
            `「唔？！不，不要对人家恶作剧啦，魔王大人……我，我会好好做的！」`,
          ); // :9519
          await era.printAndWait(
            `${target_name}在${player_name}的逗弄下不得不加快了动作……`,
          ); // :9520
          // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :9521
          kojo.口交时自慰 = 3; // :9521
        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
          // :9523
          await era.printAndWait(
            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？？」`,
          ); // :9524
          await era.printAndWait(
            `${target_name}在${player_name}的命令下张开嘴含住了的阴茎，同时手也伸到了自己的下体，自慰了起来。`,
          ); // :9525
          await era.printAndWait(
            `「（为，为什么我会……做这样的事情…）唔呣……唔呣……还，还要这样多久？」`,
          ); // :9526
          // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :9527
          kojo.口交时自慰 = 2; // :9527
        } // :9528
      } // :9529
      return 0; // :9530
    } // :9531
  } // :9532

  if (era_flag.selectcom === 126) {
    // :9537

    if (kojo.手搓口交 === 0) {
      // :9539

      if (era.get(`talent:${target}:76`) === 1) {
        // :9541
        await era.printAndWait(`「唔唔……唔呣……唔呣${heart(1)}」`); // :9542
        await era.printAndWait(`「嘿嘿，边被手指摩擦着边口交，很舒服吧？」`); // :9543
        await era.printAndWait(
          `${target_name}脸上浮现出了淫媚的笑容，用舌尖舔弄着${player_name}的龟头，边用手指摩擦着根部……`,
        ); // :9544
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9546
        await era.printAndWait(
          `「唔呣……唔呣${heart(1)} 阴茎……热热的……感觉好舒服……${heart(1)}」`,
        ); // :9547
        await era.printAndWait(
          `${target_name}边${player_name}吸吮着阴茎边用手指按摩着，表情充满了发自内心的幸福感。`,
        ); // :9548
        await era.printAndWait(
          `「唔唔……唔呣……唔呣…${player_name}${heart(1)} 要，要在嘴里发射了吗${heart(1)}」`,
        ); // :9549
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9551
        await era.printAndWait(`「唔唔……唔唔……唔呣${heart(1)}」`); // :9552
        await era.printAndWait(
          `${target_name}手和嘴并用地侍奉着${player_name}的阴茎。`,
        ); // :9553
        await era.printAndWait(`「这，这样感觉舒服吗……要不要再温柔一些……」`); // :9554
        await era.printAndWait(
          `${player_name}微笑着说道，已经从侍奉${target_name}的过程中感到了愉悦感……`,
        ); // :9555
      } else {
        // :9557
        await era.printAndWait(`「唔唔……唔唔……唔呣！」`); // :9558
        await era.printAndWait(
          `${target_name}还不习惯同时用手和嘴侍奉阴茎，动作十分笨拙。`,
        ); // :9559
        await era.printAndWait(
          `${player_name}不满的挺起腰，将阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
        ); // :9560
        await era.printAndWait(
          `「呜……呜呜……对，对不起……请饶了我吧……我会好好学习的！」`,
        ); // :9561
      } // :9562
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :9563
      kojo.手搓口交 = 1; // :9563
      return 0; // :9564
    } else {
      // :9566

      if (assi_mao) {
        // :9568

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9570
          await era.printAndWait(`「咕呣……咕呣……这样很舒服吧${heart(1)}」`); // :9571
          await era.printAndWait(
            `『啊啊……姐姐……人家要忍不住了啊啊${heart(1)}』`,
          ); // :9572
          await era.printAndWait(
            `「来吧，全部射在姐姐的嘴里吧${heart(1)} ${player_name}浓浓的精液…${heart(1)} 咕呣……咕呣${heart(1)}」`,
          ); // :9573
          await era.printAndWait(
            `${target_name}脸上浮现出了妖艳的笑容，用舌头拨弄着${player_name}的龟头，手指按摩着根部………`,
          ); // :9574
          // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :9575
          kojo.手搓口交 = 5; // :9575
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9577
          await era.printAndWait(
            `「咕呣……唔唔${heart(1)} ${player_name}的阴茎……好硬……好烫${heart(1)}」`,
          ); // :9578
          await era.printAndWait(
            `『呜啊啊……姐姐……人家要忍不住了啊啊${heart(1)}』`,
          ); // :9579
          await era.printAndWait(
            `${target_name}同时用手和嘴侍奉着${player_name}的阴茎，看上去已经完全乐在其中了`,
          ); // :9580
          await era.printAndWait(
            `「咕呣……来吧，${player_name}${heart(1)} 射在姐姐嘴里吧${heart(1)}」`,
          ); // :9581
          // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :9582
          kojo.手搓口交 = 4; // :9582
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9584
          await era.printAndWait(`「咕呣……咕呣……呣呣……」`); // :9585
          await era.printAndWait(
            `${target_name}手口并用地侍奉着${player_name}的阴茎。`,
          ); // :9586
          await era.printAndWait(
            `『啊啊， 姐姐的侍奉好棒……这样感觉好舒服${heart(1)}』`,
          ); // :9587
          await era.printAndWait(
            `「咕呣……呣呣……不，不要射在姐姐嘴里……就可以了……」`,
          ); // :9588
          await era.printAndWait(
            `${player_name}尽情享受着${target_name}的努力侍奉……`,
          ); // :9589
          // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :9590
          kojo.手搓口交 = 3; // :9590
        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9592
          await era.printAndWait(`「咕呣……咕呣……呣呣……」`); // :9593
          await era.printAndWait(
            `${target_name}还不习惯用手和嘴同时侍奉阴茎，动作显得相当笨拙。`,
          ); // :9594
          await era.printAndWait(
            `${player_name}不满地顶起腰，用阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
          ); // :9595
          await era.printAndWait(
            `『哼，再不好好侍奉的话，下次就要一口气插进姐姐喉咙里去了♪』`,
          ); // :9596
          await era.printAndWait(
            `「对，对不起……姐姐会好好学的……饶，饶了姐姐吧！」`,
          ); // :9597
          // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :9598
          kojo.手搓口交 = 2; // :9598
        } // :9599
      } else {
        // :9600

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9602
          await era.printAndWait(`「咕呣……咕呣……${heart(1)}」`); // :9603
          await era.printAndWait(
            `「如何，魔王大人，阴茎一边被舔一边被手指按摩的感觉，很舒服吧？」`,
          ); // :9604
          await era.printAndWait(
            `${target_name}带着淫媚的笑容看着你，然后低下头继续用舌头舔着${player_name}的龟头，手指则娴熟地按摩着睾丸。`,
          ); // :9605
          await era.printAndWait(
            `「咕呣……呣呣……${heart(1)} 魔王大人${heart(1)} 这次是要射在人家手上……还是嘴里呢${heart(1)}」`,
          ); // :9606
          // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :9607
          kojo.手搓口交 = 5; // :9607
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9609
          await era.printAndWait(
            `「咕呣……唔唔${heart(1)} 魔王大人的阴茎……好硬……好烫${heart(1)}」`,
          ); // :9610
          await era.printAndWait(
            `${target_name}手口并用地侍奉着${player_name}的阴茎，吸吮着龟头，并且是发自内心地享受着侍奉的快乐。`,
          ); // :9611
          await era.printAndWait(
            `「呣呣…${heart(1)} 好喜欢……魔王大人的阴茎${heart(1)}」`,
          ); // :9612
          await era.printAndWait(
            `「当然了……魔王大人的人……我也一样喜欢${heart(1)}」`,
          ); // :9613
          // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :9614
          kojo.手搓口交 = 4; // :9614
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9616
          await era.printAndWait(`「咕呣……唔唔……唔唔！」`); // :9617
          await era.printAndWait(
            `${target_name}手口并用，努力侍奉着${player_name}的阴茎。`,
          ); // :9618
          await era.printAndWait(
            `边舔着阴茎，${target_name}边抬起眼皮看着你，用讨好的声音问着。`,
          ); // :9619
          await era.printAndWait(
            `「魔，魔王大人……这样感觉舒服吗………还是要按摩其他的部位？」`,
          ); // :9620
          await era.printAndWait(
            `${player_name}露出了满意的笑容，继续享受着${target_name}的侍奉`,
          ); // :9621
          // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :9622
          kojo.手搓口交 = 3; // :9622
        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9624
          await era.printAndWait(`「咕呣……唔唔……呕！」`); // :9625
          await era.printAndWait(
            `${target_name}还不习惯用手和嘴同时侍奉阴茎，动作显得相当笨拙。`,
          ); // :9626
          await era.printAndWait(
            `${player_name}不满的挺起腰，将阴茎在${target_name}的嘴里抽插了几下，${target_name}难受得哭泣了起来。`,
          ); // :9627
          await era.printAndWait(
            `「对，对不起……魔王大人……我，我会努力学的……」`,
          ); // :9628
          // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :9629
          kojo.手搓口交 = 2; // :9629
        } // :9630
      } // :9631
      return 0; // :9632
    } // :9633
  } // :9634

  if (era_flag.selectcom === 127) {
    // :9639

    if (kojo.真空口交 === 0) {
      // :9641

      if (era.get(`talent:${target}:76`) === 1) {
        // :9643
        await era.printAndWait(
          `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
        ); // :9644
        await era.printAndWait(
          `${target_name}吸吮着${player_name}的阴茎，发出一阵阵下流的声音。`,
        ); // :9645
        await era.printAndWait(`完全沉浸在真空口交侍奉之中了……`); // :9646
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9648
        await era.printAndWait(
          `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
        ); // :9649
        await era.printAndWait(
          `${target_name}如痴如醉地吸吮着${player_name}的阴茎，发出一阵阵下流的声音。`,
        ); // :9650
        await era.printAndWait(`脸颊都凹陷了进去，呼吸也变得急促了……`); // :9651
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9653
        await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾……唔唔」`); // :9654
        await era.printAndWait(
          `${target_name}努力地吸吮着${player_name}的阴茎。`,
        ); // :9655
        await era.printAndWait(
          `一声声不堪入耳的下流声音从${target_name}的口中冒出……`,
        ); // :9656
      } else {
        // :9658
        await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾……唔唔」`); // :9659
        await era.printAndWait(
          `${target_name}泪流满面地继续吸吮着口中的阴茎……`,
        ); // :9660
      } // :9661
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :9662
      kojo.真空口交 = 1; // :9662
      return 0; // :9663
    } else {
      // :9665

      if (assi_mao) {
        // :9667

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9669
          await era.printAndWait(
            `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          ); // :9670
          await era.printAndWait(
            `${target_name}用口腔和喉咙吸吮着${player_name}的阴茎，故意发出一阵阵淫秽的声音。`,
          ); // :9671
          await era.printAndWait(`整个人完全沉浸在真空口交侍奉的快乐之中了。`); // :9672
          await era.printAndWait(
            `『姐姐跟母猪一样吸着人家的小鸡鸡，一点都不害臊吗，真是的！』`,
          ); // :9673
          await era.printAndWait(
            `更加兴奋起来的${player_name}在姐姐的嘴里激烈地抽插着……`,
          ); // :9674
          // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :9675
          kojo.真空口交 = 5; // :9675
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9677
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          ); // :9678
          await era.printAndWait(
            `${target_name}如痴如醉地用口腔和喉咙吸吮着${player_name}的阴茎，连自己正在发出一阵阵下流的声音都丝毫没有觉察。`,
          ); // :9679
          await era.printAndWait(`脸颊都凹了进去，呼吸也急促了起来。`); // :9680
          await era.printAndWait(
            `『哎呀……哎呀……太激烈了${heart(1)} 吸得……人家要去了${heart(1)}』`,
          ); // :9681
          await era.printAndWait(
            `「最，最喜欢${player_name}的阴茎了、让姐姐帮你把精液全部吸出来吧…${heart(1)}  咕啾……咕啾……唔唔${heart(1)}」`,
          ); // :9682
          // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :9683
          kojo.真空口交 = 4; // :9683
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9685
          await era.printAndWait(
            `「还，还要继续吸吗……唔呣……唔呣！咕啾……咕啾……唔唔」`,
          ); // :9686
          await era.printAndWait(
            `${target_name}拼命地用口腔和喉咙吸吮着${player_name}的阴茎。`,
          ); // :9687
          await era.printAndWait(
            `『唔嘿嘿，人家的小鸡鸡那么好吃吗，还要吸得再深入一点啊，口交母猪姐姐！』`,
          ); // :9688
          await era.printAndWait(
            `${target_name}被${player_name}用言语羞辱着，只能继续进行着口交侍奉………`,
          ); // :9689
          // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :9690
          kojo.真空口交 = 3; // :9690
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9692
          await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾～！」`); // :9693
          await era.printAndWait(
            `『哎呀呀，姐姐吸吮得这么卖力，已经变成喜欢口交的母猪了，难道不是吗！』`,
          ); // :9694
          await era.printAndWait(
            `${target_name}被自己深爱的妹妹如此嘲笑羞辱，泪流满面地继续口交着……`,
          ); // :9695
          // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :9696
          kojo.真空口交 = 2; // :9696
        } // :9697
      } else {
        // :9698

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9700
          await era.printAndWait(
            `「唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          ); // :9701
          await era.printAndWait(
            `${target_name}用口腔和喉咙吸吮着${player_name}的阴茎，故意发出一阵阵淫秽的声音。`,
          ); // :9702
          await era.printAndWait(`整个人完全沉浸在真空口交侍奉的快乐之中了`); // :9703
          await era.printAndWait(
            `「咕唔唔${heart(1)}…咕啾……咕啾${heart(1)}想要……魔王大人的精液……好想要${heart(1)}」`,
          ); // :9704
          await era.printAndWait(
            `${target_name}在阴茎强烈味道的刺激下，更加激烈的进行着真空口交侍奉………`,
          ); // :9705
          // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :9706
          kojo.真空口交 = 5; // :9706
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9708
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 咕啾……咕啾……唔唔${heart(1)}」`,
          ); // :9709
          await era.printAndWait(
            `${target_name}如痴如醉地用口腔和喉咙吸吮着${player_name}的阴茎，连自己正在发出一阵阵下流的声音都丝毫没有觉察。`,
          ); // :9710
          await era.printAndWait(`脸颊都凹了进去，呼吸也急促了起来。`); // :9711
          await era.printAndWait(
            `「唔唔……咕呜${heart(1)} 魔王大人的阴茎…${heart(1)} 味道太棒了……还想要更多……咕呜……咕呜${heart(1)}」`,
          ); // :9712
          await era.printAndWait(
            `${target_name}完全沉浸在阴茎的味道之中，更加激烈的进行着真空口交侍奉………`,
          ); // :9713
          // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :9714
          kojo.真空口交 = 4; // :9714
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9716
          await era.printAndWait(
            `「还，还要继续吸吗……唔呣……唔呣！咕啾……咕啾……唔唔」`,
          ); // :9717
          await era.printAndWait(
            `${target_name}拼命地用口腔和喉咙吸吮着${player_name}的阴茎。`,
          ); // :9718
          await era.printAndWait(
            `「唔呣……唔呣！咕啾……魔王大人……让我，让我休息一下吧……」`,
          ); // :9719
          // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :9720
          kojo.真空口交 = 3; // :9720
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9722
          await era.printAndWait(`「唔呣……唔呣！咕啾……咕啾～！」`); // :9723
          await era.printAndWait(
            `${target_name}被强迫进行着真空口交侍奉，屈辱得泪流满面…`,
          ); // :9724
          // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :9725
          kojo.真空口交 = 2; // :9725
        } // :9726
      } // :9727
      return 0; // :9728
    } // :9729
  } // :9730

  let locals_0 = ''; // LOCALS:0，调教者性器
  let locals_1 = ''; // LOCALS:1，调教者敏感部位
  let locals_2 = ''; // LOCALS:2，莉莉性器
  let locals_3 = ''; // LOCALS:3，莉莉敏感部位

  // K11 原作把 CFLAG:370 复用于六九式口上计数；该角色的魔族化另存 CFLAG:400。
  if (era_flag.selectcom === 69) {
    // :9735

    if (kojo.魔族化 === 0) {
      // :9737

      if (
        era.get(`talent:${player}:121`) === 1 ||
        era.get(`talent:${player}:122`) === 1
      ) {
        // :9739
        locals_0 = '阴茎'; // :9740
        locals_1 = '阴茎'; // :9741
      } else {
        // :9742
        locals_0 = '蜜穴'; // :9743
        locals_1 = '阴蒂'; // :9744
      } // :9745

      if (
        era.get(`talent:${target}:121`) === 1 ||
        era.get(`talent:${target}:122`) === 1
      ) {
        // :9747
        locals_2 = '阴茎'; // :9748
        locals_3 = '阴茎'; // :9749
      } else {
        // :9750
        locals_2 = '蜜穴'; // :9751
        locals_3 = '阴蒂'; // :9752
      } // :9753

      if (assi_mao) {
        // :9755

        if (era.get(`talent:${target}:76`) === 1) {
          // :9757
          await era.printAndWait(
            `「咕呣……咕呣……咕呣${player_name}的${locals_1}……味道好棒……好喜欢${heart(1)}」`,
          ); // :9758
          await era.printAndWait(
            `『啊啊……姐姐的${locals_3}也很棒啊……${heart(1)}』`,
          ); // :9759
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :9761
          await era.printAndWait(
            `「呣呣……呣呣………${heart(1)} ${player_name}这样舒服吗？${heart(1)}」`,
          ); // :9762
          await era.printAndWait(
            `『啊啊啊姐姐……舔得人家好舒服……我也不会输的${heart(1)}』`,
          ); // :9763
        } else if (chara(target).system.侍奉精神 >= 3) {
          // :9765
          await era.printAndWait(
            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！」`,
          ); // :9766
          await era.printAndWait(
            `『啊啊……和姐姐互相舔下体……好棒……好舒服啊啊${heart(1)} 』`,
          ); // :9767
        } else {
          // :9769
          await era.printAndWait(
            `「唔呣……唔呣……呜呜呜，为什么……要做这种下流的事……！」`,
          ); // :9770
          await era.printAndWait(
            `『啊哈……姐姐的${locals_1}一抖一抖的，好可爱……我舔得很舒服吧${heart(1)} 但是姐姐你也不能偷懒啊♪』`,
          ); // :9771
        } // :9772
      } else {
        // :9773

        if (era.get(`talent:${target}:76`) === 1) {
          // :9776
          await era.printAndWait(
            `「呣呣……呣呣啊……${heart(1)} 魔王大人……舔得人家……太舒服了${heart(1)} 但是……人家不会认输的${heart(1)}」`,
          ); // :9777
          await era.printAndWait(
            `${target_name}忍耐着${locals_2}的快感，专心致志地舔舐着的${player_name}的${locals_0}……`,
          ); // :9778
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :9780
          await era.printAndWait(
            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}……我，我也会好好侍奉魔王大人的……」`,
          ); // :9781
          await era.printAndWait(
            `${target_name}深吸一口气，忍耐着下体传来的强烈快感，继续卖力地舔吮着${player_name}的阴茎……`,
          ); // :9782
        } else if (chara(target).system.侍奉精神 >= 3) {
          // :9784
          await era.printAndWait(
            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……！」`,
          ); // :9785
          await era.printAndWait(
            `${target_name}忍耐着快感，努力用舌头舔舐着${player_name}的${locals_0}……`,
          ); // :9786
        } else {
          // :9788
          await era.printAndWait(
            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,
          ); // :9789
          await era.printAndWait(
            `嫌弃${target_name}舔舐的动作太敷衍，${player_name}微微用牙齿咬了咬${target_name}的阴蒂，立即听到一阵痛苦的悲鸣……`,
          ); // :9790
        } // :9791
      } // :9792
      // CFLAG:TARGET:370  = 1（变量语义：CFLAG 族，TARGET:370） // :9793
      kojo.魔族化 = 1; // :9793
      return 0; // :9794
    } else {
      // :9796

      if (assi_mao) {
        // :9798

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.魔族化 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9800
          await era.printAndWait(
            `「咕呣呣……唔呣……唔呣……${player_name}的${locals_1}……味道真好……真喜欢${heart(1)}」`,
          ); // :9801
          await era.printAndWait(
            `『呜啊啊……姐姐的${locals_1}也很棒啊……${heart(1)}』`,
          ); // :9802
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9803
          // CFLAG:370  = 5（变量语义：CFLAG 族，370） // :9804
          kojo.魔族化 = 5; // :9804
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9806
          await era.printAndWait(
            `「唔呣……唔呣……${heart(1)} 啊啊啊……${player_name}舔得姐姐好舒服……${heart(1)}」`,
          ); // :9807
          await era.printAndWait(
            `『啊啊啊……姐姐也舔得人家的小穴舒服的要上天了啊啊${heart(1)}』`,
          ); // :9808
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9809
          // CFLAG:370  = 4（变量语义：CFLAG 族，370） // :9810
          kojo.魔族化 = 4; // :9810
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9812
          await era.printAndWait(
            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！！」`,
          ); // :9813
          await era.printAndWait(
            `『嘿嘿嘿，和妹妹互相舔下体的感觉……很棒很舒服吧${heart(1)} 呣呣呣……呣呣${heart(1)}……』`,
          ); // :9814
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9815
          // CFLAG:370  = 3（变量语义：CFLAG 族，370） // :9816
          kojo.魔族化 = 3; // :9816
        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {
          // :9818
          await era.printAndWait(
            `「呜呜呜……为什么……要做这种这么下流的事情！」`,
          ); // :9819
          await era.printAndWait(
            `『啊哈……姐姐的${locals_1}一抖一抖的，好可爱……我舔得很舒服吧${heart(1)} 但是姐姐你也不能偷懒啊，快点给人家舔啊♪』`,
          ); // :9820
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9821
          // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :9822
          kojo.魔族化 = 2; // :9822
        } // :9823
      } else {
        // :9824

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.魔族化 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9826
          await era.printAndWait(
            `「呣呣……呣呣啊……${heart(1)} 魔王大人……舔得人家……太舒服了${heart(1)} 但是……人家不会认输的……一定要让魔王大人先射出来${heart(1)}」`,
          ); // :9827
          await era.printAndWait(
            `${target_name}忍耐着${locals_2}的快感，专心致志地吸吮着的${player_name}的阴茎…`,
          ); // :9828
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9829
          // CFLAG:370  = 5（变量语义：CFLAG 族，370） // :9830
          kojo.魔族化 = 5; // :9830
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9832
          await era.printAndWait(
            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}但，但我不能松懈……我，我也要好好侍奉魔王大人……」`,
          ); // :9833
          await era.printAndWait(
            `${target_name}深吸一口气，忍耐着下体传来的强烈快感，继续卖力地舔吮着${player_name}的阴茎……`,
          ); // :9834
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9835
          // CFLAG:370  = 4（变量语义：CFLAG 族，370） // :9836
          kojo.魔族化 = 4; // :9836
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9838
          await era.printAndWait(
            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……脑子还是下面都……乱七八糟了啊啊！」`,
          ); // :9839
          await era.printAndWait(
            `${target_name}忍耐着快感，努力用舌头舔舐着${player_name}的${locals_0}……`,
          ); // :9840
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9841
          // CFLAG:370  = 3（变量语义：CFLAG 族，370） // :9842
          kojo.魔族化 = 3; // :9842
        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {
          // :9844
          await era.printAndWait(
            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,
          ); // :9845
          await era.printAndWait(
            `嫌弃${target_name}舔舐的动作太敷衍，${player_name}微微用牙齿咬了咬${target_name}的阴蒂，立即听到一阵痛苦的悲鸣……`,
          ); // :9846
          await era.printAndWait(
            `${target_name}的${locals_2}和${player_name}的${locals_0}沾满了彼此的唾液，隐隐反射着调教室的火光……`,
          ); // :9847
          // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :9848
          kojo.魔族化 = 2; // :9848
        } // :9849
      } // :9850
      return 0; // :9851
    } // :9852
  } // :9853

  if (era_flag.selectcom === 124) {
    // :9858

    if (kojo.深喉 === 0) {
      // :9860

      if (era.get(`talent:${target}:76`) === 1) {
        // :9862
        await era.printAndWait(
          `「我开动了哦…${heart(1)} 唔呣……唔唔唔${heart(1)}」`,
        ); // :9863
        await era.printAndWait(
          `${target_name}带着淫媚的表情，努力地将${player_name}的阴茎吞入到了喉咙最深处……`,
        ); // :9864
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9866
        await era.printAndWait(
          `「${player_name}的阴茎，我会全部吞下去的${heart(1)} 唔呣……唔唔唔${heart(1)}」`,
        ); // :9867
        await era.printAndWait(
          `${target_name}对${player_name}微笑了一下，然后将勃起的阴茎含入嘴里，慢慢吞入到了喉咙最深处…`,
        ); // :9868
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9870
        await era.printAndWait(`「要……要用喉咙吗……呜呜……咕呜……咕呣……！」`); // :9871
        await era.printAndWait(
          `${target_name}带着些许兴奋的表情，将${player_name}的阴茎含到了喉咙最深处……`,
        ); // :9872
      } else {
        // :9874
        await era.printAndWait(`「要……要用喉咙吗……呜呜……咕呜……咕呣……！」`); // :9875
        await era.printAndWait(
          `${target_name}带着些许犹豫的表情，将${player_name}的阴茎含到了喉咙最深处……`,
        ); // :9876
      } // :9877
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :9878
      kojo.深喉 = 1; // :9878
      return 0; // :9879
    } else {
      // :9881

      if (assi_mao) {
        // :9883

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9885
          await era.printAndWait(
            `「人家继续了哦……${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          ); // :9886
          await era.printAndWait(
            `${target_name}将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          ); // :9887
          await era.printAndWait(
            `『哈啊……哈啊${heart(1)} 淫乱的姐姐把人家的小鸡鸡全部吃进去了呢${heart(1)}』`,
          ); // :9888
          // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :9889
          kojo.深喉 = 5; // :9889
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9891
          await era.printAndWait(
            `「${player_name}的小鸡鸡，我要全部吃下去了哦${heart(1)}  呜呜……咕呜……咕呣…${heart(1)}」`,
          ); // :9892
          await era.printAndWait(
            `${target_name}带着笑容，将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          ); // :9893
          await era.printAndWait(
            `『唔哇哇、我会把姐姐的喉咙里射的满满都是精液的${heart(1)} 再，再深一点！』`,
          ); // :9894
          // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :9895
          kojo.深喉 = 4; // :9895
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9897
          await era.printAndWait(
            `「要，要进到喉，喉咙深处吗……呜呜……咕呜……咕呣…！」`,
          ); // :9898
          await era.printAndWait(
            `${target_name}口交的时候大概是过于兴奋了，将${player_name}的阴茎吞入到了喉咙最深处`,
          ); // :9899
          await era.printAndWait(
            `『唔哇哇！姐姐什么时候变得这么喜欢的口交的……！小鸡鸡在喉咙里面好舒服！』`,
          ); // :9900
          // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :9901
          kojo.深喉 = 3; // :9901
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9903
          await era.printAndWait(`「喉，喉咙深处也要吗……呜呜……咕呜……咕呣…！」`); // :9904
          await era.printAndWait(
            `${target_name}口交的时候大概是过于激烈了，将${player_name}的阴茎吞入到了喉咙最深处`,
          ); // :9905
          await era.printAndWait(
            `『唔哇哇，把整根都吞下去了呢，姐姐真的是个口交变态呢！』`,
          ); // :9906
          // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :9907
          kojo.深喉 = 2; // :9907
        } // :9908
      } else {
        // :9909

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9911
          await era.printAndWait(
            `「人家继续了哦，魔王大人……${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          ); // :9912
          await era.printAndWait(
            `${target_name}将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          ); // :9913
          await era.printAndWait(
            `「咕呜……咕呜…${heart(1)} 人家的喉咙小穴……舒服吗${heart(1)} 」`,
          ); // :9914
          // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :9915
          kojo.深喉 = 5; // :9915
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9917
          await era.printAndWait(
            `「${player_name}的阴茎，我会好好地全部吃下去的${heart(1)} 呜呜……咕呜……咕呣…${heart(1)}」`,
          ); // :9918
          await era.printAndWait(
            `${target_name}带着笑容，将${player_name}的阴茎吞入到了喉咙最深处吸吮着，发出了咕啾咕啾的不堪入耳的声音。`,
          ); // :9919
          await era.printAndWait(
            `「咕呜……咕呜…${heart(1)} 请${player_name}把精液全部射进喉咙里吧…${heart(1)} 呜呜……咕呜${heart(1)}」`,
          ); // :9920
          // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :9921
          kojo.深喉 = 4; // :9921
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9923
          await era.printAndWait(`「呜呜……咕呜……喉咙好热的感觉……呜呣……」`); // :9924
          await era.printAndWait(
            `${target_name}口交的时候大概是过于兴奋了，将${player_name}的阴茎吞入到了喉咙最深处`,
          ); // :9925
          await era.printAndWait(
            `「哈……哈啊……光是用喉咙吸着阴茎……整个人就已经…♪」`,
          ); // :9926
          // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :9927
          kojo.深喉 = 3; // :9927
        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9929
          await era.printAndWait(`「呜呜……咕呜……整根都……唔呣！」`); // :9930
          await era.printAndWait(
            `${target_name}口交的时候大概是过于激烈了，将${player_name}的阴茎吞入到了喉咙最深处`,
          ); // :9931
          await era.printAndWait(
            `「呜……呜呜……进，进到喉咙最里面了……唔呣……唔呣！」`,
          ); // :9932
          // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :9933
          kojo.深喉 = 2; // :9933
        } // :9934
      } // :9935
      return 0; // :9936
    } // :9937
  } // :9938

  if (era_flag.selectcom === 80) {
    // :9943

    if (kojo.强制口交 === 0) {
      // :9945

      if (era.get(`talent:${target}:76`) === 1) {
        // :9947
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔～${heart(1)}（被侵犯喉咙了${heart(1)}）」`,
        ); // :9948
        await era.printAndWait(
          `${target_name}尽情享受着喉咙深处被${player_name}的阴茎持续抽插侵犯的感觉………`,
        ); // :9949
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :9951
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……魔王大人，让我休——唔唔唔……嗯唔」`,
        ); // :9952
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，窒息得翻起了白眼………`,
        ); // :9953
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :9955
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……咳咳咳……魔，魔王大人，让我缓一下——唔唔唔……嗯唔！」`,
        ); // :9956
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，只能拼命忍耐着窒息一般的痛苦………`,
        ); // :9957
      } else {
        // :9959
        await era.printAndWait(
          `「唔呣……唔唔唔……嗯唔……咳咳咳……求求你，饶了我吧——唔唔唔」`,
        ); // :9960
        await era.printAndWait(
          `${target_name}喉咙深处被${player_name}的阴茎持续侵犯抽插着，窒息的痛苦让她泪水口水都流了出来………`,
        ); // :9961
      } // :9962
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :9963
      kojo.强制口交 = 1; // :9963
      return 0; // :9964
    } else {
      // :9966

      if (assi_mao) {
        // :9968

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9970
          await era.printAndWait(
            `「咕唔唔——${heart(1)} 唔呣……还，还可以再深一点呜呜唔呣！」`,
          ); // :9971
          await era.printAndWait(
            `${target_name}大张着嘴，迎接着${player_name}的阴茎深入到喉咙深处！`,
          ); // :9972
          await era.printAndWait(
            `『那么想要的话，就侵犯到姐姐窒息为止吧！嘿嘿嘿！』`,
          ); // :9973
          await era.printAndWait(
            `${target_name}喉咙深处被持续侵犯着，眼泪和口水不住往外流，表情都恍惚了…`,
          ); // :9974
          // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :9975
          kojo.强制口交 = 5; // :9975
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :9977
          await era.printAndWait(
            `「唔……唔呣……不，不行了……${player_name}，让姐姐……缓……唔呣……唔唔唔！」`,
          ); // :9978
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强行侵犯着喉咙深处，痛苦地翻起了白眼。`,
          ); // :9979
          await era.printAndWait(`『嘴再张大一点，我觉得还能再进去一些呢！』`); // :9980
          await era.printAndWait(
            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,
          ); // :9981
          // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :9982
          kojo.强制口交 = 4; // :9982
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :9984
          await era.printAndWait(
            `「呜呜……唔呣……稍，稍微……温柔一点……拜托了——唔唔唔……！」`,
          ); // :9985
          await era.printAndWait(
            `${target_name}被${player_name}用阴茎强制侵犯着嘴巴，在喉咙深处肆虐着`,
          ); // :9986
          await era.printAndWait(
            `『什么？要我温柔一点？才不呢，姐姐老老实实用喉咙当我的飞机杯啦！』`,
          ); // :9987
          // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :9988
          kojo.强制口交 = 3; // :9988
        } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
          // :9990
          await era.printAndWait(
            `「呜呜……唔呣……呕……住，住手啊……饶了姐姐吧……唔唔唔——」`,
          ); // :9991
          await era.printAndWait(
            `${target_name}被${player_name}用阴茎强制侵犯着嘴巴和喉咙，痛苦得泪流满面`,
          ); // :9992
          await era.printAndWait(
            `『嘿嘿，再不好好侍奉的话还会倒更大的霉的，姐姐！』`,
          ); // :9993
          // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :9994
          kojo.强制口交 = 2; // :9994
        } // :9995
      } else {
        // :9996

        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :9998
          await era.printAndWait(
            `「咕唔唔——${heart(1)} 唔呣……还，还可以再深一点呜呜唔呣！」`,
          ); // :9999
          await era.printAndWait(
            `${target_name}大张着嘴，主动迎接着${player_name}的阴茎深入到喉咙深处！`,
          ); // :10000
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 魔王大人……的阴茎……好厉害……唔唔唔……唔呣${heart(1)}」`,
          ); // :10001
          await era.printAndWait(
            `${target_name}喉咙深处被持续侵犯着，眼泪和口水不住往外流，表情都恍惚了…`,
          ); // :10002
          // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :10003
          kojo.强制口交 = 5; // :10003
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          chara(target).system.侍奉精神 >= 5 &&
          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :10005
          await era.printAndWait(
            `「唔……唔呣……不，不行了……魔王大人稍微……温柔一点……我会好好吸吮的${heart(1)} ——呜呜呜！」`,
          ); // :10006
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强行侵犯着喉咙深处，痛苦地翻起了白眼。`,
          ); // :10007
          await era.printAndWait(
            `「唔呣……唔呣${heart(1)} 可，可是……要好好侍奉魔王大人……唔唔唔……唔呣${heart(1)}」`,
          ); // :10008
          await era.printAndWait(
            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,
          ); // :10009
          // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :10010
          kojo.强制口交 = 4; // :10010
        } else if (
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :10012
          await era.printAndWait(
            `「唔……唔呣……不，不行了……求你了……稍微拔出去一点……唔唔唔！」`,
          ); // :10013
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强制侵犯到喉咙深处，痛苦地呻吟着。`,
          ); // :10014
          await era.printAndWait(`「唔唔……唔呣……要，要死了……呕呕呕！」`); // :10015
          // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :10016
          kojo.强制口交 = 3; // :10016
        } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
          // :10018
          await era.printAndWait(
            `「唔……唔呣……呕……唔唔……饶了我吧……求求你……呜呜……」`,
          ); // :10019
          await era.printAndWait(
            `${target_name}被${player_name}的阴茎强制侵犯到喉咙深处，痛苦得泪流满面。`,
          ); // :10020
          await era.printAndWait(`「唔唔……唔呣……已经要，要死了……呕呕呕……」`); // :10021
          // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :10022
          kojo.强制口交 = 2; // :10022
        } // :10023
      } // :10024
      return 0; // :10025
    } // :10026
  } // :10027

  if (era_flag.selectcom === 87) {
    // :10034
    const p = piercing_state.p; // COM111 穿环着脱写入的跨模块位掩码 P

    if (kojo.穿环 === 0) {
      // :10037

      if (era.get(`talent:${target}:76`) === 1) {
        // :10039

        if (chara(target).train.穿环状态 & p) {
          // :10041
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`); // :10042
          await era.printAndWait(`「呜……呜啊！」`); // :10043
          await era.printAndWait(`第一次穿孔让${target_name}忍不住呻吟了出来`); // :10044

          if (p === 1) {
            // :10046

            if (assi_mao) {
              // :10048
              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`); // :10049
              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`); // :10050
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              ); // :10051
            } else {
              // :10052
              await era.printAndWait(
                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,
              ); // :10053
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              ); // :10054
            } // :10055
          } else if (p === 2) {
            // :10057

            if (assi_mao) {
              // :10059
              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`); // :10060
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              ); // :10061
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10062
            } else {
              // :10063
              await era.printAndWait(`「呜哇，这个环好漂亮……」`); // :10064
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10065
            } // :10066
          } else if (p === 4) {
            // :10068

            if (assi_mao) {
              // :10070
              await era.printAndWait(
                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,
              ); // :10071
              await era.printAndWait(
                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,
              ); // :10072
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              ); // :10073
            } else {
              // :10074
              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`); // :10075
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              ); // :10076
            } // :10077
          } else if (p === 8) {
            // :10079

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10081

              if (assi_mao) {
                // :10083
                await era.printAndWait(
                  `『哎呀呀姐姐，怎么穿环的时候勃起了呢${heart(1)}』`,
                ); // :10084
                await era.printAndWait(
                  `「是啊……光是接触到这个环，姐姐就兴奋起来了呢${heart(1)}」`,
                ); // :10085
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10086
              } else {
                // :10087
                await era.printAndWait(
                  `「哈……自己的阴茎被穿环，居然会这么兴奋呢…${heart(1)}」`,
                ); // :10088
                await era.printAndWait(
                  `${target_name}在忍受痛苦的同时兴奋了起来，阴茎充血勃起了……`,
                ); // :10089
              } // :10090
            } else {
              // :10091

              if (assi_mao) {
                // :10093
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10094
                await era.printAndWait(
                  `「是，是啊……已经变得除了小穴之外……什么都不会想了${heart(1)}」`,
                ); // :10095
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                ); // :10096
              } else {
                // :10097
                await era.printAndWait(
                  `「啊啊……轻轻碰一碰上面的环${heart(1)} 阴蒂就已经有感觉了啊${heart(1)}」`,
                ); // :10098
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                ); // :10099
              } // :10100
            } // :10101
          } else if (p === 16) {
            // :10103

            if (assi_mao) {
              // :10105
              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`); // :10106
              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`); // :10107
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              ); // :10108
            } else {
              // :10109
              await era.printAndWait(
                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,
              ); // :10110
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              ); // :10111
            } // :10112
          } else if (p === 32) {
            // :10114

            if (assi_mao) {
              // :10116
              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`); // :10117
              await era.printAndWait(`「呣呣……还要继续吗？」`); // :10118
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10119
            } else {
              // :10120
              await era.printAndWait(`「呣呣，好像挺合适的？」`); // :10121
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10122
            } // :10123
          } else if (p === 64) {
            // :10125

            if (assi_mao) {
              // :10127
              await era.printAndWait(
                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,
              ); // :10128
              await era.printAndWait(`「就，就是这样呢♪」`); // :10129
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              ); // :10130
            } else {
              // :10131
              await era.printAndWait(`「意外的好看呢♪」`); // :10132
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              ); // :10133
            } // :10134
          } // :10135
        } else {
          // :10137
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10138
        } // :10139
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :10141

        if (chara(target).train.穿环状态 & p) {
          // :10143
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`); // :10144
          await era.printAndWait(
            `第一次穿孔的痛楚让${target_name}忍不住呻吟了出来。`,
          ); // :10145

          if (p === 1) {
            // :10147

            if (assi_mao) {
              // :10149
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`); // :10150
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`); // :10151
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10152
            } else {
              // :10153
              await era.printAndWait(`「怎么样，好像很合适呢？${heart(1)}」`); // :10154
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10155
            } // :10156
          } else if (p === 2) {
            // :10158

            if (assi_mao) {
              // :10160
              await era.printAndWait(`『呼呼，好可爱呢${heart(1)}』`); // :10161
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              ); // :10162
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10163
            } else {
              // :10164
              await era.printAndWait(`「呜哇，这个环好漂亮……」`); // :10165
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10166
            } // :10167
          } else if (p === 4) {
            // :10169

            if (assi_mao) {
              // :10171
              await era.printAndWait(
                `『姐姐的蜜穴真的是很适合穿环啊，相性非常好哦♪』`,
              ); // :10172
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`); // :10173
              await era.printAndWait(`${target_name}的蜜穴里被穿入了银环……`); // :10174
            } else {
              // :10175
              await era.printAndWait(`「请，请魔王大人尽情欣赏吧${heart(1)}」`); // :10176
              await era.printAndWait(
                `${target_name}害羞地分开自己的蜜穴，展露着穿在里面的两个银环……`,
              ); // :10177
            } // :10178
          } else if (p === 8) {
            // :10180

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10182

              if (assi_mao) {
                // :10184
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                ); // :10185
                await era.printAndWait(
                  `「不，才不是呢……是因为，因为……啊啊真的很兴奋啊${heart(1)}」`,
                ); // :10186
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10187
              } else {
                // :10188
                await era.printAndWait(
                  `「请，请魔王大人欣赏人家的穿环阴茎吧${heart(1)}」`,
                ); // :10189
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10190
              } // :10191
            } else {
              // :10192

              if (assi_mao) {
                // :10194
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10195
                await era.printAndWait(
                  `「不，不要对姐姐恶作剧啦……不过，不过……真的很有感觉啊${heart(1)}」`,
                ); // :10196
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10197
              } else {
                // :10198
                await era.printAndWait(
                  `「阴蒂被穿上这样的环，以后就正式成为魔王大人的性奴了呢…${heart(1)}」`,
                ); // :10199
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10200
              } // :10201
            } // :10202
          } else if (p === 16) {
            // :10204

            if (assi_mao) {
              // :10206
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`); // :10207
              await era.printAndWait(
                `「哎……那里也要吗……既然你这么希望的话……」`,
              ); // :10208
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              ); // :10209
            } else {
              // :10210
              await era.printAndWait(
                `「这样接吻……会很舒服吧，魔王大人${heart(1)}」`,
              ); // :10211
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              ); // :10212
            } // :10213
          } else if (p === 32) {
            // :10215

            if (assi_mao) {
              // :10217
              await era.printAndWait(`『呣呣，姐姐来试试带环接吻吧…』`); // :10218
              await era.printAndWait(`「先，先让魔王大人来啦」`); // :10219
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10220
            } else {
              // :10221
              await era.printAndWait(`「魔王大人，来接吻吧…${heart(1)}」`); // :10222
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10223
            } // :10224
          } else if (p === 64) {
            // :10226

            if (assi_mao) {
              // :10228
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              ); // :10229
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              ); // :10230
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`); // :10231
            } else {
              // :10232
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              ); // :10233
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`); // :10234
            } // :10235
          } // :10236
        } else {
          // :10238
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10239
        } // :10240
      } else {
        // :10242

        if (chara(target).train.穿环状态 & p) {
          // :10244
          await era.printAndWait(`打孔器在${target_name}的肌肤上穿出了小洞。`); // :10245
          await era.printAndWait(`「呜啊啊！」`); // :10246
          await era.printAndWait(
            `第一次穿孔的痛楚让${target_name}惨叫了出来。`,
          ); // :10247

          if (p === 1) {
            // :10249

            if (assi_mao) {
              // :10251
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`); // :10252
              await era.printAndWait(`「一点都不适合……快点拿下来啊……呜呜呜」`); // :10253
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10254
            } else {
              // :10255
              await era.printAndWait(`「好痛……取，取下来啊……求求你」`); // :10256
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10257
            } // :10258
          } else if (p === 2) {
            // :10260

            if (assi_mao) {
              // :10262
              await era.printAndWait(`嘿嘿嘿，姐姐这样好可爱呢${heart(1)}』`); // :10263
              await era.printAndWait(`「不，不要碰啊……好痛…」`); // :10264
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10265
            } else {
              // :10266
              await era.printAndWait(`「呜……已，已经好了吗？」`); // :10267
              await era.printAndWait(
                `${target_name}吃痛地抚摸着自己肚脐上上闪闪发光的银环……`,
              ); // :10268
            } // :10269
          } else if (p === 4) {
            // :10271

            if (assi_mao) {
              // :10273
              await era.printAndWait(
                `『嘿嘿，姐姐真的是很合适穿环啊，特别是小穴这里♪』`,
              ); // :10274
              await era.printAndWait(`「不，不要那么用力啊……好痛！」`); // :10275
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              ); // :10276
            } else {
              // :10277
              await era.printAndWait(`「不要……不要看啊啊！」`); // :10278
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              ); // :10279
            } // :10280
          } else if (p === 8) {
            // :10282

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10284

              if (assi_mao) {
                // :10286
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                ); // :10287
                await era.printAndWait(
                  `「不，不是这样子的……都是因为你用手又拉又摩擦……才会勃起的……」`,
                ); // :10288
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                ); // :10289
              } else {
                // :10290
                await era.printAndWait(`「呜呜……不，不要这样用力……摩擦啊啊」`); // :10291
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                ); // :10292
              } // :10293
            } else {
              // :10294

              if (assi_mao) {
                // :10296
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10297
                await era.printAndWait(`「求求你了……不要再欺负姐姐了……呜呜」`); // :10298
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10299
              } else {
                // :10300
                await era.printAndWait(
                  `「不，不要啊……那个部位……不可以……呜呜呜」`,
                ); // :10301
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10302
              } // :10303
            } // :10304
          } else if (p === 16) {
            // :10306

            if (assi_mao) {
              // :10308
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`); // :10309
              await era.printAndWait(`「呜呜……不……不要拉啊啊……」`); // :10310
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，痛得呜咽了起来……`,
              ); // :10311
            } else {
              // :10312
              await era.printAndWait(
                `「不，不要啊……呜呜呜……以后会没办法……好好吃饭的……」`,
              ); // :10313
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，呜咽着说着什么……`,
              ); // :10314
            } // :10315
          } else if (p === 32) {
            // :10317

            if (assi_mao) {
              // :10319
              await era.printAndWait(`『嘿嘿，姐姐以后接吻会很舒服的…』`); // :10320
              await era.printAndWait(`「才，才没有那种事……好奇怪的感觉……」`); // :10321
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10322
            } else {
              // :10323
              await era.printAndWait(`「呜呜……感觉好奇怪……一点都不习惯」`); // :10324
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10325
            } // :10326
          } else if (p === 64) {
            // :10328

            if (assi_mao) {
              // :10330
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              ); // :10331
              await era.printAndWait(`「不，不要再说了……呜呜呜…」`); // :10332
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`); // :10333
            } else {
              // :10334
              await era.printAndWait(`「呜呜……鼻子好痛…」`); // :10335
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`); // :10336
            } // :10337
          } // :10338
        } else {
          // :10340
          await era.printAndWait(
            `${target_name}流着泪水，轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10341
        } // :10342
      } // :10343
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :10344
      kojo.穿环 = 1; // :10344
      return 0; // :10345
    } else {
      // :10347

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10349

        if (chara(target).train.穿环状态 & p) {
          // :10351

          if (p === 1) {
            // :10353
            if (assi_mao) {
              // :10354
              await era.printAndWait(`『很适合姐姐的淫乱大胸部哦！』`); // :10355
              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`); // :10356
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              ); // :10357
            } else {
              // :10358
              await era.printAndWait(
                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,
              ); // :10359
              await era.printAndWait(
                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,
              ); // :10360
            } // :10361
          } else if (p === 2) {
            // :10363

            if (assi_mao) {
              // :10365
              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`); // :10366
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              ); // :10367
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10368
            } else {
              // :10369
              await era.printAndWait(`「呜哇，这个环好漂亮……」`); // :10370
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10371
            } // :10372
          } else if (p === 4) {
            // :10374

            if (assi_mao) {
              // :10376
              await era.printAndWait(
                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,
              ); // :10377
              await era.printAndWait(
                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,
              ); // :10378
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              ); // :10379
            } else {
              // :10380
              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`); // :10381
              await era.printAndWait(
                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,
              ); // :10382
            } // :10383
          } else if (p === 8) {
            // :10385

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10387

              if (assi_mao) {
                // :10389
                await era.printAndWait(
                  `『哎呀呀姐姐，怎么穿环的时候勃起了呢${heart(1)}』`,
                ); // :10390
                await era.printAndWait(
                  `「是啊……光是接触到这个环，姐姐就兴奋起来了呢${heart(1)}」`,
                ); // :10391
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10392
              } else {
                // :10393
                await era.printAndWait(
                  `「哈……自己的阴茎被穿环，居然会这么兴奋呢…${heart(1)}」`,
                ); // :10394
                await era.printAndWait(
                  `${target_name}在忍受痛苦的同时兴奋了起来，阴茎充血勃起了……`,
                ); // :10395
              } // :10396
            } else {
              // :10397

              if (assi_mao) {
                // :10399
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10400
                await era.printAndWait(
                  `「是，是啊……已经变得除了小穴之外……什么都不会想了${heart(1)}」`,
                ); // :10401
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                ); // :10402
              } else {
                // :10403
                await era.printAndWait(
                  `「啊啊……轻轻碰一碰上面的环${heart(1)} 阴蒂就已经有感觉了啊${heart(1)}」`,
                ); // :10404
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环……`,
                ); // :10405
              } // :10406
            } // :10407
          } else if (p === 16) {
            // :10409

            if (assi_mao) {
              // :10411
              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`); // :10412
              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`); // :10413
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              ); // :10414
            } else {
              // :10415
              await era.printAndWait(
                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,
              ); // :10416
              await era.printAndWait(
                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,
              ); // :10417
            } // :10418
          } else if (p === 32) {
            // :10420

            if (assi_mao) {
              // :10422
              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`); // :10423
              await era.printAndWait(`「呣呣……还要继续吗？」`); // :10424
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10425
            } else {
              // :10426
              await era.printAndWait(`「呣呣，好像挺合适的？」`); // :10427
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10428
            } // :10429
          } else if (p === 64) {
            // :10431

            if (assi_mao) {
              // :10433
              await era.printAndWait(
                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,
              ); // :10434
              await era.printAndWait(`「就，就是这样呢♪」`); // :10435
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              ); // :10436
            } else {
              // :10437
              await era.printAndWait(`「意外的好看呢♪」`); // :10438
              await era.printAndWait(
                `${target_name}欣赏着自己鼻翼上穿着的银环……`,
              ); // :10439
            } // :10440
          } // :10441
        } else {
          // :10443
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10444
        } // :10445
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :10446
        kojo.穿环 = 4; // :10446
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10448

        if (chara(target).train.穿环状态 & p) {
          // :10450

          if (p === 1) {
            // :10452

            if (assi_mao) {
              // :10454
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`); // :10455
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`); // :10456
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10457
            } else {
              // :10458
              await era.printAndWait(`「怎么样，好像很合适呢？${heart(1)}」`); // :10459
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10460
            } // :10461
          } else if (p === 2) {
            // :10463

            if (assi_mao) {
              // :10465
              await era.printAndWait(`『呼呼，好可爱呢${heart(1)}』`); // :10466
              await era.printAndWait(
                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,
              ); // :10467
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10468
            } else {
              // :10469
              await era.printAndWait(`「呜哇，这个环好漂亮……」`); // :10470
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10471
            } // :10472
          } else if (p === 4) {
            // :10474

            if (assi_mao) {
              // :10476
              await era.printAndWait(
                `『姐姐的蜜穴真的是很适合穿环啊，相性非常好哦♪』`,
              ); // :10477
              await era.printAndWait(`「别这样直盯盯地看啦……真不好意思♪」`); // :10478
              await era.printAndWait(`${target_name}的蜜穴里被穿入了银环……`); // :10479
            } else {
              // :10480
              await era.printAndWait(`「请，请魔王大人尽情欣赏吧${heart(1)}」`); // :10481
              await era.printAndWait(
                `${target_name}害羞地分开自己的蜜穴，展露着穿在里面的两个银环……`,
              ); // :10482
            } // :10483
          } else if (p === 8) {
            // :10485

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10487

              if (assi_mao) {
                // :10489
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                ); // :10490
                await era.printAndWait(
                  `「不，才不是呢……是因为，因为……啊啊真的很兴奋啊${heart(1)}」`,
                ); // :10491
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10492
              } else {
                // :10493
                await era.printAndWait(
                  `「请，请魔王大人欣赏人家的穿环阴茎吧${heart(1)}」`,
                ); // :10494
                await era.printAndWait(
                  `${target_name}胯下的阴茎充血挺立了起来，摇晃着顶端穿入的银环………`,
                ); // :10495
              } // :10496
            } else {
              // :10497

              if (assi_mao) {
                // :10499
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10500
                await era.printAndWait(
                  `「不，不要对姐姐恶作剧啦……不过，不过……真的很有感觉啊${heart(1)}」`,
                ); // :10501
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10502
              } else {
                // :10503
                await era.printAndWait(
                  `「阴蒂被穿上这样的环，以后就正式成为魔王大人的性奴了呢…${heart(1)}」`,
                ); // :10504
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10505
              } // :10506
            } // :10507
          } else if (p === 16) {
            // :10509

            if (assi_mao) {
              // :10511
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`); // :10512
              await era.printAndWait(
                `「哎……那里也要吗……既然你这么希望的话……」`,
              ); // :10513
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              ); // :10514
            } else {
              // :10515
              await era.printAndWait(
                `「这样接吻……会很舒服吧，魔王大人${heart(1)}」`,
              ); // :10516
              await era.printAndWait(
                `${target_name}有些害羞地用穿着银环的舌尖舔着嘴唇……`,
              ); // :10517
            } // :10518
          } else if (p === 32) {
            // :10520

            if (assi_mao) {
              // :10522
              await era.printAndWait(`『呣呣，姐姐来试试带环接吻吧…』`); // :10523
              await era.printAndWait(`「先，先让魔王大人来啦」`); // :10524
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10525
            } else {
              // :10526
              await era.printAndWait(`「魔王大人，来接吻吧…${heart(1)}」`); // :10527
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10528
            } // :10529
          } else if (p === 64) {
            // :10531

            if (assi_mao) {
              // :10533
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              ); // :10534
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              ); // :10535
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`); // :10536
            } else {
              // :10537
              await era.printAndWait(
                `「感觉……有点怪怪的……不过，变成魔王大人的母牛性奴……也很高兴呢」`,
              ); // :10538
              await era.printAndWait(`${target_name}轻轻抚摸着鼻子上的银环……`); // :10539
            } // :10540
          } // :10541
        } else {
          // :10543
          await era.printAndWait(
            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10544
        } // :10545
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :10546
        kojo.穿环 = 3; // :10546
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        // :10548

        if (chara(target).train.穿环状态 & p) {
          // :10550

          if (p === 1) {
            // :10552

            if (assi_mao) {
              // :10554
              await era.printAndWait(`『嘿嘿，很适合姐姐的淫乱大胸部呢』`); // :10555
              await era.printAndWait(`「一点都不适合……快点拿下来啊……呜呜呜」`); // :10556
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10557
            } else {
              // :10558
              await era.printAndWait(`「好痛……取，取下来啊……求求你」`); // :10559
              await era.printAndWait(
                `${target_name}充血挺立起的乳头上，银环闪闪发光……`,
              ); // :10560
            } // :10561
          } else if (p === 2) {
            // :10563

            if (assi_mao) {
              // :10565
              await era.printAndWait(`嘿嘿嘿，姐姐这样好可爱呢${heart(1)}』`); // :10566
              await era.printAndWait(`「不，不要碰啊……好痛…」`); // :10567
              await era.printAndWait(
                `${target_name}的肚脐上穿入了闪闪发光的银环……`,
              ); // :10568
            } else {
              // :10569
              await era.printAndWait(`「呜……已，已经好了吗？」`); // :10570
              await era.printAndWait(
                `${target_name}吃痛地抚摸着自己肚脐上上闪闪发光的银环……`,
              ); // :10571
            } // :10572
          } else if (p === 4) {
            // :10574

            if (assi_mao) {
              // :10576
              await era.printAndWait(
                `『嘿嘿，姐姐真的是很合适穿环啊，特别是小穴这里♪』`,
              ); // :10577
              await era.printAndWait(`「不，不要那么用力啊……好痛！」`); // :10578
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              ); // :10579
            } else {
              // :10580
              await era.printAndWait(`「不要……不要看啊啊！」`); // :10581
              await era.printAndWait(
                `${player_name}用手指分开了${target_name}的蜜穴，欣赏着上面穿入的两个银环。`,
              ); // :10582
            } // :10583
          } else if (p === 8) {
            // :10585

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :10587

              if (assi_mao) {
                // :10589
                await era.printAndWait(
                  `『真厉害呢姐姐，穿环的时候都会兴奋得勃起呀${heart(1)}』`,
                ); // :10590
                await era.printAndWait(
                  `「不，不是这样子的……都是因为你用手又拉又摩擦……才会勃起的……」`,
                ); // :10591
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                ); // :10592
              } else {
                // :10593
                await era.printAndWait(`「呜呜……不，不要这样用力……摩擦啊啊」`); // :10594
                await era.printAndWait(
                  `${player_name}用手摩擦着${target_name}胯下的阴茎，摇晃着顶端穿入的银环………`,
                ); // :10595
              } // :10596
            } else {
              // :10597

              if (assi_mao) {
                // :10599
                await era.printAndWait(
                  `『哎呀呀，阴蒂穿上这样的东西，恐怕姐姐以后就没法过正常的生活了吧』`,
                ); // :10600
                await era.printAndWait(`「求求你了……不要再欺负姐姐了……呜呜」`); // :10601
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10602
              } else {
                // :10603
                await era.printAndWait(
                  `「不，不要啊……那个部位……不可以……呜呜呜」`,
                ); // :10604
                await era.printAndWait(
                  `${target_name}充血勃起的阴蒂被穿上了银环，变得更加敏感了……`,
                ); // :10605
              } // :10606
            } // :10607
          } else if (p === 16) {
            // :10609

            if (assi_mao) {
              // :10611
              await era.printAndWait(`『啊嘿嘿，姐姐的舌头也来一个环吧♪』`); // :10612
              await era.printAndWait(`「呜呜……不……不要拉啊啊……」`); // :10613
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，痛得呜咽了起来……`,
              ); // :10614
            } else {
              // :10615
              await era.printAndWait(
                `「不，不要啊……呜呜呜……以后会没办法……好好吃饭的……」`,
              ); // :10616
              await era.printAndWait(
                `${target_name}被${player_name}强行拉扯着舌头，穿上了银环，呜咽着说着什么……`,
              ); // :10617
            } // :10618
          } else if (p === 32) {
            // :10620

            if (assi_mao) {
              // :10622
              await era.printAndWait(`『嘿嘿，姐姐以后接吻会很舒服的…』`); // :10623
              await era.printAndWait(`「才，才没有那种事……好奇怪的感觉……」`); // :10624
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10625
            } else {
              // :10626
              await era.printAndWait(`「呜呜……感觉好奇怪……一点都不习惯」`); // :10627
              await era.printAndWait(
                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,
              ); // :10628
            } // :10629
          } else if (p === 64) {
            // :10631

            if (assi_mao) {
              // :10633
              await era.printAndWait(
                `『哎嘿嘿，鼻子穿上环之后，姐姐就真的变成母牛性奴呢了』`,
              ); // :10634
              await era.printAndWait(`「不，不要再说了……呜呜呜…」`); // :10635
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`); // :10636
            } else {
              // :10637
              await era.printAndWait(`「呜呜……鼻子好痛…」`); // :10638
              await era.printAndWait(`${target_name}痛苦地摸着鼻子上的银环……`); // :10639
            } // :10640
          } // :10641
        } else {
          // :10643
          await era.printAndWait(
            `${target_name}流着泪水，轻轻地擦拭着穿环处留下的血迹……`,
          ); // :10644
        } // :10645
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :10646
        kojo.穿环 = 2; // :10646
      } // :10647
    } // :10648
    return 0; // :10649
  } // :10650

  return 0;
}

async function dog_kojo_11(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era_flag.selectcom === 0) {
    // :10663

    if (kojo.爱抚 === 0) {
      // :10665

      if (era.get(`mark:${target}:2`) >= 2) {
        // :10667
        await era.printAndWait(''); // :10668
      } else {
        // :10670
        await era.printAndWait(''); // :10671
      } // :10672
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :10673
      kojo.爱抚 = 1; // :10673
      return 0; // :10674
    } else {
      // :10676

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :10678
        await era.printAndWait(''); // :10679
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :10680
        kojo.爱抚 = 7; // :10680
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10682
        await era.printAndWait(''); // :10683
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :10684
        kojo.爱抚 = 6; // :10684
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10686
        await era.printAndWait(''); // :10687
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :10688
        kojo.爱抚 = 5; // :10688
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10690
        await era.printAndWait(''); // :10691
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :10692
        kojo.爱抚 = 4; // :10692
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10694
        await era.printAndWait(''); // :10695
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :10696
        kojo.爱抚 = 3; // :10696
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :10698
        await era.printAndWait(''); // :10699
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :10700
        kojo.爱抚 = 2; // :10700
      } // :10701
      return 0; // :10702
    } // :10703
  } // :10704

  if (era_flag.selectcom === 1) {
    // :10709

    if (kojo.舔阴 === 0) {
      // :10711

      if (era.get(`talent:${target}:0`) === 1) {
        // :10713
        await era.printAndWait(''); // :10714
      } else {
        // :10716
        await era.printAndWait(''); // :10717
      } // :10718
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :10719
      kojo.舔阴 = 1; // :10719
      return 0; // :10720
    } else {
      // :10722

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10724
        await era.printAndWait(''); // :10725
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :10726
        kojo.舔阴 = 6; // :10726
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10728
        await era.printAndWait(''); // :10729
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :10730
        kojo.舔阴 = 5; // :10730
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10732
        await era.printAndWait(''); // :10733
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :10734
        kojo.舔阴 = 4; // :10734
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10736
        await era.printAndWait(''); // :10737
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :10738
        kojo.舔阴 = 3; // :10738
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        // :10740
        await era.printAndWait(''); // :10741
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :10742
        kojo.舔阴 = 2; // :10742
      } // :10743
      return 0; // :10744
    } // :10745
  } // :10746

  if (era_flag.selectcom === 5) {
    // :10752

    if (kojo.胸爱抚 === 0) {
      // :10754

      if (era.get(`talent:${target}:85`) === 1) {
        // :10756
        await era.printAndWait(''); // :10757
      } else {
        // :10759
        await era.printAndWait(''); // :10760
      } // :10761
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :10762
      kojo.胸爱抚 = 1; // :10762
      return 0; // :10763
    } else {
      // :10765

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10767
        await era.printAndWait(''); // :10768
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :10769
        kojo.胸爱抚 = 6; // :10769
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10771
        await era.printAndWait(''); // :10772
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :10773
        kojo.胸爱抚 = 5; // :10773
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10775
        await era.printAndWait(''); // :10776
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :10777
        kojo.胸爱抚 = 4; // :10777
      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10779
        await era.printAndWait(''); // :10780
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :10781
        kojo.胸爱抚 = 3; // :10781
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :10783
        await era.printAndWait(''); // :10784
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :10785
        kojo.胸爱抚 = 2; // :10785
      } // :10786
      return 0; // :10787
    } // :10788
  } // :10789

  if (era_flag.selectcom === 6) {
    // :10794

    if (kojo.接吻 === 0 && era.get('tflag:13')) {
      // :10796

      if (era.get(`talent:${target}:136`) === 1) {
        // :10798
        await era.printAndWait(''); // :10799
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :10801
        await era.printAndWait(''); // :10802
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :10804
        await era.printAndWait(''); // :10805
      } else {
        // :10807
        await era.printAndWait(''); // :10808
      } // :10809
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :10810
      kojo.接吻 = 1; // :10810
      return 0; // :10811
    } else if (kojo.接吻 === 0) {
      // :10813

      if (era.get(`talent:${target}:136`) === 1) {
        // :10815
        await era.printAndWait(''); // :10816
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :10818
        await era.printAndWait(''); // :10819
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :10821
        await era.printAndWait(''); // :10822
      } else {
        // :10824
        await era.printAndWait(''); // :10825
      } // :10826
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :10827
      kojo.接吻 = 1; // :10827
      return 0; // :10828
    } else {
      // :10830

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10832
        await era.printAndWait(''); // :10833
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :10834
        kojo.接吻 = 6; // :10834
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10836
        await era.printAndWait(''); // :10837
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :10838
        kojo.接吻 = 5; // :10838
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10840
        await era.printAndWait(''); // :10841
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :10842
        kojo.接吻 = 4; // :10842
      } else if (
        chara(target).system.顺从 >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10844
        await era.printAndWait(''); // :10845
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :10846
        kojo.接吻 = 3; // :10846
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // :10848
        await era.printAndWait(''); // :10849
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :10850
        kojo.接吻 = 2; // :10850
      } // :10851
      return 0; // :10852
    } // :10853
  } // :10854

  if (era_flag.selectcom === 9) {
    // :10859

    if (kojo.舔肛 === 0) {
      // :10861

      if (era.get(`talent:${target}:136`) === 1) {
        // :10863
        await era.printAndWait(''); // :10864
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :10866
        await era.printAndWait(''); // :10867
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :10869
        await era.printAndWait(''); // :10870
      } else {
        // :10872
        await era.printAndWait(''); // :10873
      } // :10874
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :10875
      kojo.舔肛 = 1; // :10875
      return 0; // :10876
    } else {
      // :10878

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10880
        await era.printAndWait(''); // :10881
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :10882
        kojo.舔肛 = 6; // :10882
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10884
        await era.printAndWait(''); // :10885
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :10886
        kojo.舔肛 = 5; // :10886
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10888
        await era.printAndWait(''); // :10889
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :10890
        kojo.舔肛 = 4; // :10890
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10892
        await era.printAndWait(''); // :10893
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :10894
        kojo.舔肛 = 3; // :10894
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // :10896
        await era.printAndWait(''); // :10897
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :10898
        kojo.舔肛 = 2; // :10898
      } // :10899
      return 0; // :10900
    } // :10901
  } // :10902

  if (era_flag.selectcom === 21) {
    // :10907

    if (kojo.背后位 === 0) {
      // :10909

      if (era.get(`talent:${target}:0`) === 1) {
        // :10911

        if (era.get(`talent:${target}:136`) === 1) {
          // :10913
          await era.printAndWait(''); // :10914
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :10916
          await era.printAndWait(''); // :10917
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :10919
          await era.printAndWait(''); // :10920
        } else {
          // :10923
          await era.printAndWait(''); // :10924
        } // :10925
      } else {
        // :10927

        if (era.get(`talent:${target}:136`) === 1) {
          // :10929
          await era.printAndWait(''); // :10930
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :10932
          await era.printAndWait(''); // :10933
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :10935
          await era.printAndWait(''); // :10936
        } else {
          // :10938
          await era.printAndWait(''); // :10939
        } // :10940
      } // :10941
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :10942
      kojo.背后位 = 1; // :10942
      return 0; // :10943
    } else {
      // :10945

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :10947
        if (rand_n(3) === 0) {
          // :10948
          await era.printAndWait(''); // :10949
        } else if (rand_n(2) === 0) {
          // :10950
          await era.printAndWait(''); // :10951
        } else {
          // :10952
          await era.printAndWait(''); // :10953
        } // :10954
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :10955
        kojo.背后位 = 7; // :10955
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :10957
        if (rand_n(3) === 0) {
          // :10958
          await era.printAndWait(''); // :10959
        } else if (rand_n(2) === 0) {
          // :10960
          await era.printAndWait(''); // :10961
        } else {
          // :10962
          await era.printAndWait(''); // :10963
        } // :10964
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :10965
        kojo.背后位 = 6; // :10965
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :10967
        if (rand_n(3) === 0) {
          // :10968
          await era.printAndWait(''); // :10969
        } else if (rand_n(2) === 0) {
          // :10970
          await era.printAndWait(''); // :10971
        } else {
          // :10972
          await era.printAndWait(''); // :10973
        } // :10974
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :10975
        kojo.背后位 = 5; // :10975
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :10977
        await era.printAndWait(''); // :10978
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :10979
        kojo.背后位 = 4; // :10979
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :10981
        await era.printAndWait(''); // :10982
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :10983
        kojo.背后位 = 3; // :10983
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :10985
        await era.printAndWait(''); // :10986

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :10988
        kojo.背后位 = 2; // :10988
      } // :10989
      return 0; // :10990
    } // :10991
  } // :10992

  if (era_flag.selectcom === 27) {
    // :10997

    if (kojo.背后位肛交 === 0) {
      // :10999

      if (era.get(`talent:${target}:136`) === 1) {
        // :11001
        await era.printAndWait(''); // :11002
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :11004
        await era.printAndWait(''); // :11005
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :11007
        await era.printAndWait(''); // :11008
      } else {
        // :11010
        await era.printAndWait(''); // :11011
      } // :11012
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :11013
      kojo.背后位肛交 = 1; // :11013
      return 0; // :11014
    } else {
      // :11016

      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :11018
        if (rand_n(2) === 0) {
          // :11019
          await era.printAndWait(''); // :11020
        } else {
          // :11021
          await era.printAndWait(''); // :11022
        } // :11023
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :11024
        kojo.背后位肛交 = 7; // :11024
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11026
        if (rand_n(2) === 0) {
          // :11027
          await era.printAndWait(''); // :11028
        } else {
          // :11029
          await era.printAndWait(''); // :11030
        } // :11031
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :11032
        kojo.背后位肛交 = 6; // :11032
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11034
        if (rand_n(2) === 0) {
          // :11035
          await era.printAndWait(''); // :11036
        } else {
          // :11037
          await era.printAndWait(''); // :11038
        } // :11039
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :11040
        kojo.背后位肛交 = 5; // :11040
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11042
        await era.printAndWait(''); // :11043
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :11044
        kojo.背后位肛交 = 4; // :11044
      } else if (
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11046
        await era.printAndWait(''); // :11047
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :11048
        kojo.背后位肛交 = 3; // :11048
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        // :11050
        await era.printAndWait(''); // :11051
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :11052
        kojo.背后位肛交 = 2; // :11052
      } // :11053
      return 0; // :11054
    } // :11055
  } // :11056

  if (era_flag.selectcom === 30) {
    // :11061

    if (kojo.手淫 === 0) {
      // :11063

      if (era.get(`talent:${target}:76`) === 1) {
        // :11065
        await era.printAndWait(''); // :11066
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :11068
        await era.printAndWait(''); // :11069
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :11071
        await era.printAndWait(''); // :11072
      } else {
        // :11074
        await era.printAndWait(''); // :11075
      } // :11076
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :11077
      kojo.手淫 = 1; // :11077
      return 0; // :11078
    } else {
      // :11080

      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :11082
        if (rand_n(2) === 0) {
          // :11083
          await era.printAndWait(''); // :11084
        } else {
          // :11085
          await era.printAndWait(''); // :11086
        } // :11087
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :11088
        kojo.手淫 = 7; // :11088
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11090
        if (rand_n(2) === 0) {
          // :11091
          await era.printAndWait(''); // :11092
        } else {
          // :11093
          await era.printAndWait(''); // :11094
        } // :11095
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :11096
        kojo.手淫 = 6; // :11096
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11098
        if (rand_n(2) === 0) {
          // :11099
          await era.printAndWait(''); // :11100
        } else {
          // :11101
          await era.printAndWait(''); // :11102
        } // :11103
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :11104
        kojo.手淫 = 5; // :11104
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11106
        await era.printAndWait(''); // :11107
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :11108
        kojo.手淫 = 4; // :11108
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11110
        await era.printAndWait(''); // :11111
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :11112
        kojo.手淫 = 3; // :11112
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :11114
        await era.printAndWait(''); // :11115
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :11116
        kojo.手淫 = 2; // :11116
      } // :11117
      return 0; // :11118
    } // :11119
  } // :11120

  if (era_flag.selectcom === 31) {
    // :11125

    if (kojo.口交_奴 === 0) {
      // :11127

      if (era.get(`talent:${target}:76`) === 1) {
        // :11129
        await era.printAndWait(''); // :11130
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :11132
        await era.printAndWait(''); // :11133
      } else if (chara(target).system.侍奉精神 >= 3) {
        // :11135
        await era.printAndWait(''); // :11136
      } else {
        // :11138
        await era.printAndWait(''); // :11139
      } // :11140
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :11141
      kojo.口交_奴 = 1; // :11141
      return 0; // :11142
    } else {
      // :11144

      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :11146
        await era.printAndWait(''); // :11147
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :11148
        kojo.口交_奴 = 7; // :11148
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11150
        await era.printAndWait(''); // :11151
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :11152
        kojo.口交_奴 = 6; // :11152
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11154
        await era.printAndWait(''); // :11155
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :11156
        kojo.口交_奴 = 5; // :11156
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11158
        await era.print(''); // :11159
        await era.printAndWait(''); // :11160
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :11161
        kojo.口交_奴 = 4; // :11161
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11163
        await era.print(''); // :11164
        await era.printAndWait(''); // :11165
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :11166
        kojo.口交_奴 = 3; // :11166
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :11168
        await era.printAndWait(''); // :11169
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :11170
        kojo.口交_奴 = 2; // :11170
      } // :11171
      return 0; // :11172
    } // :11173
  } // :11174

  if (era_flag.selectcom === 34) {
    // :11179

    if (kojo.骑乘位 === 0) {
      // :11181

      if (era.get(`talent:${target}:0`) === 1) {
        // :11183

        if (era.get(`talent:${target}:136`) === 1) {
          // :11185
          await era.printAndWait(''); // :11186
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :11188
          await era.printAndWait(''); // :11189
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :11191
          await era.printAndWait(''); // :11192
        } else {
          // :11194
          await era.printAndWait(''); // :11195
        } // :11196
      } else {
        // :11198

        if (era.get(`talent:${target}:136`) === 1) {
          // :11200
          await era.printAndWait(''); // :11201
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :11203
          await era.printAndWait(''); // :11204
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :11206
          await era.printAndWait(''); // :11207
        } else {
          // :11209
          await era.printAndWait(''); // :11210
        } // :11211
      } // :11212
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :11213
      kojo.骑乘位 = 1; // :11213
      return 0; // :11214
    } else {
      // :11216

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :11218
        if (rand_n(3) === 0) {
          // :11219
          await era.printAndWait(''); // :11220
        } else if (rand_n(2) === 0) {
          // :11221
          await era.printAndWait(''); // :11222
        } else {
          // :11223
          await era.printAndWait(''); // :11224
        } // :11225
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :11226
        kojo.骑乘位 = 7; // :11226
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11228
        if (rand_n(4) === 0) {
          // :11229
          await era.printAndWait(''); // :11230
        } else if (rand_n(3) === 0) {
          // :11231
          await era.printAndWait(''); // :11232
        } else if (rand_n(2) === 0) {
          // :11233
          await era.printAndWait(''); // :11234
        } else {
          // :11235
          await era.printAndWait(''); // :11236
        } // :11237
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :11238
        kojo.骑乘位 = 6; // :11238
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11240
        if (rand_n(4) === 0) {
          // :11241
          await era.print(''); // :11242
        } else if (rand_n(3) === 0) {
          // :11243
          await era.printAndWait(''); // :11244
        } else if (rand_n(2) === 0) {
          // :11245
          await era.printAndWait(''); // :11246
        } else {
          // :11247
          await era.printAndWait(''); // :11248
        } // :11249
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :11250
        kojo.骑乘位 = 5; // :11250
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11252
        if (rand_n(4) === 0) {
          // :11253
          await era.printAndWait(''); // :11254
        } else if (rand_n(3) === 0) {
          // :11255
          await era.printAndWait(''); // :11256
        } else if (rand_n(2) === 0) {
          // :11257
          await era.printAndWait(''); // :11258
        } else {
          // :11259
          await era.printAndWait(''); // :11260
        } // :11261
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :11262
        kojo.骑乘位 = 4; // :11262
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11264
        await era.print(''); // :11265
        await era.printAndWait(''); // :11266
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :11267
        kojo.骑乘位 = 3; // :11267
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :11269
        await era.printAndWait(''); // :11270
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :11271
        kojo.骑乘位 = 2; // :11271
      } // :11272
      return 0; // :11273
    } // :11274
  } // :11275

  if (era_flag.selectcom === 37) {
    // :11280

    if (kojo.肛门侍奉 === 0) {
      // :11282

      if (chara(target).system.侍奉精神 >= 3) {
        // :11284
        await era.printAndWait(''); // :11285
      } else {
        // :11287
        await era.printAndWait(''); // :11288
      } // :11289
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :11290
      kojo.肛门侍奉 = 1; // :11290
      return 0; // :11291
    } else {
      // :11293

      if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11295
        await era.printAndWait(''); // :11296
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :11297
        kojo.肛门侍奉 = 6; // :11297
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11299
        await era.printAndWait(''); // :11300
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :11301
        kojo.肛门侍奉 = 5; // :11301
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.侍奉精神 >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11303
        await era.print(''); // :11304
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :11305
        kojo.肛门侍奉 = 4; // :11305
      } else if (
        chara(target).system.侍奉精神 >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11307
        await era.printAndWait(''); // :11308
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :11309
        kojo.肛门侍奉 = 3; // :11309
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :11311
        await era.printAndWait(''); // :11312
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :11313
        kojo.肛门侍奉 = 2; // :11313
      } // :11314
      return 0; // :11315
    } // :11316
  } // :11317

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    // :11323

    if (kojo.眼罩 === 0) {
      // :11325

      if (era.get(`talent:${target}:136`) === 1) {
        // :11327
        await era.printAndWait(''); // :11328
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :11330
        await era.printAndWait(''); // :11331
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :11333
        await era.printAndWait(''); // :11334
      } else {
        // :11336
        await era.printAndWait(''); // :11337
      } // :11338
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :11339
      kojo.眼罩 = 1; // :11339
      return 0; // :11340
    } else {
      // :11342

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :11344
        await era.printAndWait(''); // :11345
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :11346
        kojo.眼罩 = 10; // :11346
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :11348
        await era.printAndWait(''); // :11349
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :11350
        kojo.眼罩 = 9; // :11350
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :11352
        await era.printAndWait(''); // :11353
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :11354
        kojo.眼罩 = 8; // :11354
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :11356
        await era.printAndWait(''); // :11357
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :11358
        kojo.眼罩 = 7; // :11358
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :11360
        await era.printAndWait(''); // :11361
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :11362
        kojo.眼罩 = 6; // :11362
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :11364
        await era.printAndWait(''); // :11365
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :11366
        kojo.眼罩 = 5; // :11366
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :11368
        await era.printAndWait(''); // :11369
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :11370
        kojo.眼罩 = 4; // :11370
      } else if (
        chara(target).system.抖M气质 >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :11372
        await era.printAndWait(''); // :11373
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :11374
        kojo.眼罩 = 3; // :11374
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :11376
        await era.printAndWait(''); // :11377
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :11378
        kojo.眼罩 = 2; // :11378
      } // :11379
      return 0; // :11380
    } // :11381
  } else if (era_flag.selectcom === 43 && era0(`tequip:${target}:43`) === 0) {
    // :11383

    if (
      era.get(`talent:${target}:136`) === 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :11385
      await era.printAndWait(''); // :11386
      // CFLAG:444  = 4（变量语义：CFLAG 族，444） // :11387
      kojo.兽奸眼罩 = 4; // :11387
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :11389
      await era.printAndWait(''); // :11390
      // CFLAG:444  = 3（变量语义：CFLAG 族，444） // :11391
      kojo.兽奸眼罩 = 3; // :11391
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :11393
      await era.printAndWait(''); // :11394
      // CFLAG:444  = 2（变量语义：CFLAG 族，444） // :11395
      kojo.兽奸眼罩 = 2; // :11395
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 === 2) {
      // :11397
      await era.printAndWait(''); // :11398
      // CFLAG:444  = 1（变量语义：CFLAG 族，444） // :11399
      kojo.兽奸眼罩 = 1; // :11399
    } // :11400
    return 0; // :11401
  } // :11402

  if (era_flag.selectcom === 56) {
    // :11408

    if (kojo.交谈 === 0) {
      // :11410
      if (era.get(`tequip:${target}:53`)) {
        // :11411

        if (era.get(`talent:${target}:136`) === 1) {
          // :11414
          await era.printAndWait(''); // :11415
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :11417
          await era.printAndWait(''); // :11418
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :11420
          await era.printAndWait(''); // :11421
        } else {
          // :11423
          await era.printAndWait(''); // :11424
        } // :11425
      } // :11426
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :11427
      kojo.交谈 = 1; // :11427
      return 0; // :11428
    } else {
      // :11430
      if (era.get(`tequip:${target}:53`)) {
        // :11431

        if (
          era.get(`talent:${target}:136`) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :11434
          await era.printAndWait(''); // :11435
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :11436
          kojo.交谈 = 5; // :11436
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :11438
          await era.printAndWait(''); // :11439
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :11440
          kojo.交谈 = 4; // :11440
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :11442
          await era.printAndWait(''); // :11443
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :11444
          kojo.交谈 = 3; // :11444
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          // :11446
          await era.printAndWait(''); // :11447
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :11448
          kojo.交谈 = 2; // :11448
        } // :11449
      } // :11450
      return 0; // :11451
    } // :11452
  } // :11453

  return 0; // :11456
}

kojo_message_com_family.register(11, kojo_message_com_11);

module.exports = { STUBBED_CALLS, k11_kojo2, kojo_message_com_11 };
