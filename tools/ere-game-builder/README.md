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
| `assets/reference/`、`assets/sdk/`、`assets/templates/`、`LICENSE`、`NOTICE.md`、`RELEASE.md` | 原样保留 |
| `lib/` | 与上游一致，另有三处本地修正，同步上游时按 git 历史逐个重放：<br>① `lib/kojo.js` 的 `topLevelKeys` 不再把列 0 的序列项（`- random: true`）当成顶层篇目——手册 random1.kojo 那种写法有两条同名兄弟项，原实现会误报「顶层篇目「- random」重复定义」，本项目 #891 起在 CI 上跑这个检查，误报会直接挡住合法的随机文本。<br>② `lib/tables.js` 的文件→表映射把 `Palam` 也认成 `juel`（表定义的 `alternateFiles`）：引擎的 `parseObject` 用同一个分支装载 `param` 与 `palam`，两者都写进 `staticData.juel`。本项目的表文件叫 `Palam.yml`，原实现只认文件名 `param`，于是 `palam`/`delta`/`gotjuel` 被当成自定义一维表，`palam:<角色>:<序号>` 这种合法三段地址全判「段数不对」（#819 前全库 314 条）。<br>③ `lib/check.js` 与 `cli.mjs`：`info` 级提示默认不收集，只有传 `includeInfo` 才进结果。原先「调教期专用表在 `era.beginTrain()` 之前读取会得到 undefined」按「文件 × 表」报一次，但判断一条读取是否发生在调教期间需要跨文件调用图，本工具是逐文件正则扫描，没有这个信息——全库 191 条全是误报（#819），不改默认口径就会挤占 `maxFindings` 名额、把真错误挤出去。缺 `.ere-min-version` 这条同类提示因此也默认不显示，用 `--includeInfo` 看 |
| `assets/skills/*` | 移到 `.agents/skills/`；只改了标题里的「DSH」，并在开头加「在本项目里使用」一段。`.claude/skills/` 是逐字节副本，`test/agent-skills-sync.test.js` 检查两处一致 |
| `index.js`（向 DSH 注册技能与工具） | `cli.mjs`：`registerTools()` 的函数体逐行取自上游 `apply()` 的工具注册部分，外层改成命令行 |
| `package.json` | 重写，只声明 ESM；`yamljs` 装在仓库根目录的 devDependencies |
| `cordis.patch.yml`、`locale/`、`icon.svg`、`scripts/`、`README.md` | 未搬：前三个只给 DSH 打包用；`scripts/` 是上游开发脚本，自检依赖 DSH 入口；README 的功能说明在上游仓库 |

本目录与两处 `ere-*` 技能目录不参加本项目的 ESLint 与 Prettier 检查：上游文件保持逐字节一致，本地修正逐处登记在上表，方便以后比对。

## 在本项目上的已知限制

- 知识库按引擎 5.0.0 核对，与本项目运行的引擎版本相同。两边不一致时，本项目以 `dev-guides/` 和 app.asar 引擎源码为准。
- `ere_check_game` 对本项目报出大量错误，本项目的检查以 `npm test` 为准，但它的输出要分类处理。2026-10-21 全量检查共 6014 条错误，其中 18 条是真缺陷，全部属于「未知的数据表」和「没有变量 "<名字>"」两类，这两类必须处理。其余是本项目约定或工具局限造成的误报：
  - 「没有序号为 N 的变量」：`CFlag.yml` 等表按约定不登记或只登记部分序号，引擎对未声明的序号按数字下标正常读写。
  - 「表名为空」：表名是 `${table}` 这类动态拼接，工具无法检查。
  - Chara17 的「第一列 "portcflag" 不是引擎认识的字段」：`portcflag` 是 `_fixed.json` 的 `extendedCharaTables` 声明的扩展表。
  - 开发套件的两类警告（生成文件缺少 GENERATED 标记、套件与当前静态数据不一致）：见下一条。
- `ere_check_game` 默认最多收集 200 条，超出的直接截断，排在后面的警告也一并丢掉。要看全量，加 `--maxFindings 100000`。
- `ere/era-utils/` 不是引擎的开发套件：带 `// GENERATED START/END` 标记的具名访问器由 `tools/gen-wrapper.js` 生成，`exp-level.js`、`palam-level.js` 是手写模块。它的文件名和标记与引擎生成的套件相同，但引擎的【帮助】-【生成开发套件】会把两个标记之间的内容换成 `era.raw()` 写法，还会新建一批文件，所以本项目不用它。技能正文和 `ere_check_game` 里「重新生成开发套件」的建议，在本项目都不适用。

## 同步上游新版本

1. 用 `git -c core.autocrlf=false clone` 取新版本，保证换行与上游一致。
2. 用新版本覆盖上表中「原样保留」的文件。
3. 把 `assets/skills/*` 覆盖到 `.agents/skills/`，重新加上标题改动和「在本项目里使用」一段（按新版本核对内容），再把 `.agents/skills/` 下三个目录整个复制到 `.claude/skills/`。
4. 比对上游 `index.js` 的 `apply()` 工具注册部分与 `cli.mjs` 的 `registerTools()`，有变化就整段替换；新增参数类型时检查 `parseToolArgs()`。
5. 更新本文件开头和 `package.json` 的版本号，逐个运行 5 个工具，再跑 `test/agent-skills-sync.test.js`。
