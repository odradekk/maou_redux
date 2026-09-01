/**
 * 跨模块顶层 require 守卫（issue #288）：ere 全树 里对「装载责任属于
 * 主启动图」的族模块的**顶层** require（模块作用域）即红。
 *
 * == 守什么 ==
 *
 * `ere/system/train/com-*.js` 与 `ere/kojo/kojo-*.js` 靠副作用注册进
 * COM / KOJO 分发族，注册与否全看有没有人 require 它（#274/#282 两把
 * 接线锁的前提）。主启动图（ere/system/flow/main-loop.js）显式 require
 * 这些族模块，是「这些族在游戏运行时确实被注册」的唯一保证。
 *
 * 漏洞：某文件若在**模块顶层** `require('#/system/train/com-hardcore')`，
 * 则 main-loop 里那行同名 require 被删掉也没事——模块经这个文件间接照样
 * 装上，COM80-90 照常注册。三处同时失明：
 *
 *   - #226 的 M1249（「主启动图删重度调教系注册」）改坏了却没有测试红；
 *   - #274 的 com-family-wiring：判据是「只加载 main-loop 后族里实际有的
 *     号 == 源码扫出的号」，间接装上后号照样齐；
 *   - #282 的 kojo-family-wiring：同理。
 *
 * 这不是假想：#233（K2）与 #234（K3）两次都是全量变异抓到 `kojo-*.js`
 * 顶层 require `com-hardcore`，在 #233 已定先例之后重犯。#228 的
 * com-cloth 漏接线（玩家脱不了衣服而全绿）就是同形态藏住的。后面十五张
 * 口上票都要从 com-* 取工具函数，这个形态还会再来。
 *
 * == 保护集合：不是黑名单，是「主启动图的装载责任」 ==
 *
 * 判据**不**写成「禁止 kojo 顶层 require com-*」——那太粗，正当的顶层
 * 依赖（`#/kojo/kojo-text`、`#/facade/*`、`#/utils/*`，乃至底座
 * `#/kojo/kojo-system` / `#/system/event/registry` / `#/system/flow/begin-signal`
 * ——它们被几十个文件正当顶层 require）不该被拦。
 *
 * 要拦的是「**被 main-loop 显式 require 的族模块**」被别处顶层 require。
 * 两步定义，不手写名单：
 *
 *   1. 从 main-loop.js 扫出它 require 的模块清单——这就是「装载责任属于
 *      主启动图」的定义（main-loop 自己豁免）；
 *   2. 清单内、且有副作用族注册的模块才进保护集合。族注册用
 *      test/helpers/register-scan.js 的 extract_register_ids 判定（#274/
 *      #282 同款扫描器，已覆盖字面量 / for-of / Object.entries 三种写法，
 *      解析不了就抛）。底座（kojo-system、event/registry、begin-signal、
 *      com-family、train-loop 等无 register 的模块）不进保护集合——它们
 *      被别处顶层 require 是正当的，不削弱接线锁。
 *
 * 保护集合当前 17 个：12 个 com-* 指令族 + 5 个 kojo-* 口上。新族模块
 * 落地 main-loop 即自动纳入；新口上文件若顶层 require 任一保护模块，
 * 锁当场红并点名「哪个文件顶层 require 了哪个族模块」。
 *
 * == 顶层 vs 函数体（本票核心难点） ==
 *
 * require 在**模块作用域**（文件顶层、或顶层的 `const {…} = require(...)`）
 * 才拦；在函数体、方法体、回调里的不拦——延迟 require 是正解，守卫必须
 * 让它们保持绿。扫描器跟踪函数体区间（function / 箭头 / 方法定义引入的
 * 花括号做括号平衡），require 落在任一函数体区间内 = 不拦。
 *
 * 现存四处正确形态（阳性对照，防守卫把正解也拦下）：
 *
 *   - `ere/system/train/com-service.js` 的 `train_message_a_riding`
 *     （函数内 require com-sex）；
 *   - `ere/kojo/kojo-k2-timid.js:1285`（函数内 require com-hardcore）；
 *   - `ere/kojo/kojo-k3-noble.js:8543`（函数内 require com-hardcore）。
 *   - `ere/system/train/com-tentacle.js:394`（本票修的现存违规：com208
 *     函数内 require com-colosseum，原来是顶层，守卫上线即红——这与
 *     #233/#234 两次被全量变异抓到的形态完全同构，只是还没被变异抓到）。
 *
 * 解析不了的 require（非字符串参数）抛错，不许静默漏过（#274 的既有
 * 约定：扫描器解析不了新写法必须红，不能假装看不见）。
 *
 * == 与既有锁的分工 ==
 *
 * - #274 com-family-wiring：族模块必须被 main-loop / replay 清单 require
 *   （号集合对账）；
 * - #282 kojo-family-wiring：口上模块必须被 main-loop require（号集合
 *   对账）；
 * - 本锁：主启动图清单里的**族模块**不许被别处**顶层** require（间接
 *   装载会让上面两把锁对「漏 require」失明）。
 *
 * 本锁只扫主启动图那一张清单，不扫 replay——replay 清单里也是族模块，
 * 但对拍回放是独立世界，别处顶层 require 不影响主启动图的注册语义；
 * 回放侧漏装由 #274 的对账守。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { extract_register_ids } = require('./helpers/register-scan');

const REPO = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO, 'ere');
const MAIN_LOOP = path.join(ERE_DIR, 'system', 'flow', 'main-loop.js');

// 判定「族模块」的四个分发族：指令族两个 + 口上族两个（#274/#282 同款）
const FAMILIES = [
  'com_family',
  'com_able_family',
  'kojo_message_com_family',
  'self_kojo_family',
];

/**
 * 字符级扫描器：找出源码里所有 `require(<字符串>)` 调用及其所在行，
 * 并判定它是否在**模块作用域**（不在任何函数体区间内）。
 *
 * 正确处理字符串 / 模板串（含 ${} 表达式）/ 注释 / 正则字面量；函数体
 * 区间由 function / 箭头 / 方法定义引入的花括号做括号平衡得出。
 * require 参数不是字符串字面量（变量 / 模板串 / 表达式）即抛错——
 * 静态解析不了就必须显式纳入，不许静默漏过（#274 约定）。
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

const CONTROL_WORDS = new Set([
  'if',
  'for',
  'while',
  'switch',
  'catch',
  'with',
]);

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

// —— 文件清单与保护集合 ——

function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(REPO, rel), {
      withFileTypes: true,
    })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (entry.name.endsWith('.js')) out.push(child);
    }
  };
  walk(dir);
  return out.sort();
}

/** main-loop.js 的 require 清单（这就是「装载责任属于主启动图」的定义） */
function main_loop_targets() {
  const src = fs.readFileSync(MAIN_LOOP, 'utf8');
  return scan_requires(src)
    .filter((r) => r.target)
    .map((r) => r.target);
}

/**
 * 保护集合：main-loop require 的 ∩ 有副作用族注册的模块。
 * 族注册用 #274/#282 同款扫描器判定（解析不了就抛）。
 * @returns {Map<string, string>} target → 相对路径（无 .js 后缀）
 */
function protected_modules() {
  const out = new Map();
  for (const target of main_loop_targets()) {
    const rel = target.replace(/^#\//, '');
    const full = path.join(ERE_DIR, `${rel}.js`);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, 'utf8');
    const has_reg = FAMILIES.some((f) => extract_register_ids(src, f).size > 0);
    if (has_reg) out.set(target, rel);
  }
  return out;
}

// —— 用例 ——

test('扫描器：正确区分顶层与函数体内 require（现存阳性对照）', () => {
  // 四处正确形态的延迟 require 必须判「函数内」（不拦）。前两处是 #233/
  // #234 的既有先例（K2/K3 函数内 require com-hardcore），第三处是
  // com-service 的 train_message_a_riding，第四处是本票修的现存违规
  // （com-tentacle 的 com208 函数内 require com-colosseum，原来是顶层，
  // #288 守卫上线即红，挪进函数体后恢复绿）
  const cases = [
    ['ere/system/train/com-service.js', 1911, false],
    ['ere/kojo/kojo-k2-timid.js', 1285, false],
    ['ere/kojo/kojo-k3-noble.js', 8543, false],
    ['ere/system/train/com-tentacle.js', 394, false],
  ];
  for (const [rel, line, top_level] of cases) {
    const src = fs.readFileSync(
      path.join(ERE_DIR, rel.replace(/^ere\//, '')),
      'utf8',
    );
    const hit =
      scan_requires(src).find(
        (r) => r.line === line && r.target === '#/system/train/com-hardcore',
      ) ?? scan_requires(src).find((r) => r.line === line);
    assert.ok(hit, `${rel}:${line} 应有 require`);
    assert.equal(
      hit.top_level,
      top_level,
      `${rel}:${line} → ${hit.target} 的顶层判定应为 ${top_level}`,
    );
  }
});

test('保护集合：main-loop 清单 ∩ 族注册，底座不进表', () => {
  const protected_map = protected_modules();
  // 族模块在表
  for (const t of [
    '#/system/train/com-hardcore',
    '#/system/train/com-colosseum',
    '#/kojo/kojo-k3-noble',
    '#/kojo/kojo-k5-mao',
  ]) {
    assert.ok(
      protected_map.has(t),
      `${t} 应进保护集合（main-loop require 的族模块）`,
    );
  }
  // 底座不在表（被别处顶层 require 是正当的）
  for (const t of [
    '#/kojo/kojo-system',
    '#/system/event/registry',
    '#/system/flow/begin-signal',
    '#/system/train/com-family',
    '#/system/train/train-loop',
  ]) {
    assert.ok(!protected_map.has(t), `${t} 是底座，不应进保护集合`);
  }
});

test('全树：主启动图清单里的族模块不被别处顶层 require', () => {
  // 违规时报「顶层 require：ere/xxx.js → #/system/train/com-yyy」——
  // M1790/M1791 的 must_mention 锚
  const protected_map = protected_modules();
  const violations = [];
  for (const rel of list_js_files('ere')) {
    if (rel === 'ere/system/flow/main-loop.js') continue; // main-loop 自己豁免
    const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
    for (const r of scan_requires(src)) {
      if (r.target && protected_map.has(r.target) && r.top_level) {
        violations.push(`顶层 require：${rel}:${r.line} → ${r.target}`);
      }
    }
  }
  assert.deepEqual(violations, [], violations.join('\n'));
});

test('扫描器：解析不了的 require 抛错（不许静默漏过）', () => {
  // 变量参数 / 模板串参数 / 表达式参数都必须抛
  for (const bad of [
    'require(mod);',
    'require(`#/${name}`);',
    "require('#' + name);",
  ]) {
    assert.throws(() => scan_requires(bad), /无法静态解析/, bad);
  }
  // 正常形态不抛
  assert.doesNotThrow(() =>
    scan_requires("const { x } = require('#/utils/stub-line');"),
  );
});
