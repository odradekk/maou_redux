/**
 * @file 升级结算（issue #179，阶段 3 H10）：@LVUP 与 @ST_UP 真身。
 *
 * 源: target/ERB/迷宮/LVUP.ERB  @LVUP（:2-41）、@ST_UP（:44-89）
 *
 * 调用点（全部随本票接线）：
 *   - ere/system/turnend-settle.js 结算主循环（原作 SYSTEM ver1.0.3.ERB:299，
 *     守卫 SIF CFLAG:A:1 != 2——侵攻中的勇者不升级，1:1 保留在调用方）；
 *   - 同文件魔王结算（原作 :619，CALL LVUP, 0——战斗日志 WAIT 之后）；
 *   - ere/chara/chara-init.js 等级段（原作 CHARA_MAKE_INIT.ERB:14，按等级
 *     逐级 CALL ST_UP + 等级复位 + HP/气力拉满到上限）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作经验曲线的注释失真：:12 写「魔王必要经验值 = LV * 100 + 10」而
 *     代码是 LOCAL:0 = CFLAG:9 * 10 + 10（LV * 10 + 10）。以代码为准，
 *     注释照抄并在此指明（#14 的「不修好原作缺陷」反向同理——不修「好」
 *     原作的注释幻想，曲线按代码 1:1）；
 *   - NAME:MASTER / SAVESTR:ARG 都承载名前（CONTEXT.md「称呼」：本作把
 *     SAVESTR:x 赋成 %NAME:x%，两者同值），统一 name_of（#5 决议）；
 *   - ere 无全局 RAND 序列（#117 决议），ST_UP 的六处掷骰经注入 rand_n
 *     掷出（缺省 Math.random；turnend 调用点不注入——结算循环的随机量
 *     本就逐回合独立，测试经模块替换注入）；
 *   - CFLAG:9（等级）无门面字段，裸寻址 + 注释（page-info-exp.js 先例）；
 *     CFLAG:13/14 走 chara 门面「基础攻击/基础防御」，EXP:80 走 dungeon
 *     门面「战斗经验」；
 *   - PRINTFORML 无等键（L = 换行），一次 era.print 即一行。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');

/** 名字承载（#5 决议；savestr 通道不存在，dungeon-trap.js 同款） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * @ST_UP（LVUP.ERB:44-89）：单角色升一级的基础数值结算。
 *
 * 等级 +1、基础攻击/防御各 +1，再按掷骰与种族素质补正（RAND:2 二选一、
 * DAY >= 100 与战术/肌肉型素质各补 RAND:3 / RAND:2、竜族/矮人/史莱姆/
 * 触手各族补正），最后体力/气力上限各 +10。
 *
 * @param {number} cid 角色 ID（原作 ARG:0）
 * @param {(n: number) => number} [rand] 原作 RAND:N 的随机源（缺省均匀随机）
 * @returns {number} 0（原作 RETURN 0；调用方不读）
 */
function st_up(cid, rand = default_rand) {
  // :45-47 等级与攻防各 +1（CFLAG:9 / :13 / :14，后两者走门面）
  const lv = (era.get(`cflag:${cid}:9`) || 0) + 1; // CFLAG:9（读点裸寻址）
  chara(cid).chara.等级 = lv; // CFLAG:9 写点走门面（chara 域属主）
  chara(cid).chara.基础攻击 += 1; // CFLAG:13
  chara(cid).chara.基础防御 += 1; // CFLAG:14

  // :48-54 ランダムでさらに強く：RAND:2 → 0 攻 +1 / 1 防 +1
  const r = rand(2);
  if (r === 0) {
    chara(cid).chara.基础攻击 += 1;
  } else if (r === 1) {
    chara(cid).chara.基础防御 += 1;
  }

  // :55-58 百日之后补强（各 RAND:3，可叠 0-2 点）
  if (era_flag.day_count >= 100) {
    chara(cid).chara.基础攻击 += rand(3);
    chara(cid).chara.基础防御 += rand(3);
  }
  // :59-62 战术（TALENT:240）
  if ((era.get(`talent:${cid}:240`) || 0) === 1) {
    chara(cid).chara.基础攻击 += rand(3);
    chara(cid).chara.基础防御 += rand(3);
  }
  // :63-66 肌肉型（TALENT:248）
  if ((era.get(`talent:${cid}:248`) || 0) === 1) {
    chara(cid).chara.基础攻击 += rand(2);
    chara(cid).chara.基础防御 += rand(2);
  }
  // :69-72 竜族戦闘補正（TALENT:314 == 5）
  if ((era.get(`talent:${cid}:314`) || 0) === 5) {
    chara(cid).chara.基础攻击 += rand(2);
    chara(cid).chara.基础防御 += rand(2);
  }
  // :75-76 矮人族防御補正（TALENT:314 == 11）
  if ((era.get(`talent:${cid}:314`) || 0) === 11) {
    chara(cid).chara.基础防御 += rand(2);
  }
  // :79-80 史莱姆防御補正（TALENT:261）
  if ((era.get(`talent:${cid}:261`) || 0) === 1) {
    chara(cid).chara.基础防御 += rand(2);
  }
  // :83-84 触手攻撃補正（TALENT:262）
  if ((era.get(`talent:${cid}:262`) || 0) === 1) {
    chara(cid).chara.基础攻击 += rand(2);
  }

  // :86-87 体力/气力上限各 +10
  era.add(`maxbase:${cid}:0`, 10);
  era.add(`maxbase:${cid}:1`, 10);
  return 0;
}

/**
 * @LVUP（LVUP.ERB:2-41）：按战斗经验升级（循环保底一级起步的多升）。
 *
 * 三条经验曲线（LOCAL:0 基数 = LV * 10 + 10，:6）：
 *   - 魔王（ARG == MASTER）：LOCAL = 基数；
 *   - 精英（TALENT:220）：基数 - 10 后翻倍再 +10（勇者曲线的两倍，:14-17）；
 *   - 通常勇者：LOCAL = 基数。
 * 战斗经验（EXP:80）够曲线即扣、升级（CALL ST_UP）、重算基数再判，直到
 * 不够。升过级则播报一行；初心者（TALENT:291）到 LV30 成长为真勇者并失去
 * 该素质。
 *
 * @param {number} cid 角色 ID（原作 ARG:0；0 = 魔王 MASTER）
 * @param {(n: number) => number} [rand] 原作 RAND:N 的随机源（透传 ST_UP）
 * @returns {number} 本次升的级数（原作 RETURN LOCAL:2；调用方不读）
 */
function lvup(cid, rand = default_rand) {
  // :6 LOCAL:0 = CFLAG:9 * 10 + 10（经验曲线基数）
  let local0 = (era.get(`cflag:${cid}:9`) || 0) * 10 + 10;
  // :8 LOCAL:2 = 升级计数
  let gained = 0;

  // $LVUP_REPEAT（:10-29）
  for (;;) {
    // 必要经验值：:11-21 三条曲线（魔王 / 精英翻倍 / 通常）
    let need;
    if (cid === 0) {
      // 魔王（注释写 LV * 100 + 10 失真，代码是基数，文件头）
      need = local0;
    } else if ((era.get(`talent:${cid}:220`) || 0) === 1) {
      // 精英必要经验值 = LV * 20 + 10（勇者的两倍）
      local0 -= 10;
      need = local0 * 2 + 10;
    } else {
      // 通常勇者经验值 = LV * 10 + 10
      need = local0;
    }

    if (chara(cid).dungeon.战斗经验 >= need) {
      // :24-28 扣经验、升级、重算基数、再判
      chara(cid).dungeon.战斗经验 -= need;
      st_up(cid, rand);
      local0 = (era.get(`cflag:${cid}:9`) || 0) * 10 + 10;
      gained += 1;
      continue;
    }
    break;
  }

  // :31-34 升级播报（NAME:MASTER 与 SAVESTR:ARG 同为名前，文件头）
  if (gained > 0) {
    const local_s = name_of(cid);
    era.print(`*${local_s}的等级提升为LV${era.get(`cflag:${cid}:9`) || 0}*`);
  }
  // :35-39 初心者（TALENT:291）在战斗中成长到 LV30 → 失去初心者
  if (
    (era.get(`talent:${cid}:291`) || 0) !== 0 &&
    (era.get(`cflag:${cid}:9`) || 0) >= 30
  ) {
    const local_s = name_of(cid);
    era.print(`${local_s}在战斗中越发成熟，终于成长成了真正的勇者……`);
    era.print(`${local_s}失去了[初心者]。`);
    chara(cid).chara.初心者 = 0; // TALENT:291（chara 域门面）
  }

  return gained;
}

module.exports = { lvup, st_up, name_of };
