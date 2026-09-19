// 子进程超时守护（issue #449）：test/ 里的同步子进程调用（spawnSync /
// execFileSync / execSync）必须显式声明 timeout。
//
// 为什么单挑这三个：它们会挡住调用者自己的执行——调用者是某个测试文件
// 的 node --test 隔离子进程，若这次调用挂住不回，整个测试文件的进程
// 就退不出。node --test 的 TAP 报告按文件声明顺序严格编号（reportOrder），
// 一个文件退不出，报告器就卡在它的编号位置，后面全部文件的结果都压着
// 不出——即使那些文件的进程已经在背景跑完（#449：现场抓到 pid 3186
// （tools/engine-contract-check.mjs）卡在 Node 自己的退出收尾期，父进程等它等了
// 十几分钟，`node --test` 调度器本身完全空闲，只是报告顺序被这一个文件
// 焊死）。给每处调用一个有限超时，把「整套挂起十几分钟直到 CI 兜底杀」
// 降级成「一条测试在超时后失败，报出是哪个子进程超时」。
//
// 不管异步 spawn()：只有同步等待完成的调用才会直接堵住调用者自身的
// 事件循环；异步 spawn() 的挂起是否堵住测试，取决于测试代码是否 await
// 它的退出——逐处判定超出静态可查范围，暂不纳入。
//
// 用法：node tools/child-process-timeout-check.mjs
//   全绿退出码 0；任何调用点缺 timeout 退出码 1，逐条报出 file:line。
//
// 测试用法：import { run } from './child-process-timeout-check.mjs'，
// run({ root }) 同进程跑——这份工具本身就是为了不再 spawnSync 而生的，
// 它的测试没有理由反过来 spawnSync 它。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GUARDED_CALLS = ['spawnSync', 'execFileSync', 'execSync'];
const IDENT_CHAR_RE = /[A-Za-z0-9_$]/;

function line_of(text, at) {
  return text.slice(0, at).split('\n').length;
}

/**
 * 单遍扫描全文找真实调用点：整段维护引号状态（单/双引号、模板串，含转义），
 * 字符串/模板字面量内部的文本一律跳过，不当成代码——本工具的探针会把
 * `spawnSync(...)` 当字面量文本拼进测试夹具源码，逐段正则扫描会把探针
 * 文本误判成真调用（#449 整改本工具时实测踩中：工具扫自己的测试文件，
 * 把测试里探针字符串当成了违规调用点）。找到调用名紧跟 `(` 后，从那个
 * `(` 开始配平扫描到匹配的 `)`，同样跳过内部字符串，取得完整实参文本。
 * 返回 [{ index, name, call_text }]。
 */
function scan_calls(text) {
  const calls = [];
  let quote = null; // null | "'" | '"' | '`'
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quote) {
      if (ch === '\\') {
        i += 1;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }
    const name = GUARDED_CALLS.find((n) => text.startsWith(n, i));
    if (!name) {
      continue;
    }
    if (IDENT_CHAR_RE.test(text[i - 1] ?? '')) {
      continue; // 更长标识符的尾巴（比如 myExecFileSync），不是真调用
    }
    let j = i + name.length;
    while (/\s/.test(text[j] ?? '')) {
      j += 1;
    }
    if (text[j] !== '(') {
      continue; // 后面不跟 `(`，只是提到了这个名字（注释、字符串已在上面跳过）
    }
    let depth = 0;
    let call_quote = null;
    let end = text.length;
    for (let k = j; k < text.length; k += 1) {
      const c = text[k];
      if (call_quote) {
        if (c === '\\') {
          k += 1;
        } else if (c === call_quote) {
          call_quote = null;
        }
        continue;
      }
      if (c === "'" || c === '"' || c === '`') {
        call_quote = c;
      } else if (c === '(') {
        depth += 1;
      } else if (c === ')') {
        depth -= 1;
        if (depth === 0) {
          end = k + 1;
          break;
        }
      }
    }
    calls.push({ index: i, name, call_text: text.slice(j, end) });
    i = end - 1; // 跳过整个调用，避免把实参里的字符串再当代码扫一遍
  }
  return calls;
}

function list_test_files(root) {
  return fs
    .readdirSync(path.join(root, 'test'), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.test.js'))
    .map((entry) => `test/${entry.name}`)
    .sort();
}

/** 单文件的调用点扫描，返回缺 timeout 的 [{ at, call }] */
function check_file(root, rel) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  return scan_calls(text)
    .filter((call) => !/\btimeout\s*:/.test(call.call_text))
    .map((call) => ({
      at: `${rel}:${line_of(text, call.index)}`,
      call: call.name,
    }));
}

/**
 * @param {{ root?: string }} [options] root 默认真树，测试传探针副本根
 * @returns {{ failures: number, output: string }}
 */
export function run({ root = REPO } = {}) {
  const lines = [];
  const log = (s) => {
    lines.push(s);
    console.log(s);
  };
  const violations = list_test_files(root).flatMap((rel) =>
    check_file(root, rel),
  );
  if (violations.length === 0) {
    log(
      `✓ 子进程超时守护：test/*.test.js 里的 ${GUARDED_CALLS.join('/')} 调用点全部显式声明了 timeout`,
    );
    return { failures: 0, output: lines.join('\n') };
  }
  for (const v of violations) {
    log(
      `✗ ${v.at} ${v.call}(...) 未声明 timeout——挂住会堵死这个测试文件的进程退出，进而卡住 node --test 的 TAP 报告顺序（#449）`,
    );
  }
  log(`✗ ${violations.length} 处子进程调用缺 timeout（逐条见上）`);
  return { failures: violations.length, output: lines.join('\n') };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  process.exitCode = run().failures === 0 ? 0 : 1;
}
