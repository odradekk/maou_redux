// 内联行号引用校核器（issue #44 验收整改；#48 验收整改起纳入 emuera.log；
// #63 起 ERB 侧补齐同款扫描完整性；#156 起多样本：引用前缀按样本名派生）。
//
// 守什么：ere/ 移植文件正文里的 `// :N 原作片段` 注释，以及 #48 起
// tools/compare 等处指向黄金样本 target/emuera.log 的 `log:N` 注释。文件头
// 的「源: 文件 @函数」在历次验收里靠人核对了，但正文内联引用数量大、成片
// 偏移靠人眼查不出来（#44 实测：偏早 2~30 行；#48 实测：emuera.log 引用
// 26/42 处错——数值读对、行号指错，同一款亏）。
//
// 怎么守：输入一张「js 文件 → 源 ERB」映射 + 每条引用的锚（源文件在所引
// 行上应含的内容）。对每条：
//   1. js 文件里必须仍写着这条 `:N`（引用被删/被改，先红在这里）；
//   2. 源文件的第 N..M 行必须命中锚（行号偏移、源文件漂移，红在这里）。
// emuera.log 引用（LOG_REFS）同款两道，外加第三道**扫描完整性**：
//   3. ere/ tools/ test/ 全部 .js/.mjs 里出现的每个 log:N / emuera.log:N
//      （含区间）都必须在 LOG_REFS 登记——新增引用不登记即红，防绕过。
//      #156 起引用可带**样本名前缀**：`<样本名>-log:行号`（如范围 B 的
//      mainmenu-natural-log:行号）。前缀的样本名必须在 SAMPLES（唯一
//      真相源 tools/compare/samples.js，与 cli --sample 共用——两边映射
//      漂移 = 静默错判）登记，引用锚表按样本名分住在 SAMPLE_LOG_REFS，
//      校核目标是该样本名对应的样本文件。**裸 log:N 与 legacy
//      emuera.log:N 恒等价旧样本 target/emuera.log，存量注释一行不改**；
//      不带前缀写新样本的行号，扫描只会拿它去核旧样本（核对目标错位且
//      不报错）——所以新样本引用必须带前缀（#109 裁定）。
// ERB 侧同款第三道（#63 起）：
//   4. ere/ 全部 .js 注释里出现的每个 :N / :N-M 都必须在 FILES 登记或在
//      tools/trace-exempt.mjs 豁免——新增引用静默失守即红（#63 之前，
//      page-main-menu.js 零登记，派单时已知 3 条引用指错、实审得 7 条，
//      两颗贯通验证都没抓到）。引用形态统一定义为「注释内、冒号前不是词字符/点号/花括号的
//      :数字」——覆盖工单指出的三种写法（行尾 `// :N`、块注释 `* :N`、
//      括号 `（:N）`/`(:N)`）及其复合（斜杠链 `:A/:B`、`@函数名 :N`），
//      同时天然排除 `era.get('base:0:0')` 与注释里的 `deltabase:${cid}:0`
//      一类变量寻址（花括号排除 `}:0` 形态）与 `ERB:2` 一类
//      文件名:行号（后者不进锁：改写它会连坐 mutation-check 的 find 串）。
//      代码侧（注释外）一律不扫：三段寻址 `cflag:${id}:1` 无法与引用区分。
// 豁免清单是 #63 冻结的现有待办（未审计、行号对错未知）：只能变短
//   （本工具内嵌 ERB_EXEMPT_BASELINE 基线固定，超基线即红）、不许过期失效
//   （条目对应的 js 引用消失也红）——两条都在本工具里执行，退出码语义
//   对二者同样生效。行号一律以原始文件为准（emuera.log 是 UTF-8 BOM
//   + CRLF，BOM 不占行）。后来者改代码动了引用：把表里的 ref/锚一起更新，
//   锚对着 target/ 原文重新落位——表本身以源文件为准，不以致动者的记忆
//   为准。
//
// 用法：node tools/trace-check.mjs（全绿退出码 0，任何失配退出码 1）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import samples_module from './compare/samples.js';
import { ERB_EXEMPT } from './trace-exempt.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 样本名 → 样本文件（唯一真相源 tools/compare/samples.js；default 互导拿整
// 份 module.exports，不依赖 CJS 具名导出的静态分析）。
const SAMPLES = samples_module.SAMPLES;

const TRAIN_MAIN = 'target/ERB/調教相關/TRAIN_MAIN.ERB';
const BEFORE_TRAIN = 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB';
const USERCOM = 'target/ERB/調教相關/USERCOM.ERB';
const COMORDER = 'target/ERB/調教相關/COMORDER.ERB';
const COM_REGISTER = 'target/ERB/調教相關/COM_REGISTER.ERB';
const ABL = 'target/ERB/ABL/ABL.ERB';
const CHARA_INFO_SHOW = 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB';
const SHOP = 'target/ERB/SHOP/SHOP ver1.0.2.ERB';
const SHOP_FUNCTION = 'target/ERB/SHOP/SHOP_FUNCTION.ERB';
const TURNEND = 'target/ERB/EVENT/EVENT_TURNEND.ERB';
const NEXTDAY = 'target/ERB/EVENT/EVENT_NEXTDAY.ERB';
const ENDINGDATA = 'target/ERB/EVENT/ENDINGDATA.ERB';
const NEXTMONTH = 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB';
const ENDING = 'target/ERB/EVENT/ENDING ver 1.0.1.ERB';
const SYSTEM = 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB';
const SYSTEM_DATA = 'target/ERB/SYSTEM/SYSTEM_DATA.ERB';
const COMF0 = 'target/ERB/調教相關/COMF0_愛撫.ERB';
// #230（J20）：死斗场与怪物族（COMF200/201/207 各一文件；202-206 五体
// 同构，怪物共用段与菜单/射精块的行号以 COMF202 为基准转录，204/206 的
// 两处独有差异另指本尊）
const COMF200 = 'target/ERB/調教相關/COMF200_コロシアム.ERB';
const COMF201 = 'target/ERB/調教相關/COMF201_助手.ERB';
const COMF202 = 'target/ERB/調教相關/COMF202_最下層民.ERB';
const COMF204 = 'target/ERB/調教相關/COMF204_オーク.ERB';
const COMF206 = 'target/ERB/調教相關/COMF206_トロル.ERB';
const COMF207 = 'target/ERB/調教相關/COMF207_媚薬スライム.ERB';
const COMF1 = 'target/ERB/調教相關/COMF1_クンニ.ERB';
const COMF2 = 'target/ERB/調教相關/COMF2_アナル愛撫.ERB';
const COMF3 = 'target/ERB/調教相關/COMF3_自慰.ERB';
const COMF4 = 'target/ERB/調教相關/COMF4_フェラする.ERB';
const COMF5 = 'target/ERB/調教相關/COMF5_胸愛撫.ERB';
const COMF6 = 'target/ERB/調教相關/COMF6_キス.ERB';
const COMF7 = 'target/ERB/調教相關/COMF7_秘貝開帳.ERB';
const COMF8 = 'target/ERB/調教相關/COMF8_指挿入れ.ERB';
const COMF9 = 'target/ERB/調教相關/COMF9_アナル舐め.ERB';
const COMF10 = 'target/ERB/調教相關/COMF10_振動の宝石.ERB';
const COMF11 = 'target/ERB/調教相關/COMF11_バイブ.ERB';
const COMF12 = 'target/ERB/調教相關/COMF12_振動の杖.ERB';
const COMF13 = 'target/ERB/調教相關/COMF13_アナルワーム.ERB';
const COMF14 = 'target/ERB/調教相關/COMF14_クリキャップ.ERB';
const COMF15 = 'target/ERB/調教相關/COMF15_二プルキャップ.ERB';
const COMF16 = 'target/ERB/調教相關/COMF16_搾乳器.ERB';
const COMF17 = 'target/ERB/調教相關/COMF17_オナホール.ERB';
const COMF18 = 'target/ERB/調教相關/COMF18_シャワー.ERB';
const COMF19 = 'target/ERB/調教相關/COMF19_アナルビーズ.ERB';
const COMABLE = 'target/ERB/調教相關/COMABLE.ERB';
// #227（J17）：触手与自由调教族（COMF100/150/208；ABLE 段在 COMABLE）
const COMF100 = 'target/ERB/調教相關/COMF100_触手召喚.ERB';
const COMF150 = 'target/ERB/調教相關/COMF150_フリー調教.ERB';
const COMF208 = 'target/ERB/調教相關/COMF208_触手.ERB';
const COMF_JUMP = 'target/ERB/調教相關/COMF_JUMP.ERB';
// #226（J16：重度调教族 80-90——@COM/@COM_ABLE/@EQUIP_COM89/TRAIN_MESSAGE/CASE 80）
const COMF80 = 'target/ERB/調教相關/COMF80_イラマチオ.ERB';
const COMF135 = 'target/ERB/調教相關/COMF135_セルフクンニ.ERB';
const COMF30 = 'target/ERB/調教相關/COMF30_手淫.ERB';
const COMF34 = 'target/ERB/調教相關/COMF34_騎乗位.ERB';
const COMF40 = 'target/ERB/調教相關/COMF40_スパンキング.ERB';
const COMF41 = 'target/ERB/調教相關/COMF41_鞭.ERB';
const COMF42 = 'target/ERB/調教相關/COMF42_針.ERB';
const COMF43 = 'target/ERB/調教相關/COMF43_アイマスク.ERB';
const COMF44 = 'target/ERB/調教相關/COMF44_縄.ERB';
const COMF45 = 'target/ERB/調教相關/COMF45_ボールギャグ.ERB';
const COMF46 = 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB';
const COMF47 = 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB';
const COMF48 = 'target/ERB/調教相關/COMF48_足コキする.ERB';
const COMF49 = 'target/ERB/調教相關/COMF49_アナル電極.ERB';
const COMF50 = 'target/ERB/調教相關/COMF50_ローション.ERB';
const COMF51 = 'target/ERB/調教相關/COMF51_媚薬.ERB';
const COMF52 = 'target/ERB/調教相關/COMF52_利尿剤.ERB';
const COMF53 = 'target/ERB/調教相關/COMF53_水晶球.ERB';
const COMF54 = 'target/ERB/調教相關/COMF54_野外プレイ.ERB';
const COMF55 = 'target/ERB/調教相關/COMF55_何もしない.ERB';
const COMF56 = 'target/ERB/調教相關/COMF56_会話する.ERB';
const COMF57 = 'target/ERB/調教相關/COMF57_羞恥プレイ.ERB';
const COMF58 = 'target/ERB/調教相關/COMF58_お風呂場プレイ.ERB';
const COMF59 = 'target/ERB/調教相關/COMF59_新妻プレイ.ERB';
const BENKI = 'target/ERB/調教相關/BENKI.ERB';
const COMF110_ERB = 'target/ERB/調教相關/COMF110_服の着脱.ERB';
const COMF111_ERB = 'target/ERB/調教相關/COMF111_服を破る.ERB';
const COMABLE_ERB = COMABLE;
const MESSAGE_B = 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB';
const FUNC_CLOTH_ERB = 'target/ERB/其他/FUNC_CLOTH.ERB';
const SHOP_TAILOR = 'target/ERB/SHOP/SHOP_TAILOR.ERB';
const MESSAGE_A = 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB';
const SOURCE = 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB';
const SUB1 = 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB';
const SUB2 = 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB';
// #216 J6：跨族共用子程序五件套 + SHE 代词（魔改新增/文本校正.ERB）
const COMF_CONDOM_ERB = 'target/ERB/調教相關/COMF_CONDOM.ERB';
const COMF_VAGINASEX_ERB = 'target/ERB/調教相關/COMF_VAGINASEX.ERB';
const COMF_ANALSEX_ERB = 'target/ERB/調教相關/COMF_ANALSEX.ERB';
const PASSOUT_ERB = 'target/ERB/調教相關/PASSOUT.ERB';
const SEIIN_ERB = 'target/ERB/調教相關/SEIIN.ERB';
const TEXT_FIX_ERB = 'target/ERB/魔改新增/文本校正.ERB';
const SHOP_VER = 'target/ERB/SHOP/SHOP ver1.0.2.ERB';
const EVENT_K = 'target/ERB/EVENT/EVENT_K.ERB';
const K0 = 'target/ERB/口上/EVENT_K0_慈愛.ERB';
const K3 = 'target/ERB/口上/EVENT_K3_高貴.ERB';
const K5 = 'target/ERB/口上/EVENT_K5_マオ.ERB';

const EXCOM = 'target/ERB/其他/EXCOM.ERB';
const SELF_CALL_ERB = 'target/ERB/キャラ関数/SELF_CALL.ERB';
const DRAW_MAINMENU = 'target/ERB/SHOP/DRAW_MAINMENU.ERB';
const DUNGEON_INFO2 = 'target/ERB/迷宮/DUNGEON_INFO2.ERB';
const DUNGEON_SETUP = 'target/ERB/迷宮/DUNGEON_SETUP.ERB';
const DRAW_EXT_COMM = 'target/ERB/其他/DRAW_EXT_COMM.ERB';
const TITLE = 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB';
const SHOP_2 = 'target/ERB/SHOP/SHOP_2.ERB';
const INVASION = 'target/ERB/侵略/INVASION.ERB';
const INVASION_EVENT = 'target/ERB/侵略/INVASION_EVENT.ERB';
const ENDING_ERB = 'target/ERB/EVENT/ENDING ver 1.0.1.ERB';
const ENDINGDATA_ADDON1 = 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB';
const CHAR_MAKE = 'target/ERB/キャラ関数/CHAR_MAKE.ERB';
const CHARA_MAKE_ERB = 'target/ERB/キャラ関数/CHARA_MAKE.ERB';
const ENTER_ENEMY_ERB = 'target/ERB/EVENT/ENTER_ENEMY.ERB';
const CHARA_MAKE_INIT = 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB';
const EQUIP_ERB = 'target/ERB/其他/EQUIP.ERB';
const USE_EX_ITEM = 'target/ERB/其他/USE_EX_ITEM.ERB';
const CHAR_ST = 'target/ERB/キャラ関数/CHAR_ST.ERB';
const DUNGEON = 'target/ERB/迷宮/DUNGEON.ERB';
const LABO = 'target/ERB/迷宮/LABO.ERB';
const LABO_MAP = 'target/ERB/迷宮/LABO_MAP.ERB';
const LABO_DUNGEON_MAP = 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB';

const DUNGEON_PARTY = 'target/ERB/迷宮/DUNGEON_PARTY.ERB';
const DUNGEON_RYOUZYOKU_MAN = 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB';
const DUNGEON_RYOUZYOKU_ERB = 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB';
const FLAG_SUMMARY = 'target/資料_非必要無須解壓/eramaouフラグまとめ.txt';
const DUNGEON_BITCH_ERB = 'target/ERB/迷宮/DUNGEON_BITCH.ERB';
const DUNGEON_BITCH_LOG_ERB = 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB';
const LOOK_ERB = 'target/ERB/キャラ関数/LOOK.ERB';
const BATLLE = 'target/ERB/迷宮/DUNGEON_BATLLE.ERB';
const BATLLE2 = 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB';
const MONSTER_DATA_ERB = 'target/ERB/怪物相關/MONSTER_DATA.ERB';
const ENEMY_DATA_ERB = 'target/ERB/侵略/ENEMY_DATA.ERB';
const DUNGEON_TRAP_ERB = 'target/ERB/迷宮/DUNGEON_TRAP.ERB';
const DUNGEON_AFTER_ERB = 'target/ERB/迷宮/DUNGEON_AFTER.ERB';
const DUNGEON_TOWN_ERB = 'target/ERB/迷宮/DUNGEON_TOWN.ERB';
const DUNGEON_QUEST_ERB = 'target/ERB/迷宮/DUNGEON_QUEST.ERB';
const LVUP_ERB = 'target/ERB/迷宮/LVUP.ERB';
const DUNGEON_DAILY_ERB = 'target/ERB/迷宮/DUNGEON_DAILY.ERB';
const DUNGEON_ROOM_ERB = 'target/ERB/迷宮/DUNGEON_ROOM.ERB';
const FRAUD_ERB = 'target/ERB/魔改新增/诈骗陷阱.ERB';
const TEXT_CORRECT_ERB = 'target/ERB/魔改新增/文本校正.ERB';
const AFTER_TRAIN = 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB';
const AUTO_TRAIN = 'target/ERB/EVENT/EVENT_AUTOTRAIN.ERB';

// —— 映射表：js 文件 → [{ src, ref: 'N' | 'N-M', any: [锚…（任一命中即可）] }] ——
// 锚是对源文件所引行的正则；范围引用只要 [N, M] 内任一行命中任一锚。
const FILES = [
  // —— #219（J9 爱抚系 0-9）：COM1-9 真身 / COM_ABLE0-9 / TRAIN_MESSAGE_B/A
  //    分支 / GET_ADV_COM 规则的全部行号引用（锚文本 = ERB 区间内首个
  //    非注释行的整行字面） ——
  {
    js: 'ere/system/train/com-caress.js',
    refs: [
      // —— target/ERB/調教相關/COMF0_愛撫.ERB ——
      { src: COMF0, ref: '7-168', any: [/@COM0/] },
      { src: COMF0, ref: '9', any: [/PRINTL 爱抚/] },
      { src: COMF0, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF0, ref: '16-17', any: [/LOSEBASE:0 \+= 5/] },
      { src: COMF0, ref: '20-30', any: [/SOURCE:0 = 0/] },
      { src: COMF0, ref: '33', any: [/IF ABL:0 == 0/] },
      { src: COMF0, ref: '35', any: [/SOURCE:3 = 25/] },
      { src: COMF0, ref: '36-55', any: [/ELSEIF ABL:0 == 1/] },
      { src: COMF0, ref: '56-75', any: [/SOURCE:3 \+= 25/] },
      {
        src: COMF0,
        ref: '76-121',
        any: [
          /IF  \(STAIN:0 \& 1 \|\| STAIN:0 \& 4 \|\| STAIN:0 \& 8 \|\| STAIN:0 \& 32\) \&\& ASSIPLAY/,
        ],
      },
      { src: COMF0, ref: '122-128', any: [/SIF TEQUIP:89/] },
      { src: COMF0, ref: '130-134', any: [/STAIN:1 \|= 2/] },
      { src: COMF0, ref: '136-140', any: [/STAIN:3 \|= STAIN:PLAYER:1/] },
      { src: COMF0, ref: '141', any: [/STAIN:PLAYER:1 \|= STAIN:5/] },
      { src: COMF0, ref: '142', any: [/ENDIF/] },
      {
        src: COMF0,
        ref: '148',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: COMF0,
        ref: '148-156',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      { src: COMF0, ref: '149', any: [/PRINTS EXPNAME:40/] },
      { src: COMF0, ref: '150-174', any: [/PRINTL \+5/] },
      { src: COMF0, ref: '158-166', any: [/E = 2/] },
      { src: COMF0, ref: '168', any: [/RETURN 1/] },
      { src: COMF0, ref: '176-177', any: [/PRINT ≪摸来摸去≫/] },
      { src: COMF0, ref: '181-182', any: [/LOSEBASE:0 \+= 1/] },
      { src: COMF0, ref: '185-186', any: [/SOURCE:0 = 0/] },
      { src: COMF0, ref: '187-190', any: [/SOURCE:17 = 0/] },
      { src: COMF0, ref: '191-195', any: [/SOURCE:4 = 60/] },
      { src: COMF0, ref: '198-200', any: [/IF ABL:0 == 0/] },
      { src: COMF0, ref: '201-203', any: [/ELSEIF ABL:0 == 1/] },
      { src: COMF0, ref: '204-221', any: [/ELSEIF ABL:0 == 2/] },
      { src: COMF0, ref: '222-227', any: [/ELSEIF ABL:1 == 1/] },
      { src: COMF0, ref: '228-230', any: [/ELSEIF ABL:1 == 3/] },
      { src: COMF0, ref: '231-233', any: [/ELSEIF ABL:1 == 4/] },
      // —— target/ERB/調教相關/COMF1_クンニ.ERB ——
      { src: COMF1, ref: '8-86', any: [/LOCAL = 1/] },
      { src: COMF1, ref: '12-17', any: [/LOCAL = 1/] },
      { src: COMF1, ref: '19', any: [/PRINTL 舔阴/] },
      { src: COMF1, ref: '21', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF1, ref: '26', any: [/LOSEBASE:0 \+= 5/] },
      { src: COMF1, ref: '27', any: [/LOSEBASE:1 \+= 50/] },
      { src: COMF1, ref: '29', any: [/SOURCE:10 = 100/] },
      { src: COMF1, ref: '31', any: [/SOURCE:14 = 50/] },
      { src: COMF1, ref: '34-43', any: [/IF ABL:0 == 0/] },
      { src: COMF1, ref: '44-47', any: [/ELSE/] },
      { src: COMF1, ref: '49-50', any: [/IF TALENT:PLAYER:52 \|\| TEQUIP:89/] },
      { src: COMF1, ref: '51-52', any: [/SOURCE:16 \+= SOURCE:0\/20/] },
      { src: COMF1, ref: '55-59', any: [/SIF TEQUIP:89/] },
      { src: COMF1, ref: '62-65', any: [/STAIN:3 \|= STAIN:PLAYER:0/] },
      {
        src: COMF1,
        ref: '69-73',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      { src: COMF1, ref: '76', any: [/IF CFLAG:PLAYER:16 == \-1/] },
      // —— target/ERB/調教相關/COMF2_アナル愛撫.ERB ——
      { src: COMF2, ref: '8-152', any: [/PRINTL 肛门爱抚/] },
      { src: COMF2, ref: '16', any: [/LOSEBASE:0 \+= 20/] },
      { src: COMF2, ref: '17', any: [/LOSEBASE:1 \+= 100/] },
      { src: COMF2, ref: '20', any: [/SOURCE:14 = 200/] },
      { src: COMF2, ref: '23-43', any: [/IF ABL:3 == 0/] },
      { src: COMF2, ref: '44-65', any: [/IF EXP:1 < EXPLV:1/] },
      { src: COMF2, ref: '66-81', any: [/SOURCE:6 = 100/] },
      { src: COMF2, ref: '82-93', any: [/ELSEIF PALAM:3 < PALAMLV:3/] },
      { src: COMF2, ref: '94-96', any: [/ENDIF/] },
      { src: COMF2, ref: '97-106', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF2, ref: '107-110', any: [/TIMES SOURCE:2 , 1\.30/] },
      { src: COMF2, ref: '111-113', any: [/TIMES SOURCE:13, 1\.60/] },
      { src: COMF2, ref: '115-126', any: [/SIF TALENT:263/] },
      { src: COMF2, ref: '127-141', any: [/TIMES SOURCE:14 , 0\.60/] },
      { src: COMF2, ref: '143-150', any: [/IF TEQUIP:90/] },
      { src: COMF2, ref: '151', any: [/ENDIF/] },
      { src: COMF2, ref: '156', any: [/S = 0/] },
      { src: COMF2, ref: '158-164', any: [/IF ABL:3 <= 1/] },
      { src: COMF2, ref: '165-169', any: [/S = 4/] },
      {
        src: COMF2,
        ref: '173',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      // —— target/ERB/調教相關/COMF3_自慰.ERB ——
      { src: COMF3, ref: '14-31', any: [/LOCAL = 3/] },
      { src: COMF3, ref: '14-379', any: [/LOCAL = 3/] },
      { src: COMF3, ref: '32-189', any: [/IF TEQUIP:11 \&\& TEQUIP:13/] },
      { src: COMF3, ref: '161-162', any: [/PRINT  \-/] },
      { src: COMF3, ref: '190', any: [/PRINTV A/] },
      { src: COMF3, ref: '194-201', any: [/V = 33/] },
      { src: COMF3, ref: '204-211', any: [/SIF A < V/] },
      { src: COMF3, ref: '216-223', any: [/SIF A < V/] },
      { src: COMF3, ref: '228-235', any: [/LOSEBASE:0 \+= 5/] },
      { src: COMF3, ref: '238-253', any: [/IF TEQUIP:53/] },
      { src: COMF3, ref: '254-259', any: [/SOURCE:12 = 2600/] },
      { src: COMF3, ref: '260-265', any: [/ELSEIF ABL:0 == 4/] },
      { src: COMF3, ref: '266-272', any: [/SOURCE:12 = 3500/] },
      { src: COMF3, ref: '273-279', any: [/ELSEIF ABL:1 == 1/] },
      { src: COMF3, ref: '280-286', any: [/SOURCE:17 = 1100/] },
      { src: COMF3, ref: '288-294', any: [/IF ABL:2 == 0/] },
      { src: COMF3, ref: '295-301', any: [/A \+= 300/] },
      { src: COMF3, ref: '302-309', any: [/D \+= 1000/] },
      { src: COMF3, ref: '310-335', any: [/IF EXP:0 < EXPLV:2/] },
      { src: COMF3, ref: '336', any: [/ENDIF/] },
      { src: COMF3, ref: '339', any: [/IF TEQUIP:13/] },
      { src: COMF3, ref: '344-361', any: [/IF ABL:3 == 0/] },
      { src: COMF3, ref: '344', any: [/IF ABL:3 == 0/] },
      { src: COMF3, ref: '345', any: [/B \+= 40/] },
      { src: COMF3, ref: '346', any: [/D \+= 150/] },
      { src: COMF3, ref: '347', any: [/ELSEIF ABL:3 == 1/] },
      { src: COMF3, ref: '348', any: [/B \+= 120/] },
      { src: COMF3, ref: '349', any: [/D \+= 400/] },
      { src: COMF3, ref: '350', any: [/ELSEIF ABL:3 == 2/] },
      { src: COMF3, ref: '351', any: [/B \+= 300/] },
      { src: COMF3, ref: '352-355', any: [/D \+= 700/] },
      { src: COMF3, ref: '356-371', any: [/ELSEIF ABL:3 == 4/] },
      { src: COMF3, ref: '372-380', any: [/TIMES B , 1\.10/] },
      { src: COMF3, ref: '381-408', any: [/TIMES B , 1\.60/] },
      { src: COMF3, ref: '409-437', any: [/SOURCE:0 = 800/] },
      { src: COMF3, ref: '438', any: [/D = 500/] },
      { src: COMF3, ref: '439', any: [/ELSEIF ABL:2 == 4/] },
      { src: COMF3, ref: '440-511', any: [/SOURCE:1 = 400/] },
      { src: COMF3, ref: '512-515', any: [/ELSE/] },
      { src: COMF3, ref: '516-531', any: [/ENDIF/] },
      { src: COMF3, ref: '532-584', any: [/C \+= 300/] },
      { src: COMF3, ref: '586-633', any: [/SIF TALENT:100/] },
      { src: COMF3, ref: '634-686', any: [/TIMES B , 1\.00/] },
      { src: COMF3, ref: '687-734', any: [/TIMES SOURCE:2 , 1\.00/] },
      { src: COMF3, ref: '735-761', any: [/TIMES SOURCE:0 , 1\.50/] },
      { src: COMF3, ref: '762-788', any: [/TIMES SOURCE:12, 1\.20/] },
      { src: COMF3, ref: '789-824', any: [/TIMES SOURCE:2 , 1\.70/] },
      { src: COMF3, ref: '826-828', any: [/PALAM:3 \/= 2/] },
      { src: COMF3, ref: '833-849', any: [/IF TEQUIP:53 \|\| TEQUIP:54/] },
      {
        src: COMF3,
        ref: '851-858',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      { src: COMF3, ref: '859-885', any: [/ENDIF/] },
      { src: COMF3, ref: '888', any: [/IF ABL:0 == 0/] },
      { src: COMF3, ref: '889', any: [/SOURCE:0 = 15/] },
      { src: COMF3, ref: '890-898', any: [/SOURCE:12 = 2000/] },
      { src: COMF3, ref: '899', any: [/SOURCE:13 = 1200/] },
      { src: COMF3, ref: '900', any: [/ELSEIF ABL:0 == 3/] },
      // —— target/ERB/調教相關/COMF4_フェラする.ERB ——
      { src: COMF4, ref: '9-75', any: [/LOCAL = 4/] },
      { src: COMF4, ref: '18', any: [/PRINTL 口交\(主\)/] },
      { src: COMF4, ref: '25', any: [/LOSEBASE:0 \+= 5/] },
      { src: COMF4, ref: '28', any: [/SOURCE:12 = 220/] },
      { src: COMF4, ref: '32-41', any: [/IF ABL:0 == 0/] },
      { src: COMF4, ref: '42-45', any: [/ELSE/] },
      { src: COMF4, ref: '47-48', any: [/IF TALENT:PLAYER:52 \|\| TEQUIP:89/] },
      { src: COMF4, ref: '53-61', any: [/SIF TEQUIP:89/] },
      {
        src: COMF4,
        ref: '67-70',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: COMF4,
        ref: '71',
        any: [/ELSEIF TALENT:122 == 1 \&\& TALENT:PLAYER:122 == 1/],
      },
      { src: COMF4, ref: '72', any: [/PRINTS EXPNAME:41/] },
      { src: COMF4, ref: '73-78', any: [/PRINTL \+3/] },
      { src: COMF4, ref: '79', any: [/CFLAG:PLAYER:16 = 201/] },
      { src: COMF4, ref: '108-110', any: [/A = NO:PLAYER/] },
      { src: COMF4, ref: '111-112', any: [/RETURN 0/] },
      {
        src: COMF4,
        ref: '113-114',
        any: [/SIF ABL:0 <= 4 \|\| TEQUIP:90 \|\| TEQUIP:89/],
      },
      { src: COMF4, ref: '116', any: [/SIF RELATION:TARGET:A < 150/] },
      { src: COMF4, ref: '117', any: [/RETURN 0/] },
      {
        src: COMF4,
        ref: '118',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%的阴茎被吸啜着，%SAVESTR:TARGET%开始精通这个了…/,
        ],
      },
      // —— target/ERB/調教相關/COMF5_胸愛撫.ERB ——
      { src: COMF5, ref: '11-103', any: [/LOCAL = 5/] },
      { src: COMF5, ref: '34-44', any: [/IF ABL:1 == 0/] },
      { src: COMF5, ref: '45-46', any: [/SOURCE:3 = 200/] },
      { src: COMF5, ref: '47-51', any: [/SOURCE:17 = 2000/] },
      { src: COMF5, ref: '52-56', any: [/ENDIF/] },
      {
        src: COMF5,
        ref: '59-81',
        any: [/IF TALENT:PLAYER:131 \&\& TEQUIP:89 == 0/],
      },
      { src: COMF5, ref: '82-84', any: [/TIMES SOURCE:17 , 1\.40/] },
      { src: COMF5, ref: '87-88', any: [/STAIN:5 \|= STAIN:PLAYER:0/] },
      { src: COMF5, ref: '89-90', any: [/ENDIF/] },
      { src: COMF5, ref: '92-100', any: [/STAIN:5 \|= STAIN:PLAYER:1/] },
      { src: COMF5, ref: '101-105', any: [/PRINTS EXPNAME:40/] },
      { src: COMF5, ref: '106', any: [/PRINTL \+5/] },
      { src: COMF5, ref: '107', any: [/EXP:41 \+= 5/] },
      { src: COMF5, ref: '116-131', any: [/E = 0/] },
      { src: COMF5, ref: '127-128', any: [/A = NO:PLAYER/] },
      {
        src: COMF5,
        ref: '129-130',
        any: [
          /SIF TALENT:130  \|\| TALENT:100 \|\| TALENT:109 \|\| TALENT:122/,
        ],
      },
      {
        src: COMF5,
        ref: '132-133',
        any: [
          /SIF ABL:1 <= 4 \|\| \(TALENT:110 == 0 \&\& TALENT:114 == 0 \&\& TALENT:119 == 0\) \|\| TEQUIP:90 \|\| TEQUIP:89/,
        ],
      },
      {
        src: COMF5,
        ref: '135-136',
        any: [
          /SIF TALENT:PLAYER:132 == 0 \&\& TALENT:PLAYER:131 == 0 \&\& TALENT:PLAYER:135 == 0/,
        ],
      },
      {
        src: COMF5,
        ref: '138',
        any: [
          /SIF RELATION:TARGET:A < 150 \&\& \(ASSIPLAY \|\| TALENT:85 == 0\)/,
        ],
      },
      { src: COMF5, ref: '139', any: [/RETURN 0/] },
      {
        src: COMF5,
        ref: '140',
        any: [/PRINTFORML %SAVESTR:TARGET%的乳房被玩弄着，里面的母乳漏出来了…/],
      },
      // —— target/ERB/調教相關/COMF6_キス.ERB ——
      { src: COMF6, ref: '9-330', any: [/LOCAL = 6/] },
      { src: COMF6, ref: '12-16', any: [/LOCAL = 6/] },
      { src: COMF6, ref: '24-44', any: [/A = 0/] },
      { src: COMF6, ref: '47-115', any: [/SIF TALENT:61/] },
      { src: COMF6, ref: '118-125', any: [/PRINT  \-/] },
      { src: COMF6, ref: '126-133', any: [/SIF S/] },
      { src: COMF6, ref: '134-141', any: [/IF TALENT:62/] },
      { src: COMF6, ref: '142-153', any: [/IF TALENT:63/] },
      { src: COMF6, ref: '154-159', any: [/PRINTS TALENTNAME:71/] },
      { src: COMF6, ref: '160-166', any: [/SIF S/] },
      {
        src: COMF6,
        ref: '168-174',
        any: [/IF TEQUIP:89 \&\& TALENT:136 == 0/],
      },
      { src: COMF6, ref: '175-182', any: [/ENDIF/] },
      { src: COMF6, ref: '185-191', any: [/SIF STAIN:PLAYER:0 \& 8/] },
      { src: COMF6, ref: '195-202', any: [/SIF TEQUIP:89/] },
      { src: COMF6, ref: '207', any: [/IF Y/] },
      { src: COMF6, ref: '208-214', any: [/PRINT  \-/] },
      { src: COMF6, ref: '215', any: [/PRINT 脏、/] },
      { src: COMF6, ref: '216-238', any: [/PRINTS TALENTNAME:62/] },
      { src: COMF6, ref: '242-258', any: [/SIF A < V/] },
      { src: COMF6, ref: '260', any: [/SOURCE:8 = Y\*20 \+ 10/] },
      { src: COMF6, ref: '263-264', any: [/IF ABL:16 == 0/] },
      { src: COMF6, ref: '265', any: [/SOURCE:5 = 10/] },
      { src: COMF6, ref: '266-310', any: [/TIMES SOURCE:8 , 4\.00/] },
      { src: COMF6, ref: '311', any: [/IF TEQUIP:89/] },
      { src: COMF6, ref: '312', any: [/IF ABL:39 == 0/] },
      { src: COMF6, ref: '313', any: [/TIMES SOURCE:8 , 2\.00/] },
      { src: COMF6, ref: '314-331', any: [/ELSEIF ABL:39 == 1/] },
      { src: COMF6, ref: '332-351', any: [/TFLAG:100 = 1/] },
      { src: COMF6, ref: '352-382', any: [/SOURCE:3 = 150/] },
      {
        src: COMF6,
        ref: '385-434',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: COMF6,
        ref: '387-396',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: COMF6,
        ref: '388',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      { src: COMF6, ref: '389', any: [/PRINTS EXPNAME:40/] },
      { src: COMF6, ref: '390', any: [/PRINTL \+3/] },
      { src: COMF6, ref: '391', any: [/EXP:40 \+= 3/] },
      {
        src: COMF6,
        ref: '392-411',
        any: [/ELSEIF TALENT:122 == 1 \&\& TALENT:PLAYER:122 == 1/],
      },
      { src: COMF6, ref: '398', any: [/;爱情经验/] },
      { src: COMF6, ref: '398-430', any: [/E = 1/] },
      { src: COMF6, ref: '398-434', any: [/E = 1/] },
      { src: COMF6, ref: '400', any: [/E = 1/] },
      { src: COMF6, ref: '404', any: [/E \+= 2/] },
      { src: COMF6, ref: '408', any: [/TFLAG:13 = 1/] },
      { src: COMF6, ref: '412', any: [/E \+= 20/] },
      { src: COMF6, ref: '412-413', any: [/E \+= 20/] },
      { src: COMF6, ref: '414-419', any: [/R = NO:ASSI/] },
      { src: COMF6, ref: '416-419', any: [/SIF RELATION:R == 10/] },
      { src: COMF6, ref: '422', any: [/TFLAG:200 = 1/] },
      { src: COMF6, ref: '424-428', any: [/IF CFLAG:PLAYER:16 == \-1/] },
      {
        src: COMF6,
        ref: '430-434',
        any: [/IF CFLAG:2 >= 1000 \&\& ASSIPLAY == 0/],
      },
      { src: COMF6, ref: '442', any: [/TFLAG:30 \+= 1/] },
      { src: COMF6, ref: '444', any: [/RETURN 1/] },
      // —— target/ERB/調教相關/COMF7_秘貝開帳.ERB ——
      { src: COMF7, ref: '10-11', any: [/SIF TEQUIP:53/] },
      { src: COMF7, ref: '10-245', any: [/SIF TEQUIP:53/] },
      { src: COMF7, ref: '13-131', any: [/PRINTL 自己扒开/] },
      { src: COMF7, ref: '132', any: [/PRINT  \-/] },
      { src: COMF7, ref: '133-140', any: [/A \-= 5/] },
      { src: COMF7, ref: '141-148', any: [/SIF S/] },
      { src: COMF7, ref: '150-157', any: [/IF TALENT:0/] },
      { src: COMF7, ref: '158-165', any: [/A \-= 5/] },
      { src: COMF7, ref: '166-173', any: [/IF TEQUIP:21/] },
      { src: COMF7, ref: '176-182', any: [/PRINT  =/] },
      { src: COMF7, ref: '185-196', any: [/SIF A < V/] },
      { src: COMF7, ref: '197-203', any: [/SIF A < V/] },
      { src: COMF7, ref: '204-336', any: [/LOSEBASE:0 \+= 10/] },
      { src: COMF7, ref: '206', any: [/LOSEBASE:0 \+= 10/] },
      { src: COMF7, ref: '206-212', any: [/LOSEBASE:0 \+= 10/] },
      { src: COMF7, ref: '212', any: [/SOURCE:14 = 400/] },
      { src: COMF7, ref: '214-234', any: [/IF ABL:2 == 0/] },
      { src: COMF7, ref: '215-221', any: [/IF ABL:2 == 0/] },
      { src: COMF7, ref: '222-228', any: [/SOURCE:12 = 2100/] },
      { src: COMF7, ref: '229-235', any: [/SOURCE:13 = 2100/] },
      { src: COMF7, ref: '236-246', any: [/IF ABL:16 == 0/] },
      { src: COMF7, ref: '236-247', any: [/IF ABL:16 == 0/] },
      { src: COMF7, ref: '248-254', any: [/ELSEIF ABL:16 == 4/] },
      { src: COMF7, ref: '248-269', any: [/ELSEIF ABL:16 == 4/] },
      { src: COMF7, ref: '257-274', any: [/IF ABL:17 == 0/] },
      { src: COMF7, ref: '271-276', any: [/TIMES SOURCE:12, 1\.60/] },
      { src: COMF7, ref: '275', any: [/TIMES SOURCE:12, 2\.00/] },
      { src: COMF7, ref: '276-277', any: [/TIMES SOURCE:5, 2\.00/] },
      { src: COMF7, ref: '278', any: [/SOURCE:7 \+= 2500/] },
      {
        src: COMF7,
        ref: '289-291',
        any: [/SIF TALENT:125 == 0 \&\& TALENT:310 <= 20/],
      },
      { src: COMF7, ref: '297-299', any: [/STAIN:1 \|= STAIN:3/] },
      { src: COMF7, ref: '305-327', any: [/IF ABL:17 >= 3/] },
      { src: COMF7, ref: '329-333', any: [/EXP:40 \+= 2/] },
      { src: COMF7, ref: '338', any: [/RETURN 1/] },
      // —— target/ERB/調教相關/COMF8_指挿入れ.ERB ——
      { src: COMF8, ref: '7-146', any: [/@COM8/] },
      { src: COMF8, ref: '9-11', any: [/CALL CONFIRM_LOST_VIRGIN/] },
      { src: COMF8, ref: '17-24', any: [/LOCAL = 8/] },
      { src: COMF8, ref: '32', any: [/LOSEBASE:1 \+= 80/] },
      { src: COMF8, ref: '38', any: [/IF ABL:2 == 0/] },
      { src: COMF8, ref: '39-53', any: [/SOURCE:1 = 10/] },
      { src: COMF8, ref: '54-75', any: [/SOURCE:1 = 1800/] },
      { src: COMF8, ref: '77-78', any: [/TIMES SOURCE:13, 1\.20/] },
      { src: COMF8, ref: '79-94', any: [/ELSE/] },
      { src: COMF8, ref: '95-105', any: [/TIMES SOURCE:1 , 0\.20/] },
      { src: COMF8, ref: '106-115', any: [/TIMES SOURCE:6 , 0\.10/] },
      { src: COMF8, ref: '116-117', any: [/ELSEIF PALAM:5 < PALAMLV:4/] },
      { src: COMF8, ref: '118-120', any: [/ELSEIF PALAM:5 >= PALAMLV:4/] },
      { src: COMF8, ref: '125-135', any: [/IF TALENT:103/] },
      { src: COMF8, ref: '136-149', any: [/SIF EXP:0 == 0 \&\& TALENT:30/] },
      { src: COMF8, ref: '152', any: [/STAIN:PLAYER:1 \|= STAIN:3/] },
      { src: COMF8, ref: '153-157', any: [/ENDIF/] },
      { src: COMF8, ref: '158-162', any: [/S = 0/] },
      { src: COMF8, ref: '164', any: [/ELSEIF ABL:2 <= 7/] },
      // —— target/ERB/調教相關/COMF9_アナル舐め.ERB ——
      { src: COMF9, ref: '7-63', any: [/@COM9/] },
      { src: COMF9, ref: '22', any: [/SOURCE:12 = 300/] },
      { src: COMF9, ref: '23', any: [/SOURCE:14 = 500/] },
      { src: COMF9, ref: '26-35', any: [/IF ABL:3 == 0/] },
      { src: COMF9, ref: '36-41', any: [/ELSE/] },
      { src: COMF9, ref: '42', any: [/EXP:1 \+= 1/] },
      { src: COMF9, ref: '43', any: [/PRINTL 肛门经验＋１/] },
      { src: COMF9, ref: '44', any: [/RETURN 1/] },
      { src: COMF9, ref: '45-49', any: [/ENDIF/] },
      { src: COMF9, ref: '50-51', any: [/SOURCE:16 \+= SOURCE:0\/20/] },
      { src: COMF9, ref: '57-61', any: [/STAIN:4 \|= STAIN:PLAYER:0/] },
      {
        src: COMF9,
        ref: '64',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      { src: COMF9, ref: '65', any: [/PRINTS EXPNAME:40/] },
      { src: COMF9, ref: '66-69', any: [/PRINTL \+3/] },
      { src: COMF9, ref: '70', any: [/EXP:1 \+= 1/] },
      // —— target/ERB/調教相關/COMABLE.ERB ——
      { src: COMABLE, ref: '28-34', any: [/@COM_ABLE0/] },
      { src: COMABLE, ref: '28-381', any: [/@COM_ABLE0/] },
      { src: COMABLE, ref: '30-31', any: [/SIF FLAG:25 \& 1/] },
      { src: COMABLE, ref: '32-33', any: [/SIF TEQUIP:55/] },
      { src: COMABLE, ref: '39-70', any: [/@COM_ABLE1/] },
      { src: COMABLE, ref: '60-66', any: [/RETURN 0/] },
      { src: COMABLE, ref: '71-112', any: [/@COM_ABLE2/] },
      { src: COMABLE, ref: '94-95', any: [/ELSE/] },
      { src: COMABLE, ref: '96-108', any: [/IF  PALAM:3 < PALAMLV:2/] },
      { src: COMABLE, ref: '98-100', any: [/IF TALENT:ASSI:83/] },
      { src: COMABLE, ref: '113-157', any: [/@COM_ABLE3/] },
      {
        src: COMABLE,
        ref: '126-129',
        any: [
          /SIF \(ABL:ASSI:10 <= 3 \|\| ABL:ASSI:22 <= 3\) \&\& TALENT:ASSI:87 == 0/,
        ],
      },
      { src: COMABLE, ref: '158-196', any: [/@COM_ABLE4/] },
      {
        src: COMABLE,
        ref: '170-172',
        any: [/;対象が男人か扶她じゃないとダメ/],
      },
      { src: COMABLE, ref: '181-183', any: [/RETURN 0/] },
      { src: COMABLE, ref: '184-188', any: [/RETURN 0/] },
      { src: COMABLE, ref: '196-216', any: [/@COM_ABLE5/] },
      {
        src: COMABLE,
        ref: '206-207',
        any: [/SIF \(CFLAG:40 \& 6\) \&\& FLAG:37/],
      },
      { src: COMABLE, ref: '217-243', any: [/@COM_ABLE6/] },
      { src: COMABLE, ref: '244-291', any: [/@COM_ABLE7/] },
      { src: COMABLE, ref: '266-267', any: [/SIF TEQUIP:11/] },
      { src: COMABLE, ref: '292-336', any: [/@COM_ABLE8/] },
      {
        src: COMABLE,
        ref: '304-307',
        any: [/IF PALAM:3 < PALAMLV:2 \&\& ASSIPLAY/],
      },
      { src: COMABLE, ref: '326-327', any: [/SIF TALENT:273/] },
      { src: COMABLE, ref: '337-380', any: [/@COM_ABLE9/] },
      { src: COMABLE, ref: '341-344', any: [/RETURN 0/] },
      // —— target/ERB/調教相關/COMF_JUMP.ERB ——
      {
        src: COMF_JUMP,
        ref: '17-28',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: COMF_JUMP,
        ref: '56-66',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\) \&\& TEQUIP:89 == 0/,
        ],
      },
      {
        src: COMF_JUMP,
        ref: '71-81',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: COMF_JUMP,
        ref: '86-119',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: COMF_JUMP,
        ref: '101-107',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      { src: MESSAGE_B, ref: '28-38', any: [/IF SELECTCOM == 0/] },
      { src: MESSAGE_B, ref: '28-782', any: [/IF SELECTCOM == 0/] },
      { src: MESSAGE_B, ref: '28-90', any: [/IF SELECTCOM == 0/] },
      { src: MESSAGE_B, ref: '39-65', any: [/ENDIF/] },
      { src: MESSAGE_B, ref: '66-67', any: [/PRINT 狗的舌头舔舐着/] },
      { src: MESSAGE_B, ref: '68-89', any: [/PRINTFORM %SAVESTR:PLAYER%/] },
      {
        src: MESSAGE_B,
        ref: '90-91',
        any: [
          /PRINTFORML %SAVESTR:TARGET%圆滚滚的腹部里、微微感觉到胎儿在踢脚……/,
        ],
      },
      { src: MESSAGE_B, ref: '94-119', any: [/ELSEIF SELECTCOM == 1/] },
      { src: MESSAGE_B, ref: '94-215', any: [/ELSEIF SELECTCOM == 1/] },
      { src: MESSAGE_B, ref: '94-99', any: [/ELSEIF SELECTCOM == 1/] },
      { src: MESSAGE_B, ref: '99-151', any: [/IF E:307 == 2/] },
      { src: MESSAGE_B, ref: '120-126', any: [/ELSE/] },
      {
        src: MESSAGE_B,
        ref: '127-212',
        any: [/PRINTFORM 温柔仔细地舔舐着%SAVESTR:TARGET%的阴唇/],
      },
      { src: MESSAGE_B, ref: '215-238', any: [/ELSEIF SELECTCOM == 2/] },
      { src: MESSAGE_B, ref: '222-279', any: [/ELSEIF E:307 == 3/] },
      {
        src: MESSAGE_B,
        ref: '239-262',
        any: [/SIF PALAM:5 >= PALAMLV:3 \&\& ABL:3 >= 3/],
      },
      { src: MESSAGE_B, ref: '267-273', any: [/ELSEIF SELECTCOM == 3/] },
      { src: MESSAGE_B, ref: '274-296', any: [/LOCALS:1 = 牝奴/] },
      { src: MESSAGE_B, ref: '297-312', any: [/PRINT 羞耻到脸红耳赤地/] },
      {
        src: MESSAGE_B,
        ref: '307-332',
        any: [
          /IF TEQUIP:11 \&\& TEQUIP:13 \&\& ABL:2 >= 5 \&\& ABL:3 >= 5 \&\& ABL:0 >= 5 \&\& ABL:1 >= 5 \&\& PALAM:5 >= PALAMLV:4 \&\& PREVCOM == 3/,
        ],
      },
      { src: MESSAGE_B, ref: '332-478', any: [/SIF PALAM:5 >= PALAMLV:3/] },
      { src: MESSAGE_B, ref: '349-362', any: [/ELSEIF SELECTCOM == 5/] },
      {
        src: MESSAGE_B,
        ref: '363-410',
        any: [
          /PRINTFORMW 巨魔那粗壮的手指抓起了%SAVESTR:TARGET%的胸部、像榨乳一样使劲揉……/,
        ],
      },
      { src: MESSAGE_B, ref: '385-459', any: [/ELSEIF E:307 == 6/] },
      {
        src: MESSAGE_B,
        ref: '411-423',
        any: [/PRINTFORM 抚摸着%SAVESTR:TARGET%的白皙肌肤、/],
      },
      { src: MESSAGE_B, ref: '424-491', any: [/PRINT 稍小一些的/] },
      { src: MESSAGE_B, ref: '495-498', any: [/ELSEIF SELECTCOM == 6/] },
      { src: MESSAGE_B, ref: '499-532', any: [/PRINTFORML 舔舐变色了……/] },
      { src: MESSAGE_B, ref: '533-536', any: [/PRINTFORML 的她接吻了……/] },
      {
        src: MESSAGE_B,
        ref: '537-547',
        any: [/PRINTFORML 滋滋地吸取着彼此的口水、舌头相互纠缠着……/],
      },
      {
        src: MESSAGE_B,
        ref: '548-566',
        any: [
          /IF ABL:10 >= 2 \&\& EXP:40 >= 1000 \&\& TALENT:PLAYER:122 == 0 \&\& TFLAG:899 == 0/,
        ],
      },
      {
        src: MESSAGE_B,
        ref: '555-646',
        any: [/SIF \(CFLAG:7 \& 16\) \|\| \(CFLAG:7 \& 32\)/],
      },
      { src: MESSAGE_B, ref: '569-581', any: [/ELSEIF SELECTCOM == 7/] },
      { src: MESSAGE_B, ref: '582-600', any: [/ENDIF/] },
      {
        src: MESSAGE_B,
        ref: '588-668',
        any: [/IF CFLAG:40 \& 8 \&\& ABL:17 != 0/],
      },
      { src: MESSAGE_B, ref: '601-605', any: [/PRINT 屈辱到咬牙切齿地、/] },
      { src: MESSAGE_B, ref: '606-608', any: [/IF CFLAG:40 \& 8/] },
      { src: MESSAGE_B, ref: '609-624', any: [/ENDIF/] },
      { src: MESSAGE_B, ref: '660-661', any: [/ELSEIF SELECTCOM == 8/] },
      {
        src: MESSAGE_B,
        ref: '663',
        any: [/IF CFLAG:40 \& 8 \&\& ABL:17 != 0/],
      },
      {
        src: MESSAGE_B,
        ref: '664-668',
        any: [/PRINTFORM %SAVESTR:PLAYER%把%SAVESTR:TARGET%的/],
      },
      { src: MESSAGE_B, ref: '669-694', any: [/ENDIF/] },
      { src: MESSAGE_B, ref: '695-720', any: [/ENDIF/] },
      {
        src: MESSAGE_B,
        ref: '721-726',
        any: [/PRINTFORML %SAVESTR:TARGET%脸色红润、时不时的娇喘两声…/],
      },
      {
        src: MESSAGE_B,
        ref: '727-746',
        any: [
          /PRINTFORML %SAVESTR:TARGET%感受到了手指的感触、努力地忍耐着不让自己叫出声来…/,
        ],
      },
      { src: MESSAGE_B, ref: '740-765', any: [/ELSEIF SELECTCOM == 9/] },
      { src: MESSAGE_B, ref: '740-782', any: [/ELSEIF SELECTCOM == 9/] },
      { src: MESSAGE_B, ref: '766-767', any: [/PRINTL …/] },
      { src: MESSAGE_B, ref: '768-780', any: [/ELSEIF TEQUIP:89/] },
      { src: MESSAGE_B, ref: '783-846', any: [/ELSEIF SELECTCOM == 10/] },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      { src: MESSAGE_A, ref: '130', any: [/ELSEIF SELECTCOM == 21/] },
      {
        src: MESSAGE_A,
        ref: '131',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的私处里、被灌入了怪物黏黏糊糊的精液…/,
        ],
      },
      { src: MESSAGE_A, ref: '156-160', any: [/ELSEIF SELECTCOM == 31/] },
      { src: MESSAGE_A, ref: '161-167', any: [/ENDIF/] },
      { src: MESSAGE_A, ref: '168-184', any: [/SIF TFLAG:7 == 2/] },
      {
        src: MESSAGE_A,
        ref: '185-208',
        any: [/PRINTFORML 精液注入到%SAVESTR:TARGET%的嘴里了…/],
      },
      { src: MESSAGE_A, ref: '228', any: [/ELSEIF SELECTCOM == 123/] },
      { src: MESSAGE_A, ref: '229', any: [/IF TALENT:109/] },
      {
        src: MESSAGE_A,
        ref: '230-238',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%的阴茎、一边享受胸部的按摩、一边在%SAVESTR:TARGET%的嘴里倾泻精液…/,
        ],
      },
      { src: MESSAGE_A, ref: '261-318', any: [/IF ABL:32 >= 3/] },
      {
        src: MESSAGE_A,
        ref: '362',
        any: [/ELSEIF SELECTCOM == 55 \&\& TFLAG:899 <= 1/],
      },
      { src: MESSAGE_A, ref: '363-364', any: [/IF PALAM:5 >= PALAMLV:3/] },
      { src: MESSAGE_A, ref: '365', any: [/SIF PALAM:5 >= PALAMLV:5/] },
      { src: MESSAGE_A, ref: '366-370', any: [/PRINT 、用炽热地目光看向你/] },
      {
        src: MESSAGE_A,
        ref: '746',
        any: [/IF SELECTCOM == 0 \&\& TEQUIP:44 == 0 \&\& TFLAG:899 <= 1/],
      },
      {
        src: MESSAGE_A,
        ref: '746-778',
        any: [/IF SELECTCOM == 0 \&\& TEQUIP:44 == 0 \&\& TFLAG:899 <= 1/],
      },
      { src: MESSAGE_A, ref: '747-749', any: [/A = UP:0/] },
      {
        src: MESSAGE_A,
        ref: '813-985',
        any: [/ELSEIF SELECTCOM == 1  \&\& TFLAG:899 <= 1/],
      },
      {
        src: MESSAGE_A,
        ref: '846-890',
        any: [/ELSEIF SELECTCOM == 2 \&\& TFLAG:899 <= 1/],
      },
      { src: MESSAGE_A, ref: '909-945', any: [/SIF ABL:17 == 5/] },
    ],
  },

  {
    js: 'ere/event/event-train.js',
    refs: [
      // TRAIN_MAIN.ERB @EVENTTRAIN
      {
        src: TRAIN_MAIN,
        ref: '15-16',
        any: [/主人公の射精を0に/, /^BASE:MASTER:2 = 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '17-18',
        any: [/いちおう調教対象と助手も/, /^BASE:TARGET:2 = 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '19-20',
        any: [/^SIF ASSI >= 0$/m, /^\tBASE:ASSI:2 = 0$/m],
      },
      { src: TRAIN_MAIN, ref: '21', any: [/^BASE:TARGET:3 = 0$/m] },
      { src: TRAIN_MAIN, ref: '22', any: [/^BASE:MASTER:4 = 0$/m] },
      {
        src: TRAIN_MAIN,
        ref: '25-27',
        any: [/^REPEAT 200$/m, /^TFLAG:COUNT = 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '32-37',
        any: [/調教者は誰か/, /^IF ASSIPLAY == 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '39-41',
        any: [/记录目标与助手/, /^ASSI:1 = ASSI$/m, /^TARGET:1 = TARGET$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '43-47',
        any: [/时常发情ボーナス/, /^IF TALENT:TARGET:271$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '49-50',
        any: [/死斗场の収入初期化/, /^TFLAG:402 = 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '52-53',
        any: [/初始化TRAIN_NAME/, /^CALL TRAIN_NAME_INIT$/m],
      },
      { src: TRAIN_MAIN, ref: '55', any: [/^CALL PRITRAIN_MESSAGE$/m] },
    ],
  },
  {
    js: 'ere/event/event-com.js',
    refs: [
      { src: TRAIN_MAIN, ref: '264', any: [/^VARSET TFLAG, 0, 0, 30$/m] },
      { src: TRAIN_MAIN, ref: '265', any: [/^TFLAG:100 = 0$/m] },
      { src: TRAIN_MAIN, ref: '267', any: [/^REDRAW 1$/m] },
    ],
  },
  {
    js: 'ere/event/event-comend.js',
    refs: [
      {
        src: TRAIN_MAIN,
        ref: '275-283',
        any: [/^IF BASE:0 <= 0 && !FLAG:35$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '277-279',
        any: [
          /死亡時にビデオを使用していた？/,
          /^SIF TEQUIP:53$/m,
          /^\t\tTFLAG:34 = 1$/m,
        ],
      },
      { src: TRAIN_MAIN, ref: '280', any: [/SAVESTR:TARGET%一动也不动/] },
      {
        src: TRAIN_MAIN,
        ref: '281',
        any: [/SHE\(TARGET\)%做什么都不再有反应/],
      },
      { src: TRAIN_MAIN, ref: '282', any: [/^\tWAIT$/m] },
      { src: TRAIN_MAIN, ref: '283', any: [/^\tBEGIN AFTERTRAIN$/m] },
      {
        src: TRAIN_MAIN,
        ref: '284-289',
        any: [
          /瀕死時に調教を自動終了設定/,
          /^ELSEIF BASE:0 < 500 && FLAG:35$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '285',
        any: [/^ELSEIF BASE:0 < 500 && FLAG:35$/m],
      },
      { src: TRAIN_MAIN, ref: '286', any: [/^\tDRAWLINE$/m] },
      { src: TRAIN_MAIN, ref: '287', any: [/体力到了极限。调教结束。/] },
      { src: TRAIN_MAIN, ref: '288', any: [/^\tWAIT$/m] },
      { src: TRAIN_MAIN, ref: '289', any: [/^\tBEGIN AFTERTRAIN$/m] },
      { src: TRAIN_MAIN, ref: '292', any: [/^IF ASSI > 0$/m] },
      { src: TRAIN_MAIN, ref: '293-301', any: [/^\tIF BASE:ASSI:0 <= 0$/m] },
      { src: TRAIN_MAIN, ref: '294', any: [/^\t\tDRAWLINE$/m] },
      {
        src: TRAIN_MAIN,
        ref: '296-297',
        any: [/^\t\tSIF TEQUIP:53$/m, /^\t\t\tTFLAG:34 = 1$/m],
      },
      { src: TRAIN_MAIN, ref: '298', any: [/SAVESTR:ASSI%一动也不动/] },
      { src: TRAIN_MAIN, ref: '299', any: [/SHE\(TARGET\)/] },
      { src: TRAIN_MAIN, ref: '300', any: [/^\t\tWAIT$/m] },
      { src: TRAIN_MAIN, ref: '301', any: [/^\t\tBEGIN AFTERTRAIN$/m] },
      {
        src: TRAIN_MAIN,
        ref: '302-307',
        any: [
          /^\t;瀕死時に調教を自動終了設定$/m,
          /^\tELSEIF BASE:ASSI:0 < 500$/m,
        ],
      },
      { src: TRAIN_MAIN, ref: '303', any: [/^\tELSEIF BASE:ASSI:0 < 500$/m] },
      { src: TRAIN_MAIN, ref: '304', any: [/^\t\tDRAWLINE$/m] },
      { src: TRAIN_MAIN, ref: '305', any: [/助手体力到了极限/] },
      { src: TRAIN_MAIN, ref: '306', any: [/^\t\tWAIT$/m] },
      { src: TRAIN_MAIN, ref: '307', any: [/^\t\tBEGIN AFTERTRAIN$/m] },
    ],
  },
  {
    js: 'ere/event/event-beforetrain.js',
    refs: [
      { src: BEFORE_TRAIN, ref: '6-201', any: [/@PRITRAIN_MESSAGE/] },
      {
        src: BEFORE_TRAIN,
        ref: '207-270',
        any: [/@PRITRAIN_MESSAGE_NOCLOTHES/],
      },
      { src: BEFORE_TRAIN, ref: '266-323', any: [/@PRITRAIN_MESSAGE_CLOTHED/] },
    ],
  },
  {
    js: 'ere/event/event-aftertrain.js',
    refs: [
      { src: AFTER_TRAIN, ref: '6-85', any: [/@CHARADEAD_CHECK/] },
      { src: AFTER_TRAIN, ref: '100-128', any: [/TARGET/] },
      { src: AFTER_TRAIN, ref: '140-250', any: [/@AFTERTRAIN_SEX_CHECK/] },
      { src: AFTER_TRAIN, ref: '255-349', any: [/@AFTERTRAIN_ANALSEX_CHECK/] },
      { src: AFTER_TRAIN, ref: '354-546', any: [/TALENT:121/] },
      {
        src: AFTER_TRAIN,
        ref: '551-703',
        any: [/@AFTERTRAIN_MASTURBATION_CHECK/],
      },
      { src: AFTER_TRAIN, ref: '708-842', any: [/@AFTERTRAIN_BEASTSEX_CHECK/] },
      // #270：三处与源对齐的内联行号
      { src: AFTER_TRAIN, ref: '231-232', any: [/^TFLAG:13 = 4$/m] },
      { src: AFTER_TRAIN, ref: '480-481', any: [/^TFLAG:13 = 2$/m] },
      { src: AFTER_TRAIN, ref: '669-670', any: [/^TFLAG:13 = 1$/m] },
      { src: AFTER_TRAIN, ref: '837', any: [/^\tJUEL:8 \+= A\*200$/m] },
    ],
  },
  {
    js: 'ere/event/event-autotrain.js',
    refs: [
      { src: AUTO_TRAIN, ref: '11-47', any: [/@AUTOTRAIN/] },
      { src: AUTO_TRAIN, ref: '51-87', any: [/@FORMAT_AUTOTRAIN/] },
      { src: AUTO_TRAIN, ref: '91-104', any: [/@BEFORE_AUTOTRAIN/] },
      { src: AUTO_TRAIN, ref: '108-159', any: [/@AFTER_AUTOTRAIN/] },
    ],
  },
  {
    js: 'ere/event/event-end.js',
    refs: [
      // #215（J5）：调教后衣物处理与再着衣换真身
      { src: TRAIN_MAIN, ref: '360', any: [/^\s*CALL RE_CLOTHED$/m] },
      {
        src: TRAIN_MAIN,
        ref: '316-317',
        any: [/^PRINTL 调教结束了。$/m, /^WAIT$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '319-323',
        any: [/角色復位/, /^MASTER = T:10$/m],
      },
      { src: TRAIN_MAIN, ref: '320', any: [/^MASTER = T:10$/m] },
      { src: TRAIN_MAIN, ref: '321', any: [/^TARGET = T:11$/m] },
      {
        src: TRAIN_MAIN,
        ref: '322-323',
        any: [/^SIF ASSI$/m, /^\tASSI = T:12$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '325-332',
        any: [/失神時の口上非表示の回復/, /^IF TFLAG:860 == 1$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '334-336',
        any: [
          /今回の調教対象と助手を記録/,
          /^FLAG:1 = TARGET:1$/m,
          /^FLAG:2 = ASSI:1$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '338-339',
        any: [/調教後に死んでいる可能性をチェック/, /^CALL CHARADEAD_CHECK$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '341-345',
        any: [/生きていれば調教後行為のチェック/, /^IF RESULT == 0$/m],
      },
      { src: TRAIN_MAIN, ref: '344', any: [/^\tDRAWLINE$/m] },
      {
        src: TRAIN_MAIN,
        ref: '347-354',
        any: [
          /搾乳した母乳の売却/,
          /^CALL SELL_MILK$/m,
          /^CALL SELL_VIDEO$/m,
          /^CALL SELL_FIGHTMONEY$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '356-361',
        any: [/生きていて着衣モードなら/, /^IF FLAG:37 && BASE:0 > 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '363-375',
        any: [
          /調教後に死ぬか臨死状態なら/,
          /^IF BASE:0 < 1 && TARGET != MASTER$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '365-373',
        any: [/キャラ削除処理/, /^DELCHARA A$/m],
      },
      { src: TRAIN_MAIN, ref: '373', any: [/\tDELCHARA A$/m] },
      { src: TRAIN_MAIN, ref: '375', any: [/^\tBEGIN TURNEND$/m] },
      {
        src: TRAIN_MAIN,
        ref: '376-378',
        any: [/魔王换人的处理/, /^CALL MAOU_TENSHIN$/m],
      },
      { src: TRAIN_MAIN, ref: '381-390', any: [/善恶值増減/, /^IF EX:1$/m] },
      { src: TRAIN_MAIN, ref: '383', any: [/私处绝顶使善恶值:-1/] },
      { src: TRAIN_MAIN, ref: '384', any: [/CALL KARMA, TARGET, -1/] },
      { src: TRAIN_MAIN, ref: '388', any: [/肛门绝顶使善恶值:-2/] },
      { src: TRAIN_MAIN, ref: '389', any: [/CALL KARMA, TARGET, -2/] },
      {
        src: TRAIN_MAIN,
        ref: '392-406',
        any: [/时常发情/, /^IF FLAG:75 == 0 && TALENT:271 == 0$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '394-399',
        any: [/潤滑|润滑の10000分の1を蓄積/, /^IF PALAM:3 >= 10000$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '400-405',
        any: [/欲情の10000分の1を蓄積/, /^IF PALAM:5 >= 10000$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '408-418',
        any: [/^LOCAL = 0$/m, /^IF FLAG:400 && TALENT:85$/m],
      },
      { src: TRAIN_MAIN, ref: '410', any: [/因奴隷的愛而回復了気力/] },
      { src: TRAIN_MAIN, ref: '411', any: [/^\tLOCAL = 700$/m] },
      { src: TRAIN_MAIN, ref: '413', any: [/因調教奴隷而回復了気力/] },
      { src: TRAIN_MAIN, ref: '414', any: [/^\tLOCAL = 500$/m] },
      {
        src: TRAIN_MAIN,
        ref: '416-418',
        any: [/^BASE:0:1 \+= LOCAL$/m, /^SIF BASE:0:1 > MAXBASE:0:1$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '420-421',
        any: [/何点数を得られたか/, /^CALL JUEL_CHECK$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '424-426',
        any: [
          /切换回原来的目标与助手/,
          /^ASSI = ASSI:1$/m,
          /^TARGET = TARGET:1$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '428-429',
        any: [/能力値の上昇はメイン画面で行わせる/, /^BEGIN TURNEND$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-turnend.js',
    refs: [
      { src: TURNEND, ref: '8-139', any: [/^@EVENTTURNEND$/m] },
      { src: TURNEND, ref: '13-27', any: [/CHECK_SELLASSIABLE/] },
      { src: TURNEND, ref: '31-51', any: [/完全に死んだ/] },
      { src: TURNEND, ref: '54', any: [/FLAG:0 = 0/] },
      { src: TURNEND, ref: '57', any: [/^IF TIME == 1$/m] },
      { src: TURNEND, ref: '61-74', any: [/IN_VAGINA_EXTRA/] },
      { src: TURNEND, ref: '77', any: [/^\tCALL EVENT_NEXTDAY$/m] },
      { src: TURNEND, ref: '79', any: [/DAY:0 \+= 1/] },
      { src: TURNEND, ref: '79-91', any: [/DAY:0 \+= 1/] },
      { src: TURNEND, ref: '93', any: [/CALL ENTER_ENEMY,0/] },
      { src: TURNEND, ref: '95-107', any: [/SENGENMAX/] },
      { src: TURNEND, ref: '108-120', any: [/SENGEN <= 0/] },
      { src: TURNEND, ref: '121-125', any: [/FOR EFFECT/] },
      { src: TURNEND, ref: '112', any: [/^\t\tCALL ENTER_ENEMY$/m] },
      { src: TURNEND, ref: '114', any: [/^\t\tCALL ENTER_ENEMY$/m] },
      { src: TURNEND, ref: '116', any: [/^\t\tCALL ENTER_ENEMY$/m] },
      { src: TURNEND, ref: '123', any: [/^\t\t\tCALL ENTER_ENEMY$/m] },
      { src: TURNEND, ref: '126-128', any: [/TIME = 1/] },
      { src: TURNEND, ref: '131', any: [/CALL AUTO_BUYING/] },
      { src: TURNEND, ref: '134-135', any: [/TARGET = -1/] },
      { src: TURNEND, ref: '137-138', any: [/DEBUG_CHECK/] },
      { src: TURNEND, ref: '140', any: [/^BEGIN SHOP$/m] },
      { src: TURNEND, ref: '145-167', any: [/^@AUTO_BUYING$/m] },
      { src: TURNEND, ref: '170-334', any: [/^@DEBUG_CHECK$/m] },
      { src: SYSTEM, ref: '234-760', any: [/^@EVENTTURNEND$/m] },
      { src: SYSTEM, ref: '758', any: [/^BEGIN SHOP$/m] },
    ],
  },
  {
    // @EVENTTURNEND 普通档（#114 回合结算本体）——体系同上，源是 SYSTEM
    js: 'ere/system/turnend-settle.js',
    refs: [
      { src: SYSTEM, ref: '234-760', any: [/^@EVENTTURNEND$/m] },
      { src: SYSTEM, ref: '244-247', any: [/TARGET_POOL/] },
      { src: SYSTEM, ref: '250-258', any: [/FORMAT_AUTOTRAIN/] },
      { src: SYSTEM, ref: '263', any: [/^CALL PARTY_UNITE$/m] },
      { src: SYSTEM, ref: '265-272', any: [/WEAPON_RESTORE/] },
      { src: SYSTEM, ref: '274-296', any: [/キャンペーン終了後のリセット/] },
      { src: SYSTEM, ref: '286-296', any: [/DUNGEON_MAP/] },
      { src: SYSTEM, ref: '298-299', any: [/CALL LVUP, A/] },
      { src: SYSTEM, ref: '302', any: [/DUNGEON_AFTER/] },
      { src: SYSTEM, ref: '304-352', any: [/体力の回復/] },
      { src: SYSTEM, ref: '314-326', any: [/W:8 = 4/] },
      { src: SYSTEM, ref: '328-330', any: [/TALENT:A:314/] },
      { src: SYSTEM, ref: '332-334', any: [/HEAL \/= 30/] },
      { src: SYSTEM, ref: '336-340', any: [/休憩フラグ/] },
      { src: SYSTEM, ref: '341', any: [/CFLAG:A:4 = 0/] },
      { src: SYSTEM, ref: '343-348', any: [/快速回复/] },
      { src: SYSTEM, ref: '354-384', any: [/気力の回復/] },
      { src: SYSTEM, ref: '386-388', any: [/場所のリセット/] },
      { src: SYSTEM, ref: '390-413', any: [/容易陷落付与/] },
      { src: SYSTEM, ref: '415-431', any: [/@WEAPON_RESTORE/] },
      { src: SYSTEM, ref: '433-437', any: [/経験増加/] },
      { src: SYSTEM, ref: '439-449', any: [/攻撃防御減少/] },
      { src: SYSTEM, ref: '451-494', any: [/CFLAG:A:570/] },
      { src: SYSTEM, ref: '496-523', any: [/洗脳/] },
      { src: SYSTEM, ref: '525-528', any: [/好感度減少/] },
      { src: SYSTEM, ref: '530-547', any: [/妄想支援/] },
      { src: SYSTEM, ref: '548-582', any: [/TALENT:A:310 < TALENT:A:311/] },
      { src: SYSTEM, ref: '589-609', any: [/自動處刑/] },
      { src: SYSTEM, ref: '611-617', any: [/SKIP中断/] },
      { src: SYSTEM, ref: '619', any: [/CALL LVUP, 0/] },
      { src: SYSTEM, ref: '623', any: [/^PRINTL$/m] },
      { src: SYSTEM, ref: '624-699', any: [/人间界的军队反抗着魔王军的侵略/] },
      // #119 接线的八个调用点（四领域 × 未征服/征服后反抗两臂）
      { src: SYSTEM, ref: '631', any: [/CALL KYOTEN_EVENT, 1/] },
      { src: SYSTEM, ref: '640', any: [/CALL KYOTEN_EVENT, 1/] },
      { src: SYSTEM, ref: '650', any: [/CALL KYOTEN_EVENT, 2/] },
      { src: SYSTEM, ref: '659', any: [/CALL KYOTEN_EVENT, 2/] },
      { src: SYSTEM, ref: '669', any: [/CALL KYOTEN_EVENT, 3/] },
      { src: SYSTEM, ref: '678', any: [/CALL KYOTEN_EVENT, 3/] },
      { src: SYSTEM, ref: '688', any: [/CALL KYOTEN_EVENT, 4/] },
      { src: SYSTEM, ref: '697', any: [/CALL KYOTEN_EVENT, 4/] },
      { src: SYSTEM, ref: '702-718', any: [/魔王の回復/] },
      { src: SYSTEM, ref: '721', any: [/CAMPAIGN_GAMEOVER/] },
      { src: SYSTEM, ref: '723', any: [/TARGET = TARGET_POOL/] },
      { src: SYSTEM, ref: '725-737', any: [/CALL BENKI/] },
      { src: SYSTEM, ref: '729', any: [/^\s*CALL BENKI,A$/m] },
      { src: SYSTEM, ref: '740', any: [/^CALL AUTOTRAIN$/m] },
      { src: SYSTEM, ref: '743', any: [/^CALL PARTY_JOIN$/m] },
      { src: SYSTEM, ref: '745-746', any: [/GEO_OUTPUT_2/] },
      { src: SYSTEM, ref: '749-751', any: [/EVENT_NEWDAY/] },
      { src: SYSTEM, ref: '753-758', any: [/TARGET = FLAG:1/] },
    ],
  },
  {
    // @EVENTTURNEND 的空 #LATER 定义（#114 按 1:1 保留为空）
    js: 'ere/event/event-turnend-later.js',
    refs: [{ src: ENDING, ref: '1-3', any: [/^@EVENTTURNEND$/m, /^#LATER$/m] }],
  },
  {
    // @EVENTLOAD 读档钩子（#137）：SYSTEM ver1.0.3.ERB 的逐行处置 +
    // DATA_FIX 三行出处（判定依据见 event-load.js 文件头）；SYSTEM_DATA
    // 的活钳制行（:74-75，@SYSTEM_LOADGAME 侧）是对照引用
    js: 'ere/event/event-load.js',
    refs: [
      { src: SYSTEM, ref: '760-778', any: [/@EVENTLOAD/] },
      { src: SYSTEM, ref: '761', any: [/^@EVENTLOAD$/m] },
      { src: SYSTEM, ref: '764', any: [/角色名初始化/] },
      { src: SYSTEM, ref: '766', any: [/EX素质名初始化/] },
      { src: SYSTEM, ref: '768-772', any: [/IF LASTLOAD_NO == 999/] },
      { src: SYSTEM, ref: '769-771', any: [/CALL MAOUNET/] },
      { src: SYSTEM, ref: '773-774', any: [/CALL INPORT_B/] },
      { src: SYSTEM, ref: '775-776', any: [/;SIF EX_FLAG:2801 < 10/] },
      { src: SYSTEM, ref: '779', any: [/CALL DATA_FIX/] },
      { src: SYSTEM_DATA, ref: '74-75', any: [/SIF EX_FLAG:2801 < 10/] },
    ],
  },
  {
    // @EVENT_NEXTDAY / @EVENT_NEWDAY 窄路径（#115 日程推进）
    js: 'ere/event/event-nextday.js',
    refs: [
      { src: NEXTDAY, ref: '6-189', any: [/^@EVENT_NEXTDAY$/m] },
      { src: NEXTDAY, ref: '10-52', any: [/NEXTDAY_COUNT/] },
      { src: NEXTDAY, ref: '16-20', any: [/EVENT_FUTA_F/] },
      { src: NEXTDAY, ref: '22-28', any: [/EVENT_MORASI/] },
      { src: NEXTDAY, ref: '29-38', any: [/EVENT_YOUJI/] },
      { src: NEXTDAY, ref: '40-44', any: [/EVENT_MAZOKU/] },
      { src: NEXTDAY, ref: '47', any: [/^\tCALL APHRODISIAC_ADDICT$/m] },
      { src: NEXTDAY, ref: '50', any: [/^\tCALL SOUL_DISLOCATION$/m] },
      { src: NEXTDAY, ref: '55-61', any: [/CFLAG:COUNT:109 = 0/] },
      { src: NEXTDAY, ref: '59', any: [/CFLAG:COUNT:109 = 0/] },
      { src: NEXTDAY, ref: '64', any: [/^FLAG:61 = 0$/m] },
      { src: NEXTDAY, ref: '67', any: [/^CALL NINSIN_MAIN$/m] },
      { src: NEXTDAY, ref: '69-95', any: [/TALENT:LOCAL:153/] },
      {
        src: NEXTDAY,
        ref: '72',
        any: [/\(CFLAG:LOCAL:110 - 3\) == DAY/],
      },
      { src: NEXTDAY, ref: '75', any: [/;CALL REACH_FULL_TERM/] },
      {
        src: NEXTDAY,
        ref: '77',
        any: [/\(CFLAG:LOCAL:110 - 1\) == DAY/],
      },
      { src: NEXTDAY, ref: '79', any: [/出産日了/] },
      { src: NEXTDAY, ref: '82', any: [/CFLAG:LOCAL:110 == DAY/] },
      { src: NEXTDAY, ref: '84', any: [/;CALL CHILD_BIRTH/] },
      {
        src: NEXTDAY,
        ref: '86',
        any: [/\(CFLAG:LOCAL:110 \+ 5\) == DAY/],
      },
      { src: NEXTDAY, ref: '88', any: [/;CALL DEPEARENT/] },
      { src: NEXTDAY, ref: '89', any: [/TALENT:LOCAL:154/] },
      { src: NEXTDAY, ref: '97-99', any: [/WASHING_CLOTH/] },
      { src: NEXTDAY, ref: '102-111', any: [/OFFERVIRGIN_CHECK/] },
      { src: NEXTDAY, ref: '114', any: [/^CALL NIGHT_STALKING_CHECK$/m] },
      { src: NEXTDAY, ref: '117', any: [/;CALL RUNNING_COST/] },
      { src: NEXTDAY, ref: '120', any: [/^CALL CURSE_EQUIP_RING$/m] },
      { src: NEXTDAY, ref: '123', any: [/CALL SUMMON_MONSTER, 0/] },
      { src: NEXTDAY, ref: '126', any: [/^CALL DUNGEON_ROOM_DAY$/m] },
      { src: NEXTDAY, ref: '129-178', any: [/CALL PILLORY/] },
      { src: NEXTDAY, ref: '146-147', any: [/处女の場合善恶值上昇/] },
      { src: NEXTDAY, ref: '146-154', any: [/CALL KARMA, TARGET, 1/] },
      { src: NEXTDAY, ref: '147', any: [/TALENT:0 == 0 && RAND:3 == 0/] },
      { src: NEXTDAY, ref: '162-175', any: [/CALL FAITH, TARGET, 1/] },
      { src: NEXTDAY, ref: '181', any: [/^CALL TAX_GET$/m] },
      { src: NEXTDAY, ref: '184', any: [/^CALL SENGEN_VIDEO_DE$/m] },
      { src: NEXTDAY, ref: '187', any: [/^CALL MAOU_KOUHO$/m] },
      { src: NEXTDAY, ref: '189', any: [/^RETURN 1$/m] },
      { src: NEXTDAY, ref: '193-243', any: [/^@EVENT_NEWDAY$/m] },
      { src: NEXTDAY, ref: '200-221', any: [/影の寿命/] },
      { src: NEXTDAY, ref: '226', any: [/^CALL MORNING_FELLATIO$/m] },
      { src: NEXTDAY, ref: '229', any: [/;CALL HAPPY_BIRTHDAY/] },
      { src: NEXTDAY, ref: '232', any: [/^CALL ONESHO$/m] },
      { src: NEXTDAY, ref: '235', any: [/;CALL PARTICULAR_DATE/] },
      { src: NEXTDAY, ref: '238', any: [/^CALL DOG_WALK$/m] },
      { src: NEXTDAY, ref: '241', any: [/^CALL ENDCHECK$/m] },
      { src: NEXTDAY, ref: '243', any: [/^RETURN 1$/m] },
    ],
  },
  {
    // @ENDCHECK 主线剧情监测全链（#116：ENDRESET/ENDCHECKMAIN/ENDCHECKCHARA
    // / END 族分派循环 / ENDING_N 调用点 / END31 死引用）
    js: 'ere/event/event-endcheck.js',
    refs: [
      { src: ENDING, ref: '301-356', any: [/@ENDCHECK/] },
      { src: ENDING, ref: '310', any: [/^CALL ENDRESET$/] },
      { src: ENDING, ref: '312', any: [/^CALL ENDCHECKMAIN$/] },
      { src: ENDING, ref: '314-339', any: [/LOCAL:1 = EX_FLAG:2801 % 100/] },
      { src: ENDING, ref: '342', any: [/^CALL ENDCHECKCHARA$/] },
      { src: ENDING, ref: '344', any: [/^IF EX_FLAG:2801 != 99$/] },
      {
        src: ENDING,
        ref: '351-352',
        any: [/EX_FLAG:2801 == 99 && DAY:0 == 500/],
      },
      { src: ENDING, ref: '354-356', any: [/TRYCALL END31/] },
      { src: NEXTDAY, ref: '241', any: [/^CALL ENDCHECK$/] },
      { src: NEXTDAY, ref: '11-12', any: [/SIF NEXTDAY_COUNT == 0/] },
      { src: TURNEND, ref: '170-334', any: [/^@DEBUG_CHECK/] },
      { src: TURNEND, ref: '237-308', any: [/EX_FLAG:2803 > 0/] },
      { src: ENDINGDATA, ref: '1-35', any: [/@ENDRESET/] },
      { src: ENDINGDATA, ref: '3-5', any: [/GETCHARA\(17\) < 0/] },
      { src: ENDINGDATA, ref: '6-8', any: [/GETCHARA\(20\) < 0/] },
      {
        src: ENDINGDATA,
        ref: '9-11',
        any: [/GETCHARA\(21\) < 0 && EX_FLAG:2814 < 300/],
      },
      { src: ENDINGDATA, ref: '12-14', any: [/GETCHARA\(22\) < 0/] },
      { src: ENDINGDATA, ref: '15-17', any: [/GETCHARA\(23\) < 0/] },
      { src: ENDINGDATA, ref: '18-20', any: [/GETCHARA\(24\) < 0/] },
      { src: ENDINGDATA, ref: '21-23', any: [/GETCHARA\(31\) < 0/] },
      { src: ENDINGDATA, ref: '24-26', any: [/GETCHARA\(32\) < 0/] },
      {
        src: ENDINGDATA,
        ref: '27-29',
        any: [/GETCHARA\(33\) < 0 && EX_FLAG:2814 < 500/],
      },
      { src: ENDINGDATA, ref: '30-32', any: [/FLAG:2815 = 0/] },
      { src: ENDINGDATA, ref: '33-35', any: [/GETCHARA\(35\) < 0/] },
      { src: ENDINGDATA, ref: '38-63', any: [/^@ENDCHECKMAIN/] },
      { src: ENDINGDATA, ref: '42-44', any: [/DAY:0 == 500/] },
      { src: ENDINGDATA, ref: '46-47', any: [/MONEY > EX_FLAG:4444 \+ 8766/] },
      { src: ENDINGDATA, ref: '51-55', any: [/CFLAG:COUNTER:9 >= 5000/] },
      { src: ENDINGDATA, ref: '58-59', any: [/CFLAG:0:9 >= 1500/] },
      { src: ENDINGDATA, ref: '61-63', any: [/EX_FLAG:99 <= 0/] },
      { src: ENDINGDATA, ref: '64-140', any: [/^@ENDCHECKCHARA/] },
      { src: ENDINGDATA, ref: '66-73', any: [/GETCHARA\(17\) > 0/] },
      { src: ENDINGDATA, ref: '74-81', any: [/GETCHARA\(20\) > 0/] },
      { src: ENDINGDATA, ref: '90-97', any: [/GETCHARA\(23\) > 0/] },
      { src: ENDINGDATA, ref: '98-105', any: [/GETCHARA\(24\) > 0/] },
      { src: ENDINGDATA, ref: '106-113', any: [/GETCHARA\(31\) > 0/] },
      { src: ENDINGDATA, ref: '114-121', any: [/GETCHARA\(32\) > 0/] },
      { src: ENDINGDATA, ref: '130-137', any: [/GETCHARA\(34\) > 0/] },
      { src: ENDINGDATA, ref: '82-85', any: [/ENDCHECKSPADE/] },
      { src: ENDINGDATA, ref: '86-89', any: [/ENDCHECKSQUARE/] },
      { src: ENDINGDATA, ref: '122-129', any: [/ENDCHECKGODNESS_SKY_TEMPLE/] },
      { src: ENDINGDATA, ref: '138-139', any: [/ENDCHECKPRINCESS/] },
      { src: ENDINGDATA, ref: '143-207', any: [/ENDCHECKSQUARE/] },
      { src: ENDINGDATA, ref: '208-352', any: [/ENDCHECKSPADE/] },
      { src: ENDINGDATA, ref: '66-137', any: [/GETCHARA\(17\) > 0/] },
      { src: ENDING, ref: '344-349', any: [/FOR LOCAL,2,16/] },
    ],
  },
  {
    // @EVENT_NEXTMONTH 月份回绕（#115）
    js: 'ere/event/event-nextmonth.js',
    refs: [
      { src: NEXTMONTH, ref: '3-7', any: [/DAY:1は现在の月/] },
      { src: NEXTMONTH, ref: '12-36', any: [/^@EVENT_NEXTMONTH$/m] },
      { src: NEXTMONTH, ref: '14-17', any: [/IF DAY:1 == 2/] },
      { src: NEXTMONTH, ref: '18-21', any: [/DAY:1 == 4/] },
      { src: NEXTMONTH, ref: '22-25', any: [/DAY:1 == 1 \|\|/] },
      { src: NEXTMONTH, ref: '26-35', any: [/DAY:1 == 12/] },
      { src: NEXTMONTH, ref: '30-35', any: [/FOR AGE_COUNT, 1, CHARANUM/] },
      { src: NEXTMONTH, ref: '31', any: [/CFLAG:AGE_COUNT:452 \+= 1/] },
      { src: NEXTMONTH, ref: '32-33', any: [/HUMAN_AGE_GENERATE/] },
      { src: NEXTMONTH, ref: '34', any: [/^\t\tRESULT = 0$/m] },
    ],
  },
  {
    js: 'ere/system/train/train-name.js',
    refs: [
      // @TRAIN_NAME_INIT 与其调用点
      { src: TRAIN_MAIN, ref: '53', any: [/^CALL TRAIN_NAME_INIT$/m] },
      {
        src: TRAIN_MAIN,
        ref: '783-910',
        any: [
          /^@TRAIN_NAME_INIT$/m,
          /^TRAIN_NAME:0 = 爱抚$/m,
          /^TRAIN_NAME:208 = 触手$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '786-787',
        any: [/^SIF STRLENSU\(TRAIN_NAME\) > 0$/m, /^\tRETURN$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '788-908',
        any: [/^TRAIN_NAME:0 = 爱抚$/m, /^TRAIN_NAME:12 = 振动杖$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '899',
        any: [/^TRAIN_NAME:150 = %CSTR:7%調教$/m],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-bars.js',
    refs: [
      // @LIFE_BAR / @VITAL_BAR（#212 首个消费者是 @SHOW_STATUS）
      {
        src: CHARA_INFO_SHOW,
        ref: '1129-1168',
        any: [/^@LIFE_BAR \(ARG:0 = -1, ARG:1 = 0\)$/m, /^PRINT 体力$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1137-1141',
        any: [/^IF MAXBASE:0 <= 0$/m, /終わるときにはTARGETを戻す/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1143-1157',
        any: [/^PRINT 体力$/m, /^BAR BASE:0,MAXBASE:0,32$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1145-1156',
        any: [/^\tIF 立绘$/m, /BAR 0,MAXBASE:0,14/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1159-1163',
        any: [/★死亡★/, /★濒死★/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1175-1203',
        any: [/^@VITAL_BAR \(ARG:0 = -1, ARG:1 = 0\)$/m, /^PRINT 气力$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1183-1187',
        any: [/^IF MAXBASE:1 <= 0$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1198-1199',
        any: [/^SIF BASE:1 <= 0$/m, /★气力０★/],
      },
    ],
  },
  {
    js: 'ere/page/page-train.js',
    refs: [
      // #224（J14）与 #230（J20）：SHOW_EQUIP_2 的已点亮状态臂
      {
        src: CHARA_INFO_SHOW,
        ref: '1564-1596',
        any: [/一度使用したら解除するまで止まらない道具や調教を/m],
      },
      // #224（J14）：特殊族点亮的 53/54/57/58/59 状态臂；与死斗场同一粉色行。
      {
        src: CHARA_INFO_SHOW,
        ref: '1566-1577',
        any: [
          /摄影中/m,
          /野外PLAY中/m,
          /羞耻（大镜子）PLAY中/m,
          /浴室PLAY中/m,
          /新妻PLAY中/m,
        ],
      },
      { src: CHARA_INFO_SHOW, ref: '1587-1588', any: [/死斗场决斗中/m] },
      // #215（J5）：clothtype_text 内部 :37 的着衣模式守卫
      {
        src: FUNC_CLOTH_ERB,
        ref: '37',
        any: [/^\s*IF FLAG:37 == 0 \|\| CFLAG:41 == 0$/m],
      },
      // @SHOW_STATUS 整函数（#74 组件化后的 draw_status_screen 全量）
      { src: TRAIN_MAIN, ref: '60-256', any: [/^@SHOW_STATUS$/m] },
      // 锚点跨度重绘的原作习语（#74：ScreenBlock 承载的 ere 侧等价物）
      {
        src: USERCOM,
        ref: '179-186',
        any: [/^@SET_CLEAR_POINT$/m, /^@CLEAR_TO_POINT$/m],
      },
      { src: TRAIN_MAIN, ref: '61', any: [/^DRAWLINE$/m] },
      {
        src: TRAIN_MAIN,
        ref: '62-68',
        any: [/^PRINTV DAY\+1$/m, /^\(午前\)$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '69-82',
        any: [/调教中   调教者:/, /^PRINT   $/m],
      },
      { src: TRAIN_MAIN, ref: '82', any: [/^PRINT   $/m] },
      { src: TRAIN_MAIN, ref: '84', any: [/^CALL SHOW_EQUIP_2$/m] },
      {
        src: TRAIN_MAIN,
        ref: '85-86',
        any: [/^CALL LIFE_BAR$/m, /^CALL VITAL_BAR$/m],
      },
      // #212：基础条组件的源（LIFE_BAR/VITAL_BAR 住 CHARA_INFO_SHOW）
      { src: CHARA_INFO_SHOW, ref: '1175', any: [/^@VITAL_BAR /m] },
      {
        src: TRAIN_MAIN,
        ref: '87-91',
        any: [/調教時ステータス画面に服装表示/, /^CALL PRINT_CLOTHTYPE$/m],
      },
      { src: TRAIN_MAIN, ref: '93', any: [/^PRINTL $/m] },
      {
        src: TRAIN_MAIN,
        ref: '95-124',
        any: [/^IF EX:0 > 0$/m, /^\tPRINTL  $/m],
      },
      { src: TRAIN_MAIN, ref: '95-103', any: [/^IF EX:0 > 0$/m] },
      { src: TRAIN_MAIN, ref: '104-105', any: [/SIF EX:1 > 0/] },
      { src: TRAIN_MAIN, ref: '106-107', any: [/SIF EX:2 > 0/] },
      { src: TRAIN_MAIN, ref: '108-109', any: [/SIF EX:3 > 0/] },
      { src: TRAIN_MAIN, ref: '110-111', any: [/SIF EX:4 > 0/] },
      { src: TRAIN_MAIN, ref: '112-122', any: [/^IF EX:5 > 0 $/m] },
      {
        src: TRAIN_MAIN,
        ref: '123-124',
        any: [/SIF EX:0 \|\| EX:1 \|\| EX:2 \|\| EX:3 \|\| EX:4 \|\| EX:5$/m],
      },
      { src: TRAIN_MAIN, ref: '126', any: [/^PRINT_PALAM TARGET$/m] },
      {
        src: TRAIN_MAIN,
        ref: '128-142',
        any: [/^SIF MAXBASE:2 == 0$/m, /^ENDIF$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '144-252',
        any: [/射精（/, /^CALL SHOW_EQUIP_1$/m],
      },
      // —— #212：射精/母乳/触手槽条段的逐段锚 ——
      { src: TRAIN_MAIN, ref: '144', any: [/^IF \(TALENT:MASTER:121/m] },
      {
        src: TRAIN_MAIN,
        ref: '144-158',
        any: [
          /^\tPRINT 射精（$/m,
          /^\tBAR BASE:MASTER:2,MAXBASE:MASTER:2,32$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '160-175',
        any: [/^IF ASSIPLAY$/m, /^SETCOLOR 0xFF1493$/m],
      },
      { src: TRAIN_MAIN, ref: '161', any: [/^\tIF \(TALENT:ASSI:121/m] },
      { src: TRAIN_MAIN, ref: '177', any: [/^IF \(TALENT:TARGET:121/m] },
      {
        src: TRAIN_MAIN,
        ref: '177-188',
        any: [/^\tBAR BASE:2,MAXBASE:2,32$/m, /^\tSIF TEQUIP:37$/m],
      },
      { src: TRAIN_MAIN, ref: '190-200', any: [/^IF TALENT:MASTER:130$/m] },
      {
        src: TRAIN_MAIN,
        ref: '202-214',
        any: [/^IF ASSI > 0$/m, /^\tIF TALENT:ASSI:130 $/m],
      },
      { src: TRAIN_MAIN, ref: '216-226', any: [/^IF TALENT:TARGET:130$/m] },
      {
        src: TRAIN_MAIN,
        ref: '228-235',
        any: [/^IF TEQUIP:89$/m, /PRINT 射精（犬）/],
      },
      {
        src: TRAIN_MAIN,
        ref: '237-244',
        any: [/^IF TEQUIP:90$/m, /PRINT 射精（触手）/],
      },
      {
        src: TRAIN_MAIN,
        ref: '246-252',
        any: [/^IF TEQUIP:55$/m, /射精（死斗场・怪物）/],
      },
      { src: TRAIN_MAIN, ref: '253', any: [/^CALL SHOW_EQUIP_1$/m] },
      {
        src: TRAIN_MAIN,
        ref: '255-256',
        any: [/设置清除点/, /^CALL SET_CLEAR_POINT$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-usercom.js',
    refs: [
      {
        src: USERCOM,
        ref: '9-13',
        any: [/^IF GETBIT\(FLAG:5,34\)$/m, /^CALL SHOW_COMMENU$/m],
      },
      // #212：@P_C（TRAIN_MAIN.ERB:771-780，上次的调教指令名）
      {
        src: TRAIN_MAIN,
        ref: '773',
        any: [/^TSTR:90 '= TRAINNAME:LOCAL$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '775-776',
        any: [
          /^SIF STRLENSU\(TSTR:90\) < 1$/m,
          /^\tTSTR:90 '= TRAIN_NAME:LOCAL$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '778-779',
        any: [/^SIF STRLENSU\(TSTR:90\) < 1$/m, /^\tTSTR:90 = 　$/m],
      },
      // #213：按钮编号/标签的换算依据（@SHOW_COMMENU 的方格行）
      {
        src: USERCOM,
        ref: '188-216',
        any: [/@SHOW_COMMENU/, /FOR L_I,0,300/],
      },
      {
        src: USERCOM,
        ref: '211',
        any: [/PRINTFORMC %TRAINNAME:64%・%TRAINNAME:L_I%/],
      },
      {
        src: USERCOM,
        ref: '213',
        any: [/PRINTFORMC %TRAIN_NAME:RESULT%/],
      },
      { src: USERCOM, ref: '14', any: [/^PRINTL$/m] },
      { src: USERCOM, ref: '15', any: [/^DRAWLINE$/m] },
      { src: USERCOM, ref: '16', any: [/^RESETCOLOR$/m] },
      // #214：子菜单按钮组与 @USERCOM 全分支
      {
        src: USERCOM,
        ref: '17-91',
        any: [/PRINTC 能力表示\[100\]/, /PRINTC 调教结束\[999\]/],
      },
      { src: USERCOM, ref: '17', any: [/^PRINTC 能力表示\[100\]$/m] },
      { src: USERCOM, ref: '18', any: [/^PRINTC 污秽表示\[101\]$/m] },
      {
        src: USERCOM,
        ref: '20-35',
        any: [/IF ASSI > 0 && ASSI:1 > 0/, /CFLAG:0 >= 2/],
      },
      { src: USERCOM, ref: '21', any: [/^\tPRINTC 交代助手\[102\]$/m] },
      { src: USERCOM, ref: '20', any: [/^IF ASSI > 0 && ASSI:1 > 0$/m] },
      {
        src: USERCOM,
        ref: '28',
        any: [/^IF \(TARGET == MASTER \|\| CFLAG:0 >= 2\) && ASSI:1 > 0$/m],
      },
      { src: USERCOM, ref: '29', any: [/^\tPRINTC 对换调教\[112\]$/m] },
      { src: USERCOM, ref: '36', any: [/^PRINTC 避孕套设定\[103\]$/m] },
      {
        src: USERCOM,
        ref: '38-84',
        any: [/^\t*PRINTC 爱抚系过滤\[104\]/m, /^\t*PRINTC ＳＭ系过滤\[108\]/m],
      },
      { src: USERCOM, ref: '85', any: [/PRINTC 调教菜单登录\[990\]/] },
      { src: USERCOM, ref: '86', any: [/^\tPRINTL$/m] },
      { src: USERCOM, ref: '88', any: [/PRINTC 调教菜单表示\[991\]/] },
      { src: USERCOM, ref: '89', any: [/PRINTC 调教菜单实行\[992\]/] },
      { src: USERCOM, ref: '91', any: [/^PRINTC 调教结束\[999\]$/m] },
      { src: USERCOM, ref: '92', any: [/^PRINTL$/m] },
      {
        src: USERCOM,
        ref: '93-100',
        any: [/^IF PREVCOM > -1$/m, /^CALL P_C$/m],
      },
      { src: USERCOM, ref: '103', any: [/^REDRAW 1$/m] },
      {
        src: USERCOM,
        ref: '104-106',
        any: [/^IF RESULT == 100$/m, /^CALL SHOW_CHARA_INFO\(TARGET\)$/m],
      },
      {
        src: USERCOM,
        ref: '107-109',
        any: [/^ELSEIF RESULT == 101$/m, /^CALL STAIN_INFO$/m],
      },
      { src: USERCOM, ref: '108', any: [/^\tCALL STAIN_INFO$/m] },
      {
        src: USERCOM,
        ref: '110',
        any: [/^ELSEIF RESULT == 102 && ASSI > 0 && ASSI:1 > 0$/m],
      },
      {
        src: USERCOM,
        ref: '110-122',
        any: [/^ELSEIF RESULT == 102/, /^\tIF TARGET == MASTER$/m],
      },
      {
        src: USERCOM,
        ref: '111-113',
        any: [
          /^\tIF TARGET == MASTER$/m,
          /PLAYER == TARGET:1 \? ASSI:1 # TARGET:1/,
        ],
      },
      {
        src: USERCOM,
        ref: '114-116',
        any: [
          /^ELSEIF TARGET == TARGET:1$/m,
          /PLAYER == MASTER \? ASSI:1 # MASTER/,
        ],
      },
      {
        src: USERCOM,
        ref: '117-119',
        any: [/PLAYER == MASTER \? TARGET:1 # MASTER/],
      },
      {
        src: USERCOM,
        ref: '121',
        any: [/^\tASSIPLAY = PLAYER != MASTER \? 1 # 0$/m],
      },
      {
        src: USERCOM,
        ref: '123',
        any: [
          /^ELSEIF RESULT == 112 && \(TARGET == MASTER \|\| CFLAG:0 >= 2\) && ASSI:1 > 0$/m,
        ],
      },
      {
        src: USERCOM,
        ref: '123-128',
        any: [/^ELSEIF RESULT == 112/, /^\tSWAP TARGET, PLAYER$/m],
      },
      {
        src: USERCOM,
        ref: '125-126',
        any: [
          /SIF PLAYER == ASSI:1 \|\| PLAYER == TARGET:1/,
          /^\t\tASSI = PLAYER$/m,
        ],
      },
      {
        src: USERCOM,
        ref: '127',
        any: [/^\tASSIPLAY = PLAYER != MASTER \? 1 # 0$/m],
      },
      {
        src: USERCOM,
        ref: '129-131',
        any: [/^ELSEIF RESULT == 103$/m, /^CALL CONDOM_SETTINGS$/m],
      },
      {
        src: USERCOM,
        ref: '132-161',
        any: [/^ELSEIF RESULT == 104$/m, /FLAG:25 \|= 16/],
      },
      {
        src: USERCOM,
        ref: '162-164',
        any: [/^ELSEIF RESULT == 990$/m, /^CALL COMSEQ_REGISTER$/m],
      },
      {
        src: USERCOM,
        ref: '165-170',
        any: [/^ELSEIF RESULT == 991 && FLAG:550 > 0/, /^\tWAIT$/m],
      },
      {
        src: USERCOM,
        ref: '171-172',
        any: [
          /^ELSEIF RESULT == 992 && FLAG:550 > 0/,
          /^\tCALL COMSEQ_TRAIN$/m,
        ],
      },
      {
        src: USERCOM,
        ref: '173-175',
        any: [/^ELSEIF RESULT == 999$/m, /^\tBEGIN AFTERTRAIN$/m],
      },
      { src: USERCOM, ref: '177', any: [/^RETURN 0$/m] },
      {
        src: USERCOM,
        ref: '179-180',
        any: [/@SET_CLEAR_POINT/, /^TFLAG:999 = LINECOUNT$/m],
      },
      {
        src: USERCOM,
        ref: '182-186',
        any: [/@CLEAR_TO_POINT/, /CLEARLINE LINECOUNT - TFLAG:999/],
      },
      {
        src: USERCOM,
        ref: '200-203',
        any: [/^\tRESULT = 1$/m, /TRYCALLFORM COM_ABLE\{L_I\}/],
      },
      {
        src: USERCOM,
        ref: '202-203',
        any: [/^\tSIF RESULT == 0$/m, /^\t\tCONTINUE$/m],
      },
      { src: USERCOM, ref: '209', any: [/^\tCALL GET_ADV_COM, L_I$/m] },
      {
        src: USERCOM,
        ref: '209-214',
        any: [/^\tCALL GET_ADV_COM, L_I$/m, /IF RESULT == 64 && L_I != 64/],
      },
      { src: USERCOM, ref: '216', any: [/^NEXT$/m] },
    ],
  },

  {
    // #214：@COM_ORDER（实行值的共通明细段，COMORDER.ERB 全文）
    js: 'ere/system/train/com-order.js',
    refs: [
      { src: COMORDER, ref: '3-379', any: [/@COM_ORDER/, /^IF ABL:10$/m] },
      {
        src: COMORDER,
        ref: '8-23',
        any: [/^IF ABL:10$/m, /^A \+= ABL:10 \* 4$/m],
      },
      {
        src: COMORDER,
        ref: '28',
        any: [/IF TALENT:PLAYER:122 == 0 && TALENT:TARGET:122 == 0/],
      },
      {
        src: COMORDER,
        ref: '28-91',
        any: [/;ABL:百合气质/, /A \+= ABL:22\*3/],
      },
      {
        src: COMORDER,
        ref: '66-71',
        any: [/^\tIF TALENT:24$/m, /^\t\tA -= 13$/m],
      },
      {
        src: COMORDER,
        ref: '85-90',
        any: [/^A -= 10$/m, /TALENTNAME:24/],
      },
      {
        src: COMORDER,
        ref: '96-127',
        any: [/^IF MARK:0$/m, /^A \+= MARK:0 \* 5$/m],
      },
      {
        src: COMORDER,
        ref: '105-111',
        any: [/^\tT = 4$/m, /^\tT = 2$/m],
      },
      {
        src: COMORDER,
        ref: '121-127',
        any: [/^IF MARK:3$/m, /^A -= MARK:3 \* 2 \* T$/m],
      },
      {
        src: COMORDER,
        ref: '132-176',
        any: [/;PALAM:恭顺/, /;PALAM:恐怖/],
      },
      {
        src: COMORDER,
        ref: '133-145',
        any: [/^IF PALAM:4 < PALAMLV:1$/m, /^ELSEIF PALAM:4 < PALAMLV:5$/m],
      },
      {
        src: COMORDER,
        ref: '156-168',
        any: [/^IF PALAM:10 < PALAMLV:1$/m, /^ELSEIF PALAM:10 < PALAMLV:5$/m],
      },
      {
        src: COMORDER,
        ref: '182-285',
        any: [/;反抗心/, /;盲从/],
      },
      { src: COMORDER, ref: '206', any: [/;自尊心$/m] },
      {
        src: COMORDER,
        ref: '291-334',
        any: [/;魅惑/, /;鼓舞/],
      },
      {
        src: COMORDER,
        ref: '339-379',
        any: [/^R = NO:PLAYER$/m, /RELATION:R > 0 && RELATION:R < 30/],
      },
    ],
  },

  {
    // #214：COMSEQ 的登记 / 显示 / 执行（COM_REGISTER.ERB 全文）
    js: 'ere/system/train/com-register.js',
    refs: [
      {
        src: COM_REGISTER,
        ref: '25-121',
        any: [/@COMSEQ_REGISTER/, /^PRINTL 调教菜单登录$/m],
      },
      { src: COM_REGISTER, ref: '26', any: [/^PRINTL 调教菜单登录$/m] },
      {
        src: COM_REGISTER,
        ref: '31-33',
        any: [/\$REDRAW_LOOP/, /^CLEARLINE LINECOUNT - LOCAL:99$/m],
      },
      { src: COM_REGISTER, ref: '35', any: [/^DRAWLINE$/m] },
      { src: COM_REGISTER, ref: '36', any: [/^CALL COMSEQ_SHOW$/m] },
      { src: COM_REGISTER, ref: '37', any: [/^DRAWLINE$/m] },
      {
        src: COM_REGISTER,
        ref: '38',
        any: [/^PRINTFORML 选择第\{LOCAL:0\+1\}个指令:/],
      },
      {
        src: COM_REGISTER,
        ref: '39',
        any: [/^CALL COMSEQSUB_PRINT_COMLIST$/m],
      },
      { src: COM_REGISTER, ref: '40', any: [/^PRINTL$/m] },
      {
        src: COM_REGISTER,
        ref: '41-51',
        any: [/^SIF FLAG:550 > 0$/m, /PRINTC 取消并返回\[1000\]/],
      },
      {
        src: COM_REGISTER,
        ref: '41-42',
        any: [/^SIF FLAG:550 > 0$/m, /PRINTC 重置菜单\[998\]/],
      },
      {
        src: COM_REGISTER,
        ref: '43-44',
        any: [/^SIF LOCAL:0 > 0$/m, /PRINTC 重复指令\[999\]/],
      },
      {
        src: COM_REGISTER,
        ref: '45-48',
        any: [/IF LOCAL:0 == 0 && FLAG:550 > 0/, /PRINTC 取消并返回\[1000\]/],
      },
      { src: COM_REGISTER, ref: '50', any: [/PRINTC 保存并返回\[1000\]/] },
      { src: COM_REGISTER, ref: '52', any: [/^PRINTL $/m] },
      { src: COM_REGISTER, ref: '53', any: [/^DRAWLINE$/m] },
      { src: COM_REGISTER, ref: '57', any: [/^INPUT$/m] },
      {
        src: COM_REGISTER,
        ref: '58-62',
        any: [/IF RESULT == 1000 && LOCAL:0 == 0/, /RESULT > 999/],
      },
      {
        src: COM_REGISTER,
        ref: '65-74',
        any: [/IF RESULT == 998 && FLAG:550 > 0/, /^\tTFLAG:204 = 0$/m],
      },
      {
        src: COM_REGISTER,
        ref: '76-89',
        any: [/ELSEIF RESULT == 999 && LOCAL:0 > 0/, /^\tLOCAL:1 = LOCAL:0$/m],
      },
      {
        src: COM_REGISTER,
        ref: '81-83',
        any: [/^\tSIF LOCAL:0 > 9$/m, /^\t\tGOTO COMPLETE$/m],
      },
      {
        src: COM_REGISTER,
        ref: '93-101',
        any: [/^\tTFLAG:204 = RESULT$/m, /CALL MULTI_COMABLE, TFLAG:204/],
      },
      {
        src: COM_REGISTER,
        ref: '104-108',
        any: [/^LOCAL:1 = 551 \+ LOCAL:0$/m, /FLAG:\(LOCAL:1\) = TFLAG:204/],
      },
      {
        src: COM_REGISTER,
        ref: '111-113',
        any: [/^LOCAL \+\+$/m, /^\tGOTO REDRAW_LOOP$/m],
      },
      {
        src: COM_REGISTER,
        ref: '115-121',
        any: [/\$COMPLETE/, /^PRINTW 调教菜单登录完毕$/m],
      },
      { src: COM_REGISTER, ref: '116', any: [/^DRAWLINE$/m] },
      { src: COM_REGISTER, ref: '117', any: [/^CALL COMSEQ_SHOW$/m] },
      { src: COM_REGISTER, ref: '118', any: [/^DRAWLINE$/m] },
      {
        src: COM_REGISTER,
        ref: '119',
        any: [/^PRINTW 调教菜单登录完毕$/m],
      },
      { src: COM_REGISTER, ref: '120', any: [/^TFLAG:204 = 0$/m] },
      {
        src: COM_REGISTER,
        ref: '126-155',
        any: [/@COMSEQ_SHOW/, /^VARSET LOCAL, 0$/m],
      },
      {
        src: COM_REGISTER,
        ref: '131-136',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:LOCAL\}/, /PRINT （不可用）/],
      },
      {
        src: COM_REGISTER,
        ref: '133',
        any: [/PRINTFORM %TRAINNAME:\(FLAG:LOCAL\)%/],
      },
      {
        src: COM_REGISTER,
        ref: '138-151',
        any: [/^\t\tLOCAL:1 = 1$/m, /\$TIMES_EXP_CHECK/],
      },
      {
        src: COM_REGISTER,
        ref: '152-153',
        any: [/SIF COUNT < FLAG:550 - 1/, /PRINT  → /],
      },
      { src: COM_REGISTER, ref: '155', any: [/^PRINTL  $/m] },
      {
        src: COM_REGISTER,
        ref: '162-179',
        any: [/@COMSEQSUB_PRINT_COMLIST/, /^VARSET LOCAL$/m],
      },
      {
        src: COM_REGISTER,
        ref: '169',
        any: [/PRINTFORMC %TRAINNAME:LOCAL%\[\{LOCAL, 3\}\]/],
      },
      {
        src: COM_REGISTER,
        ref: '190-202',
        any: [/@MULTI_COMABLE, ARG/, /IF STRLENS\(TRAINNAME:ARG\) == 0/],
      },
      {
        src: COM_REGISTER,
        ref: '196',
        any: [/^\t;調教菜單実行中を表すTFLAGを設定する$/m],
      },
      {
        src: COM_REGISTER,
        ref: '196-200',
        any: [/^\tTFLAG:224 = 555$/m, /TRYCALLFORM COM_ABLE\{ARG\}/],
      },
      {
        src: COM_REGISTER,
        ref: '207-237',
        any: [/@COMSEQ_TRAIN/, /^PRINTFORMW 开始自动执行调教指令$/m],
      },
      { src: COM_REGISTER, ref: '208', any: [/^DRAWLINE$/m] },
      { src: COM_REGISTER, ref: '209', any: [/^CALL COMSEQ_SHOW$/m] },
      { src: COM_REGISTER, ref: '210', any: [/^DRAWLINE$/m] },
      {
        src: COM_REGISTER,
        ref: '211',
        any: [/^PRINTFORMW 开始自动执行调教指令$/m],
      },
      { src: COM_REGISTER, ref: '213', any: [/^TFLAG:224 = 555$/m] },
      { src: COM_REGISTER, ref: '217', any: [/^LOCAL = PREVCOM$/m] },
      {
        src: COM_REGISTER,
        ref: '226',
        any: [/^\tSELECTCOM:\(COUNT \+ 1\) = FLAG:\(551 \+ COUNT\)$/m],
      },
      { src: COM_REGISTER, ref: '230', any: [/^\tCALLTRAIN FLAG:550$/m] },
      {
        src: COM_REGISTER,
        ref: '218-228',
        any: [/^REPEAT FLAG:550$/m, /^\tRESULT = 1$/m],
      },
      {
        src: COM_REGISTER,
        ref: '220-224',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:\(551 \+ COUNT\)\}/, /^\t\tBREAK$/m],
      },
      {
        src: COM_REGISTER,
        ref: '220',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:\(551 \+ COUNT\)\}/],
      },
      {
        src: COM_REGISTER,
        ref: '227',
        any: [/^\tPREVCOM = FLAG:\(551 \+ COUNT\)$/m],
      },
      {
        src: COM_REGISTER,
        ref: '229-235',
        any: [/IF LOCAL:1 == 0/, /^\tCALLTRAIN FLAG:550$/m],
      },
      { src: COM_REGISTER, ref: '233', any: [/^\tTFLAG:224 = 0$/m] },
      {
        src: COM_REGISTER,
        ref: '234',
        any: [/PRINTL 所登录的指令目前无法实行/],
      },
      { src: COM_REGISTER, ref: '236', any: [/^PREVCOM = LOCAL$/m] },
      {
        src: COM_REGISTER,
        ref: '243-245',
        any: [/@CALLTRAINEND/, /^;調教菜單実行中を表すTFLAGをリセットする$/m],
      },
    ],
  },

  {
    // #214：CALLTRAIN 等价的头注引用（SELECTCOM:1..N 的唯一写点）
    js: 'ere/system/train/train-loop.js',
    refs: [
      {
        src: COM_REGISTER,
        ref: '226',
        any: [/SELECTCOM:\(COUNT \+ 1\) = FLAG:\(551 \+ COUNT\)/],
      },
      {
        src: SOURCE,
        ref: '545',
        any: [/^PREVCOM = SELECTCOM$/m],
      },
    ],
  },

  {
    js: 'ere/system/train/juel-check.js',
    refs: [
      // TRAIN_MAIN.ERB @JUEL_CHECK
      {
        src: TRAIN_MAIN,
        ref: '435-549',
        any: [/^@JUEL_CHECK\s*$/m, /^\s*\$INPUT_LOOP_1\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '437', any: [/^CALL JUEL_CHECK_MAIN\s*$/m] },
      { src: TRAIN_MAIN, ref: '440', any: [/^WAIT\s*$/m] },
      { src: TRAIN_MAIN, ref: '443', any: [/^\s*\$INPUT_LOOP_1\s*$/m] },
      { src: TRAIN_MAIN, ref: '444', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      { src: TRAIN_MAIN, ref: '445', any: [/^CALL SHOW_INFO_EXP\s*$/m] },
      { src: TRAIN_MAIN, ref: '446', any: [/^CALL SHOW_JUEL\s*$/m] },
      { src: TRAIN_MAIN, ref: '450', any: [/^IF GETBIT\(FLAG:5,35\)\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '452-455',
        any: [
          /^\s*CALL AUTO_ABLUP/m,
          /^\s*CALL AUTO_ABLUP, ASSI\s*$/m,
          /^\s*CALL AUTO_ABLUP, MASTER\s*$/m,
        ],
      },
      { src: TRAIN_MAIN, ref: '457', any: [/^\s*GOTO LABEL_EXIT\s*$/m] },
      { src: TRAIN_MAIN, ref: '459', any: [/^CALL SHOW_ABLUP_SELECT\s*$/m] },
      { src: TRAIN_MAIN, ref: '461', any: [/^INPUT\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '463-539',
        any: [/^\s*IF RESULT == 0\s*$/m, /^\s*ELSEIF RESULT == 100\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '540', any: [/^\s*ELSEIF RESULT == 999\s*$/m] },
      { src: TRAIN_MAIN, ref: '541', any: [/^\s*\$LABEL_EXIT\s*$/m] },
      { src: TRAIN_MAIN, ref: '542', any: [/^\s*CALL YOKUBO_UP_CHECK\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '543',
        any: [/^\s*CALL CHECK_SELLASSIABLE\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '544',
        any: [/^\s*CALL CHECK_SPECIALSKIL, 1\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '545', any: [/^\s*LOCAL = TARGET\s*$/m] },
      // TRAIN_MAIN.ERB @JUEL_CHECK_MAIN
      {
        src: TRAIN_MAIN,
        ref: '552-740',
        any: [/^@JUEL_CHECK_MAIN\s*$/m, /^RETURN 0\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '558', any: [/^FOR JUEL_COUNT,0,16\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '559-585',
        any: [
          /^\s*IF PALAM:JUEL_COUNT < PALAMLV:1\s*$/m,
          /^\s*GET_JUEL = 12000\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '587-588',
        any: [
          /^\s*IF JUEL_COUNT == 0\s*$/m,
          /^\s*GOTJUEL:JUEL_COUNT = GET_JUEL \+ EX:0 \* 1000\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '589-590',
        any: [/^\s*ELSEIF JUEL_COUNT == 1\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '591-592',
        any: [/^\s*ELSEIF JUEL_COUNT == 2\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '593-594',
        any: [/^\s*ELSEIF JUEL_COUNT == 14\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '595-596',
        any: [/^\s*ELSEIF JUEL_COUNT == 15\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '597-598',
        any: [
          /^\s*ELSEIF JUEL_COUNT < 11 && JUEL_COUNT != 14 && JUEL_COUNT != 15\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '599-600',
        any: [/^\s*GOTJUEL:100 \+= GET_JUEL\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '604-613',
        any: [/现在保有する珠に今回獲得した珠を加算/],
      },
      {
        src: TRAIN_MAIN,
        ref: '606-613',
        any: [/^FOR JUEL_COUNT,0,11\s*$/m, /^\s*JUEL:14 \+= GOTJUEL:14\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '615-624',
        any: [/否定の珠による相殺を計算/, /^TFLAG:58 = JUEL:100\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '626-637',
        any: [/^\$LABEL_1\s*$/m, /GOTO LABEL_1/],
      },
      { src: TRAIN_MAIN, ref: '627', any: [/^\s*LOCAL:0 = RAND:3 \+ 4\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '629-630',
        any: [
          /^\s*SIF LOCAL:1 == 0 && JUEL:100 > 0\s*$/m,
          /^\s*LOCAL:1 = 1\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '631-632',
        any: [
          /^\s*SIF JUEL:\(LOCAL:0\) < LOCAL:1\s*$/m,
          /^\s*LOCAL:1 = JUEL:\(LOCAL:0\)\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '633',
        any: [/^\s*JUEL:\(LOCAL:0\) -= LOCAL:1\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '634', any: [/^\s*JUEL:100 -= LOCAL:1\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '636',
        any: [
          /^\s*SIF JUEL:100 > 0 && \(JUEL:4 \+ JUEL:5 \+ JUEL:6\) > 0\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '639-649',
        any: [/^\$LABEL_2\s*$/m, /GOTO LABEL_2/],
      },
      { src: TRAIN_MAIN, ref: '640', any: [/^\s*LOCAL:0 = RAND:3 \+ 8\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '648',
        any: [
          /^\s*SIF JUEL:100 > 0 && \(JUEL:8 \+ JUEL:9 \+ JUEL:10\) > 0\s*$/m,
        ],
      },
      { src: TRAIN_MAIN, ref: '651', any: [/^\s*DRAWLINE\s*$/m] },
      { src: TRAIN_MAIN, ref: '652', any: [/^PRINTFORM 调教结果：\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '652-654',
        any: [
          /^\s*SIF TFLAG:58 > 0\s*$/m,
          /PRINTFORM 否定点数\{TFLAG:58\}个抵消。/,
        ],
      },
      { src: TRAIN_MAIN, ref: '656', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      { src: TRAIN_MAIN, ref: '658', any: [/^FOR JUEL_COUNT,0,13\s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '659',
        any: [
          /^\s*IF JUEL_COUNT <= 3 \|\| JUEL_COUNT == 7 \|\| JUEL_COUNT == 12\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '660-666',
        any: [/^\s*IF JUEL_COUNT == 3\s*$/m, /^\s*LOCAL:0 = 15\s*$/m],
      },
      {
        src: TRAIN_MAIN,
        ref: '667-674',
        any: [
          /^\s*IF JUEL_COUNT == 12\s*$/m,
          /PRINTFORM 癖好点数：\(/,
          /PRINTFORM %CSTR:7%点数：\(/,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '676-679',
        any: [/^\s*N = JUEL:\(LOCAL:0\) - GOTJUEL:\(LOCAL:0\)\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '681', any: [/PRINT  \+ \s*$/m] },
      { src: TRAIN_MAIN, ref: '687', any: [/PRINT \)            = /] },
      {
        src: TRAIN_MAIN,
        ref: '694-700',
        any: [
          /^\s*IF JUEL_COUNT == 11\s*$/m,
          /^\s*LOCAL:0 = 58\s*$/m,
          /^\s*LOCAL:0 = JUEL_COUNT \+ 47\s*$/m,
        ],
      },
      {
        src: TRAIN_MAIN,
        ref: '701',
        any: [/PRINTFORM %PALAMNAME:\(LOCAL:1\)%点数：\(/],
      },
      {
        src: TRAIN_MAIN,
        ref: '702-705',
        any: [
          /^\s*N = TFLAG:\(LOCAL:0\) - GOTJUEL:\(LOCAL:1\)\s*$/m,
          /^\s*SETCOLORBYNAME SkyBlue\s*$/m,
        ],
      },
      { src: TRAIN_MAIN, ref: '713', any: [/PRINT \) - \s*$/m] },
      {
        src: TRAIN_MAIN,
        ref: '714-717',
        any: [/^\s*SETCOLORBYNAME LightSalmon\s*$/m],
      },
      { src: TRAIN_MAIN, ref: '719', any: [/PRINT  = \s*$/m] },
      { src: TRAIN_MAIN, ref: '728', any: [/PRINTL \|/] },
      { src: TRAIN_MAIN, ref: '736', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      { src: TRAIN_MAIN, ref: '737', any: [/^PRINTL 以上的点数变化了。\s*$/m] },
      // TRAIN_MAIN.ERB @FIGURE_INDENT
      {
        src: TRAIN_MAIN,
        ref: '743-758',
        any: [/^@FIGURE_INDENT\s*$/m, /^\s*SIF N < 10000000\s*$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-ablup.js',
    refs: [
      // ABL.ERB @SHOW_JUEL
      { src: ABL, ref: '3-27', any: [/^@SHOW_JUEL\s*$/m] },
      { src: ABL, ref: '4', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      { src: ABL, ref: '5', any: [/^FOR COUNT, 0, 12\s*$/m] },
      {
        src: ABL,
        ref: '6-14',
        any: [
          /^\s*IF COUNT == 3\s*$/m,
          /^\s*ELSEIF COUNT == 11\s*$/m,
          /^\s*ELSEIF COUNT == 12\s*$/m,
        ],
      },
      {
        src: ABL,
        ref: '15-18',
        any: [
          /^\s*IF COUNT == 0 && TALENT:TARGET:122\s*$/m,
          /阴茎点数：\{JUEL:LOCAL, 6, RIGHT\}/,
          /PRINTFORM  %PALAMNAME:LOCAL%点数：\{JUEL:LOCAL, 6, RIGHT\}/,
        ],
      },
      { src: ABL, ref: '21-24', any: [/IF \(COUNT\+1\)%4 == 0/] },
      { src: ABL, ref: '26', any: [/^PRINTL\s*$/m] },
      { src: ABL, ref: '27', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      // ABL.ERB @SHOW_ABLUP_SELECT
      {
        src: ABL,
        ref: '29-111',
        any: [
          /^@SHOW_ABLUP_SELECT\s*$/m,
          /^PRINTL \[999\] - 能力值提高结束\s*$/m,
        ],
      },
      { src: ABL, ref: '30', any: [/^U = 0\s*$/m] },
      { src: ABL, ref: '31', any: [/^REPEAT 40\s*$/m] },
      {
        src: ABL,
        ref: '32-41',
        any: [
          /^\s*SIF COUNT >= 4 && COUNT <=9\s*$/m,
          /^\s*SIF COUNT == 38\s*$/m,
        ],
      },
      {
        src: ABL,
        ref: '44-48',
        any: [
          /^\s*SIF TALENT:122 && \(COUNT == 2 \|\| COUNT == 22 \|\| COUNT == 33\)\s*$/m,
          /^\s*SIF TALENT:122 == 0 && \(COUNT == 23 \|\| COUNT == 34\)\s*$/m,
        ],
      },
      {
        src: ABL,
        ref: '51-65',
        any: [
          /^\s*IF X == 0 && TALENT:101 & 2\s*$/m,
          /^\s*PRINT \[―\]\s*$/m,
          /^\s*SETCOLOR 128, 128, 128\s*$/m,
          /PRINTFORM \[\{X, 2\}\]/,
        ],
      },
      {
        src: ABL,
        ref: '66-69',
        any: [
          /^\s*IF X == 0 && TALENT:122\s*$/m,
          /PRINTFORM 阴茎感觉 /,
          /PRINTFORM %ABLNAME:X,9,LEFT%/,
        ],
      },
      { src: ABL, ref: '77', any: [/PRINTFORM - LV\{ABL:X,2\}/] },
      { src: ABL, ref: '78', any: [/^\s*CALL DECIDE_ABLUP\s*$/m] },
      { src: ABL, ref: '80', any: [/^\s*U \+= 1\s*$/m] },
      { src: ABL, ref: '81-83', any: [/^\s*IF U % 4 == 0\s*$/m] },
      { src: ABL, ref: '85-86', any: [/^REND \s*$/m, /^SIF U % 4 != 0\s*$/m] },
      {
        src: ABL,
        ref: '88-91',
        any: [
          /PRINTFORM  \[99\]%MARKNAME:3% - LV\{MARK:3,2\}/,
          /^\s*CALL DECIDE_ABLUP99\s*$/m,
        ],
      },
      {
        src: ABL,
        ref: '92-101',
        any: [
          /^\s*SIF CSTR:7 != ""\s*$/m,
          /PRINTFORM   \[ 4\] %CSTR:7%感覚/,
          /^\s*CALL DECIDE_ABLUP4\s*$/m,
          /PRINTFORM   \[40\] %CSTR:7%中毒/,
          /^\s*CALL DECIDE_ABLUP40\s*$/m,
        ],
      },
      {
        src: ABL,
        ref: '102-108',
        any: [/^\[IF_DEBUG\]\s*$/m, /^\[ENDIF\]\s*$/m],
      },
      { src: ABL, ref: '109', any: [/^PRINTL \s*$/m] },
      { src: ABL, ref: '110', any: [/^CUSTOMDRAWLINE ‥\s*$/m] },
      { src: ABL, ref: '111', any: [/^PRINTL \[999\] - 能力值提高结束\s*$/m] },
    ],
  },
  {
    js: 'ere/page/page-info-exp.js',
    refs: [
      { src: CHARA_INFO_SHOW, ref: '1022-1122', any: [/^@SHOW_INFO_EXP /] },
      { src: CHARA_INFO_SHOW, ref: '1032', any: [/^REPEAT 82\s*$/m] },
      {
        src: CHARA_INFO_SHOW,
        ref: '1033-1034',
        any: [/^\s*SIF EXP:COUNT == 0\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1035',
        any: [
          /PRINTFORM 　%SUBSTRING\(EXPNAME:COUNT, 0,8\),8,LEFT%:\{EXP:COUNT,6,RIGHT\}/,
        ],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1037-1039',
        any: [/^\s*IF U % 4 == 0\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1042-1043',
        any: [/^\s*SIF !LINEISEMPTY\(\)\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1045-1054',
        any: [
          /^IF TARGET == 0\s*$/m,
          /^\s*ELSEIF TALENT:220 == 1\s*$/m,
          /X = CFLAG:9 \* 100 \+ 10/,
        ],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1055',
        any: [/PRINTFORML 　%SAVESTR:TARGET%当前是Lv\{CFLAG:TARGET:9\}/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1057-1122',
        any: [/^PRINT 　\s*$/m, /^\s*IF CFLAG:16 > -1\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1059-1061',
        any: [/^\s*LOCAL = CFLAG:16 - 1\s*$/m, /PRINT \[初吻对象：不明\]/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1062-1063',
        any: [
          /^\s*ELSEIF CFLAG:16 == 992\s*$/m,
          /PRINTFORM \[初吻对象：%CSTR:4%\]/,
        ],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1076-1077',
        any: [/^\s*ELSEIF CFLAG:16 == 999\s*$/m, /PRINT \[初吻对象：触手\]/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1078-1087',
        any: [
          /PRINTFORM \[初吻对象：%CSTR:4%的/,
          /^\s*IF CFLAG:16 < 100\s*$/m,
          /PRINT 肛门\]/,
        ],
      },
      { src: CHARA_INFO_SHOW, ref: '1092', any: [/^IF CFLAG:15 > 0\s*$/m] },
      {
        src: CHARA_INFO_SHOW,
        ref: '1093',
        any: [/^\s*LOCAL = CFLAG:15 - 1\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1106-1107',
        any: [/^\s*ELSEIF CFLAG:15 == 105\s*$/m],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1110-1111',
        any: [
          /^\s*ELSEIF LOCAL == 0\s*$/m,
          /PRINTFORM \[初体验对象：%CSTR:3%\]/,
        ],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '1118-1122',
        any: [
          /^PRINTL\s*$/m,
          /^IF CFLAG:16 > -1 \|\| CFLAG:15 > 0\s*$/m,
          /^CLEARLINE 1\s*$/m,
        ],
      },
    ],
  },

  {
    js: 'ere/page/page-select-target.js',
    refs: [
      // SHOP ver1.0.2.ERB @SELECT_TARGET
      {
        src: SHOP,
        ref: '234-327',
        any: [/^@SELECT_TARGET$/m, /^GOTO INPUT_LOOP$/m],
      },
      {
        src: SHOP,
        ref: '242-254',
        any: [/^FOR COUNT, 0, CHARANUM$/m, /^MAX_PAGE--$/m],
      },
      { src: SHOP, ref: '256-327', any: [/^\$INPUT_LOOP$/m] },
      {
        src: SHOP,
        ref: '271-273',
        any: [/^CUSTOMDRAWLINE =$/m, /请魔王大人选择将要调教的奴隶人选/],
      },
      {
        src: SHOP,
        ref: '275',
        any: [/^CALL SHOW_LIST_TRAINABLE\(NO_PAGE,NUM_PAGE,LIST_POS\)$/m],
      },
      {
        src: SHOP,
        ref: '276-279',
        any: [/表示人数が返ってくる/, /^IF RESULT < 1$/m],
      },
      {
        src: SHOP,
        ref: '280-285',
        any: [/^L_LCOUNT = LINECOUNT - L_LCOUNT$/m],
      },
      {
        src: SHOP,
        ref: '287-290',
        any: [/PRINTLC \[1000\] - 上一页/, /PRINTLC \[1001\] - 下一页/],
      },
      { src: SHOP, ref: '293', any: [/^INPUT$/m] },
      { src: SHOP, ref: '294-296', any: [/^IF RESULT == 999$/m, /;戻る/] },
      {
        src: SHOP,
        ref: '297-300',
        any: [/ELSEIF RESULT == 1002/, /^CALL MONSTER_PLAY$/m],
      },
      {
        src: SHOP,
        ref: '301-305',
        any: [/ELSEIF IS_TRAINABLE\(RESULT\) == 0/, /^FLAG:1 = TARGET /],
      },
      {
        src: SHOP,
        ref: '306-310',
        any: [/ELSEIF IS_ASSISTABLE\(RESULT\) == 0/, /^FLAG:2 = ASSI /],
      },
      {
        src: SHOP,
        ref: '311-316',
        any: [/ELSEIF RESULT == 1000/, /GOTO INPUT_LOOP/],
      },
      {
        src: SHOP,
        ref: '317-322',
        any: [/ELSEIF RESULT == 1001/, /GOTO INPUT_LOOP/],
      },
      {
        src: SHOP,
        ref: '323-327',
        any: [
          /ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/,
          /^GOTO INPUT_LOOP$/m,
        ],
      },
      // SHOP_FUNCTION.ERB 判定函数（SIF 实际行：109/111 与 120/122/124/126，
      // 含各自下一行的 RETURNF——工具首跑即证伪了「这侧本来就对」的印象）
      {
        src: SHOP_FUNCTION,
        ref: '109-110',
        any: [/SIF ARG < 1 \|\| ARG >= CHARANUM \|\| ARG == MASTER/],
      },
      {
        src: SHOP_FUNCTION,
        ref: '111-112',
        any: [/SIF CFLAG:ARG:1 != 0 ;調教中でないとダメ/],
      },
      {
        src: SHOP_FUNCTION,
        ref: '120-121',
        any: [/SIF ARG < 1 \|\| ARG >= CHARANUM ;キャラ登録範囲外はダメ/],
      },
      {
        src: SHOP_FUNCTION,
        ref: '122-123',
        any: [/SIF CFLAG:ARG:0 != 2 ;助手可能でないとダメ/],
      },
      {
        src: SHOP_FUNCTION,
        ref: '124-125',
        any: [/SIF CFLAG:ARG:1 != 0 ;調教中でないとダメ/],
      },
      {
        src: SHOP_FUNCTION,
        ref: '126-127',
        any: [/SIF TARGET == ARG ;調教対象はダメ/],
      },
    ],
  },
  // —— #63（ERB 侧完整性锁的登记示范：page-main-menu 原为零登记，
  //    实审 45 条查出 7 条错引用——状态行块整体偏早 4~5 行（:48→:53、
  //    :49→:54、:50-55→:55-59、:56-58→:60-62、:59-66→:64-71、:71→:72）
  //    与 :190-198 截尾（ELSE 兜底臂在 198-199），注释已订正；代码与
  //    正确行段一致，属注释烂、非移植缺陷。多来源：主源 DRAW_MAINMENU +
  //    按钮明暗 EXT_COMM + A 计数守卫 SHOP）——
  {
    // 标题画面（#69 新审计的引用：音乐与标题图接入；其余现有在豁免表）
    js: 'ere/page/page-title.js',
    refs: [
      // 标题音乐：音量无引擎等价物，值仅为存档保真播种（era-global）
      { src: TITLE, ref: '5', any: [/SETBGMVOLUME 标题音乐音量/] },
      // 标题图：HTML_PRINT <img src='TITLE'>（:22 旧引用偏早一行，#63 同款）
      { src: TITLE, ref: '23', any: [/img src='TITLE'/] },
      // 图下两个空行（旧引用 :23-24 同样偏早，随 #69 审计订正）
      { src: TITLE, ref: '26-27', any: [/^PRINTL\s*$/m] },
      // 离开标题停曲：新游戏（RESULT==1）与读档（RESULT==0）两分支
      { src: TITLE, ref: '95', any: [/^\s*STOPBGM\s*$/m] },
      { src: TITLE, ref: '105', any: [/^\s*STOPBGM\s*$/m] },
      // 读档调用后无条件 RESTART（#136：CALL SYSTEM_LOADGAME 的返回路径）
      { src: TITLE, ref: '110', any: [/^\s*RESTART\s*$/m] },
    ],
  },
  {
    js: 'ere/page/page-main-menu.js',
    refs: [
      // @DRAW_MAINMENU 骨架与文件头注明的四个子面板函数（函数体存根）
      { src: DRAW_MAINMENU, ref: '5-325', any: [/^@DRAW_MAINMENU\s*$/m] },
      { src: DRAW_MAINMENU, ref: '331', any: [/^@DRAW_HAVEITEMS/m] },
      { src: DRAW_MAINMENU, ref: '400', any: [/^@DRAW_HAVETRAPS/m] },
      {
        src: DRAW_MAINMENU,
        ref: '427',
        any: [/^@DRAW_DUNGEON_OVERVIEW\s*$/m],
      },
      { src: DRAW_MAINMENU, ref: '583', any: [/^@DRAW_DUNGEON_DAILY\s*$/m] },
      // BGM 段（#69 起接通：开关开时播据点2.mp3，音量无引擎等价物）
      { src: DRAW_MAINMENU, ref: '11-17', any: [/PLAYBGM/] },
      // 防御性修正（バグ対策）与 @EVENTSHOP 的同型段
      {
        src: DRAW_MAINMENU,
        ref: '20-39',
        any: [/^SIF TARGET > CHARANUM - 1$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '20-25',
        any: [/^SIF (TARGET|ASSI) > CHARANUM - 1$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '20-21',
        any: [/^SIF TARGET > CHARANUM - 1$/m],
      },
      { src: DRAW_MAINMENU, ref: '23-25', any: [/^SIF ASSI > CHARANUM - 1$/m] },
      { src: DRAW_MAINMENU, ref: '27-29', any: [/^SIF ASSI == TARGET$/m] },
      { src: DRAW_MAINMENU, ref: '31-34', any: [/^IF TARGET >= 1$/m] },
      { src: DRAW_MAINMENU, ref: '36-39', any: [/^IF ASSI >= 1$/m] },
      { src: DRAW_MAINMENU, ref: '41', any: [/^REDRAW 0$/m] },
      { src: SHOP, ref: '7-12', any: [/バグ対策/] },
      // 状态行（:45-75）——#63 订正块：六条原引用整体偏早
      { src: DRAW_MAINMENU, ref: '45-75', any: [/^ALIGNMENT RIGHT$/m] },
      {
        src: DRAW_MAINMENU,
        ref: '45',
        any: [/^DRAWLINEFORM %UNICODE\(0x2550\)%$/m],
      },
      { src: DRAW_MAINMENU, ref: '53', any: [/^FONTBOLD$/m] },
      { src: DRAW_MAINMENU, ref: '54', any: [/^ALIGNMENT RIGHT$/m] },
      { src: DRAW_MAINMENU, ref: '55-59', any: [/第\{DAY\/365\}年/] },
      { src: DRAW_MAINMENU, ref: '60-62', any: [/SIF DAY:2 == 15/] },
      {
        src: DRAW_MAINMENU,
        ref: '64-71',
        any: [/^IF TIME == 0$/m, /PRINTFORM \(所持金：\{MONEY\} pts\.\)/],
      },
      { src: DRAW_MAINMENU, ref: '72', any: [/^ALIGNMENT LEFT$/m] },
      // 入口按钮两纽与四钮
      {
        src: DRAW_MAINMENU,
        ref: '77',
        any: [/^DRAWLINEFORM %UNICODE\(0x2500\)%$/m],
      },
      { src: DRAW_MAINMENU, ref: '78-98', any: [/调教目标", 496/] },
      { src: DRAW_MAINMENU, ref: '80-85', any: [/^IF Target >= 1$/m] },
      { src: DRAW_MAINMENU, ref: '88-93', any: [/助手", 497/] },
      {
        src: DRAW_MAINMENU,
        ref: '100-145',
        any: [/PRINTBUTTON @"%SAVESTR:TARGET%", 498/],
      },
      {
        src: DRAW_MAINMENU,
        ref: '148',
        any: [/^DRAWLINEFORM %UNICODE\(0x2500\)%$/m],
      },
      { src: DRAW_MAINMENU, ref: '149-188', any: [/物品\/技能", 500/] },
      // A 计数的消费方守卫（@USERSHOP 的 100/496/497）
      { src: SHOP, ref: '152', any: [/ELSEIF RESULT == 496 && A > 0/] },
      { src: SHOP, ref: '154', any: [/ELSEIF RESULT == 497 && A > 0/] },
      // 子面板分发与指令面板
      {
        src: DRAW_MAINMENU,
        ref: '190-197',
        any: [/^\t*CALL DRAW_HAVEITEMS$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '190-200',
        any: [/CALL DRAW_DUNGEON_DAILY/],
      },
      {
        src: DRAW_MAINMENU,
        ref: '203-207',
        any: [/^PRINTFORML %UNICODE\(0x258c\)%Commands$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '203-319',
        any: [/^PRINTFORML %UNICODE\(0x258c\)%Commands$/m],
      },
      { src: DRAW_MAINMENU, ref: '206-207', any: [/Commands/] },
      { src: DRAW_MAINMENU, ref: '208-216', any: [/^A = 0$/m] },
      { src: DRAW_MAINMENU, ref: '208-319', any: [/PRINTLCD \[100\] 调教/] },
      { src: DRAW_MAINMENU, ref: '211-219', any: [/^A = 0$/m] },
      { src: DRAW_MAINMENU, ref: '226-231', any: [/PRINTLCD \[100\] 调教/] },
      {
        src: DRAW_MAINMENU,
        ref: '232-319',
        any: [/PRINTLCD \[101\] 能力显示/],
      },
      // [109] 侵略按钮（#129：原作无条件渲染，:283 前无 IF 守卫，对照
      // [100] 的 226-231）
      { src: DRAW_MAINMENU, ref: '282-283', any: [/PRINTLCD \[109\] 侵略/] },
      { src: DRAW_MAINMENU, ref: '283', any: [/PRINTLCD \[109\] 侵略/] },
      // [200]/[300] 存读档按钮（#137：原作无条件渲染，:303/:306 前无 IF
      // 守卫；#136 勘误移交——渲染侧从未画过，据点两处入口实机不可达）
      { src: DRAW_MAINMENU, ref: '303', any: [/PRINTLCD \[200\] 保存/] },
      { src: DRAW_MAINMENU, ref: '306', any: [/PRINTLCD \[300\] 读取/] },
      // —— #180（[102] 按钮 + @DRAW_DUNGEON_OVERVIEW/@DRAW_DUNGEON_DAILY 真身）——
      { src: DRAW_MAINMENU, ref: '239', any: [/^IF FLAG:502 == 0$/m] },
      {
        src: DRAW_MAINMENU,
        ref: '239-243',
        any: [/^IF FLAG:502 == 0$/m, /^PRINTLCD \[102\] 地下城$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '427-577',
        any: [/^@DRAW_DUNGEON_OVERVIEW$/m, /^#DIM DYNAMIC TEMP, 500$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '432-433',
        any: [/^PRINT$/m, /^PRINTFORML 迷宫Lv：/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '434-438',
        any: [/^REPEAT 99$/m, /^L_近卫 = 0$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '441-467',
        any: [/^IF CHARANUM >= 1$/m, /^REPEAT CHARANUM$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '450-455',
        any: [
          /^\s*IF CFLAG:COUNT:501 <= 1 && CFLAG:COUNT:502 == 0$/m,
          /^\s*TEMP:97 \+= 1$/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '458-462',
        any: [/^\s*IF CFLAG:COUNT:1 == 3$/m, /^\s*TEMP:96 \+= 1$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '465-466',
        any: [
          /^\s*L_近卫 \+= EX_TALENT:COUNT:1 > 0$/m,
          /^\s*L_奴隶 \+= CFLAG:COUNT:1 != 2 && CFLAG:COUNT:1 != 9$/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '471-569',
        any: [/^\s*B = 0$/m, /^\s*REPEAT 100$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '488-498',
        any: [
          /^\s*IF X != 10 && TEMP1:4 == 1$/m,
          /^\s*PRINTBUTTON LOCALS, X\+520$/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '509-511',
        any: [/^\s*A = Z \+ 100$/m, /^\s*B \+= ITEM:A$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '523-532',
        any: [
          /^\s*PRINTFORM 部下\{B, 4\}只, $/m,
          /^\s*PRINTFORM 勇者：\{TEMP:X, 2\}人$/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '533-552',
        any: [/^\s*PRINTFORM 设施：$/m, /^\s*PRINTFORM 娼馆街　$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '556-558',
        any: [
          /^\s*PRINTFORM 近卫兵：$/m,
          /^\s*PRINTFORML \{B \+ L_近卫, 4\}体/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '570-575',
        any: [/^PRINTL 　$/m, /^PRINTFORM  部下统计：/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '583-601',
        any: [/^@DRAW_DUNGEON_DAILY\s*$/m, /^CALL DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '584-586',
        any: [/^IF EX_FLAG:99 >= 100$/m, /^EX_FLAG:99 = 100$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '589-599',
        any: [
          /^IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m,
          /^PRINT 【广受爱戴】$/m,
        ],
      },
      {
        src: DRAW_MAINMENU,
        ref: '601',
        any: [/^CALL DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: DRAW_MAINMENU,
        ref: '320',
        any: [/^DRAWLINEFORM %UNICODE\(0x2550\)%$/m],
      },
      { src: DRAW_MAINMENU, ref: '323', any: [/^REDRAW 1$/m] },
    ],
  },
  // —— #73（画面组件最小集与主菜单迁入）——
  {
    js: 'ere/page/components/menu-button.js',
    refs: [
      // 按钮明暗近似的外源（menu_button 自 page-main-menu.js 收敛，#73）
      { src: DRAW_EXT_COMM, ref: '2', any: [/^@MENU_BUTTON/m] },
    ],
  },
  {
    js: 'ere/page/components/screen-block.js',
    refs: [
      // 就地重绘清行习语的原作出处（SHOP ver1.0.2.ERB @SELECT_TARGET 的
      // L_LCOUNT = LINECOUNT → 画 → CLEARLINE LINECOUNT-L_LCOUNT）
      { src: SHOP, ref: '274', any: [/^L_LCOUNT = LINECOUNT$/m] },
      {
        src: SHOP,
        ref: '280',
        any: [/^L_LCOUNT = LINECOUNT - L_LCOUNT$/m],
      },
      { src: SHOP, ref: '314', any: [/CLEARLINE LINECOUNT-L_LCOUNT/] },
    ],
  },
  {
    js: 'ere/utils/stub-line.js',
    refs: [
      // 分发期等键 = 原作 PRINTW 习语（print + 读键后清行回循环）
      {
        src: SHOP_2,
        ref: '124-126',
        any: [/PRINTW 数值已超出允许范围外/],
      },
    ],
  },

  {
    // #222（J12）：COM30–38 奉仕系的公共 A 文分支与骑乘位反应。
    js: 'ere/system/train/com-service.js',
    refs: [
      { src: MESSAGE_A, ref: '30-108', any: [/IF TFLAG:9 == 0/m] },
      {
        src: MESSAGE_A,
        ref: '1175-1203',
        any: [/ELSEIF SELECTCOM == 34 \|\| SELECTCOM == 36/m],
      },
      { src: COMABLE, ref: '1447-1870', any: [/@COM_ABLE30/m, /@COM_ABLE38/m] },
      {
        src: MESSAGE_B,
        ref: '1485-1739',
        any: [/ELSEIF SELECTCOM == 30/m, /ELSEIF SELECTCOM == 38/m],
      },
      { src: COMF30, ref: '1-11', any: [/@COM30/m, /CALL GET_ADV_COM/m] },
      {
        src: COMF34,
        ref: '12-17',
        any: [/CALL GET_ADV_COM,LOCAL/m, /FLAG:71 = 0/m],
      },
    ],
  },
  {
    // #213：@GET_ADV_COM 升格骨架（SELECTCASE 全文；零规则态）
    js: 'ere/system/train/com-adv.js',
    refs: [{ src: COMF_JUMP, ref: '1-684', any: [/@GET_ADV_COM/] }],
  },
  {
    // #221（J11）：COM20–29 性交系的升格规则内联锚。
    js: 'ere/system/train/com-sex.js',
    refs: [
      { src: COMF_JUMP, ref: '152-163', any: [/前回と今回の調教者が同じ/] },
      { src: COMF_JUMP, ref: '228-239', any: [/まず背后位・胸爱抚/] },
    ],
  },
  {
    // #213：L_IDX↔L_I 映射层（@SHOW_COMMENU 的紧凑序号循环）
    js: 'ere/system/train/com-index.js',
    refs: [
      { src: USERCOM, ref: '188-216', any: [/@SHOW_COMMENU/, /L_IDX\+\+/] },
    ],
  },
  {
    // #213：@V_ABLE 公共头（COMABLE.ERB 文件头；消费点 BENKI.ERB:1400/1407 随 J7）
    js: 'ere/system/train/v-able.js',
    refs: [
      { src: COMABLE, ref: '3-20', any: [/@V_ABLE\(ARG\)/] },
      { src: COMABLE, ref: '5-20', any: [/;オトコだとダメ/, /^RETURN 1$/m] },
      { src: COMABLE, ref: '6-7', any: [/^SIF TALENT:\(ARG\):122$/m] },
      { src: COMABLE, ref: '9-10', any: [/^SIF TALENT:\(ARG\):135$/m] },
      { src: COMABLE, ref: '12-13', any: [/^SIF TALENT:\(ARG\):0$/m] },
      { src: COMABLE, ref: '15-16', any: [/SIF CFLAG:\(ARG\):42 == 79/] },
      { src: COMABLE, ref: '18-19', any: [/SIF TALENT:\(ARG\):273/] },
      { src: COMABLE, ref: '20', any: [/^RETURN 1$/m] },
      { src: BENKI, ref: '1407', any: [/CALL V_ABLE,ARG/] },
    ],
  },
  {
    // #217 J7 肉便器：ere/system/train/benki.js（@BENKI 与战斗三段真身）
    js: 'ere/system/train/benki.js',
    refs: [
      { src: TEXT_CORRECT_ERB, ref: '1-7', any: [/@SHE\(ARG\)/] },
      { src: BENKI, ref: '2-1356', any: [/^@BENKI, ARG:0$/m] },
      { src: BENKI, ref: '4', any: [/^#DIM BENKI_MENU,10$/m] },
      { src: BENKI, ref: '4-6', any: [/^#DIM BENKI_MENU,10$/m] },
      {
        src: BENKI,
        ref: '26-30',
        any: [/^ELSEIF TALENT:\(ARG:0\):肉便器 == 0$/m],
      },
      { src: BENKI, ref: '33-36', any: [/^\s*SIF BASE:\(ARG:0\):0 < 300$/m] },
      { src: BENKI, ref: '38-40', any: [/調教中以外除去/] },
      { src: BENKI, ref: '50-52', any: [/^PRINTL/m] },
      { src: BENKI, ref: '62-78', any: [/常識改変フラグ/] },
      {
        src: BENKI,
        ref: '94-193',
        any: [/^;处女（V減少）$/m, /^;献身的（奉仕）$/m],
      },
      { src: BENKI, ref: '132-155', any: [/^;能力値$/m] },
      { src: BENKI, ref: '149-171', any: [/特殊な経験の有無/] },
      { src: BENKI, ref: '174-176', any: [/^;貞操帯（V減少）$/m] },
      {
        src: BENKI,
        ref: '181-193',
        any: [/^\s*SIF TALENT:\(ARG:0\):283 == 1$/m],
      },
      { src: BENKI, ref: '196-225', any: [/共通のPLAY補正/] },
      { src: BENKI, ref: '228-240', any: [/后面是我主要修改东西/] },
      { src: BENKI, ref: '243-346', any: [/配信分岐/] },
      { src: BENKI, ref: '393-400', any: [/^;DUNGEON_BITCH_LOG.ERB参照$/m] },
      { src: BENKI, ref: '411-421', any: [/^;説明（～をした）$/m] },
      { src: BENKI, ref: '426-491', any: [/^ELSEIF FLAG:62 == 3$/m] },
      { src: BENKI, ref: '468-491', any: [/^;乳内妊娠$/m] },
      { src: BENKI, ref: '491', any: [/^ELSEIF FLAG:62 == 10$/m] },
      { src: BENKI, ref: '495-577', any: [/露出＆獣姦/] },
      { src: BENKI, ref: '565', any: [/^\s*PRINTFORM 服侍了起来$/m] },
      { src: BENKI, ref: '591', any: [/^\s*CALL BENKI_KOUJO$/m] },
      { src: BENKI, ref: '624-757', any: [/配信/] },
      { src: BENKI, ref: '626-637', any: [/被复制/] },
      { src: BENKI, ref: '645-710', any: [/PRINTFORML 了。/] },
      { src: BENKI, ref: '653', any: [/^\s*ELSE$/m] },
      {
        src: BENKI,
        ref: '658-660',
        any: [/^\s*JUEL:\(ARG:0\):0 \+= PLAY\*10$/m],
      },
      { src: BENKI, ref: '696-697', any: [/^\s*IF BENKI_MENU:2 >= 3$/m] },
      { src: BENKI, ref: '712-861', any: [/兽奸ソース3以上で兽奸分岐/] },
      { src: BENKI, ref: '808', any: [/^\s*CALL BENKI_KOUJO$/m] },
      { src: BENKI, ref: '819', any: [/^\s*JUEL:\(ARG:0\):0 \+= PLAY\*10$/m] },
      { src: BENKI, ref: '863-1032', any: [/露出のソース3以上で公開/] },
      { src: BENKI, ref: '873', any: [/^\s*PRINTFORM 举止高贵地$/m] },
      { src: BENKI, ref: '982', any: [/^\s*CALL BENKI_KOUJO$/m] },
      {
        src: BENKI,
        ref: '992-1021',
        any: [/^\s*JUEL:\(ARG:0\):5 \+= PLAY\*10$/m],
      },
      { src: BENKI, ref: '1059-1185', any: [/在精囊被掏空之前/] },
      { src: BENKI, ref: '1128', any: [/^\s*CALL BENKI_KOUJO$/m] },
      {
        src: BENKI,
        ref: '1229-1349',
        any: [/^\s*;奴隷の様子$/m, /^\s*;精液経験で分岐$/m],
      },
      { src: BENKI, ref: '1310', any: [/^\s*CALL BENKI_KOUJO$/m] },
      {
        src: BENKI,
        ref: '1359-1427',
        any: [/^@SELECT_BENKI_MENU\(ARG, ARGS\)$/m],
      },
      { src: BENKI, ref: '1375-1403', any: [/技巧2以上で手淫分岐/] },
      { src: BENKI, ref: '1430-1494', any: [/^@NAME_BENKI_MENU\(ARG\)$/m] },
      { src: BENKI, ref: '1440-1492', any: [/^CASE 2$/m] },
      {
        src: BENKI,
        ref: '1497-1654',
        any: [/^@GET_EXP_BENKI_MENU\(ARG, ARG:1\)$/m],
      },
      { src: BENKI, ref: '162-270', any: [/^\s*BENKI_MENU:4 \+= 1$/m] },
      { src: BENKI, ref: '1656-1681', any: [/^@BENKI_PLAYER_NAME$/m] },
    ],
  },
  // —— #220（J10：道具使用族 10-19——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE）——
  {
    js: 'ere/system/train/com-toy.js',
    refs: [
      { src: COMF10, ref: '8-52', any: [/@COM10/] },
      { src: COMF11, ref: '7-171', any: [/@COM11/] },
      { src: COMF11, ref: '177-334', any: [/@EQUIP_COM11/] },
      { src: COMF12, ref: '9-53', any: [/@COM12/] },
      { src: COMF13, ref: '7-198', any: [/@COM13/] },
      { src: COMF13, ref: '204-377', any: [/@EQUIP_COM13/] },
      { src: COMF14, ref: '7-67', any: [/@COM14/] },
      { src: COMF14, ref: '73-139', any: [/@EQUIP_COM14/] },
      { src: COMF15, ref: '7-86', any: [/@COM15/] },
      { src: COMF15, ref: '92-168', any: [/@EQUIP_COM15/] },
      { src: COMF16, ref: '7-98', any: [/@COM16/] },
      { src: COMF16, ref: '104-221', any: [/@EQUIP_COM16/] },
      { src: COMF17, ref: '7-70', any: [/@COM17/] },
      { src: COMF17, ref: '76-153', any: [/@EQUIP_COM17/] },
      { src: COMF18, ref: '7-105', any: [/@COM18/] },
      { src: COMF18, ref: '111-204', any: [/@EQUIP_COM18/] },
      { src: COMF19, ref: '7-155', any: [/@COM19/] },
      { src: COMF19, ref: '161-310', any: [/@EQUIP_COM19/] },
      { src: COMABLE, ref: '382-859', any: [/@COM_ABLE10/] },
      { src: MESSAGE_B, ref: '783-1013', any: [/ELSEIF SELECTCOM == 10/] },
      { src: MESSAGE_A, ref: '986-1149', any: [/ELSEIF SELECTCOM == 10/] },
    ],
  },
  // —— #224（J14：特殊指令族 50-59——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE）——
  {
    js: 'ere/system/train/com-special.js',
    refs: [
      { src: COMF50, ref: '3-28', any: [/@COM50/] },
      { src: COMF51, ref: '10-97', any: [/@COM51/] },
      { src: COMF52, ref: '6-71', any: [/@COM52/] },
      { src: COMF53, ref: '3-49', any: [/@COM53/] },
      { src: COMF53, ref: '52-204', any: [/;ビデオ撮影中/] },
      { src: COMF54, ref: '3-109', any: [/@COM54/] },
      { src: COMF54, ref: '111-211', any: [/@EQUIP_COM54/] },
      { src: COMF55, ref: '7-84', any: [/@COM55/] },
      { src: COMF56, ref: '6-196', any: [/@COM56/] },
      { src: COMF57, ref: '3-131', any: [/@COM57/] },
      { src: COMF57, ref: '134-254', any: [/@EQUIP_COM57/] },
      { src: COMF58, ref: '3-98', any: [/@COM58/] },
      { src: COMF58, ref: '100-198', any: [/@EQUIP_COM58/] },
      { src: COMF59, ref: '3-160', any: [/@COM59/] },
      { src: COMF59, ref: '163-318', any: [/@EQUIP_COM59/] },
      { src: COMABLE, ref: '2246-2506', any: [/@COM_ABLE50/] },
      { src: MESSAGE_A, ref: '362-373', any: [/ELSEIF SELECTCOM == 55/] },
      { src: MESSAGE_B, ref: '1901-2063', any: [/ELSEIF SELECTCOM == 50/] },
      { src: COMF54, ref: '119-196', any: [/A = 500/] },
      { src: COMF54, ref: '23-34', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF54, ref: '122-133', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF54, ref: '35-60', any: [/IF ABL:17 == 0/] },
      { src: COMF54, ref: '134-159', any: [/IF ABL:17 == 0/] },
      { src: COMF54, ref: '61-74', any: [/IF ABL:21 == 0/] },
      { src: COMF54, ref: '76-78', any: [/SIF TALENT:28/] },
      { src: COMF54, ref: '79-81', any: [/SIF TALENT:33/] },
      { src: COMF54, ref: '83-85', any: [/SIF TALENT:10/] },
      { src: COMF54, ref: '86-88', any: [/SIF TALENT:35/] },
      { src: COMF50, ref: '6', any: [/PRINTL 润滑液/] },
      { src: COMF50, ref: '8', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF50, ref: '13', any: [/SOURCE:10 = 10000/] },
      { src: COMF50, ref: '14', any: [/SOURCE:12 = 300/] },
      { src: COMF50, ref: '16', any: [/ITEM:25 -= 1/] },
      {
        src: COMF50,
        ref: '18-26',
        any: [/IF TALENT:122 == 0 && TALENT:PLAYER:122 == 0/],
      },
      { src: COMF51, ref: '12', any: [/PRINTL 媚药/] },
      { src: COMF51, ref: '14', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF51, ref: '59-61', any: [/SIF LOSEBASE:0 < 0/] },
      { src: COMF52, ref: '8', any: [/PRINTL 利尿剂/] },
      { src: COMF52, ref: '10', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF53, ref: '7', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF53, ref: '63-65', any: [/CFLAG:491 \+= 1/] },
      { src: COMF58, ref: '13-14', any: [/SIF TEQUIP:18/] },
      { src: COMF58, ref: '15', any: [/TEQUIP:58 = 0/] },
    ],
  },
  {
    js: 'ere/system/train/com-colosseum.js',
    refs: [
      { src: COMF200, ref: '8-37', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF200, ref: '10', any: [/PRINTL\ 死斗场决斗/m] },
      { src: COMF200, ref: '11', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF200, ref: '13-16', any: [/TEQUIP:55\ =\ 0/m] },
      { src: COMF200, ref: '17-34', any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m] },
      { src: COMF200, ref: '21', any: [/A\ =\ 100/m] },
      { src: COMF200, ref: '24-25', any: [/TIMES\ A\ ,\ 2\.00/m] },
      { src: COMF200, ref: '27-28', any: [/TIMES\ A\ ,\ 0\.60/m] },
      { src: COMF200, ref: '30-31', any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m] },
      { src: COMF200, ref: '33', any: [/UP:10\ \+=\ A\ \*\ 20/m] },
      { src: COMF200, ref: '34', any: [/SOURCE:14\ \+=\ A\ \*\ 5/m] },
      { src: COMF200, ref: '36', any: [/T\ =\ 0/m] },
      { src: COMF200, ref: '37', any: [/RETURN\ 1/m] },
      { src: COMF200, ref: '40-68', any: [/TIMES\ SOURCE:17\ ,\ 2\.00/m] },
      {
        src: COMF200,
        ref: '73-95',
        any: [/IF\ BASE:ASSI:1\ <\ \(MAXBASE:ASSI:1\ \/\ 5\)/m],
      },
      { src: COMF200, ref: '74-78', any: [/IF\ BASE:TARGET:1\ >\ 0/m] },
      { src: COMF200, ref: '81', any: [/PRINTL\ ＜奴隶陷落＞/m] },
      { src: COMF200, ref: '83', any: [/TFLAG:401\ =\ 1/m] },
      {
        src: COMF200,
        ref: '85-90',
        any: [/IF\ BASE:ASSI:1\ <\ \(MAXBASE:ASSI:1\ \/\ 5\)/m],
      },
      { src: COMF200, ref: '87', any: [/PRINTL\ ＜助手退却＞/m] },
      { src: COMF200, ref: '88', any: [/ASSIPLAY\ =\ 0/m] },
      { src: COMF200, ref: '93', any: [/RETURN\ 1/m] },
      { src: COMF200, ref: '98-119', any: [/CALL\ WEAPON_RESTORE,TARGET/m] },
      { src: COMF200, ref: '99', any: [/A\ =\ TARGET/m] },
      { src: COMF200, ref: '101', any: [/CALL\ WEAPON_RESTORE,TARGET/m] },
      { src: COMF200, ref: '102', any: [/B\ =\ 0/m] },
      { src: COMF200, ref: '104-105', any: [/B\ \+=\ CFLAG:A:11/m] },
      { src: COMF200, ref: '106-107', any: [/B\ \+=\ CFLAG:A:12/m] },
      { src: COMF200, ref: '109-110', any: [/SIF\ TALENT:A:241\ ==\ 1/m] },
      { src: COMF200, ref: '111-112', any: [/SIF\ TALENT:A:250\ ==\ 1/m] },
      { src: COMF200, ref: '114-116', any: [/B\ \/=\ MAXBASE:A:1/m] },
      { src: COMF200, ref: '118-119', any: [/SIF\ B\ <=\ 0/m] },
      { src: COMF200, ref: '126-148', any: [/CALL\ WEAPON_RESTORE,ASSI/m] },
      { src: COMF200, ref: '127', any: [/A\ =\ ASSI/m] },
      { src: COMF200, ref: '129', any: [/CALL\ WEAPON_RESTORE,ASSI/m] },
      { src: COMF200, ref: '130', any: [/B\ =\ 0/m] },
      { src: COMF200, ref: '132-133', any: [/B\ \+=\ CFLAG:A:11/m] },
      { src: COMF200, ref: '134-135', any: [/B\ \+=\ CFLAG:A:12/m] },
      { src: COMF200, ref: '137-138', any: [/SIF\ TALENT:A:241\ ==\ 1/m] },
      { src: COMF200, ref: '139-140', any: [/SIF\ TALENT:A:250\ ==\ 1/m] },
      { src: COMF200, ref: '142-143', any: [/B\ \*=\ \(BASE:A:1\ \/\ 100\)/m] },
      { src: COMF200, ref: '145-146', any: [/SIF\ B\ <=\ 0/m] },
      {
        src: COMF201,
        ref: '8-118',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      { src: COMF201, ref: '10-11', any: [/SIF\ ASSI\ !=\ PLAYER/m] },
      { src: COMF201, ref: '13', any: [/PRINTL\ 助手/m] },
      { src: COMF201, ref: '15', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF201, ref: '20-23', any: [/LOSEBASE:1\ \+=\ RESULT\ \*\ 10/m] },
      { src: COMF201, ref: '20', any: [/CALL\ ARENA_ASSI_POINT/m] },
      { src: COMF201, ref: '22-23', any: [/LOSEBASE:1\ \+=\ RESULT\ \*\ 10/m] },
      { src: COMF201, ref: '27', any: [/CALL\ ARENA_SLAVE_POINT/m] },
      {
        src: COMF201,
        ref: '30-45',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:ASSI%发出痛恨的一击，将%SAVESTR:TARGET%的武器打掉了。/m,
        ],
      },
      {
        src: COMF201,
        ref: '32-34',
        any: [/PRINTFORMW\ %SAVESTR:ASSI%将%SAVESTR:TARGET%踩在脚下。/m],
      },
      { src: COMF201, ref: '37-38', any: [/LOSEBASE:1\ \+=\ C\ \*\ 5/m] },
      {
        src: COMF201,
        ref: '39-42',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:ASSI%发出痛恨的一击，将%SAVESTR:TARGET%的武器打掉了。/m,
        ],
      },
      {
        src: COMF201,
        ref: '44-47',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对%SAVESTR:ASSI%进行了反击。/m],
      },
      { src: COMF201, ref: '52', any: [/TFLAG:400\ =\ 201/m] },
      { src: COMF201, ref: '54', any: [/CALL\ COM_AFTER_ARENA/m] },
      { src: COMF201, ref: '55-56', any: [/SIF\ RESULT\ ==\ 0/m] },
      { src: COMF201, ref: '58-59', any: [/SIF\ ASSI\ !=\ PLAYER/m] },
      {
        src: COMF201,
        ref: '64-115',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      { src: COMF201, ref: '65', any: [/PRINTL\ 对哪里进行凌辱？/m] },
      {
        src: COMF201,
        ref: '66-67',
        any: [
          /SIF\ TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1/m,
        ],
      },
      { src: COMF201, ref: '68', any: [/PRINTL\ \[1\]\ \-\ 胸部/m] },
      {
        src: COMF201,
        ref: '69-70',
        any: [
          /SIF\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      {
        src: COMF201,
        ref: '71-72',
        any: [
          /SIF\ TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1/m,
        ],
      },
      { src: COMF201, ref: '73', any: [/PRINTL\ \[999\]\ 暂时放过/m] },
      { src: COMF201, ref: '75', any: [/INPUT/m] },
      {
        src: COMF201,
        ref: '77-85',
        any: [
          /IF\ RESULT\ ==\ 0\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)/m,
        ],
      },
      { src: COMF201, ref: '82-83', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF201,
        ref: '85',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF201,
        ref: '86-91',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF201,
        ref: '91',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF201,
        ref: '92-103',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      { src: COMF201, ref: '94-95', any: [/SIF\ TALENT:122/m] },
      { src: COMF201, ref: '100-101', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF201,
        ref: '103',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF201,
        ref: '104-109',
        any: [
          /ELSEIF\ RESULT\ ==\ 3\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)/m,
        ],
      },
      {
        src: COMF201,
        ref: '109',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF201,
        ref: '110-112',
        any: [/PRINTFORMW\ %NAME:MASTER%叫%SAVESTR:ASSI%退下了……/m],
      },
      { src: COMF201, ref: '113-114', any: [/GOTO\ INPUT_LOOP_0/m] },
      { src: COMF201, ref: '117', any: [/RETURN\ 1/m] },
      {
        src: COMF202,
        ref: '17-43',
        any: [
          /PRINTFORMW\ 连地下城中最低等最卑微的种族都打不过，手足无措的%SAVESTR:TARGET%被无情地嘲笑着。/m,
        ],
      },
      { src: COMF202, ref: '9', any: [/PRINTL\ 最下层居民/m] },
      { src: COMF202, ref: '11', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF202, ref: '17-20', any: [/CALL\ ARENA_SLAVE_POINT/m] },
      { src: COMF202, ref: '20', any: [/CALL\ ARENA_SLAVE_POINT/m] },
      {
        src: COMF202,
        ref: '21-38',
        any: [
          /PRINTFORMW\ 连地下城中最低等最卑微的种族都打不过，手足无措的%SAVESTR:TARGET%被无情地嘲笑着。/m,
        ],
      },
      {
        src: COMF202,
        ref: '23-25',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%无法抵抗，被嘲笑了。/m],
      },
      { src: COMF202, ref: '29-30', any: [/LOSEBASE:1\ \+=\ 200/m] },
      {
        src: COMF202,
        ref: '31-34',
        any: [/PRINTFORMW\ 终于，%SAVESTR:TARGET%倒下了。/m],
      },
      {
        src: COMF202,
        ref: '36-38',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%蹂躏着最下层居民，打得他们满地打滚，这个已经不能被称为战斗了。/m,
        ],
      },
      { src: COMF202, ref: '43', any: [/TFLAG:400\ =\ 202/m] },
      { src: COMF202, ref: '45', any: [/CALL\ COM_AFTER_ARENA/m] },
      { src: COMF202, ref: '46-47', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF202,
        ref: '52-101',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      { src: COMF202, ref: '53', any: [/PRINTL\ 对哪里进行凌辱？/m] },
      { src: COMF202, ref: '54', any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m] },
      { src: COMF202, ref: '55', any: [/PRINTL\ \[1\]\ \-\ 胸部/m] },
      {
        src: COMF202,
        ref: '56-57',
        any: [/SIF\ !TALENT:122\ \&\&\ !TALENT:273\ \&\&\ CFLAG:42\ !=\ 79/m],
      },
      { src: COMF202, ref: '58', any: [/PRINTL\ \[3\]\ \-\ 肛门/m] },
      { src: COMF202, ref: '59', any: [/PRINTL\ \[999\]\ 暂时放过/m] },
      { src: COMF202, ref: '61', any: [/INPUT/m] },
      {
        src: COMF202,
        ref: '63-71',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      { src: COMF202, ref: '67-69', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF202,
        ref: '71',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '72-77',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '77',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '78-89',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      {
        src: COMF202,
        ref: '80-81',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      { src: COMF202, ref: '85-87', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF202,
        ref: '89',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '90-95',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '95',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: COMF202,
        ref: '96-98',
        any: [/PRINTFORMW\ %SAVESTR:MASTER%让最下层居民退下了……/m],
      },
      { src: COMF202, ref: '99-100', any: [/GOTO\ INPUT_LOOP_0/m] },
      {
        src: COMF202,
        ref: '103-289',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      { src: COMF202, ref: '107-108', any: [/SIF\ MAXBASE:MASTER:4\ ==\ 0/m] },
      { src: COMF202, ref: '110', any: [/B\ =\ 0/m] },
      { src: COMF202, ref: '112-125', any: [/ELSEIF\ ABL:12\ ==\ 1/m] },
      { src: COMF202, ref: '127-141', any: [/ELSEIF\ ABL:10\ ==\ 1/m] },
      { src: COMF202, ref: '143-157', any: [/ELSEIF\ PALAM:5\ <\ PALAMLV:2/m] },
      { src: COMF202, ref: '159-177', any: [/ELSEIF\ SELECTCOM\ ==\ 21/m] },
      { src: COMF202, ref: '179', any: [/BASE:MASTER:4\ \+=\ B/m] },
      { src: COMF202, ref: '181', any: [/S\ =\ BASE:MASTER:4/m] },
      { src: COMF202, ref: '182', any: [/EJAC\ =\ MAXBASE:MASTER:4/m] },
      { src: COMF202, ref: '184-190', any: [/IF\ \ S\ >\ EJAC\ \*\ 2/m] },
      { src: COMF202, ref: '192-224', any: [/TIMES\ SOURCE:4\ ,\ 3\.00/m] },
      { src: COMF202, ref: '194', any: [/TIMES\ SOURCE:4\ ,\ 3\.00/m] },
      { src: COMF202, ref: '196-224', any: [/TIMES\ SOURCE:5\ ,\ 2\.00/m] },
      { src: COMF202, ref: '226', any: [/EXP:20\ \+=\ 3/m] },
      { src: COMF202, ref: '227', any: [/PRINTL\ 怪物大量射精/m] },
      { src: COMF202, ref: '228', any: [/PRINTL\ 精液经验＋３/m] },
      { src: COMF202, ref: '230', any: [/BASE:MASTER:4\ \-=\ EJAC\*2/m] },
      { src: COMF202, ref: '231-232', any: [/SIF\ BASE:MASTER:4\ >=\ EJAC/m] },
      {
        src: COMF202,
        ref: '233-235',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      { src: COMF202, ref: '236-238', any: [/SIF\ SELECTCOM\ ==\ 31/m] },
      {
        src: COMF202,
        ref: '239-241',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 27/m],
      },
      { src: COMF202, ref: '244', any: [/EXP:20\ \+=\ 1/m] },
      { src: COMF202, ref: '245', any: [/PRINTL\ 怪物射精/m] },
      { src: COMF202, ref: '246', any: [/PRINTL\ 精液经验＋１/m] },
      { src: COMF202, ref: '248', any: [/BASE:MASTER:4\ \-=\ EJAC/m] },
      { src: COMF202, ref: '249-250', any: [/SIF\ BASE:MASTER:4\ >=\ EJAC/m] },
      {
        src: COMF202,
        ref: '251-253',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      { src: COMF202, ref: '254-256', any: [/SIF\ SELECTCOM\ ==\ 31/m] },
      {
        src: COMF202,
        ref: '257-259',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 27/m],
      },
      {
        src: COMF202,
        ref: '267-284',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \&\&\ E\ >\ 0/m],
      },
      { src: COMF202, ref: '267-268', any: [/SIF\ SELECTCOM\ ==\ 21/m] },
      { src: COMF202, ref: '269-270', any: [/SIF\ SELECTCOM\ ==\ 27/m] },
      { src: COMF202, ref: '271-272', any: [/SIF\ SELECTCOM\ ==\ 30/m] },
      { src: COMF202, ref: '273-274', any: [/SIF\ SELECTCOM\ ==\ 31/m] },
      { src: COMF202, ref: '275-276', any: [/SIF\ SELECTCOM\ ==\ 37/m] },
      {
        src: COMF202,
        ref: '277-278',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \&\&\ E\ >\ 0/m],
      },
      {
        src: COMF202,
        ref: '279-280',
        any: [/SIF\ SELECTCOM\ ==\ 27\ \&\&\ E\ >\ 0/m],
      },
      {
        src: COMF202,
        ref: '281-282',
        any: [/SIF\ SELECTCOM\ ==\ 30\ \&\&\ E\ >\ 0/m],
      },
      {
        src: COMF202,
        ref: '283-284',
        any: [/SIF\ SELECTCOM\ ==\ 31\ \&\&\ E\ >\ 0/m],
      },
      { src: COMF202, ref: '287', any: [/TFLAG:15\ =\ E/m] },
      { src: COMF202, ref: '289', any: [/RETURN\ 1/m] },
      { src: COMF204, ref: '35', any: [/PRINTL\ ＜奴隶陷落＞/m] },
      {
        src: COMF206,
        ref: '98-99',
        any: [/PRINTFORMW\ %SAVESTR:MASTER%让巨魔退下了……/m],
      },
      {
        src: COMF206,
        ref: '108-126',
        any: [/IF\ EXP:52\ ==\ 0\ \&\&\ SELECTCOM\ ==\ 21/m],
      },
      {
        src: COMF207,
        ref: '9-63',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被媚药史莱姆包裹着，完全无法抵抗了。/m,
        ],
      },
      { src: COMF207, ref: '9', any: [/PRINTL\ 媚药史莱姆/m] },
      { src: COMF207, ref: '11', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      {
        src: COMF207,
        ref: '16-18',
        any: [/LOSEBASE:1\ \+=\ CFLAG:0:9\ \*\ 10/m],
      },
      { src: COMF207, ref: '18', any: [/CALL\ ARENA_SLAVE_POINT/m] },
      {
        src: COMF207,
        ref: '21-38',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被媚药史莱姆包裹着，完全无法抵抗了。/m,
        ],
      },
      {
        src: COMF207,
        ref: '28-30',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:TARGET%被淹没在媚药史莱姆的体内了。/m,
        ],
      },
      { src: COMF207, ref: '31', any: [/ENDIF/m] },
      { src: COMF207, ref: '40', any: [/TFLAG:400\ =\ 207/m] },
      { src: COMF207, ref: '42', any: [/CALL\ COM_AFTER_ARENA/m] },
      { src: COMF207, ref: '43-44', any: [/SIF\ RESULT\ ==\ 0/m] },
      {
        src: COMF207,
        ref: '46-79',
        any: [
          /PRINTFORMW\ 在倒下的%SAVESTR:TARGET%私处里，灌入了大量的粘液，从阴唇到子宫都灌满了。/m,
        ],
      },
      { src: COMF207, ref: '47', any: [/PRINTL\ 把粘液灌到哪里？？/m] },
      { src: COMF207, ref: '48', any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m] },
      { src: COMF207, ref: '49-50', any: [/SIF\ TALENT:122\ ==\ 0/m] },
      { src: COMF207, ref: '51', any: [/PRINTL\ \[2\]\ \-\ 肛门/m] },
      { src: COMF207, ref: '52', any: [/PRINTL\ \[999\]\ 暂时放过/m] },
      { src: COMF207, ref: '54', any: [/INPUT/m] },
      {
        src: COMF207,
        ref: '56-59',
        any: [/PRINTFORMW\ 在倒下的%SAVESTR:TARGET%嘴里，灌入了大量的粘液。/m],
      },
      { src: COMF207, ref: '63-65', any: [/SIF\ TALENT:122/m] },
      {
        src: COMF207,
        ref: '68-74',
        any: [
          /PRINTFORMW\ 在倒下的%SAVESTR:TARGET%肛门里，灌入了大量的粘液。/m,
        ],
      },
      { src: COMF207, ref: '77', any: [/ELSEIF\ RESULT\ ==\ 999/m] },
      { src: COMF207, ref: '78-79', any: [/GOTO\ INPUT_LOOP_0/m] },
      { src: COMF207, ref: '82', any: [/RETURN\ 1/m] },
      {
        src: COMABLE,
        ref: '4650-4755',
        any: [
          /SIF\ TEQUIP:55\ ==\ 0\ \&\&\ \(TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17\ \|\|\ TEQUIP:19\ \|\|\ TEQUIP:43\ \|\|\ TEQUIP:44\ \|\|\ TEQUIP:45\ \|\|\ TEQUIP:46\|\|\ TEQUIP:49\ \|\|\ TEQUIP:54\ \|\|\ TEQUIP:89\)/m,
        ],
      },
      {
        src: COMABLE,
        ref: '4654-4655',
        any: [
          /SIF\ TEQUIP:55\ ==\ 0\ \&\&\ \(TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17\ \|\|\ TEQUIP:19\ \|\|\ TEQUIP:43\ \|\|\ TEQUIP:44\ \|\|\ TEQUIP:45\ \|\|\ TEQUIP:46\|\|\ TEQUIP:49\ \|\|\ TEQUIP:54\ \|\|\ TEQUIP:89\)/m,
        ],
      },
      { src: COMABLE, ref: '4657-4659', any: [/SIF\ TEQUIP:54/m] },
      { src: COMABLE, ref: '4661-4684', any: [/SIF\ ITEM:35\ ==\ 0/m] },
      { src: COMABLE, ref: '4686-4687', any: [/@COM_ABLE201/m] },
      { src: COMABLE, ref: '4688', any: [/SIF\ TEQUIP:55\ ==\ 0/m] },
      { src: COMABLE, ref: '4693-4694', any: [/RETURN\ 1/m] },
      { src: COMABLE, ref: '4695-4696', any: [/@COM_ABLE202/m] },
      { src: COMABLE, ref: '4697', any: [/SIF\ TEQUIP:55\ ==\ 0/m] },
      { src: COMABLE, ref: '4699', any: [/;助手じゃ駄目/m] },
      { src: COMABLE, ref: '4705', any: [/@COM_ABLE203/m] },
      { src: COMABLE, ref: '4712', any: [/RETURN\ 0/m] },
      {
        src: MESSAGE_B,
        ref: '3010-3027',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: MESSAGE_B,
        ref: '3011-3012',
        any: [/PRINTFORML\ %SAVESTR:PLAYER%把%SAVESTR:TARGET%带回了房间…/m],
      },
      {
        src: MESSAGE_B,
        ref: '3014-3026',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: MESSAGE_B,
        ref: '3016-3018',
        any: [/CALL\ PRINT_CLOTHTYPE_MAIN2/m],
      },
      { src: MESSAGE_B, ref: '3019-3021', any: [/ELSEIF\ CFLAG:40/m] },
      { src: MESSAGE_B, ref: '3022-3023', any: [/PRINT\ 全裸的/m] },
      { src: MESSAGE_B, ref: '3024-3025', any: [/IF\ BASE:1\ <=\ 0/m] },
      {
        src: MESSAGE_B,
        ref: '3026-3027',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: MESSAGE_B,
        ref: '3028-3029',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场…/m],
      },
      { src: MESSAGE_B, ref: '3030-3032', any: [/PRINTW\ ……………/m] },
      {
        src: MESSAGE_B,
        ref: '3033-3037',
        any: [
          /PRINTFORMW\ 被下流的笑容和好奇的视线所包围、%SAVESTR:TARGET%在异样的气氛中沉默不语。/m,
        ],
      },
      {
        src: MESSAGE_B,
        ref: '29-39',
        any: [/IF\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:42\ <=\ 50/m],
      },
      {
        src: MESSAGE_A,
        ref: '127-146',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%的私处里、被灌入了怪物黏黏糊糊的精液…/m,
        ],
      },
      {
        src: MESSAGE_A,
        ref: '113-125',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%全身上的触手、一起吐出了大量的体液…/m,
        ],
      },
      {
        src: SOURCE,
        ref: '59-120',
        any: [/CALL EQUIP_COM11/m],
      },
      {
        src: COMF201,
        ref: '69-70',
        any: [/CFLAG:42 != 79  && \(!TALENT:135/m],
      },
      {
        src: COMF201,
        ref: '92',
        any: [/ELSEIF RESULT == 2 && \(TALENT:ASSI:121/m],
      },
      {
        src: COMF202,
        ref: '56-57',
        any: [/SIF !TALENT:122 && !TALENT:273 && CFLAG:42 != 79/m],
      },
      { src: COMF202, ref: '110-177', any: [/;ABL:技巧をみる/m] },
      { src: COMF202, ref: '181-190', any: [/S = BASE:MASTER:4/m] },
      { src: COMF202, ref: '225-260', any: [/IF E == 2/m] },
      { src: COMF207, ref: '63-68', any: [/対象が男人なら戻る/m] },
      { src: COMF207, ref: '64-65', any: [/SIF TALENT:122/m] },
      {
        src: MESSAGE_A,
        ref: '143-145',
        any: [/PRINTFORML\ %SAVESTR:TARGET%身上的触手、吐出了体液…/m],
      },
    ],
  },
  {
    js: 'ere/system/train/train-message.js',
    refs: [
      // 公共头（#219 起分支归 com-caress.js，此组只剩头部的锚）
      {
        src: MESSAGE_B,
        ref: '19-26',
        any: [/調教テキスト省略設定の場合は戻る/, /CUSTOMDRAWLINE ‥/],
      },
      {
        src: MESSAGE_B,
        ref: '19-21',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      { src: MESSAGE_B, ref: '23', any: [/CUSTOMDRAWLINE ‥/] },
      {
        src: MESSAGE_A,
        ref: '22-26',
        any: [/調教テキスト省略設定の場合は戻る/, /CUSTOMDRAWLINE ‥/],
      },
      {
        src: MESSAGE_A,
        ref: '22-24',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      { src: MESSAGE_A, ref: '26', any: [/CUSTOMDRAWLINE ‥/] },
      {
        src: MESSAGE_A,
        ref: '377-424',
        any: [/IF TFLAG:29 > 0 && TFLAG:899 <= 1/],
      },
      // 头注「其余分支待办」的两个范围引用（#219 起）：射精文本 / 振动宝石起点
      {
        src: MESSAGE_B,
        ref: '30-120',
        any: [/PRINT 隔着/, /CALL PRINT_CLOTHTYPE_SPECIAL/],
      },
      {
        src: MESSAGE_A,
        ref: '986',
        any: [/ELSEIF SELECTCOM == 10 && TFLAG:899 <= 1/],
      },
      // #230（J20）：A 公共头 TFLAG:15 段的死斗场两臂（触手两臂随 J17）
      { src: MESSAGE_A, ref: '110-146', any: [/死斗场で射精/m] },
      { src: MESSAGE_A, ref: '113-125', any: [/身上的触手、吐出了体液/m] },
      { src: MESSAGE_A, ref: '127-133', any: [/被灌入了怪物黏黏糊糊的精液/m] },
      { src: MESSAGE_A, ref: '135-141', any: [/被怪物大量的粘稠精液灌满了/m] },
      { src: MESSAGE_A, ref: '143-145', any: [/身上的触手、吐出了体液/m] },
      { src: MESSAGE_A, ref: '30-108', any: [/IF TFLAG:9 == 0/m] },
      { src: MESSAGE_B, ref: '3041-3046', any: [/IF TFLAG:31 == 2/m] },
      { src: MESSAGE_A, ref: '113-116', any: [/身上的触手、吐出了体液/m] },
      {
        src: MESSAGE_A,
        ref: '121-124',
        any: [/全身上的触手、一起吐出了大量的体液/m],
      },
      { src: MESSAGE_A, ref: '127-141', any: [/被灌入了怪物黏黏糊糊的精液/m] },
      { src: MESSAGE_A, ref: '143-144', any: [/身上的触手、吐出了体液/m] },
      {
        src: MESSAGE_A,
        ref: '145-146',
        any: [/全身上的触手、一起吐出了大量的体液/m],
      },
    ],
  },
  // —— #215 J5 服装：ere/system/cloth-lookup.js ——
  {
    js: 'ere/system/cloth-lookup.js',
    refs: [
      {
        src: FUNC_CLOTH_ERB,
        ref: '707-888',
        any: [/^\s*@GET_CLOTHTYPE_MAIN2\(L_A = -1, L_VERB = ""\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '998-1109',
        any: [/^\s*@GET_CLOTHTYPE_SPECIAL\(L_A = -1\)$/m],
      },
      {
        src: SHOP_TAILOR,
        ref: '73',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%现在%GET_CLOTHTYPE_MAIN2\(TARGET,"身穿"\)%。$/m,
        ],
      },
      {
        src: SHOP_TAILOR,
        ref: '168',
        any: [/^\s*PRINTV GET_CLOTHTYPE_MAIN2\(TARGET,"脱下"\)$/m],
      },
      {
        src: SHOP_TAILOR,
        ref: '176',
        any: [/^\s*PRINTFORML %GET_CLOTHTYPE_MAIN2\(TARGET,"换上"\)%了。$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '716-886', any: [/^\s*CASE 0$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '1006-1107',
        any: [/^\s*SELECTCASE CFLAG:L_A:42$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '884-885', any: [/^\s*CASEELSE$/m] },
      { src: FUNC_CLOTH_ERB, ref: '1105-1106', any: [/^\s*CASEELSE$/m] },
    ],
  },
  // —— #215 J5 服装：ere/page/page-clothtype.js ——
  {
    js: 'ere/page/page-clothtype.js',
    refs: [
      { src: FUNC_CLOTH_ERB, ref: '35-58', any: [/^\s*@PRINT_CLOTHTYPE$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '61-156',
        any: [/^\s*@PRINT_CLOTHTYPE_MAIN$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '530-703',
        any: [/^\s*@PRINT_CLOTHTYPE_MAIN2$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '892-994',
        any: [/^\s*@PRINT_CLOTHTYPE_SPECIAL$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '74-96', any: [/^\s*ENDIF$/m] },
      { src: FUNC_CLOTH_ERB, ref: '531-703', any: [/^\s*IF CFLAG:41 == 0$/m] },
      { src: FUNC_CLOTH_ERB, ref: '894-992', any: [/^\s*IF CFLAG:42 == 1$/m] },
      { src: FUNC_CLOTH_ERB, ref: '701-702', any: [/^\s*ELSE$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '102',
        any: [
          /^\s*IF TALENT:122 == 0 && TALENT:116 == 0 && \(TALENT:109 == 0 \|\| TALENT:132 == 0\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '126',
        any: [
          /^\s*IF TALENT:122 == 0 && TALENT:116 == 0 && \(TALENT:109 == 0 \|\| TALENT:132 == 0\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '63-65',
        any: [/^\s*IF CFLAG:41 == 192 && \(CFLAG:40 & 16\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '67-83',
        any: [/^\s*ELSEIF CFLAG:41 == 109$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '86-110',
        any: [/^\s*IF CFLAG:41 >= 201 && CFLAG:41 <= 300$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '112-154',
        any: [/^\s*IF \(CFLAG:40 & 28\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '37-40',
        any: [/^\s*IF FLAG:37 == 0 \|\| CFLAG:41 == 0$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '43-46',
        any: [/^\s*IF CFLAG:42 == 11 && \(CFLAG:40 & 64\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '49',
        any: [/^\s*CALL PRINT_CLOTHTYPE_MAIN$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '52-56', any: [/^\s*IF CFLAG:42$/m] },
    ],
  },
  // —— #216 J6 跨族共用子程序：锚按「源文件对应行内容的逐字正则」机械
  //    生成（首个非空行 + 可选 ; 前缀），后续改动引用时按同法同步 ——
  {
    js: 'ere/system/train/com-condom.js',
    refs: [
      {
        src: COMF_CONDOM_ERB,
        ref: '10-40',
        any: [/^\s*;?\s*@CONDOM_SETTINGS$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '42-163',
        any: [/^\s*;?\s*@CONFIRM_CONDOM$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '165-183',
        any: [/^\s*;?\s*@CONFIRM_CONDOM2$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '14',
        any: [/^\s*;?\s*PRINTFORML\ 现在：%LOCALS:\(CFLAG:61\)%$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '66',
        any: [/^\s*;?\s*毎回確認かつ安全套所持の場合、確認する$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '69',
        any: [/^\s*;?\s*PRINTL\ 要戴套吗？$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '146-150', any: [/^\s*;?\s*RETURN\ 0$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '11-12',
        any: [/^\s*;?\s*SIF\ TARGET\ <\ 1$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '12', any: [/^\s*;?\s*RETURN\ 1$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '13',
        any: [/^\s*;?\s*PRINTFORML\ 和%SAVESTR:TARGET%做爱要戴套吗？$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '15', any: [/^\s*;?\s*DRAWLINE$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '16',
        any: [/^\s*;?\s*PRINTL\ \[0\]\ 每次都问$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '17',
        any: [/^\s*;?\s*PRINTL\ \[1\]\ 有套就用$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '18',
        any: [/^\s*;?\s*PRINTL\ \[2\]\ 每次都直接来，来个痛快$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '19',
        any: [/^\s*;?\s*PRINTL\ \[9\]\ 返回$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '21', any: [/^\s*;?\s*INPUT$/m] },
      { src: COMF_CONDOM_ERB, ref: '24', any: [/^\s*;?\s*RETURN\ 0$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '26',
        any: [/^\s*;?\s*PRINTW\ 每次确认。$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '27', any: [/^\s*;?\s*CFLAG:61\ =\ 0$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '29',
        any: [/^\s*;?\s*PRINTW\ 使用安全套。$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '30', any: [/^\s*;?\s*CFLAG:61\ =\ 1$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '32',
        any: [/^\s*;?\s*PRINTFORMW\ 和%SAVESTR:TARGET%直接做。$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '33', any: [/^\s*;?\s*CFLAG:61\ =\ 2$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '35',
        any: [/^\s*;?\s*GOTO\ INPUT_LOOP_01$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '46',
        any: [/^\s*;?\s*RETURN\ 1:コマンド続行$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '48',
        any: [/^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '50',
        any: [/^\s*;?\s*安全套使わない設定なら続行$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '52', any: [/^\s*;?\s*RETURN\ 1$/m] },
      { src: COMF_CONDOM_ERB, ref: '54', any: [/^\s*;?\s*SIF\ TEQUIP:89$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '57-98',
        any: [/^\s*;?\s*SIF\ TEQUIP:55$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '61', any: [/^\s*;?\s*RETURN\ 1$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '62',
        any: [/^\s*;?\s*調教者が既に安全套してるなら続行$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '63',
        any: [
          /^\s*;?\s*SIF\ \(!ASSIPLAY\ \&\&\ TEQUIP:35\)\ \|\|\ \(ASSIPLAY\ \&\&\ TEQUIP:36\)$/m,
        ],
      },
      { src: COMF_CONDOM_ERB, ref: '65', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '67',
        any: [/^\s*;?\s*IF\ CFLAG:61\ ==\ 0\ \&\&\ ITEM:24$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '70',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 戴$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '73',
        any: [/^\s*;?\s*PRINTL\ 让使用安全套吗？$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '76', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '78',
        any: [/^\s*;?\s*PRINTL\ \ \[3\]\ \-\ 今后都戴套$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '79', any: [/^\s*;?\s*$/m] },
      { src: COMF_CONDOM_ERB, ref: '81', any: [/^\s*;?\s*INPUT$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '82',
        any: [/^\s*;?\s*SELECTCASE\ RESULT$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '83', any: [/^\s*;?\s*CASE\ 0$/m] },
      { src: COMF_CONDOM_ERB, ref: '85', any: [/^\s*;?\s*IF\ !ASSIPLAY$/m] },
      { src: COMF_CONDOM_ERB, ref: '87', any: [/^\s*;?\s*TEQUIP:35\ =\ 1$/m] },
      { src: COMF_CONDOM_ERB, ref: '88', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '89',
        any: [/^\s*;?\s*PRINTFORML\ 让%SAVESTR:PLAYER%戴着套。$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '91', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_CONDOM_ERB, ref: '92', any: [/^\s*;?\s*RETURN\ 1$/m] },
      { src: COMF_CONDOM_ERB, ref: '93', any: [/^\s*;?\s*CASE\ 1$/m] },
      { src: COMF_CONDOM_ERB, ref: '95', any: [/^\s*;?\s*CASE\ 2$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '101-141',
        any: [/^\s*;?\s*CFLAG:61\ =\ 1$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '105', any: [/^\s*;?\s*ENDSELECT$/m] },
      { src: COMF_CONDOM_ERB, ref: '107', any: [/^\s*;?\s*$/m] },
      { src: COMF_CONDOM_ERB, ref: '108', any: [/^\s*;?\s*自動で使う場合$/m] },
      { src: COMF_CONDOM_ERB, ref: '110', any: [/^\s*;?\s*安全套があるか$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '111',
        any: [/^\s*;?\s*IF\ ITEM:24\ >\ 0$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '113-137',
        any: [/^\s*;?\s*ITEM:24\ \-=\ 1$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '115',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:PLAYER%戴着套。$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '118-120',
        any: [/^\s*;?\s*PRINTFORML\ 让%SAVESTR:PLAYER%戴着套。$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '121', any: [/^\s*;?\s*RETURN\ 1$/m] },
      { src: COMF_CONDOM_ERB, ref: '122', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '123',
        any: [/^\s*;?\s*ない場合、魔王さまの技巧Lvが5未満だと生でしてしまう$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '126',
        any: [/^\s*;?\s*PRINTFORM\ 没有安全套，直接来。$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '128',
        any: [/^\s*;?\s*PRINTFORML\ 来吗？$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '130',
        any: [/^\s*;?\s*PRINTFORML\ 让吗？$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '131', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '132',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 好的\(下次也继续确认\)$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '134',
        any: [/^\s*;?\s*PRINTL\ \ \[2\]\ \-\ 不要$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '136', any: [/^\s*;?\s*\$INPUT_LOOP_02$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '138',
        any: [/^\s*;?\s*SELECTCASE\ RESULT$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '162',
        any: [/^\s*;?\s*安全套を使うかの確認2$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '183', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '167',
        any: [
          /^\s*;?\s*IF\ TEQUIP:37\ ==\ 0\ \&\&\ ITEM:24\ \&\&\ \(TALENT:TARGET:121\ \|\|\ TALENT:TARGET:122\)\ \&\&\ CFLAG:MASTER:61\ !=\ 2$/m,
        ],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '168',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%使用安全套吗？$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '169',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 用$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '170',
        any: [/^\s*;?\s*PRINTL\ \ \[1\]\ \-\ 这次直接来$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '172',
        any: [/^\s*;?\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '173',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%戴着套$/m],
      },
      { src: COMF_CONDOM_ERB, ref: '174', any: [/^\s*;?\s*ITEM:24\ \-=\ 1$/m] },
      {
        src: COMF_CONDOM_ERB,
        ref: '176',
        any: [/^\s*;?\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: COMF_CONDOM_ERB,
        ref: '178',
        any: [/^\s*;?\s*ELSEIF\ RESULT\ !=\ 1$/m],
      },
    ],
  },

  {
    js: 'ere/system/train/com-vaginasex.js',
    refs: [
      {
        src: COMF_VAGINASEX_ERB,
        ref: '6-19',
        any: [/^\s*;?\s*@CONFIRM_LOST_VIRGIN$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '40-745',
        any: [/^\s*;?\s*@COM_EJAC_PLAYER_SEX$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '747-869',
        any: [/^\s*;?\s*@COM_EJAC_PLAYER_MILK$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '871-1044',
        any: [/^\s*;?\s*@COM_AFTER_VAGINA_SEX$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1046-1197',
        any: [/^\s*;?\s*@COM_AFTER_EXTRA_SEX$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '21-38',
        any: [/^\s*;?\s*@CONFIRM_LOST_VIRGIN_YOU$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '41', any: [/^\s*;?\s*\#DIM\ EXP_ID$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '587-589',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 3\.50$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '614-616',
        any: [/^\s*;?\s*EXP_ID\ =\ 52$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '761',
        any: [/^\s*;?\s*IF\ ABL:PLAYER:1\ ==\ 0$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '826', any: [/^\s*;?\s*E\ =\ 2$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '757-758',
        any: [/^\s*;?\s*RETURN\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1074',
        any: [/^\s*;?\s*PRINTL\ 性交経験＋１$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1171',
        any: [/^\s*;?\s*PRINTW\ 【童貞喪失】$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '881',
        any: [/^\s*;?\s*ELSEIF\ ABL:2\ <=\ 7$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1013',
        any: [/^\s*;?\s*初体験が近親相姦$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '655-663',
        any: [/^\s*;?\s*EXP:PLAYER:3\ \+=\ 2$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '57-738',
        any: [/^\s*;?\s*B\ =\ 1500$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '44-48', any: [/^\s*;?\s*RETURN\ 0$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '44', any: [/^\s*;?\s*RETURN\ 0$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '47',
        any: [/^\s*;?\s*SIF\ TEQUIP:55\ \&\&\ \(ASSI\ !=\ PLAYER\)$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '51', any: [/^\s*;?\s*B\ =\ 0$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '57-99', any: [/^\s*;?\s*B\ =\ 1500$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '100-133',
        any: [/^\s*;?\s*ABL:顺从をみる$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '134-166',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 1\.00$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '167-226',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 0\.90$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '227-260',
        any: [/^\s*;?\s*B\ =\ 500$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '261-293',
        any: [/^\s*;?\s*ELSEIF\ ABL:12\ ==\ 2$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '294-339',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 1\.50$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '340-373',
        any: [/^\s*;?\s*ELSEIF\ ABL:12\ ==\ 3$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '374-421', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '422-456',
        any: [/^\s*;?\s*B\ =\ 3000$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '457-501',
        any: [/^\s*;?\s*IF\ ABL:12\ ==\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '502-546',
        any: [/^\s*;?\s*調教対象のABL:技巧をみる$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '547-588', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '591-663',
        any: [/^\s*;?\s*EXP:私处经验をみる$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '666-668',
        any: [
          /^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%的直肠深处被大量的精液强烈地冲击着$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '671-673',
        any: [/^\s*;?\s*PRINTL\ 膣内大量射精$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '675-683', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '688-723',
        any: [/^\s*;?\s*セックスで射精フラグ$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '733-768',
        any: [/^\s*;?\s*膣内射精フラグ（主人）$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '689',
        any: [/^\s*;?\s*TFLAG:2\ =\ 2$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '741', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '691',
        any: [/^\s*;?\s*SIF\ ASSIPLAY\ ==\ 0\ \&\&\ TEQUIP:35\ ==\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '743',
        any: [/^\s*;?\s*調教者の噴乳チェック$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '695-696',
        any: [/^\s*;?\s*TFLAG:38\ =\ 2$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '747-748',
        any: [/^\s*;?\s*@COM_EJAC_PLAYER_MILK$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '699-700',
        any: [/^\s*;?\s*EXP:20\ \+=\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '751-752',
        any: [/^\s*;?\s*RETURN\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '703-704',
        any: [/^\s*;?\s*ELSEIF\ CFLAG:113\ ==\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '755-756',
        any: [/^\s*;?\s*死斗场の場合は助手以外はここで終了$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '706', any: [/^\s*;?\s*PRINTL\ 射精$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '758', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '707-713',
        any: [
          /^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%的精巢似乎感受到了的冲击$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '759-765',
        any: [/^\s*;?\s*調教者の噴乳ゲージ増加量$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '685-730',
        any: [/^\s*;?\s*SIF\ BASE:PLAYER:2\ >=\ EJAC$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '724',
        any: [/^\s*;?\s*PRINTL\ 精液经验＋１$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '725',
        any: [/^\s*;?\s*STAIN:PLAYER:2\ \|=\ 4$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '727-729',
        any: [/^\s*;?\s*BASE:PLAYER:2\ \-=\ EJAC$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '732',
        any: [/^\s*;?\s*TFLAG:2\ =\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '734-735',
        any: [/^\s*;?\s*SIF\ ASSIPLAY\ ==\ 0\ \&\&\ TEQUIP:35\ ==\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '737-738',
        any: [/^\s*;?\s*SIF\ ASSIPLAY\ \&\&\ TEQUIP:36\ ==\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '731-771',
        any: [/^\s*;?\s*セックスで射精フラグ$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '769',
        any: [/^\s*;?\s*ELSEIF\ ABL:PLAYER:1\ >=\ 4$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '773', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '775-776', any: [/^\s*;?\s*克制$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '778-779', any: [/^\s*;?\s*接受快感$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '745',
        any: [
          /^\s*;?\s*2016\/11\/04\ 追加、基本にはCOM_EJAC_PLAYER_SEXとTARGET_MILK_CHECKの変形$/m,
        ],
      },
      { src: COMF_VAGINASEX_ERB, ref: '751', any: [/^\s*;?\s*RETURN\ 0$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '753',
        any: [/^\s*;?\s*SIF\ TEQUIP:89$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '755',
        any: [/^\s*;?\s*死斗场の場合は助手以外はここで終了$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '760-767',
        any: [
          /^\s*;?\s*そのまま射精ゲージ流用し、Ｂ感覚のレッベルによて、変化する$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '770',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 1\.40$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '776',
        any: [/^\s*;?\s*SIF\ TALENT:PLAYER:20$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '779', any: [/^\s*;?\s*接受快感$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '782', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '785',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 1\.10$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '788',
        any: [/^\s*;?\s*SIF\ TALENT:PLAYER:71$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '791', any: [/^\s*;?\s*B敏感$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '794', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '797',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 0\.50$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '800',
        any: [/^\s*;?\s*SIF\ TALENT:PLAYER:116$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '803',
        any: [/^\s*;?\s*調教対象が幼儿退行$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '805-813',
        any: [/^\s*;?\s*B\ \*=\ 2$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '815-840',
        any: [/^\s*;?\s*調教者が弄乳狂$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '826-828', any: [/^\s*;?\s*E\ =\ 2$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '841-866',
        any: [/^\s*;?\s*Ｂに母乳汚れ$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '10',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 来吧女人$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '11',
        any: [/^\s*;?\s*PRINTL\ \ \[1\]\ \-\ 让她继续做女孩$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '12', any: [/^\s*;?\s*INPUT$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '13',
        any: [/^\s*;?\s*IF\ RESULT\ ==\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '15',
        any: [/^\s*;?\s*ELSEIF\ RESULT\ !=\ 0$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '17', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '19', any: [/^\s*;?\s*RETURN\ 1$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '876-884',
        any: [/^\s*;?\s*私处感觉が高いほど私处经验が入る$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '886',
        any: [/^\s*;?\s*EXP:0\ \+=\ S$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '887',
        any: [/^\s*;?\s*PRINTFORML\ 私处经验\+\{S\}$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '890-914',
        any: [/^\s*;?\s*EXP:5\ \+=\ 1$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '893', any: [/^\s*;?\s*异常经验$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '895-896',
        any: [/^\s*;?\s*TFLAG:14\ =\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '898-899',
        any: [/^\s*;?\s*处女丧失の相手が女性なら异常经验に＋1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '901-902',
        any: [/^\s*;?\s*处女丧失の相手が父親か母親なら异常经验に＋２$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '905',
        any: [
          /^\s*;?\s*ELSEIF\ TALENT:0\ \&\&\ \(TFLAG:14\ ==\ 3\ \|\|\ TFLAG:14\ ==\ 4\)$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '908',
        any: [/^\s*;?\s*处女丧失が兽奸なら异常经验は基本値２$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '917-918',
        any: [/^\s*;?\s*EXP:50\ \+=\ Z$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '921',
        any: [/^\s*;?\s*膣内フラグに上書きされることもある$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '924-928',
        any: [/^\s*;?\s*兽奸の場合はここで終了$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '933',
        any: [/^\s*;?\s*EXP:40\ \+=\ 4$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '936-957',
        any: [/^\s*;?\s*死斗场の場合はここで終了$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '939', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '941',
        any: [/^\s*;?\s*調教者が童贞で調教対象が处女$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '960-963', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '966-987',
        any: [/^\s*;?\s*PRINTFORML\ %EXPNAME:23%\+\{E\}$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '977-978',
        any: [/^\s*;?\s*SIF\ RELATION:R\ ==\ 30$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '982-983',
        any: [/^\s*;?\s*SIF\ RELATION:R\ ==\ 20$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '987-988',
        any: [/^\s*;?\s*SIF\ RELATION:R\ ==\ 10$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '990-991',
        any: [/^\s*;?\s*SIF\ RELATION:R\ >\ 200$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '994-1000',
        any: [/^\s*;?\s*主人によるセックスなら好感度上升$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1003-1041',
        any: [/^\s*;?\s*親族関係の判定$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1005',
        any: [/^\s*;?\s*CALL\ INCEST$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1007',
        any: [/^\s*;?\s*IF\ TALENT:PLAYER:1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1008',
        any: [/^\s*;?\s*TALENT:PLAYER:1\ =\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1010',
        any: [/^\s*;?\s*IF\ CFLAG:PLAYER:15\ ==\ 0$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1011',
        any: [/^\s*;?\s*CFLAG:PLAYER:15\ =\ NO:TARGET\ \+\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1014-1037',
        any: [
          /^\s*;?\s*初体験の相手が自分の息子・娘という状況は生物学的にありえないので省く$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1039',
        any: [
          /^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m,
        ],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1042-1043',
        any: [/^\s*;?\s*STAIN:PLAYER:2\ \|=\ STAIN:3$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1055-1072',
        any: [/^\s*;?\s*Ｂ感覚が高いほどＢ経験が入る$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1065-1066',
        any: [/^\s*;?\s*初のB経験の場合異常経験2$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '1070', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1073',
        any: [/^\s*;?\s*EXP:5\ \+=\ 1$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1076-1083',
        any: [/^\s*;?\s*異常経験$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1080',
        any: [/^\s*;?\s*ABNOMAL_EXP\ \+=\ Z$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '1086', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1091',
        any: [/^\s*;?\s*レズ経験上昇$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1094-1098',
        any: [/^\s*;?\s*PRINTL\ \+4$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '1101', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1103-1125',
        any: [/^\s*;?\s*調教者が童貞で調教対象が処女$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1132-1153',
        any: [/^\s*;?\s*初体験の相手が助手$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1158-1164',
        any: [/^\s*;?\s*IF\ ABL:2\ >=\ 3$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1168-1192',
        any: [/^\s*;?\s*調教者が童貞なら童貞喪失$/m],
      },
      {
        src: COMF_VAGINASEX_ERB,
        ref: '1170',
        any: [/^\s*;?\s*TALENT:PLAYER:1\ =\ 0$/m],
      },
      { src: COMF_VAGINASEX_ERB, ref: '1194', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_VAGINASEX_ERB, ref: '1195-1197', any: [/^\s*;?\s*ENDIF$/m] },
    ],
  },

  {
    js: 'ere/system/train/com-analsex.js',
    refs: [
      {
        src: COMF_ANALSEX_ERB,
        ref: '6-351',
        any: [/^\s*;?\s*@COM_EJAC_PLAYER_ANALSEX$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '353-452',
        any: [/^\s*;?\s*@COM_AFTER_ANAL_SEX$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '15-242',
        any: [/^\s*;?\s*調教者の射精ゲージ増加量$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '10-14',
        any: [/^\s*;?\s*死斗场の場合は助手以外はここで終了$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '10', any: [/^\s*;?\s*$/m] },
      { src: COMF_ANALSEX_ERB, ref: '13', any: [/^\s*;?\s*RETURN\ 0$/m] },
      { src: COMF_ANALSEX_ERB, ref: '17', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '21-45',
        any: [/^\s*;?\s*IF\ ABL:12\ ==\ 0$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '46-84', any: [/^\s*;?\s*B\ =\ 2400$/m] },
      { src: COMF_ANALSEX_ERB, ref: '85-110', any: [/^\s*;?\s*B\ =\ 800$/m] },
      { src: COMF_ANALSEX_ERB, ref: '111-153', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '154-196',
        any: [/^\s*;?\s*ELSEIF\ ABL:12\ ==\ 4$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '197-242',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 1\.20$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '244-315',
        any: [/^\s*;?\s*TIMES\ B\ ,\ 3\.50$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '279-291', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '315-317',
        any: [/^\s*;?\s*セックスで射精フラグ$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '320-322',
        any: [/^\s*;?\s*CFLAG:113\ =\ 3$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '324-332', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '335-344',
        any: [/^\s*;?\s*SIF\ BASE:PLAYER:2\ >=\ EJAC$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '360-369', any: [/^\s*;?\s*S\ \+=\ 3$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '334-353',
        any: [/^\s*;?\s*BASE:PLAYER:2\ \-=\ EJAC$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '339', any: [/^\s*;?\s*TFLAG:2\ =\ 1$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '340',
        any: [/^\s*;?\s*肛内挿入异常妊娠フラグ$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '347', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_ANALSEX_ERB, ref: '348-353', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '354-374',
        any: [
          /^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m,
        ],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '359',
        any: [/^\s*;?\s*IF\ ABL:3\ <=\ 1$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '360', any: [/^\s*;?\s*S\ \+=\ 3$/m] },
      { src: COMF_ANALSEX_ERB, ref: '371', any: [/^\s*;?\s*$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '372-374',
        any: [/^\s*;?\s*EXP:5\ \+=\ 1$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '357-371', any: [/^\s*;?\s*S\ =\ 0$/m] },
      { src: COMF_ANALSEX_ERB, ref: '372', any: [/^\s*;?\s*EXP:5\ \+=\ 1$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '373',
        any: [/^\s*;?\s*PRINTL\ 性交经验＋１$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '375-391',
        any: [/^\s*;?\s*肛交怀孕对象判定$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '380',
        any: [/^\s*;?\s*ELSEIF\ TEQUIP:89$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '382',
        any: [/^\s*;?\s*CFLAG:102\ =\ 5$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '384', any: [/^\s*;?\s*死斗场下层居民$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '386',
        any: [/^\s*;?\s*ELSEIF\ TEQUIP:90\ \|\|\ TEQUIP:55$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '388',
        any: [/^\s*;?\s*CFLAG:102\ =\ 6$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '393', any: [/^\s*;?\s*ENDIF$/m] },
      { src: COMF_ANALSEX_ERB, ref: '396-405', any: [/^\s*;?\s*RETURN\ 0$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '410',
        any: [/^\s*;?\s*死斗场の場合はここで終了$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '413-425', any: [/^\s*;?\s*爱情经验$/m] },
      { src: COMF_ANALSEX_ERB, ref: '417-418', any: [/^\s*;?\s*E\ =\ 3$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '416',
        any: [/^\s*;?\s*IF\ SELECTCOM\ ==\ 26$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '420-421', any: [/^\s*;?\s*E\ =\ 4$/m] },
      { src: COMF_ANALSEX_ERB, ref: '423', any: [/^\s*;?\s*E\ =\ 2$/m] },
      {
        src: COMF_ANALSEX_ERB,
        ref: '427',
        any: [/^\s*;?\s*SIF\ TALENT:122$/m],
      },
      {
        src: COMF_ANALSEX_ERB,
        ref: '430-437',
        any: [/^\s*;?\s*IF\ CFLAG:2\ >=\ 1000\ \&\&\ ASSIPLAY\ ==\ 0$/m],
      },
      { src: COMF_ANALSEX_ERB, ref: '440-449', any: [/^\s*;?\s*ELSE$/m] },
    ],
  },

  {
    js: 'ere/system/train/passout.js',
    refs: [
      { src: PASSOUT_ERB, ref: '14-89', any: [/^\s*;?\s*@PASSOUT_CHECK$/m] },
      {
        src: PASSOUT_ERB,
        ref: '398',
        any: [/^\s*;?\s*IF\ TEQUIP:13\ ==\ 1$/m],
      },
      { src: PASSOUT_ERB, ref: '91-283', any: [/^\s*;?\s*@PASSOUT_TEXT$/m] },
      { src: PASSOUT_ERB, ref: '482-497', any: [/^\s*;?\s*UP:13\ =\ 0$/m] },
      {
        src: PASSOUT_ERB,
        ref: '285-456',
        any: [/^\s*;?\s*@PASSOUT_MESSAGE$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '457-485',
        any: [/^\s*;?\s*@PASSOUT_PALAM_CHECK$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '487-589',
        any: [/^\s*;?\s*@PASSOUT_PALAM_UP$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '591-602',
        any: [/^\s*;?\s*@PASSOUT_OUTDOOR$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '275-278',
        any: [
          /^\s*;?\s*失神回復時口上の呼び出し\ TFLAG:200が中身違うのでこれもスルーする$/m,
        ],
      },
      { src: PASSOUT_ERB, ref: '294', any: [/^\s*;?\s*ELSE$/m] },
      { src: PASSOUT_ERB, ref: '1-7', any: [/^\s*;?\s*﻿;eraIM@Sから流用$/m] },
      { src: PASSOUT_ERB, ref: '16', any: [/^\s*;?\s*SIF\ FLAG:70\ ==\ 1$/m] },
      { src: PASSOUT_ERB, ref: '18', any: [/^\s*;?\s*$/m] },
      { src: PASSOUT_ERB, ref: '20', any: [/^\s*;?\s*$/m] },
      {
        src: PASSOUT_ERB,
        ref: '25-34',
        any: [
          /^\s*;?\s*（失神中はカウントしない、「強絶頂か2箇所以上絶頂」を続けている限りランダムで外れてもフラグは維持）$/m,
        ],
      },
      {
        src: PASSOUT_ERB,
        ref: '33',
        any: [
          /^\s*;?\s*ELSEIF\ Z\ <\ 16\ \&\&\ TFLAG:897\ <\ 2\ \&\&\ TFLAG:899\ <\ 1$/m,
        ],
      },
      { src: PASSOUT_ERB, ref: '35', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '37-55', any: [/^\s*;?\s*A\ =\ PALAM:9$/m] },
      {
        src: PASSOUT_ERB,
        ref: '40-41',
        any: [
          /^\s*;?\s*一度に7500以上の苦痛を受けるか計15000ごとにランダムで失神（既に失神状態の場合はスキップ）$/m,
        ],
      },
      { src: PASSOUT_ERB, ref: '51', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '52-54', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '57-71', any: [/^\s*;?\s*TFLAG:895\ =\ 3$/m] },
      { src: PASSOUT_ERB, ref: '67', any: [/^\s*;?\s*失神中にコマンド実行$/m] },
      {
        src: PASSOUT_ERB,
        ref: '68-70',
        any: [
          /^\s*;?\s*IF\ TFLAG:896\ >=\ 2\ \|\|\ TFLAG:897\ >=\ 2\ \|\|\ TFLAG:898\ >=\ 2$/m,
        ],
      },
      { src: PASSOUT_ERB, ref: '73-81', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '83-89', any: [/^\s*;?\s*TFLAG:898\ =\ 3$/m] },
      {
        src: PASSOUT_ERB,
        ref: '88',
        any: [
          /^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m,
        ],
      },
      {
        src: PASSOUT_ERB,
        ref: '95-100',
        any: [/^\s*;?\s*TFLAG:\(864\ \+\ COUNT\)\ =\ 0$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '107-156',
        any: [/^\s*;?\s*IF\ TFLAG:0\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '115-127',
        any: [/^\s*;?\s*IF\ TEQUIP:35\ ==\ 0$/m],
      },
      { src: PASSOUT_ERB, ref: '128', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: PASSOUT_ERB,
        ref: '129-136',
        any: [/^\s*;?\s*IF\ TFLAG:2\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      { src: PASSOUT_ERB, ref: '137-138', any: [/^\s*;?\s*ENDIF$/m] },
      {
        src: PASSOUT_ERB,
        ref: '139-150',
        any: [/^\s*;?\s*IF\ TFLAG:2\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '153-234',
        any: [/^\s*;?\s*ELSEIF\ SELECTCOM\ ==\ 102$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '236-237',
        any: [/^\s*;?\s*TFLAG:882\ =\ \(\-1\)$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '239-272',
        any: [/^\s*;?\s*IF\ TFLAG:899\ >=\ 1$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '274-313',
        any: [/^\s*;?\s*CALL\ PASSOUT_MESSAGE$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '286-292',
        any: [
          /^\s*;?\s*自分でもよく分からないくらいメチャクチャな上、下に進むほど大雑把$/m,
        ],
      },
      {
        src: PASSOUT_ERB,
        ref: '288-302',
        any: [/^\s*;?\s*IF\ TFLAG:60\ ==\ 1$/m],
      },
      { src: PASSOUT_ERB, ref: '304-455', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '304-322', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '323-354', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '355-383', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: PASSOUT_ERB,
        ref: '384-391',
        any: [/^\s*;?\s*PRINTW\ 触手吐出的污液，和无法隐藏的困惑…$/m],
      },
      { src: PASSOUT_ERB, ref: '392-404', any: [/^\s*;?\s*ELSE$/m] },
      {
        src: PASSOUT_ERB,
        ref: '405-427',
        any: [/^\s*;?\s*ELSEIF\ TEQUIP:13\ ==\ 1$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '428-429',
        any: [/^\s*;?\s*PRINT\ 被装上了器具，$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '430-449',
        any: [/^\s*;?\s*PRINTFORMW\ 发现后开始感到困惑和恐惧了…$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '450-451',
        any: [
          /^\s*;?\s*X\ =\ TFLAG:867\ \+\ TFLAG:877\ \+\ TFLAG:878\ \+\ TFLAG:866\ \+\ TFLAG:879\ \+\ TFLAG:864\ \+\ TFLAG:865\ \+\ TFLAG:880\ \+\ TFLAG:881$/m,
        ],
      },
      {
        src: PASSOUT_ERB,
        ref: '452-458',
        any: [/^\s*;?\s*TIMES\ X\ ,\ \-1$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '459-460',
        any: [/^\s*;?\s*TFLAG:883\ \+=\ UP:6$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '461-463',
        any: [/^\s*;?\s*TFLAG:885\ \+=\ UP:10$/m],
      },
      { src: PASSOUT_ERB, ref: '465-470', any: [/^\s*;?\s*ELSE$/m] },
      { src: PASSOUT_ERB, ref: '475-484', any: [/^\s*;?\s*UP:4\ =\ 0$/m] },
      {
        src: PASSOUT_ERB,
        ref: '509-514',
        any: [/^\s*;?\s*A\ \+=\ A\ \*\ G$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '515-527',
        any: [/^\s*;?\s*IF\ ABL:32\ ==\ 3$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '529-535',
        any: [/^\s*;?\s*E\ \+=\ E\ \*\ X$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '537-551',
        any: [/^\s*;?\s*D\ \+=\ D\ \*\ Y$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '557-563',
        any: [/^\s*;?\s*IF\ TFLAG:873\ >=\ 1$/m],
      },
      { src: PASSOUT_ERB, ref: '565-570', any: [/^\s*;?\s*ENDIF$/m] },
      { src: PASSOUT_ERB, ref: '572-577', any: [/^\s*;?\s*Z\ \/=\ 2$/m] },
      {
        src: PASSOUT_ERB,
        ref: '579-583',
        any: [/^\s*;?\s*UP:13\ \+=\ F\ \*\ Z\ \/\ 100$/m],
      },
      {
        src: PASSOUT_ERB,
        ref: '594',
        any: [/^\s*;?\s*PRINTFORMW\ %SAVESTR:TARGET%失神了，所以带回了房间…$/m],
      },
      { src: PASSOUT_ERB, ref: '595', any: [/^\s*;?\s*$/m] },
      {
        src: PASSOUT_ERB,
        ref: '598-602',
        any: [/^\s*;?\s*BASE:MASTER:1\ \-=\ 10$/m],
      },
      { src: TEXT_FIX_ERB, ref: '1-7', any: [/^\s*;?\s*﻿@SHE\(ARG\)$/m] },
    ],
  },

  {
    js: 'ere/system/train/seiin.js',
    refs: [
      { src: SEIIN_ERB, ref: '6-23', any: [/^\s*;?\s*@SEIIN_START$/m] },
      { src: SEIIN_ERB, ref: '25-78', any: [/^\s*;?\s*@SEIIN_CHECK$/m] },
      { src: SEIIN_ERB, ref: '80-122', any: [/^\s*;?\s*@SEIIN_ORGASM$/m] },
      {
        src: SEIIN_ERB,
        ref: '124-166',
        any: [/^\s*;?\s*@SEIIN_COMPULSION_ORGASM$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '143',
        any: [/^\s*;?\s*PRINTFORML\ 强制精饮绝顶$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '153',
        any: [/^\s*;?\s*PRINTFORMW\ %SAVESTR:TARGET%的精液中毒达到LV3了$/m],
      },
      { src: SEIIN_ERB, ref: '1-7', any: [/^\s*;?\s*﻿;eraIM@Sから流用$/m] },
      { src: SEIIN_ERB, ref: '8', any: [/^\s*;?\s*SIF\ FLAG:72\ ==\ 1$/m] },
      {
        src: SEIIN_ERB,
        ref: '11-12',
        any: [/^\s*;?\s*口で射精させていないor失神中だと処理しない$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '15-16',
        any: [/^\s*;?\s*ELSEIF\ TALENT:47\ \&\&\ TFLAG:0\ >\ 0$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '18-19',
        any: [/^\s*;?\s*ELSEIF\ TFLAG:0\ >\ 0\ \&\&\ TFLAG:29\ >\ 0$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '30-65',
        any: [/^\s*;?\s*奴隷の素質により規定回数を増減する$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '30',
        any: [/^\s*;?\s*奴隷の素質により規定回数を増減する$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '32-65',
        any: [/^\s*;?\s*SIF\ TALENT:13\ ==\ 1$/m],
      },
      { src: SEIIN_ERB, ref: '68', any: [/^\s*;?\s*SIF\ TALENT:80\ ==\ 1$/m] },
      {
        src: SEIIN_ERB,
        ref: '82-83',
        any: [/^\s*;?\s*精饮绝顶经验の回数追加$/m],
      },
      { src: SEIIN_ERB, ref: '86-99', any: [/^\s*;?\s*精饮绝顶经验の処理$/m] },
      { src: SEIIN_ERB, ref: '101-119', any: [/^\s*;?\s*基本ソース$/m] },
      { src: SEIIN_ERB, ref: '127', any: [/^\s*;?\s*$/m] },
      {
        src: SEIIN_ERB,
        ref: '130-133',
        any: [/^\s*;?\s*PRINTFORML\ 强制精饮绝顶$/m],
      },
      {
        src: SEIIN_ERB,
        ref: '134-141',
        any: [/^\s*;?\s*ELSEIF\ CFLAG:600\ ==\ 1$/m],
      },
      { src: SEIIN_ERB, ref: '142-150', any: [/^\s*;?\s*ELSE$/m] },
      { src: SEIIN_ERB, ref: '152-158', any: [/^\s*;?\s*IF\ ABL:32\ <\ 3$/m] },
      {
        src: SEIIN_ERB,
        ref: '160-166',
        any: [/^\s*;?\s*SOURCE:13\ =\ 1000$/m],
      },
      { src: TEXT_FIX_ERB, ref: '1-7', any: [/^\s*;?\s*﻿@SHE\(ARG\)$/m] },
    ],
  },
  // —— #228 J18 着装脱衣：ere/system/train/com-cloth.js（COM110/COM111 +
  //    COMABLE.ERB 的两段可用性判定；88 条内联引用的锚） ——
  {
    js: 'ere/system/train/com-cloth.js',
    refs: [
      { src: COMF110_ERB, ref: '8-323', any: [/^@COM110$/m] },
      { src: COMF110_ERB, ref: '12', any: [/^PRINTL 穿脱衣服$/m] },
      { src: COMF110_ERB, ref: '14-17', any: [/^CALL WEARING_CLOTH_ALL$/m] },
      { src: COMF110_ERB, ref: '22-24', any: [/^CALL PRINT_CLOTHTYPE$/m] },
      { src: COMF110_ERB, ref: '27-50', any: [/^CALL COM110_ABLE5W$/m] },
      { src: COMF110_ERB, ref: '52-135', any: [/^PRINTL  \[100\] - 算了$/m] },
      { src: COMF110_ERB, ref: '136', any: [/^INPUT$/m] },
      { src: COMF110_ERB, ref: '142-319', any: [/^ELSEIF RESULT == 100$/m] },
      {
        src: COMF110_ERB,
        ref: '141-144',
        any: [/^	PRINTFORML %SAVESTR:TARGET%贞操带的钥匙丢掉了。$/m],
      },
      {
        src: COMF110_ERB,
        ref: '146-160',
        any: [/^ELSEIF RESULT == 0 && T:0$/m],
      },
      {
        src: COMF110_ERB,
        ref: '161-178',
        any: [/^ELSEIF RESULT == 0 && W:0$/m],
      },
      {
        src: COMF110_ERB,
        ref: '179-194',
        any: [/^ELSEIF RESULT == 1 && T:1$/m],
      },
      {
        src: COMF110_ERB,
        ref: '195-216',
        any: [/^ELSEIF RESULT == 1 && W:1$/m],
      },
      { src: COMF110_ERB, ref: '210-215', any: [/^				CFLAG:40 \|= 8$/m] },
      {
        src: COMF110_ERB,
        ref: '217-222',
        any: [/^ELSEIF RESULT == 1 && T:2$/m],
      },
      {
        src: COMF110_ERB,
        ref: '223-228',
        any: [/^ELSEIF RESULT == 1 && W:2$/m],
      },
      {
        src: COMF110_ERB,
        ref: '229-247',
        any: [/^ELSEIF RESULT == 2 && T:3$/m],
      },
      {
        src: COMF110_ERB,
        ref: '248-273',
        any: [/^ELSEIF RESULT == 2 && W:3$/m],
      },
      { src: COMF110_ERB, ref: '263-267', any: [/^		IF CFLAG:41 <= 100$/m] },
      {
        src: COMF110_ERB,
        ref: '270-273',
        any: [/^ELSEIF RESULT == 3 && T:4$/m],
      },
      {
        src: COMF110_ERB,
        ref: '274-277',
        any: [/^ELSEIF RESULT == 3 && W:4$/m],
      },
      {
        src: COMF110_ERB,
        ref: '278-287',
        any: [/^ELSEIF RESULT == 4 && T:5$/m],
      },
      {
        src: COMF110_ERB,
        ref: '288-299',
        any: [/^ELSEIF RESULT == 4 && W:5$/m],
      },
      {
        src: COMF110_ERB,
        ref: '300-311',
        any: [/^ELSEIF RESULT == 7 && CFLAG:40 != 0$/m],
      },
      {
        src: COMF110_ERB,
        ref: '312-316',
        any: [/^ELSEIF RESULT == 9 && CFLAG:40 != 0$/m],
      },
      { src: COMF110_ERB, ref: '314', any: [/^	CALL COM111$/m] },
      { src: COMF110_ERB, ref: '317-318', any: [/^ELSEIF RESULT == 100$/m] },
      { src: COMF110_ERB, ref: '321', any: [/^PRINTL $/m] },
      { src: COMF110_ERB, ref: '323', any: [/^GOTO INPUT_LOOP$/m] },
      { src: COMF110_ERB, ref: '329-540', any: [/^@COM110_ABLE0T$/m] },
      { src: COMF110_ERB, ref: '329-349', any: [/^@COM110_ABLE0T$/m] },
      {
        src: COMF110_ERB,
        ref: '342-343',
        any: [/^	SIF \(CFLAG:40 & 64\) && CFLAG:42 <= 50$/m],
      },
      { src: COMF110_ERB, ref: '351-377', any: [/^@COM110_ABLE0W$/m] },
      { src: COMF110_ERB, ref: '379-390', any: [/^@COM110_ABLE1T$/m] },
      { src: COMF110_ERB, ref: '392-411', any: [/^@COM110_ABLE1W$/m] },
      {
        src: COMF110_ERB,
        ref: '400-403',
        any: [/^IF \(CFLAG:40 & 4\) \|\| CFLAG:45 != 0$/m],
      },
      { src: COMF110_ERB, ref: '413-424', any: [/^@COM110_ABLE2T$/m] },
      { src: COMF110_ERB, ref: '426-443', any: [/^@COM110_ABLE2W$/m] },
      { src: COMF110_ERB, ref: '445-456', any: [/^@COM110_ABLE3T$/m] },
      { src: COMF110_ERB, ref: '458-475', any: [/^@COM110_ABLE3W$/m] },
      { src: COMF110_ERB, ref: '477-488', any: [/^@COM110_ABLE4T$/m] },
      { src: COMF110_ERB, ref: '490-504', any: [/^@COM110_ABLE4W$/m] },
      { src: COMF110_ERB, ref: '506-520', any: [/^@COM110_ABLE5T$/m] },
      { src: COMF110_ERB, ref: '522-540', any: [/^@COM110_ABLE5W$/m] },
      { src: COMF111_ERB, ref: '7-168', any: [/^@COM111$/m] },
      { src: COMF111_ERB, ref: '11', any: [/^PRINTL 撕破衣服$/m] },
      { src: COMF111_ERB, ref: '13-16', any: [/^CALL WEARING_CLOTH_ALL$/m] },
      { src: COMF111_ERB, ref: '20-23', any: [/^CALL PRINT_CLOTHTYPE$/m] },
      { src: COMF111_ERB, ref: '25-39', any: [/^CALL COM111_ABLE6L$/m] },
      { src: COMF111_ERB, ref: '41-84', any: [/^PRINTL  \[100\]- 算了$/m] },
      { src: COMF111_ERB, ref: '85', any: [/^INPUT$/m] },
      {
        src: COMF111_ERB,
        ref: '91-157',
        any: [/^ELSEIF RESULT == 10 && L:0$/m],
      },
      {
        src: COMF111_ERB,
        ref: '91-96',
        any: [
          /^IF RESULT == 10 && \(CFLAG:40 & 64\) && \(CFLAG:42 == 11 \|\| CFLAG:42 == 79\)$/m,
        ],
      },
      {
        src: COMF111_ERB,
        ref: '97-103',
        any: [/^ELSEIF RESULT == 10 && L:0$/m],
      },
      { src: COMF111_ERB, ref: '102', any: [/^	CFLAG:47 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '104-110',
        any: [/^ELSEIF RESULT == 11 && L:1$/m],
      },
      { src: COMF111_ERB, ref: '109', any: [/^	CFLAG:45 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '111-120',
        any: [/^ELSEIF RESULT == 12 && L:2$/m],
      },
      { src: COMF111_ERB, ref: '119', any: [/^	CFLAG:46 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '121-127',
        any: [/^ELSEIF RESULT == 11 && L:3$/m],
      },
      { src: COMF111_ERB, ref: '126', any: [/^	CFLAG:45 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '128-141',
        any: [/^ELSEIF RESULT == 12 && L:4$/m],
      },
      { src: COMF111_ERB, ref: '140', any: [/^	CFLAG:46 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '142-146',
        any: [/^ELSEIF RESULT == 13 && L:5$/m],
      },
      { src: COMF111_ERB, ref: '145', any: [/^	CFLAG:44 = -3$/m] },
      {
        src: COMF111_ERB,
        ref: '147-151',
        any: [/^ELSEIF RESULT == 14 && L:6$/m],
      },
      { src: COMF111_ERB, ref: '150', any: [/^	CFLAG:43 = -3$/m] },
      { src: COMF111_ERB, ref: '151-152', any: [/^ELSEIF RESULT == 19$/m] },
      { src: COMF111_ERB, ref: '153-155', any: [/^ELSEIF RESULT == 100$/m] },
      { src: COMF111_ERB, ref: '156-157', any: [/^	GOTO INPUT_LOOP$/m] },
      {
        src: COMF111_ERB,
        ref: '159-165',
        any: [/^	PRINTL （已经全裸，撕无可撕）$/m],
      },
      { src: COMF111_ERB, ref: '166', any: [/^PRINTL $/m] },
      { src: COMF111_ERB, ref: '168', any: [/^GOTO INPUT_LOOP$/m] },
      { src: COMF111_ERB, ref: '174-262', any: [/^@COM111_ABLE0L$/m] },
      { src: COMF111_ERB, ref: '174-182', any: [/^@COM111_ABLE0L$/m] },
      { src: COMF111_ERB, ref: '184-195', any: [/^@COM111_ABLE1L$/m] },
      { src: COMF111_ERB, ref: '197-208', any: [/^@COM111_ABLE2L$/m] },
      { src: COMF111_ERB, ref: '210-221', any: [/^@COM111_ABLE3L$/m] },
      { src: COMF111_ERB, ref: '223-234', any: [/^@COM111_ABLE4L$/m] },
      { src: COMF111_ERB, ref: '236-247', any: [/^@COM111_ABLE5L$/m] },
      { src: COMF111_ERB, ref: '249-262', any: [/^@COM111_ABLE6L$/m] },
      { src: COMABLE_ERB, ref: '3662-3678', any: [/^@COM_ABLE110$/m] },
      { src: COMABLE_ERB, ref: '3664-3665', any: [/^SIF TFLAG:224 == 555$/m] },
      { src: COMABLE_ERB, ref: '3666-3667', any: [/^SIF FLAG:37 == 0$/m] },
      {
        src: COMABLE_ERB,
        ref: '3670-3671',
        any: [/^SIF CFLAG:41 == 0 && CFLAG:42 == 0$/m],
      },
      { src: COMABLE_ERB, ref: '3672-3681', any: [/^SIF TEQUIP:90$/m] },
      { src: COMABLE_ERB, ref: '3692-3716', any: [/^@COM_ABLE111$/m] },
      { src: COMABLE_ERB, ref: '3718-3719', any: [/^SIF CFLAG:40 == 0$/m] },
    ],
  },
  // —— #215 J5 服装：ere/system/train/cloth.js ——
  {
    js: 'ere/system/train/cloth.js',
    refs: [
      {
        src: FUNC_CLOTH_ERB,
        ref: '161-221',
        any: [/^\s*@WEARING_CLOTH_ALL$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '226-239',
        any: [/^\s*@WEARING_CLOTH_ABLE$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '244-388', any: [/^\s*@AFTERTRAIN_CLOTH$/m] },
      { src: FUNC_CLOTH_ERB, ref: '393-405', any: [/^\s*@RE_CLOTHED$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '459-488',
        any: [/^\s*@SOILING_CLOTH_NO1$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '493-525',
        any: [/^\s*@SOILING_CLOTH_NO2$/m],
      },
      { src: NEXTDAY, ref: '786-787', any: [/^\s*CALL SOILING_CLOTH_NO1$/m] },
      { src: FUNC_CLOTH_ERB, ref: '410-454', any: [/^\s*@WASHING_CLOTH$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '163-164',
        any: [/^\s*SIF CFLAG:41 == 0 && CFLAG:42 == 0$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '167', any: [/^\s*CFLAG:40 = 0$/m] },
      { src: FUNC_CLOTH_ERB, ref: '170-215', any: [/^\s*IF CFLAG:41 != 0$/m] },
      { src: FUNC_CLOTH_ERB, ref: '172', any: [/^\s*CFLAG:40 \|= 1$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '174',
        any: [
          /^\s*SIF TALENT:116 == 0 && TALENT:135 == 0 && \(TALENT:132 == 0 \|\| TALENT:109 == 0\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '177-178',
        any: [
          /^\s*SIF \(CFLAG:40 & 2\) && \(CFLAG:41 == 202 \|\| CFLAG:41 == 254\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '180-185',
        any: [/^\s*SIF \(CFLAG:41 >= 191 && CFLAG:41 <= 200\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '187-188',
        any: [/^\s*SIF CFLAG:41 == 29$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '190-191',
        any: [/^\s*SIF \(CFLAG:40 & 1\) && CFLAG:42 == 69$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '194-209',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '212-213',
        any: [/^\s*SIF CFLAG:41 == 192$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '218-219', any: [/^\s*SIF CFLAG:42$/m] },
      { src: FUNC_CLOTH_ERB, ref: '228-239', any: [/^\s*SIF CFLAG:43 != 0$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '247-295',
        any: [/^\s*IF CFLAG:42 && \(TFLAG:45 & 32\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '249',
        any: [
          /^\s*PRINTFORMW （%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%被拿去扔掉了）$/m,
        ],
      },
      { src: FUNC_CLOTH_ERB, ref: '250', any: [/^\s*CFLAG:42 = 0$/m] },
      { src: FUNC_CLOTH_ERB, ref: '251', any: [/^\s*TFLAG:45 -= 32$/m] },
      { src: FUNC_CLOTH_ERB, ref: '253-254', any: [/^\s*SIF CFLAG:40 & 64$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '255-284',
        any: [
          /^\s*ELSEIF CFLAG:42 == 69 && \(TFLAG:45 & 16\) && CFLAG:47 == 0 && MONEY >= 50$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '258',
        any: [/^\s*PRINTFORML 花费50p为%SAVESTR:TARGET%换尿布吗？$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '259', any: [/^\s*PRINTL  \[0\] - 好的$/m] },
      { src: FUNC_CLOTH_ERB, ref: '260', any: [/^\s*PRINTL  \[1\] - 不要$/m] },
      { src: FUNC_CLOTH_ERB, ref: '261', any: [/^\s*INPUT$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '263',
        any: [/^\s*PRINTFORM （为%SAVESTR:TARGET%换上了新的尿布）$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '269', any: [/^\s*PRINTL\s*$/m] },
      { src: FUNC_CLOTH_ERB, ref: '264', any: [/^\s*MONEY -= 50$/m] },
      { src: FUNC_CLOTH_ERB, ref: '265', any: [/^\s*EX_FLAG:4444 -= 50$/m] },
      { src: FUNC_CLOTH_ERB, ref: '266', any: [/^\s*CFLAG:47 = 0$/m] },
      { src: FUNC_CLOTH_ERB, ref: '267', any: [/^\s*TFLAG:45 -= 16$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '268-271',
        any: [/^\s*IF TALENT:135 == 0$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '273', any: [/^\s*WAIT$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '276',
        any: [/^\s*PRINTFORMW （把%SAVESTR:TARGET%的尿布拿去洗了）$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '277', any: [/^\s*CFLAG:47 = 2$/m] },
      { src: FUNC_CLOTH_ERB, ref: '278', any: [/^\s*TFLAG:45 -= 16$/m] },
      { src: FUNC_CLOTH_ERB, ref: '280-281', any: [/^\s*SIF CFLAG:40 & 64$/m] },
      { src: FUNC_CLOTH_ERB, ref: '282-283', any: [/^\s*ELSE$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '285-294',
        any: [/^\s*ELSEIF CFLAG:42 && \(TFLAG:45 & 16\) && CFLAG:47 == 0$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '287', any: [/^\s*CFLAG:47 = 5$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '289-290',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '291', any: [/^\s*TFLAG:45 -= 16$/m] },
      { src: FUNC_CLOTH_ERB, ref: '293-294', any: [/^\s*SIF CFLAG:40 & 64$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '297-350',
        any: [/^\s*IF CFLAG:41 && \(TFLAG:45 & 8\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '298-305',
        any: [/^\s*PRINTFORM （%SAVESTR:TARGET%穿过的$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '300-301',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '302-303',
        any: [/^\s*ELSEIF CFLAG:41 <= 200$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '306-313',
        any: [/^\s*IF CFLAG:41 >= 201$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '315', any: [/^\s*CFLAG:46 = -2$/m] },
      { src: FUNC_CLOTH_ERB, ref: '321', any: [/^\s*TFLAG:45 -= 8$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '323-349',
        any: [/^\s*ELSEIF CFLAG:41 && \(TFLAG:45 & 4\) && CFLAG:46 == 0$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '326-327',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '328-329',
        any: [/^\s*ELSEIF CFLAG:41 <= 200$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '332-340',
        any: [/^\s*IF CFLAG:41 >= 201$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '342', any: [/^\s*CFLAG:46 = 3$/m] },
      { src: FUNC_CLOTH_ERB, ref: '348', any: [/^\s*TFLAG:45 -= 4$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '352-366',
        any: [/^\s*IF \(TFLAG:45 & 2\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '353',
        any: [/^\s*PRINTFORMW （%SAVESTR:TARGET%的内衣被拿去扔掉了）$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '354', any: [/^\s*CFLAG:43 = -2$/m] },
      { src: FUNC_CLOTH_ERB, ref: '355-356', any: [/^\s*SIF CFLAG:40 & 1$/m] },
      { src: FUNC_CLOTH_ERB, ref: '357', any: [/^\s*TFLAG:45 -= 2$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '359-365',
        any: [/^\s*ELSEIF \(TFLAG:45 & 1\) && CFLAG:43 == 0$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '361', any: [/^\s*CFLAG:43 = 2$/m] },
      { src: FUNC_CLOTH_ERB, ref: '362-363', any: [/^\s*SIF CFLAG:40 & 1$/m] },
      { src: FUNC_CLOTH_ERB, ref: '364', any: [/^\s*TFLAG:45 -= 1$/m] },
      { src: FUNC_CLOTH_ERB, ref: '369-381', any: [/^\s*IF CFLAG:41$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '370-371',
        any: [/^\s*SIF CFLAG:45 < 0 && CFLAG:46 < 0$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '373-374',
        any: [/^\s*SIF CFLAG:41 == 192 && CFLAG:46 < 0$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '376-377',
        any: [/^\s*SIF CFLAG:41 == 0 && CFLAG:40 & 3$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '379-380',
        any: [
          /^\s*ELSEIF \(CFLAG:41 == 1 \|\| CFLAG:41 == -1\) && !\(CFLAG:40 & 3\)$/m,
        ],
      },
      { src: FUNC_CLOTH_ERB, ref: '383-386', any: [/^\s*IF CFLAG:42$/m] },
      { src: FUNC_CLOTH_ERB, ref: '385', any: [/^\s*CFLAG:42 = 0$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '400',
        any: [/^\s*PRINTFORML （%SAVESTR:TARGET%把被脱掉的衣服又穿上了）$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '401', any: [/^\s*WAIT$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '473-480',
        any: [/^\s*PRINTFORM 《%SAVESTR:TARGET%正穿着$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '508-515',
        any: [/^\s*PRINTFORM 《%SAVESTR:TARGET%正穿着$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '461-462', any: [/^\s*SIF FLAG:37 == 0$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '465-471',
        any: [
          /^\s*IF \(CFLAG:40 & 64\) && \(CFLAG:42 <= 50 \|\| CFLAG:42 == 69\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '466',
        any: [
          /^\s*PRINTFORML 《%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%沾满了尿》$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '469-470',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '472-482',
        any: [/^\s*IF \(CFLAG:40 & 8\) \|\| \(CFLAG:40 & 16\)$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '480', any: [/^\s*PRINTFORML 沾满了尿》$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '483-486',
        any: [/^\s*IF \(CFLAG:40 & 1\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '484',
        any: [/^\s*PRINTFORML 《%SAVESTR:TARGET%的内衣沾满了尿》$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '495-496', any: [/^\s*SIF FLAG:37 == 0$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '499-506',
        any: [
          /^\s*IF \(CFLAG:40 & 64\) && \(CFLAG:42 <= 50 \|\| CFLAG:42 == 69\)$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '500',
        any: [
          /^\s*PRINTFORML 《%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%沾满了污物$/m,
        ],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '504-505',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '507-518',
        any: [/^\s*IF \(CFLAG:40 & 8\) \|\| \(CFLAG:40 & 16\)$/m],
      },
      { src: FUNC_CLOTH_ERB, ref: '515', any: [/^\s*PRINTL 沾满了污物》$/m] },
      {
        src: FUNC_CLOTH_ERB,
        ref: '519-523',
        any: [/^\s*IF \(CFLAG:40 & 1\)$/m],
      },
      {
        src: FUNC_CLOTH_ERB,
        ref: '520',
        any: [/^\s*PRINTFORML 《%SAVESTR:TARGET%的内衣沾满了污物》$/m],
      },
    ],
  },
  {
    js: 'ere/system/train/incest.js',
    refs: [{ src: SUB2, ref: '324-343', any: [/@INCEST/] }],
  },
  {
    js: 'ere/event/source-check.js',
    refs: [
      {
        src: SUB1,
        ref: '267-268',
        any: [/^\s*;?\s*SIF\ TALENT:0\ ==\ 0\ \|\|\ TFLAG:19\ ==\ 0$/m],
      },
      { src: SUB1, ref: '270', any: [/^\s*;?\s*PRINTL\ 【处女丧失】$/m] },
      { src: SUB1, ref: '271', any: [/^\s*;?\s*TALENT:0\ =\ 0$/m] },
      { src: SUB1, ref: '274-277', any: [/^\s*;?\s*TFLAG:3\ =\ 1$/m] },
      { src: SUB1, ref: '282', any: [/^\s*;?\s*$/m] },
      { src: SUB1, ref: '284', any: [/^\s*;?\s*TFLAG:14\ =\ 0$/m] },
      { src: SUB1, ref: '284-285', any: [/^\s*;?\s*TFLAG:14\ =\ 0/m] },
      { src: SUB1, ref: '287-313', any: [/^\s*;?\s*IF\ CFLAG:15\ ==\ 0$/m] },
      {
        src: SUB1,
        ref: '289',
        any: [/^\s*;?\s*CFLAG:15\ =\ NO:PLAYER\ \+\ 1$/m],
      },
      {
        src: SUB1,
        ref: '290',
        any: [/^\s*;?\s*CSTR:TARGET:3\ =\ %SAVESTR:PLAYER%$/m],
      },
      {
        src: SUB1,
        ref: '314-325',
        any: [/^\s*;?\s*SIF\ TEQUIP:90\ \&\&\ SELECTCOM\ ==\ 101$/m],
      },
      { src: SUB1, ref: '327-340', any: [/^\s*;?\s*TFLAG:150\ =\ 1$/m] },
      {
        src: SOURCE,
        ref: '400-401',
        any: [/^\s*;?\s*SIF\ TEQUIP:54\ \&\&\ TFLAG:899\ >\ 0$/m],
      },
      { src: SOURCE, ref: '1812', any: [/^\s*;?\s*CALL\ SEIIN_START$/m] },
      { src: SOURCE, ref: '7-576', any: [/@SOURCE_CHECK/] },
      { src: SOURCE, ref: '11-12', any: [/CALL KOJO_MESSAGE_COM/] },
      { src: SOURCE, ref: '19-51', any: [/射在避孕套里/] },
      {
        src: SOURCE,
        ref: '53-55',
        any: [/CUSTOMDRAWLINE ‥/, /ELSEIF ASSIPLAY && TEQUIP:36/],
      },
      { src: SOURCE, ref: '58-123', any: [/;バイブ装着中/] },
      {
        src: SOURCE,
        ref: '128-130',
        any: [/CALL SOURCE_SEX_CHECK/, /CALL MASTER_SKILL_CHECK/],
      },
      { src: SOURCE, ref: '132-144', any: [/ズーコの着ぐるみを着ている/] },
      { src: SOURCE, ref: '157-158', any: [/SIF TFLAG:13/, /PRINTL 初吻/] },
      {
        src: SOURCE,
        ref: '162-186',
        any: [
          /CALL SOURCE_CHECK_UP_C/,
          /CALL SOURCE_CHECK_UP_B/,
          /CALL SOURCE_CHECK_UP_FREE/,
        ],
      },
      {
        src: SOURCE,
        ref: '188-206',
        any: [
          /同じコマンドの連続実行による上下の処理（快楽系）/,
          /気力０による上下の処理（快楽系）/,
        ],
      },
      {
        src: SOURCE,
        ref: '210-218',
        any: [/R = NO:PLAYER/, /RELATION:R != 0/],
      },
      { src: SOURCE, ref: '225', any: [/CALL UP_TALENT_CVA_CHECK/] },
      { src: SOURCE, ref: '230', any: [/CALL LOVE_MOIST_CHECK_UP/] },
      { src: SOURCE, ref: '235', any: [/CALL EX_CHECK_UP/] },
      { src: SOURCE, ref: '238-252', any: [/調教対象の射精チェック/] },
      {
        src: SOURCE,
        ref: '254-255',
        any: [/主人による調教の经验值/, /CALL MASTER_FLAG_CHECK/],
      },
      {
        src: SOURCE,
        ref: '260-315',
        any: [
          /CALL SOURCE_CHECK_UP_LOVE/,
          /CALL SOURCE_CHECK_UP_DEVIATE/,
          /CALL SOURCE_CHECK_UP_LIKE/,
        ],
      },
      { src: SOURCE, ref: '326', any: [/CALL UP_TALENT_CHECK/] },
      { src: SOURCE, ref: '331-345', any: [/R = NO:PLAYER/] },
      { src: SOURCE, ref: '352-357', any: [/IF SELECTCOM == PREVCOM/] },
      { src: SOURCE, ref: '363', any: [/TFLAG:59 = PREVCOM/] },
      { src: SOURCE, ref: '377-387', any: [/IF BASE:1 <= 0/] },
      { src: SOURCE, ref: '411-412', any: [/BASE:0 -= LOSEBASE:0/] },
      { src: SOURCE, ref: '415-424', any: [/挿しっぱ无判定 TFLAG:60/] },
      {
        src: SOURCE,
        ref: '426-473',
        any: [/TEQUIP:37/, /CFLAG:101/, /膣内射精のチェック/],
      },
      { src: SOURCE, ref: '476', any: [/CALL TRAIN_MESSAGE_A/] },
      { src: SOURCE, ref: '482-497', any: [/IF TFLAG:899 < 1/] },
      { src: SOURCE, ref: '499', any: [/CALL PISSING_ECST_CHECK/] },
      { src: SOURCE, ref: '504-513', any: [/CALL KOJO_MESSAGE_PALAMCNG/] },
      { src: SOURCE, ref: '510', any: [/CALL MARK_GOT_CHECK/] },
      { src: SOURCE, ref: '518', any: [/CALL EXP_GOT_CHECK/] },
      { src: SOURCE, ref: '523', any: [/CALL SOKUOCHI_CHECK/] },
      { src: SOURCE, ref: '525', any: [/PRINTW ‥/] },
      { src: SOURCE, ref: '530', any: [/CALL SHOW_SOURCE/] },
      { src: SOURCE, ref: '536-543', any: [/＜相性/, /连续执行同一指令/] },
      { src: SOURCE, ref: '545', any: [/PREVCOM = SELECTCOM/] },
      {
        src: SOURCE,
        ref: '552-567',
        any: [/CALL LOSELIFE_BAR/, /CALL LOSEVITAL_BAR/],
      },
      { src: SOURCE, ref: '576', any: [/CALL PALAM_UP_CHECK/] },
      { src: SOURCE, ref: '579', any: [/@SOURCE_CHECK_UP_C/] },
      { src: SOURCE, ref: '583-588', any: [/SIF TALENT:101 & 1/] },
      { src: SOURCE, ref: '590-605', any: [/;PALAM:欲情をみる/] },
      { src: SOURCE, ref: '607-624', any: [/;ABL:欲望をみる/] },
      { src: SOURCE, ref: '626-648', any: [/快感の否定、抑圧、抵抗/] },
      { src: SOURCE, ref: '650-655', any: [/;自慰狂い/, /IF TALENT:74/] },
      { src: SOURCE, ref: '675', any: [/@SOURCE_CHECK_UP_V/] },
      { src: SOURCE, ref: '773', any: [/@SOURCE_CHECK_UP_A/] },
      { src: SOURCE, ref: '872', any: [/@SOURCE_CHECK_UP_B/] },
      {
        src: SOURCE,
        ref: '879-897',
        any: [/絶壁、貧乳、巨乳、爆乳、超乳はここで処理/],
      },
      { src: SOURCE, ref: '987', any: [/@SOURCE_CHECK_UP_LOVE/] },
      { src: SOURCE, ref: '1052', any: [/@SOURCE_CHECK_UP_IMPULSIVE/] },
      { src: SOURCE, ref: '1122', any: [/@SOURCE_CHECK_UP_ACHIEVE/] },
      { src: SOURCE, ref: '1186', any: [/@SOURCE_CHECK_UP_PAIN/] },
      { src: SOURCE, ref: '1294', any: [/@SOURCE_CHECK_UP_POISON/] },
      { src: SOURCE, ref: '1338', any: [/@SOURCE_CHECK_UP_DIRTY/] },
      { src: SOURCE, ref: '1373', any: [/@SOURCE_CHECK_UP_MOIST/] },
      { src: SOURCE, ref: '1383', any: [/@SOURCE_CHECK_UP_DESIRE/] },
      { src: SOURCE, ref: '1393', any: [/@SOURCE_CHECK_UP_FLASHER/] },
      { src: SOURCE, ref: '1471', any: [/@SOURCE_CHECK_UP_SUBMIT/] },
      { src: SOURCE, ref: '1529', any: [/@SOURCE_CHECK_UP_DEVIATE/] },
      { src: SOURCE, ref: '1587', any: [/@SOURCE_CHECK_UP_LIKE/] },
      { src: SOURCE, ref: '1598', any: [/@SOURCE_CHECK_UP_FREE/] },
      { src: SOURCE, ref: '1609', any: [/@LOVE_MOIST_CHECK_UP/] },
      { src: SOURCE, ref: '1628', any: [/@PAIN_DAMAGE_CHECK_UP/] },
      { src: SOURCE, ref: '1662-2131', any: [/@EX_CHECK_UP/] },
      {
        src: SOURCE,
        ref: '2137-2175',
        any: [/@SHOW_SOURCE/, /PRINTFORM 情爱\(\{SOURCE:3\}\)/],
      },
      {
        src: SOURCE,
        ref: '2182-2242',
        any: [/@PALAM_UP_CHECK/, /FOR UPCOUNT,0,16/],
      },
      { src: SOURCE, ref: '2230-2231', any: [/PALAM:UPID \+= UP:UPID/] },
      { src: SOURCE, ref: '2278-2394', any: [/@PALAM_MESSAGE,ARG/] },
      { src: SOURCE, ref: '2513-2520', any: [/@FIGURE_INDENT_2/] },
      { src: SOURCE, ref: '2529', any: [/@LOSELIFE_BAR/] },
      { src: SOURCE, ref: '2561', any: [/@LOSEVITAL_BAR/] },
      { src: SUB1, ref: '31-43', any: [/@SOURCE_SEX_CHECK/] },
      { src: SUB1, ref: '47-51', any: [/IF TALENT:PLAYER:33/] },
      { src: SUB1, ref: '53-55', any: [/IF TALENT:PLAYER:87/] },
      { src: SUB1, ref: '70-77', any: [/IF TALENT:PLAYER:92/] },
      { src: SUB1, ref: '124-169', any: [/;調教者のABL:技巧/] },
      { src: SUB1, ref: '172', any: [/@MASTER_SKILL_CHECK/] },
      { src: SUB1, ref: '205-220', any: [/IF TALENT:76/, /IF TALENT:85/] },
      { src: SUB1, ref: '691-738', any: [/@UP_TALENT_CVA_CHECK/] },
      { src: SUB1, ref: '740-935', any: [/@UP_TALENT_CHECK/] },
      { src: SUB1, ref: '952-1080', any: [/@MARK_GOT_CHECK/] },
      { src: SUB1, ref: '1092', any: [/@YOKUBO_UP_CHECK/] },
      { src: SUB1, ref: '1113', any: [/@JUJUN_UP_CHECK/] },
      { src: SUB1, ref: '1124', any: [/@EXP_GOT_CHECK/] },
      { src: SUB1, ref: '1315', any: [/@SOKUOCHI_CHECK/] },
      { src: SUB1, ref: '1555', any: [/@ECST_CHECK,ARG/] },
      { src: SUB1, ref: '1561', any: [/@PISSING_ECST_CHECK/] },
      {
        src: SUB1,
        ref: '1615-1711',
        any: [/@MASTER_FLAG_CHECK/, /主人と対象の能力を計算/],
      },
      { src: SUB1, ref: '1633-1640', any: [/REPEAT 5/] },
      {
        src: SUB1,
        ref: '1642-1707',
        any: [/IF ASSIPLAY == 0 && TEQUIP:90 == 0/],
      },
      { src: SUB1, ref: '1727', any: [/@TARGET_WORMBABY_CHECK/] },
      { src: SUB2, ref: '9', any: [/@SOURCE_LESBIAN_SEX_CHECK/] },
      { src: SUB2, ref: '242', any: [/@SOURCE_GAY_SEX_CHECK/] },
      { src: SUB2, ref: '324', any: [/@INCEST/] },
      { src: SUB2, ref: '350', any: [/@SOUL_DISLOCATION_DEBUFF/] },
    ],
  },
  // —— #46（口上切片：K3 高貴 + K5 マオ）——
  {
    js: 'ere/page/page-shop.js',
    refs: [
      // @EVENTSHOP 自身（#46 起挂事件链，普通档；EVENT_K.ERB 的 #PRI 档在
      // kojo-system.js——见下一条目）
      { src: SHOP_VER, ref: '4-20', any: [/^@EVENTSHOP/m, /REPEAT 100/] },
      { src: SHOP_VER, ref: '7-12', any: [/バグ対策/] },
      { src: SHOP_VER, ref: '15-18', any: [/ITEMSALES:COUNT = 0/] },
      // #180：102 分支接 DUNGEON_INFO2 真身（原豁免条目 '108' 随引用
      // 改写为 108-109 而消化，豁免清单同步删）
      {
        src: SHOP_VER,
        ref: '108-109',
        any: [/^ELSEIF RESULT == 102$/m, /^CALL DUNGEON_INFO2$/m],
      },
    ],
  },
  // —— #180（H11 迷宫情报与建设：DUNGEON_INFO2.ERB / DUNGEON_SETUP.ERB）——
  {
    js: 'ere/page/page-dungeon-info2.js',
    refs: [
      // target/ERB/迷宮/DUNGEON_INFO2.ERB
      {
        src: DUNGEON_INFO2,
        ref: '2-492',
        any: [/^\s*@DUNGEON_INFO2$/m, /^\s*#DIM DISPLAY_FLAG = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '3-9',
        any: [
          /^\s*#DIM DISPLAY_FLAG = 0$/m,
          /^\s*#DIM SELECT_FLAG = 0, 0, 0$/m,
        ],
      },
      { src: DUNGEON_INFO2, ref: '12', any: [/^\s*REDRAW 0$/m] },
      { src: DUNGEON_INFO2, ref: '15', any: [/^\s*CUSTOMDRAWLINE =$/m] },
      { src: DUNGEON_INFO2, ref: '17', any: [/^\s*WHILE RESULT != 999$/m] },
      { src: DUNGEON_INFO2, ref: '18', any: [/^\s*DISPLAY_LINE = 17$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '20-46',
        any: [/^\s*LINE_COUNT:0 = 4$/m, /^\s*LINE_COUNT:1 = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '48-52',
        any: [
          /^\s*FONTBOLD$/m,
          /^\s*CALL MENU_BUTTON, \(DISPLAY_FLAG != 0\), @"%UNICODE\(0x258c\)% 陷 阱　", 900$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '54-123',
        any: [/^\s*COMPARE_BIT = 1$/m, /^\s*FOR LCOUNT:0, 0, 9$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '56',
        any: [
          /^\s*PRINTFORM \[\{\(LCOUNT:0 \+ 1\) \* 10 \+ 100\}\] 第\{LCOUNT:0 \+ 1\}阶层\s*$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '58-79',
        any: [/^\s*IF DISPLAY_FLAG == 0$/m, /^\s*FOR LCOUNT:1, 0, 3$/m],
      },
      { src: DUNGEON_INFO2, ref: '65', any: [/^\s*SETCOLOR 128, 255, 0$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '67',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '75-76',
        any: [/^\s*PRINTFORM 陷阱：%"无",18,LEFT%$/m, /^\s*FLAG:X = -1$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '81-99',
        any: [/^\s*ELSEIF DISPLAY_FLAG == 1$/m, /^\s*X = LCOUNT:0 \+ 350$/m],
      },
      { src: DUNGEON_INFO2, ref: '87', any: [/^\s*SETCOLOR 128, 255, 0$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '89',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '96-97',
        any: [/^\s*PRINTFORM 设施：通路$/m, /^\s*FLAG:X = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '101-119',
        any: [/^\s*ELSE$/m, /^\s*X = LCOUNT:0 \+ 340$/m],
      },
      { src: DUNGEON_INFO2, ref: '107', any: [/^\s*SETCOLOR 128, 255, 0$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '109',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '124-128',
        any: [
          /^\s*IF DISPLAY_FLAG == 0$/m,
          /^\s*PRINTFORML \[200\] 全部陷阱 \[201\]陷阱%"　Ａ",21,LEFT%  \[202\]陷阱%"　Ｂ",21,LEFT%  \[203\]陷阱　Ｃ$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '131-132',
        any: [
          /^\s*SIF SELECT_FLAG:0 == 0 && SELECT_FLAG:1 == 0 && SELECT_FLAG:2 == 0$/m,
          /^\s*SETCOLOR 128, 128, 128$/m,
        ],
      },
      { src: DUNGEON_INFO2, ref: '132', any: [/^\s*SETCOLOR 128, 128, 128$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '134-246',
        any: [/^\s*IF DISPLAY_FLAG == 0$/m, /^\s*Y = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '136-166',
        any: [/^\s*Y = 0$/m, /^\s*LINE_COUNT:1 = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '139',
        any: [/^\s*PRINTL \[  0\] 解除陷阱$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '149',
        any: [
          /^\s*PRINTFORM \[\{LCOUNT:0, 3\}\] %ITEMNAME:\(LCOUNT:0\), 16, LEFT%（\{ITEM:\(LCOUNT:0\), 2\}）$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '153-159',
        any: [/^\s*ELSEIF DIALOGUE:1 == -1$/m, /^\s*RESETCOLOR$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '171-180',
        any: [/^\s*IF DIALOGUE:1 > 0$/m, /^\s*IF DIALOGUE:0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '187-192',
        any: [/^\s*ELSEIF DIALOGUE:1 == -2$/m, /^\s*DISPLAY_LINE -= 1$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '193-204',
        any: [/^\s*ELSE$/m, /^\s*Y = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '214-245',
        any: [/^\s*ELSE$/m, /^\s*Y = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '240-241',
        any: [
          /^\s*IF LINE_COUNT:0 > LINE_COUNT:1$/m,
          /^\s*FOR LCOUNT:0, LINE_COUNT:1, LINE_COUNT:0$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '249-252',
        any: [
          /^\s*PRINTFORML \[10\] 部下状态总览$/m,
          /^\s*PRINTFORM \[11\]1～3层 \[12\]4～6层 \[13\]7～9层 \[14\]近卫兵$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '251',
        any: [/^\s*PRINTPLAIN  显示部下\s*$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '252',
        any: [
          /^\s*PRINTFORML \[100\]怪物迎击    　现在：\\@\(FLAG:5 & 16\) \?關閉#開啟\\@$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '256-262',
        any: [/^\s*IF DIALOGUE:1 < 0$/m, /^\s*WAITANYKEY$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '265-320',
        any: [
          /^\s*IF DISPLAY_FLAG == 0$/m,
          /^\s*IF RESULT > 100 && RESULT < 204$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '268',
        any: [/^\s*COMPARE_BIT = 1 << RESULT \/ 10 - 11$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '270-279',
        any: [
          /^\s*IF RESULT == 200$/m,
          /^\s*IF SELECT_FLAG:0 == 511 && SELECT_FLAG:1 == 511 && SELECT_FLAG:2 == 511$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '281-291',
        any: [
          /^\s*ELSEIF RESULT % 10 == 0$/m,
          /^\s*COMPARE_BIT = 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '293-298',
        any: [
          /^\s*ELSEIF RESULT > 200$/m,
          /^\s*IF SELECT_FLAG:\(RESULT - 201\) == 511$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '300-301',
        any: [
          /^\s*ELSEIF RESULT % 10 < 4$/m,
          /^\s*SELECT_FLAG:\(RESULT % 10 - 1\) \^= COMPARE_BIT$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '304-319',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 60 && RESULT < 89 && ITEM:RESULT\)$/m,
          /^\s*SIF SELECT_FLAG:0 == 0 && SELECT_FLAG:1 == 0 && SELECT_FLAG:2 == 0$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '322-376',
        any: [/^\s*ELSEIF DISPLAY_FLAG == 1$/m, /^\s*IF DIALOGUE:1 > 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '324-346',
        any: [
          /^\s*IF RESULT == 0$/m,
          /^\s*IF \(MONEY >= 10000 \* DIALOGUE:1 && DIALOGUE:0 != 0\) \|\| \(DIALOGUE:0 == 0\)$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '325',
        any: [
          /^\s*IF \(MONEY >= 10000 \* DIALOGUE:1 && DIALOGUE:0 != 0\) \|\| \(DIALOGUE:0 == 0\)$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '334-335',
        any: [
          /^\s*MONEY -= 10000 \* DIALOGUE:1$/m,
          /^\s*EX_FLAG:4444 -= 10000 \* DIALOGUE:1$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '352-353',
        any: [
          /^\s*IF RESULT > 100 && RESULT < 200$/m,
          /^\s*SELECT_FLAG:0 \^= 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '355-360',
        any: [/^\s*ELSEIF RESULT == 200$/m, /^\s*IF SELECT_FLAG:0 == 511$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '362-375',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 500 && RESULT < 508\)$/m,
          /^\s*IF SELECT_FLAG:0 == 0$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '370',
        any: [/^\s*IF SELECT_FLAG & COMPARE_BIT$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '378-403',
        any: [/^\s*ELSE$/m, /^\s*IF RESULT > 100 && RESULT < 200$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '381-382',
        any: [
          /^\s*IF RESULT > 100 && RESULT < 200$/m,
          /^\s*SELECT_FLAG:0 \^= 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '384-389',
        any: [/^\s*ELSEIF RESULT == 200$/m, /^\s*IF SELECT_FLAG:0 == 511$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '391-402',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 300 && RESULT < 340 && ITEM:RESULT\)$/m,
          /^\s*IF SELECT_FLAG:0 == 0$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '397',
        any: [/^\s*IF SELECT_FLAG & COMPARE_BIT$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '407-412',
        any: [
          /^\s*IF RESULT >= 900 && RESULT <= 902$/m,
          /^\s*DISPLAY_FLAG = RESULT % 10$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '415-417',
        any: [/^\s*IF RESULT == 100$/m, /^\s*FLAG:5 \^= 16$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '420-477',
        any: [/^\s*IF RESULT >= 10 && RESULT <= 14$/m, /^\s*\$PRINT$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '421-424',
        any: [
          /^\s*\$PRINT$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '421-477',
        any: [
          /^\s*\$PRINT$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '426-438',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      { src: DUNGEON_INFO2, ref: '439', any: [/^\s*KAI_LIST = RESULT$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '440-465',
        any: [/^\s*REPEAT 100$/m, /^\s*SIF Z >= 100 \|\| R <= 0$/m],
      },
      { src: DUNGEON_INFO2, ref: '447', any: [/^\s*WAIT$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '449-453',
        any: [/^\s*IF X != 10$/m, /^\s*PRINTFORML 第\{X\}阶层$/m],
      },
      { src: DUNGEON_INFO2, ref: '454', any: [/^\s*CALL ENEMY_EXIST2\(X\)$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '460',
        any: [/^\s*PRINTFORML \[\{A\}\] \{B\}只%MONSTERNAME\(A\)%\s*$/m],
      },
      { src: DUNGEON_INFO2, ref: '468', any: [/^\s*PRINTL \[999\] 返回$/m] },
      { src: DUNGEON_INFO2, ref: '469', any: [/^\s*INPUT$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '472',
        any: [/^\s*CALL MONSTER_SETUP,RESULT$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '472-473',
        any: [/^\s*CALL MONSTER_SETUP,RESULT$/m, /^\s*GOTO PRINT$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '479-480',
        any: [/^\s*SIF RESULT != 999$/m, /^\s*CLEARLINE DISPLAY_LINE$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '483-488',
        any: [/^\s*DISPLAY_FLAG = 0$/m, /^\s*SELECT_FLAG:0 = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '483-491',
        any: [/^\s*DISPLAY_FLAG = 0$/m, /^\s*SELECT_FLAG:0 = 0$/m],
      },
      { src: DUNGEON_INFO2, ref: '491', any: [/^\s*REDRAW 1$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '496-541',
        any: [/^\s*@ENEMY_COMPARE\(ARG, ARG:1\)$/m, /^\s*#FUNCTION$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '501-502',
        any: [/^\s*SIF ARG == ARG:1$/m, /^\s*RETURNF 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '505-506',
        any: [
          /^\s*SIF CFLAG:ARG:501 != CFLAG:\(ARG:1\):501$/m,
          /^\s*RETURNF CFLAG:ARG:501 < CFLAG:\(ARG:1\):501 \? -1 # 1$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '508-511',
        any: [
          /^\s*LOCAL = 0,0,0,0,0$/m,
          /^\s*LOCAL:3 = CFLAG:ARG:1 == 3 && CFLAG:ARG:500 == 4 \? 2 # CFLAG:ARG:1$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '514-528',
        any: [
          /^\s*IF LOCAL:3 != LOCAL:4$/m,
          /^\s*LOCAL = LOCAL:3 == 2 \? CFLAG:ARG:533 # ARG$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '531-532',
        any: [
          /^\s*SIF LOCAL != LOCAL:1$/m,
          /^\s*RETURNF CFLAG:LOCAL:502 < CFLAG:\(LOCAL:1\):502 \? -1 # 1$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '535-538',
        any: [/^\s*SIF LOCAL == ARG$/m, /^\s*RETURNF -1$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '541',
        any: [/^\s*RETURNF CFLAG:LOCAL:531 == ARG \? -1 # 1$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '545-645',
        any: [/^\s*@ENEMY_EXIST2\(ARG\)$/m, /^\s*#DIM L_CHAR$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '553-554',
        any: [/^\s*VARSET LOCAL$/m, /^\s*L_LEN = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '557-580',
        any: [/^\s*FOR L_CHAR, 1, CHARANUM$/m, /^\s*SIF ARG == 10$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '559-560',
        any: [/^\s*SIF ARG == 10$/m, /^\s*CONTINUE$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '562-563',
        any: [/^\s*SIF CFLAG:L_CHAR:501 != ARG$/m, /^\s*CONTINUE$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '565-566',
        any: [
          /^\s*SIF \( CFLAG:L_CHAR:1 != 2 && CFLAG:L_CHAR:1 != 3 && TALENT:L_CHAR:221 == 0 \) \|\| \(\(\(CFLAG:L_CHAR:1 != 0 && ARG == 10\) \|\| \(CFLAG:L_CHAR:1 != 3 && CFLAG:L_CHAR:1 != 2\)\) && TALENT:L_CHAR:221 \)$/m,
          /^\s*CONTINUE$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '571-579',
        any: [/^\s*FOR L_INDX, 0, L_LEN$/m, /^\s*IF LOCAL:L_INDX <= 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '581-628',
        any: [/^\s*L_CHAR = 0$/m, /^\s*L_LAST = 0$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '584',
        any: [/^\s*L_LAST = CFLAG:L_CHAR:533$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '591',
        any: [/^\s*IF L_LAST > 0 && CFLAG:L_LAST:533 == CFLAG:L_CHAR:533$/m],
      },
      { src: DUNGEON_INFO2, ref: '595', any: [/^\s*PRINTL$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '602-618',
        any: [/^\s*IF CFLAG:L_CHAR:507 == 1$/m, /^\s*SETCOLOR 200,200,100$/m],
      },
      { src: DUNGEON_INFO2, ref: '603', any: [/^\s*SETCOLOR 200,200,100$/m] },
      { src: DUNGEON_INFO2, ref: '607', any: [/^\s*SETCOLOR 100,255,255$/m] },
      { src: DUNGEON_INFO2, ref: '611', any: [/^\s*SETCOLOR 255,100,100$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '613-617',
        any: [
          /^\s*IF CFLAG:L_CHAR:520 > 0$/m,
          /^\s*PRINTFORM \[\{CFLAG:L_CHAR:520\+1\}F侵攻\]$/m,
        ],
      },
      {
        src: DUNGEON_INFO2,
        ref: '620-625',
        any: [/^\s*IF CFLAG:L_CHAR:1 == 2$/m, /^\s*SETCOLOR 255,100,100$/m],
      },
      { src: DUNGEON_INFO2, ref: '622', any: [/^\s*SETCOLOR 255,100,100$/m] },
      { src: DUNGEON_INFO2, ref: '624', any: [/^\s*SETCOLOR 100,255,255$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '627',
        any: [/^\s*PRINTFORM %SAVESTR:L_CHAR,MAX_NAME_LEN,LEFT%\s*$/m],
      },
      { src: DUNGEON_INFO2, ref: '629-630', any: [/^\s*PRINTL$/m] },
      { src: DUNGEON_INFO2, ref: '632', any: [/^\s*IF X == 10$/m] },
      {
        src: DUNGEON_INFO2,
        ref: '632-645',
        any: [/^\s*IF X == 10$/m, /^\s*FOR COUNT, 0, CHARANUM$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '637',
        any: [/^\s*PRINTFORM %SAVESTR:COUNT,MAX_NAME_LEN,LEFT%$/m],
      },
      {
        src: DUNGEON_INFO2,
        ref: '638-641',
        any: [/^\s*FOR LOCAL, 200, 212$/m, /^\s*SIF TALENT:COUNT:LOCAL$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-dungeon-setup.js',
    refs: [
      { src: DUNGEON_SETUP, ref: '459-460', any: [/^\t\t\tPRINT ★$/m] },
      // target/ERB/迷宮/DUNGEON_SETUP.ERB
      {
        src: DUNGEON_SETUP,
        ref: '5-231',
        any: [/^\s*@DUNGEON_INFO$/m, /^\s*IF FLAG:502 == 1$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '8-11',
        any: [/^\s*IF FLAG:502 == 1$/m, /^\s*CALL DUNGEON_INFO_MAP$/m],
      },
      { src: DUNGEON_SETUP, ref: '14', any: [/^\s*DRAWLINE$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '16-79',
        any: [/^\s*REPEAT 9$/m, /^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '17',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '19-28',
        any: [/^\s*X = COUNT \+ 300$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '22',
        any: [/^\s*PRINTFORM \[\{COUNT\}\] 第\{COUNT \+ 1\}阶层　陷阱：无$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '31-52',
        any: [/^\s*X = COUNT \+ 310$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '57-66',
        any: [/^\s*X = COUNT \+ 350$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '69-78',
        any: [/^\s*X = COUNT \+ 340$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '81-82',
        any: [
          /^\s*PRINTFORML \[9\] 部下状态总览$/m,
          /^\s*PRINTFORML \[10\]1～3层 \[11\]4～6层 \[12\]7～9层 的部下$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '88-92',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '95-143',
        any: [
          /^\s*IF RESULT >= 9 && RESULT <= 12$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '101-137',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '119-123',
        any: [/^\s*IF X != 10$/m, /^\s*PRINTFORML 第\{X\}阶层$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '128-133',
        any: [/^\s*IF B > 0$/m, /^\s*PRINTV B$/m],
      },
      { src: DUNGEON_SETUP, ref: '140', any: [/^\s*WAIT$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '145-146',
        any: [/^\s*SIF RESULT == 100$/m, /^\s*RETURN 0$/m],
      },
      { src: DUNGEON_SETUP, ref: '148', any: [/^\s*X = RESULT$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '150-177',
        any: [
          /^\s*PRINTFORML 进行第\{X \+ 1\}阶层的设定$/m,
          /^\s*PRINTL 《请选择要设置的陷阱和宝物》$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '153-163',
        any: [/^\s*Y = 0$/m, /^\s*REPEAT 29$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '164-173',
        any: [/^\s*REPEAT 21$/m, /^\s*Z = COUNT \+ 300$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '179-231',
        any: [/^\s*\$INPUT_LOOP_2$/m, /^\s*INPUT$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '181-185',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP_2$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '187-194',
        any: [/^\s*IF RESULT == 0$/m, /^\s*Y = X \+ 300$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '195-198',
        any: [/^\s*ELSEIF RESULT == 1$/m, /^\s*Y = X \+ 340$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '199-201',
        any: [/^\s*ELSEIF RESULT == 2$/m, /^\s*CALL ROOM_SETUP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '202-203',
        any: [/^\s*ELSEIF RESULT == 998$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '204-205',
        any: [/^\s*ELSEIF RESULT == 999$/m, /^\s*RETURN 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '207-231',
        any: [/^\s*Z = RESULT$/m, /^\s*IF Z < 100$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '208-229',
        any: [/^\s*IF Z < 100$/m, /^\s*\$INPUT_LOOP_3$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '211-215',
        any: [/^\s*INPUT$/m, /^\s*IF RESULT < 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '212-215',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP_3$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '216-223',
        any: [/^\s*ELSEIF RESULT == 3$/m, /^\s*Y = X \+ 300$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '225-226',
        any: [/^\s*Y = X \+ 300$/m, /^\s*Y \+= RESULT \* 10$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '227-229',
        any: [/^\s*ELSEIF Z > 300$/m, /^\s*Y = X \+ 340$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '237-264',
        any: [/^\s*@ENEMY_EXIST$/m, /^\s*REPEAT CHARANUM$/m],
      },
      { src: DUNGEON_SETUP, ref: '240', any: [/^\s*SETCOLOR 255,255,0$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '241',
        any: [/^\s*IF CFLAG:COUNT:501 == X && COUNT != MASTER\s*$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '242-255',
        any: [
          /^\s*IF CFLAG:COUNT:1 == 2$/m,
          /^\s*PRINTFORM %SAVESTR:COUNT%\[侵攻中\]$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '259',
        any: [/^\s*SIF X == 10 && COUNT != MASTER && EX_TALENT:COUNT:1$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '259-260',
        any: [
          /^\s*SIF X == 10 && COUNT != MASTER && EX_TALENT:COUNT:1$/m,
          /^\s*PRINTFORML %SAVESTR:COUNT%\[护卫中\]$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '268-307',
        any: [/^\s*@ROOM_SETUP$/m, /^\s*\$INPUT_LOOP_4$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '276-284',
        any: [/^\s*REPEAT 7$/m, /^\s*Z = COUNT \+ 500$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '290-292',
        any: [/^\s*IF RESULT == 0$/m, /^\s*Y = X \+ 350$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '293-294',
        any: [/^\s*ELSEIF RESULT == 999$/m, /^\s*RETURN 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '295-303',
        any: [
          /^\s*ELSEIF RESULT >= 500 && RESULT <= 507$/m,
          /^\s*IF MONEY < 10000$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '297-299',
        any: [/^\s*PRINTL \*资金不足！！\*$/m, /^\s*RETURN 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '300-301',
        any: [/^\s*MONEY -= 10000$/m, /^\s*EX_FLAG:4444 -= 10000$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '304-305',
        any: [/^\s*ELSE$/m, /^\s*GOTO INPUT_LOOP_4$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '311-483',
        any: [/^\s*@DUNGEON_INFO_MAP$/m, /^\s*\$INPUT_LOOP_MAP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '332-334',
        any: [/^\s*IF RESULT == 1$/m, /^\s*CALL GEO_OUTPUT_2$/m],
      },
      { src: DUNGEON_SETUP, ref: '332-334', any: [/^\s*CALL GEO_OUTPUT_2$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '335-384',
        any: [
          /^\s*ELSEIF RESULT >= 2 && RESULT <= 5$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '342-378',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '386-387',
        any: [/^\s*SIF RESULT == 100$/m, /^\s*RETURN 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '390-393',
        any: [/^\s*CALL MON_LIMIT$/m, /^\s*SIF RESULT == 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '395-483',
        any: [/^\s*\$INPUT_LOOP_MONSET$/m, /^\s*PRINTL \*放置怪物\*$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '397-411',
        any: [/^\s*PRINTL \*放置怪物\*$/m, /^\s*PRINTL 请设定怪物的等级$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '403-404',
        any: [/^\s*IF RESULT == 0$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '405-408',
        any: [/^\s*ELSEIF RESULT == 100$/m, /^\s*CALL MON_SET_OMAKASE$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '409-410',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 11$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '413-428',
        any: [/^\s*LOCAL:2 = RESULT$/m, /^\s*PRINTL 请设定怪物的X坐标$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '426-427',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 33$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '430-444',
        any: [/^\s*LOCAL:3 = RESULT$/m, /^\s*PRINTL 请设定怪物的Y坐标$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '442-443',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 33$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '448-451',
        any: [
          /^\s*IF LOCAL:3 == 16 && LOCAL:4 == 16$/m,
          /^\s*PRINTW 无法在此放置$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '453',
        any: [/^\s*SETFONT "ＭＳ ゴシック"$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '455-468',
        any: [/^\s*FOR LOCAL:1,0,32$/m, /^\s*FOR LOCAL:0,0,32$/m],
      },
      { src: DUNGEON_SETUP, ref: '470', any: [/^\s*SETFONT$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '472-473',
        any: [
          /^\s*PRINTW 确定放置在★的所在？$/m,
          /^\s*PRINTL \[0\] 好的  \[1\] 不要$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '475-476',
        any: [/^\s*SIF RESULT != 0$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '478',
        any: [/^\s*DB:\(LOCAL:4\):\(LOCAL:3\) = LOCAL:2$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '480-483',
        any: [/^\s*PRINTW \*放置了怪物\*$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '486-516',
        any: [/^\s*@MON_SET_OMAKASE$/m, /^\s*LOCAL:0 = 0$/m],
      },
      { src: DUNGEON_SETUP, ref: '492', any: [/^\s*LOCAL:0 = 0$/m] },
      {
        src: DUNGEON_SETUP,
        ref: '496-497',
        any: [/^\s*SIF LOCAL:0 > 100$/m, /^\s*RETURN 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '500-502',
        any: [/^\s*CALL MON_LIMIT$/m, /^\s*SIF RESULT == 0$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '505-507',
        any: [/^\s*LOCAL:2 = RAND:10$/m, /^\s*LOCAL:3 = RAND:32$/m],
      },
      {
        src: DUNGEON_SETUP,
        ref: '509-511',
        any: [
          /^\s*IF LOCAL:3 == 16 && LOCAL:4 == 16$/m,
          /^\s*GOTO INPUT_LOOP_MONSET_OMAKASE$/m,
        ],
      },
      {
        src: DUNGEON_SETUP,
        ref: '512',
        any: [/^\s*DB:\(LOCAL:4\):\(LOCAL:3\) = LOCAL:2$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-save-load.js',
    refs: [
      // SYSTEM_DATA.ERB 四函数 + SYSTEM ver1.0.3.ERB 的 @SAVEINFO（#136
      // 存读档界面）。锚取各引用区间内的特征行。
      {
        src: SYSTEM_DATA,
        ref: '5-83',
        any: [/PRINTL 【读取存档】要载入以下哪个存档？/],
      },
      { src: SYSTEM_DATA, ref: '88-213', any: [/PRINT 【保存存档】/] },
      {
        src: SYSTEM_DATA,
        ref: '220-292',
        any: [/PRINTL 【删除存档】要删除以下哪个存档？/],
      },
      {
        src: SYSTEM_DATA,
        ref: '297-323',
        any: [/SIF L_I == LASTLOAD_NO \|\| L_I == LAS/],
      },
      { src: SYSTEM_DATA, ref: '12', any: [/L_POS = L_POS < 0 \? 0 # L_POS/] },
      { src: SYSTEM_DATA, ref: '14', any: [/L_LINECOUNT = LINECOUNT/] },
      { src: SYSTEM_DATA, ref: '18', any: [/CUSTOMDRAWLINE =/] },
      {
        src: SYSTEM_DATA,
        ref: '19',
        any: [/PRINTL 【读取存档】要载入以下哪个存档？/],
      },
      { src: SYSTEM_DATA, ref: '20', any: [/DRAWLINE/] },
      {
        src: SYSTEM_DATA,
        ref: '22',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      {
        src: SYSTEM_DATA,
        ref: '24-34',
        any: [/PRINTFORML  \[\{99,2\}\] %RESULTS%/],
      },
      { src: SYSTEM_DATA, ref: '36-39', any: [/PRINTFORMLC \[101\] 上一页/] },
      { src: SYSTEM_DATA, ref: '43', any: [/INPUT 99/] },
      { src: SYSTEM_DATA, ref: '48-49', any: [/RETURN L_POS/] },
      {
        src: SYSTEM_DATA,
        ref: '51-57',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: SYSTEM_DATA,
        ref: '59-65',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      { src: SYSTEM_DATA, ref: '67-77', any: [/SIF EX_FLAG:2801 < 10/] },
      { src: SYSTEM_DATA, ref: '73', any: [/LOADDATA L_IDX/] },
      { src: SYSTEM_DATA, ref: '74-75', any: [/SIF EX_FLAG:2801 < 10/] },
      // #137：RETURN L_POS（:76）只在「没读成」的世界里走到（LOADDATA 后
      // 迁移 @EVENTLOAD 不回调用方）+ @EVENTLOAD 的 MAOUNET 分支出处
      { src: SYSTEM_DATA, ref: '76', any: [/RETURN L_POS/] },
      { src: SYSTEM, ref: '769-771', any: [/CALL MAOUNET/] },
      { src: SYSTEM_DATA, ref: '80-82', any: [/GOTO INPUT_LOOP/] },
      { src: SYSTEM_DATA, ref: '101', any: [/CUSTOMDRAWLINE =/] },
      { src: SYSTEM_DATA, ref: '102-108', any: [/PRINT 【保存存档】/] },
      { src: SYSTEM_DATA, ref: '109', any: [/DRAWLINE/] },
      {
        src: SYSTEM_DATA,
        ref: '111',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      { src: SYSTEM_DATA, ref: '113', any: [/DRAWLINE/] },
      {
        src: SYSTEM_DATA,
        ref: '114-116',
        any: [/PRINTFORMLC \[200\] 为故事命名/],
      },
      {
        src: SYSTEM_DATA,
        ref: '114-119',
        any: [/PRINTFORMLC \[200\] 为故事命名/],
      },
      { src: SYSTEM_DATA, ref: '117-120', any: [/PRINTFORMLC \[101\] 上一页/] },
      { src: SYSTEM_DATA, ref: '124', any: [/INPUT/] },
      { src: SYSTEM_DATA, ref: '129-130', any: [/RETURN L_POS/] },
      {
        src: SYSTEM_DATA,
        ref: '132-138',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: SYSTEM_DATA,
        ref: '140-146',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      { src: SYSTEM_DATA, ref: '148-152', any: [/GOTO SET_NAME/] },
      { src: SYSTEM_DATA, ref: '149-152', any: [/GOTO SET_NAME/] },
      { src: SYSTEM_DATA, ref: '151', any: [/DRAWLINE/] },
      {
        src: SYSTEM_DATA,
        ref: '154-159',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: SYSTEM_DATA,
        ref: '161-174',
        any: [/PRINTL 存档已经存在，确定要覆盖么？/],
      },
      {
        src: SYSTEM_DATA,
        ref: '165-166',
        any: [/PRINTL 存档已经存在，确定要覆盖么？/],
      },
      {
        src: SYSTEM_DATA,
        ref: '166',
        any: [/PRINTL \[1\] 确定    \[0\] 取消/],
      },
      {
        src: SYSTEM_DATA,
        ref: '168-171',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      { src: SYSTEM_DATA, ref: '176-178', any: [/GOTO INPUT_LOOP/] },
      {
        src: SYSTEM_DATA,
        ref: '181-190',
        any: [/PRINTFORMW 已将游戏保存为\{L_IDX\}号存档……/],
      },
      {
        src: SYSTEM_DATA,
        ref: '182-184',
        any: [/LOCALS = %GETTIMES\(\)% %SAVEDATA_TEXT/],
      },
      { src: SYSTEM_DATA, ref: '185', any: [/SAVEDATA L_IDX, LOCALS/] },
      {
        src: SYSTEM_DATA,
        ref: '186',
        any: [/ARRAYSHIFT LASTSAVE_NO, 1, L_IDX/],
      },
      {
        src: SYSTEM_DATA,
        ref: '189',
        any: [/PRINTFORMW 已将游戏保存为\{L_IDX\}号存档……/],
      },
      {
        src: SYSTEM_DATA,
        ref: '192-213',
        any: [/PRINTFORM 请输入一个名称故事：/],
      },
      { src: SYSTEM_DATA, ref: '193', any: [/PRINTFORM 请输入一个名称故事：/] },
      {
        src: SYSTEM_DATA,
        ref: '194-197',
        any: [/PRINTBUTTON LOCALS, CSTR:MASTER:99/],
      },
      { src: SYSTEM_DATA, ref: '198', any: [/PRINTL/] },
      { src: SYSTEM_DATA, ref: '200', any: [/INPUTS/] },
      {
        src: SYSTEM_DATA,
        ref: '201-203',
        any: [/PRINTFORMW 将故事命名为『%RESULTS%』/],
      },
      {
        src: SYSTEM_DATA,
        ref: '204-206',
        any: [/PRINTFORMW 将故事命名为『%RESULTS%』/],
      },
      {
        src: SYSTEM_DATA,
        ref: '207-209',
        any: [/PRINTFORMW 消去了故事的名字/],
      },
      {
        src: SYSTEM_DATA,
        ref: '212',
        any: [/; CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      { src: SYSTEM_DATA, ref: '213', any: [/GOTO DRAW_PAGE/] },
      { src: SYSTEM_DATA, ref: '227', any: [/L_POS = L_POS < 0 \? 0 # L_POS/] },
      { src: SYSTEM_DATA, ref: '233', any: [/CUSTOMDRAWLINE =/] },
      {
        src: SYSTEM_DATA,
        ref: '234',
        any: [/PRINTL 【删除存档】要删除以下哪个存档？/],
      },
      { src: SYSTEM_DATA, ref: '235', any: [/DRAWLINE/] },
      {
        src: SYSTEM_DATA,
        ref: '237',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      { src: SYSTEM_DATA, ref: '239', any: [/DRAWLINE/] },
      { src: SYSTEM_DATA, ref: '240', any: [/PRINTL/] },
      { src: SYSTEM_DATA, ref: '242-245', any: [/PRINTFORMLC \[101\] 上一页/] },
      { src: SYSTEM_DATA, ref: '249', any: [/INPUT 99/] },
      { src: SYSTEM_DATA, ref: '253-255', any: [/RETURN L_POS/] },
      {
        src: SYSTEM_DATA,
        ref: '257-263',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: SYSTEM_DATA,
        ref: '265-271',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: SYSTEM_DATA,
        ref: '273-287',
        any: [/PRINTL 确定要删除这个存档么？/],
      },
      { src: SYSTEM_DATA, ref: '277', any: [/PRINTL 确定要删除这个存档么？/] },
      {
        src: SYSTEM_DATA,
        ref: '280-285',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      { src: SYSTEM_DATA, ref: '284', any: [/DELDATA L_IDX/] },
      { src: SYSTEM_DATA, ref: '290-292', any: [/GOTO INPUT_LOOP/] },
      { src: SYSTEM_DATA, ref: '302-304', any: [/IF L_I >= 99/] },
      { src: SYSTEM_DATA, ref: '307-308', any: [/SETCOLORBYNAME DEEPSKYBLUE/] },
      { src: SYSTEM_DATA, ref: '307-310', any: [/SETCOLORBYNAME DEEPSKYBLUE/] },
      { src: SYSTEM_DATA, ref: '309-310', any: [/SETCOLORBYNAME LIGHTGREEN/] },
      {
        src: SYSTEM_DATA,
        ref: '313-314',
        any: [/PRINTFORML  \[\{L_I,2\}\] %RESULTS%/],
      },
      { src: SYSTEM_DATA, ref: '316', any: [/SETCOLORBYNAME GRAY/] },
      {
        src: SYSTEM_DATA,
        ref: '316-318',
        any: [/PRINTFORML  \[\{L_I,2\}\] ----/],
      },
      { src: SYSTEM_DATA, ref: '317', any: [/PRINTFORML  \[\{L_I,2\}\] ----/] },
      {
        src: SYSTEM,
        ref: '760-778',
        any: [/SIF LASTLOAD_NO >= 1000 && LASTLOAD_/],
      },
      { src: SYSTEM, ref: '954-977', any: [/LOCALS = 第\{DAY\+1,2\}日午前/] },
      { src: SYSTEM, ref: '955-958', any: [/LOCALS = 第\{DAY\+1,2\}日午前/] },
      { src: SYSTEM, ref: '959-963', any: [/LOCALS = 第\{DAY\+1,2\}日午后/] },
      { src: SYSTEM, ref: '960-963', any: [/LOCALS = 第\{DAY\+1,2\}日午后/] },
      { src: SYSTEM, ref: '966', any: [/SIF FLAG:2 >= 0/] },
      {
        src: SYSTEM,
        ref: '968-972',
        any: [/PUTFORM  正在调教:%SAVESTR:TARGET,14,LEF/],
      },
      { src: SYSTEM, ref: '974-975', any: [/PUTFORM %"",24%/] },
    ],
  },
  {
    js: 'ere/kojo/kojo-system.js',
    refs: [
      {
        src: EVENT_K,
        ref: '12-15',
        any: [/^@EVENTSHOP/m, /^SIF FLAG:7 == 0$/m],
      },
      // #213：接触面契约（七道头部守卫）的出处锚
      {
        src: K3,
        ref: '888-912',
        any: [/@KOJO_MESSAGE_COM_3/, /SIF TFLAG:899/],
      },
      {
        src: EVENT_K,
        ref: '86-144',
        any: [/^@GET_KOJO_NUM/m, /^RETURNF LOCAL$/m],
      },
      {
        src: EVENT_K,
        ref: '89-91',
        any: [/^LOCAL = 0$/m, /^\tARG = TARGET$/m],
      },
      { src: EVENT_K, ref: '135', any: [/GET_EX_KOJO_NUM\(ARG\)/] },
      {
        src: EVENT_K,
        ref: '137-140',
        any: [/^FOR COUNT,160,180$/m, /^\t\tLOCAL = COUNT - 60$/m],
      },
      { src: EVENT_K, ref: '139', any: [/^\t\tLOCAL = COUNT - 60$/m] },
      {
        src: EVENT_K,
        ref: '150-162',
        any: [/^@KOJO_MESSAGE_COM$/m, /TRYCALLFORM KOJO_MESSAGE_COM_/],
      },
      { src: EVENT_K, ref: '151-152', any: [/^SIF FLAG:7 <= 0$/m] },
      {
        src: EVENT_K,
        ref: '155-157',
        any: [
          /^\tLOCAL = GET_KOJO_NUM\(\)$/m,
          /^SIF FLAG:LOCAL == 0 && EX_FLAG:\(LOCAL - 900\) == 0$/m,
        ],
      },
      { src: EVENT_K, ref: '156', any: [/EX_FLAG:\(LOCAL - 900\) == 0/] },
      {
        src: EVENT_K,
        ref: '160-161',
        any: [/^\tTRYCALLFORM KOJO_MESSAGE_COM_\{LOCAL - 100\}$/m],
      },
      // EX 口上待办的两处源引用（文件头说明）
      {
        src: EXCOM,
        ref: '31-38',
        any: [/^@GET_EX_KOJO_NUM\(ARG\)$/m, /^FOR COUNT,101,801$/m],
      },
      // SELF_KOJO
      {
        src: EVENT_K,
        ref: '225-241',
        any: [/@SELF_KOJO/, /TRYCALLFORM SELF_KOJO_K/],
      },
    ],
  },
  {
    js: 'ere/kojo/kojo-text.js',
    refs: [
      {
        src: SELF_CALL_ERB,
        ref: '400-408',
        any: [/^@SELF_CALL, ARG:0, ARG:1$/m, /RETURNF LOCALS/],
      },
      {
        src: SELF_CALL_ERB,
        ref: '412-419',
        any: [/^@SELF_CALL_FIRST, ARG = -1$/m],
      },
      {
        src: SELF_CALL_ERB,
        ref: '406',
        any: [/STRLENS\(CSTR:ARG:60\) \? %CSTR:ARG:60% # 我/],
      },
      { src: SELF_CALL_ERB, ref: '402', any: [/;ARG:1\s*废弃/] },
    ],
  },
  {
    js: 'ere/kojo/kojo-dungeon-ravish-man.js',
    refs: [
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1-399', any: [/@ORC_RYOU男\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '401-470',
        any: [/@SLIME_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '471-494',
        any: [/@INSECT_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '495-519',
        any: [/@IVY_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '520-557',
        any: [/@SYOKUSYU_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '558-586',
        any: [/@FAILY_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '587-709',
        any: [/@GIANT_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '710-902',
        any: [/@MAN_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '903-959',
        any: [/@BEAST_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '960-1014',
        any: [/@BRAIN_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1015-1069',
        any: [/@HORSE_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '77-156',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '862', any: [/Y \+= 10/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '868', any: [/Y \+= 10/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '22', any: [/PRINTFORM 无头骑士的/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '26',
        any: [/IF TALENT:ARG:种族 == 4/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '166',
        any: [/ELSEIF TALENT:ARG:魅力点 == 2/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1', any: [/@ORC_RYOU男\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '5-11', any: [/IF RAND:5 == 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '7-10', any: [/PRINTDATAW/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '13-19', any: [/IF TALENT:ARG:52/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '15',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的娼妓嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '16',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '17',
        any: [
          /PRINTFORMW 兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '18', any: [/MON_NUM \*= 2/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '24',
        any: [/PRINTFORM %SAVESTR:ARG%/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '27',
        any: [/PRINTFORM 身体被固定住了，只剩下脑袋来像飞机杯似的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '29', any: [/PRINTFORM 全裸地/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '31',
        any: [/PRINTFORMW 侍奉着兽人们的阴茎。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '32',
        any: [
          /PRINTFORMW 只要喝掉所有\{MON_NUM\}只兽人的精液的话，它们就答应不侵犯他的下体………/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '34-50',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '38', any: [/PRINTFORM 毫无犹豫、/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '41',
        any: [/PRINTFORM 小心翼翼地、/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '44',
        any: [/PRINTFORM 一边土下座扭着腰部的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '47',
        any: [/PRINTFORM 期待与羞耻将脸染红的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '49', any: [/PRINTFORM 面露期待的/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '51-67',
        any: [/ELSEIF CFLAG:ARG:131 > 2/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '55',
        any: [/PRINTFORM 老实遵从于兽人的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '58',
        any: [/PRINTFORM 煞有其事地、/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '61',
        any: [/PRINTFORM 不住向阴茎献媚的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '64',
        any: [/PRINTFORM 面对阴茎羞红了脸的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '66',
        any: [/PRINTFORM 已然无法反抗的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '68-88', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '69-73', any: [/IF TALENT:ARG:11/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '71',
        any: [/PRINTFORM 带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '72',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '73',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '74-78',
        any: [/ELSEIF TALENT:ARG:13/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '76',
        any: [
          /PRINTFORM 迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '77',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '78',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '81', any: [/PRINTFORM 提心吊胆地/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '84', any: [/PRINTFORM 嘿嘿媚笑着/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '87',
        any: [/PRINTFORM 不敢直视肉棒而闭上了眼睛/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '91',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '93-99', any: [/PRINTDATA/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '94-98', any: [/DATAFORM 阴茎/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '101', any: [/PRINT 含了下去，/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '103-109', any: [/IF TALENT:ARG:52/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '105',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的娼妓嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '106',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '107',
        any: [
          /PRINTFORMW 兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '109', any: [/MON_NUM \*= 2/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '112',
        any: [/PRINTFORM 像工作一样地奉仕着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '115',
        any: [/PRINTFORM 不禁发出了粗俗的声音，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '118',
        any: [/PRINTFORM 很快地抓住了奉仕的诀窍，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '121',
        any: [/PRINTFORM 忍受着腥臭味，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '124',
        any: [/PRINTFORM 拼命地用舌头奉仕着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '127',
        any: [/PRINTL 奉仕持续了下去……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '129',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '130',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '131',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '132',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '134-136',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '135', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '138-256',
        any: [/ELSEIF RAND:4 == 0/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '142-146', any: [/PRINTDATAW/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '143-145',
        any: [/DATAFORM 『兄弟们，把所有的穴都塞满哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '148',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被\{MON_NUM\}只兽人用积存已久的精液，将嘴巴、肛门……所有能用的穴/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '149',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '150',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的脸和性器都用精液化上了妆。兽人们看着他这样子，开怀大笑。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '152', any: [/PRINT 兽人的/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '154-160', any: [/PRINTDATA/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '155-159', any: [/DATAFORM 阴茎/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '162',
        any: [
          /PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出来的精液在%SAVESTR:ARG%的/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '165', any: [/PRINT 眼镜上飞撒着……/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '167',
        any: [/PRINT 可爱的眼睛上飞撒着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '169',
        any: [/PRINT 漂亮的鼻子里喷了出来……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '171',
        any: [/PRINT 光鲜亮丽的头发上飞撒着……/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '173', any: [/PRINT 脸上飞撒着……/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '175', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '176-181', any: [/IF TALENT:ARG:12/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '178',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '179',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '180',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '181',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '183-189',
        any: [/ELSEIF TALENT:ARG:70 \|\| TALENT:ARG:73/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '185',
        any: [/PRINTFORMW 在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '186',
        any: [/PRINTFORMW 『喔！这家伙有感觉了哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '187',
        any: [/PRINTFORMW %SAVESTR:ARG%被快感冲击着，忍不住主动扭着腰。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '188',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '189',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '192',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '197', any: [/PRINTW/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '198',
        any: [/PRINTFORM 兽人们把润滑液涂在了%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '201', any: [/PRINT 漂亮的/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '203',
        any: [/PRINT 漂亮的屁股的缝隙中的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '205',
        any: [/PRINT 大的屁股的缝隙中的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '207', any: [/PRINT 无毛额/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '209',
        any: [/PRINT 肌肉明显的两腿间的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '211',
        any: [/PRINT 从阴阜到肛门都被茂密的阴毛所覆盖的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '213',
        any: [/PRINT 长着茂盛的阴毛的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '216', any: [/PRINTL 性器和肛门上/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '217',
        any: [/PRINTFORM 在%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '221', any: [/PRINT 魁梧的身体上/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '224', any: [/PRINT 娇小的身体上/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '227',
        any: [/PRINT 松松垮垮的身体上/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '230', any: [/PRINT 紧致的身体上/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '233', any: [/PRINT 窈窕的身体上/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '235', any: [/PRINT 纤细的身体上/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '237', any: [/PRINT 肉感的身体上/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '239', any: [/PRINT 身体上/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '242',
        any: [/PRINTL 像要挤爆他似的激烈地持续侵犯着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '244',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '246',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '247',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '248',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '249',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '250',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '251',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '252',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '253',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '255-256',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '256', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '258-340',
        any: [/ELSEIF RAND:3 == 0/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '262-266', any: [/PRINTDATAW/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '263-265',
        any: [
          /DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '268',
        any: [/PRINTFORM %SAVESTR:ARG%全裸地四肢着地趴在地下、/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '272', any: [/PRINT 浑身颤抖着、/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '275', any: [/PRINT 怒目圆睁着、/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '278', any: [/PRINT 拼命服从着、/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '281', any: [/PRINT 拼命献媚着、/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '284', any: [/PRINT 羞红了脸、/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '287',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '289',
        any: [
          /PRINTFORMW \{MON_NUM\}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '291-297', any: [/IF ABL:ARG:17/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '293',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上述行为。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '294',
        any: [/PRINTFORMW 好像因为被视奸，而有了感觉。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '295',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '296',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '299-306', any: [/IF ABL:ARG:21/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '301',
        any: [/PRINTFORMW %SAVESTR:ARG%好像因为被骂而有了感觉。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '302',
        any: [/PRINTFORMW 『明明就是母猪，还说自己是冒险者！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '303',
        any: [/PRINTFORMW %SAVESTR:ARG%连眼神都湿润了～/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '304',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '305',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '308', any: [/PRINTFORM 『猪/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '309-312', any: [/IF TALENT:ARG:17/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '312', any: [/CALL GOBI_KOUJO, 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '313-316', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '315', any: [/CALL GOBI_KOUJO, 5/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '317',
        any: [/PRINTFORM 还自称冒险者……简直傻了/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '319-326', any: [/IF TALENT:ARG:17/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '322', any: [/CALL GOBI_KOUJO, 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '325', any: [/CALL GOBI_KOUJO, 5/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '328',
        any: [/PRINTFORMW 　噗噗，噗嘻！』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '330-335', any: [/IF TALENT:ARG:17/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '332',
        any: [/PRINTFORMW %SAVESTR:ARG%抛弃了自尊心，拼命地求饶着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '333',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '334',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '337',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '338',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '339',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '340',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '341-369',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '342',
        any: [/PRINTW 『来试试，看能放多粗的东西进去？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '343',
        any: [/PRINTFORMW %SAVESTR:ARG%感受到了自己身上的危机，拼命地哀求着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '344',
        any: [
          /PRINTFORMW 不过，他的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '345',
        any: [
          /PRINTFORMW 其中一只兽人，拿起他的心爱的武器用柄的那端捅入他的後穴。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '346',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的喊叫声，回响在\{MON_NUM\}只兽人的耳边。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '348-354', any: [/IF TALENT:ARG:40/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '350',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '351',
        any: [/PRINTFORMW %SAVESTR:ARG%受不了痛楚，高声哭喊着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '352',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '353',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '356-362', any: [/IF ABL:ARG:21/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '358',
        any: [/PRINTFORMW %SAVESTR:ARG%在痛楚中感到了愉悦。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '359',
        any: [
          /PRINTFORMW 难道自己是个潜在的性变态？这么想着，%SAVESTR:ARG%对自身的反应感到害怕。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '360',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '361',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '364',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '365',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '366',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '367',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '368',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '369',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '370-396', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '371',
        any: [/PRINTW 『抬起屁股！然后说：请用！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '372',
        any: [
          /PRINTFORMW %SAVESTR:ARG%用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '373',
        any: [
          /PRINTFORMW 他完全被淹没在\{MON_NUM\}只兽人之中，兽人们大笑着，轮流侵犯他的嘴巴和肛门。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '374',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '376-382',
        any: [/IF TALENT:ARG:70 \|\| TALENT:ARG:73/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '378',
        any: [
          /PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的前端里渐渐滴出了体液。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '379',
        any: [/PRINTFORMW 『别这么快就去了啊！老子都不知道操哭多少人了。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '380',
        any: [/PRINTFORMW %SAVESTR:ARG%呼出了炽热的气息，双腿直抖着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '381',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '382',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '384-387',
        any: [/ELSEIF TALENT:ARG:11/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '386',
        any: [/PRINTFORMW 『喂！把腰抬起来！还没完呢！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '387',
        any: [/PRINTFORMW %SAVESTR:ARG%用冰冷的目光瞪了兽人们一眼。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '390',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '391',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '392',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '393',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '394',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '395',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '397', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '398', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '401', any: [/@SLIME_RYOU男\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '406-414', any: [/IF RAND:6 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '407',
        any: [/PRINTFORMW 黏液侵犯着%SAVESTR:ARG%的嘴巴和肛门，并灌入了黏液。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '408',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '409',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '410',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '411',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '412',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '413',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '416-422',
        any: [/ELSEIF RAND:5 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '417',
        any: [/PRINTW 黏液杀到了冒险者的嘴巴里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '418',
        any: [
          /PRINTFORMW %SAVESTR:ARG%感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了他/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '419',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '420',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '421',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '422',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '423-443',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '424',
        any: [/PRINTW 黏液杀到了冒险者的肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '425',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '428',
        any: [
          /PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐快感之中……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '431',
        any: [/PRINTFORMW %SAVESTR:ARG%已然被粘液攻陷了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '434',
        any: [/PRINTFORMW %SAVESTR:ARG%开始习惯被粘液涌入的感觉……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '436',
        any: [/PRINTW 冒险者在肛虐的痛苦中癫狂地惨叫着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '438',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '439',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '440',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '441',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '442',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '443',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '444-450',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '445',
        any: [/PRINTW 被全裸地四脚着地压在地上，黏液逆流到肛门里了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '446',
        any: [
          /PRINTFORMW %SAVESTR:ARG%腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '447',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '448',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '449',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '450',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '451-460',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '452',
        any: [
          /PRINTW 黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '453',
        any: [/PRINTFORMW %SAVESTR:ARG%坚强地试图站起来。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '454',
        any: [
          /PRINTFORMW 但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '455',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '456',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '457',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '458',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '459',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '460',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '461-466', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '462',
        any: [/PRINTW 冒险者被包在黏液里，只露出头部发出呜呜的呻吟。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '463',
        any: [/PRINTFORMW 看来没人相救的话，%SAVESTR:ARG%要被消化在黏液里了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '465',
        any: [
          /PRINTFORMW 黏液的麻痹成分，渐渐把%SAVESTR:ARG%遭受凌辱的苦痛身体治愈了。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '466', any: [/BASE:ARG:0 \+= 100/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '468', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '469', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '471',
        any: [/@INSECT_RYOU男\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '476-482', any: [/IF RAND:2 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '477',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '478',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被输卵管插入了，被播下了卵。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '479',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '480',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '481',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '482',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '484-490', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '485',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '486',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被输卵管插入了，被播下了卵。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '487',
        any: [/PRINTW 不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '488',
        any: [
          /PRINTFORMW \{MON_NUM\}只节肢动物轮流扑在%SAVESTR:ARG%身上，从臀部到背部全被卵覆盖了。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '489',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '490',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '492', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '493', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '495', any: [/@IVY_RYOU男\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '499-505', any: [/IF RAND:2 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '500',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '501',
        any: [
          /PRINTFORMW %SAVESTR:ARG%呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '502',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '503',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '504',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '505',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '506-515', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '507',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '508',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被蹂躏着，发出了喊破喉咙的惨叫声。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '509',
        any: [/PRINTW 藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '510',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '511',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '512',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '513',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '514',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '515',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '517', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '518', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '520',
        any: [/@SYOKUSYU_RYOU男\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '525-529', any: [/IF RAND:4 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '526',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '527',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的喉咙被大量的体液灌入，呛到了。不久，他的意识开始模糊了。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '528',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '529',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '530-537',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '531',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '532',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，他的意识开始模糊了。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '533',
        any: [/PRINTW 不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '534',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '535',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '536',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '537',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '538-545',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '539',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '540',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的嘴巴也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '541',
        any: [
          /PRINTFORMW ……不久，地上滴落的液体里，开始出现了触手体液之外的东西。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '542',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '543',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '544',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '545',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '546-553', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '547',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '548',
        any: [
          /PRINTFORMW %SAVESTR:ARG%带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '549',
        any: [/PRINTFORMW 不久之后他感到乳房发胀，触手顺势开始了榨乳。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '550',
        any: [
          /PRINTFORMW 不久之后，%SAVESTR:ARG%母乳开始无法抑制地从乳头喷出。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '551',
        any: [/PRINTFORML 喷奶经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '552', any: [/EXP:ARG:54 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '554',
        any: [/PRINTFORMW 触手经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '555',
        any: [/EXP:ARG:55 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '556', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '558', any: [/@FAILY_RYOU男\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '563-573', any: [/IF RAND:2 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '564',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '565',
        any: [/PRINTFORMW 妖精拿出了一根和自己身高相等的假阳具。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '566',
        any: [/PRINTFORMW 『小哥哥来享受这边的穴吧！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '567',
        any: [/PRINTFORMW %SAVESTR:ARG%的惨叫回响在洞窟里……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '568',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '569',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '570',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '571',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '572',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '573',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '574-582', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '575',
        any: [/PRINTW 『小哥哥的里面，是什么模样呢？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '576',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的後处被妖精钻入了。妖精对他的反应感到相当有趣，不断地玩弄着後处内的皱褶/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '577',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '578',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '579',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '580',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '581',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '582',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '584', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '585', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '587', any: [/@GIANT_RYOU男\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '591-619',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '592-599', any: [/;隷属状態/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '594-598',
        any: [/DATAFORM 『瓦全的　变成了　灰机杯了呀』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '600-610',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '604-609',
        any: [/DATAFORM 『哈哈　熟络起来了欸』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '611-618', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '613-617',
        any: [/DATAFORM 『看起来值得凌辱一番。』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '623-636', any: [/IF MON_NUM == 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '624', any: [/PRINTL 『喝下去哦』/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '625',
        any: [
          /PRINTFORML %SAVESTR:ARG%侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '626',
        any: [/PRINTL 绝顶了的巨人，把精液从头到脚浇了他一身。/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '627', any: [/PRINTL 口交经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '628', any: [/PRINTL 精液经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '629', any: [/EXP:ARG:22 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '630', any: [/EXP:ARG:20 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '632-633',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '633', any: [/CFLAG:16 = 995/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '634', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '635', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '639-657', any: [/IF RAND:3 == 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '640', any: [/PRINTW 『快点啊！』/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '641',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地舔舐着巨人的阴茎。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '642',
        any: [/PRINTW 他拼命地哀求着，请饶了他，不然一定会被玩坏。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '643',
        any: [
          /PRINTFORMW 必须快点搞定这\{MON_NUM\}只巨人，不然不知道他们什么时候会改变主意。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '645-651', any: [/IF TALENT:ARG:52/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '647',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '648',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '649',
        any: [
          /PRINTFORMW 巨人被他灵活的舌头弄射了，精液像喷泉一样，从%SAVESTR:ARG%的头顶淋到脚底。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '650', any: [/MON_NUM \*= 2/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '653',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '654',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '655',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '656',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '658-659',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '659', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '660-683',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '661',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '662',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让他声嘶力竭地惨叫着，晕了过去。肛/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '663',
        any: [/PRINTFORMW 『又一个坏掉了吗？用点回复药或许可以再来几下。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '664',
        any: [
          /PRINTFORMW 插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有\{MON_NUM\}只巨人为止……/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '666-674', any: [/IF TALENT:ARG:34/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '668',
        any: [
          /PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地抓了回来。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '669',
        any: [/PRINTFORMW 『喂！这里有个想逃跑的！抓住他！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '670',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '671',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '672',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '676',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '677',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '678',
        any: [/PRINTFORML 肛门扩张经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '679',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '680',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '681',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '682', any: [/EXP:ARG:50 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '683',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '684-705', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '685',
        any: [/PRINTW 『我想到好主意了』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '686',
        any: [
          /PRINTFORMW 巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '687',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '688',
        any: [/PRINTFORMW 巨人端着一大盆精液，对他说，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '689',
        any: [/PRINTFORMW 『不想死的话，就全部喝光。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '690',
        any: [/PRINTFORMW %SAVESTR:ARG%脸上血色褪尽。/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '692-702', any: [/IF TALENT:ARG:11/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '694',
        any: [/PRINTFORMW %SAVESTR:ARG%用冷淡的眼神瞪着巨人，表示不从。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '695',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '696',
        any: [
          /PRINTFORMW 巨人用巨大的手掌按着%SAVESTR:ARG%的头，直接把头按入水盆里。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '697',
        any: [/PRINTFORMW 「咕噜，咕噜，咕咕噜」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '698',
        any: [
          /PRINTFORMW 巨人把他的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '699',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '700',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '704',
        any: [/PRINTFORML 精液经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '705',
        any: [/EXP:ARG:20 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '707', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '708', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '710', any: [/@MAN_RYOU男\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '714-742',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '715-722', any: [/;隷属状態/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '717-721',
        any: [/DATAFORM 『已经、离不开我们了吗』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '723-733',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '727-732',
        any: [/DATAFORM 『哦、又来啦』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '734-741', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '736-740',
        any: [/DATAFORM 『真是好家伙啊！』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '747-761', any: [/IF RAND:5 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '749',
        any: [/PRINTFORMW 『屁股露出来，抬高点！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '750',
        any: [
          /PRINTFORMW %SAVESTR:ARG%露出了屈辱的神色，向魔族男人翘起了屁股。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '751',
        any: [
          /PRINTFORMW %SAVESTR:ARG%全裸地侍奉着兽人们的阴茎。只要喝掉所有\{MON_NUM\}个男人的精液的话/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '752',
        any: [/PRINTFORMW 『嘴巴张开点！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '753',
        any: [/PRINTFORMW %SAVESTR:ARG%依照吩咐，用嘴巴侍奉着阴茎……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '754',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '755',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '756',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '757',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '759-760',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '760', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '762-828',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '764',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满了淫秽的话语。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '767',
        any: [/PRINTFORM %SAVESTR:ARG%的身上，被写着/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '768', any: [/PRINT 【最喜欢阴茎】/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '771', any: [/PRINT 【性冷淡便器】/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '776',
        any: [/PRINT 【看似忠贞的便器出道】/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '781', any: [/PRINT 【又粘又湿】/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '786', any: [/PRINT 【愉悦的脸】/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '791',
        any: [/PRINT 【有鸡鸡的奴隶】/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '795', any: [/PRINT 【操我】/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '797', any: [/PRINT 【肛门免费】/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '799', any: [/PRINT 【母猪】/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '802', any: [/PRINTFORM 之类的话。/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '804',
        any: [
          /PRINTFORMW 络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '805',
        any: [
          /PRINTFORMW 当被最后一人抱着的时候，%SAVESTR:ARG%已经失去了任何表情，成为全身的穴都流出着精液的下/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '806',
        any: [
          /PRINTFORMW 地下城里，充斥着\{MON_NUM\}人份的精液和体液的异样臭味。魔族男人对原冒险者重生成为肉便器相当/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '809-818',
        any: [/IF TALENT:ARG:244/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '811',
        any: [/PRINTFORMW %SAVESTR:ARG%的蓝色肌肤，被沾满了精液……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '814',
        any: [
          /PRINTFORMW %SAVESTR:ARG%健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '817',
        any: [/PRINTFORMW %SAVESTR:ARG%美丽的白皙肌肤被精液玷污了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '820',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '821',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '822',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '823',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '824',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '825',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '827-828',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '828', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '829-851',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '830',
        any: [/PRINTW 『明明是冒险者，却忍不住了吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '831',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被灌入了灌肠液，忍受着强烈的便意。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '832',
        any: [
          /PRINTFORMW 『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '833',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '834',
        any: [/PRINTFORMW 肛门里的污物，终于无法忍耐地飞散而出。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '835',
        any: [
          /PRINTFORMW 魔族男人们看到这样，毫不留情地说着侮蔑的话，%SAVESTR:ARG%在这份屈辱中泣不成声。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '837-842', any: [/IF TALENT:ARG:62/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '839',
        any: [
          /PRINTFORMW %SAVESTR:ARG%因自己拉出的东西的味道而皱起眉头，羞愧欲死。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '840',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '841',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '844',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '845',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '846', any: [/PRINTL 自慰经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '847',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '848',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '849',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '850', any: [/EXP:ARG:10 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '851', any: [/EXP:ARG:11 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '852-874',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '853',
        any: [/PRINTW 『那个冒险者大人，在舔我的肛门哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '854',
        any: [
          /PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对于生命安全的保证。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '855',
        any: [/PRINTFORMW 『你的尊严，真不值钱呢！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '856',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '857',
        any: [
          /PRINTFORMW 侍奉结束之后，%SAVESTR:ARG%还被迫要说出淫秽的话语。他忍无可忍地大哭着，宣布自己喜欢舔/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '859-863', any: [/IF TALENT:ARG:17/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '861',
        any: [
          /PRINTFORMW 自尊心低下的%SAVESTR:ARG%，拼命地说着自己是舔肛用奴隶。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '865-869', any: [/IF TALENT:ARG:62/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '867',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '871',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '872',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '873',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '874',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '875-899', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '876',
        any: [/PRINTW 『这个为了保命就来者不拒的娼妓！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '877',
        any: [
          /PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '878',
        any: [
          /PRINTFORMW 『说！说我是个相对于做冒险者，更喜欢做娼妓的淫乱贱婊！』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '879',
        any: [
          /PRINTFORMW %SAVESTR:ARG%在激烈的抽插中，不断地重复着屈辱的台词。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '881-886', any: [/IF TALENT:ARG:17/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '883',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '884',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '885',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '888-893',
        any: [/IF ABL:ARG:21 > 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '890',
        any: [/PRINTFORMW 说着过激的言语，%SAVESTR:ARG%的心里产生了情欲。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '891',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '892',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '895',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '896',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '897',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '898',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '900', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '901', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '903', any: [/@BEAST_RYOU男\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '907-935',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '908-915', any: [/;隷属状態/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '910-914',
        any: [/DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '916-926',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '920-925',
        any: [/DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '927-934', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '929-933',
        any: [/DATAFORM 『咕噜咕噜噜』/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '939', any: [/PRINTFORMW 『噢！』/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '940',
        any: [/PRINTFORMW 野兽们，开始轮番兽奸%SAVESTR:ARG%。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '941',
        any: [/PRINTFORMW 「啊！呜！不要啊……啊啊啊！」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '942',
        any: [
          /PRINTFORMW %SAVESTR:ARG%无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '944-949',
        any: [/IF TALENT:ARG:314 == 2/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '946',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '947',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '948',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '950',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '951',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '952',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '953',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '954',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '955',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '956',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '957',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '958', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '960', any: [/@BRAIN_RYOU男\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '964-991',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '965-972', any: [/;隷属状態/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '967-971',
        any: [
          /DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '973-982',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '977-981',
        any: [/DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '983-990', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '985-989',
        any: [/DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '995-1003', any: [/IF RAND:2 == 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '997',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配他的精神。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '998',
        any: [/PRINTFORMW 「啊…啊…啊…啊…啊……」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '999',
        any: [/PRINTFORMW %SAVESTR:ARG%眼珠上翻，伸出舌头，脱粪了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1000',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1001',
        any: [/PRINTFORML 异常经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1002', any: [/EXP:ARG:50 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1003',
        any: [/EXP:ARG:1 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1004-1010', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1005',
        any: [/PRINTW 食脑魔的触手缠绕着冒险者，他死命地挣扎，却无法挣脱。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1006',
        any: [
          /PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里，往脑髓注入媚药成分。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1007',
        any: [/PRINTFORMW %SAVESTR:ARG%被过度的快感弄失禁了，成了废人。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1008',
        any: [/PRINTFORMW 幸好，躯干还是完好的。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1009',
        any: [/PRINTFORML 异常经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1010', any: [/EXP:ARG:50 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1012', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1013', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1015',
        any: [/@HORSE_RYOU男\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1019-1046',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1020-1027', any: [/;隷属状態/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1022-1026',
        any: [
          /DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1028-1037',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1032-1036',
        any: [/DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1038-1045', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1040-1044',
        any: [/DATAFORM 『唔哦哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1050',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1051',
        any: [
          /PRINTFORMW 『你很有素质嘛～看在这个份上，就用魔法让你好受些。』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1052',
        any: [/PRINTFORMW %SAVESTR:ARG%不得不用肛门承受着兽奸……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1054-1059',
        any: [/IF TALENT:ARG:314 == 2/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1056',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1057',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1058',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1061',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1062',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1063',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1064',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1065',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_MAN,
        ref: '1066',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1067', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_MAN, ref: '1068', any: [/RETURN 0/] },
    ],
  },

  {
    js: 'ere/kojo/kojo-k0-tender.js',
    refs: [
      { src: K0, ref: '73-77', any: [/^@EVENTTRAIN$/m, /^FLAG:100 = 1$/m] },
      { src: K0, ref: '79-81', any: [/^@EVENTEND$/m, /^FLAG:100 = 0$/m] },
      { src: K0, ref: '674', any: [/^@KOJO_MESSAGE_COM_0$/m] },
      { src: K0, ref: '674-2585', any: [/^@KOJO_MESSAGE_COM_0$/m] },
      { src: K0, ref: '75', any: [/^FLAG:100 = 1$/m] },
      { src: K0, ref: '77', any: [/^\tFLAG:7 = 2$/m] },
      { src: K0, ref: '81', any: [/^FLAG:100 = 0$/m] },
      {
        src: K0,
        ref: '676-699',
        any: [/死斗场中は専用口上/, /SIF TEQUIP:90/],
      },
      {
        src: K0,
        ref: '676-678',
        any: [/死斗场中は専用口上/, /^\tCALL COLOSSEUM_KOJO_0$/m],
      },
      { src: K0, ref: '681-682', any: [/SIF ASSI > 0 && ASSIPLAY/] },
      { src: K0, ref: '684-685', any: [/SIF TEQUIP:45 && SELECTCOM != 45/] },
      { src: K0, ref: '687-688', any: [/SIF TFLAG:899/] },
      { src: K0, ref: '690-691', any: [/SIF TALENT:TARGET:9 == 1/] },
      {
        src: K0,
        ref: '693-695',
        any: [/兽奸PLAY中は口上を専用領域へ/, /^\tCALL DOG_KOJO_0$/m],
      },
      { src: K0, ref: '698-699', any: [/SIF TEQUIP:90/] },

      { src: K0, ref: '708', any: [/^IF SELECTCOM == 0$/m] },
      { src: K0, ref: '708-752', any: [/^IF SELECTCOM == 0$/m] },
      { src: K0, ref: '710-721', any: [/^\tIF CFLAG:301 == 0$/m] },
      { src: K0, ref: '712-719', any: [/^\t\tIF MARK:2 >= 2$/m] },
      {
        src: K0,
        ref: '713',
        any: [/PRINTFORMW 「啊啊…我会、老实的…所以…啊～啊啊～！」/],
      },
      {
        src: K0,
        ref: '714',
        any: [/PRINTFORMW %SAVESTR:TARGET%乖乖的被你爱抚着身体/],
      },
      { src: K0, ref: '717', any: [/PRINTFORMW 「你的爱是虚假的」/] },
      {
        src: K0,
        ref: '718',
        any: [/PRINTFORMW %SAVESTR:TARGET%紧锁眉头、蜷缩着身体/],
      },
      { src: K0, ref: '720', any: [/^\t\tCFLAG:301 = 1$/m] },
      {
        src: K0,
        ref: '723-750',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '725-728',

        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '726',
        any: [/PRINTFORMW 「啊～…额呵呵…那个地方…再多摸摸…/],
      },
      {
        src: K0,
        ref: '727',
        any: [/PRINTFORMW 只是稍微摸了摸%SAVESTR:TARGET%她就把持不住了/],
      },
      { src: K0, ref: '728', any: [/^\t\t\tCFLAG:301 = 6$/m] },
      {
        src: K0,
        ref: '730-733',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '731',
        any: [/PRINTFORMW 「再来…请把我揉得乱七八糟吧……！」/],
      },
      {
        src: K0,
        ref: '732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像引诱%SAVESTR:PLAYER%的手似的扭着身体/,
        ],
      },
      { src: K0, ref: '733', any: [/^\t\t\tCFLAG:301 = 5$/m] },
      {
        src: K0,
        ref: '735-738',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '736', any: [/PRINTFORMW 「哈啊…哈啊…啊啊啊～」/] },
      {
        src: K0,
        ref: '737',
        any: [/PRINTFORMW %SAVESTR:TARGET%的嘴里呼着热气/],
      },
      { src: K0, ref: '738', any: [/^\t\t\tCFLAG:301 = 4$/m] },
      {
        src: K0,
        ref: '740-743',
        any: [
          /^\t\tELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '741',
        any: [/PRINTFORMW 「才不会…觉得舒服呢！　絶対不会！」/],
      },
      {
        src: K0,
        ref: '742',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭动着身体忍耐着的样子/],
      },
      { src: K0, ref: '743', any: [/^\t\t\tCFLAG:301 = 3$/m] },
      {
        src: K0,
        ref: '745-748',
        any: [
          /^\t\tELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '746', any: [/PRINTFORMW 「…好恶心」/] },
      { src: K0, ref: '747', any: [/PRINTFORMW %SAVESTR:TARGET%叹了口气/] },
      { src: K0, ref: '748', any: [/^\t\t\tCFLAG:301 = 2$/m] },

      { src: K0, ref: '757', any: [/^IF SELECTCOM == 1$/m] },
      { src: K0, ref: '757-794', any: [/^IF SELECTCOM == 1$/m] },
      { src: K0, ref: '759-769', any: [/^\tIF CFLAG:302 == 0$/m] },
      { src: K0, ref: '761-767', any: [/^\t\tIF TALENT:TARGET:0 == 1$/m] },
      {
        src: K0,
        ref: '762',
        any: [/PRINTFORMW 「你、你在舔哪里啊～」/],
      },
      {
        src: K0,
        ref: '763',
        any: [/PRINTFORMW %SAVESTR:TARGET%的私处处有着处女的味道/],
      },
      {
        src: K0,
        ref: '766',
        any: [/PRINTFORMW 「请住手吧…不要舔那个地方！」/],
      },
      { src: K0, ref: '768', any: [/^\t\tCFLAG:302 = 1$/m] },
      {
        src: K0,
        ref: '771-792',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '773-776',

        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '774',
        any: [/PRINTFORMW 「再来～…再舔我那里吧…喝下去也行…啊啊～～/],
      },
      {
        src: K0,
        ref: '775',
        any: [/PRINTFORMW 蜜汁从%SAVESTR:TARGET%的私处处不断涌了出来/],
      },
      { src: K0, ref: '776', any: [/^\t\t\tCFLAG:302 = 5$/m] },
      {
        src: K0,
        ref: '778-781',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '779',
        any: [/PRINTFORMW 「哈哈～…好吃吗？　这个…♪」/],
      },
      {
        src: K0,
        ref: '780',
        any: [/PRINTFORMW %SAVESTR:TARGET%腼腆的笑着发出快乐的声音/],
      },
      { src: K0, ref: '781', any: [/^\t\t\tCFLAG:302 = 4$/m] },
      {
        src: K0,
        ref: '783-786',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '784',
        any: [/PRINTFORMW 「呜唔呜唔…呜呜～！　不要～」/],
      },
      {
        src: K0,
        ref: '785',
        any: [/PRINTFORMW %SAVESTR:TARGET%嘴上说着不要但还是老实地让你舔着/],
      },
      { src: K0, ref: '786', any: [/^\t\t\tCFLAG:302 = 3$/m] },
      {
        src: K0,
        ref: '788-790',
        any: [/^\t\tELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2$/m],
      },
      { src: K0, ref: '789', any: [/PRINTFORMW 「这么脏的地方也…」/] },
      { src: K0, ref: '790', any: [/^\t\t\tCFLAG:302 = 2$/m] },

      { src: K0, ref: '799', any: [/^IF SELECTCOM == 2$/m] },
      { src: K0, ref: '799-856', any: [/^IF SELECTCOM == 2$/m] },
      { src: K0, ref: '801-804', any: [/^\tIF CFLAG:303 == 0$/m] },
      {
        src: K0,
        ref: '802',
        any: [/PRINTFORMW 「讨厌！　难、难以置信！」/],
      },
      { src: K0, ref: '803', any: [/^\t\tCFLAG:TARGET:303 = 1$/m] },
      { src: K0, ref: '806-854', any: [/P = PALAM:3 \+ UP:3/] },
      { src: K0, ref: '807', any: [/P = PALAM:3 \+ UP:3/] },

      {
        src: K0,
        ref: '809-815',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '810',
        any: [/PRINTFORMW 「啊呜～…好棒～！再来…往深处挖！往深处抠！」/],
      },
      {
        src: K0,
        ref: '812-813',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '813',

        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '814',
        any: [/PRINTFORMW %SAVESTR:TARGET%每当被抠弄肛门就会发出娇喘/],
      },
      { src: K0, ref: '815', any: [/^\t\t\tCFLAG:303 = 7$/m] },
      {
        src: K0,
        ref: '817-822',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '818',
        any: [/PRINTFORMW 「啊～～…明明还不够湿…不过这样也好棒/],
      },
      {
        src: K0,
        ref: '820-821',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: K0,
        ref: '821',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      { src: K0, ref: '822', any: [/^\t\t\tCFLAG:303 = 6$/m] },

      {
        src: K0,
        ref: '824-830',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '825',
        any: [/PRINTFORMW 「再、再多疼爱一下屁股眼吧！」/],
      },
      {
        src: K0,
        ref: '827-828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '829',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每当被抠弄肛门就会发出不成体统的呻吟/,
        ],
      },
      { src: K0, ref: '830', any: [/^\t\t\tCFLAG:303 = 5$/m] },

      {
        src: K0,
        ref: '832-837',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '833',
        any: [/PRINTFORMW 「突、突然做什么呢！？」/],
      },
      {
        src: K0,
        ref: '835-836',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: K0,
        ref: '836',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      { src: K0, ref: '837', any: [/^\t\t\tCFLAG:303 = 4$/m] },

      {
        src: K0,
        ref: '839-845',
        any: [
          /^\t\tELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '840',
        any: [
          /PRINTFORMW 「难以置信…%SELF_CALL\(TARGET\)%…的屁股…啊～…啊啊～！」/,
        ],
      },
      {
        src: K0,
        ref: '842-843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: K0,
        ref: '844',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门的快感而神情迷醉/],
      },
      { src: K0, ref: '845', any: [/^\t\t\tCFLAG:303 = 3$/m] },

      {
        src: K0,
        ref: '847-852',
        any: [/^\t\tELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: K0,
        ref: '848',
        any: [/PRINTFORMW 「不要啊…够了、快住手～！」/],
      },
      {
        src: K0,
        ref: '850-851',
        any: [/PRINTFORMW %SAVESTR:TARGET%鈍感的肛门被刺激得红肿了起来/],
      },
      {
        src: K0,
        ref: '851',

        any: [/PRINTFORMW %SAVESTR:TARGET%鈍感的肛门被刺激得红肿了起来/],
      },
      { src: K0, ref: '852', any: [/^\t\t\tCFLAG:303 = 2$/m] },

      { src: K0, ref: '861', any: [/^IF SELECTCOM == 3$/m] },
      { src: K0, ref: '861-968', any: [/^IF SELECTCOM == 3$/m] },
      { src: K0, ref: '863-873', any: [/^\tIF CFLAG:304 == 0$/m] },
      {
        src: K0,
        ref: '865-871',
        any: [/^\t\tIF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1$/m],
      },
      {
        src: K0,
        ref: '866',
        any: [/PRINTFORMW 「啊啊…请多多的…欣赏吧…♪」/],
      },
      { src: K0, ref: '869', any: [/PRINTFORMW 「你是…悪魔」/] },
      {
        src: K0,
        ref: '870',
        any: [/PRINTFORMW %SAVESTR:TARGET%一副要哭出来的样子继续自慰着/],
      },
      { src: K0, ref: '872', any: [/^\t\tCFLAG:TARGET:304 = 1$/m] },
      {
        src: K0,
        ref: '875-966',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '877-881',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '878',
        any: [/淫乱处女膜夺走吧/],
      },
      {
        src: K0,
        ref: '879',
        any: [/把%SELF_CALL\(TARGET\)%的小穴捣进去吧/],
      },
      {
        src: K0,
        ref: '880',
        any: [/再也找不到一丝被称作聖女时候的清纯痕迹/],
      },
      { src: K0, ref: '881', any: [/^\t\t\tCFLAG:304 = 9$/m] },
      {
        src: K0,
        ref: '883-902',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '885-894',
        any: [/PRINTFORM 「看吧～%UNICODE\(0x2661\) \*1%　噗咻噗咻勃起的/],
      },
      {
        src: K0,
        ref: '887',
        any: [/PRINTFORM 「看吧～%UNICODE\(0x2661\) \*1%　噗咻噗咻勃起的/],
      },
      { src: K0, ref: '889', any: [/^\t\t\t\t\tPRINT 鸡鸡～$/m] },
      { src: K0, ref: '891', any: [/^\t\t\t\t\tPRINT 假鸡鸡～$/m] },
      {
        src: K0,
        ref: '893',
        any: [/PRINTFORMW %UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '894',
        any: [/请大家一起看我做舒服的事吧/],
      },
      {
        src: K0,
        ref: '896',
        any: [/飞起来了～飞起来了～/],
      },
      {
        src: K0,
        ref: '898',
        any: [/平时一个人是怎么做的/],
      },
      {
        src: K0,
        ref: '900',
        any: [/搅着搅着小穴里的淫水就止不住了/],
      },
      { src: K0, ref: '902', any: [/^\t\t\tCFLAG:304 = 8$/m] },
      {
        src: K0,
        ref: '904-911',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '907',
        any: [/卖力自慰后请赏我大肉棒吧/],
      },
      {
        src: K0,
        ref: '909',
        any: [/小穴玩得停不下来了～…对不起～～！/],
      },
      { src: K0, ref: '911', any: [/^\t\t\tCFLAG:304 = 7$/m] },
      {
        src: K0,
        ref: '913-916',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '914',
        any: [/我在玩弄主人专用的专属小穴/],
      },
      {
        src: K0,
        ref: '915',
        any: [/感觉处女膜也在一颤一颤的呢/],
      },
      { src: K0, ref: '916', any: [/^\t\t\tCFLAG:304 = 6$/m] },
      {
        src: K0,
        ref: '918-937',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '920-929',
        any: [/PRINTFORM 「看见了吗？～♪　噗咻噗咻勃起的/],
      },
      {
        src: K0,
        ref: '922',
        any: [/PRINTFORM 「看见了吗？～♪　噗咻噗咻勃起的/],
      },
      { src: K0, ref: '924', any: [/^\t\t\t\t\tPRINT 鸡鸡……$/m] },
      { src: K0, ref: '926', any: [/^\t\t\t\t\tPRINT 假鸡鸡$/m] },
      { src: K0, ref: '928', any: [/PRINTFORMW ♪」/] },
      {
        src: K0,
        ref: '929',
        any: [/只有有爱的话，在大家面前也不觉得尴尬了/],
      },
      {
        src: K0,
        ref: '931',
        any: [/PRINTFORMW 「好、爽～！　啊哈哈…哈哈…好爽～！」/],
      },
      {
        src: K0,
        ref: '933',
        any: [/看看自慰地发狂的%SELF_CALL\(TARGET\)%/],
      },
      {
        src: K0,
        ref: '935',
        any: [/这样…完全不够呢…还要…你的…啊啊～♪/],
      },
      { src: K0, ref: '937', any: [/^\t\t\tCFLAG:304 = 5$/m] },
      {
        src: K0,
        ref: '939-946',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '942',
        any: [/被看着…虽然很害羞、不过太舒服了～！/],
      },
      { src: K0, ref: '944', any: [/PRINTFORMW 「哈啊…哈啊…啊啊～」/] },
      { src: K0, ref: '946', any: [/^\t\t\tCFLAG:304 = 4$/m] },
      {
        src: K0,
        ref: '948-955',
        any: [
          /^\t\tELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '951',
        any: [/PRINTFORMW 「如果这是你希望的话…」/],
      },
      { src: K0, ref: '953', any: [/PRINTFORMW 「就照你说的做吧…」/] },
      { src: K0, ref: '955', any: [/^\t\t\tCFLAG:304 = 3$/m] },
      {
        src: K0,
        ref: '957-964',
        any: [/^\t\tELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2$/m],
      },
      { src: K0, ref: '960', any: [/PRINTFORMW 「好难为情…」/] },
      { src: K0, ref: '962', any: [/PRINTFORMW 「真讨厌…」/] },
      { src: K0, ref: '964', any: [/^\t\t\tCFLAG:304 = 2$/m] },

      { src: K0, ref: '973', any: [/^IF SELECTCOM == 5$/m] },
      { src: K0, ref: '973-1060', any: [/^IF SELECTCOM == 5$/m] },
      { src: K0, ref: '975-1001', any: [/^\tIF CFLAG:306 == 0$/m] },
      {
        src: K0,
        ref: '977-987',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: K0,
        ref: '979-986',
        any: [/^\t\t\tIF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1$/m],
      },
      {
        src: K0,
        ref: '980',
        any: [/请你吮吸并品尝母乳吧/],
      },
      {
        src: K0,
        ref: '983',
        any: [/PRINTFORMW 「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」/],
      },
      {
        src: K0,
        ref: '986',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的乳头被吸吮着、被刺激的红肿起来/,
        ],
      },
      {
        src: K0,
        ref: '990-997',
        any: [/PRINTFORMW 「请你随心所欲的揉吧…♪」/],
      },
      { src: K0, ref: '991', any: [/PRINTFORMW 「请你随心所欲的揉吧…♪」/] },
      { src: K0, ref: '994', any: [/PRINTFORMW 「讨厌、変態！」/] },
      {
        src: K0,
        ref: '997',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的乳头被吸吮着、被刺激的红肿起来/,
        ],
      },
      { src: K0, ref: '1000', any: [/^\t\tCFLAG:TARGET:306 = 1$/m] },
      {
        src: K0,
        ref: '1003-1058',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: K0,
        ref: '1005-1026',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: K0,
        ref: '1007-1010',
        any: [
          /^\t\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1008',
        any: [/乳房一被吸…就好像要去了似的呢/],
      },
      {
        src: K0,
        ref: '1009',
        any: [/一颤一颤的痙攣着往%SAVESTR:PLAYER%的嘴里喷出母乳/],
      },
      { src: K0, ref: '1010', any: [/^\t\t\t\tCFLAG:306 = 5$/m] },
      {
        src: K0,
        ref: '1012-1015',
        any: [
          /^\t\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1013',
        any: [/吸%SELF_CALL\(TARGET\)%的奶来恢复精神吧/],
      },
      {
        src: K0,
        ref: '1014',
        any: [/像慈母般微笑着看着吮吸着乳头的%SAVESTR:PLAYER%/],
      },
      { src: K0, ref: '1015', any: [/^\t\t\t\tCFLAG:306 = 4$/m] },
      {
        src: K0,
        ref: '1017-1020',
        any: [
          /^\t\t\tELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1018',
        any: [/这可是小宝宝吸的…东西啊/],
      },
      {
        src: K0,
        ref: '1019',
        any: [/每当乳头溢出母乳就会沉浸在愉悦之中/],
      },
      { src: K0, ref: '1020', any: [/^\t\t\t\tCFLAG:306 = 3$/m] },
      {
        src: K0,
        ref: '1022-1025',
        any: [/^\t\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: K0,
        ref: '1023',
        any: [/乳房…不要吸乳房啊～/],
      },
      {
        src: K0,
        ref: '1024',
        any: [/渐渐沉溺于母乳流出所带来的炽熱快感中/],
      },
      { src: K0, ref: '1025', any: [/^\t\t\t\tCFLAG:306 = 2$/m] },
      {
        src: K0,
        ref: '1029-1034',
        any: [
          /^\t\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1030',
        any: [/虽然很痛但也被弄得好舒服呢/],
      },
      {
        src: K0,
        ref: '1033',
        any: [/鈍感的乳头已被完全開発、被含进嘴里舔得完全勃起了/],
      },
      { src: K0, ref: '1034', any: [/^\t\t\t\tCFLAG:306 = 5$/m] },
      {
        src: K0,
        ref: '1036-1041',
        any: [
          /^\t\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1037',
        any: [/PRINTFORMW 「手好温暖…啊啊…好舒服啊…/],
      },
      {
        src: K0,
        ref: '1040',
        any: [/鈍感的乳头已被完全開発、鼓鼓胀胀地完全勃起了/],
      },
      { src: K0, ref: '1041', any: [/^\t\t\t\tCFLAG:306 = 4$/m] },
      {
        src: K0,
        ref: '1043-1048',
        any: [
          /^\t\t\tELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1044', any: [/PRINTFORMW 「好有感觉…真舒服…」/] },
      {
        src: K0,
        ref: '1047',
        any: [/鈍感的乳头已被完全開発、被刺激得勃了起来/],
      },
      { src: K0, ref: '1048', any: [/^\t\t\t\tCFLAG:306 = 3$/m] },
      {
        src: K0,
        ref: '1050-1055',
        any: [/^\t\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: K0,
        ref: '1051',
        any: [/PRINTFORMW 「虽然被这样揉很疼…咕呜～」/],
      },
      {
        src: K0,
        ref: '1054',
        any: [/鈍感的乳头被刺激得红肿起来/],
      },
      { src: K0, ref: '1055', any: [/^\t\t\t\tCFLAG:306 = 2$/m] },

      { src: K0, ref: '1065', any: [/^IF SELECTCOM == 6$/m] },
      { src: K0, ref: '1065-1148', any: [/^IF SELECTCOM == 6$/m] },

      {
        src: K0,
        ref: '1067-1097',
        any: [/^\tIF CFLAG:307 == 0 && TFLAG:13$/m],
      },
      {
        src: K0,
        ref: '1069-1076',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0$/m,
        ],
      },
      { src: K0, ref: '1070', any: [/嘞噗～啾～啾～～/] },
      { src: K0, ref: '1071', any: [/在初吻时就用难以想象的热情/] },
      { src: K0, ref: '1072', any: [/再多和我…亲吻一会儿吧/] },
      { src: K0, ref: '1075', any: [/已经没有故郷恋人的存在了吧/] },
      {
        src: K0,
        ref: '1078-1085',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0$/m,
        ],
      },
      { src: K0, ref: '1079', any: [/%SELF_CALL\(TARGET\)%的初吻/] },
      { src: K0, ref: '1080', any: [/忸忸怩怩很害羞的样子/] },
      { src: K0, ref: '1081', any: [/你要负起…责任哦/] },
      {
        src: K0,
        ref: '1084',
        any: [/这样微笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      { src: K0, ref: '1087-1094', any: [/%SELF_CALL\(TARGET\)%的第一次/] },
      { src: K0, ref: '1088', any: [/%SELF_CALL\(TARGET\)%的第一次/] },
      { src: K0, ref: '1089', any: [/饶有兴致的品味着/] },
      { src: K0, ref: '1092', any: [/对不起…对不起/] },
      { src: K0, ref: '1093', any: [/想起故郷的恋人流下了眼泪/] },

      { src: K0, ref: '1099-1124', any: [/^\tELSEIF CFLAG:307 == 0$/m] },
      {
        src: K0,
        ref: '1101-1106',
        any: [/^\t\tIF TALENT:TARGET:76 == 1$/m, /我还想再接吻/],
      },
      { src: K0, ref: '1102', any: [/我还想再接吻/] },
      {
        src: K0,
        ref: '1105',
        any: [/痴痴笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      {
        src: K0,
        ref: '1108-1113',
        any: [/^\t\tELSEIF TALENT:TARGET:85 == 1$/m, /可以再来一次吗/],
      },
      { src: K0, ref: '1109', any: [/可以再来一次吗/] },
      {
        src: K0,
        ref: '1112',
        any: [/这样微笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      { src: K0, ref: '1115-1121', any: [/好、好恶毒/] },
      { src: K0, ref: '1116', any: [/好、好恶毒/] },
      { src: K0, ref: '1119', any: [/对不起…对不起/] },
      { src: K0, ref: '1120', any: [/想起故郷的恋人流下了眼泪/] },
      {
        src: K0,
        ref: '1126-1146',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },

      {
        src: K0,
        ref: '1128-1130',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1129', any: [/请再多吻我吧/] },
      {
        src: K0,
        ref: '1132-1135',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1133', any: [/我只是说喜欢接吻罢了/] },
      { src: K0, ref: '1134', any: [/不断地接吻着/] },
      {
        src: K0,
        ref: '1137-1139',
        any: [
          /^\t\tELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1138', any: [/这、这样就可以了吧/] },
      {
        src: K0,
        ref: '1141-1144',
        any: [/^\t\tELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2$/m],
      },
      { src: K0, ref: '1142', any: [/PRINTFORMW 「嗯～…咕～…」/] },
      { src: K0, ref: '1143', any: [/把唇移开、不好意思的躲闪着视线/] },
      { src: K0, ref: '1153', any: [/^IF SELECTCOM == 7$/m] },
      { src: K0, ref: '1153-1189', any: [/^IF SELECTCOM == 7$/m] },

      { src: K0, ref: '1155-1167', any: [/^\tIF CFLAG:308 == 0$/m] },
      { src: K0, ref: '1157-1159', any: [/淫乱小穴/] },
      { src: K0, ref: '1158', any: [/淫乱小穴/] },
      { src: K0, ref: '1160-1162', any: [/如果是主人的命令的话/] },
      { src: K0, ref: '1161', any: [/如果是主人的命令的话/] },
      { src: K0, ref: '1163-1165', any: [/这、这样…是不对的/] },
      { src: K0, ref: '1164', any: [/这、这样…是不对的/] },
      {
        src: K0,
        ref: '1169-1187',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },

      {
        src: K0,
        ref: '1171-1173',
        any: [/^\t\t\tCFLAG:306 = 5$/m, /迫不及待地想被小鸡鸡插来插去了呢/],
      },
      { src: K0, ref: '1172', any: [/迫不及待地想被小鸡鸡插来插去了呢/] },
      {
        src: K0,
        ref: '1175-1177',
        any: [/SELF_CALL_FIRST\(TARGET\)/, /^\t\t\tCFLAG:306 = 4$/m],
      },
      { src: K0, ref: '1176', any: [/不要老是盯着这里看嘛/] },
      {
        src: K0,
        ref: '1179-1181',
        any: [
          /^\t\tELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1180', any: [/小穴被看着好有感觉啊/] },
      {
        src: K0,
        ref: '1183-1185',
        any: [/^\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      { src: K0, ref: '1184', any: [/不要看那种地方/] },

      { src: K0, ref: '1194', any: [/^IF SELECTCOM == 8$/m] },
      { src: K0, ref: '1194-1248', any: [/^IF SELECTCOM == 8$/m] },
      { src: K0, ref: '1196-1214', any: [/^\tIF CFLAG:TARGET:309 == 0$/m] },
      {
        src: K0,
        ref: '1198-1199',
        any: [/尽情蹂躏%SELF_CALL\(TARGET\)%的阴道吧/],
      },
      { src: K0, ref: '1199', any: [/尽情蹂躏%SELF_CALL\(TARGET\)%的阴道吧/] },
      {
        src: K0,
        ref: '1201-1203',
        any: [/^\t\tELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1$/m],
      },
      { src: K0, ref: '1202', any: [/请再往里面插/] },
      { src: K0, ref: '1203', any: [/是的、没问题/] },
      { src: K0, ref: '1205-1209', any: [/住手…住手啊/] },
      { src: K0, ref: '1206', any: [/住手…住手啊/] },
      { src: K0, ref: '1208-1209', any: [/SIF TALENT:TARGET:103/] },
      { src: K0, ref: '1209', any: [/私处不太容易有感觉/] },
      { src: K0, ref: '1211', any: [/^\t\tCFLAG:TARGET:309 = 1$/m] },
      {
        src: K0,
        ref: '1214-1246',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1216-1221', any: [/把小穴弄得湿漉漉的吧/] },
      { src: K0, ref: '1217', any: [/把小穴弄得湿漉漉的吧/] },
      {
        src: K0,
        ref: '1219-1220',
        any: [/SIF ABL:2 >= 3 && TALENT:TARGET:103/],
      },
      { src: K0, ref: '1220', any: [/贪婪的吞下了%SAVESTR:PLAYER%所有的爱撫/] },
      { src: K0, ref: '1221', any: [/^\t\t\tCFLAG:309 = 5$/m] },
      {
        src: K0,
        ref: '1223-1229',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1224', any: [/主人的手指…好温柔/] },
      { src: K0, ref: '1225', any: [/你、你欺负人啊/] },
      { src: K0, ref: '1227-1228', any: [/完全接受了%SAVESTR:PLAYER%的爱撫/] },
      { src: K0, ref: '1228', any: [/完全接受了%SAVESTR:PLAYER%的爱撫/] },
      { src: K0, ref: '1229', any: [/^\t\t\tCFLAG:309 = 4$/m] },
      {
        src: K0,
        ref: '1231-1236',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1232', any: [/我不会反抗的、所以…再温柔一点/] },
      { src: K0, ref: '1234-1235', any: [/不成体统的挺着腰/] },
      { src: K0, ref: '1235', any: [/不成体统的挺着腰/] },
      { src: K0, ref: '1236', any: [/^\t\t\tCFLAG:309 = 3$/m] },
      {
        src: K0,
        ref: '1238-1243',
        any: [/^\t\tELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: K0,
        ref: '1239',
        any: [/即使被做了这样的事%SELF_CALL\(TARGET\)%也/],
      },
      { src: K0, ref: '1241-1242', any: [/每次在里面摩擦/] },
      { src: K0, ref: '1242', any: [/每次在里面摩擦/] },
      { src: K0, ref: '1243', any: [/^\t\t\tCFLAG:309 = 2$/m] },
      { src: K0, ref: '1252', any: [/^IF SELECTCOM == 9$/m] },
      { src: K0, ref: '1252-1310', any: [/^IF SELECTCOM == 9$/m] },
      { src: K0, ref: '1254-1276', any: [/^\tIF CFLAG:310 == 0$/m] },
      { src: K0, ref: '1256-1260', any: [/还要…再舐舐吧/] },
      { src: K0, ref: '1257', any: [/还要…再舐舐吧/] },
      {
        src: K0,
        ref: '1259-1260',
        any: [/SIF ABL:3 >= 3 && TALENT:TARGET:105/],
      },
      { src: K0, ref: '1260', any: [/发出了非常带感的声音/] },
      { src: K0, ref: '1262-1266', any: [/那里很脏啊…太羞人了/] },
      { src: K0, ref: '1263', any: [/那里很脏啊…太羞人了/] },
      { src: K0, ref: '1265-1266', any: [/弄得娇喘起来/] },
      { src: K0, ref: '1266', any: [/弄得娇喘起来/] },
      { src: K0, ref: '1268-1272', any: [/不、不要啊～/] },
      { src: K0, ref: '1269', any: [/不、不要啊～/] },
      { src: K0, ref: '1271-1272', any: [/发出了高亢的悲鳴声/] },
      { src: K0, ref: '1272', any: [/发出了高亢的悲鳴声/] },
      { src: K0, ref: '1274', any: [/^\t\tCFLAG:TARGET:310 = 1$/m] },
      {
        src: K0,
        ref: '1277-1308',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1279-1284', any: [/再用舌头舔我吧/] },
      { src: K0, ref: '1280', any: [/再用舌头舔我吧/] },
      {
        src: K0,
        ref: '1282-1283',
        any: [/SIF ABL:3 >= 3 && TALENT:TARGET:105/],
      },
      { src: K0, ref: '1283', any: [/发出了非常带感的声音/] },
      { src: K0, ref: '1284', any: [/^\t\t\tCFLAG:310 = 5$/m] },
      { src: K0, ref: '1286-1291', any: [/再温柔一点…舐的话/] },
      { src: K0, ref: '1287', any: [/再温柔一点…舐的话/] },
      { src: K0, ref: '1289-1290', any: [/弄得娇喘出声/] },
      { src: K0, ref: '1290', any: [/弄得娇喘出声/] },
      { src: K0, ref: '1291', any: [/^\t\t\tCFLAG:310 = 4$/m] },
      { src: K0, ref: '1293-1298', any: [/请再…舔我吧/] },
      { src: K0, ref: '1294', any: [/请再…舔我吧/] },
      { src: K0, ref: '1296-1297', any: [/搅得发出了快乐的声音/] },
      { src: K0, ref: '1297', any: [/搅得发出了快乐的声音/] },
      { src: K0, ref: '1298', any: [/^\t\t\tCFLAG:310 = 3$/m] },
      { src: K0, ref: '1300-1305', any: [/讨厌…明明很脏/] },
      { src: K0, ref: '1301', any: [/讨厌…明明很脏/] },
      { src: K0, ref: '1303-1304', any: [/发出了悲鳴声/] },
      { src: K0, ref: '1304', any: [/发出了悲鳴声/] },
      { src: K0, ref: '1305', any: [/^\t\t\tCFLAG:310 = 2$/m] },

      { src: K0, ref: '1314', any: [/^IF SELECTCOM == 10$/m] },
      { src: K0, ref: '1314-1352', any: [/^IF SELECTCOM == 10$/m] },
      { src: K0, ref: '1316-1328', any: [/^\tIF CFLAG:TARGET:311 == 0$/m] },
      { src: K0, ref: '1318-1319', any: [/这样的震动太美妙了/] },
      { src: K0, ref: '1319', any: [/这样的震动太美妙了/] },
      {
        src: K0,
        ref: '1321-1322',
        any: [/^\t\tELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1$/m],
      },
      { src: K0, ref: '1322', any: [/请尽情使用吧/] },
      { src: K0, ref: '1324-1325', any: [/这到底是什么东西/] },
      { src: K0, ref: '1325', any: [/这到底是什么东西/] },
      { src: K0, ref: '1327', any: [/^\t\tCFLAG:TARGET:311 = 1$/m] },
      {
        src: K0,
        ref: '1330-1349',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1332-1334', any: [/我还要更多、更多/] },
      { src: K0, ref: '1333', any: [/我还要更多、更多/] },
      { src: K0, ref: '1334', any: [/扭着腰身因为愉悦而颤抖不已/] },
      { src: K0, ref: '1335', any: [/^\t\t\tCFLAG:311 = 5$/m] },
      {
        src: K0,
        ref: '1337-1340',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1338', any: [/这东西…真厉害啊/] },
      { src: K0, ref: '1339', any: [/忍耐陰核的震动/] },
      { src: K0, ref: '1340', any: [/^\t\t\tCFLAG:311 = 4$/m] },
      {
        src: K0,
        ref: '1342-1344',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1343', any: [/感觉变的好舒服啊/] },
      { src: K0, ref: '1344', any: [/^\t\t\tCFLAG:311 = 3$/m] },
      {
        src: K0,
        ref: '1346-1348',
        any: [/^\t\tELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2$/m],
      },
      { src: K0, ref: '1347', any: [/再、再这样下去的话/] },
      { src: K0, ref: '1348', any: [/^\t\t\tCFLAG:311 = 2$/m] },

      { src: K0, ref: '1358', any: [/^IF SELECTCOM == 11 && TEQUIP:11$/m] },
      {
        src: K0,
        ref: '1358-1433',
        any: [/^IF SELECTCOM == 11 && TEQUIP:11$/m],
      },
      { src: K0, ref: '1360-1400', any: [/^\tIF CFLAG:TARGET:312 == 0$/m] },
      { src: K0, ref: '1362-1376', any: [/^\t\tIF TALENT:0 == 1$/m] },
      { src: K0, ref: '1364-1367', any: [/渐渐地钻进…小穴里面去了/] },
      { src: K0, ref: '1365', any: [/渐渐地钻进…小穴里面去了/] },
      { src: K0, ref: '1366', any: [/主人的小鸡鸡…明明一直在等待着/] },
      { src: K0, ref: '1367', any: [/有点悲伤地忍耐着破瓜的疼痛/] },
      { src: K0, ref: '1369-1372', any: [/一点也不痛/] },
      { src: K0, ref: '1370', any: [/一点也不痛/] },
      { src: K0, ref: '1371', any: [/咬牙忍耐着破瓜的痛楚/] },
      { src: K0, ref: '1372', any: [/下次…想要…………主人的…东西/] },
      { src: K0, ref: '1374-1375', any: [/好狠心…好狠心啊/] },
      { src: K0, ref: '1375', any: [/好狠心…好狠心啊/] },
      { src: K0, ref: '1380-1384', any: [/这样被张开…好厉害啊/] },
      { src: K0, ref: '1381', any: [/这样被张开…好厉害啊/] },
      { src: K0, ref: '1383-1384', any: [/把壶虫贪婪的连根吞了进去/] },
      { src: K0, ref: '1384', any: [/把壶虫贪婪的连根吞了进去/] },
      {
        src: K0,
        ref: '1386-1390',
        any: [/这东西在%SELF_CALL\(TARGET\)%的阴道里/],
      },
      { src: K0, ref: '1387', any: [/这东西在%SELF_CALL\(TARGET\)%的阴道里/] },
      { src: K0, ref: '1389-1390', any: [/把壶虫连根吞了进去/] },
      { src: K0, ref: '1390', any: [/把壶虫连根吞了进去/] },
      {
        src: K0,
        ref: '1392-1396',
        any: [/在%SELF_CALL\(TARGET\)%的里面蠕动着/],
      },
      { src: K0, ref: '1393', any: [/在%SELF_CALL\(TARGET\)%的里面蠕动着/] },
      {
        src: K0,
        ref: '1395-1396',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: K0,
        ref: '1396',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      { src: K0, ref: '1399', any: [/^\t\tCFLAG:312 = 1$/m] },
      {
        src: K0,
        ref: '1402-1433',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1404-1409', any: [/明明是虫子而已/] },
      { src: K0, ref: '1405', any: [/明明是虫子而已/] },
      {
        src: K0,
        ref: '1407-1408',
        any: [/SIF ABL:2 >= 3 && TALENT:TARGET:103/],
      },
      { src: K0, ref: '1408', any: [/把壶虫贪婪的连根吞了进去/] },
      { src: K0, ref: '1409', any: [/^\t\t\tCFLAG:312 = 5$/m] },
      { src: K0, ref: '1411-1416', any: [/弄得更加一塌糊涂吧/] },
      { src: K0, ref: '1412', any: [/弄得更加一塌糊涂吧/] },
      {
        src: K0,
        ref: '1414-1415',
        any: [/好像很愉快似的轻松把壶虫连根吞了进去/],
      },
      { src: K0, ref: '1415', any: [/好像很愉快似的轻松把壶虫连根吞了进去/] },
      { src: K0, ref: '1416', any: [/^\t\t\tCFLAG:312 = 4$/m] },
      { src: K0, ref: '1418-1423', any: [/腰…都舒服的動不了了/] },
      { src: K0, ref: '1419', any: [/腰…都舒服的動不了了/] },
      { src: K0, ref: '1421-1422', any: [/SIF TALENT:TARGET:103/] },
      { src: K0, ref: '1422', any: [/把壶虫连根吞了进去/] },
      { src: K0, ref: '1423', any: [/^\t\t\tCFLAG:312 = 3$/m] },
      { src: K0, ref: '1425-1430', any: [/咕呜～…啊～…咿～～…不、不要～/] },
      { src: K0, ref: '1426', any: [/咕呜～…啊～…咿～～…不、不要～/] },
      {
        src: K0,
        ref: '1428-1429',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: K0,
        ref: '1429',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      { src: K0, ref: '1430', any: [/^\t\t\tCFLAG:312 = 2$/m] },
      {
        src: K0,
        ref: '1435',
        any: [/^ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0$/m],
      },
      {
        src: K0,
        ref: '1435-1450',
        any: [/^ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0$/m],
      },
      {
        src: K0,
        ref: '1437-1439',
        any: [
          /^\tIF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1438', any: [/下次…要把什么插进来呢/] },
      { src: K0, ref: '1439', any: [/^\t\tCFLAG:372 = 3$/m] },
      { src: K0, ref: '1441-1443', any: [/下次想要…主人的东西/] },
      { src: K0, ref: '1442', any: [/下次想要…主人的东西/] },
      { src: K0, ref: '1443', any: [/^\t\tCFLAG:372 = 2$/m] },
      { src: K0, ref: '1445-1447', any: [/大张的小穴空出来了/] },
      { src: K0, ref: '1446', any: [/大张的小穴空出来了/] },
      { src: K0, ref: '1447', any: [/^\t\tCFLAG:372 = 1$/m] },

      { src: K0, ref: '1455', any: [/^IF SELECTCOM == 12$/m] },
      { src: K0, ref: '1455-1499', any: [/^IF SELECTCOM == 12$/m] },
      { src: K0, ref: '1457-1475', any: [/^\tIF CFLAG:313 == 0$/m] },
      { src: K0, ref: '1459-1465', any: [/讨、讨厌！那里好痒啊/] },
      { src: K0, ref: '1460', any: [/讨、讨厌！那里好痒啊/] },
      {
        src: K0,
        ref: '1461',
        any: [/每当振动杖按在%SAVESTR:TARGET%的两腿之间就会带来极度刺激的快感/],
      },
      { src: K0, ref: '1462', any: [/PRINTFORMW ………/] },
      { src: K0, ref: '1463', any: [/PRINTFORMW ……$/m] },
      { src: K0, ref: '1464', any: [/30分後/] },
      { src: K0, ref: '1465', any: [/不要…再…继…继续、下…去/] },
      {
        src: K0,
        ref: '1467-1469',
        any: [/魔族的道具里还有这样的奇怪玩意儿吗/],
      },
      { src: K0, ref: '1468', any: [/魔族的道具里还有这样的奇怪玩意儿吗/] },
      { src: K0, ref: '1469', any: [/好厉害的震动/] },
      { src: K0, ref: '1471-1472', any: [/只不过是有点痒罢了/] },
      { src: K0, ref: '1472', any: [/只不过是有点痒罢了/] },
      { src: K0, ref: '1474', any: [/^\t\tCFLAG:313 = 1$/m] },
      {
        src: K0,
        ref: '1476-1498',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1479-1482', any: [/请用这个色情的杖来欺负/] },
      { src: K0, ref: '1480', any: [/请用这个色情的杖来欺负/] },
      { src: K0, ref: '1481', any: [/麻麻的好厉害啊/] },
      { src: K0, ref: '1482', any: [/^\t\t\tCFLAG:313 = 5$/m] },
      { src: K0, ref: '1484-1487', any: [/请…请继续…主人/] },
      { src: K0, ref: '1485', any: [/请…请继续…主人/] },
      { src: K0, ref: '1486', any: [/好…好舒服…好…舒…服/] },
      { src: K0, ref: '1487', any: [/^\t\t\tCFLAG:313 = 4$/m] },
      { src: K0, ref: '1489-1491', any: [/明明被用这种东西玩弄/] },
      { src: K0, ref: '1490', any: [/明明被用这种东西玩弄/] },
      { src: K0, ref: '1491', any: [/^\t\t\tCFLAG:313 = 3$/m] },
      { src: K0, ref: '1493-1495', any: [/这样…好有感觉、不要…不要啊/] },
      { src: K0, ref: '1494', any: [/这样…好有感觉、不要…不要啊/] },
      { src: K0, ref: '1495', any: [/^\t\t\tCFLAG:313 = 2$/m] },

      { src: K0, ref: '1505', any: [/^IF SELECTCOM == 13 && TEQUIP:13$/m] },
      {
        src: K0,
        ref: '1505-1588',
        any: [/^IF SELECTCOM == 13 && TEQUIP:13$/m],
      },
      { src: K0, ref: '1507-1529', any: [/^\tIF CFLAG:TARGET:314 == 0$/m] },
      { src: K0, ref: '1509-1514', any: [/连尻穴里都被虫子钻进去了/] },
      { src: K0, ref: '1510', any: [/连尻穴里都被虫子钻进去了/] },
      { src: K0, ref: '1511', any: [/曾被称作聖女的/] },
      {
        src: K0,
        ref: '1513-1514',
        any: [/于是%SAVESTR:TARGET%鈍感的肛门被快楽所開発/],
      },
      {
        src: K0,
        ref: '1514',
        any: [/于是%SAVESTR:TARGET%鈍感的肛门被快楽所開発/],
      },
      { src: K0, ref: '1516-1520', any: [/这种程度完全能够承受的下来/] },
      { src: K0, ref: '1517', any: [/这种程度完全能够承受的下来/] },
      { src: K0, ref: '1519-1520', any: [/由于肛门虫的刺激而娇喘出声/] },
      { src: K0, ref: '1520', any: [/由于肛门虫的刺激而娇喘出声/] },
      { src: K0, ref: '1522-1526', any: [/那里不能进去～！不能进去啊～/] },
      { src: K0, ref: '1523', any: [/那里不能进去～！不能进去啊～/] },
      { src: K0, ref: '1525-1526', any: [/%SAVESTR:TARGET%发出了悲鳴/] },
      { src: K0, ref: '1526', any: [/%SAVESTR:TARGET%发出了悲鳴/] },
      { src: K0, ref: '1528', any: [/^\t\tCFLAG:TARGET:314 = 1$/m] },
      {
        src: K0,
        ref: '1530-1588',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K0,
        ref: '1533-1544',
        any: [/这么粗的蠕虫要插进%SELF_CALL\(TARGET\)%屁股眼里去了哦/],
      },
      { src: K0, ref: '1535-1537', any: [/妖艳的那期蠕虫、舔了舔嘴唇/] },
      {
        src: K0,
        ref: '1536',
        any: [/这么粗的蠕虫要插进%SELF_CALL\(TARGET\)%屁股眼里去了哦/],
      },
      { src: K0, ref: '1537', any: [/妖艳的那期蠕虫、舔了舔嘴唇/] },
      { src: K0, ref: '1539', any: [/屁股眼好舒服～！再往里钻吧/] },
      {
        src: K0,
        ref: '1542-1543',
        any: [
          /鈍感的肛门被調教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声/,
        ],
      },
      {
        src: K0,
        ref: '1543',
        any: [
          /鈍感的肛门被調教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声/,
        ],
      },
      { src: K0, ref: '1544', any: [/^\t\t\tCFLAG:314 = 6$/m] },
      { src: K0, ref: '1546-1551', any: [/虫子…在…里面/] },
      { src: K0, ref: '1547', any: [/虫子…在…里面/] },
      { src: K0, ref: '1549-1550', any: [/好像很开心的晃着屁股作为回应/] },
      { src: K0, ref: '1550', any: [/好像很开心的晃着屁股作为回应/] },
      { src: K0, ref: '1551', any: [/^\t\t\tCFLAG:314 = 6$/m] },
      { src: K0, ref: '1553-1564', any: [/見请看吧/] },
      { src: K0, ref: '1555-1557', any: [/抱起一抖一抖的扭动着的蠕虫/] },
      { src: K0, ref: '1556', any: [/見请看吧/] },
      { src: K0, ref: '1557', any: [/抱起一抖一抖的扭动着的蠕虫/] },
      { src: K0, ref: '1559', any: [/屁股眼…感觉…好棒呢/] },
      { src: K0, ref: '1562-1563', any: [/由于肛门虫的刺激娇喘出声/] },
      { src: K0, ref: '1563', any: [/由于肛门虫的刺激娇喘出声/] },
      { src: K0, ref: '1564', any: [/^\t\t\tCFLAG:314 = 5$/m] },
      { src: K0, ref: '1566-1571', any: [/屁、屁股…好奇怪…变的好奇怪/] },
      { src: K0, ref: '1567', any: [/屁、屁股…好奇怪…变的好奇怪/] },
      { src: K0, ref: '1569-1570', any: [/就皱起眉头发出了好像很痛苦的呻吟/] },
      { src: K0, ref: '1570', any: [/就皱起眉头发出了好像很痛苦的呻吟/] },
      { src: K0, ref: '1571', any: [/^\t\t\tCFLAG:314 = 4$/m] },
      { src: K0, ref: '1573-1578', any: [/屁股眼爽的不行了…明明不能这样的/] },
      { src: K0, ref: '1574', any: [/屁股眼爽的不行了…明明不能这样的/] },
      { src: K0, ref: '1576-1577', any: [/被開発而觉醒了快感/] },
      { src: K0, ref: '1577', any: [/被開発而觉醒了快感/] },
      { src: K0, ref: '1578', any: [/^\t\t\tCFLAG:314 = 3$/m] },
      { src: K0, ref: '1580-1585', any: [/咕呜～…好难受…好难受啊/] },
      { src: K0, ref: '1581', any: [/咕呜～…好难受…好难受啊/] },
      { src: K0, ref: '1583-1584', any: [/%SAVESTR:TARGET%就发出了悲鳴/] },
      { src: K0, ref: '1584', any: [/%SAVESTR:TARGET%就发出了悲鳴/] },
      { src: K0, ref: '1585', any: [/^\t\t\tCFLAG:314 = 2$/m] },
      {
        src: K0,
        ref: '1590',
        any: [/^ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0$/m],
      },
      {
        src: K0,
        ref: '1590-1609',
        any: [/^ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0$/m],
      },
      { src: K0, ref: '1592-1594', any: [/要是能一整天都能被抽插着就好了/] },
      { src: K0, ref: '1593', any: [/要是能一整天都能被抽插着就好了/] },
      { src: K0, ref: '1594', any: [/^\t\tCFLAG:374 = 4$/m] },
      { src: K0, ref: '1596-1598', any: [/总觉得屁股眼感到寂寞了呢/] },
      { src: K0, ref: '1597', any: [/总觉得屁股眼感到寂寞了呢/] },
      { src: K0, ref: '1598', any: [/^\t\tCFLAG:374 = 3$/m] },
      { src: K0, ref: '1600-1602', any: [/屁股眼…还意犹未尽/] },
      { src: K0, ref: '1601', any: [/屁股眼…还意犹未尽/] },
      { src: K0, ref: '1602', any: [/^\t\tCFLAG:374 = 2$/m] },
      { src: K0, ref: '1604-1606', any: [/「哈啊…哈啊…哈啊………」/] },
      { src: K0, ref: '1605', any: [/「哈啊…哈啊…哈啊………」/] },
      { src: K0, ref: '1606', any: [/^\t\tCFLAG:374 = 1$/m] },

      { src: K0, ref: '1615', any: [/^IF SELECTCOM == 14 && TEQUIP:14$/m] },
      {
        src: K0,
        ref: '1615-1646',
        any: [/^IF SELECTCOM == 14 && TEQUIP:14$/m],
      },
      { src: K0, ref: '1617-1629', any: [/^\tIF CFLAG:315 == 0$/m] },
      {
        src: K0,
        ref: '1619-1620',
        any: [/请再夹紧一点…咿～！震起来了！？震起来了/],
      },
      {
        src: K0,
        ref: '1620',
        any: [/请再夹紧一点…咿～！震起来了！？震起来了/],
      },
      { src: K0, ref: '1622-1623', any: [/请再夹紧一点…咿～！震起来了～～/] },
      { src: K0, ref: '1623', any: [/请再夹紧一点…咿～！震起来了～～/] },
      { src: K0, ref: '1625-1626', any: [/不管用这种东西怎么折腾/] },
      { src: K0, ref: '1626', any: [/不管用这种东西怎么折腾/] },
      { src: K0, ref: '1628', any: [/^\t\tCFLAG:315 = 1$/m] },
      {
        src: K0,
        ref: '1630-1646',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:315 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1633-1635', any: [/把阴蒂玩到坏掉为止吧/] },
      { src: K0, ref: '1634', any: [/把阴蒂玩到坏掉为止吧/] },
      { src: K0, ref: '1635', any: [/^\t\t\tCFLAG:315 = 4$/m] },
      { src: K0, ref: '1637-1639', any: [/小阴蒂一颤一颤的…变的好奇怪/] },
      { src: K0, ref: '1638', any: [/小阴蒂一颤一颤的…变的好奇怪/] },
      { src: K0, ref: '1639', any: [/^\t\t\tCFLAG:315 = 3$/m] },
      { src: K0, ref: '1641-1643', any: [/不要震了…求求你不要再震了/] },
      { src: K0, ref: '1642', any: [/不要震了…求求你不要再震了/] },
      { src: K0, ref: '1643', any: [/^\t\t\tCFLAG:315 = 2$/m] },
      {
        src: K0,
        ref: '1648',
        any: [/^ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0$/m],
      },
      {
        src: K0,
        ref: '1648-1663',
        any: [/^ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0$/m],
      },
      { src: K0, ref: '1650-1652', any: [/还在麻麻的呢/] },
      { src: K0, ref: '1651', any: [/还在麻麻的呢/] },
      { src: K0, ref: '1652', any: [/^\t\tCFLAG:375 = 3$/m] },
      { src: K0, ref: '1654-1656', any: [/好像还想再被夹着呢/] },
      { src: K0, ref: '1655', any: [/好像还想再被夹着呢/] },
      { src: K0, ref: '1656', any: [/^\t\tCFLAG:375 = 2$/m] },
      { src: K0, ref: '1658-1660', any: [/「哈啊…哈啊…哈啊…呜呜～」/] },
      { src: K0, ref: '1659', any: [/「哈啊…哈啊…哈啊…呜呜～」/] },
      { src: K0, ref: '1660', any: [/^\t\tCFLAG:375 = 1$/m] },

      { src: K0, ref: '1669', any: [/^IF SELECTCOM == 15 && TEQUIP:15$/m] },
      {
        src: K0,
        ref: '1669-1722',
        any: [/^IF SELECTCOM == 15 && TEQUIP:15$/m],
      },
      { src: K0, ref: '1671-1694', any: [/^\tIF CFLAG:316 == 0$/m] },
      { src: K0, ref: '1673-1678', any: [/还有这样的色情道具呢/] },
      { src: K0, ref: '1674', any: [/还有这样的色情道具呢/] },
      { src: K0, ref: '1675', any: [/神情陶醉的看着器具夹到了乳头上/] },
      {
        src: K0,
        ref: '1677-1678',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: K0,
        ref: '1678',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: K0,
        ref: '1680-1685',
        any: [/请用这个色情的道具…来更多地欺负乳头吧/],
      },
      { src: K0, ref: '1681', any: [/请用这个色情的道具…来更多地欺负乳头吧/] },
      { src: K0, ref: '1682', any: [/莞然一笑、把胸部伸了出来/] },
      {
        src: K0,
        ref: '1684-1685',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      {
        src: K0,
        ref: '1685',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      { src: K0, ref: '1687-1691', any: [/即使是这样%SELF_CALL\(TARGET\)%也/] },
      { src: K0, ref: '1688', any: [/即使是这样%SELF_CALL\(TARGET\)%也/] },
      {
        src: K0,
        ref: '1690-1691',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: K0,
        ref: '1691',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      { src: K0, ref: '1693', any: [/^\t\tCFLAG:316 = 1$/m] },
      {
        src: K0,
        ref: '1695-1722',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      { src: K0, ref: '1698-1704', any: [/感觉全身心都变得淫荡起来了/] },
      { src: K0, ref: '1699', any: [/感觉全身心都变得淫荡起来了/] },
      { src: K0, ref: '1700', any: [/完全看不出聖女时期的清纯了/] },
      {
        src: K0,
        ref: '1702-1703',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: K0,
        ref: '1703',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      { src: K0, ref: '1704', any: [/^\t\t\tCFLAG:316 = 4$/m] },
      { src: K0, ref: '1706-1712', any: [/乳头好舒服…还要…我还要/] },
      { src: K0, ref: '1707', any: [/乳头好舒服…还要…我还要/] },
      { src: K0, ref: '1708', any: [/一被主人欺负…就会感觉到主人的爱呢/] },
      {
        src: K0,
        ref: '1710-1711',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: K0,
        ref: '1711',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      { src: K0, ref: '1712', any: [/^\t\t\tCFLAG:316 = 3$/m] },
      { src: K0, ref: '1714-1719', any: [/再这样下去的话…啊啊～～/] },
      { src: K0, ref: '1715', any: [/再这样下去的话…啊啊～～/] },
      {
        src: K0,
        ref: '1717-1718',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: K0,
        ref: '1718',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      { src: K0, ref: '1719', any: [/^\t\t\tCFLAG:316 = 2$/m] },
      {
        src: K0,
        ref: '1724',
        any: [/^ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0$/m],
      },
      {
        src: K0,
        ref: '1724-1739',
        any: [/^ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0$/m],
      },
      { src: K0, ref: '1726-1728', any: [/明明还想再用一会儿的/] },
      { src: K0, ref: '1727', any: [/明明还想再用一会儿的/] },
      { src: K0, ref: '1728', any: [/^\t\tCFLAG:376 = 3$/m] },
      { src: K0, ref: '1730-1732', any: [/乳头麻麻的…好厉害的感觉/] },
      { src: K0, ref: '1731', any: [/乳头麻麻的…好厉害的感觉/] },
      { src: K0, ref: '1732', any: [/^\t\tCFLAG:376 = 2$/m] },
      { src: K0, ref: '1734-1736', any: [/「咕呜嗯～…哈啊…哈啊…」/] },
      { src: K0, ref: '1735', any: [/「咕呜嗯～…哈啊…哈啊…」/] },
      { src: K0, ref: '1736', any: [/^\t\tCFLAG:376 = 1$/m] },

      {
        src: K0,
        ref: '1745-1800',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '1745',
        any: [/IF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16/m],
      },
      {
        src: K0,
        ref: '1747-1771',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '1749-1754',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '1750',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '1751',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1753-1754',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1754',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1756-1761',
        any: [
          /「啊啊～…小宝宝…好想让小宝宝来喝呢～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1757',
        any: [
          /「啊啊～…小宝宝…好想让小宝宝来喝呢～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1758',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1760-1761',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1761',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1763-1768',
        any: [/「住、住手…放过我吧…啊啊…不要啊啊………」/],
      },
      { src: K0, ref: '1764', any: [/「住、住手…放过我吧…啊啊…不要啊啊………」/] },
      {
        src: K0,
        ref: '1765',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1767-1768',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1768',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      { src: K0, ref: '1770', any: [/\	\	CFLAG:317\ =\ 1/m] },
      { src: K0, ref: '1771', any: [/;\	\	RETURN\ 0/m] },
      {
        src: K0,
        ref: '1772-1800',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1775-1781',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1776',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1777',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1779-1780',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1780',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      { src: K0, ref: '1781', any: [/\	\	\	CFLAG:317\ =\ 4/m] },
      {
        src: K0,
        ref: '1783-1789',
        any: [
          /「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1784',
        any: [
          /「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1785',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1787-1788',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1788',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      { src: K0, ref: '1789', any: [/\	\	\	CFLAG:317\ =\ 3/m] },
      { src: K0, ref: '1791-1797', any: [/「讨厌…讨厌…不要搾啊～…嗯！」/] },
      { src: K0, ref: '1792', any: [/「讨厌…讨厌…不要搾啊～…嗯！」/] },
      {
        src: K0,
        ref: '1793',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: K0,
        ref: '1795-1796',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: K0,
        ref: '1796',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      { src: K0, ref: '1797', any: [/\	\	\	CFLAG:317\ =\ 2/m] },
      {
        src: K0,
        ref: '1802',
        any: [/ELSEIF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16\ ==\ 0/m],
      },
      {
        src: K0,
        ref: '1802-1820',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: K0,
        ref: '1804-1807',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: K0,
        ref: '1805',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: K0,
        ref: '1806',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      { src: K0, ref: '1807', any: [/\	\	CFLAG:377\ =\ 3/m] },
      {
        src: K0,
        ref: '1809-1812',
        any: [/「啊啊～…哇、%SELF_CALL\(TARGET\)%的奶汁…♪」/],
      },
      {
        src: K0,
        ref: '1810',
        any: [/「啊啊～…哇、%SELF_CALL\(TARGET\)%的奶汁…♪」/],
      },
      {
        src: K0,
        ref: '1811',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      { src: K0, ref: '1812', any: [/\	\	CFLAG:377\ =\ 2/m] },
      { src: K0, ref: '1814-1817', any: [/「呜…呜呜…奶汁…不要再出来了………」/] },
      { src: K0, ref: '1815', any: [/「呜…呜呜…奶汁…不要再出来了………」/] },
      {
        src: K0,
        ref: '1816',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      { src: K0, ref: '1817', any: [/\	\	CFLAG:377\ =\ 1/m] },
      {
        src: K0,
        ref: '1869',
        any: [/IF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19/m],
      },
      {
        src: K0,
        ref: '1869-1942',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1871-1892',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1873-1877',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1874',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1876-1877',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%很有感觉地唤出声来………/,
        ],
      },
      {
        src: K0,
        ref: '1877',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%很有感觉地唤出声来………/,
        ],
      },
      {
        src: K0,
        ref: '1879-1883',
        any: [/「没、没事的…再来…全部塞进去吧…♪」/],
      },
      { src: K0, ref: '1880', any: [/「没、没事的…再来…全部塞进去吧…♪」/] },
      {
        src: K0,
        ref: '1882-1883',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: K0,
        ref: '1883',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: K0,
        ref: '1885-1889',
        any: [/「啊～、咿～～！？不行…不可能全部塞进去啊………」/],
      },
      {
        src: K0,
        ref: '1886',
        any: [/「啊～、咿～～！？不行…不可能全部塞进去啊………」/],
      },
      {
        src: K0,
        ref: '1888-1889',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴了起来………/,
        ],
      },
      {
        src: K0,
        ref: '1889',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴了起来………/,
        ],
      },
      { src: K0, ref: '1891', any: [/\	\	CFLAG:TARGET:320\ =\ 1/m] },
      {
        src: K0,
        ref: '1893-1942',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1896-1902',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1897',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1898',
        any: [/%SAVESTR:TARGET%由于肛门的快楽整个脑子都爽的要融化了似的………/],
      },
      {
        src: K0,
        ref: '1900-1901',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%反复厮磨着………/,
        ],
      },
      {
        src: K0,
        ref: '1901',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%反复厮磨着………/,
        ],
      },
      { src: K0, ref: '1902', any: [/\	\	\	CFLAG:320\ =\ 7/m] },
      {
        src: K0,
        ref: '1904-1909',
        any: [
          /「再来…再继续欺负我吧…让%SELF_CALL\(TARGET\)%的屁股眼变的更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1905',
        any: [
          /「再来…再继续欺负我吧…让%SELF_CALL\(TARGET\)%的屁股眼变的更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1907-1908',
        any: [
          /%SAVESTR:TARGET%还很鈍感的肛门被肛珠全部塞了进去、%SAVESTR:TARGET%好像很开心的摇着屁股作为回应………/,
        ],
      },
      {
        src: K0,
        ref: '1908',
        any: [
          /%SAVESTR:TARGET%还很鈍感的肛门被肛珠全部塞了进去、%SAVESTR:TARGET%好像很开心的摇着屁股作为回应………/,
        ],
      },
      { src: K0, ref: '1909', any: [/\	\	\	CFLAG:320\ =\ 6/m] },
      {
        src: K0,
        ref: '1911-1917',
        any: [/「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」/],
      },
      {
        src: K0,
        ref: '1912',
        any: [/「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」/],
      },
      {
        src: K0,
        ref: '1913',
        any: [/%SAVESTR:TARGET%不像话地张开嘴、发出快乐的呻吟………/],
      },
      {
        src: K0,
        ref: '1915-1916',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: K0,
        ref: '1916',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      { src: K0, ref: '1917', any: [/\	\	\	CFLAG:320\ =\ 5/m] },
      {
        src: K0,
        ref: '1919-1924',
        any: [/「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」/],
      },
      {
        src: K0,
        ref: '1920',
        any: [/「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」/],
      },
      {
        src: K0,
        ref: '1922-1923',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%皱着眉头发出好像很痛苦的声音………/,
        ],
      },
      {
        src: K0,
        ref: '1923',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%皱着眉头发出好像很痛苦的声音………/,
        ],
      },
      { src: K0, ref: '1924', any: [/\	\	\	CFLAG:320\ =\ 4/m] },
      {
        src: K0,
        ref: '1926-1932',
        any: [/「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」/],
      },
      {
        src: K0,
        ref: '1927',
        any: [/「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」/],
      },
      {
        src: K0,
        ref: '1928',
        any: [/%SAVESTR:TARGET%不像话地张开嘴发出下流的声音………/],
      },
      {
        src: K0,
        ref: '1930-1931',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: K0,
        ref: '1931',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      { src: K0, ref: '1932', any: [/\	\	\	CFLAG:320\ =\ 3/m] },
      {
        src: K0,
        ref: '1934-1939',
        any: [/「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」/],
      },
      {
        src: K0,
        ref: '1935',
        any: [/「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」/],
      },
      {
        src: K0,
        ref: '1937-1938',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴起来………/,
        ],
      },
      {
        src: K0,
        ref: '1938',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴起来………/,
        ],
      },
      { src: K0, ref: '1939', any: [/\	\	\	CFLAG:320\ =\ 2/m] },
      {
        src: K0,
        ref: '1944',
        any: [/ELSEIF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\ ==\ 0/m],
      },
      {
        src: K0,
        ref: '1944-1963',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1946-1948',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '1947',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      { src: K0, ref: '1948', any: [/\	\	CFLAG:379\ =\ 4/m] },
      { src: K0, ref: '1950-1952', any: [/「咕呜嗯～…啊哈…被撑的好宽啊…♪」/] },
      { src: K0, ref: '1951', any: [/「咕呜嗯～…啊哈…被撑的好宽啊…♪」/] },
      { src: K0, ref: '1952', any: [/\	\	CFLAG:379\ =\ 3/m] },
      {
        src: K0,
        ref: '1954-1956',
        any: [/「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」/],
      },
      {
        src: K0,
        ref: '1955',
        any: [/「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」/],
      },
      { src: K0, ref: '1956', any: [/\	\	CFLAG:379\ =\ 2/m] },
      { src: K0, ref: '1958-1960', any: [/「呀呜呜～…啊、啊啊…」/] },
      { src: K0, ref: '1959', any: [/「呀呜呜～…啊、啊啊…」/] },
      { src: K0, ref: '1960', any: [/\	\	CFLAG:379\ =\ 1/m] },
      { src: K0, ref: '1968-2210', any: [/^IF SELECTCOM == 20$/m] },
      { src: K0, ref: '1968', any: [/IF\ SELECTCOM\ ==\ 20/m] },
      { src: K0, ref: '1970', any: [/\	IF\ CFLAG:TARGET:321\ ==\ 0/m] },
      { src: K0, ref: '1972', any: [/\	\	IF\ TALENT:0\ ==\ 1/m] },
      { src: K0, ref: '1974', any: [/\	\	\	IF\ TALENT:76\ ==\ 1/m] },
      {
        src: K0,
        ref: '1975',
        any: [
          /「啊啊…主人～…真的好开心…能为淫乱的%SAVESTR:TARGET%亲自破开处女膜～%UNICOD/,
        ],
      },
      {
        src: K0,
        ref: '1976',
        any: [
          /%SAVESTR:TARGET%自己把两腿张开让%SAVESTR:PLAYER%的大鸡鸡插了进来。/,
        ],
      },
      {
        src: K0,
        ref: '1977',
        any: [/「啊…呜…啊啊啊～～！进来啦～！主人的肉棒进来啦～！」/],
      },
      {
        src: K0,
        ref: '1978',
        any: [
          /「虽然有点痛…不过完全可以忍受…因为主人火热的大鸡鸡～…插进里面实在是太舒服了啊～%UNICODE\(/,
        ],
      },
      { src: K0, ref: '1980', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      {
        src: K0,
        ref: '1981',
        any: [
          /%SAVESTR:TARGET%用两腿紧紧的挟住%SAVESTR:PLAYER%的腰发出了快活的呻吟/,
        ],
      },
      {
        src: K0,
        ref: '1982',
        any: [/%SAVESTR:TARGET%与故郷的恋人相比选择了大鸡鸡的样子。/],
      },
      {
        src: K0,
        ref: '1983',
        any: [
          /「好爽～好爽～好爽！ 被大鸡鸡弄得好爽啊～！已经…離不开它了～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '1984-1985',
        any: [
          /%SAVESTR:TARGET%用两腿紧紧的挟住%SAVESTR:PLAYER%的腰发出了快活的呻吟/,
        ],
      },
      {
        src: K0,
        ref: '1988',
        any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ ABL:10\ >=\ 5/m],
      },
      {
        src: K0,
        ref: '1989',
        any: [
          /「是…拜托了…主人…请把%SELF_CALL\(TARGET\)%重要的东西…夺走吧…♪」/,
        ],
      },
      {
        src: K0,
        ref: '1990',
        any: [
          /%SAVESTR:TARGET%有点害羞的把两腿张开、把%SAVESTR:PLAYER%的大鸡鸡放了/,
        ],
      },
      {
        src: K0,
        ref: '1991',
        any: [
          /「嗯嗯～！…咕…呜啊…哈啊…哈啊…没关系的、这种程度没问题的…啊啊～！」/,
        ],
      },
      {
        src: K0,
        ref: '1992',
        any: [/%SAVESTR:TARGET%一边忍受着破瓜的苦痛一边回应着你的欲望………/],
      },
      { src: K0, ref: '1994', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      {
        src: K0,
        ref: '1995',
        any: [
          /（啊啊…%SELF_CALL\(TARGET\)%的…真命天子是…魔王大人………%UNICODE\(0x2/,
        ],
      },
      {
        src: K0,
        ref: '1996',
        any: [/%SAVESTR:TARGET%在心中已经把故郷的恋人给忘掉了的样子………/],
      },
      {
        src: K0,
        ref: '1999-2000',
        any: [/「求、求你了…再…温柔一点…啊～…咿～～…！」/],
      },
      {
        src: K0,
        ref: '2001',
        any: [/%SAVESTR:TARGET%被压在身上侵犯了、因为破瓜的痛楚而哭出声来………/],
      },
      { src: K0, ref: '2003', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      {
        src: K0,
        ref: '2004',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%…明明想把贞洁…献给那个人的…啊～…啊啊～！」/,
        ],
      },
      {
        src: K0,
        ref: '2005',
        any: [/%SAVESTR:TARGET%想起故郷的恋人、更加伤心的哭了起来………/],
      },
      { src: K0, ref: '2009-2011', any: [/\	\	ELSE/m] },
      {
        src: K0,
        ref: '2012',
        any: [
          /「主人～%UNICODE\(0x2661\) \*1%…紧紧地抱住我吧…让我们一起变的非常非常的快活吧%U/,
        ],
      },
      {
        src: K0,
        ref: '2015',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被調教出了快感、很愉快的吞下了%SAVESTR:PLAYE/,
        ],
      },
      { src: K0, ref: '2017', any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m] },
      {
        src: K0,
        ref: '2018',
        any: [
          /「用这种姿势做的话…总觉得心跳不已呢…啊、讨、讨厌、%SELF_CALL\(TARGET\)%…为什么要/,
        ],
      },
      {
        src: K0,
        ref: '2019',
        any: [/%SAVESTR:TARGET%害羞的把脸埋进你的胸口………/],
      },
      {
        src: K0,
        ref: '2022',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了%SAVESTR:PLA/,
        ],
      },
      {
        src: K0,
        ref: '2024-2025',
        any: [/「咕～…请、请不要看我的脸…哈咕呜～！」/],
      },
      {
        src: K0,
        ref: '2026',
        any: [/%SAVESTR:TARGET%一被插入就紧紧闭上眼睛嘴巴都歪了………/],
      },
      {
        src: K0,
        ref: '2029',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、使她而由于被挿入的異物感而皱起了眉头。%S/,
        ],
      },
      { src: K0, ref: '2032-2033', any: [/\	\	CFLAG:321\ =\ 1/m] },
      { src: K0, ref: '2035-2038', any: [/\	ELSE/m] },
      { src: K0, ref: '2039', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2040',
        any: [
          /「肉棒好棒～%UNICODE\(0x2661\) \*1%…好棒哦～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '2041',
        any: [
          /%SAVESTR:TARGET%下流淫猥的声音在耳边回响着、如果是认识她的人听到的话一定会怀疑自己的/,
        ],
      },
      {
        src: K0,
        ref: '2042',
        any: [
          /「啊啊～…好棒～好棒～%UNICODE\(0x2661\) \*1%…再来～…疯狂地～…把精液滚滚地射进来/,
        ],
      },
      {
        src: K0,
        ref: '2043',
        any: [
          /%SAVESTR:TARGET%用手脚缠住%SAVESTR:PLAYER%反复的接吻并被持续被侵犯着/,
        ],
      },
      { src: K0, ref: '2044', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2045',
        any: [
          /「啊～…啊啊啊～%UNICODE\(0x2661\) \*1%…要疯了～…要疯了啊～…咿～…咿～…要被肉棒/,
        ],
      },
      {
        src: K0,
        ref: '2046',
        any: [
          /%SAVESTR:TARGET%被抽插着阴道深处痛的唤出声来、抱住了%SAVESTR:PLAYER%/,
        ],
      },
      {
        src: K0,
        ref: '2047',
        any: [
          /「%SELF_CALL\(TARGET\)%…已、已经…变的不被操小穴…就活不下去了～%UNICODE\(/,
        ],
      },
      {
        src: K0,
        ref: '2048-2049',
        any: [
          /「请再…再用力操我的小穴吧%UNICODE\(0x2661\) \*1%…请用持久不倒的出色的大鸡鸡来操我/,
        ],
      },
      {
        src: K0,
        ref: '2050',
        any: [
          /「已经…除了这个什么也不想了…小穴…再狠狠地操小穴吧…疯狂地操我吧～！」/,
        ],
      },
      {
        src: K0,
        ref: '2051',
        any: [
          /%SAVESTR:TARGET%用两脚勾住%SAVESTR:PLAYER%的腰、像动物似的娇喘起来…/,
        ],
      },
      { src: K0, ref: '2053', any: [/\	\	\	CFLAG:321\ =\ 9/m] },
      {
        src: K0,
        ref: '2055',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2056', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2057',
        any: [
          /「对、对不起…%SELF_CALL\(TARGET\)%…一被大鸡鸡插进来就…已…经、要…不行…了～%U/,
        ],
      },
      {
        src: K0,
        ref: '2058',
        any: [
          /%SAVESTR:TARGET%像中毒患者似的牙齿不停地打着冷战并抱紧了%SAVESTR:PLAYE/,
        ],
      },
      {
        src: K0,
        ref: '2059',
        any: [
          /「嗯哦…啊啊…来～…吧～…動起来吧～…%SELF_CALL\(TARGET\)%的小穴～%UNICODE/,
        ],
      },
      {
        src: K0,
        ref: '2060',
        any: [
          /如果是過去认识%SAVESTR:TARGET%的人听到这些下流的话肯定会以为自己耳朵出问题了、%SA/,
        ],
      },
      { src: K0, ref: '2061', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2062',
        any: [
          /「啊～…啊啊～…已、已经…分不清…是喜欢主人…还是喜欢大鸡鸡了%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '2063',
        any: [
          /%SAVESTR:TARGET%被大鸡鸡插入阴道深处奄奄一息地痙攣着并紧紧地缠住大鸡鸡。/,
        ],
      },
      {
        src: K0,
        ref: '2064',
        any: [
          /「还要、还要…求求你…弄…弄壊也没事～…抱我～%UNICODE\(0x2661\) \*1% 爱我～%UN/,
        ],
      },
      {
        src: K0,
        ref: '2065-2066',
        any: [/「求你了…不要把大鸡鸡抜出来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2067',
        any: [
          /%SAVESTR:TARGET%用双手搂住%SAVESTR:PLAYER%的脖子含情脉脉地抱住了%S/,
        ],
      },
      {
        src: K0,
        ref: '2068',
        any: [
          /「想永远感受着你的大鸡鸡～%UNICODE\(0x2661\) \*1%…请尽情的把我干的一塌糊涂吧…%U/,
        ],
      },
      { src: K0, ref: '2070', any: [/\	\	\	CFLAG:321\ =\ 8/m] },
      {
        src: K0,
        ref: '2072',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2073', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2074',
        any: [
          /「啊咿～…继续…侵犯我…请继续侵犯我吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2075',
        any: [
          /「小穴没被大肉棒插进去的话…就要发疯了啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2076',
        any: [
          /已经完全变成性爱狂的%SAVESTR:TARGET%用脚缠住%SAVESTR:PLAYER%的腰舍不/,
        ],
      },
      { src: K0, ref: '2077', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2078',
        any: [/「小穴～…小穴还要～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2079',
        any: [
          /「请用大肉棒尽情地蹂躏小穴吧～…子宮的里面也…用、精液填满吧～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '2080',
        any: [
          /已经不会再去考虑做爱之外的事情的%SAVESTR:TARGET%一边流着口水一边不断地说着下流的话…/,
        ],
      },
      {
        src: K0,
        ref: '2081-2082',
        any: [
          /「哈啊～…啊～啊啊啊～…继续…继续干我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2083',
        any: [/「已经…除了小穴其他什么也不想了～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2084',
        any: [
          /%SAVESTR:TARGET%看起来已经没法再考虑做爱之外的事情了、她堕落的脸上已经再也找不到一丝/,
        ],
      },
      { src: K0, ref: '2086', any: [/\	\	\	CFLAG:321\ =\ 7/m] },
      {
        src: K0,
        ref: '2088',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2089', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2090',
        any: [
          /「啊啊啊～…大肉棒…在里面～…%UNICODE\(0x2661\) \*1% 咿～啊～…啊啊啊～%UNIC/,
        ],
      },
      {
        src: K0,
        ref: '2092',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2093',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%的小穴里…变成大肉棒的形状了～…%UNICODE\(0/,
        ],
      },
      {
        src: K0,
        ref: '2094',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2095',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      { src: K0, ref: '2097', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2098',
        any: [
          /「咕～…啊～…啊啊啊～………呐…还想再要…大鸡鸡啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2099',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: K0,
        ref: '2100-2101',
        any: [
          /「再来…像禽兽一样的插进来…继续侵犯%SELF_CALL\(TARGET\)%吧～%UNICODE\(0x/,
        ],
      },
      {
        src: K0,
        ref: '2102',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      { src: K0, ref: '2104', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2105',
        any: [
          /「继续侵犯我吧～…%UNICODE\(0x2661\) \*1% 想要被操到小穴变形啊～%UNICODE\(/,
        ],
      },
      {
        src: K0,
        ref: '2107',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2108',
        any: [
          /「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2109',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2110',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      { src: K0, ref: '2112', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2113',
        any: [/「呜咕呜～…进来了…进来了～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2114',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: K0,
        ref: '2115-2116',
        any: [
          /「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2117',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: K0,
        ref: '2119-2120',
        any: [
          /「啊～啊啊～哈呜呜～…和主人做爱被操着小穴感觉格外的舒服呢～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2121',
        any: [
          /「早知道是这么快乐这么舒服的事情的话…真想更早一点的体验到呢…%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '2123',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2124',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2125',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      { src: K0, ref: '2127', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2128',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: K0,
        ref: '2129-2130',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      { src: K0, ref: '2133', any: [/\	\	\	CFLAG:321\ =\ 6/m] },
      {
        src: K0,
        ref: '2135',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2136', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2137',
        any: [
          /「啊啊…请更多的疼爱我…啊～…嗯～…这样…真舒服～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2139',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2140',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2141',
        any: [
          /「主人能这样疼爱我并教会我如此愉悦的事情…真是…感激…不尽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2142',
        any: [/%SAVESTR:TARGET%好像很舒服的仰起下巴、呼了口气………/],
      },
      { src: K0, ref: '2144', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2145',
        any: [/「啊啊…呜、好深…好深啊………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2146',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2147',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: K0,
        ref: '2148-2149',
        any: [
          /「啊啊…被爱着的愉悦…真美妙…%UNICODE\(0x2661\) \*1% 啊～…啊啊～…又插的…更深了/,
        ],
      },
      {
        src: K0,
        ref: '2150',
        any: [/%SAVESTR:TARGET%每当被插进阴道深处就会发出娇喘声………/],
      },
      { src: K0, ref: '2152', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2153',
        any: [/「哈啊…啊啊～…嗯～…再用力…抱我～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2155',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2156',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2157',
        any: [
          /「好棒～…这样好棒～…%UNICODE\(0x2661\) \*1% 啊啊～…请让我变得更舒服吧…%UNI/,
        ],
      },
      {
        src: K0,
        ref: '2158',
        any: [
          /%SAVESTR:TARGET%脉脉含情地在%SAVESTR:PLAYER%的耳边轻声说着并发出了娇/,
        ],
      },
      { src: K0, ref: '2160', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2161',
        any: [/「哈咕呜～…啊、啊啊啊…求…求你了…再…温柔一点…啊呜～！」/],
      },
      {
        src: K0,
        ref: '2162',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2163',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: K0,
        ref: '2164-2165',
        any: [
          /「还想…还想更多地感受着主人～…所以…所以～…啊～…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2166',
        any: [
          /%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………/,
        ],
      },
      {
        src: K0,
        ref: '2168-2169',
        any: [/「那、那个…再…再激烈一点也可以哦…咿呀～～♪」/],
      },
      {
        src: K0,
        ref: '2170',
        any: [
          /「是、是的…对不起…我会老实说的！…还想…还想和你一起变的更舒服呢………%UNICODE\(0x266/,
        ],
      },
      {
        src: K0,
        ref: '2172',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2173',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: K0,
        ref: '2174',
        any: [
          /%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………/,
        ],
      },
      { src: K0, ref: '2176', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2177',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2178',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: K0,
        ref: '2179-2180',
        any: [/%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼撒娇………/],
      },
      { src: K0, ref: '2183', any: [/\	\	\	CFLAG:321\ =\ 5/m] },
      {
        src: K0,
        ref: '2185',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:321\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: K0,
        ref: '2186',
        any: [
          /「咕呜～…呜呜～！啊～啊啊啊啊！再、再这样下去的话…%SELF_CALL_FIRST\(TARGET\)/,
        ],
      },
      {
        src: K0,
        ref: '2187',
        any: [/「真的…不行了…要不行了啊…明明是被侵犯…竟然会这么的…啊啊～！」/],
      },
      {
        src: K0,
        ref: '2190',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快的吞下了%SAVESTR:PL/,
        ],
      },
      { src: K0, ref: '2191', any: [/\	\	\	CFLAG:321\ =\ 4/m] },
      {
        src: K0,
        ref: '2193',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:321\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: K0,
        ref: '2194',
        any: [/「啊咕～…啊呜唔～♪…没、没事的…请随意动起来吧…啊啊～」/],
      },
      {
        src: K0,
        ref: '2197',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。%SAV/,
        ],
      },
      { src: K0, ref: '2198', any: [/\	\	\	CFLAG:321\ =\ 3/m] },
      {
        src: K0,
        ref: '2200',
        any: [/\	\	ELSEIF\ CFLAG:321\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/m],
      },
      { src: K0, ref: '2201', any: [/「啊～…呜…咕～…哈咕～！…呜呜呜～！」/] },
      { src: K0, ref: '2202', any: [/%SAVESTR:TARGET%咬牙忍受着鈍痛感………/] },
      {
        src: K0,
        ref: '2205',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。%SAV/,
        ],
      },
      { src: K0, ref: '2206-2208', any: [/\	\	\	CFLAG:321\ =\ 2/m] },
      { src: K0, ref: '2215', any: [/IF\ SELECTCOM\ ==\ 21/m] },
      { src: K0, ref: '2215-2416', any: [/^IF SELECTCOM == 21$/m] },
      { src: K0, ref: '2217', any: [/\	IF\ CFLAG:TARGET:322\ ==\ 0/m] },
      { src: K0, ref: '2219', any: [/\	\	IF\ TALENT:0\ ==\ 1/m] },
      { src: K0, ref: '2221', any: [/\	\	\	IF\ TALENT:76\ ==\ 1/m] },
      {
        src: K0,
        ref: '2222',
        any: [/%SAVESTR:TARGET%用跪坐的姿势并把头贴在地上、将屁股高高抬起。/],
      },
      {
        src: K0,
        ref: '2223',
        any: [
          /「能被您夺走%SELF_CALL\(TARGET\)%的第一次……我从心底表示感謝～%UNICODE\(0/,
        ],
      },
      {
        src: K0,
        ref: '2224',
        any: [/%SAVESTR:PLAYER%抓住她的腰毫不犹豫的把肉棒插进了阴道深处。/],
      },
      {
        src: K0,
        ref: '2225',
        any: [/途中感到穿破了处女膜。肉棒一进入深处就被温热的阴道壁紧紧包住。/],
      },
      {
        src: K0,
        ref: '2226',
        any: [
          /「呀啊呜唔～…淫乱的处女膜被弄破了～…啊啊～…好开心～好开心啊～！」/,
        ],
      },
      { src: K0, ref: '2228', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      {
        src: K0,
        ref: '2229',
        any: [
          /%SAVESTR:TARGET%比起故郷的恋人而选择了能为自己带来无限快乐的鸡鸡的样子。/,
        ],
      },
      {
        src: K0,
        ref: '2230',
        any: [
          /「嗯～♪…%SELF_CALL\(TARGET\)%的恋人是…世界上所有的大鸡鸡～…不过最喜欢的是现在插/,
        ],
      },
      { src: K0, ref: '2233', any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m] },
      {
        src: K0,
        ref: '2234',
        any: [
          /「从、从后面来吗…没、没事的…那、那个请温柔一点…咿呀啊啊～～！」/,
        ],
      },
      {
        src: K0,
        ref: '2235',
        any: [
          /%SAVESTR:PLAYER%向%SAVESTR:TARGET%发出了决定性的一击将阴茎插进了阴道/,
        ],
      },
      {
        src: K0,
        ref: '2236',
        any: [/途中感到穿破了处女膜。%SAVESTR:TARGET%禁不住悲鳴起来。/],
      },
      {
        src: K0,
        ref: '2237',
        any: [
          /「啊～啊咿～～～！…总觉得～…这样好像和动物似的呢…好棒～…好棒啊～♪」/,
        ],
      },
      { src: K0, ref: '2239', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      {
        src: K0,
        ref: '2240',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%是…魔王大人的所有物～…絶対不会背离的%UNICOD/,
        ],
      },
      {
        src: K0,
        ref: '2241',
        any: [/%SAVESTR:TARGET%的脑海里已经把故郷的恋人完全忘掉了的样子………/],
      },
      {
        src: K0,
        ref: '2244-2245',
        any: [/「这、这种像动物一般的姿势…咕呜…呜呜～…啊～啊啊啊啊啊～！」/],
      },
      { src: K0, ref: '2247', any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m] },
      { src: K0, ref: '2248', any: [/「啊啊～…对不起…对不起～…呜呜～！」/] },
      {
        src: K0,
        ref: '2249',
        any: [/%SAVESTR:TARGET%想起故郷的恋人、流下了眼泪………/],
      },
      { src: K0, ref: '2253-2255', any: [/\	\	ELSE/m] },
      {
        src: K0,
        ref: '2256',
        any: [
          /「是～…请尽管从后面来吧%UNICODE\(0x2661\) \*1%　哈啊～～…果然被侵犯真是最棒了～%/,
        ],
      },
      { src: K0, ref: '2257', any: [/「再来啊…把我侵犯到坏掉吧～！」/] },
      {
        src: K0,
        ref: '2260',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被调教出了快感、很愉快的吞下了从后面插进来的%SAVEST/,
        ],
      },
      { src: K0, ref: '2262', any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m] },
      { src: K0, ref: '2263', any: [/「啊～…这个姿势好害羞…不过………」/] },
      {
        src: K0,
        ref: '2264',
        any: [/「啊～啊啊啊～…！讨厌…明明很害羞却兴奋起来了～…♪」/],
      },
      { src: K0, ref: '2265', any: [/「更多…请更多的疼爱我吧…♪」/] },
      {
        src: K0,
        ref: '2268',
        any: [
          /%SAVESTR:TARGET%鈍感的私处经过開発觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: K0,
        ref: '2270-2271',
        any: [/「不要用这种像动物一样的姿势…这样…不行…啊啊啊～」/],
      },
      {
        src: K0,
        ref: '2274',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      { src: K0, ref: '2277-2278', any: [/\	\	CFLAG:322\ =\ 1/m] },
      { src: K0, ref: '2280-2282', any: [/\	ELSE/m] },
      { src: K0, ref: '2283', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2284',
        any: [
          /「嗯哈啊～啊～啊啊～咿啊啊啊～！%UNICODE\(0x2661\) \*1% 再用力插我～%UNICOD/,
        ],
      },
      {
        src: K0,
        ref: '2285',
        any: [
          /「还想再要大肉棒～%UNICODE\(0x2661\) \*1% 想要更多…更多的大肉棒啊～%UNICOD/,
        ],
      },
      { src: K0, ref: '2286', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2287',
        any: [
          /「已经…只要有大肉棒插进来的话…是谁都无所谓了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2288',
        any: [
          /%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰好像为了拍打屁股似的一次一次/,
        ],
      },
      {
        src: K0,
        ref: '2289',
        any: [
          /「啊咿呀啊～%UNICODE\(0x2661\) \*1% 好棒～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2290-2291',
        any: [
          /「嗯～嗯嗯～嗯～…啊呜唔呜…不要拔出来…不要把大肉棒拔出来…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2292',
        any: [/%SAVESTR:TARGET%淫荡的扭着屁股、向%SAVESTR:PLAYER%撒娇。/],
      },
      {
        src: K0,
        ref: '2293',
        any: [
          /「我已经…没有大肉棒…就活不去了～…呜啊…不要拔…啊～%UNICODE\(0x2661\) \*1%啊啊～/,
        ],
      },
      { src: K0, ref: '2295', any: [/\	\	\	CFLAG:322\ =\ 9/m] },
      {
        src: K0,
        ref: '2297',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2298', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2299',
        any: [/「啊啊～…再来～…再来啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2300',
        any: [/%SAVESTR:TARGET%用平常想象不出来的样子淫荡地扭着屁股。/],
      },
      {
        src: K0,
        ref: '2301',
        any: [
          /「好深…好棒～…主人…请再侵犯我的小穴吧…～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      { src: K0, ref: '2302', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2303',
        any: [
          /「%SELF_CALL\(TARGET\)%的屁股…小穴…都是为了取悦主人而存在的…%UNICODE\(0/,
        ],
      },
      {
        src: K0,
        ref: '2304',
        any: [/「所以…请尽管随意使用吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2305',
        any: [
          /%SAVESTR:TARGET%为了能让自己被更多的侵犯而用令人心神荡漾的声音向你撒娇………/,
        ],
      },
      {
        src: K0,
        ref: '2306-2307',
        any: [/「请更多地欺负我的小穴吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2308',
        any: [/「请在主人専用的小穴里用精液播种吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2309',
        any: [
          /已经完全陷落并沉溺于性爱的快乐中的%SAVESTR:TARGET%不知羞耻地淫荡地呻吟着………/,
        ],
      },
      { src: K0, ref: '2311', any: [/\	\	\	CFLAG:322\ =\ 8/m] },
      {
        src: K0,
        ref: '2313',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2314', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2315',
        any: [/「啊啊～…请再像…动物一样的操我吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2316',
        any: [/「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%已经是…/],
      },
      {
        src: K0,
        ref: '2317',
        any: [/每次抽送、%SAVESTR:TARGET%的私处都会溢出泡沫一样的爱液………/],
      },
      { src: K0, ref: '2318', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2319',
        any: [/「再…用力插…想被大肉棒塞得满满的～…%UNICODE\(0x2661\) \*1%」/],
      },
      { src: K0, ref: '2320', any: [/「已经…不会再去想做爱之外的事情了～…」/] },
      {
        src: K0,
        ref: '2321',
        any: [/%SAVESTR:TARGET%好像想被进一步侵犯似的高高抬起了屁股………/],
      },
      {
        src: K0,
        ref: '2322-2323',
        any: [
          /「不管被侵犯几次…都不会生厌…已经…不会去想…没有做爱的生活了～…」/,
        ],
      },
      {
        src: K0,
        ref: '2324',
        any: [/「所以～…更多更多地侵犯我吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2325',
        any: [
          /%SAVESTR:TARGET%像变成一只动物似的、连子宫口都臣服于做爱的快感中而敞开了………/,
        ],
      },
      { src: K0, ref: '2327', any: [/\	\	\	CFLAG:322\ =\ 7/m] },
      {
        src: K0,
        ref: '2329',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2330', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2331',
        any: [
          /「呀呜～！哈啊…啊啊～…咿呀～～！好爽啊～…随心所欲的叫床！要变成动物了～！」/,
        ],
      },
      {
        src: K0,
        ref: '2332',
        any: [/「咿呀～啊啊～…啊啊～…好喜欢！像动物一样的做爱好喜欢啊！」/],
      },
      { src: K0, ref: '2333', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2334',
        any: [
          /「啊～…啊啊～…好紧～！再来～…再使用%SELF_CALL\(TARGET\)%的身体吧…请尽情使用～%/,
        ],
      },
      {
        src: K0,
        ref: '2335',
        any: [
          /「%SAVESTR:TARGET%是非常喜欢被人从后面哧噗哧噗地侵犯的変態勇者啊～♪」/,
        ],
      },
      {
        src: K0,
        ref: '2336-2337',
        any: [/「啊～啊啊～…像动物一样的做爱好爽啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2338',
        any: [
          /「一被这样侵犯…就好像自己变成了最低等的动物似的…最棒…了～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: K0,
        ref: '2341',
        any: [/\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2342',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被调教出了快感、好像很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      { src: K0, ref: '2344', any: [/\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2345',
        any: [
          /虽然%SAVESTR:TARGET%的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子/,
        ],
      },
      { src: K0, ref: '2347', any: [/\	\	\	CFLAG:322\ =\ 6/m] },
      {
        src: K0,
        ref: '2349',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      { src: K0, ref: '2350', any: [/\	\	\	IF\ RAND:3\ ==\ 0/m] },
      {
        src: K0,
        ref: '2351',
        any: [/「啊啊～…啊～…好舒服～！请继续…侵犯我吧…！」/],
      },
      {
        src: K0,
        ref: '2352',
        any: [/「被你这样做是最…最舒服的事情了…咿呀～～…啊啊～…好开心…♪」/],
      },
      {
        src: K0,
        ref: '2354',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2355',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      { src: K0, ref: '2357', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2358',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2359',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      { src: K0, ref: '2361', any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m] },
      {
        src: K0,
        ref: '2362',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%的屁股就是为了像这样被主人侵犯而存在的呢…♪」/,
        ],
      },
      {
        src: K0,
        ref: '2363',
        any: [/「是～…直到主人満足为止…请把精液满满地注入进来吧♪」/],
      },
      {
        src: K0,
        ref: '2365',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2366',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      { src: K0, ref: '2368', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2369',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2370',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: K0,
        ref: '2372-2373',
        any: [
          /「哈啊～～…不要太过欺负%SELF_CALL\(TARGET\)%的小穴啊～…咿咿咿咿～！」/,
        ],
      },
      {
        src: K0,
        ref: '2374',
        any: [
          /%SAVESTR:PLAYER%抓住哀叫着的%SAVESTR:TARGET%的屁股、更加粗暴地往阴道/,
        ],
      },
      {
        src: K0,
        ref: '2375',
        any: [/%SAVESTR:TARGET%发出了格外尖厉的悲鸣声。/],
      },
      {
        src: K0,
        ref: '2377',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2378',
        any: [
          /「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: K0,
        ref: '2379',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、毫不间断的持续为%SAVESTR:TA/,
        ],
      },
      { src: K0, ref: '2381', any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2382',
        any: [
          /虽然%SAVESTR:TARGET%的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子/,
        ],
      },
      {
        src: K0,
        ref: '2383-2384',
        any: [
          /「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～%UNICODE\(0x2661\) \*1/,
        ],
      },
      { src: K0, ref: '2387', any: [/\	\	\	CFLAG:322\ =\ 5/m] },
      {
        src: K0,
        ref: '2389',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: K0,
        ref: '2390',
        any: [/「哈啊～…啊啊～啊～…啊啊～！不、不行…再这样被用力地做的话～…」/],
      },
      {
        src: K0,
        ref: '2391',
        any: [/「就、就会变的只知道…只知道大鸡鸡了啊～…啊啊啊～！」/],
      },
      {
        src: K0,
        ref: '2394',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      { src: K0, ref: '2395', any: [/\	\	\	CFLAG:322\ =\ 4/m] },
      {
        src: K0,
        ref: '2397',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: K0,
        ref: '2398',
        any: [
          /（啊啊…%SELF_CALL\(TARGET\)%竟然把屁股抬得这么高也能无动于衷…呜呜）/,
        ],
      },
      {
        src: K0,
        ref: '2399',
        any: [/%SAVESTR:TARGET%咬牙忍耐着并在阴道深处被侵犯时发出呻吟。/],
      },
      {
        src: K0,
        ref: '2400',
        any: [/「哈啊～…啊啊～啊～…啊啊～！…咕呜～…咿～…嗯～啊呜呜～！」/],
      },
      {
        src: K0,
        ref: '2403',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      { src: K0, ref: '2404', any: [/\	\	\	CFLAG:322\ =\ 3/m] },
      {
        src: K0,
        ref: '2406',
        any: [/\	\	ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/m],
      },
      {
        src: K0,
        ref: '2407',
        any: [
          /「这样…完全算不了什么…咦～…这不是像动物一样吗…？不、不对…你搞错了…吧」/,
        ],
      },
      {
        src: K0,
        ref: '2408',
        any: [/「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%是…人类/],
      },
      {
        src: K0,
        ref: '2411',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      { src: K0, ref: '2412-2414', any: [/\	\	\	CFLAG:322\ =\ 2/m] },
      { src: K0, ref: '2421', any: [/IF\ SELECTCOM\ ==\ 22/m] },
      { src: K0, ref: '2421-2585', any: [/^IF SELECTCOM == 22$/m] },
      { src: K0, ref: '2421', any: [/IF SELECTCOM == 22/m] },
      { src: K0, ref: '2422', any: [/\tIF CFLAG:TARGET:323 == 0/m] },
      { src: K0, ref: '2424', any: [/\t\tIF TALENT:0 == 1/m] },
      { src: K0, ref: '2426', any: [/\t\t\tIF TALENT:85 == 1/m] },
      { src: K0, ref: '2426-2427', any: [/IF TALENT:85 == 1/] },
      { src: K0, ref: '2429-2430', any: [/PRINTFORMW/] },
      { src: K0, ref: '2433-2435', any: [/\t\t\tIF TALENT:76 == 1/m] },
      {
        src: K0,
        ref: '2436',
        any: [/「嗯啾…啾～…嗯啾唔唔…啊啊啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2437',
        any: [
          /「一边和主人接吻…一边被操着小穴真是太棒了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2439-2440',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      { src: K0, ref: '2442', any: [/\t\t\tELSEIF TALENT:85 == 1/m] },
      {
        src: K0,
        ref: '2443',
        any: [/「啊～…呜啊～…呀呜～…不、不行了…被这样吻的话…啊～♪」/],
      },
      {
        src: K0,
        ref: '2444',
        any: [
          /「那个地方…太有感觉了～…咿呀～～啊～啊啊～…被插的快不行了啊～♪」/,
        ],
      },
      {
        src: K0,
        ref: '2446-2447',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2449-2450',
        any: [/「还能这样做啊…啊～～…啊～…啊呜～…再…温柔一点…」/],
      },
      { src: K0, ref: '2451', any: [/%SAVESTR:TARGET%有点生疏地动着腰………/] },
      { src: K0, ref: '2453-2454', any: [/\t\t\t\tSIF TALENT:TARGET:103/m] },
      { src: K0, ref: '2457-2458', any: [/\t\tCFLAG:323 = 1/m] },
      {
        src: K0,
        ref: '2460-2462',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      { src: K0, ref: '2463', any: [/\t\t\tIF RAND:3 == 0/m] },
      {
        src: K0,
        ref: '2464',
        any: [
          /「啊啊啊～…大肉棒插得好深…主人的大肉棒插得好深啊～%UNICODE\(0x2661\) \*1% 插进小穴的深处了～%UNICODE\(0x266/,
        ],
      },
      {
        src: K0,
        ref: '2465',
        any: [
          /%SAVESTR:TARGET%一边发出淫荡的娇喘声一边在%NAME:MASTER%的身上晃动着腰。/,
        ],
      },
      {
        src: K0,
        ref: '2466',
        any: [
          /「再多的～…让我感受大肉棒吧%UNICODE\(0x2661\) \*1% 把精液满满地射进来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      { src: K0, ref: '2467', any: [/\t\t\tELSEIF RAND:2 == 0/m] },
      {
        src: K0,
        ref: '2468',
        any: [
          /「啊～%UNICODE\(0x2661\) \*1% 啊啊～%UNICODE\(0x2661\) \*1%…主人的大肉棒～…全部插进来让%SELF_CA/,
        ],
      },
      {
        src: K0,
        ref: '2469',
        any: [
          /%SAVESTR:TARGET%用自己的双腿像蜘蛛一样缠住了%NAME:MASTER%的腰并自己剧烈地动起了腰。/,
        ],
      },
      {
        src: K0,
        ref: '2470',
        any: [
          /「嗯哈啊～～%UNICODE\(0x2661\) \*1%…这个肉棒好棒～！好棒啊～！…果然已经不能没有大肉棒了啊～%UNICODE\(0x2661/,
        ],
      },
      {
        src: K0,
        ref: '2471-2472',
        any: [
          /「啊啊啊啊～…大肉棒一进来…就、要、不行了…已经…什么事情都不想考虑了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2473',
        any: [
          /%SAVESTR:TARGET%的阴道深处被肉棒深深地插了进去、她的眼睛里已经完全失去了理性之光。/,
        ],
      },
      {
        src: K0,
        ref: '2474',
        any: [
          /「嗯咕呜呜嗯唔…啊～啊啊～啊哈啊啊～…哈啊啊…再插…再插吧～…要疯掉啦～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      { src: K0, ref: '2476', any: [/\t\t\tCFLAG:323 = 9/m] },
      {
        src: K0,
        ref: '2478',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      { src: K0, ref: '2479', any: [/\t\t\tIF RAND:3 == 0/m] },
      {
        src: K0,
        ref: '2480',
        any: [/「啊啊～…主人不用动也行哦～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2481',
        any: [/%SAVESTR:TARGET%用迷醉而荡漾的眼神看着你、自己开始动了起来。/],
      },
      {
        src: K0,
        ref: '2482',
        any: [
          /「这大鸡鸡全部都是%SELF_CALL\(TARGET\)%的～%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%/,
        ],
      },
      { src: K0, ref: '2483', any: [/\t\t\tELSEIF RAND:2 == 0/m] },
      {
        src: K0,
        ref: '2484',
        any: [
          /「嗯咕呜…啊～啊啊啊…好幸福～%UNICODE\(0x2661\) \*1%…感觉好幸福啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2485',
        any: [/%SAVESTR:TARGET%抱着%NAME:MASTER%不停地发出放荡的娇喘声。/],
      },
      {
        src: K0,
        ref: '2486',
        any: [
          /「%SELF_CALL\(TARGET\)%的小穴…已经变成主人的専用小穴了～%UNICODE\(0x2661\) \*1% 千万别拔出来哦～%UNI/,
        ],
      },
      {
        src: K0,
        ref: '2487-2488',
        any: [
          /「啊咿呀啊～…里面…贴在一起了%UNICODE\(0x2661\) \*1% 再紧点…再紧紧的抱住我～…不要拔～%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: K0,
        ref: '2489',
        any: [
          /按照%SAVESTR:TARGET%所说的紧紧顶住阴道口、她就在%SAVESTR:PLAYER%的耳边呼着灼热的气息。/,
        ],
      },
      {
        src: K0,
        ref: '2490',
        any: [
          /「哈啊…哈啊…请用%SELF_CALL\(TARGET\)%的淫荡小穴～…尽情享受吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      { src: K0, ref: '2492', any: [/\t\t\tCFLAG:323 = 8/m] },
      {
        src: K0,
        ref: '2494',
        any: [
          /\t\tELSEIF TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      { src: K0, ref: '2495', any: [/\t\t\tIF RAND:3 == 0/m] },
      {
        src: K0,
        ref: '2496',
        any: [
          /「啊啊～…还要…再来…再来～…欺负小穴吧～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2497',
        any: [/%SAVESTR:TARGET%抱住%NAME:MASTER%、秀眉因为快感而颤动不已。/],
      },
      {
        src: K0,
        ref: '2498',
        any: [/%SAVESTR:TARGET%已经除了做爱之外啥都不想了………/],
      },
      { src: K0, ref: '2499', any: [/\t\t\tELSEIF RAND:2 == 0/m] },
      {
        src: K0,
        ref: '2500',
        any: [/「动、动啊～…请再动吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2501',
        any: [
          /「我还想再要大肉棒～…真拿你没办法呢～…啊啊～…原谅我…原谅我～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2502',
        any: [
          /%SAVESTR:TARGET%一边不成体统的撒娇着一边自己摇着腰贪求着快楽………/,
        ],
      },
      {
        src: K0,
        ref: '2503-2504',
        any: [
          /「哈咿呀啊～%UNICODE\(0x2661\) \*1% 大肉棒%UNICODE\(0x2661\) \*1% 大肉棒～%UNICODE\(0x2661/,
        ],
      },
      {
        src: K0,
        ref: '2505',
        any: [
          /「小穴…已经…要不行啦～…啊啊～%UNICODE\(0x2661\) \*1% 啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2506',
        any: [/%SAVESTR:TARGET%不成体统的大张着嘴贪求着快楽………/],
      },
      { src: K0, ref: '2508', any: [/\t\t\tCFLAG:323 = 7/m] },
      {
        src: K0,
        ref: '2510',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      { src: K0, ref: '2511', any: [/\t\t\tIF RAND:3 == 0/m] },
      {
        src: K0,
        ref: '2512',
        any: [
          /「啾～啾～…嗯呜唔呜…喜欢…好喜欢…唔嗯…不管是做爱还是主人都好喜欢哦？」/,
        ],
      },
      {
        src: K0,
        ref: '2513',
        any: [
          /「竟然还有这么舒服的事情…多亏主人能告诉我真是太感謝了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2514',
        any: [/「所以～…再多多的和我做吧～%UNICODE\(0x2661\) \*1%」/],
      },
      { src: K0, ref: '2515', any: [/\t\t\tELSEIF RAND:2 == 0/m] },
      {
        src: K0,
        ref: '2516',
        any: [/「呀呜唔～…啊～啊啊～…请再用力插我～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: K0,
        ref: '2517',
        any: [/「呀～啊啊啊～…咕～…好紧～%UNICODE\(0x2665\) \*3%」/],
      },
      {
        src: K0,
        ref: '2518',
        any: [
          /「再…再贴紧一点～…好想被干到心醉神驰啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: K0,
        ref: '2519-2520',
        any: [/「哈呜～…啊啊～啊～…啊啊～～！喜欢～好喜欢～！」/],
      },
      {
        src: K0,
        ref: '2521',
        any: [/「大肉棒不要拿走～…好想一直这样下去～！不要走～！」/],
      },
      {
        src: K0,
        ref: '2524',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2525',
        any: [
          /%SAVESTR:TARGET%鈍感的私处经由调教开发获得了快感、持续不断地带给%SAVESTR:TARGET%淫靡的快感………/,
        ],
      },
      { src: K0, ref: '2527', any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2528',
        any: [
          /%SAVESTR:TARGET%的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡………/,
        ],
      },
      {
        src: K0,
        ref: '2529-2530',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      { src: K0, ref: '2532', any: [/\t\t\tCFLAG:323 = 6/m] },
      {
        src: K0,
        ref: '2534',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      { src: K0, ref: '2535', any: [/\t\t\tIF RAND:3 == 0/m] },
      { src: K0, ref: '2536', any: [/「哈啊～…啊～嗯～…请热烈地…亲我…♪」/] },
      {
        src: K0,
        ref: '2537',
        any: [/「一这样做…每次接吻…都感觉快要去了～…♪」/],
      },
      {
        src: K0,
        ref: '2538',
        any: [
          /「咿呀～～啊～啊啊～！再、再这样亲吻下去的话～…啊～啊～啊啊啊！」/,
        ],
      },
      { src: K0, ref: '2539', any: [/\t\t\tELSEIF RAND:2 == 0/m] },
      { src: K0, ref: '2540', any: [/「嗯啾～…啾～…噗啊～…」/] },
      {
        src: K0,
        ref: '2541',
        any: [
          /「%SELF_CALL\(TARGET\)%的身体…是为了和主人以爱结合才存在的～…额呵呵♪」/,
        ],
      },
      { src: K0, ref: '2542', any: [/%SAVESTR:TARGET%含情脉脉的看着你的脸。/] },
      { src: K0, ref: '2543-2544', any: [/「哈啊～…啊～啊啊啊～～！」/] },
      {
        src: K0,
        ref: '2545',
        any: [/「不要～…不要拔出来…再抱紧一点…不要拔出来～…♪」/],
      },
      {
        src: K0,
        ref: '2548',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: K0,
        ref: '2549',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、毫不间断的带给%SAVESTR:TARGET%甘美的快感………/,
        ],
      },
      { src: K0, ref: '2551', any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2552',
        any: [
          /%SAVESTR:TARGET%的私处不太容易有感觉、只有被%SAVESTR:PLAYER%抱了的事实在脑海中回荡………/,
        ],
      },
      {
        src: K0,
        ref: '2553-2554',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      { src: K0, ref: '2556', any: [/\t\t\tCFLAG:323 = 5/m] },
      {
        src: K0,
        ref: '2558',
        any: [
          /\t\tELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: K0,
        ref: '2559',
        any: [
          /「哈啊～…啊～咕呜～！…不要～…不要让紧紧黏在一起的小鸡鸡和小穴分开啊～…」/,
        ],
      },
      { src: K0, ref: '2561-2562', any: [/\t\t\tSIF TALENT:TARGET:103/m] },
      { src: K0, ref: '2563', any: [/\t\t\tCFLAG:323 = 4/m] },
      {
        src: K0,
        ref: '2565',
        any: [/\t\tELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      { src: K0, ref: '2567', any: [/\t\t\tIF TALENT:TARGET:103/m] },
      {
        src: K0,
        ref: '2568',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: K0,
        ref: '2569',
        any: [/「啊啊～啊～哈呜～………咕～……啊～啊啊～！」/],
      },
      {
        src: K0,
        ref: '2570',
        any: [/%SAVESTR:TARGET%忍耐着还是发出了痛苦的声音………/],
      },
      {
        src: K0,
        ref: '2571-2572',
        any: [/「啊啊～啊～哈呜～…为什么…不拔出来啊～？…啊～啊啊～！」/],
      },
      { src: K0, ref: '2574', any: [/\t\t\tCFLAG:323 = 3/m] },
      {
        src: K0,
        ref: '2576',
        any: [/\t\tELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2/m],
      },
      { src: K0, ref: '2577', any: [/「啊～啊啊…嗯～嗯呜唔～………」/] },
      { src: K0, ref: '2579-2580', any: [/\t\t\tSIF TALENT:TARGET:103/m] },
      { src: K0, ref: '2581', any: [/\t\t\tCFLAG:323 = 2/m] },
    ],
  },

  {
    js: 'ere/kojo/kojo-k3-noble.js',

    refs: [
      { src: K3, ref: '81-85', any: [/^@EVENTTRAIN$/m, /^FLAG:103 = 1$/m] },
      { src: K3, ref: '87-89', any: [/^@EVENTEND$/m, /^FLAG:103 = 0$/m] },
      { src: K3, ref: '887-1105', any: [/^@KOJO_MESSAGE_COM_3$/m] },
      {
        src: K3,
        ref: '888-892',
        any: [/死斗场中は専用口上/, /^\tCALL COLOSSEUM_KOJO_3$/m],
      },
      { src: K3, ref: '894-895', any: [/SIF ASSI > 0 && ASSIPLAY/] },
      { src: K3, ref: '897-898', any: [/SIF TEQUIP:45 && SELECTCOM != 45/] },
      { src: K3, ref: '900-901', any: [/SIF TFLAG:899/] },
      {
        src: K3,
        ref: '903-906',
        any: [/兽奸PLAY中は専用口上/, /^\tCALL DOG_KOJO_3$/m],
      },
      { src: K3, ref: '908-909', any: [/SIF TALENT:TARGET:9 == 1/] },
      { src: K3, ref: '911-912', any: [/SIF TEQUIP:90/] },
      { src: K3, ref: '920', any: [/^IF SELECTCOM == 0$/m] },
      { src: K3, ref: '921-931', any: [/^\tIF CFLAG:301 == 0$/m] },
      { src: K3, ref: '923-929', any: [/^\t\tIF MARK:2 >= 2$/m] },
      {
        src: K3,
        ref: '934-953',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 599 \|\| FLAG:7 == 2\)$/m,
          /^\t\t\tCFLAG:301 = 600$/m,
        ],
      },
      {
        src: K3,
        ref: '944',
        any: [/^\t\t\t\tPRINTFORML %SAVESTR:PLAYER%开始爱抚后、/],
      },
      {
        src: K3,
        ref: '955-975',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 499 \|\| FLAG:7 == 2\)$/m,
          /^\t\t\tCFLAG:301 = 500$/m,
        ],
      },
      { src: K3, ref: '959', any: [/每当被%NAME:MASTER%触摸后都会发出娇喘/] },
      {
        src: K3,
        ref: '977-1019',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:301 <= 399 \|\| FLAG:7 == 2\)$/m,
          /^\t\t\t\tCFLAG:301 = 403$/m,
        ],
      },
      {
        src: K3,
        ref: '982',
        any: [/SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的……身体/],
      },
      {
        src: K3,
        ref: '1013',
        any: [/%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET, 1\)%、已经……嗯嗯~！/],
      },
      {
        src: K3,
        ref: '1021-1050',
        any: [
          /^\t\tELSEIF MARK:2 == 2 && MARK:1 == 3 && \(CFLAG:301 <= 299 \|\| FLAG:7 == 2\)$/m,
          /^\t\t\t\tCFLAG:301 = 303$/m,
        ],
      },
      {
        src: K3,
        ref: '1052-1102',
        any: [
          /^\t\tELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)$/m,
          /^\t\t\t\tCFLAG:301 = 203$/m,
        ],
      },
      { src: K3, ref: '1067', any: [/^\t\t\t\tCFLAG:301 = 201$/m] },
      { src: K3, ref: '1091', any: [/^\t\t\t\tCFLAG:301 = 203$/m] },
      {
        src: K3,
        ref: '1097',
        any: [/哈呜、%SAVESTR:TARGET%、可是，一心地，想要杀了/],
      },
      { src: K3, ref: '1103', any: [/^\t\tRETURN 0$/m] },
      { src: K3, ref: '1105', any: [/^ENDIF$/m] },
    ],
  },
  {
    js: 'ere/kojo/kojo-k5-mao.js',
    refs: [
      { src: K5, ref: '80-84', any: [/^@EVENTTRAIN$/m, /^FLAG:105 = 1$/m] },
      { src: K5, ref: '86-88', any: [/^@EVENTEND$/m, /^FLAG:105 = 0$/m] },
      { src: K5, ref: '770-848', any: [/^@KOJO_MESSAGE_COM_5$/m] },
      {
        src: K5,
        ref: '771-793',
        any: [/SIF ASSI > 0 && ASSIPLAY/, /^\tCALL COLOSSEUM_KOJO_5$/m],
      },
      { src: K5, ref: '775-776', any: [/SIF TEQUIP:45 && SELECTCOM != 45/] },
      { src: K5, ref: '778-779', any: [/SIF TFLAG:899/] },
      {
        src: K5,
        ref: '781-782',
        any: [/獣姦プレイ中は口上をスキップする/, /SIF TEQUIP:89/],
      },
      { src: K5, ref: '784-785', any: [/SIF TEQUIP:90/] },
      {
        src: K5,
        ref: '787-790',
        any: [/コロシアム中は専用口上/, /^\tCALL COLOSSEUM_KOJO_5$/m],
      },
      { src: K5, ref: '792-793', any: [/SIF TALENT:TARGET:9 == 1/] },
      {
        src: K5,
        ref: '802-848',
        any: [/^IF SELECTCOM == 0$/m, /^\t\t\tCFLAG:301 = 6$/m],
      },
      { src: K5, ref: '803-814', any: [/^\tIF CFLAG:301 == 0$/m] },
      { src: K5, ref: '805-812', any: [/^\t\tIF MARK:2 >= 2$/m] },
      {
        src: K5,
        ref: '817-822',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K5,
        ref: '823-828',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K5,
        ref: '829-834',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K5,
        ref: '835-839',
        any: [
          /^\t\tELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: K5,
        ref: '840-844',
        any: [
          /^\t\tELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)$/m,
        ],
      },
    ],
  },
  {
    js: 'ere/kojo/kojo-dungeon-ravish.js',
    refs: [
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1-7', any: [/@RYOUZYOKU,ARG/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2-175', any: [/@RYOUZYOKU,ARG/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3', any: [/#DIM VIRGIN/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '4', any: [/#DIM MON_COUNT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '5', any: [/#DIM MON_FEAR/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '9', any: [/VIRGIN = TALENT:ARG:0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '11',
        any: [/PRINTFORML %SAVESTR:ARG%将被凌辱――/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '12', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '13', any: [/DRAWLINE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '14', any: [/IF 立绘/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '14-17',
        any: [/CALL CHA_IMG2\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '18', any: [/CALL SHOW_DATA\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '19', any: [/PRINTL/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '21-29',
        any: [/PRINTL \[0\] - 旁观凌辱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '21',
        any: [/PRINTL \[0\] - 旁观凌辱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '22',
        any: [/PRINTL \[1\] - 不要凌辱/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '23-29', any: [/\$INPUT_LOOP/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '24', any: [/INPUT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '26', any: [/GOTO INPUT_LOOP/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '28', any: [/GOTO INPUT_LOOP/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '31', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '34-54', any: [/MON_COUNT = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '35', any: [/MON_COUNT = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '36', any: [/MON_FEAR = 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '41-44',
        any: [/LOCAL = MON_COUNT \+ 99/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '41',
        any: [/LOCAL = MON_COUNT \+ 99/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '43-44',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '46',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '48', any: [/LOCAL:1 = E:MON_COUNT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '50',
        any: [/SIF CFLAG:ARG:130 == LOCAL:1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '51', any: [/MON_FEAR = MON_COUNT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '53', any: [/MON_COUNT \+= 100/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '57', any: [/TARGET = ARG/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '58',
        any: [/CALL DUNGEON_RYOUZYOKU/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '60-160', any: [/MON_COUNT = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '60', any: [/MON_COUNT = 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '62',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '63', any: [/LOCAL:1 = E:MON_COUNT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '65',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '67',
        any: [/CFLAG:ARG:130 = LOCAL:1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '68', any: [/MON_FEAR = LOCAL:1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '69', any: [/CFLAG:ARG:131 = 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '71',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '72', any: [/CFLAG:ARG:131\+\+/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '74',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '76', any: [/B = MON_COUNT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '77-156',
        any: [/CALL ORC_RYOU男,ARG/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '158', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '159', any: [/MON_COUNT \+= 100/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '162-166', any: [/TALENT:0 = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '163', any: [/TALENT:0 = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '164', any: [/PRINTL 【处女丧失】/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '165', any: [/CFLAG:15 = 104/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '168',
        any: [/CALL DUNGEON_RYOUZYOKU_AFTER/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '172',
        any: [/CALL DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '174', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '177-802', any: [/@ORC_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '177', any: [/@ORC_RYOU\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '179-183',
        any: [/PRINTW 『把这家伙绑起来…』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '181', any: [/;男人の場合/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '183',
        any: [/PRINTW 『把这家伙绑起来…』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '185-231', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '186-198',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '190-199',
        any: [/DATAFORM 『被俺侬的…肉棒…俘虏了啊』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '199-210',
        any: [/DATAFORM 『噗嘻嘻唏、俺侬的同类啦』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '204-213',
        any: [/DATAFORM 『延伸不错哟…』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '211-222',
        any: [/DATAFORM 『腚儿转过来』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '218-227',
        any: [/DATAFORM 『哦…又是…』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '224-236',
        any: [/DATAFORM 『又输了啊？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '232-242',
        any: [/DATAFORM 『这…这家伙…喔哦…』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '237-251',
        any: [/DATAFORM 『别挣扎了……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '246-256',
        any: [/DATAFORM 『女…女人…喔哦…』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '256',
        any: [/DATAFORM 『今天大伙运气不错，哈哈哈！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '261',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '263-275',
        any: [/PRINTW 『可恶！这家伙有封印！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '265',
        any: [/PRINTW 『可恶！这家伙有封印！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '266',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，一摸上去/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '267',
        any: [/PRINTFORMW 『行啊你！我就不信你把便便的洞也封住了！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '268',
        any: [/PRINTFORMW %SAVESTR:ARG%的另一个穴，被发泄了兽欲……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '269',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '270',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '271',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '272',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '273', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '274', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '277-391',
        any: [/PRINTFORML %SAVESTR:ARG%被一只兽人推倒，拼命抽插着，射满/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '280-283',
        any: [/DATAFORM 『你……是我的东西了…』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '285',
        any: [/PRINTFORML %SAVESTR:ARG%被一只兽人推倒，拼命抽插着，射满/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '286',
        any: [
          /PRINTL 她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '287', any: [/PRINTL 私处经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '288', any: [/PRINTL 精液经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '289', any: [/EXP:ARG:0 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '290', any: [/EXP:ARG:20 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '292-296',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '294',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '295',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '296',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '297',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '299',
        any: [/PRINTFORMW %SAVESTR:ARG%耷拉着头，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '302',
        any: [/PRINT 四肢着地趴在地上，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '304-308',
        any: [/PRINT 硬毛露了出来/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '305', any: [/PRINT 硬毛露了出来/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '307', any: [/PRINT 隐约看见了阴毛/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '310-318',
        any: [/PRINT 美丽的屁股从后露了出来/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '312',
        any: [/PRINT 美丽的屁股从后露了出来/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '315',
        any: [/PRINT 大的屁股从后露了出来/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '317',
        any: [/PRINT 屁股从后露了出来/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '320-326', any: [/PRINTDATA/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '321-325', any: [/DATAFORM 阴茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '328', any: [/PRINTL 便插了进去，/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '330', any: [/PRINT 脸上/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '331-374',
        any: [/PRINTL 流露着沉浸在了羞耻与情欲之中的神色……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '335',
        any: [/PRINTL 流露着沉浸在了羞耻与情欲之中的神色……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '336',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 12\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '337',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '339',
        any: [/PRINTL 的神情为屈服的喜悦与口水所浸染……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '340',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 12\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '341',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '347',
        any: [/PRINTL 流露着在羞耻与快乐间彷徨的神色……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '351',
        any: [/PRINTL 隐约露出了屈服的喜悦……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '356-360',
        any: [/PRINTL 被眼泪浸湿了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '358',
        any: [/PRINTL 被眼泪浸湿了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '359',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '360',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '363',
        any: [/PRINTL 浸染着羞耻的神色……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '364',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '368',
        any: [/PRINTL 的表情因愤怒而扭曲……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '370',
        any: [/PRINTL 染上了绝望的神色……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '371',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '378', any: [/EXP:ARG:0 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '379', any: [/EXP:ARG:20 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '383',
        any: [/PRINTL 『处女诶！　恭喜破处啦……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '386',
        any: [/PRINTL 『这家伙被强奸着都湿了啊』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '388', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '390', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '393-485',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '396-398',
        any: [/DATAFORM 『喂！闭嘴……别吵啦！快点喝下去！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '401-406',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '403',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '404',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '405',
        any: [/PRINTFORMW 兽人抵受不住她那灵活的舌头，射在%SAVESTR:ARG%/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '406', any: [/MON_NUM \*= 2/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '410', any: [/PRINTFORM 无头骑士的/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '412',
        any: [/PRINTFORM %SAVESTR:ARG%/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '415',
        any: [/PRINTFORM 身体被固定住了，只剩下脑袋来像飞机杯似的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '417', any: [/PRINTFORM 全裸地/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '419',
        any: [/PRINTFORMW 侍奉着兽人们的阴茎。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '420',
        any: [/PRINTFORMW 只要喝掉所有\{MON_NUM\}只兽人的精液的话，它们就答应/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '422', any: [/IF CFLAG:ARG:131 > 5/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '422-461',
        any: [/PRINTFORM 毫无犹豫、/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '426', any: [/PRINTFORM 毫无犹豫、/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '429',
        any: [/PRINTFORM 小心翼翼地、/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '432',
        any: [/PRINTFORM 一边土下座扭着腰部的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '435',
        any: [/PRINTFORM 期待与羞耻将脸染红的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '438',
        any: [/PRINTFORM 为了守住自己处女的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '440', any: [/PRINTFORM 面露期待的/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '444', any: [/IF TALENT:ARG:13/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '446',
        any: [/PRINTFORM 老实遵从于兽人的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '449',
        any: [/PRINTFORM 煞有其事地、/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '452',
        any: [/PRINTFORM 不住向阴茎献媚的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '455',
        any: [/PRINTFORM 面对阴茎羞红了脸的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '460',
        any: [/PRINTFORM 已然无法反抗的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '463', any: [/IF TALENT:ARG:11/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '465',
        any: [/PRINTFORM 带着反抗的目光看着它们，其中一只兽人对她怒喝了一声，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '470',
        any: [
          /PRINTFORM 迫于兽人的威胁，她衡量了一下得失之后，老实地接受了屈辱的命运/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '475', any: [/PRINTFORM 提心吊胆地/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '478', any: [/PRINTFORM 嘿嘿媚笑着/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '481',
        any: [/PRINTFORM 不敢直视肉棒而闭上了眼睛/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '488',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '488-496',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '489-495', any: [/PRINTDATA/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '498', any: [/PRINT 含了下去，/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '499-505',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '503',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '504',
        any: [/PRINTFORMW 兽人抵受不住她那灵活的舌头，射在%SAVESTR:ARG%/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '507', any: [/ELSEIF TALENT:ARG:21/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '509',
        any: [/PRINTFORM 像工作一样地奉仕着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '512',
        any: [/PRINTFORM 不禁发出了粗俗的声音，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '515',
        any: [/PRINTFORM 很快地抓住了奉仕的诀窍，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '518',
        any: [/PRINTFORM 忍受着腥臭味，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '521',
        any: [/PRINTFORM 拼命地用舌头奉仕着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '524',
        any: [/PRINTL 奉仕持续了下去……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '526',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '527',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '529-530',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '530', any: [/;初吻/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '532-614', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '540-542',
        any: [/DATAFORM 『兄弟们，把所有的穴都塞满哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '545',
        any: [/PRINTFORMW %SAVESTR:ARG%被\{MON_NUM\}只兽人用积存/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '546',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '546-552',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '547',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸和性器都用精液化上了妆。兽人/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '549', any: [/PRINT 兽人的/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '552-556', any: [/DATAFORM 阴茎/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '556-568',
        any: [/PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '559',
        any: [/PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '562', any: [/PRINT 眼镜上飞撒着……/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '564',
        any: [/PRINT 可爱的眼睛上飞撒着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '566',
        any: [/PRINT 漂亮的鼻子里喷了出来……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '568',
        any: [/PRINT 光鲜亮丽的头发上飞撒着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '569-574',
        any: [/PRINT 脸上飞撒着……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '570', any: [/PRINT 脸上飞撒着……/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '572', any: [/PRINTL/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '576-583',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '582',
        any: [/PRINTFORMW 在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '583',
        any: [/PRINTFORMW 『喔！这家伙有感觉了哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '584',
        any: [/PRINTFORMW %SAVESTR:ARG%被快感冲击着，忍不住主动扭着腰。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '585',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '586',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '589',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '592-608', any: [/PRINTW/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '594', any: [/PRINTW/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '595',
        any: [/PRINTFORM 兽人们把润滑液涂在了%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '598', any: [/PRINT 漂亮的/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '600',
        any: [/PRINT 漂亮的屁股的缝隙中的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '602',
        any: [/PRINT 大的屁股的缝隙中的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '604', any: [/PRINT 无毛额/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '606',
        any: [/PRINT 肌肉明显的两腿间的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '608',
        any: [/PRINT 从阴阜到肛门都被茂密的阴毛所覆盖的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '610',
        any: [/PRINT 长着茂盛的阴毛的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '613', any: [/PRINTL 性器和肛门上/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '614',
        any: [/PRINTFORM 在%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '618', any: [/PRINT 魁梧的身体上/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '621', any: [/PRINT 娇小的身体上/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '624',
        any: [/PRINT 松松垮垮的身体上/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '627', any: [/PRINT 紧致的身体上/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '630', any: [/PRINT 窈窕的身体上/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '632', any: [/PRINT 纤细的身体上/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '634', any: [/PRINT 肉感的身体上/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '636', any: [/PRINT 身体上/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '639',
        any: [/PRINTL 像要挤爆她似的激烈地持续侵犯着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '641',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '645',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '646',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '647',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '648',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '650-651',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '651',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '653-734',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '663-665',
        any: [
          /DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '668',
        any: [/PRINTFORM %SAVESTR:ARG%全裸地四肢着地趴在地下、/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '672', any: [/PRINT 浑身颤抖着、/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '675', any: [/PRINT 怒目圆睁着、/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '678', any: [/PRINT 拼命服从着、/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '681', any: [/PRINT 拼命献媚着、/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '684', any: [/PRINT 羞红了脸、/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '685-691',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '687',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '689',
        any: [/PRINTFORMW \{MON_NUM\}只兽人看到这个情形都笑了。完全没有了光辉/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '693',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '693-699',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '694',
        any: [/PRINTFORMW 好像因为被视奸，而有了感觉。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '701',
        any: [/PRINTFORMW %SAVESTR:ARG%好像因为被骂而有了感觉。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '702',
        any: [/PRINTFORMW 『明明就是母猪，还说自己是冒险者！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '703',
        any: [/PRINTFORMW %SAVESTR:ARG%连眼神都湿润了～/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '705',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '708', any: [/PRINTFORM 『猪/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '714', any: [/;情けない/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '717',
        any: [/PRINTFORM 还自称冒险者……简直傻了/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '721-726',
        any: [/CALL GOBI_KOUJO, 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '728',
        any: [/PRINTFORMW 　噗噗，噗嘻！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '732',
        any: [/PRINTFORMW %SAVESTR:ARG%抛弃了自尊心，拼命地求饶着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '733-770',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '740-746',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '742',
        any: [/PRINTW 『来试试，看能放多粗的东西进去？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '743',
        any: [/PRINTFORMW %SAVESTR:ARG%感受到了自己身上的危机，拼命地哀/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '744',
        any: [
          /PRINTFORMW 不过，她的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '745',
        any: [
          /PRINTFORMW 其中一只兽人，拿起她的心爱的武器用柄的那端捅入她的私处。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '746',
        any: [/PRINTFORMW %SAVESTR:ARG%的喊叫声，回响在\{MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '748-754',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '750',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '751',
        any: [/PRINTFORMW %SAVESTR:ARG%受不了痛楚，高声哭喊着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '758',
        any: [/PRINTFORMW %SAVESTR:ARG%在痛楚中感到了愉悦。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '759',
        any: [/PRINTFORMW 难道自己是个潜在的性变态？这么想着，%SAVESTR:AR/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '760',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '761',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '765-796',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '771-777',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '773',
        any: [/PRINTW 『抬起屁股！然后说：请用！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '774',
        any: [/PRINTFORMW %SAVESTR:ARG%用屈辱的姿势抬起了屁股，把手扶在/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '775',
        any: [/PRINTFORMW 她完全被淹没在\{MON_NUM\}只兽人之中，兽人们大笑着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '776',
        any: [/PRINTFORMW %SAVESTR:ARG%的呜咽，被兽人们的欢呼声掩埋在地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '779-782',
        any: [/PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的私处里渐渐滴出/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '780',
        any: [/PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的私处里渐渐滴出/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '781',
        any: [
          /PRINTFORMW 『别这么快就去了啊！老子都不知道操哭多少人类女性了。』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '782',
        any: [/PRINTFORMW %SAVESTR:ARG%呼出了炽热的气息，双腿直抖着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '788',
        any: [/PRINTFORMW 『喂！把腰抬起来！还没完呢！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '789',
        any: [/PRINTFORMW %SAVESTR:ARG%用冰冷的目光瞪了兽人们一眼。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '790', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '792',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '793',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '803-894',
        any: [/@SLIME_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '803', any: [/@SLIME_RYOU\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '806-812',
        any: [/PRINTW 黏液缠住了冒险者的腿，令他无法移动。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '809',
        any: [/PRINTW 黏液缠住了冒险者的腿，令他无法移动。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '810', any: [/WAIT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '815-820',
        any: [/DATAFORM 奇妙的黏液蠢动着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '815-819',
        any: [/DATAFORM 奇妙的黏液蠢动着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '822',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '824-839',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '826',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '827',
        any: [/PRINTFORMW 黏液迷茫了一会儿，但马上又发现了另一个突破口。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '828',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴和肛门，被灌入了黏液。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '834',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '836', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '837', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '840',
        any: [/PRINTW 黏液杀到了冒险者的嘴巴里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '841',
        any: [/PRINTFORMW %SAVESTR:ARG%感觉呼吸困难，正挣扎着，突然呼吸/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '842-848',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '847',
        any: [/PRINTW 黏液杀到了冒险者的肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '848',
        any: [/PRINTFORMW %SAVESTR:ARG%被肛门里大量逆流的黏液弄的苦不堪/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '850-871',
        any: [/PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '851',
        any: [/PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '854',
        any: [/PRINTFORMW %SAVESTR:ARG%已然被粘液攻陷了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '857',
        any: [/PRINTFORMW %SAVESTR:ARG%开始习惯被粘液涌入的感觉……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '859',
        any: [/PRINTW 冒险者在肛虐的痛苦中癫狂地惨叫着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '862',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '868',
        any: [/PRINTW 被全裸地四脚着地压在地上，黏液逆流到肛门里了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '869',
        any: [/PRINTFORMW %SAVESTR:ARG%腹部运劲，将黏液喷出肛门，但依然/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '870',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '873-878',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '875',
        any: [
          /PRINTW 黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '876',
        any: [/PRINTFORMW %SAVESTR:ARG%坚强地试图站起来。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '877',
        any: [
          /PRINTFORMW 但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '881-891',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '885',
        any: [/PRINTW 冒险者被包在黏液里，只露出头部发出呜呜的呻吟。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '886',
        any: [/PRINTFORMW 看来没人相救的话，%SAVESTR:ARG%要被消化在黏液/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '887',
        any: [/PRINTFORMW 但黏液持续的爱抚着身体，可能也会让%SHE\(ARG\)%溶化/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '888',
        any: [/PRINTFORMW 黏液的麻痹成分，渐渐把%SAVESTR:ARG%遭受凌辱的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '892-897', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '895-989',
        any: [/@INSECT_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '895', any: [/@INSECT_RYOU\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '897',
        any: [/;---------------------------------------/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '899', any: [/;男人の場合/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '899-903',
        any: [/PRINTW 节肢动物在冒险者的脖子上打入了麻痹毒素。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '900', any: [/IF TALENT:ARG:122/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '901',
        any: [/PRINTW 节肢动物在冒险者的脖子上打入了麻痹毒素。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '902', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '905-926',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '908-912',
        any: [/DATAFORM 节肢动物发出了喜悦的声音、冒险者缓缓地拥向了甲壳…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '917-921',
        any: [/DATAFORM 节肢动物发出了喜悦的声音、冒险者脱力了似的靠了上去…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '926-930',
        any: [/DATAFORM 节肢动物的甲壳像在欢迎似的攒动着…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '934-938',
        any: [/DATAFORM 节肢动物用甲壳摩擦着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '946',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '947',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，节肢动物/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '948-965',
        any: [/PRINTFORMW 它怒了，将输卵管直接插入肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '948',
        any: [/PRINTFORMW 它怒了，将输卵管直接插入肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '949',
        any: [/PRINTFORMW %SAVESTR:ARG%因剧痛发出了凄厉的惨叫……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '959', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '961',
        any: [/PRINTL 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '962',
        any: [/PRINTFORML %SAVESTR:ARG%被节肢动物抓住，直接被输卵管插入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '963',
        any: [/PRINTL 她不断地惨叫着，但节肢动物依旧毫不留情。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '964-975',
        any: [/PRINTL 私处经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '964', any: [/PRINTL 私处经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '969', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '971',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '972',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被输卵管插入了，被播下了卵/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '977-984',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '979',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '980',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被输卵管插入了，被播下了卵/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '981',
        any: [/PRINTW 不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '982',
        any: [/PRINTFORMW \{MON_NUM\}只节肢动物轮流扑在%SAVESTR:AR/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '985-992', any: [/WAIT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '990-1046',
        any: [/@IVY_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '990', any: [/@IVY_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '991', any: [/#DIM MON_NUM/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '993', any: [/^$/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '994', any: [/;男人の場合/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '994-998',
        any: [/PRINTW 植物用藤蔓抢走了冒险者的武器。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '996',
        any: [/PRINTW 植物用藤蔓抢走了冒险者的武器。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '997', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1001-1006',
        any: [/DATAFORM 藤蔓把冒险者缠住了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1001-1005',
        any: [/DATAFORM 藤蔓把冒险者缠住了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1008',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1010-1021',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1012',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1013',
        any: [/PRINTFORMW 但是，本来就对纯洁这东西没概念的植物，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1014',
        any: [/PRINTFORMW 把目标转移到了%SAVESTR:ARG%的肛门……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1020',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1022', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1023', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1025-1030',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1026',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1027',
        any: [/PRINTFORMW %SAVESTR:ARG%呼吸困难，痛苦挣扎着，被开放的时/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1032-1042',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1033',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1034',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被蹂躏着，发出了喊破喉咙的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1035',
        any: [/PRINTW 藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1041',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1043', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1044', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1047-1147',
        any: [/@SYOKUSYU_RYOU\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1047',
        any: [/@SYOKUSYU_RYOU\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1051-1055',
        any: [/PRINTW 冒险者的身体被触手缠住了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1053',
        any: [/PRINTW 冒险者的身体被触手缠住了。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1054', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1057-1095',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1061-1065',
        any: [/DATAFORM 冒险者充满爱意地抚摸着蠕动的触手………/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1071-1076',
        any: [/DATAFORM 冒险者被形似男性生殖器的触手顶着、脸涨得通红/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1080-1084',
        any: [/DATAFORM 奇怪的触手，蠢动着……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1088',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1090-1103',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，触手一摸/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1092',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，触手一摸/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1093',
        any: [/PRINTFORMW 触手放弃了，向次要目标进发。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1094',
        any: [/PRINTFORMW %SAVESTR:ARG%的菊花，被强行撬开了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1100',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1102', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1103', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1105-1108',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1106',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1107',
        any: [/PRINTFORMW %SAVESTR:ARG%的喉咙被大量的体液灌入，呛到了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1110-1117',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1111',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1112',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被大量的体液灌入，直肠吸收/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1113',
        any: [/PRINTW 不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1117',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1118-1124',
        any: [/PRINTW 仰面倒下的冒险者，正被触手侵犯着私处。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1119',
        any: [/PRINTW 仰面倒下的冒险者，正被触手侵犯着私处。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1120',
        any: [/PRINTFORMW %SAVESTR:ARG%不断悲鸣着，但被大量的体液灌入私/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1124',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1125-1134',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1126',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1127',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴也好，私处也好，肛门也好，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1128',
        any: [
          /PRINTFORMW ……不久，地上滴落的液体里，开始出现了触手体液之外的东西。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1133',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1134',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1135-1144',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1136',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1137',
        any: [/PRINTFORMW %SAVESTR:ARG%带着难以置信的表情，感受着触手的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1138',
        any: [/PRINTFORMW 不久之后%SHE\(ARG\)%感到乳房发胀，触手顺势开始了榨/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1139',
        any: [/PRINTFORMW 不久之后，%SAVESTR:ARG%母乳开始无法抑制地从乳/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1140',
        any: [/PRINTFORML 喷奶经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1141', any: [/EXP:ARG:54 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1143',
        any: [/PRINTFORMW 触手经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1144',
        any: [/EXP:ARG:55 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1145', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1148-1236',
        any: [/@FAILY_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1148', any: [/@FAILY_RYOU\(ARG\)/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1152-1156',
        any: [/PRINTW 『下次再来玩啊～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1154',
        any: [/PRINTW 『下次再来玩啊～』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1155', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1158-1186',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1161-1165',
        any: [/DATAFORM 『小姐姐、还要再来呀』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1171-1176',
        any: [/DATAFORM 『小姐姐怎么了吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1180-1184',
        any: [/DATAFORM 『小姐姐，来做更Ｈ的事吧』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1188',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1190-1206',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1192',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1193',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，一摸上去/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1194',
        any: [/PRINTFORMW 妖精拿出了一根和自己身高相等的假阳具。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1195',
        any: [/PRINTFORMW 『小姐姐来享受这边的穴吧！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1196',
        any: [/PRINTFORMW %SAVESTR:ARG%的惨叫回响在洞窟里……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1202',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1204', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1205', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1207-1217',
        any: [/PRINTL 『小姐姐，要做我的肉便器吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1208',
        any: [/PRINTL 『小姐姐，要做我的肉便器吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1209',
        any: [/PRINTFORML %SAVESTR:ARG%的阴蒂，被一只妖精不停舔舐着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1210',
        any: [/PRINTFORML %SAVESTR:ARG%忍受着M字开脚的这份屈辱……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1211', any: [/PRINTL 阴核点数\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1212', any: [/JUEL:ARG:0 \+= 10/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1214', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1215', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1218',
        any: [/PRINTW 『小姐姐的里面，是什么模样呢？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1219-1225',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被妖精钻入了。妖精对她的反/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1219',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被妖精钻入了。妖精对她的反/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1221',
        any: [/PRINTFORML 私处点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1224', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1225', any: [/PRINTW 『舔舔看！』/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1226-1232',
        any: [/PRINTFORMW %SAVESTR:ARG%的阴蒂和两乳头都被妖精们舔舐着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1226',
        any: [/PRINTFORMW %SAVESTR:ARG%的阴蒂和两乳头都被妖精们舔舐着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1227',
        any: [/PRINTW 身体在妖精们的欺负下越发苦闷了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1228',
        any: [/PRINTFORML 阴核点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1235', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1236',
        any: [/;---------------------------------------/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1237-1407',
        any: [/@GIANT_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1237', any: [/@GIANT_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1241-1245', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1243', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1244', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1247-1275',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1250-1254',
        any: [/DATAFORM 『瓦全的　变成了　灰机杯了呀』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1260-1265',
        any: [/DATAFORM 『哈哈　熟络起来了欸』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1269-1273',
        any: [/DATAFORM 『看起来值得凌辱一番。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1273',
        any: [/DATAFORM 『真是太小啦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1277',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1279-1293',
        any: [/PRINTFORMW 『你这家伙，尽然被封印了』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1282',
        any: [/PRINTFORMW 『你这家伙，尽然被封印了』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1283',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，巨人无法/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1284',
        any: [/PRINTFORMW 『尾指的话，应该能进去』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1285',
        any: [/PRINTFORMW %SAVESTR:ARG%狭窄的肛门，被巨人粗壮的尾指捅入/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1290',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1292', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1293', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1295-1310',
        any: [/PRINTL 『喝下去哦』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1296', any: [/PRINTL 『喝下去哦』/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1297',
        any: [/PRINTFORML %SAVESTR:ARG%侍奉着一只巨人，不过怎么张嘴都吞/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1298',
        any: [/PRINTFORML 绝顶了的巨人，把精液从头到脚浇了%SHE\(ARG\)%一身。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1299', any: [/PRINTL 口交经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1301', any: [/EXP:ARG:22 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1302', any: [/EXP:ARG:20 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1304-1305',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1305', any: [/CFLAG:16 = 995/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1307', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1308', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1310-1343',
        any: [/PRINTFORMW 『简直就像洋娃娃一样』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1311',
        any: [/PRINTFORMW 『简直就像洋娃娃一样』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1312',
        any: [/PRINTFORMW %SAVESTR:ARG%的腰被巨人抓着，用巨大的阴茎贯穿/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1313',
        any: [/PRINTFORMW 『喂！还要继续的啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1315-1323',
        any: [/PRINTFORMW %SAVESTR:ARG%因为平时的训练，勉强保留着意识。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1317',
        any: [/PRINTFORMW %SAVESTR:ARG%因为平时的训练，勉强保留着意识。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1318',
        any: [/PRINTFORMW 『不错的声音哦！来吧！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1319',
        any: [/PRINTFORMW %SAVESTR:ARG%痛苦得基本叫不出声了，拼命地忍受/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1323-1326',
        any: [/PRINTFORMW 经历过最初的失禁以及失神之后，%SHE\(ARG\)%已经不知/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1325',
        any: [/PRINTFORMW 经历过最初的失禁以及失神之后，%SHE\(ARG\)%已经不知/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1330',
        any: [/PRINTFORML 阴道扩张经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1331',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1332',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1333',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1334', any: [/EXP:ARG:50 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1335',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1336-1360',
        any: [/PRINTW 『快点啊！』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1337', any: [/PRINTW 『快点啊！』/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1338',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地舔舐着巨人的阴茎。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1339',
        any: [/PRINTFORMW %SHE\(ARG\)%拼命地哀求着，请饶了%SHE\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1340',
        any: [/PRINTFORMW 必须快点搞定这\{MON_NUM\}只巨人，不然不知道他们什么/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1342-1349',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1344',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1345',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1346',
        any: [/PRINTFORMW 巨人被%SHE\(ARG\)%灵活的舌头弄射了，精液像喷泉一样/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1347', any: [/MON_NUM \*= 2/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1352',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1353',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1355-1356',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1356', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1357-1385',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1358',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1359',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被巨人强行用阴茎贯穿，撕裂/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1360',
        any: [/PRINTFORMW 『又一个坏掉了吗？用点回复药或许可以再来几下。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1361',
        any: [
          /PRINTFORMW 插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有\{/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1363-1373',
        any: [/PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1365',
        any: [/PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1366',
        any: [/PRINTFORMW 『喂！这里有个想逃跑的！抓住%SHE\(ARG\)%！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1367',
        any: [/PRINTFORMW %SAVESTR:ARG%被巨人抓着四肢，那不设防的肛门，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1375',
        any: [/PRINTFORML 肛门扩张经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1380',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1381', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1382',
        any: [/PRINTW 『我想到好主意了』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1383',
        any: [
          /PRINTFORMW 巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1384-1403',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1384',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1385',
        any: [/PRINTFORMW 巨人端着一大盆精液，对%SHE\(ARG\)%说，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1386',
        any: [/PRINTFORMW 『不想死的话，就全部喝光。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1387',
        any: [/PRINTFORMW %SAVESTR:ARG%脸上血色褪尽。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1391',
        any: [/PRINTFORMW %SAVESTR:ARG%用冷淡的眼神瞪着巨人，表示不从。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1392-1401',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1392',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1393',
        any: [/PRINTFORMW 巨人用巨大的手掌按着%SAVESTR:ARG%的头，直接把/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1394',
        any: [/PRINTFORMW 「咕噜，咕噜，咕咕噜」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1395',
        any: [/PRINTFORMW 巨人把%SHE\(ARG\)%的头抓起来，那张满脸精液的脸上，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1401',
        any: [/PRINTFORML 精液经验\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1405', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1407',
        any: [/;---------------------------------------/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1408-1665',
        any: [/@MAN_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1408', any: [/@MAN_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1412-1416', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1414', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1415', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1418-1446',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1421-1425',
        any: [/DATAFORM 『已经、离不开我们了吗』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1431-1436',
        any: [/DATAFORM 『哦、又来啦』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1440-1444',
        any: [/DATAFORM 『真是好女人啊！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1448',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1450-1462',
        any: [/PRINTFORMW 『笨女人，前面严防死守，后面却全是破绽。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1452',
        any: [/PRINTFORMW 『笨女人，前面严防死守，后面却全是破绽。』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1453',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1454',
        any: [/PRINTFORMW 『来吧！让菊花绽放！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1455',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被插入了，不断地被灌入了精/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1458',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1459',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1461', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1462', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1464-1474',
        any: [/PRINTL 『如果作为肉便器被卖掉了话，我每晚都来抱你～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1465',
        any: [/PRINTL 『如果作为肉便器被卖掉了话，我每晚都来抱你～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1466',
        any: [/PRINTFORML %SAVESTR:ARG%被魔族男人从后侵犯着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1467',
        any: [
          /PRINTL 她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1470', any: [/EXP:ARG:0 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1471', any: [/EXP:ARG:20 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1473', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1474', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1476-1507',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1478-1481',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1479',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1480',
        any: [/PRINTFORMW %SAVESTR:ARG%露出了屈辱的神色，向魔族男人翘起/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1483',
        any: [/PRINTW 『用胸部来…乳交你不知道？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1485',
        any: [/PRINTFORMW %SAVESTR:ARG%全裸地侍奉着兽人们的阴茎。只要喝/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1487-1494',
        any: [/PRINTFORMW 被%SAVESTR:ARG%傲人的丰满胸部夹着，魔族男人们/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1489',
        any: [/PRINTFORMW 被%SAVESTR:ARG%傲人的丰满胸部夹着，魔族男人们/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1490',
        any: [/PRINTFORMW 『喔！真是一双好乳房啊……阴茎专用的乳房！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1491',
        any: [/PRINTFORMW 胸部的触感让%SAVESTR:ARG%红晕满脸，低下了头。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1495-1498',
        any: [/PRINTFORMW 『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1497',
        any: [/PRINTFORMW 『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1498',
        any: [/PRINTFORMW %SAVESTR:ARG%依照吩咐，用嘴巴侍奉着阴茎……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1502',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1503',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1505-1506',
        any: [/SIF CFLAG:16 == -1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1506', any: [/SIF CFLAG:16 == -1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1507', any: [/CFLAG:16 = 995/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1508-1584',
        any: [/PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1511',
        any: [/PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1514',
        any: [/PRINTFORM %SAVESTR:ARG%的身上，被写着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1517',
        any: [/PRINT 【处女开通纪念】/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1519',
        any: [/PRINT 【最喜欢阴茎】/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1524',
        any: [/PRINT 【性冷淡便器】/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1529',
        any: [/PRINT 【千金小姐便器出道】/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1534', any: [/PRINT 【又粘又湿】/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1539', any: [/PRINT 【愉悦的脸】/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1544', any: [/PRINT 【乳牛】/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1549',
        any: [/PRINT 【有鸡鸡的奴隶】/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1553', any: [/PRINT 【操我】/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1555', any: [/PRINT 【肛门免费】/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1555-1564',
        any: [/PRINT 【肛门免费】/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1557', any: [/PRINT 【母猪】/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1560',
        any: [/PRINTFORM 之类的话。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1562',
        any: [
          /PRINTFORMW 络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1563',
        any: [/PRINTFORMW 当被最后一人抱着的时候，%SAVESTR:ARG%已经失去/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1564',
        any: [/PRINTFORMW 地下城里，充斥着\{MON_NUM\}人份的精液和爱液的异样臭/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1569',
        any: [/PRINTFORMW %SAVESTR:ARG%的蓝色肌肤，被沾满了精液……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1571', any: [/;褐色肌肤/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1572',
        any: [/PRINTFORMW %SAVESTR:ARG%健康的褐色肌肤，与白浊的精液形成/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1573',
        any: [/ELSEIF TALENT:ARG:255/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1574', any: [/;白皙/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1575',
        any: [/PRINTFORMW %SAVESTR:ARG%美丽的白皙肌肤被精液玷污了……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1576-1577', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1578-1600',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1586-1591',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1590',
        any: [/PRINTW 『明明是冒险者，却忍不住了吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1591',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被灌入了灌肠液，忍受着强烈/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1592',
        any: [
          /PRINTFORMW 『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1593',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地自慰着，但是在这异常的状况/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1594',
        any: [/PRINTFORMW 肛门里的污物，终于无法忍耐地飞散而出。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1595',
        any: [/PRINTFORMW 魔族男人们看到这样，毫不留情地说着侮蔑的话，%SAVEST/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1599',
        any: [/PRINTFORMW %SAVESTR:ARG%因自己拉出的东西的味道而皱起眉头/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1600',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1601-1623',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1606', any: [/PRINTL 自慰经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1607',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1608-1612',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1611', any: [/EXP:ARG:11 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1613',
        any: [/PRINTW 『那个冒险者大人，在舔我的肛门哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1614',
        any: [/PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1614-1618',
        any: [/PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1615',
        any: [/PRINTFORMW 『你的尊严，真不值钱呢！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1616',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地侍奉着，听到这话，心里想死/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1617',
        any: [/PRINTFORMW 侍奉结束之后，%SAVESTR:ARG%还被迫要说出淫秽的/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1621',
        any: [/PRINTFORMW 自尊心低下的%SAVESTR:ARG%，拼命地说着自己是舔/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1622', any: [/Y \+= 10/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1624-1653',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1627',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1628', any: [/Y \+= 10/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1630-1635',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1636',
        any: [/PRINTW 『这个为了保命就来者不拒的妓女！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1637',
        any: [/PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1637-1642',
        any: [/PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1638',
        any: [
          /PRINTFORMW 『说！说我是个相对于做冒险者，更喜欢做妓女的淫乱贱婊！』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1639',
        any: [/PRINTFORMW %SAVESTR:ARG%在激烈的抽插中，不断地重复着屈辱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1643',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地重复着淫乱的话语乞求饶命，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1650',
        any: [/PRINTFORMW 说着过激的言语，%SAVESTR:ARG%的心里产生了情欲/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1651',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1652',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1656',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1657',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1658',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1666-2046',
        any: [/@GIRL_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1666', any: [/@GIRL_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1670-1672', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1673-1779',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1676-1684',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1676',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1678',
        any: [/PRINTW 『让姐姐来教你一些好事！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1680',
        any: [/PRINTW 『哎呀？勃起了么？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1683',
        any: [/PRINTW 『可悲的人呢，勃起了么？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1690',
        any: [/PRINTFORMW 『独占你了！难道这是第一次？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1691-1727',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女人口交着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1691',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女人口交着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1692',
        any: [/PRINTFORM 紫色的长舌头，在%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1694', any: [/PRINT 巨根/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1696', any: [/PRINT 短小包茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1698', any: [/PRINT 包茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1701', any: [/PRINT 马阴茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1704', any: [/PRINT 阴茎/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1706',
        any: [/PRINTFORMW 上舔舐着，吸取着精气。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1708',
        any: [/PRINTW 『好大，下巴都要脱落了♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1710',
        any: [/PRINTW 『冒险者大人的这里，像小孩子一样♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1712',
        any: [/PRINTW 『让我帮你把包皮里的污垢弄干净吧』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1715',
        any: [/PRINTW 『呵呵，被谁改造的？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1718',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1722',
        any: [/PRINTFORML 绝顶经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1723',
        any: [/PRINTFORML 射精经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1725',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1726',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1728-1762',
        any: [/EXP:ARG:3 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1731',
        any: [
          /PRINTFORMW 『大家一起来帮他含，一下就射的话，就要好好处罚你喔！』/,
        ],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1735', any: [/PRINT 巨根/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1739', any: [/PRINT 包茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1742', any: [/PRINT 马阴茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1745', any: [/PRINT 阴茎/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1751',
        any: [/PRINTW 『冒险者大人的这里，小孩子一样♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1762',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1763',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1764-1790',
        any: [/PRINTFORML 绝顶经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1773',
        any: [
          /PRINTFORMW 『让魔界的女人来教你什么才是女人的滋味……试过一次你就不会/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1774',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女性跨坐在身上，吸取着精/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1778',
        any: [/PRINTW 『哎呀，好大♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1781',
        any: [/PRINTW 『小的都不知道你进来了没有……♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1784',
        any: [/PRINTW 『好，好厉害……好大，好棒』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1785', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1786', any: [/;普通・包茎/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1787',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1788-1814',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1790',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1791',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1792',
        any: [/PRINTFORML 性交经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1803',
        any: [/PRINTFORMW 『胸部，味道好吗？舔个没完呢～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1804',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女性一边喂奶，一边被撸着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1805',
        any: [/PRINTFORM 紫色的手，温柔地在%SAVESTR:ARG%的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1807', any: [/PRINT 巨根/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1809', any: [/PRINT 短小包茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1811', any: [/PRINT 包茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1814', any: [/PRINT 马阴茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1817', any: [/PRINT 阴茎/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1819',
        any: [/PRINTFORMW 上爱抚着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1821',
        any: [/PRINTW 『好大啊……来享受快乐吧♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1822',
        any: [/ELSEIF TALENT:ARG:318 == 2/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1823',
        any: [/PRINTW 『带皮的短小鸡鸡♪变得黏糊糊的～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1825',
        any: [/PRINTW 『帮你剥皮除垢哦～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1826',
        any: [/ELSEIF TALENT:ARG:318 == 4/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1827', any: [/;自然発生はしない/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1830-1859',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1834',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 5\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1852-1856',
        any: [/DATAFORM 『完全沉迷其中了呀』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1861-1866',
        any: [/DATAFORM 『哎呀、又来了呀』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1862',
        any: [/DATAFORM 『故意输的？　啊哈哈』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1864-1890',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1870-1877',
        any: [/DATAFORM 『是异性恋也无所谓哦～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1872',
        any: [/DATAFORM 『在你坏掉之前可不会停哦』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1874',
        any: [/DATAFORM 『这就让你的身体变得再也不需要男人吧』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1883-1885',
        any: [/IF TALENT:ARG:273/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1887',
        any: [/PRINTFORMW 『真是较真。这样的孩子反而容易觉醒后面的快感呢～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1887-1891',
        any: [/PRINTFORMW 『真是较真。这样的孩子反而容易觉醒后面的快感呢～』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1889', any: [/PRINT 『这边的穴/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1894', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1895',
        any: [/PRINTW 个中滋味 好好感・受・吧』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1896', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1898',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1899-1915',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1900',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1900-1905',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1902',
        any: [/PRINTW 『舒服的话就好好发出声音来才好哦？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1904',
        any: [/PRINTFORMW %SAVESTR:ARG%肛门里的皱褶，被魔族女性仔细地舔/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1910',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1910-1914',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1915',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 5\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1917', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1919', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1920', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1922-1931',
        any: [/PRINTL 『弄得好的话就好好奖励你』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1923',
        any: [/PRINTL 『弄得好的话就好好奖励你』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1925',
        any: [/PRINTL 『那样子弄，完全不舒服嘛』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1926-1930',
        any: [/PRINTL 『再好好努力哦』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1927',
        any: [/PRINTL 『再好好努力哦』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1929',
        any: [/PRINTFORML %SAVESTR:ARG%被强迫着舔舐魔族女人的阴部。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1930',
        any: [/PRINTL 她像狗一样的趴在地上，拼命地侍奉着自己的女主人。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1933', any: [/;百合气质・双性恋/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1934-1949',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1939', any: [/PRINTL 百合经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1941-1945', any: [/WAIT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1946',
        any: [/PRINTW 『你的新职业就是舔舐奴隶了哦！原冒险者大人♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1947',
        any: [/PRINTFORMW %SAVESTR:ARG%全裸着像狗一样地侍奉着魔族女性，/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1950', any: [/;百合气质・双性恋/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1951',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1952',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1953-1969',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1956',
        any: [/PRINTFORML 百合经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1959',
        any: [/PRINTW 『哎呀，这么粗的也没问题吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1960',
        any: [/PRINTFORMW %SAVESTR:ARG%成为了魔族女人们的玩具，私处和肛/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1961',
        any: [/PRINTFORMW 空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1961-1965',
        any: [/PRINTFORMW 空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1962',
        any: [/PRINTFORMW 不知不觉间，大家都兴奋了，就在外头，以%SAVESTR:A/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1963',
        any: [/PRINTFORMW %SAVESTR:ARG%和\{MON_NUM\}个魔族女孩肉/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '1970', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1973-1990',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1979',
        any: [/PRINTW 『想尿尿了呢～』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1980',
        any: [/PRINTFORMW %SAVESTR:ARG%有讨厌的预感。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1980-1984',
        any: [/PRINTFORMW %SAVESTR:ARG%有讨厌的预感。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1981',
        any: [
          /PRINTFORMW 『对了，要把我的尿喝光哦！不然不会放过你的。要是洒出来了，/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1982',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被魔族女性压在阴部处，对着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1983',
        any: [/PRINTFORMW 尿液无情地从嘴里不断灌入……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1984',
        any: [/PRINTFORMW 魔族女人们，看着一边哭泣一边喝尿的%SAVESTR:ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1995',
        any: [/PRINTFORML 百合经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1996',
        any: [/EXP:ARG:40 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1997',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '1998-2011',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2000',
        any: [/PRINTW 『快点，在大家面前自慰哦！』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2001',
        any: [/PRINTFORMW %SAVESTR:ARG%在众目睽睽之下被迫自慰着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2002',
        any: [
          /PRINTFORMW 『这样的自慰可是女人的专利哦。从今往后就当百合奴隶吧，原冒/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2003',
        any: [/PRINTFORMW %SAVESTR:ARG%的周围，魔族女孩们正以奇妙的方式/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2004',
        any: [/PRINTFORMW 在%SHE\(ARG\)%感觉自己性癖都在扭曲的时候，魔族女孩/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2004-2008',
        any: [/PRINTFORMW 在%SHE\(ARG\)%感觉自己性癖都在扭曲的时候，魔族女孩/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2011', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2013',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2015', any: [/PRINTL 自慰经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2016',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2017', any: [/PRINTL 绝顶经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2026',
        any: [/PRINTW 『也想强奸一次女人呢～♪』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2027',
        any: [/PRINTFORMW %SAVESTR:ARG%的屁股被抬高，以屈辱的姿态，迎接/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2028',
        any: [/PRINTFORMW 『哈哈～好姐妹啊～被女人侵犯，兴奋起来了吗？』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2029',
        any: [/PRINTFORMW %SAVESTR:ARG%被女人侵犯着，在这异常的性爱中，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2033',
        any: [/PRINTFORMW %SAVESTR:ARG%为心中萌发的感情而感到兴奋……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2047-2153',
        any: [/@BEAST_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2047', any: [/@BEAST_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2051-2055', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2053', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2054', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2057-2085',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2060-2064',
        any: [/DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2070-2075',
        any: [/DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2079-2083',
        any: [/DATAFORM 『咕噜咕噜噜』/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2087',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2089-2105',
        any: [/PRINTFORMW 『噢！』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2091', any: [/PRINTFORMW 『噢！』/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2092',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，魔兽转而/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2093',
        any: [/PRINTFORMW 「啊！呜！不要啊……啊啊啊！」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2094',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被野兽的阴茎蹂躏了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2096-2100',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2098',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2105',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2106',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2107',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2109', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2110', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2112-2126',
        any: [/PRINTW 野兽压在冒险者的身上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2114',
        any: [/PRINTW 野兽压在冒险者的身上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2115',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被野兽野蛮地侵犯了，高声尖/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2116',
        any: [/PRINTFORMW 不一会儿，野兽在%SHE\(ARG\)%体内射出了精液……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2117-2121',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2125', any: [/PRINTW 私处经验\+1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2126', any: [/EXP:ARG:0 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2127',
        any: [/PRINTFORMW 兽奸经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2128', any: [/EXP:ARG:56 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2129', any: [/WAIT/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2131-2149',
        any: [/PRINTW 野兽们，开始轮番兽奸冒险者。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2133',
        any: [/PRINTW 野兽们，开始轮番兽奸冒险者。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2134',
        any: [/PRINTFORMW %SAVESTR:ARG%无法面对自己被野兽轮奸的事实，保/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2135-2139',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2144',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2148',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2149',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2154-2236',
        any: [/@BRAIN_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2154', any: [/@BRAIN_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2158-2162', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2160', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2161', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2163-2191',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2166-2170',
        any: [
          /DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2176-2180',
        any: [/DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2184-2188',
        any: [/DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2193', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2195-2206',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配%SHE\(ARG\)%的精神。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2196',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配%SHE\(ARG\)%的精神。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2197',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过食脑/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2198',
        any: [/PRINTFORMW 「啊…啊…啊…啊…啊……」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2199',
        any: [/PRINTFORMW %SAVESTR:ARG%眼珠上翻，伸出舌头，脱粪了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2200',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2202', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2204', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2205', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2207-2217',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2208',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2209',
        any: [/PRINTFORML %SAVESTR:ARG%的头盖骨被食脑魔用坚硬的触手贯通/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2210',
        any: [/PRINTFORML %SHE\(ARG\)%的四肢狂乱地挥动，失禁，死掉了……/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2211', any: [/BASE:ARG:0 = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2213', any: [/EXP:ARG:50 \+= 1/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2215', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2216', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2218-2226',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2220',
        any: [/PRINTFORML %SAVESTR:ARG%的头盖骨被食脑魔用坚硬的触手贯通/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2222', any: [/BASE:ARG:0 = 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2224', any: [/EXP:ARG:50 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2226',
        any: [/PRINTFORMW 食脑魔的触手缠绕着冒险者，%SHE\(ARG\)%死命地挣扎，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2227-2234',
        any: [/PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2227',
        any: [/PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2228',
        any: [/PRINTFORMW %SAVESTR:ARG%被过度的快感弄失禁了，成了废人。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2229',
        any: [/PRINTFORMW 幸好，躯干还是完好的。/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2233', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2235', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2236',
        any: [/;---------------------------------------/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2237-2343',
        any: [/@HORSE_RYOU\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2237', any: [/@HORSE_RYOU\(ARG\)/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2241-2245', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2243', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2244', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2247-2275',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2250-2254',
        any: [
          /DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2260-2264',
        any: [/DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2268-2272',
        any: [/DATAFORM 『唔哦哦！』/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2277', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2279-2297',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2280',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2281',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2282',
        any: [
          /PRINTFORMW 『你很有素质嘛～看在这个份上，就用魔法让你好受些。』/,
        ],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2283',
        any: [/PRINTFORMW %SAVESTR:ARG%不得不用肛门承受着兽奸……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2286-2290',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2287',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2295',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2296',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2297',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2299', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2300', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2302-2317',
        any: [/PRINTW 马压在冒险者的身上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2303',
        any: [/PRINTW 马压在冒险者的身上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2304',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被马野蛮地侵犯了，高声尖叫/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2305',
        any: [/PRINTFORMW 不一会儿，马在%SHE\(ARG\)%体内射出了精液……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2307-2311',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2314', any: [/PRINTW 私处经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2316',
        any: [/PRINTFORMW 兽奸经验\+1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2317', any: [/EXP:ARG:56 \+= 1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2319-2339',
        any: [/PRINTW 好几匹马，开始轮番兽奸冒险者。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2321',
        any: [/PRINTW 好几匹马，开始轮番兽奸冒险者。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2322',
        any: [/PRINTFORMW %SAVESTR:ARG%无法面对自己被马轮奸的事实，保持/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2323-2327',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2332',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2336',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2337',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2344-2770',
        any: [/@PC_RYOU, ARG:0, ARG:1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2344',
        any: [/@PC_RYOU, ARG:0, ARG:1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2350', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2351', any: [/DRAWLINE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2352', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2353', any: [/IF 立绘/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2354-2357',
        any: [/CALL CHA_IMG2\(ARG:1\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2355', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2357', any: [/PRINTL/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2359-2365',
        any: [/PRINTL \[1\] - 不要凌辱/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2360-2366', any: [/\$INPUT_LOOP/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2364', any: [/ELSEIF RESULT >= 2/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2366', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2368', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2370', any: [/;武器チェック/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2372-2381', any: [/W:0 = 40/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2372', any: [/;素手の場合剑を装備/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2373-2377', any: [/W:0 = 40/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2374', any: [/W:0 = 40/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2375',
        any: [/CFLAG:\(ARG:0\):550 = W:0/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2378', any: [/Y = 10/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2379', any: [/;武器分岐/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2380', any: [/IF W:1 == 49/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2382-2446',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用触手把%SAVESTR/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2382',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用触手把%SAVESTR/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2385-2420',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2386',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2387',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%操纵着油腻腻的触手，开始/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2390-2394',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%感到心中有什么在蠢动着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2396',
        any: [/PRINTFORML 肛门经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2397',
        any: [/PRINTFORML 苦痛点数\+80/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2398',
        any: [/PRINTFORML 恐怖点数\+80/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2400',
        any: [/PRINTFORML 百合经验\+5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2401',
        any: [/PRINTFORML 触手经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2402',
        any: [/EXP:\(ARG:1\):1 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2407',
        any: [/EXP:\(ARG:1\):40 \+= 5/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2408', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2409',
        any: [/EXP:\(ARG:1\):55 \+= 1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2410', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2411', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2413-2444',
        any: [/PRINTFORMW 无法动弹的%SAVESTR:\(ARG:1\)%被吊在半空中。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2414',
        any: [/PRINTFORMW 无法动弹的%SAVESTR:\(ARG:1\)%被吊在半空中。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2415',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用凶恶的触手，捅入了%S/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2417-2421',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%感到心中有什么在蠢动着。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2429',
        any: [/PRINTFORML 私处经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2431',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2434',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2435',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2439',
        any: [/EXP:\(ARG:1\):55 \+= 1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2442', any: [/PRINTL 【处女丧失】/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2444-2446',
        any: [/CFLAG:\(ARG:1\):15 = NO:\(ARG:0\) \+ 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2445',
        any: [/CSTR:\(ARG:1\):3 = %SAVESTR:\(ARG:0\)%/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2446', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2448', any: [/WAIT/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2449', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2452-2457',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%看着%SAVESTR:\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2454',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%看着%SAVESTR:\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2456',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%像对食物一样，用舌头拨弄/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2458',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%对%SAVESTR:\(A/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2460',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%让%SAVESTR:\(A/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2462',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%让%SAVESTR:\(A/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2463', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2464', any: [/CALL MONSTER_DATA/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2466-2481',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2471',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2471-2475',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2472',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿出假阳具，开始侵犯%S/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2482',
        any: [/PRINTFORML 苦痛点数\+50/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2483',
        any: [/PRINTFORML 恐怖点数\+50/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2487',
        any: [/JUEL:\(ARG:1\):9 \+= 50/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2488',
        any: [/JUEL:\(ARG:1\):10 \+= 50/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2490',
        any: [/EXP:\(ARG:0\):40 \+= 5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2491',
        any: [/EXP:\(ARG:1\):40 \+= 5/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2494-2682', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2497-2526', any: [/REPEAT 3/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2499',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%强迫%SAVESTR:\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2500',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%全裸地像狗一样趴跪舔舐着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2501',
        any: [/PRINTFORMW 对舌头的动作不满意，%SAVESTR:\(ARG:0\)%直接/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2502-2504',
        any: [/IF TALENT:\(ARG:1\):11/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2505',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2505-2507',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2508',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%谦卑地用狗一样的神态舔舐/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2511',
        any: [/PRINTFORML 百合经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2512',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2514-2544',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿来小臂般粗的巨型假阳具/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2516',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿来小臂般粗的巨型假阳具/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2517',
        any: [/PRINTFORM %SAVESTR:\(ARG:1\)%的/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2519', any: [/PRINTFORM	后穴/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2521', any: [/PRINTFORM	前后两穴都/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2523',
        any: [/PRINTFORMW	被巨型假阳具插入了，%SAVESTR:\(ARG:0\)%用手/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2524',
        any: [/PRINTFORMW 被污物及爱液弄脏了的巨型假阳具，%SAVESTR:\(ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2525-2527',
        any: [/IF TALENT:\(ARG:1\):12/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2528',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%咬牙切齿忍受着屈辱。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2528-2530',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%咬牙切齿忍受着屈辱。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2531',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%眼中含泪，不断重复着谢罪/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2537',
        any: [/PRINTFORML 百合经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2538',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2541',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2542',
        any: [/EXP:\(ARG:1\):0 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2545',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2547',
        any: [/CFLAG:\(ARG:1\):15 = 101/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2548-2600',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了打杂的兽人们，站成/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2550',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了打杂的兽人们，站成/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2551',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%被下了用嘴满足全员的命令/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2552',
        any: [/PRINTFORMW 然后，%SAVESTR:\(ARG:1\)%全裸地四肢着地侍奉/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2554',
        any: [/PRINTFORMW 之后，被从后侵犯了，自己的阴茎也老实地勃起。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2556',
        any: [/PRINTFORMW 之后，被从后侵犯了。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2558',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%承受着来自下体的刺激继续/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2559',
        any: [/PRINTFORMW 『哈哈，%SAVESTR:\(ARG:0\)%大人，下次还有这/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2559-2561',
        any: [/PRINTFORMW 『哈哈，%SAVESTR:\(ARG:0\)%大人，下次还有这/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2562-2564',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%老实地遵循着命令，舔舐着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2563',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%老实地遵循着命令，舔舐着/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2566',
        any: [/PRINTFORMW 嗅觉灵敏的%SAVESTR:\(ARG:1\)%有意无意地回避/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2569',
        any: [/PRINTFORML 耻情点数\+100/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2570',
        any: [/PRINTFORML 屈服点数\+100/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2573',
        any: [/PRINTFORML 口交经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2574',
        any: [/PRINTFORML 精液经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2575',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2578',
        any: [/EXP:\(ARG:1\):0 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2579',
        any: [/IF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2580',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2581',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2584-2585',
        any: [/EXP:\(ARG:1\):22 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2585',
        any: [/JUEL:\(ARG:1\):8 \+= 100/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2588', any: [/SIF CFLAG:16 == -1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2590-2592',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2591',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2592', any: [/PRINTL 【处女丧失】/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2594-2622',
        any: [/CFLAG:\(ARG:1\):15 = NO:\(ARG:0\) \+ 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2599',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了手下。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2601',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2602-2604',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2603',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2605',
        any: [/PRINTFORMW 在这种情况下，被下达了当众自慰的命令。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2605-2607',
        any: [/PRINTFORMW 在这种情况下，被下达了当众自慰的命令。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2609',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%面红耳赤，回避了大家的炽/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2612',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%没怎么抵抗就开始自慰了，/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2615',
        any: [/PRINTFORML 耻情点数\+200/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2616',
        any: [/PRINTFORML 屈服点数\+200/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2617', any: [/PRINTL 自慰经验\+1/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2618',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2619',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2622',
        any: [/IF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2623',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2624-2651',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2631-2633',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%抓住%SAVESTR:\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2632',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%抓住%SAVESTR:\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2634',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴茎上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2634-2642',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴茎上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2636',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴部上。/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2641',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2644',
        any: [/PRINTFORML %SAVESTR:\(ARG:1\)%谦卑地用狗一样的神态舔舐/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2646', any: [/PRINT 阴茎/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2648', any: [/PRINT 私处/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2650', any: [/PRINTFORMW 。/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2653',
        any: [/PRINTFORML 耻情点数\+150/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2654',
        any: [/PRINTFORML 屈服点数\+150/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2659',
        any: [/PRINTFORML 口交经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2660',
        any: [/PRINTFORML 精液经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2661-2700',
        any: [/EXP:\(ARG:1\):20 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2663-2681',
        any: [/JUEL:\(ARG:1\):8 \+= 150/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2672',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用绳子将%SAVESTR/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2674',
        any: [/PRINTFORM 向伏在地上的%SAVESTR:\(ARG:1\)%的背上/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2676',
        any: [/PRINTFORMW 用鞭子不停地抽打着、/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2677',
        any: [/PRINTFORMW 在%SAVESTR:\(ARG:1\)%的背上留下了数道血痕/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2679',
        any: [/PRINTFORMW 将点燃的蜡烛倾倒了上去/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2680',
        any: [/PRINTFORMW 过热的刺痛让%SAVESTR:\(ARG:1\)%的身体不住地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2682',
        any: [/PRINTFORML 耻情点数\+200/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2683',
        any: [/PRINTFORML 屈服点数\+200/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2684',
        any: [/PRINTFORML 紧缚经验\+5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2684-2699',
        any: [/PRINTFORML 紧缚经验\+5/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2696',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的阴道与肛门被%SAVE/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2697', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2698',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门被%SAVESTR/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2700',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%在%SAVESTR:\(A/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2701',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2702',
        any: [/PRINTFORML 私处经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2704',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2705',
        any: [/PRINTFORML 百合经验\+10/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2706', any: [/PRINTL 紧缚经验\+5/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2708-2712',
        any: [/EXP:\(ARG:0\):40 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2713-2746',
        any: [/EXP:\(ARG:1\):1 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2722',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%心中萌生了兴奋的情绪……/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2727',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%召集了梦魔以及魔族们，开/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2728',
        any: [/PRINTFORMW 大家都在尽情交欢着，不过有一人却四脚趴地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2729',
        any: [/PRINTFORMW 做着%SAVESTR:\(ARG:0\)%的人肉座椅，%SAV/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2731',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的后面，私处和肛门也正被/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2732', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2733',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的嘴巴和肛门也正被狠狠侵/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2735',
        any: [/PRINTFORMW 在%SHE\(ARG:1\)%面前则是一个接着一个不停地有人来/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2736',
        any: [/PRINTFORMW 坐在这样的椅子上，%SAVESTR:\(ARG:0\)%满意地/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2737',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2739',
        any: [/PRINTFORML 肛门经验\+10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2742-2748',
        any: [/EXP:\(ARG:0\):40 \+= 10/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2744-2748',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2750', any: [/PRINTL 【处女丧失】/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2753', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2755', any: [/PRINTL/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2766', any: [/PRINTL/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2771-2840',
        any: [/@VICTORY_RYOUZYOKU, ARG = -1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2771',
        any: [/@VICTORY_RYOUZYOKU, ARG = -1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2775',
        any: [/;人間タイプ限定・低確率/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2780-2781',
        any: [/SIF CFLAG:ARG:151 > -50/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2783-2784',
        any: [/SIF RAND:12 == 0/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2786', any: [/^$/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2787', any: [/^$/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2789-2793', any: [/C = B \+ 7/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2791', any: [/IF E:C > 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2792', any: [/LOCAL:1 = E:B/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2793',
        any: [/PRINTFORMW 冒险者被魔界的瘴气侵袭着，玩弄起%MONSTERNAME\(/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2796-2822',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2798-2821',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2800', any: [/;カタコト/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2804',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2808', any: [/;ELSEIF E:C == 4/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2812', any: [/;触手/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2816',
        any: [/;	CALL FAILY_RYOU_YUSYA,ARG/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2820', any: [/ELSEIF E:C == 8/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2826', any: [/;ELSEIF E:C == 10/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2836', any: [/PRINTL/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2841-2915',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2841',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2841-2843',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2843', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2845',
        any: [/@SLIME_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2845-2860',
        any: [/@SLIME_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2849', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2851-2857',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被黏液/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2851',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被黏液/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2853',
        any: [/PRINTFORML 欲情点数\+\{PLAY \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2856-2858', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2859', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2862',
        any: [/@INSECT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2862-2864',
        any: [/@INSECT_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2864', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2866',
        any: [/@IVY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2866-2868',
        any: [/@IVY_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2868', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2870',
        any: [/@SYOKUSYU_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2870-2872',
        any: [/@SYOKUSYU_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2872', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2874',
        any: [/@FAILY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2874-2876',
        any: [/@FAILY_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2876', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2878',
        any: [/@GIANT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2878-2880',
        any: [/@GIANT_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2880', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2882',
        any: [/@MAN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2882-2884',
        any: [/@MAN_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2884', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2886',
        any: [/@GIRL_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2886-2901',
        any: [/@GIRL_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2890', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2892-2898',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被女魔/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2892',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被女魔/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2894',
        any: [/PRINTFORML 欲情点数\+\{PLAY \* 10\}/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2897-2899', any: [/ELSE/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2900', any: [/^$/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2903',
        any: [/@BEAST_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2903-2905',
        any: [/@BEAST_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2905', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2907',
        any: [/@BRAIN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2907-2909',
        any: [/@BRAIN_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2909', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2911',
        any: [/@HORSE_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2911-2913',
        any: [/@HORSE_RYOU_YUSYA\(ARG\)/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2913', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2916-3016',
        any: [/@DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2916',
        any: [/@DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2920-2931',
        any: [/SIDEA = CFLAG:ARG:531/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2921-2924',
        any: [/SIDEA = CFLAG:ARG:531/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2925-2931',
        any: [/SIDEA = CFLAG:\(CFLAG:ARG:533\):531/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2930',
        any: [/SIDEB = CFLAG:ARG:533/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2933', any: [/SIF FEAR < 2/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2934-2935', any: [/FEAR\+\+/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2937', any: [/RETURN 0/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2937-2938', any: [/RETURN 0/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2940',
        any: [/CALL CHECK_STATUS, ARG, 1/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2942-2947',
        any: [/PRINTFORMW %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2943',
        any: [/PRINTFORMW %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2945',
        any: [/PRINTFORMW %SAVESTR:SIDEA%发现了奄奄一息的%SAVES/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2947',
        any: [/PRINTFORMW %SAVESTR:SIDEB%发现了奄奄一息的%SAVES/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2949-3012',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2950-2953',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2951',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2952',
        any: [/PRINTFORMW 只能眼睁睁地看着%SAVESTR:ARG%被带往了地下城深/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2954-2970',
        any: [/PRINTFORML 但%SAVESTR:ARG%似乎并没有脱身念头…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2954',
        any: [/PRINTFORML 但%SAVESTR:ARG%似乎并没有脱身念头…/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2956',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2959',
        any: [/PRINTFORML %SAVESTR:SIDEA%看着%SAVESTR:ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2960',
        any: [/PRINTFORML 露出了若有所思的神情、似乎已经出神了/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2961',
        any: [/PRINTFORMW %SAVESTR:SIDEB%只得带着%SAVESTR:S/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2963',
        any: [/PRINTFORML %SAVESTR:SIDEB%看着%SAVESTR:ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2965',
        any: [/PRINTFORMW %SAVESTR:SIDEA%只得带着%SAVESTR:S/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2970',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2971-2995',
        any: [/PRINTFORMW 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2972',
        any: [/PRINTFORMW 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2975-2980',
        any: [/BASE:ARG:1 \+= 100/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2977', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2978',
        any: [/PRINTFORMW 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2979', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2980', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2983',
        any: [/PRINTFORML %SAVESTR:SIDEA%看着%SAVESTR:ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2986',
        any: [/PRINTFORML 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2991', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2992',
        any: [/PRINTFORML 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '2993', any: [/ENDIF/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2994',
        any: [/ELSEIF CFLAG:SIDEB:131 > 3 && CFLAG:SIDE/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2995',
        any: [/PRINTFORML %SAVESTR:SIDEB%看着%SAVESTR:ARG/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2996-3010',
        any: [/PRINTFORML 露出了若有所思的神情、似乎已经出神了/],
      },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '2999',
        any: [/CFLAG:\(CFLAG:ARG:533\):507 = 1/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3000', any: [/BASE:ARG:0 \+= 100/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3001', any: [/BASE:ARG:1 \+= 100/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3002', any: [/CFLAG:ARG:1 = 2/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3003', any: [/ELSE/] },
      {
        src: DUNGEON_RYOUZYOKU_ERB,
        ref: '3004',
        any: [/PRINTFORMW 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3005', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3006', any: [/ENDIF/] },
      { src: DUNGEON_RYOUZYOKU_ERB, ref: '3014', any: [/CFLAG:ARG:1 = 2/] },
    ],
  },
  {
    js: 'ere/kojo/kojo-dungeon-bitch.js',
    refs: [
      {
        src: DUNGEON_BITCH_ERB,
        ref: '3-50',
        any: [/^\s*@DUNGEON_BITCH\(ARG\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '10-11', any: [/^\s*RETURN 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '11', any: [/^$/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '12-13',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", "D/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '16-23',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '20-21', any: [/^\s*RETURN 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '22', any: [/^\s*RETURN 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '25-31', any: [/^\s*IF CFLAG:ARG:120/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '27',
        any: [/^\s*IF RAND:\(SEIKOU \+ SIPPAI\) < SEIKOU/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '28',
        any: [/^\s*CALL LOG_TRY_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '29',
        any: [/^\s*CALL SELL_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '33-37',
        any: [/^\s*IF RAND\(1, 16\) < ABL:ARG:39/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '36',
        any: [/^\s*CALL DUNGEON_ANIMAL\(ARG\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '39-43',
        any: [/^\s*IF RAND:36 <= ABL:ARG:11 \+ ABL:ARG:31 \+ /m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '42',
        any: [/^\s*CALL SELF_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '45-47',
        any: [/^\s*SIF CFLAG:ARG:500 == 0 && CFLAG:ARG:1 ==/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '47',
        any: [/^\s*CALL DUNGEON_WORK\(ARG\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '53-82',
        any: [/^\s*@HEROINE_BITCH\(ARG\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '59-61',
        any: [/^\s*SIF BASE:ARG:0 < 300 \|\| BASE:ARG:1 < 100/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '61', any: [/^$/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '62-63',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", "T/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '66-72', any: [/^\s*IF  CFLAG:ARG:120/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '70',
        any: [/^\s*CALL LOG_TRY_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '71',
        any: [/^\s*CALL SELL_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '75-77',
        any: [/^\s*SIF CFLAG:ARG:582 < -10000 && !TALENT:AR/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '77', any: [/^\s*CALL 强制肉偿\(ARG\)/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '78-81',
        any: [/^\s*IF RAND:36 <= ABL:ARG:11 \+ ABL:ARG:31 \+ /m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '81',
        any: [/^\s*CALL SELF_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '97-329',
        any: [/^\s*@SELL_BITCH\(ARG, PLACE\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '98-112', any: [/^\s*#LOCALSIZE 1/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '113',
        any: [/^\s*KYAKU = FI_CULC_BITCH\(ARG, "KYAKU", PLAC/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '115', any: [/^\s*IF KYAKU/m] },
      { src: DUNGEON_BITCH_ERB, ref: '116-119', any: [/^\s*VARSET PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '122-128',
        any: [/^\s*FOR LCOUNT, 0, 100/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '124',
        any: [/^\s*PREV_EXP:LCOUNT = EXP:ARG:LCOUNT/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '127',
        any: [/^\s*PREV_JUEL:LCOUNT = JUEL:ARG:LCOUNT/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '129',
        any: [/^\s*PREV_KARMA = CFLAG:ARG:151/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '131-141',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '132', any: [/^\s*SETBIT CHECK, 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '135',
        any: [/^\s*PREV_MONEY = CFLAG:ARG:580/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '137', any: [/^\s*PREV_MONEY = MONEY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '140',
        any: [/^\s*PREV_MONEY = CFLAG:ARG:580/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '143-188',
        any: [/^\s*FOR LCOUNT, 0, KYAKU/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '145-146',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", PL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '148-150',
        any: [/^\s*SIF RAND:\(SEIKOU \+ SIPPAI\) >= SEIKOU/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '149', any: [/^\s*CONTINUE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '151-152',
        any: [/^\s*LOCAL = FI_TRY_BITCH\(ARG, PLACE\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '156-157', any: [/^\s*SIF !LOCAL/m] },
      { src: DUNGEON_BITCH_ERB, ref: '157', any: [/^\s*CONTINUE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '158-159',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LOCAL\)%/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '161-163',
        any: [/^\s*SIF !FI_CULC_BITCH\(ARG, "ABLE", LOCALS\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '163', any: [/^\s*CONTINUE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '165-169',
        any: [/^\s*PLAY = FI_CULC_BITCH\(ARG, "PLAY", LOCALS/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '167',
        any: [/^\s*PLAY = FI_CULC_BITCH\(ARG, "PLAY", LOCALS/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '169', any: [/^\s*SETBIT CHECK, LOCAL/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '170-186',
        any: [/^\s*CALL PROFIT_BITCH\(ARG, PLACE, LOCALS, PL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '172',
        any: [/^\s*CALL PROFIT_BITCH\(ARG, PLACE, LOCALS, PL/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '175-178', any: [/^\s*CASE 1/m] },
      { src: DUNGEON_BITCH_ERB, ref: '177', any: [/^\s*MAN:MAN \+\+/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '178',
        any: [/^\s*SETBIT CHECK, \(10 \+ MAN\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '180-183', any: [/^\s*CASE 2/m] },
      { src: DUNGEON_BITCH_ERB, ref: '182', any: [/^\s*GIRL:GIRL \+\+/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '183',
        any: [/^\s*SETBIT CHECK, \(20 \+ GIRL\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '186',
        any: [/^\s*CALL EXP_BITCH\(ARG, PLACE, LOCALS, PLAY\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '190-192', any: [/^\s*PLAY = 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '192',
        any: [/^\s*PLAY = SUMARRAY\(PLAY\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '194-317', any: [/^\s*IF PLAY > 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '197-201', any: [/^\s*MAN = 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '199',
        any: [/^\s*MAN = SUMARRAY\(MAN\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '201',
        any: [/^\s*GIRL = SUMARRAY\(GIRL\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '203-244',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '205',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '206', any: [/^\s*VARSET LOCALS/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '208',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("DUNGEON_MAN", MA/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '212',
        any: [/^\s*PRINTFORML %LOCALS%、/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '213', any: [/^\s*PRINTFORM 于是/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '215',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("DUNGEON_GIRL", G/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '217',
        any: [/^\s*PRINTFORML 以%LOCALS%为对手/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '219',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("PLAYNAME", PLAY:/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '220',
        any: [/^\s*PRINTFORMW %LOCALS%进行着/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '222-244', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '223',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '224', any: [/^\s*VARSET LOCALS/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '226',
        any: [/^\s*PRINTFORMW 进行了\{PLAY:6\}次兽交秀。/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '229',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("TOWN_MAN", MAN:1/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '232',
        any: [/^\s*PRINTFORML %LOCALS%、/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '233', any: [/^\s*PRINTFORM 于是/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '235',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("TOWN_GIRL", GIRL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '237',
        any: [/^\s*PRINTFORML 以%LOCALS%为对手/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '239',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("PLAYNAME", PLAY:/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '240',
        any: [/^\s*PRINTFORMW %LOCALS%进行着/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '242',
        any: [/^\s*PRINTFORMW 并且进行了\{PLAY:6\}次兽奸表演/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '246-248',
        any: [/^\s*LOCAL = -1 \* PLAY/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '248',
        any: [/^\s*CALL KARMA, ARG, LOCAL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '250',
        any: [/^\s*CALL LOG_AFTER_BITCH\(ARG, CHECK\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '252-262',
        any: [/^\s*PRINTFORML 					～经验与点数变化～/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '252',
        any: [/^\s*PRINTFORML 					～经验与点数变化～/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '254',
        any: [/^\s*SIF PREV_EXP:LCOUNT == EXP:ARG:LCOUNT/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '256',
        any: [/^\s*PRINTFORML %EXPNAME:LCOUNT, 16, RIGHT%：\{/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '259',
        any: [/^\s*SIF PREV_JUEL:LCOUNT == JUEL:ARG:LCOUNT/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '261',
        any: [/^\s*PRINTFORML %PALAMNAME:LCOUNT, 12, RIGHT%/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '263', any: [/^\s*WAIT/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '264-299',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '266-267',
        any: [/^\s*EXP:0:80 \+= PLAY/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '266', any: [/^\s*EXP:0:80 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '267', any: [/^\s*EXP:ARG:80 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '268',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%淫荡行为成为了魔王和奴隶们的力量/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '270-272',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '272',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%获得了\{LOCAL\}数量的金币/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '274-293',
        any: [/^\s*LOCAL = MONEY - PREV_MONEY/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '277',
        any: [/^\s*LOCAL = LOCAL\/10\*9/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '278',
        any: [/^\s*PRINTFORMW 基於对魔王的爱意，%SAVESTR:ARG%将卖得收入的九/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '280',
        any: [/^\s*LOCAL = LOCAL\/10\*9/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '281',
        any: [/^\s*PRINTFORMW 基於对魔王的感情，%SAVESTR:ARG%将卖得收入的七/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '284', any: [/^\s*LOCAL \/= 2 \+ 1/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '285',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%将卖得收入的一半上交了。献上了\{/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '287', any: [/^\s*LOCAL \/= 2/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '288',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%将卖得收入的一半上交了。献上了\{/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '291', any: [/^\s*MONEY -= LOCAL/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '292',
        any: [/^\s*EX_FLAG:4444 -= LOCAL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '293',
        any: [/^\s*CFLAG:ARG:580 \+= LOCAL/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '295-298', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '297',
        any: [/^\s*EXP:ARG:80 \+= LOCAL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '298',
        any: [/^\s*PRINTFORMW 获得了%SAVESTR:ARG%\{LOCAL\}点的金钱以及/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '300-303',
        any: [/^\s*LOCAL = PREV_KARMA - CFLAG:ARG:151/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '303',
        any: [/^\s*PRINTFORMW 然后，善恶值减少了\{ABS\(LOCAL\)\}。/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '305-316', any: [/^\s*ELSE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '306-316', any: [/^\s*ELSE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '306-328', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '308',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '310',
        any: [
          /^\s*PRINTFORMW 在下不定决心而烦恼的时候，时间不断地流失掉了\.\.\./m,
        ],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '312',
        any: [
          /^\s*PRINTFORMW 然而，根本没有勇气发出声音，说自己在卖春的这种事情。/m,
        ],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '314',
        any: [/^\s*PRINTFORM \{KYAKU\}人群的声音嘈杂着、/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '315',
        any: [/^\s*PRINTFORMW 交涉终了，一个人也没有买下%SAVESTR:ARG%，就这/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '318-328', any: [/^\s*ELSE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '319-328', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '321',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '323',
        any: [
          /^\s*PRINTFORMW 在下不定决心而烦恼的时候，时间不断地流失掉了\.\.\./m,
        ],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '325',
        any: [
          /^\s*PRINTFORMW 然而，根本没有勇气发出声音，说自己在卖春的这种事情。/m,
        ],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '327',
        any: [/^\s*PRINTFORMW 于是、一个对象也没有找到/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '334-417',
        any: [/^\s*@EXP_BITCH\(ARG, PLACE, TYPE, PLAY\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '341-352', any: [/^\s*CASE "HAND"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '342', any: [/^\s*EXP:ARG:20 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '343', any: [/^\s*EXP:ARG:74 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '345',
        any: [/^\s*JUEL:ARG:7 \+= PLAY \* 5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '347', any: [/^\s*JUEL:ARG:7 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '350', any: [/^\s*JUEL:ARG:9 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '352',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '353-367', any: [/^\s*CASE "ORAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '354', any: [/^\s*EXP:ARG:22 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '355', any: [/^\s*EXP:ARG:20 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '356', any: [/^\s*EXP:ARG:74 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '358',
        any: [/^\s*JUEL:ARG:7 \+= PLAY \* 10/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '360', any: [/^\s*JUEL:ARG:7 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '363', any: [/^\s*JUEL:ARG:9 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '365', any: [/^\s*EXP:8 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '366',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 10/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '368-379', any: [/^\s*CASE "LES"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '369', any: [/^\s*EXP:ARG:40 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '370', any: [/^\s*EXP:ARG:74 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '372',
        any: [/^\s*EXP:ARG:2 \+= PLAY \* \(1 \+ ABL:ARG:10\) \/ 5/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '373',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 100 \* \(1 \+ ABL:ARG:/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '374',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '376',
        any: [/^\s*EXP:ARG:2 \+= PLAY \* \(1 \+ ABL:ARG:10\) \/ 1/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '377',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 10 \* ABL:ARG:10/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '378',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '380-390', any: [/^\s*CASE "ANAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '381', any: [/^\s*EXP:ARG:1 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '382', any: [/^\s*EXP:ARG:5 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '383', any: [/^\s*EXP:ARG:74 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '385',
        any: [/^\s*JUEL:ARG:2 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '386',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '388',
        any: [/^\s*JUEL:ARG:2 \+= PLAY \* 10/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '389',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '391-401', any: [/^\s*CASE "SEX"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '392', any: [/^\s*EXP:ARG:0 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '393', any: [/^\s*EXP:ARG:5 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '394', any: [/^\s*EXP:ARG:74 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '396',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '397',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '399',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 10/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '400',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '402-412', any: [/^\s*CASE "ANIMAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '403', any: [/^\s*EXP:56 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '404', any: [/^\s*EXP:0 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '405', any: [/^\s*EXP:5 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '406',
        any: [/^\s*JUEL:1 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '407',
        any: [/^\s*JUEL:6 \+= PLAY \* 300/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '408',
        any: [/^\s*JUEL:8 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '420-495',
        any: [/^\s*@PROFIT_BITCH\(ARG, PLACE, TYPE, PLAY\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '426-428', any: [/^\s*#DIM PAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '429-440',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '433',
        any: [/^\s*PAY = \(FI_CULC_BITCH\(ARG, "RATE", TYPE\) /m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '436',
        any: [/^\s*PAY = 5 \* \(1 \+ CFLAG:ARG:501 \+ FI_CULC_B/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '439',
        any: [/^\s*PAY = FI_CULC_BITCH\(ARG, "RATE", "KARMA"/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '442-462', any: [/^\s*SELECTCASE TYPE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '444-445', any: [/^\s*CASE "ANIMAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '447', any: [/^\s*GIRL = RAND\(1, 6\)/m] },
      { src: DUNGEON_BITCH_ERB, ref: '449-450', any: [/^\s*CASE 3/m] },
      { src: DUNGEON_BITCH_ERB, ref: '451-452', any: [/^\s*CASE 4/m] },
      { src: DUNGEON_BITCH_ERB, ref: '455', any: [/^\s*MAN = RAND\(1, 6\)/m] },
      { src: DUNGEON_BITCH_ERB, ref: '457-458', any: [/^\s*CASE 3/m] },
      { src: DUNGEON_BITCH_ERB, ref: '459-460', any: [/^\s*CASE 4/m] },
      { src: DUNGEON_BITCH_ERB, ref: '464-465', any: [/^\s*SIF !EXP:ARG:74/m] },
      { src: DUNGEON_BITCH_ERB, ref: '465', any: [/^\s*PAY \+= 10/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '467-468',
        any: [/^\s*SIF TALENT:ARG:0/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '468', any: [/^\s*PAY \+= 5/m] },
      { src: DUNGEON_BITCH_ERB, ref: '470', any: [/^\s*PAY = PAY \* PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '472-483',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '476',
        any: [/^\s*CFLAG:ARG:580 \+= PAY/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '478', any: [/^\s*MONEY \+= PAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '479',
        any: [/^\s*EX_FLAG:4444 \+= PAY/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '482',
        any: [/^\s*CFLAG:ARG:580 \+= PAY/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '485-492', any: [/^\s*SELECTCASE TYPE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '486-487', any: [/^\s*CASE "ANIMAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '488-489', any: [/^\s*CASE "LES"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '490-491', any: [/^\s*CASEELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '497-516',
        any: [/^\s*@DUNGEON_WORK\(ARG\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '500',
        any: [/^\s*LOCAL = \(CFLAG:ARG:9 \* 20\) \+ 100/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '501-502',
        any: [/^\s*SIF CFLAG:ARG:0 == 0/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '503-512', any: [/^\s*IF FLAG:5 & 32/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '504',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%从事了/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '505-510', any: [/^\s*PRINTDATA/m] },
      { src: DUNGEON_BITCH_ERB, ref: '505', any: [/^\s*PRINTDATA/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '511',
        any: [/^\s*PRINTFORMW 副业\{LOCAL\}点收入。/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '513-514', any: [/^\s*MONEY \+= LOCAL/m] },
      { src: DUNGEON_BITCH_ERB, ref: '513', any: [/^\s*MONEY \+= LOCAL/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '514',
        any: [/^\s*EX_FLAG:4444 \+= LOCAL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '519-558',
        any: [/^\s*@DUNGEON_ANIMAL\(ARG\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '522', any: [/^\s*#DIM PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '524-528',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%无法压抑兽交的欲望/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '524',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%无法压抑兽交的欲望/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '525',
        any: [/^\s*PRINTFORMW 悄悄寻找着兽穴\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '526',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%进入了野兽的巢穴，像母狗一样趴在/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '527',
        any: [/^\s*PRINTFORMW 随后%SAVESTR:ARG%翻身将野兽压倒在地，主动跨坐/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '528',
        any: [/^\s*PRINTFORMW 忘我地与野兽样的魔物交尾了\{PLAY\}次…/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '530',
        any: [/^\s*CALL LOG_BITCH_ANIMAL\(ARG, "DUNGEON"\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '531', any: [/^\s*WAIT/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '534-539',
        any: [/^\s*PRINTFORML %EXPNAME:56%＋\{PLAY\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '534',
        any: [/^\s*PRINTFORML %EXPNAME:56%＋\{PLAY\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '535',
        any: [/^\s*PRINTFORML %EXPNAME:0%＋\{PLAY\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '536',
        any: [/^\s*PRINTFORML %EXPNAME:5%＋\{PLAY\}/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '537', any: [/^\s*EXP:ARG:56 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '538', any: [/^\s*EXP:ARG:0 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '539', any: [/^\s*EXP:ARG:5 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '542-547',
        any: [/^\s*PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*200\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '542',
        any: [/^\s*PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*200\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '543',
        any: [/^\s*PRINTFORML %PALAMNAME:6%点数＋\{PLAY\*300\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '544',
        any: [/^\s*PRINTFORMW %PALAMNAME:8%点数＋\{PLAY\*200\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '545',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '546',
        any: [/^\s*JUEL:ARG:6 \+= PLAY \* 300/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '547',
        any: [/^\s*JUEL:ARG:8 \+= PLAY \* 200/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '549-551',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '549',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '550', any: [/^\s*EXP:0:80 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '551', any: [/^\s*EXP:ARG:80 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '553-555',
        any: [/^\s*LOCAL = -1 \* PLAY/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '554',
        any: [/^\s*PRINTFORMW （善恶值减少了：\{LOCAL\}）/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '555',
        any: [/^\s*CALL KARMA, ARG, LOCAL/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '560-670',
        any: [/^\s*@SELF_BITCH\(ARG, PLACE\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '564', any: [/^\s*#DIM PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '565',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%无法压抑性欲，自慰了起来/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '568-630',
        any: [/^\s*IF !TALENT:ARG:85 && ABL:ARG:22 > RAND:5/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '569-572',
        any: [/^\s*IF !TALENT:ARG:85 && ABL:ARG:22 > RAND:5/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '571',
        any: [/^\s*PRINTFORM 想象着跟女人的交合/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '572', any: [/^\s*LOCAL = 1/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '573-576',
        any: [/^\s*ELSEIF ITEM:22 && !TALENT:ARG:85 && ABL:/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '575',
        any: [/^\s*PRINTFORM 陷入了跟野兽交尾的幻想/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '576', any: [/^\s*LOCAL = 2/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '577-586',
        any: [/^\s*ELSEIF PLACE == "DUNGEON" && RAND\(1, 40\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '580', any: [/^\s*PRINTDATA/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '581',
        any: [/^\s*DATAFORM 想起%CALLNAME:MASTER%的事/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '582',
        any: [/^\s*DATAFORM 一次次呼唤着%CALLNAME:MASTER%的名字/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '583',
        any: [/^\s*DATAFORM 想起了上次的调教/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '584',
        any: [/^\s*DATAFORM 想象着下一次的调教/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '586', any: [/^\s*LOCAL = 3/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '587-615',
        any: [/^\s*ELSEIF RAND\(1, 5\) < ABL:ARG:31/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '590', any: [/^\s*PRINTDATA/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '591',
        any: [/^\s*DATAFORM 如饥似渴，一副十分想要的样子/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '592',
        any: [/^\s*DATAFORM 无法满足的欲望，心情变得十分急躁/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '593',
        any: [/^\s*DATAFORM 不自觉地张开着嘴巴/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '594',
        any: [/^\s*DATAFORM 根本不在意口水滴落下来的样子/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '595',
        any: [/^\s*DATAFORM 根本不在意口水流下来的样子/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '596',
        any: [/^\s*DATAFORM 一脸恍惚的样子/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '597',
        any: [/^\s*DATAFORM 一脸沉浸在欲望中的快乐表情/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '598',
        any: [/^\s*DATAFORM 红晕慢慢爬上了脸颊/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '599',
        any: [/^\s*DATAFORM 欲望高涨，身体如同火烧一般/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '600', any: [/^\s*DATAFORM 呆滞的眼神/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '601',
        any: [/^\s*DATAFORM 充满情欲的眼睛，变得水汪汪的/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '602',
        any: [/^\s*DATAFORM 突然将双腿张开/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '603',
        any: [/^\s*DATAFORM 身体一颤一颤的/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '604',
        any: [/^\s*DATAFORM 将股间张得大大的/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '605',
        any: [/^\s*DATAFORM 不知不觉的扭动着腰肢/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '606',
        any: [/^\s*DATAFORM 欲求不满的摇动着腰肢/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '607',
        any: [/^\s*DATAFORM 腰部下流的扭动着/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '608', any: [/^\s*DATAFORM 仰起喉咙/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '609',
        any: [/^\s*DATAFORM 时不时从嘴边发出呻吟/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '610',
        any: [/^\s*DATAFORM 爱液浸湿了床具/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '611',
        any: [/^\s*DATAFORM 涂满了溢出来的爱液/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '612',
        any: [/^\s*DATAFORM 十分粗野的撕扯着衣服，双乳若隐若现/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '613',
        any: [/^\s*DATAFORM 挣扎在绝顶的边缘/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '615', any: [/^\s*LOCAL = 4/m] },
      { src: DUNGEON_BITCH_ERB, ref: '616-629', any: [/^\s*ELSE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '618', any: [/^\s*PRINTDATA/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '619',
        any: [/^\s*DATAFORM 努力地忍住声音/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '620',
        any: [/^\s*DATAFORM 拼命地将气息憋住/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '621',
        any: [/^\s*DATAFORM 注意着周围的动静/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '622',
        any: [/^\s*DATAFORM 想着要停下来也\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '623',
        any: [/^\s*DATAFORM 用踌躇的动作/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '624',
        any: [/^\s*DATAFORM 迷惑地将手指重合了起来/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '625',
        any: [/^\s*DATAFORM 牢牢地将嘴唇重合起来/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '626',
        any: [/^\s*DATAFORM 懒洋洋地低下了头/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '627',
        any: [/^\s*DATAFORM 烦恼地皱了皱眉头/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '629', any: [/^\s*LOCAL = 5/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '632-635',
        any: [/^\s*IF TALENT:ARG:121 == 1 \|\| TALENT:ARG:122/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '634',
        any: [/^\s*PRINT 握住肉棒捋了起来/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '637',
        any: [/^\s*PRINTFORMW 自慰了\{PLAY\}次。/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '639-641',
        any: [/^\s*CALL LOG_BITCH_SELF\(ARG, PLACE, LOCAL\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '640',
        any: [/^\s*CALL LOG_BITCH_SELF\(ARG, PLACE, LOCAL\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '641', any: [/^\s*WAIT/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '643-645',
        any: [/^\s*PRINTFORML %EXPNAME:10%＋\{PLAY\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '644',
        any: [/^\s*PRINTFORML %EXPNAME:10%＋\{PLAY\}/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '645', any: [/^\s*EXP:ARG:10 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '647-657',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '649',
        any: [/^\s*PRINTFORML 阴茎点数＋\{PLAY \* 500\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '651',
        any: [/^\s*PRINTFORML %PALAMNAME:0%点数＋\{PLAY \* 500\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '653',
        any: [/^\s*PRINTFORML %PALAMNAME:4%点数＋\{PLAY \* 100\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '654',
        any: [/^\s*PRINTFORMW %PALAMNAME:5%点数＋\{PLAY \* 250\}/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '655',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 500/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '656',
        any: [/^\s*JUEL:ARG:4 \+= PLAY \* 100/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '657',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '659-666',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '660', any: [/^\s*EXP:ARG:80 \+= PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '661', any: [/^\s*EXP:0:80 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '662',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '664', any: [/^\s*EXP:ARG:80 \+= PLAY/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '665',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%获得了\{PLAY\}点经验值。/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '673-723',
        any: [/^\s*@FI_TRY_BITCH\(ARG, PLACE\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '676-677', any: [/^\s*#DIM LCOUNT/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '680-689',
        any: [/^\s*FOR LCOUNT, 1, 7/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '682',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LCOUNT\)%/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '683',
        any: [/^\s*PLAY:LCOUNT = FI_CULC_BITCH\(ARG, "KAKURI/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '684-685',
        any: [/^\s*PLAY:LCOUNT \+= FI_CULC_BITCH\(ARG, "RATE"/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '687-688',
        any: [/^\s*SIF !FI_CULC_BITCH\(ARG, "ABLE", LOCALS\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '691',
        any: [/^\s*PLAY:0 = SUMARRAY\(PLAY\) \+ FI_CULC_BITCH\(/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '693-700',
        any: [/^\s*FOR LCOUNT, 1, 6/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '695',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LCOUNT\)%/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '696',
        any: [/^\s*PLAY:LCOUNT = FI_CULC_BITCH\(ARG, "KAKURI/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '699', any: [/^\s*PLAY:LCOUNT = 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '701',
        any: [/^\s*PLAY:0 = SUMARRAY\(PLAY\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '703-708',
        any: [/^\s*IF CFLAG:ARG:500 == 1/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '705',
        any: [/^\s*PLAY:0 \+= FI_CULC_BITCH\(ARG, "SIPPAI", "/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '707',
        any: [/^\s*PLAY:0 \+= FI_CULC_BITCH\(ARG, "SIPPAI", "/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '711-712', any: [/^\s*SIF PLAY <= 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '714-719',
        any: [/^\s*LOCAL = RAND:PLAY/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '714', any: [/^\s*LOCAL = RAND:PLAY/m] },
      { src: DUNGEON_BITCH_ERB, ref: '717', any: [/^\s*RETURNF LCOUNT/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '718',
        any: [/^\s*LOCAL -= PLAY:LCOUNT/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '720', any: [/^\s*RETURNF 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '727-1148',
        any: [/^\s*@FI_CULC_BITCH\(ARG, ARGS, ARGS:1\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '733-766', any: [/^\s*CASE "SIPPAI"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '741-745',
        any: [/^\s*LOCAL = 250 \+ CFLAG:ARG:151/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '748',
        any: [/^\s*LOCAL \/= \(1 \+ ABL:ARG:37\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '750-751',
        any: [/^\s*SIF TALENT:ARG:76/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '753-757',
        any: [/^\s*IF TALENT:ARG:181/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '760-761',
        any: [/^\s*SIF CFLAG:ARG:120 == 0/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '764',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '765', any: [/^\s*RETURNF LOCAL/m] },
      { src: DUNGEON_BITCH_ERB, ref: '767-822', any: [/^\s*CASE "SEIKOU"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '768',
        any: [/^\s*LOCAL = ABL:ARG:37 \* 5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '770', any: [/^\s*LOCAL \+\+/m] },
      { src: DUNGEON_BITCH_ERB, ref: '772', any: [/^\s*LOCAL \+\+/m] },
      { src: DUNGEON_BITCH_ERB, ref: '775', any: [/^\s*LOCAL \+= 100/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '777',
        any: [/^\s*LOCAL \+= \(TALENT:ARG:76 \+ TALENT:ARG:180/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '779-797',
        any: [/^\s*SELECTCASE CFLAG:ARG:580 \+ CFLAG:ARG:581/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '781-782',
        any: [/^\s*CASE IS < -40000/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '783-784',
        any: [/^\s*CASE IS < -20000/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '785-786',
        any: [/^\s*CASE IS < -10000/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '787-788', any: [/^\s*CASE IS < -5000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '789-790', any: [/^\s*CASE IS < 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '791-792', any: [/^\s*CASE IS < 5000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '793-794', any: [/^\s*CASE IS < 10000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '795-796', any: [/^\s*CASEELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '800-814',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '802-803',
        any: [/^\s*CASE IS < -40000/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '804-805',
        any: [/^\s*CASE IS < -20000/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '806-807',
        any: [/^\s*CASE IS < -10000/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '808-809', any: [/^\s*CASE IS < -5000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '810-811', any: [/^\s*CASE IS < 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '812-813', any: [/^\s*CASE IS < 5000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '814-815', any: [/^\s*CASE IS < 10000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '816-817', any: [/^\s*CASEELSE/m] },
      { src: DUNGEON_BITCH_ERB, ref: '818-826', any: [/^\s*ENDSELECT/m] },
      { src: DUNGEON_BITCH_ERB, ref: '820-823', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '824-825',
        any: [/^\s*TIMES LOCAL, 0\.75/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '826-827',
        any: [/^\s*ELSEIF CFLAG:ARG:500 == 1/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '830-837', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '840',
        any: [/^\s*LOCAL \+= \(CFLAG:ARG:120 \* 100\) - 5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '841', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '844-946',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '845', any: [/^\s*;0にはならない/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '846-858',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '849', any: [/^\s*CASE "KYAKU"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '851', any: [/^\s*;カルマ補正/m] },
      { src: DUNGEON_BITCH_ERB, ref: '853', any: [/^\s*CASE IS > 180/m] },
      { src: DUNGEON_BITCH_ERB, ref: '855', any: [/^\s*CASE IS > 130/m] },
      { src: DUNGEON_BITCH_ERB, ref: '857', any: [/^\s*CASE IS > 80/m] },
      { src: DUNGEON_BITCH_ERB, ref: '859', any: [/^\s*CASE IS > 30/m] },
      { src: DUNGEON_BITCH_ERB, ref: '861', any: [/^\s*LOCAL \+= 1/m] },
      { src: DUNGEON_BITCH_ERB, ref: '863', any: [/^\s*LOCAL \+= 2/m] },
      { src: DUNGEON_BITCH_ERB, ref: '866-881', any: [/^\s*CASEELSE/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '883-902',
        any: [/^\s*LOCAL \+= \(ABL:ARG:15 \+ ABL:ARG:17 \+ ABL:/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '900',
        any: [/^\s*SIF TALENT:ARG:99 && TALENT:ARG:248/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '902', any: [/^\s*IF ARGS:1 == "TOWN"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '906',
        any: [/^\s*SELECTCASE CFLAG:ARG:580 \+ CFLAG:581 \+ C/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '908', any: [/^\s*LOCAL \+= 5/m] },
      { src: DUNGEON_BITCH_ERB, ref: '910', any: [/^\s*LOCAL \+= 4/m] },
      { src: DUNGEON_BITCH_ERB, ref: '913', any: [/^\s*CASE IS < -5000/m] },
      { src: DUNGEON_BITCH_ERB, ref: '916-931', any: [/^\s*LOCAL \+= 1/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '932-946',
        any: [/^\s*TIMES LOCAL, 0\.5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '947-959', any: [/^\s*SIF ARG < 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '949-956', any: [/^\s*SIF ARG < 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '961-963', any: [/^\s*CASE "ORAL",/m] },
      { src: DUNGEON_BITCH_ERB, ref: '966', any: [/^\s*CASE "LES"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '967',
        any: [/^\s*;レズっ気2以上、C感覚3以上、欲望2以上、技巧2以上が必要/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '969-1026', any: [/^\s*RETURNF 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '972-976', any: [/^\s*RETURNF 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '973', any: [/^\s*;おしりコース/m] },
      { src: DUNGEON_BITCH_ERB, ref: '975', any: [/^\s*;本番コース/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '981',
        any: [/^\s*SIF CFLAG:ARG:42 == 79 && \(CFLAG:ARG:40 /m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '983', any: [/^\s*;貞操封印だとダメ/m] },
      { src: DUNGEON_BITCH_ERB, ref: '985-988', any: [/^\s*RETURNF 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '987',
        any: [/^\s*;貞操封印ぬけてたっぽいので追加/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '989-997',
        any: [/^\s*SIF ITEM:22 == 0/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '992-993',
        any: [/^\s*SIF ITEM:22 == 0/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '995-996',
        any: [/^\s*SIF TALENT:ARG:0 \|\| TALENT:ARG:122 == 1/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '998',
        any: [/^\s*SIF CFLAG:ARG:42 == 79 && \(CFLAG:ARG:40 /m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '999-1008', any: [/^\s*RETURNF 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1002', any: [/^\s*RETURNF 0/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1004-1005', any: [/^\s*RETURNF 1/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1007',
        any: [/^\s*;SELFに限っては売春行為ではないため先に別個に処理する/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1009-1023',
        any: [/^\s*LOCAL = ABL:ARG:31 \+ RAND:\(ABL:ARG:11 \+ /m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1014', any: [/^\s*TIMES LOCAL, 1\.5/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1016',
        any: [/^\s*SIF TALENT:ARG:121 \|\| TALENT:ARG:122 \|\| /m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1018-1019',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1021', any: [/^\s*ENDIF/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1025',
        any: [/^\s*LOCAL \+= \(ABL:ARG:16 \+ ABL:ARG:37\) \/ 3/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1028-1108',
        any: [/^\s*TIMES LOCAL, 1\.2/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1030-1042', any: [/^\s*CASE "HAND"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1032',
        any: [/^\s*LOCAL \+= ABL:ARG:32 \/ 3/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1033', any: [/^\s*;おフェラコース/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1034', any: [/^\s*CASE "ORAL"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1036-1037',
        any: [/^\s*SIF EXP:ARG:22/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1039-1040', any: [/^\s*LOCAL \+\+/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1042', any: [/^\s*TIMES LOCAL, 1\.5/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1045-1108',
        any: [/^\s*LOCAL \+= \(ABL:ARG:0 \+ ABL:ARG:22\) \/ 3/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1045',
        any: [/^\s*LOCAL \+= \(ABL:ARG:0 \+ ABL:ARG:22\) \/ 3/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1046',
        any: [/^\s*LOCAL \+= TALENT:ARG:81 \+ TALENT:ARG:82/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1047',
        any: [/^\s*LOCAL \*= \(10 \+ ABL:ARG:33\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1048', any: [/^\s*LOCAL \/= 10/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1050-1051', any: [/^\s*CASE "ANAL"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1053-1055',
        any: [/^\s*SIF TALENT:ARG:77/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1056-1062', any: [/^\s*CASE "SEX"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1063-1067',
        any: [/^\s*LOCAL \+= \(ABL:ARG:30 \+ ABL:ARG:39\) \/ 3/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1068-1071',
        any: [/^\s*TIMES LOCAL, 1\.5/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1072-1075', any: [/^\s*LOCAL -= 5/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1076-1080', any: [/^\s*RETURNF LOCAL/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1083-1084',
        any: [/^\s*LOCAL \+= ABL:ARG:32 \+ 4/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1087', any: [/^\s*;おフェラコース/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1090-1144',
        any: [/^\s*SIF TALENT:ARG:52/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1091', any: [/^\s*LOCAL \+= 3/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1093-1097',
        any: [/^\s*SIF TALENT:ARG:47/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1098-1102',
        any: [/^\s*LOCAL \*= \(10 \+ ABL:ARG:33\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1103-1106',
        any: [/^\s*SIF TALENT:ARG:77/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1107-1110', any: [/^\s*CASE "SEX"/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1111-1114',
        any: [/^\s*TIMES LOCAL, 2\.0/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1115-1118',
        any: [/^\s*SIF TALENT:ARG:136/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1121', any: [/^\s*LOCAL \*= 5/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1122', any: [/^\s*RETURNF LOCAL/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1124-1148', any: [/^\s*CASE "RATE"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1129', any: [/^\s*CASE "KARMA"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1131', any: [/^\s*;手コキコース/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1133-1134', any: [/^\s*RETURNF 1/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1136', any: [/^\s*RETURNF 2/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1138', any: [/^\s*CASE "ANAL"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1140', any: [/^\s*;本番コース/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1150-1170',
        any: [/^\s*@SHOW_BUTTON_BICH_LEVEL\(NUM, ARG\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1157',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 卖春积极性 -/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1160', any: [/^\s*PRINT 没有/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1162', any: [/^\s*PRINT 普通/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1164',
        any: [/^\s*PRINTFORM \{CFLAG:ARG:120\}等级/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1167', any: [/^\s*PRINT/m] },
      { src: DUNGEON_BITCH_ERB, ref: '1169', any: [/^\s*RETURN 0/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1172-1196',
        any: [/^\s*@SET_BICH_LEVEL\(ARG\)/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1175', any: [/^\s*PRINTL 请设定等级/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1176',
        any: [/^\s*PRINTL \[0\] \[1\] \[2\] \[3\] \[4\] \[5\]/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1185',
        any: [/^\s*CFLAG:ARG:120 = RESULT/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1187-1188',
        any: [/^\s*IF RESULT == 0/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1188',
        any: [/^\s*PRINTW 卖春积极性变成没有了/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1189-1190',
        any: [/^\s*ELSEIF RESULT == 1/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1190',
        any: [/^\s*PRINTW 卖春积极性变成普通了/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1192',
        any: [/^\s*PRINTFORMW 卖春积极性变为等级\{RESULT\}了/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1199', any: [/^\s*\[SKIPSTART\]/m] },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1200',
        any: [/^\s*;ダンジョン内でのイベント奴隷用/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '3132', any: [/^\s*\[SKIPEND\]/m] },
    ],
  },
  {
    js: 'ere/kojo/kojo-dungeon-bitch-log.js',
    refs: [
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '8-49',
        any: [/^\s*@LOG_TRY_BITCH\(ARG,\ PLACE\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '14',
        any: [/^\s*PRINTFORM\ %FS_BITCH\("LOOKS",\ ARG\)%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '16-35',
        any: [/^\s*IF\ PLACE\ ==\ "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '18-26',
        any: [/^\s*IF\ CFLAG:ARG:1\ ==\ 2/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '21',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '23',
        any: [/^\s*PRINTFORM\ 对于借款只减少了一点点感到不满，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '25',
        any: [/^\s*PRINTFORM\ 在空闲的时间，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '28',
        any: [/^\s*PRINTFORM\ 瞒着同伴偷偷的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '29-32',
        any: [/^\s*ELSEIF\ CFLAG:ARG:500\ ==\ 1/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '31',
        any: [/^\s*PRINTFORM\ 被强迫/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '32',
        any: [/^\s*PRINTFORM\ 遵照命令，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '34',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '36-46', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '39',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '42',
        any: [/^\s*PRINTFORM\ 由於高额的债务，不由得开始/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '44',
        any: [/^\s*PRINTFORM\ 冒险资金花光了，/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '47',
        any: [/^\s*PRINTFORMW\ 考虑着出卖肉体的事。/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '51-277',
        any: [/^\s*@FS_BITCH\(TYPE,\ ARG\)/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '60-81', any: [/^\s*CASE\ "PLAY"/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '80',
        any: [/^\s*THROW\ 未知参数\{ARG\}/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '83-98',
        any: [/^\s*CASE\ "PLAYNAME"/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '98', any: [/^\s*GOTO\ ERROR_ARG/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '100-114',
        any: [/^\s*CASE\ "TOWN_MAN"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '115-129',
        any: [/^\s*CASE\ "TOWN_GIRL"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '130-144',
        any: [/^\s*CASE\ "DUNGEON_MAN"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '145-159',
        any: [/^\s*CASE\ "DUNGEON_GIRL"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '162-270',
        any: [/^\s*CASE\ "LOOKS"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '171',
        any: [/^\s*LOCALS\ =\ %GET_LOOK_INFO\(ARG,\ "头发颜色"\)%的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '174',
        any: [/^\s*LOCALS\ =\ 小麦色的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '176',
        any: [/^\s*LOCALS\ =\ 白皙的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '178',
        any: [/^\s*LOCALS\ =\ 青色的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '181',
        any: [/^\s*LOCALS\ =\ 白虎的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '183',
        any: [/^\s*LOCALS\ =\ 阴毛浓密的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '186',
        any: [/^\s*LOCALS\ =\ 毛躁的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '188',
        any: [/^\s*LOCALS\ =\ 翻白眼/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '190', any: [/^\s*LOCALS\ =\ 歪头/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '192',
        any: [/^\s*LOCALS\ =\ 忧郁的样子/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '194',
        any: [/^\s*LOCALS\ =\ 鼓腮的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '196',
        any: [/^\s*LOCALS\ =\ 慵懒的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '198',
        any: [/^\s*LOCALS\ =\ 不高兴的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '201',
        any: [/^\s*LOCALS\ =\ 严厉的眼神/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '204',
        any: [/^\s*LOCALS\ =\ 手指漂亮的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '206',
        any: [/^\s*LOCALS\ =\ 腰身纤细的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '208',
        any: [/^\s*LOCALS\ =\ 臀部美形的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '210',
        any: [/^\s*LOCALS\ =\ 双腿修长的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '212',
        any: [/^\s*LOCALS\ =\ 艳丽头发的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '214',
        any: [/^\s*LOCALS\ =\ 臀部丰满的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '216',
        any: [/^\s*LOCALS\ =\ 虎牙可爱的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '219',
        any: [/^\s*LOCALS\ =\ 元贵族/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '221',
        any: [/^\s*LOCALS\ =\ 元圣女/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '223',
        any: [/^\s*LOCALS\ =\ 肉便器/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '225',
        any: [/^\s*LOCALS\ =\ 高大的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '227',
        any: [/^\s*LOCALS\ =\ 矮小的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '229',
        any: [/^\s*LOCALS\ =\ 脸色不好的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '231',
        any: [/^\s*LOCALS\ =\ 假正经的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '233',
        any: [/^\s*LOCALS\ =\ 害羞的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '235',
        any: [/^\s*LOCALS\ =\ 任性的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '237',
        any: [/^\s*LOCALS\ =\ 笑容卑屈的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '239',
        any: [/^\s*LOCALS\ =\ 笑容灿烂的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '241',
        any: [/^\s*LOCALS\ =\ 要哭了似的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '243',
        any: [/^\s*LOCALS\ =\ 开朗的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '245',
        any: [/^\s*LOCALS\ =\ 水性杨花的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '248',
        any: [/^\s*LOCALS\ =\ 迷路的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '250',
        any: [/^\s*LOCALS\ =\ 卖身寻欢的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '253',
        any: [/^\s*LOCALS\ =\ 无法想象没有肉棒的生活的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '255',
        any: [/^\s*LOCALS\ =\ 一有空就不自觉地自慰的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '257',
        any: [/^\s*LOCALS\ =\ 变得非常喜欢腥臭精液的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '259',
        any: [/^\s*LOCALS\ =\ 渴望侵犯女性的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '261',
        any: [/^\s*LOCALS\ =\ 随时随地的渴望着Sexy，变成了欲望的俘虏/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '264-267',
        any: [/^\s*IF\ TALENT:ARG:76/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '269',
        any: [
          /^\s*LOCALS\ \+=\ @"%GET_LOOK_INFO\(ARG,\ "种族"\)%的%SAVESTR:AR/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '271',
        any: [/^\s*THROW\ 未知的TYPE%TYPE%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '279-316',
        any: [/^\s*@FS_LOG_BITCH\(TYPE,\ ARG:1,\ ARG:2,\ ARG:3,\ ARG:4,\ AR/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '290', any: [/^\s*CONTINUE/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '292',
        any: [/^\s*LOCALS\ \+=\ "、"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '293',
        any: [
          /^\s*LOCALS\ \+=\ @"\{ARG:LCOUNT\}人的%FS_BITCH\(TYPE,\ LCOUNT\)%/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '318-378',
        any: [/^\s*@LOG_AFTER_BITCH\(ARG,\ CHECK\)/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '326', any: [/^\s*PLAY\ =\ 6/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '329-333', any: [/^\s*DO/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '330',
        any: [/^\s*KYAKU\ =\ RAND\(1,\ 6\)/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '332', any: [/^\s*BREAK/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '334', any: [/^\s*PLAY\ =\ 3/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '343-347', any: [/^\s*DO/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '348', any: [/^\s*PLAY\ =\ 3/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '350-354', any: [/^\s*DO/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '355-361', any: [/^\s*DO/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '356',
        any: [/^\s*PLAY\ =\ RAND\(1,\ 6\)/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '358', any: [/^\s*CONTINUE/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '360', any: [/^\s*BREAK/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '366',
        any: [/^\s*LOCALS\ =\ %FS_BITCH\("PLAY",\ PLAY\)%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '368',
        any: [/^\s*CALLFORM\ LOG_BITCH_%LOCALS%\(ARG,\ "DUNGEON",\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '370',
        any: [/^\s*CALLFORM\ LOG_BITCH_%LOCALS%\(ARG,\ "TOWN",\ KYAKU\)/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '372', any: [/^\s*WAIT/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '380-552',
        any: [/^\s*@LOG_BITCH_HAND\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '385-397',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '386',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '389',
        any: [/^\s*PRINTFORM\ 公式般地揉搓着肉棒，一脸厌恶地/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '391',
        any: [/^\s*PRINTFORM\ 面对眼前的肉棒，垂下了双眼害羞地/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '393',
        any: [/^\s*PRINTFORM\ 看着客人的肉棒，一脸不开心的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '395',
        any: [/^\s*PRINTFORM\ 一边看着客人的反应，一边/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '397',
        any: [/^\s*PRINTFORM\ 看着客人勃起时的反应，很高兴的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '399',
        any: [/^\s*PRINTFORM\ 不时微笑着/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '401',
        any: [/^\s*PRINTFORM\ 娴熟的说着隐晦的淫词/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '401-476',
        any: [/^\s*PRINTFORM\ 娴熟的说着隐晦的淫词/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '403',
        any: [/^\s*PRINTFORMW\ 进行着手交卖春\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '408',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '412', any: [/^\s*PRINTDATAL/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '445', any: [/^\s*PRINTDATAL/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '445-475', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '479-551',
        any: [/^\s*CASE\ "TOWN"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '481',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '485', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '550',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上一边套动着阴茎一边看向客人的脸，时不时伸出舌/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '550-551',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上一边套动着阴茎一边看向客人的脸，时不时伸出舌/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '551',
        any: [
          /^\s*PRINTFORMW\ 在一阵无可忍耐的射精之后，%SAVESTR:ARG%一边舔着被弄脏的手一边不屑/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '554-722',
        any: [/^\s*@LOG_BITCH_ORAL\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '559',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '560-572',
        any: [/^\s*SELECTCASE\ ABL:ARG:32/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '562',
        any: [/^\s*PRINTFORM\ 看着顶到鼻尖的肉棒，脸色发青的/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '564',
        any: [/^\s*PRINTFORM\ 艰难的适应着肉棒的气味和味道/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '566',
        any: [/^\s*PRINTFORM\ 发出“呷浦呷浦”的下流声音/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '568',
        any: [/^\s*PRINTFORM\ 愉悦的享受着肉棒的味道/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '570',
        any: [/^\s*PRINTFORM\ 带着轻松愉快的表情/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '572',
        any: [/^\s*PRINTFORM\ 用积极又不太过冒犯的态度/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '574',
        any: [/^\s*PRINTFORMW\ 进行着收费口交\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '575',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上將客人的陽具吞入口中，用舌頭仔細地舔舐著。/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '578-650',
        any: [/^\s*CASE\ "DUNGEON"/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '580',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '584', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '650',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '653-720', any: [/^\s*CASE\ 1/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '654', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '719',
        any: [
          /^\s*PRINTFORMW\ 頭突然被用手緊緊的按住，随后腥臭的精液在口中爆发了/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '719-721',
        any: [
          /^\s*PRINTFORMW\ 頭突然被用手緊緊的按住，随后腥臭的精液在口中爆发了/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '720',
        any: [
          /^\s*PRINTFORMW\ 还没等其缓过神来，客人就将陽具继续插入喉咙，按着%SAVESTR:ARG%的頭/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '721',
        any: [
          /^\s*PRINTFORMW\ 在粗重的喘息声中，%SAVESTR:ARG%的脸和乳房都沾满了白浊腥臭的精液，/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '724-936',
        any: [/^\s*@LOG_BITCH_LES\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '729',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '729-741',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '732',
        any: [/^\s*PRINTFORM\ “明明知道不会插进来的”这样喃喃自语着/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '734',
        any: [/^\s*PRINTFORM\ 一点点兴奋了起来/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '736',
        any: [/^\s*PRINTFORM\ 用发出黏着水声的小穴/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '738',
        any: [/^\s*PRINTFORM\ 毫不掩饰自己的兴奋/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '740',
        any: [/^\s*PRINTFORM\ 呼喊着不成体统的话语/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '742',
        any: [/^\s*PRINTFORM\ 忘记了时间，一次又一次的和客人缠绵着/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '744',
        any: [/^\s*PRINTFORMW\ 进行着百合卖春\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '744-745',
        any: [/^\s*PRINTFORMW\ 进行着百合卖春\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '745',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上，用舌頭仔細地舔舐著魔女的陰蒂，頭突然被用手/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '746',
        any: [
          /^\s*PRINTFORMW\ 在沉重的喘息声中，魔女將%SAVESTR:ARG%搂在怀里，雌性发情的阴户互相/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '748-882',
        any: [/^\s*SELECTCASE\ PLACE/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '751',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '755', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '868',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '872', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '885-934',
        any: [/^\s*DATAFORM\ 「这是今天挣到的钱……」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '890', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '932-933',
        any: [/^\s*DATAFORM\ 「可以喜欢我吗？」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '934', any: [/^\s*ENDIF/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '935-936', any: [/^\s*ENDSELECT/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '938-1174',
        any: [/^\s*@LOG_BITCH_ANAL\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '943',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '943-955',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '946',
        any: [/^\s*PRINTFORM\ 拼命忍耐着痛苦/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '948',
        any: [/^\s*PRINTFORM\ 用经验不多的肠道/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '950',
        any: [/^\s*PRINTFORM\ 因为快乐露出了破绽，依然/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '952',
        any: [/^\s*PRINTFORM\ 用充分开发后的尻穴/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '954',
        any: [
          /^\s*PRINTFORM\ 紧锁着不知道用了多少次，已经变成了不逊于小穴的性器/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '956',
        any: [/^\s*PRINTFORM\ 不停地摆动着屁股/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '958',
        any: [/^\s*PRINTFORM\ 完完全全地沉溺在了H的快感之中/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '960',
        any: [/^\s*PRINTFORMW\ 进行着肛交卖春\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '961',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪伏在床上，像母狗一样摇动着屁股…/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '961-1136',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪伏在床上，像母狗一样摇动着屁股…/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '968',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '972', any: [/^\s*PRINTDATAL/m] },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1037-1133', any: [/^\s*ENDDATA/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1042',
        any: [/^\s*PRINTFORML\ 「这么H的衣服\~」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1045', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1102',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1139-1172',
        any: [/^\s*ELSEIF\ TALENT:ARG:161/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1141', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1171',
        any: [
          /^\s*PRINTFORMW\ 无法忍耐的客人從背将%SAVESTR:ARG%抱住像狗一樣耸动着，肛门在阳具的/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1171-1174',
        any: [
          /^\s*PRINTFORMW\ 无法忍耐的客人從背将%SAVESTR:ARG%抱住像狗一樣耸动着，肛门在阳具的/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1172',
        any: [
          /^\s*PRINTFORMW\ 四肢著地趴著的%SAVESTR:ARG%的臀瓣每次與客人的腰肢發生撞擊，都會提/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1173',
        any: [
          /^\s*PRINTFORMW\ 呼吸逐漸變得粗重而凌亂，客人將%SAVESTR:ARG%的臀部像揉面一般地揉撫/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1174',
        any: [
          /^\s*PRINTFORMW\ 随后客人躺在地上，让%SAVESTR:ARG%坐上来自己动，%SAVESTR:/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1176-1449',
        any: [/^\s*@LOG_BITCH_SEX\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1181-1196',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1182',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1185',
        any: [/^\s*PRINTFORM\ 拼命忍耐着痛苦/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1187',
        any: [/^\s*PRINTFORM\ 用经验不多的阴道/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1187-1190',
        any: [/^\s*PRINTFORM\ 用经验不多的阴道/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1189',
        any: [/^\s*PRINTFORM\ 沉浸在快乐之中/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1191',
        any: [/^\s*PRINTFORM\ 用已经完完全全的开发了小穴/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1192-1195',
        any: [/^\s*CASE\ 5,\ 6/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1193',
        any: [/^\s*PRINTFORM\ 用饱经疼爱经验丰富的小穴/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1196',
        any: [/^\s*PRINTFORM\ 上下摆动着那迷人的腰/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1198',
        any: [/^\s*PRINTFORM\ 不知道是第几次高潮了/m],
      },
      { src: DUNGEON_BITCH_ERB, ref: '1199', any: [/^\s*\[SKIPSTART\]/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1201-1408',
        any: [/^\s*IF\ RAND:2\ ==\ 1\ \&\&\ ABL:ARG:14\ >=\ 5/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1202',
        any: [/^\s*PRINTFORM\ 用像要扭断一样的气势挥动着腰/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1204',
        any: [/^\s*PRINTFORM\ 比起客人那边更疯狂的高潮着/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1207',
        any: [/^\s*PRINTFORMW\ 进行着性交卖春/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1212',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1219', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1303-1396',
        any: [/^\s*DATAFORM\ 「就在这里自慰」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1312',
        any: [/^\s*PRINTFORML\ 「这么H的衣服\~」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1315', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1372',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1411', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1411-1447',
        any: [/^\s*PRINTDATAL/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1416', any: [/^\s*PRINTDATAL/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1441',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%仰臥著用雙腿用力的夾住趴在自己身上的客人的腰發出呻吟/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1442',
        any: [
          /^\s*PRINTFORMW\ 随即被翻过身来，一边被玩弄肛门一边主动用屁股套弄着巨大的阴茎…/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1443',
        any: [
          /^\s*PRINTFORMW\ 随后%SAVESTR:ARG%被客人抱了起来，双腿被架在肩上，像洋娃娃一样被猛/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1447-1449',
        any: [/^\s*;・DUNGEONでは金銭の授受は無く自主的に行うプレイ/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1451',
        any: [/^\s*@LOG_BITCH_ANIMAL\(ARG,\ PLACE,\ ARG:1\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1451-1483',
        any: [/^\s*@LOG_BITCH_ANIMAL\(ARG,\ PLACE,\ ARG:1\)/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1457',
        any: [/^\s*CALL DUNGEON_SEX_LOG, MEN/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1459',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1460-1463',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1464',
        any: [/^\s*PRINTFORMW\ 在大家的眼前不知羞耻的进行着兽交表演\.\.\./m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1465',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%进入了兽栏，在众人炽热的注目下像母狗一样趴在地上，扭/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1466',
        any: [
          /^\s*PRINTFORMW\ 随后一条猎犬躺在地上，%SAVESTR:ARG%主动跨坐在野兽的阴茎上扭動著自/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1467',
        any: [
          /^\s*PRINTFORMW\ 围观的观众们一边看着这场兽奸秀一边兴奋的手淫，时不时有人冲上前去向%SAVES/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1469-1478',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1485-1519',
        any: [/^\s*@LOG_BITCH_SELF\(ARG,\ PLACE,\ PLAY\)/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1488-1517',
        any: [/^\s*\#DIMS\ PLACE/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1523', any: [/^\s*;\[SKIPSTART\]/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1532',
        any: [/^\s*@DUNGEON_SEX_LOG,\ ARG:0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1532-1782',
        any: [/^\s*@DUNGEON_SEX_LOG,\ ARG:0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1543-1576',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1546',
        any: [/^\s*PRINTFORML\ 「穿着这么下流的衣服来诱惑人……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1548',
        any: [/^\s*PRINTFORML\ 「居然能抱着魔王大人的奴隶……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1550',
        any: [/^\s*PRINTFORML\ 「哦！哦！舒服的穴！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1552',
        any: [/^\s*PRINTFORML\ 「就这么喜欢精液吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1554',
        any: [/^\s*PRINTFORML\ 「随便就分开双腿的婊子！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1556',
        any: [/^\s*PRINTFORML\ 「用手把尻扒开」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1558',
        any: [/^\s*PRINTFORML\ 「做Ｖ字手！Ｖ字手！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1560',
        any: [/^\s*PRINTFORML\ 「觉得鸡鸡舒服吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1562',
        any: [/^\s*PRINTFORML\ 「啊！鸡鸡要融化了！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1564',
        any: [/^\s*PRINTFORML\ 「真是最贱的母猪！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1566',
        any: [/^\s*PRINTFORML\ 「抬起屁股，好好地发情吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1568',
        any: [/^\s*PRINTFORML\ 「真是下流的模样呢，嘿嘿」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1570',
        any: [/^\s*PRINTFORML\ 「分开双腿侍奉魔王军了吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1572',
        any: [/^\s*PRINTFORML\ 「习惯吸啜小鸡鸡了吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1574',
        any: [/^\s*PRINTFORML\ 「你和精液很相称呢！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1576',
        any: [/^\s*PRINTFORML\ 「射到你头发上都是！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1579-1612',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1582',
        any: [/^\s*PRINTFORML\ 「这一身……完全带动色情的气氛了啊！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1584',
        any: [/^\s*PRINTFORML\ 「穿成这样四处转悠……真是变态啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1586',
        any: [/^\s*PRINTFORML\ 「你很适合精液的气味嘛～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1588',
        any: [/^\s*PRINTFORML\ 「这是邀请吗？把腰扭起来啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1590',
        any: [/^\s*PRINTFORML\ 「正好欲求不满的说」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1592',
        any: [/^\s*PRINTFORML\ 「这也是你的工作？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1594',
        any: [/^\s*PRINTFORML\ 「阴蒂涨起来了，还开始流出爱液……嘿嘿……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1596',
        any: [/^\s*PRINTFORML\ 「勇者也这么堕落，这么淫乱」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1598',
        any: [/^\s*PRINTFORML\ 「手扶着墙，屁股转过来」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1600',
        any: [/^\s*PRINTFORML\ 「一定要狠狠地欺负一下你才行……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1602',
        any: [/^\s*PRINTFORML\ 「母乳不出来么？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1604',
        any: [/^\s*PRINTFORML\ 「完全顺从了嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1606',
        any: [/^\s*PRINTFORML\ 「一开始先来含一下吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1608',
        any: [/^\s*PRINTFORML\ 「腿分开，打开那里让我看看」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1610',
        any: [/^\s*PRINTFORML\ 「不当勇者了，也变得可爱了嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1612',
        any: [/^\s*PRINTFORML\ 「已经是我们的同伴了嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1615-1648',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1618',
        any: [/^\s*PRINTFORML\ 「大姐姐的衣服，好色……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1620',
        any: [/^\s*PRINTFORML\ 「姐……姐姐……我带钱来了」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1622',
        any: [/^\s*PRINTFORML\ 「我……还是处男……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1624',
        any: [/^\s*PRINTFORML\ 「大姐姐，真好色啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1626',
        any: [/^\s*PRINTFORML\ 「这就是……女人……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1628',
        any: [/^\s*PRINTFORML\ 「这就是姐姐的工作吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1630',
        any: [/^\s*PRINTFORML\ 「哇……厉害」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1632',
        any: [/^\s*PRINTFORML\ 「唔……要出来了！！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1634',
        any: [/^\s*PRINTFORML\ 「大姐姐，软软的……」/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1635',
        any: [/^\s*CALL DUNGEON_ANAL_LOG, MEN/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1636',
        any: [/^\s*PRINTFORML\ 「噗呲噗呲的」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1638',
        any: [/^\s*PRINTFORML\ 「能揉你的胸吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1640',
        any: [/^\s*PRINTFORML\ 「用力吸乳头的话，会有奶吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1642',
        any: [/^\s*PRINTFORML\ 「好厉害……呜哇～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1644',
        any: [/^\s*PRINTFORML\ 「大姐姐，再教我更多……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1646',
        any: [/^\s*PRINTFORML\ 「呵呵，姐姐你真可爱」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1648',
        any: [/^\s*PRINTFORML\ 「小鸡鸡，快爆炸了！！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1651-1694',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1654',
        any: [/^\s*PRINTFORML\ 「真是婊子的打扮啊。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1656',
        any: [/^\s*PRINTFORML\ 「我知道……想要钱是吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1658',
        any: [/^\s*PRINTFORML\ 「我拿着钱哦！你想要的话……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1660',
        any: [/^\s*PRINTFORML\ 「还没满足吧，这淫乱的娼妓！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1662',
        any: [/^\s*PRINTFORML\ 「有钱就怎么都行？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1666',
        any: [/^\s*PRINTFORML\ 「屁股也要舔，一直舔到肛门」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1668',
        any: [/^\s*PRINTFORML\ 「腰动起来！多扭几下。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1670',
        any: [/^\s*PRINTFORML\ 「跪下来说你想要钱！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1672',
        any: [/^\s*PRINTFORML\ 「说：请给我这母猪赏点钱」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1674',
        any: [/^\s*PRINTFORML\ 「为了钱，什么话都能说出来的婊子」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1676',
        any: [/^\s*PRINTFORML\ 「阴垢也漂亮地清洁了呢」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1678',
        any: [/^\s*PRINTFORML\ 「跪下来说请给我阴茎」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1680',
        any: [/^\s*PRINTFORML\ 「跪下来像狗一样地摇屁股」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1682',
        any: [/^\s*PRINTFORML\ 「在这里像狗一样地尿尿」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1684',
        any: [/^\s*PRINTFORML\ 「鸡鸡和钱，愿意为了哪个被赏耳光？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1686',
        any: [/^\s*PRINTFORML\ 「说自己是最喜欢鸡鸡的淫乱奴隶！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1688',
        any: [/^\s*PRINTFORML\ 「就在这里自慰」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1690',
        any: [/^\s*PRINTFORML\ 「说自己是为了钱而卖淫的贱婊子」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1692',
        any: [/^\s*PRINTFORML\ 「跪下来说我想要鸡鸡」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1694',
        any: [/^\s*PRINTFORML\ 「再来点媚笑看看，要更淫邪的」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1697-1780', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1701',
        any: [/^\s*PRINTFORML\ 「黄暴的衣服！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1705',
        any: [/^\s*PRINTFORML\ 「也来爱我啊～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1707',
        any: [/^\s*PRINTFORML\ 「爱意满满地来侍奉吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1709',
        any: [/^\s*PRINTFORML\ 「好好地来侍奉阴茎吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1711',
        any: [/^\s*PRINTFORML\ 「这样的我……也能得到爱吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1716',
        any: [/^\s*PRINTFORML\ 「勇者大人，变得这么温顺」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1718',
        any: [/^\s*PRINTFORML\ 「对自己的性技有自信吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1720',
        any: [/^\s*PRINTFORML\ 「对这种事很擅长吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1722',
        any: [/^\s*PRINTFORML\ 「淫乱地如此彻底。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1727',
        any: [/^\s*PRINTFORML\ 「来，吸！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1729',
        any: [/^\s*PRINTFORML\ 「来，腿分开！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1731',
        any: [/^\s*PRINTFORML\ 「在干嘛，继续舔啊！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1733',
        any: [/^\s*PRINTFORML\ 「笨手笨脚的……把屁股抬起来就行啦！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1738',
        any: [/^\s*PRINTFORML\ 「习惯肉棒的味道了吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1740',
        any: [/^\s*PRINTFORML\ 「好好地侍奉吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1742',
        any: [/^\s*PRINTFORML\ 「温柔的手法……鸡鸡快爆炸了」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1744',
        any: [/^\s*PRINTFORML\ 「居然还有这么淫乱的大小姐。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1749',
        any: [/^\s*PRINTFORML\ 「好啊！这冰冷的眼神！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1751',
        any: [/^\s*PRINTFORML\ 「这也是工作吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1753',
        any: [/^\s*PRINTFORML\ 「喂，摆出一张更舒服的脸吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1755',
        any: [/^\s*PRINTFORML\ 「你不懂笑的吗？YEAH～YEAH！这样」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1760',
        any: [/^\s*PRINTFORML\ 「终于在肉棒前变得温顺了吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1762',
        any: [
          /^\s*PRINTFORML\ 「那个性格恶劣的勇者大人已经成为肉棒的俘虏了？」/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1764',
        any: [/^\s*PRINTFORML\ 「无需多言！腿打开！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1766',
        any: [/^\s*PRINTFORML\ 「什么嘛这眼神……可恶……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1770',
        any: [/^\s*PRINTFORML\ 「这卖春女啊！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1772',
        any: [/^\s*PRINTFORML\ 「堕落为妓女了吗」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1774',
        any: [/^\s*PRINTFORML\ 「在干嘛？赶紧把腿分开啊！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1776',
        any: [/^\s*PRINTFORML\ 「呃呃地喘息……！」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1781', any: [/^\s*RETURN\ 0/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1784-1999',
        any: [/^\s*@DUNGEON_ANAL_LOG,\ ARG:0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1795-1825',
        any: [/^\s*IF\ RAND:15\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1797',
        any: [/^\s*PRINTFORML\ 「菊穴啊……凑合用吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1799',
        any: [/^\s*PRINTFORML\ 「这完全是性器了嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1801',
        any: [/^\s*PRINTFORML\ 「又湿又软」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1803',
        any: [/^\s*PRINTFORML\ 「你是卖肛门的？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1805',
        any: [/^\s*PRINTFORML\ 「好啊，屁股翘起来」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1807',
        any: [/^\s*PRINTFORML\ 「这么淫乱的尻穴」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1809',
        any: [/^\s*PRINTFORML\ 「就这么喜欢卖菊花吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1811',
        any: [/^\s*PRINTFORML\ 「唔……你的直肠很舒服」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1813',
        any: [/^\s*PRINTFORML\ 「这肛门夹得真紧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1815',
        any: [/^\s*PRINTFORML\ 「漂亮的后庭」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1817',
        any: [/^\s*PRINTFORML\ 「你的后面，敏感度如何？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1819',
        any: [/^\s*PRINTFORML\ 「屁股，都露外面了哦」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1821',
        any: [/^\s*PRINTFORML\ 「这不已经习惯用后面了嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1823',
        any: [/^\s*PRINTFORML\ 「多少人用过这里了？」/m],
      },
      {
        src: DUNGEON_BITCH_ERB,
        ref: '1824',
        any: [/^\s*CALL DUNGEON_LES_LOG, GIRL/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1825',
        any: [/^\s*PRINTFORML\ 「真是个好尻穴……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1828-1844',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1830',
        any: [/^\s*PRINTFORML\ 「尻穴有感觉的变态！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1832',
        any: [/^\s*PRINTFORML\ 「这尻穴能用几次？再来一次吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1834',
        any: [/^\s*PRINTFORML\ 「收缩得真厉害啊……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1836',
        any: [/^\s*PRINTFORML\ 「这个人，肛门被调教过了……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1838',
        any: [/^\s*PRINTFORML\ 「菊花一开一合在引诱着我……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1840',
        any: [/^\s*PRINTFORML\ 「这个变态尻穴奴隶！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1842',
        any: [/^\s*PRINTFORML\ 「用尻穴挣钱，感觉舒服吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1844',
        any: [/^\s*PRINTFORML\ 「肛门的感觉真好，你真有天赋！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1847-1870',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1850',
        any: [/^\s*PRINTFORML\ 「哥哥的屁股，真棒」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1852',
        any: [/^\s*PRINTFORML\ 「姐姐的屁股，真棒」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1855',
        any: [/^\s*PRINTFORML\ 「哎？是用后面……？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1857',
        any: [/^\s*PRINTFORML\ 「肛门好舒服啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1859',
        any: [/^\s*PRINTFORML\ 「没钱了，屁股……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1861',
        any: [/^\s*PRINTFORML\ 「好厉害……完全被尻穴吸住了……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1863',
        any: [/^\s*PRINTFORML\ 「尻穴……要出来了！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1865',
        any: [/^\s*PRINTFORML\ 「这么紧凑的，也只有菊花能做到了吧。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1868',
        any: [/^\s*PRINTFORML\ 「大哥哥的肛门，非常地舒服啊……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1870',
        any: [/^\s*PRINTFORML\ 「大姐姐的肛门，非常地舒服啊……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1873-1914',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 3/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1876',
        any: [/^\s*PRINTFORML\ 「我知道……想要钱是吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1878',
        any: [/^\s*PRINTFORML\ 「我拿着钱哦！你想要的话……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1880',
        any: [/^\s*PRINTFORML\ 「还没满足吧，这淫乱的娼妓！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1882',
        any: [/^\s*PRINTFORML\ 「有钱就怎么都行？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1886',
        any: [/^\s*PRINTFORML\ 「屁股也要舔，一直舔到肛门」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1888',
        any: [/^\s*PRINTFORML\ 「腰动起来！多扭几下。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1890',
        any: [/^\s*PRINTFORML\ 「跪下来说你想要钱！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1892',
        any: [/^\s*PRINTFORML\ 「说：请给我这母猪赏点钱」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1894',
        any: [/^\s*PRINTFORML\ 「为了钱，什么话都能说出来的婊子」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1896',
        any: [/^\s*PRINTFORML\ 「阴垢也漂亮地清洁了呢」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1898',
        any: [/^\s*PRINTFORML\ 「跪下来说请给我阴茎」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1900',
        any: [/^\s*PRINTFORML\ 「跪下来像狗一样地摇屁股」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1902',
        any: [/^\s*PRINTFORML\ 「在这里像狗一样地尿尿」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1904',
        any: [/^\s*PRINTFORML\ 「鸡鸡和钱，愿意为了哪个被赏耳光？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1906',
        any: [/^\s*PRINTFORML\ 「说自己是最喜欢鸡鸡的淫乱尻穴奴隶！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1908',
        any: [/^\s*PRINTFORML\ 「在这里用后庭自慰！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1910',
        any: [/^\s*PRINTFORML\ 「说自己是为了钱而卖菊的贱婊子」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1912',
        any: [/^\s*PRINTFORML\ 「跪下来说我想要鸡鸡」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1914',
        any: [/^\s*PRINTFORML\ 「再来点媚笑看看，要更淫邪的」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1917-1997', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1922',
        any: [/^\s*PRINTFORML\ 「喜欢用肛门表达爱意？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1924',
        any: [/^\s*PRINTFORML\ 「把整个肛塞都吞入了」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1926',
        any: [/^\s*PRINTFORML\ 「什么都可以放进肛门去是吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1928',
        any: [/^\s*PRINTFORML\ 「用这种地方表达爱意吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1933',
        any: [/^\s*PRINTFORML\ 「肛塞对你来说太弱了吧。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1935',
        any: [/^\s*PRINTFORML\ 「看！又放进一个了哦！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1937',
        any: [
          /^\s*PRINTFORML\ 「越是看起来强悍的人，肛门越弱。原来是真的啊！」/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1939',
        any: [/^\s*PRINTFORML\ 「像要把手指吸进去一样！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1944',
        any: [/^\s*PRINTFORML\ 「肛门里放入振动宝石……再用力拔出来」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1946',
        any: [/^\s*PRINTFORML\ 「真是口嫌肛正直呢！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1948',
        any: [/^\s*PRINTFORML\ 「菊穴，真舒畅……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1950',
        any: [/^\s*PRINTFORML\ 「把屁股再抬高一点……全部都看见了哦！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1955',
        any: [
          /^\s*PRINTFORML\ 「哪怕是一幅高贵的姿态，肮脏的地方也还是脏啊」/m,
        ],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1957',
        any: [/^\s*PRINTFORML\ 「被爆菊感到羞耻了么……记住这份屈辱吧！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1959',
        any: [/^\s*PRINTFORML\ 「肛门张开了～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1961',
        any: [/^\s*PRINTFORML\ 「振动杖都吞入了……真是了不起的菊穴啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1966',
        any: [/^\s*PRINTFORML\ 「卖菊啊，不介意么？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1968',
        any: [/^\s*PRINTFORML\ 「菊穴真的这么好么……？你看」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1970',
        any: [/^\s*PRINTFORML\ 「看来肛门很喜欢振动宝石嘛」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1972',
        any: [/^\s*PRINTFORML\ 「哈哈，肛门变得黏黏糊糊的」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1977',
        any: [/^\s*PRINTFORML\ 「肮脏的女人肛门也脏！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1979',
        any: [/^\s*PRINTFORML\ 「勇者大人，菊花舒服吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1981',
        any: [/^\s*PRINTFORML\ 「屁股翘起来，把后庭扒开！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1983',
        any: [/^\s*PRINTFORML\ 「尻穴还挺老实的」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1987',
        any: [/^\s*PRINTFORML\ 「这个卖菊的娼妓！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1989',
        any: [/^\s*PRINTFORML\ 「堕落为卖菊的婊子了么？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1991',
        any: [/^\s*PRINTFORML\ 「在干嘛啊，快把屁股露出来。」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '1993',
        any: [/^\s*PRINTFORML\ 「后庭在呃呃地喘息着……！」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '1998', any: [/^\s*RETURN\ 0/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2001-2181',
        any: [/^\s*@DUNGEON_LES_LOG,\ ARG:0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2014',
        any: [/^\s*PRINTFORML\ 「你的精气，我不客气啦♪」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2014-2028',
        any: [/^\s*PRINTFORML\ 「你的精气，我不客气啦♪」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2016',
        any: [/^\s*PRINTFORML\ 「你看起来很可口嘛～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2018',
        any: [/^\s*PRINTFORML\ 「胸部也要舔哦」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2020',
        any: [/^\s*PRINTFORML\ 「谢谢款待♪」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2022',
        any: [/^\s*PRINTFORML\ 「拿这样的猎物来当晚餐，我真幸福呢～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2024',
        any: [/^\s*PRINTFORML\ 「光是接吻就高潮了？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2026',
        any: [/^\s*PRINTFORML\ 「满满的精气～吸走了哦」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2028',
        any: [/^\s*PRINTFORML\ 「我开食啦♪」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2031-2047',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2033',
        any: [/^\s*PRINTFORML\ 「小奴隶，把尿接着啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2035',
        any: [/^\s*PRINTFORML\ 「你这样的，真是可爱」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2037',
        any: [/^\s*PRINTFORML\ 「来，赶快开始，已经习惯了吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2039',
        any: [/^\s*PRINTFORML\ 「可悲的母猪就是要挨鞭子！小奴隶……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2041',
        any: [/^\s*PRINTFORML\ 「就这样一直抱着……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2043',
        any: [/^\s*PRINTFORML\ 「好多爱液溢出来了哦」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2045',
        any: [/^\s*PRINTFORML\ 「就一晚，我们来做恋人吧……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2047',
        any: [/^\s*PRINTFORML\ 「让我看看，你平常都是怎么自慰的？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2050-2066',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2052',
        any: [/^\s*PRINTFORML\ 「钱，带来了……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2054',
        any: [/^\s*PRINTFORML\ 「软软的……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2056',
        any: [/^\s*PRINTFORML\ 「弄坏我，什么都不用考虑……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2058',
        any: [/^\s*PRINTFORML\ 「果然不是抱着女人，就做不来啊！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2060',
        any: [/^\s*PRINTFORML\ 「偶尔奢侈一下，不行吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2062',
        any: [/^\s*PRINTFORML\ 「卖尻穴来挣钱，然后又可以买女人回来……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2064',
        any: [/^\s*PRINTFORML\ 「想把你买下来，然后租出去给别人喝精液」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2066',
        any: [/^\s*PRINTFORML\ 「这么脏的我，被你的爱液洗干净了……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2069-2097',
        any: [/^\s*IF\ RAND:4\ ==\ 0/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2071',
        any: [/^\s*PRINTFORML\ 「能满足我的性欲么？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2073',
        any: [/^\s*PRINTFORML\ 「看，想要钱吧？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2075',
        any: [/^\s*PRINTFORML\ 「呵呵，真是一只好色的小猫咪」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2077',
        any: [/^\s*PRINTFORML\ 「钱有的是，你看……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2081',
        any: [/^\s*PRINTFORML\ 「那里，在用力来！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2083',
        any: [/^\s*PRINTFORML\ 「啊，再多舔几下」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2085',
        any: [/^\s*PRINTFORML\ 「喂，屁股也要舔……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2087',
        any: [/^\s*PRINTFORML\ 「再来接吻吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2089',
        any: [/^\s*PRINTFORML\ 「我的鞭子，专治母猪……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2091',
        any: [/^\s*PRINTFORML\ 「喂，自慰给我看」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2093',
        any: [/^\s*PRINTFORML\ 「要从阴蒂舔到菊花啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2095',
        any: [/^\s*PRINTFORML\ 「爱抚一下我的那里吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2097',
        any: [/^\s*PRINTFORML\ 「来磨一下吧？打开你的腿……」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '2100-2179', any: [/^\s*ELSE/m] },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2105',
        any: [/^\s*PRINTFORML\ 「一起相爱吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2107',
        any: [/^\s*PRINTFORML\ 「来接吻吧，奴隶」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2109',
        any: [/^\s*PRINTFORML\ 「想这样一直抱着……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2111',
        any: [/^\s*PRINTFORML\ 「快乐是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2116',
        any: [/^\s*PRINTFORML\ 「再来！再来！越粗暴越好！」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2118',
        any: [/^\s*PRINTFORML\ 「啊，乳头……再用力地捏……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2120',
        any: [/^\s*PRINTFORML\ 「再打我的屁股……打得通红也无妨」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2122',
        any: [/^\s*PRINTFORML\ 「堕落是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2127',
        any: [/^\s*PRINTFORML\ 「更认真地舔吧……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2129',
        any: [/^\s*PRINTFORML\ 「要好好舔，一直舔到屁股啊」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2131',
        any: [/^\s*PRINTFORML\ 「啊！表情不错，再来点更好的声音吧……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2133',
        any: [/^\s*PRINTFORML\ 「献媚是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2138',
        any: [/^\s*PRINTFORML\ 「结束了之后一起去喝茶吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2140',
        any: [/^\s*PRINTFORML\ 「就在这床睡吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2142',
        any: [/^\s*PRINTFORML\ 「啊，请把尿喝光……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2144',
        any: [/^\s*PRINTFORML\ 「淫荡是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2149',
        any: [/^\s*PRINTFORML\ 「若无其事的神色，真漂亮」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2151',
        any: [/^\s*PRINTFORML\ 「比起挥剑，你还是卖淫比较有才能呢」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2153',
        any: [/^\s*PRINTFORML\ 「啊～腋下～是弱点啦～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2155',
        any: [/^\s*PRINTFORML\ 「暴力是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2160',
        any: [/^\s*PRINTFORML\ 「这次不来我们的神殿吗？」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2162',
        any: [/^\s*PRINTFORML\ 「皮肤真不错……」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2164',
        any: [/^\s*PRINTFORML\ 「好屁股～」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2166',
        any: [/^\s*PRINTFORML\ 「脱线是我们的教义」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2170',
        any: [/^\s*PRINTFORML\ 「就这样相互交缠着吧」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2172',
        any: [/^\s*PRINTFORML\ 「下次也要来我们的神殿哦」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2174',
        any: [/^\s*PRINTFORML\ 「呵呵～又指名你了」/m],
      },
      {
        src: DUNGEON_BITCH_LOG_ERB,
        ref: '2176',
        any: [/^\s*PRINTFORML\ 「快乐是我们的教义」/m],
      },
      { src: DUNGEON_BITCH_LOG_ERB, ref: '2181', any: [/^\s*RETURN\ 0/m] },
      {
        src: LOOK_ERB,
        ref: '2885',
        any: [/^\s*@GET_LOOK_INFO\(ARG,\ ARGS\)/m],
      },
      {
        src: LOOK_ERB,
        ref: '2922',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "头发颜色"/m],
      },
      { src: LOOK_ERB, ref: '3020', any: [/^\s*ELSEIF\ ARGS\ ==\ "目"/m] },
      {
        src: LOOK_ERB,
        ref: '3095',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "阴毛状态"/m],
      },
      { src: LOOK_ERB, ref: '3114', any: [/^\s*ELSEIF\ ARGS\ ==\ "魅力点"/m] },
      { src: DUNGEON_BITCH_ERB, ref: '3132', any: [/^\s*\[SKIPEND\]/m] },
      { src: LOOK_ERB, ref: '3180', any: [/^\s*ELSEIF\ ARGS\ ==\ "癖"/m] },
      { src: LOOK_ERB, ref: '3253', any: [/^\s*ELSEIF\ ARGS\ ==\ "种族"/m] },
      {
        src: LOOK_ERB,
        ref: '3315',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "成为勇者前的生活"/m],
      },
    ],
  },
  {
    js: 'ere/page/page-invasion.js',
    refs: [
      {
        src: INVASION_EVENT,
        ref: '2-209',
        any: [/^\s*@KYOTEN_EVENT, ARG:0$/m],
      },
      { src: INVASION, ref: '6-997', any: [/^\s*@INVASION$/m] },
      {
        src: INVASION_EVENT,
        ref: '15-104',
        any: [/^\s*IF FLAG:81 >= 2000 && FLAG:93 == 0$/m],
      },
      { src: INVASION, ref: '25-138', any: [/^\s*\$INPUT_LOOP2$/m] },
      { src: INVASION, ref: '26', any: [/^\s*CLEARLINE LINECOUNT$/m] },
      { src: INVASION, ref: '110-111', any: [/^\s*AREA = 81$/m] },
      { src: INVASION_EVENT, ref: '111', any: [/^\s*;FLAG:94 = 1$/m] },
      { src: INVASION, ref: '139-142', any: [/^\s*ELSE$/m] },
      { src: INVASION, ref: '139-204', any: [/^\s*\$START1$/m] },
      { src: INVASION, ref: '143-151', any: [/^\s*\$START1$/m] },
      { src: INVASION, ref: '144-186', any: [/^\s*REPEAT 90$/m] },
      { src: INVASION, ref: '188-200', any: [/^\s*\$INPUT_LOOP$/m] },
      { src: INVASION, ref: '190-191', any: [/^\s*IF RESULT == 999$/m] },
      { src: INVASION, ref: '192-195', any: [/^\s*ELSEIF RESULT >= 4$/m] },
      { src: INVASION, ref: '193', any: [/^\s*GOTO INPUT_LOOP$/m] },
      { src: INVASION, ref: '195', any: [/^\s*GOTO INPUT_LOOP$/m] },
      {
        src: INVASION,
        ref: '196-199',
        any: [/^\s*ELSEIF RESULT == 0 && MON_NUM < 600$/m],
      },
      { src: INVASION, ref: '197', any: [/^\s*GOTO INPUT_LOOP$/m] },
      { src: INVASION, ref: '199', any: [/^\s*GOTO INPUT_LOOP$/m] },
      { src: INVASION, ref: '202', any: [/^\s*INV_TYPE = RESULT$/m] },
      { src: INVASION, ref: '203-207', any: [/^\s*SINKOU = 0$/m] },
      {
        src: INVASION_EVENT,
        ref: '204',
        any: [
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      { src: INVASION, ref: '209-263', any: [/^\s*IF INV_TYPE == 0$/m] },
      { src: INVASION, ref: '210', any: [/^\s*IF INV_TYPE == 0$/m] },
      {
        src: INVASION_EVENT,
        ref: '212-235',
        any: [/^\s*@INVASION_EVENT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I$/m],
      },
      { src: INVASION_EVENT, ref: '224-232', any: [/^\s*IF LOCAL == 9$/m] },
      {
        src: INVASION,
        ref: '236-259',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      {
        src: INVASION_EVENT,
        ref: '250-251',
        any: [/^\s*SIF FLAG:SINDO != 0$/m],
      },
      {
        src: INVASION_EVENT,
        ref: '257-260',
        any: [/^\s*IF FLAG:AREA == 0 && FLAG:SINDO == 0$/m],
      },
      { src: INVASION, ref: '266-296', any: [/^\s*ELSEIF INV_TYPE == 1$/m] },
      { src: INVASION, ref: '267', any: [/^\s*SINKOU = BASE:0:1 \/ 25$/m] },
      { src: INVASION, ref: '268', any: [/^\s*BASE:0:1 \/= 2$/m] },
      {
        src: INVASION,
        ref: '269-293',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      {
        src: INVASION,
        ref: '270-274',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      { src: INVASION_EVENT, ref: '273', any: [/^\s*SIF INV_TYPE != 2$/m] },
      { src: INVASION_EVENT, ref: '273-274', any: [/^\s*SIF INV_TYPE != 2$/m] },
      {
        src: INVASION,
        ref: '275-278',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 40 && EX_FLAG:99 > 20$/m],
      },
      {
        src: INVASION,
        ref: '279-284',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 60 && EX_FLAG:99 > 40$/m],
      },
      {
        src: INVASION_EVENT,
        ref: '279-459',
        any: [/^\s*IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2$/m],
      },
      {
        src: INVASION,
        ref: '285-286',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 80 && EX_FLAG:99 > 60$/m],
      },
      {
        src: INVASION,
        ref: '287-292',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 100 && EX_FLAG:99 > 80$/m],
      },
      {
        src: INVASION,
        ref: '296',
        any: [/^\s*PRINTFORMW 战斗力　\{SINKOU\}点$/m],
      },
      { src: INVASION, ref: '298-441', any: [/^\s*\$INPUT_LOOP_TMPO2$/m] },
      { src: INVASION, ref: '299', any: [/^\s*ELSEIF INV_TYPE == 2$/m] },
      { src: INVASION, ref: '442', any: [/^\s*ELSEIF INV_TYPE == 3$/m] },
      { src: INVASION, ref: '442-561', any: [/^\s*\$INPUT_LOOP_TMPO3$/m] },
      {
        src: INVASION_EVENT,
        ref: '539',
        any: [
          /^\s*SIF FLAG:SINDO \|\| INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3$/m,
        ],
      },
      { src: INVASION, ref: '565-598', any: [/^\s*IF TALENT:0:325 == 1$/m] },
      { src: INVASION, ref: '565-603', any: [/^\s*IF TALENT:0:325 == 1$/m] },
      {
        src: INVASION,
        ref: '568-572',
        any: [
          /^\s*PRINTFORMW 魔王补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%$/m,
        ],
      },
      { src: INVASION, ref: '574-590', any: [/^\s*IF TALENT:0:325 == 1$/m] },
      { src: INVASION, ref: '593-595', any: [/^\s*CALL MEDAL_BONUS,0$/m] },
      {
        src: INVASION,
        ref: '598',
        any: [/^\s*PRINTFORMW 合计　\{SINKOU\}点$/m],
      },
      {
        src: INVASION,
        ref: '601-603',
        any: [
          /^\s*CALL INVASION_EVENT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I$/m,
        ],
      },
      { src: INVASION, ref: '609-618', any: [/^\s*IF INV_TYPE == 3$/m] },
      { src: INVASION, ref: '613-615', any: [/^\s*ELSE$/m] },
      { src: INVASION, ref: '617-618', any: [/^\s*SIF FLAG:AREA >= 10000$/m] },
      { src: INVASION, ref: '694-757', any: [/^\s*ELSEIF INV_TYPE == 1$/m] },
      {
        src: INVASION,
        ref: '696',
        any: [/^\s*PRINTFORML %SAVESTR:MASTER%的魔力爆发出来了！$/m],
      },
      { src: INVASION, ref: '697-709', any: [/^\s*IF SINKOU < 100$/m] },
      {
        src: INVASION,
        ref: '711-738',
        any: [/^\s*IF AREA == 81 && FLAG:SINDO$/m],
      },
      { src: INVASION, ref: '736-738', any: [/^\s*ELSE$/m] },
      { src: INVASION, ref: '742-757', any: [/^\s*SIF AREA == 81$/m] },
      {
        src: INVASION_EVENT,
        ref: '824',
        any: [/^\s*SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3$/m],
      },
      { src: INVASION, ref: '976', any: [/^\s*DRAWLINE$/m] },
      { src: INVASION, ref: '976-997', any: [/^\s*IF AREA == 81$/m] },
      { src: INVASION, ref: '977', any: [/^\s*WAIT$/m] },
      { src: INVASION, ref: '978', any: [/^\s*EX_FLAG:99 \+= 2$/m] },
      { src: INVASION, ref: '983-994', any: [/^\s*IF AREA == 81$/m] },
      { src: INVASION, ref: '996', any: [/^\s*CALL INVASION_CHECK$/m] },
      { src: INVASION, ref: '997', any: [/^\s*RETURN 1$/m] },
      { src: INVASION, ref: '999-1021', any: [/^\s*@INVASION_CHECK$/m] },
      // @INVASION_CHECK 本体（#118）：五组条件与声望结账的行号锚
      {
        src: INVASION,
        ref: '1001-1003',
        any: [/^\s*IF FLAG:81 >= 10000 && FLAG:82 == 0$/m],
      },
      { src: INVASION, ref: '1003', any: [/^\s*EX_FLAG:99 \+= 10$/m] },
      {
        src: INVASION,
        ref: '1003-1004',
        any: [/^\s*EX_FLAG:99 \+= 10$/m, /^\s*PRINTL 声望\+10$/m],
      },
      { src: INVASION, ref: '1004', any: [/^\s*PRINTL 声望\+10$/m] },
      {
        src: INVASION,
        ref: '1005-1007',
        any: [/^\s*ELSEIF FLAG:86 >= 10000 && FLAG:87 == 0$/m],
      },
      { src: INVASION, ref: '1007', any: [/^\s*EX_FLAG:99 \+= 10$/m] },
      { src: INVASION, ref: '1008', any: [/^\s*PRINTL 声望\+10$/m] },
      {
        src: INVASION,
        ref: '1009-1011',
        any: [/^\s*ELSEIF FLAG:88 >= 10000 && FLAG:89 == 0$/m],
      },
      { src: INVASION, ref: '1011', any: [/^\s*EX_FLAG:99 \+= 10$/m] },
      { src: INVASION, ref: '1012', any: [/^\s*PRINTL 声望\+10$/m] },
      {
        src: INVASION,
        ref: '1013-1015',
        any: [/^\s*ELSEIF FLAG:90 >= 10000 && FLAG:91 == 0$/m],
      },
      { src: INVASION, ref: '1015', any: [/^\s*EX_FLAG:99 \+= 10$/m] },
      { src: INVASION, ref: '1016', any: [/^\s*PRINTL 声望\+10$/m] },
      {
        src: INVASION,
        ref: '1017-1019',
        any: [/^\s*ELSEIF EX_FLAG:101 >= 10000 && EX_FLAG:102 == 0$/m],
      },
      { src: INVASION, ref: '1019', any: [/^\s*EX_FLAG:99 \+= 10$/m] },
      { src: INVASION, ref: '1020', any: [/^\s*PRINTL 声望\+10$/m] },
      { src: INVASION, ref: '1026-1067', any: [/^\s*@MEDAL_BONUS,ARG$/m] },
    ],
  },
  {
    // #118：ENDING_1 真身与 ENDING_3/4/5/END10_55 的接线（INVASION_CHECK
    // 五组条件的演出侧）
    js: 'ere/event/event-ending.js',
    refs: [
      { src: ENDING_ERB, ref: '6-40', any: [/^@ENDING_1$/m] },
      { src: ENDING_ERB, ref: '8-18', any: [/^DRAWLINE$/m, /^PRINTL ┌/m] },
      { src: ENDING_ERB, ref: '20-23', any: [/^ADDCHARA 35$/m] },
      { src: ENDING_ERB, ref: '25', any: [/^WAIT$/m] },
      { src: ENDING_ERB, ref: '27', any: [/人间界已经陷落了/m] },
      {
        src: ENDING_ERB,
        ref: '29-30',
        any: [/世界这么大/m, /不想做魔王了/m],
      },
      { src: ENDING_ERB, ref: '31-37', any: [/^\$INPUT_LOOP$/m] },
      { src: ENDING_ERB, ref: '34', any: [/^\s*QUIT$/m] },
      {
        src: ENDING_ERB,
        ref: '35-36',
        any: [/^\s*ELSEIF RESULT != 0$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      { src: ENDING_ERB, ref: '38', any: [/^FLAG:82 = 1$/m] },
      { src: ENDING_ERB, ref: '39', any: [/菲娅，被你抓获了/m] },
      { src: ENDING_ERB, ref: '40', any: [/^RETURN 0$/m] },
      // #173：@ENDING_2 真身（:43-56 全文）
      { src: ENDING_ERB, ref: '43-56', any: [/^@ENDING_2$/m] },
      { src: ENDING_ERB, ref: '45', any: [/^DRAWLINE$/m, /^PRINTL ┌/m] },
      { src: ENDING_ERB, ref: '46-50', any: [/^PRINTL ｜.*新的女勇者/m] },
      {
        src: ENDING_ERB,
        ref: '52',
        any: [/^PRINTFORMW \*勇者%SAVESTR:TARGET%/m],
      },
      { src: ENDING_ERB, ref: '53', any: [/^PRINTL  $/m] },
      { src: ENDING_ERB, ref: '54', any: [/GAMEOVER/m] },
      { src: ENDING_ERB, ref: '55', any: [/^INPUT$/m] },
      { src: ENDING_ERB, ref: '56', any: [/^QUIT$/m] },
      { src: ENDING_ERB, ref: '59-74', any: [/^@ENDING_3$/m] },
      { src: ENDING_ERB, ref: '70', any: [/^FLAG:87 = 1$/m] },
      { src: ENDING_ERB, ref: '72', any: [/^FLAG:87 = 2$/m] },
      { src: ENDING_ERB, ref: '77-92', any: [/^@ENDING_4$/m] },
      { src: ENDING_ERB, ref: '88', any: [/^FLAG:89 = 1$/m] },
      { src: ENDING_ERB, ref: '90', any: [/^FLAG:89 = 2$/m] },
      { src: ENDING_ERB, ref: '97-112', any: [/^@ENDING_5$/m] },
      { src: ENDING_ERB, ref: '108', any: [/^FLAG:91 = 1$/m] },
      { src: ENDING_ERB, ref: '110', any: [/^FLAG:91 = 2$/m] },
      { src: ENDING_ERB, ref: '136', any: [/^@CHAR_GIFT, ARG$/m] },
      {
        src: ENDINGDATA_ADDON1,
        ref: '475-485',
        any: [/^@END10_55$/m],
      },
      {
        src: ENDINGDATA_ADDON1,
        ref: '485',
        any: [/^\s*EX_FLAG:2810 \+= 5$/m],
      },
    ],
  },
  {
    // #118：@CHAR_INIT 窄路径与 @RANDOM_SELF_CALL 窄路径（ENDING_1 的
    // ADDCHARA 链第三环）
    js: 'ere/chara/chara-init.js',
    refs: [
      // CHAR_MAKE.ERB 的 JUMP 壳
      {
        src: CHAR_MAKE,
        ref: '22-25',
        any: [/^@CHAR_INIT$/m, /^JUMP CHARA_INIT/m],
      },
      // CHARA_MAKE_INIT.ERB 的本体
      { src: CHARA_MAKE_INIT, ref: '2-49', any: [/^@CHARA_INIT\(L_A\)$/m] },
      {
        src: CHARA_MAKE_INIT,
        ref: '7',
        any: [/^SAVESTR:L_A = %CALLNAME:L_A%$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '10-18',
        any: [/^IF CFLAG:L_A:9 > 1 && CFLAG:L_A:11 == 0$/m],
      },
      { src: CHARA_MAKE_INIT, ref: '14', any: [/^\s*CALL ST_UP, L_A$/m] },
      { src: CHARA_MAKE_INIT, ref: '15', any: [/^\s*REND$/m] },
      { src: CHARA_MAKE_INIT, ref: '16', any: [/^\s*CFLAG:L_A:9 = LOCAL$/m] },
      {
        src: CHARA_MAKE_INIT,
        ref: '17',
        any: [/^\s*BASE:L_A:0 = MAXBASE:L_A:0$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '16-17',
        any: [/^\s*CFLAG:L_A:9 = LOCAL$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '22-24',
        any: [/^SWAP L_A, TARGET$/m, /^\s*CALL WEARING_CLOTH_ABLE$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '23',
        any: [/^\s*CALL WEARING_CLOTH_ABLE$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '27',
        any: [/^\s*CALL RANDOM_SELF_CALL, L_A$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '29-33',
        any: [/^IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '30',
        any: [/^IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)$/m],
      },
      {
        src: CHARA_MAKE_INIT,
        ref: '36-53',
        any: [/^IF !\(TALENT:L_A:275/m],
      },
      { src: CHARA_MAKE_INIT, ref: '38', any: [/^\s*SIF RAND:40 == 0$/m] },
      { src: CHARA_MAKE_INIT, ref: '54', any: [/^RETURN L_A$/m] },
      // SELF_CALL.ERB 的一人称
      {
        src: SELF_CALL_ERB,
        ref: '2-65',
        any: [/^@RANDOM_SELF_CALL, ARG, MODE = 0$/m],
      },
      { src: SELF_CALL_ERB, ref: '6', any: [/^LOCAL = CFLAG:ARG:450$/m] },
      { src: SELF_CALL_ERB, ref: '7-8', any: [/^SIF MODE == 0$/m] },
      { src: SELF_CALL_ERB, ref: '25-26', any: [/^SIF LOCAL >= 200$/m] },
      {
        src: SELF_CALL_ERB,
        ref: '28-36',
        any: [/^IF LOCAL < 0$/m, /LOCALS = %CSVCSTR/m],
      },
      { src: SELF_CALL_ERB, ref: '29', any: [/LOCALS = %CSVCSTR/m] },
      { src: SELF_CALL_ERB, ref: '38-42', any: [/^IF LOCAL < 9$/m] },
      {
        src: SELF_CALL_ERB,
        ref: '39-40',
        any: [/^\s*CSTR:ARG:60 = 我$/m, /^\s*CFLAG:ARG:450 = 9$/m],
      },
      { src: SELF_CALL_ERB, ref: '44-52', any: [/^IF LOCAL < 100$/m] },
      {
        src: SELF_CALL_ERB,
        ref: '46',
        any: [/^\s*CALL SET_SUIT_SELFCALL, ARG, LOCAL$/m],
      },
      { src: SELF_CALL_ERB, ref: '54-62', any: [/^IF LOCAL < 200$/m] },
    ],
  },

  // —— #170 H1 角色生成管线：ere/chara/chara-make.js（本体）与
  //    ere/chara/char-make.js（转发层）。锚由源文件逐行原文生成。 ——
  {
    js: 'ere/chara/chara-make.js',
    refs: [
      {
        src: CHARA_MAKE_ERB,
        ref: '2-120',
        any: [/@CHARA_MAKE\(ARG, ARG:1 = 0, ARG:2 = 0\)/],
      },
      { src: CHARA_MAKE_ERB, ref: '12', any: [/SWAP A, ARG/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '14-16',
        any: [/SIF !EX_TALENT:A:2 \|\| 赤森奴隶/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '15',
        any: [/SIF !EX_TALENT:A:2 \|\| 赤森奴隶/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '18-20',
        any: [/SIF !EX_TALENT:A:2	;后代：命名->设置家族关系->CHARA_MAKE/],
      },
      { src: CHARA_MAKE_ERB, ref: '22-24', any: [/;Level・经验值設定/] },
      { src: CHARA_MAKE_ERB, ref: '26-27', any: [/;家族初期化/] },
      { src: CHARA_MAKE_ERB, ref: '29-30', any: [/;売春への積極性/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '32-51',
        any: [/IF !TALENT:A:精英 && !EX_TALENT:A:1 && !EX_TALENT:A:2/],
      },
      { src: CHARA_MAKE_ERB, ref: '34', any: [/CALL CM_STP/] },
      { src: CHARA_MAKE_ERB, ref: '36', any: [/CALL CM_BASE/] },
      { src: CHARA_MAKE_ERB, ref: '38', any: [/CALL CM_ST/] },
      { src: CHARA_MAKE_ERB, ref: '41', any: [/CFLAG:A:1 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '43', any: [/CALL CM_BASE/] },
      { src: CHARA_MAKE_ERB, ref: '45', any: [/CALL CM_ST_ACE/] },
      { src: CHARA_MAKE_ERB, ref: '48', any: [/CFLAG:A:1 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '50', any: [/CALL CM_BASE/] },
      { src: CHARA_MAKE_ERB, ref: '54-60', any: [/;口上性格/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '57',
        any: [/ELSEIF INRANGE\(NO:A,200,211\)/],
      },
      { src: CHARA_MAKE_ERB, ref: '58', any: [/;精英，暂用勇者口上/] },
      { src: CHARA_MAKE_ERB, ref: '63-65', any: [/;初心者の烙印/] },
      { src: CHARA_MAKE_ERB, ref: '68', any: [/CALL CM_VIRGIN/] },
      { src: CHARA_MAKE_ERB, ref: '71', any: [/CALL CM_TALENT/] },
      { src: CHARA_MAKE_ERB, ref: '74', any: [/CALL CM_SKILL/] },
      { src: CHARA_MAKE_ERB, ref: '77', any: [/CALL CM_LOOK, ARG:2/] },
      { src: CHARA_MAKE_ERB, ref: '79-83', any: [/IF EX_TALENT:A:2/] },
      { src: CHARA_MAKE_ERB, ref: '86', any: [/CALL CM_KIND/] },
      { src: CHARA_MAKE_ERB, ref: '89-90', any: [/SIF !EX_TALENT:A:2/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '100-102',
        any: [/;新的家族系统（后代不设定家族/],
      },
      { src: CHARA_MAKE_ERB, ref: '105', any: [/CALL CM_FAMILY_TALENT/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '109',
        any: [/CALL CM_CLOTH	;SET_CHAR_CLOTH/],
      },
      { src: CHARA_MAKE_ERB, ref: '112', any: [/CALL RANDOM_SELF_CALL, A/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '114-117',
        any: [/;年齢or身長などを表示する設定の場合は身体データを設定/],
      },
      { src: CHARA_MAKE_ERB, ref: '119-120', any: [/SWAP A, ARG/] },
      { src: CHARA_MAKE_ERB, ref: '124-130', any: [/@CM_STP/] },
      { src: CHARA_MAKE_ERB, ref: '125', any: [/CFLAG:A:501 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '126', any: [/CFLAG:A:502 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '127', any: [/CFLAG:A:1 = 2/] },
      { src: CHARA_MAKE_ERB, ref: '128', any: [/CFLAG:A:508 = 3/] },
      { src: CHARA_MAKE_ERB, ref: '132-214', any: [/@CM_BASE/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '133-169',
        any: [/IF TALENT:A:战士 \|\| TALENT:A:骑士/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '133',
        any: [/IF TALENT:A:战士 \|\| TALENT:A:骑士/],
      },
      { src: CHARA_MAKE_ERB, ref: '135', any: [/CFLAG:A:11 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '136', any: [/CFLAG:A:12 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '137', any: [/CFLAG:A:13 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '138', any: [/CFLAG:A:14 = 20/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '139',
        any: [/ELSEIF TALENT:A:魔法师 \|\| TALENT:A:巫女/],
      },
      { src: CHARA_MAKE_ERB, ref: '141', any: [/CFLAG:A:11 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '142', any: [/CFLAG:A:12 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '143', any: [/CFLAG:A:13 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '144', any: [/CFLAG:A:14 = 15/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '145',
        any: [/ELSEIF TALENT:A:神官 \|\| TALENT:A:忍者/],
      },
      { src: CHARA_MAKE_ERB, ref: '147', any: [/CFLAG:A:11 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '148', any: [/CFLAG:A:12 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '149', any: [/CFLAG:A:13 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '150', any: [/CFLAG:A:14 = 20/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '151',
        any: [/ELSEIF TALENT:A:盗贼 \|\| TALENT:A:弓手 \|\| TALENT:A:魔物使/],
      },
      { src: CHARA_MAKE_ERB, ref: '153', any: [/CFLAG:A:11 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '154', any: [/CFLAG:A:12 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '155', any: [/CFLAG:A:13 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '156', any: [/CFLAG:A:14 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '157', any: [/ELSEIF TALENT:A:精英/] },
      { src: CHARA_MAKE_ERB, ref: '159', any: [/CFLAG:A:11 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '160', any: [/CFLAG:A:12 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '161', any: [/CFLAG:A:13 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '162', any: [/CFLAG:A:14 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '163', any: [/ELSE/] },
      { src: CHARA_MAKE_ERB, ref: '165', any: [/CFLAG:A:11 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '166', any: [/CFLAG:A:12 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '167', any: [/CFLAG:A:13 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '168', any: [/CFLAG:A:14 = 15/] },
      { src: CHARA_MAKE_ERB, ref: '171-179', any: [/;神官と巫女は治癒を持つ/] },
      { src: CHARA_MAKE_ERB, ref: '174', any: [/TALENT:A:117 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '176', any: [/CFLAG:A:152 = 20/] },
      { src: CHARA_MAKE_ERB, ref: '178', any: [/TALENT:A:118 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '187-203', any: [/IF TALENT:A:种族2 == 2/] },
      { src: CHARA_MAKE_ERB, ref: '188', any: [/CFLAG:A:12 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '189', any: [/CFLAG:A:14 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '191', any: [/CFLAG:A:11 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '192', any: [/CFLAG:A:13 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '194', any: [/CFLAG:A:11 -= 4/] },
      { src: CHARA_MAKE_ERB, ref: '195', any: [/CFLAG:A:12 -= 4/] },
      { src: CHARA_MAKE_ERB, ref: '196', any: [/CFLAG:A:13 -= 4/] },
      { src: CHARA_MAKE_ERB, ref: '197', any: [/CFLAG:A:14 -= 4/] },
      { src: CHARA_MAKE_ERB, ref: '199', any: [/CFLAG:A:11 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '200', any: [/CFLAG:A:12 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '201', any: [/CFLAG:A:13 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '202', any: [/CFLAG:A:14 \+= 5/] },
      { src: CHARA_MAKE_ERB, ref: '205-214', any: [/;精英は魔の刻印を持つ/] },
      { src: CHARA_MAKE_ERB, ref: '209', any: [/TALENT:A:254 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '211', any: [/TALENT:A:117 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '213', any: [/TALENT:A:118 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '216-251', any: [/@CM_KJ, ARG = 0/] },
      { src: CHARA_MAKE_ERB, ref: '220', any: [/;162,懦弱,/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '225',
        any: [/VARSET TALENT:A:0, 0, 160, 180/],
      },
      { src: CHARA_MAKE_ERB, ref: '227', any: [/TALENT:A:ARG = 1/] },
      { src: CHARA_MAKE_ERB, ref: '229-250', any: [/\$CHARA_MIND_LOOP/] },
      { src: CHARA_MAKE_ERB, ref: '230', any: [/X = RAND:11 \+ 160/] },
      { src: CHARA_MAKE_ERB, ref: '233', any: [/SIF X == 165/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '236',
        any: [/SIF TALENT:A:122 && X == 166/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '239',
        any: [/SIF TALENT:A:122 && X == 163/],
      },
      { src: CHARA_MAKE_ERB, ref: '241', any: [/SIF X == 170/] },
      { src: CHARA_MAKE_ERB, ref: '243', any: [/IF X >= 167 && X <= 169/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '246',
        any: [/SIF TALENT:A:122 == 0 && X == 174/],
      },
      { src: CHARA_MAKE_ERB, ref: '250', any: [/TALENT:A:X = 1/] },
      { src: CHARA_MAKE_ERB, ref: '255-294', any: [/@CM_GENDER/] },
      { src: CHARA_MAKE_ERB, ref: '259', any: [/SELECTCASE 冒險者性別/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '261',
        any: [/;女多男少\(2%扶他，20%男性\)/],
      },
      { src: CHARA_MAKE_ERB, ref: '263', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '265', any: [/TALENT:A:122 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '267', any: [/CASE  0/] },
      { src: CHARA_MAKE_ERB, ref: '270', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '271', any: [/CASE  1/] },
      { src: CHARA_MAKE_ERB, ref: '274', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '275', any: [/ELSEIF RAND:5 >= 0/] },
      { src: CHARA_MAKE_ERB, ref: '276', any: [/TALENT:A:122 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '278', any: [/CASE  2/] },
      { src: CHARA_MAKE_ERB, ref: '281', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '282', any: [/ELSEIF RAND:5 >= 1/] },
      { src: CHARA_MAKE_ERB, ref: '283', any: [/TALENT:A:122 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '285', any: [/CASE  3/] },
      { src: CHARA_MAKE_ERB, ref: '288', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '289', any: [/ELSEIF RAND:2 < 1/] },
      { src: CHARA_MAKE_ERB, ref: '290', any: [/TALENT:A:122 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '292', any: [/CASE  4/] },
      { src: CHARA_MAKE_ERB, ref: '293', any: [/TALENT:A:121 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '295-347', any: [/@CM_VIRGIN/] },
      { src: CHARA_MAKE_ERB, ref: '297', any: [/IF TALENT:A:122 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '298', any: [/TALENT:A:0 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '300', any: [/IF RAND:3/] },
      { src: CHARA_MAKE_ERB, ref: '301', any: [/TALENT:A:1 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '302', any: [/CFLAG:A:15 = -1/] },
      { src: CHARA_MAKE_ERB, ref: '303', any: [/CFLAG:A:16 = -1/] },
      { src: CHARA_MAKE_ERB, ref: '305', any: [/CFLAG:A:15 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '306', any: [/CFLAG:A:16 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '308', any: [/ELSEIF EX_TALENT:A:2/] },
      { src: CHARA_MAKE_ERB, ref: '309', any: [/TALENT:A:0 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '310', any: [/CFLAG:A:16 = -1/] },
      { src: CHARA_MAKE_ERB, ref: '311', any: [/ELSEIF TALENT:A:121 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '313', any: [/SIF RAND:8/] },
      { src: CHARA_MAKE_ERB, ref: '316', any: [/IF RAND:3 > 0/] },
      { src: CHARA_MAKE_ERB, ref: '317', any: [/TALENT:A:1 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '318', any: [/CFLAG:A:16 = -1/] },
      { src: CHARA_MAKE_ERB, ref: '320', any: [/CFLAG:A:16 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '323', any: [/IF TALENT:A:0 && TALENT:A:1/] },
      { src: CHARA_MAKE_ERB, ref: '324', any: [/CFLAG:A:15 = -1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '325',
        any: [/ELSEIF TALENT:A:0 == 0 \|\| TALENT:A:1 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '326', any: [/CFLAG:A:15 = 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '328',
        any: [/ELSEIF FLAG:82 == 1 && RAND:2 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '329', any: [/TALENT:A:0 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '330', any: [/CFLAG:A:16 = -1/] },
      { src: CHARA_MAKE_ERB, ref: '331', any: [/ELSEIF RAND:8/] },
      { src: CHARA_MAKE_ERB, ref: '332', any: [/TALENT:A:0 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '333', any: [/CFLAG:A:16 = -1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '336',
        any: [/SIF TALENT:A:0 == 1 \|\| TALENT:A:1/],
      },
      { src: CHARA_MAKE_ERB, ref: '337', any: [/CFLAG:A:16 = -1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '340',
        any: [/SIF TALENT:A:0 == 1 && RAND:5 == 0 && TALENT:A:精英 != 1/],
      },
      { src: CHARA_MAKE_ERB, ref: '341', any: [/TALENT:A:273 = 1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '344',
        any: [/IF RAND:12 == 0 && TALENT:A:122 == 0 && !EX_TALENT:A:2/],
      },
      { src: CHARA_MAKE_ERB, ref: '345', any: [/TALENT:A:157 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '346', any: [/TALENT:A:0 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '349-729', any: [/@CM_TALENT/] },
      { src: CHARA_MAKE_ERB, ref: '353-363', any: [/X = RAND:3/] },
      { src: CHARA_MAKE_ERB, ref: '356', any: [/TALENT:A:10 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '359', any: [/TALENT:A:12 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '362', any: [/TALENT:A:14 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '368-379', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '370', any: [/TALENT:A:11 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '373', any: [/TALENT:A:18 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '375', any: [/TALENT:A:13 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '378', any: [/TALENT:A:16 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '384-391', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '398-409', any: [/X = RAND:16/] },
      { src: CHARA_MAKE_ERB, ref: '414-421', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '425-430', any: [/X = RAND:8/] },
      { src: CHARA_MAKE_ERB, ref: '434-439', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '443-448', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '451-452', any: [/SIF RAND:12 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '456-461', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '464-465', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '469-474', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '478-483', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '486-487', any: [/SIF RAND:12 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '491-496', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '499-500', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '503-504', any: [/SIF RAND:50 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '507-508', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '512-517', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '522-527', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '530-531', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '534-535', any: [/SIF RAND:30 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '537-538', any: [/SIF RAND:30 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '542-543', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '547-552', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '556-561', any: [/X = RAND:8/] },
      { src: CHARA_MAKE_ERB, ref: '564-565', any: [/SIF RAND:10 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '568-569', any: [/SIF RAND:8 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '572-573', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '576-577', any: [/SIF RAND:20 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '581-594', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '598-603', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '607-612', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '616-621', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '625-630', any: [/X = RAND:12/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '637-647',
        any: [/IF RAND:50 == 0 && TALENT:A:122 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '651-656', any: [/X = RAND:12/] },
      { src: CHARA_MAKE_ERB, ref: '659-660', any: [/SIF RAND:8 == 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '667-668',
        any: [/SIF RAND:25 == 0 && \(TALENT:A:122 \|\| TALENT:A:121\)/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '670-671',
        any: [
          /SIF RAND:6 == 0 && \(TALENT:A:160 == 1 \|\| TALENT:A:162 == 1\)/,
        ],
      },
      { src: CHARA_MAKE_ERB, ref: '673-679', any: [/IF RAND:12 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '683-716', any: [/IF TALENT:A:122/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '684',
        any: [/;男人の場合恋母情结萝莉控が多い/],
      },
      { src: CHARA_MAKE_ERB, ref: '695', any: [/;扶她の場合ニュートラル/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '706',
        any: [/;それ以外の場合恋父情结正太控が多い/],
      },
      { src: CHARA_MAKE_ERB, ref: '718-719', any: [/SIF RAND:30 == 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '724-729',
        any: [/IF TALENT:A:37 && RAND:4 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '731-738', any: [/@CM_KIND/] },
      { src: CHARA_MAKE_ERB, ref: '735', any: [/CFLAG:A:151 = RAND:200/] },
      { src: CHARA_MAKE_ERB, ref: '737', any: [/CFLAG:A:151 = RAND:100/] },
      { src: CHARA_MAKE_ERB, ref: '740-858', any: [/@CM_SKILL/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '743',
        any: [/SIF TALENT:A:212 == 1 \|\| RAND:40 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '746-747', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '750-756', any: [/IF TALENT:A:种族2 != 6/] },
      { src: CHARA_MAKE_ERB, ref: '759-765', any: [/IF TALENT:A:种族2 != 6/] },
      { src: CHARA_MAKE_ERB, ref: '767-768', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '772-779', any: [/IF TALENT:A:种族2 == 7/] },
      { src: CHARA_MAKE_ERB, ref: '782-783', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '786-792', any: [/IF TALENT:A:种族2 != 6/] },
      { src: CHARA_MAKE_ERB, ref: '795-802', any: [/IF TALENT:A:种族2 != 6/] },
      { src: CHARA_MAKE_ERB, ref: '804-805', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '808-815', any: [/IF RAND:12 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '818-819', any: [/SIF RAND:40 == 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '822-823',
        any: [
          /SIF TALENT:A:种族2 == 6 && TALENT:A:241 != 1 && TALENT:A:242 != 1 && TALENT:A:250 != 1 && TALENT:A:251 != 1/,
        ],
      },
      { src: CHARA_MAKE_ERB, ref: '826-827', any: [/SIF RAND:40 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '830-834', any: [/IF RAND:60 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '839-852', any: [/SIF RAND:40 == 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '855-856',
        any: [/SIF TALENT:A:260 == 1 && RAND:40 == 0/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '858',
        any: [/CALL CMI_CONFLICT_CHECK\(A\)/],
      },
      { src: CHARA_MAKE_ERB, ref: '860-872', any: [/@CM_LOOK, ARG/] },
      { src: CHARA_MAKE_ERB, ref: '862-865', any: [/X = TARGET/] },
      { src: CHARA_MAKE_ERB, ref: '868-872', any: [/IF RAND:20 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '875-883', any: [/@CM_ST/] },
      { src: CHARA_MAKE_ERB, ref: '879', any: [/CALL ST_UP, A/] },
      { src: CHARA_MAKE_ERB, ref: '882', any: [/BASE:A:0 = MAXBASE:A:0/] },
      { src: CHARA_MAKE_ERB, ref: '883', any: [/BASE:A:1 = MAXBASE:A:1/] },
      { src: CHARA_MAKE_ERB, ref: '885-894', any: [/@CM_ST_ACE/] },
      { src: CHARA_MAKE_ERB, ref: '888', any: [/LOCAL = CFLAG:MASTER:9 \* 6/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '889',
        any: [/LOCAL \+= RAND:\(CFLAG:MASTER:9\) \* 2/],
      },
      { src: CHARA_MAKE_ERB, ref: '890', any: [/LOCAL \/= 10/] },
      { src: CHARA_MAKE_ERB, ref: '892', any: [/CALL ST_UP, A/] },
      { src: CHARA_MAKE_ERB, ref: '896-1042', any: [/@CM_FAMILY_TALENT/] },
      { src: CHARA_MAKE_ERB, ref: '900-901', any: [/LOCAL = CFLAG:A:605/] },
      { src: CHARA_MAKE_ERB, ref: '902', any: [/CALL SEARCH_FAMILY, A/] },
      { src: CHARA_MAKE_ERB, ref: '903', any: [/FAMILY_ID = RESULT/] },
      { src: CHARA_MAKE_ERB, ref: '905', any: [/IF FAMILY_ID > 0/] },
      { src: CHARA_MAKE_ERB, ref: '907', any: [/IF CFLAG:FAMILY_ID:451 < 15/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '909',
        any: [/IF TALENT:FAMILY_ID:魁梧 && RAND:3 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '911', any: [/TALENT:A:娇小 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '913', any: [/TALENT:A:魁梧 = 1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '918',
        any: [
          /IF \(\(TALENT:FAMILY_ID:巨乳 && RAND:4\) \|\| \(TALENT:FAMILY_ID:爆乳 && RAND:2\) \|\| \(TALENT:FAMILY_ID:超乳\) == 0\) && TALENT:A:122 == 0/,
        ],
      },
      { src: CHARA_MAKE_ERB, ref: '920', any: [/TALENT:A:绝壁 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '923', any: [/TALENT:A:贫乳 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '925', any: [/TALENT:A:巨乳 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '927', any: [/TALENT:A:巨乳 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '930', any: [/TALENT:A:爆乳 = 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '935',
        any: [/ELSEIF CFLAG:FAMILY_ID:451 > 17/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '937',
        any: [/IF TALENT:FAMILY_ID:娇小 && RAND:3 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '939', any: [/TALENT:A:魁梧 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '941', any: [/TALENT:A:娇小 = 1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '946',
        any: [
          /IF \(\(TALENT:FAMILY_ID:贫乳 && RAND:4\) \|\| \(TALENT:FAMILY_ID:绝壁 && RAND:2\) == 0\) && TALENT:A:122 == 0/,
        ],
      },
      { src: CHARA_MAKE_ERB, ref: '948', any: [/TALENT:A:超乳 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '951', any: [/TALENT:A:爆乳 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '954', any: [/TALENT:A:巨乳 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '956', any: [/TALENT:A:贫乳 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '958', any: [/TALENT:A:贫乳 = 0/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '964-967',
        any: [
          /IF \(TALENT:FAMILY_ID:肌肉型 \|\| TALENT:FAMILY_ID:虚弱\) && RAND:3 == 0/,
        ],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '965',
        any: [/TALENT:A:肌肉型 = TALENT:FAMILY_ID:肌肉型/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '966',
        any: [/TALENT:A:虚弱 = TALENT:FAMILY_ID:虚弱/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '969-972',
        any: [
          /IF \(TALENT:FAMILY_ID:褐色肌肤 \|\| TALENT:FAMILY_ID:白皙\) && RAND:2 == 0/,
        ],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '970',
        any: [/TALENT:A:褐色肌肤 = TALENT:FAMILY_ID:褐色肌肤/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '971',
        any: [/TALENT:A:白皙 = TALENT:FAMILY_ID:白皙/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '974-975',
        any: [/SIF TALENT:FAMILY_ID:额头天眼 && RAND:3 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '979-1027', any: [/IF RAND:5 != 0/] },
      { src: CHARA_MAKE_ERB, ref: '981', any: [/HAIR_COLOR =130/] },
      { src: CHARA_MAKE_ERB, ref: '983', any: [/HAIR_COLOR =160/] },
      { src: CHARA_MAKE_ERB, ref: '985', any: [/HAIR_COLOR =230/] },
      { src: CHARA_MAKE_ERB, ref: '987', any: [/HAIR_COLOR =150/] },
      { src: CHARA_MAKE_ERB, ref: '989', any: [/HAIR_COLOR =120/] },
      { src: CHARA_MAKE_ERB, ref: '991', any: [/HAIR_COLOR =210/] },
      { src: CHARA_MAKE_ERB, ref: '993', any: [/HAIR_COLOR =200/] },
      { src: CHARA_MAKE_ERB, ref: '995', any: [/HAIR_COLOR =220/] },
      { src: CHARA_MAKE_ERB, ref: '997', any: [/HAIR_COLOR =110/] },
      { src: CHARA_MAKE_ERB, ref: '999', any: [/HAIR_COLOR =170/] },
      { src: CHARA_MAKE_ERB, ref: '1001', any: [/HAIR_COLOR =140/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1003',
        any: [
          /HAIR_COLOR = HAIR_COLOR - 20 \+ RAND:9 \+ RAND:9 \+ RAND:9 \+ RAND:9 \+ RAND:9/,
        ],
      },
      { src: CHARA_MAKE_ERB, ref: '1005', any: [/TALENT:A:头发颜色 = 3/] },
      { src: CHARA_MAKE_ERB, ref: '1007', any: [/TALENT:A:头发颜色 = 8/] },
      { src: CHARA_MAKE_ERB, ref: '1009', any: [/TALENT:A:头发颜色 = 6/] },
      { src: CHARA_MAKE_ERB, ref: '1011', any: [/TALENT:A:头发颜色 = 7/] },
      { src: CHARA_MAKE_ERB, ref: '1013', any: [/TALENT:A:头发颜色 = 10/] },
      { src: CHARA_MAKE_ERB, ref: '1015', any: [/TALENT:A:头发颜色 = 2/] },
      { src: CHARA_MAKE_ERB, ref: '1017', any: [/TALENT:A:头发颜色 = 4/] },
      { src: CHARA_MAKE_ERB, ref: '1019', any: [/TALENT:A:头发颜色 = 11/] },
      { src: CHARA_MAKE_ERB, ref: '1021', any: [/TALENT:A:头发颜色 = 1/] },
      { src: CHARA_MAKE_ERB, ref: '1023', any: [/TALENT:A:头发颜色 = 5/] },
      { src: CHARA_MAKE_ERB, ref: '1025', any: [/TALENT:A:头发颜色 = 9/] },
      { src: CHARA_MAKE_ERB, ref: '1029-1030', any: [/SIF RAND:5 != 0/] },
      { src: CHARA_MAKE_ERB, ref: '1032-1033', any: [/SIF RAND:3 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1035-1036', any: [/SIF RAND:3 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1038-1041', any: [/IF RAND:3 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1045-1119', any: [/@CM_NS_EXP/] },
      { src: CHARA_MAKE_ERB, ref: '1051-1062', any: [/P = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1054', any: [/P \+= RAND:3/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1057',
        any: [/LOCAL:1 = TALENT:A:320 % 1000/],
      },
      {
        src: CHARA_MAKE_ERB,
        ref: '1060',
        any: [/LOCAL:1 = TALENT:A:320 % 10000/],
      },
      { src: CHARA_MAKE_ERB, ref: '1064', any: [/EXP:A:60 \+= P/] },
      { src: CHARA_MAKE_ERB, ref: '1067-1076', any: [/IF TALENT:A:处女 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1068', any: [/EXP:A:0 = RAND:8 \+ 1 \+ P/] },
      { src: CHARA_MAKE_ERB, ref: '1069', any: [/EXP:A:5 = EXP:A:0/] },
      { src: CHARA_MAKE_ERB, ref: '1072', any: [/EXP:A:0 = RAND:4 \+ 1 \+ P/] },
      { src: CHARA_MAKE_ERB, ref: '1075', any: [/TALENT:A:处女 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1080-1092', any: [/IF RAND:30 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1082', any: [/EXP:A:10 = RAND:50/] },
      { src: CHARA_MAKE_ERB, ref: '1085', any: [/EXP:A:10 = RAND:30/] },
      { src: CHARA_MAKE_ERB, ref: '1088', any: [/EXP:A:10 = RAND:20/] },
      { src: CHARA_MAKE_ERB, ref: '1091', any: [/EXP:A:10 = RAND:10/] },
      { src: CHARA_MAKE_ERB, ref: '1095', any: [/SIF CFLAG:A:151 > 150/] },
      { src: CHARA_MAKE_ERB, ref: '1099', any: [/SIF TALENT:A:122/] },
      { src: CHARA_MAKE_ERB, ref: '1103', any: [/CALL CHARA_FIRST_EXP, A/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1106-1118',
        any: [/IF CFLAG:A:570 == 0 && TALENT:A:265/],
      },
      { src: CHARA_MAKE_ERB, ref: '1108-1109', any: [/SIF RAND:3 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1111-1112', any: [/SIF LOCAL > 8/] },
      { src: CHARA_MAKE_ERB, ref: '1113', any: [/LOCAL \*= 10/] },
      { src: CHARA_MAKE_ERB, ref: '1114', any: [/LOCAL \+= 100 \+ RAND:5/] },
      { src: CHARA_MAKE_ERB, ref: '1116-1117', any: [/SIF RAND:50 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1118', any: [/CFLAG:A:570 = LOCAL/] },
      { src: CHARA_MAKE_ERB, ref: '1122-1380', any: [/@CM_CLOTH/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1126',
        any: [/IF TALENT:A:200 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1129', any: [/R = 3/] },
      { src: CHARA_MAKE_ERB, ref: '1131', any: [/CFLAG:A:550 = 40/] },
      { src: CHARA_MAKE_ERB, ref: '1132', any: [/ELSEIF TALENT:A:战士 == 1/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1137',
        any: [/IF CFLAG:A:6 >= 4500 && RAND:3 == 0/],
      },
      { src: CHARA_MAKE_ERB, ref: '1139', any: [/R = 214/] },
      { src: CHARA_MAKE_ERB, ref: '1142', any: [/CFLAG:A:550 = 51/] },
      { src: CHARA_MAKE_ERB, ref: '1145', any: [/CFLAG:A:550 = 52/] },
      { src: CHARA_MAKE_ERB, ref: '1148-1160', any: [/IF RAND:6 == 0/] },
      { src: CHARA_MAKE_ERB, ref: '1162', any: [/CFLAG:A:550 = 40/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1164',
        any: [/ELSEIF TALENT:A:201 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1167', any: [/R = 103/] },
      { src: CHARA_MAKE_ERB, ref: '1169', any: [/CFLAG:A:42 = 85/] },
      { src: CHARA_MAKE_ERB, ref: '1171', any: [/CFLAG:A:550 = 41/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1172',
        any: [/ELSEIF TALENT:A:魔法师 == 1/],
      },
      { src: CHARA_MAKE_ERB, ref: '1182', any: [/CFLAG:A:42 = 85/] },
      { src: CHARA_MAKE_ERB, ref: '1184', any: [/CFLAG:A:550 = 41/] },
      { src: CHARA_MAKE_ERB, ref: '1185', any: [/ELSEIF TALENT:A:神官 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1195', any: [/CFLAG:A:550 = 46/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1196',
        any: [/ELSEIF TALENT:A:203 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1199', any: [/R = 103/] },
      { src: CHARA_MAKE_ERB, ref: '1201', any: [/CFLAG:A:550 = 43/] },
      { src: CHARA_MAKE_ERB, ref: '1202', any: [/ELSEIF TALENT:A:盗贼 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1212', any: [/CFLAG:A:550 = 43/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1213',
        any: [/ELSEIF TALENT:A:205 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1216', any: [/R = 105/] },
      { src: CHARA_MAKE_ERB, ref: '1218', any: [/CFLAG:A:550 = 40/] },
      { src: CHARA_MAKE_ERB, ref: '1219', any: [/ELSEIF TALENT:A:骑士 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1229', any: [/CFLAG:A:550 = 40/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1230',
        any: [/ELSEIF TALENT:A:206 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1233', any: [/R = 104/] },
      { src: CHARA_MAKE_ERB, ref: '1235', any: [/CFLAG:A:550 = 41/] },
      { src: CHARA_MAKE_ERB, ref: '1236', any: [/ELSEIF TALENT:A:巫女 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1238', any: [/R = 104/] },
      { src: CHARA_MAKE_ERB, ref: '1240', any: [/CFLAG:A:550 = 41/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1241',
        any: [/ELSEIF TALENT:A:207 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1244', any: [/R = 110/] },
      { src: CHARA_MAKE_ERB, ref: '1246', any: [/CFLAG:A:550 = 44/] },
      { src: CHARA_MAKE_ERB, ref: '1247', any: [/ELSEIF TALENT:A:忍者 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1249', any: [/R = 110/] },
      { src: CHARA_MAKE_ERB, ref: '1251', any: [/CFLAG:A:550 = 44/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1252',
        any: [/ELSEIF TALENT:A:208 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1255', any: [/R = 103/] },
      { src: CHARA_MAKE_ERB, ref: '1257', any: [/CFLAG:A:550 = 45/] },
      { src: CHARA_MAKE_ERB, ref: '1258', any: [/ELSEIF TALENT:A:弓手 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1268', any: [/CFLAG:A:550 = 45/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1269',
        any: [/ELSEIF TALENT:A:种族2 == 2 \|\| TALENT:A:137 == 1/],
      },
      { src: CHARA_MAKE_ERB, ref: '1271', any: [/R = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1273', any: [/CFLAG:A:550 = 42/] },
      { src: CHARA_MAKE_ERB, ref: '1274', any: [/ELSEIF TALENT:A:种族2 == 3/] },
      { src: CHARA_MAKE_ERB, ref: '1283', any: [/CFLAG:A:550 = 42/] },
      { src: CHARA_MAKE_ERB, ref: '1284', any: [/ELSEIF TALENT:A:种族2 == 4/] },
      { src: CHARA_MAKE_ERB, ref: '1298', any: [/CFLAG:A:550 = 42/] },
      { src: CHARA_MAKE_ERB, ref: '1299', any: [/ELSEIF TALENT:A:种族2 == 5/] },
      { src: CHARA_MAKE_ERB, ref: '1313', any: [/CFLAG:A:550 = 42/] },
      { src: CHARA_MAKE_ERB, ref: '1314', any: [/ELSEIF TALENT:A:种族2 == 6/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1327-1328',
        any: [/SIF TALENT:A:122 && R == 201/],
      },
      { src: CHARA_MAKE_ERB, ref: '1330', any: [/CFLAG:A:550 = 42/] },
      { src: CHARA_MAKE_ERB, ref: '1331', any: [/ELSEIF TALENT:A:精英 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1347', any: [/CFLAG:A:550 = 42/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1348',
        any: [/ELSEIF TALENT:A:精英 == 1 && TALENT:A:122/],
      },
      { src: CHARA_MAKE_ERB, ref: '1354', any: [/ELSE/] },
      { src: CHARA_MAKE_ERB, ref: '1355', any: [/R = 1/] },
      { src: CHARA_MAKE_ERB, ref: '1357', any: [/CFLAG:A:550 = 42/] },
      {
        src: CHARA_MAKE_ERB,
        ref: '1362',
        any: [/CFLAG:A:550 \+= RAND:10 \* 100000/],
      },
      { src: CHARA_MAKE_ERB, ref: '1364', any: [/CFLAG:A:41 = R/] },
      { src: CHARA_MAKE_ERB, ref: '1365', any: [/CFLAG:A:45 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1366', any: [/CFLAG:A:46 = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1367', any: [/R = 0/] },
      { src: CHARA_MAKE_ERB, ref: '1368-1371', any: [/X = TARGET/] },
      { src: CHARA_MAKE_ERB, ref: '1373-1374', any: [/SIF TALENT:A:48 == 1/] },
      { src: CHARA_MAKE_ERB, ref: '1380', any: [/RETURN 0/] },
    ],
  },
  {
    js: 'ere/chara/char-make.js',
    refs: [
      { src: CHAR_MAKE, ref: '2-4', any: [/@CHAR_MAKE, ARG:0 = 0, ARG:1 = 0/] },
      { src: CHAR_MAKE, ref: '4', any: [/JUMP CHARA_MAKE\(A, ARG:0, ARG:1\)/] },
      { src: CHAR_MAKE, ref: '7-9', any: [/@NAMING/] },
      { src: CHAR_MAKE, ref: '9', any: [/JUMP CHARA_NAME_DEFINE\(A\)/] },
      { src: CHAR_MAKE, ref: '12-14', any: [/@NAME_RESET/] },
      { src: CHAR_MAKE, ref: '14', any: [/JUMP CN_REBUILD/] },
      { src: CHAR_MAKE, ref: '17-19', any: [/@SET_CHAR_CLOTH/] },
      { src: CHAR_MAKE, ref: '19', any: [/JUMP CM_CLOTH/] },
      { src: CHAR_MAKE, ref: '22-25', any: [/@CHAR_INIT/] },
      { src: CHAR_MAKE, ref: '27-34', any: [/@CHAR_MAKE_INPORT, ARG:0 = 1/] },
      { src: CHAR_MAKE, ref: '31-32', any: [/SIF RAND\(ARG:0\) != 0/] },
      { src: CHAR_MAKE, ref: '34', any: [/JUMP CHARA_MAKE_INPORT/] },
    ],
  },
  {
    js: 'ere/data/equip-database.js',
    refs: [
      { src: EQUIP_ERB, ref: '7-33', any: [/^;W:1  = 識別番号（0～999）$/m] },
      {
        src: EQUIP_ERB,
        ref: '39',
        any: [
          /^;格納番号 = \(接頭語 \* 100000\) \+ \(強度 \* 1000\) \+ 識別番号$/m,
        ],
      },
      {
        src: EQUIP_ERB,
        ref: '41-62',
        any: [/^;効果（強度がマイナスの場合、逆の効果）$/m],
      },
      { src: EQUIP_ERB, ref: '274-702', any: [/^@EQUIP_DATABASE$/m] },
      { src: EQUIP_ERB, ref: '287-647', any: [/^IF W:1 == 0$/m] },
      { src: EQUIP_ERB, ref: '509-523', any: [/^ELSEIF W:1 == 45$/m] },
      { src: EQUIP_ERB, ref: '650-697', any: [/^IF W:17 == 1$/m] },
      { src: EQUIP_ERB, ref: '720-738', any: [/^IF W:17 == 1$/m] },
      { src: EQUIP_ERB, ref: '742-789', any: [/^IF W:1 == 40$/m] },
      { src: EQUIP_ERB, ref: '784-789', any: [/^ELSE$/m] },
      { src: EQUIP_ERB, ref: '810-857', any: [/^IF W:1 == 0$/m] },
      { src: EQUIP_ERB, ref: '852-857', any: [/^ELSE$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-lookup.js',
    refs: [
      {
        src: EQUIP_ERB,
        ref: '39',
        any: [
          /^;格納番号 = \(接頭語 \* 100000\) \+ \(強度 \* 1000\) \+ 識別番号$/m,
        ],
      },
      { src: EQUIP_ERB, ref: '274-702', any: [/^@EQUIP_DATABASE$/m] },
      { src: EQUIP_ERB, ref: '277-278', any: [/^SIF W:0 < 0$/m] },
      { src: EQUIP_ERB, ref: '281-284', any: [/^W:1 = W:0 % 1000$/m] },
      { src: EQUIP_ERB, ref: '287-647', any: [/^IF W:1 == 0$/m] },
      { src: EQUIP_ERB, ref: '629-647', any: [/^ELSE$/m] },
      { src: EQUIP_ERB, ref: '650-697', any: [/^IF W:17 == 1$/m] },
      { src: EQUIP_ERB, ref: '700', any: [/^W:9 \+= W:2 \* 5$/m] },
      { src: EQUIP_ERB, ref: '868-888', any: [/^@EQUIP_GET$/m] },
      { src: EQUIP_ERB, ref: '873-874', any: [/^SIF W:0 < 0$/m] },
      { src: EQUIP_ERB, ref: '876', any: [/^W:1 = W:0 % 1000$/m] },
      { src: EQUIP_ERB, ref: '878', any: [/^X = 300 \+ W:1$/m] },
      { src: EQUIP_ERB, ref: '880-881', any: [/^SIF X < 300$/m] },
      { src: EQUIP_ERB, ref: '883-886', any: [/^ITEM:X \+= 1$/m] },
      { src: EQUIP_ERB, ref: '892-901', any: [/^@GET_EQUIP_NUM$/m] },
      { src: EQUIP_ERB, ref: '896', any: [/^W:0 = W:8 - 300$/m] },
      { src: EQUIP_ERB, ref: '898-899', any: [/^SIF W:0 < 0$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-check.js',
    refs: [
      { src: EQUIP_ERB, ref: '65-86', any: [/^@EQUIP_CHECK$/m] },
      { src: EQUIP_ERB, ref: '69-70', any: [/^SIF A < 0$/m] },
      { src: EQUIP_ERB, ref: '71', any: [/^LOCAL = 0$/m] },
      { src: EQUIP_ERB, ref: '72-84', any: [/^W:0 = CFLAG:A:551$/m] },
      { src: EQUIP_ERB, ref: '75-76', any: [/^\tSIF W:3 == W:8$/m] },
      { src: EQUIP_ERB, ref: '82-83', any: [/^\tSIF W:3 == W:8$/m] },
      { src: EQUIP_ERB, ref: '904-1027', any: [/^@EQUIP_POWERUP, ARG:0$/m] },
      {
        src: EQUIP_ERB,
        ref: '907',
        any: [/^;EQUIP_DATABASE後に使用すること$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '911-914',
        any: [/^IF TALENT:\(ARG:0\):291 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '917-918',
        any: [/^SIF TALENT:\(ARG:0\):246 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '921-922',
        any: [/^SIF TALENT:\(ARG:0\):247 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '925-928',
        any: [/^IF TALENT:\(ARG:0\):259 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '931-934',
        any: [/^IF TALENT:\(ARG:0\):260 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '937-940',
        any: [/^IF TALENT:\(ARG:0\):264 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '943-944',
        any: [/^SIF W:1 == 45 && TALENT:\(ARG:0\):314 == 1$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '947-948',
        any: [/^SIF TALENT:\(ARG:0\):314 == 6$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '951-952',
        any: [/^SIF TALENT:\(ARG:0\):314 == 7$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '955-956',
        any: [/^SIF TALENT:\(ARG:0\):314 == 8$/m],
      },
      {
        src: EQUIP_ERB,
        ref: '959-960',
        any: [/^SIF TALENT:\(ARG:0\):314 == 9$/m],
      },
      { src: EQUIP_ERB, ref: '964-999', any: [/^IF TALENT:\(ARG:0\):275$/m] },
      { src: EQUIP_ERB, ref: '966-973', any: [/^\tGETBIT W:6, 1$/m] },
      { src: EQUIP_ERB, ref: '976-986', any: [/^IF TALENT:\(ARG:0\):276$/m] },
      { src: EQUIP_ERB, ref: '988-999', any: [/^IF TALENT:\(ARG:0\):277$/m] },
      { src: EQUIP_ERB, ref: '1001-1012', any: [/^IF TALENT:\(ARG:0\):278$/m] },
      { src: EQUIP_ERB, ref: '1014-1025', any: [/^IF TALENT:\(ARG:0\):279$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-print.js',
    refs: [
      { src: EQUIP_ERB, ref: '708-794', any: [/^@PRINT_EQUIPTYPE_WEAPON$/m] },
      { src: EQUIP_ERB, ref: '711-714', any: [/^W:1 = W:0 % 1000$/m] },
      { src: EQUIP_ERB, ref: '716', any: [/^SETCOLORBYNAME LightSalmon$/m] },
      { src: EQUIP_ERB, ref: '720-738', any: [/^IF W:17 == 1$/m] },
      { src: EQUIP_ERB, ref: '742-789', any: [/^IF W:1 == 40$/m] },
      { src: EQUIP_ERB, ref: '784-789', any: [/^ELSE$/m] },
      { src: EQUIP_ERB, ref: '791-792', any: [/^SIF W:2 != 0$/m] },
      { src: EQUIP_ERB, ref: '798-864', any: [/^@PRINT_EQUIPTYPE_RING$/m] },
      { src: EQUIP_ERB, ref: '801-804', any: [/^W:1 = W:0 % 1000$/m] },
      { src: EQUIP_ERB, ref: '808', any: [/^SETCOLORBYNAME LightSalmon$/m] },
      { src: EQUIP_ERB, ref: '810-857', any: [/^IF W:1 == 0$/m] },
      { src: EQUIP_ERB, ref: '852-857', any: [/^ELSE$/m] },
      { src: EQUIP_ERB, ref: '859-860', any: [/^SIF W:2 != 0$/m] },
      { src: EQUIP_ERB, ref: '864', any: [/^RETURN 0$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-curse.js',
    refs: [
      { src: EQUIP_ERB, ref: '89-155', any: [/^@REMOVE_CURSE$/m] },
      { src: EQUIP_ERB, ref: '93', any: [/^;RETURN 0は装備しない 1は装備$/m] },
      { src: EQUIP_ERB, ref: '95', any: [/^CALL GET_EQUIP_NUM$/m] },
      { src: EQUIP_ERB, ref: '97-98', any: [/^;入手階層に応じた強度になる$/m] },
      { src: EQUIP_ERB, ref: '100-103', any: [/^CALL EQUIP_DATABASE$/m] },
      { src: EQUIP_ERB, ref: '105-107', any: [/^;呪われてないならリターン$/m] },
      {
        src: EQUIP_ERB,
        ref: '109-112',
        any: [/^;神官と忍者以外は高確率で失敗し呪い品装着$/m],
      },
      { src: EQUIP_ERB, ref: '113-115', any: [/^ELSEIF RAND:8 == 0$/m] },
      {
        src: EQUIP_ERB,
        ref: '118',
        any: [/^PRINTFORMW %SAVESTR:A%解咒成功。$/m],
      },
      { src: EQUIP_ERB, ref: '120-147', any: [/^D = RAND:100$/m] },
      { src: EQUIP_ERB, ref: '121-147', any: [/^IF D < 20$/m] },
      {
        src: EQUIP_ERB,
        ref: '149-151',
        any: [/^;解呪品は地味に強度アップする$/m],
      },
      { src: EQUIP_ERB, ref: '153-154', any: [/^W:0 = W:1 \+ W:2 \* 1000$/m] },
      { src: EQUIP_ERB, ref: '157-203', any: [/^@CURSE_EQUIP_RING$/m] },
      { src: EQUIP_ERB, ref: '163', any: [/^REPEAT 10$/m] },
      { src: EQUIP_ERB, ref: '164-165', any: [/^\tSIF ITEM:300 <= 0$/m] },
      { src: EQUIP_ERB, ref: '167', any: [/^\tITEM:300 -= 1$/m] },
      { src: EQUIP_ERB, ref: '169-194', any: [/^\tD = RAND:100$/m] },
      { src: EQUIP_ERB, ref: '171-189', any: [/^\tIF D < 20$/m] },
      { src: EQUIP_ERB, ref: '187-188', any: [/^\tELSE$/m] },
      {
        src: EQUIP_ERB,
        ref: '196-198',
        any: [/^\tPRINT 你把装饰戒指制造成$/m],
      },
      { src: EQUIP_ERB, ref: '200', any: [/^\tCALL EQUIP_GET$/m] },
      { src: EQUIP_ERB, ref: '202', any: [/^WAIT$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-select.js',
    refs: [
      { src: EQUIP_ERB, ref: '206-271', any: [/^@EQUIP_SELECT$/m] },
      { src: EQUIP_ERB, ref: '211-212', any: [/^SIF A < 0$/m] },
      { src: EQUIP_ERB, ref: '214-233', any: [/^;宝箱チェック$/m] },
      {
        src: EQUIP_ERB,
        ref: '218',
        any: [/^\tCALL CAMPAIGN_EQUIP_SELECT,CFLAG:A:501$/m],
      },
      { src: EQUIP_ERB, ref: '220-221', any: [/^\tSIF X < 300 $/m] },
      { src: EQUIP_ERB, ref: '223-224', any: [/^\tY = CFLAG:A:501 \+ 339$/m] },
      { src: EQUIP_ERB, ref: '225-226', any: [/^\tSIF X < 300 $/m] },
      { src: EQUIP_ERB, ref: '228-232', any: [/^\tIF ITEM:X <= 0$/m] },
      { src: EQUIP_ERB, ref: '235', any: [/^PRINTW 勇者发现了宝箱！$/m] },
      { src: EQUIP_ERB, ref: '237', any: [/^W:8 = X$/m] },
      { src: EQUIP_ERB, ref: '239-267', any: [/^W:0 = CFLAG:A:551$/m] },
      {
        src: EQUIP_ERB,
        ref: '243',
        any: [/^IF W:0 == -1 \|\| RESULT && W:2 < CFLAG:A:501 && W:5 == 0$/m],
      },
      { src: EQUIP_ERB, ref: '245-250', any: [/^\tIF RESULT && W:7 == 1$/m] },
      {
        src: EQUIP_ERB,
        ref: '258',
        any: [/^IF W:0 == -1 \|\| RESULT && W:2 < CFLAG:A:501 && W:5 == 0$/m],
      },
      { src: EQUIP_ERB, ref: '260-265', any: [/^\tIF RESULT && W:7 == 1$/m] },
      { src: EQUIP_ERB, ref: '269', any: [/^PRINTW 似乎没什么好東西。$/m] },
    ],
  },
  {
    js: 'ere/system/equip/equip-usable.js',
    refs: [
      {
        src: USE_EX_ITEM,
        ref: '247-329',
        any: [/^@USEABLE_EQUIPMENT,ARG,ARG:1 $/m],
      },
      {
        src: USE_EX_ITEM,
        ref: '251-252',
        any: [/^SIF ARG:1 >= 0 && ARG:1 <= 20$/m],
      },
      { src: USE_EX_ITEM, ref: '267-273', any: [/^IF TALENT:ARG:200$/m] },
      { src: USE_EX_ITEM, ref: '267-329', any: [/^IF TALENT:ARG:200$/m] },
      { src: USE_EX_ITEM, ref: '275-281', any: [/^IF TALENT:ARG:201$/m] },
      { src: USE_EX_ITEM, ref: '283-289', any: [/^IF TALENT:ARG:202$/m] },
      { src: USE_EX_ITEM, ref: '291-297', any: [/^IF TALENT:ARG:203$/m] },
      { src: USE_EX_ITEM, ref: '299-305', any: [/^IF TALENT:ARG:205$/m] },
      { src: USE_EX_ITEM, ref: '307-313', any: [/^IF TALENT:ARG:206$/m] },
      { src: USE_EX_ITEM, ref: '315-321', any: [/^IF TALENT:ARG:207$/m] },
      { src: USE_EX_ITEM, ref: '323-329', any: [/^IF TALENT:ARG:208$/m] },
    ],
  },
  {
    js: 'ere/system/equip/weapon-restore.js',
    refs: [
      { src: CHAR_ST, ref: '7-66', any: [/^@WEAPON_RESTORE,ARG:0$/m] },
      { src: CHAR_ST, ref: '12-19', any: [/^;装備効果$/m] },
      { src: CHAR_ST, ref: '21-28', any: [/^;鉄壁$/m] },
      { src: CHAR_ST, ref: '30-35', any: [/^;装備効果$/m] },
      { src: CHAR_ST, ref: '37-41', any: [/^;装備効果\(攻撃増加\)$/m] },
      { src: CHAR_ST, ref: '43-47', any: [/^;装備効果\(防御増加\)$/m] },
      { src: CHAR_ST, ref: '49-60', any: [/^;勲章によって強化される上位職$/m] },
      {
        src: CHAR_ST,
        ref: '62-66',
        any: [/^IF TALENT:\(ARG:0\):314 == 2 && DAY:2 >= 14 && DAY:2 <= 16$/m],
      },
    ],
  },

  // —— #171 H2 勇者来袭：ere/event/enter-enemy.js。锚由源文件逐行原文
  //    生成（ENTER_ENEMY.ERB 全量 + GET_ENEMY 调用方的两行 INVASION.ERB）。 ——
  {
    js: 'ere/event/enter-enemy.js',
    refs: [
      { src: ENTER_ENEMY_ERB, ref: '1-164', any: [/@ENTER_ENEMY,ARG:0/] },
      { src: ENTER_ENEMY_ERB, ref: '7-8', any: [/LOCAL = 10/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '10-13',
        any: [/;FLAG:60 = 勇者基礎レベル補正/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '11-13',
        any: [/;SIF DAY:2 > LOCAL \&\& ARG:0 == 0 \&\& FL/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '14-16',
        any: [/SIF ARG:0 == 0 \|\| TALENT:\(ARG:0\):村娘Ａ/],
      },
      { src: ENTER_ENEMY_ERB, ref: '18-19', any: [/CALL K_34_crazylord/] },
      { src: ENTER_ENEMY_ERB, ref: '21-32', any: [/;フラグ確保/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '34',
        any: [
          /;キャラが多すぎる場合中断\(STICK修改，按照侵攻进度限制勇者数量\)/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '34-47',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '35-36',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '35-47',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '37-38',
        any: [/ELSEIF FLAG:87 == 0 \&\& FLAG:89 == 0 \&\&/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '39-40',
        any: [/ELSEIF \(\(FLAG:87 \* FLAG:89 == 0\) \&\& \(F/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '41-42',
        any: [/ELSEIF \(FLAG:87 == 0 \|\| FLAG:89 == 0 \|/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '43-44',
        any: [/ELSEIF FLAG:92 < 15  \&\& CHARANUM > 80/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '45-46',
        any: [/ELSEIF CHARANUM >= MAX_CHARANUM/],
      },
      { src: ENTER_ENEMY_ERB, ref: '50', any: [/CHARA = RAND\(1, 17\)/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '51-52',
        any: [/;GETCHARA\(キャラ番号, SPフラグ\)でキャラが存在しない場合は\-1/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '53',
        any: [/IF GETBIT\(FLAG:5,32\) \|\| GETCHARA\(CHARA/],
      },
      { src: ENTER_ENEMY_ERB, ref: '55-60', any: [/IF ARG:0 > 0/] },
      { src: ENTER_ENEMY_ERB, ref: '56', any: [/LOCAL = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '57', any: [/ADDCHARA CHARA/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '58',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      { src: ENTER_ENEMY_ERB, ref: '59-60', any: [/A = CHARANUM \- 1/] },
      { src: ENTER_ENEMY_ERB, ref: '62-72', any: [/CALL CHAR_MAKE_INPORT/] },
      { src: ENTER_ENEMY_ERB, ref: '63', any: [/CALL CHAR_MAKE_INPORT/] },
      { src: ENTER_ENEMY_ERB, ref: '65', any: [/LOCAL = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '66', any: [/ADDCHARA CHARA/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '67',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      { src: ENTER_ENEMY_ERB, ref: '68-69', any: [/A = CHARANUM \- 1/] },
      { src: ENTER_ENEMY_ERB, ref: '71', any: [/LOCAL = 1/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '73',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '73-91',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '74-75', any: [/SIF LOCAL/] },
      { src: ENTER_ENEMY_ERB, ref: '76-77', any: [/SIF TALENT:RESULT:1000/] },
      { src: ENTER_ENEMY_ERB, ref: '78-82', any: [/IF TALENT:RESULT:122/] },
      { src: ENTER_ENEMY_ERB, ref: '83-84', any: [/PRINTS SAVESTR:RESULT/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '85',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '86', any: [/WAIT/] },
      { src: ENTER_ENEMY_ERB, ref: '87-91', any: [/IF FLAG:5 \& 2/] },
      { src: ENTER_ENEMY_ERB, ref: '93-96', any: [/ELSE/] },
      { src: ENTER_ENEMY_ERB, ref: '98', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '99', any: [/A = RESULT/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '101-103',
        any: [/SIF CFLAG:A:151 < \-100/],
      },
      { src: ENTER_ENEMY_ERB, ref: '105', any: [/CALL ENTERENEMY_KOUJO/] },
      { src: ENTER_ENEMY_ERB, ref: '107-133', any: [/LOCAL = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '110', any: [/LOCAL = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '111-112', any: [/SIF TALENT:A:126/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '114-115',
        any: [/SIF TALENT:A:315 == 7 \|\| TALENT:A:315 /],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '117-118',
        any: [/SIF TALENT:A:315 == 8 \|\| TALENT:A:315 /],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '120-121',
        any: [/SIF TALENT:A:316 == 2 \|\| TALENT:A:316 /],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '123-124',
        any: [/SIF TALENT:A:316 == 9 \|\| TALENT:A:316 /],
      },
      { src: ENTER_ENEMY_ERB, ref: '128', any: [/LOCAL \+= CFLAG:A:9/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '131',
        any: [/LOCAL = LOCAL <= 0 \? 0 \# LOCAL/],
      },
      { src: ENTER_ENEMY_ERB, ref: '133', any: [/CFLAG:A:580 \+= LOCAL/] },
      { src: ENTER_ENEMY_ERB, ref: '135-156', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '140-154', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '143-151', any: [/IF RAND:4 == 0/] },
      { src: ENTER_ENEMY_ERB, ref: '158-162', any: [/IF GETBIT\(FLAG:8, 1\)/] },
      { src: ENTER_ENEMY_ERB, ref: '160', any: [/CALL SHOW_CHARA_INFO, A/] },
      { src: ENTER_ENEMY_ERB, ref: '164', any: [/RETURN 1/] },
      { src: ENTER_ENEMY_ERB, ref: '169-221', any: [/@K_11_LILY/] },
      { src: ENTER_ENEMY_ERB, ref: '173-174', any: [/SIF FLAG:223 == 1/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '176-177',
        any: [/SIF DAY < 200 \|\| GETCHARA\(17\) < 0 \|\| G/],
      },
      { src: ENTER_ENEMY_ERB, ref: '178', any: [/LOCAL = GETCHARA\(17\)/] },
      { src: ENTER_ENEMY_ERB, ref: '180-181', any: [/SIF LOCAL < 0/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '183-184',
        any: [/SIF TALENT:LOCAL:85 == 0 \&\& TALENT:LOC/],
      },
      { src: ENTER_ENEMY_ERB, ref: '186-187', any: [/SIF CFLAG:LOCAL:1 != 0/] },
      { src: ENTER_ENEMY_ERB, ref: '189', any: [/ADDCHARA 24/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '190',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      { src: ENTER_ENEMY_ERB, ref: '194', any: [/FLAG:223 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '196', any: [/A = CHARANUM \- 1/] },
      { src: ENTER_ENEMY_ERB, ref: '197', any: [/SAVESTR:A = %NAME:A%/] },
      { src: ENTER_ENEMY_ERB, ref: '198', any: [/CSTR:A:1 = %NAME:A%/] },
      { src: ENTER_ENEMY_ERB, ref: '200', any: [/CFLAG:A:550 = 40/] },
      { src: ENTER_ENEMY_ERB, ref: '202', any: [/TARGET = A/] },
      { src: ENTER_ENEMY_ERB, ref: '203', any: [/CALL WEARING_CLOTH_ABLE/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '204',
        any: [/CALL CHAR_BODY_GENERATE_WAPPED, A/],
      },
      { src: ENTER_ENEMY_ERB, ref: '205', any: [/CALL FAMILY_REGISTER\(A\)/] },
      { src: ENTER_ENEMY_ERB, ref: '206', any: [/TARGET = FLAG:1/] },
      { src: ENTER_ENEMY_ERB, ref: '207', any: [/CFLAG:A:501 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '208', any: [/CFLAG:A:502 = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '209', any: [/CFLAG:A:1 = 2/] },
      { src: ENTER_ENEMY_ERB, ref: '210', any: [/PRINTL/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '211',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '212',
        any: [
          /PRINTL 魔王的地下城附近的村子里有一对姐妹。她们没有双亲，一起在亲戚的/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '213',
        any: [
          /PRINTL 某一天，魔王复活了，妹妹也同时下落不明。姐姐像是发疯一般地四处/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '214',
        any: [
          /PRINTW 又过了半年，姐姐终于下定了决心，前往魔王的地下城。一只手拿着提/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '215', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '216-218', any: [/PRINT 村娘/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '219',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '220', any: [/CALL ENTERENEMY_KOUJO/] },
      { src: ENTER_ENEMY_ERB, ref: '221', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '224-323', any: [/@K_34_crazylord/] },
      { src: ENTER_ENEMY_ERB, ref: '228-229', any: [/SIF FLAG:224 == 1/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '231',
        any: [/SIF DAY < 350 \|\| GETCHARA\(20\) < 0 \|\| G/],
      },
      { src: ENTER_ENEMY_ERB, ref: '233', any: [/LOCAL = GETCHARA\(20\)/] },
      { src: ENTER_ENEMY_ERB, ref: '235-236', any: [/SIF LOCAL < 0/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '238-239',
        any: [/SIF TALENT:LOCAL:85 == 0 \&\& TALENT:LOC/],
      },
      { src: ENTER_ENEMY_ERB, ref: '241-242', any: [/SIF CFLAG:LOCAL:1 != 0/] },
      { src: ENTER_ENEMY_ERB, ref: '244-245', any: [/SIF FLAG:92 != 15/] },
      { src: ENTER_ENEMY_ERB, ref: '247', any: [/ADDCHARA 34/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '248',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      { src: ENTER_ENEMY_ERB, ref: '252', any: [/FLAG:224 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '254', any: [/A = CHARANUM \- 1/] },
      { src: ENTER_ENEMY_ERB, ref: '255', any: [/SAVESTR:A = %NAME:A%/] },
      { src: ENTER_ENEMY_ERB, ref: '256', any: [/CSTR:A:1 = %NAME:A%/] },
      { src: ENTER_ENEMY_ERB, ref: '258-267', any: [/IF FLAG:500 == 1/] },
      { src: ENTER_ENEMY_ERB, ref: '270', any: [/TARGET = A/] },
      { src: ENTER_ENEMY_ERB, ref: '271', any: [/CALL WEARING_CLOTH_ABLE/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '272',
        any: [/CALL CHAR_BODY_GENERATE_WAPPED, A/],
      },
      { src: ENTER_ENEMY_ERB, ref: '273', any: [/TARGET = FLAG:1/] },
      { src: ENTER_ENEMY_ERB, ref: '275', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '276', any: [/PRINTL/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '277',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '278',
        any: [
          /PRINTL 狡猾的狂王，原来对作为情妇和亲卫队长的金红桃也不是推心置腹。/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '279',
        any: [/PRINTL 在对你已经唯命是从的金红桃身上，没有得到任何情报。/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '280',
        any: [
          /PRINTL 其它的人也是对狂王的行踪一无所知，各地的魔物也没有找到狂王。/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '281',
        any: [
          /PRINTL 正当你满脑疑惑和不安的时候，一个蓝发红眼的身影出现在地下城门口/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '282',
        any: [/PRINTL 迈着悠闲的步伐，一抬手就将守门的怪物全灭了，是狂王？！/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '283',
        any: [/PRINTL 不对，这幽波纹的流动，证明了她只是狂王的替身！/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '284',
        any: [
          /PRINTL 既是她，也不是她…………但不管如何，她带着再次封印你的斗志，向/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '285', any: [/PRINTW/] },
      { src: ENTER_ENEMY_ERB, ref: '286', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '287-288', any: [/PRINT 狂王的替身/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '289',
        any: [/PRINTL 开始了地下城的攻略！/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '290',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '291', any: [/CALL ENTERENEMY_KOUJO/] },
      { src: ENTER_ENEMY_ERB, ref: '292', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '293', any: [/PRINTL/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '294-295',
        any: [
          /PRINTFORML \[0\] 夭寿啦！！来人哪！！护驾？！！！护驾？！～！？/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '296-300', any: [/CFLAG:A:501 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '297', any: [/CFLAG:A:501 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '298', any: [/CFLAG:A:502 = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '299', any: [/CFLAG:A:1 = 2/] },
      { src: ENTER_ENEMY_ERB, ref: '300', any: [/CFLAG:A:508 = 3/] },
      { src: ENTER_ENEMY_ERB, ref: '303', any: [/CFLAG:A:6 = RAND:80/] },
      { src: ENTER_ENEMY_ERB, ref: '305-320', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '306-317', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '323', any: [/RETURN 1/] },
      { src: ENTER_ENEMY_ERB, ref: '326-405', any: [/@GET_ENEMY/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '331-344',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '332-344',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      { src: ENTER_ENEMY_ERB, ref: '347', any: [/CHARA = RAND\(1, 17\)/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '349-359',
        any: [/CALL CHAR_MAKE_INPORT,10/],
      },
      { src: ENTER_ENEMY_ERB, ref: '350', any: [/CALL CHAR_MAKE_INPORT,10/] },
      { src: ENTER_ENEMY_ERB, ref: '353', any: [/ADDCHARA CHARA/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '354',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      { src: ENTER_ENEMY_ERB, ref: '355-356', any: [/A = CHARANUM \- 1/] },
      { src: ENTER_ENEMY_ERB, ref: '358', any: [/LOCAL = 1/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '360',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: ENTER_ENEMY_ERB,
        ref: '360-373',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '361-362', any: [/SIF LOCAL/] },
      { src: ENTER_ENEMY_ERB, ref: '363-364', any: [/SIF TALENT:RESULT:1000/] },
      { src: ENTER_ENEMY_ERB, ref: '365-369', any: [/IF TALENT:RESULT:122/] },
      { src: ENTER_ENEMY_ERB, ref: '370', any: [/PRINTS SAVESTR:RESULT/] },
      { src: ENTER_ENEMY_ERB, ref: '371', any: [/PRINTL 被俘虏了！/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '372',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: ENTER_ENEMY_ERB, ref: '373', any: [/WAIT/] },
      { src: ENTER_ENEMY_ERB, ref: '374', any: [/PRINTL/] },
      { src: ENTER_ENEMY_ERB, ref: '375', any: [/A = RESULT/] },
      {
        src: ENTER_ENEMY_ERB,
        ref: '377-379',
        any: [/SIF CFLAG:A:151 < \-100/],
      },
      { src: ENTER_ENEMY_ERB, ref: '381-385', any: [/CFLAG:A:501 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '382', any: [/CFLAG:A:501 = 1/] },
      { src: ENTER_ENEMY_ERB, ref: '383', any: [/CFLAG:A:502 = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '384', any: [/CFLAG:A:1 = 0/] },
      { src: ENTER_ENEMY_ERB, ref: '385', any: [/CFLAG:A:508 = 3/] },
      { src: ENTER_ENEMY_ERB, ref: '387-402', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '388-399', any: [/LOCAL:0 = RAND:32/] },
      { src: ENTER_ENEMY_ERB, ref: '405', any: [/RETURN A/] },
      { src: INVASION, ref: '884', any: [/CALL GET_ENEMY/] },
    ],
  },
  // —— #172 H3 迷宫主循环：ere/dungeon/dungeon.js。锚为所引区间首个非空行的 ——
  //    原文（机械生成后人工核过形态）；src 常量 DUNGEON 见上。 ——
  {
    js: 'ere/dungeon/dungeon.js',
    refs: [
      {
        src: DUNGEON_TRAP_ERB,
        ref: '330',
        any: [/D:20 = 1/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '835',
        any: [/D:20 -= BACK/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '335',
        any: [/D:20 = RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1344',
        any: [/CALL KARMA, A, -1/],
      },
      {
        src: DUNGEON,
        ref: '748',
        any: [/;移動を反映/],
      },
      {
        src: DUNGEON,
        ref: '1',
        any: [/;--------------------------------------------------/],
      },
      { src: DUNGEON, ref: '3-853', any: [/@DUNGEON, ARG:0/] },
      { src: DUNGEON, ref: '9', any: [/#DIM FLOOR/] },
      {
        src: DUNGEON,
        ref: '14-22',
        any: [/;A・ARG:0が攻略中のキャラ（リーダー）/],
      },
      { src: DUNGEON, ref: '23-25', any: [/MAPC = 地下城/] },
      { src: DUNGEON, ref: '27-32', any: [/IF CFLAG:\(ARG:0\):530 == 1/] },
      { src: DUNGEON, ref: '34-35', any: [/SIDEA = CFLAG:\(ARG:0\):531/] },
      { src: DUNGEON, ref: '37', any: [/TARGET = ARG:0/] },
      { src: DUNGEON, ref: '38', any: [/D:20 = CFLAG:\(ARG:0\):502/] },
      { src: DUNGEON, ref: '39', any: [/D:1 = 0/] },
      { src: DUNGEON, ref: '40-67', any: [/IF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '41', any: [/PRINTL  /] },
      { src: DUNGEON, ref: '42', any: [/DRAWLINE/] },
      {
        src: DUNGEON,
        ref: '43-44',
        any: [/IF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):507 == 0/],
      },
      {
        src: DUNGEON,
        ref: '46-52',
        any: [/ELSEIF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):507 == 1/],
      },
      { src: DUNGEON, ref: '49', any: [/CFLAG:\(ARG:0\):507 = 0/] },
      { src: DUNGEON, ref: '53-54', any: [/ELSEIF CFLAG:\(ARG:0\):507 == 1/] },
      { src: DUNGEON, ref: '55-56', any: [/ELSE/] },
      { src: DUNGEON, ref: '58', any: [/DRAWLINE/] },
      { src: DUNGEON, ref: '60', any: [/PRINTL  /] },
      {
        src: DUNGEON,
        ref: '61-66',
        any: [/;コンフィグ「戦闘ログでのSKIP中断」がONなら強制停止/],
      },
      { src: DUNGEON, ref: '69-74', any: [/;フラグオフ/] },
      { src: DUNGEON, ref: '78', any: [/FOR TURN, 0, 5/] },
      {
        src: DUNGEON,
        ref: '79-81',
        any: [/;バランス調整のため侵攻は一回で終了/],
      },
      { src: DUNGEON, ref: '80-81', any: [/SIF TURN > 0/] },
      { src: DUNGEON, ref: '84', any: [/NO_BATTLE = 0/] },
      { src: DUNGEON, ref: '86-88', any: [/IF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '87', any: [/PRINTFORM %SAVESTR:\(ARG:0\)%%MAPC%/] },
      { src: DUNGEON, ref: '90-94', any: [/WALK = RAND:20/] },
      { src: DUNGEON, ref: '96-97', any: [/SIF CFLAG:\(ARG:0\):507 != 0/] },
      { src: DUNGEON, ref: '99-103', any: [/;装備効果\(侵攻\)/] },
      { src: DUNGEON, ref: '105-109', any: [/;装備効果\(試練\)/] },
      { src: DUNGEON, ref: '111-122', any: [/;迷惑状態/] },
      { src: DUNGEON, ref: '124', any: [/FLOOR = CFLAG:\(ARG:0\):501/] },
      { src: DUNGEON, ref: '125-131', any: [/IF FLAG:400/] },
      { src: DUNGEON, ref: '133-153', any: [/IF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '136-143', any: [/PRINTL 挑选着客人……/] },
      { src: DUNGEON, ref: '146', any: [/WAIT/] },
      { src: DUNGEON, ref: '148', any: [/PRINTL ----------------------/] },
      { src: DUNGEON, ref: '149', any: [/PRINTFORML    %MAPC%深处/] },
      { src: DUNGEON, ref: '150', any: [/PRINTL ----------------------/] },
      { src: DUNGEON, ref: '152', any: [/PRINTFORM 第\{FLOOR\}阶层/] },
      {
        src: DUNGEON,
        ref: '154-159',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      { src: DUNGEON, ref: '157', any: [/X \*= 2/] },
      { src: DUNGEON, ref: '160-162', any: [/IF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '161', any: [/BARL D:20,100,50/] },
      { src: DUNGEON, ref: '165-373', any: [/IF D:20 >= 100/] },
      { src: DUNGEON, ref: '167', any: [/CFLAG:\(ARG:0\):514 = 0/] },
      {
        src: DUNGEON,
        ref: '168-265',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: DUNGEON,
        ref: '169-180',
        any: [/IF FLAG:400 && CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: DUNGEON,
        ref: '174',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破这一层了！/],
      },
      { src: DUNGEON, ref: '176-179', any: [/;攻略失敗。追い返される/] },
      {
        src: DUNGEON,
        ref: '182',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破这一层了！/],
      },
      { src: DUNGEON, ref: '185-186', any: [/SIF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '188', any: [/CALL ADD_EX_ITEM, -1, ARG:0, 0/] },
      { src: DUNGEON, ref: '190-191', any: [/SIF FLAG:5 & 32 && RESULT == 0/] },
      { src: DUNGEON, ref: '193-197', any: [/IF FLAG:400 > 0 && FLOOR >= 6/] },
      { src: DUNGEON, ref: '199-224', any: [/ELSEIF FLOOR >= 9/] },
      { src: DUNGEON, ref: '200', any: [/PRINTL 这里是魔王的房间………/] },
      { src: DUNGEON, ref: '201-202', any: [/IF TALENT:\(ARG:0\):122 == 0/] },
      { src: DUNGEON, ref: '203-222', any: [/ELSEIF TALENT:\(ARG:0\):122/] },
      { src: DUNGEON, ref: '205-214', any: [/IF RAND:4 == 0/] },
      {
        src: DUNGEON,
        ref: '207',
        any: [
          /IF \(TALENT:MASTER:122 == 0 && ABL:MASTER:11 > 3\) \|\| \(ABL:MAS/,
        ],
      },
      { src: DUNGEON, ref: '210', any: [/CALL BEDROOM_BATTLE_MALE,ARG:0/] },
      {
        src: DUNGEON,
        ref: '212-213',
        any: [
          /PRINTFORML 可想而知%SAVESTR:\(ARG:0\)%失败了、成为了%MAPC%里众多奴隶的一员。/,
        ],
      },
      {
        src: DUNGEON,
        ref: '216-221',
        any: [
          /PRINTFORML %SAVESTR:\(ARG:0\)%放弃了成为英雄的念头，开始回头了。/,
        ],
      },
      { src: DUNGEON, ref: '224', any: [/D:20 = 0/] },
      { src: DUNGEON, ref: '225-264', any: [/ELSE/] },
      { src: DUNGEON, ref: '229', any: [/LOCAL = 0/] },
      {
        src: DUNGEON,
        ref: '230-231',
        any: [/IF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < 90/],
      },
      {
        src: DUNGEON,
        ref: '232-233',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < 90/],
      },
      {
        src: DUNGEON,
        ref: '235-236',
        any: [
          /ELSEIF SIDEA > 0 && BASE:SIDEA:0 \* 100 \/ MAXBASE:SIDEA:0 < 90/,
        ],
      },
      {
        src: DUNGEON,
        ref: '237-238',
        any: [
          /ELSEIF SIDEA > 0 && BASE:SIDEA:1 \* 100 \/ MAXBASE:SIDEA:1 < 90/,
        ],
      },
      {
        src: DUNGEON,
        ref: '240-241',
        any: [
          /ELSEIF SIDEB > 0 && BASE:SIDEB:0 \* 100 \/ MAXBASE:SIDEB:0 < 90/,
        ],
      },
      {
        src: DUNGEON,
        ref: '242-243',
        any: [
          /ELSEIF SIDEB > 0 && BASE:SIDEB:1 \* 100 \/ MAXBASE:SIDEB:1 < 90/,
        ],
      },
      { src: DUNGEON, ref: '245-248', any: [/IF LOCAL == 0/] },
      { src: DUNGEON, ref: '251-257', any: [/IF CFLAG:\(ARG:0\):520 < FLOOR/] },
      { src: DUNGEON, ref: '254-256', any: [/;到達階層を記憶/] },
      { src: DUNGEON, ref: '258-264', any: [/ELSE/] },
      { src: DUNGEON, ref: '266-283', any: [/ELSE/] },
      {
        src: DUNGEON,
        ref: '268',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%返回了魔王的房间。/],
      },
      { src: DUNGEON, ref: '270', any: [/CFLAG:\(ARG:0\):507 = 0/] },
      { src: DUNGEON, ref: '272', any: [/CFLAG:\(ARG:0\):501 \+= 1/] },
      { src: DUNGEON, ref: '277-281', any: [/CFLAG:\(ARG:0\):503 \+= 1/] },
      { src: DUNGEON, ref: '282', any: [/BREAK/] },
      { src: DUNGEON, ref: '284-354', any: [/ELSEIF D:20 <=0/] },
      { src: DUNGEON, ref: '286', any: [/CFLAG:\(ARG:0\):514 = 0/] },
      {
        src: DUNGEON,
        ref: '287-327',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      { src: DUNGEON, ref: '288-289', any: [/SIF FLOOR == 5/] },
      {
        src: DUNGEON,
        ref: '291',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%回到了%MAPC%外面。/],
      },
      { src: DUNGEON, ref: '294-295', any: [/;街でのイベント/] },
      { src: DUNGEON, ref: '297-314', any: [/; ;アイテムの購入/] },
      { src: DUNGEON, ref: '315', any: [/BREAK/] },
      { src: DUNGEON, ref: '317', any: [/CFLAG:\(ARG:0\):501 -= 1/] },
      {
        src: DUNGEON,
        ref: '319',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%回到了第\{FLOOR\}阶层。/],
      },
      { src: DUNGEON, ref: '322-326', any: [/CFLAG:\(ARG:0\):503 \+= 1/] },
      { src: DUNGEON, ref: '328-354', any: [/ELSE/] },
      {
        src: DUNGEON,
        ref: '329',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破了这一层！/],
      },
      { src: DUNGEON, ref: '331-337', any: [/;拡張任務の失敗判定/] },
      { src: DUNGEON, ref: '339-347', any: [/IF FLOOR <= 1/] },
      { src: DUNGEON, ref: '349', any: [/CFLAG:\(ARG:0\):501 -= 1/] },
      {
        src: DUNGEON,
        ref: '351',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%向夺回第\{FLOOR\}阶层发起挑战。/],
      },
      { src: DUNGEON, ref: '355-373', any: [/ELSE/] },
      { src: DUNGEON, ref: '358', any: [/CFLAG:\(ARG:0\):514 \+= 1/] },
      {
        src: DUNGEON,
        ref: '360-371',
        any: [/;奴隷の場合カウントが溜まると帰還する/],
      },
      { src: DUNGEON, ref: '377-388', any: [/;设施効果/] },
      { src: DUNGEON, ref: '386', any: [/CALL DUNGEON_ROOM,A/] },
      { src: DUNGEON, ref: '390-413', any: [/;陷阱処理/] },
      { src: DUNGEON, ref: '400-405', any: [/;装備効果\(陷阱誘発\)/] },
      { src: DUNGEON, ref: '408-412', any: [/;装備効果\(陷阱避け\)/] },
      { src: DUNGEON, ref: '415-419', any: [/A = ARG:0/] },
      { src: DUNGEON, ref: '421-589', any: [/;戦闘フェイズ/] },
      { src: DUNGEON, ref: '423-522', any: [/IF CFLAG:\(ARG:0\):1 == 2/] },
      { src: DUNGEON, ref: '424-431', any: [/IF FLAG:5 & 16/] },
      {
        src: DUNGEON,
        ref: '426',
        any: [/PRINTW 因为没有敌人所以进行了训练。（经验值增加）/],
      },
      { src: DUNGEON, ref: '432-440', any: [/ELSEIF NO_BATTLE > 0/] },
      { src: DUNGEON, ref: '434', any: [/SIF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '441-477', any: [/ELSE/] },
      {
        src: DUNGEON,
        ref: '445',
        any: [/IF CFLAG:\(ARG:0\):1 != 2 && CFLAG:\(ARG:0\):1 != 3/],
      },
      { src: DUNGEON, ref: '446', any: [/CALL GET_DOWN_ENEMY,ARG:0/] },
      {
        src: DUNGEON,
        ref: '447-456',
        any: [/;善恶值が低いと、仲間を売って助かろうとする/],
      },
      { src: DUNGEON, ref: '457', any: [/CALL PARTY_DEL, ARG:0/] },
      { src: DUNGEON, ref: '461-466', any: [/;仲間Aが陥落したかどうか/] },
      { src: DUNGEON, ref: '463', any: [/CALL GET_DOWN_ENEMY,SIDEA/] },
      { src: DUNGEON, ref: '464', any: [/CALL PARTY_DEL, SIDEA/] },
      { src: DUNGEON, ref: '468-473', any: [/;仲間Bが陥落したかどうか/] },
      { src: DUNGEON, ref: '470', any: [/CALL GET_DOWN_ENEMY,SIDEB/] },
      { src: DUNGEON, ref: '471', any: [/CALL PARTY_DEL, SIDEB/] },
      { src: DUNGEON, ref: '475-476', any: [/SIF TURNEND > 0/] },
      { src: DUNGEON, ref: '479', any: [/TURNEND = 0/] },
      { src: DUNGEON, ref: '481-507', any: [/;善恶值によっては魔王に寝返る/] },
      { src: DUNGEON, ref: '483', any: [/CFLAG:\(ARG:0\):1 = 0/] },
      { src: DUNGEON, ref: '484', any: [/CALL GET_DOWN_ENEMY,ARG:0/] },
      { src: DUNGEON, ref: '493', any: [/CALL PARTY_DEL, ARG:0/] },
      { src: DUNGEON, ref: '495-499', any: [/;仲間Aが陥落したかどうか/] },
      { src: DUNGEON, ref: '497', any: [/CALL GET_DOWN_ENEMY, SIDEA/] },
      { src: DUNGEON, ref: '498', any: [/CFLAG:SIDEA:1 = 0/] },
      { src: DUNGEON, ref: '501', any: [/;仲間Bが陥落したかどうか/] },
      { src: DUNGEON, ref: '501-505', any: [/;仲間Bが陥落したかどうか/] },
      { src: DUNGEON, ref: '503', any: [/CALL GET_DOWN_ENEMY, SIDEB/] },
      { src: DUNGEON, ref: '504', any: [/CFLAG:SIDEB:1 = 0/] },
      { src: DUNGEON, ref: '506', any: [/TURNEND \+= 1/] },
      {
        src: DUNGEON,
        ref: '509-513',
        any: [/IF SIDEA > 0 && CFLAG:SIDEA:151 <= -150 && CFLAG:SIDEA:1 == 2/],
      },
      { src: DUNGEON, ref: '510', any: [/CALL GET_DOWN_ENEMY, SIDEA/] },
      { src: DUNGEON, ref: '511', any: [/CALL PARTY_DEL, SIDEA/] },
      {
        src: DUNGEON,
        ref: '515-519',
        any: [/IF SIDEB > 0 && CFLAG:SIDEB:151 <= -150 && CFLAG:SIDEB:1 == 2/],
      },
      { src: DUNGEON, ref: '516', any: [/CALL GET_DOWN_ENEMY, SIDEB/] },
      { src: DUNGEON, ref: '517', any: [/CALL PARTY_DEL, SIDEB/] },
      { src: DUNGEON, ref: '521-522', any: [/SIF TURNEND > 0/] },
      { src: DUNGEON, ref: '523-563', any: [/ELSEIF CFLAG:\(ARG:0\):1 == 12/] },
      { src: DUNGEON, ref: '525-533', any: [/IF NO_BATTLE > 0/] },
      {
        src: DUNGEON,
        ref: '528',
        any: [/PRINTW 因沒有敵人而自己进行了训练（经验值增加）/],
      },
      { src: DUNGEON, ref: '536', any: [/CALL DUNGEON_PARTY_BATTLE, ARG:0/] },
      { src: DUNGEON, ref: '537-543', any: [/;陥落したか否か/] },
      {
        src: DUNGEON,
        ref: '539',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%被抓住了…/],
      },
      { src: DUNGEON, ref: '540', any: [/CFLAG:\(ARG:0\):507 = 0/] },
      { src: DUNGEON, ref: '541', any: [/CALL PARTY_DEL, ARG:0/] },
      { src: DUNGEON, ref: '545-551', any: [/;仲間Aが陥落したかどうか/] },
      {
        src: DUNGEON,
        ref: '547',
        any: [/PRINTFORML %SAVESTR:SIDEA%被抓住了…/],
      },
      { src: DUNGEON, ref: '548', any: [/CFLAG:SIDEA:507 = 0/] },
      { src: DUNGEON, ref: '549', any: [/CALL PARTY_DEL, SIDEA/] },
      { src: DUNGEON, ref: '553-559', any: [/;仲間Bが陥落したかどうか/] },
      {
        src: DUNGEON,
        ref: '555',
        any: [/PRINTFORML %SAVESTR:SIDEB%被抓住了…/],
      },
      { src: DUNGEON, ref: '556', any: [/CFLAG:SIDEB:507 = 0/] },
      { src: DUNGEON, ref: '557', any: [/CALL PARTY_DEL, SIDEB/] },
      { src: DUNGEON, ref: '561-562', any: [/SIF TURNEND > 0/] },
      { src: DUNGEON, ref: '564-588', any: [/;勇者と元勇者の戦闘/] },
      { src: DUNGEON, ref: '568-571', any: [/IF RESULT == 2/] },
      { src: DUNGEON, ref: '569', any: [/CALL GET_DOWN_ENEMY, B/] },
      { src: DUNGEON, ref: '571', any: [/CALL PARTY_DEL, B/] },
      { src: DUNGEON, ref: '572-587', any: [/ELSEIF RESULT == 1/] },
      { src: DUNGEON, ref: '574', any: [/CFLAG:\(ARG:0\):507 = 0/] },
      { src: DUNGEON, ref: '576-577', any: [/IF CFLAG:\(ARG:0\):505 > 0/] },
      { src: DUNGEON, ref: '579', any: [/CFLAG:\(ARG:0\):1 = 6/] },
      { src: DUNGEON, ref: '582-584', any: [/;NTRれたなら勇者討伐数を０に/] },
      { src: DUNGEON, ref: '585', any: [/CALL PARTY_DEL, ARG:0/] },
      { src: DUNGEON, ref: '586', any: [/TARGET = -1/] },
      { src: DUNGEON, ref: '587', any: [/RETURN 0/] },
      {
        src: DUNGEON,
        ref: '591-603',
        any: [/IF CFLAG:\(ARG:0\):1 == 3 && FLAG:5 & 16 && CFLAG:MASTER:9 > 0/],
      },
      {
        src: DUNGEON,
        ref: '593',
        any: [/PRINTFORMW %SAVESTR:ARG%和怪物们进行了训练（经验值增加）/],
      },
      { src: DUNGEON, ref: '596-597', any: [/SIF CFLAG:\(ARG:0\):500 == 5/] },
      {
        src: DUNGEON,
        ref: '598-602',
        any: [
          /ELSEIF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):500 == 5 && CFLAG:MASTER:9 > 0/,
        ],
      },
      {
        src: DUNGEON,
        ref: '601',
        any: [/PRINTFORMW %SAVESTR:ARG%和怪物们进行了训练（经验值增加）/],
      },
      { src: DUNGEON, ref: '605-627', any: [/;貞操帯のカギを探す/] },
      { src: DUNGEON, ref: '607', any: [/PRINTL/] },
      { src: DUNGEON, ref: '609-626', any: [/IF RAND:2 == 0/] },
      { src: DUNGEON, ref: '625', any: [/CFLAG:\(ARG:0\):50 = 1/] },
      { src: DUNGEON, ref: '629-634', any: [/;冒険の疲れ/] },
      { src: DUNGEON, ref: '636-637', any: [/;状态判定/] },
      { src: DUNGEON, ref: '639-705', any: [/;帰還するかどうか/] },
      { src: DUNGEON, ref: '640-642', any: [/IF CFLAG:\(ARG:0\):507 == 1/] },
      { src: DUNGEON, ref: '643-700', any: [/;帰還フラグを立てる判定/] },
      { src: DUNGEON, ref: '646-666', any: [/IF SIDEA > 0 && SIDEB > 0/] },
      { src: DUNGEON, ref: '663-665', any: [/ELSE/] },
      {
        src: DUNGEON,
        ref: '667-683',
        any: [/ELSEIF SIDEA > 0 \|\| SIDEB > 0/],
      },
      { src: DUNGEON, ref: '684-700', any: [/ELSE/] },
      {
        src: DUNGEON,
        ref: '685-688',
        any: [/IF CFLAG:\(ARG:0\):534 >= 2 && TALENT:\(ARG:0\):10 == 1/],
      },
      {
        src: DUNGEON,
        ref: '685-696',
        any: [/IF CFLAG:\(ARG:0\):534 >= 2 && TALENT:\(ARG:0\):10 == 1/],
      },
      {
        src: DUNGEON,
        ref: '689-692',
        any: [/ELSEIF CFLAG:\(ARG:0\):534 >= 3/],
      },
      {
        src: DUNGEON,
        ref: '693-696',
        any: [
          /ELSEIF CFLAG:\(ARG:0\):534 == 4 && \(TALENT:\(ARG:0\):12 == 1 \|\| TALENT:\(ARG:0\):161 == 1 \)/,
        ],
      },
      { src: DUNGEON, ref: '702-704', any: [/;防止后退过度/] },
      { src: DUNGEON, ref: '706', any: [/NEXT/] },
      { src: DUNGEON, ref: '708-718', any: [/;戦闘後探索/] },
      { src: DUNGEON, ref: '718', any: [/CALL DUNGEON_BITCH\(LOCAL\)/] },
      { src: DUNGEON, ref: '719', any: [/CALL GET_JUNK_ITEM\(LOCAL\)/] },
      { src: DUNGEON, ref: '721-731', any: [/;宝箱を見つける/] },
      { src: DUNGEON, ref: '723', any: [/CALL EQUIP_SELECT/] },
      {
        src: DUNGEON,
        ref: '724-726',
        any: [/IF SIDEA > 0 && CFLAG:SIDEA:1 == 2 && RAND:4 == 0/],
      },
      {
        src: DUNGEON,
        ref: '728-730',
        any: [/IF SIDEB > 0 && CFLAG:SIDEB:1 == 2 && RAND:4 == 0/],
      },
      { src: DUNGEON, ref: '735-744', any: [/;アイテムの使用/] },
      { src: DUNGEON, ref: '736', any: [/CALL USE_EX_ITEM,"战斗后"/] },
      { src: DUNGEON, ref: '739', any: [/CALL USE_EX_ITEM,"战斗后"/] },
      { src: DUNGEON, ref: '743', any: [/CALL USE_EX_ITEM,"战斗后"/] },
      { src: DUNGEON, ref: '748-753', any: [/;移動を反映/] },
      { src: DUNGEON, ref: '755-760', any: [/;階層を反映/] },
      { src: DUNGEON, ref: '762-849', any: [/;休憩フェイズ/] },
      {
        src: DUNGEON,
        ref: '764-777',
        any: [/;勇者に紛れ込んだ奴隷が暗躍します/],
      },
      { src: DUNGEON, ref: '767', any: [/CALL KARMA, ARG:0, -1/] },
      { src: DUNGEON, ref: '769', any: [/CALL KARMA, SIDEB, -1/] },
      { src: DUNGEON, ref: '774', any: [/CALL KARMA, ARG:0, -1/] },
      { src: DUNGEON, ref: '776', any: [/CALL KARMA, SIDEA, -1/] },
      { src: DUNGEON, ref: '780-811', any: [/;装備効果\(キャンプ\)/] },
      { src: DUNGEON, ref: '816-836', any: [/;装備効果\(キャンプ禁止\)/] },
      {
        src: DUNGEON,
        ref: '841-849',
        any: [
          /IF CFLAG:\(ARG:0\):1 == 2 && CFLAG:\(ARG:0\):503 & 1 && FLOOR > 1/,
        ],
      },
      { src: DUNGEON, ref: '843', any: [/PRINTL  /] },
      { src: DUNGEON, ref: '844', any: [/DRAWLINE/] },
      {
        src: DUNGEON,
        ref: '845',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%躲起来休息。/],
      },
      { src: DUNGEON, ref: '846', any: [/DRAWLINE/] },
      { src: DUNGEON, ref: '847', any: [/PRINTL /] },
      { src: DUNGEON, ref: '850-851', any: [/SIF FLAG:5 & 32/] },
      { src: DUNGEON, ref: '852', any: [/TARGET = -1/] },
      {
        src: DUNGEON,
        ref: '856-1035',
        any: [/@CHECK_STATUS, ARG:0, MODE = 0/],
      },
      { src: DUNGEON, ref: '878-880', any: [/IF CFLAG:ARG:533 == ARG/] },
      { src: DUNGEON, ref: '881-888', any: [/ELSE/] },
      { src: DUNGEON, ref: '889-894', any: [/S1_HP = 60/] },
      { src: DUNGEON, ref: '895', any: [/varset STATUS/] },
      {
        src: DUNGEON,
        ref: '897-938',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 3/],
      },
      { src: DUNGEON, ref: '899', any: [/SIF !MODE/] },
      {
        src: DUNGEON,
        ref: '903-907',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S1_MP/],
      },
      {
        src: DUNGEON,
        ref: '908-912',
        any: [
          /ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S2_HP \|\| B/,
        ],
      },
      {
        src: DUNGEON,
        ref: '913-917',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S2_MP/],
      },
      {
        src: DUNGEON,
        ref: '918-922',
        any: [
          /ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S3_HP && B/,
        ],
      },
      {
        src: DUNGEON,
        ref: '923-927',
        any: [/ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S3_HP/],
      },
      {
        src: DUNGEON,
        ref: '928-932',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S3_MP/],
      },
      { src: DUNGEON, ref: '939-981', any: [/IF  SIDEA > 0/] },
      { src: DUNGEON, ref: '982-1024', any: [/IF  SIDEB > 0/] },
      { src: DUNGEON, ref: '1026-1034', any: [/;队伍当前状态评级/] },
      {
        src: DUNGEON,
        ref: '1035',
        any: [
          /RETURN STATUS,STATUS:1,STATUS:2,STATUS:3,STATUS:4,STATUS:5,STATUS:6,STATUS:7/,
        ],
      },
      { src: DUNGEON, ref: '1041-1073', any: [/@GET_JUNK_ITEM,ARG/] },
      {
        src: DUNGEON,
        ref: '1046',
        any: [
          /LOCAL = 100 \+ CFLAG:ARG:9 \* RAND:\(SQRT\(CFLAG:MASTER:9 \+ CFLAG:ARG:9 \+ 1\)\)/,
        ],
      },
      { src: DUNGEON, ref: '1048-1050', any: [/;好奇心ボーナス/] },
      { src: DUNGEON, ref: '1051-1053', any: [/;金のためボーナス/] },
      { src: DUNGEON, ref: '1054-1059', any: [/;ホビットボーナス/] },
      { src: DUNGEON, ref: '1060-1062', any: [/;盗賊は収入が多い（1\.5倍）/] },
      { src: DUNGEON, ref: '1064', any: [/LOCAL \*= CFLAG:ARG:501/] },
      { src: DUNGEON, ref: '1066-1067', any: [/SIF LOCAL < 1/] },
      {
        src: DUNGEON,
        ref: '1069',
        any: [/PRINTFORML %SAVESTR:ARG%找到了价值\{LOCAL\}的财物。/],
      },
      { src: DUNGEON, ref: '1071', any: [/CFLAG:ARG:581 \+= LOCAL/] },
      { src: DUNGEON, ref: '1076-1091', any: [/@GET_DOWN_ENEMY,ARG/] },
      {
        src: DUNGEON,
        ref: '1079-1083',
        any: [/IF CFLAG:\(ARG:0\):151 <= -150 && CFLAG:\(ARG:0\):1 == 2/],
      },
      {
        src: DUNGEON,
        ref: '1084-1086',
        any: [/MONEY \+= CFLAG:\(ARG:0\):580 \/ 100/],
      },
      { src: DUNGEON, ref: '1087-1089', any: [/CFLAG:\(ARG:0\):580 = 0/] },
      // #178 城镇真身接线（:294 CALL DUNGEON_TOWN 与 :581 调用点）
      { src: DUNGEON, ref: '294', any: [/街でのイベント/] },
    ],
  },
  // —— #172 H3 迷宫主循环：ere/dungeon/dungeon-party.js。锚为所引区间首个非空行的 ——
  //    原文（机械生成后人工核过形态）；src 常量 DUNGEON_PARTY 见上。 ——
  {
    js: 'ere/dungeon/dungeon-party.js',
    refs: [
      { src: DUNGEON_PARTY, ref: '5-83', any: [/@PARTY_UNITE/] },
      { src: DUNGEON_PARTY, ref: '15-17', any: [/FOR CHARID, 0, CHARANUM/] },
      { src: DUNGEON_PARTY, ref: '23-79', any: [/FOR CHARID, 0, CHARANUM/] },
      {
        src: DUNGEON_PARTY,
        ref: '25-50',
        any: [/RESTCHAR = CFLAG:CHARID:531/],
      },
      {
        src: DUNGEON_PARTY,
        ref: '53-78',
        any: [/RESTCHAR = CFLAG:CHARID:532/],
      },
      {
        src: DUNGEON_PARTY,
        ref: '81',
        any: [/;行動終了していないキャラはリーダーとなり、移動等を受け持つ/],
      },
      { src: DUNGEON_PARTY, ref: '86-176', any: [/@PARTY_JOIN/] },
      { src: DUNGEON_PARTY, ref: '98', any: [/CALL PARTY_UNITE/] },
      { src: DUNGEON_PARTY, ref: '115-137', any: [/;仲間Aを見る/] },
      {
        src: DUNGEON_PARTY,
        ref: '126-127',
        any: [/SIF CFLAG:CHARID:533 == 0 && CHARID == NEW/],
      },
      {
        src: DUNGEON_PARTY,
        ref: '129-134',
        any: [/;枠に入れて、行動完了と、リーダー記憶と、初期化を行う/],
      },
      { src: DUNGEON_PARTY, ref: '139-161', any: [/;仲間Bを見る/] },
      { src: DUNGEON_PARTY, ref: '163-169', any: [/\$FINALIZE/] },
      {
        src: FLAG_SUMMARY,
        ref: '421-425',
        any: [/CFLAG:530～549はパーティー関連/],
      },
      {
        src: DUNGEON_PARTY,
        ref: '164-165',
        any: [
          /;潜入奴隷のキャラ番号がCHARIDより若い場合、自分をメンバー登録する前に（CFLAG:CHARID:531などが代入されることで）/,
        ],
      },
      {
        src: DUNGEON_PARTY,
        ref: '179-223',
        any: [/@SEARCH_FREE, ARG:0, ARG:1/],
      },
      { src: DUNGEON_PARTY, ref: '226-297', any: [/@PARTY_DEL, ARG:0/] },
      { src: DUNGEON_PARTY, ref: '274-275', any: [/ELSE/] },
      { src: DUNGEON_PARTY, ref: '277-284', any: [/CFLAG:LEADER:530 = 0/] },
      { src: DUNGEON_PARTY, ref: '287-294', any: [/;结婚对象编号清除/] },
      {
        src: DUNGEON_PARTY,
        ref: '291',
        any: [/CALL SEARCH_FAMILY,\(ARG:0\),"MARRIAGE"/],
      },
      { src: DUNGEON_PARTY, ref: '293', any: [/CFLAG:RESULT:601 = 0/] },
      { src: DUNGEON_PARTY, ref: '300-326', any: [/@PARTY_CHAR_DEL, ARG:0/] },
      { src: DUNGEON_PARTY, ref: '312-324', any: [/FOR CHARID, 1, CHARANUM/] },
    ],
  },
  // —— #175 H6 战斗：ere/data/monster-database.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/data/monster-database.js',
    refs: [
      { src: ENEMY_DATA_ERB, ref: '23-67', any: [/;攻撃力/] },
      {
        src: MONSTER_DATA_ERB,
        ref: '37-57',
        any: [/;E:Y\+8  == ボス化フラグ（空欄）/],
      },
      {
        src: MONSTER_DATA_ERB,
        ref: '465-2483',
        any: [/;---------------------------------------------------------/],
      },
    ],
  },
  // —— #175 H6 战斗：ere/dungeon/dungeon-battle2.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-battle2.js',
    refs: [
      { src: BATLLE2, ref: '1001-1014', any: [/;勇者死亡判定/] },
      { src: BATLLE2, ref: '1016-1037', any: [/;魔王側の生き残りを判定/] },
      { src: BATLLE2, ref: '102-170', any: [/;---先制攻撃フェイズ---/] },
      { src: BATLLE2, ref: '1039-1053', any: [/IF BASE:\(ARG:0\):0 <= 0/] },
      { src: BATLLE2, ref: '105-138', any: [/FOR TURN, 0, 3/] },
      { src: BATLLE2, ref: '1058-1200', any: [/@DUNGEON_SPY, ARG:0/] },
      { src: BATLLE2, ref: '1073-1083', any: [/IF FLAG:5 & 32/] },
      {
        src: BATLLE2,
        ref: '1085-1181',
        any: [/;パーティを裏切って陥落させる処理/],
      },
      { src: BATLLE2, ref: '1108-1179', any: [/IF LOCAL < BETRAY/] },
      {
        src: BATLLE2,
        ref: '1148-1150',
        any: [/MONEY \+= 100 \* CFLAG:LEADER:9/],
      },
      { src: BATLLE2, ref: '1151-1153', any: [/CFLAG:\(ARG:0\):505 \+= 1/] },
      { src: BATLLE2, ref: '1154-1157', any: [/CFLAG:LEADER:506 = 1/] },
      {
        src: BATLLE2,
        ref: '1159-1162',
        any: [/PRINTFORM 要让%SAVESTR:\(ARG:0\)%/],
      },
      {
        src: BATLLE2,
        ref: '1184-1197',
        any: [/CALL SPY_BATTLE, ARG:0, LEADER/],
      },
      { src: BATLLE2, ref: '1204-1298', any: [/@SPY_BATTLE, ARG:0, ARG:1/] },
      { src: BATLLE2, ref: '1219-1231', any: [/IF RAND:3 == 0/] },
      { src: BATLLE2, ref: '1233-1260', any: [/ELSEIF RAND:2 == 0/] },
      { src: BATLLE2, ref: '1263-1273', any: [/ELSE/] },
      {
        src: BATLLE2,
        ref: '1276-1280',
        any: [/;\[施虐狂\]持ちならダメージが1\.2倍/],
      },
      { src: BATLLE2, ref: '1282-1283', any: [/;善恶值を負の値にする/] },
      { src: BATLLE2, ref: '1290-1291', any: [/BASE:\(ARG:1\):0 -= HDMG/] },
      { src: BATLLE2, ref: '1293', any: [/CALL KARMA, ARG:1, KDMG/] },
      { src: BATLLE2, ref: '136', any: [/BREAK/] },
      { src: BATLLE2, ref: '141-170', any: [/FOR TURN, 0, 3/] },
      { src: BATLLE2, ref: '155-160', any: [/;対象決定/] },
      { src: BATLLE2, ref: '174-471', any: [/FOR TURN, 0, 20/] },
      { src: BATLLE2, ref: '176-181', any: [/IF TURN > 15/] },
      { src: BATLLE2, ref: '183-333', any: [/;パラメータ表示/] },
      { src: BATLLE2, ref: '24-27', any: [/IF CFLAG:\(ARG:0\):500 == 4/] },
      { src: BATLLE2, ref: '2-510', any: [/@DUNGEON_BATTLE2_PARTY, ARG:0/] },
      { src: BATLLE2, ref: '29-30', any: [/;---対象選択フェイズ---/] },
      { src: BATLLE2, ref: '29-49', any: [/;---対象選択フェイズ---/] },
      { src: BATLLE2, ref: '335-345', any: [/;戦闘を行うキャラの選択/] },
      { src: BATLLE2, ref: '347-391', any: [/IF ATKER >= 99/] },
      {
        src: BATLLE2,
        ref: '393-401',
        any: [/;配下怪物データの取得・怪物の攻撃/],
      },
      { src: BATLLE2, ref: '412-459', any: [/;先攻後攻決定/] },
      {
        src: BATLLE2,
        ref: '461-468',
        any: [/CALL DEATH_CHECK2, ATKER, DEFER/],
      },
      { src: BATLLE2, ref: '473-484', any: [/;奴隷装備の回復/] },
      { src: BATLLE2, ref: '486-510', any: [/A = ARG:0/] },
      { src: BATLLE2, ref: '513-573', any: [/@SELECT_SLAVE, ARG:0, ARG:1/] },
      { src: BATLLE2, ref: '51-62', any: [/;---対象選択失敗時の処理---/] },
      { src: BATLLE2, ref: '536-540', any: [/FOR MONID, 0, 300/] },
      { src: BATLLE2, ref: '543', any: [/LOCAL = ARG:1 % MEMBER/] },
      { src: BATLLE2, ref: '548-555', any: [/ELSEIF LOCAL == 1/] },
      { src: BATLLE2, ref: '569', any: [/NEXT/] },
      {
        src: BATLLE2,
        ref: '572',
        any: [/;念のためいなかったらリーダーが返る/],
      },
      { src: BATLLE2, ref: '577-632', any: [/@SPEED_PLUS2/] },
      { src: BATLLE2, ref: '585-609', any: [/;奇袭/] },
      { src: BATLLE2, ref: '610-618', any: [/;装備効果/] },
      { src: BATLLE2, ref: '620-630', any: [/LOCAL = A/] },
      {
        src: BATLLE2,
        ref: '637-791',
        any: [/@DUEL_ATTACK, ARG:0, ARG:1, ARG:2, ARG:3/],
      },
      { src: BATLLE2, ref: '64-100', any: [/;---戦闘開始前の準備---/] },
      { src: BATLLE2, ref: '661-664', any: [/;一応代入/] },
      { src: BATLLE2, ref: '668-672', any: [/IF TALENT:肛门虫/] },
      { src: BATLLE2, ref: '674-681', any: [/IF ARG:3 == 0 \|\| ARG:3 == 2/] },
      { src: BATLLE2, ref: '675-681', any: [/X:1 = 3/] },
      { src: BATLLE2, ref: '683-686', any: [/;发动魔法/] },
      { src: BATLLE2, ref: '688-691', any: [/;精英部下的特技/] },
      { src: BATLLE2, ref: '693-701', any: [/;予め変数に入れておく/] },
      { src: BATLLE2, ref: '703-704', any: [/;戦闘前発動スキル/] },
      { src: BATLLE2, ref: '709-711', any: [/;セリフ/] },
      {
        src: BATLLE2,
        ref: '713-718',
        any: [/;先手かつ奇袭の場合、相手の防御値を減少させる/],
      },
      { src: BATLLE2, ref: '716', any: [/PRINT 偷袭成功！！/] },
      { src: BATLLE2, ref: '71-86', any: [/FOR TURN, 0,  3/] },
      { src: BATLLE2, ref: '720-726', any: [/;武器効果/] },
      { src: BATLLE2, ref: '728-731', any: [/IF FLAG:5 & 32/] },
      { src: BATLLE2, ref: '734-735', any: [/CALL EQUIP_DATABASE/] },
      {
        src: BATLLE2,
        ref: '737-755',
        any: [/;奴隷vs潜入中奴隷なら攻撃をサボる/],
      },
      {
        src: BATLLE2,
        ref: '761',
        any: [/DMG = \(CFLAG:\(ARG:0\):11 - CFLAG:\(ARG:2\):12\)\*2/],
      },
      {
        src: BATLLE2,
        ref: '763-764',
        any: [
          /CALL ATTACK_CHARA_EXTRA_DMG_BATTLE2, \(ARG:0\), DMG, \(ARG:1\), \(ARG:2\), ATKTITLE/,
        ],
      },
      {
        src: BATLLE2,
        ref: '766-767',
        any: [/CALL ATTACK_CHARA_EXTRA_DMG, \(ARG:0\), DMG, \(ARG:1\)/],
      },
      { src: BATLLE2, ref: '769-771', any: [/;ダメージ補正/] },
      {
        src: BATLLE2,
        ref: '778',
        any: [/EXP:\(ARG:0\):80 \+= CFLAG:\(ARG:2\):9/],
      },
      {
        src: BATLLE2,
        ref: '794-842',
        any: [/@SLAVE_MONSTER_ATTACK_TO_ENEMY, ARG:0, ARG:1/],
      },
      { src: BATLLE2, ref: '803-807', any: [/IF CFLAG:\(ARG:0\):570 < 100/] },
      { src: BATLLE2, ref: '809-814', any: [/;怪物側の攻撃力を算出/] },
      { src: BATLLE2, ref: '816-819', any: [/TOP = E:300/] },
      { src: BATLLE2, ref: '821-833', any: [/IF CFLAG:\(ARG:1\):12 < DAMAGE/] },
      { src: BATLLE2, ref: '837-838', any: [/CFLAG:\(ARG:1\):12 \/= 3/] },
      {
        src: BATLLE2,
        ref: '846-894',
        any: [/@SLAVE_MONSTER_ATTACK_TO_SLAVE, ARG:0, ARG:1/],
      },
      { src: BATLLE2, ref: '855-859', any: [/IF CFLAG:\(ARG:1\):570 < 100/] },
      { src: BATLLE2, ref: '861-866', any: [/;怪物側の攻撃力を算出/] },
      { src: BATLLE2, ref: '868-871', any: [/TOP = E:400/] },
      { src: BATLLE2, ref: '873-885', any: [/IF CFLAG:\(ARG:0\):12 < DAMAGE/] },
      { src: BATLLE2, ref: '889-890', any: [/CFLAG:\(ARG:0\):12 \/= 3/] },
      {
        src: BATLLE2,
        ref: '897-993',
        any: [
          /@ATTACK_CHARA_EXTRA_DMG_BATTLE2,ARG:0,DMG, ARG:1, ARG:2, ATKTITLE/,
        ],
      },
      { src: BATLLE2, ref: '911-920', any: [/;ミス処理/] },
      { src: BATLLE2, ref: '9-15', any: [/#DIM DEFER/] },
      { src: BATLLE2, ref: '922-925', any: [/;気力回復/] },
      {
        src: BATLLE2,
        ref: '927-930',
        any: [/IF CFLAG:\(ARG:2\):12 < CFLAG:\(ARG:0\):11/],
      },
      { src: BATLLE2, ref: '93-100', any: [/;弾の補充/] },
      { src: BATLLE2, ref: '932-935', any: [/;防御値の減少/] },
      { src: BATLLE2, ref: '937-940', any: [/;DMG=ダメージ/] },
      { src: BATLLE2, ref: '942-951', any: [/;ダメージ変動/] },
      { src: BATLLE2, ref: '952', any: [/MDMG = MDMG \* W:16 \/ 100/] },
      { src: BATLLE2, ref: '954', any: [/CFLAG:\(ARG:0\):571 -= W:10/] },
      { src: BATLLE2, ref: '956-962', any: [/;連続攻撃処理/] },
      { src: BATLLE2, ref: '964-969', any: [/;先手かつ奇襲なら防御値減少/] },
      { src: BATLLE2, ref: '967', any: [/PRINT 奇襲成功！！/] },
      { src: BATLLE2, ref: '971-983', any: [/;追加効果/] },
      { src: BATLLE2, ref: '985-989', any: [/;耐性処理/] },
      { src: BATLLE2, ref: '991', any: [/BASE:\(ARG:2\):1 -= MDMG/] },
      { src: BATLLE2, ref: '996-1055', any: [/@DEATH_CHECK2, ARG:0, ARG:1/] },
    ],
  },
  // —— #175 H6 战斗：ere/dungeon/dungeon-battle.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-battle.js',
    refs: [
      { src: BATLLE, ref: '1006-1115', any: [/@MONSTER_ATTACK, ARG:0, ARG:1/] },
      { src: BATLLE, ref: '1024-1030', any: [/;生存怪物数を求める/] },
      { src: BATLLE, ref: '1032-1037', any: [/;全滅時/] },
      { src: BATLLE, ref: '1039-1049', any: [/;ターン数から攻撃怪物を求める/] },
      { src: BATLLE, ref: '1052', any: [/MONID -= 100/] },
      { src: BATLLE, ref: '1054-1057', any: [/B = MONID/] },
      { src: BATLLE, ref: '1060-1063', any: [/Y = E:\(MONID \+ 5\)/] },
      { src: BATLLE, ref: '1065-1070', any: [/MONNUM = E:\(MONID \+ 99\)/] },
      { src: BATLLE, ref: '1072-1075', any: [/;ダンジョンレベル補正/] },
      { src: BATLLE, ref: '1077', any: [/DMG = MONNUM \* E:\(MONID \+ 2\)/] },
      { src: BATLLE, ref: '1079', any: [/MONNAME = E:MONID/] },
      { src: BATLLE, ref: '1080-1086', any: [/;攻撃による被害/] },
      { src: BATLLE, ref: '1088-1096', any: [/;畏怖・隷属処理/] },
      { src: BATLLE, ref: '1098-1100', any: [/;ダメージ処理/] },
      { src: BATLLE, ref: '1102-1108', any: [/IF DMG > 0/] },
      { src: BATLLE, ref: '1111-1113', any: [/;ダメージが無かった場合/] },
      {
        src: BATLLE,
        ref: '1118-1145',
        any: [/@ATTACK_CHARA_EXTRA_DMG,ARG:0,DMG, ARG:1/],
      },
      {
        src: BATLLE,
        ref: '1148-1206',
        any: [/@DEFENCE_CHARA_EXTRA_DMG,ARG:0,DMG/],
      },
      { src: BATLLE, ref: '1180', any: [/ELSEIF CFLAG:\(ARG:0\):681 > 0/] },
      { src: BATLLE, ref: '1209-1256', any: [/@DEATH_CHECK, ARG:0/] },
      { src: BATLLE, ref: '1214-1227', any: [/;プレイヤー死亡判定/] },
      { src: BATLLE, ref: '1229-1248', any: [/;怪物側の生き残りを算出/] },
      { src: BATLLE, ref: '123-124', any: [/;攻撃順。ランダム/] },
      { src: BATLLE, ref: '124', any: [/ATK_TURN = RAND:3/] },
      { src: BATLLE, ref: '1250-1254', any: [/;全滅時/] },
      { src: BATLLE, ref: '125-360', any: [/FOR TURN, 0, 99/] },
      { src: BATLLE, ref: '1260-1325', any: [/@VICTORY_GET,ARG:0/] },
      { src: BATLLE, ref: '1269-1279', any: [/IF CFLAG:\(ARG:0\):151 > 150/] },
      {
        src: BATLLE,
        ref: '1281-1295',
        any: [/;プライド低い場合、やりたくなる/],
      },
      {
        src: BATLLE,
        ref: '1287-1289',
        any: [/;プライド低い場合、やりたくなる/],
      },
      {
        src: BATLLE,
        ref: '1297-1308',
        any: [/;プライド高い場合、思いとどまる/],
      },
      { src: BATLLE, ref: '1311-1312', any: [/SIF LOCAL:0 > 5/] },
      { src: BATLLE, ref: '1317', any: [/CALL KARMA, \(ARG:0\), -5/] },
      { src: BATLLE, ref: '1319', any: [/CALL ADD_EX_ITEM, -1, \(ARG:0\), 0/] },
      {
        src: BATLLE,
        ref: '1321-1323',
        any: [/;なにも見つからなかったらしい。代わりに金品を得る/],
      },
      {
        src: BATLLE,
        ref: '132-137',
        any: [
          /IF \(TALENT:\(ARG:0\):11 \|\| TALENT:\(ARG:0\):15 \|\| TALENT:\(ARG:0\):34\) && TURN == 6/,
        ],
      },
      { src: BATLLE, ref: '1328-1441', any: [/@SKILL_EXTRA_BONUS,ARG:0/] },
      { src: BATLLE, ref: '1331-1332', any: [/SIF CFLAG:\(ARG:0\):9 < 100/] },
      {
        src: BATLLE,
        ref: '138-163',
        any: [
          /ELSEIF	\(TALENT:\(ARG:0\):10 \|\| TALENT:\(ARG:0\):14 \|\| TALENT:\(ARG:0\):26\) && RAND:5 == 0/,
        ],
      },
      { src: BATLLE, ref: '1392', any: [/LOCAL:1 = RAND:5/] },
      { src: BATLLE, ref: '165-191', any: [/ELSEIF TURN > 5/] },
      {
        src: BATLLE,
        ref: '1-7',
        any: [/;--------------------------------------------------/],
      },
      { src: BATLLE, ref: '18-20', any: [/;行動完了の場合飛ばす/] },
      { src: BATLLE, ref: '194-296', any: [/;パラメータ表示/] },
      { src: BATLLE, ref: '22-54', any: [/;対戦相手選択/] },
      { src: BATLLE, ref: '279-287', any: [/;迷宫中战斗中勇者显示脸图/] },
      {
        src: BATLLE,
        ref: '298-302',
        any: [/;攻撃を行い、また怪物の反撃を受けるキャラを選定/],
      },
      { src: BATLLE, ref: '304', any: [/;消耗品を使用するかチェック/] },
      { src: BATLLE, ref: '307', any: [/;支配している怪物の攻撃/] },
      { src: BATLLE, ref: '313-314', any: [/;先攻後攻決定/] },
      { src: BATLLE, ref: '3-412', any: [/@DUNGEON_PARTY_BATTLE, ARG:0/] },
      { src: BATLLE, ref: '342-358', any: [/;攻撃を行った勇者が堕ちたか判定/] },
      { src: BATLLE, ref: '359', any: [/ATK_TURN \+= 1/] },
      {
        src: BATLLE,
        ref: '362-365',
        any: [/SIF QUEST_FLAG == 2 && SUCCESS == 1/],
      },
      {
        src: BATLLE,
        ref: '367-368',
        any: [/SIF CFLAG:\(ARG:0\):1 == 2 && FLAG:5 & 32/],
      },
      { src: BATLLE, ref: '370-410', any: [/;装備の回復/] },
      { src: BATLLE, ref: '416-444', any: [/@MONSTER_LIST/] },
      { src: BATLLE, ref: '424-443', any: [/B = 0/] },
      { src: BATLLE, ref: '433-435', any: [/IF BOSS == 1 && NUM > 0/] },
      { src: BATLLE, ref: '436-437', any: [/ELSEIF NUM <= 0/] },
      { src: BATLLE, ref: '438-440', any: [/ELSE/] },
      { src: BATLLE, ref: '447-487', any: [/@SELECT_ATKER, ARG:0, ARG:1/] },
      {
        src: BATLLE,
        ref: '45',
        any: [/LOCAL = \(CFLAG:\(ARG:0\):501 - 1\) \* 10 \+ 100 \+ RAND:5/],
      },
      { src: BATLLE, ref: '456', any: [/ARG:1 \+= 1/] },
      { src: BATLLE, ref: '46-51', any: [/;8階以上で強敵の抽選/] },
      { src: BATLLE, ref: '467', any: [/LOCAL = ARG:1 % MEMBER/] },
      {
        src: BATLLE,
        ref: '473-479',
        any: [/;仲間Aが空欄の場合も考えて順番に見る/],
      },
      { src: BATLLE, ref: '487', any: [/RETURN ARG:0/] },
      { src: BATLLE, ref: '490-543', any: [/@SPEED_PLUS/] },
      { src: BATLLE, ref: '546-882', any: [/@ENEMY_ATTACK, ARG:0, ARG:1/] },
      { src: BATLLE, ref: '561-562', any: [/A = ARG:0/] },
      {
        src: BATLLE,
        ref: '565',
        any: [/CALL SELECT_BENKI_MENU\(TARGET, "戦闘"\)/],
      },
      { src: BATLLE, ref: '56-73', any: [/;スケルトンチェック！/] },
      { src: BATLLE, ref: '568', any: [/PLAYER = 0/] },
      { src: BATLLE, ref: '570-574', any: [/IF TALENT:肛门虫/] },
      { src: BATLLE, ref: '577-595', any: [/B = 0/] },
      { src: BATLLE, ref: '589', any: [/IF B >= 400/] },
      { src: BATLLE, ref: '589-595', any: [/IF B >= 400/] },
      { src: BATLLE, ref: '597-601', any: [/B = C/] },
      { src: BATLLE, ref: '603-611', any: [/B = C \+ 3/] },
      { src: BATLLE, ref: '612-613', any: [/;仕様変更にてオミット/] },
      { src: BATLLE, ref: '615-616', any: [/B = C \+ 99/] },
      { src: BATLLE, ref: '622', any: [/CALL SKILL_EXTRA_BONUS,ARG:0/] },
      { src: BATLLE, ref: '628-630', any: [/IF FLAG:5 & 32/] },
      { src: BATLLE, ref: '633-640', any: [/W:8 = 1/] },
      { src: BATLLE, ref: '637', any: [/DMG = CFLAG:\(ARG:0\):11/] },
      { src: BATLLE, ref: '643-648', any: [/W:0 = CFLAG:\(ARG:0\):550/] },
      { src: BATLLE, ref: '650-660', any: [/IF FLAG:5 & 32/] },
      { src: BATLLE, ref: '653', any: [/CALL NAME_BENKI_MENU,PLAY_TYPE/] },
      {
        src: BATLLE,
        ref: '652-654',
        any: [/PRINTFORM 作为肉便器的%SAVESTR:\(ARG:0\)%以/],
      },
      { src: BATLLE, ref: '662-663', any: [/CALL EQUIP_DATABASE/] },
      { src: BATLLE, ref: '665-675', any: [/;ミス処理/] },
      { src: BATLLE, ref: '677-680', any: [/;気力回復/] },
      { src: BATLLE, ref: '682-696', any: [/;ダメージ変動/] },
      { src: BATLLE, ref: '698', any: [/CFLAG:\(ARG:0\):571 -= W:10/] },
      { src: BATLLE, ref: '700-708', any: [/;畏怖・隷属処理/] },
      { src: BATLLE, ref: '711-722', any: [/;連続攻撃処理/] },
      {
        src: BATLLE,
        ref: '724-725',
        any: [/CALL ATTACK_CHARA_EXTRA_DMG, \(ARG:0\), DMG, \(ARG:1\)/],
      },
      { src: BATLLE, ref: '727-728', any: [/;DEF=敵残り防御力/] },
      { src: BATLLE, ref: '730-740', any: [/;先手かつ奇袭の場合、奇袭成功/] },
      { src: BATLLE, ref: '742-765', any: [/;追加効果/] },
      { src: BATLLE, ref: '75-80', any: [/;勝利フラグ/] },
      { src: BATLLE, ref: '767-797', any: [/;耐性処理/] },
      { src: BATLLE, ref: '799', any: [/B = E:C/] },
      { src: BATLLE, ref: '802-829', any: [/IF DEF <= 0/] },
      { src: BATLLE, ref: '803-807', any: [/IF LOCAL:0 == 0/] },
      {
        src: BATLLE,
        ref: '812-818',
        any: [/GET_EXP = E:\(C \+ 1\) \+ CFLAG:0:9/],
      },
      { src: BATLLE, ref: '820-824', any: [/X = E:C/] },
      {
        src: BATLLE,
        ref: '831',
        any: [/DEF = CFLAG:\(ARG:0\):11 \/ E:\(C \+ 3\)/],
      },
      { src: BATLLE, ref: '834', any: [/DEF = CFLAG:\(ARG:0\):11 \/ X/] },
      { src: BATLLE, ref: '836-837', any: [/;死亡怪物計算/] },
      { src: BATLLE, ref: '866-875', any: [/;経験値取得/] },
      { src: BATLLE, ref: '886-1004', any: [/@SLAVE_MONSTER_ATTACK/] },
      { src: BATLLE, ref: '891-895', any: [/IF CFLAG:A:570 < 100/] },
      { src: BATLLE, ref: '897-916', any: [/;防御側の防御力を算出/] },
      { src: BATLLE, ref: '89-96', any: [/;弾の補充/] },
      { src: BATLLE, ref: '918-929', any: [/B = C \+ 3/] },
      { src: BATLLE, ref: '932-937', any: [/;怪物側の攻撃力を算出/] },
      { src: BATLLE, ref: '940-943', any: [/Y = E:300/] },
      { src: BATLLE, ref: '946', any: [/Z -= X/] },
      { src: BATLLE, ref: '948', any: [/B = E:C/] },
      { src: BATLLE, ref: '949-972', any: [/IF Z <= 0/] },
      { src: BATLLE, ref: '957-964', any: [/B = C \+ 1/] },
      { src: BATLLE, ref: '974-977', any: [/B = C \+ 3/] },
      { src: BATLLE, ref: '98-121', any: [/;先制/] },
      { src: BATLLE, ref: '990-993', any: [/B = C \+ 1/] },
      // #178 任务真身接线（原 #175 登记的存根调用点）
      { src: BATLLE, ref: '77', any: [/CALL QUEST_BATTLE_SET,ARG:0/] },
      { src: BATLLE, ref: '363', any: [/CALL RESULT_QUEST,ARG:0,"成功"/] },
      { src: BATLLE, ref: '365', any: [/CALL RESULT_QUEST,ARG:0,"失败"/] },
    ],
  },
  // —— #175 H6 战斗：ere/dungeon/monster-data.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/monster-data.js',
    refs: [
      {
        src: MONSTER_DATA_ERB,
        ref: '112-170',
        any: [/LV = CFLAG:0:9 \/ 12 \+ 2/],
      },
      { src: MONSTER_DATA_ERB, ref: '154-170', any: [/;GROUP战用/] },
      { src: MONSTER_DATA_ERB, ref: '171-172', any: [/SIF INUM < 1000/] },
      { src: MONSTER_DATA_ERB, ref: '174-182', any: [/ELSEIF LINE == 5/] },
      { src: MONSTER_DATA_ERB, ref: '184-214', any: [/;ボス化初期化/] },
      {
        src: MONSTER_DATA_ERB,
        ref: '1994-2032',
        any: [/@SKELETON, ARG:0, ARG:1/],
      },
      {
        src: MONSTER_DATA_ERB,
        ref: '216-339',
        any: [/LOCAL:0 = RAND:150 \+ 100/],
      },
      {
        src: MONSTER_DATA_ERB,
        ref: '2-461',
        any: [
          /@MONSTER_DATA, ARG:0, ARG:1, ARG:2 = -1, ARG:3 = -1, GROUP = -1/,
        ],
      },
      {
        src: MONSTER_DATA_ERB,
        ref: '2701-2766',
        any: [/@MONSTERNAME\(L_ID\)/],
      },
      {
        src: MONSTER_DATA_ERB,
        ref: '2772-2878',
        any: [/;----------------------------------/],
      },
      { src: MONSTER_DATA_ERB, ref: '2861-2875', any: [/NAME_LENG -= 22/] },
      { src: MONSTER_DATA_ERB, ref: '341-355', any: [/ELSE/] },
      { src: MONSTER_DATA_ERB, ref: '357-419', any: [/ELSE/] },
      { src: MONSTER_DATA_ERB, ref: '421-437', any: [/LOCAL = E:\(TOP\+1\)/] },
      { src: MONSTER_DATA_ERB, ref: '443-456', any: [/E:\(TOP\+2\) \+= LVUP/] },
      { src: MONSTER_DATA_ERB, ref: '96-110', any: [/;16 射撃/] },
    ],
  },

  // —— #179 H10 升级：ere/dungeon/dungeon-lvup.js ——
  {
    js: 'ere/dungeon/dungeon-lvup.js',
    refs: [
      { src: LVUP_ERB, ref: '2-41', any: [/^\s*@LVUP,\ ARG:0$/m] },
      { src: LVUP_ERB, ref: '44-89', any: [/^\s*@ST_UP,\ ARG:0$/m] },
      { src: SYSTEM, ref: '619', any: [/^\s*CALL LVUP, 0$/m] },
      {
        src: LVUP_ERB,
        ref: '12',
        any: [/^\s*;魔王必要经验值 = LV \* 100 \+ 10/],
      },
      { src: LVUP_ERB, ref: '45-47', any: [/^\s*CFLAG:\(ARG:0\):9\ \+=\ 1$/m] },
      { src: LVUP_ERB, ref: '13', any: [/^\s*LOCAL\ =\ LOCAL:0$/m] },
      {
        src: LVUP_ERB,
        ref: '14',
        any: [/^\s*ELSEIF\ TALENT:ARG:220\ ==\ 1$/m],
      },
      { src: LVUP_ERB, ref: '48-54', any: [/^\s*LOCAL:0\ =\ RAND:2$/m] },
      { src: LVUP_ERB, ref: '55-58', any: [/^\s*IF\ DAY\ >=\ 100$/m] },
      {
        src: LVUP_ERB,
        ref: '59-62',
        any: [/^\s*IF\ TALENT:\(ARG:0\):240\ ==\ 1$/m],
      },
      {
        src: LVUP_ERB,
        ref: '63-66',
        any: [/^\s*IF\ TALENT:\(ARG:0\):248\ ==\ 1$/m],
      },
      {
        src: LVUP_ERB,
        ref: '69-72',
        any: [/^\s*IF\ TALENT:\(ARG:0\):314\ ==\ 5$/m],
      },
      {
        src: LVUP_ERB,
        ref: '75-76',
        any: [/^\s*SIF\ TALENT:\(ARG:0\):314\ ==\ 11$/m],
      },
      {
        src: LVUP_ERB,
        ref: '79-80',
        any: [/^\s*SIF\ TALENT:ARG:261\ ==\ 1$/m],
      },
      {
        src: LVUP_ERB,
        ref: '83-84',
        any: [/^\s*SIF\ TALENT:ARG:262\ ==\ 1$/m],
      },
      {
        src: LVUP_ERB,
        ref: '86-87',
        any: [/^\s*MAXBASE:\(ARG:0\):0\ \+=\ 10$/m],
      },
      {
        src: LVUP_ERB,
        ref: '6',
        any: [/^\s*LOCAL:0\ =\ CFLAG:\(ARG:0\):9\ \*\ 10\ \+\ 10$/m],
      },
      {
        src: LVUP_ERB,
        ref: '14-17',
        any: [/^\s*ELSEIF\ TALENT:ARG:220\ ==\ 1$/m],
      },
      { src: LVUP_ERB, ref: '8', any: [/^\s*LOCAL:2\ =\ 0$/m] },
      { src: LVUP_ERB, ref: '10-29', any: [/^\s*\$LVUP_REPEAT$/m] },
      { src: LVUP_ERB, ref: '11-21', any: [/^\s*IF\ ARG\ ==\ MASTER$/m] },
      { src: LVUP_ERB, ref: '24-28', any: [/^\s*EXP:ARG:80\ \-=\ LOCAL$/m] },
      { src: LVUP_ERB, ref: '31-34', any: [/^\s*IF\ LOCAL:2\ >\ 0$/m] },
      {
        src: LVUP_ERB,
        ref: '35-39',
        any: [
          /^\s*IF\ TALENT:\(ARG:0\):291\ \&\&\ CFLAG:\(ARG:0\):9\ >=\ 30$/m,
        ],
      },
    ],
  },
  // —— #179 H10 战果：ere/dungeon/dungeon-after.js ——
  {
    js: 'ere/dungeon/dungeon-after.js',
    refs: [
      { src: SYSTEM, ref: '302', any: [/^\s*CALL DUNGEON_AFTER$/m] },
      { src: DUNGEON_AFTER_ERB, ref: '2-15', any: [/^\s*@DUNGEON_AFTER$/m] },
      { src: DUNGEON_AFTER_ERB, ref: '19-322', any: [/^\s*@GOHOUBI$/m] },
      { src: DUNGEON_AFTER_ERB, ref: '325-568', any: [/^\s*@OSIOKI$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '562-566',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 9$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '342-346',
        any: [/^\s*IF\ RESULT\ <\ 0$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '40-62',
        any: [/^\s*IF\ ABL:A:10\ ==\ 0$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '353-401',
        any: [/^\s*IF\ ABL:A:10\ ==\ 0$/m],
      },
      { src: DUNGEON_AFTER_ERB, ref: '23', any: [/^\s*PRINTL$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '27-29',
        any: [/^\s*PRINTL\ \[0\]\ 这是你应份的$/m],
      },
      { src: DUNGEON_AFTER_ERB, ref: '30-36', any: [/^\s*\$INPUT_LOOP$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '66-70',
        any: [/^\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '72-80',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '75-76',
        any: [/^\s*SIF\ CFLAG:A:7\&1\ ==\ 1$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '77',
        any: [/^\s*PRINTFORML\ %SAVESTR:A%自豪地把勋章戴在身上。$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '81-322',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 2$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '213',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '291',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '83-98',
        any: [/^\s*IF\ CFLAG:A:504\ ==\ 0$/m],
      },
      { src: DUNGEON_AFTER_ERB, ref: '91-98', any: [/^\s*ELSE$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '99-132',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 1$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '133-165',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 2$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '166-202',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '203-209',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 4$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '210-239',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 5$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '240-250',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 6$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '251-279',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 7$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '280-287',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 8$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '288-319',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 9$/m],
      },
      { src: DUNGEON_AFTER_ERB, ref: '320-321', any: [/^\s*ELSE$/m] },
      { src: DUNGEON_AFTER_ERB, ref: '568', any: [/^\s*RETURN\ 0$/m] },
      { src: DUNGEON_AFTER_ERB, ref: '327', any: [/^\s*PRINTL$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '331-339',
        any: [/^\s*PRINT\ \[0\]\ 什么也不做/],
      },
      { src: DUNGEON_AFTER_ERB, ref: '340-346', any: [/^\s*\$INPUT_LOOP$/m] },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '413',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '487',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '434',
        any: [/^\s*IF\ ABL:A:17\ >=\ 4$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '463',
        any: [/^\s*IF\ ABL:A:17\ >=\ 6$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '404-408',
        any: [/^\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '409-429',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '430-458',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 2$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '459-482',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 3$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '483-503',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 4$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '504-527',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 5$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '528-535',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 6$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '536-543',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 7$/m],
      },
      {
        src: DUNGEON_AFTER_ERB,
        ref: '544-561',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 8$/m],
      },
    ],
  },
  // —— #178（H9）：DUNGEON_TOWN / DUNGEON_QUEST 全量（锚机械生成：范围内首个注释行，无注释则首非空行）——
  {
    js: 'ere/dungeon/dungeon-town.js',
    refs: [
      {
        src: DUNGEON_TOWN_ERB,
        ref: '5-75',
        any: [/---------------------------------/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '16-18', any: [/PM:0 = ARG/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '20-25',
        any: [
          /リーダー以外の帰還フラグが初期化されてなかったので全員分初期化しておこう/,
        ],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '27-67',
        any: [/再起ポイントを消費して回復/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '27-29',
        any: [/再起ポイントを消費して回復/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '31-35', any: [/レベルアップ/] },
      { src: DUNGEON_TOWN_ERB, ref: '37-40', any: [/-----------------------/] },
      { src: DUNGEON_TOWN_ERB, ref: '41-44', any: [/-----------------------/] },
      { src: DUNGEON_TOWN_ERB, ref: '45-48', any: [/----------------------/] },
      { src: DUNGEON_TOWN_ERB, ref: '49-52', any: [/----------------------/] },
      { src: DUNGEON_TOWN_ERB, ref: '53-56', any: [/----------------------/] },
      { src: DUNGEON_TOWN_ERB, ref: '56', any: [/CALL SET_QUEST\(PM:0\)/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '58',
        any: [
          /PRINTFORML ------------------------------------------------------------------------------------/,
        ],
      },
      { src: DUNGEON_TOWN_ERB, ref: '60-63', any: [/IF RAND:10 > 0/] },
      { src: DUNGEON_TOWN_ERB, ref: '64-67', any: [/----------------------/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '68-72',
        any: [/今後宴会以降の処理が実装される可能性があるのでいちおう中断判定/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '74-75', any: [/A = ARG:0/] },
      { src: DUNGEON_TOWN_ERB, ref: '80-94', any: [/全回復。仲間も回復/] },
      { src: DUNGEON_TOWN_ERB, ref: '85-86', any: [/SIF FLAG:5 & 32/] },
      { src: DUNGEON_TOWN_ERB, ref: '87', any: [/CFLAG:PM:508 --/] },
      { src: DUNGEON_TOWN_ERB, ref: '88-94', any: [/全回復。仲間も回復/] },
      { src: DUNGEON_TOWN_ERB, ref: '101-135', any: [/仕送り/] },
      { src: DUNGEON_TOWN_ERB, ref: '106-114', any: [/仕送り/] },
      { src: DUNGEON_TOWN_ERB, ref: '116-135', any: [/各自資金繰りを行う/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '121',
        any: [/CFLAG:\(PM:LCOUNT\):580 \+= LOCAL/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '123',
        any: [/CALL SELL_EX_ITEM\(PM:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '125',
        any: [/CALL TOWN_SELL\(PM:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '127',
        any: [/CALL TOWN_HOSHOUNIN\(PM:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '129',
        any: [/CALL TOWN_HENSAI\(PM:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '130-132',
        any: [/手持ちが少ないと借金する/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '133-134', any: [/ダンジョン外売春/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '134',
        any: [/CALL HEROINE_BITCH\(PM:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '140-151',
        any: [/@FI_PT_FUNDING\(PM:0, PM:1, PM:2\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '146', any: [/VARSET LOCAL/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '148',
        any: [/LOCAL \+= FI_FUNDING\(PM:LCOUNT\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '150', any: [/LOCAL = MAX\(LOCAL, 1\)/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '156-189',
        any: [/故郷や家族からの補助金/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '160-161', any: [/SIF ARG <= 0/] },
      { src: DUNGEON_TOWN_ERB, ref: '162', any: [/VARSET LOCAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '165-168', any: [/素質補正/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '169-171',
        any: [/物乞い・貧民は援助が少ない/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '172-174',
        any: [/貴族・聖女・軍人は多い/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '175-177',
        any: [/金のため・自暴自棄は援助が少ない/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '178-180',
        any: [/国に命じられて・命令されては多い/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '182-184', any: [/カルマ補正/] },
      { src: DUNGEON_TOWN_ERB, ref: '186-187', any: [/レベル補正/] },
      { src: DUNGEON_TOWN_ERB, ref: '189', any: [/RETURNF LOCAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '193-208', any: [/@TOWN_SELL\(ARG\)/] },
      { src: DUNGEON_TOWN_ERB, ref: '196-197', any: [/SIF ARG <= 0/] },
      { src: DUNGEON_TOWN_ERB, ref: '198-199', any: [/SIF !CFLAG:ARG:581/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '207',
        any: [/CFLAG:ARG:580 \+= CFLAG:ARG:581/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '208', any: [/CFLAG:ARG:581 = 0/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '212-227',
        any: [/@TOWN_HOSHOUNIN\(ARG\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '215-218', any: [/SIF ARG <= 0/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '219',
        any: [/LOCAL = \(CFLAG:0:9 \* 8\) \+ 500/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '227', any: [/CFLAG:ARG:582 -= LOCAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '231-300', any: [/借金加上高利貸利率/] },
      { src: DUNGEON_TOWN_ERB, ref: '235-236', any: [/SIF ARG <= 0/] },
      { src: DUNGEON_TOWN_ERB, ref: '237-246', any: [/借金加上高利貸利率/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '247-276',
        any: [/借金があれば500、もしくは2\.5割を可能な限り返済する/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '249-269',
        any: [/返済額をカルマ依存で変動するように/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '270',
        any: [/LOCAL = ABS\(CFLAG:ARG:582\) \/ LOCAL/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '271-272',
        any: [/ELSEIF CFLAG:ARG:582 < 0/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '273-275', any: [/借金なし/] },
      { src: DUNGEON_TOWN_ERB, ref: '278-283', any: [/上限下限処理/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '281',
        any: [/LOCAL = LIMIT\(LOCAL, 100, CFLAG:ARG:580 \/ 2\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '282-283', any: [/LOCAL \/= 100/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '285-286',
        any: [/借金の金額は越えないように/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '299', any: [/CFLAG:ARG:582 \+= LOCAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '300', any: [/CFLAG:ARG:580 -= LOCAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '304-324', any: [/@TOWN_LOAN\(ARG\)/] },
      { src: DUNGEON_TOWN_ERB, ref: '307-308', any: [/SIF ARG <= 0/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '309-311',
        any: [/IF CFLAG:ARG:582 < -50000/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '313',
        any: [/IF RAND:\(260 \+ CFLAG:ARG:151\) < 50/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '321', any: [/CFLAG:ARG:582 -= 1000/] },
      { src: DUNGEON_TOWN_ERB, ref: '322', any: [/CFLAG:ARG:580 \+= 1000/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '331-343',
        any: [/@TOWN_PT_SHOPPING\(PM:0, PM:1, PM:2\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '343', any: [/WAIT/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '346-357',
        any: [/お金に余裕が無いと買えない/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '349-350', any: [/SIF ARG <= 0/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '351-353',
        any: [/お金に余裕が無いと買えない/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '354',
        any: [/CALL ADD_EX_ITEM, -3, ARG, 1/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '355-357', any: [/代金を支払う/] },
      { src: DUNGEON_TOWN_ERB, ref: '368-567', any: [/新探索模式/] },
      { src: DUNGEON_TOWN_ERB, ref: '391-403', any: [/新探索模式/] },
      { src: DUNGEON_TOWN_ERB, ref: '401-402', any: [/A = PM:0/] },
      { src: DUNGEON_TOWN_ERB, ref: '405-406', any: [/SIF FLAG:5 & 32/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '410-436',
        any: [/最低予算更新、ここのLOCALとLOCAL:2は使ってない模様/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '422', any: [/NUM_PM \+\+/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '423',
        any: [/KARMA:LCOUNT = CFLAG:\(PM:LCOUNT\):151/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '427',
        any: [/FLOOR:LCOUNT = CFLAG:\(PM:LCOUNT\):520/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '428',
        any: [/FLOOR_MIN = MIN\(FLOOR_MIN, FLOOR:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '429',
        any: [/FLOOR_MAX = MAX\(FLOOR_MAX, FLOOR:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '431',
        any: [/LOAN:LCOUNT = CFLAG:\(PM:LCOUNT\):582/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '432',
        any: [/LOAN_MIN = MIN\(LOAN_MIN, LOAN:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '433',
        any: [/LOAN_MAX = MAX\(LOAN_MAX, LOAN:LCOUNT\)/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '435',
        any: [
          /BALANCE:LCOUNT = CFLAG:\(PM:LCOUNT\):580 \+ CFLAG:\(PM:LCOUNT\):582/,
        ],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '438',
        any: [/KARMA_PT = SUMARRAY\(KARMA\) \/ NUM_PM/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '439',
        any: [/FLOOR_PT = SUMARRAY\(FLOOR\) \/ NUM_PM/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '440',
        any: [/LOAN_PT = SUMARRAY\(LOAN\) \/ NUM_PM/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '441-443',
        any: [
          /ふつー黒字収支を心がけると思う（その場合は単に合計するだけでおｋ）が/,
        ],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '443',
        any: [/BALANCE_PT = SUMARRAY\(BALANCE\) \/ NUM_PM/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '445-480',
        any: [/ここらへんは適当に決めた判定/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '484-534',
        any: [/GOTO使うのもあんまよろしくないが他に手を思いつかんのだ/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '490-505', any: [/借金がすごいパーティ/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '496-505',
        any: [/前回到達した階層\+1階層を目指す/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '506-515', any: [/借金そこそこ/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '512',
        any: [/GOAL = MIN\(FLOOR_PT \/ 2, FLOOR_MIN\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '513-514', any: [/SIF !GOAL/] },
      { src: DUNGEON_TOWN_ERB, ref: '515', any: [/START_FLOOR = 1/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '516-525',
        any: [/借金がぜんぜん無いか各分岐の一定確率で深く潜る/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '518-525',
        any: [/前回到達した階層\+1階層を目指す/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '526-534', any: [/その他/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '532',
        any: [/GOAL = MAX\(FLOOR_MAX \/ 2, FLOOR_PT, 1\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '533', any: [/START_FLOOR = GOAL/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '536-538',
        any: [/9階層までしかないので、最大値は8、最小値は0/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '540-542',
        any: [/階層踏破のための必要資金/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '544-556',
        any: [/IF GOAL && \(FLAG:5 & 32\)/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '558-566', any: [/支払い/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '563',
        any: [/CFLAG:\(PM:LCOUNT\):582 -= COST/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '564',
        any: [/CFLAG:\(PM:LCOUNT\):520 = GOAL/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '565',
        any: [/CFLAG:\(PM:LCOUNT\):501 = START_FLOOR/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '567', any: [/WAIT/] },
      { src: DUNGEON_TOWN_ERB, ref: '575-679', any: [/予算を集める/] },
      { src: DUNGEON_TOWN_ERB, ref: '583', any: [/TARGET_POOL = TARGET/] },
      { src: DUNGEON_TOWN_ERB, ref: '585-596', any: [/予算を集める/] },
      { src: DUNGEON_TOWN_ERB, ref: '597-612', any: [/おかねがある/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '605',
        any: [/CFLAG:\(PM:LCOUNT\):580 -= COST:LCOUNT/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '607', any: [/WAIT/] },
      { src: DUNGEON_TOWN_ERB, ref: '609-611', any: [/ELSE/] },
      { src: DUNGEON_TOWN_ERB, ref: '614-675', any: [/お楽しみタイム/] },
      { src: DUNGEON_TOWN_ERB, ref: '619', any: [/TARGET = PM:LCOUNT/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '621',
        any: [/PRINTFORM %SAVESTR:TARGET%/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '623-625', any: [/カルマが高い場合/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '626-628',
        any: [/カルマが高い場合？やっぱりオトコはそゆうものですと考え。/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '629-666',
        any: [/レズっ気・ふたなり・オトコの場合娼婦購入/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '630-646',
        any: [/レズっ気・ふたなり・オトコの場合娼婦購入/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '634-635', any: [/SIF TALENT:142/] },
      { src: DUNGEON_TOWN_ERB, ref: '636-637', any: [/SIF RAND:5 == 0/] },
      { src: DUNGEON_TOWN_ERB, ref: '639', any: [/CALL BEFORE_AUTOTRAIN/] },
      { src: DUNGEON_TOWN_ERB, ref: '640-642', any: [/貝合わせ自動調教/] },
      { src: DUNGEON_TOWN_ERB, ref: '643-645', any: [/愛撫自動調教/] },
      { src: DUNGEON_TOWN_ERB, ref: '646', any: [/CALL SOURCE_CHECK_AUTO/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '647-653',
        any: [/ショタコンの場合少年風俗へ/],
      },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '654-665',
        any: [/いっちよ、ただの、この男性勇者やばいじゃないが。。。/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '664', any: [/PRINT/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '667-672',
        any: [
          /聖女・神官・巫女・神官男子\(カルマ高いのみ\)はお祈りでカルマアップ/,
        ],
      },
      { src: DUNGEON_TOWN_ERB, ref: '677', any: [/TARGET = TARGET_POOL/] },
      { src: DUNGEON_TOWN_ERB, ref: '679', any: [/RETURN 1/] },
      { src: DUNGEON_TOWN_ERB, ref: '686-700', any: [/各自日常を送る/] },
      { src: DUNGEON_TOWN_ERB, ref: '692-698', any: [/各自日常を送る/] },
      { src: DUNGEON_TOWN_ERB, ref: '696', any: [/TARGET = PM:LCOUNT/] },
      {
        src: DUNGEON_TOWN_ERB,
        ref: '697',
        any: [/CALL DUNGEON_TOWN_LOVER,TARGET/],
      },
      { src: DUNGEON_TOWN_ERB, ref: '705-710', any: [/FOR/] },
    ],
  },
  {
    js: 'ere/dungeon/dungeon-quest.js',
    refs: [
      {
        src: DUNGEON_QUEST_ERB,
        ref: '6-113',
        any: [/---------------------------------/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '11-12',
        any: [/移動する際はかならず冒険の計画より後ろに置くこと/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '16-17', any: [/SIF GETBIT\(FLAG:8,3\)/] },
      { src: DUNGEON_QUEST_ERB, ref: '19-21', any: [/PM:0 = ARG/] },
      { src: DUNGEON_QUEST_ERB, ref: '23-111', any: [/全員に順番に設定する/] },
      { src: DUNGEON_QUEST_ERB, ref: '28-47', any: [/終了したクエストの清算/] },
      { src: DUNGEON_QUEST_ERB, ref: '32-45', any: [/成功報酬/] },
      { src: DUNGEON_QUEST_ERB, ref: '33-37', any: [/お金/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '38-41',
        any: [/ELSEIF CFLAG:\(PM:LCOUNT\):535 == 2/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '42-44',
        any: [/ELSEIF CFLAG:\(PM:LCOUNT\):535 == 3/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '46',
        any: [/CFLAG:\(PM:LCOUNT\):534 = 0/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '49-51',
        any: [/受注状態が初期化されていないとダメ/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '53-54', any: [/クエスト報酬/] },
      { src: DUNGEON_QUEST_ERB, ref: '56-83', any: [/クエストの障害/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '58',
        any: [/CFLAG:\(PM:LCOUNT\):536 = 0/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '85-86', any: [/クエストの目的/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '88-96',
        any: [/討伐対象（モンスターID）/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '98-104', any: [/時間制限あり/] },
      { src: DUNGEON_QUEST_ERB, ref: '106-110', any: [/クエスト：受注状態/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '116-177',
        any: [/---------------------------------/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '125-127', any: [/クエスト禁止/] },
      { src: DUNGEON_QUEST_ERB, ref: '129-131', any: [/PM:0 = ARG/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '133-175',
        any: [/全員に順番に結果を見るする/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '138-140',
        any: [/クエスト受注で成功でも失敗でもない場合じゃないとダメ/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '142-150',
        any: [/該当モンスターがいないとダメ/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '153', any: [/PRINTW \*クエスト結果\*/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '155-158',
        any: [/IF GETBIT\(CFLAG:\(PM:LCOUNT\):536, 5\)/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '160-163',
        any: [/IF CFLAG:\(PM:LCOUNT\):539 < 1/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '165',
        any: [/CALL QUEST_SELECT,PM:LCOUNT, ARGS/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '167-173', any: [/IF ARGS == "失敗"/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '180-513',
        any: [/---------------------------------/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '194-199', any: [/IF ARGS == "セット"/] },
      { src: DUNGEON_QUEST_ERB, ref: '201', any: [/MON_ID = CFLAG:ARG:538/] },
      { src: DUNGEON_QUEST_ERB, ref: '204-208', any: [/IF QUEST_LINE == 2/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '206-207',
        any: [/ELSEIF QUEST_LINE == 3/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '210-288', any: [/さらわれた娘/] },
      { src: DUNGEON_QUEST_ERB, ref: '213', any: [/CFLAG:ARG:540 = RAND:5/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '214-229',
        any: [/ELSEIF ARGS == "成功"/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '230-267', any: [/PRINT は/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '268-287',
        any: [/ELSEIF ARGS == "名前"/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '289-366', any: [/淫魔の虜/] },
      { src: DUNGEON_QUEST_ERB, ref: '292', any: [/CFLAG:ARG:540 = RAND:5/] },
      { src: DUNGEON_QUEST_ERB, ref: '325-345', any: [/IF RAND:10 == 0/] },
      { src: DUNGEON_QUEST_ERB, ref: '367-445', any: [/変異する身体/] },
      { src: DUNGEON_QUEST_ERB, ref: '370', any: [/CFLAG:ARG:540 = RAND:5/] },
      { src: DUNGEON_QUEST_ERB, ref: '403-424', any: [/野良犬で獣姦フラグON/] },
      {
        src: CHARA_INFO_SHOW,
        ref: '406',
        any: [/CALL QUEST_SELECT, ARG, "名前", 2/],
      },
      {
        src: CHARA_INFO_SHOW,
        ref: '417',
        any: [/CALL QUEST_SELECT, ARG, "名前", 3/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '419-421', any: [/野良犬で獣姦フラグON/] },
      { src: DUNGEON_QUEST_ERB, ref: '446-447', any: [/ELSE/] },
      { src: DUNGEON_QUEST_ERB, ref: '449-450', any: [/SIF QUEST_LINE == 1/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '451-511',
        any: [/SIF GETBIT\(CFLAG:ARG:536, 0\)/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '452', any: [/IF ARGS == "名前"/] },
      { src: DUNGEON_QUEST_ERB, ref: '453-463', any: [/IF QUEST_LINE == 0/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '464-498',
        any: [/SIF GETBIT\(CFLAG:ARG:536, 0\)/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '499-500', any: [/SIF QUEST_LINE == 2/] },
      { src: DUNGEON_QUEST_ERB, ref: '501-510', any: [/\$LINE3/] },
      { src: DUNGEON_QUEST_ERB, ref: '502-503', any: [/SIF MON_ID == 0/] },
      { src: DUNGEON_QUEST_ERB, ref: '509-510', any: [/SIF QUEST_LINE == 0/] },
      { src: DUNGEON_QUEST_ERB, ref: '511', any: [/ENDIF/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '516-617',
        any: [/---------------------------------/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '526-528', any: [/PM:0 = ARG/] },
      { src: DUNGEON_QUEST_ERB, ref: '530', any: [/QUEST_ON = 0/] },
      { src: DUNGEON_QUEST_ERB, ref: '536-538', any: [/時間経過/] },
      { src: DUNGEON_QUEST_ERB, ref: '540-542', any: [/発生しないときもある/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '544-546',
        any: [/クエスト受注で成功でも失敗でもない場合じゃないとダメ/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '548-556',
        any: [/該当モンスターがいないとダメ/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '558-559',
        any: [/PRINTW \*任务戦闘発生\*/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '559', any: [/QUEST_ON = 2/] },
      { src: DUNGEON_QUEST_ERB, ref: '561-565', any: [/最後列ボス化/] },
      { src: DUNGEON_QUEST_ERB, ref: '567-579', any: [/罠/] },
      { src: DUNGEON_QUEST_ERB, ref: '581-585', any: [/最前列15匹/] },
      { src: DUNGEON_QUEST_ERB, ref: '587-612', any: [/性奉仕/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '592-593',
        any: [/SIF TALENT:\(PM:LCOUNT\):成为勇者前的生活 == 5/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '595-596',
        any: [/SIF TALENT:\(PM:LCOUNT\):成为勇者前的生活 == 20/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '598',
        any: [/LOCAL \+= EXP:\(PM:LCOUNT\):74/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '600-601',
        any: [/SIF CFLAG:\(PM:LCOUNT\):151 < -30/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '603-604',
        any: [/SIF CFLAG:\(PM:LCOUNT\):151 < -60/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '605-609', any: [/IF RAND:LOCAL > 100/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '611',
        any: [/PRINTFORML %SAVESTR:\(PM:LCOUNT\)%用愤怒的话语回绝了/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '617', any: [/RETURN QUEST_ON/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '620-682',
        any: [/---------------------------------/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '628-673',
        any: [/一応モンスター数の確認/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '675-679',
        any: [/IF EXP:0 > 0 && TALENT:0 == 1/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '689-951', any: [/ファーストキス/] },
      { src: DUNGEON_QUEST_ERB, ref: '689-706', any: [/ファーストキス/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '711-729',
        any: [/@SLIME_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '734-751',
        any: [/@INSECT_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '756-770',
        any: [/@IVY_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '775-796',
        any: [/@SYOKUSYU_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '801-819',
        any: [/@FAILY_QUEST_BITCH, ARG, MCOUNT/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '824-841', any: [/ファーストキス/] },
      { src: DUNGEON_QUEST_ERB, ref: '846-863', any: [/ファーストキス/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '868-886',
        any: [/@GIRL_QUEST_BITCH, ARG, MCOUNT/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '891-910', any: [/ファーストキス/] },
      {
        src: DUNGEON_QUEST_ERB,
        ref: '915-926',
        any: [/@BRAIN_QUEST_BITCH, ARG, MCOUNT/],
      },
      { src: DUNGEON_QUEST_ERB, ref: '931-950', any: [/ファーストキス/] },
      {
        src: CHARA_INFO_SHOW,
        ref: '1055',
        any: [
          /PRINTFORML 　%SAVESTR:TARGET%当前是Lv\{CFLAG:TARGET:9\}，战斗经验值总计\{X:1\}点，本级经验：\{EXP:80\}\/\{X\}/,
        ],
      },
      { src: CHARA_INFO_SHOW, ref: '1057-1058', any: [/PRINT/] },
    ],
  },
  // —— #179 H10 战果口上分发：ere/kojo/kojo-dungeon-after.js ——
  {
    js: 'ere/kojo/kojo-dungeon-after.js',
    refs: [
      { src: EVENT_K, ref: '468-476', any: [/^\s*@GOHOUBI_AFTER_KOUJO$/m] },
      { src: EVENT_K, ref: '486-494', any: [/^\s*@OSIOKI_KOUJO$/m] },
      { src: EVENT_K, ref: '471-472', any: [/^;口上の存在判定/m] },
      { src: EVENT_K, ref: '473', any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m] },
      { src: EVENT_K, ref: '491', any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m] },
    ],
  },
  // —— #179 H10 日程：ere/page/page-dungeon-daily.js ——
  {
    js: 'ere/page/page-dungeon-daily.js',
    refs: [
      {
        src: DUNGEON_DAILY_ERB,
        ref: '1-768',
        any: [/^\s*@DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '769-774',
        any: [/^\s*@CAL_DUNGEON_DAILY$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '7',
        any: [/^\s*PRINTFORML\ Space\ for\ further\ docuement$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '8-12',
        any: [/^\s*; FLAG <= 20 --> 岌岌可危$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '94-767',
        any: [/^\s*IF\ EX_FLAG:99\ >=\ 0\ \&\&\ EX_FLAG:99\ <=\ 20$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '15-37', any: [/^\s*REPEAT\ CHARANUM$/m] },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '39-68',
        any: [/^\s*DISPLAYCHARA\ =\ %SAVESTR:DAILYTARGET%$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '70-554',
        any: [/^\s*TEMP\ =\ RAND\(49\)$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '72-93', any: [/^\s*SELECTCASE\ TEMP$/m] },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '555-767',
        any: [/^\s*TEMP\ =\ RAND\(20\)$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '57',
        any: [/^\s*LOCALS\ =\ %EX_TALENTNAME:COUNT%$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '6-7', any: [/^PRINT\ \u3000/] },
      { src: DUNGEON_DAILY_ERB, ref: '13', any: [/^\s*STORAGE\ =\ 0$/m] },
      { src: DUNGEON_DAILY_ERB, ref: '16-23', any: [/^\s*REPEAT\ CHARANUM$/m] },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '24-27',
        any: [/^\s*PRINTL\ Testing\ Purpose$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '28-37',
        any: [/^\s*IF\ STORAGE\ !=\ 0$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '29-30',
        any: [/^\s*RAND\ \(STORAGE\)$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '40',
        any: [/^\s*DISPLAYCHARA\ =\ %SAVESTR:DAILYTARGET%$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '41-42',
        any: [/^\s*SIF\ DAILYTARGET\ >=\ CHARANUM$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '43-58',
        any: [/^\s*SIF\ EX_TALENT:DAILYTARGET:2$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '47-48',
        any: [/^\s*SIF\ STRLENS\(LOCALS\)\ >\ 1$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '53-54',
        any: [/^\s*SIF\ STRLENS\(LOCALS\)\ >\ 1$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '59-60', any: [/^\s*\$DAILYTYPE$/m] },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '61-65',
        any: [/^\s*IF\ TALENT:DAILYTARGET:85$/m],
      },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '66',
        any: [/^\s*PRINTFORML\ %DISPLAYCHARA%$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '67', any: [/^LOCALS\ =\ \r?$/m] },
      {
        src: DUNGEON_DAILY_ERB,
        ref: '771-773',
        any: [/^\s*IF\ EX_FLAG:99\ >=\ 100$/m],
      },
      { src: DUNGEON_DAILY_ERB, ref: '774', any: [/^\s*EX_FLAG:99\ \-=\ 2$/m] },
    ],
  },

  // —— #176 H7 陷阱：ere/dungeon/dungeon-trap.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-trap.js',
    refs: [
      {
        src: DUNGEON_TRAP_ERB,
        ref: '2-193',
        any: [/@DUNGEON_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '776',
        any: [/EXP:A:40 \+= 6/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '807',
        any: [/EXP:A:40 \+= 4/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '3-13',
        any: [/\#DIM\ TRAP_COUNT/],
      },
      {
        src: FRAUD_ERB,
        ref: '3-15',
        any: [/@诈骗陷阱/],
      },
      {
        src: FRAUD_ERB,
        ref: '3-231',
        any: [/@诈骗陷阱/],
      },
      {
        src: FRAUD_ERB,
        ref: '5-14',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON,
        ref: '14-22',
        any: [/;A・ARG:0が攻略中のキャラ（リーダー）/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '15-16',
        any: [/SIF\ D:4\ <=\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '16-86',
        any: [/@诈骗剧情1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '18',
        any: [/FOR\ TRAP_COUNT,\ 0,\ D:4/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '20-21',
        any: [/SIF\ CFLAG:A:1\ ==\ 3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '24-25',
        any: [/SIF\ CFLAG:A:1\ !=\ 2\ \&\&\ CFLAG:A:1\ !=\ 12/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '27-31',
        any: [
          /;FLAG:TRAP_NUMは各階層の陷阱ABCに何の陷阱が設置されているかのフラグになる/,
        ],
      },
      {
        src: FRAUD_ERB,
        ref: '33-49',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '34-39',
        any: [/TRAP_NUM\ =\ CFLAG:A:501\ \+\ 299/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '42-49',
        any: [/IF\ TRAP_ID\ <\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '50-66',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '51',
        any: [/\$TRAP_LOOP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '53',
        any: [/TRAP_ID\ =\ FLAG:TRAP_NUM/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '53-57',
        any: [/TRAP_ID\ =\ FLAG:TRAP_NUM/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '60-69',
        any: [/IF\ TRAP_ID\ <\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '67-83',
        any: [/ELSEIF\ \ CFLAG:A:151\ >\ \-50/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '68',
        any: [/RETURN\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '73',
        any: [/RESULT\ =\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '76-80',
        any: [/SIF\ CFLAG:A:513\ ==\ TRAP_ID/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '84',
        any: [/CFLAG:A:513\ =\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '84-86',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '87-88',
        any: [/SIF\ CFLAG:A:512\ <\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '87-188',
        any: [/@诈骗剧情2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '91',
        any: [/TRAP_MISS\ =\ 20\ \-\ \ CFLAG:A:512/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '94',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '94-95',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '94-155',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '96-100',
        any: [/ELSEIF\ TRAP_MISS\ <\ RAND:20/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '102',
        any: [/CALL\ PIT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '104',
        any: [/CALL\ ARROW_TRAP/],
      },
      {
        src: FRAUD_ERB,
        ref: '105-131',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '106',
        any: [/CALL\ TELEPORT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '108',
        any: [/CALL\ ONE_WAY_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '110',
        any: [/CALL\ LOVE_GAS_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '112',
        any: [/CALL\ SYOKUSYU_FLOOR_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '114',
        any: [/CALL\ LOVE_BATH_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '116',
        any: [/CALL\ SELF_SAIMIN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '118',
        any: [/CALL\ IMITATER_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '120',
        any: [/CALL\ SUMMON_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '122',
        any: [/CALL\ SUCCUBUS_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '124',
        any: [/CALL\ SLIME_ROOM_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '126',
        any: [/CALL\ NET_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '128',
        any: [/CALL\ SHOP_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '130',
        any: [/CALL\ BLACKOUT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '132',
        any: [/CALL\ SHOOT_TRAP/],
      },
      {
        src: FRAUD_ERB,
        ref: '132-158',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '134',
        any: [/CALL\ DISPELL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '136',
        any: [/CALL\ OIL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '138',
        any: [/CALL\ FIRE_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '140',
        any: [/CALL\ A_WORM_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '142',
        any: [/CALL\ LOVE_BUG_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '144',
        any: [/CALL\ DARK_JUEL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '146',
        any: [/CALL\ DEF_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '148',
        any: [/CALL\ ATK_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '150',
        any: [/CALL\ MAG_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '152',
        any: [/CALL\ ALL_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '153-154',
        any: [/ELSEIF\ TRAP_ID\ ==\ 87/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '154',
        any: [/CALL\ 诈骗陷阱/],
      },
      {
        src: FRAUD_ERB,
        ref: '159-185',
        any: [/ELSEIF\ \ CFLAG:A:151\ >\ \-50/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '160',
        any: [/TRAP_NOUSE\ =\ RESULT/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '162-163',
        any: [
          /SIF\ TRAP_ID\ >=\ 60\ \&\&\ TRAP_ID\ <=\ 89\ \&\&\ ITEM:TRAP_ID\ >\ 0\ \&\&\ TRAP_NOUSE\ ==\ 0\ \&\&\ CFLAG:A:1\ ==\ 2/,
        ],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '166-167',
        any: [/SIF\ TRAP_NOUSE\ ==\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '170-178',
        any: [
          /IF\ FLAG:5\ \&\ 64\ \&\&\ TRAP_NOUSE\ ==\ 0\ \&\&\ CFLAG:A:1\ ==\ 2/,
        ],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '180-184',
        any: [/TRAP_NUM\ \+=\ 10/],
      },
      {
        src: FRAUD_ERB,
        ref: '186-188',
        any: [/ELSE/],
      },
      {
        src: FRAUD_ERB,
        ref: '189-231',
        any: [/@诈骗剧情3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '191',
        any: [/WAIT/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '196-262',
        any: [/@PIT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '196-1420',
        any: [/@PIT_TRAP/],
      },
      {
        src: FRAUD_ERB,
        ref: '201-205',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '201-210',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: FRAUD_ERB,
        ref: '206-210',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: FRAUD_ERB,
        ref: '211-215',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '212',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '214-224',
        any: [/IF\ TALENT:A:314\ ==\ 6/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '226-229',
        any: [/IF\ DICE\ <\ 10/],
      },
      {
        src: FRAUD_ERB,
        ref: '228-231',
        any: [/MONEY\ \+=\ COST/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '230-240',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '241-250',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '253-257',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '259-260',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '265-310',
        any: [/@ARROW_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '270-271',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '273-274',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '276-279',
        any: [/IF\ Z\ <\ 30/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '280-292',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '283',
        any: [/PRINTFORML\ %SAVESTR:A%的要害被射中了，受到\{DICE\}点伤害！/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '284',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '286',
        any: [
          /PRINTFORML\ 箭矢插的很深，%SAVESTR:A%被追加了\{DICE\}点的伤害！/,
        ],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '293-304',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '296',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '298',
        any: [
          /PRINTFORML\ 箭矢插的很深，%SAVESTR:A%被追加了\{FLAG:85\ \*\ 10\}点的伤害！/,
        ],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '307-308',
        any: [/;\ SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '313-354',
        any: [/@TELEPORT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '318-319',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '321',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '323-326',
        any: [/IF\ Z\ >\ 70/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '327-331',
        any: [/ELSEIF\ Z\ <\ 20/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '330',
        any: [/D:20\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '331',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '332-337',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '335',
        any: [/D:20\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '336',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '339-343',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '345-349',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '351-352',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '357-403',
        any: [/@ONE_WAY_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '361-365',
        any: [/IF\ D:20\ <\ 40/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '368-375',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '378',
        any: [/Z\ =\ RAND:3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '380-383',
        any: [/IF\ Z\ >\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '384-392',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '388',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON,
        ref: '390-413',
        any: [/;陷阱処理/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '394-398',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '400-401',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '406-459',
        any: [/@LOVE_GAS_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '411-412',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '414',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '416-419',
        any: [/IF\ Z\ >\ 60/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '420-428',
        any: [/ELSEIF\ Z\ <\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '429-437',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '440-451',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '453-454',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '457',
        any: [/SETBIT\ CFLAG:A:503,\ 9/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '462-521',
        any: [/@SYOKUSYU_FLOOR_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '468-475',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '478',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '480-483',
        any: [/IF\ Z\ >\ 70/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '484-494',
        any: [/ELSEIF\ Z\ <\ 15/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '495-505',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '508-519',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '525-581',
        any: [/@LOVE_BATH_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '530-537',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '540',
        any: [/IF\ RAND:10\ <\ 2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '541-551',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '552-562',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '565-576',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '579',
        any: [/SETBIT\ CFLAG:A:503,\ 9/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '585-632',
        any: [/@SELF_SAIMIN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '590-591',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '593-594',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '594',
        any: [/TARGET\ =\ A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '597-598',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 9\)/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '600-603',
        any: [/IF\ DICE\ >\ 60/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '604-616',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '611',
        any: [/CALL\ COM3_AUTO/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '617-630',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '624',
        any: [/CALL\ COM3_AUTO/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '635-708',
        any: [/@IMITATER_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '639',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '642-651',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '653-656',
        any: [/IF\ Z\ >\ 60/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '657-680',
        any: [/ELSEIF\ Z\ <\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '681-705',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '711-737',
        any: [/@SUMMON_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '715-716',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '718',
        any: [/Z\ =\ RAND:2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '720-723',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '725-727',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '729',
        any: [/CALL\ SUMMON_MONSTER,\ \-1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '731-735',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '740-823',
        any: [/@SUCCUBUS_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '745-748',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '750',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '753-754',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 9\)/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '756-759',
        any: [/IF\ DICE\ >\ 60/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '760-789',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '790-820',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '826-887',
        any: [/@SLIME_ROOM_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '831-832',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '832',
        any: [/TARGET\ =\ A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '836-844',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '846-849',
        any: [/IF\ DICE\ >\ 80/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '850-862',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '863-877',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '880-883',
        any: [/;ローション自動調教/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '882',
        any: [/CALL\ COM50_AUTO/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '885',
        any: [/SETBIT\ CFLAG:A:503,\ 3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '890-918',
        any: [/@NET_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '894',
        any: [/LOCAL\ =\ 10\ \+\ FLAG:85\ \*\ 5/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '896-898',
        any: [/;気力最大値によるキャップ/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '900-902',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '904-913',
        any: [/IF\ TALENT:0:328/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '915-916',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '921-965',
        any: [/@SHOP_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '927-928',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '930',
        any: [/COST\ =\ RAND:\(CFLAG:A:9\ \/10\ \+\ 5\)\ \*\ 50/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '932-935',
        any: [/IF\ COST\ ==\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '938-939',
        any: [/COST\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '941-946',
        any: [/IF\ CFLAG:A:580\ <\ COST/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '948-949',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '951-954',
        any: [/MONEY\ \+=\ COST/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '953',
        any: [/;CFLAG:A:580\ \-=\ COST/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '957-959',
        any: [/BASE:A:0\ \+=\ COST/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '960-961',
        any: [/;気力の回復/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '962-963',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '969-1007',
        any: [/@BLACKOUT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '974-975',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '977',
        any: [/DICE\ =\ RAND:3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '979-982',
        any: [/IF\ DICE\ ==\ 2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '983-994',
        any: [/ELSEIF\ DICE\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '995-1004',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1011-1081',
        any: [/@SHOOT_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1015-1019',
        any: [/IF\ D:20\ <\ 40/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1022-1031',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1034',
        any: [/Z\ =\ RAND:3/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1036-1039',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1042-1043',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1044-1052',
        any: [/IF\ CFLAG:A:501\ ==\ 9/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1052',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1053-1064',
        any: [/ELSEIF\ CFLAG:A:501\ ==\ 8/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1063',
        any: [/CALL PARTY_DEL, A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1071',
        any: [/CALL PARTY_DEL, A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1064',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1065-1072',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1072',
        any: [/D:1\ =\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1075-1079',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1085-1118',
        any: [/@DISPELL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1089-1090',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1092',
        any: [/Z\ =\ RAND:2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1094-1097',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1100-1101',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1103-1110',
        any: [/IF\ CFLAG:A:503\ \&\ 2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1112-1116',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1121-1147',
        any: [/@OIL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1125-1126',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1128',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1130-1133',
        any: [/IF\ Z\ <\ 30/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1134-1144',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1143',
        any: [/CFLAG:A:503\ \+=\ 8/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1150-1178',
        any: [/@FIRE_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1155-1156',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1158',
        any: [/DICE\ =\ RAND:200/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1160-1163',
        any: [/IF\ DICE\ <\ 100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1164-1173',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1169',
        any: [/IF\ CFLAG:A:503\ \&\ 8/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1181-1229',
        any: [/@A_WORM_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1186-1187',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1189',
        any: [/DICE\ \ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1191-1193',
        any: [/;ヌルヌル状態で威力アップ/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1195-1198',
        any: [/IF\ DICE\ <\ 35/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1201-1202',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 3\)\ \&\&\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1204-1207',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 7\ \+\ 30/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1209-1223',
        any: [/;A経験が多いと、中に入られてしまう/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1211-1214',
        any: [/SETCOLORBYNAME\ LightSalmon/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1217',
        any: [/PLAYER\ =\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1218',
        any: [/TARGET\ =\ A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1225-1227',
        any: [/EXP:A:1\ \+=\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1232-1292',
        any: [/@LOVE_BUG_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1237-1244',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1246',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1248-1258',
        any: [/IF\ TALENT:A:314\ ==\ 6/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1257',
        any: [/RETURN\ 01/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1260-1263',
        any: [/IF\ DICE\ <\ 5/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1264-1268',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1269-1272',
        any: [/ELSE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1276-1277',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1279',
        any: [/PLAYER\ =\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1280',
        any: [/TARGET\ =\ A/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1283',
        any: [/CALL\ COM0_AUTO/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1286-1290',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1295-1346',
        any: [/@DARK_JUEL_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1300-1301',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1303',
        any: [/DICE\ =\ RAND:5\ \*\ 50/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1305-1307',
        any: [/;カルマが高いと誘惑に打ち勝つ判定/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1309-1312',
        any: [/IF\ DICE\ ==\ 0/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1315-1316',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1318-1332',
        any: [/;好奇心ボーナス/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1334-1335',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1337',
        any: [/CFLAG:A:581\ \+=\ DICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1339-1341',
        any: [/JUEL:A:6\ \+=\ DICE\ \/\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1344',
        any: [/CALL\ KARMA,\ A,\ \-1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1349-1364',
        any: [/@DEF_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1354-1355',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1357',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1359-1360',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1362',
        any: [/CFLAG:A:680\ \+=\ DICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1367-1382',
        any: [/@ATK_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1372-1373',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1375',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1377-1378',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1380',
        any: [/CFLAG:A:681\ \+=\ DICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1385-1400',
        any: [/@MAG_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1390-1391',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1393',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1395-1396',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1398',
        any: [/CFLAG:A:682\ \+=\ DICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1403-1420',
        any: [/@ALL_DOWN_TRAP/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1408-1409',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1411',
        any: [
          /DICE\ =\ \(RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\)\ \/\ 2\ \+\ 1/,
        ],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1413-1414',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1416-1418',
        any: [/CFLAG:A:680\ \+=\ DICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1422-1457',
        any: [/@SLAVE_TRAP_SET/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1427-1428',
        any: [/SIF\ CFLAG:A:500\ !=\ 2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1430',
        any: [/LOCAL\ =\ CFLAG:A:501\ \+\ 299/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1432',
        any: [/\$TRAP_LOOP_2/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1434',
        any: [/LOCAL:1\ =\ FLAG:LOCAL/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1438-1440',
        any: [/;補充/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1442-1449',
        any: [/IF\ ITEM:\(LOCAL:1\)\ >=\ 99/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1452-1455',
        any: [/LOCAL\ \+=\ 10/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1460-1520',
        any: [/@TRAP_PRICE/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1465-1518',
        any: [/SIF\ P\ ==\ 60/],
      },
      {
        src: DUNGEON_TRAP_ERB,
        ref: '1520',
        any: [/RETURN\ 100/],
      },
      // #178：DUNGEON_TOWN.ERB:645/:652（宴会风俗的爱抚自动调教）复用本域内存根
      { src: DUNGEON_TOWN_ERB, ref: '645', any: [/CALL COM0_AUTO/] },
      { src: DUNGEON_TOWN_ERB, ref: '652', any: [/CALL COM0_AUTO/] },
    ],
  },
  // —— #181 H12 2D 地下城：ere/dungeon/labo.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo.js',
    refs: [
      { src: SYSTEM, ref: '67', any: [/\tCALL GEO_TEST/] },
      { src: LABO, ref: '3-40', any: [/@LABO/] },
      { src: LABO, ref: '6', any: [/PRINTL ----------/] },
      { src: LABO, ref: '7', any: [/PRINTL \[LABORATORY\]/] },
      { src: LABO, ref: '8', any: [/PRINTL \[001\] 文字色彩测试/] },
      { src: LABO, ref: '9', any: [/PRINTL \[004\] GEO_MAKE/] },
      { src: LABO, ref: '10', any: [/PRINTL \[005\] GEO_OUTPUT/] },
      { src: LABO, ref: '11', any: [/PRINTL \[006\] GEO清除/] },
      { src: LABO, ref: '12', any: [/PRINTL \[007\] 图片测试/] },
      { src: LABO, ref: '13', any: [/PRINTL \[008\] 头像测试/] },
      { src: LABO, ref: '14', any: [/PRINTL \[100\] 返回/] },
      { src: LABO, ref: '15', any: [/INPUT/] },
      { src: LABO, ref: '17-18', any: [/CASE 100/] },
      { src: LABO, ref: '20', any: [/	CALL COLOR_OUTPUT_TEST/] },
      { src: LABO, ref: '26', any: [/	CALL GEO_TEST/] },
      { src: LABO, ref: '28', any: [/	CALL GEO_OUTPUT/] },
      { src: LABO, ref: '30', any: [/	CALL DA_CLEAR/] },
      { src: LABO, ref: '32', any: [/	PRINT_IMG "HEART_R"/] },
      { src: LABO, ref: '33', any: [/	PRINTL/] },
      { src: LABO, ref: '35', any: [/	CALL U_FACE/] },
      { src: LABO, ref: '42-48', any: [/@DA_CLEAR/] },
      { src: LABO, ref: '50-55', any: [/@COLOR_OUTPUT_TEST/] },
      { src: LABO, ref: '54', any: [/PRINTL /] },
      { src: LABO, ref: '57-93', any: [/@C_OUT,ARG:0/] },
      { src: LABO, ref: '86', any: [/	CASEELSE/] },
      { src: LABO, ref: '86-87', any: [/	CASEELSE/] },
      { src: LABO, ref: '90', any: [/PRINT ,/] },
      { src: LABO, ref: '96-107', any: [/@GEO_OUTPUT/] },
      { src: LABO, ref: '106', any: [/	PRINTL /] },
      { src: LABO, ref: '109-240', any: [/@GEO_TEST/] },
      { src: LABO, ref: '110-128', any: [/;------------------------------/] },
      { src: LABO, ref: '128', any: [/;------------------------------/] },
      { src: LABO, ref: '132-134', any: [/;正方形を作る/] },
      { src: LABO, ref: '133', any: [/LOCAL:3 = 5/] },
      { src: LABO, ref: '136', any: [/LOCAL:4 = \(LOCAL:3 - 1\) \* 8/] },
      { src: LABO, ref: '147-158', any: [/FOR \(LOCAL:6\),0,LOCAL:3/] },
      { src: LABO, ref: '165-181', any: [/FOR LOCAL:10,0,LOCAL:3/] },
      {
        src: LABO,
        ref: '175-178',
        any: [/		FOR LOCAL:5,\(LOCAL:0 \+ 1\),\(LOCAL:0 \+ 8\)/],
      },
      { src: LABO, ref: '185-201', any: [/FOR LOCAL:11,0,LOCAL:3/] },
      { src: LABO, ref: '207-240', any: [/FOR LOCAL:11,0,LOCAL:3 - 1/] },
      {
        src: LABO,
        ref: '218-224',
        any: [/		LOCAL:12 = DA:\(LOCAL:1\):\(LOCAL:0\)/],
      },
      {
        src: LABO,
        ref: '232',
        any: [
          /				CALL GEO_CALC_INTERP\( LOCAL:12,LOCAL:13,LOCAL:14,LOCAL:15,\(LOCAL:5-LOCAL:0\),\(LOCAL:6-LOCAL:1\),LOCAL:5,LOCAL:6 \)/,
        ],
      },
      {
        src: LABO,
        ref: '243-296',
        any: [
          /@GEO_CALC_INTERP\(ARG:0,ARG:1,ARG:2,ARG:3,ARG:4,ARG:5,ARG:6,ARG:7\)/,
        ],
      },
      {
        src: LABO,
        ref: '295',
        any: [
          /DA:\(ARG:7\):\(ARG:6\) = \(ARG:0-ARG:1-ARG:2\+ARG:3\)\*\(LOCAL:0\)\*\(LOCAL:1\)\/10000 \+ \(ARG:1-ARG:0\)\*\(LOCAL:0\)\/100 \+ \(ARG:2-ARG:0\)\*\(LOCAL:1\)\/100 \+ ARG:0/,
        ],
      },
      {
        src: LABO,
        ref: '299-330',
        any: [/@LINEAR_INTERP_COS_X\(ARG:0,ARG:1,ARG:2,ARG:3\)/],
      },
      {
        src: LABO,
        ref: '333-364',
        any: [/@LINEAR_INTERP_COS_Y\(ARG:0,ARG:1,ARG:2,ARG:3\)/],
      },
      { src: LABO, ref: '335', any: [/;X軸上の補完/] },
      { src: LABO, ref: '366', any: [/@U_FACE/] },
    ],
  },
  // —— #181 H12 2D 地下城：ere/dungeon/labo-map.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo-map.js',
    refs: [
      { src: LABO_MAP, ref: '6-23', any: [/@GEO_OUTPUT_2/] },
      { src: LABO_MAP, ref: '9', any: [/SETFONT "ＭＳ ゴシック"/] },
      { src: LABO_MAP, ref: '18', any: [/	PRINTL /] },
      { src: LABO_MAP, ref: '21', any: [/SETFONT/] },
      { src: LABO_MAP, ref: '23', any: [/WAIT/] },
      { src: LABO_MAP, ref: '26-47', any: [/@UNIT_CHECK/] },
      {
        src: LABO_MAP,
        ref: '33-34',
        any: [/	SIF CFLAG:COUNT:1 != 2 && CFLAG:COUNT:1 != 3/],
      },
      { src: LABO_MAP, ref: '36-37', any: [/	SIF X < 0/] },
      { src: LABO_MAP, ref: '39-40', any: [/	SIF Y < 0/] },
      { src: LABO_MAP, ref: '42-43', any: [/	SIF X == P:0 && Y == P:1/] },
      { src: LABO_MAP, ref: '47', any: [/RETURN -1/] },
      { src: LABO_MAP, ref: '51-77', any: [/@MON_CHECK/] },
      {
        src: LABO_MAP,
        ref: '59-60',
        any: [/SIF LOCAL:0 <= 0 \|\| LOCAL:0 >= 10/],
      },
      { src: LABO_MAP, ref: '72-73', any: [/SIF LOCAL:1 > 20/] },
      { src: LABO_MAP, ref: '75', any: [/DB:\(P:1\):\(P:0\) = 0/] },
      { src: LABO_MAP, ref: '80-91', any: [/@VIL_CHECK/] },
      { src: LABO_MAP, ref: '88-89', any: [/SIF X <= 0/] },
      { src: LABO_MAP, ref: '95-139', any: [/@CHIP_DRAW/] },
      { src: LABO_MAP, ref: '100-104', any: [/IF P:0 == 16 && P:1 == 16/] },
      { src: LABO_MAP, ref: '106', any: [/CALL UNIT_CHECK/] },
      { src: LABO_MAP, ref: '108-112', any: [/	IF CFLAG:RESULT:1 == 2/] },
      { src: LABO_MAP, ref: '113-115', any: [/	ELSE/] },
      { src: LABO_MAP, ref: '121', any: [/CALL MON_CHECK/] },
      { src: LABO_MAP, ref: '123', any: [/	CALL C_OUT_MON\(RESULT\)/] },
      { src: LABO_MAP, ref: '127-131', any: [/CALL VIL_CHECK/] },
      {
        src: LABO_MAP,
        ref: '134-135',
        any: [/LOCAL:2 = DA:\(P:1\):\(P:0\)\/32/],
      },
      { src: LABO_MAP, ref: '142-159', any: [/@SET_VIL/] },
      {
        src: LABO_MAP,
        ref: '154-155',
        any: [/	SIF LOCAL:0 == 16 && LOCAL:1 == 16/],
      },
      { src: LABO_MAP, ref: '162-181', any: [/@MON_LIMIT/] },
      { src: LABO_MAP, ref: '176-177', any: [/SIF LOCAL:2 <= 120/] },
      { src: LABO_MAP, ref: '179', any: [/PRINTL \*怪物的配置到极限了\*/] },
      { src: LABO_MAP, ref: '183-228', any: [/@C_OUT_MON,ARG:0/] },
      { src: LABO_MAP, ref: '221-222', any: [/	CASEELSE/] },
    ],
  },
  // —— #181 H12 2D 地下城：ere/dungeon/labo-dungeon-map.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo-dungeon-map.js',
    refs: [
      { src: LABO_DUNGEON_MAP, ref: '1-3', any: [/﻿;フィールドでの戦闘/] },
      { src: LABO_DUNGEON_MAP, ref: '5-78', any: [/@DUNGEON_MAP/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '7-12',
        any: [/;迎撃時体力が回復していると迎撃再開/],
      },
      { src: LABO_DUNGEON_MAP, ref: '14-15', any: [/;フラグオフ/] },
      { src: LABO_DUNGEON_MAP, ref: '17', any: [/CALL UNIT_MOVE/] },
      { src: LABO_DUNGEON_MAP, ref: '19', any: [/BASE:A:1 -= RAND:6/] },
      { src: LABO_DUNGEON_MAP, ref: '21-28', any: [/;帰還するかどうか/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '23',
        any: [/	PRINTFORML %SAVESTR:A%決定返回了/],
      },
      {
        src: LABO_DUNGEON_MAP,
        ref: '26',
        any: [/	PRINTFORML %SAVESTR:A%決定返回了/],
      },
      { src: LABO_DUNGEON_MAP, ref: '27', any: [/	CFLAG:A:507 = 1/] },
      { src: LABO_DUNGEON_MAP, ref: '29-30', any: [/SIF RAND:5 == 0/] },
      { src: LABO_DUNGEON_MAP, ref: '32-34', any: [/;宝箱を見つける/] },
      { src: LABO_DUNGEON_MAP, ref: '36-37', any: [/;アイテムの使用/] },
      { src: LABO_DUNGEON_MAP, ref: '39-40', any: [/;移動を反映/] },
      { src: LABO_DUNGEON_MAP, ref: '42-74', any: [/;休憩フェイズ/] },
      { src: LABO_DUNGEON_MAP, ref: '44-48', any: [/;装備効果\(キャンプ\)/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '50-54',
        any: [/;装備効果\(キャンプ禁止\)/],
      },
      {
        src: LABO_DUNGEON_MAP,
        ref: '56-74',
        any: [/IF CFLAG:A:1 == 2 && CFLAG:A:503 & 1/],
      },
      { src: LABO_DUNGEON_MAP, ref: '58', any: [/		PRINTL  /] },
      { src: LABO_DUNGEON_MAP, ref: '59', any: [/		DRAWLINE/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '60',
        any: [/		PRINTFORMW %SAVESTR:A%藏起來休息了/],
      },
      { src: LABO_DUNGEON_MAP, ref: '61', any: [/		DRAWLINE/] },
      { src: LABO_DUNGEON_MAP, ref: '62', any: [/		PRINTL /] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '64',
        any: [/ELSEIF CFLAG:A:1 == 2 && CFLAG:A:503 & 1/],
      },
      {
        src: LABO_DUNGEON_MAP,
        ref: '68',
        any: [/		PRINTFORMW %SAVESTR:A%在安全的地方紮營，休息了/],
      },
      { src: LABO_DUNGEON_MAP, ref: '69-73', any: [/		DRAWLINE/] },
      { src: LABO_DUNGEON_MAP, ref: '72-73', any: [/ELSEIF CFLAG:A:1 == 3/] },
      { src: LABO_DUNGEON_MAP, ref: '75-76', any: [/SIF FLAG:5 & 32/] },
      { src: LABO_DUNGEON_MAP, ref: '77', any: [/TARGET = -1/] },
      { src: LABO_DUNGEON_MAP, ref: '83-235', any: [/@UNIT_MOVE/] },
      { src: LABO_DUNGEON_MAP, ref: '85-89', any: [/IF CFLAG:A:507 == 0/] },
      { src: LABO_DUNGEON_MAP, ref: '92-95', any: [/W:8 = 17/] },
      { src: LABO_DUNGEON_MAP, ref: '98-101', any: [/W:8 = 19/] },
      { src: LABO_DUNGEON_MAP, ref: '101', any: [/	X \/= 2/] },
      { src: LABO_DUNGEON_MAP, ref: '103-111', any: [/IF CFLAG:A:509 == 1/] },
      { src: LABO_DUNGEON_MAP, ref: '113-118', any: [/IF CFLAG:A:1 == 2/] },
      { src: LABO_DUNGEON_MAP, ref: '130-138', any: [/IF D:20 < 0/] },
      { src: LABO_DUNGEON_MAP, ref: '139-148', any: [/ELSEIF D:20 > 10/] },
      { src: LABO_DUNGEON_MAP, ref: '140', any: [/	D:20 \/= 10/] },
      { src: LABO_DUNGEON_MAP, ref: '151-155', any: [/;領域外を避ける/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '157-161',
        any: [/LOCAL:10 = DA:\(LOCAL:1\):\(LOCAL:0\)\/32/],
      },
      {
        src: LABO_DUNGEON_MAP,
        ref: '171-177',
        any: [/IF LOCAL:0 == 16 && LOCAL:1 == 16/],
      },
      { src: LABO_DUNGEON_MAP, ref: '172', any: [/	CFLAG:A:501 = 2/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '174',
        any: [/	PRINTL 這裡就是魔王城了嗎………/],
      },
      { src: LABO_DUNGEON_MAP, ref: '175', any: [/					JUMP ENDING_2/] },
      { src: LABO_DUNGEON_MAP, ref: '179-202', any: [/CALL UNIT_CHECK/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '181-183',
        any: [/	IF CFLAG:RESULT:1 == CFLAG:A:1/],
      },
      {
        src: LABO_DUNGEON_MAP,
        ref: '184-199',
        any: [/	ELSEIF CFLAG:RESULT:1 == 2/],
      },
      { src: LABO_DUNGEON_MAP, ref: '187', any: [/		CALL DUNGEON_BATTLE2/] },
      { src: LABO_DUNGEON_MAP, ref: '189-195', any: [/		IF RESULT == 2/] },
      { src: LABO_DUNGEON_MAP, ref: '189-199', any: [/		IF RESULT == 2/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '192',
        any: [/			PRINTFORMW 得到了\{1000 \* CFLAG:B:9\}G！/],
      },
      { src: LABO_DUNGEON_MAP, ref: '197', any: [/			TARGET = -1/] },
      { src: LABO_DUNGEON_MAP, ref: '198', any: [/			RETURN 0/] },
      { src: LABO_DUNGEON_MAP, ref: '205-222', any: [/CALL MON_CHECK/] },
      { src: LABO_DUNGEON_MAP, ref: '208-209', any: [/	SIF CFLAG:A:1 == 3/] },
      { src: LABO_DUNGEON_MAP, ref: '211', any: [/	CALL DUNGEON_BATTLE/] },
      { src: LABO_DUNGEON_MAP, ref: '213', any: [/	IF CFLAG:A:1 != 2/] },
      { src: LABO_DUNGEON_MAP, ref: '213-220', any: [/	IF CFLAG:A:1 != 2/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '216',
        any: [/		PRINTFORML 得到了\{1000 \* CFLAG:A:9\}G！/],
      },
      { src: LABO_DUNGEON_MAP, ref: '226-227', any: [/CFLAG:A:510 = P:0/] },
      { src: LABO_DUNGEON_MAP, ref: '229-233', any: [/IF D:20 < 0/] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '238-247',
        any: [/@CONFIG_LABO_MAP_STATUS/],
      },
      { src: LABO_DUNGEON_MAP, ref: '243', any: [/		PRINT ２Ｄ/] },
      { src: LABO_DUNGEON_MAP, ref: '245', any: [/		PRINT 普通/] },
      { src: LABO_DUNGEON_MAP, ref: '247', any: [/PRINTL /] },
      {
        src: LABO_DUNGEON_MAP,
        ref: '250-270',
        any: [/@CONFIG_LABO_MAP_SETTING/],
      },
      { src: LABO_DUNGEON_MAP, ref: '253', any: [/PRINTL \[0\]普通/] },
      { src: LABO_DUNGEON_MAP, ref: '254', any: [/PRINTL \[1\]２Ｄ/] },
      { src: LABO_DUNGEON_MAP, ref: '255', any: [/DRAWLINE/] },
      { src: LABO_DUNGEON_MAP, ref: '256', any: [/PRINTL \[100\] 返回/] },
      { src: LABO_DUNGEON_MAP, ref: '259', any: [/	INPUT/] },
      { src: LABO_DUNGEON_MAP, ref: '261-265', any: [/		CASE 0 TO 1/] },
      { src: LABO_DUNGEON_MAP, ref: '266-267', any: [/		CASE 100/] },
      { src: LABO_DUNGEON_MAP, ref: '269', any: [/	CLEARLINE 1/] },
      { src: LABO_DUNGEON_MAP, ref: '273-281', any: [/@LABO_MAP_SET/] },
      { src: LABO_DUNGEON_MAP, ref: '275', any: [/CALL GEO_TEST/] },
      { src: LABO_DUNGEON_MAP, ref: '275-281', any: [/CALL GEO_TEST/] },
      { src: LABO_DUNGEON_MAP, ref: '276', any: [/CALL SET_VIL/] },
      { src: LABO_DUNGEON_MAP, ref: '277-281', any: [/FOR LOCAL:0,0,50/] },
    ],
  },
  // —— #181 H12 2D 地下城（新增引用，该文件其余引用见豁免表）：ere/event/event-first.js ——
  {
    js: 'ere/event/event-first.js',
    refs: [
      { src: SYSTEM, ref: '67', any: [/	CALL GEO_TEST/] },
      { src: SYSTEM, ref: '68', any: [/	CALL SET_VIL/] },
    ],
  },
  // —— #181 H12 2D 地下城（新增引用，该文件其余引用见豁免表）：ere/event/first-setting.js ——
  {
    js: 'ere/event/first-setting.js',
    refs: [
      { src: SYSTEM, ref: '16-17', any: [/;初期奴隷の初期値は村娘/] },
      { src: SYSTEM, ref: '781-935', any: [/@FIRST_SETTING/] },
      { src: SYSTEM, ref: '787-864', any: [/\$INPUT_LOOP/] },
      {
        src: SYSTEM,
        ref: '833',
        any: [/PRINT \[4\] 地下城模式 \[锐意制作中\] ： /],
      },
      { src: SYSTEM, ref: '909-915', any: [/ELSEIF RESULT == 3/] },
      { src: SYSTEM, ref: '911', any: [/	;初期奴隷/] },
      { src: SYSTEM, ref: '912', any: [/	PRINTL \[0\] 随机  \[1\] 村娘/] },
      { src: SYSTEM, ref: '913', any: [/	INPUT/] },
      { src: SYSTEM, ref: '914-915', any: [/	SIF RESULT >= 0 && RESULT <= 1/] },
      { src: SYSTEM, ref: '918-924', any: [/ELSEIF RESULT == 4/] },
      { src: SYSTEM, ref: '919', any: [/	;モード/] },
      { src: SYSTEM, ref: '920', any: [/	PRINTL \[0\] 普通  \[1\] 2D/] },
      { src: SYSTEM, ref: '921', any: [/	INPUT/] },
      { src: SYSTEM, ref: '923', any: [/	SIF RESULT >= 0 && RESULT <= 1/] },
      { src: SYSTEM, ref: '924', any: [/		FLAG:502 = RESULT/] },
    ],
  },
  {
    js: 'ere/dungeon/dungeon-room.js',
    refs: [
      {
        src: DUNGEON_ROOM_ERB,
        ref: '1',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '2-73',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '9-14',
        any: [/IF CFLAG:\(ARG:0\):1 == 3/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '14-22',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '16-18',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '20-26',
        any: [/CALL DUNGEON_SHOP_ITEMSELL/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '21', any: [/IF RAND:10 == 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '32-50',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '33-38',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '37',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '40',
        any: [/ROOMID = CFLAG:\(ARG:0\):501 \+ 349/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '40-48',
        any: [/ROOMID = CFLAG:\(ARG:0\):501 \+ 349/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '42-44', any: [/SIF FLAG:ROOMID <= 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '45', any: [/ROOM = FLAG:ROOMID/] },
      { src: DUNGEON_ROOM_ERB, ref: '46-48', any: [/EXTRA = FLAG:ROOMID/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '55-71',
        any: [/CALL DUNGEON_FARM_RESCUE, EXTRA/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '60',
        any: [/CALL DUNGEON_FARM_RESCUE, EXTRA/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '73', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '76-141',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '82-84',
        any: [/;SHOP_2\.ERB@INTERCEPTにも必要な設定があります/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '87-89', any: [/SIF CFLAG:A:500 != 3/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '91',
        any: [/ROOMID = CFLAG:A:501 \+ 349/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '93-95', any: [/SIF FLAG:ROOMID <= 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '97-103', any: [/EXTRA = FLAG:ROOMID/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '105',
        any: [/;確率を弄る場合ここのランダムを弄る/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '107-111', any: [/FLAG:ROOMID \+= 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '111', any: [/FLAG:ROOMID \+= 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '111-122', any: [/ELSEIF RAND:3 == 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '112-116', any: [/ELSEIF RAND:3 == 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '116', any: [/FLAG:ROOMID \+= 2/] },
      { src: DUNGEON_ROOM_ERB, ref: '117-118', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '121-135',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '121-137',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '122', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '123-135',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '136',
        any: [/printformw %SAVESTR:A%的工作变为内职了。/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '139', any: [/CFLAG:A:500 = 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '141', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '145-167',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '151', any: [/FOR ROOMID, 350, 359/] },
      { src: DUNGEON_ROOM_ERB, ref: '153', any: [/ROOM = FLAG:ROOMID/] },
      { src: DUNGEON_ROOM_ERB, ref: '155-156', any: [/EXTRA = FLAG:ROOMID/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '159-163',
        any: [/CALL DUNGEON_SHOP_DAY, EXTRA/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '160',
        any: [/CALL DUNGEON_SHOP_DAY, EXTRA/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '162', any: [/CALL DUNGEON_FARM, EXTRA/] },
      { src: DUNGEON_ROOM_ERB, ref: '167', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '170-265',
        any: [
          /printformw %SAVESTR:A%在商店街尽情地大吃大喝…（体力\+20、气力\+50）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '173',
        any: [/;商店街。僅かながら現金収入/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '174-175', any: [/;拡張\& 1=武具屋/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '178-189',
        any: [/PRINTFORML 是商店街型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '179', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '180-188',
        any: [/PRINTFORML 是商店街型地下城/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '191',
        any: [/COST = \(CFLAG:A:9 \* 5\)\+10/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '193-218',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '196',
        any: [/printformw %SAVESTR:A%找到了武器店…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '199',
        any: [/COST = \(CFLAG:A:9 \* 8\)\+20/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '203',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '208',
        any: [/CALL ADD_EX_ITEM, \-2, A, 1/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '210',
        any: [/PRINTFORMW 现金收入\+\{COST\}/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '213', any: [/MONEY \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '214', any: [/EX_FLAG:4444 \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '215', any: [/CFLAG:A:580 \-= COST/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '219-244',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '222',
        any: [/printformw %SAVESTR:A%找到了道具店…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '225',
        any: [/COST = \(CFLAG:A:9 \* 6\)\+20/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '229',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '234',
        any: [/CALL ADD_EX_ITEM, \-3, A, 1/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '236',
        any: [/printformw 现金收入\+\{COST\}/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '239', any: [/MONEY \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '240', any: [/EX_FLAG:4444 \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '241', any: [/CFLAG:A:580 \-= COST/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '247-252',
        any: [/printformw %SAVESTR:A%带的钱不够，在商店街边走边叹气……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '249',
        any: [/printformw %SAVESTR:A%带的钱不够，在商店街边走边叹气……/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '254', any: [/MONEY \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '255', any: [/EX_FLAG:4444 \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '256', any: [/CFLAG:A:580 \-= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '257', any: [/BASE:A:0 \+= 20/] },
      { src: DUNGEON_ROOM_ERB, ref: '258', any: [/BASE:A:1 \+= 50/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '261',
        any: [
          /printformw %SAVESTR:A%在商店街尽情地大吃大喝…（体力\+20、气力\+50）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '262',
        any: [/printformw 现金收入\+\{COST\}/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '265', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '268-325',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '271-272',
        any: [
          /;不思議のダンジョン系で床にアイテム置いて売ってるやつのイメージ/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '275-279',
        any: [/COST = \(CFLAG:A:9 \* 6\)\+50/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '282', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '283',
        any: [
          /PRINTFORML %SAVESTR:A%发现了一间不可思议的房间，里面有着陈列架和柜台，正在卖着东西……/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '286-293',
        any: [
          /PRINTFORMW 很反感魔王的%SAVESTR:A%从店主处拿到了赞助……（资金\+500）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '289',
        any: [
          /PRINTFORMW 很反感魔王的%SAVESTR:A%从店主处拿到了赞助……（资金\+500）/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '291', any: [/JUEL:A:100 \-= 500/] },
      { src: DUNGEON_ROOM_ERB, ref: '292', any: [/CFLAG:A:580 \+= 500/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '295-302',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '298',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '300',
        any: [/EXP:A:80 \+= MARK:A:3 \* 1000/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '301', any: [/MARK:A:3 \-= 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '304-305', any: [/CALL SELL_EX_ITEM,A/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '307-312',
        any: [/PRINTFORML %SAVESTR:A%带的钱不够，眼巴巴地在店里转了一圈……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '309',
        any: [/PRINTFORML %SAVESTR:A%带的钱不够，眼巴巴地在店里转了一圈……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '314-322',
        any: [/SIF FLAG:5 \& 32 \&\& RESULT > 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '316',
        any: [/PRINTFORML 现金收入\+\{COST\}/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '319', any: [/MONEY \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '320', any: [/EX_FLAG:4444 \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '321', any: [/CFLAG:A:580 \-= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '325', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '328-368',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '331-337',
        any: [/INCOME = CFLAG:0:9 \* \(RAND:10 \+ 5\)/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '332-333', any: [/;拡張\& 1=武具屋/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '335',
        any: [/INCOME = CFLAG:0:9 \* \(RAND:10 \+ 5\)/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '337-341',
        any: [/INCOME \+= CFLAG:0:9 \+ 20/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '342-361',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '343',
        any: [/PRINTL 威望值是【岌岌可危】/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '343-363',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '344', any: [/INCOME = 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '346',
        any: [/PRINTL 威望值是【动荡不安】/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '347', any: [/PRINTW 収入减少/] },
      { src: DUNGEON_ROOM_ERB, ref: '348-349', any: [/INCOME \/= 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '351',
        any: [/PRINTl 威望值是【略受质疑】/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '352-353', any: [/INCOME \*= 3/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '355',
        any: [/PRINTl 威望值是【相安无事】/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '356-357', any: [/INCOME \*= 6/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '359',
        any: [/PRINTl 威望值是【广受爱戴】/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '360', any: [/INCOME \*= 2/] },
      { src: DUNGEON_ROOM_ERB, ref: '362', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '363',
        any: [/printformw 从商店街征收了今天的税金。（现金收入\+\{INCOME\}）/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '365', any: [/MONEY \+= INCOME/] },
      { src: DUNGEON_ROOM_ERB, ref: '366', any: [/EX_FLAG:4444 \+= INCOME/] },
      { src: DUNGEON_ROOM_ERB, ref: '368', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '371-414',
        any: [/printformw %SAVESTR:A%走在毒沼中………（\{DMG\}点伤害！）/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '374',
        any: [/;沼地。機能していないようなので毒沼に変更/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '379-390',
        any: [/PRINTFORML 是毒沼型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '380', any: [/PRINTL/] },
      { src: DUNGEON_ROOM_ERB, ref: '386', any: [/print ：毒草/] },
      { src: DUNGEON_ROOM_ERB, ref: '392', any: [/DMG = CFLAG:0:9 \+ 10/] },
      { src: DUNGEON_ROOM_ERB, ref: '394-397', any: [/DMG \+= CFLAG:A:9/] },
      { src: DUNGEON_ROOM_ERB, ref: '399-402', any: [/DMG \+= FLAG:85 \* 2/] },
      { src: DUNGEON_ROOM_ERB, ref: '404', any: [/BASE:A:0 \-= DMG/] },
      { src: DUNGEON_ROOM_ERB, ref: '406-408', any: [/SIF BASE:A:0 < 1/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '411',
        any: [/printformw %SAVESTR:A%走在毒沼中………（\{DMG\}点伤害！）/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '414', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '417-648',
        any: [
          /PRINTFORML 人类牧场的肉便器生了\{FLAG:83\}只%ITEMNAME:MON_ID%。/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '424',
        any: [/;怪物が増える。ターン終了時効果/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '428-430', any: [/SIF FLAG:83 <= 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '429-430', any: [/SIF FLAG:83 <= 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '432', any: [/;20160524改変/] },
      { src: DUNGEON_ROOM_ERB, ref: '434-437', any: [/SELL_BABY = RESULT/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '439-440',
        any: [/CALL RAND_MONSTER_NUMBER/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '439-449',
        any: [/ELSEIF MON_NUM \+ FLAG:83 > 999/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '441', any: [/MON_NUM = ITEM:MON_ID/] },
      { src: DUNGEON_ROOM_ERB, ref: '443', any: [/MONEY \+= FLAG:83 \* 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '444',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '445-446',
        any: [/ELSEIF MON_NUM \+ FLAG:83 > 999/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '448', any: [/MON_NUM \+= FLAG:83/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '451-461',
        any: [
          /PRINTW 监督的淫魔温柔地催促着，俘虏少年将充满年轻气息的浓厚精液注入了肉便器……/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '453',
        any: [/PRINTL 「播种的大叔们好好努力让便器们怀孕啊\~」/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '454',
        any: [
          /PRINTW 监督的淫魔踹着俘虏中年的腰，中年将腥臭的精液大量注入了肉便器……/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '456',
        any: [
          /PRINTL 「小鸡鸡奴隶少年们，加把劲啊。把分配的播种任务完成就行了。」/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '457',
        any: [
          /PRINTW 监督的淫魔温柔地催促着，俘虏少年将充满年轻气息的浓厚精液注入了肉便器……/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '459',
        any: [/PRINTL 「怀孕吧！　怀上吧！　啊哈哈哈，怀孕吧！」/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '460',
        any: [/PRINTW 扶她淫魔的媚药精液不断地注入肉便器中……/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '463-620',
        any: [/ELSEIF FLAG:83 > 80  \&\& RAND:5 == 0/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '464-465', any: [/SIF LOCAL:0 >= 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '470-471',
        any: [/;1の位はランダムパターン/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '473-480',
        any: [/ELSEIF ARG:0 \& 2 \&\& RAND:5 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '482-493',
        any: [/ELSEIF FLAG:83 > 80  \&\& RAND:5 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '495-616',
        any: [/PRINT 「求求你们放过我吧……已经…不想再生…不想再生啦！……」/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '495-618',
        any: [/PRINT 「求求你们放过我吧……已经…不想再生…不想再生啦！……」/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '618', any: [/PRINT/] },
      { src: DUNGEON_ROOM_ERB, ref: '622', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '624-625',
        any: [
          /PRINTFORML 人类牧场的肉便器生了\{FLAG:83\}只%ITEMNAME:MON_ID%。/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '627',
        any: [/SIF LOG_OFF == 0 \&\& SELL_BABY == 1/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '627-630',
        any: [
          /PRINTFORML 将人类牧场的肉便器生下的孩子卖了\{FLAG:83 \* 10\}G。/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '628',
        any: [
          /PRINTFORML 将人类牧场的肉便器生下的孩子卖了\{FLAG:83 \* 10\}G。/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '629', any: [/MONEY \+= FLAG:83 \* 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '629-630',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '630',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '631-636',
        any: [/PRINTFORML 出售从肉便器挤出的乳汁得到了\{FLAG:83\}G。/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '634', any: [/MONEY \+= FLAG:83/] },
      { src: DUNGEON_ROOM_ERB, ref: '635', any: [/EX_FLAG:4444 \+= FLAG:83/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '638-642',
        any: [
          /PRINTFORML 原本是勇者的扶她奴隶侵犯着肉便器，淫欲转化成了\{FLAG:83\}经验值。/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '641', any: [/EXP:0:80 \+= FLAG:83/] },
      { src: DUNGEON_ROOM_ERB, ref: '644-645', any: [/SIF LOG_OFF == 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '647', any: [/ITEM:MON_ID = MON_NUM/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '650',
        any: [/@DUNGEON_FARM_RESCUE, ARG:0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '650-680',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '653-654',
        any: [/;拡張\& 2=扶她種付け奴隷/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '656-667',
        any: [/PRINTFORML 是人类牧场型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '657', any: [/PRINTL/] },
      { src: DUNGEON_ROOM_ERB, ref: '669-671', any: [/SIF FLAG:83 <= 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '674',
        any: [/PRINTFORMW 勇者发现了一个可悲的肉便器，并且将其解放。/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '677',
        any: [/SIF CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '677-678',
        any: [/SIF CFLAG:\(ARG:0\):1 != 12/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '680', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '683-735',
        any: [
          /printform %SAVESTR:A%在冰室的严寒中哆嗦着身体………（攻击力下降一成！）/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '686', any: [/;勇者の攻撃力が1割下がる/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '691-702',
        any: [/PRINTFORML 是冰封型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '692', any: [/PRINTL/] },
      { src: DUNGEON_ROOM_ERB, ref: '704', any: [/MDMG = 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '706-714',
        any: [/IF CFLAG:A:LOCAL > 0 \&\& FLAG:5 \& 32/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '709-711',
        any: [/CALL EX_ITEM_NAME,CFLAG:A:LOCAL/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '713', any: [/CFLAG:A:LOCAL = 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '716-718', any: [/CFLAG:A:11 \/= 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '720-722',
        any: [/MDMG \+= CFLAG:0:9 \+ 2/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '724', any: [/BASE:A:1 \-= MDMG/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '727-729',
        any: [
          /printform %SAVESTR:A%在冰室的严寒中哆嗦着身体………（攻击力下降一成！）/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '730', any: [/PRINTW/] },
      { src: DUNGEON_ROOM_ERB, ref: '735', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '738-801',
        any: [
          /PRINTFORML %SAVESTR:A%由于热砂的暑气，集中力下降了……（防御力下降一成！）/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '741', any: [/;勇者の防御力が1割下がる/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '746-757',
        any: [/PRINTFORML 是灼热型的地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '747', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '759-776',
        any: [/PRINTFORML 发现了绿洲………（气力50回复！亲密度上升！）/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '763', any: [/BASE:A:1 \+= 50/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '764-765',
        any: [/SIF BASE:A:1 > MAXBASE:A:1/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '768',
        any: [/PRINTFORML 发现了绿洲………（气力50回复！亲密度上升！）/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '769',
        any: [/PRINTFORMW 屈服点数\+\{CFLAG:0:9 \* 4\}/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '772-773',
        any: [/JUEL:TARGET:6 \+= CFLAG:0:9 \* 4/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '775', any: [/RETURN 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '778', any: [/DMG = 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '780-781', any: [/CFLAG:A:12 \/= 10/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '783-785',
        any: [/DMG \+= CFLAG:0:9 \+ 10/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '787', any: [/BASE:A:0 \-= DMG/] },
      { src: DUNGEON_ROOM_ERB, ref: '789-791', any: [/SIF BASE:A:0 < 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '794', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '795-797',
        any: [
          /PRINTFORML %SAVESTR:A%由于热砂的暑气，集中力下降了……（防御力下降一成！）/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '798', any: [/PRINTW/] },
      { src: DUNGEON_ROOM_ERB, ref: '801', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '804-846',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      { src: DUNGEON_ROOM_ERB, ref: '807', any: [/;たまに迷う/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '812-823',
        any: [/PRINTFORML 是迷宫型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '813', any: [/PRINTL/] },
      { src: DUNGEON_ROOM_ERB, ref: '825-830', any: [/SIF ARG:0 \& 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '832-833', any: [/SIF RAND:3 < 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '835', any: [/D:20 \-= BACK/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '838',
        any: [/printformw %SAVESTR:A%在迷宫里迷路了………/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '840',
        any: [/printform 突然发现走了回头路！/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '841', any: [/PRINTW/] },
      { src: DUNGEON_ROOM_ERB, ref: '844', any: [/CFLAG:A:509 = 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '846', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '849-912',
        any: [
          /PRINTFORML %SAVESTR:A%看到了勇者们変成的装饰品，发自内心地颤抖着………（气力\-\{MDMG\}）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '853',
        any: [/;石像と剥製の数に応じて最大1\/4気力が減る/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '859-870',
        any: [/PRINTFORML 是博物馆型地下城/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '860', any: [/PRINTL/] },
      { src: DUNGEON_ROOM_ERB, ref: '872-874', any: [/SIF FLAG:84 <= 0/] },
      { src: DUNGEON_ROOM_ERB, ref: '876-880', any: [/MDMG = FLAG:84 \* 5/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '882-883',
        any: [/SIF MDMG > \(MAXBASE:A:1 \/ 4\)/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '886',
        any: [
          /PRINTFORML %SAVESTR:A%看到了勇者们変成的装饰品，发自内心地颤抖着………（气力\-\{MDMG\}）/,
        ],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '888',
        any: [/PRINTFORML 用牺牲者制作成的魔像发起了攻击！（\{DMG\}伤害！）/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '889', any: [/PRINTW/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '892-902',
        any: [/PRINTFORMW 远程攻击被柜子妨碍……（无法先发制人）/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '895',
        any: [/PRINTFORMW 远程攻击被柜子妨碍……（无法先发制人）/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '898',
        any: [/PRINTL 已经无法先发制人了。/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '900', any: [/CFLAG:A:503 \+= 32/] },
      { src: DUNGEON_ROOM_ERB, ref: '904', any: [/BASE:A:1 \-= MDMG/] },
      { src: DUNGEON_ROOM_ERB, ref: '905-906', any: [/BASE:A:0 \-= DMG/] },
      { src: DUNGEON_ROOM_ERB, ref: '908-910', any: [/SIF BASE:A:0 < 1/] },
      { src: DUNGEON_ROOM_ERB, ref: '912', any: [/RETURN 0/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '915-1013',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '919',
        any: [/;娼館街。性癖に合致すれば高額収入/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '925-936',
        any: [/PRINTFORML 来到了娼馆街的迷宫/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '926', any: [/PRINTL/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '938-963',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '939-963',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '946-948',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '949-951',
        any: [/SIF CFLAG:A:151 < 0 \&\& ABL:A:22 > 0/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '952-954',
        any: [/SIF CFLAG:A:151 < 30 \&\& TALENT:A:121/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '955-957',
        any: [/SIF CFLAG:A:151 < 10 \&\& TALENT:A:122/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '958-960', any: [/SIF TALENT:A:143/] },
      { src: DUNGEON_ROOM_ERB, ref: '961-963', any: [/SIF TALENT:A:142/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '965-970',
        any: [/printformw %SAVESTR:A%面露厌恶的穿过了街道…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '967',
        any: [/printformw %SAVESTR:A%面露厌恶的穿过了街道…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '972',
        any: [/COST = \(CFLAG:A:9 \* 8\)\+150/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '974-978', any: [/TIMES COST, 1\.1/] },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '980-985',
        any: [/PRINTFORMW %SAVESTR:A%带的钱好像不够了…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '982',
        any: [/PRINTFORMW %SAVESTR:A%带的钱好像不够了…/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '987-1006',
        any: [/printform %SAVESTR:A%在娼馆街和/],
      },
      {
        src: DUNGEON_ROOM_ERB,
        ref: '1005',
        any: [/PRINTFORMW 现金收入\+\{COST\}/],
      },
      { src: DUNGEON_ROOM_ERB, ref: '1008', any: [/MONEY \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '1009', any: [/EX_FLAG:4444 \+= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '1010', any: [/CFLAG:A:580 \-= COST/] },
      { src: DUNGEON_ROOM_ERB, ref: '1011', any: [/CALL KARMA, A, \-1/] },
      { src: DUNGEON_ROOM_ERB, ref: '1013', any: [/RETURN 0/] },
    ],
  },
  // —— #223（J13：SM 系指令族 40-49——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE/CASE 40）——
  {
    js: 'ere/system/train/com-sm.js',
    refs: [
      { src: COMF40, ref: '7-69', any: [/PRINTL 打屁股/] },
      { src: COMF41, ref: '7-59', any: [/PRINTL 鞭/] },
      { src: COMF43, ref: '7-89', any: [/PRINTL 眼罩/] },
      { src: COMF43, ref: '95-189', any: [/PRINTL ＜眼罩装着中＞/] },
      { src: COMF44, ref: '7-104', any: [/PRINTL 触手紧缚/] },
      { src: COMF44, ref: '110-190', any: [/PRINTL ＜触手紧缚中＞/] },
      { src: COMF45, ref: '7-44', any: [/PRINTL 口塞/] },
      { src: COMF45, ref: '50-116', any: [/PRINTL ＜口塞装备中＞/] },
      { src: COMF46, ref: '7-197', any: [/PRINTL 触手灌肠/] },
      { src: COMF46, ref: '203-352', any: [/PRINTL ＜灌肠触手插入中＞/] },
      { src: COMF47, ref: '7-32', any: [/PRINTL 束缚衣/] },
      {
        src: COMF47,
        ref: '38-126',
        any: [/PRINTFORML ＜%SAVESTR:ASSI%束缚衣着/],
      },
      { src: COMF48, ref: '7-102', any: [/PRINTL 践踏/] },
      {
        src: COMF48,
        ref: '108-122',
        any: [/PRINTFORML %SAVESTR:PLAYER%的阴茎/],
      },
      { src: COMF49, ref: '7-142', any: [/PRINTL 肛门电极/] },
      { src: COMF49, ref: '148-296', any: [/PRINTL ＜肛门电极插入中＞/] },
      { src: COMABLE, ref: '1878-2238', any: [/SIF FLAG:25 & 16/] },
      {
        src: MESSAGE_B,
        ref: '1742-1900',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      {
        src: MESSAGE_A,
        ref: '1208-1272',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: COMF_JUMP,
        ref: '605-626',
        any: [/IF \(ASSIPLAY && TFLAG:50\) \|\| \(/],
      },
      { src: COMF40, ref: '12-15', any: [/LOCAL = 40/] },
      { src: COMF40, ref: '18', any: [/PRINTL 打屁股/] },
      { src: COMF40, ref: '20', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF40, ref: '22-24', any: [/LOSEBASE:0 \+= 80/] },
      { src: COMF40, ref: '26-43', any: [/SOURCE:12 = 200/] },
      { src: COMF40, ref: '29', any: [/SOURCE:12 = 200/] },
      { src: COMF40, ref: '30', any: [/SOURCE:14 = 500/] },
      { src: COMF40, ref: '32-43', any: [/IF PALAM:9 < PALAMLV:1/] },
      { src: COMF40, ref: '45-56', any: [/PRINTS EXPNAME:40/] },
      { src: COMF40, ref: '48-56', any: [/PRINTS EXPNAME:40/] },
      { src: COMF40, ref: '58-59', any: [/SIF ASSIPLAY == 0 && ABL:21 >=/] },
      { src: COMF40, ref: '61-67', any: [/PRINTFORML %EXPNAME:23%\+\{E\}/] },
      { src: COMF40, ref: '69', any: [/RETURN 1/] },
      { src: COMF41, ref: '9', any: [/PRINTL 鞭/] },
      { src: COMF41, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF41, ref: '14-15', any: [/LOSEBASE:0 \+= 100/] },
      { src: COMF41, ref: '17-33', any: [/SOURCE:14 = 1000/] },
      { src: COMF41, ref: '20', any: [/SOURCE:14 = 1000/] },
      { src: COMF41, ref: '22-33', any: [/IF PALAM:9 < PALAMLV:1/] },
      { src: COMF41, ref: '38-46', any: [/PRINTS EXPNAME:40/] },
      { src: COMF41, ref: '48-49', any: [/SIF ASSIPLAY == 0 && ABL:21 >=/] },
      { src: COMF41, ref: '51-57', any: [/PRINTFORML %EXPNAME:23%\+\{E\}/] },
      { src: COMF41, ref: '59', any: [/RETURN 1/] },
      { src: COMF42, ref: '9', any: [/PRINTL 针/] },
      { src: COMF42, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF42, ref: '14-15', any: [/LOSEBASE:0 \+= 0/] },
      { src: COMF42, ref: '17-33', any: [/SOURCE:14 = 1000/] },
      { src: COMF42, ref: '20', any: [/SOURCE:14 = 1000/] },
      { src: COMF42, ref: '24-35', any: [/SOURCE:6 = 3000/] },
      { src: COMF42, ref: '38-44', any: [/PRINTS EXPNAME:40/] },
      { src: COMF42, ref: '46-47', any: [/ENDIF/] },
      { src: COMF42, ref: '51-57', any: [/PRINTFORML %EXPNAME:23%\+\{E\}/] },
      { src: COMF42, ref: '59', any: [/RETURN 1/] },
      { src: COMF43, ref: '9', any: [/PRINTL 眼罩/] },
      { src: COMF43, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF43, ref: '13', any: [/LOSEBASE:0 \+= 0/] },
      { src: COMF43, ref: '14-21', any: [/IF EXP:51 < EXPLV:3 \/ 2/] },
      { src: COMF43, ref: '23-78', any: [/SOURCE:10 = 250/] },
      { src: COMF43, ref: '26-28', any: [/SOURCE:10 = 250/] },
      { src: COMF43, ref: '30-71', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF43, ref: '73-75', any: [/SIF TALENT:80/] },
      { src: COMF43, ref: '26', any: [/SOURCE:10 = 250/] },
      { src: COMF43, ref: '27', any: [/SOURCE:12 = 1000/] },
      { src: COMF43, ref: '28', any: [/SOURCE:14 = 500/] },
      { src: COMF43, ref: '76-78', any: [/SIF TALENT:10/] },
      { src: COMF43, ref: '80-84', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF43, ref: '83', any: [/EXP:51 \+= 2/] },
      { src: COMF43, ref: '84', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF43, ref: '86-87', any: [/TEQUIP:43 = 1 - TEQUIP:43/] },
      { src: COMF43, ref: '89', any: [/RETURN 1/] },
      { src: COMF44, ref: '8-15', any: [/PRINTL 触手紧缚/] },
      { src: COMF44, ref: '16', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF44, ref: '18-28', any: [/IF EXP:51 < EXPLV:3 \/ 2/] },
      { src: COMF44, ref: '30-83', any: [/SOURCE:6 = 800/] },
      { src: COMF44, ref: '33', any: [/SOURCE:6 = 800/] },
      { src: COMF44, ref: '34', any: [/SOURCE:10 = 800/] },
      { src: COMF44, ref: '35', any: [/SOURCE:13 = 500/] },
      { src: COMF44, ref: '36', any: [/SOURCE:14 = 500/] },
      { src: COMF44, ref: '81-83', any: [/SIF TALENT:80/] },
      { src: COMF44, ref: '85-89', any: [/PRINTL 紧缚经验＋５/] },
      { src: COMF44, ref: '88', any: [/EXP:51 \+= 5/] },
      { src: COMF44, ref: '89', any: [/PRINTL 紧缚经验＋５/] },
      { src: COMF44, ref: '91-94', any: [/TEQUIP:44 = 1 - TEQUIP:44/] },
      { src: COMF44, ref: '96-102', any: [/PRINTFORML %EXPNAME:23%\+\{E\}/] },
      { src: COMF44, ref: '104', any: [/RETURN 1/] },
      { src: COMF45, ref: '9', any: [/PRINTL 口塞/] },
      { src: COMF45, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF45, ref: '13-23', any: [/IF EXP:51 < EXPLV:3 \/ 2/] },
      { src: COMF45, ref: '25-33', any: [/SOURCE:6 = 50/] },
      { src: COMF45, ref: '28', any: [/SOURCE:6 = 50/] },
      { src: COMF45, ref: '29', any: [/SOURCE:7 = 50/] },
      { src: COMF45, ref: '30', any: [/SOURCE:12 = 80/] },
      { src: COMF45, ref: '31', any: [/SOURCE:13 = 150/] },
      { src: COMF45, ref: '32', any: [/SOURCE:14 = 80/] },
      { src: COMF45, ref: '33', any: [/SOURCE:16 = 80/] },
      { src: COMF45, ref: '35-39', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF45, ref: '38', any: [/EXP:51 \+= 2/] },
      { src: COMF45, ref: '39', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF45, ref: '41-42', any: [/TEQUIP:45 = 1 - TEQUIP:45/] },
      { src: COMF45, ref: '44', any: [/RETURN 1/] },
      { src: COMF46, ref: '9-15', any: [/PRINTL 触手灌肠/] },
      { src: COMF46, ref: '16', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF46, ref: '18', any: [/LOSEBASE:0 \+= 60/] },
      { src: COMF46, ref: '19', any: [/LOSEBASE:1 \+= 150/] },
      { src: COMF46, ref: '21-155', any: [/IF ABL:3 == 0/] },
      { src: COMF46, ref: '24-43', any: [/IF ABL:3 == 0/] },
      { src: COMF46, ref: '45-82', any: [/IF ABL:21 < 1/] },
      { src: COMF46, ref: '84-100', any: [/IF PALAM:3 < PALAMLV:1/] },
      { src: COMF46, ref: '102-128', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF46, ref: '102-113', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF46, ref: '115-128', any: [/IF ABL:10 == 0/] },
      { src: COMF46, ref: '130-138', any: [/SIF TALENT:99/] },
      { src: COMF46, ref: '140-150', any: [/IF TALENT:105/] },
      { src: COMF46, ref: '152-155', any: [/IF EXP:0 == 0 && TALENT:30/] },
      { src: COMF46, ref: '157-161', any: [/PRINTL 肛门经验＋5/] },
      { src: COMF46, ref: '160', any: [/EXP:1 \+= 5/] },
      { src: COMF46, ref: '161', any: [/PRINTL 肛门经验＋5/] },
      { src: COMF46, ref: '163-180', any: [/PRINTFORML 异常经验\+\{X\}/] },
      { src: COMF46, ref: '173', any: [/PRINTFORML 异常经验\+\{X\}/] },
      { src: COMF46, ref: '175-179', any: [/PRINTL 异常经验\+1/] },
      { src: COMF46, ref: '182-184', any: [/SIF TEQUIP:90/] },
      { src: COMF46, ref: '185-188', any: [/IF TEQUIP:46 == 0 && TEQUIP:90/] },
      { src: COMF46, ref: '190-192', any: [/SIF TEQUIP:46 && FLAG:37/] },
      { src: COMF46, ref: '194-195', any: [/TEQUIP:46 = 1 - TEQUIP:46/] },
      { src: COMF46, ref: '197', any: [/RETURN 1/] },
      { src: COMF46, ref: '16-19', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF47, ref: '9', any: [/PRINTL 束缚衣/] },
      { src: COMF47, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF47, ref: '13-17', any: [/IF TEQUIP:47/] },
      { src: COMF47, ref: '19', any: [/LOSEBASE:0 \+= 0/] },
      { src: COMF47, ref: '20-27', any: [/IF ABL:21 == 0/] },
      { src: COMF47, ref: '29-30', any: [/TEQUIP:47 = 1/] },
      { src: COMF47, ref: '32', any: [/RETURN 1/] },
      { src: COMF48, ref: '9', any: [/PRINTL 践踏/] },
      { src: COMF48, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF48, ref: '13', any: [/LOSEBASE:0 \+= 10/] },
      { src: COMF48, ref: '14', any: [/LOSEBASE:1 \+= 60/] },
      { src: COMF48, ref: '16-56', any: [/SOURCE:12 = 150/] },
      { src: COMF48, ref: '19', any: [/SOURCE:12 = 150/] },
      { src: COMF48, ref: '20', any: [/SOURCE:14 = 400/] },
      { src: COMF48, ref: '22-35', any: [/IF ABL:0 == 0/] },
      { src: COMF48, ref: '37-56', any: [/IF ABL:21 == 0/] },
      { src: COMF48, ref: '62-86', any: [/PRINTFORML %EXPNAME:30%\+3/] },
      { src: COMF48, ref: '67', any: [/PRINTFORML %EXPNAME:30%\+3/] },
      { src: COMF48, ref: '70', any: [/PRINTFORML %EXPNAME:30%\+2/] },
      { src: COMF48, ref: '73', any: [/PRINTFORML %EXPNAME:30%\+1/] },
      { src: COMF48, ref: '77-86', any: [/PRINTS EXPNAME:40/] },
      { src: COMF48, ref: '88', any: [/CALL EVENT_SEITSU_ASIKOKI/] },
      { src: COMF48, ref: '90-100', any: [/PRINTFORML %EXPNAME:23%\+\{E\}/] },
      { src: COMF48, ref: '102', any: [/RETURN 1/] },
      { src: COMF48, ref: '109', any: [/A = NO:PLAYER/] },
      { src: COMF48, ref: '110-112', any: [/SIF \(TALENT:121 == 0 && TALENT/] },
      {
        src: COMF48,
        ref: '113-115',
        any: [/SIF ABL:0 <= 4 \|\| TEQUIP:90 \|\|/],
      },
      { src: COMF48, ref: '116-118', any: [/SIF RELATION:TARGET:A < 150/] },
      { src: COMF48, ref: '119', any: [/PRINTFORML %SAVESTR:PLAYER%的阴茎/] },
      { src: COMF48, ref: '120', any: [/TALENT:135 = 0/] },
      { src: COMF48, ref: '122', any: [/RETURN 1/] },
      { src: COMF49, ref: '9', any: [/PRINTL 肛门电极/] },
      { src: COMF49, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF49, ref: '16', any: [/LOSEBASE:0 \+= 100/] },
      { src: COMF49, ref: '17', any: [/LOSEBASE:1 \+= 150/] },
      { src: COMF49, ref: '13-131', any: [/LOSEBASE:0 \+= 100/] },
      { src: COMF49, ref: '19-38', any: [/IF ABL:3 == 0/] },
      { src: COMF49, ref: '40-59', any: [/IF EXP:1 < EXPLV:1/] },
      { src: COMF49, ref: '61-77', any: [/IF PALAM:3 < PALAMLV:1/] },
      { src: COMF49, ref: '79-105', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF49, ref: '79-90', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF49, ref: '92-105', any: [/IF ABL:10 == 0/] },
      { src: COMF49, ref: '83-88', any: [/TIMES SOURCE:2 , 0\.90/] },
      { src: COMF49, ref: '117-127', any: [/IF TALENT:105/] },
      { src: COMF49, ref: '129-131', any: [/IF EXP:0 == 0 && TALENT:30/] },
      { src: COMF49, ref: '133-137', any: [/PRINTL 肛门经验＋５/] },
      { src: COMF49, ref: '136', any: [/EXP:1 \+= 5/] },
      { src: COMF49, ref: '137', any: [/PRINTL 肛门经验＋５/] },
      { src: COMF49, ref: '139-140', any: [/TEQUIP:49 = 1 - TEQUIP:49/] },
      { src: COMF49, ref: '142', any: [/RETURN 1/] },
      { src: COMF43, ref: '97', any: [/PRINTL ＜眼罩装着中＞/] },
      { src: COMF43, ref: '99', any: [/LOSEBASE:0 \+= 0/] },
      { src: COMF43, ref: '100-107', any: [/IF EXP:51 < EXPLV:3 \/ 2/] },
      { src: COMF43, ref: '112-114', any: [/A = 250/] },
      { src: COMF43, ref: '116-157', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF43, ref: '159-161', any: [/SIF TALENT:80/] },
      { src: COMF43, ref: '162-164', any: [/SIF TALENT:10/] },
      { src: COMF43, ref: '166-168', any: [/SOURCE:10 \+= A/] },
      { src: COMF43, ref: '170-171', any: [/UP:5 \+= A/] },
      { src: COMF43, ref: '173-187', any: [/PRINTS EXPNAME:40/] },
      { src: COMF43, ref: '176-184', any: [/PRINTS EXPNAME:40/] },
      { src: COMF43, ref: '186-187', any: [/PRINTL 紧缚经验＋１/] },
      { src: COMF43, ref: '189', any: [/RETURN 1/] },
      { src: COMF43, ref: '132-145', any: [/ELSEIF ABL:10 == 1/] },
      { src: COMF44, ref: '111-115', any: [/PRINTL ＜触手紧缚中＞/] },
      { src: COMF44, ref: '120-130', any: [/IF EXP:51 < EXPLV:3 \/ 2/] },
      { src: COMF44, ref: '132-145', any: [/IF ABL:21 == 0/] },
      { src: COMF44, ref: '147-149', any: [/SIF TALENT:80/] },
      { src: COMF44, ref: '151-162', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF44, ref: '164-167', any: [/SOURCE:6 \+= A/] },
      { src: COMF44, ref: '169-189', any: [/PRINTS EXPNAME:40/] },
      { src: COMF44, ref: '172-180', any: [/PRINTS EXPNAME:40/] },
      { src: COMF44, ref: '182-183', any: [/SIF ASSIPLAY == 0 && ABL:21 >=/] },
      { src: COMF44, ref: '185-186', any: [/SIF TEQUIP:90/] },
      { src: COMF44, ref: '188-189', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF44, ref: '189', any: [/PRINTL 紧缚经验＋２/] },
      { src: COMF44, ref: '69-82', any: [/ELSEIF ABL:21 == 1/] },
      { src: COMF45, ref: '52', any: [/PRINTL ＜口塞装备中＞/] },
      { src: COMF45, ref: '54-64', any: [/IF EXP:51 < EXPLV:3/] },
      { src: COMF45, ref: '55', any: [/IF EXP:51 < EXPLV:3/] },
      { src: COMF45, ref: '69-82', any: [/IF ABL:21 == 0/] },
      { src: COMF45, ref: '84-95', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF45, ref: '97-100', any: [/SOURCE:12 \+= A/] },
      { src: COMF45, ref: '102-116', any: [/PRINTS EXPNAME:40/] },
      { src: COMF45, ref: '105-113', any: [/PRINTS EXPNAME:40/] },
      { src: COMF45, ref: '115', any: [/EXP:51 \+= 1/] },
      { src: COMF45, ref: '116', any: [/PRINTL 紧缚经验＋１/] },
      { src: COMF46, ref: '204-208', any: [/PRINTL ＜灌肠触手插入中＞/] },
      { src: COMF46, ref: '210', any: [/LOSEBASE:0 \+= 100/] },
      { src: COMF46, ref: '211', any: [/LOSEBASE:1 \+= 80/] },
      { src: COMF46, ref: '213-333', any: [/IF ABL:3 == 0/] },
      { src: COMF46, ref: '216-241', any: [/IF ABL:3 == 0/] },
      { src: COMF46, ref: '244-256', any: [/ELSEIF EXP:1 < EXPLV:3 \/ 2/] },
      { src: COMF46, ref: '258-274', any: [/IF PALAM:3 < PALAMLV:1/] },
      { src: COMF46, ref: '276-302', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF46, ref: '303-311', any: [/SIF TALENT:99/] },
      { src: COMF46, ref: '313-323', any: [/IF TALENT:105/] },
      { src: COMF46, ref: '325-328', any: [/SOURCE:2 \+= A/] },
      { src: COMF46, ref: '328', any: [/SOURCE:14 \+= B/] },
      { src: COMF46, ref: '330-333', any: [/IF EXP:0 == 0 && TALENT:30/] },
      { src: COMF46, ref: '335-352', any: [/PRINTL 肛门经验＋３/] },
      { src: COMF46, ref: '338', any: [/EXP:1 \+= 3/] },
      { src: COMF46, ref: '339', any: [/PRINTL 肛门经验＋３/] },
      { src: COMF46, ref: '341-349', any: [/PRINTS EXPNAME:40/] },
      { src: COMF46, ref: '351-352', any: [/SIF TEQUIP:90/] },
      { src: COMF46, ref: '352', any: [/T \+= 1/] },
      { src: COMF46, ref: '126', any: [/ELSE/] },
      { src: COMF47, ref: '40', any: [/PRINTFORML ＜%SAVESTR:ASSI%束缚衣着/] },
      { src: COMF47, ref: '42-49', any: [/IF ABL:21 == 0/] },
      { src: COMF47, ref: '51-120', any: [/A = 300/] },
      { src: COMF47, ref: '54', any: [/A = 300/] },
      { src: COMF47, ref: '56-67', any: [/IF PALAM:10 < PALAMLV:1/] },
      { src: COMF47, ref: '69-97', any: [/IF ABL:21 == 0/] },
      { src: COMF47, ref: '74', any: [/TIMES A, 0\.60/] },
      { src: COMF47, ref: '79', any: [/TIMES A, 1\.00/] },
      { src: COMF47, ref: '84', any: [/TIMES A, 1\.60/] },
      { src: COMF47, ref: '99-112', any: [/IF ABL:ASSI:20 == 0/] },
      { src: COMF47, ref: '114-116', any: [/SIF TALENT:10/] },
      { src: COMF47, ref: '118', any: [/SOURCE:14 \+= A/] },
      { src: COMF47, ref: '126', any: [/RETURN 1/] },
      { src: COMF49, ref: '158-181', any: [/IF ABL:3 == 0/] },
      { src: COMF49, ref: '150', any: [/PRINTL ＜肛门电极插入中＞/] },
      { src: COMF49, ref: '152', any: [/LOSEBASE:0 \+= 80/] },
      { src: COMF49, ref: '153', any: [/LOSEBASE:1 \+= 120/] },
      { src: COMF49, ref: '155-279', any: [/IF ABL:3 == 0/] },
      { src: COMF49, ref: '184-198', any: [/TIMES A , 1\.00/] },
      { src: COMF49, ref: '200-215', any: [/IF PALAM:3 < PALAMLV:1/] },
      { src: COMF49, ref: '217-243', any: [/IF PALAM:5 < PALAMLV:1/] },
      { src: COMF49, ref: '245-253', any: [/SIF TALENT:99/] },
      { src: COMF49, ref: '255-265', any: [/IF TALENT:105/] },
      { src: COMF49, ref: '267-270', any: [/SOURCE:2 \+= A/] },
      { src: COMF49, ref: '272-275', any: [/IF EXP:0 == 0 && TALENT:30/] },
      { src: COMF49, ref: '277-291', any: [/PRINTL 肛门经验＋５/] },
      { src: COMF49, ref: '280', any: [/EXP:1 \+= 5/] },
      { src: COMF49, ref: '281', any: [/PRINTL 肛门经验＋５/] },
      { src: COMF49, ref: '283-291', any: [/PRINTS EXPNAME:40/] },
      { src: COMF49, ref: '293-294', any: [/SIF TEQUIP:90/] },
      { src: COMF49, ref: '296', any: [/RETURN 1/] },
      { src: COMABLE, ref: '1878-1901', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1881-1882', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1884-1888', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '1890-1899', any: [/SIF TEQUIP:90/] },
      { src: COMABLE, ref: '1906-1938', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1909-1910', any: [/SIF FLAG:25 & 16/] },
      {
        src: COMABLE,
        ref: '1913-1914',
        any: [/SIF ITEM:10 == 0 && NOITEM == /],
      },
      { src: COMABLE, ref: '1916-1920', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '1922-1936', any: [/RETURN 0/] },
      { src: COMABLE, ref: '1943-1975', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1946-1947', any: [/SIF FLAG:25 & 16/] },
      {
        src: COMABLE,
        ref: '1950-1951',
        any: [/SIF ITEM:11 == 0 && NOITEM == /],
      },
      { src: COMABLE, ref: '1953-1957', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '1959-1973', any: [/RETURN 0/] },
      { src: COMABLE, ref: '1980-2001', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1983-1984', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '1986-1987', any: [/SIF TFLAG:899 > 0/] },
      {
        src: COMABLE,
        ref: '1989-1990',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      { src: COMABLE, ref: '1993-1994', any: [/SIF TEQUIP:43/] },
      {
        src: COMABLE,
        ref: '1996-1997',
        any: [/SIF ITEM:5 == 0 && NOITEM == 0/],
      },
      { src: COMABLE, ref: '1999-2000', any: [/SIF TEQUIP:55/] },
      { src: COMABLE, ref: '2006-2038', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2009-2010', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2012-2021', any: [/SIF TEQUIP:90/] },
      { src: COMABLE, ref: '2024-2025', any: [/SIF TEQUIP:44/] },
      {
        src: COMABLE,
        ref: '2027-2028',
        any: [/SIF ITEM:14 == 0 && NOITEM == /],
      },
      { src: COMABLE, ref: '2030-2031', any: [/SIF ABL:PLAYER:12 <= 2/] },
      { src: COMABLE, ref: '2033-2036', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '2043-2072', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2046-2047', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2049-2050', any: [/SIF TEQUIP:98/] },
      {
        src: COMABLE,
        ref: '2052-2053',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      { src: COMABLE, ref: '2056-2057', any: [/SIF TEQUIP:45/] },
      {
        src: COMABLE,
        ref: '2059-2060',
        any: [/SIF ITEM:9 == 0 && NOITEM == 0/],
      },
      { src: COMABLE, ref: '2062-2065', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '2067-2068', any: [/SIF TEQUIP:59/] },
      { src: COMABLE, ref: '2070-2071', any: [/SIF TEQUIP:55/] },
      { src: COMABLE, ref: '2077-2125', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2080-2081', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2083-2092', any: [/SIF TEQUIP:90/] },
      { src: COMABLE, ref: '2094-2095', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2097-2098', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2100-2101', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2103-2104', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2106-2107', any: [/RETURN 1/] },
      { src: COMABLE, ref: '2109-2118', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2120-2121', any: [/SIF EXP:1 <= 25/] },
      {
        src: COMABLE,
        ref: '2123-2124',
        any: [/SIF ABL:10 \+ ABL:11 \+ ABL:17 </],
      },
      { src: COMABLE, ref: '2130-2148', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2133-2134', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2136-2137', any: [/SIF TEQUIP:47/] },
      {
        src: COMABLE,
        ref: '2139-2140',
        any: [/SIF ITEM:23 == 0 && NOITEM == /],
      },
      {
        src: COMABLE,
        ref: '2142-2143',
        any: [/SIF ASSIPLAY == 0 \|\| ASSI < 1/],
      },
      { src: COMABLE, ref: '2145-2146', any: [/SIF ABL:ASSI:20 < 2/] },
      { src: COMABLE, ref: '2153-2188', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2156-2157', any: [/SIF FLAG:25 & 16/] },
      {
        src: COMABLE,
        ref: '2159-2160',
        any: [/SIF TALENT:121 == 0 && TALENT:/],
      },
      { src: COMABLE, ref: '2162-2166', any: [/IF ASSIPLAY/] },
      { src: COMABLE, ref: '2168-2177', any: [/SIF TEQUIP:90/] },
      {
        src: COMABLE,
        ref: '2179-2180',
        any: [/SIF \(CFLAG:40 & 17\) && FLAG:37/],
      },
      {
        src: COMABLE,
        ref: '2182-2183',
        any: [/SIF CFLAG:42 == 69 && \(CFLAG:4/],
      },
      {
        src: COMABLE,
        ref: '2185-2186',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      { src: COMABLE, ref: '2193-2238', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2196-2197', any: [/SIF FLAG:25 & 16/] },
      { src: COMABLE, ref: '2199-2208', any: [/SIF TEQUIP:90/] },
      { src: COMABLE, ref: '2210-2211', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2213-2214', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2216-2217', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2219-2220', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2222-2223', any: [/RETURN 1/] },
      { src: COMABLE, ref: '2225-2234', any: [/RETURN 0/] },
      { src: COMABLE, ref: '2236-2237', any: [/SIF TEQUIP:58/] },
      {
        src: MESSAGE_B,
        ref: '1742-1764',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      {
        src: MESSAGE_B,
        ref: '1743-1751',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      { src: MESSAGE_B, ref: '1752', any: [/ENDIF/] },
      {
        src: MESSAGE_B,
        ref: '1753-1763',
        any: [/PRINTFORML 一掌一掌地拍打着。/],
      },
      {
        src: MESSAGE_B,
        ref: '1757-1758',
        any: [/PRINTFORML %SAVESTR:TARGET%被打的/],
      },
      {
        src: MESSAGE_B,
        ref: '1759-1760',
        any: [/PRINTFORML %SAVESTR:TARGET%被打的/],
      },
      { src: MESSAGE_B, ref: '1765-1783', any: [/PRINTFORM %SAVESTR:PLAYER%/] },
      { src: MESSAGE_B, ref: '1766-1772', any: [/PRINTFORM %SAVESTR:PLAYER%/] },
      { src: MESSAGE_B, ref: '1773', any: [/IF CFLAG:42 == 11 && \(CFLAG:40/] },
      {
        src: MESSAGE_B,
        ref: '1774-1782',
        any: [/PRINTFORML 里的%SAVESTR:TARGET%、/],
      },
      {
        src: MESSAGE_B,
        ref: '1784-1806',
        any: [/PRINTFORM %SAVESTR:PLAYER%、用针扎/],
      },
      {
        src: MESSAGE_B,
        ref: '1785-1797',
        any: [/PRINTFORM %SAVESTR:PLAYER%、用针扎/],
      },
      { src: MESSAGE_B, ref: '1790', any: [/PRINTFORM %SAVESTR:TARGET%/] },
      { src: MESSAGE_B, ref: '1792', any: [/PRINT 蓝色的/] },
      { src: MESSAGE_B, ref: '1794', any: [/PRINT 褐色的/] },
      { src: MESSAGE_B, ref: '1796', any: [/PRINT 白皙的/] },
      { src: MESSAGE_B, ref: '1798-1804', any: [/PRINTL 肌肤…/] },
      {
        src: MESSAGE_B,
        ref: '1807-1815',
        any: [/PRINTFORML %SAVESTR:TARGET%的眼罩/],
      },
      {
        src: MESSAGE_B,
        ref: '1816-1830',
        any: [/PRINTFORM %SAVESTR:PLAYER%把/],
      },
      {
        src: MESSAGE_B,
        ref: '1831-1839',
        any: [/PRINTFORML %SAVESTR:TARGET%的口塞/],
      },
      {
        src: MESSAGE_B,
        ref: '1840-1864',
        any: [/PRINTFORML %SAVESTR:TARGET%的肛塞/],
      },
      {
        src: MESSAGE_B,
        ref: '1865-1882',
        any: [/PRINTFORML %SAVESTR:ASSI%脱掉了拘束/],
      },
      {
        src: MESSAGE_B,
        ref: '1883-1891',
        any: [/PRINTFORM %SAVESTR:PLAYER%把%SA/],
      },
      {
        src: MESSAGE_B,
        ref: '1892-1900',
        any: [/PRINTFORML %SAVESTR:TARGET%体内的/],
      },
      {
        src: MESSAGE_A,
        ref: '1229-1244',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: MESSAGE_A,
        ref: '1208-1252',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: MESSAGE_A,
        ref: '1208',
        any: [/ELSEIF SELECTCOM == 40 \|\| SELE/],
      },
      { src: MESSAGE_A, ref: '1209-1221', any: [/A = UP:9/] },
      { src: MESSAGE_A, ref: '1223-1227', any: [/SIF TALENT:40/] },
      { src: MESSAGE_A, ref: '1241-1242', any: [/PRINT 抽抽哒哒地哭着、/] },
      {
        src: MESSAGE_A,
        ref: '1245-1252',
        any: [/PRINTFORM 然而、%SAVESTR:TARGET%因/],
      },
      {
        src: MESSAGE_A,
        ref: '1253-1272',
        any: [/PRINTFORML %SAVESTR:TARGET%的菊花/],
      },
    ],
  },
  // —— #226（J16：重度调教族 80-90——@COM/@COM_ABLE/@EQUIP_COM89/TRAIN_MESSAGE/CASE 80） ——
  {
    js: 'ere/system/train/com-hardcore.js',
    refs: [
      { src: COMABLE, ref: '3142-3538', any: [/@COM_ABLE80/] },
      { src: COMF_JUMP, ref: '642-663', any: [/CASE 80/] },
      { src: COMF80, ref: '21', any: [/IF TALENT:151/] },
      { src: COMF80, ref: '209', any: [/ENDIF/] },
      { src: COMF80, ref: '19-209', any: [/実行できるかの判定/] },
      { src: COMF80, ref: '10-14', any: [/JUMPFORM COM\{RESULT\}/] },
      { src: COMF80, ref: '218-302', any: [/射精ゲージチェック/] },
      { src: COMF80, ref: '306-371', any: [/ソースの計算/] },
      { src: COMF80, ref: '323', any: [/Y\*40 \+ 100/] },
      { src: COMF80, ref: '375-386', any: [/射精チェック/] },
      { src: COMF80, ref: '420-459', any: [/大量射精/] },
      { src: COMF80, ref: '464-466', any: [/奴隷の口/] },
      { src: COMF80, ref: '468-473', any: [/なめ取る/] },
      { src: COMF80, ref: '477-482', any: [/;初吻/] },
    ],
  },
  // —— #229（J19：追加与高级族 120-135——@COM/@COM_ABLE/TRAIN_MESSAGE/CASE 135） ——
  {
    js: 'ere/system/train/com-advanced.js',
    refs: [
      { src: COMABLE, ref: '3728-4622', any: [/@COM_ABLE120/] },
      { src: COMF_JUMP, ref: '666-682', any: [/CASE 135/] },
      { src: COMF135, ref: '14-16', any: [/LOCAL = 21/] },
    ],
  },
  // —— #225（J15：助手与蕾丝族 60-73——@COM/@COM_ABLE/TRAIN_MESSAGE/CASE 61） ——
  {
    js: 'ere/system/train/com-assistant.js',
    refs: [
      { src: COMABLE, ref: '2514-3135', any: [/@COM_ABLE60/] },
      { src: COMF_JUMP, ref: '627-637', any: [/CASE 61/] },
    ],
  },
  // —— #227（J17：触手与自由调教族 100-109 / 150 / 208） ——
  {
    js: 'ere/system/train/com-tentacle.js',
    refs: [
      { src: COMF100, ref: '6', any: [/PRINTL\ 召唤触手/m] },
      { src: COMF100, ref: '8', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF208, ref: '9', any: [/PRINTL\ 触手/m] },
      { src: COMF208, ref: '11', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF100, ref: '11-30', any: [/TEQUIP:90\ =\ 0/m] },
      { src: COMF150, ref: '14', any: [/LOSEBASE:0\ \+=\ 5/m] },
      { src: COMF150, ref: '15', any: [/LOSEBASE:1\ \+=\ 50/m] },
      { src: COMF208, ref: '16', any: [/LOSEBASE:0\ \+=\ 5/m] },
      { src: COMF208, ref: '17', any: [/LOSEBASE:1\ \+=\ 100/m] },
      { src: COMF150, ref: '18', any: [/SOURCE:18\ =\ 0/m] },
      { src: COMF208, ref: '19', any: [/CALL\ ARENA_SLAVE_POINT/m] },
      { src: COMF208, ref: '20', any: [/TFLAG:402\ \+=\ RAND:RESULT/m] },
      {
        src: COMF208,
        ref: '22',
        any: [/IF\ RESULT\ <\ \(10\ \*\ CFLAG:0:9\)/m],
      },
      {
        src: COMF208,
        ref: '23',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被触手弄的手足无措。/m],
      },
      { src: COMF208, ref: '24', any: [/LOSEBASE:0\ \+=\ 10/m] },
      { src: COMF208, ref: '25', any: [/LOSEBASE:1\ \+=\ 200/m] },
      { src: COMF150, ref: '25-37', any: [/IF\ ABL:4\ ==\ 0/m] },
      {
        src: COMF208,
        ref: '27',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一瞬间就把触手打倒了。/m],
      },
      { src: COMF208, ref: '30', any: [/TFLAG:400\ =\ 208/m] },
      { src: COMF208, ref: '32', any: [/CALL\ COM_AFTER_ARENA/m] },
      { src: COMF100, ref: '33', any: [/TEQUIP:90\ =\ 1/m] },
      { src: COMF208, ref: '33-34', any: [/SIF\ RESULT\ ==\ 0/m] },
      { src: COMF100, ref: '35-48', any: [/A\ =\ 100/m] },
      { src: COMF208, ref: '37', any: [/PRINTL\ 对哪里进行凌辱？/m] },
      { src: COMF208, ref: '38', any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m] },
      { src: COMF208, ref: '39', any: [/PRINTL\ \[1\]\ \-\ 胸部/m] },
      { src: COMF208, ref: '40-41', any: [/SIF\ TALENT:122\ ==\ 0/m] },
      { src: COMF150, ref: '40-52', any: [/IF\ ABL:40\ ==\ 0/m] },
      { src: COMF208, ref: '42', any: [/PRINTL\ \[3\]\ \-\ 肛门/m] },
      { src: COMF208, ref: '43', any: [/PRINTL\ \[999\]\ 暂时放过/m] },
      { src: COMF208, ref: '45', any: [/INPUT/m] },
      { src: COMF208, ref: '47-49', any: [/IF\ RESULT\ ==\ 0/m] },
      { src: COMF208, ref: '50-52', any: [/ELSEIF\ RESULT\ ==\ 1/m] },
      { src: COMF100, ref: '50-55', any: [/SIF\ TALENT:10/m] },
      { src: COMF208, ref: '55-56', any: [/SIF\ TALENT:122/m] },
      { src: COMF100, ref: '57', any: [/LOSEBASE:0\ \+=\ A/m] },
      { src: COMF208, ref: '57-58', any: [/SELECTCOM\ =\ 21/m] },
      { src: COMF100, ref: '58', any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m] },
      { src: COMF208, ref: '59-61', any: [/ELSEIF\ RESULT\ ==\ 3/m] },
      { src: COMF100, ref: '60', any: [/UP:10\ \+=\ A\ \*\ 20/m] },
      { src: COMF150, ref: '60-61', any: [/PRINTS\ EXPNAME:40/m] },
      { src: COMF100, ref: '61', any: [/SOURCE:14\ \+=\ A\ \*\ 5/m] },
      { src: COMF150, ref: '62', any: [/EXP:40\ \+=\ 5/m] },
      { src: COMF208, ref: '62-67', any: [/ELSEIF\ RESULT\ ==\ 999/m] },
      { src: COMF100, ref: '63', any: [/T\ =\ 0/m] },
      { src: COMF150, ref: '66', any: [/EXP:41\ \+=\ 5/m] },
      { src: COMF100, ref: '69', any: [/PRINTL\ ＜触手调教中＞/m] },
      { src: COMF100, ref: '71-84', any: [/A\ =\ 100/m] },
      { src: COMF100, ref: '86-92', any: [/SIF\ TALENT:10/m] },
      { src: COMF100, ref: '94', any: [/LOSEBASE:0\ \+=\ A/m] },
      { src: COMF100, ref: '95', any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m] },
      { src: COMF100, ref: '97', any: [/UP:10\ \+=\ A\ \*\ 20/m] },
      { src: COMF100, ref: '98', any: [/SOURCE:8\ \+=\ A\ \*\ 10/m] },
      { src: COMF100, ref: '99', any: [/SOURCE:14\ \+=\ A\ \*\ 5/m] },
      { src: COMF100, ref: '101', any: [/SOURCE:10\ \+=\ 2000/m] },
      { src: COMF100, ref: '103', any: [/TIMES\ SOURCE:0\ ,\ 2\.00/m] },
      { src: COMF100, ref: '107', any: [/TIMES\ SOURCE:13\ ,\ 1\.80/m] },
      { src: COMF100, ref: '188', any: [/BASE:PLAYER:4\ \+=\ B/m] },
      { src: COMF100, ref: '203', any: [/EXP:20\ \+=\ 3/m] },
      { src: COMF100, ref: '209', any: [/TFLAG:38\ =\ 2/m] },
      { src: COMF100, ref: '231', any: [/TFLAG:15\ =\ E/m] },
      { src: COMF100, ref: '236', any: [/EXP:50\ \+=\ 1/m] },
      { src: COMF100, ref: '240', any: [/T\ \+=\ 1/m] },
      { src: COMF100, ref: '241-242', any: [/PRINT\ 触手经验＋/m] },
      { src: COMF100, ref: '243', any: [/EXP:55\ \+=\ T/m] },
      { src: COMF100, ref: '244', any: [/T\ =\ 0/m] },
      { src: COMF100, ref: '285', any: [/PRINTL\ 触手口辱/m] },
      { src: COMF100, ref: '287', any: [/CALL\ TRAIN_MESSAGE_B/m] },
      { src: COMF100, ref: '289', any: [/LOSEBASE:0\ \+=\ 80/m] },
      { src: COMF100, ref: '290', any: [/LOSEBASE:1\ \+=\ 100/m] },
      { src: COMF100, ref: '292-296', any: [/IF\ CFLAG:16\ ==\ \-1/m] },
      { src: COMF100, ref: '298-335', any: [/IF\ ABL:16\ ==\ 0/m] },
      { src: COMF100, ref: '339', any: [/TEQUIP:98\ =\ 0/m] },
      { src: COMF100, ref: '341', any: [/TEQUIP:98\ =\ 1/m] },
      { src: COMF100, ref: '342-343', any: [/STAIN:0\ \|=\ 2/m] },
      { src: COMF100, ref: '345', any: [/T\ =\ 0/m] },
      { src: COMF100, ref: '347', any: [/EXP:22\ \+=\ 1/m] },
      { src: COMF100, ref: '348', any: [/PRINTL\ 口交经验＋１/m] },
      { src: COMF100, ref: '354', any: [/PRINTL\ ＜触手口辱中＞/m] },
      { src: COMF100, ref: '356-357', any: [/LOSEBASE:0\ \+=\ 40/m] },
      { src: COMF100, ref: '363-400', any: [/IF\ ABL:16\ ==\ 0/m] },
      { src: COMF100, ref: '402', any: [/EXP:22\ \+=\ 1/m] },
      { src: COMF100, ref: '404', any: [/T\ \+=\ 1/m] },
      { src: MESSAGE_B, ref: '3002', any: [/PRINTL/m] },
      { src: COMABLE, ref: '3548', any: [/@COM_ABLE100/m] },
      { src: COMABLE, ref: '4623', any: [/@COM_ABLE150/m] },
      { src: COMABLE, ref: '4760', any: [/@COM_ABLE208/m] },
    ],
  },
];

// —— emuera.log 行号引用表（#48 验收整改起纳入） ——
//
// src 固定为 target/emuera.log；ref/any 与 ERB 锚同款（区间 N-M 取区间内
// 任一行命中任一锚）。锚的写法对着原始行固定（条形字符数、数值、标签），
// 行号漂移或样本被换，红在这里。既有引用（kojo-k3-noble 的 26、juel-check 的
// 236-260）实测无误，一并进锁。

const EMUERA_LOG = 'target/emuera.log';

const LOG_REFS = [
  {
    js: 'tools/compare/replay.js',
    refs: [
      // #219 服装位勘定的证据：首屏方格在着衣态列出舔阴/自慰/插入手指/
      // 舔肛（COM_ABLE 的内裤位判定若在会滤掉——对照 train-natural:109
      // 同为穿衣态首屏、无舔阴）→ 旧样本世界有外衣无内衣
      { ref: '7-9', any: [/舔阴\[  1\]/, /插入手指\[  8\]/] },
      // PALAM_SEED 头注的三个区间：算式区 / 首屏条形 / 回合后参数网格
      { ref: '34-44', any: [/^阴核\s+5240\+/m, /^反感\s+3379\+/m] },
      {
        ref: '1-4',
        any: [/屈服\[==\.\.\.\.\.\.\.\.\]/, /局部\[\.{10}\]\s+0/],
      },
      {
        ref: '52-57',
        any: [/阴核\[\*{5}\.{5}\]\s+5540/, /局部\[\.{10}\]\s+0/],
      },
      // 逐条种子值的证据行
      { ref: '34', any: [/^阴核\s+5240\+\s+300/m] },
      { ref: '52', any: [/私处\[\.{10}\]\s+0/, /肛门\[\.{10}\]\s+0/] },
      { ref: '37', any: [/^润滑\s+2854\+/m] },
      { ref: '39', any: [/^恭顺\s+6\+/m] },
      { ref: '40', any: [/^欲情\s+2378\+/m] },
      { ref: '1', any: [/屈服\[==\.\.\.\.\.\.\.\.\]\s+100/] },
      { ref: '41', any: [/^习得\s+204\+/m] },
      { ref: '42', any: [/^耻情\s+1654\+/m] },
      { ref: '44', any: [/^反感\s+3379\+/m] },
      { ref: '3', any: [/抑郁\[--\.{8}\]\s+24/] },
      { ref: '35', any: [/^乳房\s+42\+/m] },
      {
        ref: '48-49',
        any: [
          /体力\[\.{14}\]\(1445\/2000\)/,
          /气力\[\*{5}\.{27}\]\(\s*360\/2000\)/,
        ],
      },
      {
        ref: '32-33',
        any: [/体力\[[-=.]+\]\s+-5\s*$/, /气力\[[-=.]+\]\s+-50\s*$/],
      },
      { ref: '31', any: [/^阴核\(300\)乳房\(7\)/m] },
      { ref: '26', any: [/「哈呜、温妮、可是，一心地/] },
      { ref: '25', any: [/^隔着紧身衣＆裙甲、你仔细爱抚着温妮的身体/m] },
      { ref: '51', any: [/\[阴蒂绝顶：1次\]/] },
      { ref: '46', any: [/^3日\(午后\)/m] },
      { ref: '47', any: [/温妮 调教中\s+调教者:你/] },
      // #215（J5）着衣态播种的证据行：状态屏的服装表示（【紧身衣＆裙甲的姿态】）
      { ref: '50', any: [/^【紧身衣＆裙甲的姿态】$/] },
    ],
  },
  {
    js: 'tools/compare/rules.js',
    // #211 第三段起 rules.js 的方格证据改锚 train-natural（旧样本的首屏
    // 方格无打屁股[39]——它录自进行中的调教、屏是回合后重绘）
    refs: [],
  },
  {
    js: 'test/compare-first-turn.test.js',
    refs: [
      { ref: '26', any: [/「哈呜、温妮、可是，一心地/] },
      { ref: '29', any: [/^但温妮的身体却像被轻微电击一样/m] },
      { ref: '31', any: [/^阴核\(300\)乳房\(7\)/m] },
      { ref: '46-51', any: [/^3日\(午后\)/m, /\[阴蒂绝顶：1次\]/] },
      { ref: '74', any: [/^＜上次的调教指令：爱抚＞/m] },
    ],
  },
  {
    js: 'test/compare-diff.test.js',
    refs: [
      { ref: '26', any: [/「哈呜、温妮、可是，一心地/] },
      { ref: '22', any: [/^0$/m] },
    ],
  },
  {
    js: 'ere/kojo/kojo-k3-noble.js',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
  {
    js: 'test/kojo-k3-noble.test.js',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
  {
    js: 'test/juel-check.test.js',
    refs: [
      {
        ref: '236-260',
        any: [/^调教结果：否定点数208个抵消。/m, /阴核点数：\s+3479/],
      },
    ],
  },
  {
    // #74：print_palam 换原生进度条后，条后数值仍以样本第二屏（回合后参数
    // 网格）为对齐证据
    js: 'test/page-train.test.js',
    refs: [
      {
        ref: '52-57',
        any: [/阴核\[\*{5}\.{5}\]\s+5540/, /局部\[\.{10}\]\s+0/],
      },
    ],
  },
  {
    // 变异条目表（#89 起住在 tools/mutations/pipeline.mjs）的 find 串逐字引用
    // replay.js 的证据注释——引用的引用同样进锁：find 里的行号被改错，
    // 这里先红（比驱动器的「出现次数≠1」更早）
    js: 'tools/mutations/pipeline.mjs',
    refs: [{ ref: '34', any: [/^阴核\s+5240\+\s+300/m] }],
  },
];

// —— 带样本名前缀的引用锚表（#156 多样本）：形态同 LOG_REFS，但按样本名
//    分组，校核目标是 SAMPLES[样本名] 指向的样本文件。样本由人录制回收
//    入库（#156 阶段二）后才有可锚的真实行号，登记与入库同票走。
//    头两条注释是登记示范（不是真条目）：样本名必须是 SAMPLES 的键且
//    样本文件在库，缺一样先红。 ——

const SAMPLE_LOG_REFS = {
  // 'mainmenu-natural': [
  //   { js: 'ere/…', refs: [{ ref: '行号或区间', any: [/锚正则/] }] },
  // ],
  // —— #161 阶段二起的首批真实登记（回放器/移植修复的证据行） ——
  'mainmenu-natural': [
    {
      js: 'tools/compare/replay-b.js',
      refs: [
        // SAVE00/SAVE99 备注的逐字证据（读档画面槽位行）
        {
          ref: '40',
          any: [/2024\/12\/23 12:08:10  第 2日午前 LV   0/],
        },
        {
          ref: '61',
          any: [/2024\/12\/25 19:55:17  第 7日午前 LV   0/],
        },
      ],
    },
  ],
  'saveload-natural': [
    {
      js: 'ere/page/page-save-load.js',
      refs: [
        // 【保存存档】前缀的实证行（#161 对拍查出的漏抄，已修复）
        {
          ref: '90',
          any: [/^【保存存档】当前故事还没有名字，要保存到以下哪个存档？/],
        },
      ],
    },
  ],
  // —— #211 第三段：调教段两份（replay.js 的播种/RNG 反推/区间表、
  //    rules.js 的归因证据、pipeline.mjs 的变异 desc）——
  'train-natural': [
    {
      js: 'tools/compare/replay.js',
      refs: [
        // 爱抚无台词的实证（TRAIN_MESSAGE 的 A 文在场、口上行缺席）
        { ref: '122-126', any: [/^隔着紧身衣＆裙甲、你轻舔着温妮的唇/] },
        // #215（J5）着衣态播种（CFLAG:41 = 5 / 40 = 15）的证据：前缀行本身
        { ref: '122', any: [/^隔着紧身衣＆裙甲、你轻舔着温妮的唇/] },
        // 调教开场叙事的服装句（「紧身衣＆裙甲的姿态的温妮被带来了。」）
        { ref: '91', any: [/紧身衣＆裙甲的姿态的温妮被带来了。/] },
        { ref: '253-257', any: [/你轻舔着温妮的唇、仔细爱抚着温妮的身体/] },
        // 首屏状态（体力/气力/日期/目标行/参数条）
        { ref: '96', any: [/^7日\(午前\)/] },
        { ref: '97', any: [/温妮 调教中\s+调教者:你/] },
        { ref: '98-99', any: [/体力\[\.{14}\]\(1198\/2000\)/] },
        // #215（J5）FLAG:37 = 1（着衣系统开）的证据：状态屏的服装表示
        { ref: '100', any: [/^【紧身衣＆裙甲的姿态】$/] },
        { ref: '101', any: [/阴核\[\.{10}\]\s+0/] },
        // 好感档的源一览实证（不洁 27 = 30×0.9、情爱 181 = 165×1.1）
        { ref: '127', any: [/^阴核\(1000\)乳房\(25\)情爱\(181\)/] },
        // 实行值判定行（ABL/刻印的反解依据）
        { ref: '169-170', any: [/顺从LV1\(4\)/, /= 29 > 实行值15/] },
        { ref: '169', any: [/顺从LV1\(4\)/] },
        { ref: '453-454', any: [/露出癖LV1\(4\)/, /= 42 > 实行值33/] },
        { ref: '453', any: [/露出癖LV1\(4\)/] },
        // 相殺终态（RNG 序列的反推依据）
        { ref: '919-925', any: [/^阴核点数：\(/, /屈服点数：\(/] },
        { ref: '919-931', any: [/^阴核点数：\(/, /否定点数：\(/] },
        { ref: '930', any: [/否定点数：\(/] },
        // 经验一览（终值播种）与等级/初吻行
        { ref: '935-936', any: [/绝顶经验:\s+13/] },
        { ref: '937', any: [/温妮当前是Lv1/] },
        { ref: '938', any: [/初吻对象：你的唇/] },
        // 结算能力一览与升级反馈
        { ref: '945-951', any: [/阴蒂感觉 - LV 4/, /反抗刻印 - LV 1/] },
        { ref: '946', any: [/技巧\s+- LV 1 \*/] },
        { ref: '951', any: [/反抗刻印 - LV 1/] },
        { ref: '959', any: [/阴核点数×5859\/20000/] },
        // #274：COM_ABLE32 在技巧 LV1 仍放行乳交 → 温妮有巨乳
        { ref: '241', any: [/乳交\[\s+32\]/] },
      ],
    },
    {
      js: 'test/compare-train.test.js',
      refs: [{ ref: '923-925', any: [/屈服点数：\(/] }],
    },
    {
      js: 'tools/compare/rules.js',
      refs: [
        { ref: '935-936', any: [/绝顶经验:\s+13/] },
        // #274：COM_ABLE33 过滤股间性交的证据——golden 润滑已过 2000
        { ref: '689', any: [/润滑\[>{7}\.{3}\]\s+2117/] },
      ],
    },
    // #213：映射层的实证行（89 → COM110；升格标签 8 号格）
    {
      js: 'ere/system/train/com-index.js',
      refs: [{ ref: '211', any: [/^89$/] }],
    },
    {
      js: 'test/train-loop.test.js',
      refs: [{ ref: '211', any: [/^89$/] }],
    },
    // #214：COM_ORDER 的明细行实证（判定行前半 = COM_ORDER 的贡献段）
    {
      js: 'ere/system/train/com-order.js',
      refs: [{ ref: '169', any: [/顺从LV1\(4\)/] }],
    },
    {
      js: 'test/com-order.test.js',
      refs: [{ ref: '169', any: [/顺从LV1\(4\)/] }],
    },

    {
      js: 'tools/mutations/pipeline.mjs',
      refs: [{ ref: '169', any: [/顺从LV1\(4\)/] }],
    },
  ],
  'train-upgrade': [
    // #213：升格标签的实证（8 号格名字已是 COM84、编号仍是 8）
    {
      js: 'test/page-usercom.test.js',
      refs: [{ ref: '348', any: [/刺激Ｇ点\[  8\]/] }],
    },
    {
      js: 'tools/compare/replay.js',
      refs: [
        { ref: '427-438', any: [/^阴核点数：\(/, /屈服点数：\(/] },
        { ref: '446', any: [/初体验对象：你/] },
        // #214：flag:5 播种的依据行（自定义菜单态的升格名方格）
        { ref: '348', any: [/刺激Ｇ点\[  8\]/] },
      ],
    },
  ],
};

// —— 校核 ——

const source_cache = new Map();
function load_source(rel) {
  if (!source_cache.has(rel)) {
    source_cache.set(
      rel,
      fs.readFileSync(path.join(REPO, rel), 'utf8').split(/\r?\n/),
    );
  }
  return source_cache.get(rel);
}

let failures = 0;
let checked = 0;

for (const { js, refs } of FILES) {
  const js_path = path.join(REPO, js);
  const js_text = fs.readFileSync(js_path, 'utf8');
  for (const { src, ref, any } of refs) {
    checked += 1;
    const label = `${js} :${ref} ↔ ${src}`;
    // 1) js 侧：引用仍在（防静默删除/改动）
    const ref_re = new RegExp(`:${ref.replace('-', '-')}(?!\\d)`);
    if (!ref_re.test(js_text)) {
      console.log(
        `✗ ${label} —— js 里已不存在「:${ref}」（引用被删或被改？同步更新本表）`,
      );
      failures += 1;
      continue;
    }
    // 2) 源侧：所引行命中锚（防行号偏移/源漂移）
    const lines = load_source(src);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = lines.slice(a - 1, b).join('\n');
    if (!any.some((anchor) => anchor.test(slice))) {
      console.log(
        `✗ ${label} —— 源文件 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
    }
  }
}

// —— emuera.log 引用：同款两道校验（presence 用带 log: 前缀的更严形态，
//    单值引用不得被区间引用的「log:N-M」前缀冒名满足）——

const js_text_cache = new Map();
function load_js_text(rel) {
  if (!js_text_cache.has(rel)) {
    js_text_cache.set(rel, fs.readFileSync(path.join(REPO, rel), 'utf8'));
  }
  return js_text_cache.get(rel);
}

for (const { js, refs } of LOG_REFS) {
  const js_text = load_js_text(js);
  for (const { ref, any } of refs) {
    checked += 1;
    const label = `${js} log:${ref} ↔ ${EMUERA_LOG}`;
    // 前瞻防区间冒名（单值不被 log:N-M 满足）；后顾防样本前缀冒名
    // （<样本名>-log:N 不是裸 log:N，不得满足裸引用的在场检查——那是
    // 另一个样本的行号，#156 静默错判的另一半）
    const presence = new RegExp(`(?<![A-Za-z0-9-])log:${ref}(?!-?\\d)`);
    if (!presence.test(js_text)) {
      console.log(
        `✗ ${label} —— js 里已不存在「log:${ref}」（引用被删或被改？同步更新本表）`,
      );
      failures += 1;
      continue;
    }
    const lines = load_source(EMUERA_LOG);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = lines.slice(a - 1, b).join('\n');
    if (!any.some((anchor) => anchor.test(slice))) {
      console.log(
        `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
    }
  }
}

// —— 带样本名前缀的引用：同款两道校验（在场 + 锚），目标是 SAMPLES 里
//    该样本名对应的样本文件。样本名未登记 / 样本文件不在库，先红——
//    引用锚到不存在的样本等于没锚。 ——

/** 样本名做正则字面量安全转义（样本名约定 [A-Za-z0-9-]，转义是防御） */
function escape_re(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  const sample_rel = SAMPLES[sample_name];
  if (sample_rel === undefined) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本名不在 SAMPLES（tools/compare/samples.js 是样本名→文件的唯一真相源，先登记再引用）`,
    );
    failures += 1;
    continue;
  }
  if (!fs.existsSync(path.join(REPO, sample_rel))) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本文件 ${sample_rel} 不在库（#156 阶段二回收后才能登记引用锚）`,
    );
    failures += 1;
    continue;
  }
  for (const { js, refs } of groups) {
    const js_text = load_js_text(js);
    for (const { ref, any } of refs) {
      checked += 1;
      const label = `${js} ${sample_name}-log:${ref} ↔ ${sample_rel}`;
      const presence = new RegExp(
        `${escape_re(sample_name)}-log:${ref}(?!-?\\d)`,
      );
      if (!presence.test(js_text)) {
        console.log(
          `✗ ${label} —— js 里已不存在「${sample_name}-log:${ref}」（引用被删或被改？同步更新本表）`,
        );
        failures += 1;
        continue;
      }
      const lines = load_source(sample_rel);
      const [a, b = a] = ref.split('-').map(Number);
      const slice = lines.slice(a - 1, b).join('\n');
      if (!any.some((anchor) => anchor.test(slice))) {
        console.log(
          `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
        );
        failures += 1;
      }
    }
  }
}

// —— 扫描完整性：ere/ tools/ test/ 全部 .js/.mjs 里的 log:N 引用都必须
//    在锚表登记（防新增引用绕过锚表——本锁的存在理由就是 #48 的
//    26 处无人看守的偏移）。#156 起引用可带样本名前缀：前缀段 = 紧邻
//    log: 之前、由字母数字与连词符组成且以 - 收尾的一截；带前缀的引用
//    按样本名查 SAMPLES 与 SAMPLE_LOG_REFS，裸引用照旧查 LOG_REFS。
//    legacy 的 emuera.log:N 写法照旧按裸引用解析（存量一行不改）。 ——

const LOG_REF_RE =
  /([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-)?(?:emuera\.)?log:(\d+)(?:-(\d+))?/g;

function list_js_files(dir_rel) {
  const out = [];
  const stack = [dir_rel];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(REPO, cur))) {
      if (name === 'node_modules' || name.startsWith('.')) {
        continue;
      }
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(REPO, rel)).isDirectory()) {
        stack.push(rel);
      } else if (/\.(js|mjs)$/.test(name)) {
        out.push(rel);
      }
    }
  }
  return out;
}

const tabled_by_file = new Map(
  LOG_REFS.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
const sample_tabled_by_file = new Map();
for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  for (const { js, refs } of groups) {
    const key = `${sample_name}\u0000${js}`;
    const set = sample_tabled_by_file.get(key) ?? new Set();
    refs.forEach((r) => set.add(r.ref));
    sample_tabled_by_file.set(key, set);
  }
}
for (const rel of ['ere', 'tools', 'test'].flatMap(list_js_files)) {
  const found = new Set(
    [...load_js_text(rel).matchAll(LOG_REF_RE)].map((m) => {
      const sample = m[1] ? m[1].slice(0, -1) : '';
      const ref = m[2] ? `${m[2]}${m[3] ? `-${m[3]}` : ''}` : '';
      return `${sample}\u0000${ref}`;
    }),
  );
  for (const entry of found) {
    const [sample, ref] = entry.split('\u0000');
    if (sample === '') {
      if (!tabled_by_file.get(rel)?.has(ref)) {
        console.log(
          `✗ ${rel} log:${ref} —— 未登记进 LOG_REFS（登记后才能过锚校验）`,
        );
        failures += 1;
      }
      continue;
    }
    const token = `${sample}-log:${ref}`;
    if (!Object.hasOwn(SAMPLES, sample)) {
      console.log(
        `✗ ${rel} ${token} —— 样本名不在 SAMPLES（tools/compare/samples.js），先登记样本名再引用`,
      );
      failures += 1;
    } else if (!sample_tabled_by_file.get(`${sample}\u0000${rel}`)?.has(ref)) {
      console.log(
        `✗ ${rel} ${token} —— 未登记进 SAMPLE_LOG_REFS['${sample}']（登记后才能过锚校验）`,
      );
      failures += 1;
    }
  }
}

// —— #63 冻结基线：豁免清单（tools/trace-exempt.mjs）的上界快照 ——
//
// 条目表里的每一条都必须出现在这份基线内——超出即红（清单只能变短）。
// 消化现有条目 = 只动 trace-exempt.mjs（删条目，本表不碰）；要扩表必须连
// 这里一起改——冻结不是不可变，是「改动必须显式发生在标着冻结的地方」。
// 与 log 侧同构：扫描完整性（含它的数据）住在工具里，测试只做行为靶。

const ERB_EXEMPT_BASELINE = {
  'ere/chara/chara-ex.js': ['28-29', '28', '29', '101-102', '102'],
  'ere/era-utils/era-flag.js': ['26', '51', '321', '323'],
  'ere/event/event-com.js': ['261-268'],
  'ere/event/event-comend.js': ['45', '272-310', '292-309'],
  'ere/event/event-end.js': ['314-429', '421'],
  'ere/event/event-first.js': [
    '1',
    '8-9',
    '11-12',
    '15',
    '19',
    '21-24',
    '26',
    '27',
    '29-30',
    '31',
    '33',
    '35',
    '36-40',
    '42',
    '45',
    '47',
    '50-52',
    '53',
    '55',
    '56',
    '60-62',
    '62',
    '65-74',
    '69-73',
    '78',
    '80',
    '82-92',
    '87',
    '91',
    '92',
    '95-187',
    '96-100',
    '102',
    '103',
    '105',
    '107',
    '109',
    '110-119',
    '111',
    '121',
    '126-129',
    '130-133',
    '135-150',
    '138-142',
    '144-147',
    '152-166',
    '168-172',
    '169-170',
    '175',
    '187',
    '190-201',
    '198',
    '199-201',
    '203',
    '205-215',
    '231',
  ],
  'ere/event/event-train.js': ['13-58'],
  'ere/event/event-turnend.js': ['8-140'],
  'ere/event/first-setting.js': [
    '16-17',
    '781-935',
    '787-864',
    '909-915',
    '911',
    '912',
    '913',
    '914-915',
  ],
  'ere/event/source-check.js': [
    '31',
    '45',
    '56',
    '57-68',
    '79-86',
    '88-95',
    '97-104',
    '106-113',
    '115-122',
    '148',
    '152',
    '160-161',
    '222',
    '265',
    '393',
    '398',
    '406',
    '411',
    '504',
    '512',
    '547-549',
    '552',
    '578-655',
    '657-735',
    '691',
    '737-856',
    '740',
    '858-939',
    '936-951',
    '2122',
    '2175',
    '2508-2572',
  ],
  'ere/kojo/kojo-k3-noble.js': [
    '83',
    '84-85',
    '89',
    '887',
    '888-912',
    '918',
    '920-1105',
    '925',
    '928',
    '930',
    '931',
    '932-1104',
    '936',
    '938',
    '939',
    '940',
    '941',
    '943',
    '945',
    '946',
    '948',
    '949',
    '950',
    '951',
    '953',
    '956',
    '958',
    '960',
    '961',
    '963',
    '964',
    '965',
    '966',
    '967',
    '969',
    '970',
    '971',
    '972',
    '973',
    '975',
    '978',
    '980-988',
    '983',
    '984',
    '985',
    '987',
    '989',
    '991-1002',
    '993',
    '994',
    '995',
    '996',
    '998',
    '999',
    '1000',
    '1001',
    '1003',
    '1005',
    '1006',
    '1007',
    '1008',
    '1009',
    '1010-1019',
    '1015',
    '1017',
    '1022',
    '1024',
    '1025',
    '1026',
    '1027',
    '1028',
    '1030',
    '1031',
    '1032',
    '1033',
    '1034',
    '1036',
    '1037',
    '1038',
    '1039',
    '1040',
    '1042-1049',
    '1044',
    '1046',
    '1048',
    '1053',
    '1056-1066',
    '1057',
    '1058',
    '1059',
    '1060',
    '1062-1063',
    '1065',
    '1069-1078',
    '1071',
    '1073',
    '1075',
    '1076',
    '1077',
    '1078',
    '1080-1091',
    '1082',
    '1083',
    '1084',
    '1086',
    '1087',
    '1088',
    '1090',
    '1093-1101',
    '1095',
    '1099',
  ],
  'ere/kojo/kojo-k5-mao.js': [
    '82',
    '83-84',
    '88',
    '770',
    '772-773',
    '802',
    '807',
    '810',
    '811',
    '813',
    '814',
    '815-847',
    '819',
    '820',
    '821',
    '822',
    '825',
    '826',
    '827',
    '828',
    '831',
    '832',
    '833',
    '834',
    '837',
    '838',
    '839',
    '842',
    '843',
    '844',
    '846',
    '848',
  ],
  'ere/kojo/kojo-system.js': [
    '90-91',
    '92-131',
    '134-144',
    '152',
    '155',
    '157',
    '160',
    '161',
  ],
  'ere/page/page-ablup.js': [
    '10-11',
    '29-117',
    '32-33',
    '34-35',
    '36-37',
    '38-39',
    '40-41',
  ],
  'ere/page/page-info-exp.js': [
    '135',
    '1024-1029',
    '1032-1040',
    '1036',
    '1045-1047',
    '1048-1050',
    '1051-1053',
    '1058',
    '1058-1090',
    '1064-1065',
    '1066-1067',
    '1068-1069',
    '1070-1071',
    '1072-1073',
    '1074-1075',
    '1092-1113',
    '1095-1096',
    '1098-1099',
    '1101-1102',
    '1104-1105',
    '1108-1109',
  ],
  'ere/page/page-select-target.js': ['10-52', '105-112', '116-133', '311-321'],
  'ere/page/page-shop.js': [
    '20',
    '22-38',
    '24',
    '25-30',
    '33-36',
    '35',
    '38',
    '40-229',
    '44-57',
    '44',
    '59',
    '59-101',
    '65-68',
    '67-68',
    '68',
    '71-97',
    '79-80',
    '81-82',
    '83-84',
    '85-88',
    '91-92',
    '94-97',
    '96',
    '98-99',
    '99',
    '101',
    '102-106',
    '105',
    '108',
    '110',
    '113',
    '115',
    '117',
    '119-120',
    '121-122',
    '124-128',
    '127',
    '130-131',
    '132-133',
    '134-138',
    '140',
    '142',
    '144',
    '146',
    '148',
    '152',
    '152-153',
    '154',
    '154-155',
    '156-157',
    '158-159',
    '160-161',
    '162-163',
    '164-165',
    '166-167',
    '168-170',
    '172-221',
    '208-216',
    '222-223',
    '226-227',
    '229',
    '236-330',
    '337-421',
  ],
  'ere/page/page-title.js': [
    '2',
    '3-7',
    '13-15',
    '17',
    '19',
    '20-21',
    '25-26',
    '27',
    '29-35',
    '36-37',
    '38',
    '39-86',
    '58-73',
    '73',
    '74-81',
    '76-79',
    '80',
    '82',
    '84',
    '86',
    '89-90',
    '91',
    '92-101',
    '93',
    '99',
    '100',
    '100-103',
    '101-102',
    '102-107',
    '103',
    '106',
    '108-110',
    '111-113',
    '114-115',
  ],
  'ere/page/page-train.js': ['60-259'],
  'ere/page/page-usercom.js': ['7-100', '102-177', '771-780'],
  'ere/system/flow/main-loop.js': ['231'],
  'ere/system/train/com-caress.js': [
    '30',
    '34',
    '76-82',
    '91',
    '92',
    '93',
    '94',
    '97-98',
    '100-101',
    '103-104',
    '117-118',
    '122-123',
    '128-133',
    '134-141',
    '144-165',
    '147-165',
    '149-150',
    '153-154',
    '160',
    '163',
  ],
  'ere/system/train/juel-check.js': [
    '443-549',
    '449-458',
    '540-541',
    '541-546',
    '546',
    '549',
    '558-601',
    '598',
    '607',
    '624',
    '648-656',
    '655',
    '658-735',
    '659-692',
    '669',
    '671',
    '674',
    '682-685',
    '688-691',
    '693-724',
    '707',
    '708-711',
    '720-723',
    '740',
  ],
  'ere/system/train/train-loop.js': ['545'],
  'ere/system/train/train-message.js': [
    '10',
    '12-3049',
    '12',
    '15-1351',
    '15',
    '22-26',
    '28-90',
    '30-120',
    '69',
    '70',
    '71',
    '74-87',
    '94',
  ],
};

// —— ERB 侧扫描完整性（#63）：ere/ 全部 .js 注释里的 :N / :N-M 引用都
//    必须在 FILES 登记或在 ERB_EXEMPT 豁免——与 log 侧第三道同款，防
//    新增引用绕过锚表。引用形态见文件头第 4 条；豁免清单只能变短、
//    不许过期失效（见 tools/trace-exempt.mjs 头注） ——

const ERB_REF_RE = /(?<![A-Za-z0-9_.{}]):(\d+)(?:-(\d+))?/g;

/** 扫单个 js 文本里的 ERB 行号引用（注释侧；代码侧不扫，见文件头） */
function scan_erb_refs(text) {
  const found = new Set();
  for (const line of text.split(/\r?\n/)) {
    const parts = [];
    // 块注释行（jsdoc 的 * 续行与 /* 起始行）整行可扫
    if (/^\s*\*/.test(line) || /^\s*\/\*/.test(line)) {
      parts.push(line);
    }
    // 行注释：只扫 // 之后的部分（前面是代码，含三段寻址）
    const ci = line.indexOf('//');
    if (ci >= 0) {
      parts.push(line.slice(ci));
    }
    // 行内 /* … */ 段（本仓库罕用，出现即扫）
    for (const m of line.matchAll(/\/\*(.*?)\*\//g)) {
      parts.push(m[1]);
    }
    for (const part of parts) {
      for (const m of part.matchAll(ERB_REF_RE)) {
        found.add(m[2] ? `${m[1]}-${m[2]}` : m[1]);
      }
    }
  }
  return found;
}

const erb_registered_by_file = new Map(
  FILES.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
const erb_baseline_total = Object.values(ERB_EXEMPT_BASELINE).reduce(
  (sum, refs) => sum + refs.length,
  0,
);
let erb_found_total = 0;
let erb_exempt_total = 0;
for (const rel of list_js_files('ere')) {
  if (rel === 'ere/era-electron.js') {
    continue; // 引擎 SDK：JSDoc 示例不是移植注释
  }
  const found = scan_erb_refs(load_js_text(rel));
  erb_found_total += found.size;
  const registered = erb_registered_by_file.get(rel);
  const exempt = ERB_EXEMPT[rel] ?? [];
  erb_exempt_total += exempt.length;
  for (const ref of found) {
    if (!registered?.has(ref) && !exempt.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 未登记进 FILES（新引用必须登记锚表；豁免清单是 #63 冻结的现有，不收新条目）`,
      );
      failures += 1;
    }
  }
  for (const ref of exempt) {
    if (!found.has(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目在 js 里已不存在（引用被删/改号？同步删本条，清单只能变短）`,
      );
      failures += 1;
    }
  }
}

// 规则 1「只能变短」：条目表条目必须逐条落在 #63 基线内（在工具里执行，
// 与退出码语义一致——验收整改：此前这条只在测试里，条目表 465→466 时
// 单独跑工具的人看到的是绿）
for (const [rel, refs] of Object.entries(ERB_EXEMPT)) {
  const baseline_refs = ERB_EXEMPT_BASELINE[rel] ?? [];
  for (const ref of refs) {
    if (!baseline_refs.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目不在 #63 基线内（清单只能变短：消化现有条目 = 删条目；新引用登记 FILES 锚表，扩基线必须显式改 ERB_EXEMPT_BASELINE）`,
      );
      failures += 1;
    }
  }
}

console.log(
  failures === 0
    ? `✓ ${checked} 条内联行号引用全部与源文件一致；ERB 完整性：ere/ ${erb_found_total} 条引用全数登记或豁免（豁免 ${erb_exempt_total}/${erb_baseline_total} 条，#63 基线内只减不增，条目表见 tools/trace-exempt.mjs）`
    : `✗ ${failures}/${checked} 条引用对不上（另有 ERB 完整性失守计入 failures）`,
);
process.exit(failures === 0 ? 0 : 1);
