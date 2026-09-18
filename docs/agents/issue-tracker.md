# GitHub 工单

本仓库的工单和需求说明记录在 GitHub 的 `odradekk/maou_redux`。所有 `gh issue` 和 `gh pr` 操作都显式传入 `--repo odradekk/maou_redux`：本地 `origin` 虽通常指向该仓库，但显式指定可避免在不同工作目录或远端配置下操作错误的仓库。

## 常用操作

- **新建 Issue**：`gh issue create --repo odradekk/maou_redux --title "..." --body "..."`。多行正文优先写入临时文件，再用 `--body-file <文件>` 传入，避免 shell 对换行或特殊字符重新解释。
- **读取 Issue**：

  ```
  gh issue view <number> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
  ```

  标签单独读取：`--json labels --jq '[.labels[].name]'`。

- **列出 Issue**：`gh issue list --repo odradekk/maou_redux --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，按需要增加 `--label` 和 `--state`。
- **评论**：`gh issue comment <number> --repo odradekk/maou_redux --body "..."`；多行正文同样可用 `--body-file`。
- **增删标签**：`gh issue edit <number> --repo odradekk/maou_redux --add-label "..."` / `--remove-label "..."`。
- **关闭**：`gh issue close <number> --repo odradekk/maou_redux --comment "..."`。

### `--comments` 的兼容说明

历史上，本机的 `gh` 2.46.0 使用 `gh issue view --comments` 时会请求已废弃的 Projects (classic) `projectCards` 字段，报 `GraphQL: Projects (classic) is being deprecated`。当前安装的版本可能已经修复该问题；仍优先使用上面的 `--json title,body,comments` 形式，因为它一次取得正文与评论，且不依赖该兼容行为。`gh issue comment`、`edit` 和 `close` 不受这个历史问题影响。

## PR 处理策略

**PRs as a request surface: no.** _(若仓库将外部 PR 视作功能请求，改为 `yes`；`triage` 会读取此标记。)_

当前不将外部 PR 作为需求或工单入口，工单分派流程不自动为其分类或关闭。Issue 和 PR 共用编号空间；仅在确实需要辨别裸 `#42` 的类型时，运行 `gh pr view 42 --repo odradekk/maou_redux`，失败后再运行 `gh issue view 42 --repo odradekk/maou_redux`。

## 技能中的术语

- 技能要求“发布到工单系统”时，新建 GitHub Issue。
- 技能要求“读取相关工单”时，使用本文的 `--json` 命令取得正文和评论。

## 路线图操作

供 `wayfinder` 使用。路线图是一张 Issue，实施工作是其子 Issue。

- **路线图**：一张带 `wayfinder:map` 标签的 Issue，正文保存 Notes、Decisions-so-far 和 Fog。创建时传 `gh issue create --repo odradekk/maou_redux --label wayfinder:map`。
- **子 Issue**：通过 GitHub sub-issue API 关联到路线图；未启用 sub-issues 时，在路线图正文任务列表中列出，并在子 Issue 正文开头写 `Part of #<map>`。标签为 `wayfinder:<type>`（`research` / `prototype` / `grilling` / `task`）。认领后将 Issue 指派给推进工作的开发者。
- **阻塞关系**：以 GitHub 原生 issue dependency 为准，用户界面可见。用 `gh api --method POST repos/odradekk/maou_redux/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>` 添加；`<blocker-db-id>` 是 `gh api repos/odradekk/maou_redux/issues/<n> --jq .id` 返回的数据库 id，不能用 `#number` 或 `node_id`。GitHub 的 `issue_dependencies_summary.blocked_by` 只统计未关闭的阻塞项。若仓库不支持依赖关系，子 Issue 正文开头写 `Blocked by: #<n>, #<n>`；全部阻塞 Issue 关闭后才可开始。
- **选择下一张**：列出路线图的未关闭子 Issue（范围限定为 sub-issues 或任务列表），排除仍有未关闭阻塞项、或已有 assignee 的 Issue，按路线图中的顺序取第一张。
- **认领**：`gh issue edit <n> --repo odradekk/maou_redux --add-assignee @me`。这是当前会话的第一次远端写操作。
- **完成**：先 `gh issue comment <n> --repo odradekk/maou_redux --body "<answer>"`，再 `gh issue close <n> --repo odradekk/maou_redux`，然后在路线图的 Decisions-so-far 中补充结论摘要和链接。
