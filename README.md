# 魔王 Redux

运行在 [EraElectron](https://gitgud.io/umaera/engine/era-electron) 引擎上的 era 类文字游戏。玩家扮演魔王，在据点经营迷宫、调教俘获的角色，并向人间界发动侵略。

本游戏含成人内容，仅供成年人游玩。

## 下载

在 [Releases](https://github.com/odradekk/maou_redux/releases) 页面下载，二选一：

| 文件                            | 内容                        | 适合                            |
| ------------------------------- | --------------------------- | ------------------------------- |
| `maou-redux-<版本>-win-x64.zip` | 引擎 4.8.0 与游戏，解压即玩 | Windows 64 位                   |
| `maou-redux-<版本>.zip`         | 只有游戏，不含引擎          | 已经装了 EraElectron 引擎的玩家 |

不要下载页面上自动附带的 Source code 压缩包，那是开发用的源码。

## 启动

**整合包**：解压到任意目录，双击其中的 `ERA-Electron - 重量级ERA引擎.exe`。引擎会自动读取同目录下的 `game/` 文件夹并进入游戏。用快捷方式启动时，快捷方式的「起始位置」要填这个目录，否则引擎找不到 `game/`。

**纯游戏包**：需要 EraElectron 4.8.0 或更新的引擎。启动引擎后，在菜单【游戏】→【打开游戏】中选择解压出的 `maou-redux-<版本>` 目录。

## 存档

存档保存在游戏目录下的 `sav/` 中，整合包是 `game/sav/`。升级游戏时，把旧的 `sav/` 复制到新版本的游戏目录即可。

0.x 版本之间不保证存档通用。新版本改动了存档结构时，引擎会提示旧存档「版本过低」并拒绝读取，这时只能开新游戏。每个版本是否影响存档，见 [更新日志](CHANGELOG.md)。

## 许可

本项目暂未声明开源许可证。

EraElectron 引擎以 GPL-2.0 发布，许可证原文见 `third-party/era-electron/LICENSE`，源码见 <https://gitgud.io/umaera/engine/era-electron>。游戏目录中的 `ere/era-electron.js` 是该引擎的 SDK，按同一许可证发布。整合包中的 `LICENSE.electron.txt` 与 `LICENSES.chromium.html` 是 Electron 与 Chromium 的许可证。

## 开发

开发说明见仓库的 [AGENTS.md](https://github.com/odradekk/maou_redux/blob/master/AGENTS.md)。
