/**
 * @file 角色变量的dungeon域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).dungeon.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class DungeonFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— cflag ——
  /**
   * 攻击力（cflag:cid:11 ↔ CFLAG:11）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行270 CFLAG:11 = 攻撃力
   * @returns {number}
   */
  get 攻击力() {
    return era.get(`cflag:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 攻击力(v) {
    era.set(`cflag:${this.cid}:11`, v);
  }

  /**
   * 防御力（cflag:cid:12 ↔ CFLAG:12）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行271 CFLAG:12 = 防御力
   * @returns {number}
   */
  get 防御力() {
    return era.get(`cflag:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 防御力(v) {
    era.set(`cflag:${this.cid}:12`, v);
  }

  /**
   * 侵攻阶层（cflag:cid:501 ↔ CFLAG:501）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行386 CFLAG:501 侵攻階層
   * @returns {number}
   */
  get 侵攻阶层() {
    return era.get(`cflag:${this.cid}:501`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侵攻阶层(v) {
    era.set(`cflag:${this.cid}:501`, v);
  }

  /**
   * 休憩（cflag:cid:503 ↔ CFLAG:503）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:503 フラグ（回合结算的休憩判定消费）
   * @returns {number}
   */
  get 休憩() {
    return era.get(`cflag:${this.cid}:503`) || 0;
  }
  /**
   * @param {number} v
   */
  set 休憩(v) {
    era.set(`cflag:${this.cid}:503`, v);
  }

  /**
   * 再起点（cflag:cid:508 ↔ CFLAG:508）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行409 CFLAG:508 再起ポイント（ダンジョン外で全回復するために必要。階層突破で増加）
   * @returns {number}
   */
  get 再起点() {
    return era.get(`cflag:${this.cid}:508`) || 0;
  }
  /**
   * @param {number} v
   */
  set 再起点(v) {
    era.set(`cflag:${this.cid}:508`, v);
  }

  /**
   * 已接任务（cflag:cid:534 ↔ CFLAG:534）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:534 受注クエスト
   * @returns {number}
   */
  get 已接任务() {
    return era.get(`cflag:${this.cid}:534`) || 0;
  }
  /**
   * @param {number} v
   */
  set 已接任务(v) {
    era.set(`cflag:${this.cid}:534`, v);
  }

  // —— base ——
  /**
   * 体力（base:cid:0 ↔ BASE:0）
   * 源: yml/Base.yml id 0
   * @returns {number}
   */
  get 体力() {
    return era.get(`base:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 体力(v) {
    era.set(`base:${this.cid}:0`, v);
  }

  /**
   * 气力（base:cid:1 ↔ BASE:1）
   * 源: yml/Base.yml id 1
   * @returns {number}
   */
  get 气力() {
    return era.get(`base:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 气力(v) {
    era.set(`base:${this.cid}:1`, v);
  }

  // —— talent ——
  /**
   * 谜之魅力（talent:cid:92 ↔ TALENT:92）
   * 源: yml/Talent.yml id 92
   * @returns {number}
   */
  get 谜之魅力() {
    return era.get(`talent:${this.cid}:92`) || 0;
  }
  /**
   * @param {number} v
   */
  set 谜之魅力(v) {
    era.set(`talent:${this.cid}:92`, v);
  }

  /**
   * 魅力（talent:cid:113 ↔ TALENT:113）
   * 源: yml/Talent.yml id 113
   * @returns {number}
   */
  get 魅力() {
    return era.get(`talent:${this.cid}:113`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魅力(v) {
    era.set(`talent:${this.cid}:113`, v);
  }

  /**
   * 高人气（talent:cid:126 ↔ TALENT:126）
   * 源: yml/Talent.yml id 126
   * @returns {number}
   */
  get 高人气() {
    return era.get(`talent:${this.cid}:126`) || 0;
  }
  /**
   * @param {number} v
   */
  set 高人气(v) {
    era.set(`talent:${this.cid}:126`, v);
  }

  /**
   * 妓女（talent:cid:180 ↔ TALENT:180）
   * 源: yml/Talent.yml id 180
   * @returns {number}
   */
  get 妓女() {
    return era.get(`talent:${this.cid}:180`) || 0;
  }
  /**
   * @param {number} v
   */
  set 妓女(v) {
    era.set(`talent:${this.cid}:180`, v);
  }

  /**
   * 倾城（talent:cid:181 ↔ TALENT:181）
   * 源: yml/Talent.yml id 181
   * @returns {number}
   */
  get 倾城() {
    return era.get(`talent:${this.cid}:181`) || 0;
  }
  /**
   * @param {number} v
   */
  set 倾城(v) {
    era.set(`talent:${this.cid}:181`, v);
  }

  /**
   * 巧言（talent:cid:182 ↔ TALENT:182）
   * 源: yml/Talent.yml id 182
   * @returns {number}
   */
  get 巧言() {
    return era.get(`talent:${this.cid}:182`) || 0;
  }
  /**
   * @param {number} v
   */
  set 巧言(v) {
    era.set(`talent:${this.cid}:182`, v);
  }

  /**
   * 歌姫（talent:cid:185 ↔ TALENT:185）
   * 源: yml/Talent.yml id 185
   * @returns {number}
   */
  get 歌姫() {
    return era.get(`talent:${this.cid}:185`) || 0;
  }
  /**
   * @param {number} v
   */
  set 歌姫(v) {
    era.set(`talent:${this.cid}:185`, v);
  }

  /**
   * 舞姫（talent:cid:186 ↔ TALENT:186）
   * 源: yml/Talent.yml id 186
   * @returns {number}
   */
  get 舞姫() {
    return era.get(`talent:${this.cid}:186`) || 0;
  }
  /**
   * @param {number} v
   */
  set 舞姫(v) {
    era.set(`talent:${this.cid}:186`, v);
  }

  /**
   * 私处产卵（talent:cid:190 ↔ TALENT:190）
   * 源: yml/Talent.yml id 190
   * @returns {number}
   */
  get 私处产卵() {
    return era.get(`talent:${this.cid}:190`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处产卵(v) {
    era.set(`talent:${this.cid}:190`, v);
  }

  /**
   * 直肠产卵（talent:cid:191 ↔ TALENT:191）
   * 源: yml/Talent.yml id 191
   * @returns {number}
   */
  get 直肠产卵() {
    return era.get(`talent:${this.cid}:191`) || 0;
  }
  /**
   * @param {number} v
   */
  set 直肠产卵(v) {
    era.set(`talent:${this.cid}:191`, v);
  }

  /**
   * 肛门虫（talent:cid:193 ↔ TALENT:193）
   * 源: yml/Talent.yml id 193
   * @returns {number}
   */
  get 肛门虫() {
    return era.get(`talent:${this.cid}:193`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门虫(v) {
    era.set(`talent:${this.cid}:193`, v);
  }

  /**
   * 战士（talent:cid:200 ↔ TALENT:200）
   * 源: yml/Talent.yml id 200
   * @returns {number}
   */
  get 战士() {
    return era.get(`talent:${this.cid}:200`) || 0;
  }
  /**
   * @param {number} v
   */
  set 战士(v) {
    era.set(`talent:${this.cid}:200`, v);
  }

  /**
   * 魔法师（talent:cid:201 ↔ TALENT:201）
   * 源: yml/Talent.yml id 201
   * @returns {number}
   */
  get 魔法师() {
    return era.get(`talent:${this.cid}:201`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔法师(v) {
    era.set(`talent:${this.cid}:201`, v);
  }

  /**
   * 神官（talent:cid:202 ↔ TALENT:202）
   * 源: yml/Talent.yml id 202
   * @returns {number}
   */
  get 神官() {
    return era.get(`talent:${this.cid}:202`) || 0;
  }
  /**
   * @param {number} v
   */
  set 神官(v) {
    era.set(`talent:${this.cid}:202`, v);
  }

  /**
   * 盗贼（talent:cid:203 ↔ TALENT:203）
   * 源: yml/Talent.yml id 203
   * @returns {number}
   */
  get 盗贼() {
    return era.get(`talent:${this.cid}:203`) || 0;
  }
  /**
   * @param {number} v
   */
  set 盗贼(v) {
    era.set(`talent:${this.cid}:203`, v);
  }

  /**
   * 肉便器（talent:cid:204 ↔ TALENT:204）
   * 源: yml/Talent.yml id 204
   * @returns {number}
   */
  get 肉便器() {
    return era.get(`talent:${this.cid}:204`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肉便器(v) {
    era.set(`talent:${this.cid}:204`, v);
  }

  /**
   * 骑士（talent:cid:205 ↔ TALENT:205）
   * 源: yml/Talent.yml id 205
   * @returns {number}
   */
  get 骑士() {
    return era.get(`talent:${this.cid}:205`) || 0;
  }
  /**
   * @param {number} v
   */
  set 骑士(v) {
    era.set(`talent:${this.cid}:205`, v);
  }

  /**
   * 巫女（talent:cid:206 ↔ TALENT:206）
   * 源: yml/Talent.yml id 206
   * @returns {number}
   */
  get 巫女() {
    return era.get(`talent:${this.cid}:206`) || 0;
  }
  /**
   * @param {number} v
   */
  set 巫女(v) {
    era.set(`talent:${this.cid}:206`, v);
  }

  /**
   * 忍者（talent:cid:207 ↔ TALENT:207）
   * 源: yml/Talent.yml id 207
   * @returns {number}
   */
  get 忍者() {
    return era.get(`talent:${this.cid}:207`) || 0;
  }
  /**
   * @param {number} v
   */
  set 忍者(v) {
    era.set(`talent:${this.cid}:207`, v);
  }

  /**
   * 弓手（talent:cid:208 ↔ TALENT:208）
   * 源: yml/Talent.yml id 208
   * @returns {number}
   */
  get 弓手() {
    return era.get(`talent:${this.cid}:208`) || 0;
  }
  /**
   * @param {number} v
   */
  set 弓手(v) {
    era.set(`talent:${this.cid}:208`, v);
  }

  /**
   * 苗床（talent:cid:209 ↔ TALENT:209）
   * 源: yml/Talent.yml id 209
   * @returns {number}
   */
  get 苗床() {
    return era.get(`talent:${this.cid}:209`) || 0;
  }
  /**
   * @param {number} v
   */
  set 苗床(v) {
    era.set(`talent:${this.cid}:209`, v);
  }

  // —— exp ——
  /**
   * 私处经验（exp:cid:0 ↔ EXP:0）
   * 源: yml/Exp.yml id 0
   * @returns {number}
   */
  get 私处经验() {
    return era.get(`exp:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处经验(v) {
    era.set(`exp:${this.cid}:0`, v);
  }

  /**
   * 肛门经验（exp:cid:1 ↔ EXP:1）
   * 源: yml/Exp.yml id 1
   * @returns {number}
   */
  get 肛门经验() {
    return era.get(`exp:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门经验(v) {
    era.set(`exp:${this.cid}:1`, v);
  }

  /**
   * 绝顶经验（exp:cid:2 ↔ EXP:2）
   * 源: yml/Exp.yml id 2
   * @returns {number}
   */
  get 绝顶经验() {
    return era.get(`exp:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 绝顶经验(v) {
    era.set(`exp:${this.cid}:2`, v);
  }

  /**
   * 性交经验（exp:cid:5 ↔ EXP:5）
   * 源: yml/Exp.yml id 5
   * @returns {number}
   */
  get 性交经验() {
    return era.get(`exp:${this.cid}:5`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性交经验(v) {
    era.set(`exp:${this.cid}:5`, v);
  }

  /**
   * 精饮绝顶经验（exp:cid:8 ↔ EXP:8）
   * 源: yml/Exp.yml id 8
   * @returns {number}
   */
  get 精饮绝顶经验() {
    return era.get(`exp:${this.cid}:8`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精饮绝顶经验(v) {
    era.set(`exp:${this.cid}:8`, v);
  }

  /**
   * 自慰经验（exp:cid:10 ↔ EXP:10）
   * 源: yml/Exp.yml id 10
   * @returns {number}
   */
  get 自慰经验() {
    return era.get(`exp:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自慰经验(v) {
    era.set(`exp:${this.cid}:10`, v);
  }

  /**
   * 调教自慰经验（exp:cid:11 ↔ EXP:11）
   * 源: yml/Exp.yml id 11
   * @returns {number}
   */
  get 调教自慰经验() {
    return era.get(`exp:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调教自慰经验(v) {
    era.set(`exp:${this.cid}:11`, v);
  }

  /**
   * 精液经验（exp:cid:20 ↔ EXP:20）
   * 源: yml/Exp.yml id 20
   * @returns {number}
   */
  get 精液经验() {
    return era.get(`exp:${this.cid}:20`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精液经验(v) {
    era.set(`exp:${this.cid}:20`, v);
  }

  /**
   * 侍奉快乐经验（exp:cid:21 ↔ EXP:21）
   * 源: yml/Exp.yml id 21
   * @returns {number}
   */
  get 侍奉快乐经验() {
    return era.get(`exp:${this.cid}:21`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侍奉快乐经验(v) {
    era.set(`exp:${this.cid}:21`, v);
  }

  /**
   * 口交经验（exp:cid:22 ↔ EXP:22）
   * 源: yml/Exp.yml id 22
   * @returns {number}
   */
  get 口交经验() {
    return era.get(`exp:${this.cid}:22`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口交经验(v) {
    era.set(`exp:${this.cid}:22`, v);
  }

  /**
   * 被虐快乐经验（exp:cid:30 ↔ EXP:30）
   * 源: yml/Exp.yml id 30
   * @returns {number}
   */
  get 被虐快乐经验() {
    return era.get(`exp:${this.cid}:30`) || 0;
  }
  /**
   * @param {number} v
   */
  set 被虐快乐经验(v) {
    era.set(`exp:${this.cid}:30`, v);
  }

  /**
   * 施虐快乐经验（exp:cid:33 ↔ EXP:33）
   * 源: yml/Exp.yml id 33
   * @returns {number}
   */
  get 施虐快乐经验() {
    return era.get(`exp:${this.cid}:33`) || 0;
  }
  /**
   * @param {number} v
   */
  set 施虐快乐经验(v) {
    era.set(`exp:${this.cid}:33`, v);
  }

  /**
   * 异常经验（exp:cid:50 ↔ EXP:50）
   * 源: yml/Exp.yml id 50
   * @returns {number}
   */
  get 异常经验() {
    return era.get(`exp:${this.cid}:50`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异常经验(v) {
    era.set(`exp:${this.cid}:50`, v);
  }

  /**
   * 私处扩张经验（exp:cid:52 ↔ EXP:52）
   * 源: yml/Exp.yml id 52
   * @returns {number}
   */
  get 私处扩张经验() {
    return era.get(`exp:${this.cid}:52`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处扩张经验(v) {
    era.set(`exp:${this.cid}:52`, v);
  }

  /**
   * 肛门扩张经验（exp:cid:53 ↔ EXP:53）
   * 源: yml/Exp.yml id 53
   * @returns {number}
   */
  get 肛门扩张经验() {
    return era.get(`exp:${this.cid}:53`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门扩张经验(v) {
    era.set(`exp:${this.cid}:53`, v);
  }

  /**
   * 触手经验（exp:cid:55 ↔ EXP:55）
   * 源: yml/Exp.yml id 55
   * @returns {number}
   */
  get 触手经验() {
    return era.get(`exp:${this.cid}:55`) || 0;
  }
  /**
   * @param {number} v
   */
  set 触手经验(v) {
    era.set(`exp:${this.cid}:55`, v);
  }

  /**
   * 兽奸经验（exp:cid:56 ↔ EXP:56）
   * 源: yml/Exp.yml id 56
   * @returns {number}
   */
  get 兽奸经验() {
    return era.get(`exp:${this.cid}:56`) || 0;
  }
  /**
   * @param {number} v
   */
  set 兽奸经验(v) {
    era.set(`exp:${this.cid}:56`, v);
  }

  /**
   * 药物经验（exp:cid:57 ↔ EXP:57）
   * 源: yml/Exp.yml id 57
   * @returns {number}
   */
  get 药物经验() {
    return era.get(`exp:${this.cid}:57`) || 0;
  }
  /**
   * @param {number} v
   */
  set 药物经验(v) {
    era.set(`exp:${this.cid}:57`, v);
  }

  /**
   * 调教会话经验（exp:cid:73 ↔ EXP:73）
   * 源: yml/Exp.yml id 73
   * @returns {number}
   */
  get 调教会话经验() {
    return era.get(`exp:${this.cid}:73`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调教会话经验(v) {
    era.set(`exp:${this.cid}:73`, v);
  }

  /**
   * 卖淫经验（exp:cid:74 ↔ EXP:74）
   * 源: yml/Exp.yml id 74
   * @returns {number}
   */
  get 卖淫经验() {
    return era.get(`exp:${this.cid}:74`) || 0;
  }
  /**
   * @param {number} v
   */
  set 卖淫经验(v) {
    era.set(`exp:${this.cid}:74`, v);
  }

  /**
   * 战斗经验（exp:cid:80 ↔ EXP:80）
   * 源: yml/Exp.yml id 80
   * @returns {number}
   */
  get 战斗经验() {
    return era.get(`exp:${this.cid}:80`) || 0;
  }
  /**
   * @param {number} v
   */
  set 战斗经验(v) {
    era.set(`exp:${this.cid}:80`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = DungeonFacade;
