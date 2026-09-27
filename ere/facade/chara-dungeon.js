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
   * 凌辱畏怖记忆_怪物（cflag:cid:130）
   * CFLAG:ARG:130 = LOCAL:1（被凌辱モンスターID記憶）
   * @returns {number}
   */
  get 凌辱畏怖记忆_怪物() {
    return era.get(`cflag:${this.cid}:130`) || 0;
  }
  /**
   * @param {number} v
   */
  set 凌辱畏怖记忆_怪物(v) {
    era.set(`cflag:${this.cid}:130`, v);
  }

  /**
   * 凌辱畏怖计数（cflag:cid:131）
   * CFLAG:ARG:131（凌辱畏怖記憶の回数；战斗按它做伤害减免/增伤）
   * @returns {number}
   */
  get 凌辱畏怖计数() {
    return era.get(`cflag:${this.cid}:131`) || 0;
  }
  /**
   * @param {number} v
   */
  set 凌辱畏怖计数(v) {
    era.set(`cflag:${this.cid}:131`, v);
  }

  /**
   * 休憩（cflag:cid:503）
   * CFLAG:503 フラグ（回合结算的休憩判定消费）
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
   * 目标阶层（cflag:cid:520）
   * CFLAG:520 目標階層
   * @returns {number}
   */
  get 目标阶层() {
    return era.get(`cflag:${this.cid}:520`) || 0;
  }
  /**
   * @param {number} v
   */
  set 目标阶层(v) {
    era.set(`cflag:${this.cid}:520`, v);
  }

  /**
   * 已接任务（cflag:cid:534）
   * CFLAG:534 受注クエスト
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

  /**
   * 攻击力（cflag:cid:11）
   * CFLAG:11 = 攻撃力（weapon_restore 每日重算写入）
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
   * 防御力（cflag:cid:12）
   * CFLAG:12 = 防御力（weapon_restore 每日重算写入）
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
   * 客膣内射精（cflag:cid:105）
   * CFLAG:105 娼館などの客から奴隷への中田氏カウント用
   * @returns {number}
   */
  get 客膣内射精() {
    return era.get(`cflag:${this.cid}:105`) || 0;
  }
  /**
   * @param {number} v
   */
  set 客膣内射精(v) {
    era.set(`cflag:${this.cid}:105`, v);
  }

  /**
   * 犬膣内射精（cflag:cid:106）
   * CFLAG:106 ノラ犬からの中田氏カウント用
   * @returns {number}
   */
  get 犬膣内射精() {
    return era.get(`cflag:${this.cid}:106`) || 0;
  }
  /**
   * @param {number} v
   */
  set 犬膣内射精(v) {
    era.set(`cflag:${this.cid}:106`, v);
  }

  /**
   * 怪物膣内射精（cflag:cid:107）
   * CFLAG:107 モンスター・触手から奴隷への膣内射精カウント用
   * @returns {number}
   */
  get 怪物膣内射精() {
    return era.get(`cflag:${this.cid}:107`) || 0;
  }
  /**
   * @param {number} v
   */
  set 怪物膣内射精(v) {
    era.set(`cflag:${this.cid}:107`, v);
  }

  /**
   * 胎儿怪物编号（cflag:cid:112）
   * CFLAG:112 = 怀孕中的怪物编号
   * @returns {number}
   */
  get 胎儿怪物编号() {
    return era.get(`cflag:${this.cid}:112`) || 0;
  }
  /**
   * @param {number} v
   */
  set 胎儿怪物编号(v) {
    era.set(`cflag:${this.cid}:112`, v);
  }

  /**
   * 侵攻阶层（cflag:cid:501）
   * CFLAG:501 侵攻階層
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
   * 勇者击破数（cflag:cid:505）
   * CFLAG:505 勇者撃破数
   * @returns {number}
   */
  get 勇者击破数() {
    return era.get(`cflag:${this.cid}:505`) || 0;
  }
  /**
   * @param {number} v
   */
  set 勇者击破数(v) {
    era.set(`cflag:${this.cid}:505`, v);
  }

  /**
   * 再起点（cflag:cid:508）
   * CFLAG:508 再起ポイント（ダンジョン外で全回復するために必要。階層突破で増加）
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
   * 弹药（cflag:cid:571）
   * CFLAG:ATKER/DEFER:571 = 15（对人决斗弹药补充；对人格斗一族的弾薬消耗同族字段见 550-552 装备枠）
   * @returns {number}
   */
  get 弹药() {
    return era.get(`cflag:${this.cid}:571`) || 0;
  }
  /**
   * @param {number} v
   */
  set 弹药(v) {
    era.set(`cflag:${this.cid}:571`, v);
  }

  /**
   * 所持金（cflag:cid:580）
   * 勇者所持金（城镇经济消费，enter_enemy 的初期加算同此下标）
   * @returns {number}
   */
  get 所持金() {
    return era.get(`cflag:${this.cid}:580`) || 0;
  }
  /**
   * @param {number} v
   */
  set 所持金(v) {
    era.set(`cflag:${this.cid}:580`, v);
  }

  /**
   * 恋人（cflag:cid:606）
   * CFLAG:606 = 恋人（ere/dungeon/dungeon-lovers.js）
   * @returns {number}
   */
  get 恋人() {
    return era.get(`cflag:${this.cid}:606`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋人(v) {
    era.set(`cflag:${this.cid}:606`, v);
  }

  /**
   * 恋人爱情（cflag:cid:607）
   * CFLAG:607 = 恋人愛情（ere/dungeon/dungeon-lovers.js）
   * @returns {number}
   */
  get 恋人爱情() {
    return era.get(`cflag:${this.cid}:607`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋人爱情(v) {
    era.set(`cflag:${this.cid}:607`, v);
  }

  /**
   * 恋人名字（cflag:cid:608）
   * CFLAG:608 = 恋人の名前（ere/dungeon/dungeon-lovers.js）
   * @returns {number}
   */
  get 恋人名字() {
    return era.get(`cflag:${this.cid}:608`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋人名字(v) {
    era.set(`cflag:${this.cid}:608`, v);
  }

  /**
   * 恋人ID（cflag:cid:610）
   * CFLAG:610 = 恋人のID（キャラのときのみ）
   * @returns {number}
   */
  get 恋人ID() {
    return era.get(`cflag:${this.cid}:610`) || 0;
  }
  /**
   * @param {number} v
   */
  set 恋人ID(v) {
    era.set(`cflag:${this.cid}:610`, v);
  }

  // —— base ——
  /**
   * 体力（base:cid:0）
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
   * 气力（base:cid:1）
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
   * 谜之魅力（talent:cid:92）
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
   * 魅力（talent:cid:113）
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
   * 高人气（talent:cid:126）
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
   * 妓女（talent:cid:180）
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
   * 倾城（talent:cid:181）
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
   * 巧言（talent:cid:182）
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
   * 歌姫（talent:cid:185）
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
   * 舞姫（talent:cid:186）
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
   * 私处产卵（talent:cid:190）
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
   * 直肠产卵（talent:cid:191）
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
   * 肛门虫（talent:cid:193）
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
   * 战士（talent:cid:200）
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
   * 魔法师（talent:cid:201）
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
   * 神官（talent:cid:202）
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
   * 盗贼（talent:cid:203）
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
   * 肉便器（talent:cid:204）
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
   * 骑士（talent:cid:205）
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
   * 巫女（talent:cid:206）
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
   * 忍者（talent:cid:207）
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
   * 弓手（talent:cid:208）
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
   * 苗床（talent:cid:209）
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
   * 私处经验（exp:cid:0）
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
   * 肛门经验（exp:cid:1）
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
   * 绝顶经验（exp:cid:2）
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
   * 性交经验（exp:cid:5）
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
   * 精饮绝顶经验（exp:cid:8）
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
   * 自慰经验（exp:cid:10）
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
   * 调教自慰经验（exp:cid:11）
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
   * 精液经验（exp:cid:20）
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
   * 侍奉快乐经验（exp:cid:21）
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
   * 口交经验（exp:cid:22）
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
   * 被虐快乐经验（exp:cid:30）
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
   * 施虐快乐经验（exp:cid:33）
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
   * 异常经验（exp:cid:50）
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
   * 私处扩张经验（exp:cid:52）
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
   * 肛门扩张经验（exp:cid:53）
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
   * 触手经验（exp:cid:55）
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
   * 兽奸经验（exp:cid:56）
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
   * 药物经验（exp:cid:57）
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
   * 调教会话经验（exp:cid:73）
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
   * 卖淫经验（exp:cid:74）
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
   * 战斗经验（exp:cid:80）
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
/**
 * 气力上限（maxbase:cid:1 ↔ MAXBASE:1）。
 * 生成器暂不生成 maxbase 门面（同 体力上限 的注），#392 的 CHAR_CUSTOM.CASE 20-23
 * 需要它（`BASE:A:1 = MAXBASE:A:1`）——跨域写走门面（#71），故在此补一条。
 */
Object.defineProperty(DungeonFacade.prototype, '气力上限', {
  get() {
    return era.get(`maxbase:${this.cid}:1`) || 0;
  },
  set(v) {
    era.set(`maxbase:${this.cid}:1`, v);
  },
});

Object.defineProperty(DungeonFacade.prototype, '体力上限', {
  /** MAXBASE:0 与 BASE:0 同属 dungeon 域；生成器暂不生成 maxbase 门面。 */
  get() {
    return era.get(`maxbase:${this.cid}:0`) || 0;
  },
  set(v) {
    era.set(`maxbase:${this.cid}:0`, v);
  },
});

module.exports = DungeonFacade;
