# 工单流程 SOP

一张工单 = 一个 Orca worktree = 一个 droid 会话，全程用 `orca` CLI 驱动。

工单在 GitHub Issues（`odradekk/maou_redux`），命令约定见 `issue-tracker.md`；票序与阻塞关系见 issue #15，移植决议的索引见地图 issue #1（只读）。

## 0. 环境前提

先读这四条，否则后面每一步都会踩。

- Windows 上 CLI 就是 `orca`；Linux 下用 `orca-ide`（裸 `orca` 是 GNOME 屏幕阅读器）。动手前 `orca status --json` 确认 app 在跑，agent 驱动的调用一律带 `--json`。
- **本机 Orca 的 `commandSourcePolicy` 是 `local-only`，仓库里的 `orca.yaml` 钩子不会执行**（实测：带 `--run-hooks` 删 worktree，仓库脚本一行没跑）。所以仓库里不放 `orca.yaml`；worktree 的 setup 钩子（`npm install`）配在 Orca 的 **Settings → Repository → Hooks**。
- 推论：**worktree 删除时没有任何自动归档**。worktree 里 gitignored 的本地产物（`sav/*.sav`、`ere.config.json`）删了就没了——要留下的东西，删之前必须已经推走。
- `.worktreeinclude` 会把主 checkout 的 `ere.config.json` 复制进每个新 worktree（已实测生效）。**主 checkout 那份必须是 `"static": "yml"`**，否则每个新 worktree 一开就是坏的。

## 1. 选票与认领

**前沿** = `open` + 阻塞票全部已关闭 + 无 assignee，按编号序取第一个。

```
gh issue list --repo odradekk/maou_redux --state open --label ready-for-agent --json number,title,assignees
gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me
```

认领是本次会话的第一次写操作，先认领再动手，并发会话才不会撞车。

## 2. 并发上限：同时最多 5 个工单

无依赖关系的票可以同时开多个 worktree。**有阻塞边的票等阻塞方合并进 `master` 之后再建 worktree**——早建的基线里没有前置代码。派新单前先数一遍在跑的（不含主 checkout `master`）：

```
orca worktree ps --json
```

## 3. 建 worktree 并派 droid

```
orca worktree create --name t<N>-<slug> --no-parent --agent droid --prompt "<简报>" --json
```

- 命名 `t<N>-<slug>`，`<N>` 取工单标题里的 T 编号。
- `--no-parent`：工单彼此独立。基线省略 `--base-branch`，用仓库默认 base（`origin/master`）。
- `--agent droid` 让 droid 落在 worktree 的第一个终端，这是唯一正确的派法——「先裸建 worktree 再 `terminal create` 同一个 agent」会多出一个没人用的空壳 shell。
- `--repo` 省略时 Orca 从当前 worktree 推断仓库；跨仓库才需要 `orca repo list --json` 取 id。
- 记下返回里的 `worktree.id`（形如 `<repoId>::<绝对路径>`，**两段都要**，只给 repoId 不是 worktree id）与 `startupTerminal.handle`。

### 简报模板

**第一行必须是 `/implement` 加一个空格再接任务描述。** 斜杠命令后没有空格不会被识别为技能调用；写成「请用 /implement 技能……」是在*请求*它调用，直接调用更稳。

```
/implement issue #<N>：<标题>
工单正文与验收清单：gh issue view <N> --repo odradekk/maou_redux --comments
父票（本票在整体中的位置与测试策略）：gh issue view 15 --repo odradekk/maou_redux
相关决议，动手前请读：#<a>、#<b>

<三到五条它自己查会很贵、且容易查错的既有事实，直接给结论>

自检与提交：
- 自检三件套全绿（npm test、npx eslint .、npx prettier --check .）
- 逐条对照验收清单
- 验收里写着「且此行为有测试」的每一条，做变异测试自证：把被测规则改坏，
  确认真的有用例失败（本项目在 #10 吃过亏——测试全绿但规则已失效）
- 按 Conventional Commits 提交，scope 用 <scope>
- 完成后停下等验收，合并与开 PR 由派单人做
```

两条写法约定：

- **简报不必让它读 `AGENTS.md`**——agent 会自动加载，写进去只是浪费开头的注意力。
- **简报给结论。** 让它自己去 `target/`（315,953 行）或引擎源码里重查一件已经查实的事，既慢又容易得出与既有决议矛盾的结果。但**本票自己要解决的设计问题留给它**，只要求把判断依据写在 issue 上。

`/implement` 内部驱动 `tdd` 一次一个红绿切片，收尾跑 `code-review` 的两轴审查（Standards + Spec）再提交。绕过它就少了这层自检，交上来的东西得从头人工复核。

## 4. 监督

```
orca terminal read --terminal <handle> --json
orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 300000 --json
orca terminal send --terminal <handle> --text "<追加指示>" --enter --json
orca worktree set --worktree id:<repoId>::<路径> --comment "<一句话进展>" --workspace-status in-review --json
```

发消息前先 `read`。等 TUI 就绪必须带 `--timeout-ms`，否则输入会丢在启动过程里。handle 报 `terminal_handle_stale` 就用 `orca terminal list` 重取，只用最新那个。

## 5. 验收：自己复跑一遍

agent 的自述是线索，不是证据。在 worktree 目录里逐条对照 issue 的验收清单：

1. **自检三件套**（worktree 若缺 `node_modules`，`npx eslint` 会去拉 v9 并报错——先 `npm ci`）。
2. 凡是验收清单里写着「此行为**必须有测试**」的，**做变异测试**：把那条规则改坏，确认真的有用例失败。#10 的原型曾因一句无条件删除让规则失效，而测试全绿。
3. 声称「与引擎行为一致」的，用引擎自己的代码验证，而不是自己写的镜像——解包 `ere-4.8.0-win-x64/resources/app.asar`（webpack bundle，把入口 `r(r.s=311)` 换成暴露 require 即可直接调用引擎的解析器），#17 用过这招。
4. 1:1 移植的改动，抽查文件头的来源注释是否真指到 `target/` 里存在的文件与函数。

## 6. 收尾

```
gh pr create --repo odradekk/maou_redux --base master --head <branch> --title "<conventional commit>" --body-file -
gh pr merge <pr> --repo odradekk/maou_redux --squash --delete-branch
git -C D:/Code/era pull --ff-only origin master
orca worktree rm --worktree "id:<repoId>::<路径>" --force --json
gh issue comment <n> --repo odradekk/maou_redux --body "<决议：交付物、验证方式、有意的取舍、给后续票的提醒>"
```

- PR 正文以 `Closes #<n>` 结尾，合并即自动关票。
- **删 worktree 前确认提交都已推送**——本机没有归档钩子，删了不可恢复。
- **需要启动引擎的手工验收，在合并之后、在主 checkout `D:\Code\era` 上做**：引擎【打开游戏】指向的是主 checkout，worktree 的存档也不会保留。

## 7. 决议留痕

实现中若发现某条既有决议站不住，**回对应 issue 补勘误评论**再继续（#3 被 #6 推翻即是先例）。地图 issue #1 只读，不改写历史。
