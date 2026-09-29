// 发版打包（#714）：从 git 已跟踪的文件组装两个 zip，输出到 dist/。
//
//   node tools/pack-release.mjs
//
// - maou-redux-<版本>.zip：纯游戏包，ere/、yml/、res/ 加说明文件，给已经装了
//   引擎的玩家，用【游戏】→【打开游戏】选择解压出的目录。
// - maou-redux-<版本>-win-x64.zip：整合包，本机引擎目录原样放在外层，游戏放进
//   game/。引擎启动时先读运行目录下的 game/，解压后双击 exe 即进入游戏。
//
// 只收 git 已跟踪的文件，本机的 sav/*.sav、ere.config.json 不会混进去；这些
// 路径有未提交的改动时拒绝打包，保证包里的内容就是 HEAD。版本号取
// GameBase.yml 的【版本代号】。压缩用 7-Zip，-mcu=on 让 exe 的中文文件名按
// UTF-8 写入，Windows 自带的解压不会乱码；7z 不在 PATH 上时，用环境变量
// SEVEN_ZIP 指定 7z.exe 的路径。

import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { engine_launch_options } from './engine-launch.mjs';

const repo_root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const GAME_PATHS = ['ere', 'yml', 'res'];
const DOC_PATHS = ['README.md', 'CHANGELOG.md', 'third-party'];

function run(command, args, cwd = repo_root) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} 失败：\n${result.stderr}`);
  }
  return result.stdout;
}

function tracked_files(paths) {
  return run('git', ['ls-files', '-z', '--', ...paths])
    .split('\0')
    .filter(Boolean);
}

function copy_files(files, dest) {
  for (const file of files) {
    const target = path.join(dest, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(repo_root, file), target);
  }
}

const dirty = run('git', [
  'status',
  '--porcelain',
  '--',
  ...GAME_PATHS,
  ...DOC_PATHS,
]);
if (dirty) {
  throw new Error(`以下文件有未提交的改动，先提交再打包：\n${dirty}`);
}

const gamebase = fs.readFileSync(
  path.join(repo_root, 'yml', 'GameBase.yml'),
  'utf8',
);
const version = JSON.parse(/^"版本代号": (.+)$/m.exec(gamebase)[1]);
const engine_dir = path.dirname(
  engine_launch_options({ platform: 'win32' }).executablePath,
);

const dist = path.join(repo_root, 'dist');
fs.mkdirSync(dist, { recursive: true });
// 暂存目录放在仓库外：放在仓库里会被全库 ESLint 扫到；Paseo 这类基于
// Electron 的工具监视仓库时，还会把暂存的 app.asar 当成归档打开并一直占用，
// 删不掉
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'maou-redux-pack-'));

const game_files = tracked_files(GAME_PATHS);
const doc_files = tracked_files(DOC_PATHS);
const game_name = `maou-redux-${version}`;
const bundle_name = `${game_name}-win-x64`;

copy_files([...game_files, ...doc_files], path.join(stage, game_name));
fs.cpSync(engine_dir, path.join(stage, bundle_name), { recursive: true });
copy_files(game_files, path.join(stage, bundle_name, 'game'));
// 说明文件放在整合包外层，和 exe 并列，解压后第一眼能看到
copy_files(doc_files, path.join(stage, bundle_name));

for (const name of [game_name, bundle_name]) {
  const zip = path.join(dist, `${name}.zip`);
  fs.rmSync(zip, { force: true });
  run(
    process.env.SEVEN_ZIP || '7z',
    ['a', '-tzip', '-mcu=on', zip, name],
    stage,
  );
  const data = fs.readFileSync(zip);
  const sha256 = crypto.createHash('sha256').update(data).digest('hex');
  const size_mb = (data.length / 1024 / 1024).toFixed(1);
  console.log(`${path.relative(repo_root, zip)}  ${size_mb} MB  ${sha256}`);
}
fs.rmSync(stage, { recursive: true, force: true });
