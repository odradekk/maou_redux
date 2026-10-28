/**
 * @file ere 源码的 require 分类扫描器（顶层 vs 函数体内）。
 *
 * 给「顶层 require 锁」（#288）和「分层边界锁」（#889）共用：两份检查关心
 * 同一件事的不同侧面——谁在模块求值期取依赖、谁只在调用期取。
 *
 * 正确处理字符串 / 模板串（含 ${} 表达式）/ 注释 / 正则字面量；函数体区间
 * 由 function / 箭头 / 方法定义引入的花括号做括号平衡得出。require 参数不是
 * 单个字符串字面量（变量 / 模板串 / 表达式）即抛错——静态解析不了就必须
 * 显式纳入，不许静默漏过（#274 约定）。
 */

'use strict';

const CONTROL_WORDS = new Set([
  'if',
  'for',
  'while',
  'switch',
  'catch',
  'with',
]);

/**
 * 字符级扫描器：找出源码里所有 `require(<字符串>)` 调用及其所在行，
 * 并判定它是否在**模块作用域**（不在任何函数体区间内）。
 *
 * @param {string} src
 * @returns {Array<{target: string, line: number, top_level: boolean}>}
 */
function scan_requires(src) {
  const { requires, fn_braces } = analyze(src);
  const ranges = fn_ranges(src, fn_braces);
  return requires.map((r) => ({
    target: r.target,
    line: r.line,
    top_level: !ranges.some((rg) => r.pos > rg.start && r.pos < rg.end),
  }));
}

// —— 字符级分析：token 化 + 收集 require 与函数体起点 ——

function analyze(src) {
  const requires = [];
  const fn_braces = [];
  let i = 0;
  let line = 1;
  const n = src.length;
  const is_ident_char = (c) => c !== undefined && /[A-Za-z0-9_$]/.test(c);
  const parens = [];
  let last_closed_method = false;
  let pending_fn = false;
  let pending_arrow = false;
  let pending_class = false;

  while (i < n) {
    const ch = src[i];

    if (ch === '\n') {
      line += 1;
      i += 1;
      continue;
    }

    // 注释
    if (ch === '/' && src[i + 1] === '/') {
      while (i < n && src[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') line += 1;
        i += 1;
      }
      i += 2;
      continue;
    }

    // 字符串
    if (ch === "'" || ch === '"') {
      const q = ch;
      i += 1;
      while (i < n) {
        if (src[i] === '\\') {
          i += 2;
          continue;
        }
        if (src[i] === '\n') {
          line += 1;
          i += 1;
          continue;
        }
        if (src[i] === q) {
          i += 1;
          break;
        }
        i += 1;
      }
      continue;
    }

    // 模板串（含 ${} 表达式；表达式里的字符串/模板再跳一层）
    if (ch === '`') {
      i += 1;
      let depth = 0;
      while (i < n) {
        if (src[i] === '\\') {
          i += 2;
          continue;
        }
        if (src[i] === '\n') {
          line += 1;
          i += 1;
          continue;
        }
        if (src[i] === '`' && depth === 0) {
          i += 1;
          break;
        }
        if (src[i] === '$' && src[i + 1] === '{') {
          depth += 1;
          i += 2;
          continue;
        }
        if (src[i] === '}' && depth > 0) {
          depth -= 1;
          i += 1;
          continue;
        }
        if (depth > 0 && (src[i] === "'" || src[i] === '"' || src[i] === '`')) {
          const q = src[i];
          i += 1;
          while (i < n && src[i] !== q) {
            if (src[i] === '\\') {
              i += 2;
              continue;
            }
            if (src[i] === '\n') {
              line += 1;
              i += 1;
              continue;
            }
            i += 1;
          }
          i += 1;
          continue;
        }
        i += 1;
      }
      continue;
    }

    // 正则字面量（启发式：/ 前一个非空白字符不是值 → 正则）
    if (ch === '/') {
      let j = i - 1;
      while (j >= 0 && /\s/.test(src[j])) j -= 1;
      const before = j >= 0 ? src[j] : '';
      if (!/[A-Za-z0-9_)\]'"]/.test(before)) {
        let k = i + 1;
        let closed = false;
        while (k < n) {
          if (src[k] === '\\') {
            k += 2;
            continue;
          }
          if (src[k] === '\n') break;
          if (src[k] === '/') {
            closed = true;
            break;
          }
          k += 1;
        }
        if (closed) {
          let f = k + 1;
          while (f < n && /[a-z]/i.test(src[f])) f += 1;
          i = f;
          continue;
        }
      }
      i += 1;
      continue;
    }

    // 标识符 / 关键字
    if (is_ident_char(ch)) {
      let j = i;
      while (j < n && is_ident_char(src[j])) j += 1;
      const word = src.slice(i, j);

      if (word === 'function' && !is_ident_char(src[i - 1])) {
        pending_fn = true;
        i = j;
        continue;
      }
      if (word === 'class' && !is_ident_char(src[i - 1])) {
        pending_class = true;
        i = j;
        continue;
      }
      if (word === 'require') {
        let k = j;
        while (k < n && /\s/.test(src[k])) k += 1;
        if (src[k] === '(') {
          let m = k + 1;
          while (m < n && /\s/.test(src[m])) m += 1;
          let target = null;
          if (src[m] === "'" || src[m] === '"') {
            const q = src[m];
            m += 1;
            let s = '';
            while (m < n && src[m] !== q) {
              if (src[m] === '\\') {
                s += src[m + 1] ?? '';
                m += 2;
                continue;
              }
              if (src[m] === '\n') break;
              s += src[m];
              m += 1;
            }
            if (src[m] === q) {
              m += 1;
              // 字符串后必须紧跟 )（允许空白/注释）——否则是表达式拼接
              // （require('#' + name)），静态拿不到完整目标，抛错
              let after = m;
              while (after < n && /\s/.test(src[after])) after += 1;
              if (src[after] === ')') target = s;
            }
          }
          if (target === null) {
            const ctx = src
              .slice(Math.max(0, i - 30), Math.min(n, k + 40))
              .replace(/\s+/g, ' ');
            throw new Error(`require 参数无法静态解析：${ctx}`);
          }
          requires.push({ target, line, pos: i });
          i = m + 1;
          continue;
        }
        i = j;
        continue;
      }
      if (src[j] === '(') {
        parens.push({ word: `${word}(`, pos: j, line });
        i = j;
        continue;
      }
      i = j;
      continue;
    }

    // 箭头函数
    if (ch === '=' && src[i + 1] === '>') {
      pending_arrow = true;
      i += 2;
      continue;
    }

    // 括号
    if (ch === '(') {
      parens.push({ word: '(', pos: i, line });
      i += 1;
      continue;
    }
    if (ch === ')') {
      let popped = null;
      for (let k = parens.length - 1; k >= 0; k -= 1) {
        if (parens[k].word === '(' || parens[k].word.endsWith('(')) {
          popped = parens[k];
          parens.splice(k, 1);
          break;
        }
      }
      last_closed_method =
        popped !== null &&
        popped.word.endsWith('(') &&
        !CONTROL_WORDS.has(popped.word.slice(0, -1));
      i += 1;
      continue;
    }

    // 花括号：函数体起点（function / 箭头 / 方法定义）
    if (ch === '{') {
      if (pending_fn || pending_arrow) {
        fn_braces.push({ pos: i, line });
        pending_fn = false;
        pending_arrow = false;
      } else if (pending_class) {
        pending_class = false; // 类体不是函数体
      } else if (last_closed_method) {
        fn_braces.push({ pos: i, line });
        last_closed_method = false;
      }
      i += 1;
      continue;
    }
    if (ch === '}') {
      i += 1;
      continue;
    }

    i += 1;
  }
  return { requires, fn_braces };
}

/** 对每个函数体起点做括号平衡，得到 [start, end] 区间（字符串/注释不计括号） */
function fn_ranges(src, fn_braces) {
  const ranges = [];
  for (const b of fn_braces) {
    let depth = 1;
    let j = b.pos + 1;
    const n = src.length;
    while (j < n && depth > 0) {
      const c = src[j];
      if (c === "'" || c === '"') {
        const q = c;
        j += 1;
        while (j < n && src[j] !== q) {
          if (src[j] === '\\') j += 2;
          else j += 1;
        }
        j += 1;
        continue;
      }
      if (c === '`') {
        j += 1;
        while (j < n && src[j] !== '`') {
          if (src[j] === '\\') j += 2;
          else j += 1;
        }
        j += 1;
        continue;
      }
      if (c === '/' && src[j + 1] === '/') {
        while (j < n && src[j] !== '\n') j += 1;
        continue;
      }
      if (c === '/' && src[j + 1] === '*') {
        j += 2;
        while (j < n && !(src[j] === '*' && src[j + 1] === '/')) j += 1;
        j += 2;
        continue;
      }
      if (c === '{') depth += 1;
      else if (c === '}') depth -= 1;
      j += 1;
    }
    ranges.push({ start: b.pos, end: j - 1, line: b.line });
  }
  return ranges;
}

module.exports = { scan_requires };
