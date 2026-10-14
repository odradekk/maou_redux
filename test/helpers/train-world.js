/**
 * @file 测试预置：带角色的调教世界（#793）。
 *
 * 调教域用例此前各自复制同一套骨架——建夹具、魔王与奴隶入列、开调教、四把
 * 会话指针（target/player/assi/assiplay）、呼名落键、载入 com 族模块——副本
 * 之间已经走样，新增一个 com 测试要照抄二十余行。这里给出一处构造入口，用例
 * 只声明差异：目标是谁、助手是谁、视角是谁、载入哪些模块。
 *
 * 边界（#16 的决定）：`era-fixture.js` 是全项目唯一的注入点，本文件是它之上
 * 的组合层，不是第二个注入点——只用夹具的公开面（`load_module` / `store` /
 * `era` / `seed_chara`）装配世界，不直接 require 引擎与游戏模块，也不新增任何
 * 注入通道。因此本文件不含断言、不做真实引擎装配（`new engine.era_api(` 的
 * 散装使用是另一件事）。
 *
 * 返回 `{ fixture, era_flag, modules }`：`fixture` 与 `era_flag` 是后续写前置
 * 与断言的入口，`modules` 是按声明载入的模块导出（键由调用方命名）。
 */

'use strict';

const { create_era_fixture } = require('./era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./chara');

/**
 * 构造一个「魔王 + 奴隶 + 可选助手」的调教世界。
 *
 * @param {object} [options]
 * @param {number} [options.target=31] 调教对象（奴隶）的角色编号
 * @param {string} [options.target_name='温妮'] 调教对象的显示名与呼名
 * @param {number} [options.assi=-1] 助手编号：> 0 时预置并入列，0 = 主人自己、
 *   -1 = 无助手（`era_flag.assi` 一律照实写入）
 * @param {number} [options.player=0] 当前调教者（视角角色），通常为 0 = 魔王
 * @param {number} [options.assiplay=0] 助手是否参与调教
 * @param {number} [options.selectcom=-1] 当前指令编号，-1 = 尚未选定
 * @param {number} [options.prevcom=-1] 上次指令编号，-1 = 没有上次
 * @param {string} [options.master_callname] 主人呼名（SAVESTR:0 / NAME:0 的读数
 *   源）；不给就沿用预设的「你」
 * @param {number[]} [options.train] 进调教名单，默认 `[0, target]`（助手缺省
 *   不进，需要时显式列出）
 * @param {Record<string, string>} [options.modules] 模块声明：键 = 调用方取的
 *   名字，值 = 经 `#/` 的模块名；按声明顺序载入，导出挂在返回值的 `modules` 上
 * @returns {{fixture: object, era_flag: object, modules: Record<string, object>}}
 */
function seed_train_world({
  target = 31,
  target_name = '温妮',
  assi = -1,
  player = 0,
  assiplay = 0,
  selectcom = -1,
  prevcom = -1,
  master_callname,
  train,
  modules = {},
} = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, target, target_name);
  if (assi > 0) {
    // 助手是独立角色：预设与呼名走 join_slave_chara 同一条路
    join_slave_chara(fixture, assi, `助手${assi}`);
  }
  fixture.era.beginTrain(...(train ?? [0, target]));

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = target;
  era_flag.player = player;
  era_flag.assi = assi;
  era_flag.assiplay = assiplay;
  era_flag.selectcom = selectcom;
  era_flag.prevcom = prevcom;
  if (master_callname !== undefined) {
    // preset_chara_0 给的呼名是「你」，用例要「魔王」时由此覆盖
    fixture.store.set('callname:0:-1', master_callname);
    fixture.store.set('callname:0:-2', master_callname);
  }

  // 模块在世界就位之后载入：com 族模块的注册动作读得到上面的世界状态
  const loaded = {};
  for (const [key, name] of Object.entries(modules)) {
    loaded[key] = fixture.load_module(name);
  }

  return { fixture, era_flag, modules: loaded };
}

module.exports = { seed_train_world };
