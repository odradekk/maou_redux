/**
 * @file 月替处理 @EVENT_NEXTMONTH（issue #115：日期翻页的月份回绕）。
 *
 * 源: target/ERB/EVENT/EVENT_NEXTMONTH.ERB  @EVENT_NEXTMONTH（:12-36 全函数）
 *
 * 原作头注（:3-7）：DAY:1 是当前月、DAY:2 是当前日；2 月闰月不考虑；
 * 「存在しない日付を弾く部分、初心者丸出しの処理」——按各月末日成立回绕。
 * 唯一调用点是 @EVENTTURNEND 的 #PRI 档（EVENT_TURNEND.ERB:84，SIF
 * DAY:2 > 28），被调进来时 DAY:2 已 >= 29——四支 IF 链的判据全部在这一
 * 前提下写：2 月支不看 DAY:2（29 日即换），小/大月支看 30/31 的溢出。
 *
 * 移植说明：
 *   - 回绕语义 1:1 照搬，包括原作的两处「特性」：2 月从 28 天直接跳 3 月
 *     （29 日瞬间换月，玩家不会看到 2 月 29 日）；12 月走大月溢出（DAY:2
 *     > 31）而非 12 月专属日数。#103 查明的嘉德线缺陷（DAY:1 被当天数用，
 *     END10_15~19 永不可达，#14 登记）正是这颗 DAY:1 的月份语义——此处
 *     照原作保留月份回绕，不要「顺手修好」别处的误用。
 *   - 12 月支的年龄增长循环（:30-35）跳过 0 号位（FOR AGE_COUNT, 1,
 *     CHARANUM——魔王不涨年龄；@EVENTFIRST 给魔王的 CFLAG:0:451 = 21
 *     因此恒定）。ere 侧按 #114 先例以 cid === 0 等价跳过。
 *   - HUMAN_AGE_GENERATE（キャラ関数/CHARA_BODY.ERB:340，种族年龄→人类
 *     年龄的换算，读 TALENT:314 种族与 FLAG:26/27 开局配置）存根：打占位行
 *     并返回 0——CFLAG:451 随之落 0。451 在侵略线窄路径上无消费者（结局
 *     演出/身体生成/调教研究域），无行为差异；真身随角色身体票落地。
 *   - 原作循环里的 RESULT = 0（:34）是调用方清返回值的习语，ere 侧函数
 *     直接调用、无 RESULT 机制，不落。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['HUMAN_AGE_GENERATE'];

/**
 * HUMAN_AGE_GENERATE 的存根：打一行占位并返回 RESULT = 0（换算未移植——
 * 角色身体票落地后换真身，见文件头移植说明）。
 * @returns {number} 存根 RESULT：恒 0
 */
function stub_human_age_generate() {
  stub_line('HUMAN_AGE_GENERATE', '种族年龄换算');
  return 0;
}

/**
 * 月替处理：各月末日则换月（原作 @EVENT_NEXTMONTH，被 #PRI 档在
 * DAY:2 > 28 时调用；见文件头的调用前提）。
 */
async function run_event_nextmonth() {
  // :14-17 2 月：29 日即换 3 月（调用前提保证 DAY:2 >= 29，故无日条件）
  if (era_flag.month === 2) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // :18-21 小月（4/6/9/11，30 天）：31 日溢出换月
  } else if (era_flag.date > 30 && [4, 6, 9, 11].includes(era_flag.month)) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // :22-25 大月（1/3/5/7/8/10，31 天）：32 日溢出换月
  } else if (
    era_flag.date > 31 &&
    [1, 3, 5, 7, 8, 10].includes(era_flag.month)
  ) {
    era_flag.month += 1;
    era_flag.date = 1;
    era.print(`明天就是${era_flag.month}月了，是个适合调教的月份呢……`);
    // :26-35 12 月：32 日溢出回 1 月（新年）+ 全角色年龄增长
  } else if (era_flag.date > 31 && era_flag.month === 12) {
    era_flag.month = 1;
    era_flag.date = 1;
    era.print('明天就是新一年的开始了，再努力地把邪恶传播到各处吧！');
    for (const cid of era.getAddedCharacters()) {
      if (cid === 0) {
        continue; // FOR AGE_COUNT, 1, CHARANUM 跳过 0 号位（魔王不涨年龄）
      }
      chara(cid).chara.种族年龄 += 1; // CFLAG:452 += 1（:31）
      chara(cid).chara.年龄 = stub_human_age_generate(); // CFLAG:451 = RESULT（:32-33）
    }
  }
}

module.exports = { run_event_nextmonth, STUBBED_CALLS };
