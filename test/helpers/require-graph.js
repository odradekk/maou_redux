/**
 * @file 模块级 require 图的建图与环检测（issue #961）。
 *
 * == 为什么有这张图 ==
 *
 * `ere/` 的模块引用一律走 `#/` 别名，模块求值期（文件顶层）的 require 决定
 * 装载顺序。#889 之前 `dungeon-battle | dungeon-quest | dungeon-trap` 是一个
 * 顶层环：三者谁先被装载，另一边的解构都是 undefined，症状是随机 undefined
 * 函数而不是崩溃。#889 把顶层强连通分量拆到 0，但那是当时算出来的观察，没有
 * 任何测试钉住。既有两把锁各管一面：`layer-boundary` 管函数内 require 的存量
 * 清单，`top-level-wiring` 管「装配表负责装载的族模块不许被别处顶层取」，都
 * 管不到「顶层图有没有环」。
 *
 * == 边怎么取 ==
 *
 * 只取 `scan_requires` 判为 `top_level: true` 的 require。函数体内 require 是
 * 破环的绕行写法（调用期才取，装载期不成环），归 `layer-boundary` 那张清单
 * 管；把它算成边会让每条登记过的绕行写法都变成一条环，图就没意义了。
 *
 * == 目标怎么解析成文件 ==
 *
 * 不另写一套别名映射：`#/x/y` 的落点交给 `tools/ere-game-builder/lib/js-scan.js`
 * 的 `resolveSpecifier` ——它复刻引擎装载规则（`#/` → `ere/`，自动补 `.js` /
 * `.json` / `index.js`，相对路径按发起方目录解析），与 `ere/jsconfig.json` 的
 * `#/* → *` 同义。解析不到的目标记进 `skipped`，由用例报红：路径写错时必须
 * 出声，不能静默少一条边（#274 的约定）。
 *
 * == 环怎么找 ==
 *
 * Tarjan 求强连通分量（单趟 DFS + low-link，不引第三方依赖）：模块级图无环
 * ⇔ 每个分量都是单点、且没有自环。报错要给可读路径而不是数量，所以每个
 * 非平凡分量再走一次分量内 BFS，从分量里字典序最小的节点出发、按最短路径
 * 回到它自己，得到 `a.js → b.js → c.js → a.js`。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

// 别名到文件的解析不另写一套：这份规则与 ere_check_game 的检查共用同一实现
const {
  resolveSpecifier,
} = require('../../tools/ere-game-builder/lib/js-scan.js');
const { scan_requires } = require('./require-scan');

/** 递归收集 .js，返回相对 `dir` 的 posix 路径（排序，保证输出稳定） */
function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(dir, rel), {
      withFileTypes: true,
    })) {
      const child = rel === '' ? entry.name : `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (entry.name.endsWith('.js')) out.push(child);
    }
  };
  walk('');
  return out.sort();
}

/**
 * 建模块级依赖图：节点是 `ere/` 下全部 `.js`，边是文件顶层的 require。
 *
 * @param {string} ere_dir `ere/` 的绝对路径
 * @returns {{ edges: Map<string, string[]>, skipped: string[] }} `edges` 的键
 *   即全部节点（无出边的文件也在），值是排序去重的目标相对路径；`skipped`
 *   是解析不到的目标（每条都带文件与行号）
 */
function build_graph(ere_dir) {
  const files = list_js_files(ere_dir);
  const nodes = new Set(files);
  const edges = new Map(files.map((rel) => [rel, new Set()]));
  const skipped = [];
  for (const rel of files) {
    const src = fs.readFileSync(path.join(ere_dir, rel), 'utf8');
    // 同一文件里指向同一目标的重复 require 只算一条边
    for (const r of scan_requires(src)) {
      if (!r.top_level) continue;
      const resolved = resolveSpecifier(
        r.target,
        ere_dir,
        path.join(ere_dir, rel),
      );
      if (resolved === undefined) {
        skipped.push(`${rel}:${r.line} → ${r.target}`);
        continue;
      }
      const target = path.relative(ere_dir, resolved).split(path.sep).join('/');
      // .kojo 这类非 JS 落点不是本图的节点，它自己不会再 require 出边
      if (nodes.has(target)) edges.get(rel).add(target);
    }
  }
  return {
    edges: new Map([...edges].map(([rel, set]) => [rel, [...set].sort()])),
    skipped,
  };
}

/**
 * 找出图里的全部环，每个非平凡强连通分量报一条最短路。
 *
 * @param {Map<string, string[]>} edges 邻接表（键即全部节点）
 * @returns {string[][]} 每条环路径，首尾是同一个节点
 */
function find_cycles(edges) {
  return cyclic_components(edges).map((comp) => shortest_cycle(comp, edges));
}

/**
 * Tarjan 求强连通分量，只返回有环的那些（多点分量，或单点带自环）。
 *
 * @param {Map<string, string[]>} edges
 * @returns {string[][]} 每个分量的节点（分量内排序，供最短环取起点）
 */
function cyclic_components(edges) {
  const index_of = new Map();
  const low = new Map();
  const on_stack = new Set();
  const stack = [];
  const out = [];
  let next_index = 0;

  const visit = (node) => {
    index_of.set(node, next_index);
    low.set(node, next_index);
    next_index += 1;
    stack.push(node);
    on_stack.add(node);
    for (const next of edges.get(node) ?? []) {
      if (!index_of.has(next)) {
        visit(next);
        low.set(node, Math.min(low.get(node), low.get(next)));
      } else if (on_stack.has(next)) {
        // 回边：用栈中节点的接入序号（不是它的 low）收缩当前分量
        low.set(node, Math.min(low.get(node), index_of.get(next)));
      }
    }
    if (low.get(node) !== index_of.get(node)) return;
    const comp = [];
    let member;
    do {
      member = stack.pop();
      on_stack.delete(member);
      comp.push(member);
    } while (member !== node);
    // 单点分量只有在自环时才算环
    if (comp.length > 1 || edges.get(node).includes(node)) {
      out.push(comp.sort());
    }
  };

  for (const node of edges.keys()) if (!index_of.has(node)) visit(node);
  return out;
}

/**
 * 分量内从最小节点出发，按最短路径回到它自己。
 *
 * @param {string[]} comp 分量内的节点（已排序）
 * @param {Map<string, string[]>} edges
 * @returns {string[]} 环路径，首尾都是起点
 */
function shortest_cycle(comp, edges) {
  const inside = new Set(comp);
  const start = comp[0];
  const parent = new Map([[start, null]]);
  const queue = [start];
  for (let head = 0; head < queue.length; head += 1) {
    const node = queue[head];
    for (const next of edges.get(node)) {
      if (!inside.has(next)) continue;
      if (next === start) {
        const nodes = [];
        for (let back = node; back !== null; back = parent.get(back)) {
          nodes.unshift(back);
        }
        return [...nodes, start];
      }
      if (parent.has(next)) continue;
      parent.set(next, node);
      queue.push(next);
    }
  }
  // 强连通分量里每个节点都有回到自己的路径，走到这里是建图或算法坏了
  throw new Error(`强连通分量 ${comp.join('、')} 里找不到环`);
}

module.exports = { build_graph, find_cycles };
