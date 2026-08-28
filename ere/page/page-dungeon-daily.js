/**
 * @file 地城日常的部下日程（issue #179，阶段 3 H10）。
 *
 * 源: target/ERB/迷宮/DUNGEON_DAILY.ERB  @DISPLAY_DUNGEON_DAILY（:1-768）、
 *     @CAL_DUNGEON_DAILY（:769-774，仅 6 行）
 *
 * 调用点：
 *   - @DISPLAY_DUNGEON_DAILY ← ere/page/page-main-menu.js 的
 *     draw_dungeon_daily 尾部（原作 DRAW_MAINMENU.ERB:601，本票接线）；
 *   - @CAL_DUNGEON_DAILY **原作全库无调用点**（grep 证实：定义之外零引用，
 *     与 @DISPLAY 尾部的调用关系不存在）——1:1 移植函数体、同样不接线，
 *     落这里防遗失（docs/stub-registry.md 不占存根位：无调用点即无占位行）。
 *
 * == 原作的真实输出面（768 行里的大半是死输出） ==
 *
 * @DISPLAY_DUNGEON_DAILY 是未完成的函数（:7 首行即 "Space for further
 * docuement"，:8-12 的区间注释对着 :94-767 的五档空壳）。逐段核对：
 *   - 奴隶日常（:15-37）：扫描空闲（CFLAG:x:1 == 0）且爱慕/淫乱（TALENT
 *     76/85）的角色，随机取一为当日目标——STORAGE 数组 + Testing Purpose
 *     调试输出三行，**活代码**；
 *   - 显示段（:39-68）：目标名 + 类型标签（女儿/魔物娘/性格素质名/EX 素质
 *     名）+ 日常类型（爱慕日常/淫乱日常）一行，**活代码**；
 *   - 怪物日常（:70-554）：TEMP = RAND(49) 经 SELECTCASE 映射到 100-193
 *     （:72-93），此后五档 EX_FLAG:99 区间的内层 IF TEMP == 0..44（共
 *     225 个分支）**全部是空 PRINTFORML，且 TEMP >= 100 恒不命中**——
 *     段内零输出。唯一可观测效果是消耗一次随机数，1:1 保留消费、不落
 *     225 个空分支（dungeon-trap.js 对 D:1 死变量的同款处理：不落变量、
 *     注释留痕）；
 *   - 地城日常（:555-767）：TEMP = RAND(20)，五档区间内 IF TEMP == 0..19
 *     必命中其一，命中体是**空 PRINTFORML**——段内恒输出一个空行。
 *     归约为「消耗一次随机数 + 一个空行」；
 *   - @CAL_DUNGEON_DAILY：威望（EX_FLAG:99）钳上界 100 后每日 -2。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - SAVESTR:DAILYTARGET → name_of（CONTEXT.md「称呼」：本作 SAVESTR:x =
 *     名前，等价 callname:x:-1）；
 *   - REPEAT CHARANUM 以已加入序号迭代，ere 侧按角色 ID 迭代
 *     （era.getAddedCharacters()，turnend-settle.js 同款说明）；
 *     `SIF DAILYTARGET >= CHARANUM` 的越界早退随之按语义移植为「不在已
 *     加入列表」（page-main-menu.js 的 reset_out_of_range_pointers 同款）；
 *   - ere 无全局 RAND 序列（#117 决议），三次随机消费经注入 rand_n 掷出
 *     （缺省 Math.random）；
 *   - EX_TALENTNAME（:57）的名字表未落 yml/（yml/Ex_Talent.yml 空名字表，
 *     名称条目随读档钩子票，见该文件头注）——本函数照读，读不到时按空串
 *     （原作 EX_TALENTNAME_INIT 未跑时同为空）；EX_TALENT:x:2（女儿）当前
 *     无写入者（chara-ex.js 的八个实现写下标 4/101-104/200/223/777/801/
 *     901），结构 1:1 保留、当前不达；
 *   - 原文的全角空格以 \u3000 转义书写（page-main-menu.js 先例：prettier
 *     会吃字符串里的裸全角空格）。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_exflag = require('#/era-utils/era-exflag');

/** 原文排版里的全角空格（UNICODE 0x3000，page-main-menu.js 先例） */
const FULL_WIDTH_SPACE = '\u3000';

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 名字承载（#5 决议；savestr 通道不存在，dungeon-trap.js 同款） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * @DISPLAY_DUNGEON_DAILY（DUNGEON_DAILY.ERB:1-768）：地城日常面板的部下
 * 日程——当日奴隶日常目标 + 一行显示 + 怪物/地城日常的（空）输出。
 *
 * 正常路径的输出共 5-8 行：占位头一行、Testing Purpose 调试两到三行、
 * 目标显示行、地城日常空行（怪物段零输出，文件头）。
 *
 * @param {(n: number) => number} [rand] 原作 RAND:N 的随机源（缺省均匀
 *   随机）。消费顺序：目标掷选（有候选时）→ 怪物段 → 地城段
 * @returns {number} 0（原作两处 SIF RETURN 0 与正常落底同为 0）
 */
function display_dungeon_daily(rand = default_rand) {
  const added = era.getAddedCharacters();

  // :6-7 占位头（PRINT 全角空格 + PRINTFORML 拼一行）
  era.print(`${FULL_WIDTH_SPACE} Space for further docuement`);

  // :13 STORAGE:0 = 0；:16-23 奴隶日常扫描：空闲且爱慕（85）/淫乱（76）
  const storage = [];
  for (const cid of added) {
    if (chara(cid).invasion.状态 === 0) {
      if (
        (era.get(`talent:${cid}:76`) || 0) === 1 ||
        (era.get(`talent:${cid}:85`) || 0) === 1
      ) {
        storage.push(cid);
      }
    }
  }

  // :24-27 Testing Purpose 的计数行
  era.print('Testing Purpose');
  era.print(`${storage.length}`);

  // :28-37 有候选 → RAND (STORAGE)（RESULT = [0, n)）+ 1 → 一位下标
  let daily_target = 0; // 无候选时保持 0（原作 DAILYTARGET 初值）
  if (storage.length !== 0) {
    const picked = rand(storage.length) + 1; // :29-30 RAND + RESULT++
    daily_target = storage[picked - 1]; // STORAGE:RESULT（一位下标）
    era.print('Testing Purpose');
    era.print(`${picked}`);
    era.print(name_of(daily_target));
  }

  // === 显示段（:39-68）===
  // :40 DISPLAYCHARA = %SAVESTR:DAILYTARGET%
  let display = name_of(daily_target);
  // :41-42 越界早退（SIF DAILYTARGET >= CHARANUM → RETURN 0；按语义移植
  // 为「不在已加入列表」，文件头）
  if (!added.includes(daily_target)) {
    return 0;
  }
  // :43-58 类型标签：EX_TALENT:2 女儿 / TALENT:220 魔物娘（SIF 逐条覆盖）
  // → 命中即跳；否则性格素质 160-180（FOR 含头含尾 160..180，最后命中者
  // 胜——原作无 BREAK）→ EX_TALENT 101-199（FOR 101,200 含头不含尾）
  let locals = '';
  if ((era.get(`ex_talent:${daily_target}:2`) || 0) !== 0) {
    locals = '女儿';
  }
  if ((era.get(`talent:${daily_target}:220`) || 0) !== 0) {
    locals = '魔物娘';
  }
  // :47-48 STRLENS(LOCALS) > 1 → GOTO DAILYTYPE
  if (locals.length <= 1) {
    for (let count = 160; count <= 180; count += 1) {
      if (era.get(`talent:${daily_target}:${count}`)) {
        // TALENTNAME:COUNT（Talent.yml 名字表）
        locals = String(era.get(`talentname:${count}`) ?? '');
      }
    }
    // :53-54 再判一次
    if (locals.length <= 1) {
      for (let count = 101; count < 200; count += 1) {
        if (era.get(`ex_talent:${daily_target}:${count}`)) {
          // EX_TALENTNAME:COUNT——名字表未落（文件头），读不到按空串
          locals = String(era.get(`ex_talentname:${count}`) ?? '');
        }
      }
    }
  }
  // :59-60 $DAILYTYPE: DISPLAYCHARA += LOCALS
  display += locals;
  // :61-65 日常类型（爱慕优先于淫乱，ELSEIF）
  if (era.get(`talent:${daily_target}:85`)) {
    display += '爱慕日常';
  } else if (era.get(`talent:${daily_target}:76`)) {
    display += '淫乱日常';
  }
  // :66 PRINTFORML %DISPLAYCHARA%；:67 LOCALS 清空（局部变量，无动作）
  era.print(display);

  // === 怪物日常（:70-554）===
  // TEMP = RAND(49) 经 SELECTCASE 映射到 100-193 后，五档威望区间的
  // 225 个内层分支全部是空 PRINTFORML 且恒不命中（TEMP >= 100）——段内
  // 零输出，唯一可观测效果是消耗一次随机数（文件头，1:1 保留消费）
  rand(49);

  // === 地城日常（:555-767）===
  // TEMP = RAND(20)，五档区间内必命中其一，命中体是空 PRINTFORML——
  // 恒输出一个空行（文件头）
  rand(20);
  era.println();

  return 0;
}

/**
 * @CAL_DUNGEON_DAILY（DUNGEON_DAILY.ERB:769-774）：威望的每日结算。
 *
 * 威望（EX_FLAG:99）超过 100 钳回 100，随后每日 -2。
 *
 * **原作全库无调用点**（文件头）——函数体 1:1 移植、不接线，调用方落地
 * 时直接 require。
 *
 * @returns {number} 0（原作无 RETURN；调用方不读）
 */
function cal_dungeon_daily() {
  // :771-773 钳上界
  if (era_exflag.prestige >= 100) {
    era_exflag.prestige = 100;
  }
  // :774 每日衰减
  era_exflag.prestige -= 2;
  return 0;
}

module.exports = { display_dungeon_daily, cal_dungeon_daily };
