/**
 * @file 角色变量的train域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).train.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class TrainFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— cflag ——
  /**
   * 灌肠经验（cflag:cid:4 ↔ CFLAG:4）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:4 浣腸経験（1=経験済み、2=ビデオ撮影済み）
   * @returns {number}
   */
  get 灌肠经验() {
    return era.get(`cflag:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 灌肠经验(v) {
    era.set(`cflag:${this.cid}:4`, v);
  }

  /**
   * 自动调教（cflag:cid:666 ↔ CFLAG:666）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:666 自動調教が行われたかフラグ
   * @returns {number}
   */
  get 自动调教() {
    return era.get(`cflag:${this.cid}:666`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自动调教(v) {
    era.set(`cflag:${this.cid}:666`, v);
  }

  /**
   * 初体验对象（cflag:cid:15 ↔ CFLAG:15）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行275 CFLAG:15 初体験の相手のキャラ番号＋１（101 壺ワーム、102 触手生物、103 野良犬、104 モンスター、105 狂王）
   * @returns {number}
   */
  get 初体验对象() {
    return era.get(`cflag:${this.cid}:15`) || 0;
  }
  /**
   * @param {number} v
   */
  set 初体验对象(v) {
    era.set(`cflag:${this.cid}:15`, v);
  }

  /**
   * 初吻对象（cflag:cid:16 ↔ CFLAG:16）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行276 CFLAG:16 ファーストキスの相手のキャラ番号＋１（未経験は -1 初期化）
   * @returns {number}
   */
  get 初吻对象() {
    return era.get(`cflag:${this.cid}:16`) || 0;
  }
  /**
   * @param {number} v
   */
  set 初吻对象(v) {
    era.set(`cflag:${this.cid}:16`, v);
  }

  /**
   * 上衣类型（cflag:cid:41 ↔ CFLAG:41）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行295 CFLAG:41 上着のタイプ（詳細は FUNC_CLOTH.ERB @PRINT_CLOTHTYPE）
   * @returns {number}
   */
  get 上衣类型() {
    return era.get(`cflag:${this.cid}:41`) || 0;
  }
  /**
   * @param {number} v
   */
  set 上衣类型(v) {
    era.set(`cflag:${this.cid}:41`, v);
  }

  /**
   * 上衣上状态（cflag:cid:45 ↔ CFLAG:45）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行299 CFLAG:45 上着上の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）
   * @returns {number}
   */
  get 上衣上状态() {
    return era.get(`cflag:${this.cid}:45`) || 0;
  }
  /**
   * @param {number} v
   */
  set 上衣上状态(v) {
    era.set(`cflag:${this.cid}:45`, v);
  }

  /**
   * 上衣下状态（cflag:cid:46 ↔ CFLAG:46）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行300 CFLAG:46 上着下の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）
   * @returns {number}
   */
  get 上衣下状态() {
    return era.get(`cflag:${this.cid}:46`) || 0;
  }
  /**
   * @param {number} v
   */
  set 上衣下状态(v) {
    era.set(`cflag:${this.cid}:46`, v);
  }

  // —— cstr ——
  /**
   * 初体验对象名（cstr:cid:3 ↔ CSTR:3）
   * 源: target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB 行2445 CSTR:(ARG:1)行3 = %SAVESTR:(ARG:0)%
   * @returns {string}
   */
  get 初体验对象名() {
    return era.get(`cstr:${this.cid}:3`) || '';
  }
  /**
   * @param {string} v
   */
  set 初体验对象名(v) {
    era.set(`cstr:${this.cid}:3`, v);
  }

  // —— base ——
  /**
   * 射精槽（base:cid:2 ↔ BASE:2）
   * 源: yml/Base.yml id 2
   * @returns {number}
   */
  get 射精槽() {
    return era.get(`base:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 射精槽(v) {
    era.set(`base:${this.cid}:2`, v);
  }

  /**
   * 母乳槽（base:cid:3 ↔ BASE:3）
   * 源: yml/Base.yml id 3
   * @returns {number}
   */
  get 母乳槽() {
    return era.get(`base:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 母乳槽(v) {
    era.set(`base:${this.cid}:3`, v);
  }

  /**
   * 触手射精槽（base:cid:4 ↔ BASE:4）
   * 源: yml/Base.yml id 4
   * @returns {number}
   */
  get 触手射精槽() {
    return era.get(`base:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 触手射精槽(v) {
    era.set(`base:${this.cid}:4`, v);
  }

  // —— talent ——
  /**
   * 童贞（talent:cid:1 ↔ TALENT:1）
   * 源: yml/Talent.yml id 1
   * @returns {number}
   */
  get 童贞() {
    return era.get(`talent:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 童贞(v) {
    era.set(`talent:${this.cid}:1`, v);
  }

  /**
   * 未熟（talent:cid:135 ↔ TALENT:135）
   * 源: yml/Talent.yml id 135
   * @returns {number}
   */
  get 未熟() {
    return era.get(`talent:${this.cid}:135`) || 0;
  }
  /**
   * @param {number} v
   */
  set 未熟(v) {
    era.set(`talent:${this.cid}:135`, v);
  }

  // —— source ——
  /**
   * 阴核快感（source:cid:0 ↔ SOURCE:0）
   * 源: yml/Source.yml id 0
   * @returns {number}
   */
  get 阴核快感() {
    return era.get(`source:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴核快感(v) {
    era.set(`source:${this.cid}:0`, v);
  }

  /**
   * 私处快感（source:cid:1 ↔ SOURCE:1）
   * 源: yml/Source.yml id 1
   * @returns {number}
   */
  get 私处快感() {
    return era.get(`source:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处快感(v) {
    era.set(`source:${this.cid}:1`, v);
  }

  /**
   * 肛门快感（source:cid:2 ↔ SOURCE:2）
   * 源: yml/Source.yml id 2
   * @returns {number}
   */
  get 肛门快感() {
    return era.get(`source:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门快感(v) {
    era.set(`source:${this.cid}:2`, v);
  }

  /**
   * 情爱（source:cid:3 ↔ SOURCE:3）
   * 源: yml/Source.yml id 3
   * @returns {number}
   */
  get 情爱() {
    return era.get(`source:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 情爱(v) {
    era.set(`source:${this.cid}:3`, v);
  }

  /**
   * 性行为（source:cid:4 ↔ SOURCE:4）
   * 源: yml/Source.yml id 4
   * @returns {number}
   */
  get 性行为() {
    return era.get(`source:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性行为(v) {
    era.set(`source:${this.cid}:4`, v);
  }

  /**
   * 达成感（source:cid:5 ↔ SOURCE:5）
   * 源: yml/Source.yml id 5
   * @returns {number}
   */
  get 达成感() {
    return era.get(`source:${this.cid}:5`) || 0;
  }
  /**
   * @param {number} v
   */
  set 达成感(v) {
    era.set(`source:${this.cid}:5`, v);
  }

  /**
   * 疼痛（source:cid:6 ↔ SOURCE:6）
   * 源: yml/Source.yml id 6
   * @returns {number}
   */
  get 疼痛() {
    return era.get(`source:${this.cid}:6`) || 0;
  }
  /**
   * @param {number} v
   */
  set 疼痛(v) {
    era.set(`source:${this.cid}:6`, v);
  }

  /**
   * 成瘾追加（source:cid:7 ↔ SOURCE:7）
   * 源: yml/Source.yml id 7
   * @returns {number}
   */
  get 成瘾追加() {
    return era.get(`source:${this.cid}:7`) || 0;
  }
  /**
   * @param {number} v
   */
  set 成瘾追加(v) {
    era.set(`source:${this.cid}:7`, v);
  }

  /**
   * 不洁（source:cid:8 ↔ SOURCE:8）
   * 源: yml/Source.yml id 8
   * @returns {number}
   */
  get 不洁() {
    return era.get(`source:${this.cid}:8`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不洁(v) {
    era.set(`source:${this.cid}:8`, v);
  }

  /**
   * 液体追加（source:cid:10 ↔ SOURCE:10）
   * 源: yml/Source.yml id 10
   * @returns {number}
   */
  get 液体追加() {
    return era.get(`source:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 液体追加(v) {
    era.set(`source:${this.cid}:10`, v);
  }

  /**
   * 欲情追加（source:cid:11 ↔ SOURCE:11）
   * 源: yml/Source.yml id 11
   * @returns {number}
   */
  get 欲情追加() {
    return era.get(`source:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 欲情追加(v) {
    era.set(`source:${this.cid}:11`, v);
  }

  /**
   * 露出（source:cid:12 ↔ SOURCE:12）
   * 源: yml/Source.yml id 12
   * @returns {number}
   */
  get 露出() {
    return era.get(`source:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 露出(v) {
    era.set(`source:${this.cid}:12`, v);
  }

  /**
   * 屈从（source:cid:13 ↔ SOURCE:13）
   * 源: yml/Source.yml id 13
   * @returns {number}
   */
  get 屈从() {
    return era.get(`source:${this.cid}:13`) || 0;
  }
  /**
   * @param {number} v
   */
  set 屈从(v) {
    era.set(`source:${this.cid}:13`, v);
  }

  /**
   * 逃离（source:cid:14 ↔ SOURCE:14）
   * 源: yml/Source.yml id 14
   * @returns {number}
   */
  get 逃离() {
    return era.get(`source:${this.cid}:14`) || 0;
  }
  /**
   * @param {number} v
   */
  set 逃离(v) {
    era.set(`source:${this.cid}:14`, v);
  }

  /**
   * 反感追加（source:cid:15 ↔ SOURCE:15）
   * 源: yml/Source.yml id 15
   * @returns {number}
   */
  get 反感追加() {
    return era.get(`source:${this.cid}:15`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反感追加(v) {
    era.set(`source:${this.cid}:15`, v);
  }

  /**
   * 恭顺追加（source:cid:16 ↔ SOURCE:16）
   * 源: yml/Source.yml id 16
   * @returns {number}
   */
  get 恭顺追加() {
    return era.get(`source:${this.cid}:16`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恭顺追加(v) {
    era.set(`source:${this.cid}:16`, v);
  }

  /**
   * 乳房快感（source:cid:17 ↔ SOURCE:17）
   * 源: yml/Source.yml id 17
   * @returns {number}
   */
  get 乳房快感() {
    return era.get(`source:${this.cid}:17`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房快感(v) {
    era.set(`source:${this.cid}:17`, v);
  }

  /**
   * 局部快感（source:cid:18 ↔ SOURCE:18）
   * 源: yml/Source.yml id 18
   * @returns {number}
   */
  get 局部快感() {
    return era.get(`source:${this.cid}:18`) || 0;
  }
  /**
   * @param {number} v
   */
  set 局部快感(v) {
    era.set(`source:${this.cid}:18`, v);
  }

  // —— abl ——
  /**
   * 局部感觉（abl:cid:4 ↔ ABL:4）
   * 源: yml/Abl.yml id 4
   * @returns {number}
   */
  get 局部感觉() {
    return era.get(`abl:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 局部感觉(v) {
    era.set(`abl:${this.cid}:4`, v);
  }

  /**
   * 侍奉技术（abl:cid:13 ↔ ABL:13）
   * 源: yml/Abl.yml id 13
   * @returns {number}
   */
  get 侍奉技术() {
    return era.get(`abl:${this.cid}:13`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侍奉技术(v) {
    era.set(`abl:${this.cid}:13`, v);
  }

  /**
   * 性交技术（abl:cid:14 ↔ ABL:14）
   * 源: yml/Abl.yml id 14
   * @returns {number}
   */
  get 性交技术() {
    return era.get(`abl:${this.cid}:14`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性交技术(v) {
    era.set(`abl:${this.cid}:14`, v);
  }

  /**
   * 话术（abl:cid:15 ↔ ABL:15）
   * 源: yml/Abl.yml id 15
   * @returns {number}
   */
  get 话术() {
    return era.get(`abl:${this.cid}:15`) || 0;
  }
  /**
   * @param {number} v
   */
  set 话术(v) {
    era.set(`abl:${this.cid}:15`, v);
  }

  /**
   * 抖S气质（abl:cid:20 ↔ ABL:20）
   * 源: yml/Abl.yml id 20
   * @returns {number}
   */
  get 抖S气质() {
    return era.get(`abl:${this.cid}:20`) || 0;
  }
  /**
   * @param {number} v
   */
  set 抖S气质(v) {
    era.set(`abl:${this.cid}:20`, v);
  }

  /**
   * 性交中毒（abl:cid:30 ↔ ABL:30）
   * 源: yml/Abl.yml id 30
   * @returns {number}
   */
  get 性交中毒() {
    return era.get(`abl:${this.cid}:30`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性交中毒(v) {
    era.set(`abl:${this.cid}:30`, v);
  }

  /**
   * 自慰中毒（abl:cid:31 ↔ ABL:31）
   * 源: yml/Abl.yml id 31
   * @returns {number}
   */
  get 自慰中毒() {
    return era.get(`abl:${this.cid}:31`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自慰中毒(v) {
    era.set(`abl:${this.cid}:31`, v);
  }

  /**
   * 精液中毒（abl:cid:32 ↔ ABL:32）
   * 源: yml/Abl.yml id 32
   * @returns {number}
   */
  get 精液中毒() {
    return era.get(`abl:${this.cid}:32`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精液中毒(v) {
    era.set(`abl:${this.cid}:32`, v);
  }

  /**
   * 百合中毒（abl:cid:33 ↔ ABL:33）
   * 源: yml/Abl.yml id 33
   * @returns {number}
   */
  get 百合中毒() {
    return era.get(`abl:${this.cid}:33`) || 0;
  }
  /**
   * @param {number} v
   */
  set 百合中毒(v) {
    era.set(`abl:${this.cid}:33`, v);
  }

  /**
   * 卖淫中毒（abl:cid:37 ↔ ABL:37）
   * 源: yml/Abl.yml id 37
   * @returns {number}
   */
  get 卖淫中毒() {
    return era.get(`abl:${this.cid}:37`) || 0;
  }
  /**
   * @param {number} v
   */
  set 卖淫中毒(v) {
    era.set(`abl:${this.cid}:37`, v);
  }

  /**
   * 兽奸中毒（abl:cid:39 ↔ ABL:39）
   * 源: yml/Abl.yml id 39
   * @returns {number}
   */
  get 兽奸中毒() {
    return era.get(`abl:${this.cid}:39`) || 0;
  }
  /**
   * @param {number} v
   */
  set 兽奸中毒(v) {
    era.set(`abl:${this.cid}:39`, v);
  }

  /**
   * 局部中毒（abl:cid:40 ↔ ABL:40）
   * 源: yml/Abl.yml id 40
   * @returns {number}
   */
  get 局部中毒() {
    return era.get(`abl:${this.cid}:40`) || 0;
  }
  /**
   * @param {number} v
   */
  set 局部中毒(v) {
    era.set(`abl:${this.cid}:40`, v);
  }

  // —— palam ——
  /**
   * 润滑（palam:cid:3 ↔ PALAM:3）
   * 源: yml/Palam.yml id 3
   * @returns {number}
   */
  get 润滑() {
    return era.get(`palam:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 润滑(v) {
    era.set(`palam:${this.cid}:3`, v);
  }

  /**
   * 欲情（palam:cid:5 ↔ PALAM:5）
   * 源: yml/Palam.yml id 5
   * @returns {number}
   */
  get 欲情() {
    return era.get(`palam:${this.cid}:5`) || 0;
  }
  /**
   * @param {number} v
   */
  set 欲情(v) {
    era.set(`palam:${this.cid}:5`, v);
  }

  /**
   * 不快（palam:cid:12 ↔ PALAM:12）
   * 源: yml/Palam.yml id 12
   * @returns {number}
   */
  get 不快() {
    return era.get(`palam:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不快(v) {
    era.set(`palam:${this.cid}:12`, v);
  }

  // —— mark ——
  /**
   * 异界综合征（mark:cid:10 ↔ MARK:10）
   * 源: yml/Mark.yml id 10
   * @returns {number}
   */
  get 异界综合征() {
    return era.get(`mark:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异界综合征(v) {
    era.set(`mark:${this.cid}:10`, v);
  }

  // —— exp ——
  /**
   * 射精经验（exp:cid:3 ↔ EXP:3）
   * 源: yml/Exp.yml id 3
   * @returns {number}
   */
  get 射精经验() {
    return era.get(`exp:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 射精经验(v) {
    era.set(`exp:${this.cid}:3`, v);
  }

  /**
   * 爱情经验（exp:cid:23 ↔ EXP:23）
   * 源: yml/Exp.yml id 23
   * @returns {number}
   */
  get 爱情经验() {
    return era.get(`exp:${this.cid}:23`) || 0;
  }
  /**
   * @param {number} v
   */
  set 爱情经验(v) {
    era.set(`exp:${this.cid}:23`, v);
  }

  /**
   * 乳房经验（exp:cid:35 ↔ EXP:35）
   * 源: yml/Exp.yml id 35
   * @returns {number}
   */
  get 乳房经验() {
    return era.get(`exp:${this.cid}:35`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房经验(v) {
    era.set(`exp:${this.cid}:35`, v);
  }

  /**
   * 百合经验（exp:cid:40 ↔ EXP:40）
   * 源: yml/Exp.yml id 40
   * @returns {number}
   */
  get 百合经验() {
    return era.get(`exp:${this.cid}:40`) || 0;
  }
  /**
   * @param {number} v
   */
  set 百合经验(v) {
    era.set(`exp:${this.cid}:40`, v);
  }

  /**
   * 断背经验（exp:cid:41 ↔ EXP:41）
   * 源: yml/Exp.yml id 41
   * @returns {number}
   */
  get 断背经验() {
    return era.get(`exp:${this.cid}:41`) || 0;
  }
  /**
   * @param {number} v
   */
  set 断背经验(v) {
    era.set(`exp:${this.cid}:41`, v);
  }

  /**
   * 紧缚经验（exp:cid:51 ↔ EXP:51）
   * 源: yml/Exp.yml id 51
   * @returns {number}
   */
  get 紧缚经验() {
    return era.get(`exp:${this.cid}:51`) || 0;
  }
  /**
   * @param {number} v
   */
  set 紧缚经验(v) {
    era.set(`exp:${this.cid}:51`, v);
  }

  /**
   * 喷奶经验（exp:cid:54 ↔ EXP:54）
   * 源: yml/Exp.yml id 54
   * @returns {number}
   */
  get 喷奶经验() {
    return era.get(`exp:${this.cid}:54`) || 0;
  }
  /**
   * @param {number} v
   */
  set 喷奶经验(v) {
    era.set(`exp:${this.cid}:54`, v);
  }

  /**
   * 调教失神经验（exp:cid:65 ↔ EXP:65）
   * 源: yml/Exp.yml id 65
   * @returns {number}
   */
  get 调教失神经验() {
    return era.get(`exp:${this.cid}:65`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调教失神经验(v) {
    era.set(`exp:${this.cid}:65`, v);
  }

  /**
   * 拍摄经验（exp:cid:70 ↔ EXP:70）
   * 源: yml/Exp.yml id 70
   * @returns {number}
   */
  get 拍摄经验() {
    return era.get(`exp:${this.cid}:70`) || 0;
  }
  /**
   * @param {number} v
   */
  set 拍摄经验(v) {
    era.set(`exp:${this.cid}:70`, v);
  }

  /**
   * 歌唱经验（exp:cid:71 ↔ EXP:71）
   * 源: yml/Exp.yml id 71
   * @returns {number}
   */
  get 歌唱经验() {
    return era.get(`exp:${this.cid}:71`) || 0;
  }
  /**
   * @param {number} v
   */
  set 歌唱经验(v) {
    era.set(`exp:${this.cid}:71`, v);
  }

  /**
   * 舞蹈经验（exp:cid:72 ↔ EXP:72）
   * 源: yml/Exp.yml id 72
   * @returns {number}
   */
  get 舞蹈经验() {
    return era.get(`exp:${this.cid}:72`) || 0;
  }
  /**
   * @param {number} v
   */
  set 舞蹈经验(v) {
    era.set(`exp:${this.cid}:72`, v);
  }

  /**
   * 斗技胜利经验（exp:cid:76 ↔ EXP:76）
   * 源: yml/Exp.yml id 76
   * @returns {number}
   */
  get 斗技胜利经验() {
    return era.get(`exp:${this.cid}:76`) || 0;
  }
  /**
   * @param {number} v
   */
  set 斗技胜利经验(v) {
    era.set(`exp:${this.cid}:76`, v);
  }

  /**
   * 异界经验（exp:cid:99 ↔ EXP:99）
   * 源: yml/Exp.yml id 99
   * @returns {number}
   */
  get 异界经验() {
    return era.get(`exp:${this.cid}:99`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异界经验(v) {
    era.set(`exp:${this.cid}:99`, v);
  }

  // —— delta ——
  /**
   * 阴核增量（delta:cid:0 ↔ UP:0）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:0（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 阴核增量() {
    return era.get(`delta:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴核增量(v) {
    era.set(`delta:${this.cid}:0`, v);
  }

  /**
   * 私处增量（delta:cid:1 ↔ UP:1）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:1（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 私处增量() {
    return era.get(`delta:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处增量(v) {
    era.set(`delta:${this.cid}:1`, v);
  }

  /**
   * 肛门增量（delta:cid:2 ↔ UP:2）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:2（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 肛门增量() {
    return era.get(`delta:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门增量(v) {
    era.set(`delta:${this.cid}:2`, v);
  }

  /**
   * 润滑增量（delta:cid:3 ↔ UP:3）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:3（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 润滑增量() {
    return era.get(`delta:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 润滑增量(v) {
    era.set(`delta:${this.cid}:3`, v);
  }

  /**
   * 恭顺增量（delta:cid:4 ↔ UP:4）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:4（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 恭顺增量() {
    return era.get(`delta:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恭顺增量(v) {
    era.set(`delta:${this.cid}:4`, v);
  }

  /**
   * 欲情增量（delta:cid:5 ↔ UP:5）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:5（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 欲情增量() {
    return era.get(`delta:${this.cid}:5`) || 0;
  }
  /**
   * @param {number} v
   */
  set 欲情增量(v) {
    era.set(`delta:${this.cid}:5`, v);
  }

  /**
   * 屈服增量（delta:cid:6 ↔ UP:6）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:6（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 屈服增量() {
    return era.get(`delta:${this.cid}:6`) || 0;
  }
  /**
   * @param {number} v
   */
  set 屈服增量(v) {
    era.set(`delta:${this.cid}:6`, v);
  }

  /**
   * 习得增量（delta:cid:7 ↔ UP:7）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:7（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 习得增量() {
    return era.get(`delta:${this.cid}:7`) || 0;
  }
  /**
   * @param {number} v
   */
  set 习得增量(v) {
    era.set(`delta:${this.cid}:7`, v);
  }

  /**
   * 耻情增量（delta:cid:8 ↔ UP:8）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:8（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 耻情增量() {
    return era.get(`delta:${this.cid}:8`) || 0;
  }
  /**
   * @param {number} v
   */
  set 耻情增量(v) {
    era.set(`delta:${this.cid}:8`, v);
  }

  /**
   * 苦痛增量（delta:cid:9 ↔ UP:9）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:9（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 苦痛增量() {
    return era.get(`delta:${this.cid}:9`) || 0;
  }
  /**
   * @param {number} v
   */
  set 苦痛增量(v) {
    era.set(`delta:${this.cid}:9`, v);
  }

  /**
   * 恐怖增量（delta:cid:10 ↔ UP:10）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:10（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 恐怖增量() {
    return era.get(`delta:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恐怖增量(v) {
    era.set(`delta:${this.cid}:10`, v);
  }

  /**
   * 反感增量（delta:cid:11 ↔ UP:11）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:11（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 反感增量() {
    return era.get(`delta:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反感增量(v) {
    era.set(`delta:${this.cid}:11`, v);
  }

  /**
   * 不快增量（delta:cid:12 ↔ UP:12）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:12（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 不快增量() {
    return era.get(`delta:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不快增量(v) {
    era.set(`delta:${this.cid}:12`, v);
  }

  /**
   * 抑郁增量（delta:cid:13 ↔ UP:13）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:13（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 抑郁增量() {
    return era.get(`delta:${this.cid}:13`) || 0;
  }
  /**
   * @param {number} v
   */
  set 抑郁增量(v) {
    era.set(`delta:${this.cid}:13`, v);
  }

  /**
   * 乳房增量（delta:cid:14 ↔ UP:14）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:14（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 乳房增量() {
    return era.get(`delta:${this.cid}:14`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房增量(v) {
    era.set(`delta:${this.cid}:14`, v);
  }

  /**
   * 局部增量（delta:cid:15 ↔ UP:15）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:15（UP/DOWN→delta，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 局部增量() {
    return era.get(`delta:${this.cid}:15`) || 0;
  }
  /**
   * @param {number} v
   */
  set 局部增量(v) {
    era.set(`delta:${this.cid}:15`, v);
  }

  // —— deltabase ——
  /**
   * 体力损耗（deltabase:cid:0 ↔ LOSEBASE:0）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行411 LOSEBASE:0（LOSEBASE→deltabase 存负值，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 体力损耗() {
    return era.get(`deltabase:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 体力损耗(v) {
    era.set(`deltabase:${this.cid}:0`, v);
  }

  /**
   * 气力损耗（deltabase:cid:1 ↔ LOSEBASE:1）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行411 LOSEBASE:1（LOSEBASE→deltabase 存负值，CONTEXT.md 变量族）
   * @returns {number}
   */
  get 气力损耗() {
    return era.get(`deltabase:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 气力损耗(v) {
    era.set(`deltabase:${this.cid}:1`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = TrainFacade;
