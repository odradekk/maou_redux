/**
 * @file 角色变量的patch域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).patch.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class PatchFacade {
  constructor(cid) {
    this.cid = cid;
  }

  /**
   * 不怕脏（talent:cid:64 ↔ TALENT:64）
   * 源: yml/Talent.yml id 64
   * @returns {number}
   */
  get 不怕脏() {
    return era.get(`talent:${this.cid}:64`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不怕脏(v) {
    era.set(`talent:${this.cid}:64`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = PatchFacade;
