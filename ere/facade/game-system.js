/**
 * @file 一维变量的system域门面（tools/gen-facade.js）。
 *
 * 形状：game.system.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改
class SystemGame {
  // —— flag ——
  /**
   * 爱之奴隶所生（flag:32 ↔ FLAG:32）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:32
   * @returns {number}
   */
  get 爱之奴隶所生() {
    return era.get('flag:32') || 0;
  }
  /**
   * @param {number} v
   */
  set 爱之奴隶所生(v) {
    era.set('flag:32', v);
  }

  /**
   * 濒死自动结束调教（flag:35 ↔ FLAG:35）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:35
   * @returns {number}
   */
  get 濒死自动结束调教() {
    return era.get('flag:35') || 0;
  }
  /**
   * @param {number} v
   */
  set 濒死自动结束调教(v) {
    era.set('flag:35', v);
  }

  /**
   * 着衣系统（flag:37 ↔ FLAG:37）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:37
   * @returns {number}
   */
  get 着衣系统() {
    return era.get('flag:37') || 0;
  }
  /**
   * @param {number} v
   */
  set 着衣系统(v) {
    era.set('flag:37', v);
  }

  /**
   * flag_38（flag:38 ↔ FLAG:38）
   * 源: ownership/flag-ownership.yml；语义随系统票补
   * @returns {number}
   */
  get flag_38() {
    return era.get('flag:38') || 0;
  }
  /**
   * @param {number} v
   */
  set flag_38(v) {
    era.set('flag:38', v);
  }

  /**
   * 外来勇者等级上限（flag:76 ↔ FLAG:76）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:76
   * @returns {number}
   */
  get 外来勇者等级上限() {
    return era.get('flag:76') || 0;
  }
  /**
   * @param {number} v
   */
  set 外来勇者等级上限(v) {
    era.set('flag:76', v);
  }

  /**
   * 人间界侵攻度（flag:81 ↔ FLAG:81）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:81
   * @returns {number}
   */
  get 人间界侵攻度() {
    return era.get('flag:81') || 0;
  }
  /**
   * @param {number} v
   */
  set 人间界侵攻度(v) {
    era.set('flag:81', v);
  }

  /**
   * 精灵领域侵攻度（flag:86 ↔ FLAG:86）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:86
   * @returns {number}
   */
  get 精灵领域侵攻度() {
    return era.get('flag:86') || 0;
  }
  /**
   * @param {number} v
   */
  set 精灵领域侵攻度(v) {
    era.set('flag:86', v);
  }

  /**
   * 龙山侵攻度（flag:88 ↔ FLAG:88）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:88
   * @returns {number}
   */
  get 龙山侵攻度() {
    return era.get('flag:88') || 0;
  }
  /**
   * @param {number} v
   */
  set 龙山侵攻度(v) {
    era.set('flag:88', v);
  }

  /**
   * 天界侵攻度（flag:90 ↔ FLAG:90）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:90
   * @returns {number}
   */
  get 天界侵攻度() {
    return era.get('flag:90') || 0;
  }
  /**
   * @param {number} v
   */
  set 天界侵攻度(v) {
    era.set('flag:90', v);
  }

  /**
   * flag_99（flag:99 ↔ FLAG:99）
   * 源: ownership/flag-ownership.yml；语义随系统票补
   * @returns {number}
   */
  get flag_99() {
    return era.get('flag:99') || 0;
  }
  /**
   * @param {number} v
   */
  set flag_99(v) {
    era.set('flag:99', v);
  }

  /**
   * 狂王性别（flag:500 ↔ FLAG:500）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:500
   * @returns {number}
   */
  get 狂王性别() {
    return era.get('flag:500') || 0;
  }
  /**
   * @param {number} v
   */
  set 狂王性别(v) {
    era.set('flag:500', v);
  }

  /**
   * 初期奴隶类型（flag:501 ↔ FLAG:501）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:501
   * @returns {number}
   */
  get 初期奴隶类型() {
    return era.get('flag:501') || 0;
  }
  /**
   * @param {number} v
   */
  set 初期奴隶类型(v) {
    era.set('flag:501', v);
  }

  /**
   * flag_2807（flag:2807 ↔ FLAG:2807）
   * 源: ownership/flag-ownership.yml 属主 system
   * @returns {number}
   */
  get flag_2807() {
    return era.get('flag:2807') || 0;
  }
  /**
   * @param {number} v
   */
  set flag_2807(v) {
    era.set('flag:2807', v);
  }

  // —— tflag ——
  /**
   * 对象射精（tflag:10 ↔ TFLAG:10）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:10
   * @returns {number}
   */
  get 对象射精() {
    return era.get('tflag:10') || 0;
  }
  /**
   * @param {number} v
   */
  set 对象射精(v) {
    era.set('tflag:10', v);
  }

  /**
   * 对象喷乳（tflag:11 ↔ TFLAG:11）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:11
   * @returns {number}
   */
  get 对象喷乳() {
    return era.get('tflag:11') || 0;
  }
  /**
   * @param {number} v
   */
  set 对象喷乳(v) {
    era.set('tflag:11', v);
  }

  /**
   * 反抗刻印变动（tflag:21 ↔ TFLAG:21）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:21
   * @returns {number}
   */
  get 反抗刻印变动() {
    return era.get('tflag:21') || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗刻印变动(v) {
    era.set('tflag:21', v);
  }

  /**
   * 苦痛刻印变动（tflag:22 ↔ TFLAG:22）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:22
   * @returns {number}
   */
  get 苦痛刻印变动() {
    return era.get('tflag:22') || 0;
  }
  /**
   * @param {number} v
   */
  set 苦痛刻印变动(v) {
    era.set('tflag:22', v);
  }

  /**
   * 快乐刻印变动（tflag:23 ↔ TFLAG:23）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:23
   * @returns {number}
   */
  get 快乐刻印变动() {
    return era.get('tflag:23') || 0;
  }
  /**
   * @param {number} v
   */
  set 快乐刻印变动(v) {
    era.set('tflag:23', v);
  }

  /**
   * 屈服刻印变动（tflag:24 ↔ TFLAG:24）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:24
   * @returns {number}
   */
  get 屈服刻印变动() {
    return era.get('tflag:24') || 0;
  }
  /**
   * @param {number} v
   */
  set 屈服刻印变动(v) {
    era.set('tflag:24', v);
  }

  /**
   * 绝顶强度（tflag:29 ↔ TFLAG:29）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:29
   * @returns {number}
   */
  get 绝顶强度() {
    return era.get('tflag:29') || 0;
  }
  /**
   * @param {number} v
   */
  set 绝顶强度(v) {
    era.set('tflag:29', v);
  }

  /**
   * 榨乳中（tflag:35 ↔ TFLAG:35）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:35
   * @returns {number}
   */
  get 榨乳中() {
    return era.get('tflag:35') || 0;
  }
  /**
   * @param {number} v
   */
  set 榨乳中(v) {
    era.set('tflag:35', v);
  }

  /**
   * 下装穿不上（tflag:45 ↔ TFLAG:45）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:45
   * @returns {number}
   */
  get 下装穿不上() {
    return era.get('tflag:45') || 0;
  }
  /**
   * @param {number} v
   */
  set 下装穿不上(v) {
    era.set('tflag:45', v);
  }

  /**
   * 上次调教者是助手（tflag:50 ↔ TFLAG:50）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:50
   * @returns {number}
   */
  get 上次调教者是助手() {
    return era.get('tflag:50') || 0;
  }
  /**
   * @param {number} v
   */
  set 上次调教者是助手(v) {
    era.set('tflag:50', v);
  }

  /**
   * V虫产卵（tflag:120 ↔ TFLAG:120）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:120
   * @returns {number}
   */
  get V虫产卵() {
    return era.get('tflag:120') || 0;
  }
  /**
   * @param {number} v
   */
  set V虫产卵(v) {
    era.set('tflag:120', v);
  }

  /**
   * A虫产卵（tflag:121 ↔ TFLAG:121）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:121
   * @returns {number}
   */
  get A虫产卵() {
    return era.get('tflag:121') || 0;
  }
  /**
   * @param {number} v
   */
  set A虫产卵(v) {
    era.set('tflag:121', v);
  }

  /**
   * 反抗刻印回避（tflag:150 ↔ TFLAG:150）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:150
   * @returns {number}
   */
  get 反抗刻印回避() {
    return era.get('tflag:150') || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗刻印回避(v) {
    era.set('tflag:150', v);
  }

  // —— global ——
  /**
   * 联系方式开关（global:98 ↔ GLOBAL:98）
   * 源: yml/Global.yml id 98
   * @returns {number}
   */
  get 联系方式开关() {
    return era.get('global:98') || 0;
  }
  /**
   * @param {number} v
   */
  set 联系方式开关(v) {
    era.set('global:98', v);
  }

  /**
   * 致辞折叠开关（global:99 ↔ GLOBAL:99）
   * 源: yml/Global.yml id 99
   * @returns {number}
   */
  get 致辞折叠开关() {
    return era.get('global:99') || 0;
  }
  /**
   * @param {number} v
   */
  set 致辞折叠开关(v) {
    era.set('global:99', v);
  }
}
const facade = new SystemGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
