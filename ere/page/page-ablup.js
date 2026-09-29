/**
 * @file 能力值提高画面的两个渲染函数（juel-check.js 的能力值提高循环内
 * 调用，issue #47）。
 *
 * show_ablup_select 的能力值列表一律用按钮（PR #53 通则）：正文不写
 * [编号] 前缀（引擎 showAcc 自动拼 `[快捷键] 正文` 并折叠连续空白），断言
 * 看夹具的 button.rendered。编号补位（[ 0]）与名字列宽这类字符终端排版
 * 交给引擎接管——比对差异登记在 #47，逐字比对归 #48。
 *
 * `*` 可提升标记由 #467 接入：逐行调 system/train/ablup.js 的 decide_ablup
 * （decide_ablupN 分发），可提升时在按钮正文尾追一个空格加 `*`。编号
 * 20-23/30-33 的 decide_ablupN 没有对应函数（未补判定），这几行不打标记。
 */

const era = require('#/era-electron');
const { decide_ablup } = require('#/system/train/ablup');
const { pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { print_button_grid } = require('#/utils/button-grid');

// 感觉缺失（[―] 灰显）的判定：能力 0-3 → TALENT:101/107/103/105 的第 1
// 位（& 2）。名字：阴蒂/乳房/私处/肛门钝感（yml/Talent.yml）
const DULL_TALENT = { 0: 101, 1: 107, 2: 103, 3: 105 };

// 灰显色
const GRAY = '#808080';

/**
 * 保有珠一览——12 项、4 列 × 3 行，首尾各一条点线。
 *
 * @param {number} cid 调教目标
 */
function show_juel(cid) {
  era.drawLine(); // 点线分割线
  let row = '';
  for (let count = 0; count < 12; count += 1) {
    // count → juel 序号映射：3→乳房 14、11→否定 100
    let idx = count;
    if (count === 3) {
      idx = 14;
    } else if (count === 11) {
      idx = 100;
    }
    // 男人（TALENT:122）的第 0 项显示「阴茎」而非「阴核」
    const name =
      count === 0 && era.get(`talent:${cid}:122`)
        ? '阴茎'
        : era.get(`palamname:${idx}`);
    const value = era.get(`juel:${cid}:${idx}`) || 0;
    row += ` ${name}点数：${pad_left(String(value), 6)}`; // 数值右对齐宽 6
    if ((count + 1) % 4 === 0) {
      // 换行（每 4 项）
      era.print(row);
      row = '';
    }
  }
  era.println(); // 末组恰为 4 项时补一空行
  era.drawLine(); // 点线分割线
}

/**
 * 能力值列表（按钮化，见文件头）+ 收尾的反抗刻印 / 癖好条目与 [999]
 * 结束键。
 *
 * `*` 标记（#467）要看 decide_ablup 的返回值，因此本函数是 async。
 *
 * @param {number} cid 调教目标
 */
async function show_ablup_select(cid) {
  const items = [];
  for (let count = 0; count < 40; count += 1) {
    // 编号空间的空洞整组跳过
    if (count >= 4 && count <= 9) continue; // （4 局部感觉只在癖好行出现）
    if (count >= 18 && count <= 19) continue;
    if (count >= 24 && count <= 29) continue;
    if (count >= 34 && count <= 36) continue;
    if (count === 38) continue;
    // 性别过滤：男无 私处感觉/百合气质/百合中毒，女无 断背气质/
    // ＢＬ中毒（34 已被上行区间跳过，条件保留原样）
    const male = era.get(`talent:${cid}:122`);
    if (male && (count === 2 || count === 22 || count === 33)) continue;
    if (!male && (count === 23 || count === 34)) continue;
    // 感觉缺失 → 灰色按钮近似灰字 [―]（编号仍显示）
    const lost =
      count <= 3 &&
      ((era.get(`talent:${cid}:${DULL_TALENT[count]}`) || 0) & 2) !== 0;
    // 能力名（男人的第 0 项显示「阴茎感觉」）
    const name = count === 0 && male ? '阴茎感觉' : era.get(`ablname:${count}`);
    const level = era.get(`abl:${cid}:${count}`) || 0;
    // 可提升标记 `*`（#467）：decide_ablup 判定可提升时在按钮正文尾追
    // 同一格式
    const mark = (await decide_ablup(cid, count)) === 1 ? ' *' : '';
    items.push([
      count,
      `${name} - LV ${level}${mark}`, // 按钮正文空白折叠，不补位
      lost ? { color: GRAY } : undefined,
    ]);
  }
  // 每行 4 格 = 原版「U % 4 == 0 时换行」的列数（#717 恢复）；网格行
  // 之间不夹空行，收行由引擎负责
  print_button_grid(items, 4);

  // [99] 反抗刻印 + 癖好两枚（[4] 癖好感觉与 [40] 癖好中毒，CSTR:7 定制
  // 了才有）：原版三枚同打一行，这里并入同一行网格（同样打 `*` 标记）
  const tail = [];
  const mark3 = era.get(`mark:${cid}:3`) || 0;
  const mark99 = (await decide_ablup(cid, 99)) === 1 ? ' *' : '';
  tail.push([99, `${era.get('markname:3')} - LV ${mark3}${mark99}`]);
  const fetish = era.get(`cstr:${cid}:7`);
  if (fetish) {
    const mark_f = (await decide_ablup(cid, 4)) === 1 ? ' *' : '';
    tail.push([
      4,
      `${fetish}感觉 - LV ${era.get(`abl:${cid}:4`) || 0}${mark_f}`,
    ]);
    const mark_p = (await decide_ablup(cid, 40)) === 1 ? ' *' : '';
    tail.push([
      40,
      `${fetish}中毒 - LV ${era.get(`abl:${cid}:40`) || 0}${mark_p}`,
    ]);
  }
  print_button_grid(tail, 4);
  // [100] 异界综合征行是调试专用，不绘制
  // （[99] 行与尾部分割线逐行相邻，不补空行）
  era.drawLine(); // 点线分割线
  era.printButton('- 能力值提高结束', 999); // （[999] 前缀由引擎拼）
}

module.exports = { show_ablup_select, show_juel };
