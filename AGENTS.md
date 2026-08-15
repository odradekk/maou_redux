# ere-game（EraElectron 移植项目）

**工作语言：中文。** 所有对话、提交信息、代码注释、文档、Issue 一律使用简体中文。代码标识符用英文（见「命名约定」）。

## 项目目标

把 `target/` 中的 Emuera 游戏 **《ERA魔王 年度版》**（原作 eramaou，简体中文汉化版）移植到 **EraElectron** 引擎，即：把 eraBasic（`.ERB`/`.ERH` 脚本 + Emuera CSV）重写为 JavaScript（`ere/*.js` + EraElectron CSV）。

不是翻译，是**重新实现**。两边的运行模型完全不同：Emuera 是解释执行的领域语言，EraElectron 是 Node/Electron 上的普通 JS 模块。

## 当前状态

脚手架已能启动，**游戏本身还没有任何内容**：

| 项                           | 状态                                                              |
| ---------------------------- | ----------------------------------------------------------------- |
| `ere/main.js`                | 只有 `era.print('Hello World!')`                                  |
| `ere/era-electron.js`（SDK） | 已就位，`sdk: '4.8.0'`，与运行时版本一致                          |
| `csv/GameBase.csv`           | 已就位，8 行；游戏标识 `931060`、版本 `93106`、最低支持版本同版本 |
| `csv/`                       | 只有 `GameBase.csv`，变量表尚未建立                               |
| `res/`                       | 只有 `.gitkeep`                                                   |
| `sav/global.sav`             | 由引擎自动生成，已 gitignore；**删掉即可，引擎会重建**            |
| git                          | 仓库尚无任何提交                                                  |

引擎已验证可加载本仓库并输出 `Hello World!`（见 issue #2）。

**`sav/global.sav` 是引擎产物，不是仓库资产。** 它盖着游戏标识（当前 `931060`），与 `csv/GameBase.csv` 的【游戏标识】不一致时引擎会**拒绝启动并报错**，而不是静默重置（`dev-guides/11-saves.md:55`；第 56 行的「重置」只适用于版本号过低的情形）。改动【游戏标识】后必须删掉这个文件。

## 目录结构

```
D:\Code\era\
├── ere/                     # ← 游戏源码（我们写的），入口 ere/main.js
│   ├── main.js              #   导出 async 函数，引擎启动后调用它
│   ├── era-electron.js      #   引擎 SDK（4.8.0，取自引擎仓库，勿改名或移动）
│   └── jsconfig.json        #   路径别名 #/* → ere/*
├── csv/                     # ← 静态数据表（ere.config.json 的 static 指向此处）
├── res/                     # ← 图片/音频资源（当前 resource: false，未启用）
├── sav/                     # ← 存档（*.sav 已 gitignore，保留 .gitkeep）
├── ere.config.json          # 引擎配置（已 gitignore，属本地工作文件）
├── ere-4.8.0-win-x64/       # 引擎运行时 4.8.0，含 ERA-Electron - 重量级ERA引擎.exe
├── dev-guides/              # 引擎官方手册，25 篇，简体中文 ← 权威参考
└── target/                  # ← 移植源：Emuera 版《ERA魔王》，只读，不要改
```

`target/` 是移植的**输入**，视为只读参考资料。移植产物一律写进 `ere/`、`csv/`、`res/`。

## 运行与调试

引擎是 GUI 程序，**没有命令行启动方式**（npm script 只有测试，见本节末尾）：

1. 启动 `ere-4.8.0-win-x64\ERA-Electron - 重量级ERA引擎.exe`
2. 菜单【游戏】→【打开游戏】，选择仓库根目录 `D:\Code\era`
3. 改完代码按 `Ctrl+R`（或【游戏】→【重载游戏】）热重载

引擎启动顺序：读配置 → 读 `csv/*.csv`（**`GameBase.csv` 必需**）→ 读 `res/` → 以 `ere/main.js` 为入口加载脚本 → 注入 SDK → 读 `sav/` → 执行 `main.js` 导出的函数。

配置优先级：`csv/_fixed.json` > `ere.config.json` > `csv/_config.json` > 引擎默认值。

代码检查（直接用 npx）：

```
npx eslint .          # 格式 + 代码错误，--fix 可自动修
npx prettier --write . # 仅格式
```

测试（Node 内置 test runner，**零第三方依赖**；夹具在 `test/helpers/era-fixture.js`，是全项目唯一的一处缝，见 issue #16）：

```
npm test              # 等价 node --test；test/ 目录下所有 .js 都会被执行，helpers/ 无用例、无副作用，无害
```

格式选项在 `.prettierrc` 与 `.eslintrc.js` 的 `prettier/prettier` 规则中**各写了一份且取值相同**（单引号、分号、尾逗号 `all`、`endOfLine: auto`），两条命令不会打架。改格式约定时**必须同时改这两处**，否则 eslint 与 prettier 会给出互相矛盾的结果。

`.prettierignore` 排除了 `target/`、`ere-4.8.0-win-x64/`、`dev-guides/`、`sav/`。**别删它**：prettier 默认扫描全仓库，没有它 `npx prettier --write .` 会重写只读移植源 `target/` 里的 68MB 文件（且会在其中的 Shift-JIS 日文 HTML 上直接报错退出）。

## 引擎 API 与硬约束

- 一切能力来自 `require('#/era-electron')`，权威清单见 `dev-guides/A-api-docs.md`。主要分组：输出（`print` / `printAndWait` / `printMultiColumns` / `printInColRows` / `printButton` / `printImage`）、输入（`input` / `waitAnyKey`）、变量读写（`get` / `set` / `add`）、存档（`saveData` / `loadData` / `saveGlobal`）、角色（`getAllCharacters` / `addCharacter` / `beginTrain` / `endTrain`）、媒体（`playMusic`）、日志（`logger.*`）。
- **不能使用 Node 内置模块和第三方库**，唯一例外是 `crypto`（`dev-guides/18-tools.md`）。所有 IO、随机、时间之外的能力都走 `era` API。
- 异步 API 必须 `await`：`printAndWait`、`input`、`clear`、`waitAnyKey`、`delay`、存档系列。漏掉 `await` 会造成时序错乱且难以排查。
- 变量以字符串寻址：`era.get('base:0:0')`、``era.get(`staticcflag:${cid}:1`)``，也支持列名如 ``era.get(`static:${cid}:name`)``。
- 文件编码必须是 **UTF-8 或 UTF-8 BOM**。`target/` 中的旧文件编码未逐一核实，转换前先确认。

## 代码约定

`.eslintrc.js` 已约束格式：单引号、分号、尾逗号 `all`、`endOfLine: auto`。以下是格式之外、参照 erauma 的工程约定：

- **文件名** kebab-case，带类别前缀：`sys-calc-*.js`（系统计算）、`page-*.js`（界面）、`*-factory.js`（工厂）、`calc-*.js` / `*-utils.js`（工具）。
- **标识符** snake_case（`get_display_name`、`birth_list`）。注意引擎 API 自身是 camelCase（`era.printMultiColumns`），不要混淆两者。
- **`#/` 别名** 引用项目内模块，不要用相对路径 `../../`。
- **导入分组排序**：`era` 置顶，其后按 `system` / `page` / `event` / `utils` / `data` / `i18n` 分组。
- **变量语义必须注释**。这是最关键的一条 —— `era.get('global:3')` 本身不可读：

  ```js
  // GLOBALNAME:3 = 语言
  set_lan(era.get('global:3') || era.set('global:3', 'zh-CN'));
  ```

- **提交信息** 用 Conventional Commits，scope 按子系统划分（如 `train` / `ero` / `event` / `chara` / `page` / `data` / `util`），参考 erauma 的 `CONTRIBUTING.md`。

## 移植源：`target/`

Emuera 1.821.8 简体中文版运行的《ERA魔王 年度版（名字暂定）》，作者「人人为我，我为人人」，版本 93106。

规模（实测）：**346 个 `.ERB`/`.ERH`，315,953 行；58 个 CSV；68.5 MB**。

按目录的行数分布，决定移植的优先级和工作量：

| 目录                                                |     行数 | 内容                             |
| --------------------------------------------------- | -------: | -------------------------------- |
| `ERB/口上/`                                         |  149,037 | 角色台词文本，占全部代码 **47%** |
| `ERB/調教相關/`                                     |   47,075 | 调教系统                         |
| `ERB/迷宮/`                                         |   21,274 | 迷宫                             |
| `ERB/キャラ関数/`                                   |   20,968 | 角色函数                         |
| `ERB/EVENT/`                                        |   14,911 | 事件与日程                       |
| `ERB/SHOP/`                                         |   10,275 | 商店与主菜单                     |
| `ERB/ABL/`                                          |    8,829 | 能力                             |
| `ERB/其他/`                                         |    8,700 | 杂项                             |
| `ERB/侵略/`、`售卻相關/`、`SYSTEM/`、`怪物相關/` 等 | 各 3k–7k | 其余子系统                       |

关键入口：`ERB/TITLE.ERB`（`@SYSTEM_TITLE`，标题画面）→ `ERB/SYSTEM/SYSTEM ver1.0.3.ERB`（`@EVENTFIRST`，全局初始化）→ `ERB/SHOP/DRAW_MAINMENU.ERB`（主菜单）→ `ERB/EVENT/EVENT_NEXTDAY.ERB`（日循环）、`ERB/調教相關/TRAIN_MAIN.ERB`（`@EVENTTRAIN`）。

`target/CSV/GameBase.csv` 是移植元数据的来源。`target/資料_非必要無須解壓/` 是日文原作文档（readme、补丁历史、flag 说明），可作设计意图的原始依据。

**口上占了近一半体量，但它不是纯文本，是带文本的状态机。** 实测输出行仅占 31.4%，控制流占 33.1%，注释占 24.8%；且文本被切得极碎——25,091 个连续文本段，**中位数 1 行/段**，90% 的段 ≤3 行。

引擎的 `.kojo` 格式（`dev-guides/C-kojo.md`）只能承载文本演出：无法表达嵌套分支、状态推进（`CFLAG` 写入）、数值副作用（`JUEL += 50`）与限时输入（`TINPUT`），且官方明确「奖惩效果归游戏代码」（`C-kojo.md:16`）。**因此口上一律用 JS 承载**，决议见 issue #8。

移植方式：离线转译器产出初稿（约 98% 的行可机械转换），再人工逐段复核。转译器必须保留注释——29,724 行说明文字是理解语义的主要依据。

## 参考资料

**引擎手册** `dev-guides/`（简体中文，权威）：

- `01-basic.md` — 项目结构、运行流程、最小可运行示例
- `03-config.md` — 配置项与优先级
- `04-js-basic.md` — JS 侧基础
- `05-interaction.md` / `06-output.md` / `08-ui.md` — 交互与输出
- `09-static.md` / `10-const.md` — 静态数据与常量表
- `11-saves.md` / `12-sl.md` — 存档
- `15-ero.md` — 调教系统实现
- `16-resources.md` — 资源
- `18-tools.md` — 开发套件、变量字符串、依赖限制
- `A-api-docs.md` — **API 权威清单**
- `C-kojo.md` — `.kojo` 口上格式
- `D-ere-games.md` — 生态项目索引
- `E-erauma-train.md` — EraUma 调教系统设计思路

**开源参考项目**（gitgud.io）：

| 项目                                                                         | 用途                                                                                          |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`umaera/game/ere-example`](https://gitgud.io/umaera/game/ere-example)       | 官方例程，含存读档、商店、口上、调教基本框架，**传统变量风格**                                |
| [`umaera/game/ere-kanon`](https://gitgud.io/umaera/game/ere-kanon)           | erakanon 的 ere 移植版，**开发套件 OOP 风格** — 与本项目同属「移植旧 era 游戏」，参考价值最高 |
| [`umaera/erauma`](https://gitgud.io/umaera/erauma)                           | 体量最大的成熟 ere 游戏，参考其**工程结构、命名、提交规范**                                   |
| [`umaera/engine/era-electron`](https://gitgud.io/umaera/engine/era-electron) | 引擎本体，SDK 从这里取                                                                        |
| [`umaera/game/kojo-test`](https://gitgud.io/umaera/game/kojo-test)           | `.kojo` 文件有效性测试                                                                        |

erauma 的 `ere/` 分层可直接借鉴：`data/`（静态数据）、`event/`（事件）、`page/`（界面）、`system/`（系统逻辑，按域再分子目录）、`utils/`（工具）、`i18n/`（多语言）。

> 注意官方告诫（`dev-guides/E-erauma-train.md`）：EraUma 代码缺注释、缺类型检查，**不建议在代码层面照抄**；代码级范例应优先看 `ere-example` 或 `ereKanon`，EraUma 只参考设计思路与工程组织。

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `odradekk/maou_redux`, via the `gh` CLI — pass `--repo odradekk/maou_redux` explicitly. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` and one `docs/adr/` at the repo root. See `docs/agents/domain.md`.
