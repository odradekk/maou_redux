/**
 * @file 测试预置：yml/GameBase.yml 的运行时形状。
 *
 * era.get('gamebase') 返回只读对象，属性名是英文变量名而非 yml 里的中文键
 * （dev-guides/09-static.md）。夹具的变量存储是空的，凡测到读静态表的页面
 * （当前是标题画面）都要先预置这份形状。字段与 yml/GameBase.yml 的对应：
 *   游戏名称 title / 作者 author / 追加信息 info / 发布时间 year /
 *   游戏标识 gameCode / 版本 version / 版本代号 versionName（#135 起为
 *   String，标题画面直读它显示）/ 最低支持版本 allowVersion
 *
 * 版本轴自 #135 重设为 0.0.0（ADR-0006）：version/allowVersion = 0，
 * versionName = "0.0.0"；gameCode 冻结 931060（与 sav/global.sav 一致）。
 */

const GAMEBASE_SHAPE = {
  title: '魔王 Redux',
  author: 'odradekk',
  info: '',
  year: '2026',
  gameCode: 931060,
  version: 0,
  versionName: '0.0.0',
  allowVersion: 0,
};

/**
 * 往夹具预置 gamebase；overrides 可覆盖个别字段（如换 version 断言非硬编码）。
 * @param fixture create_era_fixture() 的返回值
 * @param {Record<string, any>} [overrides]
 */
function preset_gamebase(fixture, overrides = {}) {
  fixture.store.set('gamebase', { ...GAMEBASE_SHAPE, ...overrides });
}

module.exports = { preset_gamebase };
