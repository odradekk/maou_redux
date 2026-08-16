/**
 * @file 分族分发注册表（决议 #7，落地于 issue #21）。
 *
 * 源: Emuera 的 TRYCALLFORM / TRYCALL 拼名调用机制（引擎行为，非某个 ERB
 * 函数）。原作全库 86 处（TRYCALLFORM 57 / JUMPFORM 21 / TRYCALL 3 / CALLF 3 /
 * CALLFORM 2），语义证据见决议 #7 的评论。
 *
 * JS 没有运行时拼函数名调用的能力，这些调用改走显式注册表。本类承载一个
 * 「族」——同一前缀的全部实现（如 CHARA_EX_ / COM_ABLE / ABLUP / 口上），
 * 族内按编号命中**唯一**实现。与事件注册表（system/event/registry.js，
 * 广播式：一个事件跑全部处理器，有三档优先级）是**两套独立机制**（#7
 * 决议），互不 require。
 *
 * 设计核心：「已声明的编号空间」与「已实现的编号」分开。
 *   - 编号在空间内但未实现 → 合法缺失，返回**调用点**指定的 whenMissing；
 *   - 编号在空间外 → 拼写错误，抛错。
 * 原作的 TRYCALL 对两者同样静默跳过、无法区分——分开是移植的有意增强，
 * 也是 #7 要求的错误处理边界。
 *
 * 缺失值必须由调用点传入、不能由注册表统一规定：#7 实测原作同一族的四个
 * 调用点各不相同（ABL.ERB:255 预置 -1、CAMPAIGN_ROOM:163 预置 0、
 * COMSEQ_TRAIN:219 预置 1、COMSEQ_SHOW:131 不预置、读上一轮 RESULT 残留）。
 * 硬编码进注册表就会在某处悄悄改变游戏行为。whenMissing 默认 0 只对应
 * TRYCALL 落空时 RESULT = 0 的缺省，调用点应按原作各自显式给值。
 *
 * 【命名例外】declaredIds / whenMissing 保持 camelCase 而非仓库的 snake_case
 * 约定：接口形状由 #7 决议定死、验收清单原文照抄，且决议中各子系统的迁移
 * 示例（kojo / COM_ABLE / CHARA_EX）都以该拼写成文——公共底座的名字必须
 * 与决议逐字一致，避免十七个子系统照抄示例时对不上。
 */

/**
 * 一个分发族：声明空间 + 实现表 + 按编号调用。
 *
 * 用法（族模块的顶层，注册不碰 era.*，引擎允许）：
 *   const family = new DispatchFamily('CHARA_EX', DECLARED_IDS);
 *   family.register(0, (cid) => { ... });
 * 调用点（处理器函数体内）：
 *   await family.call(no, { whenMissing: 0, args: [cid] });
 */
class DispatchFamily {
  /**
   * @param {string} name 族名（沿用原作函数前缀，如 'CHARA_EX'），用于报错定位
   * @param {Iterable<number>} declaredIds 声明的编号空间（合法编号的全集，
   *   离线生成——运行时不能扫描文件，dev-guides/18-tools.md 的依赖限制）
   */
  constructor(name, declaredIds) {
    if (typeof name !== 'string' || name === '') {
      throw new TypeError('DispatchFamily 的族名必须是非空字符串');
    }
    /** 族名（原作函数前缀） */
    this.name = name;
    /** 声明的编号空间：编号合法性的唯一判据 */
    this.declared = new Set(declaredIds);
    /** 已实现的编号 → 处理函数 */
    this.implemented = new Map();
  }

  /**
   * 注册一个实现（对应原作一处 @定义；发生在族模块顶层）。
   * @param {number} id 编号，必须在声明空间内
   * @param {Function} fn 实现，参数由 call 的 args 透传，返回值经 await 交回
   * @throws {Error} 编号在声明空间外（拼写错误）
   * @throws {Error} 重复注册同一编号。原作的真实事故（#14）：23 个口上函数
   *   被同名定义悄悄遮蔽，引擎只给一条警告，玩家侧表现为口上完全失效——
   *   本项目要让它在启动（模块加载）时就炸出来
   */
  register(id, fn) {
    if (typeof fn !== 'function') {
      throw new TypeError(`${this.name}[${id}] 的实现必须是函数`);
    }
    if (!this.declared.has(id)) {
      throw new Error(
        `${this.name}[${id}] 不在声明的编号空间内（拼写错误或空间过期？）`,
      );
    }
    if (this.implemented.has(id)) {
      throw new Error(
        `${this.name}[${id}] 重复注册（#14：原作同名遮蔽缺陷，本项目启动期即报）`,
      );
    }
    this.implemented.set(id, fn);
  }

  /**
   * 查询编号是否已有实现。声明空间外一律 false——它是查询不是调用，
   * 不承担空间外报错的职责（那是 call 的事）。
   * @param {number} id 编号
   * @returns {boolean}
   */
  has(id) {
    return this.implemented.has(id);
  }

  /**
   * 按编号调用唯一实现（TRYCALLFORM 的等价物）。
   * @param {number} id 编号
   * @param {object} [options]
   * @param {any} [options.whenMissing=0] 编号在空间内但未实现时返回的值；
   *   **由调用点按原作各自声明**（四个同族调用点缺失语义各不相同，见文件头）
   * @param {any[]} [options.args] 透传给实现的参数
   * @returns {Promise<any>} 实现的返回值（已 await），或 whenMissing
   * @throws {Error} 编号在声明空间外——这是拼写错误，不是缺失
   */
  async call(id, { whenMissing = 0, args = [] } = {}) {
    if (!this.declared.has(id)) {
      throw new Error(
        `${this.name}[${id}] 不在声明的编号空间内（拼写错误或空间过期？）`,
      );
    }
    const fn = this.implemented.get(id);
    if (fn === undefined) {
      // 空间内缺失是合法的（TRYCALL 落空静默跳过的等价物），值由调用点给
      return whenMissing;
    }
    // 实现抛出的异常（含 BeginSignal 转场信号）原样上抛，注册表不吞不拦
    return fn(...args);
  }

  /**
   * 构建期报告：声明了但未实现的编号，升序。
   * 空间内缺失是合法状态（如 CHARA_EX 族 45 个角色只有 8 个专属实现），
   * 此清单供人工核对「缺失的都是有意缺失」，也供离线索引对账。
   * @returns {number[]}
   */
  missing() {
    return [...this.declared]
      .filter((id) => !this.implemented.has(id))
      .sort((a, b) => a - b);
  }
}

module.exports = { DispatchFamily };
