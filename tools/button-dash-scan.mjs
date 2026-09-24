/**
 * @file 按钮正文「- 」普查扫描器（issue #612）：把原作里
 * `PRINT… [N] - 正文` 形式的选项与 ere 侧对应按钮逐个配对，报出正文缺
 * `- ` 的位置。
 *
 * 背景：原作把选项编号与正文写在同一行（`PRINTL [100] - 停止`），编号后的
 * `- ` 是**正文的一部分**。移植成 `era.printButton(正文, 编号)` 后，引擎按
 * `showAcc` 自己拼 `[编号] ` 前缀，正文里不写 `- ` 就会显示成 `[100] 停止`
 * ——与原作（以及 golden 样本）不同。#572 补回过 23 个按钮，本工具把剩下的
 * 逐个找出来。既有口径见 ere/page/page-ability-up.js 的文件头；不写 `[N]`
 * 前缀是 AGENTS.md 的硬约束（PR #30 实机撞见 `[0] [0]`）。
 *
 * 配对方式（两路互为佐证，见 survey）：
 *   1. 正文骨架匹配：两侧都把插值换成占位符、空白压平，再比对字面量拼接串
 *      ——原作 `PRINTFORM [0] - %PALAMNAME:0%点数×{JUEL:0}/{A} ……` 与
 *      `era.printButton(\`${…}点数×${juel}/${a} ……${…}\`, 0)` 的字面量
 *      `点数×` / `/` / ` ……` 对齐。这是主判据：ere 侧只有约四成按钮带
 *      `// :N` 行号注释，单靠注释覆盖不全。
 *   2. 行号注释：按钮语句上的 `// :N`（同行尾锚、前置注释、多行调用闭合行）
 *      给候选原行加权；正文骨架命中同一行时判为「锚一致」。
 *
 * 判定面（有意收窄，理由逐条）：
 *   - 原作侧只认**行首紧跟 `[N] - `** 的 PRINT 族语句。这是「编号在前 +
 *     分隔符」的选项形态本身；注释掉的选项行（`;PRINTL [6] - …`）不是可执行
 *     语句，正文里出现的 `[N]`（如「等级 [3] - 」）也不是选项前缀。
 *   - ere 侧认 `era.printButton(…)` 与 `printMultiColumns` 的
 *     `{ type: 'button', content: … }` 格。正文取首实参与 `content` 字段的
 *     **字面量骨架**；间接实参（形如 `option0`）回溯同文件里对它的赋值拼出
 *     骨架，并标记 `indirect: true` 供人工复核。插值里的实参（`era.get('x')`）
 *     只贡献占位符，不贡献字面量——否则 `'palamname:4'` 这类键名会污染骨架。
 *   - `[ N]` 定宽补位、`[N] - ` 后的空格数不在判定面内（编号由引擎渲染）。
 *     `▌` 等装饰前缀照旧参与骨架比对。
 *
 * 用法：
 *   node tools/button-dash-scan.mjs            # 打印配对结论
 *   node tools/button-dash-scan.mjs --json     # 机器可读（同一份数据）
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(TOOL_DIR);

// 原作正文是繁体/日文新字体混排，ere 侧一律简体（#60）。比对骨架前先过一遍
// 归一表，否则 `[9] - 向著世界之外` 与 `'向着世界之外'` 对不上（漏判）。
const { to_simplified } = createRequire(import.meta.url)('./lang-normalize.js');

/** 扫描根目录（仓库相对） */
export const ERE_ROOT = 'ere';
export const ERB_ROOT = 'target/ERB';

/** 骨架里的插值占位符（正文里不会出现的控制字符） */
const HOLE = '\u0000';

// ────────────────────────── 通用文本工具 ──────────────────────────

/**
 * 原作 ERB 文本 → 骨架：`{…}` 与 `%…%` 插值换成占位符，空白压平。
 * @param {string} text
 * @returns {string}
 */
export function erb_skeleton(text) {
  return text
    .replace(/\{[^{}]*\}/g, HOLE)
    .replace(/%[^%\r\n]*%/g, HOLE)
    .replace(/[ \t\u3000]+/g, ' ');
}

/**
 * 骨架里所有字面量（去掉占位符与空白）拼成的串——**只用于比对**。
 * 中点有三种写法（原作 `・` U+30FB、移植版常用 `·` U+00B7、`･` U+FF65），
 * 统一成一个，否则 `使用现有怪物的一半去进攻（资金・俘虏）` 与
 * `'使用现有怪物的一半去进攻（资金·俘虏）'` 对不上，那一屏的按钮会整批
 * 落进「没配上原作」而漏判分隔符。
 */
export function core_of(skeleton) {
  return skeleton
    .split(HOLE)
    .join('')
    .replace(/\s+/g, '')
    .replace(/[・·･]/g, '·');
}

/** 骨架切成字面量段（按占位符切分，去空白与空段） */
export function segments_of(skeleton) {
  return skeleton
    .split(HOLE)
    .map((s) => s.replace(/\s+/g, ''))
    .filter((s) => s !== '');
}

/**
 * 骨架里最长的字面量段：核心比对过不去时的兜底判据。原作把数量写成字面
 * 数字、移植版写成插值（`[0] - 日常服饰（100点）` vs
 * `` `日常服饰（${CASUAL_PRICE}点）` ``），两侧的核心永远对不上，靠
 * 「最长的字面量段出现在原作正文里」把两者接上。
 */
export function longest_segment(skeleton) {
  const segments = segments_of(skeleton);
  return segments.reduce((a, b) => (b.length > a.length ? b : a), '');
}

/** JS 字面量片段 → 骨架（片段间即插值位置） */
export function js_skeleton(literals) {
  return literals.join(HOLE).replace(/[ \t\u3000]+/g, ' ');
}

/** 递归收集目录下指定扩展名的文件 */
function walk(dir, suffix, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, suffix, out);
    } else if (entry.name.endsWith(suffix)) {
      out.push(full);
    }
  }
  return out;
}

// ────────────────────────── 原作 ERB 侧 ──────────────────────────

const ERB_STATEMENT_RE = /^\s*(PRINT[A-Z]*)\s+([\s\S]*)$/;
/**
 * 不换行的 PRINT 族（续写同一输出行）：`PRINT` / `PRINTS` / `PRINTV` /
 * `PRINTFORM` / `PRINTC` / `PRINTPLAIN` / `PRINTPLAINFORM` 与它们带对齐后缀
 * `C` 的写法。其余后缀（L = 换行、W = 等待、K = 按键、D = 延迟）都结束当前
 * 输出行。依据见 emuera-basic-agent-guide 的 print-system.md。
 */
const PRINT_CONTINUES_RE =
  /^(?:PRINT|PRINTS|PRINTV|PRINTFORM|PRINTC|PRINTPLAIN|PRINTPLAINFORM|PRINTFORMC)$/;
/** 编号点：`[0]`、`[ 0]`、`[1000]`。一行可能并排好几个 */
const ERB_NUM_MARK_RE = /\[\s*(\d+)\s*\]/g;
/** 编号点之后的「分隔符」：破折号串 + 可选空白（`- `、`---`、`----`） */
const ERB_SEPARATOR_RE = /^\s*(-*)\s*/;

/**
 * 一条 PRINT 语句对输出行贡献的文本。`PRINTS` / `PRINTV` 打的是变量本身
 * （ABLUP6.ERB:110 `PRINTS PALAMNAME:6`、:112 `PRINTV A`），按占位符计；
 * `PRINT` / `PRINTFORM` 的实参是字面文本（含 `{…}` 插值，后续由
 * erb_skeleton 换掉）。`{}` 是 erb_skeleton 眼里的插值，正好落成占位符。
 */
function part_of(opcode, body) {
  return /^(?:PRINTS|PRINTV)[LWKD]*$/.test(opcode) ? '{}' : body;
}

/**
 * 把一条 PRINT 语句的正文切成若干 `[N] …` 选项。编号点要么在行首、要么前面
 * 是空白——`移动到[撕破衣服]` 这类正文里的方括号不是编号点（前一字符是汉字）。
 *
 * 每条记录里：
 *   - `after`：`[N]` 之后的原文（含分隔符，到下一个编号点或行尾为止）；
 *   - `dashes`：分隔符里破折号的个数（0 = 原作没写分隔符）；
 *   - `space`：破折号之后有没有空白（`- 停止` 有、`---适当剪一下` 没有）；
 *   - `text`：去掉分隔符之后的正文。
 *
 * **一行可能并排多个选项**（`PRINTL [0] - 解除陷阱 [1] - 取下宝物 …` 与
 * `PRINTL [998] - 停止 [999] - 结束地下城的设定`，DUNGEON_SETUP.ERB:176-177），
 * 所以按编号点切分，而不是按行取第一条。
 *
 * @param {string} body 语句正文（PRINT 族 opcode 之后的部分）
 * @returns {Array<{num: number, after: string, dashes: number, space: boolean, text: string}>}
 */
export function split_erb_options(body) {
  const marks = [...body.matchAll(ERB_NUM_MARK_RE)].filter((mark) => {
    if (mark.index === 0 || /\s/.test(body[mark.index - 1] ?? '')) {
      return true;
    }
    // 原作也写「贴在一起」的并排选项：`PRINTL [997] 下一页[996] 服装黑市
    // [998] 上一页[999] - 返回`（SHOP_TAILOR.ERB:384）。这种编号点前面是
    // 汉字、后面却有空白或分隔符；行尾那种 `PRINTC 能力表示[100]`（编号在
    // 末尾、后面什么都没有）不是选项前缀，靠「后面必须有空白/破折号」挡掉。
    const after = body.slice(mark.index + mark[0].length);
    return /^[\s-]/.test(after);
  });
  return marks.map((mark, index) => {
    const from = mark.index + mark[0].length;
    const to = index + 1 < marks.length ? marks[index + 1].index : body.length;
    const after = body.slice(from, to).trim();
    return { num: Number(mark[1]), after, text: after };
  });
}

/**
 * 扫描原作 `target/ERB` 下所有 `.ERB` 里带 `[N] …` 选项编号的 PRINT 族语句。
 *
 * Shift-JIS 文件（本项目只有 `COMF90_ニプルファック.ERB`）按 UTF-8 读会带
 * 替换字符，跳过并记进报告——不让「读不了」悄悄变成「扫过了、没有」。
 *
 * @param {string} [root] 仓库根目录
 * @returns {{options: object[], skipped: string[]}}
 */
export function scan_erb_options(root = REPO) {
  const options = [];
  const skipped = [];
  for (const full of walk(path.join(root, ERB_ROOT), '.ERB')) {
    const rel = path.relative(root, full).split(path.sep).join('/');
    const text = fs.readFileSync(full, 'utf8');
    if (text.includes('\uFFFD')) {
      skipped.push(rel);
      continue;
    }
    // 逻辑行 = 一串**不换行**的 PRINT 语句（PRINT/PRINTS/PRINTV/PRINTFORM/
    // PRINTC…）＋收尾的那一条换行语句。原作常把一条选项拆成好几条语句
    // （ABLUP6.ERB:109-135 `PRINT [0] - ` / `PRINTS PALAMNAME:6` /
    // `PRINT 点数×` / `PRINTV A` …），只看单行会漏掉正文。
    let pending = null;
    const flush = () => {
      if (pending === null) {
        return;
      }
      for (const option of split_erb_options(pending.body)) {
        options.push({
          file: rel,
          line: pending.line,
          op: pending.op,
          ...option,
          ...classify_erb_text(option.text),
        });
      }
      pending = null;
    };
    text.split(/\r?\n/).forEach((raw, index) => {
      const statement = raw.match(ERB_STATEMENT_RE);
      if (statement === null) {
        // 空行与整行注释不打断续行（原作常在续行之间夹注释）；别的语句打断
        if (raw.trim() !== '' && !/^\s*[;*]/.test(raw)) {
          flush();
        }
        return;
      }
      if (!PRINT_CONTINUES_RE.test(statement[1])) {
        if (pending === null) {
          pending = { line: index + 1, op: statement[1], body: '' };
        }
        pending.body += part_of(statement[1], statement[2]);
        flush();
        return;
      }
      if (pending === null) {
        pending = { line: index + 1, op: statement[1], body: '' };
      }
      pending.body += part_of(statement[1], statement[2]);
    });
    flush();
  }
  const sort = (a, b) => a.file.localeCompare(b.file) || a.line - b.line;
  return { options: options.sort(sort), skipped };
}

/**
 * 原作正文 → 骨架/核心/分隔符标记。
 * @param {string} text 去掉编号点之后的原文（可含分隔符）
 */
function classify_erb_text(text) {
  const separator = text.match(ERB_SEPARATOR_RE)[0];
  const dashes = separator.replace(/\s/g, '').length;
  const content = to_simplified(text.slice(separator.length));
  const skeleton = erb_skeleton(content);
  const core = core_of(skeleton);
  return {
    separator,
    dashes,
    space_after_dashes: /^\s*-+\s+/.test(text),
    content,
    skeleton,
    core,
    core_nodash: core.replace(/^-+/, ''),
    segments: segments_of(skeleton),
  };
}

// ────────────────────────── ere 侧 ──────────────────────────

/**
 * 从一个 JS 表达式收集字面量片段（字符串与模板串的内容）；插值、函数调用、
 * 标识符一律只留一个空片段当占位符。间接实参（裸标识符）经 `resolve` 回溯
 * 同文件里的赋值右值，并置 `indirect`。
 *
 * @param {string} expr 表达式原文
 * @param {(name: string) => string[]} resolve 变量名 → 赋值右值列表
 * @param {Set<string>} [seen] 防递归
 * @returns {{literals: string[], indirect: boolean}}
 */
function collect_literals(expr, resolve, seen = new Set()) {
  const literals = [];
  let indirect = false;
  let pending = '';
  let i = 0;
  const flush = () => {
    if (pending.trim() !== '') {
      literals.push('');
    }
    pending = '';
  };
  while (i < expr.length) {
    const ch = expr[i];
    // 注释不是正文：多行调用的实参里常夹 `// :54` 这类原作行号注释，
    // 当成字面量会把骨架污染成「… // :54 …」
    if (ch === '/' && expr[i + 1] === '/') {
      while (i < expr.length && expr[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && expr[i + 1] === '*') {
      const close = expr.indexOf('*/', i + 2);
      i = close < 0 ? expr.length : close + 2;
      continue;
    }
    if (ch === "'" || ch === '"') {
      flush();
      const { value, next } = read_quoted(expr, i);
      literals.push(value);
      i = next;
      continue;
    }
    if (ch === '`') {
      flush();
      i += 1;
      let buf = '';
      while (i < expr.length && expr[i] !== '`') {
        if (expr[i] === '\\') {
          const { value, next } = read_escape(expr, i);
          buf += value;
          i = next;
          continue;
        }
        if (expr[i] === '$' && expr[i + 1] === '{') {
          const inner = read_braced(expr, i + 2);
          i = inner.next;
          const sub = collect_literals(inner.body, resolve, seen);
          if (sub.indirect) indirect = true;
          literals.push(buf, ...sub.literals);
          buf = '';
          continue;
        }
        buf += expr[i];
        i += 1;
      }
      i += 1;
      flush();
      literals.push(buf);
      continue;
    }
    if (/[A-Za-z_$]/.test(ch)) {
      const { text, next } = read_word(expr, i);
      i = next;
      if (/^[A-Za-z_$][\w$]*$/.test(text) && !seen.has(text)) {
        const assignments = resolve(text);
        if (assignments.length > 0) {
          seen.add(text);
          for (const assignment of assignments) {
            const sub = collect_literals(assignment, resolve, seen);
            if (sub.indirect) indirect = true;
            literals.push(...sub.literals);
          }
          seen.delete(text);
          indirect = true;
          continue;
        }
      }
      pending += text;
      continue;
    }
    pending += ch;
    i += 1;
  }
  flush();
  return { literals, indirect };
}

/** 读一个引号串（`'` / `"`），返回内容与新的下标 */
function read_quoted(expr, at) {
  const quote = expr[at];
  let buf = '';
  let i = at + 1;
  while (i < expr.length && expr[i] !== quote) {
    if (expr[i] === '\\') {
      const { value, next } = read_escape(expr, i);
      buf += value;
      i = next;
      continue;
    }
    buf += expr[i];
    i += 1;
  }
  return { value: buf, next: i + 1 };
}

/** 读一个转义序列（从反斜杠起），返回字面字符与新的下标 */
function read_escape(expr, at) {
  const ch = expr[at + 1] ?? '';
  if (ch === 'u' && expr[at + 2] === '{') {
    const close = expr.indexOf('}', at + 3);
    const code = Number.parseInt(expr.slice(at + 3, close), 16);
    return { value: String.fromCodePoint(code), next: close + 1 };
  }
  if (ch === 'u') {
    const code = Number.parseInt(expr.slice(at + 2, at + 6), 16);
    return { value: String.fromCodePoint(code), next: at + 6 };
  }
  if (ch === 'x') {
    const code = Number.parseInt(expr.slice(at + 2, at + 4), 16);
    return { value: String.fromCodePoint(code), next: at + 4 };
  }
  const map = { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', 0: '\0' };
  return { value: map[ch] ?? ch, next: at + 2 };
}

/** 读 `(...)` / `[...]` / `{...}` 一对括号的正文（跳过嵌套与字符串） */
function read_braced(expr, at) {
  const open = expr[at - 1];
  const close = open === '(' ? ')' : open === '[' ? ']' : '}';
  let depth = 1;
  let i = at;
  let in_str = null;
  while (i < expr.length && depth > 0) {
    const ch = expr[i];
    if (in_str) {
      if (ch === '\\') i += 1;
      else if (ch === in_str) in_str = null;
    } else if (ch === "'" || ch === '"' || ch === '`') {
      in_str = ch;
    } else if (ch === open) {
      depth += 1;
    } else if (ch === close) {
      depth -= 1;
      if (depth === 0) break;
    }
    i += 1;
  }
  return { body: expr.slice(at, i), next: i + 1 };
}

/** 读一个标识符及其后缀（`.field` 与 `(…)` / `[…]`），调用结果不留字面量 */
function read_word(expr, at) {
  let i = at;
  let text = '';
  while (i < expr.length && /[\w$]/.test(expr[i])) {
    text += expr[i];
    i += 1;
  }
  for (;;) {
    if (expr[i] === '.') {
      let j = i + 1;
      while (j < expr.length && /[\w$]/.test(expr[j])) j += 1;
      text += expr.slice(i, j);
      i = j;
      continue;
    }
    if (expr[i] === '(' || expr[i] === '[') {
      const { next } = read_braced(expr, i + 1);
      text += expr.slice(i, next);
      i = next;
      continue;
    }
    break;
  }
  return { text, next: i };
}

/**
 * 扫描 ere 全目录的按钮调用与按钮格。
 * @param {string} [root] 仓库根目录
 * @returns {object[]}
 */
export function scan_ere_buttons(root = REPO) {
  const buttons = [];
  for (const full of walk(path.join(root, ERE_ROOT), '.js')) {
    const rel = path.relative(root, full).split(path.sep).join('/');
    const text = fs.readFileSync(full, 'utf8');
    const lines = text.split(/\r?\n/);
    for (const call of find_calls(text, 'printButton')) {
      const args = split_args(call.args);
      buttons.push(
        make_button(
          rel,
          text,
          lines,
          call,
          args[0] ?? '',
          'printButton',
          args[1],
        ),
      );
    }
    for (const call of find_calls(text, 'printMultiColumns')) {
      for (const cell of split_array_items(call.args)) {
        if (!/type\s*:\s*['"]button['"]/.test(cell)) {
          continue;
        }
        const content = field_value(cell, 'content');
        if (content === null) {
          continue;
        }
        const offset = text.indexOf(cell.trim(), call.start);
        buttons.push(
          make_button(
            rel,
            text,
            lines,
            { start: offset, end: offset + cell.trim().length },
            content,
            'cell',
            field_value(cell, 'accelerator'),
          ),
        );
      }
    }
  }
  return buttons.sort(
    (a, b) => a.file.localeCompare(b.file) || a.line - b.line,
  );
}

/** 组装一条按钮记录 */
function make_button(file, text, lines, call, arg, kind, acc_arg) {
  const line = text.slice(0, call.start).split('\n').length;
  const { literals, indirect } = collect_literals(arg, (name) =>
    assignments_of(text, name),
  );
  const skeleton = js_skeleton(literals);
  const acc = (acc_arg ?? '').trim();
  // 渲染后的正文开头：引擎把连续空白并成一个空格，所以分隔符判据只看开头
  // 的破折号串（`- 停止`、`-【无视污垢】`、`----`）与它后面有没有空白。
  // 取**第一个非空字面量段**而不是骨架首字符：`cond ? '- a' : '- b'` 这类
  // 三元分支、`[{content: '- x'}, …]` 这类片段数组，骨架开头是我方插的
  // 占位符（条件/函数调用的位置），照首字符判会把带「- 」的按钮判成没带。
  const raw_first = (
    skeleton.split(HOLE).find((part) => part.trim() !== '') ?? ''
  ).replace(/^\s+/, '');
  const dashes = (raw_first.match(/^-+/) ?? [''])[0].length;
  // 骨架**开头**就带破折号的另一种口径：判「ere 多写了」用这个，理由见
  // verdict_of——正文中段的 ` - LV n` 是原作正文的一部分，不是分隔符。
  const lead = skeleton.replace(/^\s+/, '');
  const dashes_lead = (lead.match(/^-+/) ?? [''])[0].length;
  return {
    file,
    line,
    kind,
    arg: arg.trim().replace(/\s+/g, ' '),
    skeleton,
    core: core_of(skeleton),
    core_nodash: core_of(skeleton).replace(/^-+/, ''),
    segments: segments_of(skeleton),
    dashes,
    dashes_lead,
    space_after_dashes: /^-+\s/.test(raw_first),
    indirect,
    acc: /^\d[\d_]*$/.test(acc) ? Number(acc.replace(/_/g, '')) : null,
    anchor: anchor_line(lines, line, text, call),
  };
}

/** 按钮语句的原作行号注释：同行尾锚、多行闭合行、上一行前置注释 */
function anchor_line(lines, line, text, call) {
  const end_line = text.slice(0, call.end).split('\n').length;
  for (const candidate of [
    lines[line - 1],
    lines[end_line - 1],
    lines[line - 2],
  ]) {
    if (candidate === undefined) {
      continue;
    }
    const m = candidate.match(/\/\/\s*:(\d+)(?:-(\d+))?/);
    if (m !== null) {
      return { n: Number(m[1]), m: Number(m[2] ?? m[1]) };
    }
  }
  return null;
}

/** 同文件里对某个变量的赋值右值（`=` 与 `+=`，按出现顺序） */
function assignments_of(text, name) {
  const out = [];
  const re = new RegExp(
    `(?:^|[^.\\w$])(?:const\\s+|let\\s+|var\\s+)?${name}\\s*(?:\\+?=)(?!=)\\s*`,
    'g',
  );
  for (;;) {
    const m = re.exec(text);
    if (m === null) {
      break;
    }
    let i = m.index + m[0].length;
    let depth = 0;
    let in_str = null;
    const start = i;
    while (i < text.length) {
      const ch = text[i];
      if (in_str) {
        if (ch === '\\') i += 1;
        else if (ch === in_str) in_str = null;
      } else if (ch === "'" || ch === '"' || ch === '`') {
        in_str = ch;
      } else if (ch === '(' || ch === '[' || ch === '{') {
        depth += 1;
      } else if (ch === ')' || ch === ']' || ch === '}') {
        depth -= 1;
      } else if ((ch === ';' || ch === '\n') && depth === 0) {
        break;
      }
      i += 1;
    }
    out.push(text.slice(start, i));
    if (out.length > 12) {
      break; // 防御：变量名撞上别的东西时别把整个文件收进来
    }
  }
  return out;
}

/** 找 `era.<name>(` 调用，返回实参原文（字符串/注释感知） */
function find_calls(text, name) {
  const out = [];
  const re = new RegExp(`era\\.${name}\\(`, 'g');
  for (;;) {
    const m = re.exec(text);
    if (m === null) {
      break;
    }
    const start = m.index + m[0].length;
    let i = start;
    let depth = 1;
    let in_str = null;
    while (i < text.length && depth > 0) {
      const ch = text[i];
      if (in_str) {
        if (ch === '\\') {
          i += 2;
          continue;
        }
        if (ch === in_str) in_str = null;
      } else if (ch === "'" || ch === '"' || ch === '`') {
        in_str = ch;
      } else if (ch === '/' && text[i + 1] === '/') {
        while (i < text.length && text[i] !== '\n') i += 1;
        continue;
      } else if (ch === '/' && text[i + 1] === '*') {
        const close = text.indexOf('*/', i + 2);
        i = close < 0 ? text.length : close + 2;
        continue;
      } else if (ch === '(') {
        depth += 1;
      } else if (ch === ')') {
        depth -= 1;
      }
      i += 1;
    }
    out.push({ start: m.index, end: i, args: text.slice(start, i - 1) });
  }
  return out;
}

/** 顶层逗号切分（实参表与数组元素共用） */
export function split_args(args) {
  const out = [];
  let depth = 0;
  let in_str = null;
  let buf = '';
  for (let i = 0; i < args.length; i += 1) {
    const ch = args[i];
    if (in_str) {
      buf += ch;
      if (ch === '\\') {
        buf += args[i + 1] ?? '';
        i += 1;
      } else if (ch === in_str) {
        in_str = null;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      in_str = ch;
      buf += ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth += 1;
    else if (ch === ')' || ch === ']' || ch === '}') depth -= 1;
    if (ch === ',' && depth === 0) {
      out.push(buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  if (buf.trim() !== '' || out.length > 0) {
    out.push(buf);
  }
  return out;
}

/** 数组字面量 `[{…}, {…}]` 的顶层元素 */
export function split_array_items(args) {
  const trimmed = args.trim().replace(/^\[/, '').replace(/\]$/, '');
  return split_args(trimmed)
    .map((s) => s.trim())
    .filter((s) => s !== '');
}

/** 对象字面量里某个字段的值表达式（顶层 `key:`），没有返回 null */
export function field_value(object_text, key) {
  const body = object_text.replace(/^\{/, '').replace(/\}$/, '');
  for (const part of split_args(body)) {
    const m = part.match(new RegExp(`^\\s*${key}\\s*:\\s*([\\s\\S]*)$`));
    if (m !== null) {
      return m[1].trim();
    }
  }
  return null;
}

// ────────────────────────── 配对 ──────────────────────────

/**
 * 两个核心字面量是否指向同一段文本：完全相等，或短的一方是长的一方的
 * 子串（原作多行拼行、ere 侧把原作两行并进一句的形态）。短于 3 字符的
 * 串要求完全相等，免得「是」「无」这类单词到处撞。
 */
export function cores_match(a, b) {
  if (a === '' || b === '') return false;
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (short.length < 3) return false;
  return long.includes(short);
}

/** js 文件（相对路径 + 全文）对应的原作 ERB 文件集合 */
export function source_files_of(rel, text, trace_refs) {
  const files = new Set();
  for (const entry of trace_refs) {
    if (entry.js === rel) {
      for (const ref of entry.refs) {
        files.add(ref.src);
      }
    }
  }
  for (const m of text.matchAll(/target\/ERB\/[^\r\n*"'`,;()]+?\.ERB/g)) {
    files.add(m[0].trim());
  }
  return files;
}

/** 装载锚表（tools/trace-refs/） */
export async function load_trace_refs() {
  const { load_trace_refs: load, DEFAULT_TRACE_REFS_DIR } =
    await import('./trace-refs-load.mjs');
  const { FILES } = await load(DEFAULT_TRACE_REFS_DIR);
  return FILES;
}

/**
 * 全量普查。
 * @param {string} [root] 仓库根目录
 * @returns {Promise<object>}
 */
export async function survey(root = REPO) {
  const { options, skipped } = scan_erb_options(root);
  const buttons = scan_ere_buttons(root);
  const trace_refs = await load_trace_refs();

  const by_file = new Map(); // ERB 文件 → 该文件的选项
  for (const option of options) {
    if (!by_file.has(option.file)) by_file.set(option.file, []);
    by_file.get(option.file).push(option);
  }

  const paired = [];
  const review = []; // 候选多个、编号都对不上 → 人工看，不进缺「- 」清单
  const used_buttons = new Set();
  for (const button of buttons) {
    const text = fs.readFileSync(path.join(root, button.file), 'utf8');
    const sources = source_files_of(button.file, text, trace_refs);
    const candidates = [];
    for (const src of sources) {
      for (const option of by_file.get(src) ?? []) {
        // 两道：连分隔符一起比（`- 停止` vs `- 停止`），以及都剥掉行首破折号
        // 再比（`停止` vs `- 停止`——正是本票要抓的缺分隔符形态；短正文如
        // 「好的」只有两个字，第一道过不了 3 字符的下限）
        if (
          cores_match(option.core, button.core) ||
          cores_match(option.core_nodash, button.core_nodash)
        ) {
          candidates.push(option);
          continue;
        }
        // 兜底：核心对不上（原作写死数字、移植侧是插值）时按最长字面量段接。
        // 段首的分隔符不算正文，两侧各剥一次再比。
        const anchor = longest_segment(button.skeleton).replace(/^-+/, '');
        if (
          anchor.length >= 4 &&
          option.core.replace(/^-+/, '').includes(anchor) &&
          (button.acc === null || option.num === button.acc)
        ) {
          candidates.push(option);
        }
      }
    }
    if (candidates.length === 0) {
      continue;
    }
    const anchored = candidates.filter(
      (o) =>
        button.anchor !== null &&
        o.line >= button.anchor.n &&
        o.line <= button.anchor.m,
    );
    const same_num = candidates.filter((o) => o.num === button.acc);
    const pick = anchored[0] ?? same_num[0] ?? candidates[0];
    const confidence =
      button.acc === null
        ? '编号未知'
        : pick.num === button.acc
          ? '编号一致'
          : same_num.length > 0
            ? '编号漂移'
            : candidates.length === 1
              ? '编号漂移'
              : '编号冲突';
    if (confidence === '编号冲突') {
      review.push({ option: pick, button, candidates });
      used_buttons.add(button);
      continue;
    }
    paired.push({
      option: pick,
      button,
      anchor_ok: anchored.includes(pick),
      confidence,
      candidates: candidates.length,
    });
    used_buttons.add(button);
  }

  const paired_options = new Set(paired.map((p) => p.option));
  const paired_buttons = new Set(paired.map((p) => p.button));
  return {
    options,
    buttons,
    skipped,
    paired,
    review,
    unmatched_options: options.filter((o) => !paired_options.has(o)),
    unmatched_buttons: buttons.filter((b) => !paired_buttons.has(b)),
  };
}

/**
 * 一条配对的结论：原作带了破折号分隔符、ere 正文里没有 → `missing`；
 * 原作没有、ere 多写了 → `extra`；两侧都有但破折号个数不同 → `mismatch`；
 * 一致 → `ok`。
 * @param {{option: object, button: object}} pair
 * @returns {'ok'|'missing'|'extra'|'mismatch'}
 */
export function verdict_of(pair) {
  const { option, button } = pair;
  if (option.dashes > 0 && button.dashes === 0) return 'missing';
  // 「多写」用**骨架开头**的口径：正文中段的 ` - LV n`（ABL.ERB:88 的
  // `[99]%MARKNAME:3% - LV{MARK:3,2}`）是原作正文的一部分，两边一样，
  // 按第一个非空字面量段判会把它误报成「ere 多写了破折号」。
  if (option.dashes === 0 && button.dashes_lead > 0) return 'extra';
  if (option.dashes > 0 && button.dashes !== option.dashes) return 'mismatch';
  if (
    option.dashes > 0 &&
    option.space_after_dashes !== button.space_after_dashes
  )
    return 'space';
  return 'ok';
}

/** 人读报告 */
export function format_survey(result) {
  const verdicts = result.paired.map((p) => ({ ...p, verdict: verdict_of(p) }));
  const missing = verdicts.filter((p) => p.verdict === 'missing');
  const extra = verdicts.filter((p) => p.verdict === 'extra');
  const mismatch = verdicts.filter((p) => p.verdict === 'mismatch');
  const space = verdicts.filter((p) => p.verdict === 'space');
  const ok = verdicts.filter((p) => p.verdict === 'ok');
  const reversed = result.unmatched_buttons.filter((b) => b.dashes > 0);
  const lines = [
    `原作带 \`[N] …\` 编号点的 PRINT 语句里共切出 ${result.options.length} 条选项；` +
      `ere 按钮 ${result.buttons.length} 处`,
    `配对成功 ${result.paired.length} 处：分隔符一致 ${ok.length}；` +
      `**原作有、ere 缺 ${missing.length}**；ere 多写 ${extra.length}；` +
      `破折号个数不符 ${mismatch.length}；分隔符缺空格 ${space.length}；` +
      `配对结论存疑 ${result.review.length} 处；` +
      `原作侧无对应按钮 ${result.unmatched_options.length} 处；ere 按钮未配上原作 ${result.unmatched_buttons.length} 处` +
      `（其中写了破折号 ${reversed.length} 处，需人工看是否是原作没写的）`,
  ];
  if (result.skipped.length > 0) {
    lines.push(`跳过（非 UTF-8，未扫）：${result.skipped.join('、')}`);
  }
  const by_file = new Map();
  for (const p of missing) {
    if (!by_file.has(p.button.file)) by_file.set(p.button.file, []);
    by_file.get(p.button.file).push(p);
  }
  lines.push(
    '',
    `── 缺分隔符的按钮（${missing.length} 处 / ${by_file.size} 个文件，按文件）──`,
  );
  for (const [file, items] of by_file) {
    lines.push(`  ${file}（${items.length}）`);
    for (const p of items) {
      lines.push(
        `    :${p.button.line}${p.button.indirect ? ' 〔间接实参〕' : ''}` +
          ` 〔${p.confidence}${p.button.acc !== null && p.button.acc !== p.option.num ? ` ${p.button.acc}≠${p.option.num}` : ''}〕` +
          `  ← ${p.option.file}:${p.option.line} [${p.option.num}] 补 ${JSON.stringify(p.option.separator)}${p.anchor_ok ? ' 锚一致' : ''}`,
        `        ere : ${p.button.arg.slice(0, 110)}`,
        `        原作: ${p.option.after.slice(0, 110)}`,
      );
    }
  }
  if (mismatch.length > 0) {
    lines.push('', `── 破折号个数不符（${mismatch.length}）──`);
    for (const p of mismatch) {
      lines.push(
        `  ${p.button.file}:${p.button.line}  ere ${p.button.dashes} 个 / 原作 ${JSON.stringify(p.option.separator)}`,
        `      ere : ${p.button.arg.slice(0, 100)}`,
        `      原作: ${p.option.after.slice(0, 100)}  ← ${p.option.file}:${p.option.line}`,
      );
    }
  }
  if (space.length > 0) {
    lines.push('', `── 破折号后缺空格的（${space.length}）──`);
    for (const p of space) {
      lines.push(
        `  ${p.button.file}:${p.button.line}  ere ${JSON.stringify(p.button.arg.slice(0, 40))}` +
          `  ← ${p.option.file}:${p.option.line} ${JSON.stringify(p.option.after.slice(0, 40))}`,
      );
    }
  }
  if (extra.length > 0) {
    lines.push('', `── 原作没写、ere 多写了破折号（${extra.length}）──`);
    for (const p of extra) {
      lines.push(
        `  ${p.button.file}:${p.button.line}  ${p.button.arg.slice(0, 90)}` +
          `  ← ${p.option.file}:${p.option.line} [${p.option.num}] ${p.option.after.slice(0, 60)}`,
      );
    }
  }
  if (result.review.length > 0) {
    lines.push(
      '',
      `── 需人工判号（候选多个、编号都不对，${result.review.length}）──`,
    );
    for (const r of result.review) {
      lines.push(
        `  ${r.button.file}:${r.button.line} 〔编号 ${r.button.acc}〕  ${r.button.arg.slice(0, 90)}`,
        ...r.candidates.map(
          (c) =>
            `      ? ${c.file}:${c.line} [${c.num}] ${c.after.slice(0, 70)}`,
        ),
      );
    }
  }
  lines.push('', `── 配对成立、分隔符一致（${ok.length}）──`);
  for (const p of ok) {
    lines.push(
      `  ${p.button.file}:${p.button.line}  ← ${p.option.file}:${p.option.line} [${p.option.num}]`,
    );
  }
  lines.push(
    '',
    `── 未配上原作选项、但 ere 正文写了破折号（${reversed.length}）──`,
  );
  for (const b of reversed) {
    lines.push(`  ${b.file}:${b.line}  ${b.arg.slice(0, 110)}`);
  }
  lines.push(
    '',
    `── 原作有选项、ere 侧没配上按钮（${result.unmatched_options.length}，按文件计数）──`,
  );
  const counts = new Map();
  for (const o of result.unmatched_options) {
    counts.set(o.file, (counts.get(o.file) ?? 0) + 1);
  }
  for (const [file, count] of [...counts].sort((a, b) => b[1] - a[1])) {
    lines.push(`  ${String(count).padStart(4)}  ${file}`);
  }
  return lines.join('\n');
}

/** CLI */
export async function run(argv = []) {
  const result = await survey();
  if (argv.includes('--json')) {
    const json = JSON.stringify(result, null, 2);
    process.stdout.write(json);
    return json;
  }
  const report = format_survey(result);
  process.stdout.write(`${report}\n`);
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  run(process.argv.slice(2)).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
