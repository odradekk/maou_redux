# NOTICE — 内容来源与许可

本插件（`dsh-ere-game-builder`）是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的第三方插件，
用于帮助用户用 DSH 制作能在 **[EraElectron](https://gitgud.io/umaera/engine/era-electron)（ere）** 引擎中运行的游戏。

EraElectron 引擎本身与用户自己的游戏工程都不属于本插件；本插件只提供知识、模板与检查工具。

## 一、随插件分发的 EraElectron 内容

| 文件 | 来源 | 许可 |
| --- | --- | --- |
| `assets/sdk/era-electron.js` | EraElectron 仓库 `sdk/era-electron.js`，**逐字节复制**。取自引擎 4.8.5；它声明 `version.sdk = '4.8.5'`，含义是使用它的游戏**要求引擎 ≥ 4.8.5**（**最低引擎版本**，不是 SDK 自身版本号） | GPL-2.0-only |
| `assets/templates/minimal-game/**` | 依据 EraElectron 官方 Wiki「一切的开始：新建项目」与官方例程 `ere-example` 的结构重写，不是原文件的复制 | GPL-2.0-only |
| `assets/reference/api-index.json` | 由脚本从 `sdk/era-electron.js` 的 JSDoc **机器提取** | 派生自 GPL-2.0-only 源码 |
| `assets/reference/wiki-digest.md` | 对 EraElectron Wiki（`era-electron.wiki` 仓库）全部开发指南章节的整理与摘录 | 派生自 EraElectron Wiki |
| `assets/reference/api-digest.md` | 对 EraElectron 源码（`src/era/**`、`src/renderer/**`、`sdk/**`）与 Wiki 的整理 | 派生自 GPL-2.0-only 源码 |
| `assets/reference/i18n.md` | 依据作者提供的一个工程的多语言参考实现整理（机制摘要，**非原文件复制**；该工程仍在开发中） | GPL-2.0-only |
| `assets/reference/example-game.md` | 对官方例程 `ere-example` 的**结论与坑点**整理（例程本身不随插件分发，按需获取；逐文件导航在例程自己的 `AGENTS.md` 里） | 派生自 `ere-example` |
| `assets/reference/api-extra.json`、`assets/reference/pitfalls.md` | 依据上述源码与文档编写 | 同上 |
| `yamljs`（npm registry 上的运行时依赖，不随本插件分发） | EraElectron 用它解析 yml 静态数据与 `.kojo`；本插件用同一个解析器校验 yml，以保证结论与引擎一致 | MIT |

**为什么把 SDK 复制进插件**：`ere/era-electron.js` 是每个 ere 游戏工程的必需文件，引擎只有找到它才能
把 API 注入游戏。官方 Wiki 对该文件的说明就是「使用时复制粘贴到自己的 ere 下」。插件内置一份副本，
是为了让 `ere_scaffold_game` 生成的工程**开箱即可运行**；你也可以用 `sdkPath` 参数改为从本地引擎复制。

因为分发了 GPL-2.0-only 的衍生内容，**本插件整体以 GPL-2.0-only 发布**（见 `LICENSE`）。

## 二、本插件自身的代码

`index.js`、`lib/**`、`scripts/**`、`locale/**`、`icon.svg`、`README.md`、本文件由本插件作者编写，
同样以 GPL-2.0-only 授权。

`lib/name-mapping.js` 是 EraElectron 仓库 `src/era/name-mapping.json`（引擎自带的键名映射表）在插件内的
副本，用于复现引擎对中文/日文键名与别名的映射。

## 三、商标与归属

EraElectron、ere、EraUma 及相关名称归其原作者所有。
