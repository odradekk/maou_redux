# ere-game（EraElectron 移植项目）

**工作语言：简体中文。** 对话、提交信息、代码注释、文档、Issue 一律中文；代码标识符用英文（见「代码约定」）。

## 项目目标

把 `target/` 里的 Emuera 游戏 **《ERA魔王 年度版》**（原作 eramaou，简体中文汉化版）移植到 **EraElectron 4.8.0**：eraBasic（`.ERB`/`.ERH` + Emuera CSV）重写为 JavaScript（`ere/*.js` + `yml/`）。

**不是翻译，是重新实现。** Emuera 是解释执行的领域语言，EraElectron 是 Node/Electron 上的普通 JS 模块，两边的运行模型没有对应关系。

## 当前状态

**两颗曳光弹都已跑通，十二个移植决议全部拿到运行时证据。**

- **第一颗「标题画面到主菜单」**（issue #15）：玩家能从标题走到据点主菜单并在其上持续操作，十二个决议里十个被验证。
- **第二颗「调教一回合」**（issue #42）：主菜单 → 选目标 → 爱抚 → 口上 → 结束 → 珠结算 → 回主菜单，打掉了剩下两条——#8（口上载体＝纯 JS）与 #9（输出对拍工具链）。

十七个子系统仍只动了调教的一条最窄路径，其余入口与调教内的绝大部分指令都是带记录的存根。

动手前读这四份：

- **`docs/skeleton.md`** —— 曳光弹证明了什么。分层、模块注册、变量读写、测试写法、追溯注释的做法，十二个决议的逐条结论，以及三类只有实机能暴露的缺陷。
- **`docs/output-diff.md`** —— 与黄金样本对拍的工具与裁定口径（issue #48）。`node tools/compare/cli.js` 一键复跑；**它只覆盖调教这一段**，边界写在文件头。
- **`CONTEXT.md`** —— 术语对照。日文原作、简体汉化、引擎 API 三套词汇，命名时用「本项目用词」一列。
- **`docs/stub-registry.md`** —— 欠账清单。后续票据此认领工作：找到一行，把壳换成实现，销账。

**移植决议的索引是地图 issue #1**，细节在各自的 ticket 里。地图只读——决议被推翻时回对应 ticket 补勘误，不改写历史（#3 被 #6 推翻、#13 被曳光弹细化，都是这么留痕的）。

**`sav/global.sav` 是引擎产物，不是仓库资产。** 它盖着游戏标识（当前 `931060`），与 `yml/GameBase.yml` 的【游戏标识】不一致时引擎**拒绝启动并报错**，而非静默重置（`dev-guides/11-saves.md:55`；下一行的「重置」只适用于版本号过低）。改动【游戏标识】后删掉它，引擎会重建。

## 目录结构

```
D:\Code\era\
├── ere/              # 游戏源码，入口 main.js；era-electron.js 是引擎 SDK，勿改名或移动
├── yml/              # 静态数据表（YAML），即引擎的静态数据目录
├── tools/            # 离线脚本，不受 ere/ 的依赖限制
├── test/             # node --test；helpers/era-fixture.js 是全项目唯一的缝（issue #16）
├── res/              # 图片/音频（当前 resource: false，未启用）
├── sav/              # 存档，*.sav 已 gitignore
├── dev-guides/       # 引擎官方手册，简体中文，权威参考
├── ere-4.8.0-win-x64/ # 引擎运行时，含 ERA-Electron - 重量级ERA引擎.exe
└── target/           # 移植源：Emuera 版《ERA魔王》，只读输入
```

移植产物一律写进 `ere/`、`yml/`、`res/`。

## 运行与调试

引擎是 GUI 程序，没有命令行启动方式：

1. 启动 `ere-4.8.0-win-x64\ERA-Electron - 重量级ERA引擎.exe`
2. 【游戏】→【打开游戏】，选仓库根目录
3. 改完代码 `Ctrl+R` 热重载

启动顺序：读配置 → 读 `yml/*.yml`（**`GameBase.yml` 必需**）→ 读 `res/` → 以 `ere/main.js` 为入口加载脚本 → 注入 SDK → 读 `sav/` → 执行 `main.js` 导出的函数。

**自检三件套**，改完代码跑一遍：

```
npm test                 # node --test，零第三方依赖
npx eslint .             # 格式 + 代码错误，--fix 可自动修
npx prettier --check .   # 仅格式，--write 可自动改
```

三条 gotcha：

- 格式选项在 `.prettierrc` 与 `.eslintrc.js` 的 `prettier/prettier` 规则里**各写了一份且取值相同**。改格式约定必须同时改这两处，否则两条命令会给出互相矛盾的结果。
- `.prettierignore` 是必需品：prettier 默认扫描全仓库，没有它 `--write` 会重写只读的 `target/`（68MB，且在其中的 Shift-JIS 日文 HTML 上直接报错退出），也会把 `yml/` 产物的双引号键名改成单引号。
- 新 worktree 若还没装 `node_modules`，`npx eslint` 会去拉 v9 并因找不到 `eslint.config.js` 报错——那是环境问题，先 `npm ci`。

### 静态数据目录

引擎按 `yml > json > csv` 挑**一个**目录读全部静态表，不逐文件混读；`system.static` 只是**搜索起点**，且只向低优先级方向回落，不会往回找。

- **全新克隆免配置**：`ere.config.json` 不进 git，缺失时引擎默认无 `system.static` 键，从 `yml` 起步，直接命中 `yml/`。
- **本地旧配置写着 `"static": "csv"` 会硬失败**：`csv/` 已随 issue #17 迁移移除，起点之后无档位可退，引擎报「静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!」。把该键改成 `"yml"`，或删掉 `ere.config.json` 让引擎重新写回。

配置优先级：`yml/_fixed.json` > `ere.config.json` > `yml/_config.json` > 引擎默认值。

**但「优先级」不是逐键分层，是整份替换**（#69 实测引擎代码）：

```js
try { this.defaultConfig = JSON.parse(…readFileSync(join(staticPath,"./_config.json"))) }
catch(e) { this.defaultConfig = getEmptyConfigForm() }
if (this.config || (this.config = JSON.parse(JSON.stringify(this.defaultConfig))), …)
```

- **`yml/_config.json` 是整份默认配置，不是补丁。** 它存在时 `defaultConfig` 整个就是它，引擎默认值只在文件缺失/解析失败时兜底——**没写的键不会回落默认，是直接缺失**。而缺键不中性：各消费点自行兜底且口径不一（`saveFiles` 有 `||10`、`window.*` 交渲染层、`resource` 直接 falsy 关闸）。所以这份文件必须写全 `getEmptyConfigForm()` 的形状，只标出有意偏离的那几个键。`test/resource-media.test.js` 有引擎对拍锁：逐键 deepEqual 引擎默认形状、只许 `resource` 一处偏离。
- **已有 `ere.config.json` 的机器吃不到新默认值**：第二行的 `||` 短路——`this.config` 已由 `ere.config.json` 填好，`_config.json` 整份不参与。改了默认值要在本机生效，得手工改该键或删掉 `ere.config.json` 让引擎按新默认重建。
- **哪个键放哪个文件**：结构性要求（如 `extendedCharaTables`，缺了会硬崩或静默降级）放 `_fixed.json`——它赢过用户配置；用户偏好（如 `resource`，引擎配置 UI 里有对应开关）放 `_config.json`——放 `_fixed.json` 会让 UI 开关点了没反应。

`yml/` 的产物由 `tools/csv-to-yml.js` 生成，遵守**产物边界**（issue #10）：产物进 git、归人工维护，转换器重跑默认跳过已存在的产物，重写必须显式 `--force`——这条规则有测试钉死。产物名在**生成期**经归一表（`tools/lang-table.js`，issue #60）归一为简体（引擎列名键如 素質/名前 受保护、原样保留）——`--force` 重跑得到的产物与库内逐字节一致，不会退回源 CSV 的繁/日原名；同步守护因此只做直比，生成器漏归一即红。YAML 键名一律加引号，键含 `:` / `#` 或首尾空格时裸键名会产出无法解析的 YAML。`GameBase.yml` 的原始输入已随迁移删除，要重转先从 git 历史取回 `csv/GameBase.csv`。

## 引擎 API 与硬约束

- 一切能力来自 `require('#/era-electron')`，权威清单 `dev-guides/A-api-docs.md`。分组：输出（`print` / `printAndWait` / `printMultiColumns` / `printInColRows` / `printButton` / `printImage`）、输入（`input` / `waitAnyKey`）、变量（`get` / `set` / `add`）、存档（`saveData` / `loadData` / `saveGlobal`）、角色（`getAllCharacters` / `addCharacter` / `beginTrain` / `endTrain`）、媒体（`playMusic`）、日志（`logger.*`）。
- **运行时可用的只有 `era` API 与 `crypto`**——Node 内置模块和第三方库都被引擎拦下（`dev-guides/18-tools.md`）。`tools/` 里的离线脚本不受此限，这是「数据自动提取」路线成立的前提。
- 异步 API 必须 `await`：`printAndWait`、`input`、`clear`、`waitAnyKey`、`delay`、存档系列。漏 `await` 造成的时序错乱极难排查。
- 变量以字符串寻址：`era.get('base:0:0')`、``era.get(`staticcflag:${cid}:1`)``，也支持列名 ``era.get(`static:${cid}:name`)``。**读未声明的序号返回 `undefined` 而非 0**，且能静默写入并存进存档（issue #13）——拼错下标不会报错，只会凭空造出一个变量，所以包装层的 getter 一律 `|| 0` 兜底。
- 文件编码用 **UTF-8 或 UTF-8 BOM**。`target/` 里有一个 Shift-JIS 异类且是活代码（`ERB/調教相關/COMF90_ニプルファック.ERB`），批量读取的脚本必须按内容判定编码。
- **写一个变量前，先确认它所属的静态表已经在 `yml/` 里。** 决定行为的不是「几段寻址」，而是**名字表在不在**与 **data 桶在不在**的组合（引擎 setVar，PR #57 逐族实测）：名字表在 + 桶在 → 通过（未声明下标回落成数字）；名字表在 + 桶不在 → 静默丢弃；**名字表不在 + 桶在 → 硬崩**，二段三段皆然（实机撞见两次：`item*` 见 PR #34，`stain`/`ex`/`cstr`/`tequip`/`tflag` 见 PR #57）。`test/static-table-coverage.test.js` 从源码扫出寻址族逐个探，新族忘了配表会在那里红——但**别把它当免检**，它只覆盖 `era.get/set/add` 的字面量前缀。
- **输出类 API 会二次加工你给的参数，第一次用之前先去引擎渲染层看一眼。** 手册只讲参数含义，不讲引擎拿到参数后画成什么样；夹具只记录调用，也不模拟渲染。两边都看不见的东西，只有实机能发现。已知一例：`printButton` 的 `showAcc` 默认为真，引擎自动拼出 `[快捷键] 正文` 并把正文里的连续空白折叠成一个空格——**按钮正文一律不写 `[编号]` 前缀**，写了会得到 `[0] [0] 旧的奴隶`（实机撞见，PR #30）。
  查法：`ere-4.8.0-win-x64/resources/app.asar` 是 webpack bundle，直接按 API 名或配置项名搜字符串就能读到渲染公式（bundle 里带未压缩的原始源码副本）。查到的变换补进 `test/helpers/era-fixture.js` 的对应记录字段，让它此后可断言。
- **「引擎接受」与「我们调了」是两回事，验收夹具证明不了前者。** 夹具的记录层只证调用；引擎侧的短路（如 `addCharacter` 对无预设角色直接返回 false，#21/#22 的假绿）只有引擎自己的代码能暴露。`test/helpers/engine-bundle.js` 把 app.asar 里的解析器、装载循环与 `EraApi` 方法（真方法 + 最小假 this）直接交给测试驱动，静态表产物与引擎行为的对拍从此不必手抄镜像；asar 三处定位（env `ERE_ENGINE_ASAR` / 仓库内 / `D:\Code\era`），缺引擎时相关用例 skip 并留警告。

## 代码约定

格式由 `.eslintrc.js` 与 `.prettierrc` 约束，无须记忆。以下是格式之外、参照 erauma 的工程约定：

- **文件名** kebab-case 带类别前缀：`sys-calc-*.js`（系统计算）、`page-*.js`（界面）、`*-factory.js`（工厂）、`calc-*.js` / `*-utils.js`（工具）。
- **标识符** snake_case（`get_display_name`、`birth_list`）；引擎 API 自身是 camelCase（`era.printMultiColumns`）。
- **模块引用** `ere/` 内一律用 `#/` 别名，引擎原生解析、无需构建步骤；别名不覆盖 `tools/`、`test/`，那些目录之间用相对路径。
- **导入分组排序**：`era` 置顶，其后 `system` / `page` / `event` / `chara` / `kojo` / `facade` / `utils` / `data` / `i18n`（`chara` = 角色域代码，如 `#/chara/chara-ex`，T6 引入；`kojo` = 口上模块，独立顶层目录，#46 起存在；`facade` = 按域门面，#71 起存在）。
- **变量语义必须注释**——最关键的一条，`era.get('global:3')` 本身不可读：

  ```js
  // GLOBALNAME:3 = 语言
  set_lan(era.get('global:3') || era.set('global:3', 'zh-CN'));
  ```

- **1:1 追溯** 靠文件头注释而非目录镜像（issue #11）：`// 源: target/ERB/SYSTEM/TITLE ver1.0.8.ERB  @SYSTEM_TITLE`。
- **玩家可见文本一律简体**（issue #60，对 1:1 的**有意偏离**）：`target/` 汉化本身三种文字混用，照抄会把混乱带给玩家。归一表 `tools/lang-table.js` 是唯一真相源（字级繁/日→简机械映射、词级人工译法、整串豁免名单三栏，勿混），离线转换用 `node tools/lang-normalize.js [--write] <js 文件…>`——运行时不做任何转换。两道锁钉死：`test/output-lang-lock.test.js` 扫 `ere/` 全部字符串字面量与 `yml/` 产物串（引擎列名豁免见表内清单），表外非简体字符即红；`test/kojo-text-fidelity.test.js` 锁 D 对 ERB 侧归一后比对。新字种/词条必须先在语料实证再进表，**表只能有意识地长**。
- **提交信息** 用 Conventional Commits，scope 按子系统划分（`train` / `ero` / `event` / `chara` / `page` / `data` / `util`）。

## 移植源：`target/`

Emuera 1.821.8 简体中文版运行的《ERA魔王 年度版（名字暂定）》，作者「人人为我，我为人人」，版本 93106。视为**只读输入**。

规模（实测）：**346 个 `.ERB`/`.ERH`，315,953 行；58 个 CSV；68.5 MB**。按目录的行数分布决定优先级与工作量：

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

关键入口：`ERB/SYSTEM/TITLE ver1.0.8.ERB`（`@SYSTEM_TITLE`，标题画面——根目录的 `ERB/TITLE.ERB` 同名但被引擎忽略，仲裁见 issue #12）→ `ERB/SYSTEM/SYSTEM ver1.0.3.ERB`（`@EVENTFIRST`，全局初始化）→ `ERB/SHOP/DRAW_MAINMENU.ERB`（主菜单）→ `ERB/EVENT/EVENT_NEXTDAY.ERB`（日循环）、`ERB/調教相關/TRAIN_MAIN.ERB`（`@EVENTTRAIN`）。

`target/資料_非必要無須解壓/` 是日文原作文档（readme、补丁历史、flag 说明），可作设计意图的原始依据。

**口上占近一半体量，但它不是纯文本，是带文本的状态机。** 实测输出行仅 31.4%，控制流 33.1%，注释 24.8%；文本被切得极碎——25,091 个连续文本段，**中位数 1 行/段**，90% 的段 ≤3 行。引擎的 `.kojo` 格式承载不了嵌套分支、状态推进、数值副作用与限时输入，**口上一律用 JS**（决议见 issue #8）。

移植方式：离线转译器产出初稿（约 98% 的行可机械转换），再人工逐段复核。转译器必须保留注释——29,724 行说明文字是理解语义的主要依据。

## 参考资料

**引擎手册** `dev-guides/`，25 篇简体中文，文件名即主题。三篇非显而易见的：`A-api-docs.md` 是 API 权威清单，`18-tools.md` 讲开发套件与依赖限制，`E-erauma-train.md` 讲 EraUma 的调教系统设计思路。

**开源参考项目**（gitgud.io）：

| 项目                                                                         | 用途                                                                                          |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`umaera/game/ere-example`](https://gitgud.io/umaera/game/ere-example)       | 官方例程，含存读档、商店、口上、调教基本框架，**传统变量风格**                                |
| [`umaera/game/ere-kanon`](https://gitgud.io/umaera/game/ere-kanon)           | erakanon 的 ere 移植版，**开发套件 OOP 风格** — 与本项目同属「移植旧 era 游戏」，参考价值最高 |
| [`umaera/erauma`](https://gitgud.io/umaera/erauma)                           | 体量最大的成熟 ere 游戏，参考其**工程结构、命名、提交规范**                                   |
| [`umaera/engine/era-electron`](https://gitgud.io/umaera/engine/era-electron) | 引擎本体，SDK 从这里取                                                                        |
| [`umaera/game/kojo-test`](https://gitgud.io/umaera/game/kojo-test)           | `.kojo` 文件有效性测试                                                                        |

erauma 的 `ere/` 分层可直接借鉴：`data/`（静态数据）、`event/`（事件）、`page/`（界面）、`system/`（系统逻辑，按域再分子目录）、`utils/`（工具）、`i18n/`（多语言）。但**代码层面以 `ere-example` 与 `ere-kanon` 为范例**——官方告诫 EraUma 代码缺注释、缺类型检查（`dev-guides/E-erauma-train.md`），它只值得参考设计思路与工程组织。

## Agent skills

### ERA Basic（ERB）语法与 API

读 `target/` 的 ERB 时查它，别凭记忆猜——模型对 ERB 没有可靠训练数据。技能 `emuera-basic-agent-guide`，两边自动发现，也可 `/emuera-basic-agent-guide` 直接调。**这是外部上游材料，保持逐字不变**：正文在 `.factory/skills/emuera-basic-agent-guide/`（droid 原生加载），`.claude/skills/` 下的同名文件是转发桩（本机造不出软链接，缘由见桩内注释）。

### 工单流程

派发、监督、验收、收尾一张工单的完整 SOP：orca CLI 命令、并发上限、派发简报模板。见 `docs/agents/ticket-sop.md`。

### Issue tracker

Issues live in GitHub Issues on `odradekk/maou_redux`, via the `gh` CLI — pass `--repo odradekk/maou_redux` explicitly. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` and one `docs/adr/` at the repo root. See `docs/agents/domain.md`.
