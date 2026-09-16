/**
 * @file 角色信息的能力一览与刻印行（@SHOW_INFO_ABL / @SHOW_INFO_MARK）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @SHOW_INFO_ABL（:927-986）/ @SHOW_INFO_MARK（:992-1016）
 *
 * 两段的形态都由黄金样本钉住（train-upgrade-log:157 与 159，魔王的能力
 * 画面）：`  技巧     - LV3   ` 与 ` 苦痛:LV0 [...]   快乐:LV0 [...]`——用例
 * 逐字复现这两行。
 *
 * **Emuera 的命令行前导空格规则**（本文件的排版依据，两行样本都验过）：
 * `PRINTFORM X` 里命令名后的**第一个空格是命令与表达式之间的分隔符**，不算
 * 正文。所以 `PRINTFORM  技巧` 输出 ` 技巧`（一个前导空格）、`PRINTFORM   快乐`
 * 输出 `   快乐`（三个）。逐字抄源时必须把这一格减掉，否则整行右移一格——
 * 分类素质那七行（chara-talents.js）与标题行同此规则。
 *
 * 有意偏离（登记在案，不随本票）：
 *   - `CALL DECIDE_ABLUP`（:969）与其后的 `*` 可提升标记、`CALL DECIDE_ABLUP99`
 *     （:1010-1012）的 `PRINT *` 都不随本票移植：判定本体在
 *     `ERB/ABL/ABLUP*.ERB`（26 则）与 `ABL/ABL.ERB:115-201`，属「能力提升」
 *     票的范围（docs/stub-registry.md:76 与 :78-81，两条的状态列都写着
 *     「登记（未接入：列表已渲染、无 `*` 标记）」——page-ablup.js 的
 *     @SHOW_ABLUP_SELECT 同样处理）。本文件按「判定结果为 0」渲染，即
 *     ABL 行尾 2 个空格、MARK 行尾不缀 `*`，与黄金样本的魔王行一致；
 *   - 感觉封锁的灰显（`@SHOW_ABLUP_SELECT` :60-64 的 `[―]` 与灰字）是那个
 *     画面的形态，本函数源里没有，不引入；
 *   - `BAR` 命令的等价物见 bar_text——源的 BAR 只在 SHOW_INFO_MARK 还有
 *     消费点（LIFE_BAR/VITAL_BAR 已改 progress 格）。
 */

const era = require('#/era-electron');
const { pad_display } = require('#/utils/display-width');

/** 素质编号（yml/Talent.yml 的名字表；原件以名字寻址，此处用编号 + 注释） */
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

/** 刻印条的满级（源 :1003 等四条 `BAR MARK:n, 3, 3` 的第二个实参） */
const MARK_BAR_MAX = 3;
/** 刻印条的格数（同上的第三个实参） */
const MARK_BAR_LEN = 3;

/**
 * `BAR 当前值, 最大值, 长度` 的等价物（源 :1003/:1005/:1007/:1009）。
 *
 * 形态由 _replace.csv 定：`BAR文字1`（填充侧，缺省 `*`）与 `BAR文字2`
 * （空白侧，缺省 `.`）——target/CSV/_replace.csv:38-45 两条都被注释掉，即
 * 取缺省。方括号是 BAR 命令自己加的（黄金样本 train-upgrade-log:159 的
 * `[...]` 就是 0/3/3 的输出，bar 字符只有三个点、括号另计）。
 *
 * 填充格数取 `cur * len / max` 的整数商并夹到 [0, len]；`max <= 0` 或
 * `cur <= 0` 时全空。**只有全空形态有黄金样本**（三份样本的刻印都是 LV0），
 * 非零形态按上式实现，登记于此。
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
 * @SHOW_INFO_ABL（:927-986）：非零能力的一览（4 列）。
 *
 * 原作的 `ARG:0` 是「换角色」形态（:936-939 与 :984-986 的 TARGET 换出换入），
 * ere 侧一律显式传 cid（chara-bars.js 同款），两处换手不移植。
 *
 * @param {number} cid 角色 ID
 */
function show_info_abl(cid) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const male = t(TALENT_MAN) !== 0;
  const penis = male || t(TALENT_FUTA) !== 0;
  let element_count = 0; // :932 ELEMENT_COUNT = 0

  let row = '';
  for (let abl = 0; abl < 41; abl += 1) {
    // :943 跳过空洞编号（源用五个 INRANGE 串联）
    if (
      (abl >= 5 && abl <= 9) ||
      (abl >= 18 && abl <= 19) ||
      (abl >= 24 && abl <= 29) ||
      (abl >= 34 && abl <= 36) ||
      abl === 38
    ) {
      continue;
    }
    // :948-954 性别过滤：男无 私处感觉/百合气质/百合中毒，女无 断背气质/断背中毒
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
      continue; // :957-959 零值不显示
    }
    // :962-966 男体的阴蒂感觉改名（源里是字面量 "阴茎感觉"）
    const name =
      penis && abl === ABL_CLITORIS
        ? '阴茎感觉'
        : (era.get(`ablname:${abl}`) ?? '');
    // :963/:965 两个前导空格（命令名后的第一个空格是分隔符，见文件头）
    row += `  ${pad_display(name, 8)} - LV${pad_display(String(level), 2)}`;
    // :969 CALL DECIDE_ABLUP：可提升标记未移植（见文件头），按结果 0 补 2 空格
    row += '  ';

    element_count += 1; // :972
    if (element_count % 4 === 0) {
      era.print(row); // :973-975
      row = '';
    }
  }
  if (element_count % 4 !== 0) {
    era.print(row); // :979-981（不足 4 项也收行）
  }
}

/**
 * @SHOW_INFO_MARK（:992-1016）：苦痛/快乐/屈服/反抗四枚刻印一行。
 * @param {number} cid 角色 ID
 */
function show_info_mark(cid) {
  const fragments = [];
  for (const [index, mark_id] of MARKS.entries()) {
    const level = era.get(`mark:${cid}:${mark_id}`) || 0;
    // :1002/:1004/:1006/:1008 PRINTFORM 的间距：首项 1 个前导空格、
    // 其余 4 个「快乐:」之间 3 个（命令后的第一个空格是分隔符，见文件头）
    fragments.push({
      content: `${index === 0 ? ' ' : '   '}${MARK_LABELS[index]}:LV${level} `,
    });
    // :1003/:1005/:1007/:1009 BAR MARK:n, 3, 3
    fragments.push({
      content: bar_text(level, MARK_BAR_MAX, MARK_BAR_LEN),
    });
  }
  // :1010-1013 CALL DECIDE_ABLUP99 的 `*` 未移植（见文件头）
  era.print(fragments); // :1010-1013 PRINTL
}

module.exports = { bar_text, show_info_abl, show_info_mark };
