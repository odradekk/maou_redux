# 工单执行流程（worker 读）

本文写给在 Paseo 工作区里执行一张工单的 agent。分配任务、验收与合并由主 agent 按 `dispatch-sop.md` 处理，不在本文范围。`AGENTS.md` 会自动加载，本文不重复其中的内容。

一张工单的完成标志有四项，缺一不算完成：

1. PR 已开出，且 PR 上的 CI 全部通过。
2. 工单 issue 下有一条按 §7 模板写的完成评论。
3. 工作树干净（`git status --short` 为空，包括新增文件），提交已推送。
4. 改了某个函数的实现状态、或对它下了裁定（判死不实现、不排期一类也算）的，
   `docs/stub-registry.md` 的对应行在同一个 PR 里同步更新——状态列、票号和
   依据一并写清，PR 正文点名改了哪几行。

第 4 项的理由：做完了、裁定完了没回头改登记，登记表会在下一次普查时整排对不上
（#461 两轮退回、#501 一次普查出 11 行，根因都在这一处）。状态列的词形与判死
终态的写法见 `docs/stub-registry.md` 的「状态含义」与「维护规则」。

## 1. 开工前

先读工单正文与全部评论，工单内容以 issue 为准，提示词只给固定开场和这张工单特有的注意事项：

```
gh issue view <N> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
```

再读提示词点名的父工单和决策 issue。移植决策索引 #1 只读；发现既有决策不成立时，先在对应 issue 补充证据与修正结论，再继续实施。

环境：缺少 `node_modules` 时先 `npm ci`；引擎 `app.asar` 按 `docs/windows-development.md` 放入用户目录；日志写到 `logs/<工单号>/`，避免多个工作区互相覆盖。不向工作区复制 `ere.config.json`。

## 2. 开发方式：先写测试

按 `/tdd` 技能的方式工作：每一项行为先写会失败的测试，再实现到通过。测试写在既有的可测边界上（`test/helpers/era-fixture.js` 是全项目唯一的注入点），不为实现细节新开边界。

每次改动后运行对应测试文件，新增变异条目后实际执行它们：

```
node tools/run-node.mjs -- --test test/<当前工单>.test.js
node tools/run-node.mjs -- tools/mutation-check.mjs --ids <新增编号>
```

`--verify` 只检查条目结构，不能代替实际变异。Windows 上串行变异被强制终止后，检查目标文件的 diff 是否已还原。

**变异条目**：提示词给出本工单的编号区间和当前无引擎跳过基线，不得使用区间之外的编号。新增条目后更新所在分片的 `export const COUNT`；仅由引擎测试验证的条目设置 `engine: true` 并更新 `tools/mutation-check.mjs` 的 `ENGINE_SKIP_BASELINE`；新增依赖引擎的用例须更新 `test/engine-skip-baseline.txt`，并在注释中写明计数依据。`must_mention` 必须来自实际失败输出，不能按源码猜。

**覆盖要求**：

- `if` / `else if` / `switch` 的各分支都要有可区分的测试输入和断言。
- 价格、编号、倍率、随机上界等字面量改错时，应有对应测试失败。
- 技能编号、房间类型等组合条件用表驱动测试覆盖，不能只抽几个例子。
- 调用带随机源参数的函数时，传入 `seq([...])` 等确定性随机源；随机上界单独断言，可用 `const rand = (n) => { upper = n; return n; };` 捕获参数（#400、#401 曾漏掉；#344 漏传随机源后有约 41% 的随机失败概率）。
- 交付前另选十个尚未被新增条目覆盖的分支或数值，分别改错，确认测试能发现。

**原作对应**：文件头注释指向 `target/` 中实际存在的文件和函数。新发现的原作缺陷登记到 #14，按原作保留，不在移植中擅自修正。

## 3. 同步 master

开 PR 前先 `git fetch origin` 并 `git merge origin/master`；提交较多时不要 rebase，避免逐个提交重复解决同一冲突。冲突处理见 `merge-conflicts.md`：公共计数重新测量、登记表按键合并、生成文件先合源数据再生成，并检查 Git 未报告冲突的逻辑错误。合并后跑一次完整 `npm test`，只跑本工单对应的测试文件不够。

## 4. 审查：用 Paseo 起独立的 reviewer

实现完成、测试通过后执行 `/code-review` 技能。该技能要起的审查子 agent（规范审查、需求审查）**不用内置 Agent 工具，改用 Paseo 的 `create_agent`**，每个子审查一个 agent：

- `workspaceId` 用当前工作区（`list_workspaces` 按当前目录找）。
- **`modeId` 必须设成 `plan`，而且要确认它真的生效了。** 起完用 `get_agent_status` 看 `currentModeId`：是 `plan` 才算只读。只读的审查员跑不了会改文件的 `mutation-check --ids`，那部分由你在本机实跑、在完成评论里写明。
- **提供方必须支持 `plan`。`list_profiles` 里的 `Reviewer` profile（`pi`）不支持**——`pi` 的 `availableModes` 是空的，传 `modeId` 直接报 `Invalid mode 'plan' for provider 'pi'`，不传则 `currentModeId` 为 `null`、审查员能写你工作树里的文件。用 `claude` / `claude-opus-5`（#530、#532 的审查都是它，约 3 分钟出结论）或 `codebuddy-code` / `deepseek-v4.1-flash`，thinking 都设 `max`。
- 为什么这条是硬要求：审查员和你共用一个工作树。#505 的审查员不是只读的，跑了 `mutation-check --ids` 又被超时强杀，`finally` 没执行，把变异留在了 `ere/page/page-invasion.js` 里。
- 提示词写明只读：审查 `origin/master..HEAD` 的改动，对照 issue #N 的要求，不修改文件；给出每条发现的文件、行、问题和依据。
- 用 `create_agent` 的完成通知或 `get_agent_status` 等结果，不轮询。审完 `archive_agent`。

**审查员卡住时换 Flash 重起。** 判断条件是 `get_agent_status` 的输出计数二十分钟不变（会话还在长 thinking，不会自己结束）。`archive_agent` 之后用 `codebuddy-code` / `deepseek-v4.1-flash`、`modeId: plan`、thinking `max` 重起同一份审查提示词，并在完成评论第 5 项写明这次换人。#467 的 `Reviewer` profile 跑了四十多分钟卡住，换 Flash 后正常出结论。

发现的处理规则：确认无误的正确性问题必须修；其余由你决定，驳回的在完成评论里列出理由。修完再跑一遍对应测试与 `--ids`。

## 5. 开 PR 前的本地检查

三条命令全部通过，检查退出码，不能只报告「运行过」：

```
npm test
npm run lint
npm run format:check
```

**再跑一次改动文件上的既有条目**，确认没有削弱别人的守卫：

```
node tools/run-node.mjs --timeout 1800 -- tools/mutation-check.mjs --changed
```

它按 git 改动（基线 `origin/master`）筛出以你碰过的文件为靶的**全部**条目，不只你新加的那些。条数由改动面决定，多数票在几十条以内；打到口上这类大文件时可能上百条，此时改用 `--files <你实际改了行为的那几个文件>` 缩小范围，并在完成评论里写明跳过了哪些靶文件、为什么。

这一步针对的是本地看不见的失效：**改坏别人的守卫不会让你自己的 `--ids` 变红**。`M38` 与 `M10101` 两条就是这么在 master 上逃逸了两天——`M10101` 坏在 #483，那票的 `pick_free_hero_slot` 让绕过上限守卫的执行流落进另一段文案，而那段文案与守卫文案同含「已达上限」，旧断言被错误路径满足；#483 只跑了自己新增的编号，看不见。全量变异只在阶段收尾 PR 上跑，中间没有别的防线（#521）。

按 Conventional Commits 提交，scope 用提示词给的值；正文说明改动、理由和有意的取舍。提交后 `git status --short` 为空。

## 6. 开 PR 并等 CI

用 `/pr` 技能开 PR：标题按 Conventional Commits，正文说明改动、验证方式和取舍，末尾一行 `Closes #<N>`。然后等 CI：

```
gh pr checks <pr> --repo odradekk/maou_redux --watch
```

CI 红了先看失败步骤，修好推送后再等一轮。全部通过后才进入下一步。PR 的 CI 跑的是全库测试，PR 绿即全库绿。

## 7. 完成评论

在工单 issue 下留一条评论，固定五项：

```
## 完成报告

1. PR：<链接>
2. 本地验证：<命令与结果，含 --ids 编号与拦截数>
3. CI：<运行链接>，全部通过
4. 与工单要求的偏差或未做项：<无 / 逐条说明>
5. 审查结论：发现 <n> 条，已修 <m> 条，驳回 <k> 条：<每条驳回的理由>
```

第 2 项要列出新增的测试与对应变异条目编号，验收方会用 `--ids` 抽查。

评论发出后任务进入验收；不要合并 PR，不要归档工作区。

## 8. 返工

主 agent 验收不通过时，会在 issue 下发验收报告并通过 Paseo 发消息给你。按报告修改时检查同类情况，不能只改被指出的位置（#346、#350 曾只补指出的位置，漏掉相邻函数或其他文件）。修完后重复 §5–§7：本地三项检查、推送、等 CI、更新完成评论。

## 9. 不要做的事

- 不合并 PR，不归档工作区，不改路线图 #101。
- 不以 `--verify` 代替实际变异，不用重复运行代替确定性复现。
- 不修改 `.agents/skills/emuera-basic-agent-guide/`（外部同步材料，逐字不变）。
- 不改测试来接受错误行为；测试断言错误或要求无法实现时，在完成评论里报告，不做只让测试通过的绕行。
