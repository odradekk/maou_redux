/**
 * @file 口上基类（#854）：一个钩子一个方法，默认不输出。
 *
 * == 为什么有这一层 ==
 *
 * 口上原来是「22 个分发族 + 每性格一个巨型函数」：同一个时机在每份口上文件里
 * 各写一遍，未注册的组合静默失声，新增一套口上只能继续复制。官方写法是
 * 基类 + 每性格子类 + 工厂（`dev-guides/14-lines.md` 的「方法三：改造入口
 * 函数」）：子类实现哪个钩子就覆盖哪个方法，没实现的落到基类。
 *
 * 基类的默认值是**不输出**：钩子回答的是「这个时机要不要说话」，默认不说话。
 * 迁移完成后（#855–#858 把各性格迁成子类、删掉分发族）这就是「该性格在这个
 * 时机没有口上」的最终形态。通用地文（如「和角色寒暄了一会」）属于具体钩子
 * 的默认实现，等真有钩子需要时再补——本票要求输出零变化，不预铺。
 *
 * == 钩子名单与实参 ==
 *
 * 钩子名 = 分发族名小写 = 分发族入口名（三者在过渡期必须对齐：
 * `run_kojo` 用族名反查方法名）。实参沿用 #213 定下的 handler 契约——
 * 迁移时把旧 handler 原样挪成方法即可，实参不用改：
 *
 *   kojo_message_com(rand)                  指令口上（模板方法，见下）
 *   select_com(rand)                        指令分支体（子类覆盖这个，不覆盖上面那个）
 *   header_checks()                         七道头部检查；false = 本回合不响
 *   kojo_message_palamcng(rand)             参数变动口上
 *   kojo_message_markcng(rand)              刻印取得口上
 *   self_kojo(rand, q)                      调教后自慰等事件口上（q = 妄想对象）
 *   dog_kojo(rand)                          兽奸专用（由头部检查岔入）
 *   colosseum_kojo()                        死斗场专用（同上）
 *   benki_koujo(rand)                       便器口上
 *   dungeon_victory(rand)                   迷宫胜利
 *   dungeon_attack(rand)                    迷宫被攻击
 *   dungeon_ryouzyoku()                     迷宫凌辱前
 *   dungeon_ryouzyoku_after()               迷宫凌辱后
 *   ntr_koujo(rand, p)                      NTR（p = 旧引擎的全局 P）
 *   exucution_koujo(event_no)               处刑（处分方式编号）
 *   museum_koujo(event_no)                  博物馆（雕像）（展品号）
 *   banishment_koujo(event_no)              流放处刑（处分号）
 *   public_exucution_koujo(event_no)        公开处刑（处分号）
 *   grotesque_koujo(event_no)               猎奇处刑（处分号）
 *   enterenemy_koujo(rand)                  遭遇敌人
 *   gohoubi_request_koujo(cid)              奖赏请求
 *   gohoubi_after_koujo(cid, choice)        奖赏结算后
 *   osioski_koujo(cid, choice)              惩罚结算后
 *   gobi_koujo(arg_0, rand)                 语尾（返回字符串，其余钩子返回 0）
 *
 * 实参只写在这张表里：基类的默认实现不读实参，方法上不写形参（写了就是
 * ESLint 的死参数）；子类覆盖时按这张表写形参。
 *
 * == 指令口上为什么是模板方法 ==
 *
 * `kojo_message_com` 只做「头部检查 → 指令分支」两段，子类**不要覆盖它**：
 * 覆盖了就绕过了七道头部检查。各性格的检查集不同（K4 五道、K1 七道且顺序
 * 互异，见 `test/kojo-system.test.js` 的 #213 契约），所以检查本身留在子类的
 * `header_checks()` 里，而「先查后说」这一步由基类固定。
 */

/**
 * 口上基类：一个钩子一个方法，默认不输出。
 */
class KojoBase {
  /** @param {number} id 口上编号（= LOCAL - 100，即分发族的键） */
  constructor(id) {
    /** 口上编号（= LOCAL - 100） */
    this.id = id;
  }

  /**
   * 七道头部检查（口塞 / 失神 / 兽奸 / 触手 / 死斗场 / 助手调教 / 崩坏）。
   * 各性格的检查集与顺序按自家口上文件写，只此一处；默认放行。
   * @returns {Promise<boolean>} true = 继续说，false = 本回合不响
   */
  async header_checks() {
    return true;
  }

  /**
   * 指令口上的模板方法：头部检查通过后再进指令分支。
   * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
   * @returns {Promise<number>} 0（调用方不读返回值）
   */
  async kojo_message_com(rand) {
    if (!(await this.header_checks(rand))) {
      return 0;
    }
    return this.select_com(rand);
  }

  /** 指令分支体（按 SELECTCOM 分派）；默认不输出 */
  async select_com() {
    return 0;
  }

  /** 参数变动口上；默认不输出 */
  async kojo_message_palamcng() {
    return 0;
  }

  /** 刻印取得口上；默认不输出 */
  async kojo_message_markcng() {
    return 0;
  }

  /** 调教后的事件口上；默认不输出 */
  async self_kojo() {
    return 0;
  }

  /** 兽奸专用口上（由头部检查岔入）；默认不输出 */
  async dog_kojo() {
    return 0;
  }

  /** 死斗场专用口上（由头部检查岔入）；默认不输出 */
  async colosseum_kojo() {
    return 0;
  }

  /** 便器口上；默认不输出 */
  async benki_koujo() {
    return 0;
  }

  /** 迷宫胜利口上；默认不输出 */
  async dungeon_victory() {
    return 0;
  }

  /** 迷宫被攻击口上；默认不输出 */
  async dungeon_attack() {
    return 0;
  }

  /** 迷宫凌辱前的口上；默认不输出 */
  async dungeon_ryouzyoku() {
    return 0;
  }

  /** 迷宫凌辱后的口上；默认不输出 */
  async dungeon_ryouzyoku_after() {
    return 0;
  }

  /** NTR 口上；默认不输出 */
  async ntr_koujo() {
    return 0;
  }

  /** 处刑口上；默认不输出 */
  async exucution_koujo() {
    return 0;
  }

  /** 博物馆（雕像）口上；默认不输出 */
  async museum_koujo() {
    return 0;
  }

  /** 流放处刑口上；默认不输出 */
  async banishment_koujo() {
    return 0;
  }

  /** 公开处刑口上；默认不输出 */
  async public_exucution_koujo() {
    return 0;
  }

  /** 猎奇处刑口上；默认不输出 */
  async grotesque_koujo() {
    return 0;
  }

  /** 遭遇敌人口上；默认不输出 */
  async enterenemy_koujo() {
    return 0;
  }

  /** 奖赏请求口上；默认不输出 */
  async gohoubi_request_koujo() {
    return 0;
  }

  /** 奖赏结算后的口上；默认不输出 */
  async gohoubi_after_koujo() {
    return 0;
  }

  /** 惩罚结算后的口上；默认不输出 */
  async osioski_koujo() {
    return 0;
  }

  /** 语尾：调用方把返回值拼进行内；默认空串（那一行照常结束） */
  async gobi_koujo() {
    return '';
  }
}

module.exports = { KojoBase };
