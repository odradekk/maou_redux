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

agent 的自述是线索，不是证据。在 worktree 目录里逐条对照 issue 的验收清单。

**分支落后 master 时，先按 §5.5 rebase 再验收**——否则要验两遍。

**开跑前先设引擎变量，否则等于没验：**

```
export ERE_ENGINE_ASAR=/mnt/d/Code/era/ere-4.8.0-win-x64/resources/app.asar
```

引擎查找的第三处回落写的是 Windows 路径 `D:\Code\era`，WSL 下解析不了。不设它会**静默跳过几十个用例而测试仍报绿**，`mutation-check.mjs` 也会误报「N 条跳过」。#113 验收时被这个假象误导过一次。

### 四步

1. **三项自检（带引擎）**：`npm test` / `npx eslint . --max-warnings 0` / `npx prettier --check .`。worktree 若缺 `node_modules` 先 `npm ci`——否则 `npx` 会从仓库外拉版本，eslint 与 prettier 都给出与仓库不一致的结果。
2. **跳过基线核对（不带引擎）**：`env -u ERE_ENGINE_ASAR npm test`，跳过数必须等于 `test/engine-skip-baseline.txt` 里的数字。新增依赖引擎的用例必须同步改该数并在注释里写出算式；**rebase 后注释里的算式会失准**（用例总数变了），一并更正。
3. **全量变异检查（带引擎、串行）**：`node tools/mutation-check.mjs`，约 12–15 分钟。**严格标准是「全部拦下、零跳过」**。**不要用 `--jobs`**，并行副本看不到引擎会误报跳过。
4. **逐条比对工单验收清单**，并抽查本票新增的变异条目是否真被拦下。

### 逐条对照清单时的八个判据

1. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。

   贯通验证期间靠这一步抓到三条**空用例**：用例名声称守住某个行为，实际守不住。共同特征是**测试构造的世界里，被测条件的两个分支从未分开过**。守卫拦下与走缺失路径的可观测结果相同（#21）、被测条件的两个分支在在场数据里恰好重合（#24）、记录失效方式的表征测试怎么改被测代码都绿（#20）。光读用例名与断言看不出来，只有改坏被测行为才能发现。

   变异也要挑对位置：改一处应当只死该行为对应的用例。一改就死一大片，说明用例耦合过深；一改全绿，说明那条根本没被守住。

2. **条目表的 `✓` 证明不了「新挂的宿主也红」。** `mutation-check` 的判据是「`tests` 列表里**至少一个**文件红、且输出含 `must_mention`」。给已有条目挂上新宿主（如把端到端加进 `tests`）时，很可能是老宿主代红、新宿主全程绿——条目表照样打 ✓。**验法**：把该变异应用一次，**只跑新宿主那一个文件**，确认它自己红。#120 的端到端就是这么验的（M157/M188/M220 三条单跑均红，M188 下实测天数从 100 掉到 49）。

3. **`must_mention` 写得太短等于没判。** 语义是「输出包含该片段」，片段若在目标测试文件里多处出现，任何一条含该词的用例变红都算命中。#129 的 M221 原值是 `'侵略'`，而该文件里「侵略」出现 6 次——收紧为断言原文 `'侵略必须是按钮'` 才真的在鉴别。**判据**：`grep -c '<片段>' test/<宿主>.test.js` 应为 1。

4. **防线类工单，直接还原它声称能防的那个场景。** 只看变异条目表不够——那验的是「条目被拦下」，不是「防线对真实缺口有效」。#130（夹具按钮白名单）的验法是把 `[109]` 按钮从 `page-main-menu.js` 拆掉、还原 #129 的原始状态：6 条用例当场红，而**在该 PR 之前同样拆掉一条都不会红**。这才是防线成立的证据。

5. **声称「与引擎行为一致」的，用引擎自己的代码验证**，而不是自己写的镜像——解包 `ere-4.8.0-win-x64/resources/app.asar`（webpack bundle，把入口 `r(r.s=311)` 换成暴露 require 即可直接调用引擎的解析器），#17 用过这招。

   **更要紧的是反向**：夹具能证明「我们调用了」，证明不了「引擎接受了」。引擎侧的短路（`addCharacter` 对无预设角色直接返回 false）、引擎侧的拒收（`input()` 只送达已打印按钮的快捷键）都只有引擎自己的代码能暴露。#21/#22 因前者误报通过，#129 因后者让整条侵略线在实机上入口不存在而四张票全绿。**问一句「这个行为在引擎里真的会发生吗」，比读十遍断言有用。**

6. **1:1 移植的改动**，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。移植中**新发现的原作缺陷要登记进 #14**（已累积三批），并尽量配一条反向变异钉住它——#116 的 M214／M218 是先例，让「不要修好原作缺陷」这条约定第一次有了机器可执行的守卫。

7. **机械改名类迁移（裸寻址 → 门面、批量重命名），验收证据是「寻址多重集等价」，不是行为覆盖。** 从产物源码建「门面字段 → 寻址」映射，再解析迁移 diff，把删掉的旧寻址与新增的门面写各自归约成 `表:下标` 的多重集，逐条比对——每一处迁移后写的必须仍是它原来写的那个地址。

   为什么不能靠行为覆盖：#90 迁 `source-check.js` 的 57 处跨域写时，派单的人在工单里写了「它在黄金样本的比对窗口内，改错了比对当场红」。**实测不成立**：均匀抽样 10 处、逐处把赋值右侧改成 `12345`，**比对一处都没拦下**（未解释恒为 0），用例只拦下 3 处。该文件 309 个分支，黄金样本只经过一小部分，外推约 40/57 处没有任何回归防护。迁移是全量的，覆盖是局部的，**两者不能互相担保**。

   **只能在合并时做**：待办条目表（`tools/domain-ledger.mjs` 一类）的条目一迁完就删，事后再无「原来写的是哪个地址」的记录。错过这一刻就永远补不上。

8. **本票若触发破坏性改动，确认版本已抬。** 判据是「同一条寻址，在旧档里读出的值是否仍然是它现在的语义」——否则即破坏性，判定表见 `docs/adr/0006-save-compatibility-not-guaranteed.md`。触发时 `yml/GameBase.yml` 的【版本】与【最低支持版本】必须同抬、且两者相等，【版本代号】同步。

   **这条只能人工查，不要指望工具。** 机器看不出「语义变没变」，唯一可机器化的子集（扩展角色表字段数变了但版本没抬）覆盖面太窄，不值得再加一处 §2 那样的固定冲突面——这是 ADR-0006 明确权衡后的选择，别顺手加个守卫把它推翻了。

   最常触发的三类：给 `yml/_fixed.json` 的 `extendedCharaTables` 加表或加字段、改动 `yml/Chara*.yml` 的预设内容、改动已有序号的含义。**新增序号与新增整张表不触发**（引擎 `loadData` 会补 0，而 0 就是新字段的正确初值）。

### 验收中发现的小瑕疵，就在本分支顺手修

文档笔误、rebase 后失准的注释算式、判定过松的 `must_mention`、死参数这一类，**直接在同一分支单独一个提交修掉**，在决议评论里写明「验收时改的一处」，不要另开 issue——立票的开销（建 worktree、派 agent、再验一轮）远高于问题本身。

分界是「修它会不会改变产品行为、或需要设计判断」：会，就立票。实测两例都立了票——主菜单按钮缺失（改变玩家可达性，#129）、夹具校验缺失（需要设计判断，#130）。

## 5.5 rebase 与冲突（几乎每张票都会遇到）

worktree 建得早于前置票合并时（见 §2），验收前必须先 `git rebase origin/master`。**先 rebase 再验收，别验两遍。**

冲突面高度固定，就那四处：

| 冲突处                                                | 解法                                                                                                             |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------- |
| `tools/mutation-check.mjs` 的 `LEDGER_COUNT_BASELINE` | **按「保留双方意图」相加**：master 值 + 本票增量。改完 `node tools/mutation-check.mjs --verify` 自校验实际条目数 |
| `tools/mutations/*.mjs`                               | 两边条目全留。**M 编号撞号时把后合并那批整体顺延**（编号是历史惯性标签，唯一性由 `desc` 全串保证，见工具头注）   |
| `test/engine-skip-baseline.txt`                       | 同样相加；注释里的算式按 rebase 后实测更正                                                                       |
| `docs/stub-registry.md`                               | 两边都会重排整张表。**把三方都归一化后再 `git merge-file`**（`sed 's/ _/ /g; s/ _                                | \*/ | /g; s/-\{3,\}/---/g'`），真冲突通常只剩一两处，解完交给 `prettier --write` 重排 |

**数组元素之间的冲突，边界会落在两侧共享的分隔符上。** 实测两次：`tools/mutations/event.mjs` 的合并区正好切在 `},` 上，两边各缺一半——**去掉冲突标记后是语法错误**。光检查「标记删干净了」不够，**必须让工具解析一次**（`node tools/mutation-check.mjs --verify` 会当场报 `SyntaxError`）。

`prettier --write` 对 Markdown 里**不在反引号内**的下划线标识符是有损的（`AGENT_1.ERB` → `AGENT*1.ERB`）。解完冲突跑一次体征检查：`grep -nE '[A-Za-z0-9]\*[A-Za-z0-9]' <文件>`，应为空。

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
- **需要启动引擎的手工验收，在合并之后、在主 checkout `D:\Code\era` 上做**：引擎【打开游戏】指向的是主 checkout，worktree 的存档也不会保留。这一步只有人能做，agent 的职责是交出**可复现的置位步骤**（改哪几行、从哪个画面进、看哪几个点），做完回票补一条确认评论。

  临时置位那几行**绝不能提交**：验完 `git checkout -- <文件>` 撤回，`git status` 确认干净。置位常常会让某条「全量写入」类用例变红（`test/event-first.test.js` 的 `expected_init_writes` 就是），**那是预期的，不要去改测试**。

## 7. 决议的记录方式

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**再继续（#3 被 #6 推翻就是先例）。地图 issue #1 只读，不改写历史。
