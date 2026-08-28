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
const FLAG_SUMMARY = 'target/資料_非必要無須解壓/eramaouフラグまとめ.txt';

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
      { src: DUNGEON, ref: '29-30', any: [/SIF CFLAG:\(ARG:0\):1 == 3/] },
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
