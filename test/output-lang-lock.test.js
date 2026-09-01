/**
 * @file 简体锁（issue #60；#188 收紧）：ere/ 与 yml/ 的玩家可见文本不得含
 * 非简体字符。
 *
 * 缘由：游戏语言统一为简体中文是产品决定（对 1:1 的有意偏离），偏离必须以
 * 「一张表 + 一道锁」落地。**两路判定器**都在 tools/lang-normalize.js，本文件
 * 不自持判定逻辑：
 *   - find_offenders：查表命中（字级 / 假名 / 词级），数据 tools/lang-table.js
 *     （唯一真相源）——报「表内登记的」非简体字符；
 *   - find_outside_trad（#188 新增）：独立参考集判定（tools/lang-simp-ref.js，
 *     OpenCC 繁→简字表派生），报「归一表外的」繁侧字——补上查表命中对表外
 *     繁体的失明（find_offenders('巖穴里的赠礼') 曾返回 []，巖 不在归一表）。
 * 形状参照 test/static-table-coverage.test.js 与 test/kojo-text-fidelity.test.js：
 * **从源码扫、逐条探**，新模块 / 新产物自动纳入——文件二不用登记。
 *
 * 扫描范围与过近似（有意为之，防漏大于防误伤）：
 *   - ere/ 目录下全部 .js 的**全部字符串字面量**（era-electron.js 除外：引擎
 *     SDK，其 JSDoc 不是游戏代码）。不区分「是否输出 API 的实参」——
 *     source-check.js 的 '陰莖' 是三元表达式的值、先赋变量再输出，按
 *     print 实参扫会漏（工单指出的坑）；ere/ 的含 CJK 字面量按构造即玩家
 *     可见文本（寻址串是 ASCII）。
 *   - 模板字面量的 ${…} 内容原样进扫描——里面的非简体同样报出。
 *   - yml/*.yml 的全部带引号串（键与值都扫）：表产物的中文名在**键**位、
 *     照样是玩家可见文本；引擎要求的日文列名（名前/呼び名/基礎/素質/フラグ）
 *     在表的 ENGINE_COLUMN_KEYS 放行——它们是引擎接口，不是文案。注释行
 *     （# 开头）跳过。
 *   - 豁免：tools/lang-table.js 的 EXEMPT_STRINGS 按「字符串整体」相等放行
 *     （专有名词，已知一例：page-title.js 致谢名单里的贡献者 ID 華胥の亡靈）。
 *
 * 探针自证（#46 验收的做法固化成测试）：锁跑绿之后，往 ere/ 塞一个带违规
 * 输出的探针模块、重扫、必须红且报出探针文件——证明「新塞进 ere/ 的模块
 * 自动受锁」，而不是只在既有文件上凑绿。探针住**临时副本**（#89 三轮整改：
 * 就地写真树 ere/ 会与并行测试的递归拷贝撞车——cpSync 枚举后条目消失即
 * ENOENT），副本按清单只拷 ere/，用完 try/finally 还原（清单回拷）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { after, test } = require('node:test');

const {
  find_offenders,
  find_outside_trad,
  is_exempted,
  load_table,
  scan_string_literals,
} = require('../tools/lang-normalize');
const { make_probe_repo, refresh_probe_repo } = require('./helpers/probe-repo');

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

/** 两路判定的合并命中：表内查表命中 + 表外繁侧参考集命中（#188）。 */
function all_offenders(content, tbl) {
  return [...find_offenders(content, tbl), ...find_outside_trad(content, tbl)];
}

/**
 * 扫一遍 ere/ + yml/，返回违规清单。
 *
 * @param {string} [ere_dir] 覆盖 ere 目录（探针自证传临时副本的 ere/；
 *   默认真树——锁必须扫的就是真目录）
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
      const hits = all_offenders(lit.content, tbl);
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
        const hits = all_offenders(token, tbl);
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

test('ere/ 与 yml/ 的玩家可见文本不含非简体字符（表内查表命中 + 表外繁侧参考集双路即红）', () => {
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
    `玩家可见文本里有非简体字符（修法：char:/word: 是表内命中，跑 node tools/lang-normalize.js --write <文件>，词级/专有名词先补 tools/lang-table.js；outside: 是归一表外的繁侧字，把映射收进 lang-table.js 或按整串豁免——表与豁免都只能有意识地长）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 探针自证：新塞进 ere/ 的模块自动受锁（探针住临时副本，#89）——

const PROBE_REPO_ENTRIES = ['ere'];

let probe_repo_cache;

/** 单例副本（本文件的探针共用一份；文件内用例串行） */
function probe_repo() {
  probe_repo_cache ??= make_probe_repo(PROBE_REPO_ENTRIES);
  return probe_repo_cache;
}

after(() => {
  if (probe_repo_cache) {
    fs.rmSync(probe_repo_cache, { recursive: true, force: true });
  }
});

test('探针：往 ere/ 塞违规模块，锁必须报出它（自动纳入后来者）', () => {
  const root = probe_repo();
  const ere_copy = path.join(root, 'ere');
  const probe = path.join(ere_copy, '__lang_lock_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe)) {
      fs.unlinkSync(probe);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    const before_count = walk(ere_copy, '.js').length;
    fs.writeFileSync(
      probe,
      [
        '// 探针模块（test/output-lang-lock.test.js 写入，跑完即删）：',
        '// 四类违规各一——字级（繁体）、词级（日文残留词）、假名、',
        '// 表外繁侧字（#188：归一表没有 巖，查表命中看不见，靠参考集抓）。',
        "const era = require('#/era-electron');",
        "exports.run = () => era.print('你這個變態…別碰我！');",
        "exports.run2 = () => era.print('因奴隷的爱而回復了気力');",
        "exports.run3 = () => era.print('華胥の亡靈式的未豁免串');",
        "exports.run4 = () => era.print('巖穴里的赠礼');",
        '',
      ].join('\n'),
      'utf8',
    );
    const { problems, js_files } = scan_repo(ere_copy);
    // 副本是私有地（无并行写者），计数是确定性的——探针必然被扫到
    assert.ok(
      js_files === before_count + 1,
      `探针没被扫到（前 ${before_count} 后 ${js_files}）——锁对新增文件失明`,
    );
    const probe_hits = problems.filter((p) =>
      p.includes('__lang_lock_probe__'),
    );
    assert.ok(
      probe_hits.length >= 4,
      `探针四类违规至少各红一条，得 ${probe_hits.length} 条：\n${problems.join('\n')}`,
    );
    assert.ok(
      probe_hits.some((p) => p.includes('char:這') || p.includes('char:別')),
      '字级命中未报出',
    );
    assert.ok(
      probe_hits.some((p) => p.includes('word:奴隷')),
      '词级命中未报出',
    );
    assert.ok(
      probe_hits.some((p) => p.includes('kana:の')),
      '假名命中未报出',
    );
    assert.ok(
      probe_hits.some((p) => p.includes('outside:巖')),
      '表外繁侧字命中未报出（outside:巖）——#188 收紧的判定器失守',
    );
  } finally {
    cleanup();
  }
  // 还原（清单回拷）之后再扫必须无探针（也证明探针真的进过扫描）
  refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  const after_scan = scan_repo(ere_copy);
  assert.ok(
    after_scan.problems.every((p) => !p.includes('__lang_lock_probe__')),
    '探针删了还在红——副本或扫描有一边不对',
  );
});
