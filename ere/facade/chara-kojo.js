/**
 * @file 角色变量的kojo域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).kojo.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改
class KojoFacade {
  constructor(cid) {
    this.cid = cid;
  }

  /**
   * 肉亲_0（cflag:cid:21 ↔ CFLAG:21）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:21～25 肉亲关系
   * @returns {number}
   */
  get 肉亲_0() {
    return era.get(`cflag:${this.cid}:21`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肉亲_0(v) {
    era.set(`cflag:${this.cid}:21`, v);
  }

  /**
   * 初调教（cflag:cid:201 ↔ CFLAG:201）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行57 初调教时
   * @returns {number}
   */
  get 初调教() {
    return era.get(`cflag:${this.cid}:201`) || 0;
  }
  /**
   * @param {number} v
   */
  set 初调教(v) {
    era.set(`cflag:${this.cid}:201`, v);
  }

  /**
   * 简易助手_0（cflag:cid:202 ↔ CFLAG:202）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行123 简易助手口上 CFLAG:202～210
   * @returns {number}
   */
  get 简易助手_0() {
    return era.get(`cflag:${this.cid}:202`) || 0;
  }
  /**
   * @param {number} v
   */
  set 简易助手_0(v) {
    era.set(`cflag:${this.cid}:202`, v);
  }

  /**
   * 简易助手_1（cflag:cid:203 ↔ CFLAG:203）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行123
   * @returns {number}
   */
  get 简易助手_1() {
    return era.get(`cflag:${this.cid}:203`) || 0;
  }
  /**
   * @param {number} v
   */
  set 简易助手_1(v) {
    era.set(`cflag:${this.cid}:203`, v);
  }

  /**
   * 简易助手_2（cflag:cid:204 ↔ CFLAG:204）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行123
   * @returns {number}
   */
  get 简易助手_2() {
    return era.get(`cflag:${this.cid}:204`) || 0;
  }
  /**
   * @param {number} v
   */
  set 简易助手_2(v) {
    era.set(`cflag:${this.cid}:204`, v);
  }

  /**
   * 首次C绝顶_K14（cflag:cid:214 ↔ CFLAG:214）
   * 源: 口上/EVENT_K14_貴公子.ERB 初めてC絶頂 CFLAG:214
   * @returns {number}
   */
  get 首次C绝顶_K14() {
    return era.get(`cflag:${this.cid}:214`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次C绝顶_K14(v) {
    era.set(`cflag:${this.cid}:214`, v);
  }

  /**
   * 首次润滑Lv2（cflag:cid:221 ↔ CFLAG:221）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次润滑Lv2
   * @returns {number}
   */
  get 首次润滑Lv2() {
    return era.get(`cflag:${this.cid}:221`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次润滑Lv2(v) {
    era.set(`cflag:${this.cid}:221`, v);
  }

  /**
   * 首次欲情Lv2（cflag:cid:222 ↔ CFLAG:222）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次欲情Lv2
   * @returns {number}
   */
  get 首次欲情Lv2() {
    return era.get(`cflag:${this.cid}:222`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次欲情Lv2(v) {
    era.set(`cflag:${this.cid}:222`, v);
  }

  /**
   * 首次耻情Lv2（cflag:cid:223 ↔ CFLAG:223）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次耻情Lv2
   * @returns {number}
   */
  get 首次耻情Lv2() {
    return era.get(`cflag:${this.cid}:223`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次耻情Lv2(v) {
    era.set(`cflag:${this.cid}:223`, v);
  }

  /**
   * 首次恐怖Lv2（cflag:cid:224 ↔ CFLAG:224）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次恐怖Lv2
   * @returns {number}
   */
  get 首次恐怖Lv2() {
    return era.get(`cflag:${this.cid}:224`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次恐怖Lv2(v) {
    era.set(`cflag:${this.cid}:224`, v);
  }

  /**
   * 首次C绝顶（cflag:cid:225 ↔ CFLAG:225）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次C绝顶
   * @returns {number}
   */
  get 首次C绝顶() {
    return era.get(`cflag:${this.cid}:225`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次C绝顶(v) {
    era.set(`cflag:${this.cid}:225`, v);
  }

  /**
   * 首次V绝顶（cflag:cid:226 ↔ CFLAG:226）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次V绝顶
   * @returns {number}
   */
  get 首次V绝顶() {
    return era.get(`cflag:${this.cid}:226`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次V绝顶(v) {
    era.set(`cflag:${this.cid}:226`, v);
  }

  /**
   * 首次A绝顶（cflag:cid:227 ↔ CFLAG:227）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次A绝顶
   * @returns {number}
   */
  get 首次A绝顶() {
    return era.get(`cflag:${this.cid}:227`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次A绝顶(v) {
    era.set(`cflag:${this.cid}:227`, v);
  }

  /**
   * 首次B绝顶（cflag:cid:228 ↔ CFLAG:228）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；首次B绝顶
   * @returns {number}
   */
  get 首次B绝顶() {
    return era.get(`cflag:${this.cid}:228`) || 0;
  }
  /**
   * @param {number} v
   */
  set 首次B绝顶(v) {
    era.set(`cflag:${this.cid}:228`, v);
  }

  /**
   * 处女丧失（cflag:cid:229 ↔ CFLAG:229）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4076 参数变动时 CFLAG:221～260；处女丧失
   * @returns {number}
   */
  get 处女丧失() {
    return era.get(`cflag:${this.cid}:229`) || 0;
  }
  /**
   * @param {number} v
   */
  set 处女丧失(v) {
    era.set(`cflag:${this.cid}:229`, v);
  }

  /**
   * 寄生（cflag:cid:230 ↔ CFLAG:230）
   * 源: 口上/EVENT_K3_高貴.ERB 寄生 CFLAG:230
   * @returns {number}
   */
  get 寄生() {
    return era.get(`cflag:${this.cid}:230`) || 0;
  }
  /**
   * @param {number} v
   */
  set 寄生(v) {
    era.set(`cflag:${this.cid}:230`, v);
  }

  /**
   * 调教后自慰（cflag:cid:261 ↔ CFLAG:261）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4327
   * @returns {number}
   */
  get 调教后自慰() {
    return era.get(`cflag:${this.cid}:261`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调教后自慰(v) {
    era.set(`cflag:${this.cid}:261`, v);
  }

  /**
   * 百合PLAY（cflag:cid:262 ↔ CFLAG:262）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4362 レズプレイ
   * @returns {number}
   */
  get 百合PLAY() {
    return era.get(`cflag:${this.cid}:262`) || 0;
  }
  /**
   * @param {number} v
   */
  set 百合PLAY(v) {
    era.set(`cflag:${this.cid}:262`, v);
  }

  /**
   * 朝口交（cflag:cid:263 ↔ CFLAG:263）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4389
   * @returns {number}
   */
  get 朝口交() {
    return era.get(`cflag:${this.cid}:263`) || 0;
  }
  /**
   * @param {number} v
   */
  set 朝口交(v) {
    era.set(`cflag:${this.cid}:263`, v);
  }

  /**
   * 调教后性交（cflag:cid:264 ↔ CFLAG:264）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4412
   * @returns {number}
   */
  get 调教后性交() {
    return era.get(`cflag:${this.cid}:264`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调教后性交(v) {
    era.set(`cflag:${this.cid}:264`, v);
  }

  /**
   * 夜袭（cflag:cid:265 ↔ CFLAG:265）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4427
   * @returns {number}
   */
  get 夜袭() {
    return era.get(`cflag:${this.cid}:265`) || 0;
  }
  /**
   * @param {number} v
   */
  set 夜袭(v) {
    era.set(`cflag:${this.cid}:265`, v);
  }

  /**
   * 妊娠发觉（cflag:cid:271 ↔ CFLAG:271）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4457
   * @returns {number}
   */
  get 妊娠发觉() {
    return era.get(`cflag:${this.cid}:271`) || 0;
  }
  /**
   * @param {number} v
   */
  set 妊娠发觉(v) {
    era.set(`cflag:${this.cid}:271`, v);
  }

  /**
   * 生产（cflag:cid:272 ↔ CFLAG:272）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4477
   * @returns {number}
   */
  get 生产() {
    return era.get(`cflag:${this.cid}:272`) || 0;
  }
  /**
   * @param {number} v
   */
  set 生产(v) {
    era.set(`cflag:${this.cid}:272`, v);
  }

  /**
   * 育儿室（cflag:cid:273 ↔ CFLAG:273）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4497
   * @returns {number}
   */
  get 育儿室() {
    return era.get(`cflag:${this.cid}:273`) || 0;
  }
  /**
   * @param {number} v
   */
  set 育儿室(v) {
    era.set(`cflag:${this.cid}:273`, v);
  }

  /**
   * 亲离（cflag:cid:274 ↔ CFLAG:274）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4511
   * @returns {number}
   */
  get 亲离() {
    return era.get(`cflag:${this.cid}:274`) || 0;
  }
  /**
   * @param {number} v
   */
  set 亲离(v) {
    era.set(`cflag:${this.cid}:274`, v);
  }

  /**
   * 苦痛刻印Lv3（cflag:cid:297 ↔ CFLAG:297）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4270
   * @returns {number}
   */
  get 苦痛刻印Lv3() {
    return era.get(`cflag:${this.cid}:297`) || 0;
  }
  /**
   * @param {number} v
   */
  set 苦痛刻印Lv3(v) {
    era.set(`cflag:${this.cid}:297`, v);
  }

  /**
   * 快乐刻印Lv3（cflag:cid:298 ↔ CFLAG:298）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4283
   * @returns {number}
   */
  get 快乐刻印Lv3() {
    return era.get(`cflag:${this.cid}:298`) || 0;
  }
  /**
   * @param {number} v
   */
  set 快乐刻印Lv3(v) {
    era.set(`cflag:${this.cid}:298`, v);
  }

  /**
   * 屈服刻印Lv3（cflag:cid:299 ↔ CFLAG:299）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4296
   * @returns {number}
   */
  get 屈服刻印Lv3() {
    return era.get(`cflag:${this.cid}:299`) || 0;
  }
  /**
   * @param {number} v
   */
  set 屈服刻印Lv3(v) {
    era.set(`cflag:${this.cid}:299`, v);
  }

  /**
   * 反抗刻印Lv3（cflag:cid:300 ↔ CFLAG:300）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行4309
   * @returns {number}
   */
  get 反抗刻印Lv3() {
    return era.get(`cflag:${this.cid}:300`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗刻印Lv3(v) {
    era.set(`cflag:${this.cid}:300`, v);
  }

  /**
   * 爱抚（cflag:cid:301 ↔ CFLAG:301）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行340
   * @returns {number}
   */
  get 爱抚() {
    return era.get(`cflag:${this.cid}:301`) || 0;
  }
  /**
   * @param {number} v
   */
  set 爱抚(v) {
    era.set(`cflag:${this.cid}:301`, v);
  }

  /**
   * 舔阴（cflag:cid:302 ↔ CFLAG:302）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行382
   * @returns {number}
   */
  get 舔阴() {
    return era.get(`cflag:${this.cid}:302`) || 0;
  }
  /**
   * @param {number} v
   */
  set 舔阴(v) {
    era.set(`cflag:${this.cid}:302`, v);
  }

  /**
   * 肛门爱抚（cflag:cid:303 ↔ CFLAG:303）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行420
   * @returns {number}
   */
  get 肛门爱抚() {
    return era.get(`cflag:${this.cid}:303`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门爱抚(v) {
    era.set(`cflag:${this.cid}:303`, v);
  }

  /**
   * 自慰（cflag:cid:304 ↔ CFLAG:304）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行461
   * @returns {number}
   */
  get 自慰() {
    return era.get(`cflag:${this.cid}:304`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自慰(v) {
    era.set(`cflag:${this.cid}:304`, v);
  }

  /**
   * 口交_主（cflag:cid:305 ↔ CFLAG:305）
   * 源: 口上/EVENT_K10_クラブ.ERB 口交 CFLAG:305（指令 4）
   * @returns {number}
   */
  get 口交_主() {
    return era.get(`cflag:${this.cid}:305`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口交_主(v) {
    era.set(`cflag:${this.cid}:305`, v);
  }

  /**
   * 胸爱抚（cflag:cid:306 ↔ CFLAG:306）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行543
   * @returns {number}
   */
  get 胸爱抚() {
    return era.get(`cflag:${this.cid}:306`) || 0;
  }
  /**
   * @param {number} v
   */
  set 胸爱抚(v) {
    era.set(`cflag:${this.cid}:306`, v);
  }

  /**
   * 接吻（cflag:cid:307 ↔ CFLAG:307）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行581
   * @returns {number}
   */
  get 接吻() {
    return era.get(`cflag:${this.cid}:307`) || 0;
  }
  /**
   * @param {number} v
   */
  set 接吻(v) {
    era.set(`cflag:${this.cid}:307`, v);
  }

  /**
   * 自己扒开（cflag:cid:308 ↔ CFLAG:308）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行636
   * @returns {number}
   */
  get 自己扒开() {
    return era.get(`cflag:${this.cid}:308`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自己扒开(v) {
    era.set(`cflag:${this.cid}:308`, v);
  }

  /**
   * 插入手指（cflag:cid:309 ↔ CFLAG:309）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行677
   * @returns {number}
   */
  get 插入手指() {
    return era.get(`cflag:${this.cid}:309`) || 0;
  }
  /**
   * @param {number} v
   */
  set 插入手指(v) {
    era.set(`cflag:${this.cid}:309`, v);
  }

  /**
   * 舔肛（cflag:cid:310 ↔ CFLAG:310）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行718
   * @returns {number}
   */
  get 舔肛() {
    return era.get(`cflag:${this.cid}:310`) || 0;
  }
  /**
   * @param {number} v
   */
  set 舔肛(v) {
    era.set(`cflag:${this.cid}:310`, v);
  }

  /**
   * 振动宝石（cflag:cid:311 ↔ CFLAG:311）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行759
   * @returns {number}
   */
  get 振动宝石() {
    return era.get(`cflag:${this.cid}:311`) || 0;
  }
  /**
   * @param {number} v
   */
  set 振动宝石(v) {
    era.set(`cflag:${this.cid}:311`, v);
  }

  /**
   * 壶虫（cflag:cid:312 ↔ CFLAG:312）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行800
   * @returns {number}
   */
  get 壶虫() {
    return era.get(`cflag:${this.cid}:312`) || 0;
  }
  /**
   * @param {number} v
   */
  set 壶虫(v) {
    era.set(`cflag:${this.cid}:312`, v);
  }

  /**
   * 振动杖（cflag:cid:313 ↔ CFLAG:313）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行873
   * @returns {number}
   */
  get 振动杖() {
    return era.get(`cflag:${this.cid}:313`) || 0;
  }
  /**
   * @param {number} v
   */
  set 振动杖(v) {
    era.set(`cflag:${this.cid}:313`, v);
  }

  /**
   * 肛门虫（cflag:cid:314 ↔ CFLAG:314）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行914
   * @returns {number}
   */
  get 肛门虫() {
    return era.get(`cflag:${this.cid}:314`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门虫(v) {
    era.set(`cflag:${this.cid}:314`, v);
  }

  /**
   * 阴蒂夹（cflag:cid:315 ↔ CFLAG:315）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行984
   * @returns {number}
   */
  get 阴蒂夹() {
    return era.get(`cflag:${this.cid}:315`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂夹(v) {
    era.set(`cflag:${this.cid}:315`, v);
  }

  /**
   * 乳头夹（cflag:cid:316 ↔ CFLAG:316）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1038
   * @returns {number}
   */
  get 乳头夹() {
    return era.get(`cflag:${this.cid}:316`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳头夹(v) {
    era.set(`cflag:${this.cid}:316`, v);
  }

  /**
   * 榨乳器（cflag:cid:317 ↔ CFLAG:317）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1092
   * @returns {number}
   */
  get 榨乳器() {
    return era.get(`cflag:${this.cid}:317`) || 0;
  }
  /**
   * @param {number} v
   */
  set 榨乳器(v) {
    era.set(`cflag:${this.cid}:317`, v);
  }

  /**
   * 飞机杯（cflag:cid:318 ↔ CFLAG:318）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1146
   * @returns {number}
   */
  get 飞机杯() {
    return era.get(`cflag:${this.cid}:318`) || 0;
  }
  /**
   * @param {number} v
   */
  set 飞机杯(v) {
    era.set(`cflag:${this.cid}:318`, v);
  }

  /**
   * 肛珠（cflag:cid:320 ↔ CFLAG:320）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1200
   * @returns {number}
   */
  get 肛珠() {
    return era.get(`cflag:${this.cid}:320`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛珠(v) {
    era.set(`cflag:${this.cid}:320`, v);
  }

  /**
   * 正常位（cflag:cid:321 ↔ CFLAG:321）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1270
   * @returns {number}
   */
  get 正常位() {
    return era.get(`cflag:${this.cid}:321`) || 0;
  }
  /**
   * @param {number} v
   */
  set 正常位(v) {
    era.set(`cflag:${this.cid}:321`, v);
  }

  /**
   * 背后位（cflag:cid:322 ↔ CFLAG:322）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1329
   * @returns {number}
   */
  get 背后位() {
    return era.get(`cflag:${this.cid}:322`) || 0;
  }
  /**
   * @param {number} v
   */
  set 背后位(v) {
    era.set(`cflag:${this.cid}:322`, v);
  }

  /**
   * 对面座位（cflag:cid:323 ↔ CFLAG:323）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1403
   * @returns {number}
   */
  get 对面座位() {
    return era.get(`cflag:${this.cid}:323`) || 0;
  }
  /**
   * @param {number} v
   */
  set 对面座位(v) {
    era.set(`cflag:${this.cid}:323`, v);
  }

  /**
   * 背面座位（cflag:cid:324 ↔ CFLAG:324）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1474
   * @returns {number}
   */
  get 背面座位() {
    return era.get(`cflag:${this.cid}:324`) || 0;
  }
  /**
   * @param {number} v
   */
  set 背面座位(v) {
    era.set(`cflag:${this.cid}:324`, v);
  }

  /**
   * 逆强奸（cflag:cid:325 ↔ CFLAG:325）
   * 源: 口上/EVENT_K3_高貴.ERB 逆强奸 CFLAG:325（指令 24）
   * @returns {number}
   */
  get 逆强奸() {
    return era.get(`cflag:${this.cid}:325`) || 0;
  }
  /**
   * @param {number} v
   */
  set 逆强奸(v) {
    era.set(`cflag:${this.cid}:325`, v);
  }

  /**
   * 逆肛门强奸（cflag:cid:326 ↔ CFLAG:326）
   * 源: 口上/EVENT_K10_クラブ.ERB 逆肛门强奸 CFLAG:326
   * @returns {number}
   */
  get 逆肛门强奸() {
    return era.get(`cflag:${this.cid}:326`) || 0;
  }
  /**
   * @param {number} v
   */
  set 逆肛门强奸(v) {
    era.set(`cflag:${this.cid}:326`, v);
  }

  /**
   * 正常位肛交（cflag:cid:327 ↔ CFLAG:327）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1545
   * @returns {number}
   */
  get 正常位肛交() {
    return era.get(`cflag:${this.cid}:327`) || 0;
  }
  /**
   * @param {number} v
   */
  set 正常位肛交(v) {
    era.set(`cflag:${this.cid}:327`, v);
  }

  /**
   * 背后位肛交（cflag:cid:328 ↔ CFLAG:328）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1604
   * @returns {number}
   */
  get 背后位肛交() {
    return era.get(`cflag:${this.cid}:328`) || 0;
  }
  /**
   * @param {number} v
   */
  set 背后位肛交(v) {
    era.set(`cflag:${this.cid}:328`, v);
  }

  /**
   * 对面座位肛交（cflag:cid:329 ↔ CFLAG:329）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1649
   * @returns {number}
   */
  get 对面座位肛交() {
    return era.get(`cflag:${this.cid}:329`) || 0;
  }
  /**
   * @param {number} v
   */
  set 对面座位肛交(v) {
    era.set(`cflag:${this.cid}:329`, v);
  }

  /**
   * 背面座位肛交（cflag:cid:330 ↔ CFLAG:330）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1708
   * @returns {number}
   */
  get 背面座位肛交() {
    return era.get(`cflag:${this.cid}:330`) || 0;
  }
  /**
   * @param {number} v
   */
  set 背面座位肛交(v) {
    era.set(`cflag:${this.cid}:330`, v);
  }

  /**
   * 手淫（cflag:cid:331 ↔ CFLAG:331）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1765
   * @returns {number}
   */
  get 手淫() {
    return era.get(`cflag:${this.cid}:331`) || 0;
  }
  /**
   * @param {number} v
   */
  set 手淫(v) {
    era.set(`cflag:${this.cid}:331`, v);
  }

  /**
   * 口交_奴（cflag:cid:332 ↔ CFLAG:332）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1821
   * @returns {number}
   */
  get 口交_奴() {
    return era.get(`cflag:${this.cid}:332`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口交_奴(v) {
    era.set(`cflag:${this.cid}:332`, v);
  }

  /**
   * 乳交（cflag:cid:333 ↔ CFLAG:333）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1871
   * @returns {number}
   */
  get 乳交() {
    return era.get(`cflag:${this.cid}:333`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳交(v) {
    era.set(`cflag:${this.cid}:333`, v);
  }

  /**
   * 股间性交（cflag:cid:334 ↔ CFLAG:334）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1927
   * @returns {number}
   */
  get 股间性交() {
    return era.get(`cflag:${this.cid}:334`) || 0;
  }
  /**
   * @param {number} v
   */
  set 股间性交(v) {
    era.set(`cflag:${this.cid}:334`, v);
  }

  /**
   * 骑乘位（cflag:cid:335 ↔ CFLAG:335）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行1974
   * @returns {number}
   */
  get 骑乘位() {
    return era.get(`cflag:${this.cid}:335`) || 0;
  }
  /**
   * @param {number} v
   */
  set 骑乘位(v) {
    era.set(`cflag:${this.cid}:335`, v);
  }

  /**
   * 全身擦洗（cflag:cid:336 ↔ CFLAG:336）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2059
   * @returns {number}
   */
  get 全身擦洗() {
    return era.get(`cflag:${this.cid}:336`) || 0;
  }
  /**
   * @param {number} v
   */
  set 全身擦洗(v) {
    era.set(`cflag:${this.cid}:336`, v);
  }

  /**
   * 骑乘位肛交（cflag:cid:337 ↔ CFLAG:337）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2097
   * @returns {number}
   */
  get 骑乘位肛交() {
    return era.get(`cflag:${this.cid}:337`) || 0;
  }
  /**
   * @param {number} v
   */
  set 骑乘位肛交(v) {
    era.set(`cflag:${this.cid}:337`, v);
  }

  /**
   * 肛门侍奉（cflag:cid:338 ↔ CFLAG:338）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2154
   * @returns {number}
   */
  get 肛门侍奉() {
    return era.get(`cflag:${this.cid}:338`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门侍奉(v) {
    era.set(`cflag:${this.cid}:338`, v);
  }

  /**
   * 足交（cflag:cid:339 ↔ CFLAG:339）
   * 源: 口上/EVENT_K3_高貴.ERB 足交 CFLAG:339（指令 38）
   * @returns {number}
   */
  get 足交() {
    return era.get(`cflag:${this.cid}:339`) || 0;
  }
  /**
   * @param {number} v
   */
  set 足交(v) {
    era.set(`cflag:${this.cid}:339`, v);
  }

  /**
   * 打屁股（cflag:cid:341 ↔ CFLAG:341）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2192
   * @returns {number}
   */
  get 打屁股() {
    return era.get(`cflag:${this.cid}:341`) || 0;
  }
  /**
   * @param {number} v
   */
  set 打屁股(v) {
    era.set(`cflag:${this.cid}:341`, v);
  }

  /**
   * 鞭（cflag:cid:342 ↔ CFLAG:342）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2226
   * @returns {number}
   */
  get 鞭() {
    return era.get(`cflag:${this.cid}:342`) || 0;
  }
  /**
   * @param {number} v
   */
  set 鞭(v) {
    era.set(`cflag:${this.cid}:342`, v);
  }

  /**
   * 针（cflag:cid:343 ↔ CFLAG:343）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2283
   * @returns {number}
   */
  get 针() {
    return era.get(`cflag:${this.cid}:343`) || 0;
  }
  /**
   * @param {number} v
   */
  set 针(v) {
    era.set(`cflag:${this.cid}:343`, v);
  }

  /**
   * 眼罩（cflag:cid:344 ↔ CFLAG:344）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2340
   * @returns {number}
   */
  get 眼罩() {
    return era.get(`cflag:${this.cid}:344`) || 0;
  }
  /**
   * @param {number} v
   */
  set 眼罩(v) {
    era.set(`cflag:${this.cid}:344`, v);
  }

  /**
   * 绳子（cflag:cid:345 ↔ CFLAG:345）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2414
   * @returns {number}
   */
  get 绳子() {
    return era.get(`cflag:${this.cid}:345`) || 0;
  }
  /**
   * @param {number} v
   */
  set 绳子(v) {
    era.set(`cflag:${this.cid}:345`, v);
  }

  /**
   * 口塞（cflag:cid:346 ↔ CFLAG:346）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2488
   * @returns {number}
   */
  get 口塞() {
    return era.get(`cflag:${this.cid}:346`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口塞(v) {
    era.set(`cflag:${this.cid}:346`, v);
  }

  /**
   * 灌肠肛塞（cflag:cid:347 ↔ CFLAG:347）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2562
   * @returns {number}
   */
  get 灌肠肛塞() {
    return era.get(`cflag:${this.cid}:347`) || 0;
  }
  /**
   * @param {number} v
   */
  set 灌肠肛塞(v) {
    era.set(`cflag:${this.cid}:347`, v);
  }

  /**
   * 穿环（cflag:cid:348 ↔ CFLAG:348）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行3017
   * @returns {number}
   */
  get 穿环() {
    return era.get(`cflag:${this.cid}:348`) || 0;
  }
  /**
   * @param {number} v
   */
  set 穿环(v) {
    era.set(`cflag:${this.cid}:348`, v);
  }

  /**
   * 放置PLAY（cflag:cid:356 ↔ CFLAG:356）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2612 何もしない
   * @returns {number}
   */
  get 放置PLAY() {
    return era.get(`cflag:${this.cid}:356`) || 0;
  }
  /**
   * @param {number} v
   */
  set 放置PLAY(v) {
    era.set(`cflag:${this.cid}:356`, v);
  }

  /**
   * 交谈（cflag:cid:357 ↔ CFLAG:357）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2646
   * @returns {number}
   */
  get 交谈() {
    return era.get(`cflag:${this.cid}:357`) || 0;
  }
  /**
   * @param {number} v
   */
  set 交谈(v) {
    era.set(`cflag:${this.cid}:357`, v);
  }

  /**
   * 乳夹口交（cflag:cid:360 ↔ CFLAG:360）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2714
   * @returns {number}
   */
  get 乳夹口交() {
    return era.get(`cflag:${this.cid}:360`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳夹口交(v) {
    era.set(`cflag:${this.cid}:360`, v);
  }

  /**
   * 口交时自慰（cflag:cid:361 ↔ CFLAG:361）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2757
   * @returns {number}
   */
  get 口交时自慰() {
    return era.get(`cflag:${this.cid}:361`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口交时自慰(v) {
    era.set(`cflag:${this.cid}:361`, v);
  }

  /**
   * 手搓口交（cflag:cid:362 ↔ CFLAG:362）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2801
   * @returns {number}
   */
  get 手搓口交() {
    return era.get(`cflag:${this.cid}:362`) || 0;
  }
  /**
   * @param {number} v
   */
  set 手搓口交(v) {
    era.set(`cflag:${this.cid}:362`, v);
  }

  /**
   * 真空口交（cflag:cid:363 ↔ CFLAG:363）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2845
   * @returns {number}
   */
  get 真空口交() {
    return era.get(`cflag:${this.cid}:363`) || 0;
  }
  /**
   * @param {number} v
   */
  set 真空口交(v) {
    era.set(`cflag:${this.cid}:363`, v);
  }

  /**
   * 六九式（cflag:cid:364 ↔ CFLAG:364）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2888
   * @returns {number}
   */
  get 六九式() {
    return era.get(`cflag:${this.cid}:364`) || 0;
  }
  /**
   * @param {number} v
   */
  set 六九式(v) {
    era.set(`cflag:${this.cid}:364`, v);
  }

  /**
   * 深喉（cflag:cid:365 ↔ CFLAG:365）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2932
   * @returns {number}
   */
  get 深喉() {
    return era.get(`cflag:${this.cid}:365`) || 0;
  }
  /**
   * @param {number} v
   */
  set 深喉(v) {
    era.set(`cflag:${this.cid}:365`, v);
  }

  /**
   * 侵犯助手（cflag:cid:366 ↔ CFLAG:366）
   * 源: 口上/EVENT_K11_リリィ.ERB 助手を犯させる CFLAG:366
   * @returns {number}
   */
  get 侵犯助手() {
    return era.get(`cflag:${this.cid}:366`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侵犯助手(v) {
    era.set(`cflag:${this.cid}:366`, v);
  }

  /**
   * 双人口交（cflag:cid:367 ↔ CFLAG:367）
   * 源: 口上/EVENT_K11_リリィ.ERB 二本フェラ CFLAG:367
   * @returns {number}
   */
  get 双人口交() {
    return era.get(`cflag:${this.cid}:367`) || 0;
  }
  /**
   * @param {number} v
   */
  set 双人口交(v) {
    era.set(`cflag:${this.cid}:367`, v);
  }

  /**
   * 双人侍奉口交（cflag:cid:369 ↔ CFLAG:369）
   * 源: 口上/EVENT_K11_リリィ.ERB ダブルフェラ CFLAG:369
   * @returns {number}
   */
  get 双人侍奉口交() {
    return era.get(`cflag:${this.cid}:369`) || 0;
  }
  /**
   * @param {number} v
   */
  set 双人侍奉口交(v) {
    era.set(`cflag:${this.cid}:369`, v);
  }

  /**
   * 魔族化（cflag:cid:370 ↔ CFLAG:370）
   * 源: 口上/EVENT_K7_ハート.ERB 等 魔族化 CFLAG:370
   * @returns {number}
   */
  get 魔族化() {
    return era.get(`cflag:${this.cid}:370`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔族化(v) {
    era.set(`cflag:${this.cid}:370`, v);
  }

  /**
   * 壶虫着脱（cflag:cid:372 ↔ CFLAG:372）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行14 壶虫 CFLAG:312 CFLAG:372
   * @returns {number}
   */
  get 壶虫着脱() {
    return era.get(`cflag:${this.cid}:372`) || 0;
  }
  /**
   * @param {number} v
   */
  set 壶虫着脱(v) {
    era.set(`cflag:${this.cid}:372`, v);
  }

  /**
   * 肛门虫着脱（cflag:cid:374 ↔ CFLAG:374）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行15
   * @returns {number}
   */
  get 肛门虫着脱() {
    return era.get(`cflag:${this.cid}:374`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门虫着脱(v) {
    era.set(`cflag:${this.cid}:374`, v);
  }

  /**
   * 阴蒂夹着脱（cflag:cid:375 ↔ CFLAG:375）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行16
   * @returns {number}
   */
  get 阴蒂夹着脱() {
    return era.get(`cflag:${this.cid}:375`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂夹着脱(v) {
    era.set(`cflag:${this.cid}:375`, v);
  }

  /**
   * 乳头夹着脱（cflag:cid:376 ↔ CFLAG:376）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行17
   * @returns {number}
   */
  get 乳头夹着脱() {
    return era.get(`cflag:${this.cid}:376`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳头夹着脱(v) {
    era.set(`cflag:${this.cid}:376`, v);
  }

  /**
   * 榨乳器着脱（cflag:cid:377 ↔ CFLAG:377）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行18
   * @returns {number}
   */
  get 榨乳器着脱() {
    return era.get(`cflag:${this.cid}:377`) || 0;
  }
  /**
   * @param {number} v
   */
  set 榨乳器着脱(v) {
    era.set(`cflag:${this.cid}:377`, v);
  }

  /**
   * 飞机杯着脱（cflag:cid:378 ↔ CFLAG:378）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行19
   * @returns {number}
   */
  get 飞机杯着脱() {
    return era.get(`cflag:${this.cid}:378`) || 0;
  }
  /**
   * @param {number} v
   */
  set 飞机杯着脱(v) {
    era.set(`cflag:${this.cid}:378`, v);
  }

  /**
   * 肛珠着脱（cflag:cid:379 ↔ CFLAG:379）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行20
   * @returns {number}
   */
  get 肛珠着脱() {
    return era.get(`cflag:${this.cid}:379`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛珠着脱(v) {
    era.set(`cflag:${this.cid}:379`, v);
  }

  /**
   * 眼罩着脱（cflag:cid:380 ↔ CFLAG:380）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行21
   * @returns {number}
   */
  get 眼罩着脱() {
    return era.get(`cflag:${this.cid}:380`) || 0;
  }
  /**
   * @param {number} v
   */
  set 眼罩着脱(v) {
    era.set(`cflag:${this.cid}:380`, v);
  }

  /**
   * 强制口交（cflag:cid:381 ↔ CFLAG:381）
   * 源: yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释 行2976
   * @returns {number}
   */
  get 强制口交() {
    return era.get(`cflag:${this.cid}:381`) || 0;
  }
  /**
   * @param {number} v
   */
  set 强制口交(v) {
    era.set(`cflag:${this.cid}:381`, v);
  }

  /**
   * 绳子着脱（cflag:cid:385 ↔ CFLAG:385）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行22
   * @returns {number}
   */
  get 绳子着脱() {
    return era.get(`cflag:${this.cid}:385`) || 0;
  }
  /**
   * @param {number} v
   */
  set 绳子着脱(v) {
    era.set(`cflag:${this.cid}:385`, v);
  }

  /**
   * 口塞着脱（cflag:cid:386 ↔ CFLAG:386）
   * 源: 资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 行23
   * @returns {number}
   */
  get 口塞着脱() {
    return era.get(`cflag:${this.cid}:386`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口塞着脱(v) {
    era.set(`cflag:${this.cid}:386`, v);
  }

  /**
   * 灌肠肛塞着脱（cflag:cid:387 ↔ CFLAG:387）
   * 源: 口上/EVENT_K3_高貴.ERB 灌肠+肛塞 CFLAG:387
   * @returns {number}
   */
  get 灌肠肛塞着脱() {
    return era.get(`cflag:${this.cid}:387`) || 0;
  }
  /**
   * @param {number} v
   */
  set 灌肠肛塞着脱(v) {
    era.set(`cflag:${this.cid}:387`, v);
  }

  /**
   * 三人PLAY（cflag:cid:391 ↔ CFLAG:391）
   * 源: 口上/EVENT_K11_リリィ.ERB 3P CFLAG:391
   * @returns {number}
   */
  get 三人PLAY() {
    return era.get(`cflag:${this.cid}:391`) || 0;
  }
  /**
   * @param {number} v
   */
  set 三人PLAY(v) {
    era.set(`cflag:${this.cid}:391`, v);
  }

  /**
   * 魔族化_K11（cflag:cid:400 ↔ CFLAG:400）
   * 源: 口上/EVENT_K11_リリィ.ERB 魔族化 CFLAG:400
   * @returns {number}
   */
  get 魔族化_K11() {
    return era.get(`cflag:${this.cid}:400`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔族化_K11(v) {
    era.set(`cflag:${this.cid}:400`, v);
  }

  /**
   * 兽奸眼罩（cflag:cid:444 ↔ CFLAG:444）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:444 獣姦アイマスク时口上
   * @returns {number}
   */
  get 兽奸眼罩() {
    return era.get(`cflag:${this.cid}:444`) || 0;
  }
  /**
   * @param {number} v
   */
  set 兽奸眼罩(v) {
    era.set(`cflag:${this.cid}:444`, v);
  }

  /**
   * NTR再捕获（cflag:cid:650 ↔ CFLAG:650）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR再捕获() {
    return era.get(`cflag:${this.cid}:650`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR再捕获(v) {
    era.set(`cflag:${this.cid}:650`, v);
  }

  /**
   * NTR_651（cflag:cid:651 ↔ CFLAG:651）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_651() {
    return era.get(`cflag:${this.cid}:651`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_651(v) {
    era.set(`cflag:${this.cid}:651`, v);
  }

  /**
   * NTR_652（cflag:cid:652 ↔ CFLAG:652）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_652() {
    return era.get(`cflag:${this.cid}:652`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_652(v) {
    era.set(`cflag:${this.cid}:652`, v);
  }

  /**
   * NTR_653（cflag:cid:653 ↔ CFLAG:653）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_653() {
    return era.get(`cflag:${this.cid}:653`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_653(v) {
    era.set(`cflag:${this.cid}:653`, v);
  }

  /**
   * NTR_654（cflag:cid:654 ↔ CFLAG:654）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_654() {
    return era.get(`cflag:${this.cid}:654`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_654(v) {
    era.set(`cflag:${this.cid}:654`, v);
  }

  /**
   * NTR_655（cflag:cid:655 ↔ CFLAG:655）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_655() {
    return era.get(`cflag:${this.cid}:655`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_655(v) {
    era.set(`cflag:${this.cid}:655`, v);
  }

  /**
   * NTR_656（cflag:cid:656 ↔ CFLAG:656）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_656() {
    return era.get(`cflag:${this.cid}:656`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_656(v) {
    era.set(`cflag:${this.cid}:656`, v);
  }

  /**
   * NTR_657（cflag:cid:657 ↔ CFLAG:657）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:650～660 NTR 旗标
   * @returns {number}
   */
  get NTR_657() {
    return era.get(`cflag:${this.cid}:657`) || 0;
  }
  /**
   * @param {number} v
   */
  set NTR_657(v) {
    era.set(`cflag:${this.cid}:657`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = KojoFacade;
