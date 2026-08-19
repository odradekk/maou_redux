/**
 * @file audio 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/Audio.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/Audio.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_audio = {
  /**
   * 是否启用背景音乐（audio:0 ↔ AUDIO:0）
   * @returns {number}
   */
  get bgm_enabled() {
    return era.get('audio:0') || 0;
  },
  /**
   * @param {number} v
   */
  set bgm_enabled(v) {
    era.set('audio:0', v);
  },
  /**
   * 背景音乐音量（audio:1 ↔ AUDIO:1）
   * @returns {number}
   */
  get bgm_volume() {
    return era.get('audio:1') || 0;
  },
  /**
   * @param {number} v
   */
  set bgm_volume(v) {
    era.set('audio:1', v);
  },
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 变量语义补注（原作语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
//   bgm_enabled  是否启用背景音乐  SAVEDATA（随游戏存档）。主菜单 BGM 开关：
//       1=据点主菜单每轮重绘时播 据点2.mp3（DRAW_MAINMENU.ERB:12-13）、
//       0=不播。源: target/ERB/音声相关/音声的全局变量.erh:3
//       「#DIM SAVEDATA 是否启用背景音乐」（无声明默认值 → 新档 0=不播，
//       原作新档本来也不播——唯一写点是设定菜单 MOD_SWITCH，见
//       docs/stub-registry.md 资源级欠账）。
//   bgm_volume   背景音乐音量  SAVEDATA。原作声明默认 66（erh:4
//       「#DIM SAVEDATA 背景音乐音量 = 66」，SETBGMVOLUME 的实参）。ere 侧无
//       逐曲音量 API，值暂无消费者；声明默认值的播种随首个消费者（设定票）。
//
// 本表是扩展普通表（非引擎内建）：yml/Audio.yml 落静态目录即自动注册，
// fillData 建 data 桶、saveData/resetData 随存档存清——与 #DIM SAVEDATA 的
// 存档语义一致（表头注与引擎实证见 yml/Audio.yml）。
module.exports = era_audio;
