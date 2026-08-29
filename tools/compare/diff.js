/**
 * @file T18 输出比对·差异引擎（issue #48，验证决议 #9）。
 *
 * 两段比对（#9 的设计落地）：
 *   1. menu / gauge 条目按 (kind, val/key) **集合比对**——菜单与状态条是
 *      画面布局，本来就没有次序语义（Emuera PRINTC 三列 vs ere 平铺按钮，
 *      集合化即「排版差异容忍」的实现）；gauge 按 key 分组比数值；
 *   2. 其余条目（text / input / calc / lossbar / image）走 **LCS 对齐**，
 *      叙事次序是行为的一部分（口上插错位置必须红）。
 *
 * 每条差异再经 rules.js 归因：version / stub 有名有姓，其余 unexplained
 * 必须归零才认为「差异全部有解释」（#42 完成判据）。
 */

'use strict';

const { classify_entry } = require('./rules');

/** 条目的比对键（menu/gauge 不参与 LCS；text 比压缩后全文；数值条目比数值） */
function token(entry) {
  switch (entry.kind) {
    case 'text':
      return `text:${entry.text}`;
    case 'input':
      return `input:${entry.text}`;
    case 'menu':
      // 标签与编号都进键：同编号异名（指令改名/漂移）必须红，不能被
      // 「编号恰好相同」吞掉（单测抓到的误报通过形态）
      return `menu:${entry.key}|${entry.val}`;
    case 'calc':
      return `calc:${entry.key}|${entry.from}|+${entry.add}|-${entry.sub}|=${entry.to}|${entry.phrase}`;
    case 'lossbar':
      return `lossbar:${entry.key}|-${entry.val}`;
    case 'image':
      return `image:${entry.names}`;
    default:
      return `${entry.kind}:?`;
  }
}

/**
 * 经典 LCS：返回对齐结果 [{op: '='|'-'|'+', a?, b?, entry}]。
 * @param {Array<object>} a golden 序列
 * @param {Array<object>} b ere 序列
 */
function lcs_align(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] =
        token(a[i]) === token(b[j])
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (token(a[i]) === token(b[j])) {
      ops.push({ op: '=', a: i, b: j });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ op: '-', a: i });
      i += 1;
    } else {
      ops.push({ op: '+', b: j });
      j += 1;
    }
  }
  while (i < n) {
    ops.push({ op: '-', a: i });
    i += 1;
  }
  while (j < m) {
    ops.push({ op: '+', b: j });
    j += 1;
  }
  return ops;
}

/** 条目的展示串（报告用） */
function show(entry) {
  switch (entry.kind) {
    case 'menu':
      return `${entry.key}[${entry.val}]`;
    case 'gauge':
      return `${entry.key}[条] ${entry.val}${entry.max !== undefined ? ` (max ${entry.max})` : ''}`;
    case 'lossbar':
      return `${entry.key}[条] -${entry.val}`;
    case 'calc':
      return `${entry.key} ${entry.from}+${entry.add}${entry.sub ? `-${entry.sub}` : ''}=${entry.to}${entry.phrase}`;
    default:
      return `${entry.kind}:${entry.text ?? ''}`;
  }
}

/**
 * 归因一条差异（带对侧上下文）。rules.classify_entry 的包装——不做泛化的
 * 「对侧可归因则本条也豁免」：成对差异的两侧规则都在 rules.js 里显式写明
 * （如服装前缀对），泛化配对会让任何 golden 文本挂上任意 ere 存根行被
 * 豁免——那正是 #9 警告过的「掩盖缺陷的地毯」。
 */
function attribute(entry, side, other, context) {
  return classify_entry(entry, side, { ...context, counterpart: other });
}

/**
 * 全量比对：golden 窗口 vs ere 窗口。
 *
 * @param {Array<object>} golden window_between_inputs 的黄金样本窗口
 * @param {Array<object>} ere 同构的 ere 窗口
 * @param {object} [context] rules 上下文（traincommand_ids 等）
 * @returns {{matched: number, diffs: Array<{entry, side, counterpart?,
 *   category?: string, reason?: string}>, summary: {matched: number,
 *   version: number, stub: number, unexplained: number}}}
 */
function diff_streams(golden, ere, context = {}) {
  const diffs = [];
  let matched = 0;

  // —— 集合段：menu（按 val 分组）——
  const menu_of = (stream) => {
    const map = new Map();
    stream
      .filter((e) => e.kind === 'menu')
      .forEach((e) => map.set(e.val, [...(map.get(e.val) ?? []), e]));
    return map;
  };
  const g_menu = menu_of(golden);
  const e_menu = menu_of(ere);
  for (const val of new Set([...g_menu.keys(), ...e_menu.keys()])) {
    const gs = g_menu.get(val) ?? [];
    const es = e_menu.get(val) ?? [];
    for (let k = 0; k < Math.max(gs.length, es.length); k += 1) {
      const g = gs[k];
      const e = es[k];
      if (g && e && token(g) === token(e)) {
        matched += 1;
        continue;
      }
      if (g) {
        diffs.push({ entry: g, side: 'golden', counterpart: e });
      }
      if (e) {
        diffs.push({ entry: e, side: 'ere', counterpart: g });
      }
    }
  }

  // —— 集合段：gauge（按 key 分组，值与 max 参与相等判断）——
  const gauge_of = (stream) => {
    const map = new Map();
    stream
      .filter((e) => e.kind === 'gauge')
      .forEach((e) => map.set(e.key, [...(map.get(e.key) ?? []), e]));
    return map;
  };
  const g_gauge = gauge_of(golden);
  const e_gauge = gauge_of(ere);
  for (const key of new Set([...g_gauge.keys(), ...e_gauge.keys()])) {
    const gs = g_gauge.get(key) ?? [];
    const es = e_gauge.get(key) ?? [];
    for (let k = 0; k < Math.max(gs.length, es.length); k += 1) {
      const g = gs[k];
      const e = es[k];
      if (
        g &&
        e &&
        g.val === e.val &&
        (g.max ?? undefined) === (e.max ?? undefined)
      ) {
        matched += 1;
        continue;
      }
      if (g) {
        diffs.push({ entry: g, side: 'golden', counterpart: e });
      }
      if (e) {
        diffs.push({ entry: e, side: 'ere', counterpart: g });
      }
    }
  }

  // —— 序列段：其余条目 LCS（成对差异从相邻 -/+ 中配对）——
  const g_seq = golden.filter(
    (e) => e.kind !== 'menu' && e.kind !== 'gauge' && e.kind !== 'discard',
  );
  const e_seq = ere.filter(
    (e) => e.kind !== 'menu' && e.kind !== 'gauge' && e.kind !== 'discard',
  );
  const ops = lcs_align(g_seq, e_seq);
  // 相邻的 -…+… 组成 hunk，块内按 kind 配对给 counterpart（text 配 text、
  // calc 配 calc……配不上的保持单边）
  for (let idx = 0; idx < ops.length; ) {
    if (ops[idx].op === '=') {
      matched += 1;
      idx += 1;
      continue;
    }
    const dels = [];
    const adds = [];
    while (idx < ops.length && ops[idx].op !== '=') {
      if (ops[idx].op === '-') {
        dels.push(g_seq[ops[idx].a]);
      } else {
        adds.push(e_seq[ops[idx].b]);
      }
      idx += 1;
    }
    const used = new Set();
    dels.forEach((g) => {
      const e_idx = adds.findIndex(
        (cand, i) => !used.has(i) && cand.kind === g.kind,
      );
      if (e_idx >= 0) {
        // 成对差异两侧各报一条（各走各的归因规则）：只报一侧会把
        // 「对侧规则命中、本侧没有」的差异吞成单类
        used.add(e_idx);
        diffs.push({ entry: g, side: 'golden', counterpart: adds[e_idx] });
        diffs.push({ entry: adds[e_idx], side: 'ere', counterpart: g });
      } else {
        diffs.push({ entry: g, side: 'golden' });
      }
    });
    adds.forEach((e, i) => {
      if (!used.has(i)) {
        diffs.push({ entry: e, side: 'ere' });
      }
    });
  }

  // —— 归因 ——
  const summary = { matched, version: 0, stub: 0, unexplained: 0 };
  diffs.forEach((d) => {
    const hit = attribute(d.entry, d.side, d.counterpart, context);
    if (hit) {
      d.category = hit.category;
      d.reason = hit.reason;
      summary[hit.category] += 1;
    } else {
      d.category = 'unexplained';
      summary.unexplained += 1;
    }
  });
  return { matched, diffs, summary };
}

/** 报告渲染（CLI 与测试失败信息共用） */
function format_report({ matched, diffs, summary }) {
  const lines = [
    `比对结果：匹配 ${matched} 条；差异 ${diffs.length} 条 = ` +
      `版本 ${summary.version} + 存根 ${summary.stub} + 未解释 ${summary.unexplained}`,
  ];
  const order = { version: 0, stub: 1, unexplained: 2 };
  [...diffs]
    .sort(
      (x, y) =>
        (order[x.category] ?? 9) - (order[y.category] ?? 9) ||
        x.side.localeCompare(y.side),
    )
    .forEach((d) => {
      const side = d.side === 'golden' ? '-' : '+';
      const pair = d.counterpart ? `（对侧 ${show(d.counterpart)}）` : '';
      lines.push(
        `  [${d.category}] ${side}${show(d.entry)}${pair}` +
          (d.reason ? ` ← ${d.reason}` : ''),
      );
    });
  return lines.join('\n');
}

module.exports = { diff_streams, format_report, lcs_align, show, token };
