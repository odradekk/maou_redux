// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`global:${param}`) || 0;
}

const era_global = {
  /**
   * 是否启用标题音乐
   * @returns {number}
   */
  get "title_music_enabled"() {
    return era['raw']().global[0];
  },
  /**
   * 是否启用标题音乐
   * @param {number} v
   */
  set "title_music_enabled"(v) {
    era['raw']().global[0] = v;
  },
  /**
   * 标题音乐音量
   * @returns {number}
   */
  get "title_music_volume"() {
    return era['raw']().global[1];
  },
  /**
   * 标题音乐音量
   * @param {number} v
   */
  set "title_music_volume"(v) {
    era['raw']().global[1] = v;
  },
  /**
   * 音频默认值已落盘
   * @returns {number}
   */
  get "audio_defaults_seeded"() {
    return era['raw']().global[2];
  },
  /**
   * 音频默认值已落盘
   * @param {number} v
   */
  set "audio_defaults_seeded"(v) {
    era['raw']().global[2] = v;
  },
  /**
   * 冒险者性别
   * @returns {number}
   */
  get "adventurer_gender"() {
    return era['raw']().global[3];
  },
  /**
   * 冒险者性别
   * @param {number} v
   */
  set "adventurer_gender"(v) {
    era['raw']().global[3] = v;
  },
  /**
   * 通信勇者记录
   * @returns {string}
   */
  get "communication_roster"() {
    return era['raw']().global[100];
  },
  /**
   * 通信勇者记录
   * @param {string} v
   */
  set "communication_roster"(v) {
    era['raw']().global[100] = v;
  },
  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`global:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`global:${param}`, get(param) + val);
  },
};

module.exports = era_global;
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 变量语义补注（语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
//   title_music_enabled  GLOBAL:0  标题音乐开关：1=进标题播 BGM（TFM-003A_17.mp3）、
//       0=不播。声明默认 1（「#DIM GLOBAL SAVEDATA 是否启用标题音乐 = 1」）。
//   title_music_volume   GLOBAL:1  标题音乐音量（SETBGMVOLUME 的实参）。声明
//       默认 66（「#DIM GLOBAL SAVEDATA 标题音乐音量 = 66」）。ere 侧无逐曲
//       音量 API（playMusic 只有 loop/fade），值只为存档保真落盘、暂无消费者。
//   audio_defaults_seeded GLOBAL:2 ere 侧机制槽（issue #69，无对应变量）：
//       发行版随包 global.sav 预置上面两个默认值，而 ere 全新 global.sav 的
//       声明槽位一律置 0——默认值由 seed_title_music_defaults() 一次性播种，
//   communication_roster GLOBAL:100 通信勇者记录：GLOBALS:0..99 的字符串
//       记录在 ere 中合并为 JSON 数组；元素仍保留下划线与斜线分隔的记录
//       格式（序列化见 ere/system/cross-save-sharing.js）。
//   adventurer_gender   GLOBAL:3 冒险者性别（原文用字「冒險者性別」，键名按
//       #60 简体化）：新游戏里出现冒险者的性别限制，GLOBAL SAVEDATA
//       （魔改新增）跨存档共享。EVENTFIRST（ere/event/event-first.js）每次
//       开局无条件重置为 -1；
//       -1=女多男少、0=只有女性、1=只有男性、2=男多女少、3=男女持平、
//       4=全是扶她（冒险者生成按此掷骰，ere/system/chara/chara-make.js）。
//       设置页 [27] 六档循环（ere/page/page-config.js，#547 实现存取）。
//
// 持久化：global 表即公共存档 global.sav 的主体，引擎在每次脚本启动前自动
// loadGlobal、在特定存档保存/读取等时机自动 saveGlobal。标题页改完开关后应
// 显式 await era.saveGlobal()（本模块不代劳，保持 setter 纯净）。

/**
 * 一次性播种标题音乐的默认值（issue #69，补 #18 移交的缺口）。
 *
 * 条件：global:2（播种标记）非 1 即播——全新 global.sav 的声明槽位全是 0，
 * 这张票之前生成的旧档无此槽（引擎 loadGlobal 对缺失/为假的声明槽补 0），
 * 两者都落在「未播种」分支。播完置标记并显式 saveGlobal（发行态靠随包
 * global.sav 预置，ere 只能运行时补）。此后用户经设定界面关掉标题音乐，
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
 * 切换冒险者性别档位（设置页 [27] 的 -1→0→1→2→3→4→-1 循环）。
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
