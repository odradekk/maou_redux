# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in **`odradekk/maou_redux`** (private). Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --repo odradekk/maou_redux --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: **`--comments` 是坏的，别用**——GitHub 已下线 Projects (classic)，本机 `gh` 2.46.0 那条 GraphQL 查询里仍带 `repository.issue.projectCards`，一律报
  「GraphQL: Projects (classic) is being deprecated」。用 `--json` 形式（已验证，正文与全部评论一次拿到）：

  ```
  gh issue view <number> --repo odradekk/maou_redux --json title,body,comments --jq '"# " + .title, "", .body, "", (.comments[] | "\n--- 评论 by " + .author.login + " ---\n" + .body)'
  ```

  标签另取：`--json labels --jq '[.labels[].name]'`。`gh issue comment` / `edit` / `close` 不受影响。

- **List issues**: `gh issue list --repo odradekk/maou_redux --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo odradekk/maou_redux --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --repo odradekk/maou_redux --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo odradekk/maou_redux --comment "..."`

The local clone has an `origin` remote pointing at this repo, so `gh` can infer it — but **pass `--repo odradekk/maou_redux` explicitly anyway**. The working tree and the GitHub repo were connected after the fact, and the explicit flag keeps every command correct regardless of remote state or working directory.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --json title,body,comments --jq ...`（同上，`--comments` 同样触发 projectCards 报错）与 `gh pr diff <number>` 取 diff。
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either — resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run the `--json` form above（**不是 `--comments`**，那条已因 Projects (classic) 下线而必然失败）。

## Wayfinding operations

Used by `wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** — the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/odradekk/maou_redux/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/odradekk/maou_redux/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.
