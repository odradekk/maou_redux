# 工单流程 SOP

一张工单 = 一个 Orca worktree = 一个 agent 会话（代码票用 `ante`，口上票用 `pi`，见 §3），全程用 `orca` CLI 驱动。

工单在 GitHub Issues（`odradekk/maou_redux`），命令约定见 `issue-tracker.md`；移植决议的索引见地图 issue #1（只读）。

**当前的票序索引是路线图 issue #101**（「移植路线图：十八个子系统到可通关的完整游戏」）。它的子票是**阶段决策票**，阻塞关系用 GitHub 原生依赖表达（`issue_dependencies_summary.blocked_by`）。**实施票不挂 #101**，挂各阶段自己的子地图——先例是 #42（第二条贯通路径，它自身带 `wayfinder:map`，八张 T 票是它的实施票）。没有子地图可挂的零散工作，按 `docs/stub-registry.md` 认领。

## 0. 环境前提

先读这几条，否则后面每一步都会踩。

- Windows 上 CLI 就是 `orca`；Linux 下用 `orca-ide`（裸 `orca` 是 GNOME 屏幕阅读器）。动手前 `orca status --json` 确认 app 在跑，agent 驱动的调用一律带 `--json`。
- **WSL 会话是个例外**：环境变量 `ORCA_CLI_COMMAND` 写着 `orca-ide`，但这台机器上没有这个可执行文件。可用的是 Windows 端的 `orca.exe`（在 PATH 上，`…/AppData/Local/Programs/orca/resources/bin`），它与 app 是同一份安装。
- **`worktree create` 的失败返回多半是假失败**——见过两种形态：`runtime_unavailable`，以及只有一个 `"ok": false` 不带错因（**本项目实测 17 次派发里出现 16 次，每次 worktree 都已在服务端建成**；阶段 3 后期连续四张票全是假失败）。连接断了而已。**重试前必须先 `orca worktree list --json` 看一眼**，等 50 秒足够它出现；否则会像实测那样一口气建出 `-2`、`-3` 三个重复 worktree，还得再删。
  - **假失败还会多出一个终端**：`terminal list` 里会有两个 handle，一个是 setup 钩子跑 `npm install` 的、一个是 agent 的。**别挑错**——`terminal read` 一眼就能分：agent 那个留着 `ante '--yolo'` 与 cursor-position 报错，setup 那个是 `npm audit` 之类的收尾输出。
- **worktree 的选择器认 `displayName`，而它未必等于你传的 `--name`**：`--name t119-s7-kyoten` 实际落成 `odradekk/t119-s7-kyoten`，于是 `--worktree "name:t119-s7-kyoten"` 报错、`--worktree "name:odradekk/t119-s7-kyoten"` 才对。**别猜，用 `path:<绝对路径>`**——路径是 `worktree list` 里的 `path` 字段，稳定且唯一。
- **`--issue <N>` 不保证写上关联**：实测建出来的 worktree `linkedIssue` 仍是 `null`。卡片上看不到关联不代表 worktree 建错了，别据此重建。
- **仓库里的 `orca.yaml` 钩子不会执行**（`commandSourcePolicy` 是 `local-only`，实测带 `--run-hooks` 删 worktree 时仓库脚本一行没跑）。所以钩子配在 Orca 的 **Settings → Repository → Hooks**，CLI 无法写这个字段。**WSL 基座的 `npm install` 钩子已配好**，新 worktree 建成即可直接 `npx eslint` / `npx prettier`，无须 `npm ci`。两个仓库 `displayName` 都是 `era`，GUI 里配错过一次——用 `orca repo list --json` 核对 `hookSettings.scripts.setup` 落在哪个 id 上。
- 由此可知：**worktree 删除时没有任何自动归档**。worktree 里 gitignored 的本地产物（`sav/*.sav`、`ere.config.json`）删了就没了，要留下的东西，删之前必须已经推走。
- `.worktreeinclude` 会把主 checkout 的 `ere.config.json` 复制进每个新 worktree（已实测生效）。**主 checkout 那份必须是 `"static": "yml"`**，否则每个新 worktree 一开就是坏的。

### 两个 checkout，各管一头

|                 | 路径                              | 用途                                                                                         | Orca 仓库 id                           |
| --------------- | --------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------- |
| **主 checkout** | `D:\Code\era` = `/mnt/d/Code/era` | **只做引擎手工验收**：GUI 引擎是 Windows 程序，必须留在 Windows 盘上。合并后 `git pull` 同步 | `f7e86ea9-1881-436f-9e29-d71dcbaae393` |
| **WSL 基座**    | `/home/bam00n/era`                | **所有 agent worktree 从它建**，落点 `~/orca/workspaces/era/<name>`                          | `71b28045-8ed3-4485-a036-2db90ae7758b` |

**派单一律用 WSL 那个 id。** `/mnt/d` 是 9p 文件系统（WSL 访问 Windows 盘的协议），同一套自检在上面慢 1.5 倍且方差大得多——实测 `npm test` 中位 27s（26–32），ext4 上 18s（16–18）。两个仓库在 Orca 里 `displayName` 都是 `era`，**按名字选会撞**，所以选择器用 `id:`，别用 `name:`。

两边都以 GitHub 为准同步（`git pull --ff-only origin master`），互不引用。

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

**零步骤 + `runner_name` 为空 + 秒级失败 = 基础设施**（私有仓库的 Actions 配额、权限），与代码无关；有 runner 有步骤才去查代码。两次连红都是有人为别的事顺手 `gh run list` 才撞见的——一次 18 次 4 天（`ENGINE_SKIP_BASELINE` 差 1，真 bug），一次 15 次 2 天（配额耗尽，零 runner）。第二次照第一次的形态白查了一轮 eslint/prettier/裸克隆，**先看 runner 能省这一轮**。

CI 红期间 master 的绿红没有信息量，这比红本身危险：真回归也看不出来。本地补信号照 §5 的四步跑，engineless 那半边要在 `/tmp` 裸克隆里跑并显式 `ERE_ENGINE_ASAR=none`（回落会摸到主 checkout 的引擎）。

同时最多 5 个工单。派新单前先数一遍在跑的（不含主 checkout `master`）：

```
orca worktree ps --json
```

**建 worktree 的基线必须是当前 `master`，前置票没合并就别建。** 对无依赖的并行票同样成立：阶段 1 的 #115/#117/#118/#119 都提前建树，四张全部撞上 rebase，冲突面每次一样——就是 §5.5 表里那四处**全局计数字段与全局登记表**。代价约 15 分钟（rebase + 解四处 + 重跑全量变异），比等前一张合并再派贵得多。顺序是「**验收 → 合并 → 再派下一张**」。

**判串行看「落点是否相邻」，不是「是否同一文件」。** D1–D6 的票面都写「都改 `era-fixture.js`，必须串行」，实测过宽：#151 落在 `:848`、#152 落在 `:974-1010`，相隔百余行，git 自己就合了。行级相邻的只有那四处全局字段。

**派单前找一遍暗耦合**——票据元数据上互不阻塞，代码上却互相牵扯。四种形态，各有一个判据：

| 形态         | 判据                                                 | 实例                                                                                                           |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **拦红对方** | 会不会让别的票的用例变红，而修复手段不在自己范围内？ | #130 加按钮白名单，#117/#118/#120 喂的 `109` 当场被拦，而那枚按钮归 #129——#130 在自己分支里弄不绿              |
| **接不上线** | 票面里有没有「换掉某张票留的存根」？                 | #184 要换 #172 留的 `DUNGEON_BITCH` 存根，建树时 `ere/dungeon/` 还不存在——交上来是「真身实现了但无人 require」 |
| **重复建桩** | 两张票会不会给同一个范围外函数各建一个存根？         | #177/#178 都调 `@SELL_EX_ITEM`，合并后一个无参版、一个带 cid 版，登记表两行                                    |
| **数字漂移** | 验收标准里有没有一个数字，由另一张在跑的票决定？     | #212 改 ere 侧输出，#211b 锁的对拍基线 `537/176/2549` 当场变 `552/176/2536`                                    |

**前两种必须串行**（自己分支里绿不了）；**后两种可以并行，但要在简报里说清**：

- 重复建桩——`grep -oP "CALL \K[A-Z_0-9]+" <源 ERB> | sort -u` 减去票面自己的函数名与 `ere/` 已有的，与在跑的票比对；撞上就指名「那个存根由 #N 建，等它合并后复用」。
- 数字漂移——基线四数、`LEDGER_COUNT_BASELINE`、跳过数、端到端天数都属这一类。

**补救都在验收期**：接不上线查「真身有没有人调用」（`grep -rn "<新模块名>" ere/` 只剩测试引用就是没接上）；重复建桩不致命，两份都在登记表里，改名互相指认（「房间侧调用点」「城镇侧调用点」）比强行合并、为一个存根拉跨模块依赖要好。

## 3. 建 worktree 并派 agent

**先选载体**：口上票（`ERB/口上/` 与迷宫口上四票 H13–H16）用 **`pi`**（#168 裁定 7：「agent 逐字对照复核，载体是 pi agent 而非 ante」），其余代码票用 `ante`。两者 Orca 都认，但**起法不同，见第 3 步**。

**前四步每一步都有一个已知的失败形态**，`--agent` 那一步的失败是常态而非偶发。

```
# 1. 建（失败返回先当假失败处理，见 §0；--repo 必须显式给 WSL 基座的 id）
orca worktree create --name t<N>-<slug> --no-parent --agent <ante|pi> --issue <N> \
  --repo id:71b28045-8ed3-4485-a036-2db90ae7758b --json
orca worktree list --json          # 无论上一步返回什么，都来这一下确认

# 2. 取终端句柄（create 的返回经常拿不到，别指望它）
orca terminal list --json          # 按 worktreePath 含 t<N> 过滤出 handle

# 3a. ante：三发（空回车吃残留、clear 洗一遍、再起，见下）
orca terminal switch  --terminal <handle> --json
orca terminal send    --terminal <handle> --text "" --enter --json
orca terminal send    --terminal <handle> --text "clear" --enter --json
orca terminal send    --terminal <handle> --text "ante --yolo" --enter --json
orca terminal wait    --terminal <handle> --for tui-idle --timeout-ms 180000 --json

# 3b. pi：一发就起来（不输竞速，无须三发），但要多等一轮再送简报
orca terminal switch  --terminal <handle> --json
orca terminal read    --terminal <handle> --json   # 等到看见 Packages: / pi-square

# 4. 送简报（单行指向文件，绝不多行）
orca terminal send --terminal <handle> --text "请读 /tmp/brief-<N>.txt 这份工单简报，按其中要求执行。" --enter --json

# 5. 标记（选择器用 path:，见 §0）
orca worktree set --worktree "path:<绝对路径>" --comment "<一句话>" --workspace-status in-progress --json
```

- 命名 `t<N>-<slug>`，`<N>` 取工单编号（有 T 编号的取 T 编号）。
- `--no-parent`：工单彼此独立。基线省略 `--base-branch`，用仓库默认 base（`origin/master`）。
- `--agent <id>` 让 agent 落在 worktree 的第一个终端，这是唯一正确的派法。「先裸建 worktree 再 `terminal create` 同一个 agent」会多出一个没人用的空壳 shell。
- **`--repo` 不能省。** 省略时 Orca 从当前目录推断，而派单会话通常就在主 checkout 里——那会把 worktree 建到 9p 上，白丢 1.5 倍速度。两个仓库同名，只能用 `id:`（见 §0 的表）。

**ante 与 pi 的差别，两处都会绊人：**

|              | ante                               | pi                                |
| ------------ | ---------------------------------- | --------------------------------- |
| 起法         | **必然掉回 shell，要三发**（见下） | **一发就起来**，无须三发          |
| 起来的判据   | 看到 `yolo mode on` + 模型名       | 看到 `Packages:` / `pi-square`    |
| 送简报的时机 | `wait --for tui-idle` 之后即可     | **`tui-idle` 不可靠，要多等一轮** |

**`terminal wait --for tui-idle` 对 pi 会提前返回。** 实测两张 pi 票的简报都送空了——TUI 还在初始化，字节写进 PTY 但没人接。表现是 `terminal read` 里只有 `Packages:` 那几行、没有 `Working...`。**判据是送完简报后能看到 `Working...` 或上涨的 `Context`**，看不到就等 15 秒重发一次（重发无害，pi 不会把两条当两个任务）。

**ante 的三发是必经流程，不是异常处理。** 连续 13 次 ante 派发，13 次都留下 `The cursor position could not be read within a normal duration` 然后掉回 shell，输入行上粘着转义残留（形如 `1;2c1R`），直上 `ante --yolo` 会被污染成 `bash: 2c1Rante: command not found`。空回车吃残留、`clear` 洗一遍、第三发才起——实测 6/6 一次成。**pi 没有这个问题。** 先 `terminal switch` 过去再发，不然发到别的终端上。

**简报一律走「单行指令 + `/tmp/brief-<N>.txt`」**（worktree 终端是 WSL shell，`/tmp` 与派单会话共享）。一行 = 一次回车，没有菜单可选。`--prompt` 是逐字符打进 TUI 的，**每个换行都是一次回车**，斜杠开头还会拉出命令菜单——实测一份二十多行的简报最后选中 `/exit`，ante 当场退出，worktree 空跑一趟。

**每一步都要 `terminal read` 验证，别信 `accepted: true`。** 那只证明字节写进了 PTY，不证明 agent 收到了、更不证明它还活着。判据：`terminal read` 的输出里能看到 `yolo mode on` 与模型名那一行，才算 ante 起来了；送完简报后能看到 `esc / ctrl-c to interrupt` 与上涨的 `ctx`，才算它真的开工了。

**不要同时起两个。** 并发 `worktree create --agent` 会一起输掉竞速，两个都掉回 shell，还得逐个捞。逐张派，前一张确认开工再派下一张。

### 简报模板

简报写进 `/tmp/brief-<N>.txt`，**第一行是 `/implement` 加一个空格再接任务描述**（research 票用 `/research`）。斜杠命令后没有空格不会被识别为技能调用；写成「请用 /implement 技能……」只是在*请求*它调用，直接调用更稳。

```
/implement issue #<N>：<标题>
工单正文与验收清单：gh issue view <N> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
父票（这张票在整体中的位置与测试策略）：gh issue view <父票> --repo odradekk/maou_redux
相关决议，动手前请读：#<a>、#<b>

<三到五条它自己查会很贵、且容易查错的既有事实，直接给结论>

worktree 若缺 node_modules 先 npm ci。跑测试一律用 bash tools/capped.sh 包一层
（并发时不把机器压死），全量变异用 bash tools/capped.sh node tools/mutation-check.mjs
--jobs 4。引擎 asar 会自动回落命中，不必设 ERE_ENGINE_ASAR。

三个全局计数字段：tools/mutation-check.mjs 的 LEDGER_COUNT_BASELINE 现为 <n>，
test/engine-skip-baseline.txt 现为 <m>，变异条目的 M 编号已用到 M<k>——**你的新
条目从 M<k+1> 起编**。只管把自己分支的数改对（新增变异条目同步抬基线；新增依赖
引擎的用例同步改跳过数并在注释里写出算式），跨票对账由派单人处理。

自检与提交：
- 三项自检全绿（npm test、npx eslint . --max-warnings 0、npx prettier --check .）
- 逐条对照验收清单
- 验收里写着「且此行为有测试」的每一条，做变异测试自证：把被测规则改坏，
  确认真的有用例失败（本项目在 #10 出过事：测试全绿，规则却已失效）
- 按 Conventional Commits 提交，scope 用 <scope>
- 完成后停下等验收，合并与开 PR 由派单人做
```

**简报里绝不要写 `gh issue view … --comments`。** GitHub 于 2024-05-23 下线 Projects (classic)，本机 `gh` 2.46.0 的 `issue view` 仍在 GraphQL 里请求 `repository.issue.projectCards`——**该命令现在必然失败**，只吐一行「GraphQL: Projects (classic) is being deprecated」。阶段 4 派头两张票时两个 agent 同时撞上，白烧一轮。上面模板里的 `--json` 形式是验证过的替代（正文与全部评论一次拿到）。`gh issue comment` / `edit` / `close` 不受影响。

**中间那两段是每次派单都要照抄的常量**，派单前先去仓库取当前值填进去：

```
grep -n "LEDGER_COUNT_BASELINE = " tools/mutation-check.mjs
tail -1 test/engine-skip-baseline.txt
grep -hoE "\bM[0-9]+\b" tools/mutations/*.mjs | sort -u -t M -k2 -n | tail -1
```

**M 号段按已派出的票记账，不能只看 master 的最大号**——在跑的票还没合并，仓库里看不出撞车。给每张在跑的票留一段并写进简报，下一张从上一段末尾之后起：

```
#182 → M500 起   #185 → M520 起   #176 → M540 起   #180 → M560 起
```

**宽度按票的规模给，十函数以上直接留 40。** 估法看验收清单：「每个 X 各有一条测试」这类逐项条目，条数至少等于 X 的个数，再加接线、原作缺陷反向钉、观测锚点自证。号段浪费无害（M 号只是引用锚点，不连续没关系）；撞号要在合并时手工解 `tools/mutations/*.mjs` 的冲突，贵得多。

实测栽过三次：#172 与 #183 都被给了「M375 起」（#172 那时未合并，仓库看不出）；#177 写了 22 条 M600–M621 而下一段起点是 M620，溢出两号；连撞五次里唯一没撞的那次，就是简报里写了起点。

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

**判交付看提交，不看终端。** 终端安静只说明 TUI 空闲了一瞬，agent 可能还在下一个工具调用里。判据是两条同时成立：`git -C <worktree> log origin/master..HEAD` 有提交，且 `git -C <worktree> status --short` 干净。实测有一次照终端状态判「完成」，那时分支上一个提交都还没有。

## 5. 验收：自己重跑一遍

agent 的自述是线索，不是证据。在 worktree 目录里逐条对照 issue 的验收清单。

两种漂移都实测到过，判法不同：**自述的绿是自己重跑**——#161 交付时自称「三项自检全绿」，实测 `eslint --max-warnings 0` 有两处 `no-useless-escape`；**报告里的事实主张要回原始材料核**——#143 的普查报告把一处分歧描述成「误植了 `printWholeImage` 的文档」，而手册里根本没有那些内容，真正的错误是凭空多出的 `duration` 参数。

**分支落后 master 时，先按 §5.5 rebase 再验收**——否则要验两遍。

**不必再 `export ERE_ENGINE_ASAR`。** asar 现在按 `ASAR_CANDIDATES` 逐条回落（含 `~/.era-engine/` 与 `/mnt/d/Code/era` 两条绝对路径），worktree 里没有 `ere-4.8.0-win-x64/` 也能命中。三处定位的同步由 `test/asar-candidates.test.js` 判红。

**代价是「无引擎」不再能靠不设变量制造**——`env -u ERE_ENGINE_ASAR` 照样命中回落。第 2 步因此改用显式开关 `ERE_ENGINE_ASAR=none`。

### 四步

**每条都用 `bash tools/capped.sh` 包一层**（限 CPU 到 4 核）。并发验收时这是机器还能不能用的分界：三个 agent 同时跑，不限流的交互延迟是 698ms，限流后 106ms，总耗时只多 5%。

1. **三项自检（带引擎）**：`bash tools/capped.sh npm test` / `npx eslint . --max-warnings 0` / `npx prettier --check .`。worktree 若缺 `node_modules` 先 `npm ci`——否则 `npx` 会从仓库外拉版本，eslint 与 prettier 都给出与仓库不一致的结果。
2. **跳过基线核对（不带引擎）**：`ERE_ENGINE_ASAR=none bash tools/capped.sh npm test`，跳过数必须等于 `test/engine-skip-baseline.txt` 里的数字。新增依赖引擎的用例必须同步改该数并在注释里写出算式；**rebase 后注释里的算式会失准**（用例总数变了），一并更正。
3. **全量变异检查（带引擎）**：`bash tools/capped.sh node tools/mutation-check.mjs --jobs 4`，约 4 分钟（ext4 实测 253s）。**严格标准是「全部拦下、零跳过」**。
   **`--jobs` 现在可用了**，此前 SOP 禁止它是对的：`COPY_DENY` 把 `ere-4.8.0-win-x64` 排除在副本外，子进程够不着引擎，有引擎的机器上必然判出「引擎在场却有 17 条按跳过处理」而整体红（实测 `329/17/rc=1`）。绝对路径回落进来之后同样条件是 `346/0/rc=0`。串行仍然可用（约 330s），只是没有理由再选它。
4. **逐条比对工单验收清单**，并抽查本票新增的变异条目是否真被拦下。

**验收期的读数不能与 `npm test` 或串行变异并发取。** `tools/mutation-check.mjs` 是**就地变异 + 还原**（文件头 `:30` 明写），而 `test/mutation-check.test.js` 的快速模式随 `npm test` 跑——那期间工作树是**间歇性坏的**。阶段 4 验收 #212 时踩过：一边跑着 `npm test`，一边 `node tools/compare/cli.js`，读回 54/112 而真值是 57/107，我据此误报了「对拍退化」。**判据是 `pgrep -f 'capped.sh|mutation-check.mjs'` 为空再读**，或者干脆串行：先跑完测试，再取对拍与快照类读数。`--jobs` 并行路径用隔离副本、不碰工作树，但快速模式与串行全量都碰。

**第 3 步偶尔会红在「副本对照」而不是变异本身**（形态：`拦截 0 / 跳过 0 / 红 1`，一百多秒就退，文案是「副本 N 对照运行即红（副本环境破损，非变异拦截）」）。**这不一定是本票的问题**——它可能是 master 上一条随机相关的 flaky 用例，概率低到平时撞不上、四个副本一起跑就放大了四倍。

判法：主树上 `npm test` 全绿而副本红 → 去日志里找 `✖ failing tests:` 下面那条用例名（工具自己列不出来时会退回尾部 60 行，得手工 `grep -nE "✖|# fail"`），然后在 master 上单独跑那个文件。是既有的就**立票、重跑本票的变异**，别让交付方背锅；是本票引入的才退回。

**验证 flaky 修好了没有，不能只靠「重复跑 N 次不失败」。** 1% 概率的用例跑 30 次有 74% 的可能一次都不失败——master 版和修复版都会「30 次全绿」，这个对照什么也证明不了。**要构造能必然触发的条件再对照**，例如在文件首行钉死随机源：

```
sed -i "1i Math.random = () => 0;" test/<文件>.test.js   # 诊断用，验完 git checkout 还原
```

#195 就是这么验的：同样钉死 `Math.random ≡ 0`，master 3 条失败、修复版只剩 1 条（那条是有意保留的假阳性）。这才叫证明。

### 逐条对照清单时的九个判据

1. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。

   贯通验证期间靠这一步抓到三条**空用例**：用例名声称守住某个行为，实际守不住。共同特征是**测试构造的世界里，被测条件的两个分支从未分开过**。守卫拦下与走缺失路径的可观测结果相同（#21）、被测条件的两个分支在在场数据里恰好重合（#24）、记录失效方式的表征测试怎么改被测代码都绿（#20）。光读用例名与断言看不出来，只有改坏被测行为才能发现。

   变异也要挑对位置：改一处应当只死该行为对应的用例。一改就死一大片，说明用例耦合过深；一改全绿，说明那条根本没被守住。

2. **条目表的 `✓` 证明不了「新挂的宿主也红」。** `mutation-check` 的判据是「`tests` 列表里**至少一个**文件红、且输出含 `must_mention`」。给已有条目挂上新宿主（如把端到端加进 `tests`）时，很可能是老宿主代红、新宿主全程绿——条目表照样打 ✓。**验法**：把该变异应用一次，**只跑新宿主那一个文件**，确认它自己红。#120 的端到端就是这么验的（M157/M188/M220 三条单跑均红，M188 下实测天数从 100 掉到 49）。

3. **`must_mention` 不能取被 node 上色的值。** 语义是「原始 stdout 包含该片段」，而 `node --test` 的断言差异是经 `util.inspect` 上色的——数组元素、数字、字符串都裹着 ANSI 转义序列。`must_mention: '2, 2, 2, 0, 1'` 看着与输出里的 `actual: [ 0, 2, 2, 2, 0, 1 ]` 对得上，原始字节里却是 `[ ^[[33m0^[[39m, … ]`，**永远匹配不上**（#211 第三段的 M661 验收期查实）。**取断言名或测试名这类纯文本**，它们不上色；顺带满足下一条的鉴别力要求。

4. **`must_mention` 写得太短等于没判。** 语义是「输出包含该片段」，片段若在目标测试文件里多处出现，任何一条含该词的用例变红都算命中。#129 的 M221 原值是 `'侵略'`，而该文件里「侵略」出现 6 次——收紧为断言原文 `'侵略必须是按钮'` 才真的在鉴别。**判据**：`grep -c '<片段>' test/<宿主>.test.js` 应为 1。

5. **防线类工单，直接还原它声称能防的那个场景。** 只看变异条目表不够——那验的是「条目被拦下」，不是「防线对真实缺口有效」。#130（夹具按钮白名单）的验法是把 `[109]` 按钮从 `page-main-menu.js` 拆掉、还原 #129 的原始状态：6 条用例当场红，而**在该 PR 之前同样拆掉一条都不会红**。这才是防线成立的证据。

   **守卫类交付还要多验一层：守卫自己的阳性对照。** #212 立「角色表二段寻址」守卫时，阳性对照的样本是**从实现清单自身循环生成的**——摘掉清单里的任何一族，对照样本跟着消失，守卫失明而测试全绿。改法是双名单镜像（实现清单 vs 独立写死的期望名单，先 Set 比对再按期望名单喂样）。**验法**：摘掉守卫清单里的一项，确认真的红。

6. **声称「与引擎行为一致」的，用引擎自己的代码验证**，而不是自己写的镜像——解包 `ere-4.8.0-win-x64/resources/app.asar`（webpack bundle，把入口 `r(r.s=311)` 换成暴露 require 即可直接调用引擎的解析器），#17 用过这招。

   **更要紧的是反向**：夹具能证明「我们调用了」，证明不了「引擎接受了」。引擎侧的短路（`addCharacter` 对无预设角色直接返回 false）、引擎侧的拒收（`input()` 只送达已打印按钮的快捷键）都只有引擎自己的代码能暴露。#21/#22 因前者误报通过，#129 因后者让整条侵略线在实机上入口不存在而四张票全绿。**问一句「这个行为在引擎里真的会发生吗」，比读十遍断言有用。**

7. **1:1 移植的改动**，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。移植中**新发现的原作缺陷要登记进 #14**（已累积三批），并尽量配一条反向变异钉住它——#116 的 M214／M218 是先例，让「不要修好原作缺陷」这条约定第一次有了机器可执行的守卫。

8. **机械改名类迁移（裸寻址 → 门面、批量重命名），验收证据是「寻址多重集等价」，不是行为覆盖。** 从产物源码建「门面字段 → 寻址」映射，再解析迁移 diff，把删掉的旧寻址与新增的门面写各自归约成 `表:下标` 的多重集，逐条比对——每一处迁移后写的必须仍是它原来写的那个地址。

   为什么不能靠行为覆盖：#90 迁 `source-check.js` 的 57 处跨域写时，派单的人在工单里写了「它在黄金样本的比对窗口内，改错了比对当场红」。**实测不成立**：均匀抽样 10 处、逐处把赋值右侧改成 `12345`，**比对一处都没拦下**（未解释恒为 0），用例只拦下 3 处。该文件 309 个分支，黄金样本只经过一小部分，外推约 40/57 处没有任何回归防护。迁移是全量的，覆盖是局部的，**两者不能互相担保**。

   **只能在合并时做**：待办条目表（`tools/domain-ledger.mjs` 一类）的条目一迁完就删，事后再无「原来写的是哪个地址」的记录。错过这一刻就永远补不上。

9. **本票若触发破坏性改动，确认版本已抬。** 判据是「同一条寻址，在旧档里读出的值是否仍然是它现在的语义」——否则即破坏性，判定表见 `docs/adr/0006-save-compatibility-not-guaranteed.md`。触发时 `yml/GameBase.yml` 的【版本】与【最低支持版本】必须同抬、且两者相等，【版本代号】同步。

   **这条只能人工查，不要指望工具。** 机器看不出「语义变没变」，唯一可机器化的子集（扩展角色表字段数变了但版本没抬）覆盖面太窄，不值得再加一处 §2 那样的固定冲突面——这是 ADR-0006 明确权衡后的选择，别顺手加个守卫把它推翻了。

   最常触发的三类：给 `yml/_fixed.json` 的 `extendedCharaTables` 加表或加字段、改动 `yml/Chara*.yml` 的预设内容、改动已有序号的含义。**新增序号与新增整张表不触发**（引擎 `loadData` 会补 0，而 0 就是新字段的正确初值）。

### 验收中发现的小瑕疵，就在本分支顺手修

文档笔误、rebase 后失准的注释算式、判定过松的 `must_mention`、死参数这一类，**直接在同一分支单独一个提交修掉**，在决议评论里写明「验收时改的一处」，不要另开 issue——立票的开销（建 worktree、派 agent、再验一轮）远高于问题本身。

分界是「修它会不会改变产品行为、或需要设计判断」：会，就立票。实测两例都立了票——主菜单按钮缺失（改变玩家可达性，#129）、夹具校验缺失（需要设计判断，#130）。

## 5.5 rebase 与冲突（几乎每张票都会遇到）

worktree 建得早于前置票合并时（见 §2），验收前必须先 `git rebase origin/master`。**先 rebase 再验收，别验两遍。**

冲突面高度固定，就那四处：

| 冲突处                                                | 解法                                                                                                           |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `tools/mutation-check.mjs` 的 `LEDGER_COUNT_BASELINE` | **按「保留双方意图」相加**：master 值 + 本票增量。改完 `--verify` 自校验实际条目数                             |
| `tools/mutations/*.mjs`                               | 两边条目全留。**M 编号撞号时把后合并那批整体顺延**（编号是历史惯性标签，唯一性由 `desc` 全串保证，见工具头注） |
| `test/engine-skip-baseline.txt`                       | 同样相加；注释里的算式按 rebase 后实测更正                                                                     |
| `docs/stub-registry.md`                               | 两边都会重排整张表，**三方归一化后再 `git merge-file`**（见下），真冲突通常只剩一两处                          |

`stub-registry.md` 的归一化（实测两次，归一后真冲突均为 0）：

```
git show origin/master:docs/stub-registry.md > /tmp/s.ours
git show <本票 sha>:docs/stub-registry.md   > /tmp/s.theirs
git show <建树基线>:docs/stub-registry.md   > /tmp/s.base
for f in /tmp/s.ours /tmp/s.theirs /tmp/s.base; do
  sed -E 's/[ ]{2,}/ /g; s/-{3,}/---/g; s/ +\|/ |/g; s/\| +/| /g' "$f" > "$f.n"
done
cp /tmp/s.ours.n /tmp/s.merged
git merge-file /tmp/s.merged /tmp/s.base.n /tmp/s.theirs.n
```

解完把 `/tmp/s.merged` 装回去，交给 `prettier --write` 重排。

**数组元素之间的冲突，边界会落在两侧共享的分隔符上。** 两边各缺一半闭合——**冲突标记删得干干净净、肉眼看不出，去掉标记后却是语法错误**（`tools/mutations/event.mjs` 那次 `--verify` 报「303 ≠ 304」；`test/*.test.js` 追加区那次 `node --check` 报 `Unexpected end of input`）。

**这是本项目最高频的一种冲突形态**：阶段 3 收口的六张票里出现了六次，`tools/mutations/*.mjs` 四次（#179/#182/#185/#178）、`tools/trace-check.mjs` 两次（#177/#178）。缺的闭合符按嵌套深度不同：

| 切在哪                               | HEAD 侧末行长相            | 要补                            |
| ------------------------------------ | -------------------------- | ------------------------------- |
| 条目表两个对象之间                   | `must_mention: '…',`       | `},\n  {`                       |
| `trace-check.mjs` 的 `refs` 数组之间 | `{ src: X, ref: '…', … },` | `],\n  },\n` （INC 侧自带 `{`） |

**判据不是数括号，是看「块后第一行」**：它是 `  },` 就说明 INC 侧的末对象等着被它闭合，你只需补 HEAD 侧那一半。**解完必须跑一次 `node -e "import('./<路径>').then(...)"` 或 `node tools/mutation-check.mjs --verify`**，肉眼与 `git diff` 都看不出这类断裂。

**更稳的解法是不手工拼接**——取 master 整份文件，再从本票提交里把新增块抽出来追加到文件尾：

```
git checkout origin/master -- <path>   # 先要 master 整份，放弃合并区
git show <本票 sha>:<path>              # 从这里抽出本票新增的条目/用例块，追加到文件尾
```

第二次用这个解法一次干净。无论怎么解，**`node tools/mutation-check.mjs --verify` 必须跑**，只看 diff 不够。

`prettier --write` 对 Markdown 里**不在反引号内**的下划线标识符是有损的（`AGENT_1.ERB` → `AGENT*1.ERB`）。解完冲突跑一次体征检查：`grep -nE '[A-Za-z0-9]\*[A-Za-z0-9]' <文件>`，应为空。

## 6. 收尾

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file -
gh pr merge <pr> --repo odradekk/maou_redux --squash --delete-branch
git -C /home/bam00n/era pull --ff-only origin master   # WSL 基座：下一张票的建树基线
git -C /mnt/d/Code/era  pull --ff-only origin master   # 主 checkout：引擎手工验收用
orca worktree rm --worktree "id:<repoId>::<路径>" --force --json
gh issue comment <n> --repo odradekk/maou_redux --body "<决议：交付物、验证方式、有意的取舍、给后续票的提醒>"
```

- PR 正文以 `Closes #<n>` 结尾，合并即自动关票。
- **两个 checkout 都要 pull**（见 §0 的表）。漏掉 WSL 基座那条，下一张票就会从旧 master 建树，撞上 §2 说的那四处全局计数冲突。
- **删 worktree 前确认提交都已推送**：本机没有归档钩子，删了不可恢复。
- **需要启动引擎的手工验收，在合并之后、在主 checkout `D:\Code\era` 上做**：引擎【打开游戏】指向的是主 checkout，worktree 的存档也不会保留。这一步只有人能做，agent 的职责是交出**可复现的置位步骤**（改哪几行、从哪个画面进、看哪几个点），做完回票补一条确认评论。

  临时置位那几行**绝不能提交**：验完 `git checkout -- <文件>` 撤回，`git status` 确认干净。置位常常会让某条「全量写入」类用例变红（`test/event-first.test.js` 的 `expected_init_writes` 就是），**那是预期的，不要去改测试**。

## 7. 决议的记录方式

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**再继续（#3 被 #6 推翻就是先例）。地图 issue #1 只读，不改写历史。
