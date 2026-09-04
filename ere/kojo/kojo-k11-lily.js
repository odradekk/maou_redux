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
 * 内存根已占位）、@DOG_KOJO_11（第 10658 至 11462 行，兽奸，存根已占位）、
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
const STUBBED_CALLS = ['DOG_KOJO_11', 'COLOSSEUM_KOJO_11'];

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
 * （TEQUIP:89）→ 专用口上（DOG_KOJO_11，存根待认领）；死斗场（TEQUIP:55）
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
    stub_line('DOG_KOJO_11', '兽奸调教中的专用口上');
    return 0;
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

  return 0;
}

kojo_message_com_family.register(11, kojo_message_com_11);

module.exports = { STUBBED_CALLS, k11_kojo2, kojo_message_com_11 };
