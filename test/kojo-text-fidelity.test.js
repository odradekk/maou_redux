/**
 * @file 口上文本保真回归锁（issue #46 验收整改）：ere/kojo/ 全部模块的口上
 * 输出与 ERB 原文逐行对核。
 *
 * 缘由（#46 验收的独立变异，两处误报通过是本文件的直接动因）：
 *   - PRINTFORMW/PRINTFORML 的 W/L 之别在行为测试里**不可观测**——夹具的
 *     push_text 对 print 与 printAndWait 记录完全相同（W = 输出后等待按键、
 *     L = 输出后换行，映射错了表现为排版错乱与卡顿感，#8 列为转译器验证面）；
 *   - 插值槽位填错孔（${player_name} 与 ${target_name} 互换）同样不可观测
 *     ——字面量片段对「切开后的片段」核对，两种填法的片段完全一样。
 *
 * 形状参照 test/static-table-coverage.test.js：**从源码扫、逐条对源探**，
 * 不手抄镜像——期望值运行时取自 target/ 的 ERB 原文；ere/kojo/ 新增模块
 * 自动纳入（后续 19 个口上文件落地即受锁，这是本文件存在的理由）。
 *
 * 四道锁（每道一个 test，跨模块聚合失败、逐条列明位置）：
 *   A. 锚覆盖：kojo 模块里每个 era.print* 调用都被捕获且绑定了 // :N 行锚
 *      ——无锚的口上输出不可追溯，锁 B/C/D 对它无从谈起；
 *   B. W/L 变体：ERB 的 PRINTFORMW → printAndWait、PRINTFORML → print，
 *      按行锚逐语句配对；
 *   C. 插值槽位序：ERB 行内的 %...% 记号序列与 JS 同语句的 ${...} 序列
 *      各自归一（TARGET/PLAYER/ASSI/MASTER/SC/SCF/HEARTn）后逐项相等；
 *   D. 字面量片段双向：ERB 片段（按 %...% 切开）⊂ JS 语句文本，JS 字面量
 *      片段（按 ${...} 切开）⊂ ERB 行文本——防手抄错漏。**#60 起归一**：
 *      ERB 侧先经 tools/lang-table.js 归一（繁/日 → 简，词级优先）再比对，
 *      JS 侧保持原文——游戏语言统一为简体是产品决定（对 1:1 的有意偏离），
 *      K5 的移植源是繁体、JS 存简体。归一后锁力不减：抄错字、空格丢失
 *      照样红（归一是确定性映射，片段要么两边一致要么对不上）；且**多守
 *      一类**——JS 侧若还留着非简体字符（忘了转换），归一后的 ERB 片段
 *      在 JS 原文里找不到、反向比对即红。
 *
 * 锚绑定两条路：语句收尾行的尾锚（`; // :N`）优先；否则看语句前一行的
 * 纯注释（如 K3 的 `// :925`、`// :1062-1063 …`），且仅当该行号窗口在源
 * 文件里确有 PRINTFORM 行时才绑定——结构性注释（`// :936 ;;ランダム…`）
 * 的窗口没有 PRINTFORM 行，不会误绑。
 *
 * 已知边界（防误用）：
 *   - 模块 → 源文件取自文件头的「源: target/…ERB」（追溯注释，项目约定）；
 *     一个模块对应一个口上源文件。跨两文件混引输出的形态出现时，会以
 *     「锚不是 PRINTFORM 行」红出来，届时有意识地扩本锁。
 *   - 模板字面量内容按不透明处理（${} 内不出现反引号/嵌套模板）——kojo
 *     的写法满足；更复杂形态出现时扫描器要有意识地扩。
 *   - 片段阈值 ≥4 字符（trim 后）：更短的片段（「」、…）双向核对无区分力。
 *   - 只认 print / printAndWait 与 PRINT 系变体（PRINTFORMW/L、PRINTW/L、
 *     PRINTFORM、PRINT）。#184 起 DUNGEON_BITCH 这类带文本状态机用全变体
 *     （PRINTFORM 不换行拼接、PRINTW 等）；口上文件（K3/K5）只用
 *     PRINTFORMW/L。其余（println、printButton…）出现即红，扩展须有意识。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

// 归一表（#60）：tools/ 与 test/ 之间用相对路径（AGENTS.md「代码约定」）
const { to_simplified } = require('../tools/lang-normalize');

const REPO_ROOT = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO_ROOT, 'ere', 'kojo');

/** 片段双向核对的长度阈值（trim 后） */
const SEGMENT_MIN = 4;

/** ERB 侧的 PRINT 变体（#184 扩：DUNGEON_BITCH 这类带文本状态机用全变体——
 *  PRINTFORMW/L → wait/line，PRINTFORM/PRINT/PRINTW/PRINTL → 对应 wait/line；
 *  口上文件（K3/K5）只用 PRINTFORMW/L，不受影响）。variant：'W' 等待 / 'L'
 *  换行 / undefined 无后缀 */
// #183 增补：参数可空（PRINTL 空行、PRINTW 空行等待——DUNGEON_RYOUZYOKU_MAN
// 的 :175 PRINTL 与 :197 PRINTW 空行）。`[ \t]+` 只吃半角空白，全角空格是
// 参数内容（如 `PRINTFORMW` 后接全角空格开头的文本，参数以全角空格开头，#183 实测）。
const PRINTFORM_RE =
  /^\s*PRINTFORM(W|L)?(?:[ \t]+(.*))?$|^\s*PRINT(W|L)?(?:[ \t]+(.*))?$/;

// —— 插值记号的归一表（ERB %…% → 归一名 ← JS ${…}） ——

const ERB_TOKEN_RULES = [
  [/^SAVESTR:TARGET$/, 'TARGET'],
  [/^SAVESTR:PLAYER$/, 'PLAYER'],
  [/^SAVESTR:ASSI$/, 'ASSI'],
  [/^NAME:MASTER$/, 'MASTER'],
  [/^SELF_CALL\(TARGET(,\s*\d+)?\)$/, 'SC'], // ARG:1 原作已标注废弃，同值
  [/^SELF_CALL\(A(,\s*\d+)?\)$/, 'SC'], // EVENT_K 分发前 TARGET=A，与 TARGET 同值（#233）
  [/^SELF_CALL_FIRST\(TARGET\)$/, 'SCF'],
  [/^SELF_CALL_FIRST\(A\)$/, 'SCFA'],
  [/^CSTR:2$/, 'CSTR2'],

  // —— #184：DUNGEON_BITCH 等带文本状态机的插值形态 ——
  [/^SAVESTR:ARG$/, 'ARGNAME'],
  [/^FS_BITCH\("LOOKS", ARG\)$/, 'LOOKS'], // #185：%FS_BITCH("LOOKS", ARG)%
  [/^LOCALS$/, 'LOCALS'],
  [/^LOCAL$/, 'LOCAL'],
  [/^KYAKU$/, 'KYAKU'],
  [/^PLAY$/, 'PLAY'],
  [/^PLAY:6$/, 'PLAY6'],
  [/^PLAY\s*\*\s*200$/, 'PLAY200'],
  [/^PLAY\s*\*\s*100$/, 'PLAY100'],
  [/^PLAY\s*\*\s*250$/, 'PLAY250'],
  [/^PLAY\s*\*\s*500$/, 'PLAY500'],
  [/^ABS\(LOCAL\)$/, 'ABSLOCAL'],
  [/^EXPNAME:56$/, 'EXPNAME56'],
  [/^EXPNAME:10$/, 'EXPNAME10'],
  [/^EXPNAME:LCOUNT, 16, RIGHT$/, 'EXPNAME_L'],
  [/^PALAMNAME:0$/, 'PALAMNAME0'],
  [/^PALAMNAME:1$/, 'PALAMNAME1'],
  [/^PALAMNAME:4$/, 'PALAMNAME4'],
  [/^PALAMNAME:5$/, 'PALAMNAME5'],
  [/^PALAMNAME:LCOUNT, 12, RIGHT$/, 'PALAMNAME_L'],
  [/^EXP:ARG:LCOUNT, 30, RIGHT$/, 'NOW_EXP'],
  [/^JUEL:ARG:LCOUNT, 30, RIGHT$/, 'NOW_JUEL'],
  [/^PREV_EXP:LCOUNT, 30, RIGHT$/, 'PREV_EXP_L'],
  [/^PREV_JUEL:LCOUNT, 30, RIGHT$/, 'PREV_JUEL_L'],
  // #184 第二批（复核时补全的插值集合）
  [/^EXPNAME:0$/, 'EXPNAME0'],
  [/^EXPNAME:5$/, 'EXPNAME5'],
  [/^PALAMNAME:6$/, 'PALAMNAME6'],
  [/^PALAMNAME:8$/, 'PALAMNAME8'],
  [/^PLAY\s*\*\s*300$/, 'PLAY300'],
  [/^CFLAG:ARG:120$/, 'LEVEL'],
  [/^NUM$/, 'NUM'],
  [/^RESULT$/, 'RESULT'],
  // —— #182：迷宫凌辱（H13）的插值形态 ——
  [/^SHE\(ARG\)$/, 'SHE'],
  [/^SHE\(ARG:0\)$/, 'SHE'],
  [/^SHE\(ARG:1\)$/, 'SHE'],
  [/^SAVESTR:\(ARG:0\)$/, 'ARGNAME'],
  [/^SAVESTR:\(ARG:1\)$/, 'ARGNAME'],
  [/^SAVESTR:SIDEA$/, 'SIDEA'],
  [/^SAVESTR:SIDEB$/, 'SIDEB'],
  [/^MONSTERNAME\(LOCAL:1\)$/, 'MONSTERNAME'],
];

const JS_TOKEN_RULES = [
  [/^target_name$/, 'TARGET'],
  [/^player_name$/, 'PLAYER'],
  [/^assi_name$/, 'ASSI'],
  [/^master_name$/, 'MASTER'],
  [/^sc\(\)$/, 'SC'],
  [/^self_call\(a\)$/, 'SC'],
  [/^scf\(\)$/, 'SCF'],
  [/^self_call_first\(a\)$/, 'SCFA'],
  [/^cstr2$/, 'CSTR2'],

  // —— #184：DUNGEON_BITCH 等带文本状态机的插值形态 ——
  [/^name_of\(arg\)$/, 'ARGNAME'],
  [/^arg_name$/, 'ARGNAME'], // #183：H14 用 arg_name 变量名承载 %SAVESTR:ARG%
  [/^fs_bitch\('LOOKS', arg\)$/, 'LOOKS'], // #185：${fs_bitch('LOOKS', arg)}
  [/^locals$/, 'LOCALS'],
  [/^local$/, 'LOCAL'],
  [/^kyaku$/, 'KYAKU'],
  [/^play$/, 'PLAY'],
  [/^play\[6\]$/, 'PLAY6'],
  [/^play\s*\*\s*200$/, 'PLAY200'],
  [/^play\s*\*\s*100$/, 'PLAY100'],
  [/^play\s*\*\s*250$/, 'PLAY250'],
  [/^play\s*\*\s*500$/, 'PLAY500'],
  [/^Math\.abs\(local\)$/, 'ABSLOCAL'],
  [/^expname\(56\)$/, 'EXPNAME56'],
  [/^expname\(10\)$/, 'EXPNAME10'],
  [/^expname\(lcount,\s*16\)$/, 'EXPNAME_L'],
  [/^palamname\(0\)$/, 'PALAMNAME0'],
  [/^palamname\(1\)$/, 'PALAMNAME1'],
  [/^palamname\(4\)$/, 'PALAMNAME4'],
  [/^palamname\(5\)$/, 'PALAMNAME5'],
  [/^palamname\(lcount,\s*12\)$/, 'PALAMNAME_L'],
  [/^era\.get\(`exp:\$\{arg\}:\$\{lcount\}`\)\s*\|\|\s*0$/, 'EXP_ARG_L'],
  [/^era\.get\(`juel:\$\{arg\}:\$\{lcount\}`\)\s*\|\|\s*0$/, 'JUEL_ARG_L'],
  [/^prev_exp\[lcount\]$/, 'PREV_EXP_L'],
  [/^prev_juel\[lcount\]$/, 'PREV_JUEL_L'],
  // #184 第二批（复核时补全的插值集合）
  [/^expname\(0\)$/, 'EXPNAME0'],
  [/^expname\(5\)$/, 'EXPNAME5'],
  [/^palamname\(6\)$/, 'PALAMNAME6'],
  [/^palamname\(8\)$/, 'PALAMNAME8'],
  [/^play\s*\*\s*300$/, 'PLAY300'],
  [/^play\[0\]$/, 'PLAY'],
  [/^now_exp$/, 'NOW_EXP'],
  [/^now_juel$/, 'NOW_JUEL'],
  [/^level$/, 'LEVEL'],
  [/^num$/, 'NUM'],
  [/^result$/, 'RESULT'],
  // —— #182：迷宫凌辱（H13）的插值形态 ——
  [/^she\(arg\)$/, 'SHE'],
  [/^she\(arg0\)$/, 'SHE'],
  [/^she\(arg1\)$/, 'SHE'],
  [/^arg_name_of\(arg0\)$/, 'ARGNAME'],
  [/^arg_name_of\(arg\)$/, 'ARGNAME'],
  [/^winner_name$/, 'ARGNAME'], // #182 PC_RYOU：胜者名
  [/^loser_name$/, 'ARGNAME'], // #182 PC_RYOU：败者名
  [/^arg_name_of\(arg1\)$/, 'ARGNAME'],
  [/^arg_name_of\(sidea\)$/, 'SIDEA'],
  [/^arg_name_of\(sideb\)$/, 'SIDEB'],
  [/^monstername\(local_1\)$/, 'MONSTERNAME'],
  [/^pick\(/, 'PICK'],
];

/** ERB %…% 记号 → 归一名；未知记号返回 undefined（锁 C 报出） */
function norm_erb_token(raw) {
  const tok = raw.trim();
  for (const [re, name] of ERB_TOKEN_RULES) {
    if (re.test(tok)) {
      return name;
    }
  }
  const heart_match = tok.match(/^UNICODE\(0x2661\)\s*\*(\d+)$/);
  if (heart_match) {
    return `HEART${heart_match[1]}`;
  }
  const black_heart_match = tok.match(/^UNICODE\(0x2764\)\s*\*(\d+)$/);
  if (black_heart_match) {
    return `BLACKHEART${black_heart_match[1]}`;
  }

  // #183：{MON_NUM} / {MON_NUM * 10} 计算插值（迷宫凌辱的怪物数量）
  if (tok === 'MON_NUM') {
    return 'MONNUM';
  }
  // #182：{MON_NUM * N} 计算插值（12/15/5 等倍率；源文件各分支倍数不同）
  const mul = tok.match(/^MON_NUM\s*\*\s*(\d+)$/);
  if (mul) {
    return `MONNUM_MUL${mul[1]}`;
  }
  // #182：{PLAY * 10}（勇者版胜利演出）
  const play_mul = tok.match(/^PLAY\s*\*\s*(\d+)$/);
  if (play_mul) {
    return `PLAY_MUL${play_mul[1]}`;
  }
  return undefined;
}

/** JS ${…} 记号 → 归一名；未知记号返回 undefined */
function norm_js_token(raw) {
  const tok = raw.trim();
  for (const [re, name] of JS_TOKEN_RULES) {
    if (re.test(tok)) {
      return name;
    }
  }
  const heart_match = tok.match(/^heart\((\d+)\)$/);
  if (heart_match) {
    return `HEART${heart_match[1]}`;
  }
  const black_heart_match = tok.match(/^black_heart\((\d+)\)$/);
  if (black_heart_match) {
    return `BLACKHEART${black_heart_match[1]}`;
  }
  if (tok === "'\\u3000'") {
    return 'IDEOGRAPHIC_SPACE';
  }

  // #183：JS 侧 ${mon_num} / ${mon_num * 10} 与 ERB 的 {MON_NUM} 配对
  if (tok === 'mon_num') {
    return 'MONNUM';
  }
  // #182：${mon_num * N} 计算插值
  const mul = tok.match(/^mon_num\s*\*\s*(\d+)$/);
  if (mul) {
    return `MONNUM_MUL${mul[1]}`;
  }
  // #182：${play * 10}（勇者版胜利演出）
  const play_mul = tok.match(/^play\s*\*\s*(\d+)$/);
  if (play_mul) {
    return `PLAY_MUL${play_mul[1]}`;
  }
  return undefined;
}

/**
 * 扫描一个 js 模块的 era.print* 调用语句（字符串/注释感知）。
 *
 * 字符串内容不透明（含模板字面量：${} 里的括号不参与配对）；行注释与块
 * 注释跳过（注释里的 era.print 不算调用）。捕获 print 与 printAndWait
 * 两种，其余 print 族（println/printButton…）记录但不捕获——锁 A 会报出。
 *
 * @param {string} text 模块全文
 * @returns {{statements: object[], print_calls: object[], lines: string[],
 *   line_of(offset: number): number}}
 */
function scan_print_statements(text) {
  const lines = text.split(/\r?\n/);
  const line_starts = [0];
  for (let k = 0; k < lines.length; k += 1) {
    line_starts.push(line_starts[k] + lines[k].length + 1);
  }
  const line_of = (offset) => {
    let lo = 0;
    let hi = lines.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (line_starts[mid] <= offset) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }
    return lo + 1;
  };

  const statements = [];
  const print_calls = [];
  let stmt = null;
  let depth = 0;
  let in_str = null;
  let str_buf = '';
  let i = 0;
  const n = text.length;
  const feed = (ch) => {
    if (stmt) {
      stmt.raw += ch;
    }
  };

  while (i < n) {
    const ch = text[i];
    if (in_str) {
      if (ch === '\\') {
        feed(ch);
        if (i + 1 < n) {
          feed(text[i + 1]);
          str_buf += text[i + 1]; // 转义字符按其字面值入内容
        }
        i += 2;
        continue;
      }
      feed(ch);
      if (ch === in_str) {
        // 闭合引号是语法，不是内容
        if (stmt) {
          stmt.strings.push({ quote: in_str, content: str_buf });
        }
        in_str = null;
        str_buf = '';
      } else {
        str_buf += ch;
      }
      i += 1;
      continue;
    }
    if (ch === '/' && text[i + 1] === '/') {
      while (i < n && text[i] !== '\n') {
        feed(text[i]);
        i += 1;
      }
      continue;
    }
    if (ch === '/' && text[i + 1] === '*') {
      const close = text.indexOf('*/', i + 2);
      const end = close < 0 ? n : close + 2;
      while (i < end) {
        feed(text[i]);
        i += 1;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      feed(ch);
      in_str = ch;
      str_buf = '';
      i += 1;
      continue;
    }
    if (stmt) {
      feed(ch);
      if (ch === '(') {
        depth += 1;
      } else if (ch === ')') {
        depth -= 1;
        if (depth === 0) {
          // 参数列表闭合：吃掉空白与结尾分号，再收行尾的尾注释（锚在此）
          let j = i + 1;
          while (j < n && /\s/.test(text[j])) {
            feed(text[j]);
            j += 1;
          }
          if (text[j] === ';') {
            feed(';');
            j += 1;
          }
          while (j < n && text[j] !== '\n') {
            stmt.trailing += text[j];
            j += 1;
          }
          statements.push(stmt);
          stmt = null;
          i = j;
          continue;
        }
      }
      i += 1;
      continue;
    }
    const call = /^(era\.print[A-Za-z]*\()/.exec(text.slice(i, i + 24));
    if (call) {
      const call_line = line_of(i);
      print_calls.push({ offset: i, call: call[1], line: call_line });
      if (call[1] === 'era.printAndWait(' || call[1] === 'era.print(') {
        stmt = {
          start_offset: i,
          start_line: call_line,
          kind: call[1] === 'era.printAndWait(' ? 'wait' : 'line',
          raw: call[1],
          strings: [],
          trailing: '',
          binding: null,
          printform: null,
          bind_error: null,
        };
        depth = 1;
      }
      i += call[1].length;
      continue;
    }
    i += 1;
  }
  return { statements, print_calls, lines, line_of };
}

/** ERB 的 [n, m] 行窗口里找第一条 PRINT 行（#184 扩：支持全变体）。
 *  返回 { line_no, variant, arg }——variant：'W'（等待）/'L'（换行）/
 *  undefined（无后缀：PRINTFORM/PRINT 不换行不等待，映射 line） */
function find_printform(erb_lines, n, m) {
  for (let i = n; i <= m; i += 1) {
    const match = erb_lines[i - 1]?.match(PRINTFORM_RE);
    if (match) {
      // 两分支：PRINTFORM(W|L)? 或 PRINT(W|L)?
      const variant =
        match[1] ||
        (match[3] === 'W' ? 'W' : match[3] === 'L' ? 'L' : undefined);
      const arg = match[2] ?? match[4] ?? '';
      return { line_no: i, variant, arg };
    }
  }
  // #184：窗口内无 PRINT 系行时，PRINTDATA/DATAFORM 随机文本结构也绑定
  //（era.print(数组[rand]) 输出 DATAFORM 候选之一；variant 'DATA' 由锁
  // B/C 跳过、锁 D 跳过——随机候选集由行为测试覆盖）
  for (let i = n; i <= m; i += 1) {
    const line = erb_lines[i - 1];
    if (line && /^\s*PRINTDATA/.test(line)) {
      return { line_no: i, variant: 'DATA', arg: '' };
    }
  }
  // #183 增补：锚落在 DATAFORM 行区间（如 `// :94-98`）时，从窗口起点
  // 向前回溯找所属 PRINTDATA 起始行——窗口内只有 DATAFORM 行、起始行在
  // 窗口之前（DUNGEON_RYOUZYOKU_MAN.ERB 的逐行锚风格）。
  for (let i = n - 1; i >= 1; i -= 1) {
    const line = erb_lines[i - 1];
    if (line && /^\s*PRINTDATA/.test(line)) {
      return { line_no: i, variant: 'DATA', arg: '' };
    }
    if (PRINTFORM_RE.test(line ?? '')) {
      break; // 遇到普通输出行说明不在 PRINTDATA 块内
    }
  }
  return null;
}

/** 模块头注的「源: target/…ERB」→ 源文件相对路径 */
function parse_source_erb(js_text) {
  const match = js_text.match(/源:\s*(target\/[^\s*]+\.ERB)/);
  return match ? match[1] : null;
}

/** 语句的锚绑定：尾锚优先；否则前一行纯注释锚（窗口内有 PRINTFORM 才算） */
function bind_anchor(stmt, lines) {
  const trailing = stmt.trailing.match(/\/\/\s*:(\d+)(?:-(\d+))?/);
  if (trailing) {
    const a = Number(trailing[1]);
    const b = Number(trailing[2] ?? trailing[1]);
    return {
      n: a,
      m: b,
      label: trailing[0].replace(/^\/\/\s*:/, ''),
      via: '尾锚',
    };
  }
  const prev = lines[stmt.start_line - 2];
  if (prev !== undefined && /^\s*\/\//.test(prev)) {
    const cand = prev.match(/:(\d+)(?:-(\d+))?/);
    if (cand) {
      const a = Number(cand[1]);
      const b = Number(cand[2] ?? cand[1]);
      return {
        n: a,
        m: b,
        label: `${a}${b === a ? '' : `-${b}`}`,
        via: '前置注释',
      };
    }
  }
  return null;
}

// —— 模块清单与扫描结果（require 期一次算好，四道锁共用） ——

const MODULES = (() => {
  const out = [];
  for (const name of fs
    .readdirSync(KOJO_DIR)
    .filter((f) => f.endsWith('.js'))
    .sort()) {
    const file = path.join(KOJO_DIR, name);
    const text = fs.readFileSync(file, 'utf8');
    const scan = scan_print_statements(text);
    const entry = {
      name,
      scan,
      statements: scan.statements,
      erb_rel: parse_source_erb(text),
      erb_lines: null,
      errors: [],
    };
    if (entry.statements.length > 0) {
      if (!entry.erb_rel) {
        entry.errors.push('有口上输出但头注解析不出「源: target/…ERB」');
      } else {
        const erb_path = path.join(REPO_ROOT, entry.erb_rel);
        if (!fs.existsSync(erb_path)) {
          entry.errors.push(`源文件不存在：${entry.erb_rel}`);
        } else {
          entry.erb_lines = fs.readFileSync(erb_path, 'utf8').split(/\r?\n/);
        }
      }
    }
    for (const stmt of entry.statements) {
      stmt.binding = bind_anchor(stmt, scan.lines);
      if (!stmt.binding) {
        continue;
      }
      if (!entry.erb_lines) {
        stmt.bind_error = '模块无源文件可探（见上一条）';
        continue;
      }
      const hit = find_printform(
        entry.erb_lines,
        stmt.binding.n,
        stmt.binding.m,
      );
      if (hit) {
        stmt.printform = hit;
      } else if (stmt.binding.via === '尾锚') {
        stmt.bind_error = `尾锚 :${stmt.binding.label} 在 ${entry.erb_rel} 不是 PRINT 系行`;
      } else {
        // 前置注释是结构注释（窗口内无 PRINTFORM 行），不绑定
        stmt.binding = null;
      }
    }
    out.push(entry);
  }
  return out;
})();

/** 有语句的模块数与语句总数（各锁的「扫描未退化」自证） */
const TOTAL_STATEMENTS = MODULES.reduce((s, m) => s + m.statements.length, 0);
const MODULES_WITH_STMTS = MODULES.filter(
  (m) => m.statements.length > 0,
).length;

// —— 锁 A：锚覆盖 ——

test('锚覆盖：ere/kojo 每个 era.print* 调用都绑定到源文件的 PRINTFORM 行', () => {
  assert.ok(
    TOTAL_STATEMENTS >= 60,
    `扫到的口上输出语句只有 ${TOTAL_STATEMENTS} 条，扫描八成失效了`,
  );
  assert.ok(MODULES_WITH_STMTS >= 2, '有语句的模块不足 2 个，扫描八成失效了');

  const problems = [];
  for (const mod of MODULES) {
    problems.push(...mod.errors.map((e) => `${mod.name}: ${e}`));
    const captured = new Set(mod.statements.map((s) => s.start_offset));
    for (const call of mod.scan.print_calls) {
      if (call.call !== 'era.print(' && call.call !== 'era.printAndWait(') {
        problems.push(
          `${mod.name}:${call.line}: 未覆盖的输出 API「${call.call.slice(0, -1)}」——本锁只认 print/printAndWait，扩展须有意识`,
        );
      } else if (!captured.has(call.offset)) {
        problems.push(
          `${mod.name}:${call.line}: era.print 调用未被捕获（扫描器缺口）`,
        );
      }
    }
    for (const stmt of mod.statements) {
      if (!stmt.binding) {
        problems.push(
          `${mod.name}:${stmt.start_line}: 口上输出没有 // :N 行锚（不可追溯，锁 B/C/D 对它失效）`,
        );
      } else if (stmt.bind_error) {
        problems.push(`${mod.name}:${stmt.start_line}: ${stmt.bind_error}`);
      }
    }
  }
  assert.deepEqual(
    problems,
    [],
    `锚覆盖缺口（每条 = 一句对不上源的口上输出）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 B：W/L 变体 ——

test('W/L 变体逐行：PRINTFORMW → printAndWait、PRINTFORML → print', () => {
  const problems = [];
  let waits = 0;
  let line_prints = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.printform) {
        continue;
      }
      if (stmt.kind === 'wait') {
        waits += 1;
      } else {
        line_prints += 1;
      }
      if (stmt.printform.variant === 'DATA') {
        continue; // #184：PRINTDATA 随机文本结构不参与 W/L 判定
      }
      const expected = stmt.printform.variant === 'W' ? 'wait' : 'line';
      if (stmt.kind !== expected) {
        problems.push(
          `${mod.name} :${stmt.binding.label}（ERB :${stmt.printform.line_no}）: 原作是 PRINTFORM${stmt.printform.variant}，JS 用了 ${stmt.kind === 'wait' ? 'printAndWait' : 'print'}`,
        );
      }
    }
  }
  // 扫描未退化：两种变体都得有实例，否则本锁丧失区分力
  assert.ok(waits >= 60, `printAndWait 语句只有 ${waits} 条，扫描八成失效了`);
  assert.ok(
    line_prints >= 10,
    `print 语句只有 ${line_prints} 条，扫描八成失效了`,
  );
  assert.deepEqual(
    problems,
    [],
    `W/L 变体错配（错了不改行为，只改排版与等待节奏——行为测试看不见，本锁守）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 C：插值槽位序 ——

test('插值槽位序：%…% 与 ${…} 归一化后逐项相等（防填错孔）', () => {
  const problems = [];
  let token_pairs = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.printform) {
        continue;
      }
      const where = `${mod.name} :${stmt.binding.label}（ERB :${stmt.printform.line_no}）`;
      // #184 扩：ERB 的 %…% 与 {…} 都是插值记号（口上文件只有 %…%；
      // DUNGEON_BITCH 等带文本状态机用 {…} 做显示插值，如 {PLAY}、{LOCAL}）
      if (stmt.printform.variant === 'DATA') {
        continue; // #184：PRINTDATA 随机文本结构不参与槽位序比对
      }
      const erb_tokens = [
        ...stmt.printform.arg.matchAll(/%([^%]+)%|{([^}]+)}/g),
      ].map((m) => m[1] ?? m[2]);
      const js_tokens = [];
      for (const s of stmt.strings) {
        if (s.quote === '`') {
          for (const m of s.content.matchAll(/\$\{([^}]*)\}/g)) {
            const tok = m[1].trim();
            if (tok === "'\\u3000'" || tok === "'u3000'") {
              continue;
            }

            js_tokens.push(m[1]);
          }
        }
      }
      const erb_norm = erb_tokens.map((t) => norm_erb_token(t));
      const js_norm = js_tokens.map((t) => norm_js_token(t));
      erb_norm.forEach((v, idx) => {
        if (v === undefined) {
          problems.push(
            `${where}: 未知 ERB 插值记号 %${erb_tokens[idx]}%——归一表要有意识地扩`,
          );
        }
      });
      js_norm.forEach((v, idx) => {
        if (v === undefined) {
          problems.push(
            `${where}: 未知 JS 插值 \${${js_tokens[idx]}}——归一表要有意识地扩`,
          );
        }
      });
      token_pairs += Math.max(erb_norm.length, js_norm.length);
      if (
        !erb_norm.includes(undefined) &&
        !js_norm.includes(undefined) &&
        (erb_norm.length !== js_norm.length ||
          erb_norm.some((v, idx) => v !== js_norm[idx]))
      ) {
        problems.push(
          `${where}: 槽位序不一致 ERB=[${erb_norm}] JS=[${js_norm}]`,
        );
      }
    }
  }
  assert.ok(
    token_pairs >= 40,
    `核过的插值槽位只有 ${token_pairs} 个，扫描八成失效了`,
  );
  assert.deepEqual(
    problems,
    [],
    `插值槽位错配（填错孔不改片段集合，片段对核也看不见——本锁守）：\n  ${problems.join('\n  ')}`,
  );
});

// —— 锁 D：字面量片段双向（#60 起 ERB 侧先归一） ——

test('字面量片段双向：ERB 片段（归一后）在 JS 语句里、JS 片段在归一后的 ERB 行里', () => {
  const problems = [];
  let erb_checked = 0;
  let js_checked = 0;
  let normalized_hits = 0;
  for (const mod of MODULES) {
    for (const stmt of mod.statements) {
      if (!stmt.printform) {
        continue;
      }
      const where = `${mod.name} :${stmt.binding.label}（ERB :${stmt.printform.line_no}）`;
      if (stmt.printform.variant === 'DATA') {
        continue; // #184：PRINTDATA 随机候选集由「随机文本候选」专项对核
      }
      // ERB 侧归一（繁/日 → 简，词级优先；tools/lang-table.js 唯一真相源）。
      // JS 侧不归一——它必须本来就是简体（忘了转换在这里红，见文件头）。
      const erb_arg = to_simplified(stmt.printform.arg);
      if (erb_arg !== stmt.printform.arg) {
        normalized_hits += 1;
      }
      // 正向：ERB 字面量片段（按 %…% 与 {…} 切开、归一后）⊂ JS 语句原文
      //（#184 扩：{…} 是 ERB 的显示插值，与 %…% 同属插值记号）
      for (const seg of erb_arg.split(/%[^%]+%|{[^}]+}/)) {
        if (seg.trim().length >= SEGMENT_MIN) {
          erb_checked += 1;
          // 只去尾随空白（行尾 tab/空格是编辑残留，转译器不保留）；
          // 保留前导空白——M81 守的正是「句中前导空格丢失」（#46）
          const needle = seg.trimEnd();
          const js_raw = stmt.raw.replace(/\$\{\s*'\\u3000'\s*\}/g, '\u3000');
          if (!js_raw.includes(needle) && !stmt.raw.includes(needle)) {
            problems.push(
              `${where}: ERB 片段（归一后）未见于 JS：「${needle}」`,
            );
          }
        }
      }
      // 反向：JS 字面量片段（按 ${…} 切开、原文）⊂ 归一后的 ERB 行文本
      for (const s of stmt.strings) {
        const parts =
          s.quote === '`' ? s.content.split(/\$\{[^}]*\}/) : [s.content];
        for (const part of parts) {
          if (part.trim().length >= SEGMENT_MIN) {
            js_checked += 1;
            if (!erb_arg.includes(part)) {
              problems.push(
                `${where}: JS 片段未见于 ERB（归一后）：「${part}」`,
              );
            }
          }
        }
      }
    }
  }
  assert.ok(
    erb_checked >= 60,
    `正向片段只有 ${erb_checked} 条，扫描八成失效了`,
  );
  assert.ok(js_checked >= 60, `反向片段只有 ${js_checked} 条，扫描八成失效了`);
  // 归一确实在被使用（K5 是繁体源）：至少有一条语句的 ERB 行归一后变了样
  assert.ok(
    normalized_hits >= 8,
    `只有 ${normalized_hits} 条语句的 ERB 行归一后发生变化——K5 是繁体源，归一没生效的话正向比对早该全红；此断言防「to_simplified 被换成了恒等」`,
  );
  assert.deepEqual(
    problems,
    [],
    `字面量片段错漏（手抄错漏、空格丢失、JS 侧残留非简体都在这里红）：\n  ${problems.join('\n  ')}`,
  );
});
