/**
 * @file modsave 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/ModSave.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/ModSave.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_modsave = {
  /**
   * 卖淫影响（modsave:0 ↔ MODSAVE:0）
   * @returns {number}
   */
  get prostitution_effect() {
    return era.get('modsave:0') || 0;
  },
  /**
   * @param {number} v
   */
  set prostitution_effect(v) {
    era.set('modsave:0', v);
  },
  /**
   * 反作弊（modsave:1 ↔ MODSAVE:1）
   * @returns {number}
   */
  get anti_cheat() {
    return era.get('modsave:1') || 0;
  },
  /**
   * @param {number} v
   */
  set anti_cheat(v) {
    era.set('modsave:1', v);
  },
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 变量语义补注（原作语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
//   prostitution_effect 卖淫影响  SAVEDATA（随游戏存档，魔改新增/魔改使用.ERH:4，
//       无声明默认值 → 新档 0）。0=【负面】卖淫经验压低奴隶售价（默认设置）、
//       1=【正面】抬高售价、2=【无影响】。写点 SYSTEM/CONFIG.ERB:273-278（设置页
//       [29]，0→1→2 循环）；读点 ABL.ERB:231（0 档跳过自动提升 37 卖淫中毒）、
//       SELL_CHARA.ERB:318-323/:362-374（售价明细的 ±37 档）与
//       SELL_CHARA_ESTIMATE.ERB:356-361/:630-641/:785-791（估价倍率）、
//       CONFIG.ERB:137-143（档位文案）。ere 消费点：ere/system/
//       stronghold/sale.js、ere/system/train/ablup.js（auto_ablup）、
//       ere/page/page-config.js 的 prostitution_effect_status_text。
//   anti_cheat        反作弊  SAVEDATA（魔改使用.ERH:15，无声明默认值 → 新档 0）。
//       0=每回合执行 @DEBUG_CHECK 反作弊检查（EVENT_TURNEND.ERB:137 `SIF !反作弊`
//       → CALL DEBUG_CHECK），1=跳过检查（可开修改）。写点 CONFIG.ERB:281-285
//       （设置页 [30] 翻 0/1）。ere 消费点：ere/event/event-turnend.js 的
//       EVENTTURNEND 处理器、ere/page/page-config.js 的 [30] 状态行。
//
// 本表是扩展普通表（非引擎内建）：yml/ModSave.yml 落静态目录即自动注册，
// fillData 建 data 桶、saveData/resetData 随存档存清——与 #DIM SAVEDATA 的
// 存档语义一致（表头注与先例见 yml/Audio.yml / yml/ModSave.yml）。

/**
 * 切换卖淫影响档位（镜像原作设置页 [29] 的 0→1→2→0 循环，
 * SYSTEM/CONFIG.ERB:273-278）。
 * @returns {number} 切换后的档位
 */
era_modsave.cycle_prostitution_effect = () => {
  const v = era_modsave.prostitution_effect;
  era_modsave.prostitution_effect = v === 0 ? 1 : v === 1 ? 2 : 0;
  return era_modsave.prostitution_effect;
};

/**
 * 翻转反作弊开关（镜像原作设置页 [30] 的 0↔1，SYSTEM/CONFIG.ERB:281-285）。
 * @returns {number} 翻转后的值
 */
era_modsave.toggle_anti_cheat = () => {
  era_modsave.anti_cheat = era_modsave.anti_cheat ? 0 : 1;
  return era_modsave.anti_cheat;
};

module.exports = era_modsave;
