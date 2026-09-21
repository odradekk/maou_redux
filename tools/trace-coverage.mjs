// 移植状态表（issue #331，#329 裁定 3 / 裁定 8 的执行者）。
//
// 守什么：把 target/ERB/ 的 346 个 .ERB/.ERH 逐个归为五类——
//   已移植 / 部分移植 / 已判定不实现 / 待移植 / 纯声明——
// 分母写死 346（#329 裁定 3），本表是阶段 5 全部实施票的验收基准：
// 每张票交付后，它经手的文件分类必须从「待移植」变到「已移植」（或
// 「部分移植」——有意留尾时要能看见）。存根清单看不见没人调用的整块
// （處刑相關/ 3,441 行只对应 2 条存根），这是本表存在的理由。
//
// 为什么不能手工做（#329 实测两种启发式各错一类）：
//   - 按文件头关键词判定，把 kojo_message_com_7（kojo-k7-heart.js:1628
//     的真身）报成未移植；
//   - 按追溯引用判定，把 COMF31–38 报成未移植（com-service.js:4 用的是
//     「COMF30_手淫.ERB 至 COMF38_足コキ.ERB」范围写法）。
// 所以证据面与两类显式展开规则如下，全部机械化：
//
// 判「有移植产物」的证据 = 三路并集：
//   (a) tools/trace-refs/ 锚表的 FILES.refs[].src——全项目唯一被测试
//       守着的 js→ERB 映射（#290）；只有它会漏「有真身但正文没有内联
//       :N 引用」的文件，所以要并 (b)。
//       单条 ref 可显式标 `cite: true`（#382）：该锚只验证正文引用的
//       行内容（调用点回显、习语出处一类），不是「这个文件被移植了」
//       的声明——同一张表原本给两种目的共用，`cite` 把两者拆开。例：
//       cloth-lookup.mjs 对 SHOP_TAILOR.ERB 三行的锚只是核对
//       GET_CLOTHTYPE_MAIN2 调用点的 PRINTFORML 回显是否与文档一致，
//       真身出处是同文件声明的 FUNC_CLOTH.ERB；stub-line.mjs 对
//       SHOP_2.ERB 的锚只是记 PRINTW 习语的出处，该文件本身「源: 无
//       对应源」。`cite` 只影响本表的证据判定，trace-check.mjs 的
//       `:N` 在场校验与源文件锚校验不看这个字段——那两道验的是「引用
//       写得对不对」，与「这算不算移植证据」是两件事。
//   (b) ere/ 全部 .js 注释块（jsdoc 块注释 + 文件起首连续 // 行）里形如
//       target/ERB/….ERB 的整路径提及。扫注释块而非全文：正文里的
//       「调用点在 X.ERB:123」一类交叉引用不是移植声明，全文扫会把
//       待移植文件误判成有产物；文件级 jsdoc 的「源:」（如
//       kojo-dungeon-bitch-log.js 的 LOOK.ERB 段）同样是追溯注释，所以
//       不只扫文件头。era-electron.js 是引擎 SDK，不扫。
//   (c) 范围式引用展开：注释里「<dir>/<stem><N>….ERB 至 <stem><M>….ERB」
//       按同目录 <stem><k>（N≤k≤M，k 后不接数字）枚举真实文件——
//       com-service.js:4 一处即覆盖 COMF30–38 九个文件。
//   通配符提及（CHARA<N>.ERB、口上/*.ERB）不算证据也不报悬空：前者由
//   yml 规则兜住，后者是词汇表出处声明（kojo-text.js 的 %…% 插值表），
//   展开它会把「数据来自哪些文件」误读成「这些文件已移植」。
//
// 五类判定（优先级自上而下，先中者胜）：
//   1. 已判定不实现：下方 RULINGS 显式表（每条带裁定出处）。表是显式
//      维护的：推翻裁定 = 改表；表项指向不存在的文件即红。
//   2. 纯声明：扩展名 .erh（大小写不敏感——音声的全局变量.erh 是小写，
//      分母 346 因此必须按不敏感计数，实测敏感计数只有 345）。
//   3. yml 承载 → 计已移植：キャラ関数/CHARA<数字>.ERB 且
//      yml/Chara<数字>.yml 在库（8 个 1–3 行的 EX_TALENT 空壳；真身在
//      ere/chara/chara-ex.js，头部用 CHARA<N> 通配提及——本规则同时兜住
//      通配形态，#331 误报规则 2）。
//   4. 证据 ∩ 未了结存根 → 部分移植：有移植产物、且存根清单
//      （docs/stub-registry.md 第一张表「函数级存根」——#329 普查用的
//      同一张）仍有未了结项归因到该文件。归因按「源」列：整路径包含、
//      裸文件名全库唯一、前缀速记（目录/前缀（……））三段匹配，兼容
//      清单里的 \_ 转义与 * 代 _ 两种写法；**表行的管道符后带不带空格
//      两种形态都认**（`| \`FN\`` 254 行与 `|\`FN\`` 30 行——人工维护的
//      表，prettier 对两种都判合格，规范化它会在下一次手写时重新失效，
//      后者手写清单行时照这两种形态之一写即可）。未了结 = 状态以
//      存根 / 部分实现 开头，或 登记（ 开头且不带死标记（判死 / 不移植
//      / 不实现 / 不可达 / 落空）——登记行一半是「判死 1:1 保留」，那
//      不是欠账是完结方式，计入会把带死分支的已移植文件永远卡在
//      部分移植。已实现行不欠账，不归因。归因不到的行（待核 / 无源 /
//      内建函数 / 目录级引用）不构成信号，由 UNATTRIBUTED_BASELINE
//      钉住总数（见判据 ⑥）。只解析第一张表：变量级 /
//      资源级 / @USERSHOP 各表粒度不同，#329 普查同样只认第一张。
//   5. 有证据、无未了结项 → 已移植。
//   6. 无任何证据 → 待移植（正判据是「三路证据并集为空」，不是兜底：
//      证据面坏了会被待移植基线拦下，见下）。
//
// 失败判据（#331 验收：「无未归类项」的具体化 + 两道只减不增基线）：
//   ① 分母漂移：target/ERB 枚举数 ≠ 346 即红——target/ 是只读输入，
//      变动必须显式重新裁定（改 DENOMINATOR）；
//   ② 证据悬空：注释/锚表/范围展开指向不存在的 .ER[BH] 即红——拼错
//      路径的「移植声明」等于没声明，静默放行会让对应文件假性待移植；
//   ③ RULINGS 表悬空：表项文件不存在即红（裁定被 target/ 变动架空）；
//   ④ 合计 ≠ 346：分类算术的兜底（正常路径到不了这里）；
//   ⑤ 待移植基线只减不增：PENDING_BASELINE 冻结现值，超出即红——
//      ①–④ 只能拦「表算不出来 / 算错账」，拦不住「证据面静默失效」
//      （比如追溯注释被整批改掉，所有文件悄悄退回待移植而合计仍是
//      346）。基线让每张移植票交付时必须显式抬低这个数——这正是
//      #331 把本表定为验收基准的机械形态；发现分类错了往回调同样
//      显式（改基线就是公告）。与 ANCHOR_QUALITY_BASELINE 同款
//      冻结语义；
//   ⑥ 归因不到行数基线只减不增：UNATTRIBUTED_BASELINE 冻结现值，超出
//      即红——静默多出一行归因不到，正是「欠账被漏成已实现」的方向
//      （待移植数与五类合计都不动，⑤ 也盲；验收实证：30 行无空格形态
//      被跳过时 MONSTER_SETUP 所在文件被报成已移植而无人看见）。新增
//      归因不到的行必须显式抬基线——那是把「这行确实挂不到文件上」
//      写成公告的时机。
//
// 用法（挂在 tools/trace-check.mjs 的 --coverage 下，本模块不进 CLI）：
//   node tools/trace-check.mjs --coverage            五类计数 + 基线
//   node tools/trace-check.mjs --coverage --list     逐文件列出（验收对账用）
//   node tools/trace-check.mjs --coverage --only <子串[,子串…]>
//     只分类路径含子串的 target 文件；分母 / 基线 / 表悬空核对按范围
//     跳过或收窄，报告行自报范围（限定范围的绿不是全量绿，探针用）。
//
// 已判定不实现之外的两处显式裁定落点（票内定夺，依据见 issue #331 评论）：
//   - DEBUG小白娘2024ver0.0.14.ERB 与 MOD/、魔改新增/ 未移植文件归
//     待移植：清单给它们挂着「调试票」「魔改子系统票」的归属，是排期
//     不是不实现（阶段 6 / #329 裁定 6）。
//   - 口上/EVENT_K902_普林希丝 ver1.0.3.ERB 归已移植（经证据）而非
//     清单 251 行的「不实现」：那行判的是普林希丝没有自己的口上
//     （#14 缺陷 1 的 1:1 保留）；文件里生效的那份 _903 定义与
//     :422-489 的双执行 EVENTEND 已随 kojo-k903-garde.js 落地
//     （锚表 K902_SOURCE 在案）。

import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_TRACE_REFS_DIR, load_trace_refs } from './trace-refs-load.mjs';

// —— 常量与显式表 ——

/** 分母（#329 裁定 3 写死；大小写不敏感枚举的实测值，见文件头「纯声明」条） */
export const DENOMINATOR = 346;

/**
 * 待移植基线（#331 冻结，只减不增）。每张把文件做进 ere/ 的票交付时
 * 显式改小；改大 = 回退已移植内容或证据面失效，必须是有意识的公告。
 */
export const PENDING_BASELINE = 18; // 合并态实测（#467 并上含 #470/#469 的 master）：
// 23（#470 后的 master，见下方 #470 说明）− 5（本票的 ABL/ABLUP37.ERB／
// ABLUP39.ERB／ABLUP40.ERB／ABLUP99.ERB／ABLUP100.ERB 五个文件）= 18，与
// `node tools/trace-check.mjs --coverage` 的重测一致。数字取自重测而非相加。
// 同票不清 ABLUP0.ERB 与 ABLUP20～33：ABL.ERB 自己的三条归因（@DECIDE_ABLUP
// 族、@AUTO_ABLUP、@USERABLUP）已在本票清了，ABL 目录实测 已移植 23／
// 部分移植 1（ABLUP0.ERB，伞状行仍挂着 #466 的 8 个名字）／待移植 8。
// export const PENDING_BASELINE = 23; // 合并态实测（#470 并上含 #463/#481 的 master）：
// 再并一次 master（#481 / 3a02bbe）后重测仍是 23——#469 把 CAMPAIGN 族做进 ere/
// 时，侵略/CAMPAIGN/CAMPAIGN_1.ERB 与 CAMPAIGN_EVENT.ERB 在本票的基线里本就已经
// 是「部分移植」（不在待移植分子里），所以本数不动；那次合并把「归因不到」
// 从 11 抬低到 6，改的是 UNATTRIBUTED_BASELINE（见其条目），两条基线各自独立。
// master 侧 #463 已把基线抬到 27（#465 先抬到 29；SYSTEM/CONFIG.ERB 落地
// ere/page/page-config.js、SYSTEM/SYSTEM_MODEINT.ERB 的 @QUE2MK 落地
// ere/event/first-setting.js 的 que2mk，各减 1）；本票再减 4——侵略/
// ARCANA_BATTLE.ERB（主循环与 DEATH_CHECK4 落
// ere/invasion/invasion-arcana-battle.js，ENEMY_ATTACK3/MONSTER_ATTACK3
// 判死）、侵略/ARCANA_FORT.ERB（:2-551，落
// ere/invasion/invasion-arcana-fort.js）、侵略/INVASION_RYOUZYOKU.ERB
// （:1-782 全量，落 ere/invasion/invasion-ravish.js）三个从「待移植」
// 转「已移植」，侵略/GROUP_BATTLE.ERB 转「已判定不实现」（RULINGS 表，
// 两个函数零调用点 + 主循环空转）：27 − 4 = 23，与
// `node tools/trace-check.mjs --coverage` 的重测一致（数字取自重测而非
// 相加——本票分支侧的中间值 28 是在 master 仍是 29 时按「29 − 1」测出来的，
// master 前进后三项都在，见下方旧注）。
// export const PENDING_BASELINE = 27; // 合并态实测（#463 并上含 #465/#462 的 master）：
// #465 先把基线抬到 29（37−8，ABL/ABLUP10.ERB～ABLUP17.ERB）；本票再减 2
// （SYSTEM/CONFIG.ERB 落地真身 ere/page/page-config.js、SYSTEM/
// SYSTEM_MODEINT.ERB 的 @QUE2MK 落地 ere/event/first-setting.js 的 que2mk，
// 各自从「待移植」转「已移植」）：29 − 2 = 27，与
// `node tools/trace-check.mjs --coverage` 的重测一致。数字取自重测而非相加。
// SYSTEM ver1.0.3.ERB 本票一并从「部分移植」翻「已移植」（六个函数全部了结：
// EVENTFIRST／EVENTTURNEND 三档／EVENTLOAD 早已落地，FIRST_SETTING 五问本票
// 全量实现，SAVEINFO 随 #136，MONEYSYS 全库零调用点判死不移植，见
// docs/stub-registry.md 的 EX_FLAG:4444 行），但部分移植不在待移植分子里，
// 不动本数（同 #399 的 SHOP_CHARA 先例）。此前卡判定的 EVENTTURNEND（普通档）
// 行是 #114 建表时的七格畸形行，行尾「登记（尚未接入）」被按末格读成状态、
// 而 TURNEND 分派 #44 起就在 main-loop.js——#463 清掉过期格后文件翻面。
// export const PENDING_BASELINE = 28; // 本票分支侧的中间态，从未上过 master：
// 29（#465 后的 master）− 1（侵略/ARCANA_BATTLE.ERB——主循环与 DEATH_CHECK4
// 落 ere/invasion/invasion-arcana-battle.js，ENEMY_ATTACK3/MONSTER_ATTACK3
// 判死）。与 master 侧同期走出的 27 只是两条并行的抬低路径，合并后按重测
// 收敛到 25（27 − ARCANA_BATTLE − ARCANA_FORT）。
// export const PENDING_BASELINE = 29; // 合并态实测（#465 并上含 #464 的 master）：
// 37（#464 后的 master）− 8（本票的 ABL/ABLUP10.ERB～ABLUP17.ERB 八个文件）
// = 29，与 `node tools/trace-check.mjs --coverage` 的重测一致。数字取自
// 重测而非相加。
// export const PENDING_BASELINE = 35; // 合并态实测（#463 两阶段，并上 9457309 的
// master 时）：阶段一 CONFIG.ERB 37−1=36、阶段二 SYSTEM_MODEINT.ERB 36−1=35；
// master 前进（#465 抬到 29）后按 29−2=27 重测改写现役值，两阶段叙事见上。
// export const PENDING_BASELINE = 37; // 合并态实测（#464 并上含 #460 的 master）：
// 47（#460 后的 master）− 10（本票的 ABL/ABLUP0.ERB～ABLUP9.ERB 十个文件）
// = 37，与 `node tools/trace-check.mjs --coverage` 的重测一致。数字取自
// 重测而非相加；两票改动面互不重叠，巧合与算式相符。
//
// #460（Q3）抬低说明（49 → 47）：工单范围内的 COMF0_愛撫.ERB／
// COMF50_ローション.ERB／COMF63_貝あわせ.ERB 核实后确认功能代码早已完整
// 实现（非本票新写），此前已不在待移植的分子里，本票未改动其判定；
// 203/205 的功能代码同样早已完整（com-colosseum.js 的 MONSTER_CONFIGS 与
// 202/204/206 同构共享 monster_com），本票只补齐了追溯锚点证据
// （tools/trace-refs/com-colosseum.mjs）使 trace-coverage 的判定从「待移植」
// 翻正为「已移植」——五个文件只减 2，不是 5。
// export const PENDING_BASELINE = 47; // 合并态实测（#460 并上 master）：
// 49（master）− 2（本票的 COMF203_カビ犬.ERB 与 COMF205_腐れ豚.ERB）= 47，
// 与 `node tools/trace-check.mjs --coverage` 的重测一致。数字取自重测而非相加。
// export const PENDING_BASELINE = 49; // 合并态实测（#399 并上含 #398 的 master）：
// 51（master）− 2（本票的 SHOP/SHOP_ITEM.ERB 与 SHOP/SHOP_MONSTER.ERB）= 49，
// 与 `node tools/trace-check.mjs --coverage` 的重测一致。数字取自重测而非相加。
//
// #399（N15）单独的说明：SHOP_CHARA.ERB 此前已是部分移植、不在待移植的分子里，
// 本票把它补完后转已移植而不减待移植数——三个商店只减 2，不是 3。
// export const PENDING_BASELINE = 51; // 合并态实测（#398 并上含 #390 的 master）：
// #398（N14）把 SHOP/SHOP_LABO ver1.0.2.ERB 整份摆进 ere/
// （ere/page/page-shop-labo.js，52 函数），它从「待移植」直接转「已移植」：
// 52（master）− 1 = 51，与 `node tools/trace-check.mjs --coverage` 的重测一致。
// 数字取自重测而非相加。
//
// 历史（#390 并上含 #392/#393 的 master）：三票摆进 ere/ 的整份文件互不相交，
// 53（master）− 1（#390 的 キャラ関数/CHARA_INFO_SHOW_TALENT.ERB）= 52。
//
// #390（N6）单独的说明：CHARA_INFO_SHOW ver1.1.2.ERB 此前已是**部分移植**，
// 本就不在待移植的分子里——本票把 SHOW_CHARA_INFO / SHOW_EQUIP_1 /
// SHOW_EQUIP_2 / SHOW_DATA / STAIN_INFO 五条登记行清掉之后它转已移植，
// 实测待移植只减 TALENT 那一份。
// export const PENDING_BASELINE = 53; // 合并态实测（#393 并上含 #392 的 master）：
// 两票摆进 ere/ 的整份文件不相交，60 − 4（#392）− 3（#393）= 53，与
// `node tools/trace-check.mjs --coverage` 的重测一致。数字取自重测而非相加，
// 计数型基线不许靠算（docs/agents/merge-conflicts.md）。
//
// #393 单独实测 60 → 57：本票把 キャラ関数/CHARA_JOB_CHANGE.ERB、
// CHARA_TEMPTATION.ERB、CHARA_MARRIAGE.ERB 三个文件整份摆进 ere/（转职 /
// 魔的诱惑 / 结婚三对按钮与流程），三份从「待移植」直接转「已移植」：-3。
// #392（N8 段 2）把 4 个「待移植」整份摆进
// ere/ —— キャラ関数/CHARA_CUSTOM ver1.0.1.ERB、CHARA_CUSTOM2 ver1.0.1.ERB、
// CHARA_CUSTOM3.ERB、FUNC_CHARA_AND_HAIR.ERB：60 − 4 = 56，与重测一致。
// （同一票把 CHARA_BODY2.ERB 从「已移植」纠正为「部分移植」——它自报的
// @CHAR_BUST_REGENERATE_WAPPED 尚无票，新挂的存根行让本表的分类回到诚实的
// 那一档；该纠正不动待移植分子，故 PENDING 只扣 4。）
// 下面是各票的抬低记录（历史，按票号近远排列）。
// #401 的说明：60 = 合并态实测（并上含 #400 的 master）：
// 62（master）− 2（本票 EVETRAIN.ERB 与 EVENT1.ERB）= 60。#400 不动这个数
// （EVENT_NEXTDAY.ERB 原本就是部分移植），所以两次合并只扣本票这两份。
// 各票自己的说明留在下面。
// #403（N19）不动本数的说明：EVENT_K.ERB（522 行）随本票由**部分移植**转
// 「已移植」（合并态实测：已移植 238 / 部分移植 29 / 待移植 60）——它此前
// 就不在待移植的分子里（有产物 + 清单挂着 9 条未了结存根），把那些行照实
// 收口之后只挪动部分移植那一格，所以本数不变，与 #404 同款。工单正文写的
// 「显式抬低（现 79）」是排期时的旧值。
// master）：62（master）− 2（本票 EVETRAIN.ERB 与 EVENT1.ERB）= 60，与重测
// 一致。各票自己的说明留在下面。
// 两票各自扣的文件不相交，64（master，#394 后）− 2（本票 EVETRAIN.ERB 与
// EVENT1.ERB 两个待移植文件）= 62，与重测值一致。两票的说明都留在下面。
// EVENT/EVETRAIN.ERB（19 行，@EVENTTRAIN 的无属性档，
// ere/event/event-train-normal.js）与 EVENT/EVENT1.ERB（9 行，
// @EVENTCOMEND 的无属性档，ere/event/event-comend-normal.js）两份此前
// 三路证据并集为空，落地后转「已移植」：-2。同票另外两份
// （EVENT_TURNEND.ERB / EVENT_PREGNANCY.ERB）此前已是**部分移植**（有产物、
// 清单里还挂着未了结存根），本就不在待移植的分子里——落地后实测待移植
// 不变（已移植 +4、部分移植 -2，其中 +2 是上面那两份）。
// 工单正文写的「现 79」是排期时的旧值，rebase 后由派单人重测确认为 67。
// 下面的历史说明保留原样，不改写。
// #384 抬低说明（68 → 67，本票独立测得的是 70 → 69 这一格，rebase 后落在
// master 的 68 上）：本票（N2，角色生成链六文件）把
// `キャラ関数/CHARA_NAME_EDIT.ERB`（三个函数：SHOW_BUTTON_NAME_EDIT /
// CHECK_ABLE_TO_NAME_EDIT / CHARA_INFO_NAME_EDIT）整份摆进 ere/，该文件从
// 「待移植」转「已移植」：-1。
// 清单里还挂着 15 行未了结存根），本就不在待移植的分子里——本票把 26 个占位点
// 落成真身、清空这些登记行之后，实测待移植仍是 67（已移植 227、部分移植 34）。
// 工单正文写的「显式抬低 PENDING_BASELINE（现 79）」是排期时的旧值与旧口径。
// 合并态实测（#397 并上含 #394 的 master）：
// 两票各自扣的文件不相交，64（master，#394 后）− 2（本票两个待移植文件）= 62，
// 与重测值一致。两票各自的说明留在下面。
// SHOP/SHOP_2.ERB 两个文件落地真身（ere/page/page-tailor.js 十二函数、
// page-ability-up.js + page-intercept.js + system/stronghold/gohoubi-request.js），
// LIFE_LIST.ERB 的 7 个「登记（未接入）」函数落真身（ere/page/page-life-list.js）
// 使其由部分移植转已移植。算式：67（#384 实测）+ 0（证据面变动）
// − 2（两个待移植文件）= 65。
// 历次说明。**本票独立测得的是 67 → 64 这一格**，rebase 后真值由派单人重跑。
// #394 抬低说明（67 → 64，本票三个文件）：`キャラ関数/CHARA_FIRST_EXP.ERB` 与
// `キャラ関数/CHARA_MAKE_INPORT.ERB` 落真身（chara_first_exp、
// chara_make_inport，两个文件头各带「源:」整路径追溯 + 锚表分片
// tools/trace-refs/chara-first-exp.mjs、chara-make-inport.mjs），两份文件
// 退出「待移植」：-2；`キャラ関数/FULLMOON.ERB` 按 #14 判不实现进 RULINGS
// 表（理由见该表条目），它从「待移植」直接进「已判定不实现」，同样
// 退出待移植分子：-1。三处都是正判据变化（证据面新增 / 裁定表新增），
// 不是顺手改数字。
// #384（N2）rebase 到含 #385/#396/#402 的
// master 后实测：master 68 − 本票 1 = 67，两边的说明都留在下面。
// #396 抬低说明（70 → 68）：SHOP/TAX.ERB与
// SHOP/SHOP_TRAP.ERB 两个文件落地真身（tax_get；item_shop_trap /
// saleitem_check_trap，ere/system/stronghold/tax.js 与
// ere/page/page-shop-trap.js，文件头各带「源:」整路径追溯 + 锚表分片
// tools/trace-refs/tax.mjs、page-shop-trap.mjs），两份文件退出「待移植」：-2。
// #404 不动本数的说明：本票把 `EVENT/ENDING ver 1.0.1.ERB` /
// `EVENT/ENDINGDATA.ERB` / `EVENT/ENDINGDATA_ADDON1.ERB` 三个文件推成
// 「已移植」，但三者此前是**部分移植**（有产物、清单里还挂着未了结存根），
// 本就不在待移植的分子里——落地后实测待移植不变（已移植 +3、部分移植 -3）。
// 工单正文写的「现 79」是排期时的旧值。rebase 到含 #396 的 master 后由派单人
// 重测确认为 68：#404 与 #396 的改动面完全不重叠，两边各自的 -0 与 -2 叠加即 68。
// #384 抬低说明（68 → 67，本票独立测得的是 70 → 69 这一格，rebase 后落在
// master 的 68 上）：本票（N2，角色生成链六文件）把
// `キャラ関数/CHARA_NAME_EDIT.ERB`（三个函数：SHOW_BUTTON_NAME_EDIT /
// CHECK_ABLE_TO_NAME_EDIT / CHARA_INFO_NAME_EDIT）整份摆进 ere/，该文件从
// 「待移植」转「已移植」：-1。
// 同票的另外四份**仍是部分移植**（不参与本基线：基线只冻结「待移植」一格）：
//   - `CHARA_NAME.ERB` 已转「已移植」（十个函数全落真身）；
//   - `CHAR_MAKE.ERB` 与 `CHARA_MAKE_INIT.ERB` 仍挂在存根清单的同一行
//     `CHAR_INIT` 上（状态「部分实现（#118）」）——@CHAR_INIT 已接的调用链
//     还依赖 CHAR_BODY_GENERATE_WAPPED 的占位行，那张票是 N3/#385；
//   - `CHARA_MAKE_INHERIT.ERB` 的三处遗留存根（CMI_SETTALENT 等）已落真身，
//     但清单里仍有一行归因在案（同 #118 的 CHAR_INIT）。
// 两处数字都只能重跑工具取：`node tools/trace-check.mjs --coverage`。
// #405 抬低说明（79 → 75）：GET_SPECIALTALENT.ERB／EVENT_ADDICT.ERB／
// EVENT_SABBATH.ERB／EVENT_CHARA_LEAVE.ERB 四个文件落地真身（
// check_specialskil/check_specialskil_bodyshift、aphrodisiac_addict/
// precipitate_withdrawal/suffer_from_withdrawal、sabbath/sabbath_day、
// event_chara_leave/event_chara_return），四份文件退出「待移植」：-4。
// #388 抬低说明（在 #405 基础上再 -1）：CHARA_NAME_INIT.ERB 落表转已移植，75 → 74。
// #391 抬低说明（本票独立测得 79 → 75，与 #405/#388 叠加后的真值见下方
// rebase 说明）：本票把 `キャラ関数/
// CHARA_INFO ver1.0.1.ERB`、`CHARA_INFO_FUNC.ERB`、`CHARA_INFO_FUNC2.ERB`
// 三个文件摆进 ere/（角色信息主屏与个别信息页、能力提升/回复体力/灵魂
// 转移等动作、种族/婚史查询两个 get_look_info 分支接入），直接把这三个
// 文件从「待移植」移到「已移植」（未落地的详情正文 SHOW_CHARA_INFO 属
// 另票、转职/魔的诱惑/结婚/育儿室等十多项按钮登记 STUBBED_CALLS）。另有
// 一处需排除：MOD/一键升级/CHARA_INFO_FUNC.ERB 的 CHARA_INFO_CALLBACK
// 起始行号（:119）在文件头「硬约束七」逐字节比对说明里被引用，若不标记
// 会被三路证据误判成该 MOD 文件已移植——它的 CHARA_INFO_UP_LEVEL 批量
// 购买变体明确不在本票实现（阶段 6 裁定）。该条引用已加 `cite: true`
// （同 #382 对 SHOP_TAILOR.ERB 的处理手法）排除在证据外，MOD 文件正确
// 留在待移植。
// rebase 说明（#391 跟上 master 的 #405/#408/#409/#410）：#405 与 #391 各自
// 独立测得同一个 79→75（各自 -4），是巧合式的同值、不是同一件事——两者
// 涉及的文件完全不重叠（#405 是 GET_SPECIALTALENT/EVENT_ADDICT/
// EVENT_SABBATH/EVENT_CHARA_LEAVE，本票是三个 CHARA_INFO* 文件）。两边数字
// 碰巧相同正是最危险的形态：git 会静默自动合并、连冲突都不报，而「只减不增」
// 只拦比基线大的，取任一边都会把对方的成果白送回去。**这个数只能重跑工具取，
// 不能取任一边、也不能手工相加。** 本票最终值 70 是分三次实测出来的：#405
// 合并后 master 是 75，#410（CHARA_NAME_INIT 落表）再 -1 得 74，本票在此之上
// 再 -4（三个 CHARA_INFO* 文件 ＋ 排除 MOD 重名文件后正判回待移植的那一个）。
// #382 抬高说明（77 → 79，非顺手改数字）：SHOP_TAILOR.ERB／SHOP_2.ERB 曾被
// 三路证据里的锚表 src 误判成「已移植」——锚只是核对调用点回显 / 习语出处，
// 不是这两个文件本身有产物（见 tools/trace-refs/cloth-lookup.mjs、
// stub-line.mjs 新增的 `cite: true` 标记与其注释）。改用 `cite` 区分两种
// 语义后，这两个文件三路证据并集为空，正判退回待移植：+2。同批查实的
// 第三个文件 LIFE_LIST.ERB 未计入这次上抬——它的证据是真的（page-life-
// list.js 的 @SELECT_YES_NO 确实源出该文件，原作里也是跨文件共享函数，
// 见 CHARA_TEMPTATION.ERB 等四处 `CALL SELECT_YES_NO`），只是文件内其余
// 7 个函数此前从未登记进 docs/stub-registry.md，导致「证据 ∩ 未了结存根」
// 那条部分移植判据失效、整份文件被漏判已移植。回填这 7 行登记（本票的
// docs/stub-registry.md 改动）后，它正确落在「部分移植」而非「待移植」
// ——工单原估「待移植 77 → 80」按三个文件等价处理，实测按证据真实性区分
// 后是 +2（79），如何取舍见交付说明。
/**
 * 存根清单「归因不到」行数基线（#331 验收整改冻结，只减不增）。归因不到
 * 的行（待核 / 无源 / 内建函数 / 目录级引用）不构成部分移植信号，本身
 * 合法——但**静默多出来一行**正是「欠账被漏成已实现」的方向：待移植数
 * 与五类合计都不动，其余判据全盲（验收实证：30 行无空格形态被跳过时，
 * MONSTER_DATA.ERB 被报成已移植而无人看见）。冻结后，新增归因不到的行
 * 必须显式抬基线——那是把「这行确实挂不到文件上」写成公告的时机。
 */
export const UNATTRIBUTED_BASELINE = 6; // #350：GET_TATOO 清单行补回准确源文件；
// #383：CSVCSTR 行（源写「Emuera 内建函数」，三路归因规则都够不着）从
// 存根改判已实现后不再进入归因扫描，13 → 12（显式改小，非顺手改数字）。
// #457：BEFORE_AUTOTRAIN 行补回准确源文件（EVENT/EVENT_AUTOTRAIN.ERB:91，
// 原写「調教相關（自动调教）」够不着任何文件），12 → 11（显式改小）。
// #469：CAMPAIGN 族清单行重写时「源」列从目录级（侵略/CAMPAIGN/）落回
// 具体文件（CAMPAIGN_EVENT.ERB 各行号 / DUNGEON.ERB / EQUIP.ERB 调用点），
// 11 → 6（显式改小，#461 合并态实测）。

/** 文件级「已判定不实现」显式表：推翻裁定 = 改这里（每条注明出处）。 */
export const RULINGS = [
  {
    path: 'target/ERB/TITLE.ERB',
    reason:
      '#12：根目录同名 @SYSTEM_TITLE 被引擎忽略（生效版 SYSTEM/TITLE ver1.0.8.ERB）',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT.ERB',
    reason:
      '#103：DUNGEON.ERB 的旧快照拷贝（复制粘贴事故），生效版在迷宮/DUNGEON.ERB',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT_1.ERB',
    reason: '#103：CAMPAIGN_1.ERB 的 0 差异拷贝，14 个函数全库无调用点',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT_EVENT.ERB',
    reason:
      '#103：12 个共享函数以 CAMPAIGN_EVENT.ERB 版为准（@AGENT_MENU 不排期）',
  },
  {
    path: 'target/ERB/口上/EVENT_F1_丽塔.ERB',
    reason: '#251：口上模板残片，不落真身',
  },
  {
    path: 'target/ERB/口上/EVENT_K20_琼 ver1.0.0.ERB',
    reason: '#251：空文件（0 字节），K20 无槽位，不落真身',
  },
  {
    path: 'target/ERB/其他/DATA_FIX.ERB',
    reason:
      'ADR-0006：Emuera 旧档迁移补丁，读旧档已判出界（三行新档语义归读档钩子）',
  },
  {
    path: 'target/ERB/其他/TEST.ERB',
    reason:
      '#14：ENDCHECKDRAGONSIS 与两个旗标换算函数全库无调用者，是开发残留死代码',
  },
  {
    path: 'target/ERB/侵略/GROUP_BATTLE.ERB',
    reason:
      '#470：两个函数零调用点（target/ERB、target/ERH 全库只命中定义行 :4/:78），主循环 :56-59 空转，@GROUP_BATTLE_DEATH_CHECK 的 ATKID/DEFID 全函数无赋值（:95 恒假）——开发残留死代码，登记 #14',
  },
  {
    path: 'target/ERB/キャラ関数/FULLMOON.ERB',
    reason:
      '#394：@FULLMOON_EFFECT 全库零调用者（只命中它自己的定义行），判据就是这一条。文件头 `; CALLBY @WEAPON_RESTORE` 是搬迁前调用点的化石，而 CHAR_ST.ERB:62-66 的活代码只接手了它的一部分：狼人那档的 `CFLAG:11/12 *= 10` 两条照搬并加上了真正的满月窗口 `DAY:2 ∈ [14,16]`，但 CASE 2 里的 `BASE:0/1 = MAXBASE:0/1`（体力气力回满）没有跟过去，`$LABEL_种族` 的其余分支与整个 `$LABEL_种族2` 在活代码里也没有对应物。所以它是被弃用的旧实现，不是被逐字取代',
  },
];

/** 登记行里的死标记：带这些词的登记是完结方式，不算未了结欠账。 */
const DEAD_MARKERS = ['判死', '不移植', '不实现', '不可达', '落空'];

const TARGET_ERB_DIR = 'target/ERB';
const STUB_REGISTRY = 'docs/stub-registry.md';

/** 注释块里的整路径提及（.ERB/.ERH，大小写不敏感） */
const PATH_RE =
  /target\/ERB\/[^\s'"`，、；;)）】」』]*?\.ER[BH](?=$|[\s'"`，、；;)）】」』])/gi;

/** 范围式引用：<dir>/<stem><N><rest>.ER[BH] 至 <同目录>.ER[BH] */
const RANGE_RE =
  /(target\/ERB\/[^*?\s'"`，、；;)）]+?\.ER[BH])\s*至\s*([^\s'"`，、；;)）]+?\.ER[BH])/g;

// —— 工具 ——

export function list_erb_files(repo) {
  const out = [];
  const stack = [TARGET_ERB_DIR];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(repo, cur)).sort()) {
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(repo, rel)).isDirectory()) {
        stack.push(rel);
      } else if (/\.er[bh]$/i.test(name)) {
        out.push(rel);
      }
    }
  }
  out.sort();
  return out;
}

function list_js_comment_blocks(dir_rel, repo) {
  const files = [];
  const stack = [dir_rel];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(repo, cur)).sort()) {
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(repo, rel)).isDirectory()) {
        stack.push(rel);
      } else if (name.endsWith('.js')) {
        files.push(rel);
      }
    }
  }
  files.sort();
  const out = [];
  for (const rel of files) {
    const text = fs.readFileSync(path.join(repo, rel), 'utf8');
    // 块注释（含文件头 jsdoc 与函数级 jsdoc）
    for (const m of text.matchAll(/\/\*[\s\S]*?\*\//g)) {
      out.push({ rel, text: m[0] });
    }
    // 文件起首连续 // 行（无 jsdoc 头的文件）
    if (!text.startsWith('/*')) {
      const head = [];
      for (const line of text.split(/\r?\n/)) {
        if (!line.startsWith('//')) break;
        head.push(line);
      }
      if (head.length > 0) out.push({ rel, text: head.join('\n') });
    }
  }
  return out;
}

function is_wildcard_mention(p) {
  return p.includes('<N>') || p.includes('*');
}

/**
 * 范围展开：把「A 至 B」按数字段枚举成同目录真实文件。
 * 只信两边同目录、同 stem、数字递增（≤200）的范围；枚举出的文件必须真实存在。
 */
export function expand_range_mentions(mentions, files_set) {
  const out = new Set();
  for (const mention of mentions) {
    for (const m of mention.text.matchAll(RANGE_RE)) {
      const [, a, b] = m;
      // 两端各自取「目录 / 词干 / 数字」；b 常省目录（com-service.js:4 的
      // 「COMF30_手淫.ERB 至 COMF38_足コキ.ERB」），词干必须一致才展开
      const ma = a.match(/^(.*)\/([^/]*?)(\d+)[^/]*\.ER[BH]$/i);
      const mb = b.match(/^(?:(.*)\/)?([^/]*?)(\d+)[^/]*\.ER[BH]$/i);
      if (!ma || !mb) continue;
      const dir = mb[1] ?? ma[1];
      const stem = ma[2];
      const from = Number(ma[3]);
      const to = Number(mb[3]);
      if (
        !stem ||
        ma[1] !== dir ||
        mb[2] !== stem ||
        to < from ||
        to - from > 200
      ) {
        continue;
      }
      for (let k = from; k <= to; k += 1) {
        const prefix = `${dir}/${stem}${k}`;
        for (const f of files_set) {
          if (
            f === `${prefix}.ERB` ||
            f === `${prefix}.ERH` ||
            f.startsWith(`${prefix}_`)
          ) {
            out.add(f);
          }
        }
      }
    }
  }
  return out;
}

// —— 存根清单归因 ——

function parse_stub_registry(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith('## 函数级存根'));
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  if (start < 0) {
    throw new Error('docs/stub-registry.md 里找不到「## 函数级存根」表');
  }
  return lines.slice(start + 1, end < 0 ? lines.length : end);
}

function is_outstanding(status) {
  if (status.startsWith('存根') || status.startsWith('部分实现')) return true;
  return (
    status.startsWith('登记（') && !DEAD_MARKERS.some((d) => status.includes(d))
  );
}

/**
 * 把「源」列归因到具体文件。三段匹配，兼容清单的 \_ 转义与 * 代 _：
 *   ① 整路径包含（目录/文件名.ERB）；② 裸文件名全库唯一；③ 前缀速记
 *   （目录/前缀（……）→ 目录下以前缀_ 起头的文件）。
 * 归因不到（待核 / 无源 / 内建函数 / 目录级引用）的行直接跳过：
 * 那些行的欠账挂在别处或无法定位，不构成任何文件的部分移植信号。
 */
export function attribute_stub_rows(repo, files) {
  const text = fs.readFileSync(path.join(repo, STUB_REGISTRY), 'utf8');
  const basenames = new Map();
  for (const f of files) {
    const b = f.slice(`${TARGET_ERB_DIR}/`.length).split('/').pop();
    if (!basenames.has(b)) basenames.set(b, []);
    basenames.get(b).push(f);
  }
  const attributed = new Map();
  let unattributed = 0;
  for (const line of parse_stub_registry(text)) {
    // 行形态两种都认：`| \`FN\``（带空格，254 行）与 `|\`FN\``（无空格，30 行，
    // 含 MONSTER_SETUP / PASSOUT_CHECK / SEIIN_START 等——漏掉即把它们静默
    // 报成已实现。清单是人工维护的表，两种形态 prettier 都判合格，规范化
    // 会在下一次有人手写时重新失效，所以认两种而不是改表）
    if (!/^\|\s*`/.test(line)) continue;
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter((c, i, a) => !(c === '' && (i === 0 || i === a.length - 1)));
    const fn = cells[0].replace(/[`*]/g, '');
    const src = cells[1] ?? '';
    const status = cells[cells.length - 1] ?? '';
    if (!is_outstanding(status)) continue;
    const cell = src.replaceAll('\\_', '_');
    const hits = new Set();
    // ① 整路径包含（* 代 _ 的变体一并试）
    for (const variant of [cell, cell.replaceAll('*', '_')]) {
      for (const f of files) {
        if (variant.includes(f.slice(`${TARGET_ERB_DIR}/`.length))) hits.add(f);
      }
    }
    // ② 裸文件名（全库唯一才认）
    for (const m of cell.matchAll(
      /(?:^|[\s（(／/])([A-Za-z0-9_\- .]+?\.ER[BH])(?=$|[\s:：（(])/g,
    )) {
      const owners = basenames.get(m[1]);
      if (owners?.length === 1) hits.add(owners[0]);
    }
    // ③ 前缀速记：目录/前缀（……）
    const pm = cell.match(/([^\s/（()]+)\/([A-Za-z0-9_\-]+)（/);
    if (pm) {
      const prefix = `${pm[1]}/${pm[2]}`;
      for (const f of files) {
        const base = f.slice(`${TARGET_ERB_DIR}/`.length);
        if (base.startsWith(`${prefix}_`)) hits.add(f);
      }
    }
    if (hits.size === 0) {
      unattributed += 1;
      continue;
    }
    for (const f of hits) {
      if (!attributed.has(f)) attributed.set(f, []);
      attributed.get(f).push(fn);
    }
  }
  return { attributed, unattributed };
}

// —— 主流程 ——

/**
 * 生成移植状态表并打印。返回失败数（0 = 全绿），由调用方决定退出码。
 *
 * @param {{ repo: string, only?: string[], list?: boolean }} opts
 * @returns {number} 失败数
 */
export async function run_coverage({ repo, only = [], list = false }) {
  const failures = [];
  const fail = (msg) => failures.push(msg);
  const scoped = only.length > 0;
  const in_scope = (f) => !scoped || only.some((p) => f.includes(p));

  const files = list_erb_files(repo);
  const files_set = new Set(files);
  const scoped_files = files.filter(in_scope);

  // 证据 (a)：锚表 FILES.refs[].src（与 trace-check 同一加载器，单一真相源）。
  // 锚表也登记非 ERB 的锚源（如 target/資料_非必要無須解壓/ 的旗标文档
  // .txt）——那不是移植对象的证据，静默跳过。
  const { FILES } = await load_trace_refs(DEFAULT_TRACE_REFS_DIR);
  const src_evidence = new Set();
  for (const { refs } of FILES) {
    for (const { src, cite } of refs) {
      if (/\.er[bh]$/i.test(src)) {
        // cite: true——只核对锚（下方 dangling 检查仍执行），不算移植证据；
        // 见文件头「证据 (a)」条。
        if (files_set.has(src)) {
          if (!cite) src_evidence.add(src);
        } else if (!scoped || in_scope(src)) {
          fail(
            `✗ 锚表 src 悬空：${src}（FILES 登记，但 target/ERB/ 下不存在）`,
          );
        }
      }
    }
  }

  // 证据 (b)：ere/ 注释块里的整路径提及
  const mention_evidence = new Set();
  const mentions = [];
  for (const block of list_js_comment_blocks('ere', repo)) {
    if (block.rel === 'ere/era-electron.js') continue; // 引擎 SDK，非移植注释
    for (const m of block.text.matchAll(PATH_RE)) {
      mentions.push({ rel: block.rel, text: block.text, path: m[0] });
    }
  }
  for (const m of mentions) {
    if (is_wildcard_mention(m.path)) continue; // 通配形态，见文件头
    if (files_set.has(m.path)) mention_evidence.add(m.path);
    else if (!scoped || in_scope(m.path)) {
      fail(
        `✗ 证据悬空：${m.rel} 注释提及 ${m.path}，但该文件不存在（拼错路径的移植声明等于没声明）`,
      );
    }
  }

  // 证据 (c)：范围式引用展开
  const range_evidence = expand_range_mentions(mentions, files_set);

  // yml 承载（→ 已移植）
  const yml_carried = new Set(
    files.filter((f) => {
      const m = f.match(/^target\/ERB\/キャラ関数\/CHARA(\d+)\.ERB$/);
      return (
        m !== null && fs.existsSync(path.join(repo, 'yml', `Chara${m[1]}.yml`))
      );
    }),
  );

  // 未了结存根归因（部分移植信号）
  const { attributed, unattributed } = attribute_stub_rows(repo, files);

  const ruled = new Map(RULINGS.map((r) => [r.path, r.reason]));
  const categories = {
    已移植: [],
    部分移植: [],
    已判定不实现: [],
    待移植: [],
    纯声明: [],
  };
  for (const f of scoped_files) {
    if (ruled.has(f)) categories['已判定不实现'].push(f);
    else if (/\.erh$/i.test(f)) categories['纯声明'].push(f);
    else if (yml_carried.has(f)) categories['已移植'].push(f);
    else if (
      src_evidence.has(f) ||
      mention_evidence.has(f) ||
      range_evidence.has(f)
    ) {
      (attributed.has(f) ? categories['部分移植'] : categories['已移植']).push(
        f,
      );
    } else {
      categories['待移植'].push(f);
    }
  }

  // —— 判据 ①③④⑤（scoped 模式跳过全局核对，报告行自报范围） ——
  if (!scoped && files.length !== DENOMINATOR) {
    fail(
      `✗ 分母漂移：target/ERB/ 枚举到 ${files.length} 个 .ERB/.ERH，≠ ${DENOMINATOR}（#329 裁定 3 写死；target/ 是只读输入，变动须显式重新裁定 DENOMINATOR）`,
    );
  }
  for (const r of RULINGS) {
    if (!files_set.has(r.path) && (!scoped || in_scope(r.path))) {
      fail(`✗ 已判定不实现表悬空：${r.path} 不存在（${r.reason}）`);
    }
  }
  const total = Object.values(categories).reduce((s, a) => s + a.length, 0);
  if (!scoped && total !== DENOMINATOR) {
    fail(`✗ 五类合计 ${total} ≠ ${DENOMINATOR}（分类算术失守）`);
  }
  if (!scoped && categories['待移植'].length > PENDING_BASELINE) {
    fail(
      `✗ 待移植 ${categories['待移植'].length} 条，超出 #331 基线 ${PENDING_BASELINE}（只减不增：移植票交付必须显式抬低；超出 = 证据面失效或内容回退）`,
    );
  }
  if (!scoped && unattributed > UNATTRIBUTED_BASELINE) {
    fail(
      `✗ 清单归因不到 ${unattributed} 行，超出 #331 基线 ${UNATTRIBUTED_BASELINE}（只减不增：新行写清「源」列即可归因；确实挂不到文件上时显式抬基线——静默多出的归因不到正是欠账被漏成已实现的方向）`,
    );
  }

  // —— 输出 ——
  const parts = Object.entries(categories).map(([k, v]) => `${k} ${v.length}`);
  const scope_note = scoped
    ? `（本次限定范围：--only ${only.join(',')}，不等于全量核对）`
    : '';
  console.log(
    `移植状态表（#331）：${parts.join('；')}；合计 ${total}/${DENOMINATOR}${scope_note}`,
  );
  if (!scoped) {
    console.log(
      `待移植 ${categories['待移植'].length} / 基线 ${PENDING_BASELINE}（#331 只减不增，每张移植票交付时显式抬低）`,
    );
    console.log(
      `清单归因不到 ${unattributed} 行 / 基线 ${UNATTRIBUTED_BASELINE}（#331 只减不增，新行写清「源」列即可归因）`,
    );
  }
  if (list) {
    for (const [k, v] of Object.entries(categories)) {
      console.log(`—— ${k}（${v.length}）——`);
      for (const f of v.sort()) console.log(`${k} ${f}`);
    }
  }
  for (const msg of failures) console.log(msg);
  if (failures.length > 0) {
    console.log(`✗ 移植状态表 ${failures.length} 项失守${scope_note}`);
  }
  return failures.length;
}
