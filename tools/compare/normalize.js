/**
 * @file T18 输出对拍·归一化器（issue #48，验证决议 #9）。
 *
 * 职责：把两侧的原始输出归一成同一套「事件流」——
 *   - 黄金样本侧：target/emuera.log 的文本行（UTF-8 BOM + CRLF，逐行过
 *     #60 归一表 to_simplified——样本是原文、繁/日混用，不过表即满屏假差异）；
 *   - ere 侧：test/helpers/era-fixture.js 的 lines 记录（#16 的缝，本工具
 *     链的录制器——#9 原设的「print 代理」由夹具承载，见 docs/output-diff.md
 *     的裁定）。#74 起 progress 记录（printProgress / printMultiColumns 的
 *     progress 格）直接映射成 gauge——键与值来自参数、零解析，percentage
 *     纯表现不进事件流（见 fixture_stream 的 progress 分支注释）。
 *
 * 条目类型（#9 定案：menu 与 gauge 拆成独立条目，消掉列布局与图形差异）：
 *   { kind: 'text',    text }                      叙述文本（空白压缩后比对）
 *   { kind: 'input',   text }                       输入回显 / 输入记录
 *   { kind: 'menu',    key, val }                   指令/按钮项：标签 + 编号
 *   { kind: 'gauge',   key, val, max? }             状态条：抽数值（max 有则带）
 *   { kind: 'lossbar', key, val }                   损耗条：label[..] -N → 抠损耗值
 *   { kind: 'calc',    key, from, add, sub?, to, phrase? } 参数算式行
 *   { kind: 'image',   names }                      图片输出（无文本可比，留痕）
 *
 * 装饰性行整体丢弃（#9：分割线、省略号、空行——实占比见 line_stats，
 * 本票在 5000 行样本上复核过 #9 的 21.2%）。丢弃是归一化的一部分、不是
 * 忽略规则：两边排版能力不同，比对它们只产生噪音。
 */

'use strict';

const { to_simplified } = require('../lang-normalize');

// —— 行内结构识别用的字符集 ——

// 条形填充字符（Emuera BAR 系与本项目 print_palam/loss_bar 的实机渲染并集）
const BAR_CHARS = /[=\-*>‥.·\s]/;
// 分割线字符（DRAWLINE 的 ─ 与本作 CUSTOMDRAWLINE 的长划线；≥8 个才算线）
const DIVIDER_CHARS = /^[=\-―─＿═·\s]+$/;
// 省略号装饰（‥ 点线是本作 CUSTOMDRAWLINE 的变体；≥4 个非空白符才算）
const ELLIPSIS_CHARS = /^[‥。．.…·\s]+$/;

/** 全角空格 → 半角、连续空白压成单个空格、去首尾（文本条目的比对形态） */
function compress_ws(text) {
  return text
    .replace(/\u3000/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 分类单行（两侧共用：ere 侧 print 出的组合串与黄金样本同构）。
 *
 * @param {string} raw_line 行原文（不去 CR/BOM 由调用方处理）
 * @param {number} [line_no] 源行号（证据用）
 * @returns {{kind: string, line: number, [k: string]: any}} 单个条目或
 *   {kind: 'discard', why: 'blank'|'divider'|'ellipsis'}
 */
function classify_line(raw_line, line_no = 0) {
  const line = raw_line.replace(/\u3000/g, ' ');
  const trimmed = line.trim();

  if (trimmed === '') {
    return { kind: 'discard', why: 'blank', line: line_no };
  }
  if (trimmed.length >= 8 && DIVIDER_CHARS.test(trimmed)) {
    return { kind: 'discard', why: 'divider', line: line_no };
  }
  const ellipsis_body = trimmed.replace(/[\s]/g, '');
  if (ellipsis_body.length >= 4 && ELLIPSIS_CHARS.test(trimmed)) {
    return { kind: 'discard', why: 'ellipsis', line: line_no };
  }
  // 输入回显：整行恰是一个整数（Emuera 回显玩家键入；ere 侧由录制层的
  // input 标记生成，不经本分支——数字文本行不会误判：叙述里数字总带别的字）
  if (/^\d+$/.test(trimmed)) {
    return { kind: 'input', text: trimmed, line: line_no };
  }
  // 参数算式行：`阴核  5240+   300       =  5540`（可带 -第三项 与（短语））
  const calc = trimmed.match(
    /^([^\s()[\]]+)\s+(\d+)\s*\+\s*(\d+)(?:\s*-\s*(\d+))?\s*=\s*(\d+)(?:（(.*)）)?\s*$/,
  );
  if (calc) {
    return {
      kind: 'calc',
      key: calc[1],
      from: Number(calc[2]),
      add: Number(calc[3]),
      sub: calc[4] === undefined ? 0 : Number(calc[4]),
      to: Number(calc[5]),
      phrase: calc[6] ?? '',
      line: line_no,
    };
  }
  // 网格行：`名前[  0]`（菜单）/ `名前[==……]  100`（状态条）成串排列。
  // 括号里纯数字 = 菜单项；括号里是条形字符 = 状态条，值看括号后：
  //   `(cur/max)` 基础条、` N` 参数条、` -N` 损耗条。行内有任何非网格
  //   残渣（如括号前无名字的 [阴蒂绝顶：1次]）则整行回落为 text。
  const grid = parse_grid_line(line);
  if (grid) {
    return grid.length === 1
      ? { ...grid[0], line: line_no }
      : { kind: 'group', items: grid, line: line_no };
  }
  return {
    kind: 'text',
    text: compress_ws(line),
    raw: raw_line,
    line: line_no,
  };
}

/**
 * 解析网格行。返回条目数组（1..n 个 menu/gauge/lossbar），非网格行返回
 * null。规则：每个 `[...]` 必须带名字前缀；括号内纯数字 = 菜单项（值在
 * 括号内），括号内条形字符 = 状态条（值在括号后：`(cur/max)` 基础条、
 * ` N` 参数条、` -N` 损耗条）；单元之间只允许空白（状态条的值计入本单元
 * 的跨度，不当下一个单元的残渣）。
 */
function parse_grid_line(line) {
  const cell_re = /([^\s[\]]+)\s*\[([^[\]]*)\]/g;
  const cells = [];
  let match;
  let cursor = 0;
  while ((match = cell_re.exec(line)) !== null) {
    // 上一单元结束到本单元名字之间必须只有空白
    if (line.slice(cursor, match.index).trim() !== '') {
      return null;
    }
    const name = match[1];
    const inner = match[2];
    const after = line.slice(cell_re.lastIndex);
    // 名字后紧跟着的间隙（到下一个非空白）决定值的形态
    const gap = after.match(/^\s*(\(\s*\d+\s*\/\s*\d+\s*\)|-\s*\d+|\d+)?/);
    const value_part = gap?.[1];
    if (/^[\s\d]+$/.test(inner)) {
      // 菜单项：`爱抚[  0]`（值在括号内；括号后只允许空白直到下一项）
      if (value_part !== undefined && after.trim() !== '') {
        return null; // 括号后还有内容 → 不是纯菜单行
      }
      cells.push({ kind: 'menu', key: name, val: Number(inner.trim()) });
      cursor = cell_re.lastIndex;
    } else if (BAR_CHARS.test(inner) && inner.trim() !== '' && value_part) {
      if (/^\(/.test(value_part)) {
        const [cur, max] = value_part
          .replace(/[()\s]/g, '')
          .split('/')
          .map(Number);
        cells.push({ kind: 'gauge', key: name, val: cur, max });
      } else {
        const num = Number(value_part.replace(/[\s-]/g, ''));
        if (/^-/.test(value_part)) {
          cells.push({ kind: 'lossbar', key: name, val: num });
        } else {
          cells.push({ kind: 'gauge', key: name, val: num });
        }
      }
      cursor = cell_re.lastIndex + (gap?.[0]?.length ?? 0);
    } else {
      return null; // 括号内容既非数字也非条形 → 当文本整行处理
    }
  }
  // 行尾残渣只允许空白（值已并入单元跨度）
  if (cells.length === 0 || line.slice(cursor).trim() !== '') {
    return null;
  }
  return cells;
}

/**
 * 黄金样本 → 事件流。逐行：过 #60 归一表（样本是原文）→ 分类 → 展开
 * group 条目。line 号保留 1-based 原始行号，报告里可指回样本证据。
 *
 * @param {string} log_text emuera.log 全文（BOM/CRLF 由本函数处理）
 * @returns {Array<object>} 事件流（含 discard 条目，供统计；比对前滤掉）
 */
function golden_stream(log_text) {
  const lines = log_text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => to_simplified(l));
  const entries = [];
  lines.forEach((raw, i) => {
    const entry = classify_line(raw, i + 1);
    if (entry.kind === 'group') {
      entry.items.forEach((item) =>
        entries.push({ ...item, line: entry.line }),
      );
    } else {
      entries.push(entry);
    }
  });
  return entries;
}

/**
 * 夹具记录 → 事件流（ere 侧）。#16 夹具的 lines 条目类型映射：
 *   text → classify_line（与样本同一套分类器——损耗条等组合串仍走此路，
 *     #74 裁定：解析器为 SOURCE_CHECK 的合成串保留）
 *   button → menu 条目（标签 + accelerator）
 *   progress → gauge 条目（键＝条内文字、值＝条后数值；#74 零解析直映射）
 *   input → 夹具 lines 里的输入标记（对拍回放器注入，见 replay.js）
 *   br / divider → 丢弃（换行与分隔线是排版）
 *   image → image 条目（无文本可比，保留留痕）
 * 侧不做 to_simplified：ere 侧必须本就是简体（output-lang-lock 钉死），
 * 对拍再扫一遍等于给同一规则上了两把锁——真出了繁体，这里应当红。
 *
 * @param {Array<object>} fixture_lines 夹具的 lines 数组
 * @returns {Array<object>} 事件流
 */
function fixture_stream(fixture_lines) {
  const entries = [];
  fixture_lines.forEach((record, i) => {
    const line_no = i + 1;
    if (record.type === 'text') {
      const entry = classify_line(record.text, line_no);
      if (entry.kind === 'group') {
        entry.items.forEach((item) =>
          entries.push({ ...item, line: entry.line }),
        );
      } else {
        entries.push(entry);
      }
    } else if (record.type === 'button') {
      entries.push({
        kind: 'menu',
        key: compress_ws(record.text),
        val: record.accelerator,
        line: line_no,
      });
    } else if (record.type === 'progress') {
      // 结构化进度条 → gauge（#74 裁定，零解析）：
      //   key ＝条内文字（inContent＝参数名）、val ＝条后数值（outContent＝
      //   palam 原值，右对齐宽 5 的填充由 Number 剥掉；空串归一成 0 而非
      //   NaN——错误值与黄金侧不符照样红，M12 变异证对拍能拦）。
      //   percentage **不进事件流**：它是纯表现（原作 10 格字符条
      //   floor(10*值/下一阈值) vs 引擎百分比条的取整口径差异由「不比对」
      //   吸收）——两侧归一的语义值是条后数值，这是「换皮不砸对拍」的
      //   机制本体（print_palam 换 printMultiColumns 的 progress 格后，
      //   事件流与合成串时代逐字节同构）。
      //   max 不映射：palam 条无上限；`(cur/max)` 形态的基础条
      //   （LIFE_BAR/VITAL_BAR，仍是存根）随那张票扩。
      entries.push({
        kind: 'gauge',
        key: compress_ws(record.text),
        val: Number(record.out),
        line: line_no,
      });
    } else if (record.type === 'input') {
      entries.push({ kind: 'input', text: record.text, line: line_no });
    } else if (record.type === 'image') {
      entries.push({ kind: 'image', names: record.names, line: line_no });
    } // br / divider → 丢弃
  });
  return entries;
}

/**
 * 取「第 n 次输入 → 第 n+1 次输入」之间的事件流（对拍窗口）。
 * 黄金样本是环形缓冲尾部、首屏被截断，窗口从首个输入回显起才算两侧同构
 * （ere 侧回放从全新 BEGIN TRAIN 起，窗口前的首屏本来就不比）。
 *
 * @param {Array<object>} stream 事件流（含 discard）
 * @param {number} [n] 从第几次输入起（0 起）
 * @returns {Array<object>} 窗口内条目（discard 已滤除）
 */
function window_between_inputs(stream, n = 0) {
  const input_positions = [];
  stream.forEach((entry, i) => {
    if (entry.kind === 'input') {
      input_positions.push(i);
    }
  });
  const start = input_positions[n];
  const end = input_positions[n + 1];
  if (start === undefined || end === undefined) {
    throw new Error(
      `对拍窗口不完整：需要第 ${n + 1}、${n + 2} 次输入作边界（实得 ${input_positions.length} 次）`,
    );
  }
  return stream
    .slice(start, end)
    .filter((entry) => entry.kind !== 'discard' && entry.kind !== 'group');
}

/**
 * 丢弃行统计（#9 的 21.2% 复核口径：divider + ellipsis + blank 占全行比）。
 *
 * @param {string} log_text emuera.log 全文
 * @returns {{total: number, blank: number, divider: number, ellipsis: number,
 *   dropped: number, ratio: number}} 逐类计数与占比（分母=全部行，含空行）
 */
function line_stats(log_text) {
  const lines = log_text.replace(/^\uFEFF/, '').split(/\r?\n/);
  // 末行是文件尾换行产生的空串，不计入样本行
  const body = lines[lines.length - 1] === '' ? lines.slice(0, -1) : lines;
  const stats = { total: body.length, blank: 0, divider: 0, ellipsis: 0 };
  body.forEach((raw) => {
    const entry = classify_line(raw);
    if (entry.kind === 'discard') {
      stats[entry.why] += 1;
    }
  });
  stats.dropped = stats.blank + stats.divider + stats.ellipsis;
  stats.ratio = stats.dropped / stats.total;
  return stats;
}

module.exports = {
  classify_line,
  compress_ws,
  fixture_stream,
  golden_stream,
  line_stats,
  parse_grid_line,
  window_between_inputs,
};
