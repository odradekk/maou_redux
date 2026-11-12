/**
 * @file 口上工厂（#854）：按编号选口上类、缓存实例。
 *
 * 形状照官方写法（`dev-guides/14-lines.md` 的 `get_custom_lines`）：
 * `cons_dict`（编号 → 类）+ `obj_dict`（编号 → 实例），实例只构造一次。
 * 口上对象不带状态（`id` 之外不存东西），所以缓存不会在存档变动后过期。
 *
 * 编号从哪来：`kojo-system.js` 的 `get_kojo_num`（按素质 160-179 与
 * EX_TALENT 101-800 算 LOCAL，减 100 得键）。工厂自己不算编号——它只认
 * 分发键，素质扫描留在原处，避免两处各写一份扫描。
 *
 * 未注册的编号退回**基类实例**（官方写法）：基类的钩子一律不输出，等价于
 * 「这个性格在这个时机没有口上」。编号在窗口内却取不到本体时（素质指向一个
 * 没装口上文件的性格），玩家侧看到的是沉默，与 TRYCALL 落空同款。
 *
 * 注册发生在各口上模块的顶层：模块没装 = 该性格没有口上。
 */

const { KojoBase } = require('#/kojo/kojo-base');

/** 编号 → 口上类 */
const cons_dict = new Map();

/** 编号 → 实例（一次构造，全局复用） */
const obj_dict = new Map();

/**
 * 注册一套口上（模块顶层调用）。
 * @param {number} id 口上编号（= LOCAL - 100）
 * @param {typeof KojoBase} Ctor 口上类（必须继承 KojoBase）
 * @throws {TypeError} 编号不是整数、或类没有继承 KojoBase
 * @throws {Error} 同编号重复注册——后注册的会静默遮蔽前一个，必须启动期即报
 */
function register_kojo(id, Ctor) {
  if (!Number.isInteger(id)) {
    throw new TypeError(`口上编号必须是整数，收到 ${id}`);
  }
  if (typeof Ctor !== 'function' || !(Ctor.prototype instanceof KojoBase)) {
    throw new TypeError(`口上编号 ${id} 的类必须继承 KojoBase`);
  }
  if (cons_dict.has(id)) {
    throw new Error(`口上编号 ${id} 重复注册（同名遮蔽，启动期即报）`);
  }
  cons_dict.set(id, Ctor);
}

/**
 * 取编号对应的口上对象（实例缓存）。
 * @param {number} id 口上编号（= LOCAL - 100）
 * @returns {KojoBase} 未注册的编号返回基类实例（钩子全部不输出）
 */
function get_kojo(id) {
  const cached = obj_dict.get(id);
  if (cached !== undefined) {
    return cached;
  }
  const Ctor = cons_dict.get(id) ?? KojoBase;
  const instance = new Ctor(id);
  obj_dict.set(id, instance);
  return instance;
}

/**
 * 已注册的编号（升序）。启动装配的核对用它：模块漏被 require 时该号不会出现，
 * 整性格的口上会静默失声。
 * @returns {number[]} 编号数组
 */
function registered_kojo_ids() {
  return [...cons_dict.keys()].sort((a, b) => a - b);
}

module.exports = { get_kojo, register_kojo, registered_kojo_ids };
