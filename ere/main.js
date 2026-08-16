/**
 * @file 游戏入口：引擎读完静态数据与脚本后执行本文件导出的异步函数
 * （dev-guides/01-basic.md）。当前唯一的页面是标题画面（issue #19）；主菜单
 * 等页面随曳光弹后续票接入（issue #15）。
 */
const run_title_page = require('#/page/page-title');

module.exports = async () => {
  await run_title_page();
};
