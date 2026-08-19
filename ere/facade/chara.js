/**
 * @file 角色门面入口：chara(cid).<域>.<字段>（tools/gen-facade.js，issue #71）。
 *
 * 按角色 ID 缓存单例视图，只持 ID 不持值。域切片文件在 chara-<域>.js。
 */

// GENERATED START —— tools/gen-facade.js 装配角色视图，勿手改
const KojoFacade = require('#/facade/chara-kojo');

class CharaView {
  constructor(cid) {
    this.cid = cid;
    this.kojo = new KojoFacade(cid);
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
