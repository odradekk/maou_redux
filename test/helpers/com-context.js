/**
 * @file 指令上下文（#877）：调教指令函数从回合循环接收的
 * `{target, player, assi}`。
 *
 * 生产路径由 execute_command_round 读一次 era_flag 的三个会话指针后随
 * args 透传；测试不经过回合循环，直接经分发族调用指令函数，因此需要自己
 * 造这份快照。时点与改动前一致：指令函数自己读指针也是调用发生的那一刻。
 */

/**
 * 按当前会话指针造一份指令上下文。
 * @param {object} era_flag era-utils/era-flag 的导出
 * @returns {{target: number, player: number, assi: number}}
 */
function com_context(era_flag) {
  return {
    target: era_flag.target,
    player: era_flag.player,
    assi: era_flag.assi,
  };
}

/**
 * 给指令族套一层「自动补上下文」的调用面：用例仍写 `family.call(110)`，
 * 实际以 `args: [com_context(era_flag)]` 传入。只暴露用例用到的 call / has，
 * 其余成员（missing 等构建期报告）不经这里取，免得与真实族的形状混淆。
 * @param {object} family com_family 等分发族
 * @param {object} era_flag era-utils/era-flag 的导出
 * @returns {{call: Function, has: Function}}
 */
function with_com_context(family, era_flag) {
  return {
    call: (id, options = {}) =>
      family.call(id, { ...options, args: [com_context(era_flag)] }),
    has: (id) => family.has(id),
  };
}

module.exports = { com_context, with_com_context };
