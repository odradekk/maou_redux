// 门面属性检查器（issue #493）：`chara(...).<域>.<属性>` 的属性必须在那个域
// 的门面类上，否则静态判红。
//
// 守什么：口上与其他游戏代码按门面读角色变量时，属性名写错、或域写错，JS 静默
// 返回 undefined——不报错，判定随之失效。#493 的 13 处就是这样：`train.穿孔装着`
// 使六段「初次穿环」演出恒不触发，`kojo.状态` 使 `undefined !== 9` 恒真，
// `train.耻情` 让 `NaN > PALAMLV:2` 恒假。既有防线一条都拦不住：
//   - tools/domain-check.mjs 只查裸跨域写（看的是 era.set/get 的寻址串）；
//   - ESLint 看不出「访问了不存在的属性」；
//   - 口上本来就缺用例覆盖。
//
// 怎么守：门面类的成员静态可枚举——生成的 getter/setter 对，加上手写区的
// `Object.defineProperty(<类>.prototype, '<属性>', …)`。扫 ere/ 全树里的
// `chara(<实参>).<域>.<属性>`：
//   1. `<域>` 取不到门面切片 → 红（域段写错）；
//   2. `<属性>` 不在该域类上 → 红，并给整改指引——别的域有同名属性时按「域
//      写错」指路，都没有时按「拼写或先补名进门面」指路。
// 域清单从 ere/facade/chara.js 的装配体（`this.<域> = new XxxFacade(cid)`）
// 推导，不手工维护：`chara()` 返回的就是那个视图，任何非装配域的段名都是缺陷。
//
// 不判定的读法（计进报告，不红）：动态属性 `chara(x).train[expr]`——属性名在
// 静态不可知，只能被看见。`game.<域>.<成员>` 不在本检查范围内：一维门面的成员
// 还有「赋值式挂载」（`facade.with_self_kojo_event = …`）与普通方法，属性集不
// 靠 getter/setter 枚举，需要另一套解析。
//
// 用法：node tools/facade-property-check.mjs
//   全绿退出码 0；任何失配退出码 1（逐条报出 file:line 与整改指引）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** 引擎 SDK：不是游戏代码，整体跳过（trace-check / domain-check 同款标准） */
const SDK_FILE = 'ere/era-electron.js';

/** 门面根：域切片文件在 chara-<域>.js，装配体在 chara.js */
const FACADE_DIR = 'ere/facade';
const CHARA_ROOT = 'ere/facade/chara.js';

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
 * 门面类声明的成员名：生成的 `get X() {` / `set X(v) {` 与手写区的
 * `Object.defineProperty(<类>.prototype, 'X', {`。
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

/** 属性名/域名的字符集合：标识符（含中文等非 ASCII 标识符字符） */
const NAME = /^[\p{L}\p{N}_$]+/u;

/**
 * 扫一段正文里的 `chara(...)` 调用点。实参是任意表达式，按括号配对取到匹配的
 * 右括号，再看紧跟其后的两条 `.` 链。
 * @param {string} text
 * @returns {Array<{ line: number, domain: string, prop: string|null }>} prop 为
 *   null = 动态属性（`chara(x).train[...]`）
 */
function scan_chara_accesses(text) {
  const sites = [];
  const opener = /(?<![\w.$])chara\(/g;
  let match;
  while ((match = opener.exec(text))) {
    // 配对右括号：实参里可能有嵌套调用（chara(count() - 1)）
    let depth = 0;
    let i = match.index + 'chara'.length;
    for (; i < text.length; i += 1) {
      if (text[i] === '(') {
        depth += 1;
      } else if (text[i] === ')') {
        depth -= 1;
        if (depth === 0) {
          break;
        }
      }
    }
    if (depth !== 0) {
      continue;
    }
    const line = text.slice(0, match.index).split('\n').length;
    const rest = text.slice(i + 1);
    const domain = /^\.([A-Za-z_][A-Za-z0-9_]*)/.exec(rest);
    if (!domain) {
      continue;
    }
    const after = rest.slice(domain[0].length);
    if (after.startsWith('[')) {
      sites.push({ line, domain: domain[1], prop: null });
      continue;
    }
    const prop = /^\.([\p{L}\p{N}_$]+)/u.exec(after);
    if (!prop) {
      continue;
    }
    sites.push({ line, domain: domain[1], prop: prop[1] });
  }
  return sites;
}

/** 实测：失配逐处指位，动态访问只计数 */
function measure() {
  const domains = parse_domains(
    fs.readFileSync(path.join(REPO, CHARA_ROOT), 'utf8'),
  );
  const props_by_domain = new Map();
  const missing_files = [];
  for (const domain of domains) {
    const props = load_domain_props(domain);
    if (props === null) {
      missing_files.push(domain);
      props_by_domain.set(domain, new Set());
      continue;
    }
    props_by_domain.set(domain, props);
  }
  // 属性 → 拥有它的域（整改指引用：别的域有同名属性就是域写错）
  const homes = new Map();
  for (const [domain, props] of props_by_domain) {
    for (const prop of props) {
      if (!homes.has(prop)) {
        homes.set(prop, []);
      }
      homes.get(prop).push(domain);
    }
  }
  const failures = [];
  const dynamic = [];
  let checked = 0;
  for (const rel of list_js_files('ere')) {
    if (rel === SDK_FILE) {
      continue;
    }
    const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
    for (const site of scan_chara_accesses(text)) {
      if (site.prop === null) {
        dynamic.push(`${rel}:${site.line} chara(...).${site.domain}[…]`);
        continue;
      }
      const props = props_by_domain.get(site.domain);
      if (props === undefined) {
        failures.push({
          file: rel,
          line: site.line,
          domain: site.domain,
          prop: site.prop,
          remedy: `chara() 视图上没有「${site.domain}」域（装配体 ${CHARA_ROOT}）——域段写错；现有域：${domains.join(' / ')}`,
        });
        continue;
      }
      checked += 1;
      if (props.has(site.prop)) {
        continue;
      }
      const elsewhere = (homes.get(site.prop) ?? []).filter(
        (domain) => domain !== site.domain,
      );
      const remedy =
        elsewhere.length > 0
          ? `「${site.prop}」在 ${elsewhere.join(' / ')} 域存在——域写错？`
          : `${site.domain} 域门面没有「${site.prop}」——属性名拼错，或先在 tools/facade-names.js 补名（生成区）／${FACADE_DIR}/chara-${site.domain}.js 手写区补访问器，再改用之`;
      failures.push({
        file: rel,
        line: site.line,
        domain: site.domain,
        prop: site.prop,
        remedy,
      });
    }
  }
  return { domains, missing_files, checked, failures, dynamic };
}

function run() {
  const { domains, missing_files, checked, failures, dynamic } = measure();
  let failures_count = failures.length;
  for (const domain of missing_files) {
    console.log(
      `✗ ${FACADE_DIR}/chara-${domain}.js 不存在——装配体 ${CHARA_ROOT} 挂了这个域`,
    );
    failures_count += 1;
  }
  for (const item of failures) {
    console.log(
      `✗ ${item.file}:${item.line} chara(...).${item.domain}.${item.prop} —— ${item.remedy}`,
    );
  }
  if (failures_count > 0) {
    console.log(`✗ ${failures_count} 处门面属性失守（逐条见上）`);
    return failures_count;
  }
  const report = [
    `✓ 门面属性：${checked} 处 chara() 门面访问的属性都落在对应域门面上（域：${domains.join(' / ')}）`,
  ];
  for (const site of dynamic) {
    report.push(`  ⚠ ${site} —— 动态属性名，静态不可判定`);
  }
  console.log(report.join('\n'));
  return 0;
}

process.exitCode = run() === 0 ? 0 : 1;
