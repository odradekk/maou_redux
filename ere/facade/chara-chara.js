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
   * 好感度（cflag:cid:2 ↔ CFLAG:2）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行261 CFLAG:2 主人による調教経験(好感度)
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
   * 基础攻击（cflag:cid:13 ↔ CFLAG:13）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:13 基礎攻撃力
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
   * 基础防御（cflag:cid:14 ↔ CFLAG:14）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:14 基礎防御力
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
   * 年龄（cflag:cid:451 ↔ CFLAG:451）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:451 年齢（人間換算，HUMAN_AGE_GENERATE の結果）
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
   * 种族年龄（cflag:cid:452 ↔ CFLAG:452）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:452 種族年齢（月替わりの年齢加算はこちら）
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
   * 武装（cflag:cid:550 ↔ CFLAG:550）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:550～559 装備品枠——武装（存储编号，EQUIP.ERB:35）
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

  // —— talent ——
  /**
   * 处女（talent:cid:0 ↔ TALENT:0）
   * 源: yml/Talent.yml id 0
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
   * 胆怯（talent:cid:10 ↔ TALENT:10）
   * 源: yml/Talent.yml id 10
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
   * 刚强（talent:cid:12 ↔ TALENT:12）
   * 源: yml/Talent.yml id 12
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
   * 坦率（talent:cid:13 ↔ TALENT:13）
   * 源: yml/Talent.yml id 13
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
   * 文静（talent:cid:14 ↔ TALENT:14）
   * 源: yml/Talent.yml id 14
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
   * 高姿态（talent:cid:15 ↔ TALENT:15）
   * 源: yml/Talent.yml id 15
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
   * 嚣张（talent:cid:16 ↔ TALENT:16）
   * 源: yml/Talent.yml id 16
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
   * 低姿态（talent:cid:17 ↔ TALENT:17）
   * 源: yml/Talent.yml id 17
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
   * 傲娇（talent:cid:18 ↔ TALENT:18）
   * 源: yml/Talent.yml id 18
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
   * 好奇心（talent:cid:23 ↔ TALENT:23）
   * 源: yml/Talent.yml id 23
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
   * 保守的（talent:cid:24 ↔ TALENT:24）
   * 源: yml/Talent.yml id 24
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
   * 乐观的（talent:cid:25 ↔ TALENT:25）
   * 源: yml/Talent.yml id 25
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
   * 爱表现（talent:cid:28 ↔ TALENT:28）
   * 源: yml/Talent.yml id 28
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
   * 看轻贞操（talent:cid:31 ↔ TALENT:31）
   * 源: yml/Talent.yml id 31
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
   * 开放（talent:cid:33 ↔ TALENT:33）
   * 源: yml/Talent.yml id 33
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
   * 害羞（talent:cid:35 ↔ TALENT:35）
   * 源: yml/Talent.yml id 35
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
   * 不知羞耻（talent:cid:36 ↔ TALENT:36）
   * 源: yml/Talent.yml id 36
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
   * 把柄（talent:cid:37 ↔ TALENT:37）
   * 源: yml/Talent.yml id 37
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
   * 害怕疼痛（talent:cid:40 ↔ TALENT:40）
   * 源: yml/Talent.yml id 40
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
   * 不惧疼痛（talent:cid:41 ↔ TALENT:41）
   * 源: yml/Talent.yml id 41
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
   * 容易湿（talent:cid:42 ↔ TALENT:42）
   * 源: yml/Talent.yml id 42
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
   * 不易湿（talent:cid:43 ↔ TALENT:43）
   * 源: yml/Talent.yml id 43
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
   * 眼镜（talent:cid:48 ↔ TALENT:48）
   * 源: yml/Talent.yml id 48
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
   * 快速学习（talent:cid:50 ↔ TALENT:50）
   * 源: yml/Talent.yml id 50
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
   * 学习缓慢（talent:cid:51 ↔ TALENT:51）
   * 源: yml/Talent.yml id 51
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
   * 容易自慰（talent:cid:60 ↔ TALENT:60）
   * 源: yml/Talent.yml id 60
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
   * 不怕污臭（talent:cid:61 ↔ TALENT:61）
   * 源: yml/Talent.yml id 61
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
   * 反感污臭（talent:cid:62 ↔ TALENT:62）
   * 源: yml/Talent.yml id 62
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
   * 献身的（talent:cid:63 ↔ TALENT:63）
   * 源: yml/Talent.yml id 63
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
   * 抵抗诱惑（talent:cid:69 ↔ TALENT:69）
   * 源: yml/Talent.yml id 69
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
   * 接受快感（talent:cid:70 ↔ TALENT:70）
   * 源: yml/Talent.yml id 70
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
   * 容易上瘾（talent:cid:72 ↔ TALENT:72）
   * 源: yml/Talent.yml id 72
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
   * 容易陷落（talent:cid:73 ↔ TALENT:73）
   * 源: yml/Talent.yml id 73
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
   * 倒错的（talent:cid:80 ↔ TALENT:80）
   * 源: yml/Talent.yml id 80
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
   * 双性恋（talent:cid:81 ↔ TALENT:81）
   * 源: yml/Talent.yml id 81
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
   * 小恶魔（talent:cid:87 ↔ TALENT:87）
   * 源: yml/Talent.yml id 87
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
   * 魅惑（talent:cid:91 ↔ TALENT:91）
   * 源: yml/Talent.yml id 91
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
   * 魁梧（talent:cid:99 ↔ TALENT:99）
   * 源: yml/Talent.yml id 99
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
   * 娇小（talent:cid:100 ↔ TALENT:100）
   * 源: yml/Talent.yml id 100
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
   * 阴蒂钝感（talent:cid:101 ↔ TALENT:101）
   * 源: yml/Talent.yml id 101
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
   * 阴蒂敏感（talent:cid:102 ↔ TALENT:102）
   * 源: yml/Talent.yml id 102
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
   * 私处钝感（talent:cid:103 ↔ TALENT:103）
   * 源: yml/Talent.yml id 103
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
   * 私处敏感（talent:cid:104 ↔ TALENT:104）
   * 源: yml/Talent.yml id 104
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
   * 肛门钝感（talent:cid:105 ↔ TALENT:105）
   * 源: yml/Talent.yml id 105
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
   * 肛门敏感（talent:cid:106 ↔ TALENT:106）
   * 源: yml/Talent.yml id 106
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
   * 乳房钝感（talent:cid:107 ↔ TALENT:107）
   * 源: yml/Talent.yml id 107
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
   * 乳房敏感（talent:cid:108 ↔ TALENT:108）
   * 源: yml/Talent.yml id 108
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
   * 贫乳（talent:cid:109 ↔ TALENT:109）
   * 源: yml/Talent.yml id 109
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
   * 巨乳（talent:cid:110 ↔ TALENT:110）
   * 源: yml/Talent.yml id 110
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
   * 快速回复（talent:cid:111 ↔ TALENT:111）
   * 源: yml/Talent.yml id 111
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
   * 回复缓慢（talent:cid:112 ↔ TALENT:112）
   * 源: yml/Talent.yml id 112
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
   * 爆乳（talent:cid:114 ↔ TALENT:114）
   * 源: yml/Talent.yml id 114
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
   * 肥胖（talent:cid:115 ↔ TALENT:115）
   * 源: yml/Talent.yml id 115
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
   * 绝壁（talent:cid:116 ↔ TALENT:116）
   * 源: yml/Talent.yml id 116
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
   * 治疗（talent:cid:117 ↔ TALENT:117）
   * 源: yml/Talent.yml id 117
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
   * 鼓舞（talent:cid:118 ↔ TALENT:118）
   * 源: yml/Talent.yml id 118
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
   * 超乳（talent:cid:119 ↔ TALENT:119）
   * 源: yml/Talent.yml id 119
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
   * 扶她（talent:cid:121 ↔ TALENT:121）
   * 源: yml/Talent.yml id 121
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
   * 男人（talent:cid:122 ↔ TALENT:122）
   * 源: yml/Talent.yml id 122
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
   * 动物耳朵（talent:cid:124 ↔ TALENT:124）
   * 源: yml/Talent.yml id 124
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
   * 母乳体质（talent:cid:130 ↔ TALENT:130）
   * 源: yml/Talent.yml id 130
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
   * 幼稚（talent:cid:132 ↔ TALENT:132）
   * 源: yml/Talent.yml id 132
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
   * 早泄（talent:cid:133 ↔ TALENT:133）
   * 源: yml/Talent.yml id 133
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
   * 软弱（talent:cid:134 ↔ TALENT:134）
   * 源: yml/Talent.yml id 134
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
   * 兽类（talent:cid:137 ↔ TALENT:137）
   * 源: yml/Talent.yml id 137
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
   * 恋母情结（talent:cid:140 ↔ TALENT:140）
   * 源: yml/Talent.yml id 140
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
   * 恋父情结（talent:cid:141 ↔ TALENT:141）
   * 源: yml/Talent.yml id 141
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
   * 萝莉控（talent:cid:142 ↔ TALENT:142）
   * 源: yml/Talent.yml id 142
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
   * 正太控（talent:cid:143 ↔ TALENT:143）
   * 源: yml/Talent.yml id 143
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
   * 不受洗脑（talent:cid:152 ↔ TALENT:152）
   * 源: yml/Talent.yml id 152
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
   * 妊娠（talent:cid:153 ↔ TALENT:153）
   * 源: yml/Talent.yml id 153
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
   * 育儿中（talent:cid:154 ↔ TALENT:154）
   * 源: yml/Talent.yml id 154
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
   * 母性（talent:cid:155 ↔ TALENT:155）
   * 源: yml/Talent.yml id 155
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
   * 父性（talent:cid:156 ↔ TALENT:156）
   * 源: yml/Talent.yml id 156
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
   * 人妻（talent:cid:157 ↔ TALENT:157）
   * 源: yml/Talent.yml id 157
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
   * 异种婚姻（talent:cid:159 ↔ TALENT:159）
   * 源: yml/Talent.yml id 159
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
   * 慈爱（talent:cid:160 ↔ TALENT:160）
   * 源: yml/Talent.yml id 160
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
   * 自信家（talent:cid:161 ↔ TALENT:161）
   * 源: yml/Talent.yml id 161
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
   * 懦弱（talent:cid:162 ↔ TALENT:162）
   * 源: yml/Talent.yml id 162
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
   * 高贵（talent:cid:163 ↔ TALENT:163）
   * 源: yml/Talent.yml id 163
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
   * 冷静（talent:cid:164 ↔ TALENT:164）
   * 源: yml/Talent.yml id 164
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
   * 恶女（talent:cid:166 ↔ TALENT:166）
   * 源: yml/Talent.yml id 166
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
   * 智慧（talent:cid:172 ↔ TALENT:172）
   * 源: yml/Talent.yml id 172
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
   * 庇护者（talent:cid:173 ↔ TALENT:173）
   * 源: yml/Talent.yml id 173
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
   * 精英（talent:cid:220 ↔ TALENT:220）
   * 源: yml/Talent.yml id 220
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
   * 战术（talent:cid:240 ↔ TALENT:240）
   * 源: yml/Talent.yml id 240
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
   * 魔术（talent:cid:241 ↔ TALENT:241）
   * 源: yml/Talent.yml id 241
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
   * 法术（talent:cid:242 ↔ TALENT:242）
   * 源: yml/Talent.yml id 242
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
   * 奇袭（talent:cid:243 ↔ TALENT:243）
   * 源: yml/Talent.yml id 243
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
   * 恶魔肌肤（talent:cid:244 ↔ TALENT:244）
   * 源: yml/Talent.yml id 244
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
   * 恶魔翅膀（talent:cid:245 ↔ TALENT:245）
   * 源: yml/Talent.yml id 245
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
   * 恶魔尾巴（talent:cid:246 ↔ TALENT:246）
   * 源: yml/Talent.yml id 246
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
   * 恶魔眼睛（talent:cid:247 ↔ TALENT:247）
   * 源: yml/Talent.yml id 247
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
   * 肌肉型（talent:cid:248 ↔ TALENT:248）
   * 源: yml/Talent.yml id 248
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
   * 铁壁（talent:cid:249 ↔ TALENT:249）
   * 源: yml/Talent.yml id 249
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
   * 咒术（talent:cid:250 ↔ TALENT:250）
   * 源: yml/Talent.yml id 250
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
   * 忍术（talent:cid:251 ↔ TALENT:251）
   * 源: yml/Talent.yml id 251
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
   * 先制（talent:cid:252 ↔ TALENT:252）
   * 源: yml/Talent.yml id 252
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
   * 褐色肌肤（talent:cid:253 ↔ TALENT:253）
   * 源: yml/Talent.yml id 253
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
   * 魔之刻印（talent:cid:254 ↔ TALENT:254）
   * 源: yml/Talent.yml id 254
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
   * 白皙（talent:cid:255 ↔ TALENT:255）
   * 源: yml/Talent.yml id 255
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
   * 虚弱（talent:cid:256 ↔ TALENT:256）
   * 源: yml/Talent.yml id 256
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
   * 魔法耐性（talent:cid:257 ↔ TALENT:257）
   * 源: yml/Talent.yml id 257
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
   * 俊足（talent:cid:258 ↔ TALENT:258）
   * 源: yml/Talent.yml id 258
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
   * 独眼（talent:cid:259 ↔ TALENT:259）
   * 源: yml/Talent.yml id 259
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
   * 额头天眼（talent:cid:260 ↔ TALENT:260）
   * 源: yml/Talent.yml id 260
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
   * 史莱姆（talent:cid:261 ↔ TALENT:261）
   * 源: yml/Talent.yml id 261
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
   * 触手（talent:cid:262 ↔ TALENT:262）
   * 源: yml/Talent.yml id 262
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
   * 小人体型（talent:cid:263 ↔ TALENT:263）
   * 源: yml/Talent.yml id 263
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
   * 角（talent:cid:264 ↔ TALENT:264）
   * 源: yml/Talent.yml id 264
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
   * 使役（talent:cid:265 ↔ TALENT:265）
   * 源: yml/Talent.yml id 265
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
   * 私处封印（talent:cid:273 ↔ TALENT:273）
   * 源: yml/Talent.yml id 273
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
   * 火之能力者（talent:cid:275 ↔ TALENT:275）
   * 源: yml/Talent.yml id 275
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
   * 冰之能力者（talent:cid:276 ↔ TALENT:276）
   * 源: yml/Talent.yml id 276
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
   * 雷之能力者（talent:cid:277 ↔ TALENT:277）
   * 源: yml/Talent.yml id 277
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
   * 光之能力者（talent:cid:278 ↔ TALENT:278）
   * 源: yml/Talent.yml id 278
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
   * 暗之能力者（talent:cid:279 ↔ TALENT:279）
   * 源: yml/Talent.yml id 279
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
   * 冒渎者（talent:cid:282 ↔ TALENT:282）
   * 源: yml/Talent.yml id 282
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
   * 担保人（talent:cid:290 ↔ TALENT:290）
   * 源: yml/Talent.yml id 290
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
   * 初心者（talent:cid:291 ↔ TALENT:291）
   * 源: yml/Talent.yml id 291
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
   * 头发颜色（talent:cid:300 ↔ TALENT:300）
   * 源: yml/Talent.yml id 300
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
   * 头发状态（talent:cid:301 ↔ TALENT:301）
   * 源: yml/Talent.yml id 301
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
   * 头发长度（talent:cid:302 ↔ TALENT:302）
   * 源: yml/Talent.yml id 302
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
   * 头发修剪方式（talent:cid:303 ↔ TALENT:303）
   * 源: yml/Talent.yml id 303
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
   * 发型（talent:cid:304 ↔ TALENT:304）
   * 源: yml/Talent.yml id 304
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
   * 目（talent:cid:305 ↔ TALENT:305）
   * 源: yml/Talent.yml id 305
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
   * 瞳色（talent:cid:306 ↔ TALENT:306）
   * 源: yml/Talent.yml id 306
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
   * 唇（talent:cid:307 ↔ TALENT:307）
   * 源: yml/Talent.yml id 307
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
   * 体型（talent:cid:308 ↔ TALENT:308）
   * 源: yml/Talent.yml id 308
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
   * 乳头（talent:cid:309 ↔ TALENT:309）
   * 源: yml/Talent.yml id 309
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
   * 阴毛状态（talent:cid:310 ↔ TALENT:310）
   * 源: yml/Talent.yml id 310
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
   * 阴毛生长极限（talent:cid:311 ↔ TALENT:311）
   * 源: yml/Talent.yml id 311
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
   * 魅力点（talent:cid:312 ↔ TALENT:312）
   * 源: yml/Talent.yml id 312
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
   * 癖（talent:cid:313 ↔ TALENT:313）
   * 源: yml/Talent.yml id 313
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
   * 种族（talent:cid:314 ↔ TALENT:314）
   * 源: yml/Talent.yml id 314
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
   * 成为勇者前的生活（talent:cid:315 ↔ TALENT:315）
   * 源: yml/Talent.yml id 315
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
   * 成为勇者的契机（talent:cid:316 ↔ TALENT:316）
   * 源: yml/Talent.yml id 316
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
   * 喜欢的东西（talent:cid:317 ↔ TALENT:317）
   * 源: yml/Talent.yml id 317
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
   * 阴茎的状态（talent:cid:318 ↔ TALENT:318）
   * 源: yml/Talent.yml id 318
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
   * 种族2（talent:cid:319 ↔ TALENT:319）
   * 源: yml/Talent.yml id 319
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
   * 家族构成（talent:cid:320 ↔ TALENT:320）
   * 源: yml/Talent.yml id 320
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
   * 原种族（talent:cid:321 ↔ TALENT:321）
   * 源: yml/Talent.yml id 321
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
   * 现种族（talent:cid:322 ↔ TALENT:322）
   * 源: yml/Talent.yml id 322
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
   * 乳内妊娠（talent:cid:341 ↔ TALENT:341）
   * 源: yml/Talent.yml id 341
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
   * 精巢妊娠（talent:cid:342 ↔ TALENT:342）
   * 源: yml/Talent.yml id 342
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
   * 肛内妊娠（talent:cid:343 ↔ TALENT:343）
   * 源: yml/Talent.yml id 343
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
   * 口内妊娠（talent:cid:344 ↔ TALENT:344）
   * 源: yml/Talent.yml id 344
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
   * 粘液捕获（talent:cid:471 ↔ TALENT:471）
   * 源: yml/Talent.yml id 471
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
   * 落穴捕获（talent:cid:472 ↔ TALENT:472）
   * 源: yml/Talent.yml id 472
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
   * 藤蔓捕获（talent:cid:473 ↔ TALENT:473）
   * 源: yml/Talent.yml id 473
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
   * 铠破坏（talent:cid:474 ↔ TALENT:474）
   * 源: yml/Talent.yml id 474
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
   * 再生（talent:cid:476 ↔ TALENT:476）
   * 源: yml/Talent.yml id 476
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
   * 迷惑（talent:cid:478 ↔ TALENT:478）
   * 源: yml/Talent.yml id 478
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
   * 吐息（talent:cid:479 ↔ TALENT:479）
   * 源: yml/Talent.yml id 479
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
   * 诱惑（talent:cid:481 ↔ TALENT:481）
   * 源: yml/Talent.yml id 481
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
   * 魔力吸取（talent:cid:485 ↔ TALENT:485）
   * 源: yml/Talent.yml id 485
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
   * 百合气质（abl:cid:22 ↔ ABL:22）
   * 源: yml/Abl.yml id 22
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
   * 生育经验（exp:cid:60 ↔ EXP:60）
   * 源: yml/Exp.yml id 60
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
   * 异种妊娠经验（exp:cid:62 ↔ EXP:62）
   * 源: yml/Exp.yml id 62
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
