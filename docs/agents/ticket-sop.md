# 工单处理流程

一张工单对应一个 Paseo worktree 和一个 agent 会话。优先使用 Paseo MCP；没有对应操作时使用 CLI。本文的提交、远端写入、合并和归档步骤适用于已获授权的工单工作流，仍须遵守当前会话的权限范围。

工单位于 GitHub 的 `odradekk/maou_redux`，操作约定见 `issue-tracker.md`。移植决策索引为 issue #1，只读。路线图 issue #101（「移植路线图：十八个子系统到可通关的完整游戏」）规定阶段顺序：其子 Issue 记录阶段决策，实施 Issue 归入各阶段的子路线图，例如 #42 下的八张 T Issue。零散工作按 `docs/stub-registry.md` 认领。阻塞关系以 GitHub 的 `issue_dependencies_summary.blocked_by` 为准。

## 0. 环境前提

开始分配工作前确认以下条件：

- **服务状态**：运行 `paseo daemon status --json`，确认服务可用。本机配置为 `desktopManaged: true`、监听 `127.0.0.1:6767`；以命令实际返回为准。
- **可用工具**：有 MCP 时使用 `create_workspace`、`create_agent`、`list_agents`、`get_agent_status`、`archive_workspace` 等操作。CLI 路径在 Windows 用 `Get-Command paseo` 查询，在 Linux 用 `command -v paseo` 查询；不要沿用旧机器的 `/opt/Paseo/` 路径。子命令和参数以 `paseo --help`、`paseo <cmd> --help` 为准。
- **工作区管理**：由 Paseo 创建和归档 worktree。`archive_workspace` 会执行 `paseo.json` 的 `teardown`、删除工作目录、清除 Git worktree 注册并归档其中的 agent；不再另行删除同一 worktree。
- **起始分支**：`baseBranch` 使用 `origin/master`。Paseo 会异步更新远端引用，本地 `master` 可能落后；无需为创建 worktree 先更新主工作目录，但合并后仍须按 §6 同步。
- **依赖安装**：根目录的 `paseo.json` 纳入版本控制，`worktree.setup` 执行 `npm ci`。Paseo 使用目标分支中已提交的配置，未提交的修改不会生效。创建返回后确认依赖已安装。
- **游戏配置**：不向新 worktree 复制 `ere.config.json`。文件缺失时，引擎从 `yml/` 读取静态数据；复制旧的 `"static": "csv"` 配置反而会使加载失败。
- **权限模式**：通过 `create_agent` 的设置指定。既有实施流程使用 `fullAccess`、`bypassPermissions` 或 `full-access`，研究和审查使用 `auto` 或 `default`；名称因 provider 而异，先用 `list_profiles`、`inspect_provider` 核对。模式设置不能替代用户对任务范围的授权。
- **待处理权限**：用 `list_pending_permissions` 检查，不根据终端是否安静推测。确需处理时，使用 `respond_to_permission{agentId, requestId, response}` 批准或拒绝，并遵守当前会话的授权。

### 主工作目录

主工作目录是 `D:/Code/era`。所有 agent worktree 从此目录创建，合并后的引擎验收也在此执行。Paseo 项目 id 从当前项目列表查询，不复用 Fedora 的 id。

分配工作的会话在主工作目录中运行时，`create_workspace` 可省略 `path`；从其他目录创建时显式指定。项目 id 可用于 `paseo project ls` 的交叉核对，不是 `create_workspace` 的必填参数。

## 1. 选择并认领 Issue

选择状态为 `open`、全部阻塞 Issue 已关闭、且没有 assignee 的工单，按编号顺序处理：

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是工作流的第一次远端写入。获得处理工单的授权后，先认领再实施，避免两个会话重复工作。

## 2. 并发限制与创建时机

先检查 master 的 CI：`gh run list --repo odradekk/maou_redux --branch master --limit 1`。失败时，查看任务是否分配到了 runner，以及执行了哪些步骤：

```
gh api repos/odradekk/maou_redux/actions/runs/<id>/jobs --jq '.jobs[]|{name,conclusion,runner_name,steps:(.steps|length)}'
```

若没有步骤且 `runner_name` 为空，先检查权限、排队、配额和取消原因。有执行步骤时，根据失败步骤排查。连续合并可能替换等待中的 master 运行；正在执行的 master 任务不会因本仓库的 `cancel-in-progress` 设置被取消。不要仅凭运行状态将失败归因于代码。

**CI 因运行环境问题而无法验证代码时，本地检查须覆盖 §5.6 的阶段验收范围，并补跑本次 CI 未执行的全量测试和静态检查。** 无引擎检查在全新克隆中运行，显式设置 `ERE_ENGINE_ASAR=none`，避免找到用户目录中的引擎。全量变异测试仍按 T4 的要求执行。

同时最多处理 5 张 Issue。创建前统计 `running` 和 `idle` agent，不计主工作目录的 local 工作区：

```
list_agents{statuses: ["running", "idle"]}
```

**有前置依赖，或会修改相邻公共位置的工单，按“验收、合并、创建后续 worktree”的顺序处理。** #115/#117/#118/#119 提前创建工作区后，在公共计数和登记表处重复发生冲突。无依赖且修改位置不相邻的工单可以并行；修改同一个文件不必然冲突，例如 D1–D6 对 `era-fixture.js` 的不同位置可自动合并。常见冲突位置见 §5.5。

创建前还要检查以下隐含依赖：

| 情况                 | 检查内容                                                         | 处理方式与案例                                                                                            |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 使其他工单的测试失败 | 修复是否超出当前工单范围？                                       | 串行处理。#130 的按钮校验拒绝了 #117/#118/#120 使用的 `109`，而按钮由 #129 实现。                         |
| 新实现尚无调用入口   | 是否要替换尚未合并的存根？                                       | 等前置工作合并。#184 依赖 #172 的 `DUNGEON_BITCH`，提前创建时 `ere/dungeon/` 尚不存在。                   |
| 重复创建存根         | 是否有其他工单调用同一个未实现函数？                             | 在任务说明中指定由哪张工单创建，其余复用。#177/#178 曾分别为 `@SELL_EX_ITEM` 创建不同签名的存根。         |
| 验收计数互相影响     | 输出比对、变异 `COUNT`、跳过数或端到端天数是否会被其他工单修改？ | 各分支验证自身结果，合并后统一重测。#212 的输出变化使 #211b 的基线从 `537/176/2549` 变为 `552/176/2536`。 |

检查重复存根时，可用 `rg -o --no-filename 'CALL [A-Z_0-9]+' <源ERB文件>` 提取调用，再与当前工单、`ere/` 和并行工单的函数列表比较。验收新模块时，用 `rg '<新模块名>' ere/ test/` 确认生产代码存在调用；仅测试引用不算接入。确实属于不同调用位置的存根可以分别保留，在登记表中注明“房间侧调用点”“城镇侧调用点”等区别。

## 3. 创建 worktree 和 agent

```
# 创建工作区，记录返回的 workspaceId 和 cwd
create_workspace{
  isolation: "worktree",
  mode: "branch-off",
  branchName: "t<N>-<slug>",
  baseBranch: "origin/master",
  worktreeSlug: "t<N>-<slug>"
}

# 从 profile 取得 provider、model、modeId 和 thinkingOptionId
create_agent{
  title: "T<N> <标题>",
  provider: "<provider/model>",
  workspaceId: "<workspaceId>",
  settings: { modeId: "<权限模式>", thinkingOptionId: "max" },
  initialPrompt: "<任务说明>"
}

rename_workspace{workspaceId: "<workspaceId>", title: "T<N> <标题>"}
```

`<N>` 使用工单编号；存在 T 编号时使用 T 编号。`initialPrompt` 直接接收多行任务说明，不需要临时文件或模拟终端输入。

### provider / model 配置

先调用 `list_profiles`，按角色使用当前 profile 中的完整配置。以下为已有配置记录；若已变更，以实际查询结果为准：

| 角色 | Profile    | provider/model                       | mode         | 用途               |
| ---- | ---------- | ------------------------------------ | ------------ | ------------------ |
| 实施 | Worker     | `codebuddy-code/deepseek-v4.1-flash` | `fullAccess` | 按工单写代码和测试 |
| 审查 | Reviewer   | `pi/cpa/kimi-k3-256k`                | pi 无此设置  | 只读审查分支       |
| 研究 | Researcher | `codex/gpt-5.6-sol`                  | `auto`       | 只读研究原作和引擎 |

Worker 的上述配置只经过创建工作区、改文件、格式化和提交的冒烟测试，尚未通过大型移植工单验证。首张正式工单需据交付结果评估；若不适合，可恢复此前在 J3/J4/J5 中验证过的 `pi/cpa/glm-5.3`、`--thinking max` 配置。

技能位于 `~/.agents/skills/`。实施任务在 `initialPrompt` 首行写 `/implement`，研究任务写 `/research`，后接任务描述。`implement` 按 `tdd` 流程逐项实现，并在提交前进行 `code-review` 的规范和需求两方面审查。

### 任务说明模板

```
/implement issue #<N>：<标题>
工单与验收清单：gh issue view <N> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
父工单与测试策略：gh issue view <父工单> --repo odradekk/maou_redux
开始前阅读的决策：#<a>、#<b>

<三到五条已验证、重新查证成本较高的事实，附依据>

缺少 node_modules 时先 npm ci。Windows 环境准备见 docs/windows-development.md。
引擎 app.asar 按指南放入用户目录，日志放 logs/<工单号>/，避免多个工作区互相覆盖。

每次改动运行对应测试：node tools/run-node.mjs -- --test test/<当前工单>.test.js
新增变异条目必须执行：node tools/run-node.mjs -- tools/mutation-check.mjs --ids <新增编号>
不得以 --verify 代替实际变异；它只检查条目结构。
涉及多个文件时可用 npm run test:inner。
提交验收前运行 npm run test:related、npm run lint、npm run format:check，并确认全部通过。
全量变异由负责人在阶段验收时运行；全量回归测试由 CI 执行。
Windows 长任务使用 --jobs 2 或更高值启用隔离副本；串行变异被强制终止后检查目标文件 diff。

当前无引擎跳过基线为 <m>；本工单的变异编号范围为 M<k+1>–M<k+w>。
并行工单已使用 M<x>–M<y>，不得重复。
新增条目后更新所在分片的 export const COUNT。
仅由引擎测试验证的条目须设置 engine: true，并更新 tools/mutation-check.mjs 的 ENGINE_SKIP_BASELINE。
新增依赖引擎的用例须更新 test/engine-skip-baseline.txt，并在注释中写明计数依据。
输出比对基线为 <样本: m/v/s/u ...>；先确保当前分支正确，合并后的计数由负责人重新核对。

覆盖要求：
- if / else if / switch 的各分支都要有可区分的测试输入和断言。
- 价格、编号、倍率、随机上界等字面量改错时，应有对应测试失败。
- 技能编号、房间类型等组合条件用表驱动测试覆盖，不能只抽几个例子。
- 调用带随机源参数的函数时，传入 seq([...]) 等确定性随机源。
- 随机上界单独断言，可捕获参数：const rand = (n) => { upper = n; return n; };
  此处用于检查 upper，不用于模拟合法随机结果。
- 交付前另选十个尚未被新增变异条目覆盖的分支或数值，分别修改，确认测试能检测错误。

交付要求：
- 逐条满足验收清单；要求“此行为有测试”的条目须通过实际变异验证。
- 检查命令的退出码和输出，不能仅报告“运行过”。
- 按 Conventional Commits 提交，scope 用 <scope>。正文说明改动、理由和有意的取舍。
- 提交后 git status --short 为空，包括新增文件。报告提交和验证结果，等待验收。
- PR 和合并由负责人处理。
```

每轮开发使用单文件测试和新增 `--ids`，避免重复执行整个工单的相关测试。#242 的 `test:related` 选中 78 个文件，`test:inner` 也有 68 个；按 `--files` 选中 526 条变异，耗时分别达到约 20 分钟和 51 分钟。#231 只跑 `--verify` 后交付，实际执行时有 7 条变异未被测试检测到。

随机上界需要独立断言：仅控制随机返回值，无法发现 `rand(3)` 被误改为 `rand(4)`；#400 和 #401 均出现过遗漏。确定性随机源也必须显式传入，#344 曾因此出现约 41% 的随机失败概率。

分配编号前读取当前跳过基线和变异编号，同时核对尚未合并工单已分配的范围：

```powershell
Get-Content test/engine-skip-baseline.txt
rg -o --no-filename '\bM[0-9]+\b' tools/mutations | Sort-Object -Unique
```

编号范围写入每份任务说明。涉及十个以上函数时至少预留 40 个编号；编号不要求连续，冲突后手工协调的成本更高。分片条目数量由各文件的 `COUNT` 维护（#367）。

任务说明提供已确认事实及引用，将本工单尚未解决的设计问题留给实施者，并要求在 Issue 记录依据。`AGENTS.md` 会自动加载，无需重复转述。读取工单的 `--json` 写法及旧版 `gh --comments` 问题见 `issue-tracker.md`。

## 4. 检查进度与处理反馈

```
get_agent_status{agentId}
get_agent_activity{agentId}
send_agent_prompt{agentId, prompt: "<追加说明>", background: true}
```

追加说明前先查看活动，避免要求 agent 重复已完成的步骤。任务说明与原作冲突时，重新核对原文并据此修正要求。#222 的 `PREVCOM === 8` 建议与原作 `SELECTCOM = 84` 不符；#251 中 `EX_FLAG` 写入与 `EX_TALENT` 读取则是原作的双变量结构，不能仅凭名称不同认定缺陷。

**提交和检查结果是交付依据，`idle` 不是完成标志。** 确认 `git -C <worktree路径> log origin/master..HEAD` 有相关提交，且 `git -C <worktree路径> status --short` 为空。状态中的 `M ` 表示已暂存但未提交。#332/#333 曾出现未提交、提交正文缺失和未核对 `test:related` 结果的问题，验收时须分别检查。

若 agent 尚未继续且原因不明，查看 `list_pending_permissions`；根据授权处理请求，不通过终端显示推断是否在等待权限。

返工说明应给出覆盖标准、受影响文件和已发现问题的例子，并要求检查同类情况。不能将例子列为唯一修改范围：#346、#350 的返工曾只补充被指出的位置，遗漏相邻函数或其他文件。

## 5. 验收：复核结果与证据

在 worktree 中逐条核对验收清单。分支落后 master 时先按 §5.5 同步，再开始验收。报告中的事实必须回到原始资料核实；CI 只能证明检查结果，不能验证报告叙述。#143 曾将文档问题错误归因于 `printWholeImage`，实际错误是多出的 `duration` 参数。

默认查找路径会找到 `~/.era-engine/app.asar`，通常不必设置 `ERE_ENGINE_ASAR`；模拟无引擎环境的方法见 §5.6。

### 验证分工

| 层级 | 执行者     | 时机        | 检查范围                                                                                  |
| ---- | ---------- | ----------- | ----------------------------------------------------------------------------------------- |
| T1   | 实施 agent | 每次改动    | 对应测试文件和新增变异 `--ids`                                                            |
| T2   | 实施 agent | 提交验收前  | `test:related`、ESLint、Prettier                                                          |
| T3   | CI         | PR          | Linux `pr`：相关测试、默认锚点质量检查和格式检查；Windows：带引擎的全量测试，跳过数为 0   |
| T3′  | CI         | master push | Linux 有引擎、无引擎及 Windows 全量测试；跳过数检查；无引擎任务另跑全部锚点质量和格式检查 |
| T4   | 负责人     | 阶段结束    | 全量变异测试、引擎验收、全部样本输出比对，见 §5.6                                         |

相关测试用于缩短反馈时间；全量回归和变异测试用于发现公共辅助代码变化造成的跨模块影响。实际 CI 配置以 `.github/workflows/ci.yml` 为准。

每张工单的负责人完成以下检查：

1. 同步 master 并解决冲突。
2. 核对 PR 检查结果，合并后继续检查 master push 的结果。
3. 对新增校验机制，重现其声称能发现的缺陷，见判据 6。
4. 独立选择变异位置，验证测试覆盖。
5. 核对验收清单和下列十二项判据，实际执行新增 `--ids`，不能用 `--verify` 代替。
6. 运行相关源码引用的完整锚点检查和受影响样本的输出比对。

#### 源码引用与输出比对

- **锚点质量**：运行 `node tools/trace-check.mjs --anchor-quality --all`，退出码应为 0。默认检查只处理未冻结文件；新增大量 `:N` 引用时，必须检查全部文件。#402 和 #400 曾因引用片段无法准确定位源码而失败。弱锚点数量只能减少，修正后同步降低 `ANCHOR_QUALITY_BASELINE`（例如 #417）；不能提高基线或向 `ANCHOR_QUALITY_BY_FILE` 增加冻结项来接受新增问题。
- **输出比对**：对受影响的样本运行 `node tools/compare/cli.js --sample <名>`。不要仅依赖选择器是否选中 `test/compare-scope-b.test.js`。主菜单按钮由存根改为真实实现后，可能消耗更多输入而改变回放顺序；#397 的 `[105]` 曾使出售段输入错位，matched 从 123 降到 64，unexplained 从 0 增至七十余条。Windows PR 现在运行全量测试，验收时仍须检查具体样本和差异原因。

#### 独立抽样变异

交付方选择的条目全部通过，只能证明这些条目有效。验收方另选六处生产代码，避开已有条目的 `desc` 所描述位置，优先检查大函数中缺少断言的分支。阶段 5a 的五张工单，既有条目均检测到全部变异，独立抽样结果却从 6/6 到 0/5 不等；#348 的 `former_life_fate` 有 20 路 `switch`，但没有对应断言。

- 每轮返工后选择新位置，同时确认上一轮问题已修复；不要只重测已指出的例子（#346）。
- 串行修改、运行和还原，同一工作区不得同时运行其他修改源码的任务。
- 脚本替换前确认定位串只命中一次，否则报告“未成功修改，结果无效”，不能算作测试遗漏。
- 判断等价变异前检查夹具值。`idiv(5,5)` 与 `idiv(5,4)` 都为 1，是特定输入下的等价情况（#343）；测试从未设置 `mark:3`，而状态 2 和 3 均可达，则是覆盖不足（#347）。

CI 引擎安装使用 `~/.era-engine/app.asar`，不能只通过环境变量提供路径。M374 会移除 `ERE_ENGINE_ASAR === 'none'` 的禁用逻辑；只有默认路径存在引擎时，测试才能发现禁用逻辑失效。#302 的早期配置没有默认路径，导致该变异未被检测到。

所有测试命令都必须有超时。Windows 使用 npm 命令或 `tools/run-node.mjs`；Linux 可另用 `bash tools/capped.sh` 限制 CPU。命令和中断后的处理见 [Windows 开发指南](../windows-development.md)。

#### 验收结果异常时的排查

输出比对、快照、抽样变异和普通测试应顺序执行，尤其不能与修改当前工作区的串行变异同时运行。#212 曾因此将 57/107 误报为 54/112；#350 的六处抽样也曾全部报告检测成功，单独重跑后实际只有三处。若运行后文件未还原，且连续查看时差异文件不同，先排除其他进程正在修改源码；本轮结果作废，结束冲突任务后重新验证。使用任务本身的等待接口，不另写进程名轮询。

`--jobs` 使用隔离副本。若日志显示 `拦截 0 / 跳过 0 / 红 1` 和“副本 N 对照运行即红”，说明尚未应用变异，对照测试已失败。查找 `✖ failing tests:` 下的用例，在 master 单独重现；确认是既有问题后记录 Issue，再运行当前工单的变异，不直接归因于新实现。

间歇性失败优先用确定性条件复现，例如固定相关随机源。#195 固定 `Math.random` 为 0 后，master 有 3 条失败，修复版只剩 1 条有意保留的假阳性。临时诊断修改须在验证后还原，并保留工作区原有改动。

仅重复运行不能证明低概率缺陷已修复：失败率为 1% 时，连续 30 次通过的概率仍约 74%。若已定位随机源并算出失败率，可以将重复运行作为证据，但报告必须包含概率依据。#344 修复前失败率为 `1 − 0.9⁵ = 41%`；修复后 15 次通过，若缺陷仍在，出现这一结果的概率约为 `0.59¹⁵ = 0.02%`。

### 十二项验收判据

1. **要求测试覆盖的行为必须通过实际变异验证。** 修改规则后，相关测试应失败。早期验证发现过三类无效断言：前置校验与缺失分支结果相同（#21）、两分支在测试数据中结果相同（#24）、表征测试无法检测被测行为变化（#20）。#10 也曾在测试通过时丢失关键规则。

   多个提前返回条件要分别验证：将其余前置条件设为满足，再单独改变目标条件。否则删掉一个 `return 0`，下一个仍返回 0，测试无法区分（#227，M1330/M1341）。

   检查所有带随机源参数的调用，显式传入 `seq([...])` 等确定性实现。#344 的 `dungeon_shop_itemsell(1)` 漏传后，内部 `SELL_EX_ITEM` 的五次随机可能写入 `CFLAG:580`，破坏“资金不足”的测试前提。应检查调用参数，不只重复运行。

   变异应针对可观察的行为；若大量无关用例同时失败，检查测试耦合。若没有用例失败，确认是覆盖不足还是等价变异。

2. **给既有变异增加测试文件后，单独验证新文件。** `mutation-check` 只要求 `tests` 中至少一个文件失败且输出包含 `must_mention`；旧测试失败可能掩盖新测试无效。应用同一变异，只运行新增文件。#120 的端到端测试通过 M2101、M188、M220 分别验证；M2101 在 #295 去重前为 M157。

3. **`must_mention` 必须匹配实际失败输出。** 执行相关 `--ids` 或 `--files <目标文件>` 后再确定标记，不能只根据源码猜测。
   - 使用明确的断言消息：`assert.ok(value, message)` 的消息是第二参，`assert.equal(actual, expected, message)` 的消息是第三参。游戏台词未必出现在失败输出中；多行表达式也可能只显示第一行（#227/#239）。
   - 若代码在断言前抛错，用可定位该失败的测试名或错误消息（#230）。
   - 输出中的 ANSI 转义可能中断字面匹配，不依赖带颜色的值。
   - 标记应能区分目标断言，检查它是否在测试文件中重复出现。
   - 不使用会随语料变化的字符作为标记；#236 的 M370 曾因“贖”加入归一表后不再报出而失配。

4. **变异位置必须能产生可观察差异。** #231 的 M1985 修改 `TFLAG:13==998`，但对应原作只输出空 `PRINTFORMW`，因此无法验证所声称的行为。`--verify` 只检查结构，无法发现这一问题。

5. **一次性迁移数据只在迁移时核对。** #290 拆分引用表时使用 `24162 / 24303 / 432` 验证数量等价；将会正常增长的数量保留为永久断言，会阻止后续移植（#236）。长期测试应验证结构约束，例如引用数大于 0、ERB 引用数不少于内联引用数、豁免数只减不增。

6. **新增校验机制必须能重现并检测真实缺陷。** #130 的按钮白名单通过移除 `page-main-menu.js` 的 `[109]` 重现 #129：此前测试不失败，改进后 6 条失败。

   校验器的测试样本要独立于实现清单。#212 从同一清单生成样本，删除一个类别时样本也消失，测试仍通过。应维护独立期望清单，先比较集合，再按期望清单生成输入；删除实现清单中的一项时，测试必须失败。

7. **引擎行为直接用引擎代码验证。** 通过 `test/helpers/engine-bundle.js` 加载解析器和 API 方法，避免在测试中重写一份逻辑（#17）。夹具记录调用不能证明引擎接受了参数：`addCharacter` 对不存在的预设返回 false（#21/#22）；`input()` 只接受已显示按钮的快捷键，曾导致 #129 的侵略入口不可达。

8. **检查原作引用和有意保留的行为。** 文件头必须指向 `target/` 中实际存在的文件和函数。新发现的原作缺陷登记到 #14，尽可能用反向变异验证“按原作保留”的约定（#116，M214/M218），不能在移植中擅自修正。

9. **批量替换变量访问时，逐项验证寻址等价。** 建立“门面字段 → 地址”映射，将 diff 中删除和新增的访问转换为 `表:下标` 多重集，比较地址及出现次数。输出样本只覆盖部分分支，无法替代此检查；#90 的 57 处跨域写入中抽改 10 处，输出比对未检测到任何一处，单元测试只检测到 3 处。合并前使用迁移前后的代码验证；不要等已完成条目从 `tools/domain-ledger.mjs` 等清单移除后才整理证据。

10. **破坏存档兼容性时同步更新版本。** 若同一地址在旧存档中的值不再符合新语义，须同时更新 `yml/GameBase.yml` 的【版本】和【最低支持版本】，保持两者相等，并更新【版本代号】。具体判据见 `docs/adr/0006-save-compatibility-not-guaranteed.md`。

    常见情况包括扩展角色表结构变化、`yml/Chara*.yml` 预设变化和已有下标含义变化。普通表新增下标或整张表、且引擎补入的 0 是正确初值时，不属于破坏性改动；不能将此例外套用于扩展角色表。语义兼容性由人工按 ADR 判断，不用只检查字段数量的工具代替。

11. **测试必须适用于隔离副本。** `COPY_DENY` 排除 `.git` 和 `node_modules`；CI 的 `engine`、`mutation` 任务也不安装依赖。测试不能无条件调用外部 `prettier` 或 `git ls-files`（#299）。

    验证解析行为时，直接提供固定输入，外部工具是否生成该输入另行检查；验证仓库状态时，先通过 `git rev-parse --is-inside-work-tree` 等方式确认环境。按现有约定，不适用的环境检查使用 `return`，不用 `t.skip()`；有引擎测试的跳过基线必须为 0（#302）。

12. **差异归因只能解释已批准的行为差异。** `tools/compare/rules.js` 可以记录引擎交互形式或 #60 简体转换造成的差异，不能隐藏移植缺陷。#338 曾把缺少货币符号 `$` 归为显示差异，正确处理是修复代码。

    覆盖整段行号的规则须单独检查：该段参与比对的条目确实都属于相应未实现功能；已实现输出必须排除，并有测试确认其缺失会进入 `unexplained`。装饰行已在归一化阶段移除，不能按原始行数估算覆盖范围。#338 的 ABILITY_UP 规则采用了这两项检查。

### 验收中发现的小问题

文档笔误、失准的计数注释、过宽的 `must_mention`、未使用参数等，不改变产品行为且无需设计判断的事项，可在同一分支单独提交，并在工单注明“验收时修复”。会改变产品行为或需要设计判断的事项另建 Issue，例如主菜单入口缺失（#129）和夹具校验缺失（#130）。

## 5.5 同步 master 与解决冲突

分支落后前置工单时，先同步再验收。持续时间较长的工单，应在任务说明中要求实施 agent 主动同步一次 master：实现者更了解注册方式和调用关系。#231 曾有 23 个注册点需要调整；#239 继续使用旧适配器后，`P` 恒为 0，NTR 口上不输出，而两边测试仍通过。

提交较多时使用 `git merge origin/master`，避免 rebase 逐个提交重复解决同一冲突（#229 有 19 个提交）。操作前更新远端引用。

具体处理见 `docs/agents/merge-conflicts.md`：公共计数重新测量、登记表按键合并、生成文件先合源数据再生成，并检查 Git 未报告冲突的逻辑错误。

## 5.6 T4 阶段验收（每个阶段结束时运行一次）

在路线图 #101 的阶段决策 Issue 关闭前完成，不要求每张实施工单重复运行：

1. **带引擎的全量变异测试**：`node tools/run-node.mjs --timeout 5400 -- tools/mutation-check.mjs --jobs 4`。全部变异都应被检测到，跳过数和失败条目数均为 0。也可手动触发 `workflow_dispatch`，详见 AGENTS.md 的 CI 说明。
2. **引擎运行验收**：在主工作目录启动游戏，完成该阶段的端到端流程。可用 GUI 手工操作，或用已配置的 Electron MCP 工具 `launch_game`、`click`、`type`、`read_text`、`screenshot`。根目录 `.mcp.json` 的配置原用于 Claude Code；其他客户端是否可用，以当前工具配置为准。
3. **全部样本输出比对**：按 `tools/compare/samples.js` 中的样本逐个运行 `node tools/compare/cli.js --sample <名>`。单张工单验收只需运行受影响样本，见 §5。

全量变异用于发现其他模块的变化是否让旧测试失效。阶段 5a 曾发现 `test/dungeon-trap.test.js` 只断言 `CFLAG:502 = 1`；MAGIC 实现后，`dungeon.js:678` 也会写入 1，删除陷阱 TELEPORT 路径仍能通过。只执行当前工单新增 `--ids` 无法发现这种旧测试失效。

根据日志区分两类失败：`红=false` 表示测试未检测到变异，须检查覆盖；`红=true 命中=false` 表示测试失败，但 `must_mention` 未匹配输出。后一类常见于测试改名或合并，仍须确认实际失败对应目标断言。若一条用例覆盖多个维度，为断言增加包含循环变量的消息，不能只用同一个测试名匹配全部维度。

列出引擎验收路径前，先用 `rg -n stub_line_wait ere/page/page-shop.js` 检查入口是否实现。阶段 5a 的部分逻辑虽已完成，主菜单中的处刑、迎击、能力提升、购物、怪物商店和休息仍是存根，无法从这些入口验收；当时推进日期须经调教后的 AFTERTRAIN → TURNEND。按实际可达流程准备步骤。

**验收从新游戏开始。** 按 ADR-0006，破坏性改动会提高【最低支持版本】，旧 `saveN.sav` 因版本过低被拒绝属于预期行为。需要清理验收存档时，先确认它们是可删除的测试数据。`global.sav` 的规则不同：游戏标识不符会拒绝启动，版本过低则自动重置，不能与普通测试存档一起删除。

模拟无引擎环境时，`--asar none` 只影响变异检查的父进程，还必须给子进程设置 `ERE_ENGINE_ASAR=none`：

```powershell
$previousAsar = $env:ERE_ENGINE_ASAR
try {
    $env:ERE_ENGINE_ASAR = 'none'
    node tools/run-node.mjs --timeout 5400 -- tools/mutation-check.mjs --asar none --jobs 2
} finally {
    $env:ERE_ENGINE_ASAR = $previousAsar
}
```

## 6. 合并后的清理与确认

在工作流已授权创建 PR 和合并时，依次执行：

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file <正文文件>
gh pr merge <pr> --repo odradekk/maou_redux --merge --delete-branch
git -C D:/Code/era pull --prune --ff-only origin master
git -C D:/Code/era branch -d <branch>
archive_workspace{workspaceId: "<当前工单的 workspaceId>"}
gh issue comment <n> --repo odradekk/maou_redux --body-file <验收记录文件>
```

- 纯文档改动通过本地 Prettier 检查后，可按既有流程合并，无需等待 CI；其他改动须检查 PR 结果。
- PR 正文以 `Closes #<n>` 结尾，合并后自动关闭工单。仍需另写验收记录，说明交付内容、验证方法、取舍和后续注意事项。
- **合并后检查 master push**：`gh run list --repo odradekk/maou_redux --branch master --limit 1 --json conclusion,headSha`。核对提交哈希和结果，不能把 PR 通过视作合并后验证完成。#348、#339、#397 曾在合并后连续失败而未及时处理。
- 修改 `.github/workflows/` 被远端拒绝时，用 `gh auth status` 核对当前凭据和环境变量覆盖，不沿用 Fedora 的 token 配置或 `env -u GITHUB_TOKEN` 命令。
- 更新主工作目录后再创建后续工单。归档前确认提交已推送、验收证据已保存、没有需要保留的未提交文件；当前 `paseo.json` 没有 `teardown` 备份步骤。
- `deleteBranchOnMerge` 为 false，远端分支由 `--delete-branch` 删除；跟踪引用需要 `--prune`。远端删除可能晚于紧接着的 pull，若最后检查仍有引用，再运行 `git fetch --prune origin`。

结束前确认以下状态：

```
gh issue view <n> --repo odradekk/maou_redux --json state -q .state  # CLOSED
gh pr view <pr> --repo odradekk/maou_redux --json state -q .state    # MERGED
git ls-remote --heads origin "<branch>"                             # 无结果
git -C D:/Code/era branch -a --list "<branch>" "remotes/origin/<branch>"  # 无结果
git -C D:/Code/era worktree list                                  # 无当前工单的 worktree
```

需要合并后启动引擎验证时，在主工作目录执行。实施 agent 应提供可复现的准备步骤、入口和预期结果，验收者完成后在 Issue 记录结果。临时设置的状态不得提交；只撤销本次验收修改，保留原有改动。临时状态可能使 `test/event-first.test.js` 的 `expected_init_writes` 断言失败，这是准备方式造成的，不应修改测试来接受它。

## 7. 记录决策

发现既有决策不成立时，先在对应 Issue 补充证据与修正结论，再继续实施（例如 #3 被 #6 修正）。索引 issue #1 保持只读，不改写历史。
