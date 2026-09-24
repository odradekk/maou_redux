/**
 * @file 侵略画面：@INVASION 的四条出兵路线与地上征服后菜单 + @KYOTEN_EVENT
 *     的四臂 + @INVASION_EVENT 的 RAND 分发与三个中途事件 + @INVASION_CHECK
 *     五组结局判定（issue #117 魔力出兵；issue #118 结局判定本体与 ENDING_1
 *     接线；issue #468 地上征服后菜单渲染与派发、CAMPAIGN_MENU 接通；
 *     issue #503 怪物出兵 / 勇者掠夺两条路线；issue #504 勇者出兵路线与
 *     FORT / CHALLENGE 两臂；issue #505 地区续接与 start_campaign 的地区泛化）。
 *
 * 源: target/ERB/侵略/INVASION.ERB  @INVASION（:6-997）：地上征服后菜单
 *       :25-138（#468，post_conquest_menu；[9] 转 CAMPAIGN_MENU；[1]/[2]/[3]/[5]
 *       的地区续接自 #505 起接真身）/ 出兵菜单 :139-204 与四条路线——[0] 怪物
 *       出兵 :210-263、[1] 魔力出兵 :266-296（#117）、[2] 勇者出兵 :299-441
 *       （#504）、[3] 勇者掠夺 :442-563（[0]/[3] 为 #503）——共通补正
 *       :565-603、结果段 :609-618 + :620-692（[0]）/ :694-757（[1]）/
 *       :758-888（[2]，#504）/ :891-975（[3]）、结算尾 :976-997 /
 *       @MEDAL_BONUS（:1026-1067）/ @SENGEN_VIDEO（:1070-1233）+
 *       @SENGEN_VIDEO_BONUS（:1236-1266）（三者 #502）/ @INVASION_CHECK
 *       （:999-1021，#118 五组条件 1:1；ENDING_x 演出本体在
 *       ere/event/event-ending.js）
 *     target/ERB/侵略/INVASION_EVENT.ERB  @KYOTEN_EVENT（:2-209，四臂：
 *       ARG 1 人间界完整状态机 :14-105、ARG 2/3/4 精灵/龙/天界骨架
 *       :106-206——三臂自 #505 起接真身）/ @INVASION_EVENT（:212-235，
 *       RAND:10 真分发，三臂 JUMP 到 SEIEI / FORT / CHALLENGE）/
 *       @INVASION_EVENT_SEIEI（:240-459，含战斗体）/ @_INV_DEATH_CHECK
 *       （:462-529）/ @INVASION_EVENT_FORT（:530-814）/
 *       @INVASION_EVENT_CHALLENGE（:815-1162；该函数是文件里最后一个 @，
 *       到文件尾 RETURN 0 为止——工单与 #456 正文写的末行 1054 是笔误，
 *       实际 1162）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘不镜像（:26 等）：ere 控制台是滚动视图，画面每次
 *     进入整屏重画（page-select-target 同款先例）；$INPUT_LOOP/$INPUT_LOOP2
 *     对无效输入只重问不重画（GOTO），1:1 保留；
 *   - [999]/[1000] 原作同行显示（:82-83 的 PRINT 接 PRINTFORML，不换行）；
 *     ere 侧按钮是块级元素，拆成两个 printButton 各占一行，功能等价；
 *   - BARSTR 文本条 → era 原生进度条格（printMultiColumns 的 progress 格，
 *     page-train 先例）：barWidth 16 保住条后数值列（引擎缺省 24 会被
 *     el-col-0 吞掉，M155 的教训）；进度条标签按 AREA 取自 CAMPAIGN_REGIONS，
 *     原作里为对齐 BAR 而在标签两侧写的全角空格一并丢弃（只留「侵攻度」
 *     「精灵族领域的侵攻度」这样的正文，与 #117 起的口径一致）；本路径无
 *     黄金样本（#108 接受），逐字锁随 #109 裁定后补。SEIEI 战斗体的
 *     HP/气力条同款（`print_progress_line`）；
 *   - @INVASION_EVENT 的 RAND:10 分发（:224-232）**自 #503 起掷骰真分发**：
 *     #117 只做魔力路线时，三臂对 INV_TYPE == 1 一律「打印守卫后 RETURN -1」
 *     （FORT :539、CHALLENGE :824 的 SIF 守卫、SEIEI :273 的 SIF INV_TYPE
 *     != 2），掷不掷骰结果相同，故当时归约成直接调 SEIEI 臂。[0]/[3] 落地后
 *     INV_TYPE 取 0/3：CHALLENGE :824 的 `!= 0 && != 2 && != 3` 链对两者都
 *     放行；FORT :539 的 `FLAG:SINDO || INV_TYPE != 0 && ...` 按 Emuera 的
 *     **同优先级左结合**（见 invasion_event_fort 的注释）读成
 *     `((FLAG:SINDO || INV_TYPE != 0) && INV_TYPE != 2) && INV_TYPE != 3`——
 *     对 2/3 恒不早退、对 0 才看 FLAG:SINDO，两条路线照样可达（已征服的 [3]
 *     也进）。两臂真的可达，归约的依据当场失效，因此恢复真分发（#504 起
 *     三臂的行为体全部落地）；
 *   - **SINKOU 的按引用改写**：原作 `@INVASION_EVENT, …, SINKOU (#DIM REF),
 *     YUSYA_I` 把 SINKOU 传成引用，FORT/CHALLENGE 的强攻/潜入/绕路按比例
 *     削减它。ere 侧把 `{sinkou, yusya_i}` 打包成 state 传进传出（等价于
 *     REF），`start_campaign()` 在调用后写回局部量再进侵攻結果共通；
 *   - **PRINTDATA / PRINTDATAL 的抽取**（:893-910、:936-951、:959-964、
 *     :1015-1028 等）原作由引擎「等概率随机选择一块」，ere 侧无全局 RAND
 *     序列（#117 决议），改用注入的 rand、上界 = 块数（`printdata()`）；
 *   - [2] 出兵路线自 #504 起是真身（:299-441 + 结果段 :758-888）。**结果段
 *     不在工单范围表里**（工单只列了 :299-441）但与 #503 处理 [0]/[3] 时
 *     同一理由：不接就会掉进 [1] 的魔力结果段（打印「魔力爆发」并给魔王
 *     经验），是错误行为而不仅是缺功能；
 *   - **地区泛化（#505）**：`AREA`/`SINDO` 由 `CAMPAIGN_REGIONS` 表给出
 *     （:108-138 的五分支），各处按 AREA 分派的位置全部读表：出兵菜单标签
 *     （:152-167）、累加（:609-618）、四条结果段的地区名/已征服臂/进度条/
 *     @INVASION_RYOUZYOKU 地区号（:620-975）、@KYOTEN_EVENT 的实参
 *     （:983-994）。**原作在「哪张表」上自相矛盾，逐处 1:1 保留、不统一**：
 *     天神宫（AREA 101）的读点有两处走 EX_FLAG（:165 出兵菜单、:752-755 的
 *     `IF AREA <= 100` 魔力结果段），其余（:611-618 累加与封顶、:664/:860/
 *     :970 三处 `BAR FLAG:AREA`）只认 FLAG:101；[0] 的已征服臂更是只列了
 *     81/86/88/90（:624-646），天神宫落 :647-651 的 ELSE 臂。写 FLAG:101/102 与
 *     K1/K2 的「口上存在标志」同槽（yml/Flag.yml 保留区外的 1xx 段），
 *     累加会覆盖口上标志、读 FLAG:102 会把口上的存在当成「已征服」——
 *     #102 查明、ExFlag.yml 头注登记，1:1 保留、由用例钉住；
 *   - [2] 候选判据第三条 `!CFLAG:COUNT:0 == 2`（:307-309）**恒假**——Emuera 的
 *     `!` 是最高优先级的单目运算符，原式读作 `(!CFLAG:COUNT:0) == 2`，
 *     `!x` 恒为 0/1、与 2 比较永远为假。原作缺陷，#14 登记，1:1 保留
 *     （改写成 `!== 2` 会让助手可的角色从候选里消失），由 `brute_rejected`
 *     的注释与用例钉住；
 *   - `@_INV_DEATH_CHECK` 的第一处调用点（SEIEI :391）**漏了实参**：Emuera
 *     对省略的数值参数取 0（user-defined-functions.md），那一次判的是魔王
 *     （角色 0）自己的体力/气力，于是 :394-395 的「魔王侧获得胜利」经验段由
 *     魔王被打残触发而非精锐部队倒下。原作缺陷，#14 登记，1:1 保留；
 *   - @KYOTEN_EVENT 的 ARG 2/3/4 三臂（:106-206）**档内只剩一行星号、
 *     `FLAG:9x = n` 的推进赋值全被注释掉**，状态字恒 0 → 首档条件每次调用都
 *     成立、同一行星号反复打印，`;2000、4000…でイベント開始、一度のみ`
 *     （:5 自述）的设计意图被破坏。这不是汉化组改坏的：日站 2017/1/1 的补丁
 *     说明（target/資料_非必要無須解壓/パッチREADME/2016/
 *     !readme_INVASION_EVENT_20170101.txt）自述三臂是「雛形」、
 *     「中身はほぼありません」，FLAG:93-96 的语义见同目录的
 *     eramaouフラグまとめ.txt:200-203；**汉化版另把 94 号挪作他用**：
 *     :1006 的人数上限阶梯读 FLAG:94（95 号只有汉化人员 flag 表的自述
 *     「侵略中途事件（被勇者叫阵单挑）参数」，代码里 CHALLENGE 实际用的是
 *     EX_FLAG:95 位域）。原作缺陷，#14 登记，
 *     1:1 保留（#505 起三臂可达：出兵结算尾的 AREA 可取 86/88/90，且
 *     FLAG:86/88/90 自本票起有写入路径——`add_region_progress`，出兵结算），
 *     由用例钉住「每次调用都打一行、状态字不动」；
 *   - FORT 的 [3] 绕路支（:791-807）**从不给 `LOCAL` 赋值**（`:738-739` 的
 *     `LOCAL = RAND:10` 在 `L_CHOICE == 2 && INV_TYPE == 3` 支内），而 LOCAL
 *     是 #DIM 局部量、初值 0，于是 `:793-794` 的 `IF LOCAL > 0` 恒假——十成的
 *     「平安无事（体力 ×9/10）」不可达、恒走埋伏支并 RETURN 1。原作缺陷，
 *     #14 登记，1:1 保留；
 *   - FORT/CHALLENGE 的 `LOCAL:3`（`TALENT:YUSYA_I:种族 == n`，:546 等）与
 *     `LOCAL:12`（复现职业）都是 #DIM 局部量数组的元素，不是位运算；
 *     CHALLENGE 的 `LOCAL:12 = RAND:2 ? a # b` **在选区时就掷骰**（早于
 *     位域守卫的早退），故职业在取表时立刻定下，顺序 1:1；
 *   - SEIEI 战斗体的先制守卫（:361）用 `SINKOU/2048+1`、伤害式（:366/:377）
 *     用 `SINKOU/1024+1`——两处除数不同是原作的不对称，1:1 保留；
 *   - 精锐部队的清退（`SEIEI_I = CHARANUM - 1` 后 PARTY_CHAR_DEL / DELCHARA /
 *     NAME_RESET）在扁平化（#21）下直接用角色号 18/19——`getAddedCharacters()`
 *     是按角色号升序的名单、取不回「最后加入的一位」（#487 的教训）；
 *   - RESTART（:325/:377 等）按 control-flow.md:376-377「回到当前函数开头重新
 *     执行」（局部量不重置见 user-defined-variables.md）处理：@INVASION 的
 *     开头是 :6 的 FLAG:82 分派，故用 RESTART 常量把信号透传给 invasion() 的
 *     外层循环，由那里重走
 *     「分派 → 菜单」（先例：page-chara-info-show.js 的返回 true 外层重画）；
 *   - %SAVESTR:MASTER%（魔王存档名）经 callname:0:-1 承载（#5 决议，
 *     utils/callname-utils），新档 =「你」；
 *   - 地上征服后菜单（:25-138，post_conquest_menu，#468）：[0] 复用
 *     start_campaign()（结算与返回值完全一致）；[4] ARCANA_FORT 接真身
 *     （#470，invasion 域跨域调用不受限）；[1]/[2]/[3]/[5] 自 #505 起按
 *     CAMPAIGN_REGIONS 取 AREA/SINDO 后汇入同一个 start_campaign()，
 *     与原作「设完 AREA/SINDO 落到 $START1」同构；
 *   - [5] 天神宫的按钮渲染（:73-79，随 shrine_stage 或 route_33 开窗）与
 *     派发检查（:100，只认 route_33 <= 500）两组条件不对称是原作真实缺陷，
 *     1:1 保留：shrine_stage >= 1 时按钮可点，但 route_33 未开窗仍会被
 *     拒收重问；
 *   - [1001]（AGENT_MENU）的 PRINTL 按钮渲染行（:84）在原作已被注释，但
 *     ELSEIF RESULT == 1001 / CALL AGENT_MENU（:93-95）本身是活代码，排在
 *     :102 的 >=6 拒收之前——Emuera 的 INPUT 接受任意整数，不限于已打印
 *     按钮，手工键入 1001 在原作里仍可达；era.input() 只在本轮打印过按钮
 *     时才按白名单校验（test/helpers/era-fixture.js 镜像引擎
 *     returnFromButton），一旦某次 input() 因合法按钮值被判定为业务层
 *     无效（如 [5] 触发 :100-101 的拒收）而 continue 且不重新 printButton，
 *     白名单即清空，下一次 input() 变回自由输入，1001 在 ere 里同样可达
 *     （实测：flag:82=1、exflag:102=1、exflag:2810=0 时依次输入 5、1001
 *     可触达）。因此接一个显式存根分支，不落 AGENT_MENU 本体——其所在的
 *     侵略/AGENT/ 已被 #103 判定为复制改名事故，全库无调用点，登记为
 *     「只登记、不排期」；
 *   - FORT 与 CHALLENGE 的选项（`PRINTFORML [n] …`）改 `era.printButton`
 *     （PR #53 的「子画面选项按钮化」通则）：引擎白名单因此先一步挡下
 *     未渲染的值，`!INRANGE(RESULT,1,3)` / `!(RESULT == 1 || RESULT == 2)` /
 *     `L_CHOICE != 1 && L_CHOICE != 2` 三处重问支在真引擎里不可达——结构
 *     1:1 保留（page-intercept 的等级门同款处置）；
 *   - barWidth / 连续空白：`怪物数量减少了10\%` 的 `\%` 是原作对 PRINTFORM
 *     的转义，值是字面量 `10%`；PRINTFORM + PRINTFORMW 的同显示行按既有
 *     惯例并入一次 print（_INV_DEATH_CHECK 的三条溃败文案、FORT/CHALLENGE
 *     的多处两段式）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { campaign_menu } = require('#/page/page-campaign');
const { life_list_item } = require('#/page/page-life-list');
const {
  end10_55,
  ending_1,
  ending_3,
  ending_4,
  ending_5,
} = require('#/event/event-ending');
const { get_enemy, MAX_CHARANUM } = require('#/event/enter-enemy');
const { karma } = require('#/chara/chara-stats');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_make, name_reset } = require('#/chara/char-make');
const { e_get, monster_data } = require('#/dungeon/monster-data');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { arcana_fort } = require('#/invasion/invasion-arcana-fort');
const { invasion_ryouzyoku } = require('#/invasion/invasion-ravish');
const { chara } = require('#/facade/chara');
const { stub_line_wait } = require('#/utils/stub-line');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { NBSP, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 *
 * 'AGENT_MENU'（:93-95，[1001]，#103 判定的复制改名事故，只登记不排期）是
 * 本文件仅剩的存根调用名。'INVASION'（地区选择后的出兵续接，:108-138）自
 * #505 起是真身（CAMPAIGN_REGIONS 表 + start_campaign() 的 region 实参），
 * 移出本名单——四条出兵路线更早落地（[1] #117、[0]/[3] #503、[2] #504）。
 * 'INVASION_EVENT_SEIEI' / 'INVASION_EVENT_FORT' / 'INVASION_EVENT_CHALLENGE'
 * （:212-235 的 RAND:10 三臂）自 #504 起同为真身。'INVASION_CHECK' 自 #118
 * 起是真身（五组条件 1:1），'ARCANA_FORT'（:126，[4]）自 #470 起是真身
 * （ere/invasion/invasion-arcana-fort.js），'MEDAL_BONUS'（:593，共通补正）
 * 与 'SENGEN_VIDEO'（:91，[1000]）自 #502 起同样是真身（本文件内），上述都
 * 已移出本名单。
 * 'CAMPAIGN_MENU'（:98，[9]）不在此列——调用点本身是真实调用，存根名归属
 * page-campaign.js 自己的 STUBBED_CALLS（#468）。
 */
const STUBBED_CALLS = ['AGENT_MENU'];

/**
 * 原作 RESTART 的 ere 侧信号（control-flow.md:376-377「回到当前函数开头重新
 * 执行」；`#DIM` 局部量不随 RESTART 重置见 user-defined-variables.md 的
 * 局部变量一节）。@INVASION 的开头是 :6 的 FLAG:82 分派，
 * 所以信号一路透传到 invasion() 的外层循环——那里重走「FLAG:82 分派 →
 * 菜单」，与原作的 RESTART 等价（含「征服后菜单的 [0] 出发时回到征服后
 * 菜单」这一形态）。
 */
const RESTART = Symbol('restart');

/** 每页角色数（:19 `#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;

/** 出兵菜单的怪物门槛（:173/:179 `MON_NUM < 600`） */
const MONSTER_THRESHOLD = 600;

/** 进度条的条宽（< 24，否则引擎 el-col-0 吞掉条后数值列，见文件头） */
const BAR_WIDTH = 16;

/**
 * 出兵目标的地区表（:108-138 的 RESULT → AREA/SINDO 下标对，连同各处按 AREA
 * 分派所需的派生值）。键是地上征服后菜单的输入值 RESULT（:109/:113/:117/
 * :121/:133）；[4] 是 ARCANA_FORT 单独一支，不在本表。
 *
 * `area`/`sindo` 就是原作的同名 `#DIM` 局部量（也照原作命名 FLAG）；
 * `campaign_label` 是出兵菜单（$START1）的进度条标签（:153/:156/:159/:162/
 * :165）、`result_label` 是结果段的标签（:655/:657/…/:663 与 :743/:745/…/
 * :751 等）、`name` 是结果段里的地区名（:762/:765/…/:773 与 :895/:898/…/
 * :906）、`ravish_area` 是 @INVASION_RYOUZYOKU 的地区号（:671/:674/:677/
 * :680/:683 与 :867/:870/:873/:876/:879）、`kyoten_arg` 是 @KYOTEN_EVENT 的
 * 实参（:984/:987/:990/:993——**没有天神宫臂**，故为 null）。
 *
 * **天神宫的 AREA/SINDO 落在 EX_FLAG 侧，但原作只在两处按 EX_FLAG 处理**：
 * :165（出兵菜单）与 :752-755（`IF AREA <= 100 → BAR FLAG:AREA ELSE BAR
 * EX_FLAG:AREA`，魔力结果段）读 EX_FLAG:101；而 :611-618 的累加与封顶、
 * :664/:860/:970 三处结果段的 `BAR FLAG:AREA`、各结果段的已征服判据
 * `FLAG:SINDO`（SINDO = 102）只认 FLAG 侧。FLAG:101/102 在汉化版里是 K1/K2
 * 的「口上存在标志」（:1006 的人数上限阶梯同源），因此天神宫的累加会覆盖
 * K1 的口上标志、读 FLAG:102 会把 K2 口上的存在当成「已征服」。原作错位，
 * #102 查明、yml/ExFlag.yml 头注登记，1:1 保留、不统一——读点的表选择由
 * `region_progress()` 的 `use_exflag` 参数逐处给出。
 */
const CAMPAIGN_REGIONS = {
  0: {
    area: 81,
    sindo: 82,
    name: '人间界',
    campaign_label: '侵攻度',
    result_label: '侵攻度',
    ravish_area: 1,
    kyoten_arg: 1,
  },
  1: {
    area: 86,
    sindo: 87,
    name: '精灵族的领域',
    campaign_label: '精灵族领域的侵攻度',
    result_label: '精灵族的领域　侵攻度',
    ravish_area: 2,
    kyoten_arg: 2,
  },
  2: {
    area: 88,
    sindo: 89,
    name: '龙之山脉',
    campaign_label: '龙之山脉的侵攻度',
    result_label: '龙之山脉　侵攻度',
    ravish_area: 3,
    kyoten_arg: 3,
  },
  3: {
    area: 90,
    sindo: 91,
    name: '天界',
    campaign_label: '天界的侵攻度',
    result_label: '天界　侵攻度',
    ravish_area: 4,
    kyoten_arg: 4,
  },
  5: {
    area: 101,
    sindo: 102,
    name: '天神宫',
    campaign_label: '天神宫的侵攻度',
    result_label: '天神宫　侵攻度',
    ravish_area: 5,
    kyoten_arg: null,
  },
};

/** 人间界：未征服时 invasion() 直接进的那一支（:139-142 的 ELSE，AREA=81） */
const HUMAN_WORLD = CAMPAIGN_REGIONS[0];

/**
 * [0] 怪物路线的已征服臂只列了这四个地区（:624/:630/:636/:642），
 * 天神宫落到 :647-651 的 ELSE 臂（战利品行）——原作漏列，1:1 保留。
 */
const MONSTER_CONQUERED_AREAS = [81, 86, 88, 90];

/**
 * 侵攻度的读点。`use_exflag` 对应原作两处按表分派**正确**的位置——出兵菜单
 * （:165 的 `EX_FLAG:AREA`）与魔力结果段（:752-755 的 `IF AREA <= 100 →
 * BAR FLAG:AREA ELSE BAR EX_FLAG:AREA`）；其余三处结果段（:664/:860/:970）
 * 只写 `BAR FLAG:AREA`，传 false 即 1:1（见 CAMPAIGN_REGIONS 的注释）。
 *
 * 地址是模板串（`flag:${region.area}`）：AREA 本来就是按地区取的变量，
 * domain-check 的属主判定对动态下标不适用（tools/domain-check.mjs 头注的
 * 「动态下标静态无法判定属主，只计数不判定」）。
 *
 * @param {object} region 地区条目
 * @param {boolean} use_exflag true = AREA > 100 时读 EX_FLAG（原作两处正确分派）
 * @returns {number} 该地区的侵攻度（未声明下标兜 0，见 issue #13）
 */
function region_progress(region, use_exflag) {
  const table = use_exflag && region.area > 100 ? 'exflag' : 'flag';
  return era.get(`${table}:${region.area}`) || 0;
}

/**
 * 侵攻度累加 + 封顶（:611-618）。**原作写的是 `FLAG:AREA`**，与读点无关
 * ——天神宫因此累加进 FLAG:101（与 K1 口上存在标志同槽），封顶判据也看
 * FLAG:101。原作错位，1:1 保留（#102 查明）。
 *
 * @param {object} region 地区条目
 * @param {number} gained 本次增量（原作 SINKOU，掠夺路线是 SINKOU / 20）
 */
function add_region_progress(region, gained) {
  const next = (era.get(`flag:${region.area}`) || 0) + gained;
  era.set(`flag:${region.area}`, Math.min(next, 10000)); // :617-618 封顶
}

/** 原作 RAND:N（0..N-1）的缺省随机源（同族模块同款；各函数以 rand 为注入名） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** GETBIT(X, n)：FLAG:5 用到位 32+，位运算在 JS 里按 32 位截断会溢出，改算术 */
function getbit(value, bit) {
  return Math.floor((value || 0) / 2 ** bit) % 2;
}

/**
 * 原作 `TIMES 整数, 小数` 的等价物：乘完截断小数部分。Emuera 的双精度与 JS
 * 同为 IEEE 754，两边逐位同值（`SENGEN_VIDEO` 的 ×1.20/×1.60、`SENGEN_VIDEO_BONUS`
 * 的 ×1.10/×1.20/×0.80 共十二处）。
 * @param {number} value 整数原值
 * @param {number} factor 小数倍率
 * @returns {number} 截断后的整数
 */
function times(value, factor) {
  return Math.floor(value * factor);
}

/**
 * 数值型 INPUT 的读数（本文件九处：`SENGEN_VIDEO` 内的六处
 * :1093/:1102/:1127/:1148/:1176/:1208，post_conquest_menu 与 start_campaign
 * 各一处菜单读数，以及 #503 的 pick_raid_hero 一处——:517 的列表选人）。
 *
 * 引擎 `era.input()` 与原作 `INPUT` 有两处差异（逐字镜像见
 * test/helpers/era-fixture.js 的 #151/G6，`getNumber(val)` 即 `Number(val)`、
 * 解析失败原样返回）：
 *   - **空输入归一成 0**——原作的 `INPUT` 没有默认值时会在引擎层原地重问，
 *     游戏层永远看不到空值；ere 侧区分不出「空」与「显式键入 0」，两者都走
 *     `RESULT == 0` 那一支；
 *   - **非数字串原样回传**（字符串），而原作的 `RESULT` 恒为数值——不归一
 *     就会让 `count` 变成 NaN：`count > stock` 恒假、直接被当合法数量收下，
 *     随后 `EX_FLAG:9011 += count`（:1109/:1137）把 NaN 写进存档变量。
 *
 * @returns {Promise<number>} 输入值；空输入与非数字一律归一到 0
 */
async function number_input() {
  const value = await era.input();
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * 原作 FORMAT `{值,N}` 的定宽：位数不足补半角空格（右对齐；数字是半角，
 * 与全角算两格的规则无关）。
 * @param {number} value 数值
 * @param {number} width 显示位数
 * @returns {string}
 */
function pad_number(value, width) {
  return pad_left(String(value), width);
}

// @KYOTEN_EVENT 的星号横幅（INVASION_EVENT.ERB:16-22 等十处，逐字抄自原作，
// 含全角空格的手工对齐）
const BANNER_STAR =
  '*******************************************************************************************';
const BANNER_BLANK =
  '*********　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　**********';
const KYOTEN_BANNERS = {
  占领了村庄:
    '*********　　　　　　　　　　　　　　　占领了村庄　　　　　　　　　　　　　　　　**********',
  占领了港口:
    '*********　　　　　　　　　　　　　　　占领了港口　　　　　　　　　　　　　　　　**********',
  攻陷了堡垒:
    '*********　　　　　　　　　　　　　　　攻陷了堡垒　　　　　　　　　　　　　　　　**********',
  占领了街道:
    '*********　　　　　　　　　　　　　　　占领了街道　　　　　　　　　　　　　　　　**********',
  占领了城市:
    '*********　　　　　　　　　　　　　　　占领了城市　　　　　　　　　　　　　　　　**********',
  人间界的军队占领了村庄:
    '*********　　　　　　　　　　　　人间界的军队占领了村庄　　　　　　　　　　　　　**********',
  人间界的军队占领了港口:
    '*********　　　　　　　　　　　　人间界的军队占领了港口　　　　　　　　　　　　　**********',
  人间界的军队攻陷了堡垒:
    '*********　　　　　　　　　　　　人间界的军队攻陷了堡垒　　　　　　　　　　　　　**********',
  人间界的军队占领了街道:
    '*********　　　　　　　　　　　　人间界的军队占领了街道　　　　　　　　　　　　　**********',
  人间界的军队占领了城市:
    '*********　　　　　　　　　　　　人间界的军队占领了城市　　　　　　　　　　　　　**********',
};

/**
 * 一行「标签 + 进度条 + 数值」（BARSTR/BAR 的等价物，偏离说明见文件头）。
 * @param {string} label 行首标签
 * @param {number} value 当前进度
 * @param {number} max 满刻度
 */
function print_progress_line(label, value, max) {
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? Math.min(100, (100 * value) / max) : 0,
      inContent: label,
      outContent: ` ${value}/${max}`,
      config: { barWidth: BAR_WIDTH },
    },
  ]);
}

/**
 * @KYOTEN_EVENT 四臂共用的状态推进链（人间界臂 :14-105 与三臂 :106-206 的
 * 十档判定逐字同构）：命中档给下一档号，未命中返回原档。ELSEIF 链化成一串
 * 提前 return，语义与「命中即止」相同。
 *
 * @param {number} progress 该领域的侵攻度
 * @param {number} stage 该领域的侵略事件状态字
 * @returns {number} 下一档；等于 stage 即未命中任何档
 */
function kyoten_next_stage(progress, stage) {
  if (progress >= 2000 && stage === 0) return 1;
  if (progress >= 4000 && stage === 1) return 2;
  if (progress >= 6000 && stage === 2) return 3;
  if (progress >= 8000 && stage === 3) return 4;
  if (progress >= 10000 && stage === 4) return 5;
  if (progress <= 500 && stage === 1) return 0;
  if (progress <= 2000 && stage === 2) return 1;
  if (progress <= 4000 && stage === 3) return 2;
  if (progress <= 6000 && stage === 4) return 3;
  if (progress <= 8000 && stage === 5) return 4;
  return stage;
}

/**
 * ARG 2/3/4 三臂的参数：侵攻度下标、侵略事件状态字、征服守卫。
 *
 * `guard` 只有精灵臂有（:108 的 `IF FLAG:87 == 0`），龙/天界两臂连守卫都
 * 没有（:142/:175；这两处的参数名写成 `ARG` 而不是 `ARG:0`，Emuera 的 `ARG`
 * 就是 `ARG:0`、行为无差）。状态字 FLAG:94/95/96 在汉化版**只有读点、没有
 * 写点**（推进赋值全被注释），故读未声明下标——库内先例见 hero_cap_reached()
 * 的 FLAG:94，兜 0 的口径同 issue #13。
 */
const KYOTEN_TEMPLATE_ARMS = {
  2: { progress: 86, stage: 94, guard: 87 }, // 精灵族领域
  3: { progress: 88, stage: 95 }, // 龙之山脉
  4: { progress: 90, stage: 96 }, // 天界
};

/**
 * @KYOTEN_EVENT（INVASION_EVENT.ERB:2-209）：据点事件横幅。
 *
 * ARG:0 == 1（人间界）的完整状态机（:14-105）：侵攻度跨 2000/4000/6000/
 * 8000/10000 逐档推进 FLAG:93，回落到 500/2000/4000/6000/8000 以下时逐档
 * 回退，命中的档打七行横幅并写回状态字。
 *
 * ARG:0 == 2/3/4（精灵/龙/天界，:106-206）**自 #505 起是真身**：十档判定与
 * 人间界臂逐字同构，但档内只剩一行星号——`FLAG:9x = n` 的推进赋值在汉化版
 * 被注释掉，状态字恒 0，于是首档条件每次调用都成立、同一行星号反复打印
 * （`;…イベント開始、一度のみ`（:5）的设计意图被破坏）。这不是汉化组改坏
 * 的：日站 2017/1/1 的补丁说明自述三臂是「雛形」、「中身はほぼありません」
 * （target/資料_非必要無須解壓/パッチREADME/2016/
 * !readme_INVASION_EVENT_20170101.txt），FLAG:93-96 的语义见同目录
 * eramaouフラグまとめ.txt:200-203；**汉化版另把 94 号挪作他用**：:1006 的
 * 人数上限阶梯读 FLAG:94（95 号只有汉化人员 flag 表的自述「侵略中途事件
 * （被勇者叫阵单挑）参数」，代码里 CHALLENGE 实际用的是 EX_FLAG:95 位域）。
 * 原作缺陷，#14 登记、
 * 1:1 保留——状态链照抄、不写回状态字，由用例钉住「每次调用都打一行」。
 *
 * 三臂的可达性：出兵结算尾的 AREA 自 #505 起可取 86/88/90（地区续接），
 * 且 FLAG:86/88/90 自本票起有写入路径（`add_region_progress`，出兵结算；
 * 日循环侧的调用点随 #119 已接线、只读，因此不再是空转）——两条调用族都通，
 * 不再有「不可达」的余地。
 *
 * @param {number} arg 地区编号：1=人间界、2=精灵、3=龙、4=天界
 *   （0 与 5 及以上原作三条 ELSEIF 都不进，空转）
 * @returns {Promise<0>} 原作恒 RETURN 0
 */
async function kyoten_event(arg) {
  if (arg === 1) {
    const progress = era_flag.human_realm_invasion; // FLAG:81
    const stage = era_flag.human_realm_event_stage; // FLAG:93
    const next = kyoten_next_stage(progress, stage);
    if (next === stage) {
      return 0; // 未命中任何档：空转
    }
    const banner =
      KYOTEN_BANNERS[stage < next ? forward_key(next) : recapture_key(stage)];
    era.print(BANNER_STAR);
    era.print(BANNER_STAR);
    era.print(BANNER_BLANK);
    era.print(banner);
    era.print(BANNER_BLANK);
    era.print(BANNER_STAR);
    era.print(BANNER_STAR);
    era_flag.human_realm_event_stage = next;
    return 0;
  }

  const arm = KYOTEN_TEMPLATE_ARMS[arg];
  if (arm === undefined) {
    return 0; // ARG 0/5 及以上：三条 ELSEIF 都不进（:106-206 之外，空转）
  }
  // :108 精灵臂独有的征服守卫（龙/天界两臂没有这一层）
  if (arm.guard !== undefined && (era.get(`flag:${arm.guard}`) || 0) !== 0) {
    return 0;
  }
  const progress = era.get(`flag:${arm.progress}`) || 0;
  const stage = era.get(`flag:${arm.stage}`) || 0;
  if (kyoten_next_stage(progress, stage) === stage) {
    return 0; // 未命中任何档：空转
  }
  // :106-206 的十处：档内只剩这一行星号（推进赋值被注释，不写回状态字）
  era.print(BANNER_STAR);
  return 0;
}

// 推进档（stage → next）与夺回档（stage → next-1）的横幅键
function forward_key(next_stage) {
  return ['占领了村庄', '占领了港口', '攻陷了堡垒', '占领了街道', '占领了城市'][
    next_stage - 1
  ];
}
function recapture_key(stage) {
  return [
    '人间界的军队占领了村庄',
    '人间界的军队占领了港口',
    '人间界的军队攻陷了堡垒',
    '人间界的军队占领了街道',
    '人间界的军队占领了城市',
  ][stage - 1];
}

/**
 * @INVASION_EVENT（INVASION_EVENT.ERB:212-235）：侵略中途事件的 RAND:10 分发。
 *
 * :224 `LOCAL = RAND:10` 后三分（:226-230）：9 → @INVASION_EVENT_FORT、
 * 8 → @INVASION_EVENT_CHALLENGE、其余 0-7 → @INVASION_EVENT_SEIEI。原作三
 * 条都是 JUMP（尾调用），被跳函数的返回值就是本函数的返回值。**#503 起是
 * 真分发**（归约依据失效的经过见文件头）。
 *
 * 原作五参是 `AREA, SINDO, INV_TYPE, SINKOU(#DIM REF), YUSYA_I`——三臂都会
 * 读 SINKOU，FORT/CHALLENGE 还会改写它（两臂的强攻/潜入/绕路各自按比例削
 * 减）。ere 侧把 SINKOU 与 YUSYA_I 打包成 `state` 传进传出，等价于 `#DIM
 * REF`（返回后由调用方写回局部量）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 以引用语义共享的局部量
 *   （原作 `#DIM REF SINKOU` 与 `#DIM YUSYA_I`）
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:10 的上界）
 * @returns {Promise<number>} 0/-1 = 继续侵攻（原作 :213 的契约是「0 继续、
 *   1 结束」，三臂照此返回）；>0 = 侵攻中止（调用方透传）
 */
async function invasion_event(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  const local = rand(10); // :224 LOCAL = RAND:10
  if (local === 9) {
    return await invasion_event_fort(area, sindo, inv_type, state, rand); // :226-227
  }
  if (local === 8) {
    return await invasion_event_challenge(area, sindo, inv_type, state, rand); // :228-229
  }
  return await invasion_event_seiei(area, sindo, inv_type, state, rand); // :232
}

/** FLAG:5 位 7（128）：狂王俘虏线的开关（`FLAG:5 & 128`，31 位内位运算直接可用） */
function captive_route() {
  return ((era.get('flag:5') || 0) & 128) !== 0;
}

/**
 * @_INV_DEATH_CHECK（INVASION_EVENT.ERB:462-529）：精锐部队战斗的退场判定。
 *
 * 两段：先判 ARG:1（精锐部队）的三条死线 → RETURN 2（魔王侧获胜）；再判
 * ARG:0（领军勇者）的四条 → RETURN 1（侵攻中止）。玩家的位 7 开关
 * （FLAG:5 & 128）决定退场状态：开 = 被狂王带走（CFLAG:1 = 9），关 = 逃回
 * 本国（CFLAG:1 = 0）。
 *
 * **第一处调用点（:391）不给实参**（`CALL _INV_DEATH_CHECK`），Emuera 对省略
 * 的数值参数取 0（user-defined-functions.md「省略参数时：数值型默认 0」），
 * 于是那一次判的是角色 0（魔王）自己的体力/气力，而不是精锐部队。原作缺陷，
 * 1:1 保留、登记 #14（应写作 `CALL _INV_DEATH_CHECK, YUSYA_I, SEIEI_I`）。
 *
 * @param {number} arg0 领军勇者（原作 ARG:0）
 * @param {number} arg1 精锐部队（原作 ARG:1）
 * @returns {Promise<number>} 2 = 精锐部队退场；1 = 魔王侧退场；0 = 继续
 */
async function inv_death_check(arg0, arg1) {
  // :466-479 勇者死亡判定（判 ARG:1）
  const elite_hp = era.get(`base:${arg1}:0`) || 0;
  if (elite_hp <= 0) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军消灭了………`, // :468
    );
    era.println(); // :468-469 PRINTL
    return 2; // :470-471
  }
  if (elite_hp <= 100) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军击溃了………`, // :472
    );
    era.println(); // :472-473
    return 2; // :474-475
  }
  if ((era.get(`base:${arg1}:1`) || 0) <= 0) {
    era.print(`被魔王军包围的${chara_nickname(arg1)}失去战斗的意志投降了………`); // :476
    era.println(); // :476-477
    return 2; // :476-478
  }

  // :482-521 魔王側の生き残りを判定（判 ARG:0；四条 ELSEIF，顺序 1:1）
  const hero_hp = era.get(`base:${arg0}:0`) || 0;
  const hero_mp = era.get(`base:${arg0}:1`) || 0;
  // :482-487 被狂王俘虏过（TALENT:280）且气力见底 → 抛下武器投降
  if (
    hero_mp <= 1000 &&
    (era.get(`talent:${arg0}:280`) || 0) !== 0 &&
    captive_route()
  ) {
    era.print(
      `被狂王俘虏过的${chara_callname(arg0)}丧失了战意，抛下武器投降了。`,
    ); // :483
    era.print(`${chara_nickname(arg1)}俘获了${chara_callname(arg0)}………`); // :484 PRINTFORMW
    await era.waitAnyKey();
    chara(arg0).invasion.状态 = 9; // :484-485（CFLAG(ARG:0) 的第 1 位）= 9
    era.drawLine(); // :486-488
    return 1; // :487-488
  }
  // :488-509 / :510-520 三条「魔王军被打散」的形态，各自的收尾文案按位 7 二分。
  // 原作的 `PRINTFORM X，` 接 `PRINTFORMW Y` 在同一显示行，ere 侧并入一次
  // print + 等键（同显示行归并先例）。
  const collapse =
    hero_hp <= 0
      ? {
          head: `魔王军被${chara_nickname(arg1)}消灭了，`, // :489
          captured: `${chara_callname(arg0)}也被俘虏了…………`, // :491
          escaped: `${chara_callname(arg0)}孤身逃了回来…………`, // :494
        }
      : hero_hp <= 300
        ? {
            head: `魔王军被${chara_nickname(arg1)}击溃了，`, // :500
            captured: `${chara_callname(arg0)}也被俘虏了…………`, // :502
            escaped: `${chara_callname(arg0)}从乱军中逃了回来…………`, // :505
          }
        : hero_mp <= 0
          ? {
              head: `被${chara_nickname(arg1)}包围的魔王军失去战斗的意志投降了，`, // :511
              captured: `${chara_callname(arg0)}被投降的部下献给了${chara_nickname(arg1)}…………`, // :513
              escaped: `${chara_callname(arg0)}没脸见人地逃了回来…………`, // :516
            }
          : null;
  if (collapse === null) {
    return 0; // :524-528 四条都不命中
  }
  const taken = captive_route();
  era.print(collapse.head + (taken ? collapse.captured : collapse.escaped));
  await era.waitAnyKey(); // :491/:494 等 PRINTFORMW 的 WAIT
  chara(arg0).invasion.状态 = taken ? 9 : 0; // :492-494/:494-495/:503/:505-506/:513-514/:517
  era.drawLine(); // :497-499/:508-510/:516-519
  return 1; // :498-499/:509-510/:516-520
}

/** 精锐部队的两个预设角色号（:298 `ADDCHARA 18` 防御型 / :303 `ADDCHARA 19` 攻击型） */
const SEIEI_DEFENDER = 18;
const SEIEI_ATTACKER = 19;

/** 战斗回合数（:317 `REPEAT 21`）：第 21 次循环由 :318 的 `TIME_I > 19` 截住 */
const SEIEI_ROUNDS = 21;
/** 战线崩溃的判据（:318 `IF TIME_I > 19`） */
const SEIEI_TIMEOUT_AT = 19;

/**
 * 精锐部队战斗体（INVASION_EVENT.ERB:279-459）。
 *
 * 回合制：勇者侧先制（:361 的防御判定 + :362 的 1/5 会心一击）→
 * `_INV_DEATH_CHECK`（无实参，见该函数）→ 精锐侧反击（:412 的防御判定）→
 * `_INV_DEATH_CHECK, YUSYA_I, SEIEI_I`。`REPEAT 21` 的第 21 次直接走
 * 超时（战线崩溃、给 SINKOU/10 经验、RETURN 1）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 精锐部队被打倒（战斗体走完）；1 = 侵攻中止
 */
async function seiei_battle(area, state, rand) {
  const yusya = state.yusya_i;
  const sinkou = state.sinkou;
  era.print('………'); // :282-283
  await era.waitAnyKey();
  era.print('……'); // :284-286
  await era.waitAnyKey();
  era.print('…'); // :285-286
  await era.waitAnyKey();
  era.print('精锐部队出现了！'); // :286
  await era.waitAnyKey();
  // :293-294
  era.print(
    `你的勇者${chara_callname(yusya)}率领着魔王军和精锐部队展开了战斗！`,
  );
  await era.waitAnyKey();
  era.print('（怪物的战斗力将被添加到攻击力和体力和气力上）');
  await era.waitAnyKey();

  let time_i = 0; // :295
  // :296-306 两种精锐部队（防御型 18 / 攻击型 19）。扁平化（#21）下
  // GETCHARA(18/19) 就是刚加入的角色号，不用「已加入数 - 1」（#487 的教训）
  let seiei;
  if (rand(2) === 0) {
    era.addCharacter(SEIEI_DEFENDER); // :298
    await add_chara_ex(SEIEI_DEFENDER); // :299
    seiei = SEIEI_DEFENDER; // :300 GETCHARA(18)
  } else {
    era.addCharacter(SEIEI_ATTACKER); // :303
    await add_chara_ex(SEIEI_ATTACKER); // :304-305
    seiei = SEIEI_ATTACKER; // :305 GETCHARA(19)
  }

  // :307-313 勇者基礎レベル補正（FLAG:60 = 勇者基础等级校正）
  const bonus = 10 * (era.get('flag:60') || 0);
  chara(seiei).dungeon.攻击力 += era.get('flag:60') || 0; // :307-308 CFLAG:SEIEI_I:11
  chara(seiei).dungeon.防御力 += era.get('flag:60') || 0; // :307-309 CFLAG:SEIEI_I:12
  era.set(`maxbase:${seiei}:0`, (era.get(`maxbase:${seiei}:0`) || 0) + bonus); // :307-310
  era.set(`maxbase:${seiei}:1`, (era.get(`maxbase:${seiei}:1`) || 0) + bonus); // :311-314
  chara(seiei).dungeon.体力 += bonus; // :312-314 BASE:SEIEI_I:0
  chara(seiei).dungeon.气力 += bonus; // :313 BASE:SEIEI_I:1
  // :315-316 SINKOU 补正（加成到勇者的体力/气力上）
  chara(yusya).dungeon.体力 += sinkou;
  chara(yusya).dungeon.气力 += sinkou;

  for (let round = 0; round < SEIEI_ROUNDS; round += 1) {
    // :318-333 超时：战线维持不住，残余怪物不足十只，给 SINKOU/10 经验
    if (time_i > SEIEI_TIMEOUT_AT) {
      era.print('………'); // :318-319
      await era.waitAnyKey();
      era.print('……'); // :320-322
      await era.waitAnyKey();
      era.print('…'); // :321-322
      await era.waitAnyKey();
      era.print('没有时间了，战线已经不可能再维持下去了！'); // :322 PRINTFORML
      era.print(
        `${chara_callname(yusya)}的部队开始了后退，怪物们在后退中溃散着。`, // :323 PRINTFORML
      );
      era.print('最终活着回来的怪物不到十只………'); // :324 PRINTFORML
      era.println(); // :325 PRINTL（空行）
      const gained = Math.trunc(sinkou / 10);
      chara(yusya).dungeon.战斗经验 += gained; // :326 EXP:YUSYA_I:80
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`); // :327 PRINTFORMW
      await era.waitAnyKey();
      await seiei_cleanup(seiei); // :328-331
      return 1; // :332-336
    }

    // :335-357 双方状态（HP/气力条 + 攻防行；BARSTR → progress 格的偏离见文件头）
    era.drawLine();
    era.print(`魔王军 ${chara_callname(yusya)}`); // :337
    print_progress_line(
      'HP',
      chara(yusya).dungeon.体力,
      era.get(`maxbase:${yusya}:0`) || 0,
    ); // :338-340
    print_progress_line(
      '气力',
      chara(yusya).dungeon.气力,
      era.get(`maxbase:${yusya}:1`) || 0,
    ); // :341-343
    // :344 攻击值按 SINKOU/1024 的档位放大（整数除法）
    era.print(
      `攻击${chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1)}` +
        ` 防御${chara(yusya).dungeon.防御力} 怪物的合计战力${sinkou}点`,
    );
    era.print('VS'); // :346 PRINTW
    await era.waitAnyKey();
    era.print(chara_nickname(seiei)); // :349
    print_progress_line(
      'HP',
      chara(seiei).dungeon.体力,
      era.get(`maxbase:${seiei}:0`) || 0,
    ); // :350-352
    print_progress_line(
      '气力',
      chara(seiei).dungeon.气力,
      era.get(`maxbase:${seiei}:1`) || 0,
    ); // :353-355
    era.print(
      `攻击${chara(seiei).dungeon.攻击力} 防御${chara(seiei).dungeon.防御力}`, // :356
    );
    await era.waitAnyKey(); // :356-357 WAIT
    era.drawLine();

    // :360-389 魔王軍の先制攻撃（会心一击 1/5，倍率 ×4；否则 ×2）。
    // **两处的档位除数不同**：守卫（:361）是 `SINKOU/2048+1`、伤害式
    // （:366/:377）是 `SINKOU/1024+1`——原作的不对称，1:1 保留。
    const strike =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1);
    const guard_line =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 2048) + 1);
    if (chara(seiei).dungeon.防御力 < guard_line) {
      const crit = rand(5) === 0; // :362 RAND:5
      const guard = chara(seiei).dungeon.防御力; // :362-363/:375-377 TMP2_I
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2); // :364-365/:376-377
      const damage = strike - guard;
      if (crit) {
        era.print('迅猛的一击！'); // :365
      }
      era.print(
        `${chara_callname(yusya)}率领魔王军的攻击使${chara_nickname(seiei)}受到了${damage * (crit ? 4 : 2)}点伤害！`, // :366/:377
      );
      if ((era.get(`talent:${seiei}:251`) || 0) === 0) {
        // :366-368/:377-379 无「忍术」时攻防也受损（÷100 向零截断）
        chara(seiei).dungeon.攻击力 -= Math.trunc(damage / 100);
      }
      if (chara(seiei).dungeon.攻击力 < 1) {
        chara(seiei).dungeon.攻击力 = 1; // :369-371/:380-382
      }
      chara(seiei).dungeon.体力 -= damage * (crit ? 4 : 2); // :371/:382
      chara(seiei).dungeon.气力 -= damage * (crit ? 4 : 2); // :372/:383
      await era.waitAnyKey(); // :372-373/:383-384 WAIT
    } else {
      era.print(
        `${chara_nickname(seiei)}承受着${chara_callname(yusya)}的攻击。`,
      ); // :387
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2); // :387-388
    }

    // :391-408 原作此处**不给实参**（ARG 全 0，判的是魔王）——见 inv_death_check
    const first_check = await inv_death_check(0, 0);
    if (first_check === 2) {
      // :394-401 魔王侧获得胜利（原作缺陷下与精锐部队无关）
      const gained = Math.trunc(sinkou / 5);
      chara(yusya).dungeon.战斗经验 += gained;
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`); // :395
      await era.waitAnyKey();
      await seiei_cleanup(seiei); // :395-400
      break; // :395-401
    }
    if (first_check === 1) {
      await seiei_cleanup(seiei); // :403-410
      return 1; // :407-410
    }

    // :410-428 精鋭部隊の攻撃（伤害 ×5，防御侧先折成三分之二）
    if (chara(yusya).dungeon.防御力 < chara(seiei).dungeon.攻击力) {
      const guard = chara(yusya).dungeon.防御力; // :413
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      ); // :414-416
      const damage = chara(seiei).dungeon.攻击力 - guard;
      era.print(
        `${chara_nickname(seiei)}发起进攻使${chara_callname(yusya)}率领的魔王军受到了${damage * 5}点伤害！`, // :416
      );
      if ((era.get(`talent:${yusya}:251`) || 0) === 0) {
        chara(yusya).dungeon.攻击力 -= Math.trunc(damage / 100); // :417-418
      }
      if (chara(yusya).dungeon.攻击力 < 1) {
        chara(yusya).dungeon.攻击力 = 1; // :419-424
      }
      chara(yusya).dungeon.体力 -= damage * 5; // :421
      chara(yusya).dungeon.气力 -= damage * 5; // :422
      await era.waitAnyKey(); // :422-424 WAIT
    } else {
      era.print(
        `${chara_callname(yusya)}率领的魔王军承受着${chara_nickname(seiei)}的攻击。`, // :425-426
      );
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      ); // :425-427
    }

    // :430-443
    const second_check = await inv_death_check(yusya, seiei);
    if (second_check === 2) {
      await seiei_cleanup(seiei); // :430-435
      break; // :430-436
    }
    if (second_check === 1) {
      await seiei_cleanup(seiei); // :438-444
      return 1; // :442
    }
    time_i += 1; // :444
  }
  void area;
  return 0; // :459
}

/**
 * 精锐部队退场（:327-331 / :395-400 / :430-435 等重复段）：`SEIEI_I =
 * CHARANUM - 1` 后 PARTY_CHAR_DEL → DELCHARA → NAME_RESET。扁平化（#21）
 * 下 `CHARANUM - 1` 不成立，直接用它的角色号（#487 的教训）。
 * @param {number} seiei 精锐部队的角色号（18 或 19）
 */
async function seiei_cleanup(seiei) {
  party_char_del(seiei);
  era.removeCharacter(seiei);
  name_reset();
}

/**
 * @INVASION_EVENT_SEIEI（INVASION_EVENT.ERB:240-459）：精英部队事件。
 *
 * 三臂共用的头部（:250-271）：FLAG:SINDO != 0（已征服）→ RETURN -1；否则按
 * 侵攻度打三档传闻文本——**三档的 INV_TYPE 条件不同**：首档
 * `FLAG:AREA == 0`（:257）无 INV_TYPE 条件，后两档（:261/:266）要求
 * `INV_TYPE != 1`，所以魔力路线只打首档、[0]/[2]/[3] 三路三档都可能打。
 * 打完 `SIF INV_TYPE != 2 → RETURN -1`（:273-274）：只有 [2] 路线进战斗体。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:FLAG:AREA 与
 *   RAND:2/RAND:5 的上界）
 * @returns {Promise<number>} -1 = 继续侵攻（非 [2] 路线恒此值）；0 = 战斗体
 *   走完（含「精锐部队没有出现」）；1 = 侵攻中止
 */
async function invasion_event_seiei(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // :250-251 SIF FLAG:SINDO != 0 → RETURN -1
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA
  // :257-260 FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）
  if (progress === 0) {
    era.drawLine();
    era.print('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 5000 && inv_type !== 1) {
    // :261-265 侵攻度 1-4999（后两档都带 FLAG:SINDO == 0，已由上面的早退
    // 保证；每条 PRINTFORMW 各自等键）
    era.drawLine();
    era.print('狂王组织的精锐部队似乎已经开始行动了。');
    await era.waitAnyKey();
    era.print('如果不尽快采取行动的话………');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 10000 && inv_type !== 1) {
    // :266-270 侵攻度 5000-9999
    era.drawLine();
    era.print(
      '根据斥候打探的消息，狂王的精锐部队似乎已经在前方的城镇中布下了防线。',
    );
    await era.waitAnyKey();
    era.print('而且精锐部队的真正目的就是要捕捉魔王麾下的勇者………');
    await era.waitAnyKey();
    era.drawLine();
  }
  // :273-274 SIF INV_TYPE != 2 → RETURN -1
  if (inv_type !== 2) {
    return -1;
  }

  // :279 IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2（纯 `&&` 链；
  // FLAG:SINDO == 0 已由 :250 的早退保证）
  if (progress >= 5000) {
    const roll = rand(progress); // :280-281 LOCAL = RAND:FLAG:AREA
    if (roll > 2000) {
      return await seiei_battle(area, state, rand); // :283-451
    }
    // :446-452 精锐部队并没有出现
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  } else {
    // :452-457 INV_TYPE == 2 但侵攻度还没到 5000：同一套「没有出现」
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  }
  return 0; // :459
}

/**
 * FORT 的五个地区表（:542-567）：地点、敌方部队、要塞名，以及
 * `LOCAL:3`（`TALENT:YUSYA_I:种族 == n`——决定潜入支的 100% 成功档）。
 * 未列出的 AREA 三串留空、`LOCAL:3` 保持 0（LOCAL 的初值）。
 */
const FORT_AREAS = {
  81: { place: '人间界', troop: '人类军队', fort: '城堡', race: 0 },
  86: { place: '精灵森林', troop: '精灵族战士', fort: '精灵城寨', race: 1 },
  88: { place: '龙之山脉', troop: '龙族战士', fort: '战争堡垒', race: 5 },
  90: { place: '天界', troop: '天界卫队', fort: '天使要塞', race: 6 },
  93: { place: '天神宫', troop: '十字军', fort: '天使要塞', race: 6 },
};

/**
 * @INVASION_EVENT_FORT（INVASION_EVENT.ERB:530-814）：侵略中途事件（要塞）。
 *
 * 守卫（:539）对 INV_TYPE == 2/3 恒放行、对 0 看 FLAG:SINDO、对 1 恒早退
 * （读法与依据见 #503 的 M10789）。行为体按 INV_TYPE 三支：0 固定走强攻、
 * 2 三选项（强攻/潜入/绕路）、3 两选项（偷偷潜入/绕路）。
 *
 * **`SINKOU` 按引用改写**（原作 `#DIM REF SINKOU`）：强攻减员、潜入失败、
 * 绕路减员都直接改 `state.sinkou`，调用方读回后用于侵攻結果共通（:609-618）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（各处 RAND:10）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 守卫早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_fort(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // :539 `SIF FLAG:SINDO || INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3`
  // —— Emuera 里 `&&` 与 `||` **同优先级、左结合**（operators.md 的优先级表
  // 把两者排在同一行；com-sex.js:1837 / train-message.js:251 同款读法），
  // 因此原式等价于 `((FLAG:SINDO || INV_TYPE != 0) && INV_TYPE != 2)
  // && INV_TYPE != 3`，而不是 C 式「&& 优先」的 `FLAG:SINDO || (...)`：
  // 2/3 两值恒不早退（已征服也进要塞事件），1 恒早退，0 才看 FLAG:SINDO。
  if (
    ((era.get(`flag:${sindo}`) || 0) !== 0 || inv_type !== 0) &&
    inv_type !== 2 &&
    inv_type !== 3
  ) {
    return -1;
  }

  const yusya = state.yusya_i;
  // 未列出的 AREA：原作 `LOCAL:3` 保持初值 0（恒假）→ 这里用 -1 保证
  // `talent:314 === race` 永不成立（TALENT:314 是非负值），不能写 0——
  // 那会让种族 0（人类）在未知地区恒吃 100% 潜成功（#505 地区泛化时会生效）
  const info = FORT_AREAS[area] ?? {
    place: '',
    troop: '',
    fort: '',
    race: -1,
  };
  const native = (era.get(`talent:${yusya}:314`) || 0) === info.race; // :546 LOCAL:3

  // :570-606 选项（PRINTFORML 的 `[n]` 改 printButton，引擎自动拼前缀）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`); // :571-574
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`, // :572-574
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // :573-574 PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('全军强攻', 1); // :574
    era.printButton('亲自潜入', 2); // :575
    era.printButton('绕路', 3); // :576
    choice = await fort_choice([1, 2, 3]); // :578-587 $INPUT_LOOP
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在必经之路上遇到了${info.troop}建起的一座${info.fort}。`, // :587
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // :588-589 PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('偷偷潜入', 1); // :589
    era.printButton('绕路', 2); // :590
    // :595 `L_CHOICE = RESULT + 1`——选项号加一后与 [2] 路线共用下面的分支
    choice = (await fort_choice([1, 2])) + 1; // :592-599 $INPUT_LOOP2
  } else {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`); // :601
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`, // :602-603
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是魔王军发起了强攻。`, // :603 PRINTFORMW
    );
    await era.waitAnyKey();
    choice = 1; // :605
  }

  era.drawLine(); // :608-609
  // :610-670 [1] 全军强攻（RAND:10 三档：>= 6 成功 / >= 2 惨胜 / 其余 惨败）
  if (choice === 1) {
    const roll = rand(10); // :611-612
    if (roll >= 6) {
      era.print(
        `魔王军向着${info.fort}发起了最为猛烈的进攻，在付出较小的代价后攻破了${info.fort}的一角。`, // :614
      );
      era.print(
        `${info.fort}中的${info.troop}仓皇外逃，被${info.fort}外的魔王军尽数剿灭、`, // :615
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`); // :615-616
      era.print(''); // :615-617 PRINTFORML（空行）
      fort_hero_reward(inv_type, state, 5); // :619-624 EXP:SINKOU/5
      era.print('怪物数量减少了10%'); // :624（`\%` 是字面量百分号）
      state.sinkou = Math.trunc((state.sinkou * 9) / 10); // :624-625
      await era.waitAnyKey(); // :624-626 WAIT
      return 0; // :627-628
    }
    if (roll >= 2) {
      era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`); // :630-631
      era.print(
        `${info.fort}的防御极其坚固，${info.troop}凭借着掩体不断地攻击，让魔王军损失惨重。`, // :631
      );
      if (inv_type === 2) {
        era.print(
          `${chara_nickname(yusya)}不得不亲自上阵，这才逆转了局面，攻下了${info.fort}。`, // :633
        );
      } else {
        era.print(`在付出巨大的代价后，魔王军才攻下了${info.fort}。`); // :635
      }
      era.print(`侥幸获胜的魔王军继续向${info.place}进发。`); // :637
      era.print(''); // :637-638
      if (inv_type === 2) {
        fort_hero_reward(inv_type, state, 5); // :640-645
        chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2); // :644-645
        era.print(`${chara_callname(yusya)}的体力减少了一半！`); // :645
        // 注意：:645 的 PRINTFORML 后没有 WAIT，等键在 :649-650 的 WAIT
      }
      era.print('怪物数量减少了50%'); // :648
      state.sinkou = Math.trunc(state.sinkou / 2); // :649
      await era.waitAnyKey(); // :649-650 WAIT
      return 0; // :651-652
    }
    era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`); // :654-655
    era.print(
      `${info.fort}的防御极其坚固，令魔王军久攻不下，陷入僵局。`, // :655
    );
    era.print(
      `打破僵局的是一支突然出现在魔王军背后的${info.troop}援军。`, // :656
    );
    era.print('腹背受敌的魔王军一触即溃，随即被里应外合的两支军队尽数歼灭。'); // :657
    if (inv_type === 2) {
      era.print(`率领魔王军的${chara_nickname(yusya)}孤身一人逃了回来。`); // :659
      era.println(); // :659-660 PRINTL
      chara(yusya).dungeon.体力 = Math.trunc(
        (chara(yusya).dungeon.体力 * 3) / 10,
      ); // :662
      era.print(`${chara_callname(yusya)}的体力减少了70%！`); // :663
    } else {
      era.println(); // :663-665
    }
    era.print('侵攻中止。'); // :667 PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 0; // :668-673 CFLAG:YUSYA_I:1 = 0
    return 1; // :669-673
  }

  // :673-735 / :738-764 [2] 亲自潜入（INV_TYPE 2 与 3 两套结算）
  if (choice === 2 && inv_type === 2) {
    const roll = rand(10); // :673-674
    // :677-678 天使/恶魔翼（TALENT:245）或精灵族（种族 6）/魔族（种族 8）→ 100%
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中潜入了${info.fort}，在躲过多支巡逻队后终于打开了${info.fort}的大门。`, // :678
      );
      era.print(
        `早已等待多时的魔王军迅速杀入了${info.fort}内，没有遇到顽强的抵抗便控制了整个${info.fort}。`, // :679
      );
      era.print(
        `当天空出现第一缕阳光时，${info.fort}内已经只剩下了魔王军和魔王军的俘虏了。`, // :680
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`); // :680-681
      era.print(''); // :680-682
      fort_hero_reward(inv_type, state, 5); // :680-685
      era_flag.meat_toilet_count += 5; // :687 FLAG:83 += 5
      era.print('人间牧场肉便器数量+5。'); // :688
      await era.waitAnyKey(); // :690-695 WAIT
      return 0; // :691
    }
    if (roll >= 5 || native) {
      // :694-708 潜入成功 50%
      era.print(`${chara_nickname(yusya)}乔装打扮成功混进了${info.fort}里。`); // :695
      era.print(
        `当天夜里，${chara_nickname(yusya)}杀死了大门的守卫，将等候多时的魔王军引入${info.fort}内。`, // :696
      );
      era.print(
        `${info.fort}内的${info.troop}还没有组织起反抗便被消灭殆尽。`, // :697
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`); // :697-698
      era.print(''); // :697-699
      fort_hero_reward(inv_type, state, 5); // :697-702
      era_flag.meat_toilet_count += 5; // :704
      era.print('人间牧场肉便器数量+5。'); // :705
      await era.waitAnyKey(); // :707-713 WAIT
      return 0; // :708-713
    }
    if (roll >= 2 || !captive_route()) {
      // :711-724 失败逃窜 30%
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`, // :712-713
      );
      era.print(
        `${chara_nickname(yusya)}杀出一条血路，勉强逃回了魔王军。`, // :713
      );
      era.print('魔王军不得已只好发动强攻，在鏖战后最终惨胜。'); // :714
      era.print(`侥幸获胜的魔王军，继续向${info.place}进发。`); // :715
      era.print(''); // :715-716
      chara(yusya).dungeon.体力 = 1; // :718-719
      era.print(`${chara_callname(yusya)}的体力归零`); // :719
      state.sinkou = Math.trunc((state.sinkou * 7) / 10); // :721
      era.print('怪物数量减少了30%'); // :722
      await era.waitAnyKey(); // :722-723 WAIT
      return 0; // :722-724
    }
    // :727-734 失败被捕 20%
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`, // :728-729
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`, // :729
    );
    era.print(
      `失去指挥官的魔王军随即被出城迎击的${info.troop}击溃。`, // :730
    );
    era.print(''); // :731-732
    era.print(`${chara_nickname(yusya)}被俘虏，侵攻中止。`); // :732 PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 9; // :732-733
    return 1; // :732-734
  }
  if (choice === 2 && inv_type === 3) {
    const roll = rand(10); // :738-739
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中穿过了${info.fort}。`, // :743 PRINTFORMW
      );
      await era.waitAnyKey();
      return 0; // :743-744
    }
    if (roll >= 5 || native) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮成功通过了${info.fort}。`, // :747 PRINTFORMW
      );
      await era.waitAnyKey();
      return 0; // :747-748
    }
    if (roll >= 2 || !captive_route()) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`, // :751-752
      );
      era.print(`${chara_nickname(yusya)}杀出一条血路，勉强逃了回去。`); // :752 PRINTFORMW
      await era.waitAnyKey();
      // 源 :752-754 段之间是纯空白行（不产生输出），ere 侧不打空行
      chara(yusya).dungeon.体力 = 1; // :752-754
      chara(yusya).invasion.状态 = 0; // :752-755
      return 1; // :756-760
    }
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`, // :759-760
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`, // :760 PRINTFORMW
    );
    await era.waitAnyKey();
    // 源 :760-762 段之间是纯空白行（不产生输出），ere 侧不打空行
    chara(yusya).invasion.状态 = 9; // :760-762
    return 1; // :760-763
  }

  // :767-787 [3] 绕路（INV_TYPE == 2：RAND:10，九成平安 / 一成埋伏）
  if (choice === 3 && inv_type === 2) {
    const roll = rand(10); // :767-768
    if (roll > 0) {
      era.print(
        `魔王军绕开${info.fort}向${info.place}进发，因为路途遥远地形复杂损失了一些人马。`, // :772
      );
      era.println();
      state.sinkou = Math.trunc((state.sinkou * 9) / 10); // :775-776
      era.print('怪物数量减少了10%'); // :776 PRINTFORMW
      await era.waitAnyKey();
      return 0; // :776-777
    }
    era.print(`魔王军绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`); // :780
    era.print(
      `在一番血战后，魔王军击退了伏军继续向${info.place}进发。`, // :781
    );
    era.println();
    state.sinkou = Math.trunc((state.sinkou * 5) / 10); // :784
    era.print('怪物数量减少了50%'); // :785 PRINTFORMW
    await era.waitAnyKey();
    return 0; // :785-786
  }
  // :791-807 [3] 绕路（INV_TYPE == 3）
  //
  // **原作缺陷，#14 登记**：本支从不给 `LOCAL` 赋值（`:738-739` 的
  // `LOCAL = RAND:10` 在 `L_CHOICE == 2 && INV_TYPE == 3` 支内），而
  // `LOCAL` 是 #DIM 局部量、初值 0，于是 `:793-794` 的 `IF LOCAL > 0` 恒假——
  // 十成的「平安无事（体力 ×9/10）」不可达，恒走埋伏支（含 RETURN 1）。
  // 1:1 保留，改「修好」它会让掠夺路线的绕路从必败变成九成无损。
  if (choice === 3 && inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`, // :798
    );
    if (captive_route()) {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}还是被活捉了。`, // :800 PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 9; // :800-801
    } else {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}终于逃了回来。`, // :803 PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 0; // :803-804
    }
    return 1; // :806
  }
  return 0; // :810-813
}

/**
 * FORT [2]/[3] 路线的输入（$INPUT_LOOP / $INPUT_LOOP2）：只认给定选项号，
 * 其余重问（CLEARLINE 不镜像，见文件头）。选项已渲染成按钮，引擎白名单
 * 先一步挡下未渲染的值，故重问支在真引擎里不可达（与 page-intercept 的
 * 等级门同款处置，1:1 保留）。
 * @param {number[]} allowed 合法选项号
 * @returns {Promise<number>} 选中的选项号
 */
async function fort_choice(allowed) {
  for (;;) {
    const result = await number_input();
    if (allowed.includes(result)) {
      return result;
    }
  }
}

/**
 * FORT [2] 路线的经验段（:619-624 / :640-645 / :680-685 / :697-702）。
 * 只有 INV_TYPE == 2 给经验，且用的是**减员前**的 SINKOU。原作四处都是
 * `EXP:…` 接 `PRINTFORML`（不等键）——等键在各分支末尾的 WAIT
 * （:624-626 / :649-650 / :687-690 / :704-707），所以这里不 wait。
 * @param {number} inv_type 出兵类别
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {number} divisor 除数（四处都是 SINKOU/5）
 */
function fort_hero_reward(inv_type, state, divisor) {
  if (inv_type !== 2) {
    return;
  }
  const gained = Math.trunc(state.sinkou / divisor);
  chara(state.yusya_i).dungeon.战斗经验 += gained;
  era.print(`${chara_callname(state.yusya_i)}获得了${gained}点经验值！`);
}

/**
 * 「带队奴隶有天使/恶魔翼」（FORT :677-678/:742-743 与 CHALLENGE 同款的
 * `TALENT:恶魔翅膀 || TALENT:种族 == 6 || TALENT:种族 == 8`）。
 * 恶魔翅膀 = TALENT:245、种族 = TALENT:314（yml/Talent.yml）；种族 6 是**天使**、
 * 8 是魔族（对照 CHALLENGE 地区表的 `race` 列：天界/天神宫两组都是 6）。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function has_wing(cid) {
  const race = era.get(`talent:${cid}:314`) || 0;
  return (era.get(`talent:${cid}:245`) || 0) !== 0 || race === 6 || race === 8;
}

/**
 * CHALLENGE 的五个地区表（:828-887）：称呼、地点与「复现职业」
 * （`LOCAL:12`，开挂取胜时 `ADDCHARA LOCAL:12`）。
 *
 * AREA 81 的职业固定 9；其余四表是 `LOCAL:12 = RAND:2 ? a # b`——
 * **掷骰发生在选区时**（早于 `SIF EX_FLAG:95 & bit → RETURN -1`），所以
 * 职业要在取表时立刻定下：挪到使用处再掷会把 RAND:2 与随后的 DATALIST
 * 抽取对调（job 的 a = 真值支、b = 假值支）。
 */
const CHALLENGE_AREAS = {
  81: {
    place: '人间界',
    spot: '一座河边的桥',
    foe: '女骑士',
    leave: '骑上战马一骑绝尘离开了',
    skill: '剑术非常高超',
    race: -1,
    job: 9,
    bit: 1,
  },
  86: {
    place: '精灵森林',
    spot: '一条密林中的狭道',
    foe: '月之祭司',
    leave: '遁入密林之中消失了',
    skill: '箭术无比精准',
    race: 1,
    job: [12, 16],
    bit: 2,
  },
  88: {
    place: '龙之山脉',
    spot: '一座山谷间的吊桥',
    foe: '龙族巫女',
    leave: '吟唱了传送咒语凭空消失了',
    skill: '龙语魔法无比犀利',
    race: 5,
    job: [10, 14],
    bit: 4,
  },
  90: {
    place: '天界',
    spot: '一座天界的虹桥',
    foe: '女武神',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 8,
  },
  93: {
    place: '天神宫',
    spot: '一座天界的虹桥',
    foe: '十字军',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 16,
  },
};

/**
 * 人数上限的快照（CHALLENGE :996-1010 的七分支，与 @ENTER_ENEMY :35-47 /
 * @GET_ENEMY :332-344 是同源的复制段，三处各自 1:1）。命中任一分支时
 * `LOCAL = 0`——开挂取胜（要求 `LOCAL >= 2`）随之降级成开挂失败。
 * @returns {boolean} true = 人数已满
 */
function hero_cap_reached() {
  const charanum = era.getAddedCharacters().length;
  const f = (n) => era.get(`flag:${n}`) || 0;
  if (f(82) === 0 && charanum > 60) {
    return true; // :996-997
  }
  if (f(87) === 0 && f(89) === 0 && f(91) === 0 && charanum > 65) {
    return true; // :998-999
  }
  if (
    f(87) * f(89) === 0 &&
    f(89) * f(91) === 0 &&
    f(91) * f(87) === 0 &&
    charanum > 70
  ) {
    return true; // :1000-1001（原式三对乘积，加括号，无优先级歧义）
  }
  if ((f(87) === 0 || f(89) === 0 || f(91) === 0) && charanum > 75) {
    return true; // :1002-1003
  }
  if (f(92) < 15 && charanum > 80) {
    return true; // :1004-1005
  }
  if (f(94) === 0 && charanum > 90) {
    return true; // :1006-1007
  }
  return charanum >= MAX_CHARANUM; // :1008-1009
}

/**
 * @INVASION_EVENT_CHALLENGE（INVASION_EVENT.ERB:815-1162）：侵略中途事件
 * （被勇者叫阵单挑）。
 *
 * 守卫（:824）是纯 `&&` 链，对 0/2/3 放行、对 1 早退（无优先级歧义）。
 * 地区的位域守卫（`SIF EX_FLAG:95 & bit → RETURN -1`）保证每块地盘的
 * 「被叫阵」只发生一次；开挂取胜支把该位置起（`:1041 EX_FLAG:95 = LOCAL:20`）。
 *
 * `SINKOU` 按引用改写（原作 `#DIM REF SINKOU`）：只有 `[3] 无视，全军进攻`
 * 的「损失一般」档会改成 ×4/5。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:2/4/10 的上界）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 守卫早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_challenge(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // :824 SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3 → RETURN -1
  if (inv_type !== 0 && inv_type !== 2 && inv_type !== 3) {
    return -1;
  }
  const yusya = state.yusya_i;
  const info = CHALLENGE_AREAS[area] ?? {
    place: '',
    spot: '',
    foe: '',
    leave: '',
    skill: '',
    race: 0,
    job: 0,
    bit: 0,
  };
  // :847/:859/:871-872/:882-883 `LOCAL:12 = RAND:2 ? a # b`——掷骰在选区时就发生
  const job = Array.isArray(info.job)
    ? rand(2) !== 0
      ? info.job[0]
      : info.job[1]
    : info.job;
  const kill_bits = (era_exflag.defeated_heroes_bits || 0) | info.bit; // :836 LOCAL:20
  // :837-838 等四条 `SIF EX_FLAG:95 & bit → RETURN -1`（每块地盘只来一次）
  if (((era_exflag.defeated_heroes_bits || 0) & info.bit) !== 0) {
    return -1;
  }

  // :890-969 三条 INV_TYPE 各自的登场（PRINTDATA/PRINTDATAL 的随机抽取走 rand）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`, // :891-896
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`); // :892-896
    for (const line of printdata(rand, [
      [
        '『哎呀真是好多人啊，人家好紧张呢~』',
        '『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』',
      ],
      ['『今天运气真是不错哦~』', '『叫魔王出来，他的脑袋是我的了！』'],
      [
        '『这就是魔王军啊，与其说是军队倒不如说是哪里冒出来的犯罪团伙呢~』',
        '『快去叫你们的魔王出来，就说有人来取他的性命了』',
      ],
      [
        '『咦？传闻中的魔王军呢』',
        '『听说你们的魔王很厉害，不知道能否有幸过两手呢』',
      ],
    ])) {
      era.print(line); // :893-910
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`); // :911-913
    era.print(
      `面对${info.foe}的挑衅，${chara_nickname(yusya)}决定……`, // :913 PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('召唤魔王应战', 1); // :914
    era.printButton('亲自上前处理', 2); // :915
    era.printButton('无视，全军进攻', 3); // :916
    choice = await fort_choice([1, 2, 3]); // :916-925 $INPUT_LOOP
    if (choice === 1) {
      era.print(`魔王回应了${chara_nickname(yusya)}召唤前来迎战${info.foe}。`); // :928
    } else if (choice === 2) {
      era.print(`${chara_nickname(yusya)}决定亲自迎战${info.foe}。`); // :930
    } else {
      era.print(
        `在${chara_nickname(yusya)}一声令下，魔王军缓缓前进，展开了对${info.foe}战斗。`, // :932
      );
    }
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在${info.spot}前被一名突然出现的${info.foe}拦下了脚步。`, // :935
    );
    for (const line of printdata(rand, [
      [
        '『哎呀~是亲爱魔王大人的手下呢』',
        '『既然魔王大人不肯出来，人家只好和你比试比试了呢』',
      ],
      ['『今天运气真是不错哦~可怜的魔族，你的脑袋是我的了！』'],
      ['『闻到魔物的味道就过来了，看我发现了什么有趣的东西呢……有遗言么？』'],
      [
        '『咦？是魔王手下的那个谁呢』',
        '『既然魔王那么厉害，想必你也不简单吧。来过两手吧』',
      ],
    ])) {
      era.print(line); // :936-951
    }
    // 源 :952 是纯空白行，ere 侧不打空行
    await era.waitAnyKey(); // :953 WAIT
    choice = 2; // :954
  } else {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`, // :957-961
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`); // :958-961
    for (const line of printdata(rand, [
      ['『哎呀真是好多人啊，人家好紧张呢~』'],
      ['『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』'],
      ['『啊~哪里冒出来的犯罪团伙呢~这就来取你们的性命了』'],
      ['『咦？传闻中的魔王军呢。既然撞上了就怪你们运气不佳好了』'],
    ])) {
      era.print(line); // :959-964
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`); // :965-967
    // 源 :965-967 段之间是纯空白行（不产生输出），ere 侧不打空行
    choice = 3; // :967
    era.print(
      `在意识到敌人只有一个人后，魔王军向敢于挑衅的${info.foe}发起了猛烈的进攻。`, // :968 PRINTFORMW
    );
    await era.waitAnyKey();
  }

  // :971-1085 [1] 召唤魔王应战
  if (choice === 1) {
    if (era_flag.money >= 3000) {
      // :974-989 道具二选一（钱不够就直接落到堂堂正正）
      era.print('但对方看起来也不是省油的灯、未必能稳操胜券、'); // :975
      era.print('好在魔王身上携带了些一次性魔法道具、'); // :976
      era.print('虽然价格昂贵但威力巨大、'); // :977
      era.print('魔王考虑着是否要在决斗中使用这些道具。。。'); // :978
      era.printButton('使用氪金道具', 1); // :979
      era.printButton('堂堂正正一决胜负', 2); // :980
      choice = await fort_choice([1, 2]); // :982-989 $INPUT_LOOP2
    } else {
      choice = 2; // :991-995
    }
    const roll = rand(10); // :994-995
    // :996-1010 人数上限七分支：命中即 LOCAL = 0 → 开挂取胜不成立
    const local = hero_cap_reached() ? 0 : roll;
    // :1012-1043 开挂取胜
    if (choice === 1 && local >= 2) {
      era.print(`魔王和${info.foe}的战斗开始了。`); // :1012-1013
      // :1014 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`,
          `${info.foe}陷入了泥沼中，动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`,
          `药瓶正中的${info.foe}在药水的作用下动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`,
          `${info.foe}猝不及防被吸进了封印壶内，被魔王抓住了。`,
        ],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // :1014/:1017-1027 首行
      for (const line of items.slice(1)) {
        era.print(line); // 同一 DATALIST 的后续行
      }
      era.print(''); // :1029-1030 PRINTFORML（空行）
      era.print(`魔王军高呼魔王万岁，继续向${info.place}进发。`); // :1030 PRINTFORMW
      await era.waitAnyKey();
      // :1031-1036 生成一名对应种族职业的勇者
      era.addCharacter(job); // :1033 ADDCHARA LOCAL:12
      await add_chara_ex(job); // :1034-1035
      await char_make(job, 0, info.race, rand); // :1035 CHARA_MAKE(…, LOCAL:10)
      chara(job).invasion.状态 = 0; // :1037 CFLAG:A:1 = 0
      era.print(`${chara_nickname(job)}被魔王抓住了。金钱-3000`); // :1038 PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000; // :1038-1039
      era_exflag.legit_money -= 3000; // :1040-1041
      era_exflag.defeated_heroes_bits = kill_bits; // :1041
      era_exflag.prestige = era_exflag.prestige + 1; // :1042
      return 0; // :1043-1044
    }
    // :1045-1060 开挂失败
    if (choice === 1) {
      era.print(`魔王和${info.foe}的战斗开始了。`); // :1045-1046
      // :1047 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [`魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`],
        [`魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`],
        [`魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // :1047/:1049-1053（三选一整行）
      era.print(`然而${info.foe}提前察觉了魔王的动作，躲闪掉了。`); // :1053
      era.print(
        `在鄙夷地看了魔王一眼后，${info.foe}${info.leave}。`, // :1054
      );
      era.print(
        `虽然被人鄙视了，但腼着脸的魔王命令魔王军继续向${info.place}前进。`, // :1055
      );
      era.print(''); // :1056-1057
      era.print('金钱-3000。'); // :1057 PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000; // :1057-1058
      era_exflag.legit_money -= 3000; // :1059-1061
      return 0; // :1060-1061
    }
    // :1062-1072 不开挂取胜
    if (local < 2) {
      era.print(`魔王和${info.foe}的战斗开始了、`); // :1063-1064
      era.print(`尽管${info.foe}的${info.skill}、`); // :1064
      era.print('但还是敌不过魔王的邪恶魔法、'); // :1065
      era.print('很快就成为了一具尸体。'); // :1066
      era.print(`魔王军高呼魔王万岁、继续向${info.place}进发。`); // :1067
      era.print(''); // :1068-1069
      era.print('魔王魔力减少50%、魔王经验+500'); // :1069 PRINTFORMW
      await era.waitAnyKey();
      chara(0).dungeon.气力 = Math.trunc(chara(0).dungeon.气力 / 2); // :1070 BASE:MASTER:1
      chara(yusya).dungeon.战斗经验 += 500; // :1070-1071 EXP:YUSYA_I:80
      return 0; // :1072-1073
    }
    // :1074-1084 不开挂失败
    era.print(`魔王和${info.foe}的战斗开始了、`); // :1075-1076
    era.print(`${info.foe}的${info.skill}、`); // :1076
    era.print('魔王左支右绌、招架不住、'); // :1077
    era.print(`被${info.skill}抓住空隙、达成了重伤。`); // :1078
    era.print('魔王军士气动摇、救下昏迷的魔王匆匆逃回魔王城。'); // :1079
    era.print(''); // :1080
    era.print('魔王体力魔力清空、侵攻中止'); // :1081 PRINTFORMW
    await era.waitAnyKey();
    chara(0).dungeon.体力 = 0; // :1082 BASE:MASTER:0
    chara(0).dungeon.气力 = 0; // :1083 BASE:MASTER:1
    return 1; // :1083-1084
  }

  // :1087-1135 [2] 亲自上前处理
  if (choice === 2) {
    const roll = rand(10); // :1088-1090
    if (roll < 2) {
      // :1090-1104 奴隶取胜 20%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`); // :1092
      era.print(
        `虽然${info.foe}${info.skill}，但却被${chara_nickname(yusya)}抓住机会打伤了。`, // :1093
      );
      era.print(`${info.foe}心有不甘地${info.leave}。`); // :1094
      era.print(
        inv_type === 2
          ? `魔王军高万岁，继续向${info.place}进发。` // :1096
          : `${chara_nickname(yusya)}继续向${info.place}进发。`, // :1098
      );
      era.print(''); // :1100
      era.print(`${chara_nickname(yusya)}经验+500，体力-50%`); // :1101 PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.战斗经验 += 500; // :1102
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2); // :1103-1105
      return 0; // :1104-1105
    }
    if (roll < 6) {
      // :1106-1119 奴隶不分胜负 40%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`); // :1107
      era.print(
        `虽然${info.foe}${info.skill}，但${chara_nickname(yusya)}也不遑多让。`, // :1108
      );
      era.print(
        `在大战几百回合之后，${info.foe}心有不甘地${info.leave}。`, // :1109
      );
      // 源 :1109-1112 段之间是纯空白行（不产生输出），ere 侧不打空行
      era.print(
        inv_type === 2
          ? `魔王军高呼万岁，继续向${info.place}进发。` // :1112
          : `${chara_nickname(yusya)}继续向${info.place}进发。`, // :1114
      );
      era.print(''); // :1116
      era.print(`${chara_nickname(yusya)}体力-90%`); // :1117 PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 10); // :1118
      return 0; // :1119-1120
    }
    // :1121-1134 奴隶失败 40%
    era.print(`${chara_nickname(yusya)}与${info.foe}激烈交战起来。`); // :1122
    era.print(
      `${info.foe}的${info.skill}，没过多久，${chara_nickname(yusya)}就被${info.foe}打晕了过去。`, // :1123
    );
    era.print(`${info.foe}轻蔑的一笑，${info.leave}。`); // :1124
    if (inv_type === 2) {
      era.print('失去指挥官的魔王军只好撤退了。'); // :1126
    } else if (captive_route() && (era.get(`flag:${sindo}`) || 0) === 0) {
      // :1127 `(FLAG:5 & 128) && !FLAG:SINDO`——纯 `&&` 链，无优先级歧义
      era.print(`晕过去的${chara_nickname(yusya)}成为了狂王的俘虏。`); // :1128
      chara(yusya).invasion.状态 = 9; // :1128-1129
    } else {
      era.print(
        `不知道过了多久后才苏醒过来的${chara_nickname(yusya)}原路返回了。`, // :1131
      );
      chara(yusya).invasion.状态 = 0; // :1132
    }
    return 1; // :1134-1137
  }

  // :1137-1159 [3] 无视，全军进攻（RAND:2：真值 = 撤退）
  if (rand(2) !== 0) {
    era.print('然而由于地形狭窄魔王军的数量优势无法发挥、'); // :1140
    era.print(`并且${info.foe}的${info.skill}、`); // :1141
    era.print('在损失了大批魔物之后、'); // :1142
    era.print(`${info.foe}轻蔑的一笑、${info.leave}。`); // :1143
    era.print('魔王军元气大伤只好撤退了。'); // :1144
    era.print(''); // :1144-1145
    era.print('侵攻中止。'); // :1144-1146 PRINTFORMW
    await era.waitAnyKey();
    return 1; // :1147-1149
  }
  era.print('然而由于地形狭窄魔王军的数量优势无法发挥、'); // :1150
  era.print(`并且${info.foe}的${info.skill}、`); // :1151
  era.print('导致损失了不少魔物、'); // :1152
  era.print(`最后${info.foe}体力不支、${info.leave}。`); // :1153
  era.print(`付出了不少代价的魔王军、继续向${info.place}进发。`); // :1154
  era.print(''); // :1155
  era.print('魔物数量-20%。'); // :1156 PRINTFORMW
  await era.waitAnyKey();
  state.sinkou = Math.trunc((state.sinkou * 4) / 5); // :1157
  return 0; // :1157-1158
}

/**
 * PRINTDATA / PRINTDATAL 的随机抽取（等概率选中一组，逐行返回）。
 *
 * 原作 :893-910 的 PRINTDATA 与 :1015-1028 的 PRINTDATAL 各含若干
 * DANTA/DATALIST/DATAFORM 块，引擎「等概率随机选择一个显示」——一次
 * `RAND:块数`。ere 侧无全局 RAND 序列（#117 决议），改用注入的 rand，
 * 上界 = 块数（PRINTDATA 与 PRINTDATAL 同款）。
 *
 * @param {(n: number) => number} rand 随机源
 * @param {string[][]} blocks 候选块（每块若干行）
 * @returns {string[]} 选中块的行
 */
function printdata(rand, blocks) {
  return blocks[rand(blocks.length)];
}

/** @MEDAL_BONUS 的十一档补正（:1032-1064 的降序 IF 链：命中即返，不再往下判） */
const MEDAL_TIERS = [
  { over: 500, bonus: 160 },
  { over: 250, bonus: 150 },
  { over: 150, bonus: 140 },
  { over: 100, bonus: 130 },
  { over: 60, bonus: 120 },
  { over: 40, bonus: 110 },
  { over: 30, bonus: 105 },
  { over: 20, bonus: 104 },
  { over: 15, bonus: 103 },
  { over: 10, bonus: 102 },
  { over: 5, bonus: 101 },
];

/**
 * @MEDAL_BONUS（INVASION.ERB:1026-1067）：勋章补正（EXP:ARG:81 分档）。
 *
 * 十一档降序判定，命中即打印 `%CALLNAME:ARG%` +「的勋章补正」+ 一个全角
 * 空格 + `x1.xx`（U+3000，照抄原作 :1033 的对齐）并等键（PRINTFORMW），
 * 返回 100-160 的百分比。未达首档（≤5 枚）返回 100 且不打任何输出
 * （:1030 的 LOCAL 初值）。
 *
 * 原作实参 ARG 是角色号：窄路径恒 0（魔王，:593 CALL MEDAL_BONUS,0）；
 * [3] 路线的 :559 已随 #503 接真（传勇者号），[2] 路线的 :439
 * （CALL MEDAL_BONUS,YUSYA_I）随后续出兵票接。
 *
 * @param {number} [cid] 角色 ID（EXP 与 CALLNAME 的下标）
 * @returns {Promise<number>} 补正百分比（100-160）
 */
async function medal_bonus(cid = 0) {
  const medals = chara(cid).event.勋章经验; // EXP:cid:81
  const tier = MEDAL_TIERS.find((t) => medals > t.over);
  if (tier === undefined) {
    return 100; // :1030 LOCAL = 100（无补正档）
  }
  // :1033 等：%CALLNAME:ARG% 取自呼び名（callname:cid:-2）。全角空格不能进
  // 模板串（no-irregular-whitespace），按既有先例拼普通字符串字面量
  era.print(
    chara_nickname(cid) + '的勋章补正　x' + (tier.bonus / 100).toFixed(2),
  );
  await era.waitAnyKey(); // PRINTFORMW 的 WAIT
  return tier.bonus;
}

/**
 * @SENGEN_VIDEO_BONUS（INVASION.ERB:1236-1266）：投放量的随机加成。
 *
 * 原作 RESULT 是**按引用回传**的实参（`TIMES RESULT, …` 直接改写调用方的
 * RESULT），ere 侧改成返回值由调用方接。MODE 0（普通）先跳 `$MODE_0`
 * （:1243-1244），只掷 :1254-1257 两枚；MODE 1（奸商）先掷 :1246-1251 的
 * 三枚加成再落同一段——**判定顺序即 RAND 消费顺序，不可交换**。
 * MODE 1 只会变大（:1260-1261 的 `RESULT <= M → RESULT = M` 保底），
 * MODE 0 可能缩水到 0（×0.80 截断），调用方据此走「投放失败」分支。
 *
 * @param {number} result 投放数（原作 RESULT 的传入值）
 * @param {number} [mode] 0 = 普通，1 = 奸商（原作 MODE 的默认值 0）
 * @param {(n: number) => number} [rand] 随机源（RAND:2/3/4 的上界）
 * @returns {number} 加成后的投放数（原作回写的 RESULT）
 */
function sengen_video_bonus(result, mode = 0, rand = default_rand) {
  const base = result; // :1242 M = RESULT
  let placed = result;
  if (mode !== 0) {
    // :1245-1251 奸商加成段（MODE == 0 时被 :1243-1244 跳过）
    placed = times(placed, 1.1);
    if (rand(2) === 0) placed = times(placed, 1.2);
    if (rand(3) === 0) placed = times(placed, 1.2);
    if (rand(4) === 0) placed = times(placed, 1.2);
  }
  // $MODE_0 :1253-1257 两段共用
  if (rand(2) === 0) placed = times(placed, 1.2);
  if (rand(3) === 0) placed = times(placed, 0.8);
  // :1258-1265 提示与保底（四条 SIF 的先后即输出次序）
  if (placed > base && mode === 1) {
    era.print('奸商们制作更多的版本提升了投放效果。'); // :1258-1259
  }
  if (mode === 1 && placed <= base) {
    placed = base; // :1260-1261
  }
  if (placed > base && mode === 0) {
    era.print('在投放过程中似乎传出了不同的版本，投放效果提升了。'); // :1262-1263
  }
  if (placed < base) {
    era.print('似乎有些水晶球投放不是太成功。'); // :1264-1265
  }
  return placed;
}

/**
 * @SENGEN_VIDEO（INVASION.ERB:1070-1233）：水晶球投放菜单（post_conquest_menu
 * 的 [1000]，:90-92 CALL SENGEN_VIDEO 后 RETURN 0）。
 *
 * 四档操作：投放（:1096-1119）、雇奸商代理投放（:1120-1163，付 5000G/枚 或
 * 1 枚勋章）、花钱增强流行效果（:1164-1198）、花钱延长流行时间
 * （:1199-1229）；[999] 退出（:1230-1233，含落尾的隐式 RETURN 0）。
 *
 * 循环形态沿用文件头的既有取舍：GOTO INPUT_LOOP 重画整屏（ere 追加式）、
 * GOTO $INPUT_LOOP_TMP<n> 只重问不重画；`PRINTL [n] …` 改 printButton
 * （引擎自动拼 `[n] `，正文不得自带前缀，PR #30）；`{值,N}` 走 pad_number。
 *
 * 两处原作行为 1:1 保留并在此登记：
 *   - 犒赏段（:1143-1157）的两条按钮渲染条件（`(M*5000) < MONEY`、
 *     `M < EXP:0:81`）与接受条件同式，但支付发生在**加成之后**、判据用的是
 *     `M`（= 投入数）：`M*5000 == MONEY` 或 `M == 勋章数` 时按钮不渲染，
 *     而 ere 的引擎白名单会拒收未渲染的 [1]/[2]，玩家只能重问——原作靠
 *     `GOTO $INPUT_LOOP_TMP2` 空转；
 *   - :1189-1196 的效果增强与 :1218-1227 的时长延长在随机段之后各有一道
 *     封顶（×2 / +5）与一道保底（时长的 `(9013 - M) < 1 → M + 1`，即最小
 *     也涨 1 天）。
 *
 * 三处由引擎形态带出的说明（都不是行为偏离）：
 *   - 六处数值读数走 number_input()：空输入与非数字归一到 0，见该函数的
 *     JSDoc（原作 RESULT 恒为数值，空输入在引擎层就被重问掉）；
 *   - 菜单每轮至少打印 `[999]`，所以 `STOCK == 0 && RESULT != 999`
 *     （:1094-1095）与落尾的空 ELSE（:1230-1233 的末段）在真引擎里都
 *     不可达——白名单外的手工键入送不到游戏层，两支都按原作 1:1 保留；
 *   - 顶栏的 `\t\t` 与 8/1 个前导空格照抄原作（同 page-chara-shop.js 的
 *     `\t\t` 先例）；引擎输出走 HTML 会折叠连续空白，列对齐在实机上不
 *     成立，这是全项目共有的一条表现层差异（比对工具两侧同款归一化）。
 *
 * @param {(n: number) => number} [rand] 随机源（增强段的 RAND:2/5 与
 *   SENGEN_VIDEO_BONUS 的上界）
 * @returns {Promise<0>} 原作两条出口都 RETURN 0
 */
async function sengen_video(rand = default_rand) {
  // $INPUT_LOOP :1073-1095（画在循环头：GOTO INPUT_LOOP 即重画）
  menu: for (;;) {
    const stock =
      era_exflag.crystal_ball_stock - era_exflag.crystal_ball_deployed; // :1074
    era.drawLine(); // :1075-1076
    // :1076 可用于投放的水晶球{STOCK,3}部\t\t已投放{EX_FLAG:9011,3}部
    era.print(
      `可用于投放的水晶球${pad_number(stock, 3)}部\t\t已投放${pad_number(
        era_exflag.crystal_ball_deployed,
        3,
      )}部`,
    );
    // :1077-1081 两者都非零才显示流行中的数量与剩余天数
    if (era_exflag.crystal_ball_popularity && era_exflag.crystal_ball_expire) {
      era.print(
        `${NBSP.repeat(8)}正流行的有${pad_number(
          era_exflag.crystal_ball_popularity,
          3,
        )}部\t\t${pad_number(era_exflag.crystal_ball_expire, 2)}天后将过时`,
      );
    } else {
      era.print(' 目前没有投放中的水晶球'); // :1080
    }
    era.drawLine(); // :1082-1083
    if (stock > 0) {
      // :1083-1087
      era.printButton('投放水晶球', 1);
      era.printButton('派奸商投放水晶球', 2);
      era.printButton('增强流行效果', 3);
      era.printButton('延长流行时间', 4);
    } else {
      era.print('当前没有可以用于投放的水晶球'); // :1089
    }
    era.drawLine(); // :1091-1092
    era.printButton('离开', 999); // :1092

    const result = await number_input(); // :1093
    if (stock === 0 && result !== 999) {
      continue; // :1094-1095（引擎白名单先一步拒收未渲染的 [1]-[4]）
    }

    if (result === 1) {
      // :1096-1119 投放
      era.drawLine(); // :1096-1097
      era.print('通过投放拍摄的影像，激起反抗魔王的决心。'); // :1098
      era.drawLine(); // :1099-1100
      era.print('请输入要投放的数量'); // :1100
      // $INPUT_LOOP_TMP0 :1101-1107（0 = 回菜单，超量 = 只重问）
      let count;
      for (;;) {
        count = await number_input(); // :1102
        if (count === 0) {
          continue menu; // :1103-1104 GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出数量，请重新输入'); // :1106
          continue; // :1107 GOTO INPUT_LOOP_TMP0
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // :1109 EX_FLAG:9011 += RESULT
      // :1110 CALL SENGEN_VIDEO_BONUS, RESULT（RESULT 按引用回写）
      const placed = sengen_video_bonus(count, 0, rand);
      if (placed >= 1) {
        // :1111-1114
        era.print(`成功投放${placed}部水晶球`); // :1112
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1113
        era_exflag.crystal_ball_expire += placed; // :1114
      } else {
        era.print('投放，似乎失败了。'); // :1116
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // :1118 GOTO INPUT_LOOP
    }

    if (result === 2) {
      // :1120-1163 奸商代理投放
      era.drawLine(); // :1120-1121
      era.print('通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。'); // :1122
      era.print('但需要收取代理酬劳，每部5000G或是1枚勋章。'); // :1123
      era.drawLine(); // :1124-1125
      era.print('请输入要投放的数量'); // :1125
      // $INPUT_LOOP_TMP1 :1126-1135
      let count;
      for (;;) {
        count = await number_input(); // :1127
        if (count === 0) {
          continue menu; // :1128-1129 GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出可投放数量，请重新输入'); // :1131
          continue; // :1132 GOTO INPUT_LOOP_TMP1
        }
        // :1133-1135 两种酬劳都付不起：重问
        if (count > chara(0).event.勋章经验 && count * 5000 > era_flag.money) {
          era.print('没有足够的奖赏来打动奸商');
          continue; // :1135 GOTO INPUT_LOOP_TMP1
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // :1137 EX_FLAG:9011 += RESULT
      // :1138 CALL SENGEN_VIDEO_BONUS, RESULT, 1；犒赏段（:1143-1157）消费的
      // M 就是调用前的投入数（原作 M 是全局量、:1242 赋值后一直留到调用方）
      const base = count;
      const placed = sengen_video_bonus(count, 1, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`); // :1140
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1141
        era_exflag.crystal_ball_expire += placed; // :1142
        if (base * 5000 < era_flag.money) {
          era.printButton('犒赏金币', 1); // :1143-1144
        }
        if (base < chara(0).event.勋章经验) {
          era.printButton('犒赏勋章', 2); // :1145-1146
        }
        // $INPUT_LOOP_TMP2 :1147-1158（无效输入重问，见函数 JSDoc 的缺陷说明）
        for (;;) {
          const pay = await number_input(); // :1148
          if (pay === 1 && base * 5000 < era_flag.money) {
            era.print(`犒赏了奸商${base * 5000}G`); // :1150
            era_flag.money -= base * 5000; // :1151 MONEY -= (M * 5000)
            era_exflag.legit_money -= base * 5000; // :1152 EX_FLAG:4444 -=
            break;
          }
          if (pay === 2 && base < chara(0).event.勋章经验) {
            era.print(`犒赏了奸商${base}枚勋章`); // :1154
            chara(0).event.勋章经验 -= base; // :1155 EXP:0:81 -= M
            break;
          }
          // :1156-1157 ELSE → GOTO INPUT_LOOP_TMP2
        }
      } else {
        era.print('投放，似乎失败了。'); // :1160
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // :1162 GOTO INPUT_LOOP
    }

    if (result === 3) {
      // :1164-1198 增强流行效果
      era.drawLine(); // :1164-1165
      era.print('通过奸商代理投放拍摄的影像，增强投放的效果。'); // :1166
      era.print('将收取50000G或是5枚勋章。'); // :1167
      era.drawLine(); // :1168-1169
      era.print('请选择要支付方式'); // :1169
      if (era_flag.money > 50000) {
        era.printButton('支付金币', 1); // :1170-1171
      }
      if (chara(0).event.勋章经验 > 5) {
        era.printButton('支付勋章', 2); // :1172-1173
      }
      era.printButton('离开', 999); // :1174
      // $INPUT_LOOP_TMP3 :1175-1188
      for (;;) {
        const pay = await number_input(); // :1176
        if (pay === 1 && era_flag.money > 50000) {
          era.print('犒赏了奸商50000G'); // :1178
          era_flag.money -= 50000; // :1179
          era_exflag.legit_money -= 50000; // :1180
          break;
        }
        if (pay === 2 && chara(0).event.勋章经验 > 5) {
          era.print('犒赏了奸商5枚勋章'); // :1182
          chara(0).event.勋章经验 -= 5; // :1183
          break;
        }
        if (pay === 999) {
          continue menu; // :1184-1185 GOTO INPUT_LOOP
        }
        // :1186-1187 ELSE → GOTO INPUT_LOOP_TMP3
      }
      // :1189-1196 ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 ×2
      const before = era_exflag.crystal_ball_popularity; // :1189 M = EX_FLAG:9012
      let grown = times(before, 1.2); // :1190 TIMES EX_FLAG:9012, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6); // :1191-1192
      if (rand(2) === 0) grown = times(grown, 1.2); // :1193-1194
      if (grown > before * 2) grown = before * 2; // :1195-1196
      era_exflag.crystal_ball_popularity = grown;
      era.print('因为剪辑出了更多的版本，投放效果增强了'); // :1197
      continue; // :1198 GOTO INPUT_LOOP
    }

    if (result === 4) {
      // :1199-1229 延长流行时间
      era.drawLine(); // :1199-1200
      era.print('通过增加投放量延长流行时间。'); // :1201
      era.print('将收取50000G。'); // :1202
      era.drawLine(); // :1203-1204
      if (era_flag.money > 50000) {
        era.printButton('支付', 1); // :1204-1205
      }
      era.printButton('算了', 999); // :1206
      // $INPUT_LOOP_TMP4 :1207-1217
      for (;;) {
        const pay = await number_input(); // :1208
        if (pay === 1 && era_flag.money > 50000) {
          era.print('支付了50000G'); // :1210
          era_flag.money -= 50000; // :1211
          era_exflag.legit_money -= 50000; // :1212
          break;
        }
        if (pay === 999) {
          continue menu; // :1213-1214 GOTO INPUT_LOOP
        }
        // :1215-1216 ELSE → GOTO INPUT_LOOP_TMP4
      }
      // :1218-1227 ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 +5、保底 +1
      const before = era_exflag.crystal_ball_expire; // :1218 M = EX_FLAG:9013
      let grown = times(before, 1.2); // :1219 TIMES EX_FLAG:9013, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6); // :1220-1221
      if (rand(2) === 0) grown = times(grown, 1.2); // :1222-1223
      if (grown > before + 5) grown = before + 5; // :1224-1225
      if (grown - before < 1) grown = before + 1; // :1226-1227
      era_exflag.crystal_ball_expire = grown;
      era.print('流行时间延长了'); // :1228
      continue; // :1229 GOTO INPUT_LOOP
    }

    if (result === 999) {
      return 0; // :1230-1233（[999] 的 RETURN 0 与紧随其后落尾的空 ELSE 同值）
    }
    // 其余值落在原作的空 ELSE 上：落尾即隐式 RETURN 0，同样退出菜单。
    // 真引擎里同样不可达（菜单每轮都打印 [999]，白名单外的手工键入送不到
    // 游戏层），两支都按原作保留
    return 0;
  }
}

/**
 * @INVASION_CHECK（INVASION.ERB:999-1021）：结局判定（#118 本体）。
 *
 * 五组 ELSEIF（顺序 1:1，命中一组即止）：各领域侵攻度满 10000 且未征服
 * → 对应结局演出 + EX_FLAG:99 += 10 + PRINTL 声望+10。演出本体全部在
 * ere/event/event-ending.js（`ending_1` / `ending_3` / `ending_4` /
 * `ending_5` / `end10_55`，都是真身）。
 *
 * 五组的可达性随 #505 变化：人间界组（:1001-1003）是阶段 1 的贯通终点；
 * **精灵/龙/天界三组自 #505 起可达**——地区续接开出了 FLAG:86/88/90 的
 * 写入路径（`add_region_progress`，出兵结算），把某个领域顶到 10000 且
 * 对应征服标记仍为 0 就会触发（三组的标记由各自 ENDING_x 置 1）。#118 时
 * 写的「窄路径不可达（对应无写入点）」对这三组已失效。天神宫组
 * （:1017-1019）仍不可达：判据读 EX_FLAG:101/102，而 EX_FLAG:101 无写入点
 * （#102 查明，见 yml/ExFlag.yml 头注）。
 *
 * 「结算尾 → INVASION_CHECK → ENDING_x」这条链有三条用例守着：人间界的
 * ENDING_1 由 test/page-invasion.test.js 的既有用例（窄路径跨 10000）覆盖，
 * 精灵组由「[1] 魔力结果段的已征服封顶」用例的第三条世界覆盖（地区续接把
 * FLAG:86 顶到 10000 → ENDING_3 + CHAR_GIFT 收下圣女），演出本体另有
 * test/event-ending.test.js 的表驱动用例。
 *
 * @returns {Promise<void>}
 */
async function invasion_check() {
  // :1001-1003 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    // QUIT 是 throw 型（#148，引擎 quit() 抛 Error("quit")）：选 [1] 退出
    // 时异常在 ending_1 内部炸穿，下面两行不可达——原作 QUIT 后 :1003-1004
    // 同样不可达，靠的也是异常炸穿而非哨兵短路（旧写法 ended !== 1 是夹具
    // 降格期发明的机制，#148 拆除；真机上该判断唯一可达的出口只有「正常
    // 返回 0」——见 event-ending.js 的 JSDoc）。调用链上任何一层都不得
    // try/catch 吞掉这个异常，夹具同款 throw 由测试钉住
    await ending_1();
    era_exflag.prestige = era_exflag.prestige + 10; // :1003 EX_FLAG:99 += 10
    era.print('声望+10'); // :1004 PRINTL
    return;
  }
  // :1005-1007 精灵领域：FLAG:86 >= 10000 && FLAG:87 == 0 → ENDING_3
  if (
    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0
  ) {
    await ending_3();
    era_exflag.prestige = era_exflag.prestige + 10; // :1007
    era.print('声望+10'); // :1008 PRINTL
    return;
  }
  // :1009-1011 龙之山脉：FLAG:88 >= 10000 && FLAG:89 == 0 → ENDING_4
  if (
    era_flag.dragon_realm_invasion >= 10000 &&
    era_flag.dragon_realm_conquered === 0
  ) {
    await ending_4();
    era_exflag.prestige = era_exflag.prestige + 10; // :1011
    era.print('声望+10'); // :1012 PRINTL
    return;
  }
  // :1013-1015 天界：FLAG:90 >= 10000 && FLAG:91 == 0 → ENDING_5
  if (era_flag.heaven_invasion >= 10000 && era_flag.heaven_conquered === 0) {
    await ending_5();
    era_exflag.prestige = era_exflag.prestige + 10; // :1015
    era.print('声望+10'); // :1016 PRINTL
    return;
  }
  // :1017-1019 天神宫：EX_FLAG:101 >= 10000 && EX_FLAG:102 == 0 → END10_55
  if (era_exflag.shrine_invasion >= 10000 && era_exflag.shrine_stage === 0) {
    await end10_55();
    era_exflag.prestige = era_exflag.prestige + 10; // :1019
    era.print('声望+10'); // :1020 PRINTL
  }
}

/**
 * 威望修正（INVASION.ERB:270-293，魔力分支内的一份；怪物分支 :236-259
 * 同构，两处共用本函数，#503 起 [0] 也走这里）。五档；0-20 档侵攻失败
 * （早退，返回 true 表示已 RETURN），21-40 档的提示是 PRINTW（:243/:277
 * `PRINTW 侵攻战斗力减少`）——**要等键**，其余三档是 PRINTl/PRINTL（不等键）。
 * 等键使本函数变成 async（#503 审查发现：原先两行打印后直接返回，#117 起的
 * 存量偏差，[0] 也走这条档位后一并修正）。
 *
 * @param {number} sinkou 档前侵攻点
 * @returns {Promise<{sinkou: number, failed: boolean}>} 档后侵攻点 / 是否失败早退
 */
async function apply_prestige_tier(sinkou) {
  const prestige = era_exflag.prestige; // EX_FLAG:99 威望
  if (prestige <= 20 && prestige >= 0) {
    // :270-274 岌岌可危：SINKOU = 0，PRINTW 侵攻失败，RETURN 1
    era.print('威望值是【岌岌可危】');
    return { sinkou: 0, failed: true };
  }
  if (prestige <= 40 && prestige > 20) {
    // :275-278 动荡不安：÷4（PRINTW 的等键落在「侵攻战斗力减少」之后）
    era.print('威望值是【动荡不安】');
    era.print('侵攻战斗力减少');
    await era.waitAnyKey();
    return { sinkou: Math.floor(sinkou / 4), failed: false };
  }
  if (prestige <= 60 && prestige > 40) {
    // :279-284 略受质疑：×(100 + (p-60)*2) / 100（p-60 为负，打折）
    era.print('威望值是【略受质疑】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),
      failed: false,
    };
  }
  if (prestige <= 80 && prestige > 60) {
    // :285-286 相安无事：无修正
    era.print('威望值是【相安无事】');
    return { sinkou, failed: false };
  }
  if (prestige <= 100 && prestige > 80) {
    // :287-292 广受爱戴：×(100 + (p-80)) / 100（加成）
    era.print('威望值是【广受爱戴】');
    return {
      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),
      failed: false,
    };
  }
  // 威望 < 0 或 > 100：原作无匹配档，无修正（1:1）
  return { sinkou, failed: false };
}

/**
 * @INVASION（INVASION.ERB:6-997）：侵略画面入口，按 FLAG:82 分派。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * 外层 `for (;;)` 承载原作的 RESTART（:325/:377 等）：菜单与其下各层
 * 把 RESTART 信号原样返回，这里重走 :6 的分派——与「回到函数开头重新执行」
 * 等价（RESTART 常量的说明见上）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传到出兵路线）
 * @returns {Promise<number>} 0 / 1
 */
async function invasion(rand = default_rand) {
  for (;;) {
    const result =
      era_flag.human_realm_fallen !== 0
        ? await post_conquest_menu(rand) // :25 IF FLAG:82：地上征服后菜单（#468）
        : await start_campaign(rand); // :139-142 ELSE：目标区域默认人间界
    if (result !== RESTART) {
      return result;
    }
  }
}

/**
 * @INVASION（INVASION.ERB:25-138）：地上征服后的地区选择菜单（#468）。
 *
 * 五条状态行（人间界固定「已征服」；精灵/龙之山/天界随各自 FLAG:87/89/91
 * 征服标记切换标签；天神宫随 route_33 开窗或 shrine_stage >= 4 切换，两
 * 条件都不满足时不渲染；圣灵骑士堡垒原作没有状态行，仅按钮文案随
 * FLAG:92 == 15 切换）+ 六个可选分支（[0] 与 [1]/[2]/[3]/[5] 都转
 * start_campaign()，区别只在地区实参——[1]/[2]/[3]/[5] 自 #505 起是真身；
 * [4] 转 ARCANA_FORT 真身，#470）+ [9] CAMPAIGN_MENU + [999] 退出 +
 * [1000] SENGEN_VIDEO + [1001] AGENT_MENU（原作按钮渲染行已注释，但
 * ELSEIF/CALL 分支仍可达，接一个存根，不落本体——见文件头）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（转 start_campaign）
 * @returns {Promise<number|typeof RESTART>} 0 / 1；RESTART = 原作出兵路线里
 *   的 RESTART，由 invasion() 的外层循环重走 :6 的分派
 */
async function post_conquest_menu(rand = default_rand) {
  // :25-49 五条状态行（BARSTR 偏离说明见文件头；圣灵骑士堡垒没有状态行，
  // 只有按钮，见下方 [4] 的注释）
  print_progress_line(
    '地上的魔界领土侵攻度',
    era_flag.human_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.elf_realm_conquered >= 1
      ? '黑暗精灵的领土侵攻度'
      : '精灵族的领域侵攻度',
    era_flag.elf_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.dragon_realm_conquered >= 1
      ? '混沌龙之山侵攻度'
      : '龙之山脉侵攻度',
    era_flag.dragon_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.heaven_conquered >= 1 ? '堕天使的淫界侵攻度' : '天界侵攻度',
    era_flag.heaven_invasion,
    10000,
  );
  // :45/:77 route_33 开窗区间抄自原作（含 540 这个原作留下的空档，1:1 保留，
  // 与下方 [5] 派发检查的 route_33 <= 500 不对称——文件头有说明）
  const route_33_open =
    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) ||
    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);
  if (route_33_open) {
    print_progress_line('天神宫侵攻度', era_exflag.shrine_invasion, 10000);
  } else if (era_exflag.shrine_stage >= 4) {
    print_progress_line(
      '淫乱意志的神宫侵攻度',
      era_exflag.shrine_invasion,
      10000,
    );
  }
  era.drawLine();
  era.print('地面上已被你征服了，你指挥着你的军队准备进攻其他领土………');
  era.printButton('巡视地上的魔界领土（已征服）', 0);
  era.printButton(
    era_flag.elf_realm_conquered >= 1
      ? '巡视黑暗精灵的领土（已征服）'
      : '入侵精灵族的领域',
    1,
  );
  era.printButton(
    era_flag.dragon_realm_conquered >= 1
      ? '巡视混沌龙之山（已征服）'
      : '入侵龙之山脉',
    2,
  );
  era.printButton(
    era_flag.heaven_conquered >= 1 ? '巡视堕天使的淫界（已征服）' : '入侵天界',
    3,
  );
  // FLAG:92（arcana_fort_stage）是位掩码，不是线性阶段数：&1 东 &2 南
  // &4 西 &8 北（ARCANA_FORT.ERB:20/:76，ARCANA_FORT 自身按 |= 逐门置位），
  // 15 = 四门全破；这里只判「是否全部攻陷」，不代表推进到第几关
  era.printButton(
    era_flag.arcana_fort_stage === 15
      ? '巡视圣灵骑士的卖春堡垒（已征服）'
      : '攻略圣灵骑士的堡垒',
    4,
  );
  if (era_exflag.shrine_stage >= 4) {
    era.printButton('巡视淫乱意志的神宫（已征服）', 5);
  } else if (era_exflag.shrine_stage >= 1) {
    era.printButton('天神宫广场', 5);
  } else if (route_33_open) {
    era.printButton('攻略天神宫', 5);
  }
  era.printButton('向着世界之外', 9);
  era.drawLine();
  era.printButton('退出', 999);
  // :83 [1000] 的分子/分母走具名门面（#502 起；此前的「无门面、直读」注释
  // 已过时，era-exflag.js 的 crystal_ball_deployed/stock 早已备好）
  era.printButton(
    `向城里投放水晶球[${era_exflag.crystal_ball_deployed}/${era_exflag.crystal_ball_stock}]`,
    1000,
  );

  // $INPUT_LOOP2 :85-106：无效输入重问不重画（GOTO，见文件头）
  for (;;) {
    const result = await number_input();
    if (result === 999) {
      return 0; // :88-89
    }
    if (result === 1000) {
      // :90-92 CALL SENGEN_VIDEO → RETURN 0（#502 起真身）；注释单占一行，
      // 免得变异条目的 find 串把带 trace ref 的注释当锚点（trace-check 的
      // 「引用不进锁」约定）
      await sengen_video();
      return 0;
    }
    if (result === 1001) {
      // :93-95 CALL AGENT_MENU：按钮渲染行原作已注释，但这条 ELSEIF/CALL
      // 分支本身是活代码，文件头有说明——只接存根，不落 AGENT_MENU 本体
      // （#103：所在的侵略/AGENT/ 是复制改名事故，只登记、不排期）
      await stub_line_wait('AGENT_MENU', '代理人相关菜单', '不排期（#103）');
      return 0;
    }
    if (result === 9) {
      await campaign_menu(); // :97-98
      return 0; // :97-99
    }
    if (result === 5 && era_exflag.route_33 <= 500) {
      // :100-101 原作真实缺陷：按钮可能因 shrine_stage 渲染，这里只认
      // route_33，见文件头
      continue;
    }
    if (result >= 6 || result < 0) {
      continue; // :102-105
    }

    // :108-138 地区选择：RESULT → AREA/SINDO 下标对（CAMPAIGN_REGIONS），
    // 五条分支此后都落到同一个 $START1
    if (result === 0) {
      // :109-111 人间界：复用出兵流程；其内部的 RESTART（原作出兵路线里的
      // [999] 返回等）原样透传，由 invasion() 的外层循环回到 :6 的分派
      return await start_campaign(rand, HUMAN_WORLD);
    }
    if (result === 4) {
      // :125-131 CALL ARCANA_FORT：RETURN 1（打了一仗、回合已耗）→ 本函数
      // 同样 RETURN 1，由调用方 BEGIN TURNEND；0（撤退/无候选/已全破）→ 0
      return await arcana_fort();
    }
    if (result === 5 && era_exflag.shrine_stage >= 3) {
      era_exflag.shrine_stage = era_exflag.shrine_stage + 1; // :136-137
    }
    // :113/:117/:121/:133 精灵/龙/天界/天神宫：取各自的 AREA/SINDO（天神宫的
    // :136-137 副作用已在上一步应用），与原作一样汇入 $START1
    return await start_campaign(rand, CAMPAIGN_REGIONS[result]);
  }
}

/**
 * 掠夺路线的派遣资格判据（:452-456 的五条 filter）。
 *
 * 原作 :444 自注「選択基準は迎撃に準じる」——与迎击设定的派遣判据同源，
 * 但**少两条**（对照 SHOP_2.ERB:284-291 的七条版：这里没有近卫兵与后代
 * 那两条 EX_TALENT 守卫），所以不复用 page-intercept.js 的 reject_reason。
 * 五条依次为：濒死 → 魔王自己 → 非待机 → 未驯服 → 孕妇且未开「孕妇可
 * 出征」位。判据只有这一处真相，列表计数（:450-460）与列表渲染（:491-505）
 * 共用。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean} true = 不可派遣
 */
function raid_rejected(cid) {
  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // :452 体力为 0
  if (cid === 0) return true; // :453 COUNT == 0（魔王自己）
  if (chara(cid).invasion.状态 !== 0) return true; // :454 CFLAG:1 != 0
  // :455 未驯服：CFLAG:0（出售与助手资格）为 0 且无魔之刻印（TALENT:254）
  if (
    (era.get(`cflag:${cid}:0`) || 0) === 0 &&
    (era.get(`talent:${cid}:254`) || 0) === 0
  ) {
    return true;
  }
  // :456 孕妇（TALENT:153）且未开「怀孕时的迎击・临月调教」位（FLAG:5 位 10，
  // CONFIG.ERB:167 的 [10] 开关）
  if (
    (era.get(`talent:${cid}:153`) || 0) === 1 &&
    getbit(era.get('flag:5'), 10) === 0
  ) {
    return true;
  }
  return false;
}

/**
 * 勇者出兵（[2]）路线的派遣资格判据（:307-312 与 :349-354 的同一段六条
 * filter）。判据只有这一处真相，列表计数（:305-316）与列表渲染
 * （:349-357）共用。
 *
 * 六条依次为：魔王自己 → 濒死 → **`!CFLAG:0 == 2`** → 非待机非苗床
 * （CFLAG:1 不属于 {0, 7}）→ 不爱慕也不淫乱 → 孕妇且未开「孕妇可出征」位。
 *
 * **第三条恒假，是原作的真实缺陷（#14 登记，1:1 保留）**：Emuera 的 `!`
 * 是最高优先级的单目运算符（operators.md 的否定运算符行），故
 * `!CFLAG:COUNT:0 == 2` 读作 `(!CFLAG:COUNT:0) == 2`——`!x` 恒为 0/1，
 * 与 2 比较永远为假，于是「助手可（CFLAG:0 == 2）的角色不许带队」这条
 * 意图从未生效。改写成 `!== 2` 会让助手可的角色从候选里消失。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean} true = 不可派遣
 */
function brute_rejected(cid) {
  if (cid === 0) return true; // :307 COUNT == 0（魔王自己）
  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // :307-308 体力为 0
  // :307-309 `!CFLAG:COUNT:0 == 2` 恒假（读法见上），不淘汰任何人——此处刻意
  // 不写判据，也不写「等价」的 `!== 2`：那是另一种行为
  const status = era.get(`cflag:${cid}:1`) || 0; // :307-310 CFLAG:1
  if (status !== 0 && status !== 7) return true; // 待机 / 苗床之外一律淘汰
  // :311-314 爱慕（TALENT:85）或淫乱（TALENT:76）二者皆无
  if (
    (era.get(`talent:${cid}:85`) || 0) !== 1 &&
    (era.get(`talent:${cid}:76`) || 0) !== 1
  ) {
    return true;
  }
  // :312-314 孕妇（TALENT:153）且未开「怀孕时的迎击・临月调教」位（FLAG:5 位 10）
  if (
    (era.get(`talent:${cid}:153`) || 0) === 1 &&
    getbit(era.get('flag:5'), 10) === 0
  ) {
    return true;
  }
  return false;
}

/**
 * 两条出兵路线的勇者选择（[3] :442-563 的选人段 / [2] :299-441 的选人段）。
 *
 * 两段**逐字同源**（连翻页判据的怪癖一并保留）：标题、缓存段、页窗、三个
 * 按钮、输入分发全部相同，只有候选判据不同——由 `rejected` 注入，判据本身
 * 各有各的一处真相（raid_rejected / brute_rejected）。
 *
 * 原作 `FOR COUNT, LIST_POS, CHARANUM` 在「角色号」上扫，ere 侧改成已加入
 * 角色 ID 的升序表（#21 扁平化的既有做法，见文件头的移植说明），LIST_POS 仍是
 * 「最后渲染的那个 ID」——与 SHOP_2.ERB:282-335 的迎击列表**逐字同源**，
 * 连翻页判据的怪癖一并保留：T_LCOUNT 从 `NUM_PAGE * NO_PAGE + 1` 起算且只在
 * 渲染支内自增，页窗是 `[NO_PAGE*NUM_PAGE+1, (NO_PAGE+1)*NUM_PAGE)`，于是每页
 * 实际渲染 NUM_PAGE - 1 行、且上一页的最后一行会重复（原作现状，1:1 不修）。
 *
 * NO_PAGE/LIST_POS/PREV_PAGE/PREV_LIST_POS 是 @INVASION 的 #DIM 局部量：
 * RESTART 不重置它们（control-flow.md:376-377 的回函数头重执行 +
 * user-defined-variables.md 的「局部变量在 RESTART 时不重置」），故由调用方
 * 持有、本函数读写。
 *
 * @param {{no_page: number, list_pos: number, prev_page: number,
 *   prev_list_pos: number}} state 跨 RESTART 保留的翻页游标
 * @param {(cid: number) => boolean} rejected 候选判据（true = 不列）
 * @returns {Promise<number|typeof RESTART>} 选中的角色 ID；RESTART = [999]
 *   返回或没有候选时的原作 RESTART（:467-470/:519-520）
 */
async function pick_hero(state, rejected) {
  // :445-449 LIST_POS/PREV_PAGE/PREV_LIST_POS 清零、LOCAL = 0、YUSYA_I = 0
  state.list_pos = 0;
  state.prev_page = 0;
  state.prev_list_pos = 0;
  const added = era.getAddedCharacters();
  let candidates = 0; // YUSYA_I
  for (const cid of added) {
    if (rejected(cid)) continue; // :452-458 / :307-313
    candidates += 1; // :459 / :315
  }
  // :461-466 MAX_PAGE = ⌈YUSYA_I / NUM_PAGE⌉ - 1
  let max_page =
    candidates % NUM_PAGE > 0
      ? Math.trunc(candidates / NUM_PAGE) + 1
      : Math.trunc(candidates / NUM_PAGE);
  max_page -= 1;
  // :467-470 没有候选人：PRINTW + RESTART
  if (candidates === 0) {
    era.print('没有勇者可进行侵攻。');
    await era.waitAnyKey();
    return RESTART;
  }
  // $INPUT_LOOP_TMPO3 :471
  for (;;) {
    // :474-484 缓存、重置列表信息（SWAP 换位）
    if (state.no_page === 0) {
      state.list_pos = 0;
      state.prev_page = 0;
      state.prev_list_pos = 0;
    } else if (state.no_page < state.prev_page) {
      const tmp = state.list_pos;
      state.list_pos = state.prev_list_pos;
      state.prev_list_pos = tmp;
    } else if (state.no_page === state.prev_page) {
      state.list_pos = state.prev_list_pos;
    } else {
      state.prev_list_pos = state.list_pos;
    }
    // :486-488 标题（CUSTOMDRAWLINE = 的空分割线不镜像，见文件头）
    era.print('派遣谁去侵攻呢？');
    era.drawLine();
    // :489-505 列表（窗口外的命中项只跳过、不渲染）
    let rows = 0; // L_LCOUNT：原作按 LINECOUNT 差算，ere 侧按渲染行数代
    let t_lcount = NUM_PAGE * state.no_page + 1; // :490
    for (const cid of added) {
      if (cid < state.list_pos) continue; // :491 FOR COUNT, LIST_POS, CHARANUM
      if (rejected(cid)) continue; // :493-500 的 filter
      if (
        t_lcount >= (state.no_page + 1) * NUM_PAGE ||
        t_lcount < state.no_page * NUM_PAGE + 1
      ) {
        continue; // :498-499 页窗
      }
      life_list_item(cid); // :502
      t_lcount += 1; // :503
      state.list_pos = cid; // :504
      rows += 1;
    }
    // :506-511 不足一整页时补空行
    if (rows < NUM_PAGE + 1) {
      for (let i = 0; i < NUM_PAGE - rows; i += 1) {
        era.print('');
      }
    }
    // :512-515 三个按钮（PRINTLC 左对齐补位、不换行 → printButton，引擎自动
    // 拼 [编号]；语义见 CONTEXT.md「输出 API 与原作的对应」）
    era.drawLine();
    era.printButton('上一页', 1000);
    era.printButton('返  回', 999);
    era.printButton('下一页', 1001);

    const result = await number_input(); // :517 INPUT

    if (result === 999) {
      return RESTART; // :519-520
    }
    if (result === 1000) {
      // :521-526 上一页（到底不动，GOTO 回循环头重画）
      if (state.no_page > 0) {
        state.no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :527-532 下一页（到末页不动）
      if (state.no_page < max_page) {
        state.no_page += 1;
      }
      continue;
    }
    // :533-535 越界（CHARANUM 在 ID 世界不能直接换成「已加入数」：编制可以
    // 稀疏，数量会误伤合法的 ID —— 改判「是不是已加入角色」）
    if (result < 0 || !added.includes(result)) {
      continue;
    }
    if (rejected(result)) {
      continue; // :536-545 选中项不合法则重问
    }
    return result; // :547 YUSYA_I = RESULT
  }
}

/**
 * 结果段·怪物路线（:620-692，[0] 专用）。
 *
 * 战利品 = SINKOU × 10：已征服的土地（FLAG:SINDO != 0）是「强制征收」且先
 * 按 100000 封顶，未征服是「战利品」且**不封顶**（原作 :647-651 的 ELSE 臂
 * 没有 MIN，两臂的差别是原作现状，1:1）。已征服臂只列了 81/86/88/90
 * （:624/:630/:636/:642），**天神宫落 ELSE** ——原作漏列，见
 * MONSTER_CONQUERED_AREAS。
 *
 * :686-692 的 5% 抓捕按原作即「等键 → GET_ENEMY → 返回 0 才有犒赏行」。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} inkou 侵攻点（原作 SINKOU）
 * @param {(n: number) => number} rand RAND:N 随机源
 */
async function monster_result_section(region, inkou, rand) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.drawLine();
  if (MONSTER_CONQUERED_AREAS.includes(region.area) && conquered) {
    // :624-646 人间界/精灵/龙/天界（已征服）：封顶 100000 + 强制征收
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强制征收了${sinkou * 10}点！`); // :626 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  } else {
    // :647-651 未征服（含天神宫的已征服——原作漏列 101 那一臂）
    era.print(`得到了${sinkou * 10}点的战利品！`); // :648 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 10;
    era_exflag.legit_money += sinkou * 10;
  }
  // :653-667 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA，:664）
  era.drawLine();
  print_progress_line(
    region.result_label,
    region_progress(region, false),
    10000,
  );
  era.drawLine();
  await era.waitAnyKey(); // :667 WAIT
  // :669-684 CALL INVASION_RYOUZYOKU, <地区号>, SINKOU（#470 的真身）
  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);
  // :686-692 5% 概率抓到负隅顽抗的勇者（GET_ENEMY 返回 0 = 人数上限早退）
  if (rand(100) < 5) {
    era.print('好像抓到了负隅顽抗的勇者…………'); // :687 PRINTFORMW
    await era.waitAnyKey();
    if ((await get_enemy(rand)) === 0) {
      era.print('犒赏士兵，捕获到的勇者被赏赐给部下了。'); // :691 PRINTFORMW
      await era.waitAnyKey();
    }
  }
}

/**
 * 结果段·掠夺路线（:891-975，[3] 专用）。
 *
 * 掠夺额 = SINKOU（**不是**怪物路线的 ×10），经验是 SINKOU/20；善恶值先减
 * 5（:909 `CALL KARMA, YUSYA_I, -5`，真身 ere/chara/chara-stats.js）。已
 * 征服/未征服的封顶差别与 [0] 同款（:912-957），但这一段的已征服臂列全了
 * 五个地区（含 :944 的 101），故只判 FLAG:SINDO。原作 :892-908 的三段
 * PRINTFORM/PRINT/PRINTW 在同一显示行，ere 侧并入一次 print + 等键
 * （monster-data.js 的同显示行归并先例），地区名取 region.name。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} yusya_i 领军勇者（角色 ID，原作 YUSYA_I）
 * @param {number} inkou 侵攻点（原作 SINKOU）
 */
async function raid_result_section(region, yusya_i, inkou) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.print(
    `${chara_callname(yusya_i)}得到了魔王的力量！${region.name}被掠夺了。（善恶值:-5）`,
  ); // :892-908（PRINTFORM + PRINT 地区名 + PRINTW）
  await era.waitAnyKey();
  karma(yusya_i, -5); // :909 CALL KARMA, YUSYA_I, -5
  if (conquered) {
    // :912-950（已征服）：封顶 100000 + 强行征收到
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强行征收到了${sinkou}点！`); // :914 PRINTFORMW
    await era.waitAnyKey();
  } else {
    // :951-956（未征服）
    era.print(`获得了${sinkou}点的战利品！`); // :952 PRINTFORMW
    await era.waitAnyKey();
  }
  era_flag.money += sinkou; // :915/:953 MONEY += SINKOU
  era_exflag.legit_money += sinkou; // :916/:954 EX_FLAG:4444 +=
  const exp_gain = Math.floor(sinkou / 20); // SINKOU / 20
  chara(yusya_i).dungeon.战斗经验 += exp_gain; // :917/:955 EXP:YUSYA_I:80
  era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`); // :918
  await era.waitAnyKey();
  // :959-973 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA，:970）
  era.drawLine();
  print_progress_line(
    region.result_label,
    region_progress(region, false),
    10000,
  );
  era.drawLine();
  await era.waitAnyKey(); // :973 WAIT
}

/**
 * 结果段·勇者出兵路线（:758-888，[2] 专用）。
 *
 * 战利品 = SINKOU × 5（[0] 是 ×10、[3] 是 ×1），经验是 SINKOU/2；善恶值先
 * 减 50（:776 `CALL KARMA, YUSYA_I, -50`，全作最重的一档）。已征服/未征服的
 * 封顶差别与 [0] 同款（:803-847），这一段也列全了五个地区（含 :834 的 101），
 * 故只判 FLAG:SINDO。原作 :759-775 的三段 PRINTFORM/PRINT/PRINTW 在同一
 * 显示行，ere 侧并入一次 print + 等键（monster-data.js 的同显示行归并先例），
 * 地区名取 region.name。
 *
 * :778-800 的七档性格旁白按 `TALENT:YUSYA_I:160-166` 顺序判定，七档都不命中
 * 时打一个空行（:797-799 的 PRINTL）。
 *
 * @param {object} region 出兵目标（CAMPAIGN_REGIONS 的条目）
 * @param {number} yusya_i 领军勇者（角色 ID，原作 YUSYA_I）
 * @param {number} inkou 侵攻点（原作 SINKOU）
 * @param {(n: number) => number} rand RAND:N 随机源（凌辱旁白与 9% 抓捕）
 */
async function brute_result_section(region, yusya_i, inkou, rand) {
  const conquered = (era.get(`flag:${region.sindo}`) || 0) !== 0;
  let sinkou = inkou;
  era.print(
    `${chara_callname(yusya_i)}带着怪物到达了${region.name}，尽可能地施暴着。（善良值:-50）`,
  ); // :759-775（PRINTFORM + PRINT 地区名 + PRINTW）
  await era.waitAnyKey();
  karma(yusya_i, -50); // :776 CALL KARMA, YUSYA_I, -50
  // :778-800 七档性格旁白（降序 ELSEIF，命中即止）
  const personality = [
    [
      160,
      `${chara_callname(yusya_i)}在侵略的时候依旧全程保持着慈爱的笑容，她终于明白到一切都是为了${chara_callname(0)}而存在的………`,
    ], // :779
    [
      161,
      `${chara_callname(yusya_i)}身先士卒，第一个飞跳入战场里，而且最后毫发无损。`,
    ], // :782
    [162, `${chara_callname(yusya_i)}是优秀的指挥官，带领着怪物们侵略了。`], // :785
    [
      163,
      `${chara_callname(yusya_i)}穿着${chara_callname(0)}赐予的被诅咒的铠甲，高声大笑着率领怪物们突击了………`,
    ], // :788
    [
      164,
      `${chara_callname(yusya_i)}冷哼着耻笑跪求饶命的草民，随手将他们交给饥饿的巨兽了。`,
    ], // :791
    [
      165,
      `${chara_callname(yusya_i)}一边发出异样的笑声，一边用手中的火把将四周都点燃了………`,
    ], // :794
    [
      166,
      `${chara_callname(yusya_i)}把侵略时所抢夺的金银财宝都献给了${chara_callname(0)}………`,
    ], // :797
  ].find(([talent]) => (era.get(`talent:${yusya_i}:${talent}`) || 0) !== 0);
  if (personality === undefined) {
    era.println(); // :797-799 ELSE → PRINTL
  } else {
    era.print(personality[1]); // PRINTFORMW 的等键
    await era.waitAnyKey();
  }
  if (conquered) {
    // :803-840（已征服）：封顶 100000 + 强制征收 ×5 + 经验 /2
    sinkou = Math.min(sinkou, 10000 * 10);
    era.print(`强制征收了${sinkou * 5}点！`); // :805 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 5; // :806
    era_exflag.legit_money += sinkou * 5; // :807
    const exp_gain = Math.trunc(sinkou / 2);
    chara(yusya_i).dungeon.战斗经验 += exp_gain; // :808
    era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`); // :809
    await era.waitAnyKey();
  } else {
    // :841-846（未征服）
    era.print(`得到了${sinkou * 5}点的战利品！`); // :842 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money += sinkou * 5; // :842-843
    era_exflag.legit_money += sinkou * 5; // :842-844
    const exp_gain = Math.trunc(sinkou / 2);
    chara(yusya_i).dungeon.战斗经验 += exp_gain; // :842-845
    era.print(`${chara_callname(yusya_i)}获得了${exp_gain}点经验值！`); // :842-846
    await era.waitAnyKey();
  }
  // :849-863 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA，:860）
  era.drawLine();
  print_progress_line(
    region.result_label,
    region_progress(region, false),
    10000,
  );
  era.drawLine();
  await era.waitAnyKey(); // :863 WAIT
  // :866-880 CALL INVASION_RYOUZYOKU, <地区号>, SINKOU
  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);
  // :882-888 9% 概率抓到负隅顽抗的勇者（比 [0] 的 5% 高；GET_ENEMY 之后
  // 无条件 `EX_FLAG:99 += 1`，与 [0] 的「只在该行之下」不同）
  if (rand(100) < 9) {
    era.print('好像抓到了负隅顽抗的勇者…………'); // :882-883 PRINTFORMW
    await era.waitAnyKey();
    const captured = await get_enemy(rand); // :884-885
    era_exflag.prestige = era_exflag.prestige + 1; // :885 EX_FLAG:99 += 1
    if (captured === 0) {
      era.print('犒赏士兵，捕获到的勇者被赏赐给部下了。'); // :885-887 PRINTFORMW
      await era.waitAnyKey();
    }
  }
}

/**
 * @INVASION（INVASION.ERB:139-997）：出兵流程——菜单（:139-204）+ 四条路线
 * （:209-563）+ 共通补正（:565-603）+ 中途事件（:601-603）+ 侵攻結果共通
 * （:609-618）+ 结果段（:620-975）+ 结算尾（:976-997）。
 *
 * 四条路线：[0] 怪物出兵 :210-263（#503）、[1] 魔力出兵 :266-296（#117）、
 * [2] 勇者出兵 :299-441（#504）、[3] 勇者掠夺 :442-563（#503）。四条真身
 * 共走后面的共通段。
 *
 * `region` 是出兵目标（CAMPAIGN_REGIONS 的条目，#505）：窄路径（未征服）由
 * invasion() 传默认的人间界，征服后菜单由 [0]/[1]/[2]/[3]/[5] 各传各的——
 * 与原作「先设 AREA/SINDO、再落 $START1」同构。
 *
 * 外层 `for (;;)` 是 `$START1` 复刻：[2]/[3] 的 RESTART（:467-470 没有候选、
 * :519-520 [999] 返回）在这里 `continue` 重画整屏出兵菜单——与原作「回到
 * @INVASION 开头」在窄路径下等价；从征服后菜单进来时，原作的 RESTART 会回到
 * 征服后菜单，故把 RESTART 信号返回给 invasion() 承接。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0]/[2] 的 MONSTER_DATA、
 *   [3] 的 MEDAL_BONUS 经共通段，以及 @INVASION_EVENT 的分发与三臂）
 * @param {object} [region] 出兵目标（缺省人间界，见 HUMAN_WORLD）
 * @returns {Promise<number|typeof RESTART>} 0 / 1 / RESTART
 */
async function start_campaign(rand = default_rand, region = HUMAN_WORLD) {
  // :108-138 的地区分派已由调用方完成（AREA/SINDO 来自 region）；
  // :139-142 的 ELSE 是缺省人间界那一支
  const { area, sindo } = region;
  // :7-21 的 #DIM 局部量里，NO_PAGE（= 0，声明在 :18-22 那一段）与三条翻页
  // 游标跨 RESTART 保留（局部量不重置，见 user-defined-variables.md）：窄路径
  // 的 RESTART 在本函数的 `$START1` 循环里 `continue`，游标自然保住；已征服
  // 来路那条 RESTART 会绕回 invasion() 重进本函数、游标被重建。**这一差异实测
  // 不可观测**（#505 复审用探针跑过两版：pick_hero 每次进入都按原作 :445-449
  // 清零 LIST_POS/PREV_*，页窗又只按计数判，两版画出的列表逐行相同），故不为
  // 此改 RESTART 的承接结构（「不要动路线本身」）
  const page_state = {
    no_page: 0,
    list_pos: 0,
    prev_page: 0,
    prev_list_pos: 0,
  };
  let sinkou = 0; // :204 SINKOU = 0
  let inv_type = 0; // :202 INV_TYPE = RESULT
  let yusya_i = 0; // :11 #DIM YUSYA_I（[0]/[1] 路线不赋值，恒 0）

  // $START1 :143（[3] 的 RESTART 回到这里重画整屏）
  for (;;) {
    // :145-151 怪物数量 = ITEM:100..189 之和（[0]/[2] 路线的 600 门槛）
    let mon_num = 0;
    for (let i = 100; i < 190; i += 1) {
      mon_num += era.get(`item:${i}`) || 0;
    }
    // :144-186 画面绘制：侵攻度 / 气力 / 怪物数量 / 出兵选项
    era.drawLine();
    // :152-167 侵攻度条按 AREA 换标签与表（天神宫走 EX_FLAG，其余走 FLAG）
    print_progress_line(
      region.campaign_label,
      region_progress(region, true),
      10000,
    );
    // MAXBASE:0:1（气力上限）直读：跨域读放行（ADR-0002），maxbase 无门面
    print_progress_line(
      '你的气力',
      chara(0).dungeon.气力,
      era.get('maxbase:0:1') || 0,
    );
    era.drawLine();
    era.print(`你的怪物数量 ${mon_num}只`);
    era.drawLine();
    if (mon_num < MONSTER_THRESHOLD) {
      era.print('[-] - 怪物数量不足。至少需要600只');
    } else {
      era.printButton('使用现有怪物的一半去进攻（资金·俘虏）', 0);
    }
    era.printButton('使用魔王的魔力（经验值）', 1);
    if (mon_num < MONSTER_THRESHOLD) {
      era.print('[-] - 怪物数量不足。至少需要600只');
    } else {
      era.printButton('派遣勇者带三分之一的怪物去进攻（资金·经验值·俘虏）', 2);
    }
    era.printButton('派遣勇者前去掠夺资金（资金·经验值）', 3);
    era.drawLine();
    era.printButton('返回', 999);

    // $INPUT_LOOP :188-200：无效输入重问不重画（GOTO INPUT_LOOP，见文件头）
    for (;;) {
      const result = await number_input();
      if (result === 999) {
        return 0; // :190-191
      }
      if (result >= 4 || result < 0) {
        continue; // :192-195
      }
      if ((result === 0 || result === 2) && mon_num < MONSTER_THRESHOLD) {
        continue; // :196-199
      }
      inv_type = result; // :202 INV_TYPE = RESULT（0/1/2/3）
      break;
    }

    // :203-207 SINKOU = 0（A/B 是 MONSTER_DATA 的队列坐标，仅怪物路线用）
    sinkou = 0;

    if (inv_type === 0) {
      // ===== [0] 怪物出兵（:210-263）=====
      // :211-232 逐个持有怪物调 MONSTER_DATA 取战斗力，怪物数先减半再累加
      for (let i = 100; i < 190; i += 1) {
        if ((era.get(`item:${i}`) || 0) < 1) continue; // :214-215
        monster_data(i, 0, 0, -1, -1, rand); // :217 CALL MONSTER_DATA, MON_ID, 0, 0
        let mon_atk = e_get(2) + e_get(3) + e_get(4); // :219-221 E:2/E:3/E:4
        if (e_get(5) !== 0) mon_atk += e_get(1); // :223-224 特殊
        if (e_get(6) !== 0) mon_atk += e_get(1); // :226-227 魔法
        const halved = Math.trunc((era.get(`item:${i}`) || 0) / 2); // :229
        era.set(`item:${i}`, halved);
        sinkou += mon_atk * (Math.trunc(halved / 9) + 1); // :231
      }
      sinkou = Math.trunc(sinkou / 20); // :234
      // :236-259 威望修正（与魔力分支 :270-293 同构，共用一套五档）
      const tier = await apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败'); // :239 PRINTW
        await era.waitAnyKey();
        return 1; // 与魔力分支同款的早退（不结算、不消耗后续流程）
      }
      era.print('怪物的战斗力　' + sinkou + '点'); // :263 PRINTFORMW
      await era.waitAnyKey();
    } else if (inv_type === 2) {
      // ===== [2] 勇者带三分之一的怪物出兵（:299-441）=====
      const picked = await pick_hero(page_state, brute_rejected);
      if (picked === RESTART) {
        // :467-470 没有候选 / :519-520 [999] 返回（与 [3] 同一段复制，处置同）
        if (era_flag.human_realm_fallen !== 0) {
          return RESTART;
        }
        continue;
      }
      yusya_i = picked; // :405 YUSYA_I = RESULT
      // :407-427 逐个持有怪物调 MONSTER_DATA（第三参是 YUSYA_I），
      // 怪物数先 /= 3 参与累加、再 *= 2 留回库存
      for (let i = 100; i < 190; i += 1) {
        if ((era.get(`item:${i}`) || 0) < 1) continue; // :410-413
        monster_data(i, 0, yusya_i, -1, -1, rand); // :413 CALL MONSTER_DATA, MON_ID, 0, YUSYA_I
        let mon_atk = e_get(2) + e_get(3) + e_get(4); // :413-417
        if (e_get(5) !== 0) mon_atk += e_get(1); // :419-424 特殊
        if (e_get(6) !== 0) mon_atk += e_get(1); // :422-424 魔法
        const third = Math.trunc((era.get(`item:${i}`) || 0) / 3); // :424
        sinkou += mon_atk * (Math.trunc(third / 9) + 1); // :425-426
        era.set(`item:${i}`, third * 2); // :426 ITEM:MON_ID *= 2
      }
      sinkou = Math.trunc(sinkou / 20); // :429-430
      era.print('怪物的战斗力　' + sinkou + '点'); // :429-431 PRINTFORMW
      await era.waitAnyKey();
      // :433-437 勇者补正（CFLAG:YUSYA_I:9 = 等级；这里是三格全角空格）
      const brute_bonus = chara(yusya_i).chara.等级 + 100; // :433-434 TMP2_I
      era.print(
        '勇者补正　　　x' +
          Math.floor(brute_bonus / 100) +
          '.' +
          String(brute_bonus % 100).padStart(2, '0'),
      ); // :434 PRINTFORMW
      await era.waitAnyKey();
      sinkou = Math.trunc((sinkou * brute_bonus) / 100); // :434-437
      // :439-443 勋章补正（传勇者号——#502 的 medal_bonus 签名接实参）
      sinkou = Math.trunc((sinkou * (await medal_bonus(yusya_i))) / 100);
    } else if (inv_type === 3) {
      // ===== [3] 勇者掠夺（:442-563）=====
      const picked = await pick_hero(page_state, raid_rejected);
      if (picked === RESTART) {
        // :467-470 没有候选 / :519-520 [999] 返回：原作的 RESTART 回
        // @INVASION 开头（:6）重走 FLAG:82 分派。未征服时落点是 $START1
        // （就是本函数的循环头，`continue` 连 #DIM 翻页游标一起保住）；
        // 已征服时（从征服后菜单 [0] 进来）落点是征服后菜单，本函数到不了，
        // 把信号透传给 invasion() 的外层循环——那里的三元就是 :25 的分派。
        if (era_flag.human_realm_fallen !== 0) {
          return RESTART;
        }
        continue;
      }
      yusya_i = picked; // :547 YUSYA_I = RESULT
      // :549-551 掠夺的战力来源是魔王之力（BASE:0:1），与 [0]/[2] 的怪物无关
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW
      await era.waitAnyKey();
      // :553-557 勇者补正（CFLAG:YUSYA_I:9 = 等级）
      const hero_bonus = chara(yusya_i).chara.等级 + 100; // :553 TMP2_I
      era.print(
        '勇者补正　x' +
          Math.floor(hero_bonus / 100) +
          '.' +
          String(hero_bonus % 100).padStart(2, '0'),
      ); // :554 PRINTFORMW
      await era.waitAnyKey();
      sinkou = Math.floor((sinkou * hero_bonus) / 100); // :556-557
      // :559-561 勋章补正（传勇者号——#502 的 medal_bonus 签名接实参）
      sinkou = Math.floor((sinkou * (await medal_bonus(yusya_i))) / 100);
    } else {
      // ===== [1] 魔力出兵（:266-296）=====
      // :267 SINKOU = BASE:0:1 / 25；:268 BASE:0:1 /= 2（失败也照减）。气力是
      // dungeon 域属主（#70 实测），跨域写走门面（#71）
      sinkou = Math.floor(chara(0).dungeon.气力 / 25);
      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);
      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）
      const tier = await apply_prestige_tier(sinkou);
      sinkou = tier.sinkou;
      if (tier.failed) {
        era.print('侵攻失败');
        await era.waitAnyKey();
        return 1;
      }
      // :296 PRINTFORMW 战斗力（行首对齐的全角空格在字符串字面量里——模板串
      // 会被 no-irregular-whitespace 拦下）
      era.print('战斗力　' + sinkou + '点');
      await era.waitAnyKey();
    }
    break; // 路线走完，进共通段
  }

  // ===== 共通処理（:565-598）=====
  // :568-572 魔王补正：CFLAG:0:9 是百分比加成（+20 → x1.20），新档 0
  const maou_bonus = (era.get('cflag:0:9') || 0) + 100;
  era.print(
    '魔王补正　　　x' +
      Math.floor(maou_bonus / 100) +
      '.' +
      String(maou_bonus % 100).padStart(2, '0'),
  );
  await era.waitAnyKey();
  sinkou = Math.floor((sinkou * maou_bonus) / 100);
  // :574-590 知识补正（魔王的素质，新档均无）
  if ((era.get('talent:0:325') || 0) === 1) {
    era.print('魔界知识补正　x1.50');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 150) / 100);
  }
  if ((era.get('talent:0:327') || 0) === 1) {
    era.print('淫魔知识补正　x1.20');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 120) / 100);
  }
  if ((era.get('talent:0:328') || 0) === 1) {
    era.print('魔虫知识补正　x1.10');
    await era.waitAnyKey();
    sinkou = Math.floor((sinkou * 110) / 100);
  }
  // :593-595 勋章补正（#502 起真身：EXP:0:81 分档，本世界 > 5 枚时真有数值差）
  sinkou = Math.floor((sinkou * (await medal_bonus())) / 100);
  // :598 PRINTFORMW 合计
  era.print('合计　' + sinkou + '点');
  await era.waitAnyKey();

  // :601-603 CALL INVASION_EVENT；SIF RESULT > 0 → RETURN RESULT。
  // SINKOU 按引用传入传出（原作 `#DIM REF SINKOU`）：FORT/CHALLENGE 的
  // 强攻/潜入/绕路会按比例削减它，改动经 state 回到这里。
  const event_state = { sinkou, yusya_i };
  const event_result = await invasion_event(
    area,
    sindo,
    inv_type,
    event_state,
    rand,
  );
  sinkou = event_state.sinkou;
  yusya_i = event_state.yusya_i;
  if (event_result > 0) {
    return event_result;
  }

  // ===== 侵攻結果共通（:609-618）=====
  // :610-611 掠夺路线的侵攻力激减（SINKOU / 20）；:613-614 其余路线全额。
  // 累加与封顶一律写 FLAG:AREA（天神宫因此写 FLAG:101，见 add_region_progress）
  const gained = inv_type === 3 ? Math.trunc(sinkou / 20) : sinkou;
  add_region_progress(region, gained);

  // ===== 结果段：按 INV_TYPE 四臂（:620-975）=====
  if (inv_type === 0) {
    await monster_result_section(region, sinkou, rand); // :620-692
  } else if (inv_type === 2) {
    await brute_result_section(region, yusya_i, sinkou, rand); // :758-888
  } else if (inv_type === 3) {
    await raid_result_section(region, yusya_i, sinkou); // :891-975
  } else {
    // ===== 魔力结果段（:694-757）=====
    // :696 %SAVESTR:MASTER%的魔力爆发出来了！
    era.print(`${chara_callname(0)}的魔力爆发出来了！`);
    await era.waitAnyKey();
    // :697-709 威力分档的演出文本
    const burst =
      sinkou < 100
        ? `${sinkou}点魔力形成飓风，将大树吹倒了！`
        : sinkou < 300
          ? `${sinkou}点魔力形成火焰，将平原焚烧殆尽！`
          : sinkou < 600
            ? `${sinkou}点魔力形成雷霆，将附近的村庄彻底摧毁！`
            : sinkou < 900
              ? `${sinkou}点魔力形成洪水，将城镇淹没！`
              : sinkou < 1200
                ? `${sinkou}点魔力形成剧毒气体，令骑士团窒息！`
                : `${sinkou}点魔力形成纯粹能量，将城市吞没！`;
    era.print(burst);
    await era.waitAnyKey();
    era.drawLine();
    // :711-738 经验值段（未征服走 :736-738 的 ELSE 臂，已征服走各自臂的
    // 100000 封顶——五个地区的两臂只差封顶，经验同为 SINKOU/2）。战斗
    // 经验是 dungeon 域属主，跨域写走门面
    let exp_sinkou = sinkou;
    if ((era.get(`flag:${region.sindo}`) || 0) !== 0) {
      exp_sinkou = Math.min(exp_sinkou, 10000 * 10); // :713/:718/:723/:728/:733
    }
    const exp_gain = Math.floor(exp_sinkou / 2);
    era.print(`${chara_callname(0)}得到了${exp_gain}点经验值！`);
    await era.waitAnyKey();
    chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）
    era.drawLine();
    // :742-757 侵攻度条（:752-755 按 AREA <= 100 选表——正确的那一处）
    print_progress_line(
      region.result_label,
      region_progress(region, true),
      10000,
    );
  }

  // ===== 结算尾（:976-997）=====
  era.drawLine(); // :976
  await era.waitAnyKey(); // :977 WAIT
  era_exflag.prestige = era_exflag.prestige + 2; // :978 EX_FLAG:99 += 2
  // :983-994 KYOTEN_EVENT 按 AREA 分派（81/86/88/90 → ARG 1/2/3/4）；
  // 天神宫不在列——原作没有那一臂（kyoten_arg = null），1:1 不调用
  if (region.kyoten_arg !== null) {
    await kyoten_event(region.kyoten_arg);
  }
  // :996 CALL INVASION_CHECK（结局判定，#118 本体：FLAG:81 满时在此触发
  // ENDING_1，演出含 [0] 继续 / [1] 退出的询问——选 0 继续后回落到这里）
  await invasion_check();
  return 1; // :997
}

module.exports = {
  STUBBED_CALLS,
  brute_rejected,
  inv_death_check,
  invasion,
  invasion_check,
  invasion_event,
  invasion_event_challenge,
  invasion_event_fort,
  invasion_event_seiei,
  kyoten_event,
  medal_bonus,
  post_conquest_menu,
  sengen_video,
  sengen_video_bonus,
  start_campaign,
};
