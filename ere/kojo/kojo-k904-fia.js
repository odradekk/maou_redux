/**
 * @file 菲娅口上 K904（issue #250，J40；#858 改为继承 K19）。
 *
 * K19 与 K904 是同一套台词的两个入口：K19 由性格素质 TALENT:179 触发（口上号
 * 19），K904 由迁移后的 EX_TALENT:104 触发（EX 口上号 904 → LOCAL 1004）。迁移前
 * 本文件是 kojo-k19-fia.js 的整份复制品（9,385 行），把编号归一之后只剩 38 行
 * 不同，其中 3 行还是注释——其余全是「同一段逻辑换了地址」。
 *
 * 现在只剩一处差异，其余台词、状态机与七道头部检查一律继承 KojoK19：
 * `gobi_koujo` 取常量表的 904 号行（K19 取 19 号行）。两处素质判断与存在标志
 * 都随 #859 删除——性格由 `get_kojo_num` 判定（EX_TALENT:104 → 1004 → 本套），
 * 工厂只把命中者交给这里。
 *
 * museum_koujo 不按博物馆口上编号分派：固定输出求慰台词（爱慕时）与低头正文
 * ——正文在父类的 museum_koujo_k19，本文件不再各写一份。单人结局口上未实现。
 */

'use strict';

const era = require('#/era-electron');
const { KojoK19 } = require('#/kojo/kojo-k19-fia');
const { register_kojo } = require('#/kojo/kojo-factory');
const { gobi_text } = require('#/data/gobi-koujo-const');

/**
 * 菲娅 EX 口上 K904：只覆盖与 KojoK19 不同的那一处。
 *
 * 类里没有别的东西——多加一个覆盖方法就是「K904 特有的分支」漂回去的开始，
 * 两套口上的正文必须逐字相同（迁移前它们本就是同一份复制品）。
 */
class KojoK904 extends KojoK19 {
  /**
   * 目标角色身上挂着本口上的素质吗（EX_TALENT:104）。
   * @param {number} target 目标角色号
   * @returns {boolean} true = 这套口上归目标角色
   */
  is_own_kojo(target) {
    return (era.get(`ex_talent:${target}:104`) || 0) == 1;
  }

  /** 语尾取自常量表的 904 号行（K19 用 19 号行；两行文字当前逐字相同） */
  async gobi_koujo(arg0, rand) {
    return gobi_text(904, arg0, rand);
  }
}

// 模块装载即登记口上类（#859 起这是本模块唯一的启动副作用：分发按键查工厂，
// 事件接线在 kojo-system.js 一处完成）。
register_kojo(904, KojoK904);

module.exports = { KojoK904 };
