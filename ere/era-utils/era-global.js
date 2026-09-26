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
   * 音频默认值已落盘（global:2 ↔ GLOBAL:2）
   * @returns {number}
   */
  get audio_defaults_seeded() {
    return era.get('global:2') || 0;
  },
  /**
   * @param {number} v
   */
  set audio_defaults_seeded(v) {
    era.set('global:2', v);
  },
  /**
   * 冒险者性别（global:3 ↔ GLOBAL:3）
   * @returns {number}
   */
  get adventurer_gender() {
    return era.get('global:3') || 0;
  },
  /**
   * @param {number} v
   */
  set adventurer_gender(v) {
    era.set('global:3', v);
  },
  /**
   * 通信勇者记录（global:100 ↔ GLOBAL:100）
   * @returns {string}
   */
  get communication_roster() {
    return era.get('global:100') ?? '';
  },
  /**
   * @param {string} v
   */
  set communication_roster(v) {
    era.set('global:100', v);
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
//       默认 66。源同上「#DIM GLOBAL SAVEDATA 标题音乐音量 = 66」。ere 侧无逐曲
//       音量 API（playMusic 只有 loop/fade），值只为存档保真落盘、暂无消费者。
//   audio_defaults_seeded GLOBAL:2 ere 侧机制槽（非原作变量，issue #69）：原作
//       随包 global.sav 预置上面两个默认值，而 ere 全新 global.sav 把声明槽位
//       一律置 0——「原作发行态」由 seed_title_music_defaults() 一次性播种，
//       本槽即播种标记（1=已播过，用户此后改开关不被覆盖）。
//   communication_roster GLOBAL:100 通信勇者记录：原作 GLOBALS:0..99 的字符串
//       记录在 ere 中合并为 JSON 数组；元素仍保留 MAOUNET.ERB @INPORT_B 的
//       下划线与斜线分隔格式。源: target/ERB/其他/MAOUNET.ERB。
//   adventurer_gender   GLOBAL:3 冒险者性别（原文用字「冒險者性別」，键名按
//       #60 简体化）：新游戏里出现冒险者的性别限制，GLOBAL SAVEDATA
//       （魔改新增/魔改使用.ERH:2）跨存档共享。@EVENTFIRST 每次开局无条件
//       重置为 -1（SYSTEM ver1.0.3.ERB:53，ere/event/event-first.js）；
//       -1=女多男少、0=只有女性、1=只有男性、2=男多女少、3=男女持平、
//       4=全是扶她（档位文案 CONFIG.ERB:118-134；掷骰 CHARA_MAKE.ERB:259
//       @CM_GENDER）。设置页 [27] 六档循环（CONFIG.ERB:253-264，
//       ere/page/page-config.js，#547 落地存储）。
//
// 持久化：global 表即公共存档 global.sav 的主体，引擎在每次脚本启动前自动
// loadGlobal、在特定存档保存/读取等时机自动 saveGlobal。标题页改完开关后应像
// 原作 SAVEGLOBAL 一样显式 await era.saveGlobal()（本模块不代劳，保持 setter 纯净）。

/**
 * 一次性播种原作发行态的标题音乐默认值（issue #69 落地 #18 移交的缺口）。
 *
 * 判据：global:2（播种标记）非 1 即播——全新 global.sav 的声明槽位全是 0，
 * 这张票之前生成的旧档无此槽（引擎 loadGlobal 对缺失/为假的声明槽补 0），
 * 两者都落在「未播种」分支。播完置标记并显式 saveGlobal（原作的等价物是
 * 随包 global.sav，ere 只能运行时补）。此后用户经设定界面关掉标题音乐，
 * 标记仍为 1，不会被重新覆盖。
 *
 * @returns {Promise<boolean>} 本次是否执行了播种
 */
async function seed_title_music_defaults() {
  if (era_global.audio_defaults_seeded === 1) {
    return false;
  }
  era_global.title_music_enabled = 1;
  era_global.title_music_volume = 66;
  era_global.audio_defaults_seeded = 1;
  await era.saveGlobal();
  return true;
}

/**
 * 切换冒险者性别档位（镜像原作设置页 [27] 的 -1→0→1→2→3→4→-1 循环，
 * SYSTEM/CONFIG.ERB:253-264）。
 * @returns {number} 切换后的档位
 */
era_global.cycle_adventurer_gender = () => {
  const v = era_global.adventurer_gender;
  const next =
    v === -1 ? 0 : v === 0 ? 1 : v === 1 ? 2 : v === 2 ? 3 : v === 3 ? 4 : -1;
  era_global.adventurer_gender = next;
  return next;
};

era_global.seed_title_music_defaults = seed_title_music_defaults;

module.exports = era_global;
