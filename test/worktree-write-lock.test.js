/**
 * @file 工作树写入锁（#89 三轮整改的结构性守护）：测试不得写仓库工作树。
 *
 * 缘由：#89 三轮验收各揪出一个写真树的测试（#91 的 page-train 就地改、
 * domain/trace 的台账就地改与 ere/ 探针、lang-lock 的 ere/ 探针）——在
 * #89 落成「探针住临时副本」纪律之前，这只是口头约定，而本仓三次证明：
 * 没有工具守着的约定会退化。本锁把约定变成规则：扫 test/ 全部 .js
 * （含 helpers）的**源码文本**，凡写族调用（writeFileSync / appendFileSync
 * / unlinkSync / rmSync / renameSync / truncateSync / copyFileSync /
 * cpSync / mkdirSync）的首参解析到仓库根之下即红。
 *
 * 判定是静态别名解析（两级 const 追溯）：首参直接以 path.join(REPO_ROOT,
 * …) 开头、或首参标识符的 const 初值（含 ERE_DIR 这类目录别名，递归解析）
 * 落在仓库根下，即红。解析不到仓库根的目标放行——os.tmpdir()/mkdtemp 的
 * 夹具、make_probe_repo 的副本根、函数参数天然解析不到（临时目录正是
 * 纪律允许的去处）。工具本体（tools/ 下被 spawn 的检查器）不在此锁范围：
 * 它们按设计写仓库（csv-to-yml --force、ownership-scan 等），守的是
 * 「测试进程不写工作树」。tests 之外的未来写者（脚本、CI）如有需要另立
 * 锁，不在此扩面。
 *
 * 自证：合成的违规样本（临时目录里的假测试文件，写族调用靶向
 * path.join(REPO_ROOT, 'ere', …)）必须被点名——证明锁对「后来者」不失明，
 * 而不是只在现有文件上凑绿。样本文本用占位符拼接构造，避免本文件自己
 * 含有可被本锁匹配的字面调用形态。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');

const WRITE_CALL_RE =
  /\b(writeFileSync|appendFileSync|unlinkSync|rmSync|renameSync|truncateSync|copyFileSync|cpSync|mkdirSync)\s*\(/g;

/** 单行 const/let 初始化表：标识符 → 初值文本。同名多处声明视为**歧义**
 * （跨作用域同名：参数 dir/target 与别处的 const dir 撞名——实测 gen-facade
 * 的假阳性形态），歧义名不参与解析，宁可放行不可误报。 */
function build_const_map(text) {
  const decls = new Map();
  const re = /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*([^;\n]+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1];
    if (decls.has(name)) {
      decls.set(name, null); // 多处声明 → 歧义
    } else {
      decls.set(name, m[2].trim());
    }
  }
  return decls;
}

/** 表达式是否落在仓库根之下：path.join(REPO_ROOT/…，或经目录别名递归 */
function is_repo_rooted(expr, const_map, depth = 0) {
  if (depth > 4) {
    return false;
  }
  const join_m = /^path\.(?:join|resolve)\s*\(\s*([A-Za-z_$][\w$]*)/.exec(expr);
  if (join_m) {
    const head = join_m[1];
    if (head === 'REPO_ROOT') {
      return true; // 约定：测试文件的 REPO_ROOT = 仓库根
    }
    const head_expr = const_map.get(head);
    return head_expr !== undefined && head_expr !== null
      ? is_repo_rooted(head_expr, const_map, depth + 1)
      : false;
  }
  if (/^[A-Za-z_$][\w$]*$/.test(expr)) {
    const alias = const_map.get(expr);
    // null = 同名多处声明（歧义）或未声明（函数参数等）→ 不解析
    return alias !== null && alias !== undefined
      ? is_repo_rooted(alias, const_map, depth + 1)
      : false;
  }
  return false;
}

/** 从 '(' 起取顶层实参数组（配平到匹配 ')'，按顶层 ',' 切分） */
function top_args(text, from) {
  const args = [];
  let depth = 0;
  let start = from + 1;
  for (let i = from; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '(') {
      depth += 1;
    } else if (ch === ',' && depth === 1) {
      args.push(text.slice(start, i).trim());
      start = i + 1;
    } else if (ch === ')') {
      if (depth === 1) {
        args.push(text.slice(start, i).trim());
        return args;
      }
      depth -= 1;
    }
  }
  return args;
}

/**
 * 扫一个目录树的全部 .js，返回写族调用靶向仓库根的违规清单。
 * @param {string} dir 要扫的目录（测试用例可传临时目录做自证）
 * @returns {string[]} 违规描述（文件:行 + 调用）
 */
function scan_dir_for_worktree_writes(dir) {
  const violations = [];
  const walk = (cur) => {
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.js')) {
        const text = fs.readFileSync(full, 'utf8');
        const const_map = build_const_map(text);
        WRITE_CALL_RE.lastIndex = 0;
        let m;
        while ((m = WRITE_CALL_RE.exec(text)) !== null) {
          const args = top_args(text, m.index + m[0].length - 1);
          // copy 族（cpSync/copyFileSync）首参是**源**（读），写目标是第二参
          const arg =
            m[1] === 'cpSync' || m[1] === 'copyFileSync'
              ? (args[1] ?? '')
              : (args[0] ?? '');
          if (arg !== '' && is_repo_rooted(arg, const_map)) {
            const line = text.slice(0, m.index).split(/\r?\n/).length;
            violations.push(
              `${path.relative(dir, full).replace(/\\/g, '/')}:${line} ${m[1]}(${arg.slice(0, 60)}…) 靶向仓库根——写坏型探针一律住临时副本（test/helpers/probe-repo.js）`,
            );
          }
        }
      }
    }
  };
  walk(dir);
  return violations;
}

test('测试不写工作树：test/ 全部源码无靶向仓库根的写族调用', () => {
  const violations = scan_dir_for_worktree_writes(path.join(REPO_ROOT, 'test'));
  assert.deepEqual(
    violations,
    [],
    `测试里有写向仓库工作树的调用（#89 三轮整改的教训：node --test 并行下，` +
      `写单文件与读单文件/递归拷贝都会撞车；写坏型探针一律住临时副本，` +
      `见 test/helpers/probe-repo.js）：\n  ${violations.join('\n  ')}`,
  );
});

test('自证：合成违规样本（临时目录）必须被点名——锁对后来者不失明', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-write-lock-'));
  try {
    // 占位符拼接：本文件自身不得含有可被本锁匹配的字面调用形态
    const offender = [
      "'use strict';",
      "const path = require('node:path');",
      "const REPO_ROOT = path.resolve(__dirname, '..');",
      "const ERE_DIR = path.join(REPO_ROOT, 'ere');",
      "const PAGE = path.join(REPO_ROOT, 'ere', 'page', 'p.js');",
      "const probe = path.join(ERE_DIR, '__probe__.js');",
      'fs.write' + "FileSync(PAGE, 'mutated');",
      'fs.write' + "FileSync(path.join(REPO_ROOT, 'yml', 'x.yml'), 'y');",
      'fs.write' + "FileSync(probe, 'p');",
      'fs.unlink' + 'Sync(probe);',
      'fs.cp' +
        "Sync('src', path.join(REPO_ROOT, 'ere', 'x'), { recursive: true });",
      '',
    ].join('\n');
    fs.writeFileSync(path.join(dir, '__offender__.test.js'), offender, 'utf8');
    // 合法的临时目录写法不得误伤（函数参数 / mkdtemp 根 / tmpdir / copy 到参数目标）
    fs.writeFileSync(
      path.join(dir, '__benign__.test.js'),
      [
        "'use strict';",
        "const path = require('node:path');",
        "const os = require('node:os');",
        "const REPO_ROOT = path.resolve(__dirname, '..');",
        'function run(root, file) {',
        '  fs.write' + 'FileSync(path.join(root, file), "x");',
        '}',
        "const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fx-'));",
        'fs.write' + "FileSync(path.join(tmp, 'a.js'), 'x');",
        'fs.copy' +
          "FileSync(path.join(REPO_ROOT, 'ere', 'a.js'), path.join(tmp, 'a.js'));",
        'fs.rm' + 'Sync(tmp, { recursive: true, force: true });',
        '',
      ].join('\n'),
      'utf8',
    );
    const violations = scan_dir_for_worktree_writes(dir);
    assert.equal(
      violations.length,
      5,
      `应恰好点名 5 处违规：\n${violations.join('\n')}`,
    );
    assert.ok(
      violations.every((v) => v.startsWith('__offender__.test.js:')),
      `违规必须全部落在违规样本里（误伤合法写法）：\n${violations.join('\n')}`,
    );
    assert.ok(
      violations.some((v) => v.includes('PAGE')),
      '标识符（const 别名）形态必须被抓',
    );
    assert.ok(
      violations.some((v) => v.includes("'yml'")),
      '直接 path.join(REPO_ROOT, …) 形态必须被抓',
    );
    assert.ok(
      violations.some((v) => v.includes('unlinkSync(probe')),
      '目录别名（ERE_DIR）+ unlink 形态必须被抓',
    );
    assert.ok(
      violations.some((v) => v.includes('cpSync') && v.includes("'ere'")),
      'copy 族必须查写目标（第二参），不是源',
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
