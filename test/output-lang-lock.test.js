/**
 * @file 简体锁（issue #60）：ere/ 与 yml/ 的玩家可见文本不得含表外非简体字符。
 *
 * 缘由：游戏语言统一为简体中文是产品决定（对 1:1 的有意偏离），偏离必须以
 * 「一张表 + 一道锁」落地。判定器是 tools/lang-normalize.js 的
 * find_offenders（字级命中 / 假名 / 词级命中），数据是 tools/lang-table.js
 * （唯一真相源）——本文件不自持一份判定逻辑。
 *
 * 形状参照 test/static-table-coverage.test.js 与 test/kojo-text-fidelity.test.js：
 * **从源码扫、逐条探**，新模块 / 新产物自动纳入——文件二不用登记。
 *
 * 扫描范围与过近似（有意为之，防漏大于防误伤）：
 *   - ere/ 目录下全部 .js 的**全部字符串字面量**（era-electron.js 除外：引擎
 *     SDK，其 JSDoc 不是游戏代码）。不区分「是否输出 API 的实参」——
 *     source-check.js 的 '陰莖' 是三元表达式的值、先赋变量再输出，按
 *     print 实参扫会漏（工单点名的坑）；ere/ 的含 CJK 字面量按构造即玩家
 *     可见文本（寻址串是 ASCII）。
 *   - 模板字面量的 ${…} 内容原样进扫描——里面的非简体同样点名。
 *   - yml/*.yml 的全部带引号串（键与值都扫）：表产物的中文名在**键**位、
 *     照样是玩家可见文本；引擎要求的日文列名（名前/呼び名/基礎/素質/フラグ）
 *     在表的 ENGINE_COLUMN_KEYS 放行——它们是引擎接口，不是文案。注释行
 *     （# 开头）跳过。
 *   - 豁免：tools/lang-table.js 的 EXEMPT_STRINGS 按「字符串整体」相等放行
 *     （专有名词，已知一例：page-title.js 致谢名单里的贡献者 ID 華胥の亡靈）。
 *
 * 探针自证（#46 验收的做法固化成测试）：锁跑绿之后，往 ere/ 塞一个带违规
 * 输出的探针模块、重扫、必须红且点名探针文件——证明「新塞进 ere/ 的模块
 * 自动受锁」，而不是只在既有文件上凑绿。探针放 ere/ 根（不放 kojo/，避免
 * 与并行运行的 kojo-text-fidelity.test.js 的 require 期扫描互踩），用完
 * try/finally 删净。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  find_offenders,
  is_exempted,
  load_table,
  scan_string_literals,
} = require('../tools/lang-normalize');

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

/** 递归收集目录下的指定扩展名文件 */
function walk(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, ext, out);
    } else if (entry.name.endsWith(ext)) {
      out.push(full);
    }
  }
  return out;
}

/**
 * 扫一遍 ere/ + yml/，返回违规清单。
 *
 * @param {string} [ere_dir] 覆盖 ere 目录（探针自证用临时副本时不必——
 *   探针直接写进真 ere/，这里不参数化，锁必须扫的就是真目录）
 * @returns {{problems: string[], js_files: number, yml_files: number,
 *   literals: number}}
 */
function scan_repo(ere_dir = ERE_DIR) {
  const tbl = load_table();
  const problems = [];
  let literals = 0;

  for (const file of walk(ere_dir, '.js')) {
    if (path.basename(file) === 'era-electron.js') {
      continue; // 引擎 SDK：JSDoc 示例不是游戏代码
    }
    const rel = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
    for (const lit of scan_string_literals(fs.readFileSync(file, 'utf8'))) {
      literals += 1;
      if (is_exempted(lit.content, tbl)) {
        continue;
      }
      const hits = find_offenders(lit.content, tbl);
      if (hits.length > 0) {
        problems.push(
          `${rel}:${lit.line} 非简体残留 ${hits
            .map((h) => `${h.kind}:${h.value}`)
            .join(' ')}：「${lit.content}」`,
        );
      }
    }
  }

  const yml_files = fs.existsSync(YML_DIR)
    ? fs.readdirSync(YML_DIR).filter((f) => f.endsWith('.yml'))
    : [];
  for (const name of yml_files) {
    const lines = fs
      .readFileSync(path.join(YML_DIR, name), 'utf8')
      .split(/\r?\n/);
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }
      for (const m of line.matchAll(/"([^"]*)"/g)) {
        const token = m[1];
        if (token === '' || tbl.engine_column_keys.has(token)) {
          continue;
        }
        const hits = find_offenders(token, tbl);
        if (hits.length > 0) {
          problems.push(
            `yml/${name}:${idx + 1} 非简体残留 ${hits
              .map((h) => `${h.kind}:${h.value}`)
              .join(' ')}："${token}"`,
          );
        }
      }
    });
  }

  return {
    problems,
    js_files: walk(ere_dir, '.js').length,
    yml_files: yml_files.length,
    literals,
  };
}

test('ere/ 与 yml/ 的玩家可见文本全部为简体（表外字符即红）', () => {
  const { problems, js_files, yml_files, literals } = scan_repo();
  // 扫描未退化：ere/ 已有几十个模块、上千条字面量
  assert.ok(js_files >= 30, `ere/ 只扫到 ${js_files} 个 .js，扫描八成失效了`);
  assert.ok(yml_files >= 10, `yml/ 只扫到 ${yml_files} 个产物，扫描八成失效了`);
  assert.ok(
    literals >= 500,
    `只扫到 ${literals} 条字符串字面量，扫描八成失效了`,
  );
  assert.deepEqual(
    problems,
    [],
    `玩家可见文本里有表外非简体字符（修法：跑 node tools/lang-normalize.js --write <文件>；词级/专有名词先补 tools/lang-table.js——表只能有意识地长）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 探针自证：新塞进 ere/ 的模块自动受锁 ——

test('探针：往 ere/ 塞违规模块，锁必须点名它（自动纳入后来者）', () => {
  const probe_rel = path.join(ERE_DIR, '__lang_lock_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe_rel)) {
      fs.unlinkSync(probe_rel);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    const before_count = walk(ERE_DIR, '.js').length;
    fs.writeFileSync(
      probe_rel,
      [
        '// 探针模块（test/output-lang-lock.test.js 写入，跑完即删）：',
        '// 三类违规各一——字级（繁体）、词级（日文残留词）、假名。',
        "const era = require('#/era-electron');",
        "exports.run = () => era.print('你這個變態…別碰我！');",
        "exports.run2 = () => era.print('因奴隷的爱而回復了気力');",
        "exports.run3 = () => era.print('華胥の亡靈式的未豁免串');",
        '',
      ].join('\n'),
      'utf8',
    );
    const { problems, js_files } = scan_repo();
    // 并行容忍：node --test 并行跑测试文件，trace-check 等探针也会往 ere/
    // 塞临时文件——两次全目录计数之间多出别人的探针不是失明（#92 在无引擎
    // Linux 复跑时实测撞过：前 52 后 54）。本探针在 scan_repo 时必然在场，
    // 故取 >=；真正「锁对新增文件不失明」的证明在下面 probe_hits 的点名。
    assert.ok(
      js_files >= before_count + 1,
      `探针没被扫到（前 ${before_count} 后 ${js_files}）——锁对新增文件失明`,
    );
    const probe_hits = problems.filter((p) =>
      p.includes('__lang_lock_probe__'),
    );
    assert.ok(
      probe_hits.length >= 3,
      `探针三类违规至少各红一条，得 ${probe_hits.length} 条：\n${problems.join('\n')}`,
    );
    assert.ok(
      probe_hits.some((p) => p.includes('char:這') || p.includes('char:別')),
      '字级命中未点名',
    );
    assert.ok(
      probe_hits.some((p) => p.includes('word:奴隷')),
      '词级命中未点名',
    );
    assert.ok(
      probe_hits.some((p) => p.includes('kana:の')),
      '假名命中未点名',
    );
  } finally {
    cleanup();
  }
  // 删净之后锁恢复（也证明探针真的进过扫描）
  const after = scan_repo();
  assert.ok(
    after.problems.every((p) => !p.includes('__lang_lock_probe__')),
    '探针删了还在红——文件系统或扫描有一边不对',
  );
});
