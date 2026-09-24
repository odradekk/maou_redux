/**
 * @file 口上文本保真回归锁（issue #46 验收整改）：ere/kojo/ 全部模块的口上
 * 输出与 ERB 原文逐行对核。
 *
 * 缘由（#46 验收的独立变异，两处误报通过是本文件的直接动因）：
 *   - PRINTFORMW/PRINTFORML 的 W/L 之别在行为测试里**不可观测**——夹具的
 *     push_text 对 print 与 printAndWait 记录完全相同（W = 输出后等待按键、
 *     L = 输出后换行，映射错了表现为排版错乱与卡顿感，#8 列为转译器验证面）；
 *   - 插值槽位填错孔（${player_name} 与 ${target_name} 互换）同样不可观测
 *     ——字面量片段对「切开后的片段」核对，两种填法的片段完全一样。
 *
 * 形状参照 test/static-table-coverage.test.js：**从源码扫、逐条对源探**，
 * 不手抄镜像——期望值运行时取自 target/ 的 ERB 原文；ere/kojo/ 新增模块
 * 自动纳入（后续 19 个口上文件落地即受锁，这是本文件存在的理由）。
 *
 * 五道锁（每道一个 test，跨模块聚合失败、逐条列明位置）：
 *   A. 锚覆盖：kojo 模块里每个 era.print* 调用都被捕获且绑定了 // :N 行锚
 *      ——无锚的口上输出不可追溯，锁 B/C/D 对它无从谈起；
 *   B. W/L 变体：ERB 的 PRINTFORMW → printAndWait、PRINTFORML → print，
 *      按行锚逐语句配对；
 *   C. 插值槽位序：ERB 行内的 %...% / {…} / \@...\@ 记号序列与 JS 同语句的
 *      ${...} 序列各自归一后逐项相等（#232 扩：ERB 三元 \@ 也是插值槽；
 *      #570/#599 再扩：`CALL GOBI_KOUJO` / `CALL BENKI_PLAYER_NAME` 记号行
 *      与 JS 的 ${gobi_*} / ${benki_player_name()} 配对，见下文「记号行」）；
 *   D. 字面量片段双向：ERB 片段（按 %...% 切开）⊂ JS 语句文本，JS 字面量
 *      片段（按 ${...} 切开）⊂ ERB 行文本——防手抄错漏。**#60 起归一**：
 *      ERB 侧先经 tools/lang-table.js 归一（繁/日 → 简，词级优先）再比对，
 *      JS 侧保持原文——游戏语言统一为简体是产品决定（对 1:1 的有意偏离），
 *      K5 的移植源是繁体、JS 存简体。归一后锁力不减：抄错字、空格丢失
 *      照样红（归一是确定性映射，片段要么两边一致要么对不上）；且**多守
 *      一类**——JS 侧若还留着非简体字符（忘了转换），归一后的 ERB 片段
 *      在 JS 原文里找不到、反向比对即红。
 *   E. 归一表模式唯一（#295）：ERB_TOKEN_RULES / JS_TOKEN_RULES 各自内部
 *      不许有两条规则用同一个正则源码——「先匹配者胜」下重复模式不报错，
 *      只是静默遮蔽（#238 的 SAVESTR:A 教训），与具体口上语料无关。
 *
 * 锚绑定两条路：语句收尾行的尾锚（`; // :N`）优先；否则看语句前一行的
 * 纯注释（如 K3 的 `// :925`、`// :1062-1063 …`），且仅当该行号窗口在源
 * 文件里确有 PRINTFORM 行时才绑定——结构性注释（`// :936 ;;ランダム…`）
 * 的窗口没有 PRINTFORM 行，不会误绑。
 *   - **拼接锚（#570）**：尾锚写成 `:a+:b+:c`（每个行号都带 `:`——trace-check
 *     按 `:N` 逐个校验在场，见 tools/trace-check.mjs 的「js 里必须仍写着这条
 *     :N」）时，一条 JS 语句对应这几行构成的一行输出（原作
 *     `PRINTFORM 猪 → CALL GOBI_KOUJO → PRINTFORMW`：前面的 PRINTFORM 不换行，
 *     在 Emuera 里同属一行；ere 一次 era.print 即一行，「插入后再续写」没有
 *     对应形态，只能合并成一条语句）。锚必须列全
 *     [首行, 末行] 区间内的每一行 PRINT——漏列即 bind_error，堵住「合并语句
 *     悄悄吞掉没列的行」；中段必须是不带 W/L 的 PRINTFORM（自带换行会把
 *     一行拆成两行），末行的 W/L 决定 printAndWait/print。B/C/D 三道锁对
 *     拼接语句照常生效：B 认末行，C 把各行的插值记号按序拼起来，D 双向且
 *     **按序**核对（不再只看片段是否出现在某一行里）。
 *
 * 记号行（#570 引入 GOBI，#599 扩到 BENKI_PLAYER_NAME）：源里的一句
 * `CALL <真身>`（MARKER_CALL_RULES 登记），真身把文本插进当前输出行——
 * `CALL GOBI_KOUJO` 返语尾（JS 侧 `${gobi_*}`）、`CALL BENKI_PLAYER_NAME`
 * 返对象名（JS 侧 `${benki_player_name()}` / K3 的局部名，见 JS_TOKEN_RULES）。
 * 记号行的位置决定它的归属：**上一条 PRINT 行与本条 PRINT 行之间的 CALL
 * 算后一条**——拼接锚的各行之间如此（原有的 GOBI 语义），单行锚的首行
 * 上方也如此（#599：K12 的「PRINTFORMW 前缀 + CALL 名字 + PRINTFORMW 续行」
 * 在原作是两行，名字落在那一条续行语句的首行；不收这一段就会出现
 * 「JS 有 ${…}、ERB 侧没有」的假绿）。上边界取最近的 PRINT 系行或
 * `@函数` 行（分支行不是边界，见 upper_bound_line）。
 * IF/ELSE 两支各写一句同记号 CALL（只走一支）时并成一个记号。
 * 表里没有的 CALL（SELL_MATURO_K0 一类自带输出的真身）不是记号：它们的
 * 输出是独立语句，由自己的锚覆盖。
 *   - **带 W/L 的前缀行不许被吞（#599 锁 A 的后置检查）**：锚上方有记号行
 *     而上一条 PRINT 行自带 W/L 时（原作在那里已经换行/等待），那条 PRINT
 *     行必须有**自己的语句**。否则「W/L 前缀 + CALL + 续行」被并成一条输出
 *     （K12 四处 #243 起的形态）时：锁 B 看不见没列进语句的前缀行、锁 C 还能
 *     对上记号——两行并一行就成了假绿。#599 的审查就是靠这条抓出 K12 的。
 *
 * 已知边界（防误用）：
 *   - 模块 → 源文件取自文件头的「源: target/…ERB」（追溯注释，项目约定）；
 *     一个模块对应一个口上源文件。跨两文件混引输出的形态出现时，会以
 *     「锚不是 PRINTFORM 行」红出来，届时有意识地扩本锁。
 *   - 模板字面量内容按不透明处理（${} 内不出现反引号/嵌套模板）——kojo
 *     的写法满足；更复杂形态出现时扫描器要有意识地扩。
 *   - 片段阈值 ≥4 字符（trim 后）：更短的片段（「」、…）双向核对无区分力。
 *   - 只认 print / printAndWait 与 PRINT 系变体（PRINTFORMW/L、PRINTW/L、
 *     PRINTFORM、PRINT）。#184 起 DUNGEON_BITCH 这类带文本状态机用全变体
 *     （PRINTFORM 不换行拼接、PRINTW 等）；口上文件（K3/K5）只用
 *     PRINTFORMW/L。其余（println、printButton…）出现即红，扩展须有意识。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

// 归一表（#60）：tools/ 与 test/ 之间用相对路径（AGENTS.md「代码约定」）
const { to_simplified } = require('../tools/lang-normalize');

const REPO_ROOT = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO_ROOT, 'ere', 'kojo');

/** 片段双向核对的长度阈值（trim 后） */
const SEGMENT_MIN = 4;

/** ERB 侧的 PRINT 变体（#184 扩：DUNGEON_BITCH 这类带文本状态机用全变体——
 *  PRINTFORMW/L → wait/line，PRINTFORM/PRINT/PRINTW/PRINTL → 对应 wait/line；
 *  口上文件（K3/K5）只用 PRINTFORMW/L，不受影响）。variant：'W' 等待 / 'L'
 *  换行 / undefined 无后缀 */
// #183 增补：参数可空（PRINTL 空行、PRINTW 空行等待——DUNGEON_RYOUZYOKU_MAN
// 的 :175 PRINTL 与 :197 PRINTW 空行）。`[ \t]+` 只吃半角空白，全角空格是
// 参数内容（如 `PRINTFORMW` 后接全角空格开头的文本，参数以全角空格开头，#183 实测）。
// 源全篇约定用大写关键字，但 Emuera 关键字本身大小写不敏感（K9 :186 转译器
// 未识别的小写 printformw 是实证——引擎接受，人工补译时保留了原样大小写，
// 不应据此误判为「不是 PRINT 系行」，锚覆盖锁因此要能识别，#240）。
const PRINTFORM_RE =
  /^\s*PRINTFORM(W|L)?(?:[ \t]+(.*))?$|^\s*PRINT(W|L)?(?:[ \t]+(.*))?$/i;

// —— 插值记号的归一表（ERB %…% → 归一名 ← JS ${…}） ——

const ERB_TOKEN_RULES = [
  [/^SAVESTR:TARGET$/, 'TARGET'],
  [/^SAVESTR:PLAYER$/, 'PLAYER'],
  [/^SAVESTR:player$/, 'PLAYER'], // #241：K10 源文若干处误写小写 player，语义同 PLAYER（原作缺陷 1:1 保留）

  [/^SAVESTR:ASSI$/, 'ASSI'],
  [/^NAME:MASTER$/, 'MASTER'],
  [/^CALLNAME:MASTER$/, 'MASTER'], // #235：K4 冷徹 :152/:160/:162（呼び名，MASTER 恒角色 0）
  [/^SELF_CALL\(TARGET(,\s*\d+)?\)$/, 'SC'], // ARG:1 原作已标注废弃，同值
  [/^SELF_CALL\(A(,\s*\d+)?\)$/, 'SC'], // EVENT_K 分发前 TARGET=A，与 TARGET 同值（#233）
  [/^SELF_CALL\(ASSI,\s*CFLAG:ASSI:450\)$/, 'SC_ASSI'], // ARG:1 废弃，同值（#231 K0）
  [/^阴核\(TARGET\)$/, 'CLITORIS'], // #231 K0：%阴核(TARGET)%（PRINTFORM 里直接写字）
  [/^SELF_CALL_FIRST\(TARGET\)$/, 'SCF'],
  [/^SAVESTR\s*:\s*TARGET$/, 'TARGET'],
  [/^GET_LOOK_INFO\(TARGET,\s*"种族"\)$/, 'RACE'],
  [/^GET_LOOK_INFO\(TARGET,\s*"成为勇者前的生活"\)$/, 'FORMER_LIFE'], // #244：K13 :3003/:3020
  [/^SELF_CALL_FIRST\(A\)$/, 'SCFA'],
  [/^CSTR:2$/, 'CSTR2'],
  [/^SAVESTR:A$/, 'ANAME'],
  [/^S$/, 'S'],

  // —— #184：DUNGEON_BITCH 等带文本状态机的插值形态 ——
  [/^SAVESTR:ARG$/, 'ARGNAME'],
  [/^FS_BITCH\("LOOKS", ARG\)$/, 'LOOKS'], // #185：%FS_BITCH("LOOKS", ARG)%
  [/^LOCALS$/, 'LOCALS'],
  [/^LOCAL$/, 'LOCAL'],
  [/^KYAKU$/, 'KYAKU'],
  [/^PLAY$/, 'PLAY'],
  [/^PLAY:6$/, 'PLAY6'],
  [/^PLAY\s*\*\s*200$/, 'PLAY200'],
  [/^PLAY\s*\*\s*100$/, 'PLAY100'],
  [/^PLAY\s*\*\s*250$/, 'PLAY250'],
  [/^PLAY\s*\*\s*500$/, 'PLAY500'],
  [/^ABS\(LOCAL\)$/, 'ABSLOCAL'],
  [/^EXPNAME:56$/, 'EXPNAME56'],
  [/^EXPNAME:10$/, 'EXPNAME10'],
  [/^EXPNAME:LCOUNT, 16, RIGHT$/, 'EXPNAME_L'],
  [/^PALAMNAME:0$/, 'PALAMNAME0'],
  [/^PALAMNAME:1$/, 'PALAMNAME1'],
  [/^PALAMNAME:4$/, 'PALAMNAME4'],
  [/^PALAMNAME:5$/, 'PALAMNAME5'],
  [/^PALAMNAME:LCOUNT, 12, RIGHT$/, 'PALAMNAME_L'],
  [/^EXP:ARG:LCOUNT, 30, RIGHT$/, 'NOW_EXP'],
  [/^JUEL:ARG:LCOUNT, 30, RIGHT$/, 'NOW_JUEL'],
  [/^PREV_EXP:LCOUNT, 30, RIGHT$/, 'PREV_EXP_L'],
  [/^PREV_JUEL:LCOUNT, 30, RIGHT$/, 'PREV_JUEL_L'],
  // #184 第二批（复核时补全的插值集合）
  [/^EXPNAME:0$/, 'EXPNAME0'],
  [/^EXPNAME:5$/, 'EXPNAME5'],
  [/^PALAMNAME:6$/, 'PALAMNAME6'],
  [/^PALAMNAME:8$/, 'PALAMNAME8'],
  [/^PLAY\s*\*\s*300$/, 'PLAY300'],
  [/^CFLAG:ARG:120$/, 'LEVEL'],
  [/^NUM$/, 'NUM'],
  [/^RESULT$/, 'RESULT'],
  // —— #182：迷宫凌辱（H13）的插值形态 ——
  [/^SHE\(ARG\)$/, 'SHE'],
  [/^SHE\(ARG:0\)$/, 'SHE'],
  [/^SHE\(ARG:1\)$/, 'SHE'],
  [/^SAVESTR:\(ARG:0\)$/, 'ARGNAME'],
  [/^SAVESTR:\(ARG:1\)$/, 'ARGNAME'],
  [/^SAVESTR:SIDEA$/, 'SIDEA'],
  [/^SAVESTR:SIDEB$/, 'SIDEB'],
  [/^MONSTERNAME\(LOCAL:1\)$/, 'MONSTERNAME'],
  // —— #232：ERB \@ 三元（K1 出售成熟奴隶口上） ——
  [/^\(TALENT:TARGET:76 == 1\) \? 主人大人 # 你$/, 'TERN_MASTER_YOU'],
  [/^\(TALENT:TARGET:76 == 1\) \? 大人 #$/, 'TERN_MASTER_SUFFIX'],
  [/^\(TALENT:TARGET:76 == 1\) \? 主人大人 # 女$/, 'TERN_MASTER_WOMAN'],
  // —— #238：K7 金红桃口上补充 ——
  [/^SAVESTR:MASTER$/, 'MASTER'], // :5364/:5435（同 CALLNAME:MASTER，无独立昵称）
  [/^s$/, 'S_COUNT'], // :7687/:7697（AFTERTRAIN_SEX_CHECK 跨函数全局 S，本回性交次数）
  [/^TIME == 0 \? 今日 # 今夜$/, 'TERN_TIME_NIGHT'], // :473/:487/:515/:570/:766
  [/^TIME == 0 \? 今日 # 今宵$/, 'TERN_TIME_TONIGHT'], // :779/:800
  [/^RAND:2 == 0 \? 菊花 # 小穴$/, 'TERN_HOLE'], // :570
  [/^CFLAG:10$/, 'VISIT_COUNT'], // :212（金红桃已被会面/侵犯次数）
  [
    /^RAND:2 == 0 \? %SAVESTR:TARGET%四肢都贴在地上，抬起屁股左右晃着祈求两人的肉棒。 # %SAVESTR:TARGET%躺在地上分开大腿，用手指插进小穴和肛门狠狠的搅动着、引诱着%SAVESTR:PLAYER%和%SAVESTR:ASSI%。$/,
    'TERN_POSE',
  ], // :569（RAND:2 三目：整句二选一，JS 侧预算两支再用单个 ${} 包一层三目取值）
  // —— #242：K11 リリィ 舔阴（CFLAG:302）二回目以降，RAND:2 无 == 0 的裸真值三目 ——
  [
    /^RAND:2 \? 舔姐姐的这里，我也觉得很舒服哦 # 啊哈，姐姐感觉很舒服吧♪$/,
    'TERN_LICK_1',
  ], // :902
  [
    /^RAND:2 \? 姐姐的爱液都从蜜穴里流进妹妹嘴里了哦。 # 姐姐已经有感觉了呀，很舒服吧♪$/,
    'TERN_LICK_2',
  ], // :908
  [/^RAND:2 \? 姐姐感觉舒服吗？ # 姐姐觉得我舔得舒服吗？♪$/, 'TERN_LICK_3'], // :913
  [/^RAND:2 \? 继续、继续 # 去了、要去了$/, 'TERN_MOAN'], // :1256
  // —— #241：K10 俱乐部口上补充 ——
  [/^\(CFLAG:42 == 83\) \? 扶了扶眼镜 # 向这边转了过来$/, 'TERN_GLASSES'], // :646
  [/^A$/, 'A_COUNT'], // :6066（单字母全局变量 A，UP:11+UP:12，kojo_message_palamcng_10 写入）
  [/^\(A > 1\) \? 射精多次后 # 射精后$/, 'TERN_A_EJACULATE'], // :6098
  [/^\(A > 1\) \? 迎来多次絶頂的 # 迎来絶頂的$/, 'TERN_A_CLIMAX1'], // :6105
  [/^\(A > 1\) \? 不断迎来絶頂 # 迎来絶頂$/, 'TERN_A_CLIMAX2'], // :6120
  [
    /^TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 \? 电动假阳具 # 阴茎$/,
    'TERN_WEAPON',
  ], // #242：K11 リリィ 正常位（CFLAG:321），全支复用同一枚局部 weapon；後背位（CFLAG:322）复用同一记号
  [
    /^TALENT:PLAYER:121 == 0 && TALENT:PLAYER:122 == 0 \? 震动假阳具 # 阴茎$/,
    'TERN_WEAPON_DOGGY',
  ], // #242：K11 リリィ 後背位（CFLAG:322），初めて层与二回目助手玛奥淫乱 RAND:2 支用「震动假阳具」变体
  [
    /^TALENT:ASSI:121 == 0 && TALENT:ASSI:122 == 0 \? 电动假阳具 # 阴茎$/,
    'TERN_ASSI_WEAPON',
  ], // #242：K11 リリィ 三人 PLAY，助手玛奥的性器名
  [
    /^TALENT:MASTER:121 == 0 && TALENT:MASTER:122 == 0 \? 电动假阳具 # 阴茎$/,
    'TERN_MASTER_WEAPON',
  ], // #242：K11 リリィ 三人 PLAY，魔王的性器名
  [/^LOCALS:0$/, 'LOCALS0'],
  [/^LOCALS:1$/, 'LOCALS1'],
  [/^LOCALS:2$/, 'LOCALS2'],
  [/^LOCALS:3$/, 'LOCALS3'],
  // —— #544：强制肉偿（魔改新增/强制肉偿.ERB）——抵债额、欠金、片酬与
  // 结算行的经验/点数名。{PLAY*N} 由 norm_erb_token 的通用规则覆盖 ——
  [/^COST$/, 'COST'],
  [/^CFLAG:ARG:582$/, 'DEBT'],
  [/^COST\*1\/3 \+ RAND:100$/, 'FILM_PRICE'],
  [/^EXPNAME:50$/, 'EXPNAME50'],
  [/^EXPNAME:70$/, 'EXPNAME70'],
  [/^EXPNAME:22$/, 'EXPNAME22'],
  [/^EXPNAME:20$/, 'EXPNAME20'],
  [/^EXPNAME:74$/, 'EXPNAME74'],
  [/^EXPNAME:1$/, 'EXPNAME1'],
  [/^PALAMNAME:2$/, 'PALAMNAME2'],
  [/^PALAMNAME:7$/, 'PALAMNAME7'],
  // —— #570：拼接锚里 CALL GOBI_KOUJO 的插入点记号。它不来自 %…% 文本——
  //   collect_span_tokens 从源行（IF/ELSE 间的一句 CALL）生成，与 JS 侧
  //   ${gobi_*} 配对；写成归一条目是为了两侧共用同一张表、同一套比对 ——
  [/^GOBI$/, 'GOBI'],
  // —— #599：同上，CALL BENKI_PLAYER_NAME（对象名）的插入点记号 ——
  [/^BENKI_PLAYER_NAME$/, 'BENKI_PLAYER_NAME'],
];

const JS_TOKEN_RULES = [
  [/^target_name$/, 'TARGET'],
  [/^player_name$/, 'PLAYER'],
  [/^assi_name$/, 'ASSI'],
  [/^master_name$/, 'MASTER'],
  [/^sc\(\)$/, 'SC'],
  [/^sc\(a\)$/, 'SC'], // #243 K12：enterenemy 等以 A 为目标的 SELF_CALL(A)
  [/^self_call\(a\)$/, 'SC'],
  [/^self_call\(assi\)$/, 'SC_ASSI'], // #231 K0：${self_call(assi)}
  [/^scf\(\)$/, 'SCF'],
  [/^clitoris_word\(target\)$/, 'CLITORIS'], // #231 K0：${clitoris_word(target)}
  [/^get_look_info\(target,\s*'种族'\)$/, 'RACE'],
  [/^get_look_info\(target,\s*'成为勇者前的生活'\)$/, 'FORMER_LIFE'], // #244：K13 :3003/:3020
  [/^self_call_first\(a\)$/, 'SCFA'],
  [/^cstr2$/, 'CSTR2'],
  [/^chara_callname\(a\)$/, 'ANAME'],
  [/^chara_callname\(cid\)$/, 'ANAME'], // #231 K0：GOHOUBI_AFTER 的 A 上下文
  [/^S$/, 'S'],
  [/^peek_aftertrain_s\(\)$/, 'S'], // #247 K19：ERB 全局 S 由调教后事件读取器承载

  // —— #184：DUNGEON_BITCH 等带文本状态机的插值形态 ——
  [/^name_of\(arg\)$/, 'ARGNAME'],
  [/^arg_name$/, 'ARGNAME'], // #183：H14 用 arg_name 变量名承载 %SAVESTR:ARG%
  [/^fs_bitch\('LOOKS', arg\)$/, 'LOOKS'], // #185：${fs_bitch('LOOKS', arg)}
  [/^locals$/, 'LOCALS'],
  [/^local$/, 'LOCAL'],
  [/^kyaku$/, 'KYAKU'],
  [/^play$/, 'PLAY'],
  [/^play\[6\]$/, 'PLAY6'],
  [/^play\s*\*\s*200$/, 'PLAY200'],
  [/^play\s*\*\s*100$/, 'PLAY100'],
  [/^play\s*\*\s*250$/, 'PLAY250'],
  [/^play\s*\*\s*500$/, 'PLAY500'],
  [/^Math\.abs\(local\)$/, 'ABSLOCAL'],
  [/^expname\(56\)$/, 'EXPNAME56'],
  [/^expname\(10\)$/, 'EXPNAME10'],
  [/^expname\(lcount,\s*16\)$/, 'EXPNAME_L'],
  [/^palamname\(0\)$/, 'PALAMNAME0'],
  [/^palamname\(1\)$/, 'PALAMNAME1'],
  [/^palamname\(4\)$/, 'PALAMNAME4'],
  [/^palamname\(5\)$/, 'PALAMNAME5'],
  [/^palamname\(lcount,\s*12\)$/, 'PALAMNAME_L'],
  [/^era\.get\(`exp:\$\{arg\}:\$\{lcount\}`\)\s*\|\|\s*0$/, 'EXP_ARG_L'],
  [/^era\.get\(`juel:\$\{arg\}:\$\{lcount\}`\)\s*\|\|\s*0$/, 'JUEL_ARG_L'],
  [/^prev_exp\[lcount\]$/, 'PREV_EXP_L'],
  [/^prev_juel\[lcount\]$/, 'PREV_JUEL_L'],
  // #184 第二批（复核时补全的插值集合）
  [/^expname\(0\)$/, 'EXPNAME0'],
  [/^expname\(5\)$/, 'EXPNAME5'],
  [/^palamname\(6\)$/, 'PALAMNAME6'],
  [/^palamname\(8\)$/, 'PALAMNAME8'],
  [/^play\s*\*\s*300$/, 'PLAY300'],
  [/^play\[0\]$/, 'PLAY'],
  [/^now_exp$/, 'NOW_EXP'],
  [/^now_juel$/, 'NOW_JUEL'],
  [/^level$/, 'LEVEL'],
  [/^num$/, 'NUM'],
  [/^result$/, 'RESULT'],
  // —— #182：迷宫凌辱（H13）的插值形态 ——
  [/^she\(arg\)$/, 'SHE'],
  [/^she\(arg0\)$/, 'SHE'],
  [/^she\(arg1\)$/, 'SHE'],
  [/^arg_name_of\(arg0\)$/, 'ARGNAME'],
  [/^arg_name_of\(arg\)$/, 'ARGNAME'],
  [/^winner_name$/, 'ARGNAME'], // #182 PC_RYOU：胜者名
  [/^loser_name$/, 'ARGNAME'], // #182 PC_RYOU：败者名
  [/^arg_name_of\(arg1\)$/, 'ARGNAME'],
  [/^arg_name_of\(sidea\)$/, 'SIDEA'],
  [/^arg_name_of\(sideb\)$/, 'SIDEB'],
  [/^monstername\(local_1\)$/, 'MONSTERNAME'],
  [/^pick\(/, 'PICK'],
  // —— #232：ERB \@ 三元展开后的局部 ——
  [/^master_or_you$/, 'TERN_MASTER_YOU'],
  [/^master_suffix$/, 'TERN_MASTER_SUFFIX'],
  [/^master_or_woman$/, 'TERN_MASTER_WOMAN'],
  // —— #238：K7 金红桃口上补充 ——
  [/^s$/, 'S_COUNT'],
  [/^cid_name$/, 'ANAME'], // 与 :89 的 SAVESTR:A→ANAME 配对（#238 合并时统一，勿再另起记号）
  // —— #239：K8 银黑桃口上的局部名（记号沿用上面的规范名，勿另起） ——
  [/^a_name$/, 'ANAME'], // 迎击奖赏两函数承载 %SAVESTR:A%
  [/^name$/, 'ANAME'], // #242：K11 奖赏请求局部名承载 %SAVESTR:A%
  [/^today_or_night$/, 'TERN_TIME_NIGHT'],
  [/^today_or_eve$/, 'TERN_TIME_TONIGHT'],
  [/^s \|\| 0$/, 'S_COUNT'],
  [/^time_word$/, 'TERN_TIME_NIGHT'],
  [/^time_word2$/, 'TERN_TIME_TONIGHT'],
  [/^hole_word$/, 'TERN_HOLE'],
  [/^visit_count$/, 'VISIT_COUNT'],
  [/^rand_n\(2\) === 0 \? pose_a : pose_b$/, 'TERN_POSE'],
  // —— #242：K11 リリィ 舔阴，与 ERB_TOKEN_RULES 的三条 TERN_LICK_* 配对 ——
  [/^lick_line_1$/, 'TERN_LICK_1'],
  [/^lick_line_2$/, 'TERN_LICK_2'],
  [/^lick_line_3$/, 'TERN_LICK_3'],
  [/^moan_word$/, 'TERN_MOAN'], // :1256 胸爱抚，与上面 ERB_TOKEN_RULES 的 TERN_MOAN 配对
  // —— #241：K10 俱乐部口上补充 ——
  [/^glasses_word$/, 'TERN_GLASSES'],
  [/^a_count$/, 'A_COUNT'],
  [/^a_count > 1 \? '射精多次后' : '射精后'$/, 'TERN_A_EJACULATE'],
  [/^a_count > 1 \? '迎来多次绝顶的' : '迎来绝顶的'$/, 'TERN_A_CLIMAX1'],
  [/^a_count > 1 \? '不断迎来绝顶' : '迎来绝顶'$/, 'TERN_A_CLIMAX2'],
  [/^weapon$/, 'TERN_WEAPON'], // #242：K11 リリィ 正常位（CFLAG:321）、後背位（CFLAG:322）复用
  [/^weapon_doggy$/, 'TERN_WEAPON_DOGGY'], // #242：K11 リリィ 後背位（CFLAG:322），震动假阳具变体
  [/^assi_weapon$/, 'TERN_ASSI_WEAPON'], // #242：K11 リリィ 三人 PLAY，助手玛奥的性器名
  [/^master_weapon$/, 'TERN_MASTER_WEAPON'], // #242：K11 リリィ 三人 PLAY，魔王的性器名
  [/^locals_0$/, 'LOCALS0'],
  [/^locals_1$/, 'LOCALS1'],
  [/^locals_2$/, 'LOCALS2'],
  [/^locals_3$/, 'LOCALS3'],
  // —— #544：强制肉偿（与 ERB_TOKEN_RULES 的同名块一一配对）——
  [/^cost$/, 'COST'],
  [/^debt_of\(arg\)$/, 'DEBT'],
  [/^shown_price$/, 'FILM_PRICE'],
  [/^expname\(50\)$/, 'EXPNAME50'],
  [/^expname\(70\)$/, 'EXPNAME70'],
  [/^expname\(22\)$/, 'EXPNAME22'],
  [/^expname\(20\)$/, 'EXPNAME20'],
  [/^expname\(74\)$/, 'EXPNAME74'],
  [/^expname\(1\)$/, 'EXPNAME1'],
  [/^palamname\(2\)$/, 'PALAMNAME2'],
  [/^palamname\(7\)$/, 'PALAMNAME7'],
  // —— #570：迷宫凌辱『猪…』整段一行的语尾插值（与 ERB 的 CALL GOBI_KOUJO 配对） ——
  [/^gobi_pig$/, 'GOBI'],
  [/^gobi_pig2$/, 'GOBI'],
  // —— #599：CALL BENKI_PLAYER_NAME 的对象名插值（K0/K12 的闭包名、
  //   K3 的局部名，同一个记号） ——
  [/^benki_player_name\(\)$/, 'BENKI_PLAYER_NAME'],
  [/^player_name_benki$/, 'BENKI_PLAYER_NAME'],
];

/** ERB %…% 记号 → 归一名；未知记号返回 undefined（锁 C 报出） */
function norm_erb_token(raw) {
  const tok = raw.trim();
  for (const [re, name] of ERB_TOKEN_RULES) {
    if (re.test(tok)) {
      return name;
    }
  }
  const heart_match = tok.match(/^UNICODE\(0x2661\)\s*\*(\d+)$/);
  if (heart_match) {
    return `HEART${heart_match[1]}`;
  }
  const black_heart_match = tok.match(/^UNICODE\(0x2764\)\s*\*(\d+)$/);
  if (black_heart_match) {
    return `BLACKHEART${black_heart_match[1]}`;
  }
  const heart_black_match = tok.match(/^UNICODE\(0x2665\)\s*\*(\d+)$/);
  if (heart_black_match) {
    return `HEART_BLACK${heart_black_match[1]}`;
  }

  // #183：{MON_NUM} / {MON_NUM * 10} 计算插值（迷宫凌辱的怪物数量）
  if (tok === 'MON_NUM') {
    return 'MONNUM';
  }
  // #182：{MON_NUM * N} 计算插值（12/15/5 等倍率；源文件各分支倍数不同）
  const mul = tok.match(/^MON_NUM\s*\*\s*(\d+)$/);
  if (mul) {
    return `MONNUM_MUL${mul[1]}`;
  }
  // #182：{PLAY * 10}（勇者版胜利演出）
  const play_mul = tok.match(/^PLAY\s*\*\s*(\d+)$/);
  if (play_mul) {
    return `PLAY_MUL${play_mul[1]}`;
  }
  return undefined;
}

/** JS ${…} 记号 → 归一名；未知记号返回 undefined */
function norm_js_token(raw) {
  const tok = raw.trim();
  for (const [re, name] of JS_TOKEN_RULES) {
    if (re.test(tok)) {
      return name;
    }
  }
  const heart_match = tok.match(/^heart\((\d+)\)$/);
  if (heart_match) {
    return `HEART${heart_match[1]}`;
  }
  const black_heart_match = tok.match(/^black_heart\((\d+)\)$/);
  if (black_heart_match) {
    return `BLACKHEART${black_heart_match[1]}`;
  }
  const heart_black_match = tok.match(/^heart_black\((\d+)\)$/);
  if (heart_black_match) {
    return `HEART_BLACK${heart_black_match[1]}`;
  }
  if (tok === "'\\u3000'") {
    return 'IDEOGRAPHIC_SPACE';
  }

  // #183：JS 侧 ${mon_num} / ${mon_num * 10} 与 ERB 的 {MON_NUM} 配对
  if (tok === 'mon_num') {
    return 'MONNUM';
  }
  // #182：${mon_num * N} 计算插值
  const mul = tok.match(/^mon_num\s*\*\s*(\d+)$/);
  if (mul) {
    return `MONNUM_MUL${mul[1]}`;
  }
  // #182：${play * 10}（勇者版胜利演出）
  const play_mul = tok.match(/^play\s*\*\s*(\d+)$/);
  if (play_mul) {
    return `PLAY_MUL${play_mul[1]}`;
  }
  return undefined;
}

/**
 * 扫描一个 js 模块的 era.print* 调用语句（字符串/注释感知）。
 *
 * 字符串内容不透明（含模板字面量：${} 里的括号不参与配对）；行注释与块
 * 注释跳过（注释里的 era.print 不算调用）。捕获 print 与 printAndWait
 * 两种，其余 print 族（println/printButton…）记录但不捕获——锁 A 会报出。
 *
 * @param {string} text 模块全文
 * @returns {{statements: object[], print_calls: object[], lines: string[],
 *   line_of(offset: number): number}}
 */
function scan_print_statements(text) {
  const lines = text.split(/\r?\n/);
  const line_starts = [0];
  for (let k = 0; k < lines.length; k += 1) {
    line_starts.push(line_starts[k] + lines[k].length + 1);
  }
  const line_of = (offset) => {
    let lo = 0;
    let hi = lines.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (line_starts[mid] <= offset) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }
    return lo + 1;
  };

  const statements = [];
  const print_calls = [];
  let stmt = null;
  let depth = 0;
  let in_str = null;
  let str_buf = '';
  let i = 0;
  const n = text.length;
  const feed = (ch) => {
    if (stmt) {
      stmt.raw += ch;
    }
  };

  while (i < n) {
    const ch = text[i];
    if (in_str) {
      if (ch === '\\') {
        feed(ch);
        if (i + 1 < n) {
          feed(text[i + 1]);
          str_buf += text[i + 1]; // 转义字符按其字面值入内容
        }
        i += 2;
        continue;
      }
      feed(ch);
      if (ch === in_str) {
        // 闭合引号是语法，不是内容
        if (stmt) {
          stmt.strings.push({ quote: in_str, content: str_buf });
        }
        in_str = null;
        str_buf = '';
      } else {
        str_buf += ch;
      }
      i += 1;
      continue;
    }
    if (ch === '/' && text[i + 1] === '/') {
      while (i < n && text[i] !== '\n') {
        feed(text[i]);
        i += 1;
      }
      continue;
    }
    if (ch === '/' && text[i + 1] === '*') {
      const close = text.indexOf('*/', i + 2);
      const end = close < 0 ? n : close + 2;
      while (i < end) {
        feed(text[i]);
        i += 1;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      feed(ch);
      in_str = ch;
      str_buf = '';
      i += 1;
      continue;
    }
    if (stmt) {
      feed(ch);
      if (ch === '(') {
        depth += 1;
      } else if (ch === ')') {
        depth -= 1;
        if (depth === 0) {
          // 参数列表闭合：吃掉空白与结尾分号，再收行尾的尾注释（锚在此）
          let j = i + 1;
          while (j < n && /\s/.test(text[j])) {
            feed(text[j]);
            j += 1;
          }
          if (text[j] === ';') {
            feed(';');
            j += 1;
          }
          while (j < n && text[j] !== '\n') {
            stmt.trailing += text[j];
            j += 1;
          }
          statements.push(stmt);
          stmt = null;
          i = j;
          continue;
        }
      }
      i += 1;
      continue;
    }
    const call = /^(era\.print[A-Za-z]*\()/.exec(text.slice(i, i + 24));
    if (call) {
      const call_line = line_of(i);
      print_calls.push({ offset: i, call: call[1], line: call_line });
      if (call[1] === 'era.printAndWait(' || call[1] === 'era.print(') {
        stmt = {
          start_offset: i,
          start_line: call_line,
          kind: call[1] === 'era.printAndWait(' ? 'wait' : 'line',
          raw: call[1],
          strings: [],
          trailing: '',
          binding: null,
          prints: null,
          bind_error: null,
        };
        depth = 1;
      }
      i += call[1].length;
      continue;
    }
    i += 1;
  }
  return { statements, print_calls, lines, line_of };
}

/** ERB 的 [n, m] 行窗口里找第一条 PRINT 行（#184 扩：支持全变体）。
 *  返回 { line_no, variant, arg }——variant：'W'（等待）/'L'（换行）/
 *  undefined（无后缀：PRINTFORM/PRINT 不换行不等待，映射 line） */
function find_printform(erb_lines, n, m) {
  for (let i = n; i <= m; i += 1) {
    const match = erb_lines[i - 1]?.match(PRINTFORM_RE);
    if (match) {
      // 两分支：PRINTFORM(W|L)? 或 PRINT(W|L)?——#231 与 #240 分别在 K0/K9 撞到小写
      // printformw，正则带 i，variant 归一大写再判
      const variant = (match[1] || match[3] || '').toUpperCase() || undefined;
      const arg = match[2] ?? match[4] ?? '';
      return { line_no: i, variant, arg };
    }
  }
  // #184：窗口内无 PRINT 系行时，PRINTDATA/DATAFORM 随机文本结构也绑定
  //（era.print(数组[rand]) 输出 DATAFORM 候选之一；variant 'DATA' 由锁
  // B/C 跳过、锁 D 跳过——随机候选集由行为测试覆盖）
  for (let i = n; i <= m; i += 1) {
    const line = erb_lines[i - 1];
    if (line && /^\s*PRINTDATA/.test(line)) {
      return { line_no: i, variant: 'DATA', arg: '' };
    }
  }
  // #183 增补：锚落在 DATAFORM 行区间（如 `// :94-98`）时，从窗口起点
  // 向前回溯找所属 PRINTDATA 起始行——窗口内只有 DATAFORM 行、起始行在
  // 窗口之前（DUNGEON_RYOUZYOKU_MAN.ERB 的逐行锚风格）。
  for (let i = n - 1; i >= 1; i -= 1) {
    const line = erb_lines[i - 1];
    if (line && /^\s*PRINTDATA/.test(line)) {
      return { line_no: i, variant: 'DATA', arg: '' };
    }
    if (PRINTFORM_RE.test(line ?? '')) {
      break; // 遇到普通输出行说明不在 PRINTDATA 块内
    }
  }
  return null;
}

/** 模块头注的「源: target/…ERB」→ 源文件相对路径 */
function parse_source_erb(js_text) {
  const match = js_text.match(/源:\s*(target\/[^\r\n*]+?\.ERB)/);
  return match ? match[1] : null;
}

/** 语句的位置标签（错误信息用）：拼接锚列出全部行，单行绑定保持原格式 */
function where_of(mod, stmt) {
  return stmt.prints.length > 1
    ? `${mod.name} :${stmt.binding.label}（拼接 ERB :${stmt.prints.map((p) => p.line_no).join('+')}）`
    : `${mod.name} :${stmt.binding.label}（ERB :${stmt.prints[0].line_no}）`;
}

/** 片段按序出现在 hay 里吗：返回第一条失败片段的下标，全部命中返回 -1 */
function first_unordered(segs, hay) {
  let cursor = 0;
  for (let i = 0; i < segs.length; i += 1) {
    const idx = hay.indexOf(segs[i], cursor);
    if (idx < 0) {
      return i;
    }
    cursor = idx + segs[i].length;
  }
  return -1;
}

/** 语句的锚绑定：尾锚优先；否则前一行纯注释锚（窗口内有 PRINTFORM 才算）。
 *  尾锚两种形态：单行/窗口（`:N`、`:N-M`）与**拼接锚**（`:a+:b+:c`，#570——
 *  一条 JS 语句依次输出这几行 PRINT，见文件头）。 */
function bind_anchor(stmt, lines) {
  const span = stmt.trailing.match(/\/\/\s*:(\d+(?:\+:\d+)+)/);
  if (span) {
    return {
      span: span[1].split(/\+:/).map(Number),
      label: span[1],
      via: '尾锚',
    };
  }
  const trailing = stmt.trailing.match(/\/\/\s*:(\d+)(?:-(\d+))?/);
  if (trailing) {
    const a = Number(trailing[1]);
    const b = Number(trailing[2] ?? trailing[1]);
    return {
      n: a,
      m: b,
      label: trailing[0].replace(/^\/\/\s*:/, ''),
      via: '尾锚',
    };
  }
  const prev = lines[stmt.start_line - 2];
  if (prev !== undefined && /^\s*\/\//.test(prev)) {
    const cand = prev.match(/:(\d+)(?:-(\d+))?/);
    if (cand) {
      const a = Number(cand[1]);
      const b = Number(cand[2] ?? cand[1]);
      return {
        n: a,
        m: b,
        label: `${a}${b === a ? '' : `-${b}`}`,
        via: '前置注释',
      };
    }
  }
  return null;
}

/**
 * 记号行表（#570 引入 GOBI，#599 扩到 BENKI_PLAYER_NAME）：源里的一句
 * `CALL <真身>`，真身把文本插进当前输出行（GOBI_KOUJO 返语尾、BENKI_PLAYER_NAME
 * 返对象名），JS 侧要照着位置插 `${…}`。表里没有的 CALL（SELL_MATURO_K0 一类
 * 自带输出的真身）不算记号——它们的输出是独立语句，由自己的锚覆盖。
 */
const MARKER_CALL_RULES = [
  [/^\s*CALL\s+GOBI_KOUJO\b/i, 'GOBI'],
  [/^\s*CALL\s+BENKI_PLAYER_NAME\b/i, 'BENKI_PLAYER_NAME'],
];

/**
 * 行区间 [lo, hi] 里的记号行 → 记号名序列。连续的同名记号只计一个：原作
 * IF/ELSE 两支各写一句 `CALL GOBI_KOUJO, 1` / `CALL GOBI_KOUJO, 5`（只走
 * 一支），并进同一条 JS 输出时是一个 `${gobi_*}`（#570 的既有语义）。
 *
 * @param {string[]} erb_lines 源文件全文按行
 * @param {number} lo 起始行号（含，1 起）
 * @param {number} hi 结束行号（含）
 * @returns {string[]} 记号名（'GOBI' / 'BENKI_PLAYER_NAME'）
 */
function collect_gap_markers(erb_lines, lo, hi) {
  const out = [];
  for (let i = lo; i <= hi; i += 1) {
    const line = erb_lines[i - 1] ?? '';
    for (const [re, name] of MARKER_CALL_RULES) {
      if (re.test(line)) {
        if (out[out.length - 1] !== name) {
          out.push(name);
        }
        break;
      }
    }
  }
  return out;
}

/**
 * 语句「上方」的结构边界：往上找到最近的 PRINT 系行或 `@函数` 声明行——
 * 记号行只算这条线以下、语句首行以上的区间。**口径就是这两类行**：跨函数
 * （`@`）当然不算；分支行（`IF`/`ELSEIF`/`ELSE`/`ENDIF`）**不是**边界，
 * 所以「某分支末尾的 CALL 紧接下一分支的首个 PRINT 行、中间没有 PRINT 行」
 * 这种排布会把记号算给后一条语句（当前语料没有这种排布；#599 审查指出，
 * 真出现时在此处加分支边界——注意别把 GOBI 的 IF/ELSE 两支拆成两个记号）。
 *
 * @param {string[]} erb_lines 源文件全文按行
 * @param {number} line_no 开始往上找的行号
 * @returns {number} 边界行号（0 = 文件开头）
 */
function upper_bound_line(erb_lines, line_no) {
  for (let i = line_no; i >= 1; i -= 1) {
    const line = erb_lines[i - 1] ?? '';
    if (/^\s*@/.test(line) || PRINTFORM_RE.test(line)) {
      return i;
    }
  }
  return 0;
}

/**
 * 绑定的 PRINT 行的 ERB 记号序列（#570 拼接锚；#599 起单行锚也走这里）：
 * 首行上方、行间、行内的记号按序拼接——
 *   - **行间与首行上方**的记号行（CALL GOBI_KOUJO / CALL BENKI_PLAYER_NAME，
 *     见 MARKER_CALL_RULES）各计一个记号，是 `${gobi_*}` /
 *     `${benki_player_name()}` 的插入点。单行锚也要收上方这一段：#599 起
 *     K12 的「PRINTFORMW 前缀 + CALL 名字 + PRINTFORMW 续行」在原作是两行，
 *     名字落在续行语句的首行（前缀行有自己的语句），插入点（CALL 行）在锚的
 *     上方——不收就会「JS 有 ${…}、ERB 侧没有」，锁 C 红。
 *   - 各 PRINT 行自己的 %…% / {…} / \@…\@ 按序跟上（原 collect_span_tokens
 *     的既有语义）。
 *
 * @param {string[]} erb_lines 源文件全文按行
 * @param {object[]} prints 本语句的 PRINT 行（行号升序）
 * @returns {string[]} 原始记号文本（记号名是字面标记，不是 %…%）
 */
function collect_span_tokens(erb_lines, prints) {
  const tokens = [];
  let prev = upper_bound_line(erb_lines, prints[0].line_no - 1);
  for (const p of prints) {
    tokens.push(...collect_gap_markers(erb_lines, prev + 1, p.line_no - 1));
    for (const m of p.arg.matchAll(
      /%([^%]+)%|{([^}]+)}|\\@((?:(?!\\@)[\s\S])*?)\\@/g,
    )) {
      tokens.push(m[1] ?? m[2] ?? m[3]);
    }
    prev = p.line_no;
  }
  return tokens;
}

// —— 模块清单与扫描结果（require 期一次算好，四道锁共用） ——

const MODULES = (() => {
  const out = [];
  for (const name of fs
    .readdirSync(KOJO_DIR)
    .filter((f) => f.endsWith('.js'))
    .sort()) {
    const file = path.join(KOJO_DIR, name);
    const text = fs.readFileSync(file, 'utf8');
    const scan = scan_print_statements(text);
    const entry = {
      name,
      scan,
      statements: scan.statements,
      erb_rel: parse_source_erb(text),
      erb_lines: null,
      errors: [],
    };
    if (entry.statements.length > 0) {
      if (!entry.erb_rel) {
        entry.errors.push('有口上输出但头注解析不出「源: target/…ERB」');
      } else {
        const erb_path = path.join(REPO_ROOT, entry.erb_rel);
        if (!fs.existsSync(erb_path)) {
          entry.errors.push(`源文件不存在：${entry.erb_rel}`);
        } else {
          entry.erb_lines = fs.readFileSync(erb_path, 'utf8').split(/\r?\n/);
        }
      }
    }
    for (const stmt of entry.statements) {
      stmt.binding = bind_anchor(stmt, scan.lines);
      if (!stmt.binding) {
        continue;
      }
      if (!entry.erb_lines) {
        stmt.bind_error = '模块无源文件可探（见上一条）';
        continue;
      }
      if (stmt.binding.span) {
        // 拼接锚（#570）：列出的每一行都必须是不换行链上的一环，且区间内
        // 不得漏列 PRINT 行——「整段由本语句输出」才是这个锚的声明
        const refs = stmt.binding.span;
        const first = refs[0];
        const last = refs[refs.length - 1];
        const hits = [];
        for (let i = first; i <= last; i += 1) {
          const match = entry.erb_lines[i - 1]?.match(PRINTFORM_RE);
          if (!match) {
            if (refs.includes(i)) {
              stmt.bind_error = `拼接锚 :${stmt.binding.label} 的 :${i} 不是 PRINT 系行`;
              break;
            } else {
              continue; // 区间内的非输出行（IF/CALL/注释）不参与
            }
          }
          if (!refs.includes(i)) {
            stmt.bind_error = `拼接锚 :${stmt.binding.label} 漏列区间内的 PRINT 行 :${i}`;
            break;
          }
          hits.push({
            line_no: i,
            variant: (match[1] || match[3] || '').toUpperCase() || undefined,
            arg: match[2] ?? match[4] ?? '',
          });
        }
        if (!stmt.bind_error && hits.length !== refs.length) {
          stmt.bind_error = `拼接锚 :${stmt.binding.label} 的行号必须升序、互不相同`;
        }
        if (!stmt.bind_error) {
          stmt.prints = hits;
          stmt.span_tokens = collect_span_tokens(entry.erb_lines, hits);
        }
        continue;
      }
      const hit = find_printform(
        entry.erb_lines,
        stmt.binding.n,
        stmt.binding.m,
      );
      if (hit) {
        stmt.prints = [hit];
        // #599：单行锚也要收「上方记号行」——K12 的「PRINTFORMW 前缀（自带
        // 换行/等待）+ CALL 名字 + 续行」里，名字的插入点在锚的上方
        //（见 collect_span_tokens；前缀行自己另有语句，锁 A 的后置检查守着）
        stmt.span_tokens = collect_span_tokens(entry.erb_lines, [hit]);
      } else if (stmt.binding.via === '尾锚') {
        stmt.bind_error = `尾锚 :${stmt.binding.label} 在 ${entry.erb_rel} 不是 PRINT 系行`;
      } else {
        // 前置注释是结构注释（窗口内无 PRINTFORM 行），不绑定
        stmt.binding = null;
      }
    }
    // #599：带 W/L 的前缀行不许被吞——某条语句的锚上方有记号行、而上一条
    // PRINT 行自带 W/L（原作在那里已经换行/等待）时，那条 PRINT 行必须有
    // 自己的语句。否则「前缀行 + CALL + 续行」被并成一条输出（K12 四处
    // #243 起的形态），锁 B 看不见未列出的前缀行、锁 C 还能对上记号，
    // 两行并一行就成了假绿（#599 审查实测）。
    if (entry.erb_lines) {
      const anchored = new Set();
      for (const stmt of entry.statements) {
        for (const p of stmt.prints ?? []) {
          anchored.add(p.line_no);
        }
      }
      for (const stmt of entry.statements) {
        if (!stmt.prints || stmt.bind_error) {
          continue;
        }
        const first = stmt.prints[0].line_no;
        const bound = upper_bound_line(entry.erb_lines, first - 1);
        if (bound < 1 || anchored.has(bound)) {
          continue;
        }
        if (
          collect_gap_markers(entry.erb_lines, bound + 1, first - 1).length ===
          0
        ) {
          continue;
        }
        const match = (entry.erb_lines[bound - 1] ?? '').match(PRINTFORM_RE);
        const variant = match ? (match[1] || match[3] || '').toUpperCase() : '';
        if (variant) {
          stmt.bind_error =
            `锚 :${stmt.binding.label} 上方有 CALL 记号行，` +
            `而上方那条 PRINTFORM${variant} :${bound} 没有自己的语句——` +
            `它自带换行/等待，并进本语句会吞掉一行`;
        }
      }
    }
    out.push(entry);
  }
  return out;
})();

/** 有语句的模块数与语句总数（各锁的「扫描未退化」自证） */
const TOTAL_STATEMENTS = MODULES.reduce((s, m) => s + m.statements.length, 0);
const MODULES_WITH_STMTS = MODULES.filter(
  (m) => m.statements.length > 0,
).length;

// —— 锁 A：锚覆盖 ——

test('锚覆盖：ere/kojo 每个 era.print* 调用都绑定到源文件的 PRINTFORM 行', () => {
  assert.ok(
    TOTAL_STATEMENTS >= 60,
    `扫到的口上输出语句只有 ${TOTAL_STATEMENTS} 条，扫描八成失效了`,
  );
  assert.ok(MODULES_WITH_STMTS >= 2, '有语句的模块不足 2 个，扫描八成失效了');

  const problems = [];
  for (const mod of MODULES) {
    problems.push(...mod.errors.map((e) => `${mod.name}: ${e}`));
    const captured = new Set(mod.statements.map((s) => s.start_offset));
    for (const call of mod.scan.print_calls) {
      if (call.call !== 'era.print(' && call.call !== 'era.printAndWait(') {
        problems.push(
          `${mod.name}:${call.line}: 未覆盖的输出 API「${call.call.slice(0, -1)}」——本锁只认 print/printAndWait，扩展须有意识`,
        );
      } else if (!captured.has(call.offset)) {
        problems.push(
          `${mod.name}:${call.line}: era.print 调用未被捕获（扫描器缺口）`,
        );
      }
    }
    for (const stmt of mod.statements) {
      if (!stmt.binding) {
        problems.push(
          `${mod.name}:${stmt.start_line}: 口上输出没有 // :N 行锚（不可追溯，锁 B/C/D 对它失效）`,
        );
      } else if (stmt.bind_error) {
        problems.push(`${mod.name}:${stmt.start_line}: ${stmt.bind_error}`);
      }
    }
  }
  assert.deepEqual(
    problems,
    [],
    `锚覆盖缺口（每条 = 一句对不上源的口上输出）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 B：W/L 变体 ——

test('W/L 变体逐行：PRINTFORMW → printAndWait、PRINTFORML → print', () => {
  const problems = [];
  let waits = 0;
  let line_prints = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.prints) {
        continue;
      }
      const where = where_of(mod, stmt);
      if (stmt.kind === 'wait') {
        waits += 1;
      } else {
        line_prints += 1;
      }
      // 拼接锚（#570）：中段必须无 W/L（自带换行会把一行拆成两行），
      // 末行的 W/L 才是这条语句的换行/等待形态
      if (stmt.prints.length > 1) {
        for (const p of stmt.prints.slice(0, -1)) {
          if (p.variant !== undefined) {
            problems.push(
              `${where}: 拼接中段 :${p.line_no} 是 PRINTFORM${p.variant}（自带换行/等待），并进同一条 JS 输出会多出一行`,
            );
          }
        }
      }
      const last = stmt.prints[stmt.prints.length - 1];
      if (last.variant === 'DATA') {
        continue; // #184：PRINTDATA 随机文本结构不参与 W/L 判定
      }
      const expected = last.variant === 'W' ? 'wait' : 'line';
      if (stmt.kind !== expected) {
        problems.push(
          `${where}: 原作是 PRINTFORM${last.variant}，JS 用了 ${stmt.kind === 'wait' ? 'printAndWait' : 'print'}`,
        );
      }
    }
  }
  // 扫描未退化：两种变体都得有实例，否则本锁丧失区分力
  assert.ok(waits >= 60, `printAndWait 语句只有 ${waits} 条，扫描八成失效了`);
  assert.ok(
    line_prints >= 10,
    `print 语句只有 ${line_prints} 条，扫描八成失效了`,
  );
  assert.deepEqual(
    problems,
    [],
    `W/L 变体错配（错了不改行为，只改排版与等待节奏——行为测试看不见，本锁守）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 C：插值槽位序 ——

test('插值槽位序：%…% 与 ${…} 归一化后逐项相等（防填错孔）', () => {
  const problems = [];
  let token_pairs = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.prints) {
        continue;
      }
      const where = where_of(mod, stmt);
      // #184 扩：ERB 的 %…% 与 {…} 都是插值记号（口上文件只有 %…%；
      // DUNGEON_BITCH 等带文本状态机用 {…} 做显示插值，如 {PLAY}、{LOCAL}）。
      // #570 拼接锚 / #599 单行锚：记号行（CALL GOBI_KOUJO / CALL
      // BENKI_PLAYER_NAME）与各 PRINT 行的记号按序拼接（IIFE 里预算在
      // stmt.span_tokens，见 collect_span_tokens），与 JS 侧 ${…} 配对。
      const multi = stmt.prints.length > 1;
      if (!multi && stmt.prints[0].variant === 'DATA') {
        continue; // #184：PRINTDATA 随机文本结构不参与槽位序比对
      }
      const erb_tokens = stmt.span_tokens ?? [];
      const js_tokens = [];
      for (const s of stmt.strings) {
        if (s.quote === '`') {
          for (const m of s.content.matchAll(/\$\{([^}]*)\}/g)) {
            const tok = m[1].trim();
            if (tok === "'\\u3000'" || tok === "'u3000'") {
              continue;
            }

            js_tokens.push(m[1]);
          }
        }
      }
      const erb_norm = erb_tokens.map((t) => norm_erb_token(t));
      const js_norm = js_tokens.map((t) => norm_js_token(t));
      erb_norm.forEach((v, idx) => {
        if (v === undefined) {
          problems.push(
            `${where}: 未知 ERB 插值记号 %${erb_tokens[idx]}%——归一表要有意识地扩`,
          );
        }
      });
      js_norm.forEach((v, idx) => {
        if (v === undefined) {
          problems.push(
            `${where}: 未知 JS 插值 \${${js_tokens[idx]}}——归一表要有意识地扩`,
          );
        }
      });
      token_pairs += Math.max(erb_norm.length, js_norm.length);
      if (
        !erb_norm.includes(undefined) &&
        !js_norm.includes(undefined) &&
        (erb_norm.length !== js_norm.length ||
          erb_norm.some((v, idx) => v !== js_norm[idx]))
      ) {
        problems.push(
          `${where}: 槽位序不一致 ERB=[${erb_norm}] JS=[${js_norm}]`,
        );
      }
    }
  }
  assert.ok(
    token_pairs >= 40,
    `核过的插值槽位只有 ${token_pairs} 个，扫描八成失效了`,
  );
  assert.deepEqual(
    problems,
    [],
    `插值槽位错配（填错孔不改片段集合，片段对核也看不见——本锁守）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 D：字面量片段双向（#60 起 ERB 侧先归一） ——

test('字面量片段双向：ERB 片段（归一后）在 JS 语句里、JS 片段在归一后的 ERB 行里', () => {
  const problems = [];
  let erb_checked = 0;
  let js_checked = 0;
  let normalized_hits = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.prints) {
        continue;
      }
      const where = where_of(mod, stmt);
      if (stmt.prints[0].variant === 'DATA') {
        continue; // #184：PRINTDATA 随机候选集由「随机文本候选」专项对核
      }
      if (stmt.prints.length > 1) {
        // 拼接锚（#570）：ERB 侧是各行的拼接，两个方向都**按序**核对——
        // 只看「片段出现在某一行里」漏得掉行序/片段序颠倒，这里用游标扫。
        const segs = [];
        let erb_concat = '';
        for (const p of stmt.prints) {
          const arg = to_simplified(p.arg);
          if (arg !== p.arg) {
            normalized_hits += 1;
          }
          erb_concat += arg;
          for (const seg of arg.split(
            /%[^%]+%|{[^}]+}|\\@(?:(?!\\@)[\s\S])*\\@/,
          )) {
            if (seg.trim().length >= SEGMENT_MIN) {
              segs.push(seg.trimEnd());
            }
          }
        }
        erb_checked += segs.length;
        const js_raw = stmt.raw.replace(/\$\{\s*'\\u3000'\s*\}/g, '\u3000');
        const js_raw_unescaped = js_raw.replace(/\\(.)/g, '$1');
        const misses = [js_raw, js_raw_unescaped].map((hay) =>
          first_unordered(segs, hay),
        );
        if (misses.every((idx) => idx >= 0)) {
          problems.push(
            `${where}: ERB 拼接片段（归一后）未按序见于 JS：「${segs[Math.min(...misses)]}」`,
          );
        }
        let cursor = 0;
        for (const s of stmt.strings) {
          const parts =
            s.quote === '`' ? s.content.split(/\$\{[^}]*\}/) : [s.content];
          for (const part of parts) {
            if (part.trim().length >= SEGMENT_MIN) {
              js_checked += 1;
              const idx = erb_concat.indexOf(part, cursor);
              if (idx < 0) {
                problems.push(
                  `${where}: JS 片段未按序见于 ERB（归一后）：「${part}」`,
                );
              } else {
                cursor = idx + part.length;
              }
            }
          }
        }
        continue;
      }
      // ERB 侧归一（繁/日 → 简，词级优先；tools/lang-table.js 唯一真相源）。
      // JS 侧不归一——它必须本来就是简体（忘了转换在这里红，见文件头）。
      const erb_arg = to_simplified(stmt.prints[0].arg);
      if (erb_arg !== stmt.prints[0].arg) {
        normalized_hits += 1;
      }
      // 正向：ERB 字面量片段（按 %…% 与 {…} 切开、归一后）⊂ JS 语句原文
      //（#184 扩：{…} 是 ERB 的显示插值，与 %…% 同属插值记号）
      for (const seg of erb_arg.split(
        /%[^%]+%|{[^}]+}|\\@(?:(?!\\@)[\s\S])*\\@/,
      )) {
        if (seg.trim().length >= SEGMENT_MIN) {
          erb_checked += 1;
          // 只去尾随空白（行尾 tab/空格是编辑残留，转译器不保留）；
          // 保留前导空白——M81 守的正是「句中前导空格丢失」（#46）
          const needle = seg.trimEnd();
          const js_raw = stmt.raw.replace(/\$\{\s*'\\u3000'\s*\}/g, '\u3000');
          // 反斜杠转义（如 \(￣▽￣)/ 这类颜文字要写 `\\` 才能在运行时求值出单个
          // 反斜杠、字符串里的字面反引号要写 `` \` ``）在 JS 源里比 ERB 侧多算一
          // 个反斜杠字符——stmt.raw 按源码字符逐个累积、不解转义（K9
          // :1268/:1291/:1299/:1314 颜文字、:6236 字面反引号）。stmt.strings 的
          // str_buf 已经在扫描时把「反斜杠+任意字符」折叠成该字符本身（见上方
          // 扫描器），这里对 js_raw 做同一折叠，口径与反向检查一致（#240）。
          const js_raw_unescaped = js_raw.replace(/\\(.)/g, '$1');
          if (
            !js_raw.includes(needle) &&
            !stmt.raw.includes(needle) &&
            !js_raw_unescaped.includes(needle)
          ) {
            problems.push(
              `${where}: ERB 片段（归一后）未见于 JS：「${needle}」`,
            );
          }
        }
      }
      // 反向：JS 字面量片段（按 ${…} 切开、原文）⊂ 归一后的 ERB 行文本
      for (const s of stmt.strings) {
        const parts =
          s.quote === '`' ? s.content.split(/\$\{[^}]*\}/) : [s.content];
        for (const part of parts) {
          if (part.trim().length >= SEGMENT_MIN) {
            js_checked += 1;
            if (!erb_arg.includes(part)) {
              problems.push(
                `${where}: JS 片段未见于 ERB（归一后）：「${part}」`,
              );
            }
          }
        }
      }
    }
  }
  assert.ok(
    erb_checked >= 60,
    `正向片段只有 ${erb_checked} 条，扫描八成失效了`,
  );
  assert.ok(js_checked >= 60, `反向片段只有 ${js_checked} 条，扫描八成失效了`);
  // 归一确实在被使用（K5 是繁体源）：至少有一条语句的 ERB 行归一后变了样
  assert.ok(
    normalized_hits >= 8,
    `只有 ${normalized_hits} 条语句的 ERB 行归一后发生变化——K5 是繁体源，归一没生效的话正向比对早该全红；此断言防「to_simplified 被换成了恒等」`,
  );
  assert.deepEqual(
    problems,
    [],
    `字面量片段错漏（手抄错漏、空格丢失、JS 侧残留非简体都在这里红）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 E：归一表模式唯一（#295） ——
//
// ERB_TOKEN_RULES / JS_TOKEN_RULES 是「先匹配者胜」的有序数组：同一个正则
// 源码出现两次时，第二条永远吃不到，且不报错——静默遮蔽。#238 合并时踩过
// 一次（[/^SAVESTR:A$/, ANAME] 与后加的 [/^SAVESTR:A$/, A_NAME] 并存，ERB
// 侧与 JS 侧归一到不同记号，五处槽位序失配，已在 c481ed7 统一）。这道锁把
// 「同一张表里两条规则用了同一个正则」当结构性错误钉住，与具体语料无关。

/** 找出 [正则, 名] 数组里 regex.source 重复的条目：{source, names: [先, 后]}[] */
function find_duplicate_patterns(rules) {
  const seen = new Map(); // regex.source -> 先见到的记号
  const dups = [];
  for (const [re, name] of rules) {
    const prior = seen.get(re.source);
    if (prior !== undefined) {
      dups.push({ source: re.source, names: [prior, name] });
    } else {
      seen.set(re.source, name);
    }
  }
  return dups;
}

test('归一表重复检测器：合成用例锁本身（防检测逻辑被拆，#295）', () => {
  // 不读真实表——真实表此刻可能没有重复，测不出「检测器被拆」。合成
  // 一个三条、含一处重复的输入，直接验证检测器的行为契约。
  const dup = find_duplicate_patterns([
    [/^DUP_PROBE$/, 'FIRST'],
    [/^OTHER$/, 'OTHER'],
    [/^DUP_PROBE$/, 'SECOND'],
  ]);
  assert.equal(
    dup.length,
    1,
    `合成用例应检出 1 处重复正则，实测 ${dup.length} 处——find_duplicate_patterns 的检测逻辑被拆了`,
  );
  assert.deepEqual(
    dup[0],
    { source: '^DUP_PROBE$', names: ['FIRST', 'SECOND'] },
    `应点名冲突的两个记号：${JSON.stringify(dup[0])}`,
  );
});

test('归一表模式唯一：ERB_TOKEN_RULES / JS_TOKEN_RULES 内部无重复正则源码（#295，先匹配者胜，重复静默遮蔽）', () => {
  const erb_dups = find_duplicate_patterns(ERB_TOKEN_RULES);
  const js_dups = find_duplicate_patterns(JS_TOKEN_RULES);
  const problems = [
    ...erb_dups.map(
      (d) =>
        `ERB_TOKEN_RULES 重复正则 /${d.source}/：记号 ${d.names.join(' 与 ')}`,
    ),
    ...js_dups.map(
      (d) =>
        `JS_TOKEN_RULES 重复正则 /${d.source}/：记号 ${d.names.join(' 与 ')}`,
    ),
  ];
  assert.deepEqual(
    problems,
    [],
    `归一表重复模式（先匹配者胜，第二条永远吃不到，见 #238 SAVESTR:A 教训）：\n  ${problems.join('\n  ')}`,
  );
});
