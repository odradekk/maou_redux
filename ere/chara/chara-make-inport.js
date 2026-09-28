/**
 * @file 异国（通信）勇者的生成（issue #394，N10）。
 *
 * 调用面：ere 侧只有转发层 ere/chara/char-make.js 的 char_make_inport 调
 * 本函数；两个真实调用点在 ere/event/enter-enemy.js，都经转发层，
 * 不直接 require 本文件。
 *
 * 移植决议与有意偏离既有行为（逐条注明依据）：
 *
 *   一、**通信名单是 `global:100` 的 JSON 数组**
 *       （ere/era-utils/era-global.js 手写区「communication_roster」，MAOUNET
 *       工单定下的形状，元素字段序与 ere/system/cross-save-sharing.js 的
 *       serialize_character 一致）。取值走该模块的 get_roster()，不另写一份
 *       解析——记录格式的真相源只有那一处。
 *
 *   二、**建角色即 `era.addCharacter(no)`**（扁平化 #21：ere 的角色号即
 *       预设号，没有「先建空白角色、事后指定预设」这一档，
 *       event-chara-leave.js:188-190 同款处置）。由此引出一处**有意偏离既有
 *       行为**：引擎的 addCharacter 对无预设的号返回 false（既有行为里这一步
 *       不会失败）。此时提前返回 0，不往不存在的桶里写——AGENTS.md「名字表
 *       在 + 桶不在 → 静默丢弃」说的就是这种「函数看着成功、数据其实全丢
 *       了」的情形。
 *
 *   三、**显示名槽不写预设号的静态称呼**：ere 侧 NAME 与 SAVESTR/CALLNAME
 *       共享 callname 表的两槽（#5 决议，CONTEXT.md「称呼」：-1 名前 /
 *       -2 呼び名），表达不了「一个槽放预设静态名、另一个放导入名」。处置
 *       与 event-chara-leave.js:194-195 一致：两槽都落导入称呼，导入角色的
 *       显示名因此就是它自己的名字，而不是它那个预设号的静态名。
 *
 *   四、跨域写一律走门面（#71：cflag:501 属 dungeon、cflag:502 属 event、
 *       cflag:1 属 invasion、cflag:9 属 chara、exp:80 与 base:0/1 属
 *       dungeon）。十张二维表的回填**不在此列**：下标来自记录里的一段文本
 *       （to_int 解析），#70 的动态下标无属主可比、不判域，按
 *       event-chara-leave.js 的 decode_table 同款写法处理。
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

/** 文本转数值（非数值与空串一律 0；记录段由 serialize_character 写出） */
const to_int = (value) => Number(value) || 0;

/** 记录里十张二维表段的表名（record 下标即段序 + 4） */
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
 * 一段 `"下标,值/下标,值/"` 的回填（cstr 段的值是字符串）。
 * 结尾分隔符会多切出一个空元素，由 slice(0, -1) 挡掉。
 *
 * @param {number} cid 角色 ID
 * @param {string} table 表名（abl / base / … / cstr）
 * @param {string} segment 记录段
 * @param {boolean} is_string 段内值是否为字符串
 * @returns {void}
 */
function decode_table(cid, table, segment, is_string) {
  if (!segment) return;
  // 段尾必有一个空元素（serialize_character 的每项都以 "/" 收尾），slice 挡掉
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
 * chara_make_inport：从通信名单里抽一名异国勇者加入游戏。
 *
 * @param {(n: number) => number} [rand] 随机源（[0,n) 整数），
 *   缺省均匀随机；测试注入定值序
 * @returns {number} 新角色号；无可用记录、名单为空或
 *   目标预设不存在时 0（预设不存在那一档见文件头二）
 */
function chara_make_inport(rand = default_rand) {
  // 外来勇者等级上限（FLAG:76，MAOUNET 菜单设定）<= 0 则直接返回 0
  const level_cap = game.system.外来勇者等级上限;
  if (level_cap <= 0) {
    return 0;
  }

  // 候选槽位表（空档 -100）与它的计数
  const list = new Array(100).fill(-100);
  let candidate_count = 0;

  const roster = get_roster();
  // 扫全部 100 个名单槽，逐条过四道过滤
  for (let slot = 0; slot < 100; slot += 1) {
    const record = String(roster[slot] ?? '');
    if (record === '') continue; // 空槽

    const fields = record.split('_');
    // 等级高于上限的勇者不来（`>` 而非 `>=`，等于上限放行）
    if (to_int(fields[2]) > level_cap) continue;

    // 同一唯一标记的角色已在场则不重复导入
    const stamp = to_int(fields[0]); // CFLAG:190 通信勇者唯一标记
    let duplicated = false;
    for (const other of era.getAddedCharacters()) {
      if (chara(other).system.通信勇者唯一标记 === stamp) {
        duplicated = true;
        break;
      }
    }
    if (duplicated) continue;

    // 同一预设号已在场则跳过
    // （#21 扁平化下即「已加入名单里有这个号」）
    if (era.getAddedCharacters().includes(to_int(fields[1]))) continue;

    list[candidate_count] = slot;
    candidate_count += 1;
  }

  // 没有可生成的勇者
  if (candidate_count === 0) {
    return 0;
  }

  // 从候选里随机抽一条（分母是候选数，不是 100）
  const chosen = list[rand(candidate_count)];
  const record = String(roster[chosen] ?? '').split('_');

  // 建角色（扁平化下角色号 = 预设号，见文件头二）
  const cid = to_int(record[1]); // 记录里的预设号
  if (!era.addCharacter(cid)) {
    return 0; // 有意的防护判断，见文件头二
  }

  // 两槽都写记录里的称呼（ere 侧同落 -2，见文件头三）
  const nickname = record[3] ?? '';
  era.set(`callname:${cid}:-2`, nickname); // callname:-2 称呼槽
  era.set(`callname:${cid}:-1`, nickname); // callname:-1 姓名槽

  // 十张二维表回填
  for (const [index, [table, is_string]] of TABLE_SEGMENTS.entries()) {
    decode_table(cid, table, record[index + 4] ?? '', is_string);
  }

  // 侵入階層 / 侵攻度 / 侵攻中設定（跨域写走门面）
  chara(cid).dungeon.侵攻阶层 = 1; // CFLAG:501
  chara(cid).event.侵攻度 = 0; // CFLAG:502
  chara(cid).invasion.状态 = 2; // CFLAG:1 = 2 侵攻中

  // FLAG:77「通信勇者登场时为等级 1」：压到 1 级后按 FLAG:60 补级
  if (era_flag.communication_hero_level_one) {
    chara(cid).chara.等级 = 1; // CFLAG:9
    chara(cid).dungeon.战斗经验 = 0; // EXP:80
    // FLAG:60 勇者基础等级修正：逐级 st_up
    const times = game.event.勇者基础等级修正;
    if (times > 0) {
      for (let i = 0; i < times; i += 1) {
        st_up(cid, rand); // 补一级
      }
    }
  }

  // HP 与气力补到上限（BASE:0/1 = MAXBASE:0/1）
  chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0;
  chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;

  // 身体データ未生成なら生成（#385 起真身；FLAG:5 的位检查在函数内部）
  if (chara(cid).chara.年龄 === 0) {
    char_body_generate_wapped(cid, rand);
  }

  return cid;
}

module.exports = { chara_make_inport };
