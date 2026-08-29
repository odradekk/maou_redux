# ere-game（EraElectron 移植项目）

**工作语言：简体中文。** 对话、提交信息、代码注释、文档、Issue 一律中文；代码标识符用英文（见「代码约定」）。

## 项目目标

把 `target/` 里的 Emuera 游戏 《ERA魔王 年度版》（原作 eramaou，简体中文汉化版）移植到 EraElectron 4.8.0：eraBasic（`.ERB`/`.ERH` + Emuera CSV）重写为 JavaScript（`ere/*.js` + `yml/`）。

**不是翻译，是重新实现。** Emuera 是解释执行的领域语言，EraElectron 是 Node/Electron 上的普通 JS 模块，两边的运行模型没有对应关系。

## 当前状态

**进度看路线图 issue #101**，它每阶段更新；本节只记不随阶段变的东西。

三条贯通路径已跑通：#15 标题画面到主菜单、#42 调教一回合、#112 侵略线到 `ENDING_1`。十二个移植决议全部拿到运行时证据。阶段 2 收口后存档系统可用、45 张角色表全量在库。**游戏已能从新档走到一个结局，且这条路是每次 `npm test` 都跑的回归测试**（`test/event-ending-e2e.test.js`）。

其余子系统的入口与绝大部分指令仍是带记录的存根，清单见 `docs/stub-registry.md`。

动手前读这四份：

- `docs/skeleton.md`：贯通验证证明了什么。分层、模块注册、变量读写、测试写法、追溯注释的做法，十二个决议的逐条结论，以及三类只有在引擎里实际运行才会暴露的缺陷。
- `docs/output-diff.md`：与黄金样本逐字比对的工具与判定标准（issue #48）。`node tools/compare/cli.js --sample <名>` 重跑，样本名见 `tools/compare/samples.js`；覆盖面是调教一段加界面骨架三段（范围 B，#156/#161），边界写在文件头。
- `CONTEXT.md`：术语对照。日文原作、简体汉化、引擎 API 三套词汇，命名时用「本项目用词」一列。文末的「写作约定」列出本项目不再使用的一批词。
- `docs/stub-registry.md`：待办清单。后续票据此认领工作：找到一行，把壳换成实现，然后从清单里划掉。

**移植决议的索引是地图 issue #1**，细节在各自的 ticket 里。地图只读：决议被推翻时回对应 ticket 补勘误，不改写历史（#3 被 #6 推翻、#13 被贯通验证细化，都是这么记录的）。

**`sav/global.sav` 是引擎产物，不是仓库资产。** 它盖着游戏标识（当前 `931060`），与 `yml/GameBase.yml` 的【游戏标识】不一致时引擎**拒绝启动并报错**，而非静默重置（`dev-guides/11-saves.md:55`；下一行的「重置」只适用于版本号过低）。改动【游戏标识】后删掉它，引擎会重建。

## 目录结构

```
D:\Code\era\
├── ere/              # 游戏源码，入口 main.js；era-electron.js 是引擎 SDK，勿改名或移动
├── yml/              # 静态数据表（YAML），即引擎的静态数据目录
├── products/         # 转译中转区：口上转译产物的待复核初稿（#107），复核后移入 ere/
├── golden/           # 范围 B 黄金样本落点与录制备料（#156；样本名→文件登记表在 tools/compare/samples.js）
├── tools/            # 离线脚本，不受 ere/ 的依赖限制
├── test/             # node --test；helpers/era-fixture.js 是全项目唯一的注入点（issue #16）
├── res/              # 图片/音频（#69 起启用，resource: true；六图 + 三首 BGM）
├── sav/              # 存档，*.sav 已 gitignore
├── dev-guides/       # 引擎官方手册，简体中文，权威参考
├── ere-4.8.0-win-x64/ # 引擎运行时，含 ERA-Electron - 重量级ERA引擎.exe
└── target/           # 移植源：Emuera 版《ERA魔王》，只读输入
```

移植产物一律写进 `ere/`、`yml/`、`res/`。

**`products/` 是例外，也是唯一的例外**：口上转译器（`tools/kojo-transpiler.js`，#107）的输出**不是最终产物**，是待 agent 逐字复核的初稿。它进版本库的理由只有一条——复核成果就地写在产物文件里（#107 的 Q3 裁定），产物不在库就没地方积累。产物边界照 #10「默认不覆盖 + `--force`」，复核完成后改名移入 `ere/kojo/`，此时才受简体锁与保真锁约束。初稿首行的 `eslint-disable` 是有意的：产物尚未补导入，`no-undef` 单文件近两万处。

## 运行与调试

引擎是 GUI 程序，没有命令行启动方式：

1. 启动 `ere-4.8.0-win-x64\ERA-Electron - 重量级ERA引擎.exe`
2. 【游戏】→【打开游戏】，选仓库根目录
3. 改完代码 `Ctrl+R` 热重载

启动顺序：读配置 → 读 `yml/*.yml`（**`GameBase.yml` 必需**）→ 读 `res/` → 以 `ere/main.js` 为入口加载脚本 → 注入 SDK → 读 `sav/` → 执行 `main.js` 导出的函数。

**三项自检**，改完代码跑一遍：

```
npm test                 # node --test，零第三方依赖
npx eslint . --max-warnings 0   # 格式 + 代码错误，零警告标准（与 CI 一致），--fix 可自动修
npx prettier --check .   # 仅格式，--write 可自动改
```

**多个 agent 并发时，用 `tools/capped.sh` 包一层**：`bash tools/capped.sh npm test`。测试套件默认按核数并发（16 核上起到 26 个进程），三个 agent 同时跑会把 load 顶到 20、**交互延迟从 32ms 涨到 698ms**——机器还在算，人已经没法用。限到每份 4 核后延迟回到 106ms，总耗时只多 5%（三并发实测）。脚本只限 CPU 不限内存（OOM kill 会变成假红），systemd 不可用时透传执行，退出码原样传出。

三个容易踩的点：

- 格式选项在 `.prettierrc` 与 `.eslintrc.js` 的 `prettier/prettier` 规则里**各写了一份且取值相同**。改格式约定必须同时改这两处，否则两条命令会给出互相矛盾的结果。
- `.prettierignore` 是必需品：prettier 默认扫描全仓库，没有它 `--write` 会重写只读的 `target/`（68MB，且在其中的 Shift-JIS 日文 HTML 上直接报错退出），也会把 `yml/` 产物的双引号键名改成单引号。
- **没装 `node_modules` 时 `npx` 会去拉最新版，而 eslint 与 prettier 的失败形态相反——后者更危险。** eslint 拉到 v9 会因找不到 `eslint.config.js` **报错**，一眼看得出是环境问题；prettier 拉到比 `package-lock.json` 钉的版本更新的一支则**静默给出不同答案**：3.9.x 与本仓库钉的 3.8.3 在 markdown 表格对齐与 `for (…;…; )` 的尾空格上判定相反，于是 `--check .` 报出三个「失败」文件（全是假的），而 `--write` 会把真正干净的文件改坏。**先 `npm ci`**；来不及就显式钉版本：`npx prettier@3.8.3`（版本以 `package-lock.json` 为准，不是 `package.json` 的 `^` 范围）。

### CI（无引擎环境）

`.github/workflows/ci.yml`（#92）在 PR 与 push 到 master 时于 ubuntu runner 上重跑这三项（`npm run test:ci` → `npx eslint . --max-warnings 0` → `npx prettier --check .`），外加一条**跳过数守护**：CI 机器没有引擎，依赖引擎的用例按 `test/engine-skip-baseline.txt` 的基线数跳过（数字以该文件为唯一真相，定稿勘误见 #92），跳过数偏离基线即红。**新增依赖引擎的用例必须同步改基线**，让覆盖面的收缩是一次有意识的提交。

变异检查（#89）已跨平台，有三个执行点：

- **快速模式**（条目表的三项检查）随 `test/mutation-check.test.js` 进 `npm test`；
- **抽样模式**在 mutation job 里抽 12 条轮转，PR 时跑；
- **全量模式**在 master push 与手动触发（workflow_dispatch）时跑，隔离副本并行。无引擎环境下，依赖引擎的条目按「跳过」核对工具内嵌的 `ENGINE_SKIP_BASELINE`，偏离即红。

引擎比对不在 CI 内，所以 CI 绿不等于本地全过。**变异检查的严格标准（全部拦下、零跳过）仍须在有引擎的本机跑全量。** 跳过数守护只在无引擎环境有意义：引擎在场时跳过数是 0，对基线必然红。

### 静态数据目录

引擎按 `yml > json > csv` 挑**一个**目录读全部静态表，不逐文件混读；`system.static` 只是**搜索起点**，且只向低优先级方向回落，不会往回找。

- **全新克隆免配置**：`ere.config.json` 不进 git，缺失时引擎默认无 `system.static` 键，从 `yml` 起步，直接命中 `yml/`。
- **本地旧配置写着 `"static": "csv"` 会直接失败**：`csv/` 已随 issue #17 迁移移除，起点之后没有更低优先级的目录可退，引擎报「静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!」。把该键改成 `"yml"`，或删掉 `ere.config.json` 让引擎重新写回。

配置优先级：`yml/_fixed.json` > `ere.config.json` > `yml/_config.json` > 引擎默认值。

**但「优先级」不是逐键分层，是整份替换**（#69 实测引擎代码）：

```js
try { this.defaultConfig = JSON.parse(…readFileSync(join(staticPath,"./_config.json"))) }
catch(e) { this.defaultConfig = getEmptyConfigForm() }
if (this.config || (this.config = JSON.parse(JSON.stringify(this.defaultConfig))), …)
```

- **`yml/_config.json` 是整份默认配置，不是补丁。** 它存在时 `defaultConfig` 整个就是它，引擎默认值只在文件缺失或解析失败时兜底，**没写的键不会回落默认，而是直接缺失**。缺键的后果也不中性：各消费点自行兜底，做法各不相同（`saveFiles` 有 `||10`、`window.*` 交给渲染层、`resource` 直接按 falsy 关掉）。所以这份文件必须写全 `getEmptyConfigForm()` 的形状，只标出有意偏离的那几个键。`test/resource-media.test.js` 有一道引擎比对锁：逐键 deepEqual 引擎默认形状，只许 `resource` 一处偏离。
- **已有 `ere.config.json` 的机器读不到新默认值**：第二行的 `||` 短路了。`this.config` 已由 `ere.config.json` 填好，`_config.json` 整份不参与。改了默认值要在本机生效，得手工改该键，或删掉 `ere.config.json` 让引擎按新默认重建。
- **哪个键放哪个文件**：结构性要求（如 `extendedCharaTables`，缺了会直接崩溃或静默降级）放 `_fixed.json`，它优先于用户配置；用户偏好（如 `resource`，引擎配置 UI 里有对应开关）放 `_config.json`，放进 `_fixed.json` 会让 UI 开关点了没反应。
  - **`saveFiles` 是结构性要求，落 `_fixed.json`（#135 定，取 99）。** 原作有 99 个手动存档槽（0–98）加 99 号自动存档槽（ADR-0006），而引擎 `listSaveFiles` 的扫描是闭区间 `for (let t = 0; t <= saveFiles; ++t)`——`saveFiles` 取 99 恰好覆盖 0–99，且 `dev-guides/03-config.md:76` 限定该值为 10–99 的整数（**100 超规范**）。放 `_config.json` 不行：它会被本机已有的 `ere.config.json` 整份短路（上一条），于是装过旧版本的机器上仍是 10，槽位 11–98 的备注不被 `loadGlobal` 维护、界面上显示为空栏位，而**没有任何测试会红**。代价是配置 UI 里的「存档数量」点了不生效，已有意接受。
  - 参考项目里 `saveFiles` 两处都不设（erauma、ere-kanon、ere-example 实测）：它们的游戏槽位数在引擎默认范围内，不需要抬。erauma 另有一条我们用不了的路——运行时 `era.get('gameconfig')?.system.saveFiles` 读生效配置，**`gameconfig` 这个键在 4.8.0 不存在**。

`yml/` 的产物由 `tools/csv-to-yml.js` 生成，遵守**产物边界**（issue #10）：产物进 git、归人工维护，转换器重跑默认跳过已存在的产物，重写必须显式 `--force`。这条规则有测试固定住。产物名在**生成期**经归一表（`tools/lang-table.js`，issue #60）归一为简体（引擎列名键如 素質/名前 受保护，原样保留），所以 `--force` 重跑得到的产物与库内逐字节一致，不会退回源 CSV 的繁/日原名；同步守护因此只做直接比较，生成器漏归一即红。YAML 键名一律加引号，键含 `:` / `#` 或首尾空格时裸键名会产出无法解析的 YAML。`GameBase.yml` 的原始输入已随迁移删除，要重转先从 git 历史取回 `csv/GameBase.csv`。

## 引擎 API 与硬约束

- 一切能力来自 `require('#/era-electron')`，权威清单 `dev-guides/A-api-docs.md`。分组：输出（`print` / `printAndWait` / `printMultiColumns` / `printInColRows` / `printButton` / `printImage`）、输入（`input` / `waitAnyKey`）、变量（`get` / `set` / `add`）、存档（`saveData` / `loadData` / `saveGlobal`）、角色（`getAllCharacters` / `addCharacter` / `beginTrain` / `endTrain`）、媒体（`playMusic`）、日志（`logger.*`）。
- **手册 < 引擎代码**：`dev-guides/` 的陈述与 `app.asar` 的实测行为冲突时，一律以引擎代码为准。**`dev-guides/` 是经本项目按引擎代码修正过的副本，不是上游逐字原文**（#163 裁定：发现分歧直接改正文，单一真相源，不建勘误表、不加页内注记；上游原文只存在于 git 历史）。必须逐字不变的外部材料只有 `.agents/skills/emuera-basic-agent-guide/`——它有上游同步、改了将来会冲突，手册是一次性拷贝，两者待遇不同的理由就在这里。新钉住的分歧按 `tools/engine-contract-facts.mjs` 头注的分工设防：可执行的配 engine-bundle 用例，可字面锚定的进该表 anchors。
- **运行时可用的只有 `era` API 与 `crypto`。** Node 内置模块和第三方库都被引擎拦下（`dev-guides/18-tools.md`）。`tools/` 里的离线脚本不受此限，这是「数据自动提取」路线成立的前提。
- 异步 API 必须 `await`：`printAndWait`、`input`、`clear`、`waitAnyKey`、`delay`、存档系列。漏 `await` 造成的时序错乱极难排查。
- 变量以字符串寻址：`era.get('base:0:0')`、``era.get(`staticcflag:${cid}:1`)``，也支持列名 ``era.get(`static:${cid}:name`)``。**读未声明的序号返回 `undefined` 而非 0**，且能静默写入并存进存档（issue #13）。拼错下标不会报错，只会凭空造出一个变量，所以包装层的 getter 一律 `|| 0` 兜底。
- 文件编码用 UTF-8 或 UTF-8 BOM。`target/` 里有一个 Shift-JIS 编码的文件，而且是活代码（`ERB/調教相關/COMF90_ニプルファック.ERB`），批量读取的脚本必须按内容判定编码。
- **写一个变量前，先确认它所属的静态表已经在 `yml/` 里。** 决定行为的不是「几段寻址」，而是名字表在不在与 data 桶在不在的组合（引擎 setVar，PR #57 逐族实测）：名字表在 + 桶在 → 通过（未声明下标回落成数字）；名字表在 + 桶不在 → 静默丢弃；**名字表不在 + 桶在 → 直接崩溃**，二段三段皆然（在引擎里遇到过两次：`item*` 见 PR #34，`stain`/`ex`/`cstr`/`tequip`/`tflag` 见 PR #57）。`test/static-table-coverage.test.js` 从源码扫出寻址族逐个探测，新族忘了配表会在那里红。但**别把它当免检**，它只覆盖 `era.get/set/add` 的字面量前缀。
- **输出类 API 会二次加工你给的参数，第一次用之前先去引擎渲染层看一眼。** 手册只讲参数含义，不讲引擎拿到参数后画成什么样；夹具只记录调用，也不模拟渲染。两边都看不见的东西，只有在引擎里实际运行才能发现。已知一例：`printButton` 的 `showAcc` 默认为真，引擎自动拼出 `[快捷键] 正文`，并把正文里的连续空白折叠成一个空格。所以**按钮正文一律不写 `[编号]` 前缀**，写了会得到 `[0] [0] 旧的奴隶`（在引擎里遇到过，PR #30）。
  查法：`ere-4.8.0-win-x64/resources/app.asar` 是 webpack bundle，直接按 API 名或配置项名搜字符串就能读到渲染公式（bundle 里带未压缩的原始源码副本）。查到的变换补进 `test/helpers/era-fixture.js` 的对应记录字段，让它此后可断言。
- **「引擎接受了」与「我们调用了」是两回事，验收时夹具证明不了前者。** 夹具的记录层只能证明调用发生过；引擎侧的短路（如 `addCharacter` 对无预设角色直接返回 false，#21/#22 就是这样误报通过的）只有引擎自己的代码能暴露。`test/helpers/engine-bundle.js` 把 app.asar 里的解析器、装载循环与 `EraApi` 方法（真方法 + 最小假 this）直接交给测试驱动，静态表产物与引擎行为的比对从此不必手抄镜像。asar 按 `ASAR_CANDIDATES` 逐条回落（环境变量 `ERE_ENGINE_ASAR` → 仓库内 → `~/.era-engine/` → `/mnt/d/Code/era` → `D:\Code\era`），缺引擎时相关用例 skip 并留一条警告。

  **这份列表在三处各写了一份**（`test/helpers/engine-bundle.js`、`tools/mutation-check.mjs`、`tools/engine-contract-check.mjs`，CJS/ESM 混用抽不成公共模块），同步由 `test/asar-candidates.test.js` 判红。后三条绝对路径是给 **worktree 与变异并行副本**用的——`ere-4.8.0-win-x64/` 不进 git，它们都够不着仓库内那条，少了回落就是几十个用例静默 skip 而测试仍报绿（#113 验收踩过）。
  - **不必再手工 `export ERE_ENGINE_ASAR`**，回落会自己命中。想跑得快些，把 asar 拷一份到 `~/.era-engine/app.asar`（本地盘，比 `/mnt/d` 的 9p 快）。
  - **`ERE_ENGINE_ASAR=none` 是「视为无引擎」的开关**，三处同款语义。跳过基线核对必须用它：绝对路径回落进来之后，`env -u ERE_ENGINE_ASAR` 照样命中回落，已经造不出无引擎环境了。

## 代码约定

格式由 `.eslintrc.js` 与 `.prettierrc` 约束，无须记忆。以下是格式之外、参照 erauma 的工程约定：

- **文件名** kebab-case 带类别前缀：`sys-calc-*.js`（系统计算）、`page-*.js`（界面）、`*-factory.js`（工厂）、`calc-*.js` / `*-utils.js`（工具）。

- **文件名一律 ASCII，描述部分用英文单词而非罗马音。** 原作的日文/中文文件名（`EVENT_K3_高貴.ERB`、`据点2.mp3`）移植后**意译**：`kojo-k3-noble.js`、`stronghold-2.mp3`——不是 `kouki`、不是 `judian`。人名无对应英文词，用拉丁转写（マオ → `mao`、菲娅 → `fia`）。口上 22 个源文件的映射表在 `tools/kojo-transpiler.js`，未登记的源名显式报错、不静默回落。
  - **资源的注册名不跟着改**：`res/*.csv` 是「注册名,文件名」两列，注册名照抄原作 `PLAYBGM` / `printImage` 的实参（1:1 追溯），只有磁盘文件名改 ASCII。所以 `era.playMusic('据点2.mp3')` 的调用点一行不动。
- **标识符** snake_case（`get_display_name`、`birth_list`）；引擎 API 自身是 camelCase（`era.printMultiColumns`）。
- **模块引用** `ere/` 内一律用 `#/` 别名，引擎原生解析、无需构建步骤；别名不覆盖 `tools/`、`test/`，那些目录之间用相对路径。
- **导入分组排序**：`era` 置顶，其后 `system` / `page` / `event` / `chara` / `kojo` / `facade` / `utils` / `data` / `i18n`（`chara` = 角色域代码，如 `#/chara/chara-ex`，T6 引入；`kojo` = 口上模块，独立顶层目录，#46 起存在；`facade` = 按域门面，#71 起存在）。
- **变量语义必须注释。** 这是最关键的一条，`era.get('global:3')` 本身不可读：

  ```js
  // GLOBALNAME:3 = 语言
  set_lan(era.get('global:3') || era.set('global:3', 'zh-CN'));
  ```

- **1:1 追溯** 靠文件头注释而非目录镜像（issue #11）：`// 源: target/ERB/SYSTEM/TITLE ver1.0.8.ERB  @SYSTEM_TITLE`。
- **玩家可见文本一律简体**（issue #60，这是对 1:1 的有意偏离）：`target/` 汉化本身三种文字混用，照抄会把混乱带给玩家。归一表 `tools/lang-table.js` 是唯一真相源，三栏分别是字级繁/日→简机械映射、词级人工译法、整串豁免名单，不要混用。离线转换用 `node tools/lang-normalize.js [--write] <js 文件…>`，运行时不做任何转换。两道锁固定住结果：`test/output-lang-lock.test.js` 扫 `ere/` 全部字符串字面量与 `yml/` 产物串（引擎列名的豁免见表内清单），表内登记的非简体字符与**参考集认定的表外繁侧字**双路即红（#188 收紧：查表命中对表外繁体失明，第二路参考集 `tools/lang-simp-ref.js` 由 OpenCC 繁→简字表派生补上；表外**日文**新字体不在参考集内，仍靠归一表与转译期 REVIEW 兜底，假名按字符区间全量报出）；`test/kojo-text-fidelity.test.js` 把 D 文与 ERB 侧归一后比对。新字种和新词条必须先在语料里找到实据才能进表，**这张表只能有意识地增长**。
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

关键入口：`ERB/SYSTEM/TITLE ver1.0.8.ERB`（`@SYSTEM_TITLE`，标题画面；根目录的 `ERB/TITLE.ERB` 同名但被引擎忽略，仲裁见 issue #12）→ `ERB/SYSTEM/SYSTEM ver1.0.3.ERB`（`@EVENTFIRST`，全局初始化）→ `ERB/SHOP/DRAW_MAINMENU.ERB`（主菜单）→ `ERB/EVENT/EVENT_NEXTDAY.ERB`（日循环）、`ERB/調教相關/TRAIN_MAIN.ERB`（`@EVENTTRAIN`）。

`target/資料_非必要無須解壓/` 是日文原作文档（readme、补丁历史、flag 说明），可作设计意图的原始依据。

**口上占近一半体量，但它不是纯文本，是带文本的状态机。** 实测输出行仅 31.4%，控制流 33.1%，注释 24.8%。文本被切得极碎：25,091 个连续文本段，中位数 1 行/段，90% 的段 ≤3 行。引擎的 `.kojo` 格式承载不了嵌套分支、状态推进、数值副作用与限时输入，所以**口上一律用 JS**（决议见 issue #8）。

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

## Agent skills

### ERA Basic（ERB）语法与 API

读 `target/` 的 ERB 时查它，别凭记忆猜：模型对 ERB 没有可靠训练数据。技能 `emuera-basic-agent-guide`，两边自动发现，也可 `/emuera-basic-agent-guide` 直接调。**这是外部上游材料，必须保持逐字不变**：正文在 `.agents/skills/emuera-basic-agent-guide/`（ante 原生加载——它按 `.claude` → `.agents` → `.ante` 的顺序发现项目级技能，后者按名覆盖前者），`.claude/skills/` 下的同名文件是转发桩，只为 Claude Code 存在（本机造不出软链接，缘由见桩内注释）。

### 工单流程

派发、监督、验收、收尾一张工单的完整 SOP：orca CLI 命令、并发上限、派发简报模板。见 `docs/agents/ticket-sop.md`。

### Issue 跟踪

工单在 `odradekk/maou_redux` 的 GitHub Issues 上，用 `gh` CLI 操作，每条命令都要显式带 `--repo odradekk/maou_redux`。见 `docs/agents/issue-tracker.md`。

### 分类标签

五个标准分类标签，标签字符串与名称相同。见 `docs/agents/triage-labels.md`。

### 领域文档

单一上下文：仓库根目录下只有一份 `CONTEXT.md` 和一个 `docs/adr/`。见 `docs/agents/domain.md`。
