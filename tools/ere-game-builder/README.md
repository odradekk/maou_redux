# ere-game-builder（dsh-ere-game-builder 本地移植）

上游：[umaera/engine/dsh-ere-game-builder](https://gitgud.io/umaera/engine/dsh-ere-game-builder) v1.3.2（提交 `fbec3a6`，2026-10-19）。上游是 DeepSeek Harness（DSH）插件，本项目不用 DSH，所以把它的 3 个技能放进 `.agents/skills/` 与 `.claude/skills/`，5 个工具改成本目录下的命令行。许可沿用上游的 GPL-2.0-only，见 `LICENSE` 与 `NOTICE.md`（上游原文）。

## 用法

```
node tools/ere-game-builder/cli.mjs --help
node tools/ere-game-builder/cli.mjs ere_api_lookup printButton
node tools/ere-game-builder/cli.mjs ere_search_reference 进度条 --docs api,pitfalls
node tools/ere-game-builder/cli.mjs ere_check_kojo path/to/file.kojo
node tools/ere-game-builder/cli.mjs ere_check_game path/to/game --json
node tools/ere-game-builder/cli.mjs ere_scaffold_game path/to/new-game --title 新游戏
```

参数名与上游工具的参数相同；唯一的必填参数可以写成位置参数；相对路径按当前目录解析。退出码：0 正常，1 检查发现错误或 API 不存在，2 参数错误或运行失败。

## 与上游的差异

| 上游 | 本项目 |
| --- | --- |
| `lib/`、`assets/reference/`、`assets/sdk/`、`assets/templates/`、`LICENSE`、`NOTICE.md`、`RELEASE.md` | 原样保留 |
| `assets/skills/*` | 移到 `.agents/skills/`；只改了标题里的「DSH」，并在开头加「在本项目里使用」一段。`.claude/skills/` 是逐字节副本，`test/agent-skills-sync.test.js` 检查两处一致 |
| `index.js`（向 DSH 注册技能与工具） | `cli.mjs`：`registerTools()` 的函数体逐行取自上游 `apply()` 的工具注册部分，外层改成命令行 |
| `package.json` | 重写，只声明 ESM；`yamljs` 装在仓库根目录的 devDependencies |
| `cordis.patch.yml`、`locale/`、`icon.svg`、`scripts/`、`README.md` | 未搬：前三个只给 DSH 打包用；`scripts/` 是上游开发脚本，自检依赖 DSH 入口；README 的功能说明在上游仓库 |

本目录与两处 `ere-*` 技能目录不参加本项目的 ESLint 与 Prettier 检查，以保持与上游逐字节一致，方便以后比对。

## 在本项目上的已知限制

- 知识库按引擎 5.0.0 核对，本项目运行 4.8.0。CSV 空字段（4.8.3 起改）、引擎自带的 `.kojo` 校验（4.8.5 起）、`gutter` 横向滚动条（4.8.6 起修）等条目在 4.8.0 上不成立。本项目以 `dev-guides/` 和 app.asar 引擎源码为准。
- `ere_scaffold_game` 写入的 SDK 声明 `version.sdk = '4.8.5'`，生成的工程需要引擎 4.8.5 及以上，本项目的 4.8.0 发布包会拒绝加载。要在 4.8.0 上用，传 `--sdkPath ere/era-electron.js`。
- `ere_check_game` 对本项目报出大量数据路径错误，都是规则与本项目约定不符造成的：`CFlag.yml` 等表按约定不登记名字、`portcflag` 是 `_fixed.json` 声明的扩展表、表名动态拼接。本项目的检查以 `npm test` 为准。

## 同步上游新版本

1. 用 `git -c core.autocrlf=false clone` 取新版本，保证换行与上游一致。
2. 用新版本覆盖上表中「原样保留」的文件。
3. 把 `assets/skills/*` 覆盖到 `.agents/skills/`，重新加上标题改动和「在本项目里使用」一段（按新版本核对内容），再把 `.agents/skills/` 下三个目录整个复制到 `.claude/skills/`。
4. 比对上游 `index.js` 的 `apply()` 工具注册部分与 `cli.mjs` 的 `registerTools()`，有变化就整段替换；新增参数类型时检查 `parseToolArgs()`。
5. 更新本文件开头和 `package.json` 的版本号，逐个运行 5 个工具，再跑 `test/agent-skills-sync.test.js`。
