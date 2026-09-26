// 门面属性检查器（issue #493）：`chara(...).<域>.<属性>` 的属性必须在那个域
// 的门面类上，否则静态判红。
//
// 守什么：口上与其他游戏代码按门面读角色变量时，属性名写错、或域写错，JS 静默
// 返回 undefined——不报错，判定随之失效。#493 的 13 处就是这样：`train.穿孔装着`
// 使六段「初次穿环」演出恒不触发，`kojo.状态` 使 `undefined !== 9` 恒真，
// `train.耻情` 让 `NaN > PALAMLV:2` 恒假；复核又发现第 14 处
// （`kojo.初吻对象`——CFLAG:16 属 train 域，`undefined >= 0` 恒假）。既有防线
// 一条都拦不住：
//   - tools/domain-check.mjs 只查裸跨域写（看的是 era.set/get 的寻址串）；
//   - ESLint 看不出「访问了不存在的属性」；
//   - 口上本来就缺用例覆盖。
//
// 判定面（属性名不在该域门面类上就红，逐处报 file:line）：
//   1. 直链 `chara(<实参>).<域>.<属性>`；
//   2. 域切片别名——同文件里 `const kojo = chara(target).kojo` 之后的 `kojo.<属性>`
//      （口上 12,000+ 处走这条，复核发现的第 14 处缺陷正落在这一面）；
//   3. 视图别名——同文件里 `const view = chara(target)` 之后的 `view.<域>.<属性>`。
// 别名的解析取保守解：该名在**同一文件**里的全部 `const/let/var` 声明都是同一种
// 别名、域唯一、且不出现在该文件的形参表里，才判；任何一处不同即视为「不可判定」，
// 只计数报出（宁可漏判，不可误报——误报会让全库测试对所有人变红）。
//
// 不判定（逐处报出位置，不红）：动态属性 `chara(x).train[expr]` / `别名[expr]`；
// 名字不唯一的别名读。`game.<域>.<成员>` 不在本检查范围内：一维门面的成员还有
// 赋值式挂载（`facade.x = …`）与普通方法，属性集不靠 getter/setter 枚举，需要
// 另一套解析。
//
// 已知边界（都朝「漏判」一侧倒，不产生误报）：
//   - 形参遮蔽只认 `function` / 带括号的箭头 / `catch` / 纯标识符列表的方法简写；
//     解构形参（`f({train})`）、`for (const kojo of …)`、无括号单参箭头
//     （`kojo => …`）识别不到——命中时该文件只是漏判，不误报。
//   - 模板串正文照扫（`${}` 里是真代码，剥不得）：串里正好写着 `别名.属性`
//     样子的文本会被判；实测 ere/ 无此写法。
//   - 属性集与域清单的解析耦合生成器与手写区的书写格式（`^ {2}` 缩进、
//     单引号键、`Object.defineProperty` / `X.prototype.Y =` 两种形态）。格式变了
//     会**整体误红**（大声失败），不会静默失守——这一条是隐性契约，改生成器
//     排版时先跑一遍本工具。
//
// 域清单从 ere/facade/chara.js 的装配体（`this.<域> = new XxxFacade(cid)`）推导，
// 属性集从 ere/facade/chara-<域>.js 的生成区（getter/setter）与手写区
// （`Object.defineProperty(<类>.prototype, '<属性>'`、`<类>.prototype.<成员> =`）
// 提取——都不手工维护。
//
// 用法：node tools/facade-property-check.mjs
//   全绿退出码 0；任何失配退出码 1（逐条报出 file:line 与整改指引）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** 引擎 SDK：不是游戏代码，整体跳过（engine-contract-check / domain-check 同款标准） */
const SDK_FILE = 'ere/era-electron.js';

/** 门面根：域切片文件在 chara-<域>.js，装配体在 chara.js */
const FACADE_DIR = 'ere/facade';
const CHARA_ROOT = 'ere/facade/chara.js';

/** chara() 视图上域段之外的合法成员 */
const VIEW_MEMBERS = new Set(['cid']);

// —— 注释剥离 ——

/**
 * 剥掉行注释、块注释与单/双引号字符串的内容（一律换成等长空白，保住行号与
 * 长度）；模板串原样保留——`${}` 里是真代码，要判。
 *
 * 为什么要剥字符串：字符串里的 `chara(x).train.某属性` 是文本不是访问，不剥
 * 就会误报（误报会让全库测试对所有人变红）。为什么不剥模板串：`${}` 里可能
 * 有真访问，剥掉即漏判；代价是模板串正文里的同类文本仍会被判，属已知边界。
 *
 * 失同步的边界（正则字面量）与兜底：正则里的引号或 `//` 会让本函数认错一段，
 * 但**单行有界**——`'`/`"` 扫到行尾即收（JS 单双引号字面量本就不跨行），
 * `//` 同样只吃当行，故误判不会漫到后文；`/*` 起头的块注释没有行界，正则里
 * 出现 `\\/*` 这类形态时才会漫延（实测 ere/ 的字符串与正则中都没有
 * `//`、`/*`，这条是给未来的兜底）。
 * @param {string} text 文件正文
 * @returns {string} 同长度、同换行结构的正文
 */
function strip_comments(text) {
  let out = '';
  let i = 0;
  const n = text.length;
  while (i < n) {
    const ch = text[i];
    if (ch === '/' && text[i + 1] === '/') {
      while (i < n && text[i] !== '\n') {
        out += ' ';
        i += 1;
      }
      continue;
    }
    if (ch === '/' && text[i + 1] === '*') {
      while (i < n && !(text[i] === '*' && text[i + 1] === '/')) {
        out += text[i] === '\n' ? '\n' : ' ';
        i += 1;
      }
      if (i < n) {
        out += '  ';
        i += 2;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      const blank = quote !== '`'; // 模板串保留内容（${} 里有真代码）
      out += ch;
      i += 1;
      while (i < n && text[i] !== '\n') {
        if (text[i] === '\\') {
          out += blank ? '  ' : text[i] + (text[i + 1] ?? '');
          i += 2;
          continue;
        }
        out += blank ? ' ' : text[i];
        if (text[i] === quote) {
          i += 1;
          break;
        }
        i += 1;
      }
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}

// —— 门面侧解析 ——

/**
 * 装配体里的域：`this.kojo = new KojoFacade(cid);`。
 * @param {string} text ere/facade/chara.js 的正文
 * @returns {string[]} 域清单（升序）
 */
function parse_domains(text) {
  const domains = [];
  const re =
    /^ {4}this\.([A-Za-z_][A-Za-z0-9_]*) = new [A-Za-z0-9_]+Facade\(cid\);/gm;
  let match;
  while ((match = re.exec(text))) {
    domains.push(match[1]);
  }
  return domains.sort();
}

/**
 * 门面类声明的成员名：生成的 `get X() {` / `set X(v) {`，手写区的
 * `Object.defineProperty(<类>.prototype, 'X', {` 与 `<类>.prototype.X = `。
 * @param {string} text 域切片文件正文
 * @returns {Set<string>} 属性名
 */
function parse_props(text) {
  const props = new Set();
  const accessor = /^ {2}(?:get|set) ([^\s([]+)\s*\(/gm;
  let match;
  while ((match = accessor.exec(text))) {
    props.add(match[1]);
  }
  const defined =
    /Object\.defineProperty\(\s*[A-Za-z0-9_$]+\.prototype\s*,\s*'([^']+)'/g;
  while ((match = defined.exec(text))) {
    props.add(match[1]);
  }
  const assigned = /^([A-Za-z0-9_$]+)\.prototype\.([^\s=(]+)\s*=/gm;
  while ((match = assigned.exec(text))) {
    props.add(match[2]);
  }
  return props;
}

/** 读一个域切片的属性集；文件缺失返回 null（装配体指向了不存在的切片） */
function load_domain_props(domain) {
  const file = path.join(REPO, FACADE_DIR, `chara-${domain}.js`);
  if (!fs.existsSync(file)) {
    return null;
  }
  return parse_props(fs.readFileSync(file, 'utf8'));
}

// —— 扫描基础设施 ——

function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(REPO, rel), {
      withFileTypes: true,
    })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(child);
      } else if (entry.name.endsWith('.js')) {
        out.push(child);
      }
    }
  };
  walk(dir);
  return out.sort();
}

const IDENT = /^[\p{L}\p{N}_$]+/u;

/** 从 '(' 起配平括号，返回匹配 ')' 的下标（找不到返回 -1） */
function match_paren(text, from) {
  let depth = 0;
  for (let i = from; i < text.length; i += 1) {
    if (text[i] === '(') {
      depth += 1;
    } else if (text[i] === ')') {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * 从某位置起读一条 `.名` 链（成员之间允许换行与空格；`[` 视为动态属性）。
 * @param {string} text 已剥注释的正文
 * @param {number} from 起点
 * @returns {{ members: string[], dynamic: boolean }}
 */
function read_chain(text, from) {
  const members = [];
  let i = from;
  for (;;) {
    let j = i;
    while (j < text.length && /\s/.test(text[j])) {
      j += 1;
    }
    if (text[j] === '.') {
      const name = IDENT.exec(text.slice(j + 1));
      if (!name) {
        return { members, dynamic: false };
      }
      members.push(name[0]);
      i = j + 1 + name[0].length;
      continue;
    }
    if (text[j] === '[') {
      return { members, dynamic: true };
    }
    return { members, dynamic: false };
  }
}

// —— 别名解析（同一文件内的保守判定）——

/**
 * 收集一个文件里的 `const/let/var` 声明，判定哪些名字是 chara 门面别名。
 * 规则：该名的全部声明都必须是同一种别名、单步域别名的域唯一、且该名不出现在
 * 形参表里；任一不满足即不判（进 ambiguous，使用时只计数报出）。
 * @param {string} text 已剥注释的正文
 * @returns {{ alias_domain: Map<string,string>, view_alias: Set<string>, ambiguous: Set<string> }}
 */
function classify_declarations(text) {
  const sites = new Map(); // name -> [{ kind, domain }]
  const decl = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g;
  let match;
  while ((match = decl.exec(text))) {
    const name = match[1];
    let i = match.index + match[0].length;
    while (i < text.length && /\s/.test(text[i])) {
      i += 1;
    }
    let kind = 'other';
    let domain = null;
    if (text.startsWith('chara(', i)) {
      const close = match_paren(text, i + 'chara'.length);
      if (close >= 0) {
        const chain = read_chain(text, close + 1);
        if (chain.members.length === 0 && !chain.dynamic) {
          kind = 'view';
        } else if (chain.members.length === 1 && !chain.dynamic) {
          kind = 'domain';
          domain = chain.members[0];
        }
      }
    }
    if (!sites.has(name)) {
      sites.set(name, []);
    }
    sites.get(name).push({ kind, domain });
  }
  // 形参名（函数、箭头、catch、方法简写）：同名的形参会遮蔽别名。方法简写
  // 只认纯标识符列表——`if (kojo.x === 0) {`、`for (const k of …) {` 与它同形，
  // 若不设这道闸，别名**使用**会被当成声明，直接把判定面挖空（实测 kojo 别名
  // 从 12,000+ 处判定掉到几百处）。
  const PARAM_LIST =
    /^\s*(?:[A-Za-z_$][\w$]*\s*(?:,\s*[A-Za-z_$][\w$]*\s*)*)?$/;
  const params = new Set();
  const param_res = [
    { re: /function\s*[A-Za-z0-9_$]*\s*\(([^)]*)\)/g, strict: false },
    { re: /\(([^()]*)\)\s*=>/g, strict: false },
    { re: /catch\s*\(([^)]*)\)/g, strict: false },
    { re: /(?:^|[\s;{}])[A-Za-z_$][\w$]*\s*\(([^()]*)\)\s*\{/g, strict: true },
  ];
  for (const { re, strict } of param_res) {
    while ((match = re.exec(text))) {
      if (strict && !PARAM_LIST.test(match[1])) {
        continue;
      }
      for (const piece of match[1].split(',')) {
        const name = IDENT.exec(piece.trim());
        if (name) {
          params.add(name[0]);
        }
      }
    }
  }
  const alias_domain = new Map();
  const view_alias = new Set();
  const ambiguous = new Set();
  for (const [name, list] of sites) {
    // 只关心与 chara 门面有关的名字：`const era = require(…)` 这类与别名无关的
    // 声明不进报告（否则「不可判定」会被全库的普通变量淹没）
    if (list.every((site) => site.kind === 'other')) {
      continue;
    }
    if (params.has(name)) {
      ambiguous.add(name);
      continue;
    }
    if (list.every((site) => site.kind === 'domain')) {
      const domains = new Set(list.map((site) => site.domain));
      if (domains.size === 1) {
        alias_domain.set(name, [...domains][0]);
      } else {
        ambiguous.add(name);
      }
      continue;
    }
    if (list.every((site) => site.kind === 'view')) {
      view_alias.add(name);
      continue;
    }
    ambiguous.add(name);
  }
  return { alias_domain, view_alias, ambiguous };
}

// —— 单文件扫描 ——

/**
 * 扫一个文件里的门面访问。
 * @param {string} rel 仓库相对路径
 * @param {string} raw 文件正文（未剥注释，用于报行号）
 * @param {{ domains: string[], props: Map<string,Set<string>>, homes: Map<string,string[]> }} ctx
 * @returns {{ checked: number, failures: object[], dynamic: string[], unjudged: string[] }}
 */
function scan_text(rel, raw, ctx) {
  const text = strip_comments(raw);
  const line_of = (index) => raw.slice(0, index).split('\n').length;
  const failures = [];
  const dynamic = [];
  const unjudged = [];
  let checked = 0;
  const { alias_domain, view_alias, ambiguous } = classify_declarations(text);

  const report = (domain, prop, index) => {
    const elsewhere = (ctx.homes.get(prop) ?? []).filter((d) => d !== domain);
    const remedy =
      elsewhere.length > 0
        ? `「${prop}」在 ${elsewhere.join(' / ')} 域存在——域写错？`
        : `${domain} 域门面没有「${prop}」——属性名拼错，或先在 tools/facade-names.js 补名（生成区）／${FACADE_DIR}/chara-${domain}.js 手写区补访问器，再改用之`;
    failures.push({ file: rel, line: line_of(index), domain, prop, remedy });
  };

  // 1) 直链 chara(…).<域>.<属性>
  const call = /(?<![\w.$])chara\(/g;
  let match;
  while ((match = call.exec(text))) {
    const close = match_paren(text, match.index + 'chara'.length);
    if (close < 0) {
      continue;
    }
    const { members, dynamic: is_dynamic } = read_chain(text, close + 1);
    if (members.length === 0) {
      if (is_dynamic) {
        dynamic.push(`${rel}:${line_of(match.index)} chara(…)[…]`);
      }
      continue;
    }
    const domain = members[0];
    if (is_dynamic) {
      dynamic.push(
        `${rel}:${line_of(match.index)} chara(…).${domain}[…] —— 动态属性名`,
      );
      continue;
    }
    if (!ctx.props.has(domain)) {
      if (VIEW_MEMBERS.has(domain)) {
        continue;
      }
      failures.push({
        file: rel,
        line: line_of(match.index),
        domain,
        prop: members[1] ?? domain,
        remedy: `chara() 视图上没有「${domain}」域（装配体 ${CHARA_ROOT}）——域段写错；现有域：${ctx.domains.join(' / ')}`,
      });
      continue;
    }
    if (members.length >= 2) {
      checked += 1;
      if (!ctx.props.get(domain).has(members[1])) {
        report(domain, members[1], match.index);
      }
    }
  }

  // 2) 域切片别名 `const k = chara(x).<域>` 之后的 `k.<属性>`
  for (const [name, domain] of alias_domain) {
    if (!ctx.props.has(domain)) {
      continue;
    }
    const use = new RegExp(`(?<![\\w.$])${name}\\b`, 'g');
    while ((match = use.exec(text))) {
      const { members, dynamic: is_dynamic } = read_chain(
        text,
        match.index + name.length,
      );
      if (members.length === 0 && !is_dynamic) {
        continue;
      }
      if (is_dynamic) {
        dynamic.push(
          `${rel}:${line_of(match.index)} ${name}[…]（${domain} 域别名）—— 动态属性名`,
        );
        continue;
      }
      checked += 1;
      if (!ctx.props.get(domain).has(members[0])) {
        report(domain, members[0], match.index);
      }
    }
  }

  // 3) 视图别名 `const v = chara(x)` 之后的 `v.<域>.<属性>`
  for (const name of view_alias) {
    const use = new RegExp(`(?<![\\w.$])${name}\\b`, 'g');
    while ((match = use.exec(text))) {
      const { members, dynamic: is_dynamic } = read_chain(
        text,
        match.index + name.length,
      );
      if (members.length === 0) {
        continue;
      }
      if (is_dynamic) {
        dynamic.push(
          `${rel}:${line_of(match.index)} ${name}[…]（chara 视图别名）—— 动态属性名`,
        );
        continue;
      }
      const domain = members[0];
      if (!ctx.props.has(domain)) {
        if (VIEW_MEMBERS.has(domain) || members.length < 2) {
          continue;
        }
        unjudged.push(
          `${rel}:${line_of(match.index)} ${name}.${domain} —— 视图别名上的域段「${domain}」不在装配体里（不判定，值得人工看一眼）`,
        );
        continue;
      }
      if (members.length < 2) {
        continue;
      }
      checked += 1;
      if (!ctx.props.get(domain).has(members[1])) {
        report(domain, members[1], match.index);
      }
    }
  }

  // 4) 名字不唯一的别名读：只计数报出（不判定）
  for (const name of ambiguous) {
    const use = new RegExp(`(?<![\\w.$])${name}\\b`, 'g');
    let count = 0;
    while ((match = use.exec(text))) {
      const { members, dynamic: is_dynamic } = read_chain(
        text,
        match.index + name.length,
      );
      if (members.length > 0 || is_dynamic) {
        count += 1;
      }
    }
    if (count > 0) {
      unjudged.push(
        `${rel} ${name}.* —— 别名不可判定（同名多域／含其它声明／与形参同名），${count} 处未判`,
      );
    }
  }

  return { checked, failures, dynamic, unjudged };
}

// —— 实测 ——

function measure() {
  const domains = parse_domains(
    fs.readFileSync(path.join(REPO, CHARA_ROOT), 'utf8'),
  );
  const props = new Map();
  const missing_files = [];
  for (const domain of domains) {
    const declared = load_domain_props(domain);
    if (declared === null) {
      missing_files.push(domain);
      props.set(domain, new Set());
      continue;
    }
    props.set(domain, declared);
  }
  const homes = new Map();
  for (const [domain, names] of props) {
    for (const name of names) {
      if (!homes.has(name)) {
        homes.set(name, []);
      }
      homes.get(name).push(domain);
    }
  }
  const ctx = { domains, props, homes };
  let checked = 0;
  const failures = [];
  const dynamic = [];
  const unjudged = [];
  for (const rel of list_js_files('ere')) {
    if (rel === SDK_FILE) {
      continue;
    }
    const result = scan_text(
      rel,
      fs.readFileSync(path.join(REPO, rel), 'utf8'),
      ctx,
    );
    checked += result.checked;
    failures.push(...result.failures);
    dynamic.push(...result.dynamic);
    unjudged.push(...result.unjudged);
  }
  return { domains, missing_files, checked, failures, dynamic, unjudged };
}

function run() {
  const { domains, missing_files, checked, failures, dynamic, unjudged } =
    measure();
  let count = failures.length;
  for (const domain of missing_files) {
    console.log(
      `✗ ${FACADE_DIR}/chara-${domain}.js 不存在——装配体 ${CHARA_ROOT} 挂了这个域`,
    );
    count += 1;
  }
  for (const item of failures) {
    console.log(
      `✗ ${item.file}:${item.line} chara(…).${item.domain}.${item.prop} —— ${item.remedy}`,
    );
  }
  if (count > 0) {
    console.log(`✗ ${count} 处门面属性失守（逐条见上）`);
    return count;
  }
  const report = [
    `✓ 门面属性：${checked} 处 chara() 门面访问的属性都落在对应域门面上（域：${domains.join(' / ')}；判定面含直链、域切片别名、视图别名）`,
  ];
  for (const site of dynamic) {
    report.push(`  ⚠ ${site}`);
  }
  for (const site of unjudged) {
    report.push(`  ⚠ ${site}`);
  }
  console.log(report.join('\n'));
  return 0;
}

process.exitCode = run() === 0 ? 0 : 1;
