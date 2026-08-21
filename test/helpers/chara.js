/**
 * @file 测试预置：yml/Chara0.yml 与 yml/Chara17.yml 的运行时形状（#35/#50）。
 *
 * 夹具的 addCharacter 镜像引擎守卫（无预设数据不加，见 era-fixture.js），
 * 页面用例要断言「初始角色被加入」就得先预置角色 0 的形状——否则断言的是
 * 夹具行为而非引擎行为，#21/#22 就是这样漏过实机的。字段与 yml/Chara*.yml
 * 对应（引擎装载后的规范名）：番号 id / 名前 name / 呼び名 callname；
 * 基礎/素質/フラグ 行的预设效果由 test/chara-yml.test.js 用引擎代码比对，
 * 此处不重复。
 */

const CHARA_0_SHAPE = { id: 0, name: '你', callname: '你' };

// yml/Chara17.yml 装载后的最小形状（issue #50：村娘，静态表名字是玛奥）。
// 基礎/素質/フラグ 预设不进夹具——游戏代码不读它们（村娘分支的 cflag 写
// 入随后覆盖 フラグ 预设位），预设本身的装载正确性由 test/chara-yml.test.js
// 用引擎代码比对固定，两层不重复。
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

/**
 * 预置并加入一个可调教的奴隶角色（调教域测试的世界底座，issue #44）。
 *
 * 做两件事：seed 预设（#35 镜像的引擎守卫）、addCharacter 入列。callname
 * 寻址键（callname:x:-1/-2，SAVESTR:x 与 NAME:x 的读数源）由夹具的
 * addCharacter 从预设镜像写入（引擎行为，见 era-fixture.js）。CFLAG:x:1
 *（占用标志）保持未写 = 0（可选）。
 *
 * @param fixture create_era_fixture() 的返回值
 * @param {number} [id=31] 角色 ID（31 = 琼，随机奴隶的常见编号）
 * @param {string} [name] 显示名（默认 `奴隶${id}`）
 */
function join_slave_chara(fixture, id = 31, name = `奴隶${id}`) {
  fixture.seed_chara(id, { id, name, callname: name });
  fixture.era.addCharacter(id);
}

module.exports = { preset_chara_0, preset_chara_17, join_slave_chara };
