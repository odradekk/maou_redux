/**
 * @file 侵略域的进度条行：一行「标签 + 引擎百分比条 + 数值」。
 *
 * 条宽取 16（< 24）：引擎 ProgressConfig 的 barWidth ≥ 24 会把条后数值列
 * （el-col-0）整列藏掉，而数值列是玩家读侵攻度的唯一位置。出兵菜单、
 * 征服后菜单、结果段与精锐部队战斗体共用这一种画法。
 *
 * 移植取舍与旧引擎对照登记在侵略域的文件头说明（page-invasion.js）里。
 */

const era = require('#/era-electron');

/** 进度条的条宽（< 24，否则引擎 el-col-0 吞掉条后数值列，见文件头） */
const BAR_WIDTH = 16;

/**
 * 一行「标签 + 进度条 + 数值」（BARSTR/BAR 的等价物，偏离说明见文件头）。
 * @param {string} label 行首标签
 * @param {number} value 当前进度
 * @param {number} max 满刻度
 */
function print_progress_line(label, value, max) {
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? Math.min(100, (100 * value) / max) : 0,
      inContent: label,
      outContent: ` ${value}/${max}`,
      config: { barWidth: BAR_WIDTH },
    },
  ]);
}

module.exports = { BAR_WIDTH, print_progress_line };
