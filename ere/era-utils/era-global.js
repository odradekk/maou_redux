/**
 * @file global 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/Global.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/Global.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_global = {
  /**
   * 是否启用标题音乐（global:0 ↔ GLOBAL:0）
   * @returns {number}
   */
  get title_music_enabled() {
    return era.get('global:0') || 0;
  },
  /**
   * @param {number} v
   */
  set title_music_enabled(v) {
    era.set('global:0', v);
  },
  /**
   * 标题音乐音量（global:1 ↔ GLOBAL:1）
   * @returns {number}
   */
  get title_music_volume() {
    return era.get('global:1') || 0;
  },
  /**
   * @param {number} v
   */
  set title_music_volume(v) {
    era.set('global:1', v);
  },
  /**
   * 联系方式开关（global:98 ↔ GLOBAL:98）
   * @returns {number}
   */
  get contact_info_shown() {
    return era.get('global:98') || 0;
  },
  /**
   * @param {number} v
   */
  set contact_info_shown(v) {
    era.set('global:98', v);
  },
  /**
   * 致辞折叠开关（global:99 ↔ GLOBAL:99）
   * @returns {number}
   */
  get greeting_collapsed() {
    return era.get('global:99') || 0;
  },
  /**
   * @param {number} v
   */
  set greeting_collapsed(v) {
    era.set('global:99', v);
  },
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 变量语义补注（原作语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
//   title_music_enabled  GLOBAL:0  标题音乐开关：1=进标题播 BGM（TFM-003A_17.mp3）、
//       0=不播。原作声明默认 1。源: target/ERB/音声相关/音声的全局变量.erh
//       「#DIM GLOBAL SAVEDATA 是否启用标题音乐 = 1」。
//   title_music_volume   GLOBAL:1  标题音乐音量（SETBGMVOLUME 的实参）。原作声明
//       默认 66。源同上「#DIM GLOBAL SAVEDATA 标题音乐音量 = 66」。
//   contact_info_shown   GLOBAL:98 联系方式开关：0=显示「版本推进出问题」、
//       1=显示联系方式；标题画面按钮 8 切换。源: target/ERB/SYSTEM/
//       TITLE ver1.0.8.ERB @SYSTEM_TITLE（IF GLOBAL:98 == 0 分支）。
//   greeting_collapsed   GLOBAL:99 致辞折叠开关：0=展开完整制作名单、1=折叠为
//       三行摘要；标题画面按钮 9 切换。源同上（IF GLOBAL:99 == 0 分支）。
//
// 已知缺口（移交标题页票，见 issue #18 决议说明）：ere 引擎全新 global.sav 把
// 声明变量一律初始化为 0（dev-guides/11-saves.md loadGlobal），原作的两个声明
// 默认值（音乐开关 1、音量 66）引擎不会自动落盘——两个默认值有原作随包
// global.sav 的实证（target/Sav/global.sav 按「名字」存了 是否启用标题音乐=1、
// 标题音乐音量=66）——需要标题页初始化时显式补写，否则首局进标题没有 BGM。
//
// 持久化：global 表即公共存档 global.sav 的主体，引擎在每次脚本启动前自动
// loadGlobal、在特定存档保存/读取等时机自动 saveGlobal。标题页改完开关后应像
// 原作 SAVEGLOBAL 一样显式 await era.saveGlobal()（本模块不代劳，保持 setter 纯净）。

/**
 * 切换联系方式开关（镜像原作 GLOBAL:98 = (GLOBAL:98 + 1) % 2，按钮 8）。
 * @returns {number} 切换后的值
 */
era_global.toggle_contact_info = () => {
  era_global.contact_info_shown = (era_global.contact_info_shown + 1) % 2;
  return era_global.contact_info_shown;
};

/**
 * 切换致辞折叠开关（镜像原作 GLOBAL:99 = (GLOBAL:99 + 1) % 2，按钮 9）。
 * @returns {number} 切换后的值
 */
era_global.toggle_greeting = () => {
  era_global.greeting_collapsed = (era_global.greeting_collapsed + 1) % 2;
  return era_global.greeting_collapsed;
};

module.exports = era_global;
