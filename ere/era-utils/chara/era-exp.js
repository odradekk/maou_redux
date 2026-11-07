// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`exp:${this.id}:${param}`) || 0;
}

class EraExp {
  /**
   * 私处经验
   * @returns {number}
   */
  get "vagina_exp"() {
    return era['raw']().data['exp'][this.id][0];
  }
  /**
   * 私处经验
   * @param {number} v
   */
  set "vagina_exp"(v) {
    era['raw']().data['exp'][this.id][0] = v;
  }
  /**
   * 肛门经验
   * @returns {number}
   */
  get "anal_exp"() {
    return era['raw']().data['exp'][this.id][1];
  }
  /**
   * 肛门经验
   * @param {number} v
   */
  set "anal_exp"(v) {
    era['raw']().data['exp'][this.id][1] = v;
  }
  /**
   * 绝顶经验
   * @returns {number}
   */
  get "orgasm_exp"() {
    return era['raw']().data['exp'][this.id][2];
  }
  /**
   * 绝顶经验
   * @param {number} v
   */
  set "orgasm_exp"(v) {
    era['raw']().data['exp'][this.id][2] = v;
  }
  /**
   * 射精经验
   * @returns {number}
   */
  get "ejaculation_exp"() {
    return era['raw']().data['exp'][this.id][3];
  }
  /**
   * 射精经验
   * @param {number} v
   */
  set "ejaculation_exp"(v) {
    era['raw']().data['exp'][this.id][3] = v;
  }
  /**
   * 性交经验
   * @returns {number}
   */
  get "intercourse_exp"() {
    return era['raw']().data['exp'][this.id][5];
  }
  /**
   * 性交经验
   * @param {number} v
   */
  set "intercourse_exp"(v) {
    era['raw']().data['exp'][this.id][5] = v;
  }
  /**
   * 精饮绝顶经验
   * @returns {number}
   */
  get "semen_drink_orgasm_exp"() {
    return era['raw']().data['exp'][this.id][8];
  }
  /**
   * 精饮绝顶经验
   * @param {number} v
   */
  set "semen_drink_orgasm_exp"(v) {
    era['raw']().data['exp'][this.id][8] = v;
  }
  /**
   * 自慰经验
   * @returns {number}
   */
  get "masturbation_exp"() {
    return era['raw']().data['exp'][this.id][10];
  }
  /**
   * 自慰经验
   * @param {number} v
   */
  set "masturbation_exp"(v) {
    era['raw']().data['exp'][this.id][10] = v;
  }
  /**
   * 调教自慰经验
   * @returns {number}
   */
  get "trained_masturbation_exp"() {
    return era['raw']().data['exp'][this.id][11];
  }
  /**
   * 调教自慰经验
   * @param {number} v
   */
  set "trained_masturbation_exp"(v) {
    era['raw']().data['exp'][this.id][11] = v;
  }
  /**
   * 精液经验
   * @returns {number}
   */
  get "semen_exp"() {
    return era['raw']().data['exp'][this.id][20];
  }
  /**
   * 精液经验
   * @param {number} v
   */
  set "semen_exp"(v) {
    era['raw']().data['exp'][this.id][20] = v;
  }
  /**
   * 侍奉快乐经验
   * @returns {number}
   */
  get "service_pleasure_exp"() {
    return era['raw']().data['exp'][this.id][21];
  }
  /**
   * 侍奉快乐经验
   * @param {number} v
   */
  set "service_pleasure_exp"(v) {
    era['raw']().data['exp'][this.id][21] = v;
  }
  /**
   * 口交经验
   * @returns {number}
   */
  get "oral_exp"() {
    return era['raw']().data['exp'][this.id][22];
  }
  /**
   * 口交经验
   * @param {number} v
   */
  set "oral_exp"(v) {
    era['raw']().data['exp'][this.id][22] = v;
  }
  /**
   * 爱情经验
   * @returns {number}
   */
  get "love_exp"() {
    return era['raw']().data['exp'][this.id][23];
  }
  /**
   * 爱情经验
   * @param {number} v
   */
  set "love_exp"(v) {
    era['raw']().data['exp'][this.id][23] = v;
  }
  /**
   * 被虐快乐经验
   * @returns {number}
   */
  get "masochist_pleasure_exp"() {
    return era['raw']().data['exp'][this.id][30];
  }
  /**
   * 被虐快乐经验
   * @param {number} v
   */
  set "masochist_pleasure_exp"(v) {
    era['raw']().data['exp'][this.id][30] = v;
  }
  /**
   * 放尿经验
   * @returns {number}
   */
  get "urination_exp"() {
    return era['raw']().data['exp'][this.id][31];
  }
  /**
   * 放尿经验
   * @param {number} v
   */
  set "urination_exp"(v) {
    era['raw']().data['exp'][this.id][31] = v;
  }
  /**
   * 肛门快乐经验
   * @returns {number}
   */
  get "anal_pleasure_exp"() {
    return era['raw']().data['exp'][this.id][32];
  }
  /**
   * 肛门快乐经验
   * @param {number} v
   */
  set "anal_pleasure_exp"(v) {
    era['raw']().data['exp'][this.id][32] = v;
  }
  /**
   * 施虐快乐经验
   * @returns {number}
   */
  get "sadist_pleasure_exp"() {
    return era['raw']().data['exp'][this.id][33];
  }
  /**
   * 施虐快乐经验
   * @param {number} v
   */
  set "sadist_pleasure_exp"(v) {
    era['raw']().data['exp'][this.id][33] = v;
  }
  /**
   * 阴蒂经验
   * @returns {number}
   */
  get "clitoris_exp"() {
    return era['raw']().data['exp'][this.id][34];
  }
  /**
   * 阴蒂经验
   * @param {number} v
   */
  set "clitoris_exp"(v) {
    era['raw']().data['exp'][this.id][34] = v;
  }
  /**
   * 乳房经验
   * @returns {number}
   */
  get "breast_exp"() {
    return era['raw']().data['exp'][this.id][35];
  }
  /**
   * 乳房经验
   * @param {number} v
   */
  set "breast_exp"(v) {
    era['raw']().data['exp'][this.id][35] = v;
  }
  /**
   * 百合经验
   * @returns {number}
   */
  get "lesbian_exp"() {
    return era['raw']().data['exp'][this.id][40];
  }
  /**
   * 百合经验
   * @param {number} v
   */
  set "lesbian_exp"(v) {
    era['raw']().data['exp'][this.id][40] = v;
  }
  /**
   * 断背经验
   * @returns {number}
   */
  get "gay_exp"() {
    return era['raw']().data['exp'][this.id][41];
  }
  /**
   * 断背经验
   * @param {number} v
   */
  set "gay_exp"(v) {
    era['raw']().data['exp'][this.id][41] = v;
  }
  /**
   * 异常经验
   * @returns {number}
   */
  get "abnormal_exp"() {
    return era['raw']().data['exp'][this.id][50];
  }
  /**
   * 异常经验
   * @param {number} v
   */
  set "abnormal_exp"(v) {
    era['raw']().data['exp'][this.id][50] = v;
  }
  /**
   * 紧缚经验
   * @returns {number}
   */
  get "bondage_exp"() {
    return era['raw']().data['exp'][this.id][51];
  }
  /**
   * 紧缚经验
   * @param {number} v
   */
  set "bondage_exp"(v) {
    era['raw']().data['exp'][this.id][51] = v;
  }
  /**
   * 私处扩张经验
   * @returns {number}
   */
  get "vagina_dilation_exp"() {
    return era['raw']().data['exp'][this.id][52];
  }
  /**
   * 私处扩张经验
   * @param {number} v
   */
  set "vagina_dilation_exp"(v) {
    era['raw']().data['exp'][this.id][52] = v;
  }
  /**
   * 肛门扩张经验
   * @returns {number}
   */
  get "anal_dilation_exp"() {
    return era['raw']().data['exp'][this.id][53];
  }
  /**
   * 肛门扩张经验
   * @param {number} v
   */
  set "anal_dilation_exp"(v) {
    era['raw']().data['exp'][this.id][53] = v;
  }
  /**
   * 喷奶经验
   * @returns {number}
   */
  get "lactation_exp"() {
    return era['raw']().data['exp'][this.id][54];
  }
  /**
   * 喷奶经验
   * @param {number} v
   */
  set "lactation_exp"(v) {
    era['raw']().data['exp'][this.id][54] = v;
  }
  /**
   * 触手经验
   * @returns {number}
   */
  get "tentacle_exp"() {
    return era['raw']().data['exp'][this.id][55];
  }
  /**
   * 触手经验
   * @param {number} v
   */
  set "tentacle_exp"(v) {
    era['raw']().data['exp'][this.id][55] = v;
  }
  /**
   * 兽奸经验
   * @returns {number}
   */
  get "bestiality_exp"() {
    return era['raw']().data['exp'][this.id][56];
  }
  /**
   * 兽奸经验
   * @param {number} v
   */
  set "bestiality_exp"(v) {
    era['raw']().data['exp'][this.id][56] = v;
  }
  /**
   * 药物经验
   * @returns {number}
   */
  get "drug_exp"() {
    return era['raw']().data['exp'][this.id][57];
  }
  /**
   * 药物经验
   * @param {number} v
   */
  set "drug_exp"(v) {
    era['raw']().data['exp'][this.id][57] = v;
  }
  /**
   * 异种奸经验
   * @returns {number}
   */
  get "interspecies_exp"() {
    return era['raw']().data['exp'][this.id][58];
  }
  /**
   * 异种奸经验
   * @param {number} v
   */
  set "interspecies_exp"(v) {
    era['raw']().data['exp'][this.id][58] = v;
  }
  /**
   * 生育经验
   * @returns {number}
   */
  get "childbirth_exp"() {
    return era['raw']().data['exp'][this.id][60];
  }
  /**
   * 生育经验
   * @param {number} v
   */
  set "childbirth_exp"(v) {
    era['raw']().data['exp'][this.id][60] = v;
  }
  /**
   * 料理经验
   * @returns {number}
   */
  get "cooking_exp"() {
    return era['raw']().data['exp'][this.id][61];
  }
  /**
   * 料理经验
   * @param {number} v
   */
  set "cooking_exp"(v) {
    era['raw']().data['exp'][this.id][61] = v;
  }
  /**
   * 异种妊娠经验
   * @returns {number}
   */
  get "interspecies_pregnancy_exp"() {
    return era['raw']().data['exp'][this.id][62];
  }
  /**
   * 异种妊娠经验
   * @param {number} v
   */
  set "interspecies_pregnancy_exp"(v) {
    era['raw']().data['exp'][this.id][62] = v;
  }
  /**
   * 从属快乐经验
   * @returns {number}
   */
  get "submissive_pleasure_exp"() {
    return era['raw']().data['exp'][this.id][63];
  }
  /**
   * 从属快乐经验
   * @param {number} v
   */
  set "submissive_pleasure_exp"(v) {
    era['raw']().data['exp'][this.id][63] = v;
  }
  /**
   * 主从爱情经验
   * @returns {number}
   */
  get "master_love_exp"() {
    return era['raw']().data['exp'][this.id][64];
  }
  /**
   * 主从爱情经验
   * @param {number} v
   */
  set "master_love_exp"(v) {
    era['raw']().data['exp'][this.id][64] = v;
  }
  /**
   * 调教失神经验
   * @returns {number}
   */
  get "training_faint_exp"() {
    return era['raw']().data['exp'][this.id][65];
  }
  /**
   * 调教失神经验
   * @param {number} v
   */
  set "training_faint_exp"(v) {
    era['raw']().data['exp'][this.id][65] = v;
  }
  /**
   * 狂王调教经验
   * @returns {number}
   */
  get "crazylord_training_exp"() {
    return era['raw']().data['exp'][this.id][66];
  }
  /**
   * 狂王调教经验
   * @param {number} v
   */
  set "crazylord_training_exp"(v) {
    era['raw']().data['exp'][this.id][66] = v;
  }
  /**
   * 拍摄经验
   * @returns {number}
   */
  get "shooting_exp"() {
    return era['raw']().data['exp'][this.id][70];
  }
  /**
   * 拍摄经验
   * @param {number} v
   */
  set "shooting_exp"(v) {
    era['raw']().data['exp'][this.id][70] = v;
  }
  /**
   * 歌唱经验
   * @returns {number}
   */
  get "singing_exp"() {
    return era['raw']().data['exp'][this.id][71];
  }
  /**
   * 歌唱经验
   * @param {number} v
   */
  set "singing_exp"(v) {
    era['raw']().data['exp'][this.id][71] = v;
  }
  /**
   * 舞蹈经验
   * @returns {number}
   */
  get "dance_exp"() {
    return era['raw']().data['exp'][this.id][72];
  }
  /**
   * 舞蹈经验
   * @param {number} v
   */
  set "dance_exp"(v) {
    era['raw']().data['exp'][this.id][72] = v;
  }
  /**
   * 调教会话经验
   * @returns {number}
   */
  get "training_talk_exp"() {
    return era['raw']().data['exp'][this.id][73];
  }
  /**
   * 调教会话经验
   * @param {number} v
   */
  set "training_talk_exp"(v) {
    era['raw']().data['exp'][this.id][73] = v;
  }
  /**
   * 卖淫经验
   * @returns {number}
   */
  get "prostitution_exp"() {
    return era['raw']().data['exp'][this.id][74];
  }
  /**
   * 卖淫经验
   * @param {number} v
   */
  set "prostitution_exp"(v) {
    era['raw']().data['exp'][this.id][74] = v;
  }
  /**
   * 营业爱情经验
   * @returns {number}
   */
  get "business_love_exp"() {
    return era['raw']().data['exp'][this.id][75];
  }
  /**
   * 营业爱情经验
   * @param {number} v
   */
  set "business_love_exp"(v) {
    era['raw']().data['exp'][this.id][75] = v;
  }
  /**
   * 斗技胜利经验
   * @returns {number}
   */
  get "arena_win_exp"() {
    return era['raw']().data['exp'][this.id][76];
  }
  /**
   * 斗技胜利经验
   * @param {number} v
   */
  set "arena_win_exp"(v) {
    era['raw']().data['exp'][this.id][76] = v;
  }
  /**
   * 战斗经验
   * @returns {number}
   */
  get "battle_exp"() {
    return era['raw']().data['exp'][this.id][80];
  }
  /**
   * 战斗经验
   * @param {number} v
   */
  set "battle_exp"(v) {
    era['raw']().data['exp'][this.id][80] = v;
  }
  /**
   * 勋章经验
   * @returns {number}
   */
  get "medal_exp"() {
    return era['raw']().data['exp'][this.id][81];
  }
  /**
   * 勋章经验
   * @param {number} v
   */
  set "medal_exp"(v) {
    era['raw']().data['exp'][this.id][81] = v;
  }
  /**
   * 异界经验
   * @returns {number}
   */
  get "otherworld_exp"() {
    return era['raw']().data['exp'][this.id][99];
  }
  /**
   * 异界经验
   * @param {number} v
   */
  set "otherworld_exp"(v) {
    era['raw']().data['exp'][this.id][99] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`exp:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`exp:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraExp;
// GENERATED END