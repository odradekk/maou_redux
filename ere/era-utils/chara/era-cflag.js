// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`cflag:${this.id}:${param}`) || 0;
}

class EraCflag {
  /**
   * 出售与助手资格
   * @returns {number}
   */
  get "sale_and_assistant"() {
    return era['raw']().data['cflag'][this.id][0];
  }
  /**
   * 出售与助手资格
   * @param {number} v
   */
  set "sale_and_assistant"(v) {
    era['raw']().data['cflag'][this.id][0] = v;
  }
  /**
   * 状态
   * @returns {number}
   */
  get "state"() {
    return era['raw']().data['cflag'][this.id][1];
  }
  /**
   * 状态
   * @param {number} v
   */
  set "state"(v) {
    era['raw']().data['cflag'][this.id][1] = v;
  }
  /**
   * 好感度
   * @returns {number}
   */
  get "affection"() {
    return era['raw']().data['cflag'][this.id][2];
  }
  /**
   * 好感度
   * @param {number} v
   */
  set "affection"(v) {
    era['raw']().data['cflag'][this.id][2] = v;
  }
  /**
   * 公开自慰经验
   * @returns {number}
   */
  get "public_masturbation_exp"() {
    return era['raw']().data['cflag'][this.id][3];
  }
  /**
   * 公开自慰经验
   * @param {number} v
   */
  set "public_masturbation_exp"(v) {
    era['raw']().data['cflag'][this.id][3] = v;
  }
  /**
   * 灌肠经验
   * @returns {number}
   */
  get "enema_exp"() {
    return era['raw']().data['cflag'][this.id][4];
  }
  /**
   * 灌肠经验
   * @param {number} v
   */
  set "enema_exp"(v) {
    era['raw']().data['cflag'][this.id][4] = v;
  }
  /**
   * 野外露出经验
   * @returns {number}
   */
  get "outdoor_exposure_exp"() {
    return era['raw']().data['cflag'][this.id][5];
  }
  /**
   * 野外露出经验
   * @param {number} v
   */
  set "outdoor_exposure_exp"(v) {
    era['raw']().data['cflag'][this.id][5] = v;
  }
  /**
   * 随机名编号
   * @returns {number}
   */
  get "random_name_index"() {
    return era['raw']().data['cflag'][this.id][6];
  }
  /**
   * 随机名编号
   * @param {number} v
   */
  set "random_name_index"(v) {
    era['raw']().data['cflag'][this.id][6] = v;
  }
  /**
   * 穿环状态
   * @returns {number}
   */
  get "piercing_state"() {
    return era['raw']().data['cflag'][this.id][7];
  }
  /**
   * 穿环状态
   * @param {number} v
   */
  set "piercing_state"(v) {
    era['raw']().data['cflag'][this.id][7] = v;
  }
  /**
   * 等级
   * @returns {number}
   */
  get "level"() {
    return era['raw']().data['cflag'][this.id][9];
  }
  /**
   * 等级
   * @param {number} v
   */
  set "level"(v) {
    era['raw']().data['cflag'][this.id][9] = v;
  }
  /**
   * 调教回数
   * @returns {number}
   */
  get "train_count"() {
    return era['raw']().data['cflag'][this.id][10];
  }
  /**
   * 调教回数
   * @param {number} v
   */
  set "train_count"(v) {
    era['raw']().data['cflag'][this.id][10] = v;
  }
  /**
   * 攻击力
   * @returns {number}
   */
  get "attack"() {
    return era['raw']().data['cflag'][this.id][11];
  }
  /**
   * 攻击力
   * @param {number} v
   */
  set "attack"(v) {
    era['raw']().data['cflag'][this.id][11] = v;
  }
  /**
   * 防御力
   * @returns {number}
   */
  get "defense"() {
    return era['raw']().data['cflag'][this.id][12];
  }
  /**
   * 防御力
   * @param {number} v
   */
  set "defense"(v) {
    era['raw']().data['cflag'][this.id][12] = v;
  }
  /**
   * 基础攻击
   * @returns {number}
   */
  get "base_attack"() {
    return era['raw']().data['cflag'][this.id][13];
  }
  /**
   * 基础攻击
   * @param {number} v
   */
  set "base_attack"(v) {
    era['raw']().data['cflag'][this.id][13] = v;
  }
  /**
   * 基础防御
   * @returns {number}
   */
  get "base_defense"() {
    return era['raw']().data['cflag'][this.id][14];
  }
  /**
   * 基础防御
   * @param {number} v
   */
  set "base_defense"(v) {
    era['raw']().data['cflag'][this.id][14] = v;
  }
  /**
   * 初体验对象
   * @returns {number}
   */
  get "first_sex_partner"() {
    return era['raw']().data['cflag'][this.id][15];
  }
  /**
   * 初体验对象
   * @param {number} v
   */
  set "first_sex_partner"(v) {
    era['raw']().data['cflag'][this.id][15] = v;
  }
  /**
   * 初吻对象
   * @returns {number}
   */
  get "first_kiss_partner"() {
    return era['raw']().data['cflag'][this.id][16];
  }
  /**
   * 初吻对象
   * @param {number} v
   */
  set "first_kiss_partner"(v) {
    era['raw']().data['cflag'][this.id][16] = v;
  }
  /**
   * 肉亲_0
   * @returns {number}
   */
  get "blood_relation_0"() {
    return era['raw']().data['cflag'][this.id][21];
  }
  /**
   * 肉亲_0
   * @param {number} v
   */
  set "blood_relation_0"(v) {
    era['raw']().data['cflag'][this.id][21] = v;
  }
  /**
   * 调教者的经验
   * @returns {number}
   */
  get "trainer_experience"() {
    return era['raw']().data['cflag'][this.id][22];
  }
  /**
   * 调教者的经验
   * @param {number} v
   */
  set "trainer_experience"(v) {
    era['raw']().data['cflag'][this.id][22] = v;
  }
  /**
   * 肉亲_3
   * @returns {number}
   */
  get "blood_relation_3"() {
    return era['raw']().data['cflag'][this.id][24];
  }
  /**
   * 肉亲_3
   * @param {number} v
   */
  set "blood_relation_3"(v) {
    era['raw']().data['cflag'][this.id][24] = v;
  }
  /**
   * 肉亲_4
   * @returns {number}
   */
  get "blood_relation_4"() {
    return era['raw']().data['cflag'][this.id][25];
  }
  /**
   * 肉亲_4
   * @param {number} v
   */
  set "blood_relation_4"(v) {
    era['raw']().data['cflag'][this.id][25] = v;
  }
  /**
   * 媚药残留度
   * @returns {number}
   */
  get "aphrodisiac_residue"() {
    return era['raw']().data['cflag'][this.id][31];
  }
  /**
   * 媚药残留度
   * @param {number} v
   */
  set "aphrodisiac_residue"(v) {
    era['raw']().data['cflag'][this.id][31] = v;
  }
  /**
   * 媚药禁断症状
   * @returns {number}
   */
  get "aphrodisiac_withdrawal"() {
    return era['raw']().data['cflag'][this.id][32];
  }
  /**
   * 媚药禁断症状
   * @param {number} v
   */
  set "aphrodisiac_withdrawal"(v) {
    era['raw']().data['cflag'][this.id][32] = v;
  }
  /**
   * 着衣状态
   * @returns {number}
   */
  get "clothing_state"() {
    return era['raw']().data['cflag'][this.id][40];
  }
  /**
   * 着衣状态
   * @param {number} v
   */
  set "clothing_state"(v) {
    era['raw']().data['cflag'][this.id][40] = v;
  }
  /**
   * 上衣类型
   * @returns {number}
   */
  get "top_type"() {
    return era['raw']().data['cflag'][this.id][41];
  }
  /**
   * 上衣类型
   * @param {number} v
   */
  set "top_type"(v) {
    era['raw']().data['cflag'][this.id][41] = v;
  }
  /**
   * 特别服装类型
   * @returns {number}
   */
  get "special_costume_type"() {
    return era['raw']().data['cflag'][this.id][42];
  }
  /**
   * 特别服装类型
   * @param {number} v
   */
  set "special_costume_type"(v) {
    era['raw']().data['cflag'][this.id][42] = v;
  }
  /**
   * 内裤状态
   * @returns {number}
   */
  get "panties_state"() {
    return era['raw']().data['cflag'][this.id][43];
  }
  /**
   * 内裤状态
   * @param {number} v
   */
  set "panties_state"(v) {
    era['raw']().data['cflag'][this.id][43] = v;
  }
  /**
   * 胸罩状态
   * @returns {number}
   */
  get "bra_state"() {
    return era['raw']().data['cflag'][this.id][44];
  }
  /**
   * 胸罩状态
   * @param {number} v
   */
  set "bra_state"(v) {
    era['raw']().data['cflag'][this.id][44] = v;
  }
  /**
   * 上衣上状态
   * @returns {number}
   */
  get "tops_upper_state"() {
    return era['raw']().data['cflag'][this.id][45];
  }
  /**
   * 上衣上状态
   * @param {number} v
   */
  set "tops_upper_state"(v) {
    era['raw']().data['cflag'][this.id][45] = v;
  }
  /**
   * 上衣下状态
   * @returns {number}
   */
  get "top_state"() {
    return era['raw']().data['cflag'][this.id][46];
  }
  /**
   * 上衣下状态
   * @param {number} v
   */
  set "top_state"(v) {
    era['raw']().data['cflag'][this.id][46] = v;
  }
  /**
   * 特别服装状态
   * @returns {number}
   */
  get "special_costume_state"() {
    return era['raw']().data['cflag'][this.id][47];
  }
  /**
   * 特别服装状态
   * @param {number} v
   */
  set "special_costume_state"(v) {
    era['raw']().data['cflag'][this.id][47] = v;
  }
  /**
   * 内裤穿着期间
   * @returns {number}
   */
  get "panties_wear_days"() {
    return era['raw']().data['cflag'][this.id][48];
  }
  /**
   * 内裤穿着期间
   * @param {number} v
   */
  set "panties_wear_days"(v) {
    era['raw']().data['cflag'][this.id][48] = v;
  }
  /**
   * 贞操带钥匙已丢弃
   * @returns {number}
   */
  get "chastity_key_discarded"() {
    return era['raw']().data['cflag'][this.id][49];
  }
  /**
   * 贞操带钥匙已丢弃
   * @param {number} v
   */
  set "chastity_key_discarded"(v) {
    era['raw']().data['cflag'][this.id][49] = v;
  }
  /**
   * 贞操带钥匙
   * @returns {number}
   */
  get "chastity_key_found"() {
    return era['raw']().data['cflag'][this.id][50];
  }
  /**
   * 贞操带钥匙
   * @param {number} v
   */
  set "chastity_key_found"(v) {
    era['raw']().data['cflag'][this.id][50] = v;
  }
  /**
   * 逆强暴
   * @returns {number}
   */
  get "reverse_rape"() {
    return era['raw']().data['cflag'][this.id][61];
  }
  /**
   * 逆强暴
   * @param {number} v
   */
  set "reverse_rape"(v) {
    era['raw']().data['cflag'][this.id][61] = v;
  }
  /**
   * 处女献上已拒绝
   * @returns {number}
   */
  get "virgin_offer_declined"() {
    return era['raw']().data['cflag'][this.id][62];
  }
  /**
   * 处女献上已拒绝
   * @param {number} v
   */
  set "virgin_offer_declined"(v) {
    era['raw']().data['cflag'][this.id][62] = v;
  }
  /**
   * 已性转
   * @returns {number}
   */
  get "sex_changed"() {
    return era['raw']().data['cflag'][this.id][70];
  }
  /**
   * 已性转
   * @param {number} v
   */
  set "sex_changed"(v) {
    era['raw']().data['cflag'][this.id][70] = v;
  }
  /**
   * 处女膜已再生
   * @returns {number}
   */
  get "hymen_restored"() {
    return era['raw']().data['cflag'][this.id][71];
  }
  /**
   * 处女膜已再生
   * @param {number} v
   */
  set "hymen_restored"(v) {
    era['raw']().data['cflag'][this.id][71] = v;
  }
  /**
   * 颜射体位
   * @returns {number}
   */
  get "bukkake_position"() {
    return era['raw']().data['cflag'][this.id][74];
  }
  /**
   * 颜射体位
   * @param {number} v
   */
  set "bukkake_position"(v) {
    era['raw']().data['cflag'][this.id][74] = v;
  }
  /**
   * 蓄积润滑
   * @returns {number}
   */
  get "accumulated_lubrication"() {
    return era['raw']().data['cflag'][this.id][81];
  }
  /**
   * 蓄积润滑
   * @param {number} v
   */
  set "accumulated_lubrication"(v) {
    era['raw']().data['cflag'][this.id][81] = v;
  }
  /**
   * 蓄积欲情
   * @returns {number}
   */
  get "accumulated_desire"() {
    return era['raw']().data['cflag'][this.id][82];
  }
  /**
   * 蓄积欲情
   * @param {number} v
   */
  set "accumulated_desire"(v) {
    era['raw']().data['cflag'][this.id][82] = v;
  }
  /**
   * 拍摄装备位图
   * @returns {number}
   */
  get "shoot_equipment_bits"() {
    return era['raw']().data['cflag'][this.id][90];
  }
  /**
   * 拍摄装备位图
   * @param {number} v
   */
  set "shoot_equipment_bits"(v) {
    era['raw']().data['cflag'][this.id][90] = v;
  }
  /**
   * 失神恢复文案跳过
   * @returns {number}
   */
  get "skip_passout_message"() {
    return era['raw']().data['cflag'][this.id][99];
  }
  /**
   * 失神恢复文案跳过
   * @param {number} v
   */
  set "skip_passout_message"(v) {
    era['raw']().data['cflag'][this.id][99] = v;
  }
  /**
   * 贞操让步已认定
   * @returns {number}
   */
  get "virginity_compromise_acknowledged"() {
    return era['raw']().data['cflag'][this.id][100];
  }
  /**
   * 贞操让步已认定
   * @param {number} v
   */
  set "virginity_compromise_acknowledged"(v) {
    era['raw']().data['cflag'][this.id][100] = v;
  }
  /**
   * 主人膣内射精
   * @returns {number}
   */
  get "master_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][101];
  }
  /**
   * 主人膣内射精
   * @param {number} v
   */
  set "master_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][101] = v;
  }
  /**
   * 妊娠相手
   * @returns {number}
   */
  get "pregnancy_partner"() {
    return era['raw']().data['cflag'][this.id][102];
  }
  /**
   * 妊娠相手
   * @param {number} v
   */
  set "pregnancy_partner"(v) {
    era['raw']().data['cflag'][this.id][102] = v;
  }
  /**
   * 助手膣内射精
   * @returns {number}
   */
  get "assistant_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][103];
  }
  /**
   * 助手膣内射精
   * @param {number} v
   */
  set "assistant_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][103] = v;
  }
  /**
   * 对象膣内射精
   * @returns {number}
   */
  get "slave_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][104];
  }
  /**
   * 对象膣内射精
   * @param {number} v
   */
  set "slave_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][104] = v;
  }
  /**
   * 客膣内射精
   * @returns {number}
   */
  get "customer_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][105];
  }
  /**
   * 客膣内射精
   * @param {number} v
   */
  set "customer_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][105] = v;
  }
  /**
   * 犬膣内射精
   * @returns {number}
   */
  get "dog_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][106];
  }
  /**
   * 犬膣内射精
   * @param {number} v
   */
  set "dog_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][106] = v;
  }
  /**
   * 怪物膣内射精
   * @returns {number}
   */
  get "monster_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][107];
  }
  /**
   * 怪物膣内射精
   * @param {number} v
   */
  set "monster_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][107] = v;
  }
  /**
   * 狂王膣内射精
   * @returns {number}
   */
  get "crazylord_vaginal_ejaculation"() {
    return era['raw']().data['cflag'][this.id][108];
  }
  /**
   * 狂王膣内射精
   * @param {number} v
   */
  set "crazylord_vaginal_ejaculation"(v) {
    era['raw']().data['cflag'][this.id][108] = v;
  }
  /**
   * 排卵诱发剂
   * @returns {number}
   */
  get "ovulation_drug_used"() {
    return era['raw']().data['cflag'][this.id][109];
  }
  /**
   * 排卵诱发剂
   * @param {number} v
   */
  set "ovulation_drug_used"(v) {
    era['raw']().data['cflag'][this.id][109] = v;
  }
  /**
   * 预产日
   * @returns {number}
   */
  get "due_date"() {
    return era['raw']().data['cflag'][this.id][110];
  }
  /**
   * 预产日
   * @param {number} v
   */
  set "due_date"(v) {
    era['raw']().data['cflag'][this.id][110] = v;
  }
  /**
   * 孩子父亲
   * @returns {number}
   */
  get "child_father"() {
    return era['raw']().data['cflag'][this.id][111];
  }
  /**
   * 孩子父亲
   * @param {number} v
   */
  set "child_father"(v) {
    era['raw']().data['cflag'][this.id][111] = v;
  }
  /**
   * 胎儿怪物编号
   * @returns {number}
   */
  get "fetus_monster_index"() {
    return era['raw']().data['cflag'][this.id][112];
  }
  /**
   * 胎儿怪物编号
   * @param {number} v
   */
  set "fetus_monster_index"(v) {
    era['raw']().data['cflag'][this.id][112] = v;
  }
  /**
   * 异常妊娠部位
   * @returns {number}
   */
  get "abnormal_pregnancy_site"() {
    return era['raw']().data['cflag'][this.id][113];
  }
  /**
   * 异常妊娠部位
   * @param {number} v
   */
  set "abnormal_pregnancy_site"(v) {
    era['raw']().data['cflag'][this.id][113] = v;
  }
  /**
   * 卖春积极性
   * @returns {number}
   */
  get "prostitution_motivation"() {
    return era['raw']().data['cflag'][this.id][120];
  }
  /**
   * 卖春积极性
   * @param {number} v
   */
  set "prostitution_motivation"(v) {
    era['raw']().data['cflag'][this.id][120] = v;
  }
  /**
   * 凌辱畏怖记忆_怪物
   * @returns {number}
   */
  get "ravish_fear_monster"() {
    return era['raw']().data['cflag'][this.id][130];
  }
  /**
   * 凌辱畏怖记忆_怪物
   * @param {number} v
   */
  set "ravish_fear_monster"(v) {
    era['raw']().data['cflag'][this.id][130] = v;
  }
  /**
   * 凌辱畏怖计数
   * @returns {number}
   */
  get "ravish_fear_count"() {
    return era['raw']().data['cflag'][this.id][131];
  }
  /**
   * 凌辱畏怖计数
   * @param {number} v
   */
  set "ravish_fear_count"(v) {
    era['raw']().data['cflag'][this.id][131] = v;
  }
  /**
   * 善恶值
   * @returns {number}
   */
  get "karma"() {
    return era['raw']().data['cflag'][this.id][151];
  }
  /**
   * 善恶值
   * @param {number} v
   */
  set "karma"(v) {
    era['raw']().data['cflag'][this.id][151] = v;
  }
  /**
   * 信仰值
   * @returns {number}
   */
  get "faith"() {
    return era['raw']().data['cflag'][this.id][152];
  }
  /**
   * 信仰值
   * @param {number} v
   */
  set "faith"(v) {
    era['raw']().data['cflag'][this.id][152] = v;
  }
  /**
   * 通信勇者唯一标记
   * @returns {number}
   */
  get "cross_save_hero_mark"() {
    return era['raw']().data['cflag'][this.id][190];
  }
  /**
   * 通信勇者唯一标记
   * @param {number} v
   */
  set "cross_save_hero_mark"(v) {
    era['raw']().data['cflag'][this.id][190] = v;
  }
  /**
   * 初调教
   * @returns {number}
   */
  get "first_train"() {
    return era['raw']().data['cflag'][this.id][201];
  }
  /**
   * 初调教
   * @param {number} v
   */
  set "first_train"(v) {
    era['raw']().data['cflag'][this.id][201] = v;
  }
  /**
   * 简易助手_0
   * @returns {number}
   */
  get "simple_assistant_0"() {
    return era['raw']().data['cflag'][this.id][202];
  }
  /**
   * 简易助手_0
   * @param {number} v
   */
  set "simple_assistant_0"(v) {
    era['raw']().data['cflag'][this.id][202] = v;
  }
  /**
   * 简易助手_1
   * @returns {number}
   */
  get "simple_assistant_1"() {
    return era['raw']().data['cflag'][this.id][203];
  }
  /**
   * 简易助手_1
   * @param {number} v
   */
  set "simple_assistant_1"(v) {
    era['raw']().data['cflag'][this.id][203] = v;
  }
  /**
   * 简易助手_2
   * @returns {number}
   */
  get "simple_assistant_2"() {
    return era['raw']().data['cflag'][this.id][204];
  }
  /**
   * 简易助手_2
   * @param {number} v
   */
  set "simple_assistant_2"(v) {
    era['raw']().data['cflag'][this.id][204] = v;
  }
  /**
   * 首次c绝顶_k14
   * @returns {number}
   */
  get "first_clitoral_orgasm_k14"() {
    return era['raw']().data['cflag'][this.id][214];
  }
  /**
   * 首次c绝顶_k14
   * @param {number} v
   */
  set "first_clitoral_orgasm_k14"(v) {
    era['raw']().data['cflag'][this.id][214] = v;
  }
  /**
   * 首次润滑lv2
   * @returns {number}
   */
  get "first_lubrication_lv2"() {
    return era['raw']().data['cflag'][this.id][221];
  }
  /**
   * 首次润滑lv2
   * @param {number} v
   */
  set "first_lubrication_lv2"(v) {
    era['raw']().data['cflag'][this.id][221] = v;
  }
  /**
   * 首次欲情lv2
   * @returns {number}
   */
  get "first_desire_lv2"() {
    return era['raw']().data['cflag'][this.id][222];
  }
  /**
   * 首次欲情lv2
   * @param {number} v
   */
  set "first_desire_lv2"(v) {
    era['raw']().data['cflag'][this.id][222] = v;
  }
  /**
   * 首次耻情lv2
   * @returns {number}
   */
  get "first_shame_lv2"() {
    return era['raw']().data['cflag'][this.id][223];
  }
  /**
   * 首次耻情lv2
   * @param {number} v
   */
  set "first_shame_lv2"(v) {
    era['raw']().data['cflag'][this.id][223] = v;
  }
  /**
   * 首次恐怖lv2
   * @returns {number}
   */
  get "first_fear_lv2"() {
    return era['raw']().data['cflag'][this.id][224];
  }
  /**
   * 首次恐怖lv2
   * @param {number} v
   */
  set "first_fear_lv2"(v) {
    era['raw']().data['cflag'][this.id][224] = v;
  }
  /**
   * 首次c绝顶
   * @returns {number}
   */
  get "first_clitoral_orgasm"() {
    return era['raw']().data['cflag'][this.id][225];
  }
  /**
   * 首次c绝顶
   * @param {number} v
   */
  set "first_clitoral_orgasm"(v) {
    era['raw']().data['cflag'][this.id][225] = v;
  }
  /**
   * 首次v绝顶
   * @returns {number}
   */
  get "first_vaginal_orgasm"() {
    return era['raw']().data['cflag'][this.id][226];
  }
  /**
   * 首次v绝顶
   * @param {number} v
   */
  set "first_vaginal_orgasm"(v) {
    era['raw']().data['cflag'][this.id][226] = v;
  }
  /**
   * 首次a绝顶
   * @returns {number}
   */
  get "first_anal_orgasm"() {
    return era['raw']().data['cflag'][this.id][227];
  }
  /**
   * 首次a绝顶
   * @param {number} v
   */
  set "first_anal_orgasm"(v) {
    era['raw']().data['cflag'][this.id][227] = v;
  }
  /**
   * 首次b绝顶
   * @returns {number}
   */
  get "first_breast_orgasm"() {
    return era['raw']().data['cflag'][this.id][228];
  }
  /**
   * 首次b绝顶
   * @param {number} v
   */
  set "first_breast_orgasm"(v) {
    era['raw']().data['cflag'][this.id][228] = v;
  }
  /**
   * 处女丧失
   * @returns {number}
   */
  get "virginity_lost"() {
    return era['raw']().data['cflag'][this.id][229];
  }
  /**
   * 处女丧失
   * @param {number} v
   */
  set "virginity_lost"(v) {
    era['raw']().data['cflag'][this.id][229] = v;
  }
  /**
   * 寄生
   * @returns {number}
   */
  get "parasitism"() {
    return era['raw']().data['cflag'][this.id][230];
  }
  /**
   * 寄生
   * @param {number} v
   */
  set "parasitism"(v) {
    era['raw']().data['cflag'][this.id][230] = v;
  }
  /**
   * 调教后自慰
   * @returns {number}
   */
  get "after_train_masturbation"() {
    return era['raw']().data['cflag'][this.id][261];
  }
  /**
   * 调教后自慰
   * @param {number} v
   */
  set "after_train_masturbation"(v) {
    era['raw']().data['cflag'][this.id][261] = v;
  }
  /**
   * 百合play
   * @returns {number}
   */
  get "lesbian_play"() {
    return era['raw']().data['cflag'][this.id][262];
  }
  /**
   * 百合play
   * @param {number} v
   */
  set "lesbian_play"(v) {
    era['raw']().data['cflag'][this.id][262] = v;
  }
  /**
   * 朝口交
   * @returns {number}
   */
  get "morning_fellatio"() {
    return era['raw']().data['cflag'][this.id][263];
  }
  /**
   * 朝口交
   * @param {number} v
   */
  set "morning_fellatio"(v) {
    era['raw']().data['cflag'][this.id][263] = v;
  }
  /**
   * 调教后性交
   * @returns {number}
   */
  get "after_train_sex"() {
    return era['raw']().data['cflag'][this.id][264];
  }
  /**
   * 调教后性交
   * @param {number} v
   */
  set "after_train_sex"(v) {
    era['raw']().data['cflag'][this.id][264] = v;
  }
  /**
   * 夜袭
   * @returns {number}
   */
  get "night_attack"() {
    return era['raw']().data['cflag'][this.id][265];
  }
  /**
   * 夜袭
   * @param {number} v
   */
  set "night_attack"(v) {
    era['raw']().data['cflag'][this.id][265] = v;
  }
  /**
   * 妊娠发觉
   * @returns {number}
   */
  get "pregnancy_noticed"() {
    return era['raw']().data['cflag'][this.id][271];
  }
  /**
   * 妊娠发觉
   * @param {number} v
   */
  set "pregnancy_noticed"(v) {
    era['raw']().data['cflag'][this.id][271] = v;
  }
  /**
   * 生产
   * @returns {number}
   */
  get "childbirth"() {
    return era['raw']().data['cflag'][this.id][272];
  }
  /**
   * 生产
   * @param {number} v
   */
  set "childbirth"(v) {
    era['raw']().data['cflag'][this.id][272] = v;
  }
  /**
   * 育儿室
   * @returns {number}
   */
  get "nursery"() {
    return era['raw']().data['cflag'][this.id][273];
  }
  /**
   * 育儿室
   * @param {number} v
   */
  set "nursery"(v) {
    era['raw']().data['cflag'][this.id][273] = v;
  }
  /**
   * 亲离
   * @returns {number}
   */
  get "parent_separation"() {
    return era['raw']().data['cflag'][this.id][274];
  }
  /**
   * 亲离
   * @param {number} v
   */
  set "parent_separation"(v) {
    era['raw']().data['cflag'][this.id][274] = v;
  }
  /**
   * 苦痛刻印lv3
   * @returns {number}
   */
  get "pain_brand_lv3"() {
    return era['raw']().data['cflag'][this.id][297];
  }
  /**
   * 苦痛刻印lv3
   * @param {number} v
   */
  set "pain_brand_lv3"(v) {
    era['raw']().data['cflag'][this.id][297] = v;
  }
  /**
   * 快乐刻印lv3
   * @returns {number}
   */
  get "pleasure_brand_lv3"() {
    return era['raw']().data['cflag'][this.id][298];
  }
  /**
   * 快乐刻印lv3
   * @param {number} v
   */
  set "pleasure_brand_lv3"(v) {
    era['raw']().data['cflag'][this.id][298] = v;
  }
  /**
   * 屈服刻印lv3
   * @returns {number}
   */
  get "submission_brand_lv3"() {
    return era['raw']().data['cflag'][this.id][299];
  }
  /**
   * 屈服刻印lv3
   * @param {number} v
   */
  set "submission_brand_lv3"(v) {
    era['raw']().data['cflag'][this.id][299] = v;
  }
  /**
   * 反抗刻印lv3
   * @returns {number}
   */
  get "resistance_brand_lv3"() {
    return era['raw']().data['cflag'][this.id][300];
  }
  /**
   * 反抗刻印lv3
   * @param {number} v
   */
  set "resistance_brand_lv3"(v) {
    era['raw']().data['cflag'][this.id][300] = v;
  }
  /**
   * 爱抚
   * @returns {number}
   */
  get "cmd_caress"() {
    return era['raw']().data['cflag'][this.id][301];
  }
  /**
   * 爱抚
   * @param {number} v
   */
  set "cmd_caress"(v) {
    era['raw']().data['cflag'][this.id][301] = v;
  }
  /**
   * 舔阴
   * @returns {number}
   */
  get "cmd_cunnilingus"() {
    return era['raw']().data['cflag'][this.id][302];
  }
  /**
   * 舔阴
   * @param {number} v
   */
  set "cmd_cunnilingus"(v) {
    era['raw']().data['cflag'][this.id][302] = v;
  }
  /**
   * 肛门爱抚
   * @returns {number}
   */
  get "cmd_anal_caress"() {
    return era['raw']().data['cflag'][this.id][303];
  }
  /**
   * 肛门爱抚
   * @param {number} v
   */
  set "cmd_anal_caress"(v) {
    era['raw']().data['cflag'][this.id][303] = v;
  }
  /**
   * 自慰
   * @returns {number}
   */
  get "cmd_masturbation"() {
    return era['raw']().data['cflag'][this.id][304];
  }
  /**
   * 自慰
   * @param {number} v
   */
  set "cmd_masturbation"(v) {
    era['raw']().data['cflag'][this.id][304] = v;
  }
  /**
   * 口交_主
   * @returns {number}
   */
  get "cmd_fellatio_master"() {
    return era['raw']().data['cflag'][this.id][305];
  }
  /**
   * 口交_主
   * @param {number} v
   */
  set "cmd_fellatio_master"(v) {
    era['raw']().data['cflag'][this.id][305] = v;
  }
  /**
   * 胸爱抚
   * @returns {number}
   */
  get "cmd_breast_caress"() {
    return era['raw']().data['cflag'][this.id][306];
  }
  /**
   * 胸爱抚
   * @param {number} v
   */
  set "cmd_breast_caress"(v) {
    era['raw']().data['cflag'][this.id][306] = v;
  }
  /**
   * 接吻
   * @returns {number}
   */
  get "cmd_kiss"() {
    return era['raw']().data['cflag'][this.id][307];
  }
  /**
   * 接吻
   * @param {number} v
   */
  set "cmd_kiss"(v) {
    era['raw']().data['cflag'][this.id][307] = v;
  }
  /**
   * 自己扒开
   * @returns {number}
   */
  get "cmd_spread_self"() {
    return era['raw']().data['cflag'][this.id][308];
  }
  /**
   * 自己扒开
   * @param {number} v
   */
  set "cmd_spread_self"(v) {
    era['raw']().data['cflag'][this.id][308] = v;
  }
  /**
   * 插入手指
   * @returns {number}
   */
  get "cmd_insert_finger"() {
    return era['raw']().data['cflag'][this.id][309];
  }
  /**
   * 插入手指
   * @param {number} v
   */
  set "cmd_insert_finger"(v) {
    era['raw']().data['cflag'][this.id][309] = v;
  }
  /**
   * 舔肛
   * @returns {number}
   */
  get "cmd_anilingus"() {
    return era['raw']().data['cflag'][this.id][310];
  }
  /**
   * 舔肛
   * @param {number} v
   */
  set "cmd_anilingus"(v) {
    era['raw']().data['cflag'][this.id][310] = v;
  }
  /**
   * 振动宝石
   * @returns {number}
   */
  get "cmd_vibration_gem"() {
    return era['raw']().data['cflag'][this.id][311];
  }
  /**
   * 振动宝石
   * @param {number} v
   */
  set "cmd_vibration_gem"(v) {
    era['raw']().data['cflag'][this.id][311] = v;
  }
  /**
   * 壶虫
   * @returns {number}
   */
  get "cmd_pot_worm"() {
    return era['raw']().data['cflag'][this.id][312];
  }
  /**
   * 壶虫
   * @param {number} v
   */
  set "cmd_pot_worm"(v) {
    era['raw']().data['cflag'][this.id][312] = v;
  }
  /**
   * 振动杖
   * @returns {number}
   */
  get "cmd_vibration_rod"() {
    return era['raw']().data['cflag'][this.id][313];
  }
  /**
   * 振动杖
   * @param {number} v
   */
  set "cmd_vibration_rod"(v) {
    era['raw']().data['cflag'][this.id][313] = v;
  }
  /**
   * 肛门虫
   * @returns {number}
   */
  get "cmd_anal_worm"() {
    return era['raw']().data['cflag'][this.id][314];
  }
  /**
   * 肛门虫
   * @param {number} v
   */
  set "cmd_anal_worm"(v) {
    era['raw']().data['cflag'][this.id][314] = v;
  }
  /**
   * 阴蒂夹
   * @returns {number}
   */
  get "cmd_clitoris_clamp"() {
    return era['raw']().data['cflag'][this.id][315];
  }
  /**
   * 阴蒂夹
   * @param {number} v
   */
  set "cmd_clitoris_clamp"(v) {
    era['raw']().data['cflag'][this.id][315] = v;
  }
  /**
   * 乳头夹
   * @returns {number}
   */
  get "cmd_nipple_clamp"() {
    return era['raw']().data['cflag'][this.id][316];
  }
  /**
   * 乳头夹
   * @param {number} v
   */
  set "cmd_nipple_clamp"(v) {
    era['raw']().data['cflag'][this.id][316] = v;
  }
  /**
   * 榨乳器
   * @returns {number}
   */
  get "cmd_milking_machine"() {
    return era['raw']().data['cflag'][this.id][317];
  }
  /**
   * 榨乳器
   * @param {number} v
   */
  set "cmd_milking_machine"(v) {
    era['raw']().data['cflag'][this.id][317] = v;
  }
  /**
   * 飞机杯
   * @returns {number}
   */
  get "cmd_onahole"() {
    return era['raw']().data['cflag'][this.id][318];
  }
  /**
   * 飞机杯
   * @param {number} v
   */
  set "cmd_onahole"(v) {
    era['raw']().data['cflag'][this.id][318] = v;
  }
  /**
   * 肛珠
   * @returns {number}
   */
  get "cmd_anal_beads"() {
    return era['raw']().data['cflag'][this.id][320];
  }
  /**
   * 肛珠
   * @param {number} v
   */
  set "cmd_anal_beads"(v) {
    era['raw']().data['cflag'][this.id][320] = v;
  }
  /**
   * 正常位
   * @returns {number}
   */
  get "cmd_missionary"() {
    return era['raw']().data['cflag'][this.id][321];
  }
  /**
   * 正常位
   * @param {number} v
   */
  set "cmd_missionary"(v) {
    era['raw']().data['cflag'][this.id][321] = v;
  }
  /**
   * 背后位
   * @returns {number}
   */
  get "cmd_doggy_style"() {
    return era['raw']().data['cflag'][this.id][322];
  }
  /**
   * 背后位
   * @param {number} v
   */
  set "cmd_doggy_style"(v) {
    era['raw']().data['cflag'][this.id][322] = v;
  }
  /**
   * 对面座位
   * @returns {number}
   */
  get "cmd_facing_seat"() {
    return era['raw']().data['cflag'][this.id][323];
  }
  /**
   * 对面座位
   * @param {number} v
   */
  set "cmd_facing_seat"(v) {
    era['raw']().data['cflag'][this.id][323] = v;
  }
  /**
   * 背面座位
   * @returns {number}
   */
  get "cmd_reverse_seat"() {
    return era['raw']().data['cflag'][this.id][324];
  }
  /**
   * 背面座位
   * @param {number} v
   */
  set "cmd_reverse_seat"(v) {
    era['raw']().data['cflag'][this.id][324] = v;
  }
  /**
   * 逆强奸
   * @returns {number}
   */
  get "cmd_reverse_rape"() {
    return era['raw']().data['cflag'][this.id][325];
  }
  /**
   * 逆强奸
   * @param {number} v
   */
  set "cmd_reverse_rape"(v) {
    era['raw']().data['cflag'][this.id][325] = v;
  }
  /**
   * 逆肛门强奸
   * @returns {number}
   */
  get "cmd_reverse_anal_rape"() {
    return era['raw']().data['cflag'][this.id][326];
  }
  /**
   * 逆肛门强奸
   * @param {number} v
   */
  set "cmd_reverse_anal_rape"(v) {
    era['raw']().data['cflag'][this.id][326] = v;
  }
  /**
   * 正常位肛交
   * @returns {number}
   */
  get "cmd_missionary_anal"() {
    return era['raw']().data['cflag'][this.id][327];
  }
  /**
   * 正常位肛交
   * @param {number} v
   */
  set "cmd_missionary_anal"(v) {
    era['raw']().data['cflag'][this.id][327] = v;
  }
  /**
   * 背后位肛交
   * @returns {number}
   */
  get "cmd_doggy_anal"() {
    return era['raw']().data['cflag'][this.id][328];
  }
  /**
   * 背后位肛交
   * @param {number} v
   */
  set "cmd_doggy_anal"(v) {
    era['raw']().data['cflag'][this.id][328] = v;
  }
  /**
   * 对面座位肛交
   * @returns {number}
   */
  get "cmd_facing_seat_anal"() {
    return era['raw']().data['cflag'][this.id][329];
  }
  /**
   * 对面座位肛交
   * @param {number} v
   */
  set "cmd_facing_seat_anal"(v) {
    era['raw']().data['cflag'][this.id][329] = v;
  }
  /**
   * 背面座位肛交
   * @returns {number}
   */
  get "cmd_reverse_seat_anal"() {
    return era['raw']().data['cflag'][this.id][330];
  }
  /**
   * 背面座位肛交
   * @param {number} v
   */
  set "cmd_reverse_seat_anal"(v) {
    era['raw']().data['cflag'][this.id][330] = v;
  }
  /**
   * 手淫
   * @returns {number}
   */
  get "cmd_handjob"() {
    return era['raw']().data['cflag'][this.id][331];
  }
  /**
   * 手淫
   * @param {number} v
   */
  set "cmd_handjob"(v) {
    era['raw']().data['cflag'][this.id][331] = v;
  }
  /**
   * 口交_奴
   * @returns {number}
   */
  get "cmd_fellatio_slave"() {
    return era['raw']().data['cflag'][this.id][332];
  }
  /**
   * 口交_奴
   * @param {number} v
   */
  set "cmd_fellatio_slave"(v) {
    era['raw']().data['cflag'][this.id][332] = v;
  }
  /**
   * 乳交
   * @returns {number}
   */
  get "cmd_titjob"() {
    return era['raw']().data['cflag'][this.id][333];
  }
  /**
   * 乳交
   * @param {number} v
   */
  set "cmd_titjob"(v) {
    era['raw']().data['cflag'][this.id][333] = v;
  }
  /**
   * 股间性交
   * @returns {number}
   */
  get "cmd_thigh_sex"() {
    return era['raw']().data['cflag'][this.id][334];
  }
  /**
   * 股间性交
   * @param {number} v
   */
  set "cmd_thigh_sex"(v) {
    era['raw']().data['cflag'][this.id][334] = v;
  }
  /**
   * 骑乘位
   * @returns {number}
   */
  get "cmd_cowgirl"() {
    return era['raw']().data['cflag'][this.id][335];
  }
  /**
   * 骑乘位
   * @param {number} v
   */
  set "cmd_cowgirl"(v) {
    era['raw']().data['cflag'][this.id][335] = v;
  }
  /**
   * 全身擦洗
   * @returns {number}
   */
  get "cmd_body_wash"() {
    return era['raw']().data['cflag'][this.id][336];
  }
  /**
   * 全身擦洗
   * @param {number} v
   */
  set "cmd_body_wash"(v) {
    era['raw']().data['cflag'][this.id][336] = v;
  }
  /**
   * 骑乘位肛交
   * @returns {number}
   */
  get "cmd_cowgirl_anal"() {
    return era['raw']().data['cflag'][this.id][337];
  }
  /**
   * 骑乘位肛交
   * @param {number} v
   */
  set "cmd_cowgirl_anal"(v) {
    era['raw']().data['cflag'][this.id][337] = v;
  }
  /**
   * 肛门侍奉
   * @returns {number}
   */
  get "cmd_anal_service"() {
    return era['raw']().data['cflag'][this.id][338];
  }
  /**
   * 肛门侍奉
   * @param {number} v
   */
  set "cmd_anal_service"(v) {
    era['raw']().data['cflag'][this.id][338] = v;
  }
  /**
   * 足交
   * @returns {number}
   */
  get "cmd_footjob"() {
    return era['raw']().data['cflag'][this.id][339];
  }
  /**
   * 足交
   * @param {number} v
   */
  set "cmd_footjob"(v) {
    era['raw']().data['cflag'][this.id][339] = v;
  }
  /**
   * 打屁股
   * @returns {number}
   */
  get "cmd_spanking"() {
    return era['raw']().data['cflag'][this.id][341];
  }
  /**
   * 打屁股
   * @param {number} v
   */
  set "cmd_spanking"(v) {
    era['raw']().data['cflag'][this.id][341] = v;
  }
  /**
   * 鞭
   * @returns {number}
   */
  get "cmd_whip"() {
    return era['raw']().data['cflag'][this.id][342];
  }
  /**
   * 鞭
   * @param {number} v
   */
  set "cmd_whip"(v) {
    era['raw']().data['cflag'][this.id][342] = v;
  }
  /**
   * 针
   * @returns {number}
   */
  get "cmd_needle"() {
    return era['raw']().data['cflag'][this.id][343];
  }
  /**
   * 针
   * @param {number} v
   */
  set "cmd_needle"(v) {
    era['raw']().data['cflag'][this.id][343] = v;
  }
  /**
   * 眼罩
   * @returns {number}
   */
  get "cmd_blindfold"() {
    return era['raw']().data['cflag'][this.id][344];
  }
  /**
   * 眼罩
   * @param {number} v
   */
  set "cmd_blindfold"(v) {
    era['raw']().data['cflag'][this.id][344] = v;
  }
  /**
   * 绳子
   * @returns {number}
   */
  get "cmd_rope"() {
    return era['raw']().data['cflag'][this.id][345];
  }
  /**
   * 绳子
   * @param {number} v
   */
  set "cmd_rope"(v) {
    era['raw']().data['cflag'][this.id][345] = v;
  }
  /**
   * 口塞
   * @returns {number}
   */
  get "cmd_gag"() {
    return era['raw']().data['cflag'][this.id][346];
  }
  /**
   * 口塞
   * @param {number} v
   */
  set "cmd_gag"(v) {
    era['raw']().data['cflag'][this.id][346] = v;
  }
  /**
   * 灌肠肛塞
   * @returns {number}
   */
  get "cmd_enema_plug"() {
    return era['raw']().data['cflag'][this.id][347];
  }
  /**
   * 灌肠肛塞
   * @param {number} v
   */
  set "cmd_enema_plug"(v) {
    era['raw']().data['cflag'][this.id][347] = v;
  }
  /**
   * 穿环
   * @returns {number}
   */
  get "cmd_piercing"() {
    return era['raw']().data['cflag'][this.id][348];
  }
  /**
   * 穿环
   * @param {number} v
   */
  set "cmd_piercing"(v) {
    era['raw']().data['cflag'][this.id][348] = v;
  }
  /**
   * 放置play
   * @returns {number}
   */
  get "cmd_ignore"() {
    return era['raw']().data['cflag'][this.id][356];
  }
  /**
   * 放置play
   * @param {number} v
   */
  set "cmd_ignore"(v) {
    era['raw']().data['cflag'][this.id][356] = v;
  }
  /**
   * 交谈
   * @returns {number}
   */
  get "cmd_talk"() {
    return era['raw']().data['cflag'][this.id][357];
  }
  /**
   * 交谈
   * @param {number} v
   */
  set "cmd_talk"(v) {
    era['raw']().data['cflag'][this.id][357] = v;
  }
  /**
   * 乳夹口交
   * @returns {number}
   */
  get "cmd_fellatio_with_nipple_clamp"() {
    return era['raw']().data['cflag'][this.id][360];
  }
  /**
   * 乳夹口交
   * @param {number} v
   */
  set "cmd_fellatio_with_nipple_clamp"(v) {
    era['raw']().data['cflag'][this.id][360] = v;
  }
  /**
   * 口交时自慰
   * @returns {number}
   */
  get "cmd_masturbation_during_fellatio"() {
    return era['raw']().data['cflag'][this.id][361];
  }
  /**
   * 口交时自慰
   * @param {number} v
   */
  set "cmd_masturbation_during_fellatio"(v) {
    era['raw']().data['cflag'][this.id][361] = v;
  }
  /**
   * 手搓口交
   * @returns {number}
   */
  get "cmd_handjob_fellatio"() {
    return era['raw']().data['cflag'][this.id][362];
  }
  /**
   * 手搓口交
   * @param {number} v
   */
  set "cmd_handjob_fellatio"(v) {
    era['raw']().data['cflag'][this.id][362] = v;
  }
  /**
   * 真空口交
   * @returns {number}
   */
  get "cmd_vacuum_fellatio"() {
    return era['raw']().data['cflag'][this.id][363];
  }
  /**
   * 真空口交
   * @param {number} v
   */
  set "cmd_vacuum_fellatio"(v) {
    era['raw']().data['cflag'][this.id][363] = v;
  }
  /**
   * 六九式
   * @returns {number}
   */
  get "cmd_sixty_nine"() {
    return era['raw']().data['cflag'][this.id][364];
  }
  /**
   * 六九式
   * @param {number} v
   */
  set "cmd_sixty_nine"(v) {
    era['raw']().data['cflag'][this.id][364] = v;
  }
  /**
   * 深喉
   * @returns {number}
   */
  get "cmd_deep_throat"() {
    return era['raw']().data['cflag'][this.id][365];
  }
  /**
   * 深喉
   * @param {number} v
   */
  set "cmd_deep_throat"(v) {
    era['raw']().data['cflag'][this.id][365] = v;
  }
  /**
   * 侵犯助手
   * @returns {number}
   */
  get "cmd_violate_assistant"() {
    return era['raw']().data['cflag'][this.id][366];
  }
  /**
   * 侵犯助手
   * @param {number} v
   */
  set "cmd_violate_assistant"(v) {
    era['raw']().data['cflag'][this.id][366] = v;
  }
  /**
   * 双人口交
   * @returns {number}
   */
  get "cmd_double_fellatio"() {
    return era['raw']().data['cflag'][this.id][367];
  }
  /**
   * 双人口交
   * @param {number} v
   */
  set "cmd_double_fellatio"(v) {
    era['raw']().data['cflag'][this.id][367] = v;
  }
  /**
   * 双人侍奉口交
   * @returns {number}
   */
  get "cmd_double_service_fellatio"() {
    return era['raw']().data['cflag'][this.id][369];
  }
  /**
   * 双人侍奉口交
   * @param {number} v
   */
  set "cmd_double_service_fellatio"(v) {
    era['raw']().data['cflag'][this.id][369] = v;
  }
  /**
   * 魔族化
   * @returns {number}
   */
  get "demonization"() {
    return era['raw']().data['cflag'][this.id][370];
  }
  /**
   * 魔族化
   * @param {number} v
   */
  set "demonization"(v) {
    era['raw']().data['cflag'][this.id][370] = v;
  }
  /**
   * 壶虫着脱
   * @returns {number}
   */
  get "attached_pot_worm"() {
    return era['raw']().data['cflag'][this.id][372];
  }
  /**
   * 壶虫着脱
   * @param {number} v
   */
  set "attached_pot_worm"(v) {
    era['raw']().data['cflag'][this.id][372] = v;
  }
  /**
   * 肛门虫着脱
   * @returns {number}
   */
  get "attached_anal_worm"() {
    return era['raw']().data['cflag'][this.id][374];
  }
  /**
   * 肛门虫着脱
   * @param {number} v
   */
  set "attached_anal_worm"(v) {
    era['raw']().data['cflag'][this.id][374] = v;
  }
  /**
   * 阴蒂夹着脱
   * @returns {number}
   */
  get "attached_clitoris_clamp"() {
    return era['raw']().data['cflag'][this.id][375];
  }
  /**
   * 阴蒂夹着脱
   * @param {number} v
   */
  set "attached_clitoris_clamp"(v) {
    era['raw']().data['cflag'][this.id][375] = v;
  }
  /**
   * 乳头夹着脱
   * @returns {number}
   */
  get "attached_nipple_clamp"() {
    return era['raw']().data['cflag'][this.id][376];
  }
  /**
   * 乳头夹着脱
   * @param {number} v
   */
  set "attached_nipple_clamp"(v) {
    era['raw']().data['cflag'][this.id][376] = v;
  }
  /**
   * 榨乳器着脱
   * @returns {number}
   */
  get "attached_milking_machine"() {
    return era['raw']().data['cflag'][this.id][377];
  }
  /**
   * 榨乳器着脱
   * @param {number} v
   */
  set "attached_milking_machine"(v) {
    era['raw']().data['cflag'][this.id][377] = v;
  }
  /**
   * 飞机杯着脱
   * @returns {number}
   */
  get "attached_onahole"() {
    return era['raw']().data['cflag'][this.id][378];
  }
  /**
   * 飞机杯着脱
   * @param {number} v
   */
  set "attached_onahole"(v) {
    era['raw']().data['cflag'][this.id][378] = v;
  }
  /**
   * 肛珠着脱
   * @returns {number}
   */
  get "attached_anal_beads"() {
    return era['raw']().data['cflag'][this.id][379];
  }
  /**
   * 肛珠着脱
   * @param {number} v
   */
  set "attached_anal_beads"(v) {
    era['raw']().data['cflag'][this.id][379] = v;
  }
  /**
   * 眼罩着脱
   * @returns {number}
   */
  get "attached_blindfold"() {
    return era['raw']().data['cflag'][this.id][380];
  }
  /**
   * 眼罩着脱
   * @param {number} v
   */
  set "attached_blindfold"(v) {
    era['raw']().data['cflag'][this.id][380] = v;
  }
  /**
   * 强制口交
   * @returns {number}
   */
  get "cmd_forced_fellatio"() {
    return era['raw']().data['cflag'][this.id][381];
  }
  /**
   * 强制口交
   * @param {number} v
   */
  set "cmd_forced_fellatio"(v) {
    era['raw']().data['cflag'][this.id][381] = v;
  }
  /**
   * 绳子着脱
   * @returns {number}
   */
  get "attached_rope"() {
    return era['raw']().data['cflag'][this.id][385];
  }
  /**
   * 绳子着脱
   * @param {number} v
   */
  set "attached_rope"(v) {
    era['raw']().data['cflag'][this.id][385] = v;
  }
  /**
   * 口塞着脱
   * @returns {number}
   */
  get "attached_gag"() {
    return era['raw']().data['cflag'][this.id][386];
  }
  /**
   * 口塞着脱
   * @param {number} v
   */
  set "attached_gag"(v) {
    era['raw']().data['cflag'][this.id][386] = v;
  }
  /**
   * 灌肠肛塞着脱
   * @returns {number}
   */
  get "attached_enema_plug"() {
    return era['raw']().data['cflag'][this.id][387];
  }
  /**
   * 灌肠肛塞着脱
   * @param {number} v
   */
  set "attached_enema_plug"(v) {
    era['raw']().data['cflag'][this.id][387] = v;
  }
  /**
   * 三人play
   * @returns {number}
   */
  get "threesome_play"() {
    return era['raw']().data['cflag'][this.id][391];
  }
  /**
   * 三人play
   * @param {number} v
   */
  set "threesome_play"(v) {
    era['raw']().data['cflag'][this.id][391] = v;
  }
  /**
   * 魔族化_k11
   * @returns {number}
   */
  get "demonization_k11"() {
    return era['raw']().data['cflag'][this.id][400];
  }
  /**
   * 魔族化_k11
   * @param {number} v
   */
  set "demonization_k11"(v) {
    era['raw']().data['cflag'][this.id][400] = v;
  }
  /**
   * 命名检查
   * @returns {number}
   */
  get "name_customized"() {
    return era['raw']().data['cflag'][this.id][420];
  }
  /**
   * 命名检查
   * @param {number} v
   */
  set "name_customized"(v) {
    era['raw']().data['cflag'][this.id][420] = v;
  }
  /**
   * 兽奸眼罩
   * @returns {number}
   */
  get "bestiality_blindfold"() {
    return era['raw']().data['cflag'][this.id][444];
  }
  /**
   * 兽奸眼罩
   * @param {number} v
   */
  set "bestiality_blindfold"(v) {
    era['raw']().data['cflag'][this.id][444] = v;
  }
  /**
   * 一人称档位
   * @returns {number}
   */
  get "self_call_tier"() {
    return era['raw']().data['cflag'][this.id][450];
  }
  /**
   * 一人称档位
   * @param {number} v
   */
  set "self_call_tier"(v) {
    era['raw']().data['cflag'][this.id][450] = v;
  }
  /**
   * 年龄
   * @returns {number}
   */
  get "age"() {
    return era['raw']().data['cflag'][this.id][451];
  }
  /**
   * 年龄
   * @param {number} v
   */
  set "age"(v) {
    era['raw']().data['cflag'][this.id][451] = v;
  }
  /**
   * 种族年龄
   * @returns {number}
   */
  get "race_age"() {
    return era['raw']().data['cflag'][this.id][452];
  }
  /**
   * 种族年龄
   * @param {number} v
   */
  set "race_age"(v) {
    era['raw']().data['cflag'][this.id][452] = v;
  }
  /**
   * 身高
   * @returns {number}
   */
  get "height"() {
    return era['raw']().data['cflag'][this.id][453];
  }
  /**
   * 身高
   * @param {number} v
   */
  set "height"(v) {
    era['raw']().data['cflag'][this.id][453] = v;
  }
  /**
   * 体重
   * @returns {number}
   */
  get "weight"() {
    return era['raw']().data['cflag'][this.id][454];
  }
  /**
   * 体重
   * @param {number} v
   */
  set "weight"(v) {
    era['raw']().data['cflag'][this.id][454] = v;
  }
  /**
   * 胸围
   * @returns {number}
   */
  get "bust"() {
    return era['raw']().data['cflag'][this.id][455];
  }
  /**
   * 胸围
   * @param {number} v
   */
  set "bust"(v) {
    era['raw']().data['cflag'][this.id][455] = v;
  }
  /**
   * 腰围
   * @returns {number}
   */
  get "waist"() {
    return era['raw']().data['cflag'][this.id][456];
  }
  /**
   * 腰围
   * @param {number} v
   */
  set "waist"(v) {
    era['raw']().data['cflag'][this.id][456] = v;
  }
  /**
   * 臀围
   * @returns {number}
   */
  get "hip"() {
    return era['raw']().data['cflag'][this.id][457];
  }
  /**
   * 臀围
   * @param {number} v
   */
  set "hip"(v) {
    era['raw']().data['cflag'][this.id][457] = v;
  }
  /**
   * 胸围差
   * @returns {number}
   */
  get "bust_difference"() {
    return era['raw']().data['cflag'][this.id][458];
  }
  /**
   * 胸围差
   * @param {number} v
   */
  set "bust_difference"(v) {
    era['raw']().data['cflag'][this.id][458] = v;
  }
  /**
   * 下胸围
   * @returns {number}
   */
  get "bust_under"() {
    return era['raw']().data['cflag'][this.id][459];
  }
  /**
   * 下胸围
   * @param {number} v
   */
  set "bust_under"(v) {
    era['raw']().data['cflag'][this.id][459] = v;
  }
  /**
   * 录像时间
   * @returns {number}
   */
  get "video_duration"() {
    return era['raw']().data['cflag'][this.id][491];
  }
  /**
   * 录像时间
   * @param {number} v
   */
  set "video_duration"(v) {
    era['raw']().data['cflag'][this.id][491] = v;
  }
  /**
   * 录像价值
   * @returns {number}
   */
  get "video_value"() {
    return era['raw']().data['cflag'][this.id][493];
  }
  /**
   * 录像价值
   * @param {number} v
   */
  set "video_value"(v) {
    era['raw']().data['cflag'][this.id][493] = v;
  }
  /**
   * 录像狂热度
   * @returns {number}
   */
  get "video_mania"() {
    return era['raw']().data['cflag'][this.id][494];
  }
  /**
   * 录像狂热度
   * @param {number} v
   */
  set "video_mania"(v) {
    era['raw']().data['cflag'][this.id][494] = v;
  }
  /**
   * 录像浏览数
   * @returns {number}
   */
  get "video_views"() {
    return era['raw']().data['cflag'][this.id][495];
  }
  /**
   * 录像浏览数
   * @param {number} v
   */
  set "video_views"(v) {
    era['raw']().data['cflag'][this.id][495] = v;
  }
  /**
   * 录像粉丝信数
   * @returns {number}
   */
  get "video_fan_letters"() {
    return era['raw']().data['cflag'][this.id][496];
  }
  /**
   * 录像粉丝信数
   * @param {number} v
   */
  set "video_fan_letters"(v) {
    era['raw']().data['cflag'][this.id][496] = v;
  }
  /**
   * 录像公开许可
   * @returns {number}
   */
  get "video_public"() {
    return era['raw']().data['cflag'][this.id][497];
  }
  /**
   * 录像公开许可
   * @param {number} v
   */
  set "video_public"(v) {
    era['raw']().data['cflag'][this.id][497] = v;
  }
  /**
   * 录像属性
   * @returns {number}
   */
  get "video_attribute"() {
    return era['raw']().data['cflag'][this.id][498];
  }
  /**
   * 录像属性
   * @param {number} v
   */
  set "video_attribute"(v) {
    era['raw']().data['cflag'][this.id][498] = v;
  }
  /**
   * 水晶球充能次数
   * @returns {number}
   */
  get "crystal_ball_charges"() {
    return era['raw']().data['cflag'][this.id][499];
  }
  /**
   * 水晶球充能次数
   * @param {number} v
   */
  set "crystal_ball_charges"(v) {
    era['raw']().data['cflag'][this.id][499] = v;
  }
  /**
   * 迷宫内行动
   * @returns {number}
   */
  get "dungeon_action"() {
    return era['raw']().data['cflag'][this.id][500];
  }
  /**
   * 迷宫内行动
   * @param {number} v
   */
  set "dungeon_action"(v) {
    era['raw']().data['cflag'][this.id][500] = v;
  }
  /**
   * 侵攻阶层
   * @returns {number}
   */
  get "invasion_floor"() {
    return era['raw']().data['cflag'][this.id][501];
  }
  /**
   * 侵攻阶层
   * @param {number} v
   */
  set "invasion_floor"(v) {
    era['raw']().data['cflag'][this.id][501] = v;
  }
  /**
   * 侵攻度
   * @returns {number}
   */
  get "invasion_progress"() {
    return era['raw']().data['cflag'][this.id][502];
  }
  /**
   * 侵攻度
   * @param {number} v
   */
  set "invasion_progress"(v) {
    era['raw']().data['cflag'][this.id][502] = v;
  }
  /**
   * 休憩
   * @returns {number}
   */
  get "rest_flag"() {
    return era['raw']().data['cflag'][this.id][503];
  }
  /**
   * 休憩
   * @param {number} v
   */
  set "rest_flag"(v) {
    era['raw']().data['cflag'][this.id][503] = v;
  }
  /**
   * 要求奖赏
   * @returns {number}
   */
  get "requested_reward"() {
    return era['raw']().data['cflag'][this.id][504];
  }
  /**
   * 要求奖赏
   * @param {number} v
   */
  set "requested_reward"(v) {
    era['raw']().data['cflag'][this.id][504] = v;
  }
  /**
   * 勇者击破数
   * @returns {number}
   */
  get "heroes_defeated"() {
    return era['raw']().data['cflag'][this.id][505];
  }
  /**
   * 勇者击破数
   * @param {number} v
   */
  set "heroes_defeated"(v) {
    era['raw']().data['cflag'][this.id][505] = v;
  }
  /**
   * 新人
   * @returns {number}
   */
  get "newcomer"() {
    return era['raw']().data['cflag'][this.id][506];
  }
  /**
   * 新人
   * @param {number} v
   */
  set "newcomer"(v) {
    era['raw']().data['cflag'][this.id][506] = v;
  }
  /**
   * 回城标志
   * @returns {number}
   */
  get "returned_to_town"() {
    return era['raw']().data['cflag'][this.id][507];
  }
  /**
   * 回城标志
   * @param {number} v
   */
  set "returned_to_town"(v) {
    era['raw']().data['cflag'][this.id][507] = v;
  }
  /**
   * 再起点
   * @returns {number}
   */
  get "restart_point"() {
    return era['raw']().data['cflag'][this.id][508];
  }
  /**
   * 再起点
   * @param {number} v
   */
  set "restart_point"(v) {
    era['raw']().data['cflag'][this.id][508] = v;
  }
  /**
   * 迷失状态
   * @returns {number}
   */
  get "lost_state"() {
    return era['raw']().data['cflag'][this.id][509];
  }
  /**
   * 迷失状态
   * @param {number} v
   */
  set "lost_state"(v) {
    era['raw']().data['cflag'][this.id][509] = v;
  }
  /**
   * x坐标
   * @returns {number}
   */
  get "grid_x"() {
    return era['raw']().data['cflag'][this.id][510];
  }
  /**
   * x坐标
   * @param {number} v
   */
  set "grid_x"(v) {
    era['raw']().data['cflag'][this.id][510] = v;
  }
  /**
   * y坐标
   * @returns {number}
   */
  get "grid_y"() {
    return era['raw']().data['cflag'][this.id][511];
  }
  /**
   * y坐标
   * @param {number} v
   */
  set "grid_y"(v) {
    era['raw']().data['cflag'][this.id][511] = v;
  }
  /**
   * 陷阱回避补正
   * @returns {number}
   */
  get "trap_avoid_bonus"() {
    return era['raw']().data['cflag'][this.id][512];
  }
  /**
   * 陷阱回避补正
   * @param {number} v
   */
  set "trap_avoid_bonus"(v) {
    era['raw']().data['cflag'][this.id][512] = v;
  }
  /**
   * 上次陷阱编号
   * @returns {number}
   */
  get "last_trap_id"() {
    return era['raw']().data['cflag'][this.id][513];
  }
  /**
   * 上次陷阱编号
   * @param {number} v
   */
  set "last_trap_id"(v) {
    era['raw']().data['cflag'][this.id][513] = v;
  }
  /**
   * 阶层滞留计数
   * @returns {number}
   */
  get "floor_stay_count"() {
    return era['raw']().data['cflag'][this.id][514];
  }
  /**
   * 阶层滞留计数
   * @param {number} v
   */
  set "floor_stay_count"(v) {
    era['raw']().data['cflag'][this.id][514] = v;
  }
  /**
   * 剧情线阶进计数
   * @returns {number}
   */
  get "story_route_counter"() {
    return era['raw']().data['cflag'][this.id][515];
  }
  /**
   * 剧情线阶进计数
   * @param {number} v
   */
  set "story_route_counter"(v) {
    era['raw']().data['cflag'][this.id][515] = v;
  }
  /**
   * 目标阶层
   * @returns {number}
   */
  get "target_floor"() {
    return era['raw']().data['cflag'][this.id][520];
  }
  /**
   * 目标阶层
   * @param {number} v
   */
  set "target_floor"(v) {
    era['raw']().data['cflag'][this.id][520] = v;
  }
  /**
   * 存档点
   * @returns {number}
   */
  get "save_point"() {
    return era['raw']().data['cflag'][this.id][521];
  }
  /**
   * 存档点
   * @param {number} v
   */
  set "save_point"(v) {
    era['raw']().data['cflag'][this.id][521] = v;
  }
  /**
   * 行动完了
   * @returns {number}
   */
  get "action_done"() {
    return era['raw']().data['cflag'][this.id][530];
  }
  /**
   * 行动完了
   * @param {number} v
   */
  set "action_done"(v) {
    era['raw']().data['cflag'][this.id][530] = v;
  }
  /**
   * 同伴_0
   * @returns {number}
   */
  get "companion_a"() {
    return era['raw']().data['cflag'][this.id][531];
  }
  /**
   * 同伴_0
   * @param {number} v
   */
  set "companion_a"(v) {
    era['raw']().data['cflag'][this.id][531] = v;
  }
  /**
   * 同伴_1
   * @returns {number}
   */
  get "companion_b"() {
    return era['raw']().data['cflag'][this.id][532];
  }
  /**
   * 同伴_1
   * @param {number} v
   */
  set "companion_b"(v) {
    era['raw']().data['cflag'][this.id][532] = v;
  }
  /**
   * 队长记忆
   * @returns {number}
   */
  get "leader_memory"() {
    return era['raw']().data['cflag'][this.id][533];
  }
  /**
   * 队长记忆
   * @param {number} v
   */
  set "leader_memory"(v) {
    era['raw']().data['cflag'][this.id][533] = v;
  }
  /**
   * 已接任务
   * @returns {number}
   */
  get "accepted_quest"() {
    return era['raw']().data['cflag'][this.id][534];
  }
  /**
   * 已接任务
   * @param {number} v
   */
  set "accepted_quest"(v) {
    era['raw']().data['cflag'][this.id][534] = v;
  }
  /**
   * 任务报酬类型
   * @returns {number}
   */
  get "quest_reward_type"() {
    return era['raw']().data['cflag'][this.id][535];
  }
  /**
   * 任务报酬类型
   * @param {number} v
   */
  set "quest_reward_type"(v) {
    era['raw']().data['cflag'][this.id][535] = v;
  }
  /**
   * 任务障碍位图
   * @returns {number}
   */
  get "quest_obstacle_bits"() {
    return era['raw']().data['cflag'][this.id][536];
  }
  /**
   * 任务障碍位图
   * @param {number} v
   */
  set "quest_obstacle_bits"(v) {
    era['raw']().data['cflag'][this.id][536] = v;
  }
  /**
   * 任务类型
   * @returns {number}
   */
  get "quest_type"() {
    return era['raw']().data['cflag'][this.id][537];
  }
  /**
   * 任务类型
   * @param {number} v
   */
  set "quest_type"(v) {
    era['raw']().data['cflag'][this.id][537] = v;
  }
  /**
   * 讨伐对象
   * @returns {number}
   */
  get "quest_target_monster"() {
    return era['raw']().data['cflag'][this.id][538];
  }
  /**
   * 讨伐对象
   * @param {number} v
   */
  set "quest_target_monster"(v) {
    era['raw']().data['cflag'][this.id][538] = v;
  }
  /**
   * 任务受注计数
   * @returns {number}
   */
  get "quest_accept_count"() {
    return era['raw']().data['cflag'][this.id][539];
  }
  /**
   * 任务受注计数
   * @param {number} v
   */
  set "quest_accept_count"(v) {
    era['raw']().data['cflag'][this.id][539] = v;
  }
  /**
   * 任务人称变体
   * @returns {number}
   */
  get "quest_victim_variant"() {
    return era['raw']().data['cflag'][this.id][540];
  }
  /**
   * 任务人称变体
   * @param {number} v
   */
  set "quest_victim_variant"(v) {
    era['raw']().data['cflag'][this.id][540] = v;
  }
  /**
   * 武装
   * @returns {number}
   */
  get "weapon"() {
    return era['raw']().data['cflag'][this.id][550];
  }
  /**
   * 武装
   * @param {number} v
   */
  set "weapon"(v) {
    era['raw']().data['cflag'][this.id][550] = v;
  }
  /**
   * 装饰
   * @returns {number}
   */
  get "accessory"() {
    return era['raw']().data['cflag'][this.id][551];
  }
  /**
   * 装饰
   * @param {number} v
   */
  set "accessory"(v) {
    era['raw']().data['cflag'][this.id][551] = v;
  }
  /**
   * 装饰2
   * @returns {number}
   */
  get "accessory2"() {
    return era['raw']().data['cflag'][this.id][552];
  }
  /**
   * 装饰2
   * @param {number} v
   */
  set "accessory2"(v) {
    era['raw']().data['cflag'][this.id][552] = v;
  }
  /**
   * 从属怪物
   * @returns {number}
   */
  get "subjugated_monster"() {
    return era['raw']().data['cflag'][this.id][570];
  }
  /**
   * 从属怪物
   * @param {number} v
   */
  set "subjugated_monster"(v) {
    era['raw']().data['cflag'][this.id][570] = v;
  }
  /**
   * 弹药
   * @returns {number}
   */
  get "ammunition"() {
    return era['raw']().data['cflag'][this.id][571];
  }
  /**
   * 弹药
   * @param {number} v
   */
  set "ammunition"(v) {
    era['raw']().data['cflag'][this.id][571] = v;
  }
  /**
   * 所持金
   * @returns {number}
   */
  get "money"() {
    return era['raw']().data['cflag'][this.id][580];
  }
  /**
   * 所持金
   * @param {number} v
   */
  set "money"(v) {
    era['raw']().data['cflag'][this.id][580] = v;
  }
  /**
   * 战利品换金
   * @returns {number}
   */
  get "loot_value"() {
    return era['raw']().data['cflag'][this.id][581];
  }
  /**
   * 战利品换金
   * @param {number} v
   */
  set "loot_value"(v) {
    era['raw']().data['cflag'][this.id][581] = v;
  }
  /**
   * 借款
   * @returns {number}
   */
  get "debt"() {
    return era['raw']().data['cflag'][this.id][582];
  }
  /**
   * 借款
   * @param {number} v
   */
  set "debt"(v) {
    era['raw']().data['cflag'][this.id][582] = v;
  }
  /**
   * 强制精饮计数
   * @returns {number}
   */
  get "compulsive_semen_drink_count"() {
    return era['raw']().data['cflag'][this.id][600];
  }
  /**
   * 强制精饮计数
   * @param {number} v
   */
  set "compulsive_semen_drink_count"(v) {
    era['raw']().data['cflag'][this.id][600] = v;
  }
  /**
   * 结婚对象
   * @returns {number}
   */
  get "spouse"() {
    return era['raw']().data['cflag'][this.id][601];
  }
  /**
   * 结婚对象
   * @param {number} v
   */
  set "spouse"(v) {
    era['raw']().data['cflag'][this.id][601] = v;
  }
  /**
   * 结婚爱情
   * @returns {number}
   */
  get "spousal_love"() {
    return era['raw']().data['cflag'][this.id][602];
  }
  /**
   * 结婚爱情
   * @param {number} v
   */
  set "spousal_love"(v) {
    era['raw']().data['cflag'][this.id][602] = v;
  }
  /**
   * 结婚对象状态
   * @returns {number}
   */
  get "spouse_status"() {
    return era['raw']().data['cflag'][this.id][603];
  }
  /**
   * 结婚对象状态
   * @param {number} v
   */
  set "spouse_status"(v) {
    era['raw']().data['cflag'][this.id][603] = v;
  }
  /**
   * 血缘名字编号
   * @returns {number}
   */
  get "blood_relation_name"() {
    return era['raw']().data['cflag'][this.id][604];
  }
  /**
   * 血缘名字编号
   * @param {number} v
   */
  set "blood_relation_name"(v) {
    era['raw']().data['cflag'][this.id][604] = v;
  }
  /**
   * 血缘关系数据
   * @returns {number}
   */
  get "blood_relation_data"() {
    return era['raw']().data['cflag'][this.id][605];
  }
  /**
   * 血缘关系数据
   * @param {number} v
   */
  set "blood_relation_data"(v) {
    era['raw']().data['cflag'][this.id][605] = v;
  }
  /**
   * 恋人
   * @returns {number}
   */
  get "lover"() {
    return era['raw']().data['cflag'][this.id][606];
  }
  /**
   * 恋人
   * @param {number} v
   */
  set "lover"(v) {
    era['raw']().data['cflag'][this.id][606] = v;
  }
  /**
   * 恋人爱情
   * @returns {number}
   */
  get "lover_love"() {
    return era['raw']().data['cflag'][this.id][607];
  }
  /**
   * 恋人爱情
   * @param {number} v
   */
  set "lover_love"(v) {
    era['raw']().data['cflag'][this.id][607] = v;
  }
  /**
   * 恋人名字
   * @returns {number}
   */
  get "lover_name"() {
    return era['raw']().data['cflag'][this.id][608];
  }
  /**
   * 恋人名字
   * @param {number} v
   */
  set "lover_name"(v) {
    era['raw']().data['cflag'][this.id][608] = v;
  }
  /**
   * 结婚对象名字编号
   * @returns {number}
   */
  get "spouse_name"() {
    return era['raw']().data['cflag'][this.id][609];
  }
  /**
   * 结婚对象名字编号
   * @param {number} v
   */
  set "spouse_name"(v) {
    era['raw']().data['cflag'][this.id][609] = v;
  }
  /**
   * 恋人id
   * @returns {number}
   */
  get "lover_id"() {
    return era['raw']().data['cflag'][this.id][610];
  }
  /**
   * 恋人id
   * @param {number} v
   */
  set "lover_id"(v) {
    era['raw']().data['cflag'][this.id][610] = v;
  }
  /**
   * ntr再捕获
   * @returns {number}
   */
  get "ntr_recapture"() {
    return era['raw']().data['cflag'][this.id][650];
  }
  /**
   * ntr再捕获
   * @param {number} v
   */
  set "ntr_recapture"(v) {
    era['raw']().data['cflag'][this.id][650] = v;
  }
  /**
   * ntr_651
   * @returns {number}
   */
  get "ntr_651"() {
    return era['raw']().data['cflag'][this.id][651];
  }
  /**
   * ntr_651
   * @param {number} v
   */
  set "ntr_651"(v) {
    era['raw']().data['cflag'][this.id][651] = v;
  }
  /**
   * ntr_652
   * @returns {number}
   */
  get "ntr_652"() {
    return era['raw']().data['cflag'][this.id][652];
  }
  /**
   * ntr_652
   * @param {number} v
   */
  set "ntr_652"(v) {
    era['raw']().data['cflag'][this.id][652] = v;
  }
  /**
   * ntr_653
   * @returns {number}
   */
  get "ntr_653"() {
    return era['raw']().data['cflag'][this.id][653];
  }
  /**
   * ntr_653
   * @param {number} v
   */
  set "ntr_653"(v) {
    era['raw']().data['cflag'][this.id][653] = v;
  }
  /**
   * ntr_654
   * @returns {number}
   */
  get "ntr_654"() {
    return era['raw']().data['cflag'][this.id][654];
  }
  /**
   * ntr_654
   * @param {number} v
   */
  set "ntr_654"(v) {
    era['raw']().data['cflag'][this.id][654] = v;
  }
  /**
   * ntr_655
   * @returns {number}
   */
  get "ntr_655"() {
    return era['raw']().data['cflag'][this.id][655];
  }
  /**
   * ntr_655
   * @param {number} v
   */
  set "ntr_655"(v) {
    era['raw']().data['cflag'][this.id][655] = v;
  }
  /**
   * ntr_656
   * @returns {number}
   */
  get "ntr_656"() {
    return era['raw']().data['cflag'][this.id][656];
  }
  /**
   * ntr_656
   * @param {number} v
   */
  set "ntr_656"(v) {
    era['raw']().data['cflag'][this.id][656] = v;
  }
  /**
   * ntr_657
   * @returns {number}
   */
  get "ntr_657"() {
    return era['raw']().data['cflag'][this.id][657];
  }
  /**
   * ntr_657
   * @param {number} v
   */
  set "ntr_657"(v) {
    era['raw']().data['cflag'][this.id][657] = v;
  }
  /**
   * 示众台正字_肉穴
   * @returns {number}
   */
  get "pillory_tally_vagina"() {
    return era['raw']().data['cflag'][this.id][661];
  }
  /**
   * 示众台正字_肉穴
   * @param {number} v
   */
  set "pillory_tally_vagina"(v) {
    era['raw']().data['cflag'][this.id][661] = v;
  }
  /**
   * 示众台正字_肛门
   * @returns {number}
   */
  get "pillory_tally_anus"() {
    return era['raw']().data['cflag'][this.id][662];
  }
  /**
   * 示众台正字_肛门
   * @param {number} v
   */
  set "pillory_tally_anus"(v) {
    era['raw']().data['cflag'][this.id][662] = v;
  }
  /**
   * 示众台正字_口
   * @returns {number}
   */
  get "pillory_tally_mouth"() {
    return era['raw']().data['cflag'][this.id][663];
  }
  /**
   * 示众台正字_口
   * @param {number} v
   */
  set "pillory_tally_mouth"(v) {
    era['raw']().data['cflag'][this.id][663] = v;
  }
  /**
   * 示众台正字_胸
   * @returns {number}
   */
  get "pillory_tally_breast"() {
    return era['raw']().data['cflag'][this.id][664];
  }
  /**
   * 示众台正字_胸
   * @param {number} v
   */
  set "pillory_tally_breast"(v) {
    era['raw']().data['cflag'][this.id][664] = v;
  }
  /**
   * 示众台正字_其他
   * @returns {number}
   */
  get "pillory_tally_other"() {
    return era['raw']().data['cflag'][this.id][665];
  }
  /**
   * 示众台正字_其他
   * @param {number} v
   */
  set "pillory_tally_other"(v) {
    era['raw']().data['cflag'][this.id][665] = v;
  }
  /**
   * 自动调教
   * @returns {number}
   */
  get "auto_train"() {
    return era['raw']().data['cflag'][this.id][666];
  }
  /**
   * 自动调教
   * @param {number} v
   */
  set "auto_train"(v) {
    era['raw']().data['cflag'][this.id][666] = v;
  }
  /**
   * 自动调教回数
   * @returns {number}
   */
  get "auto_train_count"() {
    return era['raw']().data['cflag'][this.id][667];
  }
  /**
   * 自动调教回数
   * @param {number} v
   */
  set "auto_train_count"(v) {
    era['raw']().data['cflag'][this.id][667] = v;
  }
  /**
   * 调教后欲情
   * @returns {number}
   */
  get "post_train_desire"() {
    return era['raw']().data['cflag'][this.id][668];
  }
  /**
   * 调教后欲情
   * @param {number} v
   */
  set "post_train_desire"(v) {
    era['raw']().data['cflag'][this.id][668] = v;
  }
  /**
   * 防御弱化率
   * @returns {number}
   */
  get "defense_down_rate"() {
    return era['raw']().data['cflag'][this.id][680];
  }
  /**
   * 防御弱化率
   * @param {number} v
   */
  set "defense_down_rate"(v) {
    era['raw']().data['cflag'][this.id][680] = v;
  }
  /**
   * 攻击弱化率
   * @returns {number}
   */
  get "attack_down_rate"() {
    return era['raw']().data['cflag'][this.id][681];
  }
  /**
   * 攻击弱化率
   * @param {number} v
   */
  set "attack_down_rate"(v) {
    era['raw']().data['cflag'][this.id][681] = v;
  }
  /**
   * 魔法伤害上升率
   * @returns {number}
   */
  get "magic_damage_up_rate"() {
    return era['raw']().data['cflag'][this.id][682];
  }
  /**
   * 魔法伤害上升率
   * @param {number} v
   */
  set "magic_damage_up_rate"(v) {
    era['raw']().data['cflag'][this.id][682] = v;
  }
  /**
   * 收藏
   * @returns {number}
   */
  get "favorite"() {
    return era['raw']().data['cflag'][this.id][700];
  }
  /**
   * 收藏
   * @param {number} v
   */
  set "favorite"(v) {
    era['raw']().data['cflag'][this.id][700] = v;
  }
  /**
   * 待处刑标签
   * @returns {number}
   */
  get "pending_execution_tag"() {
    return era['raw']().data['cflag'][this.id][777];
  }
  /**
   * 待处刑标签
   * @param {number} v
   */
  set "pending_execution_tag"(v) {
    era['raw']().data['cflag'][this.id][777] = v;
  }
  /**
   * 特殊角色标记
   * @returns {number}
   */
  get "special_chara_mark"() {
    return era['raw']().data['cflag'][this.id][800];
  }
  /**
   * 特殊角色标记
   * @param {number} v
   */
  set "special_chara_mark"(v) {
    era['raw']().data['cflag'][this.id][800] = v;
  }
  /**
   * 寿命
   * @returns {number}
   */
  get "shadow_lifespan"() {
    return era['raw']().data['cflag'][this.id][820];
  }
  /**
   * 寿命
   * @param {number} v
   */
  set "shadow_lifespan"(v) {
    era['raw']().data['cflag'][this.id][820] = v;
  }
  /**
   * 异界召唤标记
   * @returns {number}
   */
  get "otherworld_summon_mark"() {
    return era['raw']().data['cflag'][this.id][999];
  }
  /**
   * 异界召唤标记
   * @param {number} v
   */
  set "otherworld_summon_mark"(v) {
    era['raw']().data['cflag'][this.id][999] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`cflag:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`cflag:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraCflag;
// GENERATED END