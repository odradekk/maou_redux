/**
 * @file 能力值提高画面的两个渲染函数（@JUEL_CHECK 的 $INPUT_LOOP_1 内
 * 调用，issue #47）。
 *
 * 源: target/ERB/ABL/ABL.ERB  @SHOW_JUEL（:3-27，保有珠一览）
 *     @SHOW_ABLUP_SELECT（:29-111，能力值列表 + [999] 结束）
 *
 * @SHOW_ABLUP_SELECT 在原作是纯文本 + INPUT（PRINTFORM 的 [ 0] 编号列）。
 * 按 PR #53 通则一律改按钮：正文不写 [编号] 前缀（引擎 showAcc 自动拼
 * `[快捷键] 正文` 并折叠连续空白），断言看夹具的 button.rendered。原作
 * 的 2 位编号补位（[ 0]）与 9 宽名字列是字符终端排版，按钮化后由引擎
 * 排版接管——对拍差异登记在 #47，逐字对拍归 #48。
 *
 * 欠账（docs/stub-registry.md）：@DECIDE_ABLUP 族（可提升标记 `*` 的
 * 判定与渲染）未接线——升级规则超出 #47 范围，本画面不渲染 `*` 标记。
 */

const era = require('#/era-electron');

// 感觉缺失（[―] 灰显）的判定：能力 0-3 → TALENT:101/107/103/105 的第 1
// 位（& 2）。名前：阴蒂/乳房/私处/肛门钝感（yml/Talent.yml）
const DULL_TALENT = { 0: 101, 1: 107, 2: 103, 3: 105 };

// 原作灰显用的 SETCOLOR 128,128,128
const GRAY = '#808080';

/**
 * @SHOW_JUEL（:3-27）：保有珠一览——12 项、4 列 × 3 行，首尾各一条点线。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 */
function show_juel(cid) {
  era.drawLine(); // :4 CUSTOMDRAWLINE ‥
  let row = '';
  for (let count = 0; count < 12; count += 1) {
    // :5 FOR COUNT, 0, 12 —— :6-14 行号 → juel 序号（3→乳房 14、
    // 11→否定 100；:10-11 的 COUNT == 12 分支在 0..11 循环里不可达，
    // 1:1 不镜像）
    let idx = count;
    if (count === 3) {
      idx = 14;
    } else if (count === 11) {
      idx = 100;
    }
    // :15-18 男人（TALENT:122）的第 0 项显示「阴茎」而非「阴核」
    const name =
      count === 0 && era.get(`talent:${cid}:122`)
        ? '阴茎'
        : era.get(`palamname:${idx}`);
    const value = era.get(`juel:${cid}:${idx}`) || 0;
    row += ` ${name}点数：${String(value).padStart(6)}`; // {JUEL,6,RIGHT}
    if ((count + 1) % 4 === 0) {
      // :21-24 改行（每 4 项）
      era.print(row);
      row = '';
    }
  }
  era.println(); // :26 PRINTL（末组恰为 4 项时补一空行）
  era.drawLine(); // :27 CUSTOMDRAWLINE ‥
}

/**
 * @SHOW_ABLUP_SELECT（:29-117）：能力值列表（按钮化，见文件头）+ 收尾
 * 的反抗刻印 / 癖好条目与 [999] 结束键。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 */
function show_ablup_select(cid) {
  let u = 0; // :30 U = 0（本行条目计数）
  for (let count = 0; count < 40; count += 1) {
    // :31 REPEAT 40 —— 编号空间的空洞整组跳过（:32-41）
    if (count >= 4 && count <= 9) continue; // :32-33（4 局部感觉只在癖好行出现）
    if (count >= 18 && count <= 19) continue; // :34-35
    if (count >= 24 && count <= 29) continue; // :36-37
    if (count >= 34 && count <= 36) continue; // :38-39
    if (count === 38) continue; // :40-41
    // :44-48 性别过滤：男无 私处感觉/百合气质/百合中毒，女无 断背气质/
    // ＢＬ中毒（34 已被上行区间跳过，判据 1:1 保留）
    const male = era.get(`talent:${cid}:122`);
    if (male && (count === 2 || count === 22 || count === 33)) continue;
    if (!male && (count === 23 || count === 34)) continue;
    // :51-65 感觉缺失 → 原作灰字 [―]，按钮化后以灰色按钮近似（编号仍显示）
    const lost =
      count <= 3 &&
      ((era.get(`talent:${cid}:${DULL_TALENT[count]}`) || 0) & 2) !== 0;
    // :66-69 能力名（男人的第 0 项显示「阴茎感觉」）
    const name = count === 0 && male ? '阴茎感觉' : era.get(`ablname:${count}`);
    const level = era.get(`abl:${cid}:${count}`) || 0;
    era.printButton(
      `${name} - LV ${level}`, // :77 - LV{ABL:X,2}（按钮正文空白折叠，不补位）
      count,
      lost ? { color: GRAY } : undefined,
    );
    // :78 CALL DECIDE_ABLUP 的 `*` 可提升标记未接线（文件头欠账）
    u += 1; // :80
    if (u % 4 === 0) {
      era.println(); // :81-83 每 4 条换行
    }
  }
  if (u % 4 !== 0) {
    era.println(); // :85-86 末行不足 4 条也收行
  }

  // :88-91 [99] 反抗刻印（DECIDE_ABLUP99 的 `*` 未接线）
  const mark3 = era.get(`mark:${cid}:3`) || 0;
  era.printButton(`${era.get('markname:3')} - LV ${mark3}`, 99);
  // :92-101 癖好（CSTR:7 定制了才有）：[4] 癖好感觉与 [40] 癖好中毒
  const fetish = era.get(`cstr:${cid}:7`);
  if (fetish) {
    era.printButton(`${fetish}感觉 - LV ${era.get(`abl:${cid}:4`) || 0}`, 4);
    era.printButton(`${fetish}中毒 - LV ${era.get(`abl:${cid}:40`) || 0}`, 40);
  }
  // :102-108 [IF_DEBUG] 的 [100] 异界综合征行——调试编译块，不移植
  era.println(); // :109
  era.drawLine(); // :110 CUSTOMDRAWLINE ‥
  era.printButton('- 能力值提高结束', 999); // :111（[999] 前缀由引擎拼）
  era.println();
}

module.exports = { show_ablup_select, show_juel };
