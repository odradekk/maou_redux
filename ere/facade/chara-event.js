/**
 * @file 角色变量的event域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).event.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class EventFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— cflag ——
  /**
   * 妊娠相手（cflag:cid:102 ↔ CFLAG:102）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行318 CFLAG:102 = 誰によって妊娠させられたか（マスター=1, 助手=2, 奴隷=3, 客=4, 犬=5, モンスター・触手=6, 狂王=7）
   * @returns {number}
   */
  get 妊娠相手() {
    return era.get(`cflag:${this.cid}:102`) || 0;
  }
  /**
   * @param {number} v
   */
  set 妊娠相手(v) {
    era.set(`cflag:${this.cid}:102`, v);
  }

  /**
   * 装饰（cflag:cid:551 ↔ CFLAG:551）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:550～559 装備品枠——装飾（存储编号，EQUIP.ERB:36）
   * @returns {number}
   */
  get 装饰() {
    return era.get(`cflag:${this.cid}:551`) || 0;
  }
  /**
   * @param {number} v
   */
  set 装饰(v) {
    era.set(`cflag:${this.cid}:551`, v);
  }

  /**
   * 装饰2（cflag:cid:552 ↔ CFLAG:552）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:550～559 装備品枠——装飾2（存储编号，EQUIP.ERB:37）
   * @returns {number}
   */
  get 装饰2() {
    return era.get(`cflag:${this.cid}:552`) || 0;
  }
  /**
   * @param {number} v
   */
  set 装饰2(v) {
    era.set(`cflag:${this.cid}:552`, v);
  }

  /**
   * 贞操带钥匙（cflag:cid:50 ↔ CFLAG:50）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行304 CFLAG:50 = 貞操帯のカギをダンジョンで見つけた
   * @returns {number}
   */
  get 贞操带钥匙() {
    return era.get(`cflag:${this.cid}:50`) || 0;
  }
  /**
   * @param {number} v
   */
  set 贞操带钥匙(v) {
    era.set(`cflag:${this.cid}:50`, v);
  }

  /**
   * 侵攻度（cflag:cid:502 ↔ CFLAG:502）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行387 CFLAG:502 侵攻度
   * @returns {number}
   */
  get 侵攻度() {
    return era.get(`cflag:${this.cid}:502`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侵攻度(v) {
    era.set(`cflag:${this.cid}:502`, v);
  }

  /**
   * X坐标（cflag:cid:510 ↔ CFLAG:510）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行412 CFLAG:510 = X座標
   * @returns {number}
   */
  get X坐标() {
    return era.get(`cflag:${this.cid}:510`) || 0;
  }
  /**
   * @param {number} v
   */
  set X坐标(v) {
    era.set(`cflag:${this.cid}:510`, v);
  }

  /**
   * Y坐标（cflag:cid:511 ↔ CFLAG:511）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行413 CFLAG:511 = Y座標
   * @returns {number}
   */
  get Y坐标() {
    return era.get(`cflag:${this.cid}:511`) || 0;
  }
  /**
   * @param {number} v
   */
  set Y坐标(v) {
    era.set(`cflag:${this.cid}:511`, v);
  }

  /**
   * 自动调教回数（cflag:cid:667 ↔ CFLAG:667）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:667 = 自動調教回数
   * @returns {number}
   */
  get 自动调教回数() {
    return era.get(`cflag:${this.cid}:667`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自动调教回数(v) {
    era.set(`cflag:${this.cid}:667`, v);
  }

  // —— tequip ——
  /**
   * 主人避孕套（tequip:cid:35 ↔ TEQUIP:35）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行511 TEQUIP:35 マスターがコンドーム装着（属主 event：SYSTEM_SOURCE/COMF_CONDOM 的跨域写走本门面）
   * @returns {number}
   */
  get 主人避孕套() {
    return era.get(`tequip:${this.cid}:35`) || 0;
  }
  /**
   * @param {number} v
   */
  set 主人避孕套(v) {
    era.set(`tequip:${this.cid}:35`, v);
  }

  // —— talent ——
  /**
   * 反抗心（talent:cid:11 ↔ TALENT:11）
   * 源: yml/Talent.yml id 11
   * @returns {number}
   */
  get 反抗心() {
    return era.get(`talent:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗心(v) {
    era.set(`talent:${this.cid}:11`, v);
  }

  /**
   * 克制（talent:cid:20 ↔ TALENT:20）
   * 源: yml/Talent.yml id 20
   * @returns {number}
   */
  get 克制() {
    return era.get(`talent:${this.cid}:20`) || 0;
  }
  /**
   * @param {number} v
   */
  set 克制(v) {
    era.set(`talent:${this.cid}:20`, v);
  }

  /**
   * 冷漠（talent:cid:21 ↔ TALENT:21）
   * 源: yml/Talent.yml id 21
   * @returns {number}
   */
  get 冷漠() {
    return era.get(`talent:${this.cid}:21`) || 0;
  }
  /**
   * @param {number} v
   */
  set 冷漠(v) {
    era.set(`talent:${this.cid}:21`, v);
  }

  /**
   * 感情淡薄（talent:cid:22 ↔ TALENT:22）
   * 源: yml/Talent.yml id 22
   * @returns {number}
   */
  get 感情淡薄() {
    return era.get(`talent:${this.cid}:22`) || 0;
  }
  /**
   * @param {number} v
   */
  set 感情淡薄(v) {
    era.set(`talent:${this.cid}:22`, v);
  }

  /**
   * 悲观的（talent:cid:26 ↔ TALENT:26）
   * 源: yml/Talent.yml id 26
   * @returns {number}
   */
  get 悲观的() {
    return era.get(`talent:${this.cid}:26`) || 0;
  }
  /**
   * @param {number} v
   */
  set 悲观的(v) {
    era.set(`talent:${this.cid}:26`, v);
  }

  /**
   * 戒备森严（talent:cid:27 ↔ TALENT:27）
   * 源: yml/Talent.yml id 27
   * @returns {number}
   */
  get 戒备森严() {
    return era.get(`talent:${this.cid}:27`) || 0;
  }
  /**
   * @param {number} v
   */
  set 戒备森严(v) {
    era.set(`talent:${this.cid}:27`, v);
  }

  /**
   * 看重贞操（talent:cid:30 ↔ TALENT:30）
   * 源: yml/Talent.yml id 30
   * @returns {number}
   */
  get 看重贞操() {
    return era.get(`talent:${this.cid}:30`) || 0;
  }
  /**
   * @param {number} v
   */
  set 看重贞操(v) {
    era.set(`talent:${this.cid}:30`, v);
  }

  /**
   * 压抑（talent:cid:32 ↔ TALENT:32）
   * 源: yml/Talent.yml id 32
   * @returns {number}
   */
  get 压抑() {
    return era.get(`talent:${this.cid}:32`) || 0;
  }
  /**
   * @param {number} v
   */
  set 压抑(v) {
    era.set(`talent:${this.cid}:32`, v);
  }

  /**
   * 抵抗（talent:cid:34 ↔ TALENT:34）
   * 源: yml/Talent.yml id 34
   * @returns {number}
   */
  get 抵抗() {
    return era.get(`talent:${this.cid}:34`) || 0;
  }
  /**
   * @param {number} v
   */
  set 抵抗(v) {
    era.set(`talent:${this.cid}:34`, v);
  }

  /**
   * 药物上瘾（talent:cid:46 ↔ TALENT:46）
   * 源: yml/Talent.yml id 46
   * @returns {number}
   */
  get 药物上瘾() {
    return era.get(`talent:${this.cid}:46`) || 0;
  }
  /**
   * @param {number} v
   */
  set 药物上瘾(v) {
    era.set(`talent:${this.cid}:46`, v);
  }

  /**
   * 喜欢精液（talent:cid:47 ↔ TALENT:47）
   * 源: yml/Talent.yml id 47
   * @returns {number}
   */
  get 喜欢精液() {
    return era.get(`talent:${this.cid}:47`) || 0;
  }
  /**
   * @param {number} v
   */
  set 喜欢精液(v) {
    era.set(`talent:${this.cid}:47`, v);
  }

  /**
   * 擅用舌头（talent:cid:52 ↔ TALENT:52）
   * 源: yml/Talent.yml id 52
   * @returns {number}
   */
  get 擅用舌头() {
    return era.get(`talent:${this.cid}:52`) || 0;
  }
  /**
   * @param {number} v
   */
  set 擅用舌头(v) {
    era.set(`talent:${this.cid}:52`, v);
  }

  /**
   * 漏尿癖（talent:cid:57 ↔ TALENT:57）
   * 源: yml/Talent.yml id 57
   * @returns {number}
   */
  get 漏尿癖() {
    return era.get(`talent:${this.cid}:57`) || 0;
  }
  /**
   * @param {number} v
   */
  set 漏尿癖(v) {
    era.set(`talent:${this.cid}:57`, v);
  }

  /**
   * 否定快感（talent:cid:71 ↔ TALENT:71）
   * 源: yml/Talent.yml id 71
   * @returns {number}
   */
  get 否定快感() {
    return era.get(`talent:${this.cid}:71`) || 0;
  }
  /**
   * @param {number} v
   */
  set 否定快感(v) {
    era.set(`talent:${this.cid}:71`, v);
  }

  /**
   * 性爱狂（talent:cid:75 ↔ TALENT:75）
   * 源: yml/Talent.yml id 75
   * @returns {number}
   */
  get 性爱狂() {
    return era.get(`talent:${this.cid}:75`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性爱狂(v) {
    era.set(`talent:${this.cid}:75`, v);
  }

  /**
   * 弄乳狂（talent:cid:78 ↔ TALENT:78）
   * 源: yml/Talent.yml id 78
   * @returns {number}
   */
  get 弄乳狂() {
    return era.get(`talent:${this.cid}:78`) || 0;
  }
  /**
   * @param {number} v
   */
  set 弄乳狂(v) {
    era.set(`talent:${this.cid}:78`, v);
  }

  /**
   * 男人婆（talent:cid:79 ↔ TALENT:79）
   * 源: yml/Talent.yml id 79
   * @returns {number}
   */
  get 男人婆() {
    return era.get(`talent:${this.cid}:79`) || 0;
  }
  /**
   * @param {number} v
   */
  set 男人婆(v) {
    era.set(`talent:${this.cid}:79`, v);
  }

  /**
   * 讨厌男人（talent:cid:82 ↔ TALENT:82）
   * 源: yml/Talent.yml id 82
   * @returns {number}
   */
  get 讨厌男人() {
    return era.get(`talent:${this.cid}:82`) || 0;
  }
  /**
   * @param {number} v
   */
  set 讨厌男人(v) {
    era.set(`talent:${this.cid}:82`, v);
  }

  /**
   * 施虐狂（talent:cid:83 ↔ TALENT:83）
   * 源: yml/Talent.yml id 83
   * @returns {number}
   */
  get 施虐狂() {
    return era.get(`talent:${this.cid}:83`) || 0;
  }
  /**
   * @param {number} v
   */
  set 施虐狂(v) {
    era.set(`talent:${this.cid}:83`, v);
  }

  /**
   * 嫉妒（talent:cid:84 ↔ TALENT:84）
   * 源: yml/Talent.yml id 84
   * @returns {number}
   */
  get 嫉妒() {
    return era.get(`talent:${this.cid}:84`) || 0;
  }
  /**
   * @param {number} v
   */
  set 嫉妒(v) {
    era.set(`talent:${this.cid}:84`, v);
  }

  /**
   * 盲从（talent:cid:86 ↔ TALENT:86）
   * 源: yml/Talent.yml id 86
   * @returns {number}
   */
  get 盲从() {
    return era.get(`talent:${this.cid}:86`) || 0;
  }
  /**
   * @param {number} v
   */
  set 盲从(v) {
    era.set(`talent:${this.cid}:86`, v);
  }

  /**
   * 受虐狂（talent:cid:88 ↔ TALENT:88）
   * 源: yml/Talent.yml id 88
   * @returns {number}
   */
  get 受虐狂() {
    return era.get(`talent:${this.cid}:88`) || 0;
  }
  /**
   * @param {number} v
   */
  set 受虐狂(v) {
    era.set(`talent:${this.cid}:88`, v);
  }

  /**
   * 露出狂（talent:cid:89 ↔ TALENT:89）
   * 源: yml/Talent.yml id 89
   * @returns {number}
   */
  get 露出狂() {
    return era.get(`talent:${this.cid}:89`) || 0;
  }
  /**
   * @param {number} v
   */
  set 露出狂(v) {
    era.set(`talent:${this.cid}:89`, v);
  }

  /**
   * 威压感（talent:cid:93 ↔ TALENT:93）
   * 源: yml/Talent.yml id 93
   * @returns {number}
   */
  get 威压感() {
    return era.get(`talent:${this.cid}:93`) || 0;
  }
  /**
   * @param {number} v
   */
  set 威压感(v) {
    era.set(`talent:${this.cid}:93`, v);
  }

  /**
   * 疯狂（talent:cid:123 ↔ TALENT:123）
   * 源: yml/Talent.yml id 123
   * @returns {number}
   */
  get 疯狂() {
    return era.get(`talent:${this.cid}:123`) || 0;
  }
  /**
   * @param {number} v
   */
  set 疯狂(v) {
    era.set(`talent:${this.cid}:123`, v);
  }

  /**
   * 幼儿退行（talent:cid:131 ↔ TALENT:131）
   * 源: yml/Talent.yml id 131
   * @returns {number}
   */
  get 幼儿退行() {
    return era.get(`talent:${this.cid}:131`) || 0;
  }
  /**
   * @param {number} v
   */
  set 幼儿退行(v) {
    era.set(`talent:${this.cid}:131`, v);
  }

  /**
   * 牝犬（talent:cid:136 ↔ TALENT:136）
   * 源: yml/Talent.yml id 136
   * @returns {number}
   */
  get 牝犬() {
    return era.get(`talent:${this.cid}:136`) || 0;
  }
  /**
   * @param {number} v
   */
  set 牝犬(v) {
    era.set(`talent:${this.cid}:136`, v);
  }

  /**
   * 从不自慰（talent:cid:150 ↔ TALENT:150）
   * 源: yml/Talent.yml id 150
   * @returns {number}
   */
  get 从不自慰() {
    return era.get(`talent:${this.cid}:150`) || 0;
  }
  /**
   * @param {number} v
   */
  set 从不自慰(v) {
    era.set(`talent:${this.cid}:150`, v);
  }

  /**
   * 绝不侍奉（talent:cid:151 ↔ TALENT:151）
   * 源: yml/Talent.yml id 151
   * @returns {number}
   */
  get 绝不侍奉() {
    return era.get(`talent:${this.cid}:151`) || 0;
  }
  /**
   * @param {number} v
   */
  set 绝不侍奉(v) {
    era.set(`talent:${this.cid}:151`, v);
  }

  /**
   * 同族不育（talent:cid:158 ↔ TALENT:158）
   * 源: yml/Talent.yml id 158
   * @returns {number}
   */
  get 同族不育() {
    return era.get(`talent:${this.cid}:158`) || 0;
  }
  /**
   * @param {number} v
   */
  set 同族不育(v) {
    era.set(`talent:${this.cid}:158`, v);
  }

  /**
   * 斗姬（talent:cid:188 ↔ TALENT:188）
   * 源: yml/Talent.yml id 188
   * @returns {number}
   */
  get 斗姬() {
    return era.get(`talent:${this.cid}:188`) || 0;
  }
  /**
   * @param {number} v
   */
  set 斗姬(v) {
    era.set(`talent:${this.cid}:188`, v);
  }

  /**
   * 主从逆转（talent:cid:293 ↔ TALENT:293）
   * 源: yml/Talent.yml id 293
   * @returns {number}
   */
  get 主从逆转() {
    return era.get(`talent:${this.cid}:293`) || 0;
  }
  /**
   * @param {number} v
   */
  set 主从逆转(v) {
    era.set(`talent:${this.cid}:293`, v);
  }

  /**
   * 异种恋慕（talent:cid:294 ↔ TALENT:294）
   * 源: yml/Talent.yml id 294
   * @returns {number}
   */
  get 异种恋慕() {
    return era.get(`talent:${this.cid}:294`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异种恋慕(v) {
    era.set(`talent:${this.cid}:294`, v);
  }

  /**
   * 混乱（talent:cid:482 ↔ TALENT:482）
   * 源: yml/Talent.yml id 482
   * @returns {number}
   */
  get 混乱() {
    return era.get(`talent:${this.cid}:482`) || 0;
  }
  /**
   * @param {number} v
   */
  set 混乱(v) {
    era.set(`talent:${this.cid}:482`, v);
  }

  // —— exp ——
  /**
   * 勋章经验（exp:cid:81 ↔ EXP:81）
   * 源: yml/Exp.yml id 81
   * @returns {number}
   */
  get 勋章经验() {
    return era.get(`exp:${this.cid}:81`) || 0;
  }
  /**
   * @param {number} v
   */
  set 勋章经验(v) {
    era.set(`exp:${this.cid}:81`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = EventFacade;
