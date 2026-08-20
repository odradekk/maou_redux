/**
 * @file 一维门面入口：game.<域>.<字段>（tools/gen-facade.js，issue #71）。
 *
 * 与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。域切片文件在 game-<域>.js。
 */

// GENERATED START —— tools/gen-facade.js 装配 game 命名空间，勿手改
const kojo = require('#/facade/game-kojo');
const train = require('#/facade/game-train');
const chara = require('#/facade/game-chara');
const stronghold = require('#/facade/game-stronghold');
const dungeon = require('#/facade/game-dungeon');
const invasion = require('#/facade/game-invasion');
const event = require('#/facade/game-event');
const system = require('#/facade/game-system');

const game = {
  kojo,
  train,
  chara,
  stronghold,
  dungeon,
  invasion,
  event,
  system,
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = { game };
