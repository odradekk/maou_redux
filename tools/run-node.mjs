// 跨平台运行 Node 开发命令；超时或 Ctrl+C 时终止本次命令的进程树。
// 只接受 Node 参数，不经过 shell，中文路径、空格与代码参数原样传递。
import { spawn, spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const seconds = args[0] === '--timeout' ? Number(args.splice(0, 2)[1]) : 600;
if (args[0] === '--') args.shift();
if (!Number.isFinite(seconds) || seconds <= 0 || args.length === 0) {
  console.error(
    '用法: node tools/run-node.mjs [--timeout 秒数] -- <Node 参数…>',
  );
  process.exit(2);
}

const child = spawn(process.execPath, args, {
  stdio: 'inherit',
  windowsHide: true,
  // POSIX 的独立进程组供超时清理；Windows 由 taskkill /T 终止整棵子树。
  detached: process.platform !== 'win32',
});
let stopped;
function stop(code) {
  if (stopped !== undefined || !child.pid) return;
  stopped = code;
  if (process.platform === 'win32') {
    const result = spawnSync(
      'taskkill.exe',
      ['/PID', String(child.pid), '/T', '/F'],
      {
        windowsHide: true,
        encoding: 'utf8',
        timeout: 10000,
      },
    );
    if (result.error || result.status !== 0) {
      console.error(
        `无法终止进程树 ${child.pid}: ${result.error?.message || result.stderr || result.stdout}`,
      );
      child.kill('SIGKILL');
      // 权限不足或 taskkill 启动失败时，也不能让超时的包装进程无限等待。
      // 上面的错误保留 PID，供调用者检查未清理的子进程。
      setTimeout(() => process.exit(code), 1000).unref();
    }
  } else {
    const signal_group = (signal) => {
      try {
        process.kill(-child.pid, signal);
      } catch (error) {
        if (error.code !== 'ESRCH') throw error;
      }
    };
    signal_group('SIGINT');
    // 给就地变异的 finally 留还原时间，再清掉不响应中断的子进程。
    setTimeout(() => signal_group('SIGKILL'), 5000);
  }
}

const timer = setTimeout(() => {
  console.error(`命令超过 ${seconds} 秒，终止进程树。`);
  stop(124);
}, seconds * 1000);
process.on('SIGINT', () => stop(130));
process.on('SIGTERM', () => stop(143));
child.on('error', (error) => {
  console.error(error.message);
  clearTimeout(timer);
  process.exitCode = 1;
});
child.on('close', (code) => {
  clearTimeout(timer);
  // 中断后保留强制清理定时器：父进程已退出，不代表独立 stdio 的孙进程也退出。
  process.exitCode = stopped ?? code ?? 1;
});
