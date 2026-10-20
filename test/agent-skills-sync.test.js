/**
 * @file 项目技能两处一致：`.claude/skills/` 必须是 `.agents/skills/` 的逐字节副本。
 *
 * Claude Code 读 `.claude/skills/`，其他 agent 读 `.agents/skills/`。仓库
 * core.symlinks=false，符号链接在 Windows 上会检出成纯文本文件，只能放两份，
 * 由本文件防止改了一处忘了另一处。改技能时先改 `.agents/skills/`，再整目录复制。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(REPO_ROOT, '.agents', 'skills');
const COPY_DIR = path.join(REPO_ROOT, '.claude', 'skills');

function list_files(root) {
  return fs
    .readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path
        .relative(root, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join('/'),
    )
    .sort();
}

test('.claude/skills 与 .agents/skills 逐字节一致', () => {
  const files = list_files(SOURCE_DIR);
  assert.deepEqual(
    list_files(COPY_DIR),
    files,
    '两处文件清单不同：以 .agents/skills/ 为准整目录复制到 .claude/skills/',
  );
  for (const file of files) {
    const source = fs.readFileSync(path.join(SOURCE_DIR, file));
    const copy = fs.readFileSync(path.join(COPY_DIR, file));
    assert.ok(
      copy.equals(source),
      `${file} 两处内容不同：以 .agents/skills/ 为准复制到 .claude/skills/`,
    );
  }
});
