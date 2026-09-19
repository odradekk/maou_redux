# ere-game（EraElectron 移植项目）

**工作语言：简体中文。** 对话、提交信息、代码注释、文档、Issue 一律中文；代码标识符用英文（见「代码约定」）。

## 项目目标

把 `target/` 里的 Emuera 游戏 《ERA魔王 年度版》（原作 eramaou，简体中文汉化版）移植到 EraElectron 4.8.0：eraBasic（`.ERB`/`.ERH` + Emuera CSV）重写为 JavaScript（`ere/*.js` + `yml/`）。

移植需要重新实现游戏逻辑。Emuera 解释执行专用脚本，EraElectron 运行 Node/Electron 上的 JavaScript 模块；移植时必须按两种运行模型的差异处理控制流和状态。

## 当前状态

**当前进度以路线图 issue #101 为准**，每个阶段结束后更新。以下记录已完成的基础功能。

已验证三条端到端流程：#15 标题画面到主菜单、#42 一回合调教、#112 侵略流程到 `ENDING_1`。十二项移植决策均已有运行时验证。阶段 2 完成后，存档系统可用，45 张角色表已纳入仓库。**从新游戏到结局的流程由 `test/event-ending-e2e.test.js` 持续验证**，该测试包含在 `npm test` 中。

尚未实现的子系统入口和指令以存根形式保留，具体状态见 `docs/stub-registry.md`。

开始开发前阅读以下文档：

- `docs/skeleton.md`：模块分层、注册机制、变量访问、测试和追溯注释的约定，以及早期端到端验证的结论。
- `docs/output-diff.md`：输出比对工具、样本范围和判定标准（issue #48）。使用 `node tools/compare/cli.js --sample <名>` 运行，样本名见 `tools/compare/samples.js`。具体覆盖范围见文档开头。
- `CONTEXT.md`：日文原作、简体汉化和引擎 API 的术语对照。命名使用「本项目用词」一列；文档中的「写作约定」说明中文表达要求。
- `docs/stub-registry.md`：尚未实现的功能清单。认领工单时确认对应条目，实现后更新状态或移除已完成条目。

**移植决策索引为 issue #1**，详细依据保存在对应工单中。索引保持只读；需要修正既有决策时，在原工单补充说明并引用新证据，保留历史记录。#3 被 #6 修正、#13 经端到端验证补充，均采用这种方式。

**`sav/global.sav` 由引擎生成，不纳入版本控制。** 其中保存的游戏标识（当前为 `931060`）必须与 `yml/GameBase.yml` 的【游戏标识】一致，否则引擎拒绝启动并报错。`dev-guides/11-saves.md:55` 说明了此行为；公共存档自动重置仅适用于版本号过低的情况。修改【游戏标识】后，需要删除旧的 `global.sav`，由引擎重新生成。

## 目录结构

```
<仓库根>/（当前 Windows 主工作目录为 D:/Code/era）
├── ere/              # 游戏源码，入口 main.js；era-electron.js 是引擎 SDK，勿改名或移动
├── yml/              # 静态数据表（YAML），即引擎的静态数据目录
├── products/         # 口上转译初稿，待复核后移入 ere/（#107）
├── golden/           # 范围 B 的基准日志与录制资料（#156；登记表见 tools/compare/samples.js）
├── tools/            # 离线脚本，不受 ere/ 的依赖限制
├── test/             # node --test；helpers/era-fixture.js 是全项目唯一的注入点（issue #16）
├── res/              # 图片/音频（#69 起启用，resource: true；六图 + 三首 BGM）
├── sav/              # 存档，*.sav 已 gitignore
├── dev-guides/       # 引擎手册的本地副本，已按引擎行为修正
└── target/           # 移植源：Emuera 版《ERA魔王》，只读输入
```

引擎运行时不进 git。Windows 发布包放在仓库内的 `ere-4.8.0-win-x64/`；Linux 运行时沿用 `~/.era-engine/`。测试共用的引擎包放在用户目录：

```
~/.era-engine/
├── app.asar          # 引擎本体，与平台无关；测试的引擎比对直接解析它
└── runtime/          # 仅 Linux：Electron 34（npm install electron@^34.5.8）
```

完成的移植代码和资源分别写入 `ere/`、`yml/`、`res/`。

**`products/` 专门保存尚未复核的口上转译初稿**。`tools/kojo-transpiler.js` 的输出在这里纳入版本控制，复核结果直接记录在文件中（#107 的 Q3 决策）。生成器默认不覆盖已有文件，只有显式指定 `--force` 才重写（#10）。复核完成后，将文件改名并移入 `ere/kojo/`，此后接受简体文本检查和原文一致性检查。初稿首行的 `eslint-disable` 是有意保留的：初稿尚未补全导入，会产生大量 `no-undef` 报错。

## 运行与调试

**当前开发环境为 Windows / PowerShell，Node 至少 24.13.1。** 24.13.0 在 Windows 清理中文临时目录时会原生崩溃；版本依据、依赖安装、引擎配置、worktree 与 PowerShell 命令见 [Windows 开发指南](docs/windows-development.md)。新机器、引擎启动失败或跨平台验证失败时先读该指南。

```
npm start
```

1. 运行 `npm start` 启动引擎。
2. 在【游戏】→【打开游戏】中选择仓库根目录。路径由引擎维护；手工编辑全局配置会在引擎退出时被覆盖。
3. 显示「加载成功」后按任意键进入标题；修改代码后按 `Ctrl+R` 重新加载。

`npm start` 与 Electron MCP 共用启动配置：Windows 启动发布包的 `.exe`，Linux 启动 `~/.era-engine/runtime/` 下的 Electron 与 `~/.era-engine/app.asar`。Electron 版本取自上游 4.8.0 的 `devDependencies`（`electron ^34.5.8`），换引擎版本时一并核对。

启动顺序：读配置 → 读 `yml/*.yml`（**`GameBase.yml` 必需**）→ 读 `res/` → 以 `ere/main.js` 为入口加载脚本 → 注入 SDK → 读 `sav/` → 执行 `main.js` 导出的函数。

项目提供以下三项检查，按下表选择测试范围：

```
npm test                 # node --test，零第三方依赖
npm run lint             # ESLint，零警告标准
npm run format:check     # Prettier，只检查格式
```

**全库 `npm test` 本机带引擎约 4 分钟**（#452 实测 217 秒，199 个文件、5923 例），按下表选择测试范围：

| 何时              | 跑什么                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| 每次完成一项改动  | 对应测试文件 ＋ `mutation-check --ids <本轮新加的编号>`                                                |
| 开 PR 前          | `npm test` ＋ `npm run lint` ＋ `npm run format:check`                                                 |
| PR 与 master push | CI 全库测试（Linux、Windows 均带引擎）＋ 九份输出比对样本；master 另跑无引擎全库与锚点质量全文量       |
| 阶段结束          | 给阶段收尾 PR 打 `phase-acceptance` 标签，在 CI 跑全量变异测试；引擎实际运行在本机用 Electron MCP 验收 |

曾有按改动文件选择测试的选择器（#256），实测最多省一半时间，#452 撤掉：本地和 CI 只有 `npm test` 一个入口，PR 的 CI 通过即全库通过。

**测试入口统一限制为 4 个测试文件并发**，包括 npm 测试与变异子进程。它限制进程并发数，不等于 CPU 配额；同时跑多个 agent 或变异副本时仍要控制任务数。Linux 可额外用 `bash tools/capped.sh npm test` 施加 systemd CPU 配额；Windows 直接用 npm 命令。

**测试命令必须有超时**。`npm test`、`lint`、`format:check` 这类交互式命令由 `tools/run-node.mjs` 给出默认 600 秒上限；单文件测试与长任务按需显式给更大的 `--timeout`，不依赖默认值。**`npm run test:ci` 是例外，脚本里显式声明 1200 秒**——它跑全库测试，本机带引擎实测 326 秒（`node --test --test-concurrency=4`，5916 例全过），但 `ci.yml` 的 `windows` 任务在 CI runner 上首次运行就撞上默认的 600 秒被杀（#443：`35329826228`，09:30:15 起跑、09:40:16 被 `taskkill` 终止，未跑完），1200 秒留出约 3.7 倍于本机实测的余量。这与 `ci.yml` 各 job 的 `timeout-minutes: 30`（1800 秒）是两层不同的上限：后者是 job 级兜底，覆盖检出、装依赖、跳过数守护等全部步骤；前者是 `test:ci` 这条命令自己的上限，必须留在 job 级上限之内。Windows 的 `timeout.exe` 只是等待命令，不能替代 GNU `timeout`。PowerShell 示例：

```
New-Item -ItemType Directory -Force logs/migration | Out-Null
node tools/run-node.mjs --timeout 5400 -- tools/mutation-check.mjs --jobs 2 *> logs/migration/mutation-full.log
```

超时返回 124；Windows 用 `taskkill /T /F` 终止本次命令的子进程树，POSIX 先中断、5 秒后强制终止。**Windows 长变异任务使用 `--jobs 2` 或更高的隔离副本模式**，强制终止无法保证在原目录修改文件的变异脚本执行 `finally`；短的串行 `--ids` 任务若被强制终止，要检查被修改文件的 diff。

**等待长任务时，使用任务本身提供的等待接口，并取得最终退出码。** 不要另写基于进程名的轮询：`pgrep -f` 可能匹配轮询命令自身，导致循环无法结束。

**日志保存到仓库内的 `logs/<工单号>/<用途>.log`**，该目录已被 Git 忽略。每个 worktree 使用自己的日志目录，避免多个 agent 覆盖同名文件；需要保留的验收记录，应在删除 worktree 前写入工单评论。系统临时目录可能被清理，不适合保存长期验收记录。

格式工具的使用要求：

- 格式选项在 `.prettierrc` 与 `.eslintrc.js` 的 `prettier/prettier` 规则里**各写了一份且取值相同**。改格式约定必须同时改这两处，否则两条命令会给出互相矛盾的结果。
- `.prettierignore` 是必需品：prettier 默认扫描全仓库，没有它 `--write` 会重写只读的 `target/`（68MB，且在其中的 Shift-JIS 日文 HTML 上直接报错退出），也会把 `yml/` 产物的双引号键名改成单引号。
- **先运行 `npm ci`，再使用仓库安装的 ESLint 和 Prettier。** 缺少本地依赖时，`npx` 可能下载其他版本：ESLint v9 不兼容当前配置格式；不同 Prettier 版本可能对 Markdown 表格对齐和循环尾部空格给出不同结果。工具版本以 `package-lock.json` 为准，不以 `package.json` 中的 `^` 范围为准。必须通过 `npx` 使用工具时，显式指定锁文件中的版本。

### CI

`.github/workflows/ci.yml` 根据触发方式运行以下检查（#92 引入 CI，#302 增加引擎检查，#452 改为 PR 也跑全库）：

| 触发             | job          | 内容                                                                                   |
| ---------------- | ------------ | -------------------------------------------------------------------------------------- |
| PR / master push | `engine`     | Linux 全库 `npm run test:ci`，带引擎，跳过数必须为 0；九份输出比对样本不得有未解释差异 |
| PR / master push | `windows`    | 原生 Windows 全库 `npm run test:ci`，带引擎，跳过数必须为 0                            |
| PR / master push | `static`     | ESLint、Prettier、默认范围的锚点质量检查                                               |
| master push      | `engineless` | Linux 全库 `npm run test:ci`，无引擎，跳过数与基线比较；锚点质量全文量                 |

PR 与 master push 跑同一套全库测试，PR 绿即全库绿。无引擎任务只在 master push 跑，用于发现引擎缺失时的退化。锚点质量检查用于确认追溯引用能否准确定位原作 ERB 中的片段，避免用重复出现的 `ENDIF` 等内容判断位置；具体规则见 `tools/trace-check.mjs`。

**全量变异测试只对阶段收尾 PR 跑。** `.github/workflows/mutation.yml` 在 PR 被打上 `phase-acceptance` 标签时触发，之后每次推送重跑，去掉标签即停。5301 条条目按 `--slice i 8` 分成 8 个并行分片各自串行运行（首跑实测每条 0.9–1.6 秒，每片 20 分钟内），汇总任务把「拦截 / 跳过 / 红」合计写进 job summary；合格线是每片退出码 0（拦截全部、跳过 0、红 0）。本机全量仍可用 `--jobs 2` 跑，约 80 分钟。

**CI 从 Release 下载引擎。** `.github/actions/setup-engine` 下载 `engine-4.8.0` 的 `app.asar`，校验 SHA256 后放到 `~/.era-engine/app.asar`，测试按默认路径查找。引擎文件约 42 MB，不提交到 Git，也不依赖缓存是否存在。**升级引擎时，创建新的 Release tag，并更新 action 中的 SHA256 校验值。**

跳过数分别与两份基线比较：无引擎时使用 `test/engine-skip-baseline.txt`，新增依赖引擎的用例必须同步更新该文件；有引擎时使用 `test/engine-present-skip-baseline.txt`，预期为 0。引擎已安装却仍有测试跳过时，应检查跳过条件和 `locate_asar` 的查找结果。

**concurrency 会取消 PR 的旧运行，不取消正在执行的 master push 任务。** 但同组等待中的运行仍可能被后续运行替代。因此，连续合并多个 PR 后，中间提交不一定各有一次完整结果；最终提交的测试失败时，应检查自上次通过以来的全部合并。

### 静态数据目录

引擎按 `yml > json > csv` 挑**一个**目录读全部静态表，不逐文件混读；`system.static` 只是**搜索起点**，且只向低优先级方向回落，不会往回找。

- **全新克隆免配置**：`ere.config.json` 不进 git，缺失时引擎默认无 `system.static` 键，从 `yml` 起步，直接命中 `yml/`。
- **本地旧配置写着 `"static": "csv"` 会直接失败**：`csv/` 已随 issue #17 迁移移除，起点之后没有更低优先级的目录可退，引擎报「静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!」。把该键改成 `"yml"`，或删掉 `ere.config.json` 让引擎重新写回。

配置优先级：`yml/_fixed.json` > `ere.config.json` > `yml/_config.json` > 引擎默认值。

**默认配置不会逐键补齐用户配置。** 引擎会整体选择 `ere.config.json`、`yml/_config.json` 或内置默认值，再应用 `_fixed.json` 的固定设置（#69）：

```js
try { this.defaultConfig = JSON.parse(…readFileSync(join(staticPath,"./_config.json"))) }
catch(e) { this.defaultConfig = getEmptyConfigForm() }
if (this.config || (this.config = JSON.parse(JSON.stringify(this.defaultConfig))), …)
```

- **`yml/_config.json` 必须提供完整的默认配置。** 文件存在且可解析时，`defaultConfig` 整体取自该文件，**缺少的键不会从引擎默认值补齐**。各使用位置对缺值的处理不同：`saveFiles` 使用 `||10`，`window.*` 交给渲染层，`resource` 按假值关闭。文件必须包含 `getEmptyConfigForm()` 的全部字段；`test/resource-media.test.js` 逐键与引擎默认配置比较，目前只允许 `resource` 的值不同。
- **已有 `ere.config.json` 时，修改默认配置不会自动生效。** 代码中的 `||` 会直接使用已加载的 `this.config`，不读取 `_config.json` 的值。需要在本机应用新默认值时，修改 `ere.config.json` 中的对应键，或删除该文件后让引擎按新默认配置重建。
- **哪个键放哪个文件**：结构性要求（如 `extendedCharaTables`，缺了会直接崩溃或静默降级）放 `_fixed.json`，它优先于用户配置；用户偏好（如 `resource`，引擎配置 UI 里有对应开关）放 `_config.json`，放进 `_fixed.json` 会让 UI 开关点了没反应。
  - **`saveFiles` 固定为 99，写在 `_fixed.json` 中（#135）。** 原作有 99 个手动存档槽（0–98）和 99 号自动存档槽（ADR-0006）。引擎 `listSaveFiles` 的扫描条件为 `for (let t = 0; t <= saveFiles; ++t)`，因此 99 能覆盖 0–99；`dev-guides/03-config.md:76` 规定取值为 10–99 的整数，不能设为 100。若只写在 `_config.json` 中，旧的本地配置仍可能使用 10，导致 `loadGlobal` 不维护槽位 11–98 的备注，界面显示为空；仅使用默认配置的测试无法发现这一问题。固定该值后，配置界面的「存档数量」设置不再生效，这是 #135 接受的限制。
  - erauma、ere-kanon、ere-example 所需槽位数未超过引擎默认范围，因此未设置 `saveFiles`。erauma 还会通过 `era.get('gameconfig')?.system.saveFiles` 读取生效配置，但 **4.8.0 不提供 `gameconfig` 键**，本项目不能使用这一方法。

`yml/` 文件由 `tools/csv-to-yml.js` 生成后提交到 Git，再由人工维护（issue #10）。**转换器默认跳过已有文件，覆盖必须显式指定 `--force`**；测试会检查这一行为。生成时根据 `tools/lang-table.js`（issue #60）将名称转为简体，引擎列名键如 素質/名前 保持原样。同步检查直接比较生成结果与仓库文件；漏做简体转换会导致检查失败。YAML 键名一律加引号，避免含 `:`、`#` 或首尾空格的键产生解析问题。`GameBase.yml` 的原始输入已随迁移删除，重新转换前须从 Git 历史取回 `csv/GameBase.csv`。

## 引擎 API 与硬约束

- 一切能力来自 `require('#/era-electron')`，权威清单 `dev-guides/A-api-docs.md`。分组：输出（`print` / `printAndWait` / `printMultiColumns` / `printInColRows` / `printButton` / `printImage`）、输入（`input` / `waitAnyKey`）、变量（`get` / `set` / `add`）、存档（`saveData` / `loadData` / `saveGlobal`）、角色（`getAllCharacters` / `addCharacter` / `beginTrain` / `endTrain`）、媒体（`playMusic`）、日志（`logger.*`）。
- **手册与实测行为冲突时，以引擎代码为准。** `dev-guides/` 是本项目根据 `app.asar` 修正过的手册副本。发现差异后直接修正文段，不另建勘误表；上游原文可从 Git 历史查看（#163）。`.agents/skills/emuera-basic-agent-guide/` 仍需与外部上游同步，必须保持逐字不变。新确认的引擎行为按 `tools/engine-contract-facts.mjs` 文件头的说明增加检查：能直接执行的行为加入 engine-bundle 测试；只能通过源码片段定位的行为加入 `anchors` 表。
- **游戏运行时仅可使用 `era` API 与 `crypto`。** 引擎禁止导入其他 Node 内置模块和第三方库（`dev-guides/18-tools.md`）；`tools/` 中的离线脚本不受此限制。
- 异步 API 必须 `await`：`printAndWait`、`input`、`clear`、`waitAnyKey`、`delay`、存档系列。漏 `await` 造成的时序错乱极难排查。
- 变量以字符串寻址：`era.get('base:0:0')`、``era.get(`staticcflag:${cid}:1`)``，也支持列名 ``era.get(`static:${cid}:name`)``。**读取未声明的序号返回 `undefined`，不是 0**（issue #13）；在名字表和数据容器存在时，写入未声明的下标不会报错，且会进入存档。因此必须检查下标是否正确，包装层的 getter 按项目约定使用 `|| 0` 处理缺值。
- 文件编码用 UTF-8 或 UTF-8 BOM。`target/` 中的 `ERB/調教相關/COMF90_ニプルファック.ERB` 使用 Shift-JIS，仍参与游戏运行；批量读取脚本必须根据内容识别编码。
- **写变量前，先确认它所属的静态表已存在于 `yml/`。** `setVar` 的行为由名字表和 `data` 容器是否存在共同决定，与地址是两段还是三段无关（PR #57）：两者都存在时写入成功，未声明下标按数字处理；只有名字表时静默丢弃写入；**只有数据容器时直接崩溃**。已出现过的问题包括 `item*`（PR #34）和 `stain`、`ex`、`cstr`、`tequip`、`tflag`（PR #57）。`test/static-table-coverage.test.js` 会提取源码中的变量类别并检查对应表，但只能识别 `era.get/set/add` 的字面量前缀；动态拼接的地址仍需人工检查。
- **首次使用输出 API 前，检查引擎渲染层对参数的处理。** 手册未必描述最终显示效果，测试夹具也不完整模拟渲染。例如，`printButton` 的 `showAcc` 默认为真，引擎会添加 `[快捷键] `，并将正文中的连续空白合并为一个空格。**按钮正文不得自行添加 `[编号]` 前缀**，否则会显示为 `[0] [0] 旧的奴隶`（PR #30）。
  在 `~/.era-engine/app.asar` 中按 API 名或配置项名搜索，可找到 bundle 附带的未压缩源码。确认渲染规则后，将需要验证的结果补充到 `test/helpers/era-fixture.js` 的记录字段，并增加断言。
- **验收时必须确认引擎实际执行了调用。** 夹具只能记录 API 调用，无法证明引擎接受了参数；例如，`addCharacter` 遇到不存在的预设角色会直接返回 false（#21/#22）。`test/helpers/engine-bundle.js` 直接加载 app.asar 中的解析器、装载循环和 `EraApi` 方法，只为调用方法提供最小的模拟 `this`，避免在测试中重新实现引擎逻辑。`ASAR_CANDIDATES` 按环境变量 `ERE_ENGINE_ASAR` → 仓库内路径 → `~/.era-engine/` 的顺序查找文件；找不到时跳过相关测试并输出警告。

  **查找列表目前分别维护在三个文件中**：`test/helpers/engine-bundle.js`、`tools/mutation-check.mjs`、`tools/engine-contract-check.mjs`。`test/asar-candidates.test.js` 检查三处是否一致。`~/.era-engine/` 路径供 worktree 和并行变异测试副本共用：仓库内的 `ere-4.8.0-win-x64/` 不受 Git 跟踪，不会被复制到这些目录，缺少用户目录查找路径会导致引擎测试被跳过（#113）。
  - **通常不必设置 `ERE_ENGINE_ASAR`。** 在新机器上，将 Release 中的文件放到 `~/.era-engine/app.asar`，并按 `.github/actions/setup-engine/action.yml` 校验哈希即可。
  - **检查无引擎基线时，必须设置 `ERE_ENGINE_ASAR=none`。** 三处均将这个值解释为禁用引擎查找；仅删除环境变量仍会找到用户目录中的引擎，不能模拟无引擎环境。

## 代码约定

格式由 `.eslintrc.js` 与 `.prettierrc` 约束，无须记忆。以下是格式之外、参照 erauma 的工程约定：

- **文件名** kebab-case 带类别前缀：`sys-calc-*.js`（系统计算）、`page-*.js`（界面）、`*-factory.js`（工厂）、`calc-*.js` / `*-utils.js`（工具）。

- **文件名一律使用 ASCII，描述部分翻译为英文单词。** 例如，`EVENT_K3_高貴.ERB` 对应 `kojo-k3-noble.js`，`据点2.mp3` 对应 `stronghold-2.mp3`，不用日文罗马字或中文拼音代替翻译。人名无对应英文词时使用拉丁转写（マオ → `mao`、菲娅 → `fia`）。口上 22 个源文件的映射表位于 `tools/kojo-transpiler.js`；未登记的源文件名必须报错。
  - **资源的注册名不跟着改**：`res/*.csv` 是「注册名,文件名」两列，注册名照抄原作 `PLAYBGM` / `printImage` 的实参（1:1 追溯），只有磁盘文件名改 ASCII。所以 `era.playMusic('据点2.mp3')` 的调用点一行不动。
- **标识符** snake_case（`get_display_name`、`birth_list`）；引擎 API 自身是 camelCase（`era.printMultiColumns`）。
- **模块引用** `ere/` 内一律用 `#/` 别名，引擎原生解析、无需构建步骤；别名不覆盖 `tools/`、`test/`，那些目录之间用相对路径。
- **导入分组排序**：`era` 置顶，其后 `system` / `page` / `event` / `chara` / `kojo` / `facade` / `utils` / `data` / `i18n`（`chara` = 角色域代码，如 `#/chara/chara-ex`，T6 引入；`kojo` = 口上模块，独立顶层目录，#46 起存在；`facade` = 按域门面，#71 起存在）。
- **必须注释变量的含义。** 仅凭 `era.get('global:3')` 无法判断该下标代表什么：

  ```js
  // GLOBALNAME:3 = 语言
  set_lan(era.get('global:3') || era.set('global:3', 'zh-CN'));
  ```

- **用文件头注释记录与原作的对应关系**（issue #11），无需复制原作目录结构。例如：`// 源: target/ERB/SYSTEM/TITLE ver1.0.8.ERB  @SYSTEM_TITLE`。
- **保留原作输出中的字面量 `$`。** `PRINTFORML 所持金：${MONEY}点` 在 Emuera 中表示字面量 `$` 加上 `{MONEY}` 的值，输出为 `所持金：$800点`。JavaScript 模板串应写成 `` `所持金：$${era_flag.money}点` ``；只写一个 `$` 会将它用于插值语法，输出中便缺少货币符号。ESLint 无法发现这类语义差异，测试必须断言实际输出（#338 通过逐字比对发现，M7700 验证对应测试能检测该错误）。`target/ERB/EVENT/EVENT_NEXTDAY.ERB:358` 的「生活费花了`${A}`点」也有同样的移植要求。
- **玩家可见文本一律使用简体**（issue #60）。原作混用简体、繁体和日文，移植时按 `tools/lang-table.js` 统一转换；字符映射、词语译法和整串豁免分别维护。使用 `node tools/lang-normalize.js [--write] <js 文件…>` 离线转换，运行时不转换。以下检查共同验证结果：
  - `test/output-lang-lock.test.js` 扫描 `ere/` 字符串字面量和 `yml/` 文本，检查归一表中的非简体字，以及 `tools/lang-simp-ref.js` 中的繁体字；后者由 OpenCC 字表派生，补充归一表未收录的字符（#188）。引擎列名按清单豁免。未收录的日文新字体仍需通过归一表和转译期 `REVIEW` 处理；假名按字符区间检查。
  - `test/kojo-text-fidelity.test.js` 的 D 类检查将 JS 字面量片段与转为简体后的 ERB 文本双向比对，范围和规则见测试文件头。
  - 新增字符映射或词条前，必须在原作语料中找到实际用例。
- **提交信息** 用 Conventional Commits，scope 按子系统划分（`train` / `ero` / `event` / `chara` / `page` / `data` / `util`）。

## 移植源：`target/`

Emuera 1.821.8 简体中文版运行的《ERA魔王 年度版（名字暂定）》，作者「人人为我，我为人人」，版本 93106。视为**只读输入**。

规模（实测）：346 个 `.ERB`/`.ERH`，315,953 行；58 个 CSV；68.5 MB。按目录的行数分布决定优先级与工作量：

| 目录                                                |     行数 | 内容                         |
| --------------------------------------------------- | -------: | ---------------------------- |
| `ERB/口上/`                                         |  149,037 | 角色台词文本，占全部代码 47% |
| `ERB/調教相關/`                                     |   47,075 | 调教系统                     |
| `ERB/迷宮/`                                         |   21,274 | 迷宫                         |
| `ERB/キャラ関数/`                                   |   20,968 | 角色函数                     |
| `ERB/EVENT/`                                        |   14,911 | 事件与日程                   |
| `ERB/SHOP/`                                         |   10,275 | 商店与主菜单                 |
| `ERB/ABL/`                                          |    8,829 | 能力                         |
| `ERB/其他/`                                         |    8,700 | 杂项                         |
| `ERB/侵略/`、`售卻相關/`、`SYSTEM/`、`怪物相關/` 等 | 各 3k–7k | 其余子系统                   |

关键入口：`ERB/SYSTEM/TITLE ver1.0.8.ERB`（`@SYSTEM_TITLE`，标题画面；根目录的 `ERB/TITLE.ERB` 定义了同名函数，但被引擎忽略，确认过程见 issue #12）→ `ERB/SYSTEM/SYSTEM ver1.0.3.ERB`（`@EVENTFIRST`，全局初始化）→ `ERB/SHOP/DRAW_MAINMENU.ERB`（主菜单）→ `ERB/EVENT/EVENT_NEXTDAY.ERB`（日循环）、`ERB/調教相關/TRAIN_MAIN.ERB`（`@EVENTTRAIN`）。

`target/資料_非必要無須解壓/` 是日文原作文档（readme、补丁历史、flag 说明），可作设计意图的原始依据。

**口上包含文本、条件分支和状态变化，必须按状态机移植。** 实测输出语句占 31.4%，控制流占 33.1%，注释占 24.8%；25,091 个连续文本段的长度中位数为 1 行，90% 不超过 3 行。引擎的 `.kojo` 格式无法表达所需的嵌套分支、状态变化、数值修改和限时输入，因此**口上一律用 JS 实现**（issue #8）。

移植方式：离线转译器产出初稿（约 98% 的行可机械转换），再人工逐段复核。转译器必须保留注释，那 29,724 行说明文字是理解语义的主要依据。

## 参考资料

**引擎手册** `dev-guides/`，25 篇简体中文，文件名即主题。三篇从文件名看不出内容的：`A-api-docs.md` 是 API 权威清单，`18-tools.md` 讲开发套件与依赖限制，`E-erauma-train.md` 讲 EraUma 的调教系统设计思路。

**开源参考项目**（gitgud.io）：

| 项目                                                                         | 用途                                                                                     |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`umaera/game/ere-example`](https://gitgud.io/umaera/game/ere-example)       | 官方例程，含存读档、商店、口上、调教基本框架，传统变量风格                               |
| [`umaera/game/ere-kanon`](https://gitgud.io/umaera/game/ere-kanon)           | erakanon 的 ere 移植版，开发套件 OOP 风格。与本项目同属「移植旧 era 游戏」，参考价值最高 |
| [`umaera/erauma`](https://gitgud.io/umaera/erauma)                           | 体量最大的成熟 ere 游戏，参考其工程结构、命名与提交规范                                  |
| [`umaera/engine/era-electron`](https://gitgud.io/umaera/engine/era-electron) | 引擎本体，SDK 从这里取                                                                   |
| [`umaera/game/kojo-test`](https://gitgud.io/umaera/game/kojo-test)           | `.kojo` 文件有效性测试                                                                   |

erauma 的 `ere/` 分层可直接借鉴：`data/`（静态数据）、`event/`（事件）、`page/`（界面）、`system/`（系统逻辑，按域再分子目录）、`utils/`（工具）、`i18n/`（多语言）。但**代码层面以 `ere-example` 与 `ere-kanon` 为范例**：官方明确提醒 EraUma 代码缺注释、缺类型检查（`dev-guides/E-erauma-train.md`），它只值得参考设计思路与工程组织。

## 技能与流程文档

### ERA Basic（ERB）语法与 API

读取 `target/` 中的 ERB 前，查阅 `emuera-basic-agent-guide` 技能，按文档确认语法与 API。正文位于 `.agents/skills/emuera-basic-agent-guide/`，**属于持续同步的外部材料，必须保持逐字不变**。ante 按 `.claude` → `.agents` → `.ante` 的顺序发现项目技能，同名技能以后者为准；Claude Code 使用 `.claude/skills/` 下的转发文件，采用转发文件的原因见其注释。

### 工单流程

流程文档分两份：主 agent 分配任务、验收与合并按 `docs/agents/dispatch-sop.md`（Paseo 用法、并发上限、profile 选用、提示词开场模板、验收清单与阶段验收）；执行工单的 worker 按 `docs/agents/worker-sop.md`（先写测试、经 Paseo 起 reviewer 做审查、自己开 PR 等 CI、在 issue 下写完成评论）。

### Issue 跟踪

工单在 `odradekk/maou_redux` 的 GitHub Issues 上，用 `gh` CLI 操作，每条命令都要显式带 `--repo odradekk/maou_redux`。见 `docs/agents/issue-tracker.md`。

### 分类标签

五个标准分类标签，标签字符串与名称相同。见 `docs/agents/triage-labels.md`。

### 领域文档

术语统一维护在根目录的 `CONTEXT.md`，架构决策记录在 `docs/adr/`。维护规则见 `docs/agents/domain.md`。
