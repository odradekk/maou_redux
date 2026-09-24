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
 * 排版接管——比对差异登记在 #47，逐字比对归 #48。
 *
 * `*` 可提升标记（:78/:89/:94/:99/:105 的 `CALL DECIDE_ABLUP*` + `SIF
 * RESULT == 1 → PRINT *`）由 #467 接入：逐行调 system/train/ablup.js 的
 * decide_ablup（@DECIDE_ABLUP 分发），可提升时在按钮正文尾追一个空格加
 * `*`（原作是 PRINTFORM 之后 `PRINT *`，同一行）。编号 20-23/30-33 的
 * @DECIDE_ABLUPn 尚未落地（它们的 ABLUPn.ERB 仍是存根），这几行不打标记。
 */

const era = require('#/era-electron');
const { decide_ablup } = require('#/system/train/ablup');

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
 * `*` 标记（#467）要看 @DECIDE_ABLUPn 的 RESULT，因此本函数是 async。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 */
async function show_ablup_select(cid) {
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
    // :78 CALL DECIDE_ABLUP 的 `*` 可提升标记（#467）：原作在 `- LV{ABL:X,2}`
    // 之后 `SIF RESULT == 1 → PRINT *`，按钮正文尾追同一格式
    const mark = (await decide_ablup(cid, count)) === 1 ? ' *' : '';
    era.printButton(
      `${name} - LV ${level}${mark}`, // :77 - LV{ABL:X,2}（按钮正文空白折叠，不补位）
      count,
      lost ? { color: GRAY } : undefined,
    );
    // :80-86 的 U 计数与两处 PRINTL（每 4 条换行、末行不足 4 也收行）只服务
    // 原作「一行 4 格」的字符终端排版：两个 PRINTL 都只结束所在的按钮行，
    // 不产生空行。ere 的按钮各自成行，收行由引擎负责，故不再计数也不补空行
    // （train-natural-log:945-951 里五行按钮逐行相邻，即此形态）。
  }

  // :88-91 [99] 反抗刻印（:89 CALL DECIDE_ABLUP99 + :90-91 的 `*`）
  const mark3 = era.get(`mark:${cid}:3`) || 0;
  const mark99 = (await decide_ablup(cid, 99)) === 1 ? ' *' : '';
  era.printButton(`${era.get('markname:3')} - LV ${mark3}${mark99}`, 99);
  // :92-101 癖好（CSTR:7 定制了才有）：[4] 癖好感觉与 [40] 癖好中毒，
  // 各自在 :94/:99 调 DECIDE_ABLUP4 / DECIDE_ABLUP40 打 `*`
  const fetish = era.get(`cstr:${cid}:7`);
  if (fetish) {
    const mark_f = (await decide_ablup(cid, 4)) === 1 ? ' *' : '';
    era.printButton(
      `${fetish}感觉 - LV ${era.get(`abl:${cid}:4`) || 0}${mark_f}`,
      4,
    );
    const mark_p = (await decide_ablup(cid, 40)) === 1 ? ' *' : '';
    era.printButton(
      `${fetish}中毒 - LV ${era.get(`abl:${cid}:40`) || 0}${mark_p}`,
      40,
    );
  }
  // :102-108 [IF_DEBUG] 的 [100] 异界综合征行——调试编译块，不移植
  // （:109 的 PRINTL 只结束 [99]（原作还带 [100]）所在的那一行，不产生空行：
  // train-natural-log:951-952 里 [99] 行与尾部分割线相邻）
  era.drawLine(); // :110 CUSTOMDRAWLINE ‥
  era.printButton('- 能力值提高结束', 999); // :111（[999] 前缀由引擎拼）
}

module.exports = { show_ablup_select, show_juel };
