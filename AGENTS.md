# ere-game（EraElectron 移植项目）

**工作语言：中文。** 所有对话、提交信息、代码注释、文档、Issue 一律使用简体中文。代码标识符用英文（见「命名约定」）。

## 项目目标

把 `target/` 中的 Emuera 游戏 **《ERA魔王 年度版》**（原作 eramaou，简体中文汉化版）移植到 **EraElectron** 引擎，即：把 eraBasic（`.ERB`/`.ERH` 脚本 + Emuera CSV）重写为 JavaScript（`ere/*.js` + EraElectron CSV）。

不是翻译，是**重新实现**。两边的运行模型完全不同：Emuera 是解释执行的领域语言，EraElectron 是 Node/Electron 上的普通 JS 模块。

## 当前状态

脚手架已能启动，**游戏本身还没有任何内容**：

| 项                           | 状态                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `ere/main.js`                | 只有 `era.print('Hello World!')`                                                                                   |
| `ere/era-electron.js`（SDK） | 已就位，`sdk: '4.8.0'`，与运行时版本一致                                                                           |
| `yml/GameBase.yml`           | 已就位，8 个字段；游戏标识 `931060`、版本 `93106`、最低支持版本同版本（由 `csv/GameBase.csv` 迁移而来，issue #17） |
| `yml/`                       | 只有 `GameBase.yml`，变量表尚未建立                                                                                |
| `res/`                       | 只有 `.gitkeep`                                                                                                    |
| `sav/global.sav`             | 由引擎自动生成，已 gitignore；**删掉即可，引擎会重建**                                                             |
| git                          | `master` 为主干，已有提交历史                                                                                      |

引擎已验证可加载本仓库并输出 `Hello World!`——迁移到 `yml/`（issue #17）后**已实机复验通过**。两层证据：数据侧用引擎自带的 yaml 解析器与 `parseDataFile` 直接跑 `yml/GameBase.yml`，与迁移前 CSV 得到逐字段相同的 gamebase 对象（`gameCode` 两侧同为数值 `931060`）；启动全程由人工启动引擎确认。

**`sav/global.sav` 是引擎产物，不是仓库资产。** 它盖着游戏标识（当前 `931060`），与 `yml/GameBase.yml` 的【游戏标识】不一致时引擎会**拒绝启动并报错**，而不是静默重置（`dev-guides/11-saves.md:55`；第 56 行的「重置」只适用于版本号过低的情形）。改动【游戏标识】后必须删掉这个文件。

## 目录结构

```
D:\Code\era\
├── ere/                     # ← 游戏源码（我们写的），入口 ere/main.js
│   ├── main.js              #   导出 async 函数，引擎启动后调用它
│   ├── era-electron.js      #   引擎 SDK（4.8.0，取自引擎仓库，勿改名或移动）
│   └── jsconfig.json        #   路径别名 #/* → ere/*
├── yml/                     # ← 静态数据表，YAML 格式（ere.config.json 的 static 须指向此处，见下）
├── tools/                   # ← 离线转换脚本（纯 Node、零第三方依赖，不受 ere/ 的依赖限制）
├── test/                    # ← 测试，node --test；helpers/era-fixture.js 是全项目唯一的缝
├── res/                     # ← 图片/音频资源（当前 resource: false，未启用）
├── sav/                     # ← 存档（*.sav 已 gitignore，保留 .gitkeep）
├── ere.config.json          # 引擎配置（已 gitignore，属本地工作文件）
├── .worktreeinclude         # Orca 建 worktree 时要复制进去的 gitignored 文件（见「工单流程」）
├── ere-4.8.0-win-x64/       # 引擎运行时 4.8.0，含 ERA-Electron - 重量级ERA引擎.exe
├── dev-guides/              # 引擎官方手册，25 篇，简体中文 ← 权威参考
└── target/                  # ← 移植源：Emuera 版《ERA魔王》，只读，不要改
```

`target/` 是移植的**输入**，视为只读参考资料。移植产物一律写进 `ere/`、`yml/`、`res/`。

## 运行与调试

引擎是 GUI 程序，**没有命令行启动方式**（npm script 只有测试，见本节末尾）：

1. 启动 `ere-4.8.0-win-x64\ERA-Electron - 重量级ERA引擎.exe`
2. 菜单【游戏】→【打开游戏】，选择仓库根目录 `D:\Code\era`
3. 改完代码按 `Ctrl+R`（或【游戏】→【重载游戏】）热重载

引擎启动顺序：读配置 → 读 `yml/*.yml`（**`GameBase.yml` 必需**）→ 读 `res/` → 以 `ere/main.js` 为入口加载脚本 → 注入 SDK → 读 `sav/` → 执行 `main.js` 导出的函数。

配置优先级：`yml/_fixed.json` > `ere.config.json` > `yml/_config.json` > 引擎默认值（`_fixed.json` / `_config.json` 从静态数据目录读取，当前均不存在）。

### 静态数据目录：`yml/`（issue #17）

静态表是 **YAML 格式的 `yml/`**，由 ere 版 `csv/GameBase.csv` 一次性迁移而来（`csv/` 已随之清空移除，仓库不留两份真相）。两条引擎行为（#13 读 `background.js` 源码确认）决定了迁移形态：

- 静态目录**整个二选一**：引擎按 `yml > json > csv` 的优先级挑**一个**目录读取，不存在逐文件混读；
- `system.static` 只是**搜索起点**，且**只向低优先级方向回落**：从它所指的档位起沿 `yml → json → csv` 往后找第一个存在的目录，**不会往回找**。故起点写 `"csv"` 时后面已无档位可退。

**全新克隆无须任何配置**：`ere.config.json` 不进 git，缺失时引擎默认没有 `system.static` 键，搜索从 `yml` 起步，直接命中本仓库的 `yml/`。

**但本地已有旧 `ere.config.json` 且写着 `"static": "csv"` 时，引擎会硬失败**——`csv/` 已随迁移移除，起点之后无档位可退，引擎报「静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!」并放弃加载。改法二选一：把该键改成 `"yml"`，或**直接删掉 `ere.config.json`**（引擎启动时会按解析出的档位重新写回，值即 `"yml"`）。

`yml/` 的产物由 `tools/csv-to-yml.js` 生成（纯 Node、零依赖；解析逻辑逐行镜像引擎）。**产物进 git、归人工维护：转换器重跑默认不覆盖已存在的产物，重新生成必须显式 `node tools/csv-to-yml.js --force`**（issue #10 的产物边界规则，有测试钉死）。默认输入 `csv/GameBase.csv` 已随迁移删除——`GameBase.yml` 此后以人工修改为准，如需从头重转，先从 git 历史取回该文件。YAML 键名一律加引号：引擎自带的转换器裸写键名，键含 `:` / `#` 或首尾空格时会产出无法解析的 YAML（#10 实测）。

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

`.prettierignore` 排除了 `target/`、`ere-4.8.0-win-x64/`、`dev-guides/`、`sav/`、`yml/`（产物键名双引号是转换器约定，prettier 的 `singleQuote` 风格会把它改坏）。**别删它**：prettier 默认扫描全仓库，没有它 `npx prettier --write .` 会重写只读移植源 `target/` 里的 68MB 文件（且会在其中的 Shift-JIS 日文 HTML 上直接报错退出）。

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
- **`#/` 别名** 引用项目内模块，不要用相对路径 `../../`（别名只覆盖 `ere/`；`tools/`、`test/` 等目录之间用相对路径）。
- **导入分组排序**：`era` 置顶，其后按 `system` / `page` / `event` / `utils` / `data` / `i18n` 分组。
- **变量语义必须注释**。这是最关键的一条 —— `era.get('global:3')` 本身不可读：

  ```js
  // GLOBALNAME:3 = 语言
  set_lan(era.get('global:3') || era.set('global:3', 'zh-CN'));
  ```

- **提交信息** 用 Conventional Commits，scope 按子系统划分（如 `train` / `ero` / `event` / `chara` / `page` / `data` / `util`），参考 erauma 的 `CONTRIBUTING.md`。

## 工单流程（SOP）

工单在 GitHub Issues（`odradekk/maou_redux`），操作约定见 `docs/agents/issue-tracker.md`；当前的票序与阻塞关系见 issue #15。**一张工单 = 一个 Orca worktree = 一个 droid 会话**，全程用 `orca` CLI 驱动。

### 0. 环境前提（先读，否则后面每一步都会踩）

- Windows 上 CLI 就是 `orca`（Linux 下必须用 `orca-ide`，裸 `orca` 是 GNOME 屏幕阅读器）。动手前 `orca status --json` 确认 app 在跑；agent 驱动的调用一律带 `--json`。
- **本机 Orca 的 `commandSourcePolicy` 是 `local-only`，仓库里的 `orca.yaml` 钩子不会执行**（实测：带 `--run-hooks` 删 worktree，仓库脚本一行没跑）。所以仓库里**不放** `orca.yaml`；worktree 的 setup 钩子（`npm install`）配在 Orca 的 **Settings → Repository → Hooks**。
- 推论：**worktree 删除时没有任何自动归档**。worktree 里 gitignored 的本地产物（`sav/*.sav`、`ere.config.json`）删了就没了。所以凡是要留下的东西，删 worktree 前必须已经推走。
- `.worktreeinclude` 会把主 checkout 的 `ere.config.json` 复制进每个新 worktree（已实测生效）。**主 checkout 那份必须是 `"static": "yml"`**，否则每个新 worktree 一开就是坏的。

### 1. 选票与认领

前沿 = `open` + 没有未关闭的阻塞票 + 没有 assignee，按编号序取第一个。

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是本次会话的第一次写操作，先认领再动手，并发会话才不会撞车。

### 2. 并发上限：同时最多 5 个工单

无依赖关系的票可以同时开多个 worktree；**有阻塞边的票必须等阻塞方合并进 `master` 之后再建 worktree**，否则它的基线里没有前置代码。派新单之前先数一遍在跑的（不含主 checkout `master` 那个）：

```
orca worktree ps --json
```

### 3. 建 worktree 并派 droid

```
orca worktree create --name t<N>-<slug> --no-parent --agent droid --prompt "<简报>" --json
```

- 命名 `t<N>-<slug>`，`<N>` 对应工单标题里的 T 编号。
- `--no-parent`：工单彼此独立，不要串父子。**不传 `--base-branch`**，用仓库默认 base（`origin/master`）。
- `--agent droid`：droid 直接落在 worktree 的第一个终端。**不要「先裸建 worktree 再 `terminal create` 同一个 agent」**——那会多出一个没人用的空壳 shell。
- 在 `--repo` 省略时 Orca 从当前 worktree 推断仓库；跨仓库才需要 `orca repo list --json` 取 id。
- 记下返回里的 `worktree.id`（形如 `<repoId>::<绝对路径>`，**两段都要，只给 repoId 不是 worktree id**）与 `startupTerminal.handle`。

`--prompt` 的简报模板。**第一行必须是 `/implement` 加一个空格再接任务描述**——斜杠命令后没有空格不会被识别为技能调用；写成「请用 /implement 技能……」是在**请求**它调用，不如直接调用稳：

```
/implement issue #<N>：<标题>
工单正文与验收清单：gh issue view <N> --repo odradekk/maou_redux --comments
父票（本票在整体中的位置与测试策略）：gh issue view 15 --repo odradekk/maou_redux
相关决议，动手前请读：#<a>、#<b>

<三到五条它自己查会很贵、且容易查错的既有事实，直接给结论>

自检与提交：
- npm test、npx eslint .、npx prettier --check . 全绿
- 逐条对照验收清单
- 验收里写着「且此行为有测试」的每一条，做变异测试自证：把被测规则改坏，
  确认真的有用例失败（本项目在 #10 吃过亏——测试全绿但规则已失效）
- 按 Conventional Commits 提交，scope 用 <scope>
- 不要自行合并，也不要开 PR，完成后停下等验收
```

两条写法约定：

- **不必让它读 `AGENTS.md`**——agent 会自动加载本文件，写进简报只是浪费开头的注意力。
- **简报里要给结论，不要给线索。** 让它自己去 `target/`（315,953 行）或引擎源码里重查一件已经查实的事，既慢又容易得出与既有决议矛盾的结果。但**属于本票自己要解决的设计问题不要替它决定**，只要求它把判断依据写在 issue 上。

`/implement` 内部驱动 `tdd` 一次一个红绿切片，收尾跑 `code-review` 的两轴审查（Standards + Spec）再提交。绕过它就少了这层自检，交上来的东西得从头人工复核。

### 4. 监督

```
orca terminal read --terminal <handle> --json
orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 300000 --json
orca terminal send --terminal <handle> --text "<追加指示>" --enter --json
orca worktree set --worktree id:<repoId>::<路径> --comment "<一句话进展>" --workspace-status in-review --json
```

发消息前先 `read`；等 TUI 就绪必须带 `--timeout-ms`，否则输入可能丢在启动过程里。handle 报 `terminal_handle_stale` 就用 `orca terminal list` 重取，**不要新旧双发**。

### 5. 验收：不要照单全收 agent 的自述

在 worktree 目录里自己跑一遍，逐条对照 issue 的验收清单：

1. `npm test`、`npx eslint .`、`npx prettier --check .`（worktree 若没有 `node_modules`，`npx eslint` 会去拉 v9 并因找不到 `eslint.config.js` 报错——那是环境问题不是代码问题，先确认 setup 钩子跑过）
2. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。
3. 声称「与引擎行为一致」的，尽量用引擎自己的代码验证，而不是自己写的镜像（解包 `ere-4.8.0-win-x64/resources/app.asar` 可以直接调用引擎的解析器，#17 用过这招）。
4. 1:1 移植的改动，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。

### 6. 收尾

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file -
gh pr merge <pr> --repo odradekk/maou_redux --squash --delete-branch
git -C D:/Code/era pull --ff-only origin master
orca worktree rm --worktree "id:<repoId>::<路径>" --force --json
gh issue comment <n> --repo odradekk/maou_redux --body "<决议：交付物、验证方式、有意的取舍、给后续票的提醒>"
```

- PR 正文以 `Closes #<n>` 结尾，合并即自动关票。
- **删 worktree 前确认没有未推送的提交**——本机没有归档钩子，删了不可恢复。
- **需要启动引擎的手工验收，一律在合并之后、在主 checkout `D:\Code\era` 上做**：引擎【打开游戏】指向的是主 checkout，且 worktree 的存档不会保留。

### 7. 决议留痕

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**，不要在实现里悄悄绕过（#3 被 #6 推翻即是先例）。地图 issue #1 自此只读，不改写历史。

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
