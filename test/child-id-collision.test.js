/**
 * @file 后代 ID 与页面固定按钮编号的撞号防护（issue #560，与 #561 同票实施）。
 *
 * 背景：列表页把角色 ID 直接当按钮快捷键（#530/#535 的名册、#543 的批量处刑
 * 页、#395 的目标选择页），同屏还有固定编号的功能按钮（返回/翻页/排序表头
 * 等）。后代 ID 由 ere 自己分配（chara-pregnancy.js 的 allocate_child_id），
 * 一旦落进固定编号区间就会撞号：点角色行触发的是功能按钮，这个角色反而选不
 * 中（#543 验收逐行对照时发现）。
 *
 * 做法（#560 主 agent 2026-09-24 的决定）：把 FIRST_CHILD_ID 抬到全部页面固定
 * 按钮编号之上（100000），「每个来源预设保留 100 位」的区间结构不变，于是
 * template_no_of 的反推照常成立。代价是旧档里已有的后代 ID 会被算错，按
 * ADR-0006 同抬存档版本（yml/GameBase.yml 的 0.0.8）。
 *
 * 本文件守三件事：
 *   1. 静态不变量——扫 ere/ 全部按钮快捷键，「纯数字的固定编号」必须小于
 *      FIRST_CHILD_ID（注释与字符串里的示例不算）；角色预设 ID
 *      （yml/Chara*.yml 的键）同样必须小于它。扫描只认纯数字字面量，
 *      「常量 + 变量」型（chara-family.js 的 `15_000 + 角色 ID`）与变量型
 *      （`accelerator: cid`）不参与——它们的撞号面在完成评论的普查表里
 *      逐页列明；
 *   2. 静态不变量（#593 重建）——「预设 ID × 同屏固定按钮」：预设 ID 在
 *      FIRST_CHILD_ID 之下，上面那条覆盖不到。核对按**源码结构**取数——
 *      先按函数圈定屏幕，再按输入边界把函数切成「轮」，然后在**同一轮**里
 *      扫全部按钮快捷键（字面量、常量、常量数组下标；`printButton` 与
 *      `printMultiColumns` 的 `accelerator:` 两种写法都算），与预设 ID
 *      求交集。登记屏幕见 CHARACTER_ROW_SCREENS（七个：献祭名单页 #586、
 *      导出菜单 #593、批量处刑列表 #593 的 [121] 查证、换号页、目标选择页的
 *      两屏、出售选人页）。覆盖不到的面（角色行由别的模块打、动态编号不是
 *      角色 ID 一类）在 #593 的完成评论里列明；
 *   3. 行为——构造一个真后代，它在名册页与批量处刑页都能被选中，同屏的
 *      固定按钮照常可用。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const REPO_DIR = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_DIR, 'ere');
const YML_DIR = path.join(REPO_DIR, 'yml');

// —— 静态扫描 ——

/** 递归收集 ere/ 下的全部 .js（扫描面：游戏源码，不含 tools/ 与 test/） */
function ere_sources(dir = ERE_DIR, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      ere_sources(full, out);
    } else if (name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * 把字符串字面量与注释抹成等长空白，只留代码骨架。长度与**换行**都保持一致
 * （字符串/注释里的换行照原样保留），行号因此仍是原文件的；注释里的示例
 * （page-tailor.js 文件头有一条 `printButton(…, n)`）不会被当成真调用。
 * @param {string} text 源码
 * @returns {string}
 */
function code_skeleton(text) {
  const blank = (c) => (c === '\n' ? '\n' : ' ');
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === "'" || c === '"' || c === '`') {
      out += ' ';
      i += 1;
      while (i < text.length) {
        if (text[i] === '\\') {
          out += ` ${blank(text[i + 1])}`;
          i += 2;
        } else if (text[i] === c) {
          out += ' ';
          i += 1;
          break;
        } else {
          out += blank(text[i]);
          i += 1;
        }
      }
    } else if (c === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') {
        out += ' ';
        i += 1;
      }
    } else if (c === '/' && text[i + 1] === '*') {
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) {
        out += blank(text[i]);
        i += 1;
      }
      out += '  ';
      i += 2;
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

/** 与 `open` 处的括号配对的收尾符下标（骨架里没有字符串与注释，直接数括号） */
function match_bracket(skeleton, open) {
  const close = { '(': ')', '[': ']', '{': '}' }[skeleton[open]];
  let depth = 0;
  for (let i = open; i < skeleton.length; i += 1) {
    if (skeleton[i] === skeleton[open]) depth += 1;
    else if (skeleton[i] === close) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return skeleton.length;
}

/** 按顶层逗号切分实参表 */
function split_args(body) {
  const args = [];
  let depth = 0;
  let current = '';
  for (const c of body) {
    if (c === '(' || c === '[' || c === '{') depth += 1;
    else if (c === ')' || c === ']' || c === '}') depth -= 1;
    if (c === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
      continue;
    }
    current += c;
  }
  if (current.trim() !== '') args.push(current.trim());
  return args;
}

/** 纯数字字面量（含 `_` 分隔符）：只有这种快捷键算「固定编号」 */
const FIXED_NUMBER = /^\d[\d_]*$/;

/**
 * 一段骨架里出现的全部按钮快捷键表达式（**两种写法都收**）：
 *   - `printButton(<正文>, <快捷键>[, <config>])` 的第 2 个实参
 *   - `printMultiColumns` / `printInColRows` 按钮格里的 `accelerator: <快捷键>`
 * @param {string} skeleton 代码骨架（见 code_skeleton）
 * @returns {{expr: string, at: number}[]} 表达式与其在骨架里的下标
 */
function button_expressions(skeleton) {
  const found = [];
  const print_button = /(?<![\w$])printButton\s*\(/g;
  let m;
  while ((m = print_button.exec(skeleton)) !== null) {
    const open = m.index + m[0].length - 1;
    const args = split_args(
      skeleton.slice(open + 1, match_bracket(skeleton, open)),
    );
    if (args.length >= 2) found.push({ expr: args[1], at: m.index });
  }
  const accelerator = /accelerator\s*:\s*([^,}\n]+)/g;
  while ((m = accelerator.exec(skeleton)) !== null) {
    found.push({ expr: m[1], at: m.index });
  }
  return found;
}

/**
 * 扫一段源码里的按钮快捷键，只收纯数字的固定编号（全局不变量用）。
 * @param {string} text 源码
 * @returns {{value: number, line: number}[]}
 */
function fixed_button_numbers(text) {
  const skeleton = code_skeleton(text);
  const line_of = (index) => skeleton.slice(0, index).split('\n').length;
  const found = [];
  for (const { expr, at } of button_expressions(skeleton)) {
    const value = expr.trim();
    if (FIXED_NUMBER.test(value)) {
      found.push({ value: Number(value.replace(/_/g, '')), line: line_of(at) });
    }
  }
  return found;
}

// —— 同屏固定编号扫描（#593）——
//
// 「预设 ID × 同屏固定按钮」一类：角色行以**角色 ID** 作快捷键，预设 ID 又
// 在 FIRST_CHILD_ID 之下，全局那两条静态守卫都覆盖不到。核对按源码结构取数：
//   屏幕 = 一个函数（角色行的打印点与被试的固定编号在同一个函数里）；
//   轮   = 两次 `era.input` 之间的一段——引擎只接受**本轮**打印过的按钮快捷键
//          （#130，夹具的 input_rules 逐字镜像），所以「同屏」就是同一轮，跨轮
//          打印的固定编号不吃这个函数里的角色行。等待类调用（waitAnyKey /
//          printAndWait）是软边界，理由见 body_rounds；
//   角色行轮 = 这一轮里出现了动态快捷键（解析不出数值的表达式，如 `cid`），
//          或调用了本文件里会打角色行的函数（如 page-chara-info.js 的
//          print_chara_row、event-execution-batch.js 的 print_roster）。
// 取数不认特定写法：字面量、模块级常量、常量数组下标（`1000 + index`）与
// `accelerator:` 字段都算，页面新增一枚固定按钮不必改核对代码就会被发现。

/** 本地函数调用（过滤到本文件的函数名，避免把 `if (`/`String(` 一类算进来） */
const LOCAL_CALL = /(?<![\w$.])([A-Za-z_$][\w$]*)\s*\(/g;

function local_calls(skeleton, names) {
  const found = new Set();
  LOCAL_CALL.lastIndex = 0;
  let m;
  while ((m = LOCAL_CALL.exec(skeleton)) !== null) {
    if (names.has(m[1])) found.add(m[1]);
  }
  return found;
}

/** `function NAME(…) {…}` 的边界：把「同屏」圈到一个函数 */
function function_defs(skeleton) {
  const defs = [];
  const head = /(?<![\w$])function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let m;
  while ((m = head.exec(skeleton)) !== null) {
    const open_paren = m.index + m[0].length - 1;
    const open_brace = skeleton.indexOf(
      '{',
      match_bracket(skeleton, open_paren) + 1,
    );
    if (open_brace < 0) continue;
    const close_brace = match_bracket(skeleton, open_brace);
    defs.push({
      name: m[1],
      open: open_brace,
      close: close_brace,
      text: skeleton.slice(open_brace, close_brace + 1),
    });
  }
  return defs;
}

/** 模块级数值常量：`const NAME = 123;`（如 LIST_RETURN、EXPORT_CANCEL） */
function numeric_constants(skeleton) {
  const map = new Map();
  const re = /^const ([A-Za-z_$][\w$]*)\s*=\s*(\d[\d_]*);$/gm;
  let m;
  while ((m = re.exec(skeleton)) !== null) {
    map.set(m[1], Number(m[2].replace(/_/g, '')));
  }
  return map;
}

/**
 * 按顶层逗号切分**原文**（跳过字符串、模板串与注释）。数数组元素必须用原文：
 * 骨架把元素抹成空白后，末尾的空元素与「结尾逗号」长得一样（`['甲','乙']` 与
 * `['甲','乙',]` 的骨架同形）。
 * @param {string} text
 * @returns {string[]} 顶层分段；结尾空段（结尾逗号或空数组）已去掉
 */
function split_top_level(text) {
  const parts = [];
  let current = '';
  let depth = 0;
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === "'" || c === '"' || c === '`') {
      current += c;
      i += 1;
      while (i < text.length) {
        if (text[i] === '\\') {
          current += text[i] + (text[i + 1] ?? '');
          i += 2;
        } else if (text[i] === c) {
          current += c;
          i += 1;
          break;
        } else {
          current += text[i];
          i += 1;
        }
      }
    } else if (c === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i += 1;
    } else if (c === '/' && text[i + 1] === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/'))
        i += 1;
      i += 2;
    } else if (c === ',') {
      if (depth === 0) {
        parts.push(current);
        current = '';
      } else {
        current += c;
      }
      i += 1;
    } else {
      if (c === '(' || c === '[' || c === '{') depth += 1;
      else if (c === ')' || c === ']' || c === '}') depth -= 1;
      current += c;
      i += 1;
    }
  }
  parts.push(current);
  if (parts[parts.length - 1].trim() === '') parts.pop();
  return parts;
}

/** 模块级数组常量：`const NAME = [ … ];` → 元素个数（决定下标变量的取值个数） */
function array_lengths(skeleton, file_text) {
  const map = new Map();
  const re = /^const ([A-Za-z_$][\w$]*)\s*=\s*\[/gm;
  let m;
  while ((m = re.exec(skeleton)) !== null) {
    const open = re.lastIndex - 1;
    const close = match_bracket(skeleton, open);
    map.set(m[1], split_top_level(file_text.slice(open + 1, close)).length);
  }
  return map;
}

/** 一个文件的扫描上下文：骨架、常量表与函数表，解析一次复用 */
function scan_context(file_text) {
  const skeleton = code_skeleton(file_text);
  return {
    skeleton,
    constants: numeric_constants(skeleton),
    arrays: array_lengths(skeleton, file_text),
    functions: function_defs(skeleton),
  };
}

/**
 * 解析一个快捷键表达式：固定编号 → 数值数组（`1000 + index` 按循环下标展开
 * 成 1000..1000+n-1）；解析不出 → null，那就是角色 ID 一类**动态编号**。
 * @param {string} expr 表达式（骨架里的一段）
 * @param {object} ctx scan_context 的结果
 * @param {string} scope 找下标变量的范围（本轮的源码）
 * @returns {number[]|null}
 */
function fixed_values_of(expr, ctx, scope) {
  const value = expr.trim();
  const shifted = /^(\d[\d_]*)\s*\+\s*([A-Za-z_$][\w$]*)$/.exec(value);
  if (shifted) {
    // 下标名来自源码里的合法标识符（`[\w$]`），拼进正则没有注入面
    const re = new RegExp(
      String.raw`\bfor\s*\(\s*const\s*\[\s*${shifted[2]}\s*[\s\S]*?\]\s+of\s+([A-Za-z_$][\w$]*)\s*\.\s*entries\s*\(\s*\)\s*\)`,
    );
    const loop = re.exec(scope);
    const size = loop ? ctx.arrays.get(loop[1]) : undefined;
    if (size === undefined) return null;
    const base = Number(shifted[1].replace(/_/g, ''));
    return Array.from({ length: size }, (_, index) => base + index);
  }
  if (FIXED_NUMBER.test(value)) return [Number(value.replace(/_/g, ''))];
  return ctx.constants.has(value) ? [ctx.constants.get(value)] : null;
}

/**
 * 把函数按输入边界切成「轮」；嵌套的 function 定义整段抹空（它的输入不是
 * 本函数的轮界）。边界分两档：
 *   - `era.input` 是**硬边界**——玩家做出选择后必然重画，两段不是同屏；
 *   - `era.waitAnyKey` / `era.printAndWait` 是**软边界**——等待可能只在某些
 *     分支上执行（如批量处刑里「收藏目标被选中」那条 `continue restart`），
 *     名单与页脚键仍属同一屏，故两侧的段不切。
 * 另有一处回边：尾段（最后一次 `era.input` 之后）在 `for(;;)` 屏里会先跑到
 * 循环头，与**循环头所在的那一轮**同属一个输入白名单（`era.clear` 只删行、
 * 不清白名单，夹具 input_rules 的注释逐字镜像）——合并由 screen_offenders 做。
 */
function body_rounds(def, ctx) {
  let text = ctx.skeleton.slice(def.open, def.close + 1);
  for (const other of ctx.functions) {
    if (other.open <= def.open || other.close >= def.close) continue;
    const from = other.open - def.open;
    const to = other.close + 1 - def.open;
    text = text.slice(0, from) + ' '.repeat(to - from) + text.slice(to);
  }
  const groups = [];
  let from = 0;
  // 只切 `era.input`：等待类调用是软边界（理由见上面的 doc）
  const edge = /(?<![\w$.])era\s*\.\s*input\s*\(/g;
  let m;
  while ((m = edge.exec(text)) !== null) {
    groups.push({ text: text.slice(from, m.index), base: def.open + from });
    from = m.index;
  }
  groups.push({ text: text.slice(from), base: def.open + from });
  return groups;
}

/** 循环头（`for (;;)` / `while (true)`）：尾段的回边落在哪一轮由它决定 */
const LOOP_HEAD = /(?<![\w$])(?:for\s*\(\s*;\s*;\s*\)|while\s*\(\s*true\s*\))/g;

/**
 * 循环头落在第几轮。尾段并进的是**它**而不是第 0 轮——`sacrifice_flow` 的
 * 第 0 轮是退出口（在循环之前），名单轮的 `for(;;)` 头落在第 1 轮，无条件并进
 * 第 0 轮会把尾段的按钮配错屏（漏报）。函数里没有循环（没有回边）时返回 -1。
 * @param {object} def 函数定义
 * @param {object} ctx 扫描上下文
 * @param {{text: string, base: number}[]} rounds 轮（body_rounds 的结果）
 */
function loop_head_round(def, ctx, rounds) {
  let last = null;
  let m;
  LOOP_HEAD.lastIndex = 0;
  const body = ctx.skeleton.slice(def.open, def.close + 1);
  while ((m = LOOP_HEAD.exec(body)) !== null) last = m;
  if (!last) return -1;
  const at = def.open + last.index;
  return rounds.findIndex(
    (round) => at >= round.base && at < round.base + round.text.length,
  );
}

/**
 * 直接打角色行的本地函数：自己就写出动态快捷键（page-chara-info.js 的
 * print_chara_row、event-execution-batch.js 的 print_roster、换号页的
 * print_swap_row）。**只认一层**——页面函数经两层以上转手才打到角色行的，
 * 不在这里认（那类屏幕要单独登记，见 CHARACTER_ROW_SCREENS 的注释）。
 */
function row_printers(ctx) {
  const printers = new Set();
  for (const def of ctx.functions) {
    const dynamic = button_expressions(def.text).some(
      ({ expr }) => fixed_values_of(expr, ctx, def.text) === null,
    );
    if (dynamic) printers.add(def.name);
  }
  return printers;
}

/**
 * 一个登记屏幕的核对结果：同屏（同一轮）里与预设 ID 撞号的固定编号，以及
 * 命中几轮角色行（0 轮 = 登记项失效，核对必须当场红）。
 * @param {{file: string, fn: string}} screen 登记项
 * @param {string} file_text 该文件的源码（探针用例喂改写过的副本）
 */
function screen_offenders(screen, file_text, presets) {
  const ctx = scan_context(file_text);
  const def = ctx.functions.find((fn) => fn.name === screen.fn);
  assert.ok(
    def,
    `${screen.file} 必须定义 ${screen.fn}（核对的登记项；函数改名时同步更新 CHARACTER_ROW_SCREENS）`,
  );
  const printers = row_printers(ctx);
  const line_of = (index) => ctx.skeleton.slice(0, index).split('\n').length;
  const raw = body_rounds(def, ctx);
  const rounds = raw.map((round) => {
    const fixed = [];
    let rows = false;
    for (const { expr, at } of button_expressions(round.text)) {
      const values = fixed_values_of(expr, ctx, round.text);
      if (values === null) {
        rows = true;
        continue;
      }
      for (const value of values) {
        fixed.push({ value, line: line_of(round.base + at) });
      }
    }
    if (!rows) {
      rows = local_calls(round.text, printers).size > 0;
    }
    return { fixed, rows };
  });
  // 尾段并进**循环头所在的那一轮**（回边）：`for(;;)` 屏在尾段打的按钮会留到
  // 下一轮（era.clear 不清输入白名单），只按线性位置切轮会漏掉这一种。不并进
  // 第 0 轮——那第 0 轮可能是循环之前的退出口（sacrifice_flow 就是这样），
  // 并错了屏等于换一种漏报。没有循环（没有回边）时不合并。
  if (rounds.length > 1) {
    const tail = rounds[rounds.length - 1];
    const head = loop_head_round(def, ctx, raw);
    if (head >= 0 && head !== rounds.length - 1) {
      rounds[head] = {
        fixed: [...rounds[head].fixed, ...tail.fixed],
        rows: rounds[head].rows || tail.rows,
      };
      rounds.pop();
    }
  }
  const offenders = [];
  let row_rounds = 0;
  for (const { fixed, rows } of rounds) {
    if (!rows) continue;
    row_rounds += 1;
    for (const { value, line } of fixed) {
      if (presets.has(value)) {
        offenders.push(
          `${screen.file}:${line} 的 [${value}]（${screen.fn} 的同一轮里与角色行同屏——${screen.why}）`,
        );
      }
    }
  }
  assert.ok(
    row_rounds > 0,
    `${screen.file} 的 ${screen.fn} 必须至少有一轮打角色行（否则本核对静默失效：` +
      '函数改名、或角色行不再以角色 ID 作快捷键时，登记项要跟着改）',
  );
  return { offenders, row_rounds };
}

/**
 * 打角色行的屏幕（登记项）。新增这类页面时在这里加一行——核对只保证
 * 「登记的屏幕里，同一轮的固定编号不与任何预设 ID 撞号」，不登记的页面
 * 不在扫描面内。判定能不能登记：角色行与固定编号都在**这一个函数**里
 * （行可以由本文件的直接打行函数打，如 show_list_trainable），且同屏没有
 * 「有意同号」的固定按钮（名册的 [0] 魔王行表头就是有意同号，要配套允许项
 * 才能登记）。跨模块的（固定编号在调用方、行在被调方）不在本表能覆盖的
 * 范围里，见 #593 完成评论的边界一节。
 */
const CHARACTER_ROW_SCREENS = [
  {
    file: 'ere/page/page-chara-info-show.js',
    fn: 'sacrifice_flow',
    why: '献祭名单轮：角色行以角色 ID 作快捷键（#586 的 [100] 返回 × 预设 100）',
  },
  {
    file: 'ere/system/cross-save-sharing.js',
    fn: 'export_menu',
    why: '跨存档导出菜单：候选行以角色 ID 作快捷键（[100] 取消 × 预设 100，#593）',
  },
  {
    file: 'ere/event/event-execution-batch.js',
    fn: 'batch_execution',
    why: '批量处刑列表：[121] 选择处刑方式与角色行同屏（#593 的 [121] 查证）',
  },
  {
    file: 'ere/page/page-chara-number-swap.js',
    fn: 'chara_number_swap',
    why: '换号页两屏：`accelerator:` 写法的角色行（#593 纳入核对）',
  },
  {
    file: 'ere/page/page-select-target.js',
    fn: 'select_target',
    why: '调教目标选择页：角色行（show_list_trainable）与 [999]-[1002] 同屏',
  },
  {
    file: 'ere/page/page-select-target.js',
    fn: 'select_assi',
    why: '助手选择页：同 select_target（show_list_assistable 的角色行）',
  },
  {
    file: 'ere/system/stronghold/sale.js',
    fn: 'chara_sale',
    why: '出售选人页：角色行与 [999] 返回同屏（该屏 input 用 useRule: false，撞号面相同）',
  },
];

/** chara-pregnancy.js 里声明的 FIRST_CHILD_ID（值即源码字面量，不经运行时） */
function declared_first_child_id() {
  const text = fs.readFileSync(
    path.join(ERE_DIR, 'chara', 'chara-pregnancy.js'),
    'utf8',
  );
  const m = /^const FIRST_CHILD_ID = (\d+);$/m.exec(text);
  assert.ok(m, 'chara-pregnancy.js 必须声明 FIRST_CHILD_ID 常量');
  return Number(m[1]);
}

/** yml/Chara*.yml 的编号集（升序） */
function preset_ids() {
  return fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara\d+\.yml$/.test(name))
    .map((name) => Number(/^Chara(\d+)\.yml$/.exec(name)[1]))
    .sort((a, b) => a - b);
}

test('静态：全部固定按钮编号都小于 FIRST_CHILD_ID（撞号的防线，#560）', () => {
  const first_child_id = declared_first_child_id();
  const offenders = [];
  let max = 0;
  let sites = 0;
  for (const file of ere_sources()) {
    const relative = path.relative(REPO_DIR, file);
    for (const { value, line } of fixed_button_numbers(
      fs.readFileSync(file, 'utf8'),
    )) {
      sites += 1;
      if (value > max) max = value;
      if (value >= first_child_id) {
        offenders.push(`${relative}:${line} 的固定编号 [${value}]`);
      }
    }
  }
  assert.ok(sites > 50, `扫描面异常：只找到 ${sites} 个固定编号按钮`);
  assert.deepEqual(
    offenders,
    [],
    `固定按钮编号必须小于 FIRST_CHILD_ID = ${first_child_id}（后代 ID 从它起，` +
      '同屏撞号后点角色会触发功能按钮）：\n' +
      offenders.join('\n'),
  );
  assert.ok(
    max < first_child_id,
    `固定编号上限 ${max} 不得达到 FIRST_CHILD_ID = ${first_child_id}`,
  );
});

test('静态：角色预设 ID（yml/Chara*.yml）都小于 FIRST_CHILD_ID', () => {
  const first_child_id = declared_first_child_id();
  const presets = preset_ids();
  assert.ok(presets.length > 30, `预设表数量异常：${presets.length}`);
  assert.ok(
    presets[presets.length - 1] < first_child_id,
    `预设 ID 上限 ${presets[presets.length - 1]}（Chara${presets[presets.length - 1]}.yml）` +
      ` 不得达到 FIRST_CHILD_ID = ${first_child_id}`,
  );
});

test('静态：登记屏幕的同屏固定编号不与预设 ID 撞号（#593 重建，替代只认特定写法的旧核对）', () => {
  // 「预设 ID × 同屏固定按钮」这一类：预设 ID 在 FIRST_CHILD_ID 之下，上面两条
  // 静态守卫都覆盖不到。#586 的旧核对只解析 `LIST_RETURN` 与条件键区间两种
  // 写法——验收在名单轮新插一枚编号 7（预设 ID）的固定按钮时全绿；新核对按
  // 「同一轮里打了哪些按钮」取数，两种写法以外的新按钮同样会被发现（探针见
  // 下一条用例）。改回 [100] 或将来新增落在这些编号上的预设都会红。
  const presets = new Set(preset_ids());
  const offenders = [];
  for (const screen of CHARACTER_ROW_SCREENS) {
    const file_text = fs.readFileSync(path.join(REPO_DIR, screen.file), 'utf8');
    offenders.push(...screen_offenders(screen, file_text, presets).offenders);
  }
  assert.deepEqual(
    offenders,
    [],
    '同一轮里与角色行同屏的固定编号不得等于预设 ID（这些编号的角色行会被同屏按钮吃掉）：\n' +
      offenders.join('\n'),
  );
});

test('静态探针：名单轮新插一枚编号 7 的按钮会被核对发现（#593 的验收抽样）', () => {
  // 核对的鉴别力自测：在献祭名单轮的返回按钮旁插一枚 `era.printButton('探针', 7)`
  // （7 是预设 ID，Chara7.yml 在库），改后的源码必须被同一套扫描判出撞号——
  // 这正是 #586 验收抽样漏网的那一手。扫描逻辑一旦退化成只认特定写法，本用例红。
  const screen = CHARACTER_ROW_SCREENS[0];
  const source = fs.readFileSync(path.join(REPO_DIR, screen.file), 'utf8');
  const probe_line = "    era.printButton('探针', 7);";
  const probe = source.replace(
    "    era.printButton('返回', LIST_RETURN);",
    `    era.printButton('返回', LIST_RETURN);\n${probe_line}`,
  );
  assert.notEqual(
    probe,
    source,
    '探针的锚点必须与源码对上（按钮写法变了就同步改）',
  );
  const { offenders } = screen_offenders(screen, probe, new Set(preset_ids()));
  assert.equal(
    offenders.length,
    1,
    `探针按钮必须恰好判出一条撞号（实际 ${offenders.length}）`,
  );
  // 行号也要指对（骨架的换行保留是这条的前提：块注释里的换行被抹掉时，
  // 报出的行号会整片偏小——探针插在名单轮里，报出的必须是那一行的行号）
  const expected_line = probe
    .slice(0, probe.indexOf(probe_line))
    .split('\n').length;
  assert.ok(
    offenders[0].includes(`:${expected_line} 的 [7]`),
    `判出的必须是探针那一枚、行号要对上（实报：${offenders[0]}）`,
  );
});

test('静态自测：扫描器的四种取值形态与硬/软边界', () => {
  // 核对取数的形态自测（#593 探针）：字面量、模块级常量、常量数组下标
  // （`2000 + index` 展开）都要能解析成固定编号，`cid` 一类变量要判成动态；
  // 硬边界（era.input）切开两轮，软边界（waitAnyKey）不切。
  const source = [
    "const LIST = ['甲', '乙', '丙'];",
    'const TAILED = [',
    "  '丁',",
    "  '戊',", // prettier 的 trailingComma 会写成这样——元素个数不得多算一个
    '];',
    'const RETURN_KEY = 999;',
    'async function probe(cid) {',
    '  for (const [index] of LIST.entries()) {',
    '    era.printButton(LIST[index], 2000 + index);',
    '  }',
    '  for (const [slot] of TAILED.entries()) {',
    '    era.printButton(TAILED[slot], 4000 + slot);',
    '  }',
    '  era.printButton(cid, 777);',
    '  era.printButton(RETURN_KEY, 1);',
    '  await era.waitAnyKey();',
    "  era.printButton('软边界之后', 2);",
    '  await era.input();',
    "  era.printButton('硬边界之后', 3);",
    '}',
  ].join('\n');
  const ctx = scan_context(source);
  const values = (expr, scope) => fixed_values_of(expr, ctx, scope);
  assert.deepEqual(
    values('2000 + index', ctx.skeleton),
    [2000, 2001, 2002],
    '常量数组下标的 `基数 + 下标` 要展开成逐个编号',
  );
  assert.deepEqual(
    values('4000 + slot', ctx.skeleton),
    [4000, 4001],
    '带结尾逗号的数组不得多算一个元素',
  );
  assert.deepEqual(values('RETURN_KEY', ctx.skeleton), [999], '模块级常量');
  assert.deepEqual(values('12', ctx.skeleton), [12], '字面量');
  assert.equal(values('cid', ctx.skeleton), null, '变量是动态编号');
  assert.equal(
    values('3000 + unknown_index', ctx.skeleton),
    null,
    '下标变量不在常量数组循环里时不得当成固定编号',
  );

  const def = ctx.functions.find((fn) => fn.name === 'probe');
  const rounds = body_rounds(def, ctx);
  assert.equal(rounds.length, 2, '硬边界（era.input）切出两轮');
  const exprs_of = (round) =>
    button_expressions(round.text).map(({ expr }) => expr.trim());
  assert.deepEqual(
    exprs_of(rounds[0]),
    ['2000 + index', '4000 + slot', '777', '1', '2'],
    '软边界（waitAnyKey）不切轮：它两侧的按钮仍在同一轮',
  );
  assert.deepEqual(
    exprs_of(rounds[1]),
    ['3'],
    '硬边界之后的按钮落在下一轮（不与前面的角色行同屏）',
  );
});

test('静态自测：for(;;) 屏的尾段按钮与下一轮同屏（era.clear 不清输入白名单）', () => {
  // 验收/审查都点过的一种漏网：`for(;;)` 屏在尾段（最后一次 era.input 之后、
  // 下一次循环之前）打的按钮，引擎侧与下一轮的角色行同属一个输入白名单，
  // 只按线性位置切轮会把它当成另一屏。核对必须当场发现尾段的预设 ID 编号。
  const source = [
    'async function probe() {',
    '  for (;;) {',
    '    for (const cid of era.getAddedCharacters()) {',
    '      era.printButton(`行${cid}`, cid);',
    '    }',
    "    era.printButton('决定', 998);",
    '    await era.input();',
    '    await era.clear(2);',
    "    era.printButton('尾段', 7);",
    '  }',
    '}',
  ].join('\n');
  const { offenders, row_rounds } = screen_offenders(
    { file: '探针来源', fn: 'probe', why: '自测' },
    source,
    new Set([7]),
  );
  assert.equal(row_rounds, 1, '首段与尾段并成一轮');
  assert.equal(
    offenders.length,
    1,
    `尾段的 [7] 必须被发现（实报：${offenders.join('；')}）`,
  );
  assert.ok(
    offenders[0].includes(':9 的 [7]'),
    `判出的必须是尾段那一枚、行号要对上（实报：${offenders[0]}）`,
  );
});

test('静态自测：尾段并进循环头那一轮，不退出口（sacrifice_flow 的形状）', () => {
  // 献祭名单页的形状：第 0 轮是**循环之前**的退出口（打 [10]/[100]），名单轮的
  // `for(;;)` 头落在第 1 轮。尾段必须并进第 1 轮——并进第 0 轮等于把尾段的按钮
  // 配到退出口那一屏上，名单轮的角色行看不到它（漏报）。本用例在无条件并进
  // 第 0 轮的实现下必定红。
  const source = [
    'async function probe() {',
    "  era.printButton('退出口', 150);",
    '  const choice = await era.input();',
    '  for (;;) {',
    '    for (const cid of era.getAddedCharacters()) {',
    '      era.printButton(`行${cid}`, cid);',
    '    }',
    "    era.printButton('返回', 999);",
    '    await era.input();',
    '    await era.clear(2);',
    "    era.printButton('尾段', 7);",
    '  }',
    '}',
  ].join('\n');
  const { offenders, row_rounds } = screen_offenders(
    { file: '探针来源', fn: 'probe', why: '自测' },
    source,
    new Set([7, 150]),
  );
  assert.equal(row_rounds, 1, '只有名单轮算角色行轮（循环之前的退出口不算）');
  assert.equal(
    offenders.length,
    1,
    `尾段的 [7] 必须并进循环头那一轮（实报：${offenders.join('；')}）`,
  );
  assert.ok(
    offenders[0].includes(':11 的 [7]'),
    `判出的必须是尾段那一枚、行号要对上（实报：${offenders[0]}）`,
  );
});

// —— 行为 ——

/**
 * 世界：魔王 + 温妮（31）+ 一个真后代。后代走 gb_add_slave，与
 * chara-pregnancy.test.js 的构造方式一致——EX_TALENT:2 落盘，ID 由
 * FIRST_CHILD_ID 段分配。
 *
 * `template` 是来源预设号，决定后代落在哪个 100 位区间：断言「与固定按钮
 * 不撞号」的用例要挑**旧常量下正好撞号**的那一档（模板 3 → 旧 ID 1200 撞
 * 名册排序表头 [1200]；模板 11 → 旧 ID 2000 撞批量处刑 [2000] 上一页），
 * 否则把 FIRST_CHILD_ID 改回 1000 这些用例照样绿，守不住「撞号」这件事。
 * @param {number} template 来源预设号（须在 1-16 内，且本函数会 seed 它）
 */
async function seed_world_with_child(template = 1) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(template, {
    id: template,
    name: `后代模板${template}`,
    callname: `后代模板${template}`,
  });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('talent:31:314', 5); // 种族（后代继承用）
  fixture.store.set('cflag:31:9', 4); // 等级
  const child = await fixture
    .load_module('chara/chara-pregnancy')
    .gb_add_slave(template, -4, () => 0);
  return { fixture, child };
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

function accelerators(fixture) {
  return buttons(fixture).map((button) => button.accelerator);
}

test('后代不在固定按钮区间内：FIRST_CHILD_ID 起分配，与同屏编号不撞', async () => {
  const { fixture, child } = await seed_world_with_child();

  assert.equal(child, declared_first_child_id(), '模板 1 的后代落在区间起点');
  assert.ok(
    fixture.era.getAddedCharacters().includes(child),
    '后代进入已加入角色列表',
  );
  assert.equal(
    fixture.store.get(`ex_talent:${child}:2`),
    1,
    'EX_TALENT:2 后代',
  );
});

test('名册页：后代行是可点的按钮，排序表头/翻页/返回照常可用（#560）', async () => {
  // 模板 3：旧常量（1000）下这个后代的 ID 是 1200，正撞名册排序表头
  // [1200]——改回旧常量时本用例必须红
  const { fixture, child } = await seed_world_with_child(3);
  assert.equal(child, declared_first_child_id() + 2 * 100, '模板 3 的区间');
  const { chara_info } = fixture.load_module('page/page-chara-info');
  // 后代行 → 个别信息页（[500] 前一人）→ 返回，再 [999] 退出名册
  fixture.set_inputs(child, 500, 100, 999);

  const result = await chara_info();

  assert.equal(result, 0);
  assert.ok(
    accelerators(fixture).includes(child),
    `后代 ${child} 的行必须是按钮（快捷键 = 后代 ID）`,
  );
  assert.ok(
    accelerators(fixture).includes(500),
    '输入后代 ID 后进的是该角色的个别信息页——[500] 前一人只在那一页渲染',
  );
  for (const fixed of [1200, 1300, 1400, 1500, 1600, 1700, 997, 998, 999]) {
    assert.ok(
      accelerators(fixture).includes(fixed),
      `固定按钮 [${fixed}] 仍须渲染`,
    );
  }
});

test('批量处刑页：后代能被选中切标签，[121]/[100]/[1999] 照常可用（#560）', async () => {
  // 模板 11：旧常量（1000）下这个后代的 ID 是 2000，正撞批量处刑的
  // [2000] 上一页——改回旧常量时「选中切标签」会落到翻页分支、本用例必红
  const { fixture, child } = await seed_world_with_child(11);
  assert.equal(child, declared_first_child_id() + 10 * 100, '模板 11 的区间');
  const { batch_execution } = fixture.load_module(
    'event/event-execution-batch',
  );
  // 后代行 → 切处刑标签 → [121] 方法界面 → [100] 停止 → [1999] 結束处刑
  fixture.set_inputs(child, 121, 100, 1999);

  await batch_execution(() => 0);

  assert.equal(
    fixture.store.get(`cflag:${child}:777`),
    1,
    '后代行被选中后切到处刑标签（角色行与固定按钮不撞号）',
  );
  for (const fixed of [1999, 2000, 2001]) {
    assert.ok(
      accelerators(fixture).includes(fixed),
      `固定按钮 [${fixed}] 仍须渲染`,
    );
  }
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('请选出处刑对象(可复选)')),
    '批量处刑列表照常渲染',
  );
});
