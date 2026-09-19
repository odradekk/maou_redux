/**
 * @file child-process-timeout-check 的行为锁（issue #449）：test/ 里同步
 * 子进程调用（spawnSync / execFileSync / execSync）必须显式声明 timeout——
 * 三条行为在此固定：
 *
 *   1. 全绿运行：真树里现有的全部调用点都已声明 timeout，工具对真树退 0。
 *      本用例把工具并入 npm test——往后有人新加一处不带 timeout 的调用，
 *      这里立刻变红，不再依赖记得手动巡查。
 *   2. 探针：造一个只有一处不带 timeout 的 spawnSync 调用的临时 test/ 目录，
 *      工具必须非 0、报出探针文件的行号与调用名。
 *   3. 对照：同一探针目录改成带 timeout，工具必须转绿——证明红的判据
 *      确实是「有没有 timeout」，不是别的巧合。
 *
 * 工具直接 import 同进程调用（它本来就是为了不再 spawnSync 而写的，测试
 * 没道理反过来 spawn 它）。探针不落在仓库工作树里——本工具只读扫描
 * test/*.test.js 文本，不需要 probe-repo.js 那套「避免并行写工作树撞车」
 * 的机制，直接在系统临时目录现造一份最小 test/ 即可。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { run } = require('../tools/child-process-timeout-check.mjs');

/** 现造一个只含 test/<name>.test.js 的临时根，返回根路径（调用方负责清理） */
function make_probe_root(name, source) {
  const root = fs.mkdtempSync(
    path.join(os.tmpdir(), 'ere-timeout-check-probe-'),
  );
  fs.mkdirSync(path.join(root, 'test'));
  fs.writeFileSync(path.join(root, 'test', `${name}.test.js`), source, 'utf8');
  return root;
}

test('child-process-timeout-check 全绿：真树现有调用点都已声明 timeout', async () => {
  const { failures, output } = await run({});
  assert.equal(
    failures,
    0,
    `真树应全绿——若这里红了，说明新加了一处不带 timeout 的同步子进程调用：\n${output}`,
  );
  assert.ok(output.includes('子进程超时守护'), output);
});

test('探针：spawnSync 不带 timeout 必须红且报出文件行号', async () => {
  const root = make_probe_root(
    'probe-missing-timeout',
    [
      "const { spawnSync } = require('node:child_process');",
      "spawnSync('git', ['status'], { cwd: __dirname, encoding: 'utf8' });",
      '',
    ].join('\n'),
  );
  try {
    const { failures, output } = await run({ root });
    assert.equal(failures, 1, `不带 timeout 的调用必须被数进失守：\n${output}`);
    assert.ok(
      output.includes('probe-missing-timeout.test.js:2') &&
        output.includes('spawnSync'),
      `探针未被报出文件行号：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('对照：同一探针补上 timeout 后必须转绿', async () => {
  const root = make_probe_root(
    'probe-with-timeout',
    [
      "const { spawnSync } = require('node:child_process');",
      "spawnSync('git', ['status'], { cwd: __dirname, encoding: 'utf8', timeout: 30_000 });",
      '',
    ].join('\n'),
  );
  try {
    const { failures, output } = await run({ root });
    assert.equal(
      failures,
      0,
      `补上 timeout 后必须转绿——证明上一条用例的红确实来自缺 timeout：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
