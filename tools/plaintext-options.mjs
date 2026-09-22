/**
 * @file 纯文本选项行扫描器（issue #530）：找出 `era.print('…[N] …')` 这种
 * 「看着像菜单、其实玩家敲不进编号」的写法。
 *
 * 为什么需要它：引擎的 input 只接受**本轮打印过的按钮快捷键**（渲染层
 * returnFromButton：整段校验包在 `if (useRule)` 里，数组分支
 * `rule.length > 0 && rule.indexOf(Number(val)) === -1` 即拒收、不回调游戏；
 * 规则见 #130、`[N] 文字` + INPUT 升级为 printButton 的通则见 PR #53）。
 * 原作 Emuera 的 INPUT 收任意数值，`PRINTL [N] …` 在那边能用，EraElectron
 * 不行——纯文本选项行会变成死路（#129 的主菜单 [109]、PR #53 的 [100]、
 * #530 的战役招募都是这个病灶）。反过来，消费方传 `era.input({useRule:false})`
 * 就整段跳过校验，那种行**结构性免疫**（报告第二节的 C 类，先例与结论见
 * ere/page/page-shop-labo.js:42-47）——扫描器把它们标成〔useRule:false〕。
 *
 * 判定面（有意收窄，理由逐条）：
 *   - 只认 `era.print` / `era.println` / `era.printAndWait` 的**首实参字面量**
 *     （含模板串）。这是全库菜单行的既有写法；数组形态的 `era.print([{content: …}])`
 *     多为排版片段（如 chara-info-title.js 的 `[8] 一人称重设`，原作本身用的
 *     是 PRINTPLAINFORM，不由 INPUT 消费），不纳入——纳入会把排版文字算成选项。
 *   - 选项编号认两种写法：字面数字 `[1]` 与插值数字 `[${index}]`（后者在循环里
 *     逐行生成，见 OPTION_RE/INTERPOLATED_OPTION_RE 的注释）。字面那一支先剥
 *     模板插值：`${items[0]}` 这类下标不是选项编号；插值那一支要求「以 `[` 开头
 *     且后面跟正文」，把装饰/标签括号挡在外面。
 *   - 整行注释（`//`、`/*`（含 `/**`）、`*`、`;` 开头）跳过；`era.printButton`
 *     等按钮 API 自然不匹配（它们不是纯文本）。
 *
 * 面外已知项（同一病灶、选项文本不落在首实参字面量上，共 17 行，清单与判定见
 * docs/research/plaintext-options.md 第四节末尾）：`ere/data/ending-scripts.js`
 * 的数据表 11 行、`ere/chara/chara-and-hair.js:226`/`:327` 与
 * `ere/chara/chara-custom.js:131`（选项文本拼进字符串变量、再整行 `era.print`）、
 * `ere/event/event-ending.js:537`（选项文本在数组元素上、经循环打印）、
 * `ere/event/event-execution.js:116` 与
 * `ere/page/components/chara-info-title.js:151`（数组形态的 `content`）。把数据
 * 表纳入棘轮会把「数据」与「打印调用点」混在一个判定面里，故不纳入。
 *
 * 用法：
 *   node tools/plaintext-options.mjs            # 打印清单与按文件计数
 *   node tools/plaintext-options.mjs --write    # 重写 tools/plaintext-option-baseline.mjs
 *
 * 基线是**棘轮**：一旦有新的一行出现就红，修掉一行也要同步改基线（只能变短、
 * 不许过期失效——与 tools/engine-contract-ledger.mjs 同款纪律）。逐处的
 * 「真选项／说明文字」判定与后续处理见 docs/research/plaintext-options.md。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(TOOL_DIR);

/** 默认基线文件（生成物，勿手改——用 --write 重生成） */
export const BASELINE_FILE = path.join(
  TOOL_DIR,
  'plaintext-option-baseline.mjs',
);

/** 扫描根目录（仓库相对） */
export const SCAN_ROOT = 'ere';

// 首实参字面量（单/双引号串或模板串）。转义序列按 `\\.` 吃掉，否则
// `'it\'s'` 这类串会在转义引号处提前收尾，把字面量截断（判定面要的是
// 「这一行是不是纯文本选项行」，截断会让 `[N]` 落在截断点之后而漏判）。
const CALL_RE =
  /era\.(?:print|println|printAndWait)\(\s*(['"`])((?:\\.|[^\\])*?)\1/g;
// 选项编号的两种写法：字面数字（`[1]`）与插值数字（`[${index}]`）。后者在
// 循环里逐行生成，是同一形态——不认它会把 page-infrastructure 的展品行、
// page-dungeon-info2 的怪物行（#180 明文保留的那批）整组漏掉。
// 字面数字那一支要**先剥插值**再测，否则 `${items[0]}` 这种下标会被误命中；
// 插值数字那一支要在原文上测（剥掉就什么都不剩了），且要求**字面量以它开头、
// 后面还跟正文**：`[${index}] 选项` 是选项行，而
// `[${talentname(243 + count)}]`（条件提示里的标签）与
// `体力[${'.'.repeat(32)}]`（死亡提示里的装饰括号）都不是——两条实测的反例
// 分别由「后面要跟正文」与「要在字面量开头」两条挡住。
const OPTION_RE = /\[\s*\d+\s*\]/;
const INTERPOLATED_OPTION_RE = /^\s*\[\s*\$\{[^}]*\}\s*\]\s*\S/;
// 消费这次输入的调用形态，用来标注「该行所在的输入是否传了 useRule: false」。
// 只认 `era.input(`：`printAndWait` 等的是任意键、没有 useRule 这一说，
// 把它算进来会让「菜单在别的函数里打印、消费点在调用方」的行（如
// page-infrastructure.js 的 print_menu，中间夹着 show_exhibit 的 printAndWait）
// 误标成不免疫。
const INPUT_RE = /era\.input\(([^)]*)\)/g;

/** 剥掉模板插值：`${items[0]}` 的 `[0]` 是下标，不是选项编号 */
export function strip_interpolation(literal) {
  return literal.replace(/\$\{[^}]*\}/g, '');
}

/** 该行是否是注释行（扫描器只跳整行注释，不做语法级词法分析） */
function is_comment_line(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') || // 含块注释开头的 `/**`（文件头注释第一行）
    trimmed.startsWith('*') ||
    trimmed.startsWith(';')
  );
}

/**
 * 扫描一个文件的内容，返回命中项（行号 1 基）。
 * @param {string} text 文件内容
 * @returns {Array<{line: number, literal: string}>}
 */
export function scan_text(text) {
  const lines = text.split(/\r?\n/);
  // 逐行求起始偏移，供 match.index → 行号换算
  const offsets = [];
  let at = 0;
  for (const line of lines) {
    offsets.push(at);
    at += line.length + 1;
  }
  const line_of = (index) => {
    let low = 0;
    let high = offsets.length - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (offsets[mid] <= index) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    return low + 1;
  };

  const hits = [];
  CALL_RE.lastIndex = 0;
  for (;;) {
    const match = CALL_RE.exec(text);
    if (match === null) {
      break;
    }
    const line = line_of(match.index);
    if (is_comment_line(lines[line - 1] ?? '')) {
      continue;
    }
    if (
      OPTION_RE.test(strip_interpolation(match[2])) ||
      INTERPOLATED_OPTION_RE.test(match[2])
    ) {
      hits.push({ at: match.index, line, literal: match[2] });
    }
  }
  return hits;
}

/**
 * 该命中之后最近的一次输入调用是否传了 `useRule: false`（**指示，不是判定条件**）。
 *
 * 引擎的 `returnFromButton` 整段校验包在 `if (inputParam.value['useRule'])` 里
 * （渲染层 app.asar），`showInput` 的缺省是 true；游戏侧显式传
 * `era.input({ useRule: false })` 就整段跳过白名单——那种消费点上的纯文本
 * 选项行**结构性免疫**本病灶（page-infrastructure.js、event-grotesque.js 的
 * 先例，结论见 page-shop-labo.js:42-47）。这里只往后找最近的 `era.input`
 * 实参文本，跨函数/跨分支时可能对不上，故只作报告里的标注用，不进基线、
 * 不参与棘轮比较。
 *
 * @param {string} text 文件全文
 * @param {number} from 命中点的字符偏移
 * @returns {boolean} 最近的后续输入调用是否传了 useRule: false
 */
export function consumer_uses_free_input(text, from) {
  INPUT_RE.lastIndex = from;
  const match = INPUT_RE.exec(text);
  if (match === null) {
    return false;
  }
  return /useRule\s*:\s*false/.test(match[1]);
}

/**
 * 扫描 `ere/` 全目录。
 * @param {string} [root] 仓库根目录
 * @returns {Array<{file: string, line: number, literal: string, free_input: boolean}>}
 *   file 为仓库相对路径（正斜杠）；free_input 见 consumer_uses_free_input
 */
export function scan_repo(root = REPO) {
  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.js')) {
        files.push(full);
      }
    }
  })(path.join(root, SCAN_ROOT));

  const hits = [];
  for (const full of files) {
    const rel = path.relative(root, full).split(path.sep).join('/');
    const text = fs.readFileSync(full, 'utf8');
    for (const hit of scan_text(text)) {
      hits.push({
        file: rel,
        ...hit,
        free_input: consumer_uses_free_input(text, hit.at),
      });
    }
  }
  return hits.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

/** 命中项按文件计数（基线的键值形态） */
export function count_by_file(hits) {
  const counts = {};
  for (const hit of hits) {
    counts[hit.file] = (counts[hit.file] ?? 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)),
  );
}

/** 生成基线文件的正文（含生成命令与纪律说明） */
export function render_baseline(counts) {
  const rows = Object.entries(counts).map(
    ([file, count]) => `  '${file}': ${count},`,
  );
  return `/**
 * @file 纯文本选项行的棘轮基线（生成物，勿手改：issue #530）。
 *
 * 生成：node tools/plaintext-options.mjs --write
 * 消费：test/plaintext-option.test.js（计数不符即红，两个方向都算）。
 *
 * 每项 = 「文件 → 该文件里「era.print('…[N] …')」形态的纯文本选项行条数」。
 * 这些行**今天还能用**（本轮没打印按钮时引擎放行自由输入），但只要同一轮
 * 里多打印一枚按钮，编号就会被引擎拒收、玩家敲不进去（#129 / PR #53 /
 * #530 三次都是这个病灶）。逐处的「真选项／说明文字」判定与处理意见见
 * docs/research/plaintext-options.md。
 *
 * 纪律：棘轮只许收紧不许放松——新增一行必须红，修掉一行必须同步删数
 * （与 tools/engine-contract-ledger.mjs 的「只能变短、不许过期失效」同款）。
 * 收窄扫描面（改判定规则）时要一并重生成本文件，并在 #530 下说明理由。
 *
 * 已知限度（#530 二轮审查指出）：计数按「文件 → 条数」，**同一文件里删一行
 * 再加一行不会红**（净额不变）。要钉到具体行就得把基线换成锚点串，
 * engine-contract-ledger.mjs 那种粒度；本票取的是计数，够拦住「新增一行」
 * 这一主要风险，代价是丢掉了同文件等额增减的分辨力。
 */
export default {
${rows.join('\n')}
};
`;
}

/**
 * 汇总文本：按文件打印条数与行号，供 --write 之外的排查用。
 *
 * 带 `〔useRule:false〕` 标记的行＝该行之后最近的一次输入显式关掉了白名单校验，
 * 结构性免疫本病灶（见 consumer_uses_free_input；指示，不是判定条件）。
 */
export function format_report(hits) {
  const counts = count_by_file(hits);
  const immune = hits.filter((hit) => hit.free_input).length;
  const lines = [
    `命中 ${hits.length} 行 / ${Object.keys(counts).length} 个文件` +
      `（其中 ${immune} 行的消费点传了 useRule: false，结构性免疫）`,
  ];
  let current = null;
  for (const hit of hits) {
    if (hit.file !== current) {
      current = hit.file;
      lines.push(`\n${current}  （${counts[current]} 行）`);
    }
    lines.push(
      `  :${hit.line}${hit.free_input ? ' 〔useRule:false〕' : ''}  ${hit.literal
        .slice(0, 96)
        .replace(/\n/g, '\\n')}`,
    );
  }
  return lines.join('\n');
}

/** CLI：打印清单，或按 `--write` 重生成基线 */
export function run(argv = []) {
  const hits = scan_repo();
  const counts = count_by_file(hits);
  if (argv.includes('--write')) {
    fs.writeFileSync(BASELINE_FILE, render_baseline(counts), 'utf8');
    const summary = `已重写 ${path.relative(REPO, BASELINE_FILE)}：${hits.length} 行 / ${Object.keys(counts).length} 个文件\n`;
    process.stdout.write(summary);
    return summary;
  }
  const report = `${format_report(hits)}\n`;
  process.stdout.write(report);
  return report;
}

// 无顶层 await：test/plaintext-option.test.js 用 require() 装载本模块
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  run(process.argv.slice(2));
}
