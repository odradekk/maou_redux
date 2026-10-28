/**
 * @file 游戏入口：引擎读完静态数据与脚本后执行本文件导出的异步函数
 * （dev-guides/01-basic.md）。
 *
 * 主循环与转场状态机在 system/flow/main-loop.js（issue #20）：标题画面是
 * 初始状态，也是游戏结束后的落脚点（#852 的标题循环——结局回标题，可重开、
 * 读档或退出）；其余页面随贯通验证后续票接入（issue #15）。
 *
 * 装载顺序：本文件 require main-loop → main-loop require 启动装配表
 * system/flow/startup.js 并调用 register_all()（事件处理器与分发族在此注册）
 * → 进入标题状态。注册只发生这一次，早于任何 emit（#851）。
 */
const run_main_loop = require('#/system/flow/main-loop');

module.exports = async () => {
  await run_main_loop();
};
