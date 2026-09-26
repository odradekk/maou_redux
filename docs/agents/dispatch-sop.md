# 工单分配与验收流程（主 agent 读）

本文写给分配任务、验收并合并的主 agent。执行工单的 worker 读 `worker-sop.md`。一张工单对应一个 Paseo worktree 和一个 agent 会话；优先使用 Paseo MCP，没有对应操作时用 CLI。本文的远端写入、合并和归档步骤是已获授权的工作流：验收通过且 CI 绿即合并，不逐个 PR 请示；仍须遵守当前会话的权限范围。

工单位于 GitHub 的 `odradekk/maou_redux`，操作约定见 `issue-tracker.md`。移植决策索引 #1 只读。路线图 #101 规定阶段顺序：其子 issue 记录阶段决策，实施 issue 归入各阶段的子路线图。阻塞关系以 GitHub 的 `issue_dependencies_summary.blocked_by` 为准。

## 0. 环境前提

- **服务状态**：`paseo daemon status --json` 确认服务可用。
- **可用工具**：MCP 的 `create_workspace`、`create_agent`、`list_agents`、`get_agent_status`、`send_agent_prompt`、`archive_workspace`。CLI 路径 Windows 用 `Get-Command paseo`、Linux 用 `command -v paseo` 查询；子命令以 `paseo --help` 为准。
- **provider 与 profile**：可用性会变，分配前先 `list_providers` 和 `list_profiles`，把 profile 的 provider、model、modeId、thinkingOptionId 原样填进 `create_agent`，不手写模式名（claude 侧是 `bypassPermissions`，codebuddy-code 侧是 `fullAccess`，传错在创建阶段直接报错）。
- **工作区管理**：由 Paseo 创建和归档 worktree。`archive_workspace` 会执行 `paseo.json` 的 `teardown`、删除工作目录、清除 Git worktree 注册并归档其中的 agent。
- **起始分支**：`baseBranch` 用 `origin/master`。`worktree.setup` 执行 `npm ci`，创建返回后确认依赖已安装。不向新工作区复制 `ere.config.json`。
- **待处理权限**：用 `list_pending_permissions` 检查，不根据终端是否安静推测。

主工作目录是 `D:/Code/era`，所有 worktree 从此创建，合并后的引擎验收也在此执行。

## 1. 选择并认领 issue

选择状态 `open`、全部阻塞 issue 已关闭、且没有 assignee 的工单，按编号顺序处理：

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是第一次远端写入，先认领再分配，避免两个会话重复工作。

## 2. 并发限制与创建时机

先检查 master 的 CI：`gh run list --repo odradekk/maou_redux --branch master --limit 1`。失败时查任务是否分配到 runner、执行了哪些步骤：

```
gh api repos/odradekk/maou_redux/actions/runs/<id>/jobs --jq '.jobs[]|{name,conclusion,runner_name,steps:(.steps|length)}'
```

没有步骤且 `runner_name` 为空时先查权限、排队、配额和取消原因；不要仅凭运行状态把失败归因于代码。CI 因运行环境问题无法验证时，本地补跑本次 CI 未执行的全量测试和静态检查；无引擎检查在全新克隆里跑，显式设置 `ERE_ENGINE_ASAR=none`。

同时最多处理 5 张 issue。创建前统计 `running` 和 `idle` agent，不计主工作目录的 local 工作区。

**`list_agents` 不带 `cwd` 时只返回调用方自己那个目录里的 agent，看不见任何 worktree 工作区。** 主 agent 在 `D:\Code\era` 里调用，返回的就只有主 agent 自己——所有 worker 都在 `C:\Users\s1n19\.paseo\worktrees\…` 下，一个都不出现。所以统计并发数和巡检状态时，**必须先 `list_workspaces` 拿到全部 `cwd`，再逐个 `list_agents{cwd}`**：

```
list_workspaces                                   # 取每个工作区的 cwd
list_agents{cwd: "<工作区 cwd>", sinceHours: 24}  # 逐个查
```

同理，`get_agent_status` 只认完整 UUID，传 `list_agents` 输出里那个 7 位 `shortId` 会返回 `Agent <id> not found`——**这个报错读起来像「agent 已经没了」，实际只是 id 形式不对**。

这两条合起来制造过一次真实事故（2026-09-22，#530／#532）：巡检时不带 `cwd` 调 `list_agents` 只看到主 agent，又用 shortId 调 `get_agent_status` 收到 not found，据此判定两位 worker 的进程都已消失，于是在两个工作区各起了一位「接手」的 agent。实际上原 worker 一直在跑，两个工作区同时有两个写者；#532 那边新起的 agent 跑了几轮 `mutation-check --ids`（会就地改源文件），并把当时工作树的全部改动提交成了一个原 worker 没打算打的提交。**判断一位 worker 是否还活着，看的是它工作区 `cwd` 下的 `list_agents` 输出，外加工作树文件的 mtime 是否还在变；不看不带 `cwd` 的列表，也不看 shortId 查出来的 not found。**

**有前置依赖，或会修改相邻公共位置的工单，按「验收、合并、再创建后续工作区」的顺序处理。** #115/#117/#118/#119 提前创建后在公共计数和登记表处重复冲突。无依赖且修改位置不相邻的可以并行。创建前检查以下隐含依赖：

| 情况                 | 检查内容                                                         | 处理方式与案例                                                                                            |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 使其他工单的测试失败 | 修复是否超出当前工单范围？                                       | 串行处理。#130 的按钮校验拒绝了 #117/#118/#120 使用的 `109`，而按钮由 #129 实现。                         |
| 新实现尚无调用入口   | 是否要替换尚未合并的存根？                                       | 等前置工作合并。#184 依赖 #172 的 `DUNGEON_BITCH`，提前创建时 `ere/dungeon/` 尚不存在。                   |
| 重复创建存根         | 是否有其他工单调用同一个未实现函数？                             | 在提示词中指定由哪张工单创建，其余复用。#177/#178 曾分别为 `@SELL_EX_ITEM` 创建不同签名的存根。           |
| 验收计数互相影响     | 输出比对、变异 `COUNT`、跳过数或端到端天数是否会被其他工单修改？ | 各分支验证自身结果，合并后统一重测。#212 的输出变化使 #211b 的基线从 `537/176/2549` 变为 `552/176/2536`。 |

检查重复存根时，用 `rg -o --no-filename 'CALL [A-Z_0-9]+' <源ERB文件>` 提取调用，再与当前工单、`ere/` 和并行工单的函数列表比较。验收新模块时用 `rg '<新模块名>' ere/ test/` 确认生产代码存在调用；仅测试引用不算接入。

## 3. 创建工作区与 agent

```
create_workspace{
  isolation: "worktree",
  mode: "branch-off",
  branchName: "t<N>-<slug>",
  baseBranch: "origin/master",
  worktreeSlug: "t<N>-<slug>"
}
create_agent{
  title: "T<N> <标题>",
  provider: "<profile 的 provider/model>",
  workspaceId: "<workspaceId>",
  settings: { modeId: "<profile 的 modeId>", thinkingOptionId: "<profile 的 thinkingOptionId>" },
  initialPrompt: "<提示词>",
  notifyOnFinish: true
}
rename_workspace{workspaceId: "<workspaceId>", title: "T<N> <标题>"}
```

`create_workspace` 偶尔报「Timeout waiting for message」但已成功，重试前先 `list_workspaces` 核对，避免建出重复工作区。

### profile 选用

| 用途                     | provider / model                           |
| ------------------------ | ------------------------------------------ |
| 全部实施工单             | `codebuddy-code` / `deepseek-v4.1-flash`   |
| 审查（由 worker 自己起） | worker 自身内置的子 agent 工具，不指定模型 |

阶段 5c 的十余张票（含 ABLUP 两千行的逻辑移植、战役全链、口上跨模块改动）全部由 `codebuddy-code` / `deepseek-v4.1-flash` 完成并通过验收，**不再按工单复杂度分配不同 profile**。

**`pi` / `cpa/glm-5.3` 只派不接触游戏文本的工单。** 它对本作的口上与调教文本触发内容过滤并整轮中止（`stopReason=error`）：#517 读 `COMF_JUMP.ERB` 的 CASE 分支时当场断掉，换 Flash 才跑完。工具、测试基础设施、变异条目一类的票（#513/#520/#521）它做得很好。

`list_profiles` 里有三个 profile 都叫 `Worker`（`pi/cpa/glm-5.3`、`cursor/grok-4.6`、`claude/claude-sonnet-5[1m]`），按名字取会撞上；要用别的 profile 就照 `provider`/`model` 取，别按名字。

返工两轮仍不过由主 agent 接手，不升级 profile。

### 提示词

`initialPrompt` 直接收多行文本，不写文件，不以 `/implement` 开头。工单内容以 issue 为准，提示词只放固定开场和这张工单特有的注意事项：

```
工单 #<N>：<标题>
先读 docs/agents/worker-sop.md，按它的流程执行；工单正文与验收清单用 gh issue view <N> 读取。
父工单与测试策略：#<父工单>；开始前阅读的决策：#<a>、#<b>。

<三到五条已验证、重新查证成本较高的事实，附依据>
<本工单特有的注意事项：Blocked by、须先合并的 PR、由哪张工单创建哪个存根>

变异条目编号区间：M<k+1>–M<k+w>（并行工单已用 M<x>–M<y>）。当前无引擎跳过基线：<m>。
提交 scope：<scope>。

完成标准：先写测试再实现；/code-review 的审查子 agent 用你自身内置的子 agent 工具起，不指定模型；
自己开 PR 并等 CI 全绿；在 issue 下按 worker-sop.md §7 写完成评论。不合并 PR。
```

分配编号前读取当前跳过基线和已用编号，并核对尚未合并工单已分配的区间：

```powershell
Get-Content test/engine-skip-baseline.txt
rg -o --no-filename '\bM[0-9]+\b' tools/mutations | Sort-Object -Unique
```

涉及十个以上函数时至少预留 40 个编号；编号不要求连续。把本工单尚未解决的设计问题留给实施者，并要求在 issue 记录依据。

### 挂完成通知

`create_agent` 的 `notifyOnFinish` 默认开启，会在 agent 结束、出错或等待权限时通知。CLI 派发时紧跟一条后台 `paseo agent wait <agentId>`。**agent 转 idle 不等于完成**：收到通知后核对 issue 下有没有完成评论、PR 是否已开且 CI 绿；没有就再挂一次等待。

## 4. 跟进

```
get_agent_status{agentId}     # agentId 必须是完整 UUID，shortId 会报 not found
get_agent_activity{agentId}
send_agent_prompt{agentId, prompt: "<追加说明>", background: true}
```

`get_agent_activity` 的输出可能有十万字符量级、超出单次工具返回上限，会被存成文件让你分块读。真正要判断的通常只是「它还在不在动、动的是哪几个文件」，这两件事查工作树文件的 mtime 更省事，不必去读那份活动记录。

追加说明前先看活动，避免要求重复已完成的步骤。提示词与原作冲突时重新核对原文再修正要求：#222 的 `PREVCOM === 8` 与原作 `SELECTCOM = 84` 不符；#251 的 `EX_FLAG` 写入与 `EX_TALENT` 读取是原作的双变量结构，不能仅凭名称不同认定缺陷。

## 5. 验收

worker 的完成评论（PR 链接、本地验证、CI 链接、偏差、审查结论）是验收的输入。报告中的事实必须回到原始资料核实；CI 只能证明检查结果，不能验证报告叙述（#143 曾把文档问题错误归因于 `printWholeImage`）。

### 验收清单

1. 读 PR diff 全文。
2. 核对完成评论五项齐全，CI 运行链接对应 PR 最新提交且全绿。
3. 本机实际执行 `mutation-check --ids <本工单新增编号>`，不能用 `--verify` 代替。
4. 对照工单验收清单逐条核对；要求「此行为有测试」的条目须经实际变异验证。
5. 改游戏逻辑的工单另做**独立抽样变异**：验收方另选 3 处生产代码，避开已有条目 `desc` 描述的位置，优先大函数中缺少断言的分支；每轮返工后换新位置并确认上一轮问题已修（#346）。串行修改、运行、还原，同一工作区不得同时跑其他修改源码的任务；定位串必须只命中一次，否则报「未成功修改，结果无效」。判断等价变异前检查夹具值（#343 的 `idiv(5,5)` 与 `idiv(5,4)` 都为 1 是特定输入下的等价；#347 的 `mark:3` 从未设置而状态 2、3 均可达，是覆盖不足）。
6. 对照附录的验收参考核对新增校验机制、`must_mention`、引擎行为验证、存档兼容等项。

不再本机重跑 `npm test`：PR 的 CI 已跑过全库。

### 验收结果异常时的排查

输出比对、抽样变异和普通测试顺序执行，不与修改当前工作区的串行变异同时运行（#212 因此把 57/107 误报为 54/112；#350 的六处抽样单独重跑后只有三处成立）。若运行后文件未还原且连续查看时差异文件不同，先排除其他进程正在修改源码；本轮结果作废。用任务自身的等待接口，不另写进程名轮询。

`--jobs` 使用隔离副本。日志显示「拦截 0 / 跳过 0 / 红 1」和「副本 N 对照运行即红」时，是尚未应用变异、对照测试已失败：在 master 单独重现，确认是既有问题后记录 issue，不直接归因于新实现。

间歇性失败优先用确定性条件复现（#195 固定 `Math.random`）。仅重复运行不能证明低概率缺陷已修复：失败率 1% 时连续 30 次通过的概率仍约 74%；已定位随机源并算出失败率时，重复运行才可作为证据，报告须含概率依据。诊断手段改变被测系统时，「加了仪器就不复现」本身就是证据，要把仪器当变量逐个撤掉（#449）。

### 验收评论

通过与否都在 issue 下留一条评论，同一模板：

```
## 验收

- [x] PR diff 已读
- [x] 完成评论五项齐全，CI <运行链接> 全绿
- [x] --ids M<..>–M<..> 实跑：拦截 <n> / 跳过 0 / 红 0
- [x] 工单验收清单逐条核对
- [x] 独立抽样变异 <3/3 拦截 | 不适用>
- [x] 输出比对 / 锚点质量 <结果 | 不适用>

结论：通过，已合并 <提交号>。
（不通过时：结论：返工。问题列表：1. … 2. …）
```

### 小问题直接修，大问题返工

**小问题**（不改设计、不新增文件、改动在一两处、不需要重跑 worker 的完整验证）由主 agent 直接修：在主工作目录用临时 worktree 检出该分支，改完提交推送、删除临时 worktree，在 PR 里留一条评论说明改了什么。文档笔误、失准的计数注释、过宽的 `must_mention`、未使用参数都属此类。

**大问题**：在 issue 下写验收评论（返工），再 `send_agent_prompt` 把评论链接发给原 worker。worker 存活到 PR 合并为止。返工上限两轮，超过由主 agent 接手并在 issue 里说明。会改变产品行为或需要设计判断的事项另建 issue（如 #129、#130）。

### 合并与清理

验收通过且 CI 绿后依次执行：

```
gh pr merge <pr> --repo odradekk/maou_redux --merge --delete-branch
git -C D:/Code/era pull --prune --ff-only origin master
git -C D:/Code/era branch -d <branch>
archive_workspace{workspaceId: "<当前工单的 workspaceId>"}
```

- 用 merge commit，保留 worker 的提交历史。PR 正文的 `Closes #<n>` 会在合并后自动关闭工单。
- **合并后检查 master push**：`gh run list --repo odradekk/maou_redux --branch master --limit 1 --json conclusion,headSha`，核对提交哈希和结果（#348、#339、#397 曾在合并后连续失败而未及时处理）。连续合并多个 PR 后，中间提交不一定各有一次完整结果；最终提交失败时检查自上次通过以来的全部合并。
- 修改 `.github/workflows/` 被远端拒绝时，用 `gh auth status` 核对当前凭据。
- 归档前确认提交已推送、验收证据已写进 issue；`paseo.json` 没有 `teardown` 备份步骤。远端分支删除可能晚于紧接着的 pull，最后仍有引用时再 `git fetch --prune origin`。

结束前确认：

```
gh issue view <n> --repo odradekk/maou_redux --json state -q .state  # CLOSED
gh pr view <pr> --repo odradekk/maou_redux --json state -q .state    # MERGED
git ls-remote --heads origin "<branch>"                             # 无结果
git -C D:/Code/era worktree list                                    # 无当前工单的 worktree
```

## 6. 阶段验收

在路线图 #101 的阶段决策 issue 关闭前完成一次，不要求每张实施工单重复：

1. **全量变异测试**：开阶段收尾 PR（承载阶段本来要做的文档改动，如 AGENTS.md「当前状态」；没有改动就用空提交），打 `phase-acceptance` 标签，`mutation.yml` 分 12 片在 CI 运行。合格线是每片退出码 0，汇总任务的 job summary 给出「拦截 / 跳过 / 红」合计，把数字写进 #101。本机也可 `node tools/run-node.mjs --timeout 14400 -- tools/mutation-check.mjs --jobs 2`，但 7029 条时实测约 3.6 小时，优先走 CI。
2. **引擎实际运行**：在主工作目录用 Electron MCP 工具（`launch_game`、`click`、`type`、`read_text`、`screenshot`、`get_errors`）走完该阶段的端到端流程。从新游戏开始；按 ADR-0006，旧存档因版本过低被拒绝属预期。临时设置的状态不得提交。列出验收路径前先核对入口在源码里已接线（按钮渲染与分发分支同名同号）。
3. **九份输出比对样本**：已随每次 PR 与 master push 的 `engine` 任务运行，阶段验收只需核对 master 最近一次运行为绿。

全量变异用于发现其他模块的变化让旧测试失效：阶段 5a 的 `test/dungeon-trap.test.js` 只断言 `CFLAG:502 = 1`，MAGIC 实现后 `dungeon.js:678` 也写 1，删除陷阱 TELEPORT 路径仍能通过；5b 结束后补跑发现 15 条失守（#438–#443）。单票的 `--ids` 发现不了这一类。日志里 `红=false` 是测试未检测到变异，须查覆盖；`红=true 命中=false` 是测试失败但 `must_mention` 未匹配，须确认实际失败对应目标断言。

模拟无引擎环境时，`--asar none` 只影响父进程，还必须给子进程设置 `ERE_ENGINE_ASAR=none`：

```powershell
$previousAsar = $env:ERE_ENGINE_ASAR
try {
    $env:ERE_ENGINE_ASAR = 'none'
    node tools/run-node.mjs --timeout 5400 -- tools/mutation-check.mjs --asar none --jobs 2
} finally {
    $env:ERE_ENGINE_ASAR = $previousAsar
}
```

## 7. 记录决策

发现既有决策不成立时，先在对应 issue 补充证据与修正结论，再继续实施（#3 被 #6 修正）。索引 #1 保持只读。

## 附录：验收参考

每条都来自实际事故，验收清单第 7 项按此核对。

1. **要求测试覆盖的行为必须通过实际变异验证。** 早期发现过三类无效断言：前置校验与缺失分支结果相同（#21）、两分支在测试数据中结果相同（#24）、表征测试无法检测被测行为变化（#20）。多个提前返回条件要分别验证：其余前置条件设为满足，再单独改变目标条件，否则删掉一个 `return 0` 下一个仍返回 0（#227，M1330/M1341）。带随机源参数的调用显式传入 `seq([...])`（#344）。若大量无关用例同时失败，检查测试耦合；若没有用例失败，确认是覆盖不足还是等价变异。
2. **给既有变异增加测试文件后，单独验证新文件。** `mutation-check` 只要求 `tests` 中至少一个文件失败且输出包含 `must_mention`，旧测试失败可能掩盖新测试无效（#120 的 M2101、M188、M220）。
3. **`must_mention` 必须匹配实际失败输出。** 用明确的断言消息（`assert.ok` 第二参、`assert.equal` 第三参）；代码在断言前抛错时用能定位该失败的测试名或错误消息（#230）；不依赖带 ANSI 颜色的值；标记要能区分目标断言；不用会随语料变化的字符（#236 的 M370）。`npm test` 里的第五项结构检查会拦截标记与声明出处脱节的情况（#442），但只能查出处存在，不能查语义。
4. **变异位置必须能产生可观察差异。** #231 的 M1985 修改 `TFLAG:13==998`，对应原作只输出空 `PRINTFORMW`，无法验证。
5. **一次性迁移数据只在迁移时核对。** 会正常增长的数量不能保留为永久断言（#236）；长期测试验证结构约束，如引用数大于 0、豁免数只减不增。
6. **新增校验机制必须能重现并检测真实缺陷。** #130 通过移除 `[109]` 重现 #129。校验器的测试样本要独立于实现清单（#212）：维护独立期望清单，删除实现清单中的一项时测试必须失败。
7. **引擎行为直接用引擎代码验证。** 通过 `test/helpers/engine-bundle.js` 加载解析器和 API 方法（#17）。夹具记录调用不能证明引擎接受了参数：`addCharacter` 对不存在的预设返回 false（#21/#22）；`input()` 只接受已显示按钮的快捷键（#129）。
8. **检查有意保留的行为。** 有意保留的行为（如输出对齐的 NBSP 补位 #577）须有注释写明玩家可见的表现和保留理由，并有测试守住，避免被当成缺陷改回去。
9. **批量替换变量访问时，逐项验证寻址等价。** 建立「门面字段 → 地址」映射，把 diff 中删除和新增的访问转成 `表:下标` 多重集比较。#90 的 57 处跨域写入中抽改 10 处，输出比对未检测到任何一处，单元测试只检测到 3 处。
10. **破坏存档兼容性时同步更新版本。** 同一地址在旧存档中的值不再符合新语义时，同时更新 `yml/GameBase.yml` 的【版本】与【最低支持版本】（保持相等）和【版本代号】；判断标准见 `docs/adr/0006-save-compatibility-not-guaranteed.md`。普通表新增下标且引擎补入的 0 是正确初值时不属于破坏性改动；扩展角色表不适用此例外。
11. **测试必须适用于隔离副本。** `COPY_DENY` 排除 `.git` 和 `node_modules`，CI 的 `engine` 任务不安装依赖。测试不能无条件调用外部 `prettier` 或 `git ls-files`（#299）；不适用的环境检查用 `return`，不用 `t.skip()`；有引擎测试的跳过基线必须为 0（#302）。
