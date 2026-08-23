# 工单流程 SOP

一张工单 = 一个 Orca worktree = 一个 ante 会话，全程用 `orca` CLI 驱动。

工单在 GitHub Issues（`odradekk/maou_redux`），命令约定见 `issue-tracker.md`；移植决议的索引见地图 issue #1（只读）。

**当前的票序索引是路线图 issue #101**（「移植路线图：十八个子系统到可通关的完整游戏」）。它的子票是**阶段决策票**，阻塞关系用 GitHub 原生依赖表达（`issue_dependencies_summary.blocked_by`）。**实施票不挂 #101**，挂各阶段自己的子地图——先例是 #42（第二条贯通路径，它自身带 `wayfinder:map`，八张 T 票是它的实施票）。没有子地图可挂的零散工作，按 `docs/stub-registry.md` 认领。

## 0. 环境前提

先读这几条，否则后面每一步都会踩。

- Windows 上 CLI 就是 `orca`；Linux 下用 `orca-ide`（裸 `orca` 是 GNOME 屏幕阅读器）。动手前 `orca status --json` 确认 app 在跑，agent 驱动的调用一律带 `--json`。
- **WSL 会话是个例外**：环境变量 `ORCA_CLI_COMMAND` 写着 `orca-ide`，但这台机器上没有这个可执行文件。可用的是 Windows 端的 `orca.exe`（在 PATH 上，`…/AppData/Local/Programs/orca/resources/bin`），它与 app 是同一份安装。
- **`worktree create` 的失败返回多半是假失败**——见过两种形态：`runtime_unavailable`，以及只有一个 `"ok": false` 不带错因（**本项目实测 5 次派发里出现 4 次，每次 worktree 都已在服务端建成**）。连接断了而已。**重试前必须先 `orca worktree list --json` 看一眼**，否则会像实测那样一口气建出 `-2`、`-3` 三个重复 worktree，还得再删。
- **worktree 的选择器认 `displayName`，而它未必等于你传的 `--name`**：`--name t119-s7-kyoten` 实际落成 `odradekk/t119-s7-kyoten`，于是 `--worktree "name:t119-s7-kyoten"` 报错、`--worktree "name:odradekk/t119-s7-kyoten"` 才对。**别猜，用 `path:<绝对路径>`**——路径是 `worktree list` 里的 `path` 字段，稳定且唯一。
- **`--issue <N>` 不保证写上关联**：实测建出来的 worktree `linkedIssue` 仍是 `null`。卡片上看不到关联不代表 worktree 建错了，别据此重建。
- **本机 Orca 的 `commandSourcePolicy` 是 `local-only`，仓库里的 `orca.yaml` 钩子不会执行**（实测：带 `--run-hooks` 删 worktree，仓库脚本一行没跑）。所以仓库里不放 `orca.yaml`；worktree 的 setup 钩子（`npm install`）配在 Orca 的 **Settings → Repository → Hooks**。
- 由此可知：**worktree 删除时没有任何自动归档**。worktree 里 gitignored 的本地产物（`sav/*.sav`、`ere.config.json`）删了就没了，要留下的东西，删之前必须已经推走。
- `.worktreeinclude` 会把主 checkout 的 `ere.config.json` 复制进每个新 worktree（已实测生效）。**主 checkout 那份必须是 `"static": "yml"`**，否则每个新 worktree 一开就是坏的。

## 1. 选票与认领

**可认领的第一张票** = `open` + 阻塞票全部已关闭 + 无 assignee，按编号序取第一个。

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是本次会话的第一次写操作，先认领再动手，并发会话才不会撞车。

## 2. 并发上限与派单时机

同时最多 5 个工单。派新单前先数一遍在跑的（不含主 checkout `master`）：

```
orca worktree ps --json
```

**建 worktree 的基线必须是当前 `master`，前置票没合并就别建。** SOP 早先只把这条写给「有阻塞关系的票」，实测**对无依赖的并行票同样成立**：阶段 1 的四张票（#115/#117/#118/#119）都是提前建的 worktree，四张全部撞上 rebase，冲突面每次一样——`LEDGER_COUNT_BASELINE`、`test/engine-skip-baseline.txt`、`tools/mutations/*.mjs`、`docs/stub-registry.md`。这些是**全局计数字段与全局登记表**，任何两张票并行都会碰。

代价是可量化的：一次 rebase + 解四处冲突 + 重跑一遍全量变异（约 15 分钟），比等前一张票合并再派贵得多。所以顺序是「**验收 → 合并 → 再派下一张**」，而不是「一次派满 5 张」。

**派单前还要找一遍隐性硬依赖**——票据元数据上没有阻塞关系，但代码上有：

> #130（给夹具加按钮白名单校验）与 #129（补 [109] 按钮）在工单里互不阻塞。但 #130 一加校验，#117/#118/#120 的用例喂进的 `109` 立刻被拦下变红，而那枚按钮归 #129——**#130 在自己分支里无法弄绿**。

判据：**这张票会不会让别的票的用例变红，而修复手段不在自己范围内？** 会，就是硬依赖，必须串行。

## 3. 建 worktree 并派 ante

**这是五步，不是三步。** 前四步每一步都有一个已知的失败形态，`--agent` 那一步的失败是**常态而非偶发**。

```
# 1. 建（失败返回先当假失败处理，见 §0）
orca worktree create --name t<N>-<slug> --no-parent --agent ante --issue <N> --json
orca worktree list --json          # 无论上一步返回什么，都来这一下确认

# 2. 取终端句柄（create 的返回经常拿不到，别指望它）
orca terminal list --json          # 按 worktreePath 含 t<N> 过滤出 handle

# 3. 起 ante（必然要发两次，见下）
orca terminal switch  --terminal <handle> --json
orca terminal send    --terminal <handle> --text "ante --yolo" --enter --json
orca terminal send    --terminal <handle> --text "ante --yolo" --enter --json
orca terminal wait    --terminal <handle> --for tui-idle --timeout-ms 180000 --json

# 4. 送简报（单行指向文件，绝不多行）
orca terminal send --terminal <handle> --text "请读 /tmp/brief-<N>.txt 这份工单简报，按其中要求执行。" --enter --json

# 5. 标记（选择器用 path:，见 §0）
orca worktree set --worktree "path:<绝对路径>" --comment "<一句话>" --workspace-status in-progress --json
```

- 命名 `t<N>-<slug>`，`<N>` 取工单编号（有 T 编号的取 T 编号）。
- `--no-parent`：工单彼此独立。基线省略 `--base-branch`，用仓库默认 base（`origin/master`）。
- `--agent ante` 让 ante 落在 worktree 的第一个终端，这是唯一正确的派法。「先裸建 worktree 再 `terminal create` 同一个 agent」会多出一个没人用的空壳 shell。
- `--repo` 省略时 Orca 从当前 worktree 推断仓库；跨仓库才需要 `orca repo list --json` 取 id。

**`--agent` 启动几乎必然输给终端初始化的竞速——按「一定会掉回 shell」来写流程。** 本项目连续 5 次派发，5 次都在终端里留下 `The cursor position could not be read within a normal duration` 然后掉回 shell。所以第 3 步是必经流程，不是异常处理。

**而且第一次 `ante --yolo` 一定被吃掉。** 掉回 shell 时输入行上粘着残留的转义序列（形如 `1;2c1R`），第一次发出去会变成：

```
bash: 1: command not found
bash: 2c1Rante: command not found
```

第二次才干净。所以**连发两次**是正常流程；只发一次然后等 `tui-idle` 会一直等到超时。先 `terminal switch` 过去再发，不然发到别的终端上。

**绝对不要用 `--prompt` 传多行简报。** `--prompt` 是逐字符打进 TUI 的：**每个换行都是一次回车**，而斜杠开头会拉出命令菜单，后续回车就在菜单里乱选。实测一次二十多行的简报最后选中了 `/exit`，ante 当场退出，worktree 空跑一趟（终端里只剩 `❯ /exit` 和 `Signing off.`）。

**正确的送法是单行 + 简报文件**：简报写进 `/tmp/brief-<N>.txt`（worktree 的终端是 WSL shell，`/tmp` 与派单会话共享），再发**一行**指令让它去读。一行 = 一次回车，没有菜单可选。

**每一步都要 `terminal read` 验证，别信 `accepted: true`。** 那只证明字节写进了 PTY，不证明 agent 收到了、更不证明它还活着。判据：`terminal read` 的输出里能看到 `yolo mode on` 与模型名那一行，才算 ante 起来了；送完简报后能看到 `esc / ctrl-c to interrupt` 与上涨的 `ctx`，才算它真的开工了。

**不要同时起两个。** 并发 `worktree create --agent` 会一起输掉竞速，两个都掉回 shell，还得逐个捞。逐张派，前一张确认开工再派下一张。

### 简报模板

简报写进 `/tmp/brief-<N>.txt`，**第一行是 `/implement` 加一个空格再接任务描述**（research 票用 `/research`）。斜杠命令后没有空格不会被识别为技能调用；写成「请用 /implement 技能……」只是在*请求*它调用，直接调用更稳。

```
/implement issue #<N>：<标题>
工单正文与验收清单：gh issue view <N> --repo odradekk/maou_redux --comments
父票（这张票在整体中的位置与测试策略）：gh issue view <父票> --repo odradekk/maou_redux
相关决议，动手前请读：#<a>、#<b>

<三到五条它自己查会很贵、且容易查错的既有事实，直接给结论>

跑测试前必须设这个环境变量，否则 <当前基线数> 个用例静默跳过而测试仍报绿：
   export ERE_ENGINE_ASAR=/mnt/d/Code/era/ere-4.8.0-win-x64/resources/app.asar
worktree 若缺 node_modules 先 npm ci。跑全量变异用 node tools/mutation-check.mjs，
**不要加 --jobs**：并行副本看不到引擎会误报跳过。

两个全局计数字段：tools/mutation-check.mjs 的 LEDGER_COUNT_BASELINE 现为 <n>，
test/engine-skip-baseline.txt 现为 <m>。只管把自己分支的数改对（新增变异条目同步
抬基线；新增依赖引擎的用例同步改跳过数并在注释里写出算式），跨票对账由派单人处理。

自检与提交：
- 三项自检全绿（npm test、npx eslint . --max-warnings 0、npx prettier --check .）
- 逐条对照验收清单
- 验收里写着「且此行为有测试」的每一条，做变异测试自证：把被测规则改坏，
  确认真的有用例失败（本项目在 #10 出过事：测试全绿，规则却已失效）
- 按 Conventional Commits 提交，scope 用 <scope>
- 完成后停下等验收，合并与开 PR 由派单人做
```

**中间那两段是每次派单都要照抄的常量**，派单前先去仓库取当前值填进去：

```
grep -n "LEDGER_COUNT_BASELINE = " tools/mutation-check.mjs
tail -1 test/engine-skip-baseline.txt
```

漏掉引擎变量那段的后果不是「测得慢一点」，而是**它交上来一份自称全绿、实则几十个用例没跑的东西**，验收时才发现。这条比简报里任何一条领域事实都值钱。

两条写法约定：

- **简报不必让它读 `AGENTS.md`**：agent 会自动加载，写进去只是浪费开头的注意力。
- **简报给结论。** 让它自己去 `target/`（315,953 行）或引擎源码里重查一件已经查实的事，既慢又容易得出与既有决议矛盾的结果。但**这张票自己要解决的设计问题留给它**，只要求把判断依据写在 issue 上。

`/implement` 内部驱动 `tdd` 一次一个红绿切片，收尾跑 `code-review` 的两轴审查（Standards + Spec）再提交。绕过它就少了这层自检，交上来的东西得从头人工复核。

## 4. 监督

```
orca terminal read --terminal <handle> --json
orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 300000 --json
orca terminal send --terminal <handle> --text "<追加指示>" --enter --json
orca worktree set --worktree id:<repoId>::<路径> --comment "<一句话进展>" --workspace-status in-review --json
```

发消息前先 `read`。等 TUI 就绪必须带 `--timeout-ms`，否则输入会丢在启动过程里。handle 报 `terminal_handle_stale` 就用 `orca terminal list` 重取，只用最新那个。

## 5. 验收：自己重跑一遍

agent 的自述是线索，不是证据。在 worktree 目录里逐条对照 issue 的验收清单：

1. **三项自检**（worktree 若缺 `node_modules`，`npx eslint` 会去拉 v9 并报错，先 `npm ci`）。
2. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。

   贯通验证期间靠这一步抓到三条**空用例**：用例名声称守住某个行为，实际守不住。共同特征是**测试构造的世界里，被测条件的两个分支从未分开过**。守卫拦下与走缺失路径的可观测结果相同（#21）、被测条件的两个分支在在场数据里恰好重合（#24）、记录失效方式的表征测试怎么改被测代码都绿（#20）。光读用例名与断言看不出来，只有改坏被测行为才能发现。

   变异也要挑对位置：改一处应当只死该行为对应的用例。一改就死一大片，说明用例耦合过深；一改全绿，说明那条根本没被守住。

3. 声称「与引擎行为一致」的，用引擎自己的代码验证，而不是自己写的镜像——解包 `ere-4.8.0-win-x64/resources/app.asar`（webpack bundle，把入口 `r(r.s=311)` 换成暴露 require 即可直接调用引擎的解析器），#17 用过这招。
4. 1:1 移植的改动，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。
5. **机械改名类迁移（裸寻址 → 门面、批量重命名），验收证据是「寻址多重集等价」，不是行为覆盖。** 从产物源码建「门面字段 → 寻址」映射，再解析迁移 diff，把删掉的旧寻址与新增的门面写各自归约成 `表:下标` 的多重集，逐条比对——每一处迁移后写的必须仍是它原来写的那个地址。

   为什么不能靠行为覆盖：#90 迁 `source-check.js` 的 57 处跨域写时，派单的人在工单里写了「它在黄金样本的比对窗口内，改错了比对当场红」。**实测不成立**：均匀抽样 10 处、逐处把赋值右侧改成 `12345`，**比对一处都没拦下**（未解释恒为 0），用例只拦下 3 处。该文件 309 个分支，黄金样本只经过一小部分，外推约 40/57 处没有任何回归防护。迁移是全量的，覆盖是局部的，**两者不能互相担保**。

   **只能在合并时做**：待办条目表（`tools/domain-ledger.mjs` 一类）的条目一迁完就删，事后再无「原来写的是哪个地址」的记录。错过这一刻就永远补不上。

## 6. 收尾

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file -
gh pr merge <pr> --repo odradekk/maou_redux --squash --delete-branch
git -C D:/Code/era pull --ff-only origin master
orca worktree rm --worktree "id:<repoId>::<路径>" --force --json
gh issue comment <n> --repo odradekk/maou_redux --body "<决议：交付物、验证方式、有意的取舍、给后续票的提醒>"
```

- PR 正文以 `Closes #<n>` 结尾，合并即自动关票。
- **删 worktree 前确认提交都已推送**：本机没有归档钩子，删了不可恢复。
- **需要启动引擎的手工验收，在合并之后、在主 checkout `D:\Code\era` 上做**：引擎【打开游戏】指向的是主 checkout，worktree 的存档也不会保留。

## 7. 决议的记录方式

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**再继续（#3 被 #6 推翻就是先例）。地图 issue #1 只读，不改写历史。
