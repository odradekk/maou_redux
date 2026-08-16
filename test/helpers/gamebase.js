/**
 * @file 测试预置：yml/GameBase.yml 的运行时形状。
 *
 * era.get('gamebase') 返回只读对象，属性名是英文变量名而非 yml 里的中文键
 * （dev-guides/09-static.md）。夹具的变量存储是空的，凡测到读静态表的页面
 * （当前是标题画面）都要先预置这份形状。字段与 yml/GameBase.yml 的对应：
 *   游戏名称 title / 作者 author / 追加信息 info / 发布时间 year /
 *   游戏标识 gameCode / 版本 version / 最低支持版本 allowVersion
 */

const GAMEBASE_SHAPE = {
  title: 'ERA魔王 年度版（名字暂定）（PC only）',
  author: '「人人为我，我为人人」',
  info: '※未经允许，任何人不得引用、修改再打包或进行商业用途※',
  year: '2011 - 2024！',
  gameCode: 931060,
  version: 93106,
  allowVersion: 93106,
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
