/**
 * @file 异国（通信）勇者的生成（issue #394，N10）。
 *
 * 源: target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB  @CHARA_MAKE_INPORT（:2-126）
 *
 * 调用面：全库只有转发层 ere/chara/char-make.js 的 @CHAR_MAKE_INPORT（源
 * CHAR_MAKE.ERB:27-34 的判定式 + CHAR_MAKE.ERB:34 的 JUMP）调本函数；两个
 * 真实调用点是 ere/event/enter-enemy.js:215（源 ENTER_ENEMY.ERB:63）与
 * ere/event/enter-enemy.js:518（源 ENTER_ENEMY.ERB:350），都经转发层，
 * 不直接 require 本文件。
 *
 * 移植决议与有意偏离（逐条注明依据）：
 *
 *   一、**原作 `GLOBALS:0..99` 在 ere 侧是 `global:100` 的 JSON 数组**
 *       （ere/era-utils/era-global.js 手写区「communication_roster」，MAOUNET
 *       票定的形状，元素字段序与 ere/system/cross-save-sharing.js 的
 *       serialize_character 一致）。取值走该模块的 get_roster()，不另写一份
 *       解析——记录格式的真相源只有那一处。
 *
 *   二、**`ADDVOIDCHARA` + `NO:CHARA = TOINT(LOCALS:1)` 在扁平化（#21）下
 *       就是 `era.addCharacter(no)`**：ere 的角色号即预设号，没有「先建空白
 *       角色、事后指定 NO」这一档（event-chara-leave.js:188-190 同款处置）。
 *       由此引出一处**有意偏离**：引擎的 addCharacter 对无预设的号返回
 *       false（原作 ADDVOIDCHARA 不会失败，它建的正是无预设的角色）。此时
 *       提前 RETURN 0，不往不存在的桶里写——AGENTS.md「名字表在 + 桶不在 →
 *       静默丢弃」说的就是这种「函数看着成功、数据其实全丢了」的形态。
 *
 *   三、**`NAME:CHARA = CALLNAME(NO:CHARA, 0)`（:52）不落地**：它读的是
 *       CSV 静态呼び名，与 :49/:51 写进去的导入称呼是**两个不同的值**，而
 *       ere 侧 NAME 与 SAVESTR/CALLNAME 共享 callname 表的两槽（#5 决议，
 *       CONTEXT.md「称呼」：-1 名前 / -2 呼び名），同一个槽表达不了「NAME
 *       是 CSV 名、SAVESTR 是导入名」。处置与 event-chara-leave.js:194-195
 *       一致：两槽都落导入称呼，导入角色的显示名因此就是它自己的名字，而
 *       不是它那个预设号的静态名。行号引用保留在本注释里。
 *
 *   四、跨域写一律走门面（#71：cflag:501 属 dungeon、cflag:502 属 event、
 *       cflag:1 属 invasion、cflag:9 属 chara、exp:80 与 base:0/1 属
 *       dungeon）。十张二维表的回填**不在此列**：下标来自记录里的一段文本
 *       （`TOINT(NUMS)`），#70 的动态下标无属主可比、不判域，按
 *       event-chara-leave.js 的 decode_table 同款写法原样落地。
 */

'use strict';

const era = require('#/era-electron');
const { get_roster } = require('#/system/cross-save-sharing');
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { st_up } = require('#/dungeon/dungeon-lvup');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');

const default_rand = (n) => Math.floor(Math.random() * n);

/** TOINT 的等价物（非数值与空串一律 0；记录段由 serialize_character 写出） */
const to_int = (value) => Number(value) || 0;

/** 记录里十张二维表段的表名，按 :54-103 的读取顺序（下标即 LOCALS 序号 - 4） */
const TABLE_SEGMENTS = [
  ['abl', false],
  ['base', false],
  ['maxbase', false],
  ['cflag', false],
  ['exp', false],
  ['equip', false],
  ['juel', false],
  ['talent', false],
  ['mark', false],
  ['cstr', true],
];

/**
 * :54-103 一段 `"下标,值/下标,值/"` 的回填（cstr 段的值是字符串）。
 * 收尾的空段由外层 `RESULT-1` 的上界挡掉：`SPLIT` 对结尾分隔符会多切出
 * 一个空元素，原作的 `FOR LOCAL, 0, RESULT-1` 因此正好跳过它。
 *
 * @param {number} cid 角色 ID（原作 CHARA）
 * @param {string} table 表名（abl / base / … / cstr）
 * @param {string} segment 记录段
 * @param {boolean} is_string 段内值是否为字符串
 * @returns {void}
 */
function decode_table(cid, table, segment, is_string) {
  if (!segment) return;
  // RESULT-1：段尾必有一个空元素（serialize_character 的每项都以 "/" 收尾）
  const pieces = segment.split('/').slice(0, -1);
  for (const piece of pieces) {
    const [index_text, value_text] = piece.split(',');
    era.set(
      `${table}:${cid}:${to_int(index_text)}`,
      is_string ? value_text : to_int(value_text),
    );
  }
}

/**
 * @CHARA_MAKE_INPORT（:2-126）：从通信名单里抽一名异国勇者加入游戏。
 *
 * @param {(n: number) => number} [rand] 原作 `RAND:N`（[0,n) 整数）的随机源，
 *   缺省均匀随机；测试注入定值序
 * @returns {number} 新角色号（原作 `RETURN CHARA`）；无可用记录、名单为空或
 *   目标预设不存在时 0（原作 `RETURN 0`，预设不存在那一档见文件头二）
 */
function chara_make_inport(rand = default_rand) {
  // :9-10 SIF FLAG:76 <= 0 RETURN 0（FLAG:76 外来勇者等级上限，MAOUNET 菜单设定）
  const level_cap = game.system.外来勇者等级上限;
  if (level_cap <= 0) {
    return 0;
  }

  // :12-13 VARSET LIST, -100 / LOCAL:1 = 0 —— 候选槽位表与它的计数
  const list = new Array(100).fill(-100);
  let candidate_count = 0;

  const roster = get_roster();
  // :15-35 扫全部 100 个名单槽，逐条过四道过滤
  for (let slot = 0; slot < 100; slot += 1) {
    const record = String(roster[slot] ?? '');
    if (record === '') continue; // :16-17 空槽

    const fields = record.split('_');
    // :19-20 等级高于上限的勇者不来（`>` 而非 `>=`，等于上限放行）
    if (to_int(fields[2]) > level_cap) continue;

    // :21-27 同一唯一标记的角色已在场则不重复导入
    const stamp = to_int(fields[0]); // CFLAG:190 通信勇者唯一标记
    let duplicated = false;
    for (const other of era.getAddedCharacters()) {
      if (chara(other).system.通信勇者唯一标记 === stamp) {
        duplicated = true; // :24
        break; // :25
      }
    }
    if (duplicated) continue; // :28-29

    // :31-32 同一预设号已在场则跳过（GETCHARA(NO, 0) >= 0，
    // #21 扁平化下即「名单里有这个号」）
    if (era.getAddedCharacters().includes(to_int(fields[1]))) continue;

    list[candidate_count] = slot; // :33
    candidate_count += 1; // :34
  }

  // :38-39 没有可生成的勇者
  if (candidate_count === 0) {
    return 0;
  }

  // :42 从候选里随机抽一条（RAND 的分母是候选数，不是 100）
  const chosen = list[rand(candidate_count)];
  const record = String(roster[chosen] ?? '').split('_');

  // :44-45 空白角色を作成 / CHARA = CHARANUM-1（扁平化下角色号 = 预设号，见文件头二）
  const cid = to_int(record[1]); // :47 NO:CHARA
  if (!era.addCharacter(cid)) {
    return 0; // 有意的守卫，见文件头二
  }

  // :49-51 SAVESTR / CALLNAME 都写 LOCALS:3（ere 侧同落 -2，见文件头三）
  const nickname = record[3] ?? '';
  era.set(`callname:${cid}:-2`, nickname); // :49 SAVESTR:CHARA = %LOCALS:3%
  era.set(`callname:${cid}:-1`, nickname); // :51 CALLNAME:CHARA = %LOCALS:3%

  // :54-103 十张二维表回填
  for (const [index, [table, is_string]] of TABLE_SEGMENTS.entries()) {
    decode_table(cid, table, record[index + 4] ?? '', is_string);
  }

  // :106-108 侵入階層 / 侵攻度 / 侵攻中設定（跨域写走门面）
  chara(cid).dungeon.侵攻阶层 = 1; // CFLAG:501
  chara(cid).event.侵攻度 = 0; // CFLAG:502
  chara(cid).invasion.状态 = 2; // :108 CFLAG:1 = 2 侵攻中

  // :109-118 FLAG:77「通信勇者登场时为等级 1」：压到 1 级后按 FLAG:60 补级
  if (era_flag.communication_hero_level_one) {
    chara(cid).chara.等级 = 1; // :111 CFLAG:9
    chara(cid).dungeon.战斗经验 = 0; // :112 EXP:80
    // :113-117 FLAG:60 勇者基础等级修正：逐级 ST_UP
    const times = game.event.勇者基础等级修正;
    if (times > 0) {
      for (let i = 0; i < times; i += 1) {
        st_up(cid, rand); // :115 CALL ST_UP, CHARA
      }
    }
  }

  // :119-120 HP 与气力补到上限（BASE:0/1 = MAXBASE:0/1）
  chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0;
  chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;

  // :123-124 身体データ未生成なら生成（#385 起真身；FLAG:5 的位闸门在函数内部）
  if (chara(cid).chara.年龄 === 0) {
    char_body_generate_wapped(cid, rand);
  }

  return cid; // :126 RETURN CHARA
}

module.exports = { chara_make_inport };
