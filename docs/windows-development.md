# Windows 开发

当前主工作目录为 `D:\Code\era`，使用原生 PowerShell、Node 与 Windows 版 EraElectron。项目也支持 Linux CI 和原有的 Fedora 启动方式。

## Node 与依赖

使用 **Node 24 LTS，至少 24.13.1**，与 CI 的 Node 24 保持一致。本机迁移时的 24.13.0 在 `fs.rmSync` 清理中文临时目录时直接崩溃（退出码 `3221226505`），会使 `trace-check` 等测试整文件失败；[官方 24.13.1 修复记录](https://github.com/nodejs/node/pull/61108) 已修正该行为。

```powershell
Set-Location D:\Code\era
node --version
npm ci
```

依赖版本以 `package-lock.json` 为准。迁移后先运行 `npm ci`，确保安装了锁文件记录的全部依赖，包括 Playwright 和 MCP 包。检查代码时使用 `npm run lint` 与 `npm run format:check`，避免 `npx` 临时下载其他版本的工具。若 PowerShell 策略阻止 `npm.ps1`，使用 `npm.cmd` 执行同样命令，无须更改系统执行策略。

## 引擎与自动化

把上游 4.8.0 Windows x64 发布包完整解压到 `ere-4.8.0-win-x64/`，保留 `.exe`、`resources/`、DLL 等文件的相对位置。本机该目录已存在并被 Git 忽略。

```powershell
npm start
```

在引擎中选择【游戏】→【打开游戏】→ 当前仓库根目录；显示「加载成功」后按任意键进入标题，改完代码按 `Ctrl+R`。如果引擎保留了 Fedora 上的路径，通过此菜单重新选择 Windows 目录。本地 `ere.config.json` 的 `system.static` 应为 `yml` 或省略。保留 `sav/` 的现有存档，由游戏的版本校验判断是否兼容。

`npm start` 和 `tools/electron-mcp-server.mjs` 共用 `tools/engine-launch.mjs`。它在 Windows 上按以下顺序查找引擎程序：

1. 当前环境变量 `ERE_ENGINE_EXECUTABLE` 指定的完整发布版可执行文件。
2. 当前仓库的 `ere-4.8.0-win-x64/ERA-Electron - 重量级ERA引擎.exe`。
3. `$env:USERPROFILE/.era-engine/ere-4.8.0-win-x64/` 下的同名程序。

Windows 发布版自动加载自身的 `resources/app.asar`，启动时不额外传入 asar 路径。若引擎位于主工作目录，而游戏从另一个 Git worktree 运行，可在该 PowerShell 会话中指定引擎路径：

```powershell
$env:ERE_ENGINE_EXECUTABLE = 'D:\Code\era\ere-4.8.0-win-x64\ERA-Electron - 重量级ERA引擎.exe'
npm start
```

测试只需要 `app.asar`。将它复制到用户目录下的 `.era-engine/`，让其他 worktree 和变异测试的隔离副本也能找到引擎。复制前核对 SHA256，期望值来自 `.github/actions/setup-engine/action.yml`：

```powershell
$engineSource = Join-Path (Get-Location) 'ere-4.8.0-win-x64/resources/app.asar'
$expectedHash = '98cbd808b08c5d675665c4581ee813ff106b1bba0225102ea2950507e89808ce'
if ((Get-FileHash -LiteralPath $engineSource -Algorithm SHA256).Hash -ne $expectedHash) {
    throw '引擎版本或文件内容不符，停止复制'
}
$engineDirectory = Join-Path $env:USERPROFILE '.era-engine'
New-Item -ItemType Directory -Force -Path $engineDirectory | Out-Null
Copy-Item -LiteralPath $engineSource -Destination (Join-Path $engineDirectory 'app.asar')
```

Linux 仍使用 `~/.era-engine/runtime/node_modules/electron/dist/electron` 加 `~/.era-engine/app.asar`。GUI 使用引擎自带的 Electron；项目测试使用系统 Node，两者版本独立。

## 测试与长任务

```powershell
# 开发过程中：运行单个测试文件，整条命令限时 600 秒
node tools/run-node.mjs -- --test test/select-tests.test.js

# 交付前
npm run test:related
npm run lint
npm run format:check

# 全量测试，并确认有引擎时没有跳过的测试
npm run test:ci
node tools/skip-count-check.mjs test-report.tap --baseline test/engine-present-skip-baseline.txt
```

npm 测试命令设有 600 秒超时，最多同时运行 4 个测试文件，可直接在原生 Windows 环境执行。直接运行 `node --test` 会绕过这些限制。测试文件并发上限不能代替 CPU 配额，多个 agent 同时运行测试时，资源占用仍会叠加。

长时间运行的变异测试应使用隔离副本，并设置更长的超时。日志按工单号或任务名放在仓库的 `logs/` 下：

```powershell
New-Item -ItemType Directory -Force -Path logs/migration | Out-Null
node tools/run-node.mjs --timeout 5400 -- tools/mutation-check.mjs --jobs 2 *> logs/migration/mutation-full.log
```

`tools/run-node.mjs` 保留命令退出码，超时返回 124，按 Ctrl+C 终止时返回 130。在 Windows 上强制终止命令时，它会结束该命令及其全部子进程，**无法保证被终止脚本的 `finally` 执行**。因此，长时间运行的变异测试应使用 `--jobs 2` 或更高值，启用隔离副本。串行 `--ids` 任务正常结束时会还原文件；若被强制终止，检查本次修改文件的 `git diff`，只还原变异造成的修改，保留原有改动。删除中断任务的临时副本前，先确认该任务已结束。

需要验证无引擎环境时，PowerShell 这样临时设变量并恢复原值：

```powershell
$previousAsar = $env:ERE_ENGINE_ASAR
try {
    $env:ERE_ENGINE_ASAR = 'none'
    npm run test:ci
    node tools/skip-count-check.mjs test-report.tap
} finally {
    $env:ERE_ENGINE_ASAR = $previousAsar
}
```

仓库路径参数推荐 `/`；定向测试与变异的 `--files` 也接受 Windows 的 `\`。Git 将自有 `.js`、`.mjs`、`.sh`、JSON、Markdown 等文件统一检出为 LF；`target/` 和引擎 SDK 保持原始字节，迁移时不做全库换行或编码转换。
