/**
 * @file 角色变量的chara域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).chara.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class CharaFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— cflag ——
  /**
   * 好感度（cflag:cid:2）
   * CFLAG:2 主人による調教経験(好感度)
   * @returns {number}
   */
  get 好感度() {
    return era.get(`cflag:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 好感度(v) {
    era.set(`cflag:${this.cid}:2`, v);
  }

  /**
   * 等级（cflag:cid:9）
   * CFLAG:9 レベル
   * @returns {number}
   */
  get 等级() {
    return era.get(`cflag:${this.cid}:9`) || 0;
  }
  /**
   * @param {number} v
   */
  set 等级(v) {
    era.set(`cflag:${this.cid}:9`, v);
  }

  /**
   * 基础攻击（cflag:cid:13）
   * CFLAG:13 基礎攻撃力
   * @returns {number}
   */
  get 基础攻击() {
    return era.get(`cflag:${this.cid}:13`) || 0;
  }
  /**
   * @param {number} v
   */
  set 基础攻击(v) {
    era.set(`cflag:${this.cid}:13`, v);
  }

  /**
   * 基础防御（cflag:cid:14）
   * CFLAG:14 基礎防御力
   * @returns {number}
   */
  get 基础防御() {
    return era.get(`cflag:${this.cid}:14`) || 0;
  }
  /**
   * @param {number} v
   */
  set 基础防御(v) {
    era.set(`cflag:${this.cid}:14`, v);
  }

  /**
   * 年龄（cflag:cid:451）
   * CFLAG:451 年齢（人間換算，human_age_generate の結果）
   * @returns {number}
   */
  get 年龄() {
    return era.get(`cflag:${this.cid}:451`) || 0;
  }
  /**
   * @param {number} v
   */
  set 年龄(v) {
    era.set(`cflag:${this.cid}:451`, v);
  }

  /**
   * 种族年龄（cflag:cid:452）
   * CFLAG:452 種族年齢（月替わりの年齢加算はこちら）
   * @returns {number}
   */
  get 种族年龄() {
    return era.get(`cflag:${this.cid}:452`) || 0;
  }
  /**
   * @param {number} v
   */
  set 种族年龄(v) {
    era.set(`cflag:${this.cid}:452`, v);
  }

  /**
   * 武装（cflag:cid:550）
   * CFLAG:550～559 装備品枠——武装（存储编号）
   * @returns {number}
   */
  get 武装() {
    return era.get(`cflag:${this.cid}:550`) || 0;
  }
  /**
   * @param {number} v
   */
  set 武装(v) {
    era.set(`cflag:${this.cid}:550`, v);
  }

  /**
   * 随机名编号（cflag:cid:6）
   * CFLAG:A:6 = RAND:80（ランダム名前決定）
   * @returns {number}
   */
  get 随机名编号() {
    return era.get(`cflag:${this.cid}:6`) || 0;
  }
  /**
   * @param {number} v
   */
  set 随机名编号(v) {
    era.set(`cflag:${this.cid}:6`, v);
  }

  /**
   * 特别服装类型（cflag:cid:42）
   * CFLAG:42 特別コスチュームのタイプ（类型名见 ere/page/page-clothtype.js 的 clothtype_special_text）
   * @returns {number}
   */
  get 特别服装类型() {
    return era.get(`cflag:${this.cid}:42`) || 0;
  }
  /**
   * @param {number} v
   */
  set 特别服装类型(v) {
    era.set(`cflag:${this.cid}:42`, v);
  }

  /**
   * 善恶值（cflag:cid:151）
   * 善悪値調整（< -100 钳到 -100）
   * @returns {number}
   */
  get 善恶值() {
    return era.get(`cflag:${this.cid}:151`) || 0;
  }
  /**
   * @param {number} v
   */
  set 善恶值(v) {
    era.set(`cflag:${this.cid}:151`, v);
  }

  /**
   * 命名检查（cflag:cid:420）
   * CFLAG:420 = 命名チェック(フラグON時はユーザー設定ネーム)
   * @returns {number}
   */
  get 命名检查() {
    return era.get(`cflag:${this.cid}:420`) || 0;
  }
  /**
   * @param {number} v
   */
  set 命名检查(v) {
    era.set(`cflag:${this.cid}:420`, v);
  }

  /**
   * 身高（cflag:cid:453）
   * CFLAG:453 = 身長
   * @returns {number}
   */
  get 身高() {
    return era.get(`cflag:${this.cid}:453`) || 0;
  }
  /**
   * @param {number} v
   */
  set 身高(v) {
    era.set(`cflag:${this.cid}:453`, v);
  }

  /**
   * 体重（cflag:cid:454）
   * CFLAG:454 = 体重
   * @returns {number}
   */
  get 体重() {
    return era.get(`cflag:${this.cid}:454`) || 0;
  }
  /**
   * @param {number} v
   */
  set 体重(v) {
    era.set(`cflag:${this.cid}:454`, v);
  }

  /**
   * 胸围（cflag:cid:455）
   * CFLAG:455 = B
   * @returns {number}
   */
  get 胸围() {
    return era.get(`cflag:${this.cid}:455`) || 0;
  }
  /**
   * @param {number} v
   */
  set 胸围(v) {
    era.set(`cflag:${this.cid}:455`, v);
  }

  /**
   * 腰围（cflag:cid:456）
   * CFLAG:456 = W
   * @returns {number}
   */
  get 腰围() {
    return era.get(`cflag:${this.cid}:456`) || 0;
  }
  /**
   * @param {number} v
   */
  set 腰围(v) {
    era.set(`cflag:${this.cid}:456`, v);
  }

  /**
   * 臀围（cflag:cid:457）
   * CFLAG:457 = H
   * @returns {number}
   */
  get 臀围() {
    return era.get(`cflag:${this.cid}:457`) || 0;
  }
  /**
   * @param {number} v
   */
  set 臀围(v) {
    era.set(`cflag:${this.cid}:457`, v);
  }

  /**
   * 结婚对象（cflag:cid:601）
   * CFLAG:601 = 結婚相手
   * @returns {number}
   */
  get 结婚对象() {
    return era.get(`cflag:${this.cid}:601`) || 0;
  }
  /**
   * @param {number} v
   */
  set 结婚对象(v) {
    era.set(`cflag:${this.cid}:601`, v);
  }

  /**
   * 结婚爱情（cflag:cid:602）
   * CFLAG:602 = 結婚愛情
   * @returns {number}
   */
  get 结婚爱情() {
    return era.get(`cflag:${this.cid}:602`) || 0;
  }
  /**
   * @param {number} v
   */
  set 结婚爱情(v) {
    era.set(`cflag:${this.cid}:602`, v);
  }

  /**
   * 收藏（cflag:cid:700）
   * CFLAG:700 = お気に入りフラグ
   * @returns {number}
   */
  get 收藏() {
    return era.get(`cflag:${this.cid}:700`) || 0;
  }
  /**
   * @param {number} v
   */
  set 收藏(v) {
    era.set(`cflag:${this.cid}:700`, v);
  }

  /**
   * 寿命（cflag:cid:820）
   * CFLAG:820 = 影の寿命
   * @returns {number}
   */
  get 寿命() {
    return era.get(`cflag:${this.cid}:820`) || 0;
  }
  /**
   * @param {number} v
   */
  set 寿命(v) {
    era.set(`cflag:${this.cid}:820`, v);
  }

  // —— cstr ——
  /**
   * 加入时名字（cstr:cid:1）
   * CSTR:A:1 = %NAME:A%
   * @returns {string}
   */
  get 加入时名字() {
    return era.get(`cstr:${this.cid}:1`) || '';
  }
  /**
   * @param {string} v
   */
  set 加入时名字(v) {
    era.set(`cstr:${this.cid}:1`, v);
  }

  // —— talent ——
  /**
   * 处女（talent:cid:0）
   * @returns {number}
   */
  get 处女() {
    return era.get(`talent:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 处女(v) {
    era.set(`talent:${this.cid}:0`, v);
  }

  /**
   * 胆怯（talent:cid:10）
   * @returns {number}
   */
  get 胆怯() {
    return era.get(`talent:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 胆怯(v) {
    era.set(`talent:${this.cid}:10`, v);
  }

  /**
   * 刚强（talent:cid:12）
   * @returns {number}
   */
  get 刚强() {
    return era.get(`talent:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 刚强(v) {
    era.set(`talent:${this.cid}:12`, v);
  }

  /**
   * 坦率（talent:cid:13）
   * @returns {number}
   */
  get 坦率() {
    return era.get(`talent:${this.cid}:13`) || 0;
  }
  /**
   * @param {number} v
   */
  set 坦率(v) {
    era.set(`talent:${this.cid}:13`, v);
  }

  /**
   * 文静（talent:cid:14）
   * @returns {number}
   */
  get 文静() {
    return era.get(`talent:${this.cid}:14`) || 0;
  }
  /**
   * @param {number} v
   */
  set 文静(v) {
    era.set(`talent:${this.cid}:14`, v);
  }

  /**
   * 高姿态（talent:cid:15）
   * @returns {number}
   */
  get 高姿态() {
    return era.get(`talent:${this.cid}:15`) || 0;
  }
  /**
   * @param {number} v
   */
  set 高姿态(v) {
    era.set(`talent:${this.cid}:15`, v);
  }

  /**
   * 嚣张（talent:cid:16）
   * @returns {number}
   */
  get 嚣张() {
    return era.get(`talent:${this.cid}:16`) || 0;
  }
  /**
   * @param {number} v
   */
  set 嚣张(v) {
    era.set(`talent:${this.cid}:16`, v);
  }

  /**
   * 低姿态（talent:cid:17）
   * @returns {number}
   */
  get 低姿态() {
    return era.get(`talent:${this.cid}:17`) || 0;
  }
  /**
   * @param {number} v
   */
  set 低姿态(v) {
    era.set(`talent:${this.cid}:17`, v);
  }

  /**
   * 傲娇（talent:cid:18）
   * @returns {number}
   */
  get 傲娇() {
    return era.get(`talent:${this.cid}:18`) || 0;
  }
  /**
   * @param {number} v
   */
  set 傲娇(v) {
    era.set(`talent:${this.cid}:18`, v);
  }

  /**
   * 好奇心（talent:cid:23）
   * @returns {number}
   */
  get 好奇心() {
    return era.get(`talent:${this.cid}:23`) || 0;
  }
  /**
   * @param {number} v
   */
  set 好奇心(v) {
    era.set(`talent:${this.cid}:23`, v);
  }

  /**
   * 保守的（talent:cid:24）
   * @returns {number}
   */
  get 保守的() {
    return era.get(`talent:${this.cid}:24`) || 0;
  }
  /**
   * @param {number} v
   */
  set 保守的(v) {
    era.set(`talent:${this.cid}:24`, v);
  }

  /**
   * 乐观的（talent:cid:25）
   * @returns {number}
   */
  get 乐观的() {
    return era.get(`talent:${this.cid}:25`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乐观的(v) {
    era.set(`talent:${this.cid}:25`, v);
  }

  /**
   * 爱表现（talent:cid:28）
   * @returns {number}
   */
  get 爱表现() {
    return era.get(`talent:${this.cid}:28`) || 0;
  }
  /**
   * @param {number} v
   */
  set 爱表现(v) {
    era.set(`talent:${this.cid}:28`, v);
  }

  /**
   * 看轻贞操（talent:cid:31）
   * @returns {number}
   */
  get 看轻贞操() {
    return era.get(`talent:${this.cid}:31`) || 0;
  }
  /**
   * @param {number} v
   */
  set 看轻贞操(v) {
    era.set(`talent:${this.cid}:31`, v);
  }

  /**
   * 开放（talent:cid:33）
   * @returns {number}
   */
  get 开放() {
    return era.get(`talent:${this.cid}:33`) || 0;
  }
  /**
   * @param {number} v
   */
  set 开放(v) {
    era.set(`talent:${this.cid}:33`, v);
  }

  /**
   * 害羞（talent:cid:35）
   * @returns {number}
   */
  get 害羞() {
    return era.get(`talent:${this.cid}:35`) || 0;
  }
  /**
   * @param {number} v
   */
  set 害羞(v) {
    era.set(`talent:${this.cid}:35`, v);
  }

  /**
   * 不知羞耻（talent:cid:36）
   * @returns {number}
   */
  get 不知羞耻() {
    return era.get(`talent:${this.cid}:36`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不知羞耻(v) {
    era.set(`talent:${this.cid}:36`, v);
  }

  /**
   * 把柄（talent:cid:37）
   * @returns {number}
   */
  get 把柄() {
    return era.get(`talent:${this.cid}:37`) || 0;
  }
  /**
   * @param {number} v
   */
  set 把柄(v) {
    era.set(`talent:${this.cid}:37`, v);
  }

  /**
   * 害怕疼痛（talent:cid:40）
   * @returns {number}
   */
  get 害怕疼痛() {
    return era.get(`talent:${this.cid}:40`) || 0;
  }
  /**
   * @param {number} v
   */
  set 害怕疼痛(v) {
    era.set(`talent:${this.cid}:40`, v);
  }

  /**
   * 不惧疼痛（talent:cid:41）
   * @returns {number}
   */
  get 不惧疼痛() {
    return era.get(`talent:${this.cid}:41`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不惧疼痛(v) {
    era.set(`talent:${this.cid}:41`, v);
  }

  /**
   * 容易湿（talent:cid:42）
   * @returns {number}
   */
  get 容易湿() {
    return era.get(`talent:${this.cid}:42`) || 0;
  }
  /**
   * @param {number} v
   */
  set 容易湿(v) {
    era.set(`talent:${this.cid}:42`, v);
  }

  /**
   * 不易湿（talent:cid:43）
   * @returns {number}
   */
  get 不易湿() {
    return era.get(`talent:${this.cid}:43`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不易湿(v) {
    era.set(`talent:${this.cid}:43`, v);
  }

  /**
   * 眼镜（talent:cid:48）
   * @returns {number}
   */
  get 眼镜() {
    return era.get(`talent:${this.cid}:48`) || 0;
  }
  /**
   * @param {number} v
   */
  set 眼镜(v) {
    era.set(`talent:${this.cid}:48`, v);
  }

  /**
   * 快速学习（talent:cid:50）
   * @returns {number}
   */
  get 快速学习() {
    return era.get(`talent:${this.cid}:50`) || 0;
  }
  /**
   * @param {number} v
   */
  set 快速学习(v) {
    era.set(`talent:${this.cid}:50`, v);
  }

  /**
   * 学习缓慢（talent:cid:51）
   * @returns {number}
   */
  get 学习缓慢() {
    return era.get(`talent:${this.cid}:51`) || 0;
  }
  /**
   * @param {number} v
   */
  set 学习缓慢(v) {
    era.set(`talent:${this.cid}:51`, v);
  }

  /**
   * 容易自慰（talent:cid:60）
   * @returns {number}
   */
  get 容易自慰() {
    return era.get(`talent:${this.cid}:60`) || 0;
  }
  /**
   * @param {number} v
   */
  set 容易自慰(v) {
    era.set(`talent:${this.cid}:60`, v);
  }

  /**
   * 不怕污臭（talent:cid:61）
   * @returns {number}
   */
  get 不怕污臭() {
    return era.get(`talent:${this.cid}:61`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不怕污臭(v) {
    era.set(`talent:${this.cid}:61`, v);
  }

  /**
   * 反感污臭（talent:cid:62）
   * @returns {number}
   */
  get 反感污臭() {
    return era.get(`talent:${this.cid}:62`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反感污臭(v) {
    era.set(`talent:${this.cid}:62`, v);
  }

  /**
   * 献身的（talent:cid:63）
   * @returns {number}
   */
  get 献身的() {
    return era.get(`talent:${this.cid}:63`) || 0;
  }
  /**
   * @param {number} v
   */
  set 献身的(v) {
    era.set(`talent:${this.cid}:63`, v);
  }

  /**
   * 抵抗诱惑（talent:cid:69）
   * @returns {number}
   */
  get 抵抗诱惑() {
    return era.get(`talent:${this.cid}:69`) || 0;
  }
  /**
   * @param {number} v
   */
  set 抵抗诱惑(v) {
    era.set(`talent:${this.cid}:69`, v);
  }

  /**
   * 接受快感（talent:cid:70）
   * @returns {number}
   */
  get 接受快感() {
    return era.get(`talent:${this.cid}:70`) || 0;
  }
  /**
   * @param {number} v
   */
  set 接受快感(v) {
    era.set(`talent:${this.cid}:70`, v);
  }

  /**
   * 容易上瘾（talent:cid:72）
   * @returns {number}
   */
  get 容易上瘾() {
    return era.get(`talent:${this.cid}:72`) || 0;
  }
  /**
   * @param {number} v
   */
  set 容易上瘾(v) {
    era.set(`talent:${this.cid}:72`, v);
  }

  /**
   * 容易陷落（talent:cid:73）
   * @returns {number}
   */
  get 容易陷落() {
    return era.get(`talent:${this.cid}:73`) || 0;
  }
  /**
   * @param {number} v
   */
  set 容易陷落(v) {
    era.set(`talent:${this.cid}:73`, v);
  }

  /**
   * 倒错的（talent:cid:80）
   * @returns {number}
   */
  get 倒错的() {
    return era.get(`talent:${this.cid}:80`) || 0;
  }
  /**
   * @param {number} v
   */
  set 倒错的(v) {
    era.set(`talent:${this.cid}:80`, v);
  }

  /**
   * 双性恋（talent:cid:81）
   * @returns {number}
   */
  get 双性恋() {
    return era.get(`talent:${this.cid}:81`) || 0;
  }
  /**
   * @param {number} v
   */
  set 双性恋(v) {
    era.set(`talent:${this.cid}:81`, v);
  }

  /**
   * 小恶魔（talent:cid:87）
   * @returns {number}
   */
  get 小恶魔() {
    return era.get(`talent:${this.cid}:87`) || 0;
  }
  /**
   * @param {number} v
   */
  set 小恶魔(v) {
    era.set(`talent:${this.cid}:87`, v);
  }

  /**
   * 魅惑（talent:cid:91）
   * @returns {number}
   */
  get 魅惑() {
    return era.get(`talent:${this.cid}:91`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魅惑(v) {
    era.set(`talent:${this.cid}:91`, v);
  }

  /**
   * 魁梧（talent:cid:99）
   * @returns {number}
   */
  get 魁梧() {
    return era.get(`talent:${this.cid}:99`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魁梧(v) {
    era.set(`talent:${this.cid}:99`, v);
  }

  /**
   * 娇小（talent:cid:100）
   * @returns {number}
   */
  get 娇小() {
    return era.get(`talent:${this.cid}:100`) || 0;
  }
  /**
   * @param {number} v
   */
  set 娇小(v) {
    era.set(`talent:${this.cid}:100`, v);
  }

  /**
   * 阴蒂钝感（talent:cid:101）
   * @returns {number}
   */
  get 阴蒂钝感() {
    return era.get(`talent:${this.cid}:101`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂钝感(v) {
    era.set(`talent:${this.cid}:101`, v);
  }

  /**
   * 阴蒂敏感（talent:cid:102）
   * @returns {number}
   */
  get 阴蒂敏感() {
    return era.get(`talent:${this.cid}:102`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂敏感(v) {
    era.set(`talent:${this.cid}:102`, v);
  }

  /**
   * 私处钝感（talent:cid:103）
   * @returns {number}
   */
  get 私处钝感() {
    return era.get(`talent:${this.cid}:103`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处钝感(v) {
    era.set(`talent:${this.cid}:103`, v);
  }

  /**
   * 私处敏感（talent:cid:104）
   * @returns {number}
   */
  get 私处敏感() {
    return era.get(`talent:${this.cid}:104`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处敏感(v) {
    era.set(`talent:${this.cid}:104`, v);
  }

  /**
   * 肛门钝感（talent:cid:105）
   * @returns {number}
   */
  get 肛门钝感() {
    return era.get(`talent:${this.cid}:105`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门钝感(v) {
    era.set(`talent:${this.cid}:105`, v);
  }

  /**
   * 肛门敏感（talent:cid:106）
   * @returns {number}
   */
  get 肛门敏感() {
    return era.get(`talent:${this.cid}:106`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门敏感(v) {
    era.set(`talent:${this.cid}:106`, v);
  }

  /**
   * 乳房钝感（talent:cid:107）
   * @returns {number}
   */
  get 乳房钝感() {
    return era.get(`talent:${this.cid}:107`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房钝感(v) {
    era.set(`talent:${this.cid}:107`, v);
  }

  /**
   * 乳房敏感（talent:cid:108）
   * @returns {number}
   */
  get 乳房敏感() {
    return era.get(`talent:${this.cid}:108`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房敏感(v) {
    era.set(`talent:${this.cid}:108`, v);
  }

  /**
   * 贫乳（talent:cid:109）
   * @returns {number}
   */
  get 贫乳() {
    return era.get(`talent:${this.cid}:109`) || 0;
  }
  /**
   * @param {number} v
   */
  set 贫乳(v) {
    era.set(`talent:${this.cid}:109`, v);
  }

  /**
   * 巨乳（talent:cid:110）
   * @returns {number}
   */
  get 巨乳() {
    return era.get(`talent:${this.cid}:110`) || 0;
  }
  /**
   * @param {number} v
   */
  set 巨乳(v) {
    era.set(`talent:${this.cid}:110`, v);
  }

  /**
   * 快速回复（talent:cid:111）
   * @returns {number}
   */
  get 快速回复() {
    return era.get(`talent:${this.cid}:111`) || 0;
  }
  /**
   * @param {number} v
   */
  set 快速回复(v) {
    era.set(`talent:${this.cid}:111`, v);
  }

  /**
   * 回复缓慢（talent:cid:112）
   * @returns {number}
   */
  get 回复缓慢() {
    return era.get(`talent:${this.cid}:112`) || 0;
  }
  /**
   * @param {number} v
   */
  set 回复缓慢(v) {
    era.set(`talent:${this.cid}:112`, v);
  }

  /**
   * 爆乳（talent:cid:114）
   * @returns {number}
   */
  get 爆乳() {
    return era.get(`talent:${this.cid}:114`) || 0;
  }
  /**
   * @param {number} v
   */
  set 爆乳(v) {
    era.set(`talent:${this.cid}:114`, v);
  }

  /**
   * 肥胖（talent:cid:115）
   * @returns {number}
   */
  get 肥胖() {
    return era.get(`talent:${this.cid}:115`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肥胖(v) {
    era.set(`talent:${this.cid}:115`, v);
  }

  /**
   * 绝壁（talent:cid:116）
   * @returns {number}
   */
  get 绝壁() {
    return era.get(`talent:${this.cid}:116`) || 0;
  }
  /**
   * @param {number} v
   */
  set 绝壁(v) {
    era.set(`talent:${this.cid}:116`, v);
  }

  /**
   * 治疗（talent:cid:117）
   * @returns {number}
   */
  get 治疗() {
    return era.get(`talent:${this.cid}:117`) || 0;
  }
  /**
   * @param {number} v
   */
  set 治疗(v) {
    era.set(`talent:${this.cid}:117`, v);
  }

  /**
   * 鼓舞（talent:cid:118）
   * @returns {number}
   */
  get 鼓舞() {
    return era.get(`talent:${this.cid}:118`) || 0;
  }
  /**
   * @param {number} v
   */
  set 鼓舞(v) {
    era.set(`talent:${this.cid}:118`, v);
  }

  /**
   * 超乳（talent:cid:119）
   * @returns {number}
   */
  get 超乳() {
    return era.get(`talent:${this.cid}:119`) || 0;
  }
  /**
   * @param {number} v
   */
  set 超乳(v) {
    era.set(`talent:${this.cid}:119`, v);
  }

  /**
   * 扶她（talent:cid:121）
   * @returns {number}
   */
  get 扶她() {
    return era.get(`talent:${this.cid}:121`) || 0;
  }
  /**
   * @param {number} v
   */
  set 扶她(v) {
    era.set(`talent:${this.cid}:121`, v);
  }

  /**
   * 男人（talent:cid:122）
   * @returns {number}
   */
  get 男人() {
    return era.get(`talent:${this.cid}:122`) || 0;
  }
  /**
   * @param {number} v
   */
  set 男人(v) {
    era.set(`talent:${this.cid}:122`, v);
  }

  /**
   * 动物耳朵（talent:cid:124）
   * @returns {number}
   */
  get 动物耳朵() {
    return era.get(`talent:${this.cid}:124`) || 0;
  }
  /**
   * @param {number} v
   */
  set 动物耳朵(v) {
    era.set(`talent:${this.cid}:124`, v);
  }

  /**
   * 母乳体质（talent:cid:130）
   * @returns {number}
   */
  get 母乳体质() {
    return era.get(`talent:${this.cid}:130`) || 0;
  }
  /**
   * @param {number} v
   */
  set 母乳体质(v) {
    era.set(`talent:${this.cid}:130`, v);
  }

  /**
   * 幼稚（talent:cid:132）
   * @returns {number}
   */
  get 幼稚() {
    return era.get(`talent:${this.cid}:132`) || 0;
  }
  /**
   * @param {number} v
   */
  set 幼稚(v) {
    era.set(`talent:${this.cid}:132`, v);
  }

  /**
   * 早泄（talent:cid:133）
   * @returns {number}
   */
  get 早泄() {
    return era.get(`talent:${this.cid}:133`) || 0;
  }
  /**
   * @param {number} v
   */
  set 早泄(v) {
    era.set(`talent:${this.cid}:133`, v);
  }

  /**
   * 软弱（talent:cid:134）
   * @returns {number}
   */
  get 软弱() {
    return era.get(`talent:${this.cid}:134`) || 0;
  }
  /**
   * @param {number} v
   */
  set 软弱(v) {
    era.set(`talent:${this.cid}:134`, v);
  }

  /**
   * 兽类（talent:cid:137）
   * @returns {number}
   */
  get 兽类() {
    return era.get(`talent:${this.cid}:137`) || 0;
  }
  /**
   * @param {number} v
   */
  set 兽类(v) {
    era.set(`talent:${this.cid}:137`, v);
  }

  /**
   * 恋母情结（talent:cid:140）
   * @returns {number}
   */
  get 恋母情结() {
    return era.get(`talent:${this.cid}:140`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋母情结(v) {
    era.set(`talent:${this.cid}:140`, v);
  }

  /**
   * 恋父情结（talent:cid:141）
   * @returns {number}
   */
  get 恋父情结() {
    return era.get(`talent:${this.cid}:141`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋父情结(v) {
    era.set(`talent:${this.cid}:141`, v);
  }

  /**
   * 萝莉控（talent:cid:142）
   * @returns {number}
   */
  get 萝莉控() {
    return era.get(`talent:${this.cid}:142`) || 0;
  }
  /**
   * @param {number} v
   */
  set 萝莉控(v) {
    era.set(`talent:${this.cid}:142`, v);
  }

  /**
   * 正太控（talent:cid:143）
   * @returns {number}
   */
  get 正太控() {
    return era.get(`talent:${this.cid}:143`) || 0;
  }
  /**
   * @param {number} v
   */
  set 正太控(v) {
    era.set(`talent:${this.cid}:143`, v);
  }

  /**
   * 不受洗脑（talent:cid:152）
   * @returns {number}
   */
  get 不受洗脑() {
    return era.get(`talent:${this.cid}:152`) || 0;
  }
  /**
   * @param {number} v
   */
  set 不受洗脑(v) {
    era.set(`talent:${this.cid}:152`, v);
  }

  /**
   * 妊娠（talent:cid:153）
   * @returns {number}
   */
  get 妊娠() {
    return era.get(`talent:${this.cid}:153`) || 0;
  }
  /**
   * @param {number} v
   */
  set 妊娠(v) {
    era.set(`talent:${this.cid}:153`, v);
  }

  /**
   * 育儿中（talent:cid:154）
   * @returns {number}
   */
  get 育儿中() {
    return era.get(`talent:${this.cid}:154`) || 0;
  }
  /**
   * @param {number} v
   */
  set 育儿中(v) {
    era.set(`talent:${this.cid}:154`, v);
  }

  /**
   * 母性（talent:cid:155）
   * @returns {number}
   */
  get 母性() {
    return era.get(`talent:${this.cid}:155`) || 0;
  }
  /**
   * @param {number} v
   */
  set 母性(v) {
    era.set(`talent:${this.cid}:155`, v);
  }

  /**
   * 父性（talent:cid:156）
   * @returns {number}
   */
  get 父性() {
    return era.get(`talent:${this.cid}:156`) || 0;
  }
  /**
   * @param {number} v
   */
  set 父性(v) {
    era.set(`talent:${this.cid}:156`, v);
  }

  /**
   * 人妻（talent:cid:157）
   * @returns {number}
   */
  get 人妻() {
    return era.get(`talent:${this.cid}:157`) || 0;
  }
  /**
   * @param {number} v
   */
  set 人妻(v) {
    era.set(`talent:${this.cid}:157`, v);
  }

  /**
   * 异种婚姻（talent:cid:159）
   * @returns {number}
   */
  get 异种婚姻() {
    return era.get(`talent:${this.cid}:159`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异种婚姻(v) {
    era.set(`talent:${this.cid}:159`, v);
  }

  /**
   * 慈爱（talent:cid:160）
   * @returns {number}
   */
  get 慈爱() {
    return era.get(`talent:${this.cid}:160`) || 0;
  }
  /**
   * @param {number} v
   */
  set 慈爱(v) {
    era.set(`talent:${this.cid}:160`, v);
  }

  /**
   * 自信家（talent:cid:161）
   * @returns {number}
   */
  get 自信家() {
    return era.get(`talent:${this.cid}:161`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自信家(v) {
    era.set(`talent:${this.cid}:161`, v);
  }

  /**
   * 懦弱（talent:cid:162）
   * @returns {number}
   */
  get 懦弱() {
    return era.get(`talent:${this.cid}:162`) || 0;
  }
  /**
   * @param {number} v
   */
  set 懦弱(v) {
    era.set(`talent:${this.cid}:162`, v);
  }

  /**
   * 高贵（talent:cid:163）
   * @returns {number}
   */
  get 高贵() {
    return era.get(`talent:${this.cid}:163`) || 0;
  }
  /**
   * @param {number} v
   */
  set 高贵(v) {
    era.set(`talent:${this.cid}:163`, v);
  }

  /**
   * 冷静（talent:cid:164）
   * @returns {number}
   */
  get 冷静() {
    return era.get(`talent:${this.cid}:164`) || 0;
  }
  /**
   * @param {number} v
   */
  set 冷静(v) {
    era.set(`talent:${this.cid}:164`, v);
  }

  /**
   * 恶女（talent:cid:166）
   * @returns {number}
   */
  get 恶女() {
    return era.get(`talent:${this.cid}:166`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恶女(v) {
    era.set(`talent:${this.cid}:166`, v);
  }

  /**
   * 智慧（talent:cid:172）
   * @returns {number}
   */
  get 智慧() {
    return era.get(`talent:${this.cid}:172`) || 0;
  }
  /**
   * @param {number} v
   */
  set 智慧(v) {
    era.set(`talent:${this.cid}:172`, v);
  }

  /**
   * 庇护者（talent:cid:173）
   * @returns {number}
   */
  get 庇护者() {
    return era.get(`talent:${this.cid}:173`) || 0;
  }
  /**
   * @param {number} v
   */
  set 庇护者(v) {
    era.set(`talent:${this.cid}:173`, v);
  }

  /**
   * 精英（talent:cid:220）
   * @returns {number}
   */
  get 精英() {
    return era.get(`talent:${this.cid}:220`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精英(v) {
    era.set(`talent:${this.cid}:220`, v);
  }

  /**
   * 战术（talent:cid:240）
   * @returns {number}
   */
  get 战术() {
    return era.get(`talent:${this.cid}:240`) || 0;
  }
  /**
   * @param {number} v
   */
  set 战术(v) {
    era.set(`talent:${this.cid}:240`, v);
  }

  /**
   * 魔术（talent:cid:241）
   * @returns {number}
   */
  get 魔术() {
    return era.get(`talent:${this.cid}:241`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔术(v) {
    era.set(`talent:${this.cid}:241`, v);
  }

  /**
   * 法术（talent:cid:242）
   * @returns {number}
   */
  get 法术() {
    return era.get(`talent:${this.cid}:242`) || 0;
  }
  /**
   * @param {number} v
   */
  set 法术(v) {
    era.set(`talent:${this.cid}:242`, v);
  }

  /**
   * 奇袭（talent:cid:243）
   * @returns {number}
   */
  get 奇袭() {
    return era.get(`talent:${this.cid}:243`) || 0;
  }
  /**
   * @param {number} v
   */
  set 奇袭(v) {
    era.set(`talent:${this.cid}:243`, v);
  }

  /**
   * 恶魔肌肤（talent:cid:244）
   * @returns {number}
   */
  get 恶魔肌肤() {
    return era.get(`talent:${this.cid}:244`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恶魔肌肤(v) {
    era.set(`talent:${this.cid}:244`, v);
  }

  /**
   * 恶魔翅膀（talent:cid:245）
   * @returns {number}
   */
  get 恶魔翅膀() {
    return era.get(`talent:${this.cid}:245`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恶魔翅膀(v) {
    era.set(`talent:${this.cid}:245`, v);
  }

  /**
   * 恶魔尾巴（talent:cid:246）
   * @returns {number}
   */
  get 恶魔尾巴() {
    return era.get(`talent:${this.cid}:246`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恶魔尾巴(v) {
    era.set(`talent:${this.cid}:246`, v);
  }

  /**
   * 恶魔眼睛（talent:cid:247）
   * @returns {number}
   */
  get 恶魔眼睛() {
    return era.get(`talent:${this.cid}:247`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恶魔眼睛(v) {
    era.set(`talent:${this.cid}:247`, v);
  }

  /**
   * 肌肉型（talent:cid:248）
   * @returns {number}
   */
  get 肌肉型() {
    return era.get(`talent:${this.cid}:248`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肌肉型(v) {
    era.set(`talent:${this.cid}:248`, v);
  }

  /**
   * 铁壁（talent:cid:249）
   * @returns {number}
   */
  get 铁壁() {
    return era.get(`talent:${this.cid}:249`) || 0;
  }
  /**
   * @param {number} v
   */
  set 铁壁(v) {
    era.set(`talent:${this.cid}:249`, v);
  }

  /**
   * 咒术（talent:cid:250）
   * @returns {number}
   */
  get 咒术() {
    return era.get(`talent:${this.cid}:250`) || 0;
  }
  /**
   * @param {number} v
   */
  set 咒术(v) {
    era.set(`talent:${this.cid}:250`, v);
  }

  /**
   * 忍术（talent:cid:251）
   * @returns {number}
   */
  get 忍术() {
    return era.get(`talent:${this.cid}:251`) || 0;
  }
  /**
   * @param {number} v
   */
  set 忍术(v) {
    era.set(`talent:${this.cid}:251`, v);
  }

  /**
   * 先制（talent:cid:252）
   * @returns {number}
   */
  get 先制() {
    return era.get(`talent:${this.cid}:252`) || 0;
  }
  /**
   * @param {number} v
   */
  set 先制(v) {
    era.set(`talent:${this.cid}:252`, v);
  }

  /**
   * 褐色肌肤（talent:cid:253）
   * @returns {number}
   */
  get 褐色肌肤() {
    return era.get(`talent:${this.cid}:253`) || 0;
  }
  /**
   * @param {number} v
   */
  set 褐色肌肤(v) {
    era.set(`talent:${this.cid}:253`, v);
  }

  /**
   * 魔之刻印（talent:cid:254）
   * @returns {number}
   */
  get 魔之刻印() {
    return era.get(`talent:${this.cid}:254`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔之刻印(v) {
    era.set(`talent:${this.cid}:254`, v);
  }

  /**
   * 白皙（talent:cid:255）
   * @returns {number}
   */
  get 白皙() {
    return era.get(`talent:${this.cid}:255`) || 0;
  }
  /**
   * @param {number} v
   */
  set 白皙(v) {
    era.set(`talent:${this.cid}:255`, v);
  }

  /**
   * 虚弱（talent:cid:256）
   * @returns {number}
   */
  get 虚弱() {
    return era.get(`talent:${this.cid}:256`) || 0;
  }
  /**
   * @param {number} v
   */
  set 虚弱(v) {
    era.set(`talent:${this.cid}:256`, v);
  }

  /**
   * 魔法耐性（talent:cid:257）
   * @returns {number}
   */
  get 魔法耐性() {
    return era.get(`talent:${this.cid}:257`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔法耐性(v) {
    era.set(`talent:${this.cid}:257`, v);
  }

  /**
   * 俊足（talent:cid:258）
   * @returns {number}
   */
  get 俊足() {
    return era.get(`talent:${this.cid}:258`) || 0;
  }
  /**
   * @param {number} v
   */
  set 俊足(v) {
    era.set(`talent:${this.cid}:258`, v);
  }

  /**
   * 独眼（talent:cid:259）
   * @returns {number}
   */
  get 独眼() {
    return era.get(`talent:${this.cid}:259`) || 0;
  }
  /**
   * @param {number} v
   */
  set 独眼(v) {
    era.set(`talent:${this.cid}:259`, v);
  }

  /**
   * 额头天眼（talent:cid:260）
   * @returns {number}
   */
  get 额头天眼() {
    return era.get(`talent:${this.cid}:260`) || 0;
  }
  /**
   * @param {number} v
   */
  set 额头天眼(v) {
    era.set(`talent:${this.cid}:260`, v);
  }

  /**
   * 史莱姆（talent:cid:261）
   * @returns {number}
   */
  get 史莱姆() {
    return era.get(`talent:${this.cid}:261`) || 0;
  }
  /**
   * @param {number} v
   */
  set 史莱姆(v) {
    era.set(`talent:${this.cid}:261`, v);
  }

  /**
   * 触手（talent:cid:262）
   * @returns {number}
   */
  get 触手() {
    return era.get(`talent:${this.cid}:262`) || 0;
  }
  /**
   * @param {number} v
   */
  set 触手(v) {
    era.set(`talent:${this.cid}:262`, v);
  }

  /**
   * 小人体型（talent:cid:263）
   * @returns {number}
   */
  get 小人体型() {
    return era.get(`talent:${this.cid}:263`) || 0;
  }
  /**
   * @param {number} v
   */
  set 小人体型(v) {
    era.set(`talent:${this.cid}:263`, v);
  }

  /**
   * 角（talent:cid:264）
   * @returns {number}
   */
  get 角() {
    return era.get(`talent:${this.cid}:264`) || 0;
  }
  /**
   * @param {number} v
   */
  set 角(v) {
    era.set(`talent:${this.cid}:264`, v);
  }

  /**
   * 使役（talent:cid:265）
   * @returns {number}
   */
  get 使役() {
    return era.get(`talent:${this.cid}:265`) || 0;
  }
  /**
   * @param {number} v
   */
  set 使役(v) {
    era.set(`talent:${this.cid}:265`, v);
  }

  /**
   * 私处封印（talent:cid:273）
   * @returns {number}
   */
  get 私处封印() {
    return era.get(`talent:${this.cid}:273`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处封印(v) {
    era.set(`talent:${this.cid}:273`, v);
  }

  /**
   * 火之能力者（talent:cid:275）
   * @returns {number}
   */
  get 火之能力者() {
    return era.get(`talent:${this.cid}:275`) || 0;
  }
  /**
   * @param {number} v
   */
  set 火之能力者(v) {
    era.set(`talent:${this.cid}:275`, v);
  }

  /**
   * 冰之能力者（talent:cid:276）
   * @returns {number}
   */
  get 冰之能力者() {
    return era.get(`talent:${this.cid}:276`) || 0;
  }
  /**
   * @param {number} v
   */
  set 冰之能力者(v) {
    era.set(`talent:${this.cid}:276`, v);
  }

  /**
   * 雷之能力者（talent:cid:277）
   * @returns {number}
   */
  get 雷之能力者() {
    return era.get(`talent:${this.cid}:277`) || 0;
  }
  /**
   * @param {number} v
   */
  set 雷之能力者(v) {
    era.set(`talent:${this.cid}:277`, v);
  }

  /**
   * 光之能力者（talent:cid:278）
   * @returns {number}
   */
  get 光之能力者() {
    return era.get(`talent:${this.cid}:278`) || 0;
  }
  /**
   * @param {number} v
   */
  set 光之能力者(v) {
    era.set(`talent:${this.cid}:278`, v);
  }

  /**
   * 暗之能力者（talent:cid:279）
   * @returns {number}
   */
  get 暗之能力者() {
    return era.get(`talent:${this.cid}:279`) || 0;
  }
  /**
   * @param {number} v
   */
  set 暗之能力者(v) {
    era.set(`talent:${this.cid}:279`, v);
  }

  /**
   * 冒渎者（talent:cid:282）
   * @returns {number}
   */
  get 冒渎者() {
    return era.get(`talent:${this.cid}:282`) || 0;
  }
  /**
   * @param {number} v
   */
  set 冒渎者(v) {
    era.set(`talent:${this.cid}:282`, v);
  }

  /**
   * 担保人（talent:cid:290）
   * @returns {number}
   */
  get 担保人() {
    return era.get(`talent:${this.cid}:290`) || 0;
  }
  /**
   * @param {number} v
   */
  set 担保人(v) {
    era.set(`talent:${this.cid}:290`, v);
  }

  /**
   * 初心者（talent:cid:291）
   * @returns {number}
   */
  get 初心者() {
    return era.get(`talent:${this.cid}:291`) || 0;
  }
  /**
   * @param {number} v
   */
  set 初心者(v) {
    era.set(`talent:${this.cid}:291`, v);
  }

  /**
   * 头发颜色（talent:cid:300）
   * @returns {number}
   */
  get 头发颜色() {
    return era.get(`talent:${this.cid}:300`) || 0;
  }
  /**
   * @param {number} v
   */
  set 头发颜色(v) {
    era.set(`talent:${this.cid}:300`, v);
  }

  /**
   * 头发状态（talent:cid:301）
   * @returns {number}
   */
  get 头发状态() {
    return era.get(`talent:${this.cid}:301`) || 0;
  }
  /**
   * @param {number} v
   */
  set 头发状态(v) {
    era.set(`talent:${this.cid}:301`, v);
  }

  /**
   * 头发长度（talent:cid:302）
   * @returns {number}
   */
  get 头发长度() {
    return era.get(`talent:${this.cid}:302`) || 0;
  }
  /**
   * @param {number} v
   */
  set 头发长度(v) {
    era.set(`talent:${this.cid}:302`, v);
  }

  /**
   * 头发修剪方式（talent:cid:303）
   * @returns {number}
   */
  get 头发修剪方式() {
    return era.get(`talent:${this.cid}:303`) || 0;
  }
  /**
   * @param {number} v
   */
  set 头发修剪方式(v) {
    era.set(`talent:${this.cid}:303`, v);
  }

  /**
   * 发型（talent:cid:304）
   * @returns {number}
   */
  get 发型() {
    return era.get(`talent:${this.cid}:304`) || 0;
  }
  /**
   * @param {number} v
   */
  set 发型(v) {
    era.set(`talent:${this.cid}:304`, v);
  }

  /**
   * 目（talent:cid:305）
   * @returns {number}
   */
  get 目() {
    return era.get(`talent:${this.cid}:305`) || 0;
  }
  /**
   * @param {number} v
   */
  set 目(v) {
    era.set(`talent:${this.cid}:305`, v);
  }

  /**
   * 瞳色（talent:cid:306）
   * @returns {number}
   */
  get 瞳色() {
    return era.get(`talent:${this.cid}:306`) || 0;
  }
  /**
   * @param {number} v
   */
  set 瞳色(v) {
    era.set(`talent:${this.cid}:306`, v);
  }

  /**
   * 唇（talent:cid:307）
   * @returns {number}
   */
  get 唇() {
    return era.get(`talent:${this.cid}:307`) || 0;
  }
  /**
   * @param {number} v
   */
  set 唇(v) {
    era.set(`talent:${this.cid}:307`, v);
  }

  /**
   * 体型（talent:cid:308）
   * @returns {number}
   */
  get 体型() {
    return era.get(`talent:${this.cid}:308`) || 0;
  }
  /**
   * @param {number} v
   */
  set 体型(v) {
    era.set(`talent:${this.cid}:308`, v);
  }

  /**
   * 乳头（talent:cid:309）
   * @returns {number}
   */
  get 乳头() {
    return era.get(`talent:${this.cid}:309`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳头(v) {
    era.set(`talent:${this.cid}:309`, v);
  }

  /**
   * 阴毛状态（talent:cid:310）
   * @returns {number}
   */
  get 阴毛状态() {
    return era.get(`talent:${this.cid}:310`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴毛状态(v) {
    era.set(`talent:${this.cid}:310`, v);
  }

  /**
   * 阴毛生长极限（talent:cid:311）
   * @returns {number}
   */
  get 阴毛生长极限() {
    return era.get(`talent:${this.cid}:311`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴毛生长极限(v) {
    era.set(`talent:${this.cid}:311`, v);
  }

  /**
   * 魅力点（talent:cid:312）
   * @returns {number}
   */
  get 魅力点() {
    return era.get(`talent:${this.cid}:312`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魅力点(v) {
    era.set(`talent:${this.cid}:312`, v);
  }

  /**
   * 癖（talent:cid:313）
   * @returns {number}
   */
  get 癖() {
    return era.get(`talent:${this.cid}:313`) || 0;
  }
  /**
   * @param {number} v
   */
  set 癖(v) {
    era.set(`talent:${this.cid}:313`, v);
  }

  /**
   * 种族（talent:cid:314）
   * @returns {number}
   */
  get 种族() {
    return era.get(`talent:${this.cid}:314`) || 0;
  }
  /**
   * @param {number} v
   */
  set 种族(v) {
    era.set(`talent:${this.cid}:314`, v);
  }

  /**
   * 成为勇者前的生活（talent:cid:315）
   * @returns {number}
   */
  get 成为勇者前的生活() {
    return era.get(`talent:${this.cid}:315`) || 0;
  }
  /**
   * @param {number} v
   */
  set 成为勇者前的生活(v) {
    era.set(`talent:${this.cid}:315`, v);
  }

  /**
   * 成为勇者的契机（talent:cid:316）
   * @returns {number}
   */
  get 成为勇者的契机() {
    return era.get(`talent:${this.cid}:316`) || 0;
  }
  /**
   * @param {number} v
   */
  set 成为勇者的契机(v) {
    era.set(`talent:${this.cid}:316`, v);
  }

  /**
   * 喜欢的东西（talent:cid:317）
   * @returns {number}
   */
  get 喜欢的东西() {
    return era.get(`talent:${this.cid}:317`) || 0;
  }
  /**
   * @param {number} v
   */
  set 喜欢的东西(v) {
    era.set(`talent:${this.cid}:317`, v);
  }

  /**
   * 阴茎的状态（talent:cid:318）
   * @returns {number}
   */
  get 阴茎的状态() {
    return era.get(`talent:${this.cid}:318`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴茎的状态(v) {
    era.set(`talent:${this.cid}:318`, v);
  }

  /**
   * 种族2（talent:cid:319）
   * @returns {number}
   */
  get 种族2() {
    return era.get(`talent:${this.cid}:319`) || 0;
  }
  /**
   * @param {number} v
   */
  set 种族2(v) {
    era.set(`talent:${this.cid}:319`, v);
  }

  /**
   * 家族构成（talent:cid:320）
   * @returns {number}
   */
  get 家族构成() {
    return era.get(`talent:${this.cid}:320`) || 0;
  }
  /**
   * @param {number} v
   */
  set 家族构成(v) {
    era.set(`talent:${this.cid}:320`, v);
  }

  /**
   * 原种族（talent:cid:321）
   * @returns {number}
   */
  get 原种族() {
    return era.get(`talent:${this.cid}:321`) || 0;
  }
  /**
   * @param {number} v
   */
  set 原种族(v) {
    era.set(`talent:${this.cid}:321`, v);
  }

  /**
   * 现种族（talent:cid:322）
   * @returns {number}
   */
  get 现种族() {
    return era.get(`talent:${this.cid}:322`) || 0;
  }
  /**
   * @param {number} v
   */
  set 现种族(v) {
    era.set(`talent:${this.cid}:322`, v);
  }

  /**
   * 乳内妊娠（talent:cid:341）
   * @returns {number}
   */
  get 乳内妊娠() {
    return era.get(`talent:${this.cid}:341`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳内妊娠(v) {
    era.set(`talent:${this.cid}:341`, v);
  }

  /**
   * 精巢妊娠（talent:cid:342）
   * @returns {number}
   */
  get 精巢妊娠() {
    return era.get(`talent:${this.cid}:342`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精巢妊娠(v) {
    era.set(`talent:${this.cid}:342`, v);
  }

  /**
   * 肛内妊娠（talent:cid:343）
   * @returns {number}
   */
  get 肛内妊娠() {
    return era.get(`talent:${this.cid}:343`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛内妊娠(v) {
    era.set(`talent:${this.cid}:343`, v);
  }

  /**
   * 口内妊娠（talent:cid:344）
   * @returns {number}
   */
  get 口内妊娠() {
    return era.get(`talent:${this.cid}:344`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口内妊娠(v) {
    era.set(`talent:${this.cid}:344`, v);
  }

  /**
   * 粘液捕获（talent:cid:471）
   * @returns {number}
   */
  get 粘液捕获() {
    return era.get(`talent:${this.cid}:471`) || 0;
  }
  /**
   * @param {number} v
   */
  set 粘液捕获(v) {
    era.set(`talent:${this.cid}:471`, v);
  }

  /**
   * 落穴捕获（talent:cid:472）
   * @returns {number}
   */
  get 落穴捕获() {
    return era.get(`talent:${this.cid}:472`) || 0;
  }
  /**
   * @param {number} v
   */
  set 落穴捕获(v) {
    era.set(`talent:${this.cid}:472`, v);
  }

  /**
   * 藤蔓捕获（talent:cid:473）
   * @returns {number}
   */
  get 藤蔓捕获() {
    return era.get(`talent:${this.cid}:473`) || 0;
  }
  /**
   * @param {number} v
   */
  set 藤蔓捕获(v) {
    era.set(`talent:${this.cid}:473`, v);
  }

  /**
   * 铠破坏（talent:cid:474）
   * @returns {number}
   */
  get 铠破坏() {
    return era.get(`talent:${this.cid}:474`) || 0;
  }
  /**
   * @param {number} v
   */
  set 铠破坏(v) {
    era.set(`talent:${this.cid}:474`, v);
  }

  /**
   * 再生（talent:cid:476）
   * @returns {number}
   */
  get 再生() {
    return era.get(`talent:${this.cid}:476`) || 0;
  }
  /**
   * @param {number} v
   */
  set 再生(v) {
    era.set(`talent:${this.cid}:476`, v);
  }

  /**
   * 迷惑（talent:cid:478）
   * @returns {number}
   */
  get 迷惑() {
    return era.get(`talent:${this.cid}:478`) || 0;
  }
  /**
   * @param {number} v
   */
  set 迷惑(v) {
    era.set(`talent:${this.cid}:478`, v);
  }

  /**
   * 吐息（talent:cid:479）
   * @returns {number}
   */
  get 吐息() {
    return era.get(`talent:${this.cid}:479`) || 0;
  }
  /**
   * @param {number} v
   */
  set 吐息(v) {
    era.set(`talent:${this.cid}:479`, v);
  }

  /**
   * 诱惑（talent:cid:481）
   * @returns {number}
   */
  get 诱惑() {
    return era.get(`talent:${this.cid}:481`) || 0;
  }
  /**
   * @param {number} v
   */
  set 诱惑(v) {
    era.set(`talent:${this.cid}:481`, v);
  }

  /**
   * 魔力吸取（talent:cid:485）
   * @returns {number}
   */
  get 魔力吸取() {
    return era.get(`talent:${this.cid}:485`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔力吸取(v) {
    era.set(`talent:${this.cid}:485`, v);
  }

  // —— abl ——
  /**
   * 百合气质（abl:cid:22）
   * @returns {number}
   */
  get 百合气质() {
    return era.get(`abl:${this.cid}:22`) || 0;
  }
  /**
   * @param {number} v
   */
  set 百合气质(v) {
    era.set(`abl:${this.cid}:22`, v);
  }

  // —— exp ——
  /**
   * 生育经验（exp:cid:60）
   * @returns {number}
   */
  get 生育经验() {
    return era.get(`exp:${this.cid}:60`) || 0;
  }
  /**
   * @param {number} v
   */
  set 生育经验(v) {
    era.set(`exp:${this.cid}:60`, v);
  }

  /**
   * 异种妊娠经验（exp:cid:62）
   * @returns {number}
   */
  get 异种妊娠经验() {
    return era.get(`exp:${this.cid}:62`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异种妊娠经验(v) {
    era.set(`exp:${this.cid}:62`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = CharaFacade;
