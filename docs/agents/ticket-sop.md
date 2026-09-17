# 工单流程 SOP

一张工单 = 一个 Paseo worktree 工作区 = 一个 agent 会话，全程用 Paseo MCP 工具（或等价 CLI）驱动。

工单在 GitHub Issues（`odradekk/maou_redux`），命令约定见 `issue-tracker.md`；移植决议的索引见地图 issue #1（只读）。

**当前的票序索引是路线图 issue #101**（「移植路线图：十八个子系统到可通关的完整游戏」）。它的子票是**阶段决策票**，阻塞关系用 GitHub 原生依赖表达（`issue_dependencies_summary.blocked_by`）。**实施票不挂 #101**，挂各阶段自己的子地图——先例是 #42（第二条贯通路径，它自身带 `wayfinder:map`，八张 T 票是它的实施票）。没有子地图可挂的零散工作，按 `docs/stub-registry.md` 认领。

## 0. 环境前提

先读这几条。

- **daemon 是桌面版自管的**：`paseo daemon status --json` 确认在跑（本机 `desktopManaged: true`，监听 `127.0.0.1:6767`）。**派单会话本身就是 Paseo 注入 MCP 工具的 agent**，优先用 MCP 工具（`create_workspace` / `create_agent` / `list_agents` / `get_agent_status` / `archive_workspace` 等），不必走 CLI——返回结构化 JSON，不受 PATH、终端解析影响。
- **CLI 不在 PATH 上**：可执行文件在 `/opt/Paseo/resources/bin/paseo`。只在 MCP 没有对应物时才用它——目前只有 `paseo wait <agent-id> --timeout <秒>`（阻塞等一个 agent 跑完，比自己写轮询稳）。子命令随版本变，`paseo --help` / `paseo <cmd> --help` 现查，别凭记忆写。
- **worktree 归 Paseo 全权管理**，建与删各一步：
  - 建：`create_workspace{isolation:"worktree", mode:"branch-off", branchName, baseBranch:"origin/master", worktreeSlug}`，返回 `workspaceId` 与 `cwd`（worktree 实际路径）。
  - 删：`archive_workspace{workspaceId}`——**同时**跑 `paseo.json` 里的 `teardown`、删工作区目录、**归档这个工作区下的全部 agent**、清掉 git 层面的 worktree 注册（已实测 `git worktree list` 事后不再出现该条目）。「删 worktree 前先关终端，否则留下指向已删目录的终端」那类坑（#344）随之消失——不再是两步，是一步。
- **`baseBranch` 写 `origin/master`，不写 `master`**：Paseo 后台异步 fetch 远端引用，`origin/master` 总是新的；本地 `master` 是你上次 pull 到的那份。「建树前先 pull 基座」这一步因此不再必需，但基座仍要定期 pull（见 §6）。
- **`paseo.json` 放仓库根，进 git**（不再是 Orca Settings 里配的、CLI 写不了的钩子字段）。`worktree.setup` 现在是 `npm ci`。**Paseo 读的是目标分支已提交的版本，工作目录里的未提交改动不生效**——改 `paseo.json` 要先提交才有效。已实测：`create_workspace` 返回后 `node_modules` 已经就位。
- **不再复制 `ere.config.json` 进新 worktree**（原来靠 Orca 的 `.worktreeinclude`，随迁移一并移除）。引擎缺这个文件时默认无 `system.static` 键，从 `yml/` 起步——这本来就是正确状态；旧文档记的那个坑（基座那份一旦写着 `"static": "csv"` 就会传染给每一棵新树）随复制机制一起消失。
- **信任模式（mode）是 `create_agent` 的一等参数**，不必再固定带某个「批准」开关：实施票用免确认档（codebuddy 的 `fullAccess`、claude 系的 `bypassPermissions`、codex 的 `full-access`），研究与审查类只读票用带确认的默认档（`auto`/`default`）。各 provider 的档位名不同，`list_profiles` / `inspect_provider` 现查。
- **权限弹框不再靠读终端猜**：`list_pending_permissions` 直接列出所有 agent 的待批权限请求，非空才需要人管；`respond_to_permission{agentId, requestId, response}` 放行或拒绝。本次迁移的模拟验证（Worker、Researcher 各跑一轮真实任务）全程为空，判据可信。

### 只有一个 checkout

|          | 路径                                | Paseo 项目 id          |
| -------- | ----------------------------------- | ---------------------- |
| **基座** | `/home/odradek/Projects/maou_redux` | `prj_f402eb2ec666bbdd` |

**所有 agent worktree 从它建，引擎手工验收也在它上面做。** 派单会话本身运行在基座目录里，`create_workspace` 省略 `path` 时默认取当前目录，本来就是对的；跨目录派单才需要显式 `path`。项目 id 用于 `paseo project ls` 一类的交叉核对，不是 `create_workspace` 的必填参数。

## 1. 选票与认领

**可认领的第一张票** = `open` + 阻塞票全部已关闭 + 无 assignee，按编号序取第一个。

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是本次会话的第一次写操作，先认领再动手，并发会话才不会撞车。

## 2. 并发上限与派单时机

**先扫一眼 master CI**：`gh run list --repo odradekk/maou_redux --branch master --limit 1`。红着就先判类型，别把新票叠上去。

**判类型先看有没有 runner，别先查代码：**

```
gh api repos/odradekk/maou_redux/actions/runs/<id>/jobs \
  --jq '.jobs[]|{name,conclusion,runner_name,steps:(.steps|length)}'
```

**零步骤 + `runner_name` 为空 + 秒级失败 = 基础设施**（权限、被 `concurrency` 取消、runner 排队），与代码无关；有 runner 有步骤才去查代码。**配额已不是原因**——仓库自 #302 起公开，标准 runner 分钟数免费不限量；**取消才是**：`concurrency` 只对 PR 开 `cancel-in-progress`，连着合 PR 时旧的 master push 运行会被掐掉并记成 failure（#302 实测 40 次 push 事件里 11 cancelled、8 failure、0 成功，failure 的 job 都只跑了 3–4 秒）。两次连红都是有人为别的事顺手 `gh run list` 才撞见的（18 次 4 天：`ENGINE_SKIP_BASELINE` 差 1，真 bug；15 次 2 天：零 runner）。第二次照第一次的形态白查了一轮 eslint/prettier/裸克隆，**先看 runner 能省这一轮**。

CI 红期间 master 的绿红没有信息量，这比红本身危险：真回归也看不出来。**本地补信号要补到 §5.6 的阶段闸那一档**（不是每票的 T3）——CI 平时替我们跑的是无引擎那半边，它一停就没有别的执行点了（全量变异本来就在阶段闸上，见下表 T4）。engineless 那半边要在裸克隆里跑并显式 `ERE_ENGINE_ASAR=none`（回落会摸到 `~/.era-engine/` 的引擎）。

同时最多 5 个工单。派新单前先数一遍在跑的（不含基座那个 local 工作区）：

```
list_agents{statuses: ["running", "idle"]}
```

**建 worktree 的基线必须是当前 `master`，前置票没合并就别建。** 对无依赖的并行票同样成立：阶段 1 的 #115/#117/#118/#119 都提前建树，四张全部撞上 rebase，冲突面每次一样——就是 §5.5 表里那几处**全局计数字段与全局登记表**。顺序是「**验收 → 合并 → 再派下一张**」。

**判串行看「落点是否相邻」，不是「是否同一文件」。** D1–D6 的票面都写「都改 `era-fixture.js`，必须串行」，实测过宽：#151 落在 `:848`、#152 落在 `:974-1010`，相隔百余行，git 自己就合了。行级相邻的只有 §5.5 表里那几处。

**派单前找一遍暗耦合**——票据元数据上互不阻塞，代码上却互相牵扯。四种形态，各有一个判据：

| 形态         | 判据                                                 | 实例                                                                                                           |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **拦红对方** | 会不会让别的票的用例变红，而修复手段不在自己范围内？ | #130 加按钮白名单，#117/#118/#120 喂的 `109` 当场被拦，而那枚按钮归 #129——#130 在自己分支里弄不绿              |
| **接不上线** | 票面里有没有「换掉某张票留的存根」？                 | #184 要换 #172 留的 `DUNGEON_BITCH` 存根，建树时 `ere/dungeon/` 还不存在——交上来是「真身实现了但无人 require」 |
| **重复建桩** | 两张票会不会给同一个范围外函数各建一个存根？         | #177/#178 都调 `@SELL_EX_ITEM`，合并后一个无参版、一个带 cid 版，登记表两行                                    |
| **数字漂移** | 验收标准里有没有一个数字，由另一张在跑的票决定？     | #212 改 ere 侧输出，#211b 锁的对拍基线 `537/176/2549` 当场变 `552/176/2536`                                    |

**前两种必须串行**（自己分支里绿不了）；**后两种可以并行，但要在简报里说清**：

- 重复建桩——`grep -oP "CALL \K[A-Z_0-9]+" <源 ERB> | sort -u` 减去票面自己的函数名与 `ere/` 已有的，与在跑的票比对；撞上就指名「那个存根由 #N 建，等它合并后复用」。
- 数字漂移——对拍基线四数、变异分片的 `COUNT`、跳过数、端到端天数都属这一类。

**补救都在验收期**：接不上线查「真身有没有人调用」（`grep -rn "<新模块名>" ere/` 只剩测试引用就是没接上）；重复建桩不致命，两份都在登记表里，改名互相指认（「房间侧调用点」「城镇侧调用点」）比强行合并、为一个存根拉跨模块依赖要好。

## 3. 建 worktree 并派 agent

```
# 1. 建 worktree 工作区——用 origin/<默认分支> 而非本地分支名，理由见 §0
create_workspace{
  isolation: "worktree",
  mode: "branch-off",
  branchName: "t<N>-<slug>",
  baseBranch: "origin/master",
  worktreeSlug: "t<N>-<slug>"
}
# 返回 workspaceId、cwd。setup 钩子（npm ci）已跑完，node_modules 就位（§0 已实测）。

# 2. 起 agent：provider/model/mode 是一等参数，简报正文直接作为 initialPrompt
create_agent{
  title: "T<N> <标题>",
  provider: "<按角色取 Agent profile，见下表>",
  workspaceId: "<上一步的 workspaceId>",
  settings: { modeId: "<信任模式，见 §0>", thinkingOptionId: "max" },
  initialPrompt: "<简报正文，见下面的模板>"
}
# 返回 agentId、status（"running" 就是起来了）、currentModeId——不必再判 TUI 是否就绪

# 3. 标记（GitHub 侧的状态仍手写，Paseo 不接管 issue 元数据）
gh issue edit <N> --repo odradekk/maou_redux --add-label in-progress   # 按 issue-tracker.md 的约定
```

- 命名 `t<N>-<slug>`，`<N>` 取工单编号（有 T 编号的取 T 编号）。
- `initialPrompt` 直接是简报正文本身，多行文本原样传入——不再需要 `/tmp/brief-<N>.txt` 中转文件。那套中转是绕 Orca「单行指令、换行会拉出命令菜单」的限制：`--prompt` 逐字符打进 TUI，每个换行都是一次回车，斜杠开头还会拉出命令菜单（实测二十多行的简报最后选中 `/exit`，agent 当场退出）。`create_agent` 的 `initialPrompt` 是一个 API 字段，不经过任何终端解析，这类风险不存在。

### provider / model 对照

| 角色 | Agent profile | provider/model                       | mode（信任级别）    | 用途                                          |
| ---- | ------------- | ------------------------------------ | ------------------- | --------------------------------------------- |
| 实施 | Worker        | `codebuddy-code/deepseek-v4.1-flash` | `fullAccess`        | 按工单验收清单写代码与测试                    |
| 审查 | Reviewer      | `pi/cpa/kimi-k3-256k`                | （pi 无 mode 概念） | 独立审查已有分支，只读                        |
| 研究 | Researcher    | `codex/gpt-5.6-sol`                  | `auto`              | 读 `target/`/`dev-guides/` 回答设计问题，只读 |

派发前先 `list_profiles`，按角色取上表对应的 profile，把它的 `provider`/`model`/`modeId`/`thinkingOptionId` 原样填进 `create_agent`；没有合适 profile、或 profile 被人改过，才手写 provider 串（格式 `provider/model`，写全，不吃通配）。

**Worker 现在的默认值还没有被真实工单验证过。** 冒烟测试（建 worktree → 改文件 → 跑 prettier → 提交）证明了交互链路稳——`fullAccess` 模式下全程没有卡确认框、提交信息标题正文俱全、`list_pending_permissions` 全程为空——但那是个几行改动的任务，没有测出 `deepseek-v4.1-flash` 处理两千行移植票的推理质量。**第一张在 Paseo 下真正派发的实施票，交付质量就是这条默认值的验收**；效果不够就把 Worker 换成 `pi/cpa/glm-5.3`（旧 Orca 流程下 J3/J4/J5 三张票验证过交付质量的组合，`--thinking max`）。

**技能来自 `~/.agents/skills/`**（`implement` / `tdd` / `code-review` / `research` 等三十来个），不是 `~/.pi/agent/skills/`——后者是空的。`initialPrompt` 首行写 `/implement` 加一个空格再接任务描述（research 票用 `/research`）能直接触发对应技能；写成「请用 /implement 技能……」只是在*请求*它调用，直接调用更稳。

### 简报模板

以下是 `initialPrompt` 正文的结构（首行 `/implement` 的约定见 §3）：

```
/implement issue #<N>：<标题>
工单正文与验收清单：gh issue view <N> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
父票（这张票在整体中的位置与测试策略）：gh issue view <父票> --repo odradekk/maou_redux
相关决议，动手前请读：#<a>、#<b>

<三到五条它自己查会很贵、且容易查错的既有事实，直接给结论>

worktree 若缺 node_modules 先 npm ci。跑测试一律用 bash tools/capped.sh 包一层
（并发时不把机器压死）。引擎 asar 会自动回落命中，不必设 ERE_ENGINE_ASAR。
长任务日志落 logs/<本票号>/（仓库内，已 gitignore），别落 ~/ 也别落 /tmp：
~/ 是所有并发 agent 共用的，同名日志会互相覆盖且看不出来；/tmp 重启即清。

**内环只跑本票那一个测试文件**：node --test test/<本票>.test.js（口上票约 6s）
＋ **node tools/mutation-check.mjs --ids <你这一轮新加的编号>**（如 --ids M4246-M4273，
每条约 0.35s）。改动面确实跨了多个文件时才用 bash tools/capped.sh npm run test:inner。
交付前一次 bash tools/capped.sh npm run test:related ＋ eslint ＋ prettier。
全库测试由 CI 在合并后跑，全量变异由派单人在阶段收口跑一次——两样都不在你账上。

**npm run test:related 不是内环，--files 也不是。** 两者都按「交付面」而非「本轮改了什么」
选面，代价随交付面线性增长，到票的中段就把开发节奏压死：#242 实测 K11 的 test:related
选中 78 个测试文件（test:inner 也有 68 个，光 docs/stub-registry.md 一个文件就反查出 46 个），
一轮 20 分钟；--files 选中 526 条条目，一轮 51 分钟。而每加一条指令只新增二十几条条目。
--ids 只跑点名的那几条，编号在表里不存在时工具当场报错，不会静默跑 0 条。

**--ids 那一步不许用 --verify 代替**：--verify 只查条目表结构、不执行任何变异。
#231 只跑了它就交付，全量一跑出来 7 条「红=false」——变异改下去没有任何测试变红。
全量已退到阶段收口，所以 --ids 是你的条目**唯一**被真正执行的地方。

两个计数字段：test/engine-skip-baseline.txt 现为 <m>，变异条目的 M 编号已用到
M<k>——**你的新条目从 M<k+1> 起编**，号段 M<k+1>–M<k+w>（并行票占了
M<x>–M<y>，别越界）。变异条目的条数由**各分片自己**的 `export const COUNT`
自报（#367），新增条目时同步抬你改的那个分片里的那个数，不再有全局常量。
只管把自己分支的数改对（新增依赖引擎的用例同步改跳过数并在注释里写出算式），
跨票对账由派单人处理。
**新条目若只被引擎比对用例守护**，给它加 engine: true 并同步抬
tools/mutation-check.mjs 的 ENGINE_SKIP_BASELINE，两处不一致 npm test 当场红。

对拍基线四数当前是 <样本: m/v/s/u ...>。并行票也会动它——只管把自己分支的
数改对，合并态由派单人重测。

覆盖面标准（**这一条决定要返工几轮**）：
**每一个 if / else if / switch 分支，都要有一个用例站在它两侧；每一个字面量
数值（价格档、素质编号、倍率、随机上界），被改动时都要有用例变红。**
维度型的分支（技能编号 × 房间类型、价格档 × 素质维度、状态机档位）用**表驱动**
一个用例走完整个维度，别挑几个点各钉一条——阶段 5a 五张票的实测差别全在这里：
表驱动那张首轮验收探针 6 中 6 拦，挑点钉的四张是 0/6、0/5、2/6、4/6。
**随机上界（`RAND:N` 的 N）要单独钉。** 注入的随机源通常只喂返回值、不看实参，
于是「掷出的值」钉住了而「掷骰的范围」没有——改 `rand(3)` 为 `rand(4)` 照样全绿，
而上界错了的后果是玩家那边某件事从不发生。钉法是捕获实参：
`const rand = (n) => { upper = n; return n; };`（只取上界不取命中），断言 upper。
#400 四个上界全漏、#401 漏一个，都是这么补上的。

交付前自己挑十个**没钉过**的分支或数值各改坏一次，确认都有用例红（避开新加
条目所钉的位置——那是自证，不是覆盖面）。这一步能省两三轮往返。

自检与提交（**这四条全部做到才算交付**）：
- npm run test:related **必须跑，且必须全绿**——不是「跑一下看看」。它是本票
  在 CI 的 pr job 上要过的同一道，本地红了推上去照样红。
- npx eslint . --max-warnings 0 与 npx prettier --check . 全绿。**这两条也要看
  结果**：#350 交付时声称三项跑过，实测 prettier 是红的。
- 逐条对照验收清单；写着「且此行为有测试」的每一条做变异测试自证：把被测
  规则改坏，确认真的有用例失败（本项目在 #10 出过事：测试全绿，规则却已失效）
  · 新写的用例凡是调用带随机源形参的生产函数，实参必须给确定性随机源
    （seq([...])）。漏给就落到真随机，用例只在一部分抽样里真的守住那个行为，
    本机跑一次绿、CI 抽中才红（#344 踩过，漏网概率 41%）
- 按 Conventional Commits 提交，scope 用 <scope>。**提交信息要有正文**：改了
  什么、为什么这么改、有意的取舍各一段，只有标题一行不算数
- 提交完 git status 必须干净（新文件也要 git add），然后停下等验收。
  合并与开 PR 由派单人做
```

**判交付前先看提交，别信 agent 自述完成。** 旧 Orca 流程下 #332/#333 两张连续踩过同三条：agent 做完活之后**停在「确认按此提交吗？」等输入**（此时分支零提交、工作区三十几个文件是脏的）；提交信息**只有标题一行**、无正文无票号；`test:related` **没跑或跑了没看**（#333 的 `test/dungeon-battle.test.js` 在选择面内，CI 一跑就红）。「卡在确认框」这类失败在 Paseo 的免确认档（`fullAccess`/`bypassPermissions`/`full-access`，见 §0）下已结构性消失——但提交信息潦草、自检没跑这两条是模型自身的执行纪律问题，跟编排层无关，上面模板里那四条就是照这三次写的，别删。判据仍是 §4 那两条：`git log origin/master..HEAD` 有提交、`git status --short` 干净。

**简报里绝不要写 `gh issue view … --comments`。** 本机 `gh` 的 `issue view` 仍在 GraphQL 里请求已下线的 `repository.issue.projectCards`，**该命令必然失败**，只吐一行「Projects (classic) is being deprecated」——阶段 4 派头两张票时两个 agent 同时撞上，白烧一轮。模板里的 `--json` 形式是验证过的替代（正文与全部评论一次拿到）。`gh issue comment` / `edit` / `close` 不受影响。

**那几个数字是每次派单都要现取的**，别照抄上一份简报：

```
tail -1 test/engine-skip-baseline.txt
grep -hoE "\bM[0-9]+\b" tools/mutations/*.mjs | sort -u -t M -k2 -n | tail -1
```

**M 号段按已派出的票记账，不能只看 master 的最大号**——在跑的票还没合并，仓库里看不出撞车。给每张在跑的票留一段写进简报，下一张从上一段末尾之后起；**宽度按规模给，十函数以上直接留 40**（号段浪费无害，M 号只是引用锚点、不连续没关系；撞号要手工解 `tools/mutations/*.mjs` 的冲突，贵得多）。

连撞五次里唯一没撞的那次，就是简报里写了起点。

两条写法约定：

- **简报不必让它读 `AGENTS.md`**：agent 会自动加载，写进去只是浪费开头的注意力。
- **简报给结论。** 让它自己去 `target/`（315,953 行）或引擎源码里重查一件已经查实的事，既慢又容易得出与既有决议矛盾的结果。但**这张票自己要解决的设计问题留给它**，只要求把判断依据写在 issue 上。

`/implement` 内部驱动 `tdd` 一次一个红绿切片，收尾跑 `code-review` 的两轴审查（Standards + Spec）再提交。绕过它就少了这层自检，交上来的东西得从头人工复核。

## 4. 监督

```
get_agent_status{agentId}                              # status、currentModeId、待批权限一次看全
get_agent_activity{agentId}                             # 最近做了什么，判断卡在哪一步
send_agent_prompt{agentId, prompt: "<追加指示>", background: true}
```

发追加指示前先看一眼 `get_agent_activity`，别对着一个已经推进到下一步的 agent 重复下达。

**你给的判断也会错，冲突时以源文为准。** agent 拿着源文回来反驳你的时候，先去核源文，不要因为「简报是我写的」就压过去。实测两次都是 agent 对：#222 我要求断言 `PREVCOM === 8` 并给了理由，源文 `COMF84:8` 写的是 `SELECTCOM = 84`，且 19 个高级 COM 文件皆然；#251 我把 `EX_FLAG` 写 / `EX_TALENT` 读判成缺陷，实际是口上模板的标准双变量结构（K3 与 K903 同构）。**发反馈时把这条明说**——否则 agent 会按错的判断去改测试，而那比不改更坏。

**判交付看提交，不看 agent 状态。** `status: idle` 只说明它当前没有活跃工具调用，不代表工作完成——它可能还在等下一条指示。判据是两条同时成立：`git -C <worktree路径> log origin/master..HEAD` 有提交，且 `git -C <worktree路径> status --short` 干净。**`status` 显示第二列干净、第一列是 `M ` 的，是「`git add` 了但没 `git commit`」**——阶段 5a 撞过两次，活都干完了、分支上什么都没有。

**两条判据都成立、但心里没底，查 `list_pending_permissions`。** 非空就是卡在权限弹框；`fullAccess`/`bypassPermissions`/`full-access` 三档全放行的模式下不会出现，只有用带确认的档（`default`/`auto`/`acceptEdits`）才会撞上。`respond_to_permission{agentId, requestId, response:{behavior:"allow"}}` 放行，或 `behavior:"deny"` 并附 `message` 改口。这条判据已实测：模拟验证两轮任务全程 `list_pending_permissions` 为空，且任务确实在推进——不再是旧 Orca 流程下「终端安静、有提交、工作区干净」三条都满足却仍可能是卡在 HIGH/CRITICAL 弹框（#384）的模糊地带。

**返工反馈给标准，别给清单。** 点名「补这六处」，交付方就只补那六处，旁边同形状的地方原封不动：#346 首轮六个探针全漏，返工后那六处守得很好、同文件的另外三个函数仍零断言。点名单个文件同理会被理解成范围——#350 那轮我着重写了 `ntr.js`，它把 `ntr.js` 做到位（我另选两个从未点名的倍率，都拦下），其余四个文件没动。**给 §3 简报模板里那条覆盖面标准 ＋ 文件清单，不要强调其中任何一个**。

## 5. 验收：自己重跑一遍

agent 的自述是线索，不是证据。在 worktree 目录里逐条对照 issue 的验收清单。

**自述的绿现在由 CI 兜住**（#161 自称三项自检全绿、实测 eslint 有两处 `no-useless-escape` 那种事，PR 上一看便知）。**CI 兜不住的是报告里的事实主张**——那要回原始材料核。#143 的普查报告把一处分歧描述成「误植了 `printWholeImage` 的文档」，而手册里根本没有那些内容，真正的错误是凭空多出的 `duration` 参数。

**分支落后 master 时，先按 §5.5 rebase 再验收**——否则要验两遍。

**不必 `export ERE_ENGINE_ASAR`**，回落会命中 `~/.era-engine/app.asar`（机制见 AGENTS.md「引擎 API 与硬约束」）。代价是「无引擎」不再能靠不设变量制造，造法见 §5.6。

### 分层：agent 跑 T1/T2，CI 跑 T3，派单人只做机器做不了的

**验证的主力是 CI，不是本机**（#302 起）。引擎经 release 资产上 runner（`.github/actions/setup-engine`），所以「全部拦下、零跳过、零红」这条严标准不必只存在于派单人的本机。

**阶段 4 收尾改了分层**：PR 只跑改动面，全库退到 master push，全量变异退到阶段收口的本机一次。依据是——一条变异条目的判定，只有在它的靶文件或守它的测试变了的时候才可能翻，重跑其余的是空转；而全量唯一多抓的那类跨文件失效是慢积累的风险，不是每次提交的风险。**代价是 PR 绿不再等于全库绿**，兜底是合并后几分钟的 master push。

| 层      | 谁     | 何时          | 内容                                                                      | 实测                  |
| ------- | ------ | ------------- | ------------------------------------------------------------------------- | --------------------- |
| **T1**  | agent  | 每个红绿切片  | 本票那一个测试文件 ＋ `mutation-check --ids <本轮新加的编号>`             | 6s ＋ 每条 0.35s      |
| **T2**  | agent  | 提交前一次    | `test:related` ＋ eslint ＋ prettier                                      | 交付面越大越贵，见 §3 |
| **T3**  | CI     | 每次 PR       | `pr`：`test:related` ＋ 锚鉴别力 ＋ eslint ＋ prettier                    | 目标 10 分以内        |
| **T3′** | CI     | 合并到 master | `engineless` / `engine`：全库测试 ＋ 跳过数守护 ＋ 锚质量全文量 ＋ 格式档 | 合并后回看，见 §6     |
| **T4**  | 派单人 | 阶段收口      | 本机满速全量变异 ＋ 引擎手工验收 ＋ 对拍，见 §5.6                         | —                     |

**派单人每票要做的只剩六件**，其余交给 CI：

1. **并上 master**（§5.5）——冲突只有人能解，也是最容易出错的一步。
2. **开 PR，等 `pr` job 绿；合并后回看 master push 那一轮**（§6）。
3. **证伪探针**：防线类交付亲手还原它声称能防的场景（判据 6）。
4. **抽样探针**：验收方自己选点改坏，看有没有用例红（见下）。
5. **逐条对照工单验收清单**（下面十二条判据），并抽查本票新增条目真被拦下——`--ids <本票号段>`（不能用 `--verify` 代替，理由见 §3 简报模板）。
6. **补跑 T3 量不到的那两道**（下面单列）。

#### T3 量不到的两道：锚鉴别力全文量与对拍

PR 档跑的是改动面，这两道都不在里面——**它们的红要到合并之后才出现，而那时票已经关了**。所以验收时由派单人在分支上各跑一次。

- **锚鉴别力全文量**：`node tools/trace-check.mjs --anchor-quality --all` 退出 0。T3 是默认档、只量未冻结文件，新落大批 `:N` 引用的票必跑。#402 的 PR 绿、抽样探针 12 拦 0 漏，锚表却让 master 连红三天；#400 首版一次新增 31 条弱锚。基线只减不增：消化掉的弱锚要同步把 `ANCHOR_QUALITY_BASELINE` 改小（#417 由 5159 降到 5155），**改大它、或往 `ANCHOR_QUALITY_BY_FILE` 里添冻结项，都是把账推给下一个人**。
- **对拍**：`node tools/compare/cli.js --sample <名>`。`test:related` 按改动面选不中 `test/compare-scope-b.test.js`，于是**改了主菜单分发上任何一个按钮的票，PR 全绿也可能把回放打散**：#397 把 `[105]` 从存根换成会吃输入的真身，`replay-b.js` 的出售段输入计划整条错位一格，matched 123 → 64、unexplained 从 0 涨到七十多条，是合并后的 master push 才报出来的。

#### 抽样探针：这一步不能省，`--ids` 全拦替代不了它

**钉子是交付方自己选的，所以「全拦」只证明自洽。** 阶段 5a 五张票的 `--ids` 全部 100% 拦截（29 / 40 / 70 / 74 / 176 条），而验收方另选六处改坏，命中率是 6/6、5/6、2/6、0/6、0/5——**同样的 100% 背后，覆盖面差着一个数量级**。

做法：**避开交付方钉过的位置**（读一遍它的条目表 `desc`），在本票生产代码里挑六处改坏，只跑本票那个测试文件，看红不红。挑的时候优先找**大函数里的整片空白**：条目分布看着均匀，落点却常常集中在少数几个函数上（#348 的 `event-banishment.js` 807 行只摊到 6 条，20 路 `switch` 的 `former_life_fate` 零断言）。

三条纪律：

- **每轮换全新选点。** 交付方会精确修补你点过的地方，重复选点只会验出「补丁打上了」（#346 首轮 0/6，返工后那六处全绿、旁边三个函数仍零断言）。
- **串行跑**，理由见上一节。
- **脚本化的探针要把「改失败」与「改了不红」分开报。** 定位串没命中时文件根本没被改，测试自然全绿——按「漏」记就凭空造出一个缺口。本轮误报两次（行号随重排漂了、定位串不唯一），差点把不存在的问题发回去。判据：替换前先数命中，不是 1 次就报「改失败、本条作废」。
- **判「等价变异」前先看夹具里的实际取值。** 同一批里两处形似的漏网，一处是真等价（`idiv(5,5)` 与 `idiv(5,4)` 都是 1，#343），一处是真空白（测试从未设过 `mark:3`，而 2 与 3 都是可达状态，#347）。结论相反，只有读夹具能分。

**引擎在 CI 上的位置有讲究**：asar 要落到 `~/.era-engine/app.asar`（`locate_asar` 的第 3 号候选），**不能只设 `ERE_ENGINE_ASAR`**。#302 首版用环境变量，结果 `M374`（拆掉 `ERE_ENGINE_ASAR === 'none'` 那道开关）在 CI 上判红=false——测试子进程里的 `none` 覆盖掉环境变量，而其余候选在 CI 上一个都不存在，于是拆掉开关后**仍然**是无引擎、测试照过、变异漏网。本机能判红只因为第 3 号候选存在。**CI 与本机不同构的地方，就是守卫会静默失效的地方。**

**每条本机命令都用 `bash tools/capped.sh` 包一层**——并发验收时这是机器还能不能用的分界（实测见 AGENTS.md「运行与调试」）。

#### 跑出怪结果时先看这三条

**验收期的读数不能与 `npm test` 或串行变异并发取。** `tools/mutation-check.mjs` 是**就地变异 + 还原**（文件头 `:30` 明写），而 `test/mutation-check.test.js` 的快速模式随 `npm test` 跑——那期间工作树是**间歇性坏的**。阶段 4 验收 #212 时踩过：一边跑着 `npm test`，一边 `node tools/compare/cli.js`，读回 54/112 而真值是 57/107，我据此误报了「对拍退化」。**判据是 `pgrep -f 'capped.sh|mutation-check.mjs'` 为空再读**，或者干脆串行：先跑完测试，再取对拍与快照类读数。`--jobs` 并行路径用隔离副本、不碰工作树，但快速模式与串行全量都碰。

**抽样探针也是这类读数，而且是最容易忘的一个**——它自己就是「改坏文件 → 跑测试 → 还原」，与变异检查同形，撞在一起会互相冒充：#350 验收时后台跑着 `--ids`，六个探针全报「拦下」，其实是被别人的变异带红的，串行重跑后真实是 3 拦 3 漏。**症状是收尾的 `git diff --quiet` 报脏，且连查两次脏的文件还不一样**——只有另一个进程在就地改文件才会这样。看到这个形态，当轮探针作废重来。

**`--jobs` 的全量变异偶尔会红在「副本对照」而不是变异本身**（形态：`拦截 0 / 跳过 0 / 红 1`，一百多秒就退，文案是「副本 N 对照运行即红」）。**这不一定是本票的问题**——多半是 master 上一条 flaky 用例，概率低到平时撞不上、四个副本一起跑就放大四倍。判法：主树 `npm test` 全绿而副本红 → 从日志 `✖ failing tests:` 找到用例名，在 master 上单跑那个文件。是既有的就**立票、重跑本票的变异**，别让交付方背锅。

**验证 flaky 修好了没有，不能只靠「重复跑 N 次不失败」。** 1% 概率的用例跑 30 次有 74% 的可能一次都不失败——master 版和修复版都会「30 次全绿」，这个对照什么也证明不了。**要构造能必然触发的条件再对照**，例如在文件首行钉死随机源：

```
sed -i "1i Math.random = () => 0;" test/<文件>.test.js   # 诊断用，验完 git checkout 还原
```

#195 就是这么验的：同样钉死 `Math.random ≡ 0`，master 3 条失败、修复版只剩 1 条（那条是有意保留的假阳性）。这才叫证明。

**例外是失败概率能算出来的时候。** 上面那条禁的是「概率未知，靠跑几十次没红就宣布修好」。若已经定位到随机源、能推出单次失败率，重复跑就成了有效证据——报的时候把概率一起写出来，让人能核。#344 的失败率是 1 − 0.9⁵ = 41%（与修前实测 4/10 吻合），修后连绿 15 次，缺陷仍在的话这种情况的概率是 0.59¹⁵ ≈ 0.02%。**先算再跑，不是先跑再找理由。**

### 逐条对照清单时的十二个判据

1. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。

   贯通验证期间靠这一步抓到三条**空用例**：用例名声称守住某个行为，实际守不住。共同特征是**测试构造的世界里，被测条件的两个分支从未分开过**。守卫拦下与走缺失路径的可观测结果相同（#21）、被测条件的两个分支在在场数据里恰好重合（#24）、记录失效方式的表征测试怎么改被测代码都绿（#20）。光读用例名与断言看不出来，只有改坏被测行为才能发现。

   第四种形态是**叠层守卫互相遮蔽**：一个 `@COM_ABLE` 串了四五道 `return 0`，用例从空世界起手逐道加条件，于是删掉任何一道，剩下的仍从下一道返回 0——变异全程不红（#227 的 M1330/M1341）。**改法是把每道守卫单独隔离**：先把其余前置条件全部喂满，再单测目标那一道。这条对本项目特别常见，指令族票的 COM_ABLE 几乎都是这个形状。

   第五种形态是**真随机漏进用例**：用例忘了注入确定性随机源，被测函数用默认的真随机跑，于是它只在一部分抽样里真的守住那个行为，其余时候前提已经被随机数拆掉、断言碰巧还成立。**这种用例在本机、在合并前、在 CI 上都能各绿一次**，直到某次抽中才现形，而那时看起来像是合并引入的。#344 踩过：`dungeon_shop_itemsell(1)` 漏了随机源参数，而它内部的 `SELL_EX_ITEM` 掷五次随机、命中就往 `CFLAG:580` 记钱，把该用例「钱不够 → 早退」的前提拆掉的概率是 1 − 0.9⁵ = 41%。

   **查法是读调用参数，不是重复跑**：本票的用例里凡是调用了带随机源形参的生产函数，逐个确认实参给了确定性随机源（本项目的写法是 `seq([...])`）。同一文件里通常已有给对了的邻居可比照——#344 那个文件两个调用点，一处给了一处没给。

   变异也要挑对位置：改一处应当只死该行为对应的用例。一改就死一大片，说明用例耦合过深；一改全绿，说明那条根本没被守住。

2. **条目表的 `✓` 证明不了「新挂的宿主也红」。** `mutation-check` 的判据是「`tests` 列表里**至少一个**文件红、且输出含 `must_mention`」。给已有条目挂上新宿主（如把端到端加进 `tests`）时，很可能是老宿主代红、新宿主全程绿——条目表照样打 ✓。**验法**：把该变异应用一次，**只跑新宿主那一个文件**，确认它自己红。#120 的端到端就是这么验的（M2101/M188/M220 三条单跑均红，M188 下实测天数从 100 掉到 49；M2101 是 #295 消重前的 M157）。

3. **`must_mention` 是「失败时打印出来的信息」，四种写法会让它永远匹配不上。** 语义是「原始 stdout 包含该片段」，认错了锚就是一条永不判红的死条目。**必须跑一次 `mutation-check --files <靶文件>` 再定，不能靠读代码推。**
   - **取了被断言的值而不是失败信息。** `assert.ok(lines.includes('某句台词'))` 没有第三参，失败时只打印 `AssertionError` 与源码片段，**台词一个字都不出现**（#227 把游戏台词当锚填了两条，全废）。改法是补消息：`assert.equal(exp, 5, '百合经验+5')`，第三参才是锚。**新写的 `assert.ok` 一律带第三参**——不带时 Node 的默认消息只含表达式源码的**第一行**，prettier 换行后多行断言的锚必落空（#239）。
   - **变异让代码在到达断言之前就抛错**，输出里连断言都没有，只有测试名取得到（#230）。
   - **取了被 node 上色的值。** `node --test` 的断言差异经 `util.inspect` 上色，原始 stdout 里夹着 ANSI 转义，肉眼看着一样、`includes` 匹配不上。
   - **写得太短等于没判。** 片段若在目标测试文件里多处出现，任何一条红都算命中。判据：`grep -c '<片段>' test/<宿主>.test.js` 应为 1。

   **锚也不能挂在会变的数据上。** #236 的 M370 把锚取成一个汉字「贖」，那个字后来进了归一表、检测器不再报它，锚当场失配。取断言消息——它不随语料增长而漂。

4. **变异条目的 `find` 可能选在一个行为不可观察的位置，那样任何测试都拦不住它。** #231 的 M1985 锚在 `TFLAG:13==998` 段，而那一段的输出是空 `PRINTFORMW`、源本身没内容——改坏它不会有任何可见差异。这比「测试不够严」隐蔽得多：条目表看着有覆盖，实际选错了靶。**只有真跑变异才看得见**，`--verify` 永远查不出来。

5. **一次性迁移的判据不该留成永久断言。** #290 拆锚表时锁死了 `24162 / 24303 / 432` 三个数以证等价——但前两个数**每张移植票都会长**，于是下一张票（#236）落地就被卡住。等价性是一次性迁移的判据，该在那次迁移里验完；留成断言就是给后面每一张票设路障。改锁结构性质（「引用数 > 0 且 ERB 侧 ≥ 内联侧」「豁免数只减不增」）。

6. **防线类工单，直接还原它声称能防的那个场景。** 只看变异条目表不够——那验的是「条目被拦下」，不是「防线对真实缺口有效」。#130（夹具按钮白名单）的验法是把 `[109]` 按钮从 `page-main-menu.js` 拆掉、还原 #129 的原始状态：6 条用例当场红，而**在该 PR 之前同样拆掉一条都不会红**。这才是防线成立的证据。

   **守卫类交付还要多验一层：守卫自己的阳性对照。** #212 立「角色表二段寻址」守卫时，阳性对照的样本是**从实现清单自身循环生成的**——摘掉清单里的任何一族，对照样本跟着消失，守卫失明而测试全绿。改法是双名单镜像（实现清单 vs 独立写死的期望名单，先 Set 比对再按期望名单喂样）。**验法**：摘掉守卫清单里的一项，确认真的红。

7. **声称「与引擎行为一致」的，用引擎自己的代码验证**，而不是自己写的镜像——解包 `ere-4.8.0-win-x64/resources/app.asar`（webpack bundle，把入口 `r(r.s=311)` 换成暴露 require 即可直接调用引擎的解析器），#17 用过这招。

   **更要紧的是反向**：夹具能证明「我们调用了」，证明不了「引擎接受了」。引擎侧的短路（`addCharacter` 对无预设角色直接返回 false）、引擎侧的拒收（`input()` 只送达已打印按钮的快捷键）都只有引擎自己的代码能暴露。#21/#22 因前者误报通过，#129 因后者让整条侵略线在实机上入口不存在而四张票全绿。**问一句「这个行为在引擎里真的会发生吗」，比读十遍断言有用。**

8. **1:1 移植的改动**，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。移植中**新发现的原作缺陷要登记进 #14**，并尽量配一条反向变异钉住它——#116 的 M214／M218 是先例，让「不要修好原作缺陷」这条约定第一次有了机器可执行的守卫。

9. **机械改名类迁移（裸寻址 → 门面、批量重命名），验收证据是「寻址多重集等价」，不是行为覆盖。** 从产物源码建「门面字段 → 寻址」映射，再解析迁移 diff，把删掉的旧寻址与新增的门面写各自归约成 `表:下标` 的多重集，逐条比对——每一处迁移后写的必须仍是它原来写的那个地址。

   为什么不能靠行为覆盖：#90 迁 `source-check.js` 的 57 处跨域写时，派单的人在工单里写了「它在黄金样本的比对窗口内，改错了比对当场红」。**实测不成立**：均匀抽样 10 处、逐处把赋值右侧改成 `12345`，**比对一处都没拦下**（未解释恒为 0），用例只拦下 3 处。该文件 309 个分支，黄金样本只经过一小部分，外推约 40/57 处没有任何回归防护。迁移是全量的，覆盖是局部的，**两者不能互相担保**。

   **只能在合并时做**：待办条目表（`tools/domain-ledger.mjs` 一类）的条目一迁完就删，事后再无「原来写的是哪个地址」的记录。错过这一刻就永远补不上。

10. **本票若触发破坏性改动，确认版本已抬。** 判据是「同一条寻址，在旧档里读出的值是否仍然是它现在的语义」——否则即破坏性，判定表见 `docs/adr/0006-save-compatibility-not-guaranteed.md`。触发时 `yml/GameBase.yml` 的【版本】与【最低支持版本】必须同抬、且两者相等，【版本代号】同步。

    **这条只能人工查，不要指望工具。** 机器看不出「语义变没变」，唯一可机器化的子集（扩展角色表字段数变了但版本没抬）覆盖面太窄，不值得再加一处 §2 那样的固定冲突面——这是 ADR-0006 明确权衡后的选择，别顺手加个守卫把它推翻了。

11. **新加的测试要问一句：它在隔离副本里还成不成立。** 变异检查的隔离副本按 `COPY_DENY` 把 `.git` 与 `node_modules` 都排除在外，CI 的 `engine` / `mutation` 两个 job 也不跑 `npm ci`。所以测试里 spawn 外部命令（`prettier`）或依赖仓库结构（`git ls-files`）在那里必然失败——#299 首版两条都踩了，把两个 job 打红。

    改法看这条断言到底锁什么：**锁「我们的代码认不认某个形态」的，把那个形态写死**（外部工具会产出它，这是外部事实，拆成单独一条核对）；**锁「本仓库当前状态」的，先探一下环境**（`git rev-parse --is-inside-work-tree`）。

    **两处都用 `return` 而不是 `t.skip()`。** #302 起有引擎侧的跳过数守护要求跳过恒为 0（`test/engine-present-skip-baseline.txt`），**一个 skip 就把那道门判红**。这是两道守卫互相牵制的地方，容易踩。

最常触发的三类：给 `yml/_fixed.json` 的 `extendedCharaTables` 加表或加字段、改动 `yml/Chara*.yml` 的预设内容、改动已有序号的含义。**新增序号与新增整张表不触发**（引擎 `loadData` 会补 0，而 0 就是新字段的正确初值）。

12. **归因规则只解释有意的偏离。** 交付方为了让对拍的 `unexplained` 归零，可以改 `ere/` 让两侧对上，也可以往 `tools/compare/rules.js` 加一条规则把差异说成「已解释」。后者用错地方，等于给缺陷发一张「已验证」的证书——比不做对拍更糟。

    **查法是读理由文本本身。** 它写的是「引擎交互形态差」「按 #60 统一用简体」这类**我们有意如此**的事，规则就成立；写成「未保留原作的 X」「某某 .js 的界面形态偏离」这类**承认自家不对**的措辞，那就该改代码而不是加规则。#338 首轮把 `所持金：$800点` → `所持金：800点` 归成「不保留 Emuera 格式串中的字面量 $（sale.js 的界面形态偏离）」，理由文本自己招了。

    **按行号区间兜住一整段的规则要单独审**：它会把窗口里的任何真差异一起吞掉。判定要点是（一）窗口里参与比对的条目是否真的同属一个未移植子系统——装饰行在归一层已丢弃，别按原始行数估；（二）窗口里**已实现**的输出有没有被显式排除，并且有用例锁住「它缺失时必须进 `unexplained`」。#338 的 ABILITY_UP 区间两条都做到了，判定成立。

### 验收中发现的小瑕疵，就在本分支顺手修

文档笔误、rebase 后失准的注释算式、判定过松的 `must_mention`、死参数这一类，**直接在同一分支单独一个提交修掉**，在决议评论里写明「验收时改的一处」，不要另开 issue——立票的开销（建 worktree、派 agent、再验一轮）远高于问题本身。

分界是「修它会不会改变产品行为、或需要设计判断」：会，就立票。实测两例都立了票——主菜单按钮缺失（改变玩家可达性，#129）、夹具校验缺失（需要设计判断，#130）。

## 5.5 rebase 与冲突（几乎每张票都会遇到）

worktree 建得早于前置票合并时（见 §2），验收前必须先并上 master。**先并再验收，别验两遍。**

**跑得久的票，合并交给 agent 自己做**——只有实现者分得清自己的注册点该接到哪。长跑票的真正代价不是冲突，是设计漂移：#231 的基线落后十来张票，期间 master 独立长出了同一个方案的另一套命名，23 个 register 点要逐一改接；#239 沿用旧的适配器注册写法而 master 的同族已改成直接注册，**`P` 因此恒 0、整段 NTR 口上永远静默**，两边各自自洽、一路全绿。派发时就把这条告诉它，并**中途主动让它合一次 master**。

**分支提交数多时用 `git merge origin/master`，不要 rebase**——冲突面高度固定，rebase 等于把同一组冲突解 N 遍（#229 有 19 个提交，改用 merge 后只解了一遍）。

**怎么解见 `docs/agents/merge-conflicts.md`**：六处固定冲突面、计数型基线为什么只能重测、登记表按行键取并集、生成产物先合源表再重生成、数组分隔符处的隐形断裂，以及「git 不报冲突但合出来是错的」那四种形态与合并后的自扫命令。

## 5.6 T4 阶段闸（阶段收口时跑一次）

触发点是**路线图 #101 的阶段决策票关闭前**，不是每张票。三项：

1. **全量变异（带引擎）**：`node tools/mutation-check.mjs --jobs 4`。**严格标准是「全部拦下、零跳过、零红」。** 它不挂 CI 自动触发，`workflow_dispatch` 留着（理由见 AGENTS.md「CI」）。
2. **引擎手工验收**：启动引擎跑一遍本阶段的贯通路径（启动命令见 AGENTS.md「运行与调试」，【打开游戏】选基座目录）。CI 没有 GUI，这件事机器做不了。
3. **对拍全样本**：`node tools/compare/cli.js --sample <名>` 逐个跑完，样本名见 `tools/compare/samples.js`。（**每票那一档只跑受影响的样本**，见 §5「T3 量不到的两道」。）

**全量唯一能抓、按面跑抓不到的那类，长这样。** 阶段 5a 收口报出红 5，两轮全量逐条相同、串行单跑也稳定复现。一条是真缺口：`test/dungeon-trap.test.js` 那条 `run_dungeon` 集成用例断言 `CFLAG:502 = 1`，而 MAGIC 从存根换成真身之后，战斗臂里 `dungeon.js:678` 的 `walk20 = move_ctx.d20` 同样会写出 1（TELEPORT_MAGIC 与陷阱 TELEPORT 落同一个值），两条路合流——**删掉陷阱那条收线，用例照样绿**。**A 子系统落真身，让 B 子系统的用例失去了区分能力**，而票只跑自己新加的 `--ids`、没人会重跑别人的旧条目，所以这一类只有全量看得见。

**两类红看输出就能分开**：`红=false` 是变异没被拦下，真缺口，得去改测试；`红=true 命中=false` 是 `must_mention` 与当前测试对不上（用例改名、断言文案更换、两条用例被合并），覆盖面没丢、账没跟上。**后者别只改成合并后的用例名**——一条用例同时覆盖好几个维度时，共用一个标记等于那些维度彼此不再可分；给对应断言补上带循环变量的消息，标记改指那条消息。

**列引擎人工清单之前，先查入口是不是存根。** 子地图交付的往往只是逻辑侧，通往它的主菜单入口还在等界面票：阶段 5a 收口时 `ere/page/page-shop.js` 里处刑、迎击、能力值提升、购物、怪物商店、休息（回合结束）六个入口全是 `stub_line_wait`，按子系统清单列出来的路径大半走不到。`grep -n stub_line_wait ere/page/page-shop.js` 一眼看完，再决定清单写什么。回合也因此推不动——「休息」是存根，只能靠跑完一次调教走 AFTERTRAIN → TURNEND。

**验收一律从新档开始。** 【最低支持版本】与【版本】同抬同落（ADR-0006），所以每次破坏性改动之后旧 `saveN.sav` 都读不回来、引擎报「版本过低」——**这是设计行为不是缺陷**，删掉那些 `saveN.sav` 即可。`global.sav` 走另一套闸（code 不符拒绝启动，版本过低则重置），别删它。

**要在本机造出「无引擎」，`--asar none` 一个人做不到。** 它只改**父进程**对「引擎在不在场」的判定；子进程与测试各自走 `locate_asar`，会照样命中回落。两个一起给：

```
ERE_ENGINE_ASAR=none bash tools/capped.sh node tools/mutation-check.mjs --asar none --jobs 2
```

## 6. 收尾

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file -
gh pr merge <pr> --repo odradekk/maou_redux --merge --delete-branch
git -C ~/Projects/maou_redux pull --prune --ff-only origin master   # 基座：下一张票的建树基线，也是引擎手工验收用的那份
git -C ~/Projects/maou_redux branch -d <branch>                     # 本地分支，-d 会拒绝未合并的
archive_workspace{workspaceId: "<本票的 workspaceId>"}              # 一步删 worktree 目录、清 git 注册、归档该工作区下全部 agent
gh issue comment <n> --repo odradekk/maou_redux --body "<决议：交付物、验证方式、有意的取舍、给后续票的提醒>"
```

- **纯文档改动不必等 CI**：本地 `prettier --check` 过了就直接合。
- PR 正文以 `Closes #<n>` 结尾，合并即自动关票。自动关只留一行记录，**决议评论仍要手写**（见命令块最后一行）。
- **合并后回看 master push 那一轮**（T3′）——`pr` 档只跑改动面，全库是在这里跑的：

  ```
  gh run list --repo odradekk/maou_redux --branch master --limit 1 --json conclusion,headSha
  ```

  同一形态付过三次账（#348 起连红四次无人看、#339 连红三次、#397 的回放错位），都是「`gh pr checks` 显示 pass 就合并」。**「PR 绿」是必要条件，「master push 绿」才是这张票真的过了**；哪两道 PR 量不到，见 §5。

- **改到 `.github/workflows/` 的分支要用 `env -u GITHUB_TOKEN` 推**：环境变量里那个 PAT 缺 `workflow` scope，remote 会直接拒收（`refusing to allow a Personal Access Token to create or update workflow`）；`~/.config/gh/hosts.yml` 里的细粒度 token 有。`gh pr create` / `gh pr merge` 同理。
- **基座要 pull**（见 §0 的表）。漏掉它，下一张票就会从旧 master 建树，撞上 `merge-conflicts.md` 里那几处固定冲突面。
- **归档前确认提交都已推送**：`paseo.json` 目前没配 `teardown`，删了不可恢复。
- **一张票要清五处，少一处就「看着还开着」。** 本仓库 `deleteBranchOnMerge` 是 false，所以远端分支要靠 `--delete-branch` 删；删掉之后两个 checkout 的跟踪引用**不会自己消失**，得 `--prune`。worktree 那一处现在是 `archive_workspace` 一步到位——旧 Orca 流程下「`git worktree remove` 删了，终端会话不跟着走」那个坑（#344）已经结构性消失（§0 已实测：归档同时清掉 git 层面的 worktree 注册与该工作区下的全部 agent）。合并后跑一遍复核：

  **prune 与远端删分支之间有竞态**：紧跟在 `gh pr merge --delete-branch` 后面的那次 `pull --prune` 常常抓不到（GitHub 还没删完），跟踪引用就留下了。所以复核放在最后，发现还在就再 `git fetch --prune origin` 一次。

  ```
  gh issue view <n> --repo odradekk/maou_redux --json state -q .state   # CLOSED
  gh pr view <pr>  --repo odradekk/maou_redux --json state -q .state    # MERGED
  git ls-remote --heads origin "odradekk/t<n>*"                          # 空
  git -C ~/Projects/maou_redux branch -a --list "*t<n>*"                 # 空
  git -C ~/Projects/maou_redux worktree list                             # 无本票
  ```

- **优先用 MCP 工具，CLI 可执行文件在 `/opt/Paseo/resources/bin/paseo`**（理由见 §0）。确实要用 CLI 时子命令用 `paseo --help` / `paseo <cmd> --help` 现查，别凭记忆写——命令面随 Paseo 版本变，本文档里的写法只保证写下时（0.8.0）可用。
- **需要启动引擎的手工验收，在合并之后、在基座上做**：引擎【打开游戏】指向的是基座目录，worktree 的存档也不会保留。这一步只有人能做，agent 的职责是交出**可复现的置位步骤**（改哪几行、从哪个画面进、看哪几个点），做完回票补一条确认评论。

  临时置位那几行**绝不能提交**：验完 `git checkout -- <文件>` 撤回，`git status` 确认干净。置位常常会让某条「全量写入」类用例变红（`test/event-first.test.js` 的 `expected_init_writes` 就是），**那是预期的，不要去改测试**。

## 7. 决议的记录方式

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**再继续（#3 被 #6 推翻就是先例）。地图 issue #1 只读，不改写历史。
