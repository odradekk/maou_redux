// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`audio:${param}`) || 0;
}

const era_audio = {
  /**
   * 是否启用背景音乐
   * @returns {number}
   */
  get "bgm_enabled"() {
    return era['raw']().data['audio'][0];
  },
  /**
   * 是否启用背景音乐
   * @param {number} v
   */
  set "bgm_enabled"(v) {
    era['raw']().data['audio'][0] = v;
  },
  /**
   * 背景音乐音量
   * @returns {number}
   */
  get "bgm_volume"() {
    return era['raw']().data['audio'][1];
  },
  /**
   * 背景音乐音量
   * @param {number} v
   */
  set "bgm_volume"(v) {
    era['raw']().data['audio'][1] = v;
  },
  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`audio:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`audio:${param}`, get(param) + val);
  },
};

module.exports = era_audio;
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 变量语义补注（语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
//   bgm_enabled  是否启用背景音乐  SAVEDATA（随游戏存档）。主菜单 BGM 开关：
//       1=据点主菜单每轮重绘时播 据点2.mp3、0=不播。声明无默认值 → 新档
//       0=不播，开局不播即应有行为——唯一写点是设定菜单 MOD_SWITCH。
//   bgm_volume   背景音乐音量  SAVEDATA。声明默认 66（「#DIM SAVEDATA
//       背景音乐音量 = 66」，SETBGMVOLUME 的实参）。ere 侧无
//       逐曲音量 API，值暂无消费者；声明默认值的播种随首个消费者（设定票）。
//
// 本表是扩展普通表（非引擎内建）：yml/Audio.yml 落静态目录即自动注册，
// fillData 建 data 桶、saveData/resetData 随存档存清——与 #DIM SAVEDATA 的
// 存档语义一致（表头注与引擎实证见 yml/Audio.yml）。
module.exports = era_audio;
