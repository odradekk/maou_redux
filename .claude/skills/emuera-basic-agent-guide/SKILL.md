---
name: emuera-basic-agent-guide
description: 用于 ERA Basic（ERB）脚本的开发帮助。覆盖 Emuera 的 ERB 语法、变量体系、命令/函数 API、系统流程、角色与 CSV 数据处理、图形/音频、DataTable/MAP/XML、调试与配置。默认面向 Emuera，不考虑旧版 eramaker 兼容。
metadata:
  version: '1.0.0'
---

# ERA Basic（ERB）开发指南（转发）

技能正文与全部 `references/` 在 `.factory/skills/emuera-basic-agent-guide/`，droid 从那里原生加载。

<!-- 本文件是转发桩，不是副本。Claude Code 只扫 .claude/skills/，droid 只扫 .factory/skills/，两边没有交集；
     官方支持把 .claude/skills/<name> 做成指向别处的软链接，但本机开发者模式未开、mklink 报权限不足，
     且仓库 core.symlinks=false 会把提交的软链接还原成纯文本文件，故改用转发桩。
     开发者模式打开后可换回软链接：git config core.symlinks true && mklink /D，届时删掉本文件。
     上述 frontmatter 的 description 必须与真实 SKILL.md 保持逐字一致——它是两边共同的路由面。 -->

先读 `.factory/skills/emuera-basic-agent-guide/SKILL.md`，按它的「路由策略」一节决定接下来打开哪个 `references/` 文件。该目录下的相对路径均以它自身为基准。
