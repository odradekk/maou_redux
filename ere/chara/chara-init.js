/**
 * @file 角色加入后的初始化：@CHAR_INIT 窄路径（issue #118，ENDING_1 演出的
 *     ADDCHARA 链）。一人称设定（@RANDOM_SELF_CALL）自 #383 起是完整实现，
 *     落在 ere/chara/chara-self-call.js，本文件只消费它。
 *
 * 源: target/ERB/キャラ関数/CHAR_MAKE.ERB  @CHAR_INIT（:22-25，JUMP 壳）
 *       target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB  @CHARA_INIT（:2-49 本体）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作经全局 A / TARGET 传角色（`A = CHARANUM-1` 后 JUMP CHARA_INIT(A)、
 *     SWAP L_A,TARGET 后 CALL WEARING_CLOTH_ABLE），ere 侧一律显式传参
 *     （#5 决议第六条：指针不隐式读全局）；SWAP 语义随传参消解；
 *   - @ADDCHARA_EX（EXCOM.ERB）不在本文件：ere 侧自 #21 起即
 *     ere/chara/chara-ex.js，本链路的调用方（event-ending）直接用它；
 *   - 原作 `SAVESTR:L_A = %CALLNAME:L_A%`（:7）不动作：#5 决议已定 SAVESTR
 *     由内置 callname 承载，引擎 addCharacter 自动写 callname:id:-2（呼び名）
 *     即本行的值（CONTEXT.md「称呼」条）；
 *   - 菲娅（Chara35）的 cflag/cstr 预设不随 ere addCharacter 落 data
 *     （CFlag.yml/CStr.yml 空名字表 + 引擎 initCharaTable 只抄名字表内
 *     下标，yml/CFlag.yml 头注释实测）。本链路读点已核对全部无行为差异：
 *     CFLAG:9 预设 1 不 > 1（等级段不进）、CFLAG:450 无预设（一人称走
 *     <9 直设，真身逻辑见 chara-self-call.js）、CFLAG:451/453 只在 FLAG:5
 *     位开时被读（窄路径恒 0）。待服装/调教系统读点落地时按 CFlag.yml
 *     头注释的指路补名字条目（见 issue #118 评论的定夺）。
 */

const era = require('#/era-electron');
const { stub_line_wait } = require('#/utils/stub-line');
// WEARING_CLOTH_ABLE 自 #215（J5）起为真身（ere/system/train/cloth.js）
const { wearing_cloth_able } = require('#/system/train/cloth');
const { random_self_call } = require('#/chara/chara-self-call'); // #383 起真身
const { chara } = require('#/facade/chara');
const { st_up } = require('#/dungeon/dungeon-lvup');

/** 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 * ST_UP 自 #179（H10）起为真身（ere/dungeon/dungeon-lvup.js）、
 * SET_SUIT_SELFCALL/SET_NICK_SELFCALL/CSVCSTR 自 #383 起为真身
 * （ere/chara/chara-self-call.js），均移出名单。 */
const STUBBED_CALLS = ['CHAR_BODY_GENERATE_WAPPED'];
/**
 * @CHARA_INIT（CHAR_MAKE.ERB:22 JUMP 壳 → CHARA_MAKE_INIT.ERB:2 @CHARA_INIT）：
 * 初始化从预设加入的角色。
 *
 * 窄路径 = 菲娅（ENDING_1 的 ADDCHARA 35）：等级段不可达（CFLAG:35:9 = 1
 * 不 > 1）、身体数据段不可达（FLAG:5 位 12/15 恒 0），服装存根、一人称
 * 走 <9 直设、能力者技能照掷。条件结构对全部角色 1:1，不可达段体内占位。
 *
 * @param {number} cid 角色 ID（原作的全局 A / CHARANUM-1）
 * @param {(n: number) => number} [rand] 原作 RAND:N（[0,n) 整数）的随机源，
 *   缺省均匀随机，测试注入定值序（能力者五连掷骰的分支序恒为
 *   275→276→277→278→279）
 * @returns {Promise<number>} 原作恒 RETURN L_A（角色号）
 */
async function char_init(cid, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :7 SAVESTR:L_A = %CALLNAME:L_A% —— callname:id:-2 已由 addCharacter
  // 自动写入（文件头），无动作

  // :10-18 等级与基础数值：CSV 只设置了等级没设置攻击力时按等级逐级
  // CALL ST_UP（:14），之后等级钳回（:15——ST_UP 每次 +1，正好还原）、
  // 体力/气力拉满到上限（:16-17）。菲娅 CFLAG:35:9 = 1（不 > 1）不可达；
  // ST_UP 自 #179（H10）起为真身
  if (
    (era.get(`cflag:${cid}:9`) || 0) > 1 &&
    (era.get(`cflag:${cid}:11`) || 0) === 0
  ) {
    const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 = 等级
    for (let i = 0; i < lv; i += 1) {
      st_up(cid, rand_n);
    }
    era.set(`cflag:${cid}:9`, lv); // :15 等级钳回原值
    chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0; // :16
    chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0; // :17
  }

  // :22-24 着替え装着（SWAP TARGET → CALL WEARING_CLOTH_ABLE :23 → SWAP）
  // ——#215（J5）起真身（ere/system/train/cloth.js，显式传参消解 SWAP）
  wearing_cloth_able(cid);

  // :27 一人称の設定（CALL RANDOM_SELF_CALL）
  random_self_call(cid);

  // :29-33 年齢/身長显示设定（FLAG:5 位 12/15，:30）且身体数据缺失（CFLAG:451
  // == 0 || CFLAG:453 == 0）时生成。FLAG:5 是开局设置位图，窄路径恒 0；
  // 身体数据生成本体已有登记（村娘线的调用点，EVENTFIRST:121）
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  if (((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0) {
    if (
      (era.get(`cflag:${cid}:451`) || 0) === 0 ||
      (era.get(`cflag:${cid}:453`) || 0) === 0
    ) {
      await stub_line_wait(
        'CHAR_BODY_GENERATE_WAPPED',
        '角色身体数据生成',
        '随角色身体票',
      );
    }
  }

  // :36-53 能力者技能：五系全无时各 RAND:40 独立掷 2.5% 获得（:38 起）
  // ere 无全局 RAND 序列（#117 决议），逐系独立掷，注入点显式传随机源
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

  return cid; // :54 RETURN L_A
}

module.exports = { STUBBED_CALLS, char_init };
