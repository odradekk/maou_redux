/**
 * @file 角色加入后的初始化：@CHAR_INIT 窄路径 + @RANDOM_SELF_CALL 窄路径
 *     （issue #118，ENDING_1 演出的 ADDCHARA 链）。
 *
 * 源: target/ERB/キャラ関数/CHAR_MAKE.ERB  @CHAR_INIT（:22-25，JUMP 壳）
 *       target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB  @CHARA_INIT（:2-49 本体）
 *       target/ERB/キャラ関数/SELF_CALL.ERB  @RANDOM_SELF_CALL（:2-65）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作经全局 A / TARGET 传角色（`A = CHARANUM-1` 后 JUMP CHARA_INIT(A)、
 *     SWAP L_A,TARGET 后 CALL WEARING_CLOTH_ABLE），ere 侧一律显式传参
 *     （#5 决议第六条：指针不隐式读全局）；SWAP 语义随传参消解；
 *   - @ADDCHARA_EX（EXCOM.ERB）不在本文件：ere 侧自 #21 起即
 *     ere/chara/chara-ex.js，本链路的调用方（event-ending）直接用它；
 *   - 原作 `SAVESTR:L_A = %CALLNAME:L_A%`（:6）不动作：#5 决议已定 SAVESTR
 *     由内置 callname 承载，引擎 addCharacter 自动写 callname:id:-2（呼び名）
 *     即本行的值（CONTEXT.md「称呼」条）；
 *   - 菲娅（Chara35）的 cflag/cstr 预设不随 ere addCharacter 落 data
 *     （CFlag.yml/CStr.yml 空名字表 + 引擎 initCharaTable 只抄名字表内
 *     下标，yml/CFlag.yml 头注释实测）。本链路读点已核对全部无行为差异：
 *     CFLAG:9 预设 1 不 > 1（等级段不进）、CFLAG:450 无预设（一人称走
 *     <9 直设）、CFLAG:451/453 只在 FLAG:5 位开时被读（窄路径恒 0）、
 *     CSTR:60 被 RANDOM_SELF_CALL 覆写。待服装/调教系统读点落地时按
 *     CFlag.yml 头注释的指路补名字条目（见 issue #118 评论的定夺）。
 */

const era = require('#/era-electron');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');

/** 本文件存根化的原作调用名（docs/stub-registry.md 核对固定） */
const STUBBED_CALLS = [
  'ST_UP',
  'WEARING_CLOTH_ABLE',
  'SET_SUIT_SELFCALL',
  'SET_NICK_SELFCALL',
  'CHAR_BODY_GENERATE_WAPPED',
  'CSVCSTR',
];

/**
 * @RANDOM_SELF_CALL（SELF_CALL.ERB:2-65）窄路径：一人称的设定。
 *
 * 原作的完整分支链：CFLAG:ARG:450 ∈ [0,9) → 直设「我」；[9,100) →
 * SET_SUIT_SELFCALL（合适一人称表）；[100,200) → SET_NICK_SELFCALL（绰号
 * 一人称表）；≥200 或负 → 回落 CSV 预设 CSTR:60（CSVCSTR）。本票只做
 * 窄路径命中的 [0,9) 直设与 CSV 回落的判空骨架——两段一人称表与 CSV 预设
 * 读取通道未移植（登记），命中表段时占位并保留 CFLAG:450 原值不动（与
 * 「掷不出结果」等价，后续票恢复）。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 已设定的一人称档位（原作 RETURN 值）
 */
async function random_self_call(cid) {
  // :6 LOCAL = CFLAG:ARG:450；:7-8 MODE == 0 → GOTO RANDOM（本函数只有
  // 随机入口，MODE 1 的自定义输入分支是 CHARA_INFO 的改名界面，未移植）
  let local = era.get(`cflag:${cid}:450`) || 0;
  // :25-26 SIF LOCAL >= 200 → LOCAL = -1（CSV 回落档）
  if (local >= 200) {
    local = -1;
  }
  // :28-36 LOCAL < 0：CSV 预设回落（CSVCSTR(NO:ARG,60)，:29）——ere 侧预设不落
  // data（文件头），读取通道未移植，占位并按「预设为空」继续走 <9 直设
  // （原作 STRLENS(LOCALS) == 0 时同样落下）
  if (local < 0) {
    stub_line('CSVCSTR', '角色预设 CSTR 的读取', '随数据管线票');
  }
  // :38-42 LOCAL < 9 → 一人称 = 我（:39-40），CFLAG:450 = 9
  if (local < 9) {
    era.set(`cstr:${cid}:60`, '我'); // CSTR:x:60 一人称
    era.set(`cflag:${cid}:450`, 9); // CFLAG:x:450 一人称档位
    return 9;
  }
  // :44-52 LOCAL < 100 → SET_SUIT_SELFCALL（:46）；:54-62 LOCAL < 200 →
  // SET_NICK_SELFCALL（两段一人称表未移植，占位）
  if (local < 100) {
    await stub_line_wait('SET_SUIT_SELFCALL', '合适一人称的设定', '随一人称票');
  } else {
    await stub_line_wait('SET_NICK_SELFCALL', '绰号一人称的设定', '随一人称票');
  }
  return local;
}

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

  // :10-18 等级与基础数值：CSV 只设置了等级没设置攻击力时按等级逐级 CALL
  // ST_UP（:14）
  // ST_UP。菲娅 CFLAG:35:9 = 1（不 > 1）不可达；命中的角色（随机生成线）
  // 随升级票
  if (
    (era.get(`cflag:${cid}:9`) || 0) > 1 &&
    (era.get(`cflag:${cid}:11`) || 0) === 0
  ) {
    await stub_line_wait('ST_UP', '按等级的基础数值初始化', '随升级票');
  }

  // :22-24 着替え装着（SWAP TARGET → CALL WEARING_CLOTH_ABLE :23 → SWAP）
  await stub_line_wait('WEARING_CLOTH_ABLE', '初始着装', '随服装票');

  // :27 一人称の設定（CALL RANDOM_SELF_CALL）
  await random_self_call(cid);

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

module.exports = { STUBBED_CALLS, char_init, random_self_call };
