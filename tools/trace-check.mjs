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
const COMABLE = 'target/ERB/調教相關/COMABLE.ERB';
const MESSAGE_B = 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB';
const MESSAGE_A = 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB';
const SOURCE = 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB';
const SUB1 = 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB';
const SUB2 = 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB';
const SHOP_VER = 'target/ERB/SHOP/SHOP ver1.0.2.ERB';
const EVENT_K = 'target/ERB/EVENT/EVENT_K.ERB';
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
const DUNGEON_PARTY = 'target/ERB/迷宮/DUNGEON_PARTY.ERB';
const DUNGEON_RYOUZYOKU_MAN = 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB';
const DUNGEON_RYOUZYOKU_ERB = 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB';
const FLAG_SUMMARY = 'target/資料_非必要無須解壓/eramaouフラグまとめ.txt';
const DUNGEON_BITCH_ERB = 'target/ERB/迷宮/DUNGEON_BITCH.ERB';
const BATLLE = 'target/ERB/迷宮/DUNGEON_BATLLE.ERB';
const BATLLE2 = 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB';
const MONSTER_DATA_ERB = 'target/ERB/怪物相關/MONSTER_DATA.ERB';
const ENEMY_DATA_ERB = 'target/ERB/侵略/ENEMY_DATA.ERB';
const DUNGEON_TRAP_ERB = 'target/ERB/迷宮/DUNGEON_TRAP.ERB';
const FRAUD_ERB = 'target/ERB/魔改新增/诈骗陷阱.ERB';

// —— 映射表：js 文件 → [{ src, ref: 'N' | 'N-M', any: [锚…（任一命中即可）] }] ——
// 锚是对源文件所引行的正则；范围引用只要 [N, M] 内任一行命中任一锚。
const FILES = [
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
      // EVENT_BEFORETRAIN.ERB @PRITRAIN_MESSAGE 承载头部
      {
        src: BEFORE_TRAIN,
        ref: '7-8',
        any: [/調教経験を加算/, /^CFLAG:10 \+= 1$/m],
      },
      {
        src: BEFORE_TRAIN,
        ref: '10-14',
        any: [/避免角色錯亂的暫存紀錄/, /^T:10 = MASTER$/m, /^\tT:12 = ASSI$/m],
      },
      {
        src: BEFORE_TRAIN,
        ref: '16-21',
        any: [/調教テキスト省略設定の場合/, /^IF \(FLAG:6 & 1\)$/m],
      },
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
    js: 'ere/event/event-end.js',
    refs: [
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
    js: 'ere/page/page-train.js',
    refs: [
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
      {
        src: TRAIN_MAIN,
        ref: '84-86',
        any: [/^CALL SHOW_EQUIP_2$/m, /^CALL LIFE_BAR$/m, /^CALL VITAL_BAR$/m],
      },
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
      { src: USERCOM, ref: '14', any: [/^PRINTL$/m] },
      { src: USERCOM, ref: '15', any: [/^DRAWLINE$/m] },
      { src: USERCOM, ref: '16', any: [/^RESETCOLOR$/m] },
      {
        src: USERCOM,
        ref: '17-36',
        any: [/^PRINTC 能力表示\[100\]$/m, /^PRINTC 避孕套设定\[103\]$/m],
      },
      {
        src: USERCOM,
        ref: '38-84',
        any: [/^\t*PRINTC 爱抚系过滤\[104\]/m, /^\t*PRINTC ＳＭ系过滤\[108\]/m],
      },
      {
        src: USERCOM,
        ref: '85-90',
        any: [/PRINTC 调教菜单登录\[990\]/, /PRINTC 调教菜单实行\[992\]/],
      },
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
        ref: '104-172',
        any: [
          /^IF RESULT == 100$/m,
          /^ELSEIF RESULT == 992 && FLAG:550 > 0 $/m,
        ],
      },
      {
        src: USERCOM,
        ref: '173-175',
        any: [/^ELSEIF RESULT == 999$/m, /^\tBEGIN AFTERTRAIN$/m],
      },
      { src: USERCOM, ref: '177', any: [/^RETURN 0$/m] },
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
  // —— #45（指令 0 爱抚 + @SOURCE_CHECK）——
  {
    js: 'ere/system/train/com0-caress.js',
    refs: [
      { src: COMF0, ref: '7-168', any: [/@COM0/] },
      { src: COMF0, ref: '9', any: [/PRINTL 爱抚/] },
      { src: COMF0, ref: '11', any: [/CALL TRAIN_MESSAGE_B/] },
      { src: COMF0, ref: '16-17', any: [/LOSEBASE:0 \+= 5/] },
      { src: COMF0, ref: '20-30', any: [/SOURCE:0 = 0/, /SOURCE:12 = 100/] },
      { src: COMF0, ref: '26', any: [/SOURCE:4 = 60/] },
      { src: COMF0, ref: '28', any: [/SOURCE:8 = 30/] },
      {
        src: COMF0,
        ref: '32-51',
        any: [/;ABL:阴蒂感觉をみる/, /SOURCE:0 = 1200/],
      },
      {
        src: COMF0,
        ref: '53-72',
        any: [/;ABL:乳房感觉をみる/, /SOURCE:17 = 1600/],
      },
      { src: COMF0, ref: '74-119', any: [/奴隷の口が爱液/] },
      {
        src: COMF0,
        ref: '84-88',
        any: [/ELSEIF TEQUIP:45/, /口塞使用中もキスは无/],
      },
      { src: COMF0, ref: '90-94', any: [/ELSEIF CFLAG:16 == -1/] },
      {
        src: COMF0,
        ref: '95-119',
        any: [/;不怕污臭/, /口⇔調教者の口の汚れが移動/],
      },
      { src: COMF0, ref: '106-109', any: [/IF TALENT:85 && ASSIPLAY == 0/] },
      { src: COMF0, ref: '110-114', any: [/主人の口の汚れがあると/] },
      { src: COMF0, ref: '116-118', any: [/STAIN:0 \|= STAIN:PLAYER:0/] },
      { src: COMF0, ref: '121-123', any: [/SIF TEQUIP:89/] },
      { src: COMF0, ref: '125-142', any: [/;汚れの処理/] },
      { src: COMF0, ref: '135-137', any: [/STAIN:3 \|= STAIN:PLAYER:1/] },
      { src: COMF0, ref: '139-141', any: [/STAIN:5 \|= STAIN:PLAYER:1/] },
      {
        src: COMF0,
        ref: '148-156',
        any: [/IF TALENT:122 == 0 && TALENT:PLAYER:122 == 0/],
      },
      { src: COMF0, ref: '160-166', any: [/E = 2/] },
      { src: COMF0, ref: '168', any: [/RETURN 1/] },
      { src: COMF0, ref: '174', any: [/@COM0_AUTO/] },
      { src: COMABLE, ref: '28-34', any: [/@COM_ABLE0/] },
      { src: COMABLE, ref: '30-31', any: [/SIF FLAG:25 & 1/] },
      { src: COMABLE, ref: '32-33', any: [/SIF TEQUIP:55/] },
    ],
  },
  {
    js: 'ere/system/train/train-message.js',
    refs: [
      {
        src: MESSAGE_B,
        ref: '19-21',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      { src: MESSAGE_B, ref: '23', any: [/CUSTOMDRAWLINE ‥/] },
      { src: MESSAGE_B, ref: '29-39', any: [/CALL PRINT_CLOTHTYPE_SPECIAL/] },
      {
        src: MESSAGE_B,
        ref: '40-66',
        any: [/IF TEQUIP:90/, /ELSEIF TEQUIP:88/],
      },
      { src: MESSAGE_B, ref: '67-72', any: [/SIF \(STAIN:0 < 2/] },
      { src: MESSAGE_B, ref: '73-88', any: [/IF TALENT:135/] },
      { src: MESSAGE_B, ref: '89-90', any: [/微微感觉到胎儿在踢脚/] },
      {
        src: MESSAGE_A,
        ref: '22-24',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      { src: MESSAGE_A, ref: '26', any: [/CUSTOMDRAWLINE ‥/] },
      {
        src: MESSAGE_A,
        ref: '745-808',
        any: [/IF SELECTCOM == 0 && TEQUIP:44 == 0/],
      },
      { src: MESSAGE_A, ref: '747-749', any: [/A = UP:0/] },
      { src: MESSAGE_A, ref: '751-760', any: [/;反抗心/, /;胆怯/] },
      {
        src: MESSAGE_A,
        ref: '761-773',
        any: [/;刚强/, /身体起了反应、微微颤抖着/],
      },
      { src: MESSAGE_A, ref: '774-778', any: [/;感情淡薄/, /轻微电击/] },
      { src: MESSAGE_A, ref: '779-780', any: [/明确地感受到了快感/] },
      { src: MESSAGE_A, ref: '781-790', any: [/主动用手/] },
      { src: MESSAGE_A, ref: '791-807', any: [/依恋地靠着/] },
    ],
  },
  {
    js: 'ere/event/source-check.js',
    refs: [
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
      { src: SOURCE, ref: '426-473', any: [/膣内射精のチェック/] },
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
      { src: DUNGEON_SETUP, ref: '333', any: [/^\s*CALL GEO_OUTPUT_2$/m] },
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
    ],
  },
  {
    js: 'tools/compare/rules.js',
    refs: [{ ref: '66', any: [/打屁股\[ 39\]/] }],
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
  'ere/event/event-train.js': ['6-14', '13-58', '16', '16-201'],
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
    '419-473',
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
  'ere/system/train/com0-caress.js': [
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
    '19-90',
    '22-26',
    '28-90',
    '30-120',
    '69',
    '70',
    '71',
    '74-87',
    '94',
    '744',
    '745',
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
