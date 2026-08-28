/**
 * @file 口上离线转译器原型（issue #107，prototype 票——不是生产级交付）。
 *
 * 目的：拿真实口上文件跑出「产物长什么样」，让 #107 的五个问题变成可讨论的
 * 实物。本文件是**原型**：覆盖范围刻意窄（针对 21 个口上文件的实际形态），
 * 不做全 ERB 方言支持；跑不通的形态一律报 REVIEW 标记，绝不静默产出。
 *
 * == 三个已知缺陷的正面处理（#8 实测） ==
 *
 *  1. PRINT 六种变体（技能 emuera-basic-agent-guide 的 PRINT 语法）：
 *        PRINT(FORM|FORMS|V|S)(K|D)?(L|W|N)? —— 本原型只处理口上文件里
 *        实际出现的子集，映射如下（保真锁 test/kojo-text-fidelity.test.js
 *        只认 print/printAndWait 两种，其余变体出现即红）：
 *          PRINTFORMW → await era.printAndWait('…')  （打印 + 换行 + 等待）
 *          PRINTFORML  → await era.print('…')        （打印 + 换行）
 *          PRINTFORM   → await era.print('…')        （打印，不换行）
 *          PRINTL      → await era.print('…')
 *          PRINT       → await era.print('…')
 *          PRINTW      → await era.printAndWait('…')
 *        无后缀（PRINTFORM/PRINT）的「不换行」语义靠连续 print 自然表达：
 *        相邻多行会拼接成一段，与 ERB 行为一致，不需要补 println（println
 *        会被保真锁 A 报为未覆盖的输出 API）。W/L 之别是行为（排版节奏），
 *        不是可观测文本——保真锁逐行锚对 W/L，转译器照此映射即锁可过。
 *
 *  2. 行尾空格：ERB 的 PRINTFORM 行尾空格是有意义的（#8 实测 194 行）。
 *        行尾空格在 ERB 渲染进文本，删除会改变输出；本原型对 PRINT 系
 *        参数**原样保留**行尾空格（不 trim 文本内容）。
 *
 *  3. RESULT 全局返回槽：Emuera 的函数返回值不是 return，而是调用后写
 *        RESULT 变量；口上文件里 `RETURN 0` / `RETURN 1` 后的实际返回值由
 *        后续调用方读 RESULT 决定。本原型把 `RETURN n` 转成 `return n;`
 *        （JS 返回值），并给 RESULT 的**写入**（`RESULT = …`）做 REVIEW
 *        标记——口上文件里 RESULT 写入极少（K3/K5 均无），出现即待人工
 *        决定映射（JS 侧没有全局返回槽的等价物，需要按调用方语义改）。
 *
 * == 注释保留（#8：29,724 行注释是理解语义的主要依据） ==
 *
 * ERB 注释（; 行）按「原样保留为 JS 注释 + 溯源锚」落进产物：
 *   单行注释 → // <内容>（原样保留）；文件头的连片注释块归入函数头注释。
 *
 * == 结构映射（ERB 块由关键字界定，缩进不可靠） ==
 *
 * 用 IF / ELSEIF / ELSE / ENDIF 关键字栈解析，绝不依赖缩进（K5 源里
 * 存在顶格写但语义在 IF 分支内的语句——K5 :105 的 `CFLAG:201 = 1`）。
 * SIF（单行 IF）用独立栈：`SIF cond` 的体是下一个语句（Emuera 语义），
 * 嵌套 SIF 展开成嵌套 if 块。
 *
 * == 编码判定（issue #10 陷阱一，与 csv-to-yml.js 同逻辑） ==
 *
 *   BOM → 严格 UTF-8 校验 → Shift-JIS 兜底（TextDecoder('shift_jis')）。
 *   target/ERB/調教相關/COMF90_ニプルファック.ERB 是 Shift-JIS 且是活代码。
 *
 * == 简体归一（issue #60） ==
 *
 * 产物文本在转译期接 tools/lang-table.js 归一为简体（唯一真相源）。与
 * tools/lang-normalize.js 的 convert_source 不同：convert_source 跳过含
 * 转义序列的字面量，而 ERB 文本里 \ 是合法字符，必须逐文本段直接
 * to_simplified——归一发生在**拼字面量之前**，无转义序列参与。
 *
 * == 用法 ==
 *
 *   node tools/kojo-transpiler.js <源.ERB> <输出.js>
 *   node tools/kojo-transpiler.js --list   ; 列出 21 个口上文件
 *   node tools/kojo-transpiler.js --all    ; 全部转译到 products/ 下
 *
 * 产物边界（#10 问 4 的推荐）：默认不覆盖已存在的产物，--force 才重写。
 * 复核标记用 REVIEW 注释，产物里的 REVIEW 计数写进文件头，复核 agent
 * 按行号定位；复核成果存放（问 3 的机制）见产物头注与 #107 评论。
 *
 * 零第三方依赖（与 tools/ 其他脚本一致；Node >= 18 的 TextDecoder）。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { TextDecoder } = require('node:util');
const { to_simplified } = require('./lang-normalize');
const { get_name } = require('./facade-names');
const KOJO_DIR = path.join(__dirname, '..', 'target', 'ERB', '口上');

/** 21 个口上文件（EVENT_K20_琼 是 0 字节空文件，原型里也处理它） */
const KOJO_FILES = (() => {
  const files = fs.readdirSync(KOJO_DIR).filter((f) => f.endsWith('.ERB'));
  files.sort();
  return files;
})();

/**
 * 源文件名 → 产物文件名映射（裁定二：#107 形态裁定）。
 * 产物文件名一律 ASCII kebab-case，描述部分意译成英文单词（非罗马音）；
 * 人名无对应英文词用拉丁转写。未登记的文件名显式报错，不静默回落。
 */
const KOJO_OUTPUT_NAME = {
  'EVENT_K0_慈愛.ERB': 'kojo-k0-tender.js',
  'EVENT_K1_自信家.ERB': 'kojo-k1-confident.js',
  'EVENT_K2_気弱.ERB': 'kojo-k2-timid.js',
  'EVENT_K3_高貴.ERB': 'kojo-k3-noble.js',
  'EVENT_K4_冷徹.ERB': 'kojo-k4-stoic.js',
  'EVENT_K5_マオ.ERB': 'kojo-k5-mao.js',
  'EVENT_K6_悪女.ERB': 'kojo-k6-wicked.js',
  'EVENT_K7_ハート.ERB': 'kojo-k7-heart.js',
  'EVENT_K8_スペード.ERB': 'kojo-k8-spade.js',
  'EVENT_K9_ダイヤ.ERB': 'kojo-k9-diamond.js',
  'EVENT_K10_クラブ.ERB': 'kojo-k10-club.js',
  'EVENT_K11_リリィ.ERB': 'kojo-k11-lily.js',
  'EVENT_K12_知的.ERB': 'kojo-k12-intellectual.js',
  'EVENT_K13_庇護者.ERB': 'kojo-k13-protector.js',
  'EVENT_K14_貴公子.ERB': 'kojo-k14-nobleman.js',
  'EVENT_K15_伶俐.ERB': 'kojo-k15-clever.js',
  'EVENT_K19_菲娅.ERB': 'kojo-k19-fia.js',
  'EVENT_K20_琼 ver1.0.0.ERB': 'kojo-k20-qiong.js',
  'EVENT_K902_普林希丝 ver1.0.3.ERB': 'kojo-k902-princess.js',
  'EVENT_K903_嘉德.ERB': 'kojo-k903-garde.js',
  'EVENT_K904_菲娅.ERB': 'kojo-k904-fia.js',
  'EVENT_F1_丽塔.ERB': 'kojo-f1-rita.js',
  // #183（H14 迷宫凌辱男性对象）：迷宫目录的口上型文件，与口上同构
  // （带文本的状态机）。产物名沿用 ASCII 意译（dungeon + ravish-man），
  // 与口上的 kojo-[kf] 命名族并存。
  'DUNGEON_RYOUZYOKU_MAN.ERB': 'kojo-dungeon-ravish-man.js',
};

/**
 * 口上型非口上文件（#184 起）：与 ERB/口上/ 同构、走同一转译流程，但源文件
 * 不在口上目录。`--all` 也转这些文件（产物落 products/kojo/，能被复现）。
 * 数组元素 = [源文件相对仓库根的路径, 产物文件名]。
 */
const KOJO_EXTRA_FILES = [
  ['target/ERB/迷宮/DUNGEON_BITCH.ERB', 'dungeon-bitch.js'],
];

/**
 * 源文件名 → 产物文件名。未登记显式抛错（不静默回落成原名）。
 * @param {string} erb_filename 源文件名（target/ERB/口上/ 或 KOJO_EXTRA_FILES）
 */
function output_name_for(erb_filename) {
  const mapped = KOJO_OUTPUT_NAME[erb_filename];
  if (mapped) {
    return mapped;
  }
  const extra_hit = KOJO_EXTRA_FILES.find(
    ([src]) => path.basename(src) === erb_filename,
  );
  if (extra_hit) {
    return extra_hit[1];
  }
  throw new Error(
    `未登记的口上文件：${erb_filename}——须在 tools/kojo-transpiler.js 的 KOJO_OUTPUT_NAME 或 KOJO_EXTRA_FILES 补映射（裁定二：产物文件名 ASCII kebab-case）`,
  );
}
/**
 * PRINT 系命令词。group1 = 命令前缀（PRINT/PRINTL/PRINTW/PRINTFORM/…），
 * group2 = FORMS 变体，group3 = L/W/N 后缀，group4 = 参数。
 * 只覆盖口上文件实际出现的子集；PRINTC/PRINTDATA/PRINTBUTTON 等出现即
 * 落入「未知语句」REVIEW（口上文件里极少见）。
 */
/**
 * PRINT 系命令词。group1 = 命令前缀，group2 = FORM|FORMS 子组，
 * group3 = (K|D)?，group4 = (L|W|N)?，group5 = 参数（**保留行尾空格**）。
 * 在原始行（含行首缩进）上匹配，参数原样进产物——行尾空格是有意义的
 * （#8 实测 194 行）。只覆盖口上文件实际出现的子集；PRINTC/PRINTDATA/
 * PRINTBUTTON 等出现即落入「未知语句」REVIEW。
 */
const PRINT_RE =
  /^\s*(PRINT(FORM|FORMS)?V?S?|PRINTV|PRINTS)(K|D)?(L|W|N)?\s*(.*)$/;

/** ERB 结构关键字（行首 token；块由关键字界定，与缩进无关） */
const BLOCK_RE = /^\s*(IF|ELSEIF|ELSE|ENDIF)\b/i;

/** SELECTCASE 结构（switch 等价物）：SELECTCASE expr / CASE n / CASEELSE / ENDSELECT */
const SCASE_RE = /^\s*SELECTCASE\b/i;
const SCASE_CASE_RE = /^\s*CASE(ELSE)?\b/i;
const SCASE_END_RE = /^\s*ENDSELECT\b/i;
const SIF_RE = /^\s*SIF\b/;
const AT_RE = /^\s*@/;
const HASH_RE = /^\s*#(PRI|LATER|DIM|DIMS|FUNCTION|FUNCTIONS)\b/;
/** 编码判定（与 csv-to-yml.js 相同：BOM → 严格 UTF-8 → Shift-JIS） */
function read_text(file) {
  const buf = fs.readFileSync(file);
  if (
    buf.length >= 3 &&
    buf[0] === 0xef &&
    buf[1] === 0xbb &&
    buf[2] === 0xbf
  ) {
    return { text: buf.slice(3).toString('utf8'), enc: 'utf8-bom' };
  }
  const as_utf8 = buf.toString('utf8');
  if (Buffer.compare(Buffer.from(as_utf8, 'utf8'), buf) === 0) {
    return { text: as_utf8, enc: 'utf8' };
  }
  return { text: new TextDecoder('shift_jis').decode(buf), enc: 'shift_jis' };
}

/** 行首（去空白）以 ; 开头 → 整行注释（返回去掉 ; 的内容） */
function split_comment(line) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith(';')) {
    return { is_comment: true, comment: trimmed.slice(1) };
  }
  return { is_comment: false };
}

/** 溯源锚：ERB 行号 → JS 尾注（保真锁的锚绑定路径） */
function anchor(line_no) {
  return ` // :${line_no}`;
}

/** 把 ERB 插值 %…% 换成 JS 模板 ${…}，未知插值 REVIEW */
function interpolate_to_js(text, line_no, review_notes) {
  // 内置插值名 → JS 表达式（保真锁 JS_TOKEN_RULES 认识这些名）
  const MAP = {
    'SAVESTR:TARGET': 'target_name',
    'SAVESTR:PLAYER': 'player_name',
    'SAVESTR:ASSI': 'assi_name',
    'NAME:MASTER': 'master_name',
    'SELF_CALL(TARGET)': 'sc()',
    'SELF_CALL_FIRST(TARGET)': 'scf()',
  };
  return text.replace(/%([^%]+)%/g, (whole, inner) => {
    const key = inner.trim();
    if (MAP[key] !== undefined) {
      return `\${${MAP[key]}}`;
    }
    // UNICODE(0x2661) *n → heart(n)（保真锁 JS 侧 heart(1)）
    const heart = inner.match(/^UNICODE\(0x2661\)\s*\*(\d+)$/);
    if (heart) {
      return `\${heart(${heart[1]})}`;
    }
    review_notes.push({
      kind: '插值',
      line: line_no,
      msg: `未知插值 %${inner}% —— 保真锁会红，须人工定归一`,
    });
    return whole; // 原样留，REVIEW 报
  });
}

/** 把 ERB 文本行转成 JS 模板字符串字面量（含插值） */
function text_to_js(text, line_no, review_notes) {
  const interpolated = interpolate_to_js(text, line_no, review_notes);
  let js = interpolated;
  js = js.replace(/\\/g, '\\\\');
  js = js.replace(/`/g, '\\`');
  // 插值外的 ${ 是 ERB 的字面量：先提取所有 ${…} 插值，转义其它 ${ 后再还原。
  const interps = [];
  let buf = '';
  let i = 0;
  while (i < js.length) {
    const start = js.indexOf('${', i);
    if (start < 0) {
      buf += js.slice(i);
      break;
    }
    buf += js.slice(i, start);
    const end = js.indexOf('}', start);
    if (end < 0) {
      buf += js.slice(start);
      break;
    }
    const inner = js.slice(start + 2, end);
    const ph = `\u0002${interps.length}\u0002`;
    interps.push(`\${${inner}}`);
    buf += ph;
    i = end + 1;
  }
  buf = buf.split('${').join('\\${');
  interps.forEach((v, k) => {
    buf = buf.split(`\u0002${k}\u0002`).join(v);
  });
  js = buf;
  return js;
}

/**
 * 单个 PRINT 行 → JS 输出语句。
 * @returns {string[]} JS 行数组
 */
function emit_print(kind, arg, line_no, review_notes) {
  if (arg.includes(';')) {
    review_notes.push({
      kind: 'PRINT参数含;',
      line: line_no,
      msg: `PRINT 参数含行内 ;（可能是注释或文本，人工定）：${arg}`,
    });
  }
  const text = normalize_text(arg);
  // 归一后残留 REVIEW：假名（日文）必然非简体，表内繁体已被归一，
  // 表外繁体（如 K5 的「贖」）简体锁抓不到，这里 REVIEW 交复核 agent。
  const kana = [...text].filter((ch) =>
    /[\u3041-\u30FF\uFF66-\uFF9F]/.test(ch),
  );
  if (kana.length > 0) {
    review_notes.push({
      kind: '假名残留',
      line: line_no,
      msg: `归一后仍含日文假名：${[...new Set(kana)].join('')} —— 查 lang-table 是否应收`,
    });
  }
  const js_text = text_to_js(text, line_no, review_notes);
  const wait = /W$/.test(kind);
  const call = wait ? 'era.printAndWait' : 'era.print';
  const content = js_text.length > 0 ? `\`${js_text}\`` : "''";
  return [`await ${call}(${content});${anchor(line_no)}`];
}

/** 归一（简体），原样保留行尾空格（#8：行尾空格有意义） */
function normalize_text(raw) {
  return to_simplified(raw);
}

/**
 * 角色变量族（二维：角色:下标）。引擎字符串寻址需完整三段
 * （`cflag:${角色}:${下标}`）——Emuera 的 `CFLAG:301`（省略角色维）语义
 * 是 TARGET，而引擎的 `cflag:301`（两段）实测落到角色 0（见 #107 裁定后
 * 的引擎实证），所以转译器必须显式补角色维，不能直接抄两段。
 */
const CHARA_VAR_FAMILIES = new Set([
  'CFLAG',
  'CDFLAG',
  'TALENT',
  'MARK',
  'ABL',
  'BASE',
  'EXP',
  'PALAM',
  'SOURCE',
  'STAIN',
  'EX',
  'TEQUIP',
  'RELATION',
  'JUEL',
  'MAXBASE',
  'EX_TALENT',
  'EX_FLAG',
]);

/** 一维变量（直接 flag:N） */
const PLAIN_VAR_FAMILIES = new Set(['FLAG', 'TFLAG', 'GLOBAL']);

/**
 * ERB 角色号 token → JS 变量名。TARGET 是口上语境默认角色；A/COUNT 等
 * 是函数局部变量（转译器在函数头声明）；ASSI/PLAYER/MASTER 是引擎常量。
 * 角色号本身也是寻址的一部分，转成 JS 后由复核 agent 确认取值。
 */
const ROLE_TOKEN_JS = {
  TARGET: 'target',
  MASTER: 'master',
  ASSI: 'assi',
  PLAYER: 'player',
  A: 'a',
  COUNT: 'count',
  ARG: 'arg',
  LOCAL: 'local',
  LCOUNT: 'lcount',
};

/**
 * 表达式里的 ERB 寻址 token → JS 表达式（era.get 调用串）。
 *
 * 纯语法转换：下标原样保留（数字 / 角色号 / 表达式），不猜语义。
 * 角色变量族补全为三段（缺角色维 = TARGET，Emuera 语义）；RAND / 字符串
 * 变量等 JS 无等价物的 REVIEW 提示。
 *
 * @param {string} expr ERB 表达式（条件 / 赋值右侧 / RETURN 值）
 * @param {number} line_no 溯源行号
 * @param {Array} review_notes REVIEW 收集
 * @returns {string} 转换后的 JS 表达式
 */
function convert_expr(expr, line_no, review_notes) {
  let out = expr;
  // 0) 表达式下标（角色变量族/一维的括号表达式下标）：CFLAG:(ARG:0):533 /
  //    FLAG:(CFLAG:ARG:501 + 349) —— ERB 允许下标是括号表达式。必须**先于**
  //    角色变量族转换（否则内部的 CFLAG:ARG:501 先被转成 era.get(...)，括号
  //    匹配就乱了，#184：DUNGEON_BITCH.ERB:823/:1028）。角色维/一维的归属
  //    与内部寻址由复核 agent 核（内部寻址随后续步骤转换）。
  out = out.replace(
    // RAND 是伪变量（随机数），不是变量族，留给 4a 的 rand_n 处理——这里
    // 显式排除，避免把 RAND:(expr) 误判成 era.get('rand:...')（#184）
    /\b(?!RAND\b)([A-Z][A-Z0-9_]*):\(([^)]*)\)(?::([0-9]+))?/g,
    (whole, fam, role_expr, tail_idx) => {
      review_notes.push({
        kind: '表达式下标',
        line: line_no,
        msg: `${whole} —— 括号表达式下标（${fam}），人工核角色维/一维归属`,
      });
      if (CHARA_VAR_FAMILIES.has(fam)) {
        return `era.get(\`${fam.toLowerCase()}:\${${role_expr}}:${tail_idx ?? '0'}\`)`;
      }
      // 一维族：括号内容作为模板插值（内部寻址由后续步骤继续转换）
      return `era.get(\`${fam.toLowerCase()}:\${${role_expr}}${tail_idx ? `:${tail_idx}` : ''}\`)`;
    },
  );
  // 1) 角色变量族：CFLAG:301 / CFLAG:TARGET:301 / CFLAG:A:504 / CFLAG:COUNT:1
  //    角色维缺省 → TARGET（Emuera 语义）；显式角色 → 对应 JS 变量
  for (const fam of CHARA_VAR_FAMILIES) {
    const lower = fam.toLowerCase();
    const re = new RegExp(
      `\\b${fam}(?::([A-Za-z_][A-Za-z0-9_]*))?:([A-Za-z0-9_\u4e00-\u9fff]+)`,
      'gi',
    );
    out = out.replace(re, (whole, role, idx) => {
      const role_js = role
        ? (ROLE_TOKEN_JS[role] ?? `review_role_${role}`)
        : 'target';
      if (role && !ROLE_TOKEN_JS[role]) {
        review_notes.push({
          kind: '角色号',
          line: line_no,
          msg: `角色维 ${role} 无 JS 映射（${whole}）——人工定`,
        });
      }
      return `era.get(\`${lower}:\${${role_js}}:${idx}\`)`;
    });
  }
  // 2) 一维变量：FLAG:7 / TFLAG:899 / GLOBAL:3
  for (const fam of PLAIN_VAR_FAMILIES) {
    const lower = fam.toLowerCase();
    const re = new RegExp(`\\b${fam}:([A-Za-z0-9_]+)`, 'gi');
    out = out.replace(re, (whole, idx) => `era.get('${lower}:${idx}')`);
  }
  // 3) 函数参数 / 局部变量：ARG:n / LOCAL:n / COUNT:n / LCOUNT:n →
  //    JS 局部变量（arg_n / local_n …），REVIEW 提示形参名人工定
  out = out.replace(
    /\b(ARG|LOCAL|COUNT|LCOUNT):([A-Za-z0-9_]+)\b/g,
    (whole, fam, idx) => {
      review_notes.push({
        kind: '局部参数',
        line: line_no,
        msg: `${whole} → ${fam.toLowerCase()}_${idx}（JS 局部变量，形参名人工定）`,
      });
      return `${fam.toLowerCase()}_${idx}`;
    },
  );
  // 3a) NO:X —— 角色编号属性（ere 以角色 ID = 原作 NO 寻址，
  //     ere/chara/chara-make.js:19 先例）。转成合法占位 + REVIEW。
  out = out.replace(/\bNO:([A-Za-z_][A-Za-z0-9_]*)\b/g, (whole, role) => {
    const role_js = ROLE_TOKEN_JS[role] ?? `review_role_${role}`;
    review_notes.push({
      kind: 'NO属性',
      line: line_no,
      msg: `${whole} → 角色 ${role_js} 的 ID（ere 角色 ID = 原作 NO，直接对应 JS 角色变量）`,
    });
    return `(${role_js})`;
  });
  // 3b) 单值全局变量（引擎运行时单值，非静态表寻址）：映射到既有门面
  //     era_flag（语法形态——落哪个域由复核 agent 定，这里只保证可读可查）
  const SINGLE_VALUE_GLOBALS = {
    SELECTCOM: 'era_flag.selectcom',
    ASSI: 'era_flag.assi',
    ASSIPLAY: 'era_flag.assiplay',
    PLAYER: 'era_flag.player',
    TARGET: 'era_flag.target',
    TIME: 'era_flag.time',
    PREVCOM: 'era_flag.prevcom',
    NEXTCOM: 'era_flag.nextcom',
  };
  for (const [erb_name, js_expr] of Object.entries(SINGLE_VALUE_GLOBALS)) {
    const re = new RegExp(`\\b${erb_name}\\b(?!\\s*:)`, 'g');
    out = out.replace(re, js_expr);
  }
  // 4) RAND:n —— 随机数，JS 无 RAND 变量，转成 rand_n(n) 调用（REVIEW 提示
  //    需注入随机源，参照 ere/kojo/kojo-k5.js 的 rand 参数）
  // 4a) RAND:(expr) —— 随机数的表达式下标形态（Emuera 同款，见 DUNGEON_BITCH
  //    :27 等）。原型只覆盖 RAND:<数字>，表达式形态静默漏出成 JS 语法错——
  //    这里一并转 rand_n(expr)（#184 修）。转的是括号内的表达式，expr 里
  //    的寻址随后续步骤（角色变量族等）继续转换。
  const rand_expr_re = /\bRAND:\(([^)]*)\)/g;
  out = out.replace(rand_expr_re, (whole, inner) => {
    review_notes.push({
      kind: 'RAND',
      line: line_no,
      msg: `RAND:(${inner}) → rand_n(${inner})——随机源需注入（参照 kojo-k5.js 的 rand 参数）`,
    });
    return `rand_n(${inner})`;
  });
  out = out.replace(/\bRAND:([0-9]+)\b/g, (whole, n) => {
    review_notes.push({
      kind: 'RAND',
      line: line_no,
      msg: `RAND:${n} → rand_n(${n})——随机源需注入（参照 kojo-k5.js 的 rand 参数）`,
    });
    return `rand_n(${n})`;
  });
  // 4a2) RAND(min, max) —— 双参数形态（emuera-basic-agent-guide
  //     in-expression-functions.md:96：`int RAND(int min(, int max))`，
  //     双参数返回 [min, max)）。RAND(a, b) = a + rand_n(b - a)。
  //     口上文件少见但存在（DUNGEON_BITCH.ERB:34/:447/:455/:579/:589）。
  out = out.replace(
    /\bRAND\(\s*([^,()]+)\s*,\s*([^()]+)\)/g,
    (whole, min, max) => {
      review_notes.push({
        kind: 'RAND',
        line: line_no,
        msg: `RAND(${min}, ${max}) → ${min} + rand_n(${max} - ${min})——随机源需注入（参照 kojo-k5.js 的 rand 参数）`,
      });
      return `(${min} + rand_n(${max} - ${min}))`;
    },
  );
  // 4) 其它寻址族（字符串变量 / 派生变量）：SAVESTR / NAME / CSTR / ITEM /
  //    NOWEX / PALAMLV / MAXBASE / TSTR / LOCALS / ARGS / UP / DELTA 等。
  //    一律转成 era.get('<族小写>:<下标>') 的合法语法（保 node --check 过），
  //    语义是否成立留给复核 agent（这些族的引擎字符串寻址未必等价 ERB）。
  const OTHER_FAMILIES = [
    'SAVESTR',
    'NAME',
    'CSTR',
    'TSTR',
    'ITEM',
    'NOWEX',
    'PALAMLV',
    'LOCALS',
    'ARGS',
    'UP',
    'DELTA',
    'DELTABASE',
  ];
  for (const fam of OTHER_FAMILIES) {
    const lower = fam.toLowerCase();
    const re = new RegExp(`\\b${fam}:([A-Za-z0-9_]+)`, 'gi');
    out = out.replace(re, (whole, idx) => {
      review_notes.push({
        kind: '表达式寻址',
        line: line_no,
        msg: `${whole} → era.get('${lower}:${idx}')——族名直译，语义与归属人工定`,
      });
      return `era.get('${lower}:${idx}')`;
    });
  }
  // 4b) 表达式下标已在步骤 0 处理（必须先于角色变量族，见 convert_expr 头）
  // 4c) 数组局部变量元素：PLAY:LOCAL / PREV_EXP:LCOUNT / MAN:1 / GIRL:3 /
  //     PLAY:6 —— ERB 的 #DIM X, N 数组的局部变量下标。转译器原样漏出成
  //     JS 语法错（#184）。转成 x_i 形式的下标访问占位 + REVIEW（JS 侧
  //     数组形态由复核 agent 定：局部数组在函数头用 Array 声明，元素访问
  //     即 arr[i]）。
  out = out.replace(
    /\b([A-Z][A-Z0-9_]*):([A-Za-z0-9_]+)\b/g,
    (whole, fam, idx) => {
      // 下标若是已知局部变量 token（LCOUNT/COUNT/LOCAL/ARG），转小写
      const idx_js = ROLE_TOKEN_JS[idx] ?? idx;
      review_notes.push({
        kind: '数组元素',
        line: line_no,
        msg: `${whole} —— 局部数组元素（#DIM ${fam}），JS 侧用 ${fam.toLowerCase()}[${idx_js}] 访问，人工核`,
      });
      return `${fam.toLowerCase()}[${idx_js}]`;
    },
  );
  // 5) 赋值目标（左值）由 emit_assign 单独处理，这里只处理表达式右侧；
  //    但条件里可能出现 `CFLAG:301 == 0` 这类整式，已由上面转换。
  return out;
}

/**
 * 一条非 PRINT 的语句 → 结构化对象。
 * 机械转换只覆盖口上文件实际出现的子集；超出即 REVIEW。
 */
function emit_statement(raw, line_no, review_notes) {
  const trimmed = raw.trim();
  if (SIF_RE.test(trimmed)) {
    const cond = convert_expr(
      trimmed.replace(/^\s*SIF\s+/i, ''),
      line_no,
      review_notes,
    );
    return { kind: 'sif', cond };
  }
  if (/^RETURN\b/i.test(trimmed)) {
    const value = convert_expr(
      trimmed.replace(/^RETURN\s*/i, '').trim() || '0',
      line_no,
      review_notes,
    );
    return { kind: 'return', value };
  }
  if (/^CALL\b/i.test(trimmed)) {
    const fn = trimmed.replace(/^CALL\s+/i, '');
    review_notes.push({
      kind: 'CALL',
      line: line_no,
      msg: `${fn} —— 口上文件里多为存根调用，人工定存根名`,
    });
    return { kind: 'call', fn };
  }
  if (/^DRAWLINE\b/i.test(trimmed)) {
    return { kind: 'drawline' };
  }
  // 赋值：X = expr / X:idx = expr / X += n / X -= n（口上大量 CFLAG 推进）
  const assign = /^([A-Z][A-Z0-9_]*)(?::([^=]+))?\s*(\+=|-=|=)\s*(.*)$/.exec(
    trimmed,
  );
  if (assign) {
    const [, var_name, idx, op, expr] = assign;
    return { kind: 'assign', var_name, idx, op, expr };
  }
  if (/^RESULT\b/.test(trimmed)) {
    review_notes.push({
      kind: 'RESULT',
      line: line_no,
      msg: `${trimmed} —— RESULT 全局返回槽在 JS 侧无等价物，人工定`,
    });
    return { kind: 'raw', raw: trimmed };
  }
  review_notes.push({
    kind: '未知语句',
    line: line_no,
    msg: trimmed,
  });
  return { kind: 'raw', raw: trimmed };
}

/** （CHARA_VAR_FAMILIES / PLAIN_VAR_FAMILIES 定义见文件前部 convert_expr 前） */
/**
 * 赋值语句 → JS（机械映射 era.set / era.add + 语义注释）。
 *
 * 左值寻址与 convert_expr 同一套规则（角色变量族补全三段、一维直写）；
 * 右值过 convert_expr（表达式里的寻址一并转换）。变量语义（落哪个门面
 * 域）留给复核 agent，按 #71「跨域写走门面」处理——产物头注会写明。
 */
function emit_assign(stmt, line_no, review_notes) {
  const { var_name, idx, op, expr } = stmt;
  const family = var_name;
  const index = idx ? idx.trim() : null;
  let target_expr;
  if (CHARA_VAR_FAMILIES.has(family)) {
    // 左值：CFLAG:301 → cflag:${target}:301；CFLAG:A:504 → cflag:${a}:504
    const m = /^([A-Za-z_][A-Za-z0-9_]*):(.+)$/.exec(index ?? '');
    const role = m ? m[1] : null;
    const idx_part = m ? m[2] : index;
    const role_js = role
      ? (ROLE_TOKEN_JS[role] ?? `review_role_${role}`)
      : 'target';
    if (role && !ROLE_TOKEN_JS[role]) {
      review_notes.push({
        kind: '角色号',
        line: line_no,
        msg: `角色维 ${role} 无 JS 映射（${family}:${index}）——人工定`,
      });
    }
    target_expr = `\`${family.toLowerCase()}:\${${role_js}}:${idx_part}\``;
  } else if (PLAIN_VAR_FAMILIES.has(family)) {
    target_expr = `'${family.toLowerCase()}:${index ?? ''}'`;
  } else if (family === 'UP') {
    // UP:idx 是 PALAM 的临时增量（Emuera 每回合清空），JS 侧无直接等价物
    review_notes.push({
      kind: 'UP变量',
      line: line_no,
      msg: `UP:${index} —— 临时增量，JS 侧无直接等价物，人工定`,
    });
    return [`// 赋值 ${trim_stmt(stmt)}${anchor(line_no)}`];
  } else if (/^[A-Z]$/.test(family)) {
    // 单字母局部变量（P/A 等）：JS 局部变量，声明由函数头处理
    review_notes.push({
      kind: '局部变量',
      line: line_no,
      msg: `${var_name}${index ? ':' + index : ''} ${op} ${expr} —— 单字母局部变量，JS 侧声明与赋值人工定`,
    });
    return [`// 赋值 ${trim_stmt(stmt)}${anchor(line_no)}`];
  } else {
    // LOCAL / ARG / 自定义变量 → REVIEW
    review_notes.push({
      kind: '变量语义',
      line: line_no,
      msg: `${var_name}${index ? ':' + index : ''} ${op} ${expr} —— 局部/自定义变量，人工映射`,
    });
    return [`// 赋值 ${trim_stmt(stmt)}${anchor(line_no)}`];
  }
  const method = op === '=' ? 'set' : 'add';
  const value =
    op === '-='
      ? `-(${convert_expr(expr, line_no, review_notes)})`
      : convert_expr(expr, line_no, review_notes);
  const js_expr = `${target_expr}, ${value}`;
  return [
    `// ${trim_stmt(stmt)}（变量语义：${family} 族，${index ?? '当前角色'}）${anchor(line_no)}`,
    `era.${method}(${js_expr});${anchor(line_no)}`,
  ];
}

function trim_stmt(stmt) {
  const idx = stmt.idx ? `:${stmt.idx}` : '';
  return `${stmt.var_name}${idx} ${stmt.op} ${stmt.expr}`;
}

/**
 * 主转译：ERB 文本 → JS 产物（含 REVIEW 标记）。
 * @returns {{ code: string, reviews: Array, stats: Object }}
 */
function transpile(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  const review_notes = [];
  const stats = {
    total_lines: lines.length,
    comment_lines: 0,
    print_lines: 0,
    review_count: 0,
    function_count: 0,
    if_count: 0,
    assign_count: 0,
  };

  // 块栈：{type: 'if'|'elseif'|'else', indent, kw_line}
  const stack = [];
  // switch 栈：{type: 'switch'|'case'|'caseelse', indent, kw_line}
  const switch_stack = [];
  // SIF 栈：等待体的 SIF 条件（SIF cond 的体是下一个语句，可嵌套）
  const sif_stack = [];
  let indent = 0;
  let current_function = null;
  let function_header = []; // @ 函数前的注释块
  const function_seen = new Set(); // 已见过的函数名（ERB 多重定义检测）
  let seen_code = false; // 函数外第一条代码行前的注释块 → 文件头
  const pad = () => '  '.repeat(indent);

  // 输出「SIF 体」：体是单行语句（PRINT 或其它）
  const emit_sif_body = (line_no, review) => {
    const conds = sif_stack.splice(0);
    const body_indent = indent;
    for (const cond of conds) {
      out.push(`${'  '.repeat(body_indent)}if (${cond}) {${anchor(line_no)}`);
    }
    const body = emit_body_line(line_no, review);
    // body 可能多行（PRINT + 注释等），每行缩进一层
    for (const b of body) {
      out.push(`${'  '.repeat(body_indent + conds.length)}${b}`);
    }
    for (let k = conds.length - 1; k >= 0; k -= 1) {
      out.push(`${'  '.repeat(body_indent + k)}}${anchor(line_no)}`);
    }
  };

  // 把一行非块、非注释的内容转成 JS 语句行（PRINT / 赋值 / return / …）
  const emit_body_line = (line_no, review) => {
    const raw = lines[line_no - 1];
    let trimmed = raw.trim();
    // 非 PRINT 行的行内 ; 注释剥离（PRINT 参数里的 ; 是文本，不动）。
    // ERB 行内注释形态：`IF TALENT:130 \t;母乳体质`（:1051 实测）
    if (!PRINT_RE.test(trimmed)) {
      const semi = trimmed.indexOf(';');
      if (semi >= 0) {
        trimmed = trimmed.slice(0, semi).trimEnd();
      }
    }
    const print_match = PRINT_RE.exec(trimmed);
    if (print_match) {
      const kind = print_match[1] + (print_match[4] || '');
      const arg = print_match[5] || '';
      stats.print_lines += 1;
      return emit_print(kind, arg, line_no, review);
    }
    const stmt = emit_statement(trimmed, line_no, review);
    if (stmt.kind === 'sif') {
      // 嵌套 SIF：不在这里展开（由外层 emit_sif_body 循环处理）
      return null;
    }
    if (stmt.kind === 'assign') {
      stats.assign_count += 1;
      return emit_assign(stmt, line_no, review);
    }
    if (stmt.kind === 'return') {
      return [`return ${stmt.value};${anchor(line_no)}`];
    }
    if (stmt.kind === 'call') {
      return [`// CALL ${stmt.fn}${anchor(line_no)}`];
    }
    if (stmt.kind === 'drawline') {
      return [`era.drawLine();${anchor(line_no)}`];
    }
    return [`// RAW: ${stmt.raw}${anchor(line_no)}`];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line_no = i + 1;
    let trimmed = raw.trim();
    // 行内 ; 注释剥离（非 PRINT 行；PRINT 参数里的 ; 是文本，emit_body_line 单独处理）
    if (!PRINT_RE.test(trimmed)) {
      const semi = trimmed.indexOf(';');
      if (semi >= 0) {
        trimmed = trimmed.slice(0, semi).trimEnd();
      }
    }
    // [SKIPSTART]～[SKIPEND]：预处理指令（emuera-basic-agent-guide
    // preprocessor.md）。块内整段不被引擎装载——函数定义不会进入函数空间，
    // 块内重复的同名函数也不构成「同名遮蔽」。转译器原样保留为 JS 注释，
    // 不生成代码（#184：DUNGEON_BITCH.ERB:1199-3132 的旧構文块，若照转会
    // 产出重复的顶层 async function → node --check 语法错，静默漏出）。
    if (/^\[SKIPSTART\]$/i.test(trimmed)) {
      if (sif_stack.length > 0) {
        emit_sif_body(line_no, review_notes);
      }
      const skip_end = lines
        .slice(i)
        .findIndex((l) => /^\[SKIPEND\]$/i.test(l.trim()));
      const end_abs = skip_end < 0 ? lines.length : i + skip_end + 1; // 含 SKIPEND 行
      out.push(
        `${pad()}// [SKIPSTART] ～ [SKIPEND]（预处理指令，块内不装载）${anchor(line_no)}`,
      );
      for (let j = i + 1; j < end_abs; j += 1) {
        out.push(`${'  '.repeat(indent)}// SKIP ${lines[j]}${anchor(j + 1)}`);
      }
      review_notes.push({
        kind: 'SKIP块',
        line: line_no,
        msg: `[SKIPSTART]（:${line_no}）～[SKIPEND]（:${end_abs}）——预处理跳过块，整段转注释`,
      });
      i = end_abs - 1; // for 循环 i++ 后落在 SKIPEND 之后
      continue;
    }
    if (/^\[SKIPEND\]$/i.test(trimmed)) {
      // 孤立的 SKIPEND（无 SKIPSTART 配对）：照原样 REVIEW，不吞代码
      review_notes.push({
        kind: 'SKIPEND孤立',
        line: line_no,
        msg: '[SKIPEND] 无配对 [SKIPSTART]——人工核',
      });
    }

    // 空行：SIF 等待体时空行跳过（Emuera 的 SIF 体是下一个语句）；否则保留
    if (trimmed === '') {
      if (sif_stack.length === 0) {
        out.push('');
      }
      continue;
    }

    // 注释行
    const { is_comment, comment } = split_comment(trimmed);
    if (is_comment) {
      stats.comment_lines += 1;
      if (current_function === null && !seen_code) {
        // 函数前连片注释 → 归入文件头块
        function_header.push(comment);
        continue;
      }
      if (sif_stack.length > 0) {
        // SIF 体前的注释：放 if 块外（ERB 里注释位置不敏感，可接受）
        out.push(`${pad()}// ${comment}${anchor(line_no)}`);
        continue;
      }
      out.push(`${pad()}// ${comment}${anchor(line_no)}`);
      continue;
    }

    // @ 函数定义
    if (AT_RE.test(trimmed)) {
      // 先把函数头的注释块落成 JS 块注释
      if (function_header.length > 0) {
        out.push('/**');
        for (const c of function_header) {
          out.push(` * ${c}`);
        }
        out.push(' */');
        function_header = [];
      }
      seen_code = true;
      // ERB 的 @ 函数体由下一个 @ 隐式结束：先闭合当前函数
      if (current_function) {
        out.push('}');
        out.push('');
      }
      const fn_decl = trimmed.replace(/^@/, '').trim();
      // @FUNC, ARG:0 / @FUNC(ARGS, ARG) 带参数声明 → 剥成纯函数名，REVIEW
      let fn_name = fn_decl;
      if (fn_name.includes('(')) {
        fn_name = fn_name.slice(0, fn_name.indexOf('(')).trim();
      } else if (fn_name.includes(',')) {
        fn_name = fn_name.slice(0, fn_name.indexOf(',')).trim();
      }
      if (fn_decl !== fn_name) {
        review_notes.push({
          kind: '函数参数',
          line: line_no,
          msg: `@${fn_decl} —— 参数声明已剥（JS 函数签名人工定）`,
        });
      }
      // ERB 允许同名事件函数多重定义（@EVENTTRAIN 可出现在多个文件），
      // JS 顶层 function 重复声明是 SyntaxError —— 需人工改成 on() 注册
      if (function_seen.has(fn_name)) {
        review_notes.push({
          kind: '同名函数',
          line: line_no,
          msg: `@${fn_name} 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('${fn_name}', …) 注册，参照 ere/kojo/kojo-k5.js`,
        });
      }
      function_seen.add(fn_name);
      out.push(`// @${fn_decl}${anchor(line_no)}`);
      out.push(`async function ${fn_name}() {`);
      current_function = fn_name;
      stats.function_count += 1;
      indent = 1;
      continue;
    }

    // # 修饰符（#PRI/#LATER 等）：口上文件里是事件优先级标记，JS 侧
    // 无等价物，落成注释（事件注册的优先级由人工复核决定）
    if (HASH_RE.test(trimmed)) {
      out.push(
        `${pad()}// ${trimmed}（事件优先级修饰符，JS 侧用 on() 的 TIER 表达）${anchor(line_no)}`,
      );
      continue;
    }

    // SELECTCASE 结构（switch）：SELECTCASE expr / CASE n / CASEELSE / ENDSELECT
    if (SCASE_RE.test(trimmed)) {
      if (sif_stack.length > 0) {
        emit_sif_body(line_no, review_notes);
      }
      const expr = convert_expr(
        trimmed.replace(/^\s*SELECTCASE\s+/i, ''),
        line_no,
        review_notes,
      );
      out.push(`${pad()}switch (${expr}) {${anchor(line_no)}`);
      switch_stack.push({ type: 'switch', indent, kw_line: line_no });
      indent += 1;
      continue;
    }
    if (SCASE_CASE_RE.test(trimmed)) {
      const top = switch_stack[switch_stack.length - 1];
      if (!top) {
        review_notes.push({
          kind: 'CASE无SELECTCASE',
          line: line_no,
          msg: trimmed,
        });
        out.push(`${pad()}// CASE 无匹配 SELECTCASE${anchor(line_no)}`);
        continue;
      }
      // 收上一个 case 的块（ERB 的 CASE 块独立执行，等价 JS 带 break 的 case）
      if (top.type === 'case' || top.type === 'caseelse') {
        indent = top.indent;
        out.push(`${'  '.repeat(indent)}break;${anchor(line_no)}`);
        out.push(`${'  '.repeat(indent)}}${anchor(line_no)}`);
        switch_stack.pop();
      }
      if (SCASE_CASE_RE.exec(trimmed)[1] === 'ELSE') {
        out.push(`${'  '.repeat(top.indent)}default: {${anchor(line_no)}`);
        switch_stack.push({
          type: 'caseelse',
          indent: top.indent + 1,
          kw_line: line_no,
        });
      } else {
        // ERB 的 CASE 支持多值列表：`CASE "ORAL", "LES"` / `CASE 2, 8, 12`。
        // JS 的 case 标签也支持并列：前几个标签不带块（case a:），最后一个
        // 标签带块（case c: {）——收尾逻辑只闭合最后一个 `{`，块栈只 push
        // 一个 case。值本身若是 ERB 寻址表达式，过 convert_expr
        // （#184：CASE "ORAL", "LES"）。
        const val = trimmed.replace(/^\s*CASE\s+/i, '');
        const vals = val
          .split(',')
          .map((v) => v.trim())
          .filter((v) => v.length > 0);
        // 前几个值拆成不带块的并列 case 标签
        for (let vi = 0; vi < vals.length - 1; vi += 1) {
          const js_val = convert_expr(vals[vi], line_no, review_notes);
          out.push(
            `${'  '.repeat(top.indent)}case ${js_val}:${anchor(line_no)}`,
          );
        }
        const last_val = convert_expr(
          vals[vals.length - 1],
          line_no,
          review_notes,
        );
        out.push(
          `${'  '.repeat(top.indent)}case ${last_val}: {${anchor(line_no)}`,
        );
        switch_stack.push({
          type: 'case',
          indent: top.indent + 1,
          kw_line: line_no,
        });
      }
      indent = switch_stack[switch_stack.length - 1].indent;
      continue;
    }
    if (SCASE_END_RE.test(trimmed)) {
      if (sif_stack.length > 0) {
        emit_sif_body(line_no, review_notes);
      }
      // 收最后一个 case 块（补 break）+ switch 块
      let top = switch_stack[switch_stack.length - 1];
      while (top && top.type !== 'switch') {
        out.push(`${'  '.repeat(top.indent)}break;${anchor(line_no)}`);
        out.push(`${'  '.repeat(top.indent)}}${anchor(line_no)}`);
        switch_stack.pop();
        top = switch_stack[switch_stack.length - 1];
      }
      if (!top) {
        review_notes.push({
          kind: 'ENDSELECT无SELECTCASE',
          line: line_no,
          msg: trimmed,
        });
        out.push(`${pad()}// ENDSELECT 无匹配 SELECTCASE${anchor(line_no)}`);
        continue;
      }
      indent = top.indent;
      out.push(`${'  '.repeat(indent)}}${anchor(line_no)}`);
      switch_stack.pop();
      continue;
    }

    // 结构块关键字（IF/ELSEIF/ELSE/ENDIF，大小写不敏感）
    const block = BLOCK_RE.exec(trimmed);
    if (block) {
      const kw = block[1].toUpperCase();
      if (kw === 'IF') {
        const cond = convert_expr(
          trimmed.replace(/^IF\s+/i, ''),
          line_no,
          review_notes,
        );
        if (sif_stack.length > 0) {
          // SIF 体里出现 IF：先闭合 SIF 体（单行体装不下块）
          review_notes.push({
            kind: 'SIF体内块',
            line: line_no,
            msg: 'SIF 体内出现 IF 块，结构按块解析重排——人工复核',
          });
          emit_sif_body(line_no, review_notes);
        }
        out.push(`${pad()}if (${cond}) {${anchor(line_no)}`);
        stack.push({ type: 'if', indent, kw_line: line_no });
        stats.if_count += 1;
        indent += 1;
        continue;
      }
      if (kw === 'ELSEIF') {
        const cond = convert_expr(
          trimmed.replace(/^ELSEIF\s+/i, ''),
          line_no,
          review_notes,
        );
        const top = stack[stack.length - 1];
        if (!top || (top.type !== 'if' && top.type !== 'elseif')) {
          review_notes.push({
            kind: 'ELSEIF无IF',
            line: line_no,
            msg: trimmed,
          });
          out.push(`${pad()}// ELSEIF 无匹配 IF${anchor(line_no)}`);
          continue;
        }
        indent = top.indent;
        out.push(`${pad()}} else if (${cond}) {${anchor(line_no)}`);
        top.type = 'elseif';
        indent += 1;
        continue;
      }
      if (kw === 'ELSE') {
        const top = stack[stack.length - 1];
        if (!top || (top.type !== 'if' && top.type !== 'elseif')) {
          review_notes.push({
            kind: 'ELSE无IF',
            line: line_no,
            msg: trimmed,
          });
          out.push(`${pad()}// ELSE 无匹配 IF${anchor(line_no)}`);
          continue;
        }
        indent = top.indent;
        out.push(`${pad()}} else {${anchor(line_no)}`);
        top.type = 'else';
        indent += 1;
        continue;
      }
      if (kw === 'ENDIF') {
        if (sif_stack.length > 0) {
          emit_sif_body(line_no, review_notes);
        }
        const top = stack.pop();
        if (!top) {
          review_notes.push({
            kind: 'ENDIF无IF',
            line: line_no,
            msg: trimmed,
          });
          out.push(`${pad()}// ENDIF 无匹配 IF${anchor(line_no)}`);
          continue;
        }
        indent = top.indent;
        out.push(`${pad()}}${anchor(line_no)}`);
        continue;
      }
    }

    // SIF：入栈等体（大小写不敏感）
    if (SIF_RE.test(trimmed)) {
      const cond = convert_expr(
        trimmed.replace(/^\s*SIF\s+/i, ''),
        line_no,
        review_notes,
      );
      sif_stack.push(cond);
      continue;
    }

    // 其它语句（普通行）
    if (sif_stack.length > 0) {
      // 这是某个 SIF 的体
      emit_sif_body(line_no, review_notes);
      continue;
    }
    const body = emit_body_line(line_no, review_notes);
    for (const b of body) {
      out.push(`${pad()}${b}`);
    }
  }

  // 收尾：未闭合 SIF + 未闭合块 + 最后一个函数
  while (sif_stack.length > 0) {
    out.push(`${'  '.repeat(indent)}}${anchor('EOF')}`);
    review_notes.push({ kind: 'SIF未闭合', line: 0, msg: 'SIF 体未闭合' });
    sif_stack.pop();
  }
  while (stack.length > 0) {
    const top = stack.pop();
    out.push(`${'  '.repeat(top.indent)}}${anchor('EOF')}`);
    review_notes.push({
      kind: '未闭合块',
      line: 0,
      msg: `块 ${top.type}（起始 :${top.kw_line}）未闭合`,
    });
  }
  if (current_function) {
    out.push('}');
    out.push('');
  }

  stats.review_count = review_notes.length;
  const code = out.join('\n');
  return { code, reviews: review_notes, stats };
}

/**
 * 收集产物里出现的、已有门面名的下标（裁定一要求头注写明）。
 * 对照 tools/facade-names.js 的 get_name（flag/cflag/tflag 等已命名），
 * talent/abl/mark 等名字表在 yml/（facade-names 未生成门面），这里只报
 * facade-names 已命名的部分；复核 agent 升级门面时直接可用。
 *
 * @param {string} code 产物代码
 * @returns {string[]} 提示行（每行一个「族:下标 = 门面名」）
 */
function collect_facade_hints(code) {
  const hints = [];
  const seen = new Set();
  // 从产物里抓 era.get('flag:7') / era.get(`cflag:${target}:301`) 的下标
  const re = /era\.get\(['"`]([a-z]+):[^'"`]*?:?(\d+)/g;
  let m;
  while ((m = re.exec(code))) {
    const family = m[1];
    const idx = Number(m[2]);
    const key = `${family}:${idx}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const named = get_name(family, idx);
    if (named?.name) {
      hints.push(`${key} = ${named.name}（facade-names）`);
    }
  }
  return hints.sort();
}

/** 生成产物文件内容（头注 + 代码 + REVIEW 清单） */
function build_product(erb_path, { code, reviews }) {
  const rel = path.relative(path.join(__dirname, '..'), erb_path);
  const hints = collect_facade_hints(code);
  const header = [
    // 待复核初稿：era/target/era_flag/rand_n 等变量由复核 agent 补导入，
    // eslint 的语义规则不适用（语法规则仍生效）；文件级 disable 必须置顶
    '/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */',
    '/**',
    ` * @file ${path.basename(erb_path)} 的口上转译产物（issue #107 原型，待复核）`,
    ' *',
    ` * 源: ${rel}`,
    ' *',
    ' * == 已有门面名的下标（复核时可升级为门面读写，裁定一） ==',
    ...(hints.length > 0
      ? hints.map((h) => ` *   ${h}`)
      : [' *   （本文件未命中 facade-names 已命名下标）']),
    ' *',
    ` * == 复核标记（${reviews.length} 处） ==`,
    ' * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法',
    ' * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，',
    ' * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW',
    ' * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），',
    ' * 复核成果不会被重跑覆盖。',
    ...reviews.map((r, i) => ` *   ${i + 1}. :${r.line} ${r.kind} ${r.msg}`),
    ' */',
    '',
    "'use strict';",
    '',
    '// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：',
    "// const era = require('#/era-electron');",
    "// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');",
    "// const { chara_callname } = require('#/utils/callname-utils');",
    '// 以及 target_name / player_name / assi_name / master_name / sc() / scf()',
    '// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。',
    '',
  ];
  const review_footer = [
    '',
    '// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====',
    ...reviews.map((r, i) => `// ${i + 1}. :${r.line} ${r.kind} ${r.msg}`),
    '',
  ];
  return header.join('\n') + code + review_footer.join('\n');
}

/** 主入口：单文件转译（默认不覆盖） */
function transpile_file(erb_path, out_path, { force = false } = {}) {
  if (fs.existsSync(out_path) && !force) {
    console.log(`跳过（已存在，--force 覆盖）：${out_path}`);
    return { skipped: true };
  }
  const { text, enc } = read_text(erb_path);
  const { code, reviews, stats } = transpile(text);
  const product = build_product(erb_path, { code, reviews });
  fs.mkdirSync(path.dirname(out_path), { recursive: true });
  fs.writeFileSync(out_path, product, 'utf8');
  console.log(
    `转译 ${path.basename(erb_path)}（${enc}，${stats.total_lines} 行）→ ${out_path}`,
  );
  console.log(
    `  注释 ${stats.comment_lines} 行 / PRINT ${stats.print_lines} 行 / 函数 ${stats.function_count} 个 / 赋值 ${stats.assign_count} 条 / REVIEW ${stats.review_count} 处`,
  );
  return { skipped: false, reviews, stats };
}

// —— CLI ——
if (require.main === module) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  if (args[0] === '--list') {
    console.log(KOJO_FILES.join('\n'));
    process.exit(0);
  }
  if (args[0] === '--all') {
    const out_root = path.join(__dirname, '..', 'products', 'kojo');
    for (const f of KOJO_FILES) {
      const out = path.join(out_root, output_name_for(f));
      transpile_file(path.join(KOJO_DIR, f), out, { force });
    }
    // 口上型非口上文件（#184）：DUNGEON_BITCH 等与口上同构，一并转
    for (const [src_rel, out_name] of KOJO_EXTRA_FILES) {
      const src = path.join(__dirname, '..', src_rel);
      transpile_file(src, path.join(out_root, out_name), { force });
    }
    process.exit(0);
  }
  if (args.length < 2) {
    console.error('用法：node tools/kojo-transpiler.js <源.ERB> <输出.js>');
    console.error('      node tools/kojo-transpiler.js --list');
    console.error('      node tools/kojo-transpiler.js --all');
    process.exit(2);
  }
  const rest = args.filter((a) => a !== '--force');
  if (rest.length === 1) {
    // 只给源文件：产物名按映射表推，落 products/kojo/
    const src = path.resolve(rest[0]);
    const fname = path.basename(src);
    const out = path.join(
      __dirname,
      '..',
      'products',
      'kojo',
      output_name_for(fname),
    );
    transpile_file(src, out, { force });
  } else {
    transpile_file(rest[0], rest[1], { force });
  }
}

module.exports = {
  CHARA_VAR_FAMILIES,
  KOJO_EXTRA_FILES,
  KOJO_FILES,
  KOJO_OUTPUT_NAME,
  PLAIN_VAR_FAMILIES,
  build_product,
  convert_expr,
  emit_assign,
  emit_print,
  emit_statement,
  interpolate_to_js,
  normalize_text,
  output_name_for,
  read_text,
  split_comment,
  text_to_js,
  transpile,
  transpile_file,
};
