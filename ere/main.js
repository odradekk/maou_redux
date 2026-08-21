/**
 * @file 游戏入口：引擎读完静态数据与脚本后执行本文件导出的异步函数
 * （dev-guides/01-basic.md）。
 *
 * 主循环与转场状态机在 system/flow/main-loop.js（issue #20）：标题画面是
 * 初始状态，「新的猎物」经 BEGIN FIRST 转入新游戏初始化；其余页面随贯通验证
 * 后续票接入（issue #15）。
 */
const run_main_loop = require('#/system/flow/main-loop');

module.exports = async () => {
  await run_main_loop();
};
