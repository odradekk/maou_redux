/**
 * @file 一维变量的train域门面（tools/gen-facade.js）。
 *
 * 形状：game.train.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本这张票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class TrainGame {
  // —— flag ——
  /**
   * 录像开始状况（flag:22 ↔ FLAG:22）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:22
   * @returns {number}
   */
  get 录像开始状况() {
    return era.get('flag:22') || 0;
  }
  /**
   * @param {number} v
   */
  set 录像开始状况(v) {
    era.set('flag:22', v);
  }

  /**
   * 指令过滤（flag:25 ↔ FLAG:25）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:25
   * @returns {number}
   */
  get 指令过滤() {
    return era.get('flag:25') || 0;
  }
  /**
   * @param {number} v
   */
  set 指令过滤(v) {
    era.set('flag:25', v);
  }

  /**
   * 肉便器行动（flag:62 ↔ FLAG:62）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:62
   * @returns {number}
   */
  get 肉便器行动() {
    return era.get('flag:62') || 0;
  }
  /**
   * @param {number} v
   */
  set 肉便器行动(v) {
    era.set('flag:62', v);
  }

  /**
   * 肉便器侍奉对象（flag:64 ↔ FLAG:64）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:64
   * @returns {number}
   */
  get 肉便器侍奉对象() {
    return era.get('flag:64') || 0;
  }
  /**
   * @param {number} v
   */
  set 肉便器侍奉对象(v) {
    era.set('flag:64', v);
  }

  /**
   * 自由调教跳转（flag:71 ↔ FLAG:71）
   * 源: target/ERB/調教相關/COMF_JUMP.ERB FLAG:71
   * @returns {number}
   */
  get 自由调教跳转() {
    return era.get('flag:71') || 0;
  }
  /**
   * @param {number} v
   */
  set 自由调教跳转(v) {
    era.set('flag:71', v);
  }

  /**
   * 指令菜单长度（flag:550 ↔ FLAG:550）
   * 源: target/ERB/調教相關/COM_REGISTER.ERB 行7 FLAG:550 菜单の長さ
   * @returns {number}
   */
  get 指令菜单长度() {
    return era.get('flag:550') || 0;
  }
  /**
   * @param {number} v
   */
  set 指令菜单长度(v) {
    era.set('flag:550', v);
  }

  // —— tflag ——
  /**
   * 口中射精（tflag:0 ↔ TFLAG:0）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:0
   * @returns {number}
   */
  get 口中射精() {
    return era.get('tflag:0') || 0;
  }
  /**
   * @param {number} v
   */
  set 口中射精(v) {
    era.set('tflag:0', v);
  }

  /**
   * 手中射精（tflag:1 ↔ TFLAG:1）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:1
   * @returns {number}
   */
  get 手中射精() {
    return era.get('tflag:1') || 0;
  }
  /**
   * @param {number} v
   */
  set 手中射精(v) {
    era.set('tflag:1', v);
  }

  /**
   * 性交射精（tflag:2 ↔ TFLAG:2）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:2
   * @returns {number}
   */
  get 性交射精() {
    return era.get('tflag:2') || 0;
  }
  /**
   * @param {number} v
   */
  set 性交射精(v) {
    era.set('tflag:2', v);
  }

  /**
   * 处女丧失（tflag:3 ↔ TFLAG:3）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:3
   * @returns {number}
   */
  get 处女丧失() {
    return era.get('tflag:3') || 0;
  }
  /**
   * @param {number} v
   */
  set 处女丧失(v) {
    era.set('tflag:3', v);
  }

  /**
   * 接吻射精（tflag:4 ↔ TFLAG:4）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:4
   * @returns {number}
   */
  get 接吻射精() {
    return era.get('tflag:4') || 0;
  }
  /**
   * @param {number} v
   */
  set 接吻射精(v) {
    era.set('tflag:4', v);
  }

  /**
   * 舔阴射精（tflag:5 ↔ TFLAG:5）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:5
   * @returns {number}
   */
  get 舔阴射精() {
    return era.get('tflag:5') || 0;
  }
  /**
   * @param {number} v
   */
  set 舔阴射精(v) {
    era.set('tflag:5', v);
  }

  /**
   * 助手射精（tflag:6 ↔ TFLAG:6）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:6
   * @returns {number}
   */
  get 助手射精() {
    return era.get('tflag:6') || 0;
  }
  /**
   * @param {number} v
   */
  set 助手射精(v) {
    era.set('tflag:6', v);
  }

  /**
   * 主人犯助手射精（tflag:7 ↔ TFLAG:7）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:7
   * @returns {number}
   */
  get 主人犯助手射精() {
    return era.get('tflag:7') || 0;
  }
  /**
   * @param {number} v
   */
  set 主人犯助手射精(v) {
    era.set('tflag:7', v);
  }

  /**
   * 口交射精后（tflag:8 ↔ TFLAG:8）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:8
   * @returns {number}
   */
  get 口交射精后() {
    return era.get('tflag:8') || 0;
  }
  /**
   * @param {number} v
   */
  set 口交射精后(v) {
    era.set('tflag:8', v);
  }

  /**
   * 股间射精（tflag:9 ↔ TFLAG:9）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:9
   * @returns {number}
   */
  get 股间射精() {
    return era.get('tflag:9') || 0;
  }
  /**
   * @param {number} v
   */
  set 股间射精(v) {
    era.set('tflag:9', v);
  }

  /**
   * 逆强奸射精（tflag:12 ↔ TFLAG:12）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:12
   * @returns {number}
   */
  get 逆强奸射精() {
    return era.get('tflag:12') || 0;
  }
  /**
   * @param {number} v
   */
  set 逆强奸射精(v) {
    era.set('tflag:12', v);
  }

  /**
   * 初吻与自我口上（tflag:13 ↔ TFLAG:13）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:13
   * @returns {number}
   */
  get 初吻与自我口上() {
    return era.get('tflag:13') || 0;
  }
  /**
   * @param {number} v
   */
  set 初吻与自我口上(v) {
    era.set('tflag:13', v);
  }

  /**
   * 近亲与自我口上（tflag:14 ↔ TFLAG:14）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:14
   * @returns {number}
   */
  get 近亲与自我口上() {
    return era.get('tflag:14') || 0;
  }
  /**
   * @param {number} v
   */
  set 近亲与自我口上(v) {
    era.set('tflag:14', v);
  }

  /**
   * 怪物射精或购入金（tflag:15 ↔ TFLAG:15）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:15
   * @returns {number}
   */
  get 怪物射精或购入金() {
    return era.get('tflag:15') || 0;
  }
  /**
   * @param {number} v
   */
  set 怪物射精或购入金(v) {
    era.set('tflag:15', v);
  }

  /**
   * 童贞丧失_未使用（tflag:17 ↔ TFLAG:17）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:17 未使用
   * @returns {number}
   */
  get 童贞丧失_未使用() {
    return era.get('tflag:17') || 0;
  }
  /**
   * @param {number} v
   */
  set 童贞丧失_未使用(v) {
    era.set('tflag:17', v);
  }

  /**
   * 伴V经验指令（tflag:19 ↔ TFLAG:19）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:19
   * @returns {number}
   */
  get 伴V经验指令() {
    return era.get('tflag:19') || 0;
  }
  /**
   * @param {number} v
   */
  set 伴V经验指令(v) {
    era.set('tflag:19', v);
  }

  /**
   * 主人导致处女丧失（tflag:20 ↔ TFLAG:20）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:20
   * @returns {number}
   */
  get 主人导致处女丧失() {
    return era.get('tflag:20') || 0;
  }
  /**
   * @param {number} v
   */
  set 主人导致处女丧失(v) {
    era.set('tflag:20', v);
  }

  /**
   * 压抑抵抗消灭（tflag:25 ↔ TFLAG:25）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:25
   * @returns {number}
   */
  get 压抑抵抗消灭() {
    return era.get('tflag:25') || 0;
  }
  /**
   * @param {number} v
   */
  set 压抑抵抗消灭(v) {
    era.set('tflag:25', v);
  }

  /**
   * 侍奉快乐经验（tflag:26 ↔ TFLAG:26）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:26
   * @returns {number}
   */
  get 侍奉快乐经验() {
    return era.get('tflag:26') || 0;
  }
  /**
   * @param {number} v
   */
  set 侍奉快乐经验(v) {
    era.set('tflag:26', v);
  }

  /**
   * 被虐快乐经验（tflag:27 ↔ TFLAG:27）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:27
   * @returns {number}
   */
  get 被虐快乐经验() {
    return era.get('tflag:27') || 0;
  }
  /**
   * @param {number} v
   */
  set 被虐快乐经验(v) {
    era.set('tflag:27', v);
  }

  /**
   * A快乐经验（tflag:28 ↔ TFLAG:28）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:28
   * @returns {number}
   */
  get A快乐经验() {
    return era.get('tflag:28') || 0;
  }
  /**
   * @param {number} v
   */
  set A快乐经验(v) {
    era.set('tflag:28', v);
  }

  /**
   * 主人经验（tflag:30 ↔ TFLAG:30）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:30
   * @returns {number}
   */
  get 主人经验() {
    return era.get('tflag:30') || 0;
  }
  /**
   * @param {number} v
   */
  set 主人经验(v) {
    era.set('tflag:30', v);
  }

  /**
   * 死亡时在录像（tflag:34 ↔ TFLAG:34）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:34
   * @returns {number}
   */
  get 死亡时在录像() {
    return era.get('tflag:34') || 0;
  }
  /**
   * @param {number} v
   */
  set 死亡时在录像(v) {
    era.set('tflag:34', v);
  }

  /**
   * 对象膣内射精（tflag:38 ↔ TFLAG:38）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:38
   * @returns {number}
   */
  get 对象膣内射精() {
    return era.get('tflag:38') || 0;
  }
  /**
   * @param {number} v
   */
  set 对象膣内射精(v) {
    era.set('tflag:38', v);
  }

  /**
   * 三人PLAY主人部位（tflag:40 ↔ TFLAG:40）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:40
   * @returns {number}
   */
  get 三人PLAY主人部位() {
    return era.get('tflag:40') || 0;
  }
  /**
   * @param {number} v
   */
  set 三人PLAY主人部位(v) {
    era.set('tflag:40', v);
  }

  /**
   * 三人PLAY助手部位（tflag:41 ↔ TFLAG:41）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:41
   * @returns {number}
   */
  get 三人PLAY助手部位() {
    return era.get('tflag:41') || 0;
  }
  /**
   * @param {number} v
   */
  set 三人PLAY助手部位(v) {
    era.set('tflag:41', v);
  }

  /**
   * 三人PLAY持续（tflag:42 ↔ TFLAG:42）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:42
   * @returns {number}
   */
  get 三人PLAY持续() {
    return era.get('tflag:42') || 0;
  }
  /**
   * @param {number} v
   */
  set 三人PLAY持续(v) {
    era.set('tflag:42', v);
  }

  /**
   * 下装穿不上（tflag:45 ↔ TFLAG:45）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:45
   * @returns {number}
   */
  get 下装穿不上() {
    return era.get('tflag:45') || 0;
  }
  /**
   * @param {number} v
   */
  set 下装穿不上(v) {
    era.set('tflag:45', v);
  }

  /**
   * 珠结算_7（tflag:58 ↔ TFLAG:58）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58
   * @returns {number}
   */
  get 珠结算_7() {
    return era.get('tflag:58') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_7(v) {
    era.set('tflag:58', v);
  }

  /**
   * 快乐经验（tflag:100 ↔ TFLAG:100）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:100
   * @returns {number}
   */
  get 快乐经验() {
    return era.get('tflag:100') || 0;
  }
  /**
   * @param {number} v
   */
  set 快乐经验(v) {
    era.set('tflag:100', v);
  }

  /**
   * 屈服刻印结算（tflag:200 ↔ TFLAG:200）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:200
   * @returns {number}
   */
  get 屈服刻印结算() {
    return era.get('tflag:200') || 0;
  }
  /**
   * @param {number} v
   */
  set 屈服刻印结算(v) {
    era.set('tflag:200', v);
  }

  /**
   * 当前选择的调教指令编号（tflag:204 ↔ TFLAG:204）
   * 源: target/ERB/調教相關/COM_REGISTER.ERB 行5 TFLAG:204 主に現在選択している調教指令番号の一時的な保存
   * @returns {number}
   */
  get 当前选择的调教指令编号() {
    return era.get('tflag:204') || 0;
  }
  /**
   * @param {number} v
   */
  set 当前选择的调教指令编号(v) {
    era.set('tflag:204', v);
  }

  /**
   * 索求口上抑制（tflag:224 ↔ TFLAG:224）
   * 源: target/ERB/調教相關/COM_REGISTER.ERB 行6 TFLAG:224 おねだり口上抑制フラグ
   * @returns {number}
   */
  get 索求口上抑制() {
    return era.get('tflag:224') || 0;
  }
  /**
   * @param {number} v
   */
  set 索求口上抑制(v) {
    era.set('tflag:224', v);
  }

  /**
   * 死斗场敌种（tflag:400 ↔ TFLAG:400）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:400
   * @returns {number}
   */
  get 死斗场敌种() {
    return era.get('tflag:400') || 0;
  }
  /**
   * @param {number} v
   */
  set 死斗场敌种(v) {
    era.set('tflag:400', v);
  }

  /**
   * 死斗场陷落（tflag:401 ↔ TFLAG:401）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:401
   * @returns {number}
   */
  get 死斗场陷落() {
    return era.get('tflag:401') || 0;
  }
  /**
   * @param {number} v
   */
  set 死斗场陷落(v) {
    era.set('tflag:401', v);
  }

  /**
   * 死斗场收入（tflag:402 ↔ TFLAG:402）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:402
   * @returns {number}
   */
  get 死斗场收入() {
    return era.get('tflag:402') || 0;
  }
  /**
   * @param {number} v
   */
  set 死斗场收入(v) {
    era.set('tflag:402', v);
  }

  /**
   * 失神口上开关（tflag:860 ↔ TFLAG:860）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:860
   * @returns {number}
   */
  get 失神口上开关() {
    return era.get('tflag:860') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神口上开关(v) {
    era.set('tflag:860', v);
  }

  /**
   * 失神_864（tflag:864 ↔ TFLAG:864）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_864() {
    return era.get('tflag:864') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_864(v) {
    era.set('tflag:864', v);
  }

  /**
   * 失神_865（tflag:865 ↔ TFLAG:865）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_865() {
    return era.get('tflag:865') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_865(v) {
    era.set('tflag:865', v);
  }

  /**
   * 失神_866（tflag:866 ↔ TFLAG:866）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_866() {
    return era.get('tflag:866') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_866(v) {
    era.set('tflag:866', v);
  }

  /**
   * 失神_867（tflag:867 ↔ TFLAG:867）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_867() {
    return era.get('tflag:867') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_867(v) {
    era.set('tflag:867', v);
  }

  /**
   * 失神_868（tflag:868 ↔ TFLAG:868）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_868() {
    return era.get('tflag:868') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_868(v) {
    era.set('tflag:868', v);
  }

  /**
   * 失神_869（tflag:869 ↔ TFLAG:869）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_869() {
    return era.get('tflag:869') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_869(v) {
    era.set('tflag:869', v);
  }

  /**
   * 失神_870（tflag:870 ↔ TFLAG:870）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_870() {
    return era.get('tflag:870') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_870(v) {
    era.set('tflag:870', v);
  }

  /**
   * 失神_871（tflag:871 ↔ TFLAG:871）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_871() {
    return era.get('tflag:871') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_871(v) {
    era.set('tflag:871', v);
  }

  /**
   * 失神_872（tflag:872 ↔ TFLAG:872）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_872() {
    return era.get('tflag:872') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_872(v) {
    era.set('tflag:872', v);
  }

  /**
   * 失神_873（tflag:873 ↔ TFLAG:873）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_873() {
    return era.get('tflag:873') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_873(v) {
    era.set('tflag:873', v);
  }

  /**
   * 失神_874（tflag:874 ↔ TFLAG:874）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_874() {
    return era.get('tflag:874') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_874(v) {
    era.set('tflag:874', v);
  }

  /**
   * 失神_875（tflag:875 ↔ TFLAG:875）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_875() {
    return era.get('tflag:875') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_875(v) {
    era.set('tflag:875', v);
  }

  /**
   * 失神_876（tflag:876 ↔ TFLAG:876）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_876() {
    return era.get('tflag:876') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_876(v) {
    era.set('tflag:876', v);
  }

  /**
   * 失神_877（tflag:877 ↔ TFLAG:877）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_877() {
    return era.get('tflag:877') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_877(v) {
    era.set('tflag:877', v);
  }

  /**
   * 失神_878（tflag:878 ↔ TFLAG:878）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_878() {
    return era.get('tflag:878') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_878(v) {
    era.set('tflag:878', v);
  }

  /**
   * 失神_879（tflag:879 ↔ TFLAG:879）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_879() {
    return era.get('tflag:879') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_879(v) {
    era.set('tflag:879', v);
  }

  /**
   * 失神_880（tflag:880 ↔ TFLAG:880）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_880() {
    return era.get('tflag:880') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_880(v) {
    era.set('tflag:880', v);
  }

  /**
   * 失神_881（tflag:881 ↔ TFLAG:881）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_881() {
    return era.get('tflag:881') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_881(v) {
    era.set('tflag:881', v);
  }

  /**
   * 失神_882（tflag:882 ↔ TFLAG:882）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_882() {
    return era.get('tflag:882') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_882(v) {
    era.set('tflag:882', v);
  }

  /**
   * 失神_883（tflag:883 ↔ TFLAG:883）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_883() {
    return era.get('tflag:883') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_883(v) {
    era.set('tflag:883', v);
  }

  /**
   * 失神_884（tflag:884 ↔ TFLAG:884）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_884() {
    return era.get('tflag:884') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_884(v) {
    era.set('tflag:884', v);
  }

  /**
   * 失神_885（tflag:885 ↔ TFLAG:885）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_885() {
    return era.get('tflag:885') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_885(v) {
    era.set('tflag:885', v);
  }

  /**
   * 失神_886（tflag:886 ↔ TFLAG:886）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_886() {
    return era.get('tflag:886') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_886(v) {
    era.set('tflag:886', v);
  }

  /**
   * 失神_887（tflag:887 ↔ TFLAG:887）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_887() {
    return era.get('tflag:887') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_887(v) {
    era.set('tflag:887', v);
  }

  /**
   * 失神_888（tflag:888 ↔ TFLAG:888）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_888() {
    return era.get('tflag:888') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_888(v) {
    era.set('tflag:888', v);
  }

  /**
   * 失神_889（tflag:889 ↔ TFLAG:889）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_889() {
    return era.get('tflag:889') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_889(v) {
    era.set('tflag:889', v);
  }

  /**
   * 失神_890（tflag:890 ↔ TFLAG:890）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_890() {
    return era.get('tflag:890') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_890(v) {
    era.set('tflag:890', v);
  }

  /**
   * 失神_891（tflag:891 ↔ TFLAG:891）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_891() {
    return era.get('tflag:891') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_891(v) {
    era.set('tflag:891', v);
  }

  /**
   * 失神_892（tflag:892 ↔ TFLAG:892）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_892() {
    return era.get('tflag:892') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_892(v) {
    era.set('tflag:892', v);
  }

  /**
   * 失神_893（tflag:893 ↔ TFLAG:893）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_893() {
    return era.get('tflag:893') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_893(v) {
    era.set('tflag:893', v);
  }

  /**
   * 失神_894（tflag:894 ↔ TFLAG:894）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_894() {
    return era.get('tflag:894') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_894(v) {
    era.set('tflag:894', v);
  }

  /**
   * 失神_895（tflag:895 ↔ TFLAG:895）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_895() {
    return era.get('tflag:895') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_895(v) {
    era.set('tflag:895', v);
  }

  /**
   * 失神_896（tflag:896 ↔ TFLAG:896）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_896() {
    return era.get('tflag:896') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_896(v) {
    era.set('tflag:896', v);
  }

  /**
   * 失神_897（tflag:897 ↔ TFLAG:897）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_897() {
    return era.get('tflag:897') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_897(v) {
    era.set('tflag:897', v);
  }

  /**
   * 失神_898（tflag:898 ↔ TFLAG:898）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:864～899 失神补丁
   * @returns {number}
   */
  get 失神_898() {
    return era.get('tflag:898') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神_898(v) {
    era.set('tflag:898', v);
  }

  /**
   * 失神（tflag:899 ↔ TFLAG:899）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:899
   * @returns {number}
   */
  get 失神() {
    return era.get('tflag:899') || 0;
  }
  /**
   * @param {number} v
   */
  set 失神(v) {
    era.set('tflag:899', v);
  }

  /**
   * 清屏锚点（tflag:999 ↔ TFLAG:999）
   * 源: yml/TFlag.yml 头注；target/ERB/調教相關/USERCOM.ERB TFLAG:999
   * @returns {number}
   */
  get 清屏锚点() {
    return era.get('tflag:999') || 0;
  }
  /**
   * @param {number} v
   */
  set 清屏锚点(v) {
    era.set('tflag:999', v);
  }

  // —— item ——
  /**
   * 安全套（item:24 ↔ ITEM:24）
   * 源: yml/Item.yml id 24
   * @returns {number}
   */
  get 安全套() {
    return era.get('item:24') || 0;
  }
  /**
   * @param {number} v
   */
  set 安全套(v) {
    era.set('item:24', v);
  }

  /**
   * 润滑液（item:25 ↔ ITEM:25）
   * 源: yml/Item.yml id 25
   * @returns {number}
   */
  get 润滑液() {
    return era.get('item:25') || 0;
  }
  /**
   * @param {number} v
   */
  set 润滑液(v) {
    era.set('item:25', v);
  }

  /**
   * 媚药（item:26 ↔ ITEM:26）
   * 源: yml/Item.yml id 26
   * @returns {number}
   */
  get 媚药() {
    return era.get('item:26') || 0;
  }
  /**
   * @param {number} v
   */
  set 媚药(v) {
    era.set('item:26', v);
  }

  /**
   * 利尿剂（item:27 ↔ ITEM:27）
   * 源: yml/Item.yml id 27
   * @returns {number}
   */
  get 利尿剂() {
    return era.get('item:27') || 0;
  }
  /**
   * @param {number} v
   */
  set 利尿剂(v) {
    era.set('item:27', v);
  }

  /**
   * 水晶球魔力源（item:28 ↔ ITEM:28）
   * 源: yml/Item.yml id 28
   * @returns {number}
   */
  get 水晶球魔力源() {
    return era.get('item:28') || 0;
  }
  /**
   * @param {number} v
   */
  set 水晶球魔力源(v) {
    era.set('item:28', v);
  }

  /**
   * 穿孔工具（item:34 ↔ ITEM:34）
   * 源: yml/Item.yml id 34
   * @returns {number}
   */
  get 穿孔工具() {
    return era.get('item:34') || 0;
  }
  /**
   * @param {number} v
   */
  set 穿孔工具(v) {
    era.set('item:34', v);
  }

  /**
   * 观战卷（item:35 ↔ ITEM:35）
   * 源: yml/Item.yml id 35
   * @returns {number}
   */
  get 观战卷() {
    return era.get('item:35') || 0;
  }
  /**
   * @param {number} v
   */
  set 观战卷(v) {
    era.set('item:35', v);
  }
}
const facade = new TrainGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
