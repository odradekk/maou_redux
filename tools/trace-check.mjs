// 内联行号引用校核器（issue #44 验收整改；#48 验收整改起纳入 emuera.log；
// #63 起 ERB 侧补齐同款扫描完整性）。
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

import { ERB_EXEMPT } from './trace-exempt.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TRAIN_MAIN = 'target/ERB/調教相關/TRAIN_MAIN.ERB';
const BEFORE_TRAIN = 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB';
const USERCOM = 'target/ERB/調教相關/USERCOM.ERB';
const ABL = 'target/ERB/ABL/ABL.ERB';
const CHARA_INFO_SHOW = 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB';
const SHOP = 'target/ERB/SHOP/SHOP ver1.0.2.ERB';
const SHOP_FUNCTION = 'target/ERB/SHOP/SHOP_FUNCTION.ERB';
const TURNEND = 'target/ERB/EVENT/EVENT_TURNEND.ERB';
const ENDING = 'target/ERB/EVENT/ENDING ver 1.0.1.ERB';
const SYSTEM = 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB';
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
      { src: TURNEND, ref: '79-91', any: [/DAY:0 \+= 1/] },
      { src: TURNEND, ref: '93', any: [/CALL ENTER_ENEMY,0/] },
      { src: TURNEND, ref: '95-107', any: [/SENGENMAX/] },
      { src: TURNEND, ref: '108-120', any: [/SENGEN <= 0/] },
      { src: TURNEND, ref: '121-125', any: [/FOR EFFECT/] },
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
    js: 'ere/kojo/kojo-k3.js',
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
    js: 'ere/kojo/kojo-k5.js',
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
      { src: INVASION, ref: '1026-1067', any: [/^\s*@MEDAL_BONUS,ARG$/m] },
    ],
  },
];

// —— emuera.log 行号引用表（#48 验收整改起纳入） ——
//
// src 固定为 target/emuera.log；ref/any 与 ERB 锚同款（区间 N-M 取区间内
// 任一行命中任一锚）。锚的写法对着原始行固定（条形字符数、数值、标签），
// 行号漂移或样本被换，红在这里。既有引用（kojo-k3 的 26、juel-check 的
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
    js: 'ere/kojo/kojo-k3.js',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
  {
    js: 'test/kojo-k3.test.js',
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
    const presence = new RegExp(`log:${ref}(?!-?\\d)`);
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

// —— 扫描完整性：ere/ tools/ test/ 全部 .js/.mjs 里的 log:N 引用都必须
//    在 LOG_REFS 登记（防新增引用绕过锚表——本锁的存在理由就是 #48 的
//    26 处无人看守的偏移） ——

const LOG_REF_RE = /(?:emuera\.)?log:(\d+)(?:-(\d+))?/g;

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
for (const rel of ['ere', 'tools', 'test'].flatMap(list_js_files)) {
  const found = new Set(
    [...load_js_text(rel).matchAll(LOG_REF_RE)].map((m) =>
      m[2] ? `${m[1]}-${m[2]}` : m[1],
    ),
  );
  for (const ref of found) {
    if (!tabled_by_file.get(rel)?.has(ref)) {
      console.log(
        `✗ ${rel} log:${ref} —— 未登记进 LOG_REFS（登记后才能过锚校验）`,
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
  'ere/kojo/kojo-k3.js': [
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
  'ere/kojo/kojo-k5.js': [
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
