/**
 * @file 侵略结局判定：四组领域（人间界/精灵/龙/天界）的侵攻度满 10000 且
 * 未征服时接对应结局演出，演出之外加威望。
 *
 * 演出本体在 page/page-ending.js。选「退出」时把回标题的转场目标原样上抛，
 * 由出兵流程一路带到主循环；选「继续」时落回结算尾照常收尾。
 */

const era = require('#/era-electron');
const { is_state } = require('#/system/flow/game-state');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const {
  ending_1,
  ending_3,
  ending_4,
  ending_5,
} = require('#/page/page-ending');

/**
 * @invasion_check：结局判定（#118 本体）。
 *
 * 四组 ELSEIF（顺序照旧，命中一组即止）：各领域侵攻度满 10000 且未征服
 * → 对应结局演出 + EX_FLAG:99 += 10 + PRINTL 声望+10。演出本体全部在
 * ere/page/page-ending.js（`ending_1` / `ending_3` / `ending_4` /
 * `ending_5`，都是真身）。
 *
 * 四组的可达性随 #505 变化：人间界组是阶段 1 的贯通终点；精灵/龙/天界
 * 三组自 #505 起可达——地区续接开出了 FLAG:86/88/90 的写入路径
 * （`add_region_progress`，出兵结算），把某个领域顶到 10000 且对应征服
 * 标记仍为 0 就会触发（三组的标记由各自 ENDING_x 置 1）。#118 时写的
 * 「窄路径不可达（对应无写入点）」对这三组已失效。
 *
 * 天神宫不在检查之列：判断条件读的 EX_FLAG:101 没有写点（侵攻度累加在
 * FLAG:101），那组条件永不成立，是死分支；END10_55 演出本体保留在
 * event-ending.js（直驱测试覆盖），没有分派入口。
 *
 * 「结算尾 → invasion_check → ENDING_x」这条链有三条用例守着：人间界的
 * ENDING_1 由 test/page-invasion.test.js 的既有用例（窄路径跨 10000）覆盖，
 * 精灵组由「[1] 魔力结果段的已征服封顶」用例的第三条世界覆盖（地区续接把
 * FLAG:86 顶到 10000 → ENDING_3 + CHAR_GIFT 收下圣女），演出本体另有
 * test/page-ending.test.js 的表驱动用例。
 *
 * @returns {Promise<string|undefined>} 结局选了退出时返回 STATE.TITLE
 *   （回标题的转场目标，由 invasion / usershop 逐层上抛）
 */
async function invasion_check() {
  // 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    // 结局演出以转场目标离开（#852 起是返回值）：选「退出」时是回标题的
    // TITLE，原样上抛——威望 +10 与 PRINTL 不再执行（这一局结束了）；选
    // [0] 继续时演出返回 0，落到下面照常结算
    const ended = await ending_1();
    if (is_state(ended)) {
      return ended;
    }
    era_exflag.prestige = era_exflag.prestige + 10; // EX_FLAG:99 += 10
    era.print('声望+10'); // PRINTL
    return;
  }
  // 精灵领域：FLAG:86 >= 10000 && FLAG:87 == 0 → ENDING_3
  if (
    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0
  ) {
    await ending_3();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
  // 龙之山脉：FLAG:88 >= 10000 && FLAG:89 == 0 → ENDING_4
  if (
    era_flag.dragon_realm_invasion >= 10000 &&
    era_flag.dragon_realm_conquered === 0
  ) {
    await ending_4();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
  // 天界：FLAG:90 >= 10000 && FLAG:91 == 0 → ENDING_5
  if (era_flag.heaven_invasion >= 10000 && era_flag.heaven_conquered === 0) {
    await ending_5();
    era_exflag.prestige = era_exflag.prestige + 10;
    era.print('声望+10'); // PRINTL
    return;
  }
}

module.exports = { invasion_check };
