/**
 * @file 区段所有权扫描器：从只读移植源 target/ 实测变量表的区段所有权（issue #66，
 * 决议 docs/adr/0002-region-ownership-from-measurement.md；父票 #65）。
 *
 * 本票只覆盖角色旗标（CFLAG）一张表——把扫描、聚合、产物格式、产物边界、同步守护
 * 一整条路走通；#70 全表实测在 TABLES 注册表扩表。加表是代码改动，加域不是：
 * 域清单是 ownership/domains.yml 里的数据，工具零硬编码枚举。
 *
 * 写入口径（相对工单正则的两处有意扩展，锚点对账见 issue #66 评论）：
 *   1. 写入 = 寻址后跟赋值或复合赋值运算符（= += -= *= /= |= &= ^= <<= >>=）；
 *      比较形态（== >= <= != < >）不是写入——工单正则验证过的排除，此处保持同义。
 *   2. 寻址段允许括号表达式：CFLAG:322（隐含当前角色）、CFLAG:TARGET:344（显式
 *      角色）、CFLAG:(ARG:0):13（括号角色槽）都算。工单正则的字符类不含括号，
 *      会漏掉第三种 433 次（迷宮/侵略/怪物相關为主）——它们是活代码。
 *   3. 判定前剥除 ; 注释：注释掉的写入是死代码，不进所有权表与跨域清单，单独计数
 *      报告。工单锚点 9707 = 实活 9447 + 注释 260（对账见 issue #66 评论）。
 *   4. 下标取寻址最后一段；非数字（如 CFLAG:COUNT）为动态下标——计入写入总数与
 *      统计，不进下标聚合（没有测量事实可归属），也不进跨域清单（无属主可比）。
 *   5. 读取 = 同一寻址命中但不跟写入运算符（比较、右值、PRINTFORM 引用都算读），
 *      按域汇总备用（#70 决定去留），不写入本工具的产物。
 *
 * 产物三份（产物边界 = issue #10：重跑默认跳过已存在产物，重写必须显式 --force，
 * 与 yml/ 同规格）：
 *   ownership/domains.yml                    域清单——手维护的输入数据，本工具只读；
 *   ownership/cflag-ownership.yml            区段所有权表——生成；
 *   ownership/cflag-cross-domain-writes.yml  跨域写入清单——生成。
 *   同步守护在 test/ownership-scan.test.js：对生成的两份产物做逐字节直比。
 *
 * 属主判定 = 区段内写入次数最多的域（plurality）；并列按 domains.yml 的声明序取
 * 先者（改声明序即可人工决胜，仍是数据不是代码）。跨域写入 = 写入者域不等于该
 * 下标属主域的每一次写入，按「下标、文件、行号」排序。
 *
 * 用法：node tools/ownership-scan.js [--force] [--table cflag]
 *   文件编码按内容判定（复用 tools/csv-to-yml.js 的 read_text：BOM → 严格 UTF-8
 *   → Shift-JIS 兜底）——target/ 有一个 Shift-JIS 活代码文件（調教相關/
 *   COMF90_ニプルファック.ERB），按扩展名假定 UTF-8 会读出乱码并漏掉其中的写入。
 */

const fs = require('node:fs');
const path = require('node:path');

const { read_text, write_product } = require('./csv-to-yml');

// 仓库根目录：tools/ 的上一级
const REPO_ROOT = path.resolve(__dirname, '..');

// 表注册：#66 只有角色旗标；#70 全表实测在此扩（寻址模式由表名参数化）。
const TABLES = {
  cflag: {
    // Emuera 表名（寻址前缀）
    variable: 'CFLAG',
    ownership_product: 'cflag-ownership.yml',
    cross_product: 'cflag-cross-domain-writes.yml',
    // 产物头注引用的票据号
    ticket: '#66',
  },
};

// —— 域清单（ownership/domains.yml）——
//
// 手维护的输入数据，格式刻意收窄（全行注释、空行、顶层「键:」起块、块内
// 「label: 名」「dirs: 目录, 目录」或「- 文件名」），解析器只认这四种行——
// 写歪即报错，绝不静默吞掉半个域。
//
//   kojo:
//     label: 口上
//     dirs: 口上
//   ignored_files:
//     - TITLE.ERB
//
// 顶层键 = 域标识（小写 snake_case）；ignored_files 是保留键，列引擎不装载的
// 根目录源文件（issue #12：根 TITLE.ERB 被引擎忽略）。被忽略文件若出现写入
// 则报错——忽略是数据里的显式声明，发霉要响。

function parse_domains(text) {
  const domains = [];
  const ignored_files = [];
  let current = null; // 当前块：域对象，或 { ignored: true }
  for (const raw_line of text.split(/\r?\n/)) {
    const line = raw_line.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const indented = /^[ \t]/.test(raw_line);
    if (!indented) {
      const top = /^([A-Za-z_][A-Za-z0-9_]*):$/.exec(line);
      if (!top) {
        throw new Error(`域清单无法解析的顶层行：${line}`);
      }
      if (top[1] === 'ignored_files') {
        current = { ignored: true };
      } else {
        if (!/^[a-z][a-z0-9_]*$/.test(top[1])) {
          throw new Error(`域标识必须是 小写snake_case：${top[1]}`);
        }
        current = { key: top[1], label: undefined, dirs: [] };
        domains.push(current);
      }
      continue;
    }
    if (!current) {
      throw new Error(`域清单的缩进行出现在任何块之前：${line}`);
    }
    const kv = /^(label|dirs):[ \t]+(.+)$/.exec(line);
    const item = /^-[ \t]+(.+)$/.exec(line);
    if (current.ignored && item) {
      ignored_files.push(item[1].trim());
    } else if (!current.ignored && kv) {
      if (kv[1] === 'label') {
        current.label = kv[2].trim();
      } else {
        current.dirs = kv[2]
          .split(',')
          .map((dir) => dir.trim())
          .filter(Boolean);
      }
    } else {
      throw new Error(`域清单无法解析的行：${line}`);
    }
  }

  if (domains.length === 0) {
    throw new Error('域清单为空：至少要有一个域');
  }
  const seen_keys = new Set();
  const seen_dirs = new Map();
  for (const domain of domains) {
    if (seen_keys.has(domain.key)) {
      throw new Error(`域标识重复：${domain.key}`);
    }
    seen_keys.add(domain.key);
    if (!domain.label || domain.dirs.length === 0) {
      throw new Error(`域 ${domain.key} 缺 label 或 dirs`);
    }
    for (const dir of domain.dirs) {
      if (seen_dirs.has(dir)) {
        throw new Error(
          `目录 ${dir} 被域 ${seen_dirs.get(dir)} 与 ${domain.key} 重复认领`,
        );
      }
      seen_dirs.set(dir, domain.key);
    }
  }
  if (new Set(ignored_files).size !== ignored_files.length) {
    throw new Error('ignored_files 有重复条目');
  }
  return { domains, ignored_files, dir_to_domain: seen_dirs };
}

// —— 写入/读取判定 ——
//
// 寻址正则：表名 + 若干段，段 = 括号表达式（角色槽/下标槽）或标识符/字面量，
// 冒号连接。写入运算符前瞻 = 行内寻址结尾之后的文本若以「赋值/复合赋值」开头
// 则为写入（比较形态在前瞻处失配，与工单正则的排除同义）。

function build_matchers(variable) {
  return {
    addr_re: new RegExp(
      `${variable}:(?:\\([^)]*\\)|[0-9A-Za-z_]+)(?::(?:\\([^)]*\\)|[0-9A-Za-z_]+))*`,
      'g',
    ),
    write_op_re: /^[ \t]*([-+*/|&^]|<<|>>)?=[ \t]*[^=]/,
  };
}

// 下标 = 寻址最后一段；非数字（动态下标）返回 null
function literal_index(address) {
  const seg = address.slice(address.lastIndexOf(':') + 1);
  return /^\d+$/.test(seg) ? Number(seg) : null;
}

// 单行分类：返回 { writes: [下标|null…], reads: 次数 }（一行可有多次寻址）
function classify_line(line, matchers) {
  const writes = [];
  let reads = 0;
  const { addr_re, write_op_re } = matchers;
  addr_re.lastIndex = 0;
  let match;
  while ((match = addr_re.exec(line)) !== null) {
    if (write_op_re.test(line.slice(match.index + match[0].length))) {
      writes.push(literal_index(match[0]));
    } else {
      reads += 1;
    }
  }
  return { writes, reads };
}

// —— 扫描一棵 ERB 树 ——
//
// 目录归属校验（后来者自动纳入）：target/ERB 的每个一级目录必须被域清单恰好
// 认领一次（未认领、认领了不存在的目录，都报错）；根目录源文件必须出现在
// ignored_files（引擎只装载子目录里的文件）。递归子目录（MOD/魔界银行、
// 侵略/AGENT 等）随一级目录归属。

function scan_table({ table, erb_root, domains }) {
  const config = TABLES[table];
  const matchers = build_matchers(config.variable);

  const top_entries = fs.readdirSync(erb_root, { withFileTypes: true });
  const top_dirs = top_entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  const root_files = top_entries
    .filter((e) => e.isFile() && /\.(erb|erh)$/i.test(e.name))
    .map((e) => e.name);

  const unclaimed = top_dirs.filter((dir) => !domains.dir_to_domain.has(dir));
  if (unclaimed.length > 0) {
    throw new Error(
      `ERB 根下有未被域清单认领的一级目录：${unclaimed.join('、')}（在 ownership/domains.yml 里给它们归属一个域）`,
    );
  }
  const stale = [...domains.dir_to_domain.keys()].filter(
    (dir) => !top_dirs.includes(dir),
  );
  if (stale.length > 0) {
    throw new Error(
      `域清单认领了不存在的目录：${stale.join('、')}（数据发霉，删掉或改对）`,
    );
  }
  const ignored = new Set(domains.ignored_files);
  const stray = root_files.filter((name) => !ignored.has(name));
  if (stray.length > 0) {
    throw new Error(
      `ERB 根下有未处置的源文件：${stray.join('、')}（引擎只装载子目录文件；要么进 domains.yml 的 ignored_files，要么给它们建目录）`,
    );
  }

  // 文件清单（按名排序保证产物逐字节可复算）
  const files = [];
  (function walk(dir) {
    for (const ent of fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (/\.(erb|erh)$/i.test(ent.name)) {
        files.push(full);
      }
    }
  })(erb_root);

  const per_index = new Map(); // 下标 → Map<域, 次数>
  const write_entries = []; // { index, domain, file, line }（含动态下标，清单侧再滤）
  const writes_by_domain = new Map();
  const reads_by_domain = new Map();
  const enc_counts = new Map();
  const shift_jis_files = [];
  const ignored_with_writes = [];
  let writes_total = 0;
  let dynamic_writes = 0;
  let commented_writes = 0;
  let reads_total = 0;

  for (const file of files) {
    const rel = path.relative(erb_root, file).split(path.sep);
    const is_root = rel.length === 1;
    const domain_key = is_root
      ? '(ignored)'
      : domains.dir_to_domain.get(rel[0]);
    const repo_rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');

    const { text, enc } = read_text(file);
    enc_counts.set(enc, (enc_counts.get(enc) ?? 0) + 1);
    if (enc === 'shift_jis') {
      shift_jis_files.push(repo_rel);
    }

    let line_no = 0;
    let writes_in_file = 0;
    for (const raw_line of text.split(/\r?\n/)) {
      line_no += 1;
      const semi = raw_line.indexOf(';');
      const code = semi >= 0 ? raw_line.slice(0, semi) : raw_line;
      const comment = semi >= 0 ? raw_line.slice(semi) : '';

      const live = classify_line(code, matchers);
      for (const index of live.writes) {
        writes_total += 1;
        writes_in_file += 1;
        if (index === null) {
          dynamic_writes += 1;
        } else {
          const per = per_index.get(index) ?? new Map();
          per.set(domain_key, (per.get(domain_key) ?? 0) + 1);
          per_index.set(index, per);
        }
        writes_by_domain.set(
          domain_key,
          (writes_by_domain.get(domain_key) ?? 0) + 1,
        );
        write_entries.push({
          index,
          domain: domain_key,
          file: repo_rel,
          line: line_no,
        });
      }
      reads_total += live.reads;
      reads_by_domain.set(
        domain_key,
        (reads_by_domain.get(domain_key) ?? 0) + live.reads,
      );

      // 死代码单独计数（注释里的写入），不进任何聚合
      commented_writes += classify_line(comment, matchers).writes.length;
    }
    if (is_root && writes_in_file > 0) {
      ignored_with_writes.push(`${repo_rel}（${writes_in_file} 次写入）`);
    }
  }

  if (ignored_with_writes.length > 0) {
    throw new Error(
      `被 ignored_files 忽略的文件里出现了写入：${ignored_with_writes.join('、')}——引擎不装载它们，忽略声明已发霉，重新裁定`,
    );
  }

  return {
    table,
    files: files.length,
    enc_counts,
    shift_jis_files,
    per_index,
    write_entries,
    writes_by_domain,
    reads_by_domain,
    writes_total,
    dynamic_writes,
    commented_writes,
    reads_total,
  };
}

// —— 属主与区间 ——
//
// 区间 = 相邻实活写入下标、同属主合并；未写入的下标没有测量事实，断开区间。
// 区间内按域分布聚合（判定依据随产物可查）；逐下标明细由重跑复算（同步守护）。

function assign_ownership(per_index, domain_order) {
  const owner_of_index = new Map();
  for (const [index, per] of per_index) {
    let owner = null;
    let best = -1;
    for (const domain of domain_order) {
      const count = per.get(domain) ?? 0;
      if (count > best) {
        best = count;
        owner = domain;
      }
    }
    owner_of_index.set(index, owner);
  }
  return owner_of_index;
}

function merge_ranges(per_index, owner_of_index) {
  const ranges = [];
  for (const index of [...per_index.keys()].sort((a, b) => a - b)) {
    const owner = owner_of_index.get(index);
    const last = ranges[ranges.length - 1];
    if (last && last.owner === owner && last.end + 1 === index) {
      last.end = index;
    } else {
      ranges.push({ start: index, end: index, owner });
    }
  }
  for (const range of ranges) {
    range.writes = 0;
    range.by_domain = new Map();
    for (let i = range.start; i <= range.end; i += 1) {
      for (const [domain, count] of per_index.get(i)) {
        range.by_domain.set(domain, (range.by_domain.get(domain) ?? 0) + count);
        range.writes += count;
      }
    }
  }
  return ranges;
}

// by_domain 的排序：次数降序，并列按域声明序（与属主决胜同序，读起来一致）
function sort_by_domain(entries, domain_order) {
  return entries.sort(
    (a, b) =>
      b[1] - a[1] || domain_order.indexOf(a[0]) - domain_order.indexOf(b[0]),
  );
}

// —— 产物文本（「产物长什么样」的规格在此、不在测试）——

function to_ownership_yaml(ranges, domain_order, meta) {
  const lines = [
    `# 区段所有权表（${meta.variable}）——由 tools/ownership-scan.js 从 target/ 实测生成（issue ${meta.ticket}）`,
    `# 本文件归人工维护：扫描器重跑默认不覆盖，需要重新生成请加 --force --table ${meta.table}`,
    '#',
    '# 口径：写入 = 赋值与复合赋值（寻址段允许括号角色槽），剥除 ; 注释后的实活代码；',
    '#       读取不入本表。区间 = 相邻实活写入下标合并，未写入的下标无测量事实、不属任何区间；',
    '#       区间内分布按区间聚合，逐下标明细可由重跑复算（同步守护逐字节直比）。',
    '# 属主 = 区间内写入次数最多的域；并列按 ownership/domains.yml 的声明序取先者。',
    `# 实活写入 ${meta.writes_total}（动态下标 ${meta.dynamic_writes} 未归类；注释掉的写入 ${meta.commented_writes} 另计）；`,
    `# 实活下标 ${meta.live_indexes} 个 → 区间 ${ranges.length} 条；跨域写入 ${meta.cross_count} 条（见 ${meta.cross_product}）。`,
  ];
  for (const range of ranges) {
    const key =
      range.start === range.end
        ? `${range.start}`
        : `${range.start}-${range.end}`;
    lines.push(`${JSON.stringify(key)}:`);
    lines.push(`  owner: ${range.owner}`);
    lines.push(`  writes: ${range.writes}`);
    lines.push('  by_domain:');
    for (const [domain, count] of sort_by_domain(
      [...range.by_domain],
      domain_order,
    )) {
      lines.push(`    ${domain}: ${count}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

function to_cross_writes_yaml(cross, meta) {
  const lines = [
    `# 跨域写入清单（${meta.variable}）——由 tools/ownership-scan.js 从 target/ 实测生成（issue ${meta.ticket}）`,
    `# 本文件归人工维护：扫描器重跑默认不覆盖，需要重新生成请加 --force --table ${meta.table}`,
    '#',
    '# 定义：写入者域 ≠ 该下标属主域 的每一次写入（属主判定见 cflag-ownership.yml），',
    '#       按「下标、文件、行号」排序。动态下标的写入无属主可比，不入本清单。',
    `# 共 ${cross.length} 条。`,
  ];
  for (const entry of cross) {
    lines.push(`- index: ${entry.index}`);
    lines.push(`  writer: ${entry.domain}`);
    lines.push(`  owner: ${entry.owner}`);
    lines.push(`  file: ${JSON.stringify(entry.file)}`);
    lines.push(`  line: ${entry.line}`);
  }
  return `${lines.join('\n')}\n`;
}

// —— 组装一次生成（读域清单 → 扫描 → 属主 → 区间 → 跨域 → 产物文本）——
//
// 不落盘：产物文本交给调用方（main 写盘，测试直比）。

function generate({ table = 'cflag', domain_file, erb_root } = {}) {
  const config = TABLES[table];
  if (!config) {
    throw new Error(
      `未知表名：${table}（支持：${Object.keys(TABLES).join('、')}）`,
    );
  }
  const domains = parse_domains(
    read_text(domain_file ?? path.join(REPO_ROOT, 'ownership', 'domains.yml'))
      .text,
  );
  const scan = scan_table({
    table,
    erb_root: erb_root ?? path.join(REPO_ROOT, 'target', 'ERB'),
    domains,
  });
  const domain_order = domains.domains.map((domain) => domain.key);
  const owner_of_index = assign_ownership(scan.per_index, domain_order);
  const ranges = merge_ranges(scan.per_index, owner_of_index);
  const cross = scan.write_entries
    .filter(
      (entry) =>
        entry.index !== null &&
        owner_of_index.get(entry.index) !== entry.domain,
    )
    .sort(
      (a, b) =>
        a.index - b.index ||
        (a.file < b.file ? -1 : a.file > b.file ? 1 : 0) ||
        a.line - b.line,
    )
    .map((entry) => ({ ...entry, owner: owner_of_index.get(entry.index) }));

  const meta = {
    table,
    ticket: config.ticket,
    variable: config.variable,
    cross_product: config.cross_product,
    writes_total: scan.writes_total,
    dynamic_writes: scan.dynamic_writes,
    commented_writes: scan.commented_writes,
    live_indexes: scan.per_index.size,
    cross_count: cross.length,
  };
  return {
    domains,
    scan,
    ranges,
    cross,
    ownership_yaml: to_ownership_yaml(ranges, domain_order, meta),
    cross_yaml: to_cross_writes_yaml(cross, meta),
  };
}

// —— CLI ——

const USAGE = '用法：node tools/ownership-scan.js [--force] [--table cflag]';

function main(argv, overrides = {}) {
  let force = false;
  let table = 'cflag';
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--force' || arg === '-f') {
      force = true;
    } else if (arg === '--table') {
      const value = argv[i + 1];
      if (value === undefined) {
        console.error('错误：--table 需要一个参数，如 cflag');
        console.error(USAGE);
        return 2;
      }
      table = value.toLowerCase();
      i += 1;
    } else {
      console.error(`错误：未知参数：${arg}`);
      console.error(USAGE);
      return 2;
    }
  }

  let result;
  try {
    result = generate({
      table,
      domain_file: overrides.domain_file,
      erb_root: overrides.erb_root,
    });
  } catch (error) {
    console.error(`错误：${error.message}`);
    return 1;
  }

  const { scan, domains, ranges, cross } = result;
  const enc_report = [...scan.enc_counts.entries()]
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .map(([enc, count]) => `${enc} ${count}`)
    .join(' / ');
  console.log(
    `[ownership-scan] 表 ${table}：扫描 ${scan.files} 个源文件（${enc_report}）`,
  );
  console.log(
    `[ownership-scan] 实活写入 ${scan.writes_total}（动态下标 ${scan.dynamic_writes} 未归类）· 注释掉的写入 ${scan.commented_writes} · 读取 ${scan.reads_total}`,
  );
  const by_domain = (map) =>
    domains.domains
      .map(
        (domain) =>
          `${domain.key}(${domain.label}) ${map.get(domain.key) ?? 0}`,
      )
      .join(' / ');
  console.log(`[ownership-scan] 按域写入：${by_domain(scan.writes_by_domain)}`);
  console.log(`[ownership-scan] 按域读取：${by_domain(scan.reads_by_domain)}`);
  console.log(
    `[ownership-scan] 实活下标 ${scan.per_index.size} → 区间 ${ranges.length}；跨域写入 ${cross.length} 条`,
  );

  const out_dir = overrides.out_dir ?? path.join(REPO_ROOT, 'ownership');
  const reports = [
    write_product(
      path.join(out_dir, TABLES[table].ownership_product),
      result.ownership_yaml,
      {
        force,
      },
    ),
    write_product(
      path.join(out_dir, TABLES[table].cross_product),
      result.cross_yaml,
      {
        force,
      },
    ),
  ];
  const written = reports.filter(
    (report) => report.status === 'written',
  ).length;
  for (const report of reports) {
    console.log(
      `[ownership-scan] ${report.status === 'written' ? '写出' : '跳过'} ${path.relative(REPO_ROOT, report.target)}` +
        (report.status === 'skipped'
          ? '（已存在，默认不覆盖；重写需 --force）'
          : ''),
    );
  }
  console.log(
    `[ownership-scan] 合计：写出 ${written} 个 / 跳过 ${reports.length - written} 个`,
  );
  return 0;
}

module.exports = {
  REPO_ROOT,
  TABLES,
  assign_ownership,
  build_matchers,
  classify_line,
  generate,
  literal_index,
  main,
  merge_ranges,
  parse_domains,
  scan_table,
  to_cross_writes_yaml,
  to_ownership_yaml,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
