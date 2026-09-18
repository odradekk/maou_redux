// CLI 与 MCP 共用的引擎启动位置；Windows 用上游发布包，Linux 保留 Electron 运行时。
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo_root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const windows_exe = 'ERA-Electron - 重量级ERA引擎.exe';

export function engine_launch_options({
  root = repo_root,
  home = homedir(),
  platform = process.platform,
  env = process.env,
} = {}) {
  const engine_home = path.join(home, '.era-engine');
  let executablePath;
  let args;
  if (platform === 'win32') {
    executablePath =
      env.ERE_ENGINE_EXECUTABLE ||
      [
        path.join(root, 'ere-4.8.0-win-x64', windows_exe),
        path.join(engine_home, 'ere-4.8.0-win-x64', windows_exe),
      ].find((file) => existsSync(file));
    // 打包版自带 resources/app.asar，不再把另一份 asar 当作游戏参数传入。
    args = [];
  } else if (platform === 'linux') {
    executablePath =
      env.ERE_ENGINE_EXECUTABLE ||
      path.join(
        engine_home,
        'runtime',
        'node_modules',
        'electron',
        'dist',
        'electron',
      );
    args = [path.join(engine_home, 'app.asar')];
  } else {
    throw new Error(`尚未配置 ${platform} 的引擎启动方式。`);
  }
  if (
    !executablePath ||
    !existsSync(executablePath) ||
    args.some((file) => !existsSync(file))
  ) {
    throw new Error(
      '未找到引擎，请按 docs/windows-development.md 配置引擎路径。',
    );
  }
  return { executablePath, args, cwd: root };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const { executablePath, args, cwd } = engine_launch_options();
    const child = spawn(executablePath, args, {
      cwd,
      stdio: 'inherit',
      windowsHide: true,
    });
    child.on('error', (error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
    child.on('close', (code) => {
      process.exitCode = code ?? 1;
    });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
