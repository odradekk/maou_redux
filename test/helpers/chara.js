/**
 * @file 测试预置：yml/Chara0.yml 的运行时形状（issue #35）。
 *
 * 夹具的 addCharacter 镜像引擎守卫（无预设数据不加，见 era-fixture.js），
 * 页面用例要断言「初始角色被加入」就得先预置角色 0 的形状——否则断言的是
 * 夹具行为而非引擎行为，#21/#22 就是这样漏过实机的。字段与 yml/Chara0.yml
 * 对应（引擎装载后的规范名）：番号 id / 名前 name / 呼び名 callname；
 * 基礎/素質 行在 Base/Talent 表落地前被引擎丢弃、不进预设，装载侧的等价性
 * 由 test/chara-yml.test.js 用引擎代码对拍，此处不重复。
 */

const CHARA_0_SHAPE = { id: 0, name: '你', callname: '你' };

/**
 * 往夹具预置角色 0（魔王）。
 * @param fixture create_era_fixture() 的返回值
 */
function preset_chara_0(fixture) {
  fixture.seed_chara(0, CHARA_0_SHAPE);
}

module.exports = { preset_chara_0 };
