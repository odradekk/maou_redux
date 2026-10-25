/**
 * @file 角色信息的能力一览与刻印行（show_info_abl / show_info_mark）。
 *
 * 两段都是「每项一格」的文本网格：能力一览每行 4 项（名字格 + `- LV{n}` 格），
 * 刻印行四枚各占 6 列（24 列网格）。列位置由格宽决定，格内不再补位——
 * 原实现按黄金样本 `  技巧     - LV3   ` 与
 * ` 苦痛:LV0 [...]   快乐:LV0 [...]` 用 NBSP 拼出定宽字符串，那种写法依赖
 * 字体宽度估算（#577 的普查结论），实机会错位。
 *
 * **命令行前导空格规则**（原实现的排版依据，保留说明以免误读旧样本）：
 * `PRINTFORM X` 里命令名后的**第一个空格是命令与表达式之间的分隔符**，不算
 * 正文。所以 `PRINTFORM  技巧` 对应 ` 技巧`（一个前导空格）、`PRINTFORM   快乐`
 * 对应 `   快乐`（三个）。网格化后这些前导空格由格宽承载，不再写进正文。
 *
 * 有意偏离（登记在案，不随这张工单）：
 *   - 可提升判定与其后的 `*` 标记都不随这份实现移植：判定本体
 *     属「能力提升」票的范围（page-ablup.js 同样按「判定结果为 0」处理）。
 *     本文件按「判定结果为 0」渲染，即两项行尾都不缀 `*`；
 *   - 感觉封锁的灰显（能力提升画面 `[―]` 与灰字）是那个
 *     画面自己的写法，这里没有，不引入；
 *   - 字符条写法的等价物见 bar_text——只有刻印行还用它
 *     （体力/气力条已改 progress 格）。
 */

const era = require('#/era-electron');
const { print_cell_grid } = require('#/utils/text-grid');

/** 素质编号（yml/Talent.yml 的名字表；编号 + 注释寻址） */
const TALENT_FUTA = 121; // 扶她
const TALENT_MAN = 122; // 男人

/** 能力编号（yml/Abl.yml） */
const ABL_CLITORIS = 0; // 阴蒂感觉（男体显示为阴茎感觉）
const ABL_VAGINA = 2; // 私处感觉
const ABL_LESBIAN = 22; // 百合气质
const ABL_HOMO = 23; // 断背气质
const ABL_LESBIAN_ADDICT = 33; // 百合中毒
const ABL_HOMO_ADDICT = 34; // 断背中毒

/** 刻印编号（yml/Mark.yml）：苦痛/快乐/屈服/反抗，四枚一行 */
const MARKS = [0, 1, 2, 3];
const MARK_LABELS = ['苦痛', '快乐', '屈服', '反抗'];

/** 刻印条的满级（四条字符条调用的第二个实参） */
const MARK_BAR_MAX = 3;
/** 刻印条的格数（同上的第三个实参） */
const MARK_BAR_LEN = 3;
/** 刻印格的列宽（24 列 ÷ 4 枚 = 6 列） */
const MARK_WIDTH = 6;
/** 能力一览每行的项数（原版「ELEMENT_COUNT % 4 == 0 时换行」的列数） */
const ABL_PER_ROW = 4;
/** 能力名字格的列宽（24 列 ÷ 4 项 = 6 列/项，名字 3、等级 3） */
const ABL_NAME_WIDTH = 3;
/** 能力等级格的列宽（左对齐的 `- LV{n}`） */
const ABL_LEVEL_WIDTH = 3;

/**
 * 「当前值, 最大值, 长度」字符条的等价物。
 *
 * 写法：填充字符 `*`、空白字符 `.`（两条字符配置都取缺省）。
 * 方括号是字符条自己带的（黄金样本 train-upgrade-log:159 的
 * `[...]` 就是 0/3/3 的输出，bar 字符只有三个点、括号另计）。
 *
 * 填充格数取 `cur * len / max` 的整数商并夹到 [0, len]；`max <= 0` 或
 * `cur <= 0` 时全空。**只有全空写法有黄金样本**（三份样本的刻印都是 LV0），
 * 非零写法按上式实现，登记于此。
 *
 * @param {number} cur 当前值
 * @param {number} max 最大值
 * @param {number} len 格数
 * @returns {string}
 */
function bar_text(cur, max, len) {
  let filled = 0;
  if (cur > 0 && max > 0) {
    filled = Math.min(len, Math.max(0, Math.trunc((cur * len) / max)));
  }
  return `[${'*'.repeat(filled)}${'.'.repeat(len - filled)}]`;
}

/**
 * show_info_abl：非零能力的一览（4 列）。
 *
 * 每项两格：名字格（左对齐）与 `- LV{n}` 格（左对齐）——列位置由格宽决定
 * （24 列 = 4 × (3 + 3)），不再用补位函数把字符串凑成定宽。
 *
 * ere 侧一律显式传 cid（chara-bars.js 同款），TARGET 换出换入不移植。
 *
 * @param {number} cid 角色 ID
 */
function show_info_abl(cid) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const male = t(TALENT_MAN) !== 0;
  const penis = male || t(TALENT_FUTA) !== 0;
  const cells = [];

  for (let abl = 0; abl < 41; abl += 1) {
    if (
      // 跳过空洞编号（五段区间）
      (abl >= 5 && abl <= 9) ||
      (abl >= 18 && abl <= 19) ||
      (abl >= 24 && abl <= 29) ||
      (abl >= 34 && abl <= 36) ||
      abl === 38
    ) {
      continue;
    }
    // 性别过滤：男无 私处感觉/百合气质/百合中毒，女无 断背气质/断背中毒
    if (
      male &&
      (abl === ABL_VAGINA || abl === ABL_LESBIAN || abl === ABL_LESBIAN_ADDICT)
    ) {
      continue;
    }
    if (!male && (abl === ABL_HOMO || abl === ABL_HOMO_ADDICT)) {
      continue;
    }
    const level = era.get(`abl:${cid}:${abl}`) || 0;
    if (level === 0) {
      continue; // 零值不显示
    }
    const name =
      // 男体的阴蒂感觉改名（字面量「阴茎感觉」）
      penis && abl === ABL_CLITORIS
        ? '阴茎感觉'
        : (era.get(`ablname:${abl}`) ?? '');
    cells.push({
      type: 'text',
      content: name,
      config: { align: 'left', width: ABL_NAME_WIDTH },
    });
    // 可提升标记未移植（见文件头），按判定 0 不缀 `*`
    cells.push({
      type: 'text',
      content: `- LV${level}`,
      config: { align: 'left', width: ABL_LEVEL_WIDTH },
    });
  }
  // 每行 4 项（原版「ELEMENT_COUNT % 4 == 0 时换行」的列数）＝ 8 格；残行
  // 按实际格数输出
  print_cell_grid(cells, ABL_PER_ROW * 2);
}

/**
 * show_info_mark：苦痛/快乐/屈服/反抗四枚刻印一行。
 *
 * 四枚各占一格（24 列 ÷ 4 = 6 列）：`{刻印名}:LV{n} [字符条]`。原版靠
 * 「首项 1 格、其余 3 格」的补位把四枚对齐，格子自己就能对齐，不需要补位。
 *
 * @param {number} cid 角色 ID
 */
function show_info_mark(cid) {
  const cells = [];
  for (const [index, mark_id] of MARKS.entries()) {
    const level = era.get(`mark:${cid}:${mark_id}`) || 0;
    cells.push({
      type: 'text',
      content: `${MARK_LABELS[index]}:LV${level} ${bar_text(level, MARK_BAR_MAX, MARK_BAR_LEN)}`,
      config: { align: 'left', width: MARK_WIDTH },
    });
  }
  // 可提升的 `*` 未移植（见文件头）
  print_cell_grid(cells, MARKS.length);
}

module.exports = { bar_text, show_info_abl, show_info_mark };
