/**
 * @file 画面组件基座：自知占几行、可就地重绘的屏幕块（#73 最小集）。
 *
 * 画面组件是本项目的自建表现层架构（ADR-0003「表现层用
 *     画面组件，行数靠运行时测量」，术语见 CONTEXT.md「画面组件/重绘」）。
 *     就地重绘＝记下绘制前的行数 → 画 → 清掉「当前行数 − 记录值」的
 *     跨度（无效输入时单清回显行）。
 *
 * 行数的计法（#73 决定，依据见 issue #73 设计留言）：
 *   - 「占几行」＝绘制前后 getLineCount() 的差值——运行时测量，不静态
 *     声明（内容可变的组件，行数必然随数据变：角色列表随人数、参数条
 *     随条目数）；
 *   - 重绘清行 ＝ getLineCount() - 基准点（基准点＝本次绘制前的行数）。基准点
 *     跨度天然覆盖：组件自身行 + input 回显行（+1 Row，#68 已镜像进缝）
 *     + 两次绘制之间的任何临时输出（如分发期的存根行、选择画面整屏）。
 *     只清「自身行数」是错的：clear 只能从屏幕尾部删行（渲染层公式，
 *     #68 实证），回显行在组件下方，清 N 行会删掉回显、留下组件顶行，
 *     实机表现为屏幕每轮净涨一行——正是 Row 的计法错误的破坏形式。
 *
 * 重绘只发生在玩家交互之后（ADR-0003：叙述流中间重绘会打断右键快进）。
 * 本类不强制时机（它不知道调用方上下文），由调用点负责：唯一的调用方
 * page-shop 的商店轮是「输入 → 分发 → 重绘」的循环，测试固定住该点。
 */

const era = require('#/era-electron');

class ScreenBlock {
  /**
   * @param {() => (void | Promise<void>)} draw_content 绘制本块内容的函数
   *   （只输出、不清屏——清行归 redraw；行数任意、可随数据变）
   */
  constructor(draw_content) {
    this.draw_content = draw_content;
    this.anchor_row = null;
    /** 基准点：最近一次绘制前的行数（null ＝ 尚未绘制过） */
    /** 最近一次绘制占的行数（运行时测量，绘制前读它无意义） */
    this.row_count = 0;
  }

  /**
   * 追加绘制本块并测量行数（不清屏——上方的既有内容原样保留）。
   * @returns {Promise<number>} 本次绘制占的行数
   */
  async draw() {
    this.anchor_row = era.getLineCount();
    await this.draw_content();
    this.row_count = era.getLineCount() - this.anchor_row;
    return this.row_count;
  }

  /**
   * 就地重绘：清掉基准点以降的全部行（自身 + 回显 + 其间临时输出），再画。
   * 未绘制过时等价于 draw()（不清屏的首绘——进状态时保住上方内容）。
   * 基准点跨度非正（外部整屏清过、基准点已失效）时跳过清屏、直接重定基准重画。
   * @returns {Promise<number>} 重绘后占的行数
   */
  async redraw() {
    if (this.anchor_row === null) {
      return this.draw();
    }
    const span = era.getLineCount() - this.anchor_row;
    if (span > 0) {
      // clear 的返回值＝清屏后行数（#68 实证），应当正好回到基准点；对不上
      // 说明有旁路动过行数（引擎/夹具计法不一致或误用），记录后由 draw 重定基准。
      const remaining = await era.clear(span);
      if (remaining !== this.anchor_row) {
        era.logger.warn(
          `画面组件重绘后行数 ${remaining} 未回到锚点 ${this.anchor_row}（清行跨度 ${span}）——存在旁路清行`,
        );
      }
    }
    return this.draw();
  }
}

module.exports = { ScreenBlock };
