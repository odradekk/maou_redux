/**
 * Validation of `.kojo` dialogue files.
 *
 * A `.kojo` file is YAML with a fixed schema, compiled to JavaScript by
 * `kojo-loader/src/parse-kojo.js` at build time and by the engine at runtime.
 * Both use yamljs, so this module parses with the same library to keep the
 * verdict identical to the engine's.
 *
 * The reason this check exists at all is that almost every kojo mistake is
 * **silent** — the file loads, nothing is logged, and a piece of dialogue is
 * simply missing or a branch changed meaning:
 *
 * | mistake | what the engine does |
 * | --- | --- |
 * | YAML syntax error | logs once and carries on, so every function in the file disappears |
 * | a value that is neither an entry array nor `{ lines: [...] }` | the function is not generated at all |
 * | an entry with no recognised key | the async path prints its JSON as dialogue; the sync path prints nothing |
 * | a near-miss key (`ac`, `devider`, `lineup`, `randon`) | same as above — the key set is case-sensitive |
 * | a duplicate `acc` in one button group | `acc` is incremented until it is free, so the hotkey changes |
 * | one 篇目 defined twice | yamljs merges the keys, so the first definition disappears without a trace |
 * | a button (`acc`) without `content` | an unlabelled button |
 * | `random: true` without `lines` | an empty body |
 * | `if` containing `module` / `require` | the condition is deleted, so the branch always runs |
 * | a nested sequence entry (`- - content: …`) | no code at all is generated for it, so the entry disappears silently |
 *
 * This is an **independent implementation**, not a copy of the engine's
 * `kojo-loader/src/validate-kojo.js` — that one is CommonJS and anchored on a raw
 * text scan, while this one walks the parsed tree and adds rules the engine does
 * not have (nested sequences vs scalars, `acc` must be a number, a BOM cannot hide
 * 第 1 行). The engine's own rule list is pinned as fixtures in
 * `scripts/selftest.mjs` («rule parity»), which is what keeps the two aligned:
 * when kojo-loader grows a rule, add its fixture there.
 *
 * Entry-level findings carry a breadcrumb (`篇目 第 N 条`) rather than a line
 * number, because yamljs reports no positions; only the duplicate-篇目 and
 * top-level-shape findings get a real line.
 *
 * @module dsh-ere-game-builder/lib/kojo
 */

import { parseYamlDocument } from './static-rows.js';

/** Keys `parse-kojo.js` dispatches on, in the order it tests them. */
const KOJO_KEYS = ['lineUp', 'divider', 'acc', 'random', 'lines', 'content', 'if', 'comment', 'key'];

/** Guards against a YAML alias that refers to itself. */
const MAX_DEPTH = 24;

/**
 * Drop a leading UTF-8 BOM.
 *
 * The wiki allows a UTF-8 BOM, and yamljs tolerates it — but the line scan below
 * works on the raw text, where a BOM makes the first line start with `\uFEFF`
 * (which `\s` matches), so 第 1 行的顶层篇目 would be invisible to it.
 *
 * @param {string} text - the file's text.
 * @returns {string} the text without a leading BOM.
 */
function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

/**
 * Validate one `.kojo` file.
 *
 * @param {string} text - the file's text.
 * @param {string} relative - path for messages.
 * @returns {Array<{ severity: 'error' | 'warning', line: number, message: string }>} findings.
 */
export function validateKojo(text, relative) {
  const source = stripBom(text);
  const document = parseYamlDocument(source);
  if (document.unavailable !== undefined) {
    return [{ severity: 'error', line: 0, message: document.unavailable }];
  }
  if (document.error !== undefined) {
    const line = typeof document.error.parsedLine === 'number' ? document.error.parsedLine : 0;
    return [
      {
        severity: 'error',
        line,
        message: `YAML 解析失败：${document.error.message}。引擎只会记一条日志然后继续加载，本文件里所有口上都会消失`,
      },
    ];
  }
  const root = document.value;
  if (root === null || root === undefined) return [];
  if (typeof root !== 'object' || Array.isArray(root)) {
    return [
      {
        severity: 'error',
        line: 0,
        message: `${relative} 的顶层必须是「函数名: 条目数组」的映射，当前是标量或数组；引擎不会从中生成任何口上`,
      },
    ];
  }

  const findings = [];
  // A repeated top-level name is invisible in the parsed document — yamljs merges
  // the keys and keeps only the last one — so it has to be counted on the raw text.
  const definedAt = new Map();
  for (const entry of topLevelKeys(source)) {
    if (definedAt.has(entry.key)) {
      findings.push({
        severity: 'error',
        line: entry.line,
        message: `顶层篇目「${entry.key}」重复定义（第 ${definedAt.get(entry.key)} 行已定义过）：YAML 会静默合并同名键，只有后者生效，前一段整段消失`,
      });
    } else {
      definedAt.set(entry.key, entry.line);
    }
  }
  for (const [name, value] of Object.entries(root)) {
    if (Array.isArray(value)) {
      walk(value, name, findings, 0);
      continue;
    }
    if (value !== null && typeof value === 'object' && Array.isArray(value.lines)) {
      walk(value.lines, name, findings, 0);
      continue;
    }
    findings.push({
      severity: 'error',
      line: 0,
      message: `「${name}」不会被生成：它的值既不是条目数组，也没有数组型的 lines。引擎会静默跳过这个函数`,
    });
  }
  return findings;
}

/**
 * Walk one entry array.
 *
 * @param {unknown[]} entries - the entries.
 * @param {string} where - breadcrumb such as `打招呼` or `打招呼/按钮 1`, used because YAML reports no positions.
 * @param {Array<object>} findings - collector.
 * @param {number} depth - recursion depth.
 */
function walk(entries, where, findings, depth) {
  if (depth > MAX_DEPTH) return;
  const group = [];
  const flush = () => {
    const seen = new Map();
    for (const button of group) {
      if (seen.has(button.acc)) {
        findings.push({
          severity: 'error',
          line: 0,
          message: `${where} 的同一个按钮组里 acc ${button.acc} 重复（${seen.get(button.acc)} 与「${button.label}」）。引擎会自动把后者递增到下一个空位，你写的快捷键不会生效`,
        });
      } else {
        seen.set(button.acc, `「${button.label}」`);
      }
    }
    group.length = 0;
  };

  entries.forEach((entry, index) => {
    const label = `${where} 第 ${index + 1} 条`;
    if (entry === null || entry === undefined || entry === '') {
      flush();
      return;
    }
    if (typeof entry === 'string') {
      flush();
      return;
    }
    // A nested sequence (`- - content: …`) is an array, and `parse-kojo.js` emits
    // no statement at all for an array whose first element is neither a button nor
    // `random: true` — the entry vanishes without a log line. Only scalars reach the
    // JSON fallback, so the two shapes must not share a message.
    if (Array.isArray(entry)) {
      flush();
      findings.push({
        severity: 'error',
        line: 0,
        message: `${label} 是嵌套数组（条目下多写了一个「- 」就会这样）：引擎不会为它生成任何代码，这一条会**整条消失**，而且不报错`,
      });
      return;
    }
    if (typeof entry !== 'object') {
      flush();
      findings.push({
        severity: 'warning',
        line: 0,
        message: `${label} 既不是字符串也不是对象：引擎会把它 JSON 序列化后当作台词打印（例如 ${JSON.stringify(entry)}）`,
      });
      return;
    }

    let misspelled = false;
    for (const key of Object.keys(entry)) {
      const suggestion = nearKojoKey(key);
      if (suggestion !== undefined) {
        misspelled = true;
        findings.push({
          severity: 'error',
          line: 0,
          message: `${label} 的键「${key}」不是 kojo 的键（键名区分大小写），是否想写「${suggestion}」？`,
        });
      }
    }
    checkCondition(entry, label, findings);

    if (entry.divider === true) {
      flush();
      return;
    }
    if (entry.lineUp === true) {
      flush();
      return;
    }
    if (entry.random === true) {
      flush();
      if (!Array.isArray(entry.lines)) {
        findings.push({
          severity: 'error',
          line: 0,
          message: `${label} 是 random 条目但没有 lines：会生成一个空体（且所有候选的 if 都不满足时，引擎会无视条件随机选一个）`,
        });
        return;
      }
      walk(entry.lines, `${where}/随机`, findings, depth + 1);
      return;
    }
    if (entry.acc !== undefined) {
      if (entry.content === undefined) {
        findings.push({
          severity: 'warning',
          line: 0,
          message: `${label} 是按钮（acc）但没有 content：会渲染成一个没有文字的按钮`,
        });
      }
      if (typeof entry.acc !== 'number') {
        findings.push({
          severity: 'error',
          line: 0,
          message: `${label} 的 acc 必须是数字，当前是 ${JSON.stringify(entry.acc)}`,
        });
      } else {
        group.push({ acc: entry.acc, label: typeof entry.content === 'string' ? entry.content : '(无 content)' });
      }
      if (Array.isArray(entry.lines)) walk(entry.lines, `${where}/按钮 ${entry.acc}`, findings, depth + 1);
      return;
    }
    flush();
    if (Array.isArray(entry.lines)) {
      walk(entry.lines, where, findings, depth + 1);
      return;
    }
    if (entry.content !== undefined) return;
    // A near-miss key is the more actionable message; do not also say that the
    // entry has no recognised key when both describe the same entry.
    if (misspelled) return;
    findings.push({
      severity: 'error',
      line: 0,
      message: `${label} 没有任何 kojo 认识的键（${KOJO_KEYS.join(' / ')}）：引擎会走兜底分支，把这条目的 JSON 当台词打印出来（同步口上则什么都不输出）`,
    });
  });
  flush();
}

/**
 * Top-level keys exactly as they are written, one per line.
 *
 * @param {string} text - the document.
 * @returns {Array<{ key: string, line: number }>} the keys with their line numbers.
 */
function topLevelKeys(text) {
  const keys = [];
  text.split(/\r\n|\n|\r/).forEach((line, index) => {
    const match = /^([^\s#][^:]*):/.exec(line);
    if (match !== null) keys.push({ key: match[1].trim(), line: index + 1 });
  });
  return keys;
}

/**
 * Report a condition the engine would delete.
 *
 * @param {Record<string, unknown>} entry - one entry.
 * @param {string} label - breadcrumb.
 * @param {Array<object>} findings - collector.
 */
function checkCondition(entry, label, findings) {
  const condition = entry.if;
  if (typeof condition !== 'string') return;
  if (!condition.includes('module') && !condition.includes('require')) return;
  findings.push({
    severity: 'warning',
    line: 0,
    message: `${label} 的 if 含 module / require：引擎的安全检查会**静默删除**这个条件，分支将无条件执行`,
  });
}

/**
 * Is this key a plausible misspelling of a kojo key?
 *
 * Only two shapes are reported, both of which are certain to change meaning
 * rather than being a legitimate print-config key: a case-only difference, and a
 * one-character slip that keeps the first letter.
 *
 * @param {string} key - the key found in the file.
 * @returns {string | undefined} the intended key.
 */
function nearKojoKey(key) {
  for (const known of KOJO_KEYS) {
    if (key === known) return undefined;
    if (key.toLowerCase() === known.toLowerCase()) return known;
    if (known.length < 3 || key.length < 2) continue;
    if (key[0].toLowerCase() !== known[0].toLowerCase()) continue;
    if (Math.abs(key.length - known.length) > 1) continue;
    if (editDistanceAtMostOne(key.toLowerCase(), known.toLowerCase())) return known;
  }
  return undefined;
}

/**
 * Are the two strings one insertion, deletion or substitution apart?
 *
 * @param {string} left - first string.
 * @param {string} right - second string.
 * @returns {boolean} true when the edit distance is at most one.
 */
function editDistanceAtMostOne(left, right) {
  if (left === right) return true;
  if (Math.abs(left.length - right.length) > 1) return false;
  let index = 0;
  while (index < left.length && index < right.length && left[index] === right[index]) index += 1;
  if (left.length === right.length) return left.slice(index + 1) === right.slice(index + 1);
  return left.length > right.length
    ? left.slice(index + 1) === right.slice(index)
    : left.slice(index) === right.slice(index + 1);
}

// ---------------------------------------------------------------------------
// Dictionary audit
// ---------------------------------------------------------------------------

/**
 * Keys the dictionary may hold something for.
 *
 * `%…%` is replaced only when the game passes a dictionary entry for that exact
 * key (`era.proxyKojo` in `era-start.js` turns `{CHARA: '…'}` into a global
 * `%CHARA%` → `…` replacement). A key is therefore free-form text, and a stray
 * lone `%` in prose is harmless — but a `%…%` run whose key contains a space or
 * punctuation is prose, not a placeholder, so it is not reported as one.
 */
const PLACEHOLDER = /%([^%]+)%/g;

/** A believable dictionary key: CJK or ASCII letters, digits, underscore. */
const PLACEHOLDER_KEY = /^[A-Za-z0-9_\u4e00-\u9fff]+$/;

/** Keys a button entry may carry: everything else never reaches `printButton`. */
const BUTTON_KEYS = ['acc', 'content', 'lines', 'if', 'comment', 'key'];

/** How a replacement position is named in the report. */
const KIND_LABEL = {
  button: '按钮文字',
  divider: '分割线的 content',
  lineColor: '整行颜色',
  spanColor: '分段文本的 color',
  text: '正文',
};

/**
 * List the dictionary keys a `.kojo` file uses, and report the places where a
 * `%…%` can never be replaced.
 *
 * The replacement sites are read straight off `parse-kojo.js`:
 *
 * | position | replaced? |
 * | --- | --- |
 * | a plain string entry, `content`, button `content`, `comment` | yes |
 * | the `color` of an entry that has a `content` | yes (via `d['KEY']`) |
 * | a span's `color` / `title`, a divider's `content` or `color` | **no** |
 * | any other config field (`fontSize`, `align`, …) | **no** |
 *
 * @param {string} text - the file's text.
 * @param {string} relative - path for messages.
 * @returns {{ findings: Array<object>, sections: Array<object> }} audit result.
 */
export function auditKojo(text, relative) {
  const findings = validateKojo(text, relative);
  const sections = [];
  const source = stripBom(text);
  const document = parseYamlDocument(source);
  if (document.unavailable !== undefined || document.error !== undefined) return { findings, sections };
  const root = document.value;
  if (root === null || root === undefined || typeof root !== 'object' || Array.isArray(root)) {
    return { findings, sections };
  }

  const firstLine = new Map();
  for (const entry of topLevelKeys(source)) {
    if (!firstLine.has(entry.key)) firstLine.set(entry.key, entry.line);
  }

  for (const [name, value] of Object.entries(root)) {
    const entries = entriesOf(value);
    if (entries === undefined) continue;
    const keys = new Map();
    const conditions = new Set();
    const context = { keys, conditions, findings };
    collectEntries(entries, name, context, 0);
    sections.push({
      name,
      line: firstLine.get(name) ?? 0,
      entries: entries.length,
      keys: [...keys.entries()]
        .map(([key, kinds]) => ({ key, kinds: [...kinds].sort() }))
        .sort((a, b) => a.key.localeCompare(b.key)),
      conditions: [...conditions].sort(),
    });
  }
  return { findings, sections };
}

/**
 * The entry array of one top-level value, if it has one.
 *
 * @param {unknown} value - the parsed top-level value.
 * @returns {unknown[] | undefined} the entries.
 */
function entriesOf(value) {
  if (Array.isArray(value)) return value;
  if (value !== null && typeof value === 'object' && Array.isArray(value.lines)) return value.lines;
  return undefined;
}

/**
 * Walk one entry array, collecting placeholders and inert-field warnings.
 *
 * @param {unknown[]} entries - the entries.
 * @param {string} where - breadcrumb.
 * @param {Record<string, any>} context - collector.
 * @param {number} depth - recursion depth.
 * @returns {void}
 */
function collectEntries(entries, where, context, depth) {
  if (depth > MAX_DEPTH) return;
  entries.forEach((entry, index) => {
    const label = `${where} 第 ${index + 1} 条`;
    if (typeof entry === 'string') {
      collect(entry, 'text', label, '正文', context);
      return;
    }
    if (entry === null || entry === undefined || entry === '') return;
    if (Array.isArray(entry) || typeof entry !== 'object') return;

    if (entry.divider === true) {
      if (typeof entry.content === 'string') collect(entry.content, 'divider', label, KIND_LABEL.divider, context);
      if (typeof entry.color === 'string') collect(entry.color, 'inert', label, '分割线的 color', context);
      inertFields(entry, ['content', 'color', 'divider', 'if'], label, context);
      return;
    }
    if (entry.random === true) {
      if (Array.isArray(entry.lines)) collectEntries(entry.lines, `${label}/随机`, context, depth + 1);
      return;
    }
    if (entry.acc !== undefined) {
      collectContent(entry.content, 'button', label, context);
      if (typeof entry.comment === 'string') collect(entry.comment, 'text', label, '按钮注释', context);
      const dropped = Object.keys(entry).filter((key) => !BUTTON_KEYS.includes(key));
      if (dropped.length > 0) {
        context.findings.push({
          severity: 'warning',
          line: 0,
          message: `${label} 是按钮（acc）条目，引擎只把 content 与 acc 交给 printButton：这里的 ${dropped.map((key) => `「${key}」`).join('、')} 不会生效`,
        });
      }
      collectCondition(entry.if, context);
      if (Array.isArray(entry.lines)) collectEntries(entry.lines, `${label}/按钮 ${entry.acc}`, context, depth + 1);
      return;
    }

    collectContent(entry.content, 'text', label, context);
    if (typeof entry.color === 'string') {
      collect(entry.color, entry.content !== undefined ? 'lineColor' : 'inert', label, entry.content !== undefined ? KIND_LABEL.lineColor : '没有 content 的 color', context);
    }
    inertFields(entry, ['content', 'color', 'lines', 'if', 'key', 'divider', 'lineUp', 'random', 'acc'], label, context);
    collectCondition(entry.if, context);
    if (Array.isArray(entry.lines)) collectEntries(entry.lines, label, context, depth + 1);
  });
}

/**
 * Collect the placeholders of a `content`, whether it is a string or spans.
 *
 * A span's `color` / `title` is collected as inert: the engine's dictionary pass
 * only replaces `e.content` inside a span array (`era-api.js` `print()`), never
 * the other span fields.
 *
 * @param {unknown} content - the `content` value.
 * @param {string} kind - `text` or `button`.
 * @param {string} label - breadcrumb.
 * @param {Record<string, any>} context - collector.
 * @returns {void}
 */
function collectContent(content, kind, label, context) {
  if (typeof content === 'string') {
    collect(content, kind, label, kind === 'button' ? KIND_LABEL.button : KIND_LABEL.text, context);
    return;
  }
  if (!Array.isArray(content)) return;
  content.forEach((span, spanIndex) => {
    const spanLabel = `${label} 的第 ${spanIndex + 1} 段`;
    if (typeof span === 'string') {
      collect(span, kind, spanLabel, kind === 'button' ? KIND_LABEL.button : KIND_LABEL.text, context);
      return;
    }
    if (span === null || typeof span !== 'object' || Array.isArray(span)) return;
    if (typeof span.content === 'string') collect(span.content, kind, spanLabel, kind === 'button' ? KIND_LABEL.button : KIND_LABEL.text, context);
    if (typeof span.color === 'string') collect(span.color, 'spanColor', spanLabel, KIND_LABEL.spanColor, context);
    inertFields(span, ['content', 'color'], spanLabel, context);
  });
}

/**
 * Report `%…%` inside a config field the engine never dictionary-replaces.
 *
 * @param {Record<string, unknown>} entry - one entry or span.
 * @param {string[]} skip - keys handled elsewhere.
 * @param {string} label - breadcrumb.
 * @param {Record<string, any>} context - collector.
 * @returns {void}
 */
function inertFields(entry, skip, label, context) {
  for (const [key, value] of Object.entries(entry)) {
    if (skip.includes(key) || typeof value !== 'string') continue;
    collect(value, 'inert', label, `「${key}」`, context);
  }
}

/**
 * Record a dictionary key used by an `if` condition (`d['KEY']` / `d.KEY`).
 *
 * @param {unknown} condition - the `if` value.
 * @param {Record<string, any>} context - collector.
 * @returns {void}
 */
function collectCondition(condition, context) {
  if (typeof condition !== 'string') return;
  for (const match of condition.matchAll(/d\s*\[\s*['"]([^'"]+)['"]\s*\]/g)) context.conditions.add(match[1]);
  for (const match of condition.matchAll(/\bd\.([A-Za-z_$][\w$]*)/g)) context.conditions.add(match[1]);
}

/**
 * Collect every believable placeholder in one string.
 *
 * @param {string} value - the string.
 * @param {string} kind - replacement position (`text`, `button`, `lineColor`, …).
 * @param {string} label - breadcrumb of the entry.
 * @param {string} position - human name of the position.
 * @param {Record<string, any>} context - collector.
 * @returns {void}
 */
function collect(value, kind, label, position, context) {
  for (const match of value.matchAll(PLACEHOLDER)) {
    const key = match[1].trim();
    if (key === '' || !PLACEHOLDER_KEY.test(key)) continue;
    const replaced = kind === 'text' || kind === 'button' || kind === 'lineColor';
    if (!context.keys.has(key)) context.keys.set(key, new Set());
    context.keys.get(key).add(replaced ? kind : 'inert');
    if (replaced) continue;
    context.findings.push({
      severity: 'warning',
      line: 0,
      message: `${label} 的 ${position} 里的 %${key}% 不会被字典替换：引擎只替换正文、按钮文字、comment，以及「带 content 的条目」的整行 color。这里它会原样留下——文字里会直接出现 %${key}%，或该设置失去作用、退回默认值`,
    });
  }
}
