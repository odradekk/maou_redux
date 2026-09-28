/**
 * @file 月替处理 EVENTNEXTMONTH（issue #115：日期翻页的月份回绕）。
 *
 * 日期语义：DAY:1 是当前月、DAY:2 是当前日；2 月闰月不考虑；不存在的日期
 * 一律按各月末日成立回绕。
 * 唯一调用点是 EVENTTURNEND 的 #PRI 档（仅当 DAY:2 > 28 时），被调进来时
 * DAY:2 已 >= 29——四支 IF 链的判断条件全部在这一前提下写：2 月支不看
 * DAY:2（29 日即换），小/大月支看 30/31 的溢出。
 *
 * 实现说明：
 *   - 回绕语义照写，包括两处「特性」：2 月从 28 天直接跳 3 月（29 日瞬间
 *     换月，玩家不会看到 2 月 29 日）；12 月走大月溢出（DAY:2 > 31）而非
 *     12 月专属日数。#103 查明的嘉德线缺陷（DAY:1 被当天数用，END10_15~19
 *     永不可达）正是这颗 DAY:1 的月份语义——此处保留月份回绕，那处误用
 *     的本体在结局检查侧。
 *   - 12 月支的年龄增长循环跳过 0 号位（魔王不涨年龄；event-first.js 给
 *     魔王的 CFLAG:0:451 = 21 因此恒定）。ere 侧按 #114 先例以
 *     cid === 0 等价跳过。
 *   - human_age_generate（ere/chara/chara-body.js，自 #385 起为真身；种族
 *     年龄→人类年龄的换算，读 TALENT:314 种族与 FLAG:26/27 开局配置）——
 *     CFLAG:451 从此落真实换算值，不再恒 0。
 *   - 循环开头清返回值的习语不落；ere 侧函数直接调用，没有跨函数返回值
 *     机制。
 */

const era = require('#/era-electron');
const { human_age_generate } = require('#/chara/chara-body'); // #385 起真身
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');

/**
 * 月替处理：各月末日则换月（被 EVENTTURNEND 的 #PRI 档在
 * DAY:2 > 28 时调用；见文件头的调用前提）。
 */
async function run_event_nextmonth() {
  // 2 月：29 日即换 3 月（调用前提保证 DAY:2 >= 29，故无日条件）
  if (era_flag.month === 2) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // 小月（30 天）：31 日溢出换月
  } else if (era_flag.date > 30 && [4, 6, 9, 11].includes(era_flag.month)) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // 大月（31 天）：32 日溢出换月
  } else if (
    era_flag.date > 31 &&
    [1, 3, 5, 7, 8, 10].includes(era_flag.month)
  ) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // 12 月：32 日溢出回 1 月（新年）+ 全角色年龄增长
  } else if (era_flag.date > 31 && era_flag.month === 12) {
    era_flag.month = 1;
    era_flag.date = 1;
    era.print('明天就是新一年的开始了，再努力地把邪恶传播到各处吧！');
    for (const cid of era.getAddedCharacters()) {
      if (cid === 0) {
        continue; // 年龄增长循环跳过 0 号位（魔王不涨年龄）
      }
      chara(cid).chara.种族年龄 += 1; // CFLAG:452 += 1
      // human_age_generate：CFLAG:452 → CFLAG:451
      chara(cid).chara.年龄 = human_age_generate(
        chara(cid).chara.种族年龄,
        cid,
      );
    }
  }
}

module.exports = { run_event_nextmonth };
