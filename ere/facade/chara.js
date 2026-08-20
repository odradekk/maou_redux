/**
 * @file 角色门面入口：chara(cid).<域>.<字段>（tools/gen-facade.js，issue #71）。
 *
 * 按角色 ID 缓存单例视图，只持 ID 不持值。域切片文件在 chara-<域>.js。
 */

// GENERATED START —— tools/gen-facade.js 装配角色视图，勿手改
const KojoFacade = require('#/facade/chara-kojo');
const TrainFacade = require('#/facade/chara-train');
const CharaFacade = require('#/facade/chara-chara');
const StrongholdFacade = require('#/facade/chara-stronghold');
const DungeonFacade = require('#/facade/chara-dungeon');
const EventFacade = require('#/facade/chara-event');
const SystemFacade = require('#/facade/chara-system');
const PatchFacade = require('#/facade/chara-patch');

class CharaView {
  constructor(cid) {
    this.cid = cid;
    this.kojo = new KojoFacade(cid);
    this.train = new TrainFacade(cid);
    this.chara = new CharaFacade(cid);
    this.stronghold = new StrongholdFacade(cid);
    this.dungeon = new DungeonFacade(cid);
    this.event = new EventFacade(cid);
    this.system = new SystemFacade(cid);
    this.patch = new PatchFacade(cid);
  }
}

const cache = new Map();

function chara(cid) {
  const key = Number(cid);
  let view = cache.get(key);
  if (!view) {
    view = new CharaView(key);
    cache.set(key, view);
  }
  return view;
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = { chara };
