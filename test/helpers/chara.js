/**
 * @file 测试预置：yml/Chara0.yml 与 yml/Chara17.yml 的运行时形状（#35/#50）。
 *
 * 夹具的 addCharacter 镜像引擎守卫（无预设数据不加，见 era-fixture.js），
 * 页面用例要断言「初始角色被加入」就得先预置角色 0 的形状——否则断言的是
 * 夹具行为而非引擎行为，#21/#22 就是这样漏过实机的。字段与 yml/Chara*.yml
 * 对应（引擎装载后的规范名）：番号 id / 名前 name / 呼び名 callname；
 * 基礎/素質/フラグ 行的预设效果由 test/chara-yml.test.js 用引擎代码对拍，
 * 此处不重复。
 */

const CHARA_0_SHAPE = { id: 0, name: '你', callname: '你' };

// yml/Chara17.yml 装载后的最小形状（issue #50：村娘，静态表名字是玛奥）。
// 基礎/素質/フラグ 预设不进夹具——游戏代码不读它们（村娘分支的 cflag 写
// 入随后覆盖 フラグ 预设位），预设本身的装载正确性由 test/chara-yml.test.js
// 用引擎代码对拍钉死，两层不重复。
const CHARA_17_SHAPE = { id: 17, name: '玛奥', callname: '玛奥' };

/**
 * 往夹具预置角色 0（魔王）。
 * @param fixture create_era_fixture() 的返回值
 */
function preset_chara_0(fixture) {
  fixture.seed_chara(0, CHARA_0_SHAPE);
}

/**
 * 往夹具预置角色 17（村娘玛奥，#50 的初期奴隶）。
 * @param fixture create_era_fixture() 的返回值
 */
function preset_chara_17(fixture) {
  fixture.seed_chara(17, CHARA_17_SHAPE);
}

module.exports = { preset_chara_0, preset_chara_17 };
