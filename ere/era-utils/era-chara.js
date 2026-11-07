// GENERATED START
const era = require('#/era-electron');

const EraAbl = require('./chara/era-abl.js');
const EraBase = require('./chara/era-base.js');
const EraC_relation = require('./chara/era-c_relation.js');
const EraC_relation_sub = require('./chara/era-c_relation_sub.js');
const EraCflag = require('./chara/era-cflag.js');
const EraCstr = require('./chara/era-cstr.js');
const EraDelta = require('./chara/era-delta.js');
const EraDeltabase = require('./chara/era-deltabase.js');
const EraEquip = require('./chara/era-equip.js');
const EraEx = require('./chara/era-ex.js');
const EraEx_talent = require('./chara/era-ex_talent.js');
const EraExp = require('./chara/era-exp.js');
const EraGotjewel = require('./chara/era-gotjewel.js');
const EraJewel = require('./chara/era-jewel.js');
const EraMark = require('./chara/era-mark.js');
const EraMaxbase = require('./chara/era-maxbase.js');
const EraNowex = require('./chara/era-nowex.js');
const EraParam = require('./chara/era-param.js');
const EraPortcflag = require('./chara/era-portcflag.js');
const EraSource = require('./chara/era-source.js');
const EraStain = require('./chara/era-stain.js');
const EraTalent = require('./chara/era-talent.js');
const EraTequip = require('./chara/era-tequip.js');

class EraChara {
  /**
   * 缓存
   * @type {Record<string,EraChara>}
   */
  static #cache = {};

  /**
   * 获取角色的对象
   * @param {number} id 角色的ID
   * @returns {EraChara}
   */
  static get(id) {
    if (!EraChara.#cache[id]) {
      EraChara.#cache[id] = new EraChara(id);
    }
    return EraChara.#cache[id];
  }

  /**
   * 返回所有角色的 ID 数组
   * @retuns {number}
   */
  static get all() {
    return era.getAllCharacters();
  }

  /**
   * 返回已添加角色的 ID 数组
   * @retuns {number}
   */
  static get added() {
    return era.getAddedCharacters();
  }

  /**
   * 该角色的编号
   * @type {number}
   */
  id;

  /**
   * 该角色的真名
   * @returns {string}
   */
  get name() {
    return era.get(`callname:${this.id}:-1`);
  }

  /**
   * 该角色的真名
   * @param {string} v
   */
  set name(v) {
    era.set(`callname:${this.id}:-1`, v);
  }

  /**
   * 旁白与其他角色对该角色的默认称呼
   * @returns {string}
   */
  get callname() {
    return era.get(`callname:${this.id}:-2`);
  }

  /**
   * 旁白与其他角色对该角色的默认称呼
   * @param {string} v
   */
  set callname(v) {
    era.set(`callname:${this.id}:-2`, v);
  }

  /**
   * 对主角的爱慕
   * @returns {number}
   */
  get love() {
    return era.get(`love:${this.id}`);
  }

  /**
   * 对主角的爱慕
   * @param {number} v
   */
  set love(v) {
    era.set(`love:${this.id}`, v);
  }

  /**
   * 角色的称号，定义在静态数据文件中，只读
   * @returns {string|undefined}
   */
  get title() {
    return era.get(`static:${this.id}:title`);
  }

  /**
   * 获取对其他角色的称呼
   * @param {number|string} chara_id 要获取称呼的目标角色
   * @returns {string}
   */
  callname_to(chara_id) {
    return era.get(`callname:${this.id}:${chara_id}`);
  }

  /**
   * 设置对其他角色的称呼
   * @param {number|string} chara_id 要设置称呼的目标角色
   * @param {string} callname 对目标角色的新称呼
   * @returns {string}
   */
  set_callname_to(chara_id, callname) {
    return era.set(`callname:${this.id}:${chara_id}`, callname);
  }

  /**
   * 获取对其他所有角色的称呼
   * @returns {Record<string, string>} 结果Record，键是其他角色ID，值是对该角色的称呼
   */
  get_all_callnames() {
    return era.get(`callname:${this.id}`);
  }

  /**
   * 获取对其他角色的好感/信赖
   * @param {number|string} chara_id 要获取好感/信赖的目标角色
   * @returns {number}
   */
  relation_to(chara_id) {
    return era.get(`relation:${this.id}:${chara_id}`);
  }

  /**
   * 设置对其他角色的好感/信赖
   * @param {number|string} chara_id 要设置好感/信赖的目标角色
   * @param {number} relation 对目标角色的新好感/信赖
   * @returns {number}
   */
  set_relation_to(chara_id, relation) {
    return era.set(`relation:${this.id}:${chara_id}`, relation);
  }

  /**
   * 获取对其他所有角色的好感/信赖
   * @returns {Record<string, number>} 结果Record，键是其他角色ID，值是对该角色的好感/信赖
   */
  get_all_relations() {
    return era.get(`relation:${this.id}`);
  }

  /** @type {EraAbl} */
  abl;
  /** @type {EraBase} */
  base;
  /** @type {EraC_relation} */
  c_relation;
  /** @type {EraC_relation_sub} */
  c_relation_sub;
  /** @type {EraCflag} */
  cflag;
  /** @type {EraCstr} */
  cstr;
  /** @type {EraDelta} */
  delta;
  /** @type {EraDeltabase} */
  deltabase;
  /** @type {EraEquip} */
  equip;
  /** @type {EraEx} */
  ex;
  /** @type {EraEx_talent} */
  ex_talent;
  /** @type {EraExp} */
  exp;
  /** @type {EraGotjewel} */
  gotjewel;
  /** @type {EraJewel} */
  jewel;
  /** @type {EraMark} */
  mark;
  /** @type {EraMaxbase} */
  maxbase;
  /** @type {EraNowex} */
  nowex;
  /** @type {EraParam} */
  param;
  /** @type {EraPortcflag} */
  portcflag;
  /** @type {EraSource} */
  source;
  /** @type {EraStain} */
  stain;
  /** @type {EraTalent} */
  talent;
  /** @type {EraTequip} */
  tequip;

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
    this.abl = new EraAbl(chara_id);
    this.base = new EraBase(chara_id);
    this.c_relation = new EraC_relation(chara_id);
    this.c_relation_sub = new EraC_relation_sub(chara_id);
    this.cflag = new EraCflag(chara_id);
    this.cstr = new EraCstr(chara_id);
    this.delta = new EraDelta(chara_id);
    this.deltabase = new EraDeltabase(chara_id);
    this.equip = new EraEquip(chara_id);
    this.ex = new EraEx(chara_id);
    this.ex_talent = new EraEx_talent(chara_id);
    this.exp = new EraExp(chara_id);
    this.gotjewel = new EraGotjewel(chara_id);
    this.jewel = new EraJewel(chara_id);
    this.mark = new EraMark(chara_id);
    this.maxbase = new EraMaxbase(chara_id);
    this.nowex = new EraNowex(chara_id);
    this.param = new EraParam(chara_id);
    this.portcflag = new EraPortcflag(chara_id);
    this.source = new EraSource(chara_id);
    this.stain = new EraStain(chara_id);
    this.talent = new EraTalent(chara_id);
    this.tequip = new EraTequip(chara_id);
  }
}

module.exports = EraChara;
// GENERATED END