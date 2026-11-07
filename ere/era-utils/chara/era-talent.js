// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`talent:${this.id}:${param}`) || 0;
}

class EraTalent {
  /**
   * 处女
   * @returns {number}
   */
  get "virgin"() {
    return era['raw']().data['talent'][this.id][0];
  }
  /**
   * 处女
   * @param {number} v
   */
  set "virgin"(v) {
    era['raw']().data['talent'][this.id][0] = v;
  }
  /**
   * 童贞
   * @returns {number}
   */
  get "male_virgin"() {
    return era['raw']().data['talent'][this.id][1];
  }
  /**
   * 童贞
   * @param {number} v
   */
  set "male_virgin"(v) {
    era['raw']().data['talent'][this.id][1] = v;
  }
  /**
   * 狂王替身
   * @returns {number}
   */
  get "crazylord_double"() {
    return era['raw']().data['talent'][this.id][2];
  }
  /**
   * 狂王替身
   * @param {number} v
   */
  set "crazylord_double"(v) {
    era['raw']().data['talent'][this.id][2] = v;
  }
  /**
   * 崩坏
   * @returns {number}
   */
  get "breakdown"() {
    return era['raw']().data['talent'][this.id][9];
  }
  /**
   * 崩坏
   * @param {number} v
   */
  set "breakdown"(v) {
    era['raw']().data['talent'][this.id][9] = v;
  }
  /**
   * 胆怯
   * @returns {number}
   */
  get "timidity"() {
    return era['raw']().data['talent'][this.id][10];
  }
  /**
   * 胆怯
   * @param {number} v
   */
  set "timidity"(v) {
    era['raw']().data['talent'][this.id][10] = v;
  }
  /**
   * 反抗心
   * @returns {number}
   */
  get "rebellious"() {
    return era['raw']().data['talent'][this.id][11];
  }
  /**
   * 反抗心
   * @param {number} v
   */
  set "rebellious"(v) {
    era['raw']().data['talent'][this.id][11] = v;
  }
  /**
   * 刚强
   * @returns {number}
   */
  get "firm"() {
    return era['raw']().data['talent'][this.id][12];
  }
  /**
   * 刚强
   * @param {number} v
   */
  set "firm"(v) {
    era['raw']().data['talent'][this.id][12] = v;
  }
  /**
   * 坦率
   * @returns {number}
   */
  get "frank"() {
    return era['raw']().data['talent'][this.id][13];
  }
  /**
   * 坦率
   * @param {number} v
   */
  set "frank"(v) {
    era['raw']().data['talent'][this.id][13] = v;
  }
  /**
   * 文静
   * @returns {number}
   */
  get "quiet"() {
    return era['raw']().data['talent'][this.id][14];
  }
  /**
   * 文静
   * @param {number} v
   */
  set "quiet"(v) {
    era['raw']().data['talent'][this.id][14] = v;
  }
  /**
   * 高姿态
   * @returns {number}
   */
  get "arrogant"() {
    return era['raw']().data['talent'][this.id][15];
  }
  /**
   * 高姿态
   * @param {number} v
   */
  set "arrogant"(v) {
    era['raw']().data['talent'][this.id][15] = v;
  }
  /**
   * 嚣张
   * @returns {number}
   */
  get "insolent"() {
    return era['raw']().data['talent'][this.id][16];
  }
  /**
   * 嚣张
   * @param {number} v
   */
  set "insolent"(v) {
    era['raw']().data['talent'][this.id][16] = v;
  }
  /**
   * 低姿态
   * @returns {number}
   */
  get "humble"() {
    return era['raw']().data['talent'][this.id][17];
  }
  /**
   * 低姿态
   * @param {number} v
   */
  set "humble"(v) {
    era['raw']().data['talent'][this.id][17] = v;
  }
  /**
   * 傲娇
   * @returns {number}
   */
  get "tsundere"() {
    return era['raw']().data['talent'][this.id][18];
  }
  /**
   * 傲娇
   * @param {number} v
   */
  set "tsundere"(v) {
    era['raw']().data['talent'][this.id][18] = v;
  }
  /**
   * 克制
   * @returns {number}
   */
  get "restrained"() {
    return era['raw']().data['talent'][this.id][20];
  }
  /**
   * 克制
   * @param {number} v
   */
  set "restrained"(v) {
    era['raw']().data['talent'][this.id][20] = v;
  }
  /**
   * 冷漠
   * @returns {number}
   */
  get "cold"() {
    return era['raw']().data['talent'][this.id][21];
  }
  /**
   * 冷漠
   * @param {number} v
   */
  set "cold"(v) {
    era['raw']().data['talent'][this.id][21] = v;
  }
  /**
   * 感情淡薄
   * @returns {number}
   */
  get "apathetic"() {
    return era['raw']().data['talent'][this.id][22];
  }
  /**
   * 感情淡薄
   * @param {number} v
   */
  set "apathetic"(v) {
    era['raw']().data['talent'][this.id][22] = v;
  }
  /**
   * 好奇心
   * @returns {number}
   */
  get "curious"() {
    return era['raw']().data['talent'][this.id][23];
  }
  /**
   * 好奇心
   * @param {number} v
   */
  set "curious"(v) {
    era['raw']().data['talent'][this.id][23] = v;
  }
  /**
   * 保守的
   * @returns {number}
   */
  get "conservative"() {
    return era['raw']().data['talent'][this.id][24];
  }
  /**
   * 保守的
   * @param {number} v
   */
  set "conservative"(v) {
    era['raw']().data['talent'][this.id][24] = v;
  }
  /**
   * 乐观的
   * @returns {number}
   */
  get "optimistic"() {
    return era['raw']().data['talent'][this.id][25];
  }
  /**
   * 乐观的
   * @param {number} v
   */
  set "optimistic"(v) {
    era['raw']().data['talent'][this.id][25] = v;
  }
  /**
   * 悲观的
   * @returns {number}
   */
  get "pessimistic"() {
    return era['raw']().data['talent'][this.id][26];
  }
  /**
   * 悲观的
   * @param {number} v
   */
  set "pessimistic"(v) {
    era['raw']().data['talent'][this.id][26] = v;
  }
  /**
   * 戒备森严
   * @returns {number}
   */
  get "wary"() {
    return era['raw']().data['talent'][this.id][27];
  }
  /**
   * 戒备森严
   * @param {number} v
   */
  set "wary"(v) {
    era['raw']().data['talent'][this.id][27] = v;
  }
  /**
   * 爱表现
   * @returns {number}
   */
  get "attention_seeker"() {
    return era['raw']().data['talent'][this.id][28];
  }
  /**
   * 爱表现
   * @param {number} v
   */
  set "attention_seeker"(v) {
    era['raw']().data['talent'][this.id][28] = v;
  }
  /**
   * 看重贞操
   * @returns {number}
   */
  get "values_chastity"() {
    return era['raw']().data['talent'][this.id][30];
  }
  /**
   * 看重贞操
   * @param {number} v
   */
  set "values_chastity"(v) {
    era['raw']().data['talent'][this.id][30] = v;
  }
  /**
   * 看轻贞操
   * @returns {number}
   */
  get "scorns_chastity"() {
    return era['raw']().data['talent'][this.id][31];
  }
  /**
   * 看轻贞操
   * @param {number} v
   */
  set "scorns_chastity"(v) {
    era['raw']().data['talent'][this.id][31] = v;
  }
  /**
   * 压抑
   * @returns {number}
   */
  get "repressed"() {
    return era['raw']().data['talent'][this.id][32];
  }
  /**
   * 压抑
   * @param {number} v
   */
  set "repressed"(v) {
    era['raw']().data['talent'][this.id][32] = v;
  }
  /**
   * 开放
   * @returns {number}
   */
  get "open_minded"() {
    return era['raw']().data['talent'][this.id][33];
  }
  /**
   * 开放
   * @param {number} v
   */
  set "open_minded"(v) {
    era['raw']().data['talent'][this.id][33] = v;
  }
  /**
   * 抵抗
   * @returns {number}
   */
  get "resistant"() {
    return era['raw']().data['talent'][this.id][34];
  }
  /**
   * 抵抗
   * @param {number} v
   */
  set "resistant"(v) {
    era['raw']().data['talent'][this.id][34] = v;
  }
  /**
   * 害羞
   * @returns {number}
   */
  get "shy"() {
    return era['raw']().data['talent'][this.id][35];
  }
  /**
   * 害羞
   * @param {number} v
   */
  set "shy"(v) {
    era['raw']().data['talent'][this.id][35] = v;
  }
  /**
   * 不知羞耻
   * @returns {number}
   */
  get "shameless"() {
    return era['raw']().data['talent'][this.id][36];
  }
  /**
   * 不知羞耻
   * @param {number} v
   */
  set "shameless"(v) {
    era['raw']().data['talent'][this.id][36] = v;
  }
  /**
   * 把柄
   * @returns {number}
   */
  get "leverage"() {
    return era['raw']().data['talent'][this.id][37];
  }
  /**
   * 把柄
   * @param {number} v
   */
  set "leverage"(v) {
    era['raw']().data['talent'][this.id][37] = v;
  }
  /**
   * 害怕疼痛
   * @returns {number}
   */
  get "fears_pain"() {
    return era['raw']().data['talent'][this.id][40];
  }
  /**
   * 害怕疼痛
   * @param {number} v
   */
  set "fears_pain"(v) {
    era['raw']().data['talent'][this.id][40] = v;
  }
  /**
   * 不惧疼痛
   * @returns {number}
   */
  get "ignores_pain"() {
    return era['raw']().data['talent'][this.id][41];
  }
  /**
   * 不惧疼痛
   * @param {number} v
   */
  set "ignores_pain"(v) {
    era['raw']().data['talent'][this.id][41] = v;
  }
  /**
   * 容易湿
   * @returns {number}
   */
  get "easily_wet"() {
    return era['raw']().data['talent'][this.id][42];
  }
  /**
   * 容易湿
   * @param {number} v
   */
  set "easily_wet"(v) {
    era['raw']().data['talent'][this.id][42] = v;
  }
  /**
   * 不易湿
   * @returns {number}
   */
  get "hardly_wet"() {
    return era['raw']().data['talent'][this.id][43];
  }
  /**
   * 不易湿
   * @param {number} v
   */
  set "hardly_wet"(v) {
    era['raw']().data['talent'][this.id][43] = v;
  }
  /**
   * 爱哭鬼
   * @returns {number}
   */
  get "crybaby"() {
    return era['raw']().data['talent'][this.id][44];
  }
  /**
   * 爱哭鬼
   * @param {number} v
   */
  set "crybaby"(v) {
    era['raw']().data['talent'][this.id][44] = v;
  }
  /**
   * 不哭泣
   * @returns {number}
   */
  get "never_cries"() {
    return era['raw']().data['talent'][this.id][45];
  }
  /**
   * 不哭泣
   * @param {number} v
   */
  set "never_cries"(v) {
    era['raw']().data['talent'][this.id][45] = v;
  }
  /**
   * 药物上瘾
   * @returns {number}
   */
  get "drug_addict"() {
    return era['raw']().data['talent'][this.id][46];
  }
  /**
   * 药物上瘾
   * @param {number} v
   */
  set "drug_addict"(v) {
    era['raw']().data['talent'][this.id][46] = v;
  }
  /**
   * 喜欢精液
   * @returns {number}
   */
  get "loves_semen"() {
    return era['raw']().data['talent'][this.id][47];
  }
  /**
   * 喜欢精液
   * @param {number} v
   */
  set "loves_semen"(v) {
    era['raw']().data['talent'][this.id][47] = v;
  }
  /**
   * 眼镜
   * @returns {number}
   */
  get "glasses"() {
    return era['raw']().data['talent'][this.id][48];
  }
  /**
   * 眼镜
   * @param {number} v
   */
  set "glasses"(v) {
    era['raw']().data['talent'][this.id][48] = v;
  }
  /**
   * 快速学习
   * @returns {number}
   */
  get "fast_learner"() {
    return era['raw']().data['talent'][this.id][50];
  }
  /**
   * 快速学习
   * @param {number} v
   */
  set "fast_learner"(v) {
    era['raw']().data['talent'][this.id][50] = v;
  }
  /**
   * 学习缓慢
   * @returns {number}
   */
  get "slow_learner"() {
    return era['raw']().data['talent'][this.id][51];
  }
  /**
   * 学习缓慢
   * @param {number} v
   */
  set "slow_learner"(v) {
    era['raw']().data['talent'][this.id][51] = v;
  }
  /**
   * 擅用舌头
   * @returns {number}
   */
  get "skilled_tongue"() {
    return era['raw']().data['talent'][this.id][52];
  }
  /**
   * 擅用舌头
   * @param {number} v
   */
  set "skilled_tongue"(v) {
    era['raw']().data['talent'][this.id][52] = v;
  }
  /**
   * 调合知识
   * @returns {number}
   */
  get "mixing_knowledge"() {
    return era['raw']().data['talent'][this.id][55];
  }
  /**
   * 调合知识
   * @param {number} v
   */
  set "mixing_knowledge"(v) {
    era['raw']().data['talent'][this.id][55] = v;
  }
  /**
   * 抗药性
   * @returns {number}
   */
  get "drug_resistance"() {
    return era['raw']().data['talent'][this.id][56];
  }
  /**
   * 抗药性
   * @param {number} v
   */
  set "drug_resistance"(v) {
    era['raw']().data['talent'][this.id][56] = v;
  }
  /**
   * 漏尿癖
   * @returns {number}
   */
  get "incontinence_fetish"() {
    return era['raw']().data['talent'][this.id][57];
  }
  /**
   * 漏尿癖
   * @param {number} v
   */
  set "incontinence_fetish"(v) {
    era['raw']().data['talent'][this.id][57] = v;
  }
  /**
   * 容易自慰
   * @returns {number}
   */
  get "prone_masturbation"() {
    return era['raw']().data['talent'][this.id][60];
  }
  /**
   * 容易自慰
   * @param {number} v
   */
  set "prone_masturbation"(v) {
    era['raw']().data['talent'][this.id][60] = v;
  }
  /**
   * 不怕污臭
   * @returns {number}
   */
  get "tolerates_stench"() {
    return era['raw']().data['talent'][this.id][61];
  }
  /**
   * 不怕污臭
   * @param {number} v
   */
  set "tolerates_stench"(v) {
    era['raw']().data['talent'][this.id][61] = v;
  }
  /**
   * 反感污臭
   * @returns {number}
   */
  get "hates_stench"() {
    return era['raw']().data['talent'][this.id][62];
  }
  /**
   * 反感污臭
   * @param {number} v
   */
  set "hates_stench"(v) {
    era['raw']().data['talent'][this.id][62] = v;
  }
  /**
   * 献身的
   * @returns {number}
   */
  get "devoted"() {
    return era['raw']().data['talent'][this.id][63];
  }
  /**
   * 献身的
   * @param {number} v
   */
  set "devoted"(v) {
    era['raw']().data['talent'][this.id][63] = v;
  }
  /**
   * 不怕脏
   * @returns {number}
   */
  get "tolerates_dirt"() {
    return era['raw']().data['talent'][this.id][64];
  }
  /**
   * 不怕脏
   * @param {number} v
   */
  set "tolerates_dirt"(v) {
    era['raw']().data['talent'][this.id][64] = v;
  }
  /**
   * 抵抗诱惑
   * @returns {number}
   */
  get "resists_temptation"() {
    return era['raw']().data['talent'][this.id][69];
  }
  /**
   * 抵抗诱惑
   * @param {number} v
   */
  set "resists_temptation"(v) {
    era['raw']().data['talent'][this.id][69] = v;
  }
  /**
   * 接受快感
   * @returns {number}
   */
  get "accepts_pleasure"() {
    return era['raw']().data['talent'][this.id][70];
  }
  /**
   * 接受快感
   * @param {number} v
   */
  set "accepts_pleasure"(v) {
    era['raw']().data['talent'][this.id][70] = v;
  }
  /**
   * 否定快感
   * @returns {number}
   */
  get "denies_pleasure"() {
    return era['raw']().data['talent'][this.id][71];
  }
  /**
   * 否定快感
   * @param {number} v
   */
  set "denies_pleasure"(v) {
    era['raw']().data['talent'][this.id][71] = v;
  }
  /**
   * 容易上瘾
   * @returns {number}
   */
  get "prone_addiction"() {
    return era['raw']().data['talent'][this.id][72];
  }
  /**
   * 容易上瘾
   * @param {number} v
   */
  set "prone_addiction"(v) {
    era['raw']().data['talent'][this.id][72] = v;
  }
  /**
   * 容易陷落
   * @returns {number}
   */
  get "easily_falls"() {
    return era['raw']().data['talent'][this.id][73];
  }
  /**
   * 容易陷落
   * @param {number} v
   */
  set "easily_falls"(v) {
    era['raw']().data['talent'][this.id][73] = v;
  }
  /**
   * 自慰狂
   * @returns {number}
   */
  get "masturbation_maniac"() {
    return era['raw']().data['talent'][this.id][74];
  }
  /**
   * 自慰狂
   * @param {number} v
   */
  set "masturbation_maniac"(v) {
    era['raw']().data['talent'][this.id][74] = v;
  }
  /**
   * 性爱狂
   * @returns {number}
   */
  get "sex_maniac"() {
    return era['raw']().data['talent'][this.id][75];
  }
  /**
   * 性爱狂
   * @param {number} v
   */
  set "sex_maniac"(v) {
    era['raw']().data['talent'][this.id][75] = v;
  }
  /**
   * 淫乱
   * @returns {number}
   */
  get "lewd"() {
    return era['raw']().data['talent'][this.id][76];
  }
  /**
   * 淫乱
   * @param {number} v
   */
  set "lewd"(v) {
    era['raw']().data['talent'][this.id][76] = v;
  }
  /**
   * 尻穴狂
   * @returns {number}
   */
  get "anal_maniac"() {
    return era['raw']().data['talent'][this.id][77];
  }
  /**
   * 尻穴狂
   * @param {number} v
   */
  set "anal_maniac"(v) {
    era['raw']().data['talent'][this.id][77] = v;
  }
  /**
   * 弄乳狂
   * @returns {number}
   */
  get "breast_maniac"() {
    return era['raw']().data['talent'][this.id][78];
  }
  /**
   * 弄乳狂
   * @param {number} v
   */
  set "breast_maniac"(v) {
    era['raw']().data['talent'][this.id][78] = v;
  }
  /**
   * 男人婆
   * @returns {number}
   */
  get "tomboy"() {
    return era['raw']().data['talent'][this.id][79];
  }
  /**
   * 男人婆
   * @param {number} v
   */
  set "tomboy"(v) {
    era['raw']().data['talent'][this.id][79] = v;
  }
  /**
   * 倒错的
   * @returns {number}
   */
  get "perverted"() {
    return era['raw']().data['talent'][this.id][80];
  }
  /**
   * 倒错的
   * @param {number} v
   */
  set "perverted"(v) {
    era['raw']().data['talent'][this.id][80] = v;
  }
  /**
   * 双性恋
   * @returns {number}
   */
  get "bisexual"() {
    return era['raw']().data['talent'][this.id][81];
  }
  /**
   * 双性恋
   * @param {number} v
   */
  set "bisexual"(v) {
    era['raw']().data['talent'][this.id][81] = v;
  }
  /**
   * 讨厌男人
   * @returns {number}
   */
  get "hates_men"() {
    return era['raw']().data['talent'][this.id][82];
  }
  /**
   * 讨厌男人
   * @param {number} v
   */
  set "hates_men"(v) {
    era['raw']().data['talent'][this.id][82] = v;
  }
  /**
   * 施虐狂
   * @returns {number}
   */
  get "sadist"() {
    return era['raw']().data['talent'][this.id][83];
  }
  /**
   * 施虐狂
   * @param {number} v
   */
  set "sadist"(v) {
    era['raw']().data['talent'][this.id][83] = v;
  }
  /**
   * 嫉妒
   * @returns {number}
   */
  get "jealous"() {
    return era['raw']().data['talent'][this.id][84];
  }
  /**
   * 嫉妒
   * @param {number} v
   */
  set "jealous"(v) {
    era['raw']().data['talent'][this.id][84] = v;
  }
  /**
   * 爱慕
   * @returns {number}
   */
  get "in_love"() {
    return era['raw']().data['talent'][this.id][85];
  }
  /**
   * 爱慕
   * @param {number} v
   */
  set "in_love"(v) {
    era['raw']().data['talent'][this.id][85] = v;
  }
  /**
   * 盲从
   * @returns {number}
   */
  get "blindly_obedient"() {
    return era['raw']().data['talent'][this.id][86];
  }
  /**
   * 盲从
   * @param {number} v
   */
  set "blindly_obedient"(v) {
    era['raw']().data['talent'][this.id][86] = v;
  }
  /**
   * 小恶魔
   * @returns {number}
   */
  get "little_devil"() {
    return era['raw']().data['talent'][this.id][87];
  }
  /**
   * 小恶魔
   * @param {number} v
   */
  set "little_devil"(v) {
    era['raw']().data['talent'][this.id][87] = v;
  }
  /**
   * 受虐狂
   * @returns {number}
   */
  get "masochist"() {
    return era['raw']().data['talent'][this.id][88];
  }
  /**
   * 受虐狂
   * @param {number} v
   */
  set "masochist"(v) {
    era['raw']().data['talent'][this.id][88] = v;
  }
  /**
   * 露出狂
   * @returns {number}
   */
  get "exhibitionist"() {
    return era['raw']().data['talent'][this.id][89];
  }
  /**
   * 露出狂
   * @param {number} v
   */
  set "exhibitionist"(v) {
    era['raw']().data['talent'][this.id][89] = v;
  }
  /**
   * 魅惑
   * @returns {number}
   */
  get "charming"() {
    return era['raw']().data['talent'][this.id][91];
  }
  /**
   * 魅惑
   * @param {number} v
   */
  set "charming"(v) {
    era['raw']().data['talent'][this.id][91] = v;
  }
  /**
   * 谜之魅力
   * @returns {number}
   */
  get "mysterious_charm"() {
    return era['raw']().data['talent'][this.id][92];
  }
  /**
   * 谜之魅力
   * @param {number} v
   */
  set "mysterious_charm"(v) {
    era['raw']().data['talent'][this.id][92] = v;
  }
  /**
   * 威压感
   * @returns {number}
   */
  get "intimidating"() {
    return era['raw']().data['talent'][this.id][93];
  }
  /**
   * 威压感
   * @param {number} v
   */
  set "intimidating"(v) {
    era['raw']().data['talent'][this.id][93] = v;
  }
  /**
   * 魁梧
   * @returns {number}
   */
  get "burly"() {
    return era['raw']().data['talent'][this.id][99];
  }
  /**
   * 魁梧
   * @param {number} v
   */
  set "burly"(v) {
    era['raw']().data['talent'][this.id][99] = v;
  }
  /**
   * 娇小
   * @returns {number}
   */
  get "petite"() {
    return era['raw']().data['talent'][this.id][100];
  }
  /**
   * 娇小
   * @param {number} v
   */
  set "petite"(v) {
    era['raw']().data['talent'][this.id][100] = v;
  }
  /**
   * 阴蒂钝感
   * @returns {number}
   */
  get "dull_clitoris"() {
    return era['raw']().data['talent'][this.id][101];
  }
  /**
   * 阴蒂钝感
   * @param {number} v
   */
  set "dull_clitoris"(v) {
    era['raw']().data['talent'][this.id][101] = v;
  }
  /**
   * 阴蒂敏感
   * @returns {number}
   */
  get "sensitive_clitoris"() {
    return era['raw']().data['talent'][this.id][102];
  }
  /**
   * 阴蒂敏感
   * @param {number} v
   */
  set "sensitive_clitoris"(v) {
    era['raw']().data['talent'][this.id][102] = v;
  }
  /**
   * 私处钝感
   * @returns {number}
   */
  get "dull_vagina"() {
    return era['raw']().data['talent'][this.id][103];
  }
  /**
   * 私处钝感
   * @param {number} v
   */
  set "dull_vagina"(v) {
    era['raw']().data['talent'][this.id][103] = v;
  }
  /**
   * 私处敏感
   * @returns {number}
   */
  get "sensitive_vagina"() {
    return era['raw']().data['talent'][this.id][104];
  }
  /**
   * 私处敏感
   * @param {number} v
   */
  set "sensitive_vagina"(v) {
    era['raw']().data['talent'][this.id][104] = v;
  }
  /**
   * 肛门钝感
   * @returns {number}
   */
  get "dull_anus"() {
    return era['raw']().data['talent'][this.id][105];
  }
  /**
   * 肛门钝感
   * @param {number} v
   */
  set "dull_anus"(v) {
    era['raw']().data['talent'][this.id][105] = v;
  }
  /**
   * 肛门敏感
   * @returns {number}
   */
  get "sensitive_anus"() {
    return era['raw']().data['talent'][this.id][106];
  }
  /**
   * 肛门敏感
   * @param {number} v
   */
  set "sensitive_anus"(v) {
    era['raw']().data['talent'][this.id][106] = v;
  }
  /**
   * 乳房钝感
   * @returns {number}
   */
  get "dull_breast"() {
    return era['raw']().data['talent'][this.id][107];
  }
  /**
   * 乳房钝感
   * @param {number} v
   */
  set "dull_breast"(v) {
    era['raw']().data['talent'][this.id][107] = v;
  }
  /**
   * 乳房敏感
   * @returns {number}
   */
  get "sensitive_breast"() {
    return era['raw']().data['talent'][this.id][108];
  }
  /**
   * 乳房敏感
   * @param {number} v
   */
  set "sensitive_breast"(v) {
    era['raw']().data['talent'][this.id][108] = v;
  }
  /**
   * 贫乳
   * @returns {number}
   */
  get "small_breasts"() {
    return era['raw']().data['talent'][this.id][109];
  }
  /**
   * 贫乳
   * @param {number} v
   */
  set "small_breasts"(v) {
    era['raw']().data['talent'][this.id][109] = v;
  }
  /**
   * 巨乳
   * @returns {number}
   */
  get "large_breasts"() {
    return era['raw']().data['talent'][this.id][110];
  }
  /**
   * 巨乳
   * @param {number} v
   */
  set "large_breasts"(v) {
    era['raw']().data['talent'][this.id][110] = v;
  }
  /**
   * 快速回复
   * @returns {number}
   */
  get "fast_recovery"() {
    return era['raw']().data['talent'][this.id][111];
  }
  /**
   * 快速回复
   * @param {number} v
   */
  set "fast_recovery"(v) {
    era['raw']().data['talent'][this.id][111] = v;
  }
  /**
   * 回复缓慢
   * @returns {number}
   */
  get "slow_recovery"() {
    return era['raw']().data['talent'][this.id][112];
  }
  /**
   * 回复缓慢
   * @param {number} v
   */
  set "slow_recovery"(v) {
    era['raw']().data['talent'][this.id][112] = v;
  }
  /**
   * 魅力
   * @returns {number}
   */
  get "charisma"() {
    return era['raw']().data['talent'][this.id][113];
  }
  /**
   * 魅力
   * @param {number} v
   */
  set "charisma"(v) {
    era['raw']().data['talent'][this.id][113] = v;
  }
  /**
   * 爆乳
   * @returns {number}
   */
  get "huge_breasts"() {
    return era['raw']().data['talent'][this.id][114];
  }
  /**
   * 爆乳
   * @param {number} v
   */
  set "huge_breasts"(v) {
    era['raw']().data['talent'][this.id][114] = v;
  }
  /**
   * 肥胖
   * @returns {number}
   */
  get "obese"() {
    return era['raw']().data['talent'][this.id][115];
  }
  /**
   * 肥胖
   * @param {number} v
   */
  set "obese"(v) {
    era['raw']().data['talent'][this.id][115] = v;
  }
  /**
   * 绝壁
   * @returns {number}
   */
  get "flat_chest"() {
    return era['raw']().data['talent'][this.id][116];
  }
  /**
   * 绝壁
   * @param {number} v
   */
  set "flat_chest"(v) {
    era['raw']().data['talent'][this.id][116] = v;
  }
  /**
   * 治疗
   * @returns {number}
   */
  get "healing"() {
    return era['raw']().data['talent'][this.id][117];
  }
  /**
   * 治疗
   * @param {number} v
   */
  set "healing"(v) {
    era['raw']().data['talent'][this.id][117] = v;
  }
  /**
   * 鼓舞
   * @returns {number}
   */
  get "inspiring"() {
    return era['raw']().data['talent'][this.id][118];
  }
  /**
   * 鼓舞
   * @param {number} v
   */
  set "inspiring"(v) {
    era['raw']().data['talent'][this.id][118] = v;
  }
  /**
   * 超乳
   * @returns {number}
   */
  get "massive_breasts"() {
    return era['raw']().data['talent'][this.id][119];
  }
  /**
   * 超乳
   * @param {number} v
   */
  set "massive_breasts"(v) {
    era['raw']().data['talent'][this.id][119] = v;
  }
  /**
   * 扶她
   * @returns {number}
   */
  get "futanari"() {
    return era['raw']().data['talent'][this.id][121];
  }
  /**
   * 扶她
   * @param {number} v
   */
  set "futanari"(v) {
    era['raw']().data['talent'][this.id][121] = v;
  }
  /**
   * 男人
   * @returns {number}
   */
  get "male"() {
    return era['raw']().data['talent'][this.id][122];
  }
  /**
   * 男人
   * @param {number} v
   */
  set "male"(v) {
    era['raw']().data['talent'][this.id][122] = v;
  }
  /**
   * 疯狂
   * @returns {number}
   */
  get "madness"() {
    return era['raw']().data['talent'][this.id][123];
  }
  /**
   * 疯狂
   * @param {number} v
   */
  set "madness"(v) {
    era['raw']().data['talent'][this.id][123] = v;
  }
  /**
   * 动物耳朵
   * @returns {number}
   */
  get "animal_ears"() {
    return era['raw']().data['talent'][this.id][124];
  }
  /**
   * 动物耳朵
   * @param {number} v
   */
  set "animal_ears"(v) {
    era['raw']().data['talent'][this.id][124] = v;
  }
  /**
   * 白虎
   * @returns {number}
   */
  get "hairless"() {
    return era['raw']().data['talent'][this.id][125];
  }
  /**
   * 白虎
   * @param {number} v
   */
  set "hairless"(v) {
    era['raw']().data['talent'][this.id][125] = v;
  }
  /**
   * 高人气
   * @returns {number}
   */
  get "popular"() {
    return era['raw']().data['talent'][this.id][126];
  }
  /**
   * 高人气
   * @param {number} v
   */
  set "popular"(v) {
    era['raw']().data['talent'][this.id][126] = v;
  }
  /**
   * 逆袭
   * @returns {number}
   */
  get "counterattack"() {
    return era['raw']().data['talent'][this.id][127];
  }
  /**
   * 逆袭
   * @param {number} v
   */
  set "counterattack"(v) {
    era['raw']().data['talent'][this.id][127] = v;
  }
  /**
   * 母乳体质
   * @returns {number}
   */
  get "lactation_body"() {
    return era['raw']().data['talent'][this.id][130];
  }
  /**
   * 母乳体质
   * @param {number} v
   */
  set "lactation_body"(v) {
    era['raw']().data['talent'][this.id][130] = v;
  }
  /**
   * 幼儿退行
   * @returns {number}
   */
  get "regression"() {
    return era['raw']().data['talent'][this.id][131];
  }
  /**
   * 幼儿退行
   * @param {number} v
   */
  set "regression"(v) {
    era['raw']().data['talent'][this.id][131] = v;
  }
  /**
   * 幼稚
   * @returns {number}
   */
  get "childish"() {
    return era['raw']().data['talent'][this.id][132];
  }
  /**
   * 幼稚
   * @param {number} v
   */
  set "childish"(v) {
    era['raw']().data['talent'][this.id][132] = v;
  }
  /**
   * 早泄
   * @returns {number}
   */
  get "premature"() {
    return era['raw']().data['talent'][this.id][133];
  }
  /**
   * 早泄
   * @param {number} v
   */
  set "premature"(v) {
    era['raw']().data['talent'][this.id][133] = v;
  }
  /**
   * 软弱
   * @returns {number}
   */
  get "weak"() {
    return era['raw']().data['talent'][this.id][134];
  }
  /**
   * 软弱
   * @param {number} v
   */
  set "weak"(v) {
    era['raw']().data['talent'][this.id][134] = v;
  }
  /**
   * 未熟
   * @returns {number}
   */
  get "immature"() {
    return era['raw']().data['talent'][this.id][135];
  }
  /**
   * 未熟
   * @param {number} v
   */
  set "immature"(v) {
    era['raw']().data['talent'][this.id][135] = v;
  }
  /**
   * 牝犬
   * @returns {number}
   */
  get "bitch"() {
    return era['raw']().data['talent'][this.id][136];
  }
  /**
   * 牝犬
   * @param {number} v
   */
  set "bitch"(v) {
    era['raw']().data['talent'][this.id][136] = v;
  }
  /**
   * 兽类
   * @returns {number}
   */
  get "beast"() {
    return era['raw']().data['talent'][this.id][137];
  }
  /**
   * 兽类
   * @param {number} v
   */
  set "beast"(v) {
    era['raw']().data['talent'][this.id][137] = v;
  }
  /**
   * 恋母情结
   * @returns {number}
   */
  get "mother_complex"() {
    return era['raw']().data['talent'][this.id][140];
  }
  /**
   * 恋母情结
   * @param {number} v
   */
  set "mother_complex"(v) {
    era['raw']().data['talent'][this.id][140] = v;
  }
  /**
   * 恋父情结
   * @returns {number}
   */
  get "father_complex"() {
    return era['raw']().data['talent'][this.id][141];
  }
  /**
   * 恋父情结
   * @param {number} v
   */
  set "father_complex"(v) {
    era['raw']().data['talent'][this.id][141] = v;
  }
  /**
   * 萝莉控
   * @returns {number}
   */
  get "lolicon"() {
    return era['raw']().data['talent'][this.id][142];
  }
  /**
   * 萝莉控
   * @param {number} v
   */
  set "lolicon"(v) {
    era['raw']().data['talent'][this.id][142] = v;
  }
  /**
   * 正太控
   * @returns {number}
   */
  get "shotacon"() {
    return era['raw']().data['talent'][this.id][143];
  }
  /**
   * 正太控
   * @param {number} v
   */
  set "shotacon"(v) {
    era['raw']().data['talent'][this.id][143] = v;
  }
  /**
   * 从不自慰
   * @returns {number}
   */
  get "never_masturbates"() {
    return era['raw']().data['talent'][this.id][150];
  }
  /**
   * 从不自慰
   * @param {number} v
   */
  set "never_masturbates"(v) {
    era['raw']().data['talent'][this.id][150] = v;
  }
  /**
   * 绝不侍奉
   * @returns {number}
   */
  get "never_serves"() {
    return era['raw']().data['talent'][this.id][151];
  }
  /**
   * 绝不侍奉
   * @param {number} v
   */
  set "never_serves"(v) {
    era['raw']().data['talent'][this.id][151] = v;
  }
  /**
   * 不受洗脑
   * @returns {number}
   */
  get "resists_brainwash"() {
    return era['raw']().data['talent'][this.id][152];
  }
  /**
   * 不受洗脑
   * @param {number} v
   */
  set "resists_brainwash"(v) {
    era['raw']().data['talent'][this.id][152] = v;
  }
  /**
   * 妊娠
   * @returns {number}
   */
  get "pregnant"() {
    return era['raw']().data['talent'][this.id][153];
  }
  /**
   * 妊娠
   * @param {number} v
   */
  set "pregnant"(v) {
    era['raw']().data['talent'][this.id][153] = v;
  }
  /**
   * 育儿中
   * @returns {number}
   */
  get "nursing_child"() {
    return era['raw']().data['talent'][this.id][154];
  }
  /**
   * 育儿中
   * @param {number} v
   */
  set "nursing_child"(v) {
    era['raw']().data['talent'][this.id][154] = v;
  }
  /**
   * 母性
   * @returns {number}
   */
  get "maternal"() {
    return era['raw']().data['talent'][this.id][155];
  }
  /**
   * 母性
   * @param {number} v
   */
  set "maternal"(v) {
    era['raw']().data['talent'][this.id][155] = v;
  }
  /**
   * 父性
   * @returns {number}
   */
  get "paternal"() {
    return era['raw']().data['talent'][this.id][156];
  }
  /**
   * 父性
   * @param {number} v
   */
  set "paternal"(v) {
    era['raw']().data['talent'][this.id][156] = v;
  }
  /**
   * 人妻
   * @returns {number}
   */
  get "married_woman"() {
    return era['raw']().data['talent'][this.id][157];
  }
  /**
   * 人妻
   * @param {number} v
   */
  set "married_woman"(v) {
    era['raw']().data['talent'][this.id][157] = v;
  }
  /**
   * 同族不育
   * @returns {number}
   */
  get "infertile_with_kin"() {
    return era['raw']().data['talent'][this.id][158];
  }
  /**
   * 同族不育
   * @param {number} v
   */
  set "infertile_with_kin"(v) {
    era['raw']().data['talent'][this.id][158] = v;
  }
  /**
   * 异种婚姻
   * @returns {number}
   */
  get "interspecies_marriage"() {
    return era['raw']().data['talent'][this.id][159];
  }
  /**
   * 异种婚姻
   * @param {number} v
   */
  set "interspecies_marriage"(v) {
    era['raw']().data['talent'][this.id][159] = v;
  }
  /**
   * 慈爱
   * @returns {number}
   */
  get "affectionate"() {
    return era['raw']().data['talent'][this.id][160];
  }
  /**
   * 慈爱
   * @param {number} v
   */
  set "affectionate"(v) {
    era['raw']().data['talent'][this.id][160] = v;
  }
  /**
   * 自信家
   * @returns {number}
   */
  get "confident"() {
    return era['raw']().data['talent'][this.id][161];
  }
  /**
   * 自信家
   * @param {number} v
   */
  set "confident"(v) {
    era['raw']().data['talent'][this.id][161] = v;
  }
  /**
   * 懦弱
   * @returns {number}
   */
  get "cowardly"() {
    return era['raw']().data['talent'][this.id][162];
  }
  /**
   * 懦弱
   * @param {number} v
   */
  set "cowardly"(v) {
    era['raw']().data['talent'][this.id][162] = v;
  }
  /**
   * 高贵
   * @returns {number}
   */
  get "noble"() {
    return era['raw']().data['talent'][this.id][163];
  }
  /**
   * 高贵
   * @param {number} v
   */
  set "noble"(v) {
    era['raw']().data['talent'][this.id][163] = v;
  }
  /**
   * 冷静
   * @returns {number}
   */
  get "calm"() {
    return era['raw']().data['talent'][this.id][164];
  }
  /**
   * 冷静
   * @param {number} v
   */
  set "calm"(v) {
    era['raw']().data['talent'][this.id][164] = v;
  }
  /**
   * 村娘ａ
   * @returns {number}
   */
  get "village_girl_a"() {
    return era['raw']().data['talent'][this.id][165];
  }
  /**
   * 村娘ａ
   * @param {number} v
   */
  set "village_girl_a"(v) {
    era['raw']().data['talent'][this.id][165] = v;
  }
  /**
   * 恶女
   * @returns {number}
   */
  get "evil_woman"() {
    return era['raw']().data['talent'][this.id][166];
  }
  /**
   * 恶女
   * @param {number} v
   */
  set "evil_woman"(v) {
    era['raw']().data['talent'][this.id][166] = v;
  }
  /**
   * 金红桃
   * @returns {number}
   */
  get "gold_heart"() {
    return era['raw']().data['talent'][this.id][167];
  }
  /**
   * 金红桃
   * @param {number} v
   */
  set "gold_heart"(v) {
    era['raw']().data['talent'][this.id][167] = v;
  }
  /**
   * 银黑桃
   * @returns {number}
   */
  get "silver_spade"() {
    return era['raw']().data['talent'][this.id][168];
  }
  /**
   * 银黑桃
   * @param {number} v
   */
  set "silver_spade"(v) {
    era['raw']().data['talent'][this.id][168] = v;
  }
  /**
   * 黑方片
   * @returns {number}
   */
  get "black_diamond"() {
    return era['raw']().data['talent'][this.id][169];
  }
  /**
   * 黑方片
   * @param {number} v
   */
  set "black_diamond"(v) {
    era['raw']().data['talent'][this.id][169] = v;
  }
  /**
   * 白梅花
   * @returns {number}
   */
  get "white_club"() {
    return era['raw']().data['talent'][this.id][170];
  }
  /**
   * 白梅花
   * @param {number} v
   */
  set "white_club"(v) {
    era['raw']().data['talent'][this.id][170] = v;
  }
  /**
   * 村娘ｂ
   * @returns {number}
   */
  get "village_girl_b"() {
    return era['raw']().data['talent'][this.id][171];
  }
  /**
   * 村娘ｂ
   * @param {number} v
   */
  set "village_girl_b"(v) {
    era['raw']().data['talent'][this.id][171] = v;
  }
  /**
   * 智慧
   * @returns {number}
   */
  get "wise"() {
    return era['raw']().data['talent'][this.id][172];
  }
  /**
   * 智慧
   * @param {number} v
   */
  set "wise"(v) {
    era['raw']().data['talent'][this.id][172] = v;
  }
  /**
   * 庇护者
   * @returns {number}
   */
  get "protector"() {
    return era['raw']().data['talent'][this.id][173];
  }
  /**
   * 庇护者
   * @param {number} v
   */
  set "protector"(v) {
    era['raw']().data['talent'][this.id][173] = v;
  }
  /**
   * 贵公子
   * @returns {number}
   */
  get "noble_son"() {
    return era['raw']().data['talent'][this.id][174];
  }
  /**
   * 贵公子
   * @param {number} v
   */
  set "noble_son"(v) {
    era['raw']().data['talent'][this.id][174] = v;
  }
  /**
   * 伶俐
   * @returns {number}
   */
  get "clever"() {
    return era['raw']().data['talent'][this.id][175];
  }
  /**
   * 伶俐
   * @param {number} v
   */
  set "clever"(v) {
    era['raw']().data['talent'][this.id][175] = v;
  }
  /**
   * 菲娅（旧口上）
   * @returns {number}
   */
  get "fia_legacy_kojo"() {
    return era['raw']().data['talent'][this.id][179];
  }
  /**
   * 菲娅（旧口上）
   * @param {number} v
   */
  set "fia_legacy_kojo"(v) {
    era['raw']().data['talent'][this.id][179] = v;
  }
  /**
   * 妓女
   * @returns {number}
   */
  get "prostitute"() {
    return era['raw']().data['talent'][this.id][180];
  }
  /**
   * 妓女
   * @param {number} v
   */
  set "prostitute"(v) {
    era['raw']().data['talent'][this.id][180] = v;
  }
  /**
   * 倾城
   * @returns {number}
   */
  get "courtesan"() {
    return era['raw']().data['talent'][this.id][181];
  }
  /**
   * 倾城
   * @param {number} v
   */
  set "courtesan"(v) {
    era['raw']().data['talent'][this.id][181] = v;
  }
  /**
   * 巧言
   * @returns {number}
   */
  get "silver_tongue"() {
    return era['raw']().data['talent'][this.id][182];
  }
  /**
   * 巧言
   * @param {number} v
   */
  set "silver_tongue"(v) {
    era['raw']().data['talent'][this.id][182] = v;
  }
  /**
   * 有常客
   * @returns {number}
   */
  get "has_regular_guest"() {
    return era['raw']().data['talent'][this.id][183];
  }
  /**
   * 有常客
   * @param {number} v
   */
  set "has_regular_guest"(v) {
    era['raw']().data['talent'][this.id][183] = v;
  }
  /**
   * 求爱
   * @returns {number}
   */
  get "seeking_love"() {
    return era['raw']().data['talent'][this.id][184];
  }
  /**
   * 求爱
   * @param {number} v
   */
  set "seeking_love"(v) {
    era['raw']().data['talent'][this.id][184] = v;
  }
  /**
   * 歌姫
   * @returns {number}
   */
  get "songstress"() {
    return era['raw']().data['talent'][this.id][185];
  }
  /**
   * 歌姫
   * @param {number} v
   */
  set "songstress"(v) {
    era['raw']().data['talent'][this.id][185] = v;
  }
  /**
   * 舞姫
   * @returns {number}
   */
  get "dancer"() {
    return era['raw']().data['talent'][this.id][186];
  }
  /**
   * 舞姫
   * @param {number} v
   */
  set "dancer"(v) {
    era['raw']().data['talent'][this.id][186] = v;
  }
  /**
   * 美姫
   * @returns {number}
   */
  get "beauty"() {
    return era['raw']().data['talent'][this.id][187];
  }
  /**
   * 美姫
   * @param {number} v
   */
  set "beauty"(v) {
    era['raw']().data['talent'][this.id][187] = v;
  }
  /**
   * 斗姬
   * @returns {number}
   */
  get "battle_lady"() {
    return era['raw']().data['talent'][this.id][188];
  }
  /**
   * 斗姬
   * @param {number} v
   */
  set "battle_lady"(v) {
    era['raw']().data['talent'][this.id][188] = v;
  }
  /**
   * 私处产卵
   * @returns {number}
   */
  get "vagina_spawn"() {
    return era['raw']().data['talent'][this.id][190];
  }
  /**
   * 私处产卵
   * @param {number} v
   */
  set "vagina_spawn"(v) {
    era['raw']().data['talent'][this.id][190] = v;
  }
  /**
   * 直肠产卵
   * @returns {number}
   */
  get "rectal_spawn"() {
    return era['raw']().data['talent'][this.id][191];
  }
  /**
   * 直肠产卵
   * @param {number} v
   */
  set "rectal_spawn"(v) {
    era['raw']().data['talent'][this.id][191] = v;
  }
  /**
   * 蠕虫
   * @returns {number}
   */
  get "worm"() {
    return era['raw']().data['talent'][this.id][192];
  }
  /**
   * 蠕虫
   * @param {number} v
   */
  set "worm"(v) {
    era['raw']().data['talent'][this.id][192] = v;
  }
  /**
   * 肛门虫
   * @returns {number}
   */
  get "anal_worm"() {
    return era['raw']().data['talent'][this.id][193];
  }
  /**
   * 肛门虫
   * @param {number} v
   */
  set "anal_worm"(v) {
    era['raw']().data['talent'][this.id][193] = v;
  }
  /**
   * 战士
   * @returns {number}
   */
  get "warrior"() {
    return era['raw']().data['talent'][this.id][200];
  }
  /**
   * 战士
   * @param {number} v
   */
  set "warrior"(v) {
    era['raw']().data['talent'][this.id][200] = v;
  }
  /**
   * 魔法师
   * @returns {number}
   */
  get "mage"() {
    return era['raw']().data['talent'][this.id][201];
  }
  /**
   * 魔法师
   * @param {number} v
   */
  set "mage"(v) {
    era['raw']().data['talent'][this.id][201] = v;
  }
  /**
   * 神官
   * @returns {number}
   */
  get "priest"() {
    return era['raw']().data['talent'][this.id][202];
  }
  /**
   * 神官
   * @param {number} v
   */
  set "priest"(v) {
    era['raw']().data['talent'][this.id][202] = v;
  }
  /**
   * 盗贼
   * @returns {number}
   */
  get "thief"() {
    return era['raw']().data['talent'][this.id][203];
  }
  /**
   * 盗贼
   * @param {number} v
   */
  set "thief"(v) {
    era['raw']().data['talent'][this.id][203] = v;
  }
  /**
   * 肉便器
   * @returns {number}
   */
  get "cum_dump"() {
    return era['raw']().data['talent'][this.id][204];
  }
  /**
   * 肉便器
   * @param {number} v
   */
  set "cum_dump"(v) {
    era['raw']().data['talent'][this.id][204] = v;
  }
  /**
   * 骑士
   * @returns {number}
   */
  get "knight"() {
    return era['raw']().data['talent'][this.id][205];
  }
  /**
   * 骑士
   * @param {number} v
   */
  set "knight"(v) {
    era['raw']().data['talent'][this.id][205] = v;
  }
  /**
   * 巫女
   * @returns {number}
   */
  get "shrine_maiden"() {
    return era['raw']().data['talent'][this.id][206];
  }
  /**
   * 巫女
   * @param {number} v
   */
  set "shrine_maiden"(v) {
    era['raw']().data['talent'][this.id][206] = v;
  }
  /**
   * 忍者
   * @returns {number}
   */
  get "ninja"() {
    return era['raw']().data['talent'][this.id][207];
  }
  /**
   * 忍者
   * @param {number} v
   */
  set "ninja"(v) {
    era['raw']().data['talent'][this.id][207] = v;
  }
  /**
   * 弓手
   * @returns {number}
   */
  get "archer"() {
    return era['raw']().data['talent'][this.id][208];
  }
  /**
   * 弓手
   * @param {number} v
   */
  set "archer"(v) {
    era['raw']().data['talent'][this.id][208] = v;
  }
  /**
   * 苗床
   * @returns {number}
   */
  get "breeding_bed"() {
    return era['raw']().data['talent'][this.id][209];
  }
  /**
   * 苗床
   * @param {number} v
   */
  set "breeding_bed"(v) {
    era['raw']().data['talent'][this.id][209] = v;
  }
  /**
   * 魔界将军
   * @returns {number}
   */
  get "demon_general"() {
    return era['raw']().data['talent'][this.id][210];
  }
  /**
   * 魔界将军
   * @param {number} v
   */
  set "demon_general"(v) {
    era['raw']().data['talent'][this.id][210] = v;
  }
  /**
   * 魔导神官
   * @returns {number}
   */
  get "sorcerer_priest"() {
    return era['raw']().data['talent'][this.id][211];
  }
  /**
   * 魔导神官
   * @param {number} v
   */
  set "sorcerer_priest"(v) {
    era['raw']().data['talent'][this.id][211] = v;
  }
  /**
   * 魔物使
   * @returns {number}
   */
  get "monster_tamer"() {
    return era['raw']().data['talent'][this.id][212];
  }
  /**
   * 魔物使
   * @param {number} v
   */
  set "monster_tamer"(v) {
    era['raw']().data['talent'][this.id][212] = v;
  }
  /**
   * 精英
   * @returns {number}
   */
  get "elite"() {
    return era['raw']().data['talent'][this.id][220];
  }
  /**
   * 精英
   * @param {number} v
   */
  set "elite"(v) {
    era['raw']().data['talent'][this.id][220] = v;
  }
  /**
   * 淫核
   * @returns {number}
   */
  get "lewd_clitoris"() {
    return era['raw']().data['talent'][this.id][230];
  }
  /**
   * 淫核
   * @param {number} v
   */
  set "lewd_clitoris"(v) {
    era['raw']().data['talent'][this.id][230] = v;
  }
  /**
   * 淫乳
   * @returns {number}
   */
  get "lewd_breasts"() {
    return era['raw']().data['talent'][this.id][231];
  }
  /**
   * 淫乳
   * @param {number} v
   */
  set "lewd_breasts"(v) {
    era['raw']().data['talent'][this.id][231] = v;
  }
  /**
   * 淫壶
   * @returns {number}
   */
  get "lewd_vagina"() {
    return era['raw']().data['talent'][this.id][232];
  }
  /**
   * 淫壶
   * @param {number} v
   */
  set "lewd_vagina"(v) {
    era['raw']().data['talent'][this.id][232] = v;
  }
  /**
   * 淫肛
   * @returns {number}
   */
  get "lewd_anus"() {
    return era['raw']().data['talent'][this.id][233];
  }
  /**
   * 淫肛
   * @param {number} v
   */
  set "lewd_anus"(v) {
    era['raw']().data['talent'][this.id][233] = v;
  }
  /**
   * 战术
   * @returns {number}
   */
  get "tactics"() {
    return era['raw']().data['talent'][this.id][240];
  }
  /**
   * 战术
   * @param {number} v
   */
  set "tactics"(v) {
    era['raw']().data['talent'][this.id][240] = v;
  }
  /**
   * 魔术
   * @returns {number}
   */
  get "sorcery"() {
    return era['raw']().data['talent'][this.id][241];
  }
  /**
   * 魔术
   * @param {number} v
   */
  set "sorcery"(v) {
    era['raw']().data['talent'][this.id][241] = v;
  }
  /**
   * 法术
   * @returns {number}
   */
  get "spellcraft"() {
    return era['raw']().data['talent'][this.id][242];
  }
  /**
   * 法术
   * @param {number} v
   */
  set "spellcraft"(v) {
    era['raw']().data['talent'][this.id][242] = v;
  }
  /**
   * 奇袭
   * @returns {number}
   */
  get "surprise_attack"() {
    return era['raw']().data['talent'][this.id][243];
  }
  /**
   * 奇袭
   * @param {number} v
   */
  set "surprise_attack"(v) {
    era['raw']().data['talent'][this.id][243] = v;
  }
  /**
   * 恶魔肌肤
   * @returns {number}
   */
  get "demon_skin"() {
    return era['raw']().data['talent'][this.id][244];
  }
  /**
   * 恶魔肌肤
   * @param {number} v
   */
  set "demon_skin"(v) {
    era['raw']().data['talent'][this.id][244] = v;
  }
  /**
   * 恶魔翅膀
   * @returns {number}
   */
  get "demon_wings"() {
    return era['raw']().data['talent'][this.id][245];
  }
  /**
   * 恶魔翅膀
   * @param {number} v
   */
  set "demon_wings"(v) {
    era['raw']().data['talent'][this.id][245] = v;
  }
  /**
   * 恶魔尾巴
   * @returns {number}
   */
  get "demon_tail"() {
    return era['raw']().data['talent'][this.id][246];
  }
  /**
   * 恶魔尾巴
   * @param {number} v
   */
  set "demon_tail"(v) {
    era['raw']().data['talent'][this.id][246] = v;
  }
  /**
   * 恶魔眼睛
   * @returns {number}
   */
  get "demon_eyes"() {
    return era['raw']().data['talent'][this.id][247];
  }
  /**
   * 恶魔眼睛
   * @param {number} v
   */
  set "demon_eyes"(v) {
    era['raw']().data['talent'][this.id][247] = v;
  }
  /**
   * 肌肉型
   * @returns {number}
   */
  get "muscular"() {
    return era['raw']().data['talent'][this.id][248];
  }
  /**
   * 肌肉型
   * @param {number} v
   */
  set "muscular"(v) {
    era['raw']().data['talent'][this.id][248] = v;
  }
  /**
   * 铁壁
   * @returns {number}
   */
  get "iron_wall"() {
    return era['raw']().data['talent'][this.id][249];
  }
  /**
   * 铁壁
   * @param {number} v
   */
  set "iron_wall"(v) {
    era['raw']().data['talent'][this.id][249] = v;
  }
  /**
   * 咒术
   * @returns {number}
   */
  get "curse_magic"() {
    return era['raw']().data['talent'][this.id][250];
  }
  /**
   * 咒术
   * @param {number} v
   */
  set "curse_magic"(v) {
    era['raw']().data['talent'][this.id][250] = v;
  }
  /**
   * 忍术
   * @returns {number}
   */
  get "ninjutsu"() {
    return era['raw']().data['talent'][this.id][251];
  }
  /**
   * 忍术
   * @param {number} v
   */
  set "ninjutsu"(v) {
    era['raw']().data['talent'][this.id][251] = v;
  }
  /**
   * 先制
   * @returns {number}
   */
  get "initiative"() {
    return era['raw']().data['talent'][this.id][252];
  }
  /**
   * 先制
   * @param {number} v
   */
  set "initiative"(v) {
    era['raw']().data['talent'][this.id][252] = v;
  }
  /**
   * 褐色肌肤
   * @returns {number}
   */
  get "tanned_skin"() {
    return era['raw']().data['talent'][this.id][253];
  }
  /**
   * 褐色肌肤
   * @param {number} v
   */
  set "tanned_skin"(v) {
    era['raw']().data['talent'][this.id][253] = v;
  }
  /**
   * 魔之刻印
   * @returns {number}
   */
  get "demon_seal"() {
    return era['raw']().data['talent'][this.id][254];
  }
  /**
   * 魔之刻印
   * @param {number} v
   */
  set "demon_seal"(v) {
    era['raw']().data['talent'][this.id][254] = v;
  }
  /**
   * 白皙
   * @returns {number}
   */
  get "pale_skin"() {
    return era['raw']().data['talent'][this.id][255];
  }
  /**
   * 白皙
   * @param {number} v
   */
  set "pale_skin"(v) {
    era['raw']().data['talent'][this.id][255] = v;
  }
  /**
   * 虚弱
   * @returns {number}
   */
  get "frail"() {
    return era['raw']().data['talent'][this.id][256];
  }
  /**
   * 虚弱
   * @param {number} v
   */
  set "frail"(v) {
    era['raw']().data['talent'][this.id][256] = v;
  }
  /**
   * 魔法耐性
   * @returns {number}
   */
  get "magic_resistance"() {
    return era['raw']().data['talent'][this.id][257];
  }
  /**
   * 魔法耐性
   * @param {number} v
   */
  set "magic_resistance"(v) {
    era['raw']().data['talent'][this.id][257] = v;
  }
  /**
   * 俊足
   * @returns {number}
   */
  get "swift"() {
    return era['raw']().data['talent'][this.id][258];
  }
  /**
   * 俊足
   * @param {number} v
   */
  set "swift"(v) {
    era['raw']().data['talent'][this.id][258] = v;
  }
  /**
   * 独眼
   * @returns {number}
   */
  get "one_eyed"() {
    return era['raw']().data['talent'][this.id][259];
  }
  /**
   * 独眼
   * @param {number} v
   */
  set "one_eyed"(v) {
    era['raw']().data['talent'][this.id][259] = v;
  }
  /**
   * 额头天眼
   * @returns {number}
   */
  get "forehead_eye"() {
    return era['raw']().data['talent'][this.id][260];
  }
  /**
   * 额头天眼
   * @param {number} v
   */
  set "forehead_eye"(v) {
    era['raw']().data['talent'][this.id][260] = v;
  }
  /**
   * 史莱姆
   * @returns {number}
   */
  get "slime_body"() {
    return era['raw']().data['talent'][this.id][261];
  }
  /**
   * 史莱姆
   * @param {number} v
   */
  set "slime_body"(v) {
    era['raw']().data['talent'][this.id][261] = v;
  }
  /**
   * 触手
   * @returns {number}
   */
  get "tentacle_body"() {
    return era['raw']().data['talent'][this.id][262];
  }
  /**
   * 触手
   * @param {number} v
   */
  set "tentacle_body"(v) {
    era['raw']().data['talent'][this.id][262] = v;
  }
  /**
   * 小人体型
   * @returns {number}
   */
  get "tiny_body"() {
    return era['raw']().data['talent'][this.id][263];
  }
  /**
   * 小人体型
   * @param {number} v
   */
  set "tiny_body"(v) {
    era['raw']().data['talent'][this.id][263] = v;
  }
  /**
   * 角
   * @returns {number}
   */
  get "horns"() {
    return era['raw']().data['talent'][this.id][264];
  }
  /**
   * 角
   * @param {number} v
   */
  set "horns"(v) {
    era['raw']().data['talent'][this.id][264] = v;
  }
  /**
   * 使役
   * @returns {number}
   */
  get "beast_command"() {
    return era['raw']().data['talent'][this.id][265];
  }
  /**
   * 使役
   * @param {number} v
   */
  set "beast_command"(v) {
    era['raw']().data['talent'][this.id][265] = v;
  }
  /**
   * 时常发情
   * @returns {number}
   */
  get "always_aroused"() {
    return era['raw']().data['talent'][this.id][271];
  }
  /**
   * 时常发情
   * @param {number} v
   */
  set "always_aroused"(v) {
    era['raw']().data['talent'][this.id][271] = v;
  }
  /**
   * 性豪
   * @returns {number}
   */
  get "sex_expert"() {
    return era['raw']().data['talent'][this.id][272];
  }
  /**
   * 性豪
   * @param {number} v
   */
  set "sex_expert"(v) {
    era['raw']().data['talent'][this.id][272] = v;
  }
  /**
   * 私处封印
   * @returns {number}
   */
  get "vagina_seal"() {
    return era['raw']().data['talent'][this.id][273];
  }
  /**
   * 私处封印
   * @param {number} v
   */
  set "vagina_seal"(v) {
    era['raw']().data['talent'][this.id][273] = v;
  }
  /**
   * 魂缚
   * @returns {number}
   */
  get "soul_bind"() {
    return era['raw']().data['talent'][this.id][274];
  }
  /**
   * 魂缚
   * @param {number} v
   */
  set "soul_bind"(v) {
    era['raw']().data['talent'][this.id][274] = v;
  }
  /**
   * 火之能力者
   * @returns {number}
   */
  get "fire_affinity"() {
    return era['raw']().data['talent'][this.id][275];
  }
  /**
   * 火之能力者
   * @param {number} v
   */
  set "fire_affinity"(v) {
    era['raw']().data['talent'][this.id][275] = v;
  }
  /**
   * 冰之能力者
   * @returns {number}
   */
  get "ice_affinity"() {
    return era['raw']().data['talent'][this.id][276];
  }
  /**
   * 冰之能力者
   * @param {number} v
   */
  set "ice_affinity"(v) {
    era['raw']().data['talent'][this.id][276] = v;
  }
  /**
   * 雷之能力者
   * @returns {number}
   */
  get "thunder_affinity"() {
    return era['raw']().data['talent'][this.id][277];
  }
  /**
   * 雷之能力者
   * @param {number} v
   */
  set "thunder_affinity"(v) {
    era['raw']().data['talent'][this.id][277] = v;
  }
  /**
   * 光之能力者
   * @returns {number}
   */
  get "light_affinity"() {
    return era['raw']().data['talent'][this.id][278];
  }
  /**
   * 光之能力者
   * @param {number} v
   */
  set "light_affinity"(v) {
    era['raw']().data['talent'][this.id][278] = v;
  }
  /**
   * 暗之能力者
   * @returns {number}
   */
  get "dark_affinity"() {
    return era['raw']().data['talent'][this.id][279];
  }
  /**
   * 暗之能力者
   * @param {number} v
   */
  set "dark_affinity"(v) {
    era['raw']().data['talent'][this.id][279] = v;
  }
  /**
   * 狂王俘虏
   * @returns {number}
   */
  get "crazylord_captive"() {
    return era['raw']().data['talent'][this.id][280];
  }
  /**
   * 狂王俘虏
   * @param {number} v
   */
  set "crazylord_captive"(v) {
    era['raw']().data['talent'][this.id][280] = v;
  }
  /**
   * 常识改变【战斗】
   * @returns {number}
   */
  get "common_sense_battle"() {
    return era['raw']().data['talent'][this.id][281];
  }
  /**
   * 常识改变【战斗】
   * @param {number} v
   */
  set "common_sense_battle"(v) {
    era['raw']().data['talent'][this.id][281] = v;
  }
  /**
   * 冒渎者
   * @returns {number}
   */
  get "blasphemer"() {
    return era['raw']().data['talent'][this.id][282];
  }
  /**
   * 冒渎者
   * @param {number} v
   */
  set "blasphemer"(v) {
    era['raw']().data['talent'][this.id][282] = v;
  }
  /**
   * 常识改变【日常】
   * @returns {number}
   */
  get "common_sense_daily"() {
    return era['raw']().data['talent'][this.id][283];
  }
  /**
   * 常识改变【日常】
   * @param {number} v
   */
  set "common_sense_daily"(v) {
    era['raw']().data['talent'][this.id][283] = v;
  }
  /**
   * 担保人
   * @returns {number}
   */
  get "guarantor"() {
    return era['raw']().data['talent'][this.id][290];
  }
  /**
   * 担保人
   * @param {number} v
   */
  set "guarantor"(v) {
    era['raw']().data['talent'][this.id][290] = v;
  }
  /**
   * 初心者
   * @returns {number}
   */
  get "beginner"() {
    return era['raw']().data['talent'][this.id][291];
  }
  /**
   * 初心者
   * @param {number} v
   */
  set "beginner"(v) {
    era['raw']().data['talent'][this.id][291] = v;
  }
  /**
   * 魔王之影
   * @returns {number}
   */
  get "demon_lord_shadow"() {
    return era['raw']().data['talent'][this.id][292];
  }
  /**
   * 魔王之影
   * @param {number} v
   */
  set "demon_lord_shadow"(v) {
    era['raw']().data['talent'][this.id][292] = v;
  }
  /**
   * 主从逆转
   * @returns {number}
   */
  get "master_slave_reversed"() {
    return era['raw']().data['talent'][this.id][293];
  }
  /**
   * 主从逆转
   * @param {number} v
   */
  set "master_slave_reversed"(v) {
    era['raw']().data['talent'][this.id][293] = v;
  }
  /**
   * 异种恋慕
   * @returns {number}
   */
  get "interspecies_love"() {
    return era['raw']().data['talent'][this.id][294];
  }
  /**
   * 异种恋慕
   * @param {number} v
   */
  set "interspecies_love"(v) {
    era['raw']().data['talent'][this.id][294] = v;
  }
  /**
   * 头发颜色
   * @returns {number}
   */
  get "hair_color"() {
    return era['raw']().data['talent'][this.id][300];
  }
  /**
   * 头发颜色
   * @param {number} v
   */
  set "hair_color"(v) {
    era['raw']().data['talent'][this.id][300] = v;
  }
  /**
   * 头发状态
   * @returns {number}
   */
  get "hair_state"() {
    return era['raw']().data['talent'][this.id][301];
  }
  /**
   * 头发状态
   * @param {number} v
   */
  set "hair_state"(v) {
    era['raw']().data['talent'][this.id][301] = v;
  }
  /**
   * 头发长度
   * @returns {number}
   */
  get "hair_length"() {
    return era['raw']().data['talent'][this.id][302];
  }
  /**
   * 头发长度
   * @param {number} v
   */
  set "hair_length"(v) {
    era['raw']().data['talent'][this.id][302] = v;
  }
  /**
   * 头发修剪方式
   * @returns {number}
   */
  get "hair_trim"() {
    return era['raw']().data['talent'][this.id][303];
  }
  /**
   * 头发修剪方式
   * @param {number} v
   */
  set "hair_trim"(v) {
    era['raw']().data['talent'][this.id][303] = v;
  }
  /**
   * 发型
   * @returns {number}
   */
  get "hair_style"() {
    return era['raw']().data['talent'][this.id][304];
  }
  /**
   * 发型
   * @param {number} v
   */
  set "hair_style"(v) {
    era['raw']().data['talent'][this.id][304] = v;
  }
  /**
   * 目
   * @returns {number}
   */
  get "eyes"() {
    return era['raw']().data['talent'][this.id][305];
  }
  /**
   * 目
   * @param {number} v
   */
  set "eyes"(v) {
    era['raw']().data['talent'][this.id][305] = v;
  }
  /**
   * 瞳色
   * @returns {number}
   */
  get "eye_color"() {
    return era['raw']().data['talent'][this.id][306];
  }
  /**
   * 瞳色
   * @param {number} v
   */
  set "eye_color"(v) {
    era['raw']().data['talent'][this.id][306] = v;
  }
  /**
   * 唇
   * @returns {number}
   */
  get "lips"() {
    return era['raw']().data['talent'][this.id][307];
  }
  /**
   * 唇
   * @param {number} v
   */
  set "lips"(v) {
    era['raw']().data['talent'][this.id][307] = v;
  }
  /**
   * 体型
   * @returns {number}
   */
  get "body_type"() {
    return era['raw']().data['talent'][this.id][308];
  }
  /**
   * 体型
   * @param {number} v
   */
  set "body_type"(v) {
    era['raw']().data['talent'][this.id][308] = v;
  }
  /**
   * 乳头
   * @returns {number}
   */
  get "nipples"() {
    return era['raw']().data['talent'][this.id][309];
  }
  /**
   * 乳头
   * @param {number} v
   */
  set "nipples"(v) {
    era['raw']().data['talent'][this.id][309] = v;
  }
  /**
   * 阴毛状态
   * @returns {number}
   */
  get "pubic_hair_state"() {
    return era['raw']().data['talent'][this.id][310];
  }
  /**
   * 阴毛状态
   * @param {number} v
   */
  set "pubic_hair_state"(v) {
    era['raw']().data['talent'][this.id][310] = v;
  }
  /**
   * 阴毛生长极限
   * @returns {number}
   */
  get "pubic_hair_limit"() {
    return era['raw']().data['talent'][this.id][311];
  }
  /**
   * 阴毛生长极限
   * @param {number} v
   */
  set "pubic_hair_limit"(v) {
    era['raw']().data['talent'][this.id][311] = v;
  }
  /**
   * 魅力点
   * @returns {number}
   */
  get "charm_points"() {
    return era['raw']().data['talent'][this.id][312];
  }
  /**
   * 魅力点
   * @param {number} v
   */
  set "charm_points"(v) {
    era['raw']().data['talent'][this.id][312] = v;
  }
  /**
   * 癖
   * @returns {number}
   */
  get "fetish"() {
    return era['raw']().data['talent'][this.id][313];
  }
  /**
   * 癖
   * @param {number} v
   */
  set "fetish"(v) {
    era['raw']().data['talent'][this.id][313] = v;
  }
  /**
   * 种族
   * @returns {number}
   */
  get "race"() {
    return era['raw']().data['talent'][this.id][314];
  }
  /**
   * 种族
   * @param {number} v
   */
  set "race"(v) {
    era['raw']().data['talent'][this.id][314] = v;
  }
  /**
   * 成为勇者前的生活
   * @returns {number}
   */
  get "pre_hero_life"() {
    return era['raw']().data['talent'][this.id][315];
  }
  /**
   * 成为勇者前的生活
   * @param {number} v
   */
  set "pre_hero_life"(v) {
    era['raw']().data['talent'][this.id][315] = v;
  }
  /**
   * 成为勇者的契机
   * @returns {number}
   */
  get "hero_trigger"() {
    return era['raw']().data['talent'][this.id][316];
  }
  /**
   * 成为勇者的契机
   * @param {number} v
   */
  set "hero_trigger"(v) {
    era['raw']().data['talent'][this.id][316] = v;
  }
  /**
   * 喜欢的东西
   * @returns {number}
   */
  get "favorite_thing"() {
    return era['raw']().data['talent'][this.id][317];
  }
  /**
   * 喜欢的东西
   * @param {number} v
   */
  set "favorite_thing"(v) {
    era['raw']().data['talent'][this.id][317] = v;
  }
  /**
   * 阴茎的状态
   * @returns {number}
   */
  get "penis_state"() {
    return era['raw']().data['talent'][this.id][318];
  }
  /**
   * 阴茎的状态
   * @param {number} v
   */
  set "penis_state"(v) {
    era['raw']().data['talent'][this.id][318] = v;
  }
  /**
   * 种族2
   * @returns {number}
   */
  get "secondary_race"() {
    return era['raw']().data['talent'][this.id][319];
  }
  /**
   * 种族2
   * @param {number} v
   */
  set "secondary_race"(v) {
    era['raw']().data['talent'][this.id][319] = v;
  }
  /**
   * 家族构成
   * @returns {number}
   */
  get "family_structure"() {
    return era['raw']().data['talent'][this.id][320];
  }
  /**
   * 家族构成
   * @param {number} v
   */
  set "family_structure"(v) {
    era['raw']().data['talent'][this.id][320] = v;
  }
  /**
   * 原种族
   * @returns {number}
   */
  get "original_race"() {
    return era['raw']().data['talent'][this.id][321];
  }
  /**
   * 原种族
   * @param {number} v
   */
  set "original_race"(v) {
    era['raw']().data['talent'][this.id][321] = v;
  }
  /**
   * 现种族
   * @returns {number}
   */
  get "current_race"() {
    return era['raw']().data['talent'][this.id][322];
  }
  /**
   * 现种族
   * @param {number} v
   */
  set "current_race"(v) {
    era['raw']().data['talent'][this.id][322] = v;
  }
  /**
   * 父亲种族
   * @returns {number}
   */
  get "father_race"() {
    return era['raw']().data['talent'][this.id][323];
  }
  /**
   * 父亲种族
   * @param {number} v
   */
  set "father_race"(v) {
    era['raw']().data['talent'][this.id][323] = v;
  }
  /**
   * 母亲种族
   * @returns {number}
   */
  get "mother_race"() {
    return era['raw']().data['talent'][this.id][324];
  }
  /**
   * 母亲种族
   * @param {number} v
   */
  set "mother_race"(v) {
    era['raw']().data['talent'][this.id][324] = v;
  }
  /**
   * 魔界知识
   * @returns {number}
   */
  get "demon_knowledge"() {
    return era['raw']().data['talent'][this.id][325];
  }
  /**
   * 魔界知识
   * @param {number} v
   */
  set "demon_knowledge"(v) {
    era['raw']().data['talent'][this.id][325] = v;
  }
  /**
   * 肉芽诅咒
   * @returns {number}
   */
  get "flesh_bud_curse"() {
    return era['raw']().data['talent'][this.id][326];
  }
  /**
   * 肉芽诅咒
   * @param {number} v
   */
  set "flesh_bud_curse"(v) {
    era['raw']().data['talent'][this.id][326] = v;
  }
  /**
   * 淫魔知识
   * @returns {number}
   */
  get "succubus_knowledge"() {
    return era['raw']().data['talent'][this.id][327];
  }
  /**
   * 淫魔知识
   * @param {number} v
   */
  set "succubus_knowledge"(v) {
    era['raw']().data['talent'][this.id][327] = v;
  }
  /**
   * 魔虫知识
   * @returns {number}
   */
  get "bug_knowledge"() {
    return era['raw']().data['talent'][this.id][328];
  }
  /**
   * 魔虫知识
   * @param {number} v
   */
  set "bug_knowledge"(v) {
    era['raw']().data['talent'][this.id][328] = v;
  }
  /**
   * 【造型王】
   * @returns {number}
   */
  get "stylist_king"() {
    return era['raw']().data['talent'][this.id][329];
  }
  /**
   * 【造型王】
   * @param {number} v
   */
  set "stylist_king"(v) {
    era['raw']().data['talent'][this.id][329] = v;
  }
  /**
   * 异常妊娠体质
   * @returns {number}
   */
  get "abnormal_pregnancy"() {
    return era['raw']().data['talent'][this.id][340];
  }
  /**
   * 异常妊娠体质
   * @param {number} v
   */
  set "abnormal_pregnancy"(v) {
    era['raw']().data['talent'][this.id][340] = v;
  }
  /**
   * 乳内妊娠
   * @returns {number}
   */
  get "breast_pregnancy"() {
    return era['raw']().data['talent'][this.id][341];
  }
  /**
   * 乳内妊娠
   * @param {number} v
   */
  set "breast_pregnancy"(v) {
    era['raw']().data['talent'][this.id][341] = v;
  }
  /**
   * 精巢妊娠
   * @returns {number}
   */
  get "testicle_pregnancy"() {
    return era['raw']().data['talent'][this.id][342];
  }
  /**
   * 精巢妊娠
   * @param {number} v
   */
  set "testicle_pregnancy"(v) {
    era['raw']().data['talent'][this.id][342] = v;
  }
  /**
   * 肛内妊娠
   * @returns {number}
   */
  get "anal_pregnancy"() {
    return era['raw']().data['talent'][this.id][343];
  }
  /**
   * 肛内妊娠
   * @param {number} v
   */
  set "anal_pregnancy"(v) {
    era['raw']().data['talent'][this.id][343] = v;
  }
  /**
   * 口内妊娠
   * @returns {number}
   */
  get "oral_pregnancy"() {
    return era['raw']().data['talent'][this.id][344];
  }
  /**
   * 口内妊娠
   * @param {number} v
   */
  set "oral_pregnancy"(v) {
    era['raw']().data['talent'][this.id][344] = v;
  }
  /**
   * 灭焰咒印
   * @returns {number}
   */
  get "flame_seal"() {
    return era['raw']().data['talent'][this.id][361];
  }
  /**
   * 灭焰咒印
   * @param {number} v
   */
  set "flame_seal"(v) {
    era['raw']().data['talent'][this.id][361] = v;
  }
  /**
   * 狂王
   * @returns {number}
   */
  get "crazylord"() {
    return era['raw']().data['talent'][this.id][399];
  }
  /**
   * 狂王
   * @param {number} v
   */
  set "crazylord"(v) {
    era['raw']().data['talent'][this.id][399] = v;
  }
  /**
   * 无
   * @returns {number}
   */
  get "none"() {
    return era['raw']().data['talent'][this.id][470];
  }
  /**
   * 无
   * @param {number} v
   */
  set "none"(v) {
    era['raw']().data['talent'][this.id][470] = v;
  }
  /**
   * 粘液捕获
   * @returns {number}
   */
  get "slime_capture"() {
    return era['raw']().data['talent'][this.id][471];
  }
  /**
   * 粘液捕获
   * @param {number} v
   */
  set "slime_capture"(v) {
    era['raw']().data['talent'][this.id][471] = v;
  }
  /**
   * 落穴捕获
   * @returns {number}
   */
  get "pit_capture"() {
    return era['raw']().data['talent'][this.id][472];
  }
  /**
   * 落穴捕获
   * @param {number} v
   */
  set "pit_capture"(v) {
    era['raw']().data['talent'][this.id][472] = v;
  }
  /**
   * 藤蔓捕获
   * @returns {number}
   */
  get "vine_capture"() {
    return era['raw']().data['talent'][this.id][473];
  }
  /**
   * 藤蔓捕获
   * @param {number} v
   */
  set "vine_capture"(v) {
    era['raw']().data['talent'][this.id][473] = v;
  }
  /**
   * 铠破坏
   * @returns {number}
   */
  get "armor_break"() {
    return era['raw']().data['talent'][this.id][474];
  }
  /**
   * 铠破坏
   * @param {number} v
   */
  set "armor_break"(v) {
    era['raw']().data['talent'][this.id][474] = v;
  }
  /**
   * 透明
   * @returns {number}
   */
  get "invisible"() {
    return era['raw']().data['talent'][this.id][475];
  }
  /**
   * 透明
   * @param {number} v
   */
  set "invisible"(v) {
    era['raw']().data['talent'][this.id][475] = v;
  }
  /**
   * 再生
   * @returns {number}
   */
  get "regenerate"() {
    return era['raw']().data['talent'][this.id][476];
  }
  /**
   * 再生
   * @param {number} v
   */
  set "regenerate"(v) {
    era['raw']().data['talent'][this.id][476] = v;
  }
  /**
   * 拟态
   * @returns {number}
   */
  get "mimicry"() {
    return era['raw']().data['talent'][this.id][477];
  }
  /**
   * 拟态
   * @param {number} v
   */
  set "mimicry"(v) {
    era['raw']().data['talent'][this.id][477] = v;
  }
  /**
   * 迷惑
   * @returns {number}
   */
  get "confuse"() {
    return era['raw']().data['talent'][this.id][478];
  }
  /**
   * 迷惑
   * @param {number} v
   */
  set "confuse"(v) {
    era['raw']().data['talent'][this.id][478] = v;
  }
  /**
   * 吐息
   * @returns {number}
   */
  get "breath"() {
    return era['raw']().data['talent'][this.id][479];
  }
  /**
   * 吐息
   * @param {number} v
   */
  set "breath"(v) {
    era['raw']().data['talent'][this.id][479] = v;
  }
  /**
   * 麻痹
   * @returns {number}
   */
  get "paralysis"() {
    return era['raw']().data['talent'][this.id][480];
  }
  /**
   * 麻痹
   * @param {number} v
   */
  set "paralysis"(v) {
    era['raw']().data['talent'][this.id][480] = v;
  }
  /**
   * 诱惑
   * @returns {number}
   */
  get "seduce"() {
    return era['raw']().data['talent'][this.id][481];
  }
  /**
   * 诱惑
   * @param {number} v
   */
  set "seduce"(v) {
    era['raw']().data['talent'][this.id][481] = v;
  }
  /**
   * 混乱
   * @returns {number}
   */
  get "chaos"() {
    return era['raw']().data['talent'][this.id][482];
  }
  /**
   * 混乱
   * @param {number} v
   */
  set "chaos"(v) {
    era['raw']().data['talent'][this.id][482] = v;
  }
  /**
   * 经验值吸取
   * @returns {number}
   */
  get "exp_drain"() {
    return era['raw']().data['talent'][this.id][483];
  }
  /**
   * 经验值吸取
   * @param {number} v
   */
  set "exp_drain"(v) {
    era['raw']().data['talent'][this.id][483] = v;
  }
  /**
   * 破铠吐息
   * @returns {number}
   */
  get "armor_break_breath"() {
    return era['raw']().data['talent'][this.id][484];
  }
  /**
   * 破铠吐息
   * @param {number} v
   */
  set "armor_break_breath"(v) {
    era['raw']().data['talent'][this.id][484] = v;
  }
  /**
   * 魔力吸取
   * @returns {number}
   */
  get "mana_drain"() {
    return era['raw']().data['talent'][this.id][485];
  }
  /**
   * 魔力吸取
   * @param {number} v
   */
  set "mana_drain"(v) {
    era['raw']().data['talent'][this.id][485] = v;
  }
  /**
   * 魔界公主
   * @returns {number}
   */
  get "demon_princess"() {
    return era['raw']().data['talent'][this.id][1254];
  }
  /**
   * 魔界公主
   * @param {number} v
   */
  set "demon_princess"(v) {
    era['raw']().data['talent'][this.id][1254] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`talent:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`talent:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraTalent;
// GENERATED END