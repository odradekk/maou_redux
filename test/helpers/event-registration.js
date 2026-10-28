/**
 * @file 单模块事件处理器注册助手（issue #851）。
 *
 * 处理器模块只导出 register()，生产环境由 system/flow/startup.js 的装配表统一
 * 调用。用例常常只装载自己关心的几个模块（并要在装载前后插替身），不能走
 * register_all（那会把整张装配表的模块都装上），于是用本助手按同样的调用
 * 方式补注册。
 *
 * 用法：`register_handlers(fixture, 'event/event-turnend', 'system/turnend-settle')`。
 */

/**
 * 把给定模块注册的处理器挂进该夹具的注册表（按传入顺序，模块内按 register()
 * 的书写顺序）。
 * @param {object} fixture 夹具（test/helpers/era-fixture.js）
 * @param {...string} module_paths 处理器模块路径（不带 `#/`）
 * @returns {object} 同一个夹具
 */
function register_handlers(fixture, ...module_paths) {
  for (const module_path of module_paths) {
    const handler_module = fixture.load_module(module_path);
    if (typeof handler_module.register !== 'function') {
      throw new Error(`#/${module_path} 没有导出 register()`);
    }
    handler_module.register();
  }
  return fixture;
}

module.exports = { register_handlers };
