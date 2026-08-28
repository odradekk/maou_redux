// 引擎契约检查器（issue #91，ADR-0005 第二层）：锚点校核 + 调用点规则 +
// 待办条目表两项检查。独立于 trace-check，不并入——两者都用锚，但失配的含义
// 相反：trace-check 的锚失配是「我们的行号写错了」，本工具的锚失配是
// 「引擎变了、镜像要重核」，处置动作不同，混用会让退出码语义变糊。
//
// 三项检查：
//   A 调用点规则（无需引擎，永远跑）：按 tools/engine-contract-facts.mjs 里
//     带 rule 的事实，静态扫 ere/ 的输出 API 调用点。首日唯一一条：progress
//     格必须显式传 1..23 的 barWidth（不传 = 引擎缺省 24 = 条后数值整列
//     不渲染，#74 实机缺陷形态）。
//   B 锚点校核（需要 app.asar）：断言渲染层源码（js/app.*.js.map 的
//     sourcesContent）仍含每条事实的字面。定位器按模式匹配渲染包，不写死
//     带内容哈希的文件名（引擎升版即变）。
//   C 条目表两项检查（无需引擎）：tools/engine-contract-ledger.mjs 的条目只能
//     变短（#91 基线内嵌在本工具）、不许过期失效（witness 必须仍在夹具注释里）。
//
// 退出码与三种环境的语义（与自述一致，测试驱动工具看退出码）：
//   全绿 0；任何失配 1。**引擎缺失不是失配**——找不到 app.asar 时锚点校核
//   跳过并留警告（加强项语义，与 engine-bundle / test 侧的 skip 同一标准），
//   规则与条目表照跑照红。**锚点失配与渲染包漂移是直接判失败**，文案以「引擎变了」
//   开头并指路重读——静默 skip 会让守护在引擎升版当天无声消失。
//
// 用法：node tools/engine-contract-check.mjs [--asar <path>]
//   --asar 显式指路（测试与诊断用）：给了就不再三址回落；所指不存在按
//   「引擎缺失」处理（跳过锚点检查并警告，不静默换一个引擎来查）。

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGINE_FACTS } from './engine-contract-facts.mjs';
import { ENGINE_CONTRACT_LEDGER } from './engine-contract-ledger.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FIXTURE_FILE = 'test/helpers/era-fixture.js';
const SDK_FILE = 'ere/era-electron.js'; // 引擎 SDK，不是游戏代码，跳过

/** 渲染包源映射的模式定位器（文件名带内容哈希，不能写死） */
const RENDERER_MAP_RE = /^js\/app\.[0-9a-f]+\.js\.map$/;

/**
 * 条目表冻结基线（issue #91 首冻）：条目表条目必须逐条落在基线内——只能
 * 变短。消化现有条目 = 删条目；新增分歧确需冻结，必须显式改这份常量。
 */
const LEDGER_BASELINE = [
  'printAndWait-internal-wait',
  'setback-setoverlay-rearm',
  'input-continue-field',
  'waitanykey-input-roundtrip',
  'waitanykey-fromclear-useRule',
];

// —— asar 读取（与 test/helpers/engine-bundle.js 同款头结构：前 16 字节是
//    目录 pickle 的长度 framing，偏移 12 是头 JSON 的字节长度） ——

/** 候选位置与 test/helpers/engine-bundle.js 同款，逐条理由见那里的注释；
 *  漂移由 test/asar-candidates.test.js 判红 */
const ASAR_CANDIDATES = () =>
  [
    process.env.ERE_ENGINE_ASAR,
    path.join(REPO, 'ere-4.8.0-win-x64', 'resources', 'app.asar'),
    path.join(os.homedir(), '.era-engine', 'app.asar'),
    '/mnt/d/Code/era/ere-4.8.0-win-x64/resources/app.asar',
    'D:\\Code\\era\\ere-4.8.0-win-x64\\resources\\app.asar',
  ].filter(Boolean);

function locate_asar(explicit) {
  if (explicit) {
    return fs.existsSync(explicit) ? explicit : undefined;
  }
  // env 的 none 与 mutation-check 的 --asar none 同款语义（显式无引擎）：
  // 绝对路径回落进来之后，`env -u ERE_ENGINE_ASAR` 已造不出无引擎环境
  if (process.env.ERE_ENGINE_ASAR === 'none') {
    return undefined;
  }
  return ASAR_CANDIDATES().find((candidate) => fs.existsSync(candidate));
}

/** 展开 asar 头目录为 [相对路径, {offset, size}]（offset 相对数据段起点） */
function list_asar_files(asar_path) {
  const buf = fs.readFileSync(asar_path);
  const header_size = buf.readUInt32LE(12);
  const header = JSON.parse(buf.slice(16, 16 + header_size).toString('utf8'));
  const out = [];
  const walk = (node, prefix) => {
    for (const [name, entry] of Object.entries(node.files || {})) {
      if (entry.offset !== undefined) {
        out.push([`${prefix}${name}`, entry]);
      }
      if (entry.files) {
        walk(entry, `${prefix}${name}/`);
      }
    }
  };
  walk(header, '');
  return { buf, header_size, files: out };
}

// —— 门 A：调用点规则（静态扫 ere/，无需引擎） ——

function list_js_files(rel_dir) {
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
  walk(rel_dir);
  return out.sort();
}

/** 从 text[start]（须是 open 字符）起做配平扫描，返回区间文本（含定界符） */
function balanced(text, start, open, close) {
  let depth = 0;
  for (let i = start; i < text.length; i += 1) {
    if (text[i] === open) {
      depth += 1;
    } else if (text[i] === close) {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }
  return text.slice(start); // 源码不配平（字符串截断等）时取到尾，宁可误红
}

/** 从 `type: 'progress'` 的位置向后找包裹它的对象字面量文本 */
function enclosing_object(text, at) {
  let depth = 0;
  for (let i = at; i >= 0; i -= 1) {
    const ch = text[i];
    if (ch === '}') {
      depth += 1;
    } else if (ch === '{') {
      if (depth === 0) {
        return balanced(text, i, '{', '}');
      }
      depth -= 1;
    }
  }
  return text.slice(0, at);
}

function line_of(text, at) {
  return text.slice(0, at).split('\n').length;
}

/**
 * 取 barWidth 的静态值：字面量直接返回；标识符回同文件的 const/let/var
 * 数字定义；解析不出返回 null（红——阈值必须静态可判，不能靠运行时约定）
 */
function resolve_number(src, file_text) {
  if (/^\d+(?:\.\d+)?$/.test(src)) {
    return Number(src);
  }
  if (/^[A-Za-z_$][\w$]*$/.test(src)) {
    const def = new RegExp(
      `(?:const|let|var)\\s+${src}\\s*=\\s*(\\d+(?:\\.\\d+)?)`,
    ).exec(file_text);
    if (def) {
      return Number(def[1]);
    }
  }
  return null;
}

/**
 * 门 A 实测：对每条带 rule 的事实，扫 ere/ 收集全部 progress 调用点
 * （printProgress 调用 + 多列 progress 格），逐处判定 barWidth 显式且在界内。
 * 返回 violations: [{ at, message }]。
 */
function check_call_site_rules() {
  const violations = [];
  const facts_with_rule = ENGINE_FACTS.filter((fact) => fact.rule);
  let count = 0;
  for (const rel of list_js_files('ere')) {
    if (rel === SDK_FILE) {
      continue;
    }
    const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
    const targets = [];
    // 形态一：era.printProgress(...)——配平取实参全文
    const call_re = /era\.printProgress\s*\(/g;
    for (const fact of facts_with_rule) {
      if (fact.rule.targets.includes('printProgress-call')) {
        call_re.lastIndex = 0;
        let m;
        while ((m = call_re.exec(text))) {
          targets.push({
            fact,
            at: m.index,
            line: line_of(text, m.index),
            chunk: balanced(text, m.index + m[0].length - 1, '(', ')'),
          });
        }
      }
      // 形态二：多列格对象 { type: 'progress', …, config: { barWidth } }
      if (fact.rule.targets.includes('progress-grid-object')) {
        const grid_re = /type:\s*'progress'/g;
        let m;
        while ((m = grid_re.exec(text))) {
          targets.push({
            fact,
            at: m.index,
            line: line_of(text, m.index),
            chunk: enclosing_object(text, m.index),
          });
        }
      }
    }
    count += targets.length;
    for (const target of targets) {
      const { rule } = target.fact;
      const spec = /barWidth\s*:\s*([\w$.]+)/.exec(target.chunk);
      if (!spec) {
        violations.push({
          at: `${rel}:${target.line}`,
          message: `progress 格未显式传 barWidth——${rule.desc}；${rule.remedy}`,
        });
        continue;
      }
      const value = resolve_number(spec[1], text);
      if (value === null) {
        violations.push({
          at: `${rel}:${target.line}`,
          message: `progress 格 barWidth = ${spec[1]}，静态解析不出数值（要求文件内 const/let/var 的数字字面量）——${rule.desc}`,
        });
      } else if (value < rule.min || value > rule.max) {
        violations.push({
          at: `${rel}:${target.line}`,
          message: `progress 格 barWidth = ${value}，越界（要求 ${rule.min}..${rule.max}）——${rule.desc}；${rule.remedy}`,
        });
      }
    }
  }
  return { violations, facts_with_rule, targets_checked: count };
}

// —— 门 B：锚点校核（app.asar 渲染层源码） ——

/**
 * @returns {{ status: 'ok', facts: number, anchors: number }
 *         | { status: 'missing' } | { status: 'drift', message: string }}
 */
function check_anchors(asar_path) {
  const { buf, header_size, files } = list_asar_files(asar_path);
  const map_entry = files.find(([name]) => RENDERER_MAP_RE.test(name));
  if (!map_entry) {
    return {
      status: 'drift',
      message:
        '引擎变了：app.asar 里找不到渲染包源映射（期望 js/app.*.js.map，模式匹配——文件名带内容哈希，不能写死）。重新核读新版引擎的渲染包结构，更新本工具与 tools/engine-contract-facts.mjs 的定位/锚点',
    };
  }
  const [map_name, entry] = map_entry;
  const start = 16 + header_size + Number(entry.offset);
  const map_text = buf.slice(start, start + entry.size).toString('utf8');
  let sources;
  try {
    sources = JSON.parse(map_text).sourcesContent ?? [];
  } catch {
    return {
      status: 'drift',
      message: `引擎变了：${map_name} 不再是可解析的 source map（sourcesContent 缺失或损坏）。重新核读新版引擎`,
    };
  }
  const renderer_source = sources.join('\n');
  for (const fact of ENGINE_FACTS) {
    for (const anchor of fact.anchors) {
      if (!renderer_source.includes(anchor)) {
        return {
          status: 'drift',
          message: `引擎变了：事实「${fact.id}」的锚点字面 ${JSON.stringify(anchor)} 在渲染层源码（${map_name} 的 sourcesContent）里找不到了。重新核读新版引擎，更新 tools/engine-contract-facts.mjs 的锚点与夹具镜像（${fact.mirror}）`,
        };
      }
    }
  }
  return {
    status: 'ok',
    facts: ENGINE_FACTS.length,
    anchors: ENGINE_FACTS.reduce((sum, fact) => sum + fact.anchors.length, 0),
  };
}

// —— 门 C：条目表两项检查 ——

function check_ledger() {
  const violations = [];
  const fixture_source = fs.readFileSync(path.join(REPO, FIXTURE_FILE), 'utf8');
  for (const entry of ENGINE_CONTRACT_LEDGER) {
    if (!LEDGER_BASELINE.includes(entry.id)) {
      violations.push(
        `条目表条目 ${entry.id} 不在 #91 基线内（只能变短：消化现有条目 = 删条目；新增分歧确需冻结，必须显式改 engine-contract-check.mjs 的 LEDGER_BASELINE，在版本库差异里看得见）`,
      );
    }
    if (!fixture_source.includes(entry.witness)) {
      violations.push(
        `条目表条目 ${entry.id} 过期失效：见证注释「${entry.witness}」已不在 ${FIXTURE_FILE} 里——分歧要么已被修复（镜像补上了，删本条），要么注释被挪（同步更新 witness）`,
      );
    }
  }
  return violations;
}

// —— 入口 ——

function run() {
  const asar_flag_idx = process.argv.indexOf('--asar');
  const explicit_asar =
    asar_flag_idx >= 0 ? process.argv[asar_flag_idx + 1] : undefined;
  let failures = 0;

  // 门 A：调用点规则
  const {
    violations: rule_violations,
    facts_with_rule,
    targets_checked,
  } = check_call_site_rules();
  for (const v of rule_violations) {
    console.log(`✗ ${v.at} ${v.message}`);
    failures += 1;
  }

  // 门 B：锚点校核（引擎缺失 → 跳过并警告，不是失配）
  let anchor_report = '锚点校核跳过';
  const asar_path = locate_asar(explicit_asar);
  if (!asar_path) {
    console.warn(
      '⚠ [engine-contract-check] 未找到 app.asar（--asar / ERE_ENGINE_ASAR / 仓库内 / D:\\Code\\era 四处都没命中）——锚点校核跳过（引擎比对是加强项，与 test 侧 skip 同一标准）；调用点规则与条目表两项检查照跑',
    );
  } else {
    const result = check_anchors(asar_path);
    if (result.status === 'drift') {
      console.log(`✗ ${result.message}`);
      failures += 1;
    } else {
      anchor_report = `锚点 ${result.facts} 事实 / ${result.anchors} 字面全中`;
    }
  }

  // 门 C：条目表两项检查
  for (const message of check_ledger()) {
    console.log(`✗ ${message}`);
    failures += 1;
  }

  if (failures === 0) {
    console.log(
      `✓ 引擎契约：调用点规则 ${facts_with_rule.length} 条 × 调用点 ${targets_checked} 处全数在界内 · ${anchor_report} · 条目表 ${ENGINE_CONTRACT_LEDGER.length} 条两项检查全过`,
    );
  } else {
    // 汇总不枚举检查项名：哪项检查触发了，上方逐条消息已写明（domain-check 同款
    // 标准——枚举会让「文案断言」型测试被未触发的检查项名误满足）
    console.log(`✗ ${failures} 处引擎契约失守（逐条见上）`);
  }
  return failures;
}

process.exit(run() === 0 ? 0 : 1);
