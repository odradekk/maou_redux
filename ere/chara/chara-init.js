/**
 * @file 角色加入后的初始化：char_init 窄路径（issue #118，ENDING_1 演出的
 *     addCharacter 链）。一人称设定（random_self_call）自 #383 起是完整实现，
 *     落在 ere/chara/chara-self-call.js，本文件只消费它。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *   - 角色一律显式传参（#5 决议第六条：指针不隐式读全局），
 *     wearing_cloth_able 等被调方直接拿 cid，不需要指针交换；
 *   - 角色专属初始化不在本文件：自 #21 起即
 *     ere/chara/chara-ex.js 的 add_chara_ex，本链路的调用方（event-ending）直接用它；
 *   - 显示名槽不需要手工写：#5 决议已定由内置 callname 承载，引擎
 *     addCharacter 自动写 callname:id:-2（呼び名），正是此处要的值
 *     （CONTEXT.md「称呼」条）；
 *   - 菲娅（Chara35）的 cflag/cstr 预设不随 ere addCharacter 落 data
 *     （CFlag.yml/CStr.yml 空名字表 + 引擎 initCharaTable 只抄名字表内
 *     下标，yml/CFlag.yml 头注释实测）。本链路读点已核对全部无行为差异：
 *     CFLAG:9 预设 1 不 > 1（等级段不进）、CFLAG:450 无预设（一人称走
 *     <9 直设，真身逻辑见 chara-self-call.js）、CFLAG:451/453 只在 FLAG:5
 *     位开时被读（窄路径恒 0）。待服装/调教系统读点实现时按 CFlag.yml
 *     头注释的指路补名字条目（见 issue #118 评论的定夺）。
 */

const era = require('#/era-electron');
// wearing_cloth_able 自 #215（J5）起为真身（ere/system/train/cloth.js）
const { wearing_cloth_able } = require('#/system/train/cloth');
const { random_self_call } = require('#/chara/chara-self-call'); // #383 起真身
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { chara } = require('#/facade/chara');
const { st_up } = require('#/dungeon/dungeon-lvup');

/**
 * char_init：初始化从预设加入的角色。
 *
 * 窄路径 = 菲娅（ENDING_1 的 addCharacter 35）：等级段不可达（CFLAG:35:9 = 1
 * 不 > 1）、身体数据段不可达（FLAG:5 位 12/15 恒 0），服装段、一人称
 * 走 <9 直设、能力者技能照掷。条件结构对全部角色一致，不可达段体内占位。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] 随机源（[0,n) 整数），
 *   缺省均匀随机，测试注入定值序（能力者五连掷骰的分支序恒为
 *   275→276→277→278→279）
 * @returns {Promise<number>} 恒返回角色号（cid）
 */
async function char_init(cid, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // 显示名槽无需手工写——callname:id:-2 已由 addCharacter
  // 自动写入（文件头），无动作

  // 等级与基础数值：静态表只设置了等级没设置攻击力时按等级逐级
  // 调 st_up，之后等级钳回（st_up 每次 +1，正好还原）、
  // 体力/气力拉满到上限。菲娅 CFLAG:35:9 = 1（不 > 1）不可达；
  // st_up 自 #179（H10）起为真身
  if (
    (era.get(`cflag:${cid}:9`) || 0) > 1 &&
    (era.get(`cflag:${cid}:11`) || 0) === 0
  ) {
    const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 = 等级
    for (let i = 0; i < lv; i += 1) {
      st_up(cid, rand_n);
    }
    era.set(`cflag:${cid}:9`, lv); // 等级钳回原值
    chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0;
    chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;
  }

  // 着替え装着——wearing_cloth_able 自 #215（J5）起为真身
  // （ere/system/train/cloth.js，显式传参）
  wearing_cloth_able(cid);

  // 一人称の設定（random_self_call）
  await random_self_call(cid); // #546 起为 async（MODE 1 的输入等待）

  // 年齢/身長显示设定（FLAG:5 位 12/15）且身体数据缺失（CFLAG:451
  // == 0 || CFLAG:453 == 0）时生成。FLAG:5 是开局设置位图，窄路径恒 0；真身
  // 自 #385 起在 ere/chara/chara-body.js
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  if (((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0) {
    if (
      (era.get(`cflag:${cid}:451`) || 0) === 0 ||
      (era.get(`cflag:${cid}:453`) || 0) === 0
    ) {
      char_body_generate_wapped(cid, rand_n);
    }
  }

  // 能力者技能：五系全无时各以 rand_n(40) 独立掷 2.5% 获得。
  // ere 无全局随机序列（#117 决议），逐系独立掷，注入点显式传随机源
  const has_element = [275, 276, 277, 278, 279].some(
    (talent) => (era.get(`talent:${cid}:${talent}`) || 0) !== 0,
  );
  if (!has_element) {
    for (const talent of [275, 276, 277, 278, 279]) {
      if (rand_n(40) === 0) {
        // TALENT:x:275-279 = 火/冰/雷/光/暗之能力者（素质名表）
        era.set(`talent:${cid}:${talent}`, 1);
      }
    }
  }

  return cid; // 返回角色号
}

module.exports = { char_init };
