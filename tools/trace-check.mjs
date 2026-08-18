// 内联行号引用校核器（issue #44 验收整改；#48 验收整改起纳入 emuera.log）。
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
// 行号一律以原始文件为准（emuera.log 是 UTF-8 BOM + CRLF，BOM 不占行）。
// 后来者改代码动了引用：把表里的 ref/锚一起更新，锚对着 target/ 原文
// 重新落位——表本身以源文件为准，不以致动者的记忆为准。
//
// 用法：node tools/trace-check.mjs（全绿退出码 0，任何失配退出码 1）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TRAIN_MAIN = 'target/ERB/調教相關/TRAIN_MAIN.ERB';
const BEFORE_TRAIN = 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB';
const USERCOM = 'target/ERB/調教相關/USERCOM.ERB';
const ABL = 'target/ERB/ABL/ABL.ERB';
const CHARA_INFO_SHOW = 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB';
const SHOP = 'target/ERB/SHOP/SHOP ver1.0.2.ERB';
const SHOP_FUNCTION = 'target/ERB/SHOP/SHOP_FUNCTION.ERB';
const TURNEND = 'target/ERB/EVENT/EVENT_TURNEND.ERB';
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
      { src: TURNEND, ref: '140', any: [/^BEGIN SHOP$/m] },
      { src: SYSTEM, ref: '234-760', any: [/^@EVENTTURNEND$/m] },
      { src: SYSTEM, ref: '758', any: [/^BEGIN SHOP$/m] },
    ],
  },
  {
    js: 'ere/page/page-train.js',
    refs: [
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
      // EX 口上欠账的两处源引用（文件头说明）
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
];

// —— emuera.log 行号引用表（#48 验收整改起纳入） ——
//
// src 固定为 target/emuera.log；ref/any 与 ERB 锚同款（区间 N-M 取区间内
// 任一行命中任一锚）。锚的写法对着原始行钉死（条形字符数、数值、标签），
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
    // 变异驱动器的 find 串逐字引用 replay.js 的证据注释——引用的引用同样
    // 进锁：find 里的行号被改错，这里先红（比驱动器的「出现次数≠1」更早）
    js: 'tools/mutation-check.mjs',
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

console.log(
  failures === 0
    ? `✓ ${checked} 条内联行号引用全部与源文件一致`
    : `✗ ${failures}/${checked} 条引用对不上`,
);
process.exit(failures === 0 ? 0 : 1);
