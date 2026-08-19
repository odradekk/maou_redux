/**
 * @file 区段所有权扫描器：从只读移植源 target/ 实测**全部已落地变量表**的区段
 * 所有权（issue #66 单表跑通 → #70 全表实测；决议 docs/adr/0002-*.md；父票 #65）。
 *
 * 表集 = yml/ 里已落地的 16 张索引状态表（二维角色表 11 张 + 一维表 5 张，注册表
 * 见 TABLES）。不扫的 yml 文件及理由：GameBase（游戏元数据）、Chara0/Chara17
 * （角色预设，引擎按行装载而非按表寻址）、TrainCommand（指令名表，只读引用）、
 * PortCFlag（#67 自造扩展表，target/ 里不存在源）、_fixed.json（引擎配置）。
 * 一维表与二维表的区段所有权语义相同（所有权都在下标维，角色槽维不入测量），
 * 且门面（ADR-0001）一维二维对称——两者都测。
 *
 * 写入口径 v2（#66 口径 + 全表实测查实的五类新写形；每条的语料证据见 issue #70 评论）：
 *   1. 写入 = 寻址后跟赋值/复合赋值（= += -= *= /= |= &= ^= <<= >>= **'=**）；
 *      比较形态（== >= <= != < >）不是写入。**'= 是字符串赋值**（速查表
 *      `STR '= "文本"`），#66 未计入——全表口径下 CSTR 有一例。
 *   2. 后缀 **++/--** 是写入（等价 += 1 / -= 1）。#66 的负检查「无 ++/--」只对
 *      CFLAG 字面量形态成立；全表口径下 ABL 30+ 处、MARK 2 处、CFLAG 2 处
 *      （`CFLAG:ARG:131++`、`CFLAG:PM:508 --`——均为槽位变量形态，#66 的检查
 *      搜的是字面量形态所以漏了）。算术歧义（`1--2`）已负检查：语料为零。
 *   3. **TIMES 表:下标, 倍率** 是写入（整数乘小数自乘）。SOURCE 上 130+ 处。
 *   4. **VARSET 表[:槽], 值[, 起, 止]** 是区间写入，[起, 止) 左闭右开（引擎
 *      手册：结束索引不包含）。起止均为字面量 → 逐下标计入；缺省止（填到数组
 *      末尾）或起止含变量 → 计入总数与按域统计但不进下标聚合（引擎数组边界
 *      不在测量范围内，整表重置也无区段归属意义）。CVARSET 同理（元素索引维
 *      语义）；语料中只落在未落地表（C_RELATION），实现按落地表通用处理。
 *   5. 寻址段字符集含 CJK：**名字下标**（`SOURCE:PLAYER:阴核快感`）先经
 *      tools/lang-normalize.js 的 to_simplified 归一，再查 yml 名字表解析为
 *      数字下标（名字表是归一后的简体——代码里的 `TALENT:精巣妊娠` 对表里的
 *      `精巢妊娠`）。归一后仍查不到的名字 → 扫描中止报错（引擎同样认不得）；
 *      ASCII 标识符（COUNT/LOCAL/ARG）是动态下标，计入总数、不进下标聚合。
 *   6. 表名前不得是词字符（负向后行）：`EX_CFLAG`/`EX_FLAG`/`EX_TALENT`/
 *      `LOSEBASE`/`MAXBASE`/`NOWEX`/`*_EXP`/`*_FLAG` 都是 #DIM 自定义变量或
 *      引擎内建变量，不是这些表的寻址——#66 的正则会把 `EX_CFLAG:A:99 = …`
 *      里的 `CFLAG:A:99` 误记为 CFLAG 写入（实测 2 笔假写，见 issue #70 对账）。
 *
 * ignored_files 语义（#70 依据实测改判，推翻 #66 的「忽略文件出现写入即报错」）：
 * 根目录源文件被引擎忽略是**装载语义**（issue #12：根 TITLE.ERB 与 SYSTEM/ 下
 * 同名函数冲突而不被装载），与它写不写变量无关——实测 TITLE.ERB 里有 GLOBAL
 * 写入，但引擎永远不执行它。因此 ignored 文件 = 死代码，**整体跳过测量**（读写
 * 均不计）；守卫改为「声明的文件必须存在」（防数据发霉）。
 *
 * 读取：非写入的寻址命中即读（比较、右值、PRINTFORM 引用、CALL 实参），逐下标
 * × 按域计数，供跨域读汇总产物使用。#65 的决议是「跨域读放行」；#70 只给数据
 * （reads-summary.yml）不改规则。
 *
 * 产物（产物边界 = issue #10：重跑默认跳过已存在产物，重写必须显式 --force）：
 *   ownership/domains.yml                     域清单——手维护的输入数据，工具只读；
 *   ownership/<表>-ownership.yml × 16          区段所有权表——生成；
 *   ownership/<表>-cross-domain-writes.yml ×16 跨域写入清单——生成；
 *   ownership/reads-summary.yml                跨域读汇总（全表一册）——生成。
 *   同步守护在 test/ownership-scan.test.js：逐字节直比。
 *
 * 属主判定 = 区段内写入次数最多的域（plurality）；并列按 domains.yml 声明序取先。
 * 跨域写入 = 写入者域 ≠ 该下标属主域 的每一次写入（含 VARSET 展开的逐下标写入），
 * 按「下标、文件、行号」排序。
 *
 * 用法：node tools/ownership-scan.js [--force] [--table <表名|all>]
 *   默认 all：写出全部产物。--table 单表时只写该表两份产物（reads-summary 是
 *   全表产物，只在 all 时写出）。扫描始终单遍过全部表（一条正则交替分支），
 *   单表与全表的耗时几乎相同。
 *   文件编码按内容判定（复用 tools/csv-to-yml.js 的 read_text）——target/ 有
 *   一个 Shift-JIS 活代码文件（調教相關/COMF90_ニプルファック.ERB）。
 */

const fs = require('node:fs');
const path = require('node:path');

const { read_text, write_product } = require('./csv-to-yml');
const { to_simplified } = require('./lang-normalize');

// 仓库根目录：tools/ 的上一级
const REPO_ROOT = path.resolve(__dirname, '..');

// 表注册（#66 落地 cflag 单表；#70 扩到全部已落地变量表）。
// dims 只用于报告分类；寻址/下标/属主逻辑一维二维同构（下标 = 寻址最后一段）。
// name_file = yml/ 名字表产物（名字下标解析用；CFlag/TFlag 是空表 = 空映射，
// 代码对这两张表也确实只用数字下标，若出现名字下标会在解析期报错）。
const TABLES = {
  // 二维角色表（寻址 = 表:角色槽:下标；槽可省略、可为括号表达式）
  cflag: { variable: 'CFLAG', dims: 2, name_file: 'CFlag.yml' },
  talent: { variable: 'TALENT', dims: 2, name_file: 'Talent.yml' },
  abl: { variable: 'ABL', dims: 2, name_file: 'Abl.yml' },
  base: { variable: 'BASE', dims: 2, name_file: 'Base.yml' },
  exp: { variable: 'EXP', dims: 2, name_file: 'Exp.yml' },
  ex: { variable: 'EX', dims: 2, name_file: 'Ex.yml' },
  mark: { variable: 'MARK', dims: 2, name_file: 'Mark.yml' },
  palam: { variable: 'PALAM', dims: 2, name_file: 'Palam.yml' },
  source: { variable: 'SOURCE', dims: 2, name_file: 'Source.yml' },
  stain: { variable: 'STAIN', dims: 2, name_file: 'Stain.yml' },
  cstr: { variable: 'CSTR', dims: 2, name_file: 'CStr.yml' },
  // 一维表
  flag: { variable: 'FLAG', dims: 1, name_file: 'Flag.yml' },
  tflag: { variable: 'TFLAG', dims: 1, name_file: 'TFlag.yml' },
  tequip: { variable: 'TEQUIP', dims: 1, name_file: 'TEquip.yml' },
  item: { variable: 'ITEM', dims: 1, name_file: 'Item.yml' },
  global: { variable: 'GLOBAL', dims: 1, name_file: 'Global.yml' },
};

const TABLE_KEYS = Object.keys(TABLES);
const VARIABLE_TO_KEY = new Map(
  TABLE_KEYS.map((key) => [TABLES[key].variable, key]),
);

// —— 域清单（ownership/domains.yml）——
//
// 手维护的输入数据，格式刻意收窄（全行注释、空行、顶层「键:」起块、块内
// 「label: 名」「dirs: 目录, 目录」或「- 文件名」），解析器只认这四种行——
// 写歪即报错，绝不静默吞掉半个域。

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

// —— 名字表（yml/ 产物 → 名字 → 下标）——

function parse_name_map(text) {
  const map = new Map();
  for (const match of text.matchAll(/^"([^"]+)"[ \t]*:\r?\n {2}id: (\d+)$/gm)) {
    map.set(match[1], Number(match[2]));
  }
  return map;
}

function load_name_maps(name_dir) {
  const maps = new Map();
  for (const key of TABLE_KEYS) {
    const file = path.join(name_dir, TABLES[key].name_file);
    if (!fs.existsSync(file)) {
      throw new Error(
        `表 ${key} 的名字表产物缺失：${path.relative(REPO_ROOT, file)}` +
          '（名字下标解析依赖它，先跑 tools/csv-to-yml.js）',
      );
    }
    maps.set(key, parse_name_map(read_text(file).text));
  }
  return maps;
}

// —— 寻址与写入判定 ——

// 段 = 括号表达式（角色槽/动态下标）或词字符（数字/标识符/CJK 名字）。
// CJK 区段覆盖名字下标（U+3000–30FF 符号假名、U+3400–4DBF 扩展 A、
// U+4E00–9FFF 基本区、U+F900–FAFF 兼容、U+FF00–FFEF 全角/半角片假名）。
const SEG = String.raw`(?:\([^)]*\)|[0-9A-Za-z_\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]+)`;

function build_addr_re(variables) {
  // 长名优先（防同尾名的交替分支顺序问题）；词边界负向后行挡住
  // EX_CFLAG/LOSEBASE/NOWEX 这类「包含表名」的其他变量。
  const alternation = [...variables]
    .sort((a, b) => b.length - a.length)
    .join('|');
  return new RegExp(
    `(?<![0-9A-Za-z_])(${alternation}):(${SEG}(?::${SEG})*)`,
    'g',
  );
}

// 赋值/复合赋值前瞻：'= 在内（字符串赋值）；== 被 [^=] 挡住
const ASSIGN_OP_RE = /^[ \t]*([-+*/|&^']|<<|>>)?=[ \t]*[^=]/;
// 后缀 ++/--（语料无前缀形态、无 1--2 算术碰撞，均负检查过）
const POSTFIX_OP_RE = /^[ \t]*(?:\+\+|--)/;

// 含非 ASCII 字符（CJK 名字下标的判定）——\p{ASCII} 属性类，免写控制字符区间
const NON_ASCII_RE = /[^\p{ASCII}]/u;

// 下标解析（纯函数，无副作用）：
//   数字 → 数字；含非 ASCII → 名字下标，归一后查名字表（查不到返回 undefined）；
//   其余（ASCII 标识符/括号）→ null（动态下标，无测量事实可归属）。
// 「查不到」与「动态」是两种不同的事实，处置策略由调用方定——
//   寻址表达式里（classify_line）：查不到 = 不是寻址（散文），整条跳过；
//   命令目标（classify_command 的 TIMES）：查不到 = 异常态，按动态计。
function resolve_index(seg, table_key, name_maps) {
  if (/^\d+$/.test(seg)) {
    return Number(seg);
  }
  if (NON_ASCII_RE.test(seg)) {
    return name_maps.get(table_key).get(to_simplified(seg));
  }
  return null;
}

// 名字查不到时记错误（errors 为 null = 注释段的容忍模式，只跳过不记）
function note_unresolved_name(errors, where, table_key, seg) {
  if (errors) {
    errors.push(
      `${where}：表 ${table_key} 的名字下标「${seg}」归一后不在名字表`,
    );
  }
}

// 命令行（VARSET/CVARSET/TIMES）：返回 [{table, indexes:[...]|null}] 或 null（目标不是落地表）。
// indexes 为 null = 表级写入（整表/动态区间：计数入总数与按域，不进下标聚合）。
function classify_command(code, name_maps, errors, where) {
  const head = /^\s*(VARSET|CVARSET|TIMES)\b[ \t]+(.*)$/.exec(code);
  if (!head) {
    return null;
  }
  const [, command, rest] = head;
  const comma = rest.indexOf(',');
  const target = (comma < 0 ? rest : rest.slice(0, comma)).trim();
  const args =
    comma < 0
      ? []
      : rest
          .slice(comma + 1)
          .split(',')
          .map((s) => s.trim());
  const variable = /^([A-Za-z_][A-Za-z0-9_]*)/.exec(target)?.[1];
  const table_key = variable && VARIABLE_TO_KEY.get(variable);
  if (!table_key) {
    return { command, target_table: null, writes: [] };
  }
  const index_part = target.includes(':')
    ? target.slice(target.lastIndexOf(':') + 1)
    : ''; // 槽位维不入测量

  if (command === 'TIMES') {
    const match = new RegExp(`^${SEG}$`).exec(index_part);
    let index = null;
    if (match) {
      index = resolve_index(match[0], table_key, name_maps);
      if (index === undefined) {
        note_unresolved_name(errors, where, table_key, match[0]);
        index = null;
      }
    }
    return {
      command,
      target_table: table_key,
      writes: [{ table: table_key, index }],
    };
  }
  // VARSET：args = [值, 起?, 止?]；CVARSET：args = [元素索引, 值, 起色?, 止?]
  if (command === 'VARSET') {
    const [start, end] = [args[1], args[2]];
    if (
      start !== undefined &&
      /^\d+$/.test(start) &&
      end !== undefined &&
      /^\d+$/.test(end)
    ) {
      const indexes = [];
      for (let i = Number(start); i < Number(end); i += 1) {
        indexes.push(i);
      }
      return {
        command,
        target_table: table_key,
        writes: [{ table: table_key, indexes }],
      };
    }
    return {
      command,
      target_table: table_key,
      writes: [{ table: table_key, index: null }],
    };
  }
  // CVARSET 表, 元素索引, 值：元素索引维即下标维
  const element = args[0];
  const index =
    element !== undefined && /^\d+$/.test(element) ? Number(element) : null;
  return {
    command,
    target_table: table_key,
    writes: [{ table: table_key, index }],
  };
}

// 单行分类（实活代码或注释段均可喂）：
//   writes: [{table, index}]（index=null 为动态/表级）
//   reads:  [{table, index}]（index=null 为动态）
// 命令行的目标表不再走通用寻址（VARSET/TIMES 的目标是写不是读）。
function classify_line(code, addr_re, name_maps, errors, where) {
  const writes = [];
  const reads = [];
  const command = classify_command(code, name_maps, errors, where);
  const command_tables = new Set(
    command?.writes.flatMap((w) => (w.table ? [w.table] : [])) ?? [],
  );
  if (command) {
    for (const entry of command.writes) {
      if ('indexes' in entry) {
        for (const index of entry.indexes) {
          writes.push({ table: entry.table, index });
        }
      } else {
        writes.push({ table: entry.table, index: entry.index });
      }
    }
  }

  addr_re.lastIndex = 0;
  let match;
  while ((match = addr_re.exec(code)) !== null) {
    const table_key = VARIABLE_TO_KEY.get(match[1]);
    if (command_tables.has(table_key)) {
      continue;
    }
    const rest = code.slice(match.index + match[0].length);
    const segments = match[2].split(':');
    const seg = segments[segments.length - 1];
    // 查不到名字 = 不是寻址（实活代码记错误、扫描末尾统一抛；注释里的
    // 「CFLAG:0が1=売却可」是散文，容忍模式直接跳过）
    const index = resolve_index(seg, table_key, name_maps);
    if (index === undefined) {
      note_unresolved_name(errors, where, table_key, seg);
      continue;
    }
    if (ASSIGN_OP_RE.test(rest) || POSTFIX_OP_RE.test(rest)) {
      writes.push({ table: table_key, index });
    } else {
      reads.push({ table: table_key, index });
    }
  }
  return { writes, reads };
}

// —— 扫描一棵 ERB 树（全部表，单遍）——
//
// 目录归属校验（后来者自动纳入）：target/ERB 的每个一级目录必须被域清单恰好
// 认领一次；ignored_files 声明的根文件必须存在（发霉即报），其内容整体跳过
// （引擎不装载 = 死代码，读写均无测量意义）。

function scan_all_tables({ erb_root, domains, name_maps }) {
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
  const missing_ignored = domains.ignored_files.filter(
    (name) => !root_files.includes(name),
  );
  if (missing_ignored.length > 0) {
    throw new Error(
      `ignored_files 声明了不存在的文件：${missing_ignored.join('、')}（数据发霉，删掉或改对）`,
    );
  }

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

  const addr_re = build_addr_re(TABLE_KEYS.map((key) => TABLES[key].variable));
  const errors = [];

  const blank_stats = () => ({
    per_index: new Map(), // 下标 → Map<域, 写入次数>
    reads_by_index: new Map(), // 下标 → Map<域, 读取次数>
    write_entries: [], // { index, domain, file, line }（含动态/表级 index=null）
    writes_by_domain: new Map(),
    reads_by_domain: new Map(),
    writes_total: 0,
    dynamic_writes: 0,
    commented_writes: 0,
    reads_total: 0,
    dynamic_reads: 0,
  });
  const per_table = new Map(TABLE_KEYS.map((key) => [key, blank_stats()]));
  const enc_counts = new Map();
  const shift_jis_files = [];

  for (const file of files) {
    const rel = path.relative(erb_root, file).split(path.sep);
    if (rel.length === 1 && ignored.has(rel[0])) {
      continue; // 死代码：引擎不装载，整体跳过
    }
    const domain_key = domains.dir_to_domain.get(rel[0]);
    const repo_rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');

    const { text, enc } = read_text(file);
    enc_counts.set(enc, (enc_counts.get(enc) ?? 0) + 1);
    if (enc === 'shift_jis') {
      shift_jis_files.push(repo_rel);
    }

    let line_no = 0;
    for (const raw_line of text.split(/\r?\n/)) {
      line_no += 1;
      const where = `${repo_rel}:${line_no}`;
      const semi = raw_line.indexOf(';');
      const code = semi >= 0 ? raw_line.slice(0, semi) : raw_line;
      const comment = semi >= 0 ? raw_line.slice(semi) : '';

      const live = classify_line(code, addr_re, name_maps, errors, where);
      for (const { table, index } of live.writes) {
        const stat = per_table.get(table);
        stat.writes_total += 1;
        if (index === null) {
          stat.dynamic_writes += 1;
        } else {
          const per = stat.per_index.get(index) ?? new Map();
          per.set(domain_key, (per.get(domain_key) ?? 0) + 1);
          stat.per_index.set(index, per);
        }
        stat.writes_by_domain.set(
          domain_key,
          (stat.writes_by_domain.get(domain_key) ?? 0) + 1,
        );
        stat.write_entries.push({
          index,
          domain: domain_key,
          file: repo_rel,
          line: line_no,
        });
      }
      for (const { table, index } of live.reads) {
        const stat = per_table.get(table);
        stat.reads_total += 1;
        stat.reads_by_domain.set(
          domain_key,
          (stat.reads_by_domain.get(domain_key) ?? 0) + 1,
        );
        if (index !== null) {
          const per = stat.reads_by_index.get(index) ?? new Map();
          per.set(domain_key, (per.get(domain_key) ?? 0) + 1);
          stat.reads_by_index.set(index, per);
        } else {
          stat.dynamic_reads += 1;
        }
      }

      // 死代码单独计数（注释里的写入），不进任何聚合；名字解析走容忍模式
      // （注释里的「TFLAG:0～30は…」是散文不是寻址，报错只会拦住整个扫描）
      for (const { table } of classify_line(
        comment,
        addr_re,
        name_maps,
        null,
        where,
      ).writes) {
        per_table.get(table).commented_writes += 1;
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `名字下标解析失败（${errors.length} 处）：\n  ${errors.join('\n  ')}`,
    );
  }

  return { files: files.length, enc_counts, shift_jis_files, per_table };
}

// —— 属主与区间（#66 裁定沿用：相邻同属主合并，未写入的下标断开）——

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

// by_domain 的排序：次数降序，并列按域声明序（与属主决胜同序）
function sort_by_domain(entries, domain_order) {
  return entries.sort(
    (a, b) =>
      b[1] - a[1] || domain_order.indexOf(a[0]) - domain_order.indexOf(b[0]),
  );
}

// —— 产物文本 ——

function to_ownership_yaml(table, ranges, domain_order, meta) {
  const lines = [
    `# 区段所有权表（${meta.variable}，${meta.dims === 2 ? '二维角色表' : '一维表'}）——由 tools/ownership-scan.js 从 target/ 实测生成（issue ${meta.ticket}）`,
    `# 本文件归人工维护：扫描器重跑默认不覆盖，需要重新生成请加 --force --table ${table}`,
    '#',
    "# 口径（v2，全表实测）：写入 = 赋值/复合赋值/字符串赋值'=/后缀++与--/TIMES/VARSET，剥除 ; 注释后的实活代码；",
    '#       名字下标归一为简体后按 yml 名字表解析；表名带词边界（EX_CFLAG 等自定义变量不算）。',
    '#       区间 = 相邻实活写入下标合并，未写入的下标无测量事实、不属任何区间。',
    '# 属主 = 区间内写入次数最多的域；并列按 ownership/domains.yml 的声明序取先者。',
    `# 实活写入 ${meta.writes_total}（动态/表级 ${meta.dynamic_writes} 未归类；注释掉的写入 ${meta.commented_writes} 另计）；`,
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

function to_cross_writes_yaml(table, cross, meta) {
  const lines = [
    `# 跨域写入清单（${meta.variable}）——由 tools/ownership-scan.js 从 target/ 实测生成（issue ${meta.ticket}）`,
    `# 本文件归人工维护：扫描器重跑默认不覆盖，需要重新生成请加 --force --table ${table}`,
    '#',
    '# 定义：写入者域 ≠ 该下标属主域 的每一次写入（含 VARSET 展开的逐下标写入），',
    '#       按「下标、文件、行号」排序。动态/表级写入无属主可比，不入本清单。',
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

// 跨域读汇总：每表一行块。跨域读 = 读 者 域 ≠ 属主域（属主来自写入侧测量；
// 无属主下标的读单列 unowned——那是「谁都不写却有人读」，多为引擎/CSV 初始化
// 或死读，不属跨域流量）。集中度：覆盖 80% 跨域读所需的下标个数。
function to_reads_summary_yaml(table_results, meta) {
  const lines = [
    `# 跨域读汇总（全部表）——由 tools/ownership-scan.js 从 target/ 实测生成（issue ${meta.ticket}）`,
    `# 本文件归人工维护：扫描器重跑默认不覆盖，需要重新生成请加 --force --table all`,
    '#',
    '# 口径：读取 = 非写入的寻址命中（比较/右值/PRINTFORM/CALL 实参），ignored 文件不计；',
    '#       跨域读 = 读取者域 ≠ 该下标属主域（#65 决议「跨域读放行」；本表只给数据）。',
    '#       by_pair 按「读取者->属主」聚合；top10_indexes 取跨域读最多的十个下标；',
    '#       indexes_covering_80pct = 覆盖 80% 跨域读所需下标数（越小越集中）。',
  ];
  for (const key of TABLE_KEYS) {
    const result = table_results.get(key);
    const { scan, owner_of_index } = result;
    lines.push(`${key}:`);
    lines.push(`  reads_total: ${scan.reads_total}`);
    lines.push(`  dynamic_reads: ${scan.dynamic_reads}`);
    let cross_total = 0;
    let unowned = 0;
    const by_pair = new Map();
    const by_index = [];
    for (const [index, per] of scan.reads_by_index) {
      const owner = owner_of_index.get(index);
      for (const [reader, count] of per) {
        if (owner === undefined) {
          unowned += count;
          continue;
        }
        if (reader !== owner) {
          cross_total += count;
          by_pair.set(
            `${reader}->${owner}`,
            (by_pair.get(`${reader}->${owner}`) ?? 0) + count,
          );
          by_index.push({ index, reader, owner, count });
        }
      }
    }
    lines.push(`  cross_domain_reads: ${cross_total}`);
    lines.push(`  unowned_index_reads: ${unowned}`);
    if (by_pair.size > 0) {
      lines.push('  by_pair:');
      for (const [pair, count] of [...by_pair.entries()].sort(
        (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1),
      )) {
        lines.push(`    ${JSON.stringify(pair)}: ${count}`);
      }
    }
    if (by_index.length > 0) {
      // 集中度在**全分布**上算（top10 只是展示切片）
      const per_index = new Map();
      for (const { index, count } of by_index) {
        per_index.set(index, (per_index.get(index) ?? 0) + count);
      }
      const sorted = [...per_index.entries()].sort(
        (a, b) => b[1] - a[1] || a[0] - b[0],
      );
      let cumulative = 0;
      let covering = 0;
      for (const [, count] of sorted) {
        if (cumulative >= cross_total * 0.8) {
          break;
        }
        cumulative += count;
        covering += 1;
      }
      lines.push('  top10_indexes:');
      for (const [index, count] of sorted.slice(0, 10)) {
        lines.push(`    ${JSON.stringify(`${index}`)}:`);
        lines.push(`      cross_reads: ${count}`);
        lines.push('      readers:');
        for (const [reader, n] of [...scan.reads_by_index.get(index).entries()]
          .filter(([reader]) => reader !== owner_of_index.get(index))
          .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))) {
          lines.push(`        ${reader}: ${n}`);
        }
      }
      lines.push(`  indexes_covering_80pct: ${covering}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

// —— 组装一次生成（读域清单 → 单遍扫描 → 每表属主/区间/跨域 → 产物文本）——

// 'all' → 全部表；否则按名取一表（或一组）。未知表名在这里统一报错。
function wanted_tables(tables) {
  const wanted = tables === 'all' ? [...TABLE_KEYS] : [tables].flat();
  for (const key of wanted) {
    if (!TABLES[key]) {
      throw new Error(
        `未知表名：${key}（支持：${TABLE_KEYS.join('、')}、all）`,
      );
    }
  }
  return wanted;
}

function generate({
  tables = TABLE_KEYS,
  domain_file,
  erb_root,
  name_dir,
} = {}) {
  wanted_tables(tables); // 只为校验：扫描始终单遍全表（见文件头注）
  const domains = parse_domains(
    read_text(domain_file ?? path.join(REPO_ROOT, 'ownership', 'domains.yml'))
      .text,
  );
  const name_maps = load_name_maps(name_dir ?? path.join(REPO_ROOT, 'yml'));
  const scan = scan_all_tables({
    erb_root: erb_root ?? path.join(REPO_ROOT, 'target', 'ERB'),
    domains,
    name_maps,
  });
  const domain_order = domains.domains.map((domain) => domain.key);

  const results = new Map();
  for (const key of TABLE_KEYS) {
    const stat = scan.per_table.get(key);
    const owner_of_index = assign_ownership(stat.per_index, domain_order);
    const ranges = merge_ranges(stat.per_index, owner_of_index);
    const cross = stat.write_entries
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
      ticket: '#70',
      variable: TABLES[key].variable,
      dims: TABLES[key].dims,
      cross_product: `${key}-cross-domain-writes.yml`,
      writes_total: stat.writes_total,
      dynamic_writes: stat.dynamic_writes,
      commented_writes: stat.commented_writes,
      live_indexes: stat.per_index.size,
      cross_count: cross.length,
    };
    results.set(key, {
      scan: stat,
      owner_of_index,
      ranges,
      cross,
      ownership_yaml: to_ownership_yaml(key, ranges, domain_order, meta),
      cross_yaml: to_cross_writes_yaml(key, cross, meta),
    });
  }

  const reads_summary_yaml = to_reads_summary_yaml(results, { ticket: '#70' });
  return { domains, scan, tables: results, reads_summary_yaml };
}

// —— CLI ——

const USAGE =
  '用法：node tools/ownership-scan.js [--force] [--table <表名|all>]（默认 all）';

function main(argv, overrides = {}) {
  let force = false;
  let table = 'all';
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--force' || arg === '-f') {
      force = true;
    } else if (arg === '--table') {
      const value = argv[i + 1];
      if (value === undefined) {
        console.error('错误：--table 需要一个参数，如 talent 或 all');
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
      tables: table,
      domain_file: overrides.domain_file,
      erb_root: overrides.erb_root,
      name_dir: overrides.name_dir,
    });
  } catch (error) {
    console.error(`错误：${error.message}`);
    return 1;
  }

  const { scan, domains } = result;
  const wanted = wanted_tables(table);
  const enc_report = [...scan.enc_counts.entries()]
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .map(([enc, count]) => `${enc} ${count}`)
    .join(' / ');
  console.log(
    `[ownership-scan] 扫描 ${scan.files} 个源文件（${enc_report}），表 ${wanted.join('、')}`,
  );
  const label_of = (key) =>
    domains.domains.find((d) => d.key === key)?.label ?? key;
  for (const key of wanted) {
    const stat = scan.per_table.get(key);
    const table_result = result.tables.get(key);
    const writers = [...stat.writes_by_domain.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([domain, count]) => `${domain}(${label_of(domain)}) ${count}`)
      .join(' / ');
    console.log(
      `[ownership-scan] ${TABLES[key].variable}：写入 ${stat.writes_total}（动态/表级 ${stat.dynamic_writes}、注释 ${stat.commented_writes}）· 读取 ${stat.reads_total} · 下标 ${stat.per_index.size} → 区间 ${table_result.ranges.length} · 跨域写 ${table_result.cross.length}`,
    );
    if (writers) {
      console.log(`[ownership-scan]   按域写入：${writers}`);
    }
  }

  const out_dir = overrides.out_dir ?? path.join(REPO_ROOT, 'ownership');
  const reports = [];
  for (const key of wanted) {
    reports.push(
      write_product(
        path.join(out_dir, `${key}-ownership.yml`),
        result.tables.get(key).ownership_yaml,
        {
          force,
        },
      ),
    );
    reports.push(
      write_product(
        path.join(out_dir, `${key}-cross-domain-writes.yml`),
        result.tables.get(key).cross_yaml,
        { force },
      ),
    );
  }
  if (table === 'all') {
    reports.push(
      write_product(
        path.join(out_dir, 'reads-summary.yml'),
        result.reads_summary_yaml,
        {
          force,
        },
      ),
    );
  }
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
  TABLE_KEYS,
  assign_ownership,
  build_addr_re,
  classify_command,
  classify_line,
  generate,
  load_name_maps,
  main,
  merge_ranges,
  parse_domains,
  parse_name_map,
  resolve_index,
  scan_all_tables,
  to_cross_writes_yaml,
  to_ownership_yaml,
  to_reads_summary_yaml,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
