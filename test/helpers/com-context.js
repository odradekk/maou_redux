/**
 * @file 调教指令处理函数的上下文对象 {target, player, assi}（#877/#878/#879）。
 *
 * 生产侧由回合循环在 ere/system/train/command-round.js 读一次指针后经
 * 族的 args 透传；测试里直调分发族时用本函数按当前 era_flag 现取——测试
 * 只驱动单条指令，不涉及时点差异。
 */

/**
 * @param {{target: number, player: number, assi: number}} era_flag 测试夹具的变量访问器
 * @returns {{target: number, player: number, assi: number}}
 */
function com_context(era_flag) {
  return {
    target: era_flag.target,
    player: era_flag.player,
    assi: era_flag.assi,
  };
}

module.exports = { com_context };
