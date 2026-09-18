const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const runner = path.join(ROOT, 'tools/run-node.mjs');
const launch_module = import(
  pathToFileURL(path.join(ROOT, 'tools/engine-launch.mjs'))
);

function run(args) {
  return spawnSync(process.execPath, [runner, ...args], {
    encoding: 'utf8',
    timeout: 15000,
    env: Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) => !key.startsWith('NODE_TEST'),
      ),
    ),
  });
}

test('开发命令原样传递中文、空格与 shell 字符，并保留失败退出码', () => {
  const value = '中文路径 空格 $value & echo 不执行';
  const result = run([
    '--',
    '-e',
    'console.log(process.argv[1]); process.exitCode = 7',
    value,
  ]);
  assert.equal(result.status, 7, result.stderr);
  assert.equal(result.stdout.trim(), value);
});

test('开发命令拒绝无效超时，避免长任务无限运行', () => {
  for (const value of ['0', '-1', 'NaN']) {
    const result = run(['--timeout', value, '--', '-e', 'process.exit(0)']);
    assert.equal(result.status, 2, result.stderr);
  }
});

test('超时终止命令及其子进程，返回 124', () => {
  const result = run([
    '--timeout',
    '3',
    '--',
    '-e',
    `
    const { spawn } = require('node:child_process');
    const child = spawn(process.execPath, ['-e', 'console.log(process.pid); setInterval(() => {}, 1000)']);
    child.stdout.on('data', (data) => console.log(JSON.stringify([process.pid, Number(String(data).trim())])));
    setInterval(() => {}, 1000);
  `,
  ]);
  assert.equal(result.status, 124, `${result.error || ''}\n${result.stderr}`);
  const pids = JSON.parse(result.stdout.trim());
  for (const pid of pids) {
    assert.throws(
      () => process.kill(pid, 0),
      { code: 'ESRCH' },
      `超时后进程 ${pid} 仍在运行`,
    );
  }
});

test('引擎启动覆盖 Windows 发布包、共享目录、显式路径与 Linux 运行时', async () => {
  const { engine_launch_options } = await launch_module;
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'era 开发环境 '));
  const root = path.join(fixture, 'repo');
  const home = path.join(fixture, 'home');
  const touch = (...parts) => {
    const file = path.join(...parts);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '');
    return file;
  };
  const options = { root, home, platform: 'win32', env: {} };
  try {
    assert.throws(() => engine_launch_options(options), /未找到引擎/);
    const shared = touch(
      home,
      '.era-engine',
      'ere-4.8.0-win-x64',
      'ERA-Electron - 重量级ERA引擎.exe',
    );
    assert.deepEqual(engine_launch_options(options), {
      executablePath: shared,
      args: [],
      cwd: root,
    });
    const local = touch(
      root,
      'ere-4.8.0-win-x64',
      'ERA-Electron - 重量级ERA引擎.exe',
    );
    assert.equal(engine_launch_options(options).executablePath, local);
    const explicit = touch(fixture, '自定义 引擎.exe');
    assert.equal(
      engine_launch_options({
        ...options,
        env: { ERE_ENGINE_EXECUTABLE: explicit },
      }).executablePath,
      explicit,
    );
    assert.throws(
      () =>
        engine_launch_options({
          ...options,
          env: { ERE_ENGINE_EXECUTABLE: `${explicit}.missing` },
        }),
      /未找到引擎/,
    );
    const linux = touch(
      home,
      '.era-engine',
      'runtime',
      'node_modules',
      'electron',
      'dist',
      'electron',
    );
    assert.throws(
      () => engine_launch_options({ ...options, platform: 'linux' }),
      /未找到引擎/,
    );
    const asar = touch(home, '.era-engine', 'app.asar');
    assert.deepEqual(engine_launch_options({ ...options, platform: 'linux' }), {
      executablePath: linux,
      args: [asar],
      cwd: root,
    });
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
