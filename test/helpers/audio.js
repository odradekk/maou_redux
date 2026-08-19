/**
 * @file 测试预置：音频相关的 global 槽位（issue #69）。
 *
 * 标题音乐默认值的播种（era-global.js 的 seed_title_music_defaults）在进
 * run_title_page 时首先执行——它会在全量 var_writes 断言里混进三笔写入、
 * 多出一次 saveGlobal。凡不测播种本身、只测标题画面其余行为的用例都应先
 * 预置「已播种」标记跳过它；播种自身的用例（test/era-global.test.js、
 * test/page-title.test.js 的音乐组）不预置。
 */

/**
 * 往夹具预置音频播种标记（global:2 = 1），跳过 run_title_page 的默认值播种。
 * 预置后 global:0（标题音乐开关）随之为 0——需要「开关开着」的用例另行
 * seed_res + store.set('global:0', 1)。
 * @param fixture create_era_fixture() 的返回值
 */
function preset_audio_seeded(fixture) {
  fixture.store.set('global:2', 1);
}

module.exports = { preset_audio_seeded };
