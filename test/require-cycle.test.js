/**
 * @file 模块级 require 图无环锁（issue #961）。
 *
 * == 为什么要锁 ==
 *
 * `ere/` 的模块只经 `#/` 别名互相引用，文件顶层的 require 决定装载顺序。
 * #889 把 `dungeon-battle | dungeon-quest | dungeon-trap` 那个顶层环拆掉了，
 * 但那是一次**观察**，不是不变量：此后任何人新加一对顶层 require 又凑成环，
 * 三条既有检查全绿——`layer-boundary` 只看函数内 require 有没有登记，
 * `top-level-wiring` 只看装配表负责的族模块有没有被别处顶层取，
 * `com-family-wiring` / `kojo-family-wiring` 只对号集合。环的症状是装载期
 * 一边拿到 undefined（解构到未定义导出），要到某条运行时路径才炸，最难查。
 *
 * 所以这张票把观察变成断言：`ere/` 全部 `.js` 建成模块级依赖图，断言每个
 * 强连通分量都是单点——换成运维语言就是「顶层图无环」。
 *
 * == 边只取顶层 require ==
 *
 * 函数体内 require 是破环的绕行写法（调用期才取依赖，装载期不成环），它由
 * `layer-boundary` 的存量清单逐条登记。把内联边也算进来，每条已登记的绕行
 * 写法都成一条环，断言当场失去意义——所以过滤必须在建图里，不在断言里。
 *
 * `#/x/y` 到文件路径的解析复用 `tools/ere-game-builder/lib/js-scan.js` 的
 * `resolveSpecifier`（引擎装载规则的现成实现），建图与环检测在
 * `test/helpers/require-graph.js`。
 *
 * == 失败信息 ==
 *
 * 报可读环路径 `a.js → b.js → c.js → a.js`，不只报数量：数量能说明「坏了」，
 * 路径才能说明「从哪拆」。路径由分量内 BFS 取最短，起点取分量里字典序最小
 * 的节点，同一份源码每次都报同一条。
 */

'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');

const { build_graph, find_cycles } = require('./helpers/require-graph');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');

// 两个用例看同一张图：建图读 281 个文件、扫 2000 多处 require，只做一次
const GRAPH = build_graph(ERE_DIR);

test('模块级 require 无环：每个强连通分量都是单点', () => {
  assert.deepEqual(
    GRAPH.skipped,
    [],
    `有 require 解析不到文件（图不完整，环检测会漏）：\n  ${GRAPH.skipped.join('\n  ')}`,
  );
  const cycles = find_cycles(GRAPH.edges).map((cycle) => cycle.join(' → '));
  assert.deepEqual(
    cycles,
    [],
    `模块级 require 出现环（每个强连通分量必须是单点）：\n  ${cycles.join('\n  ')}`,
  );
});

test('扫描面自检：图覆盖 ere/ 全部 .js，边不为空', () => {
  // 断言「图是空的」这种失效：扫描面空了、别名解析全挂、top_level 判定
  // 恒 false，都会让上一条用例在 0 条边上绿得毫无意义。下限取当前实测
  // （281 个文件、2027 条边）的七成左右，删并文件不至于撞红。
  const edge_count = [...GRAPH.edges.values()].reduce(
    (sum, targets) => sum + targets.length,
    0,
  );
  assert.ok(
    GRAPH.edges.size >= 200,
    `扫描到的 .js 只有 ${GRAPH.edges.size} 个`,
  );
  assert.ok(edge_count >= 1000, `模块级 require 只建出 ${edge_count} 条边`);
});

test('环检测自证：合成图上的环都报成可读路径，无环图不报', () => {
  const graph = (table) => new Map(Object.entries(table));

  // 三节点环：路径首尾闭合，方向按边的走向
  assert.deepEqual(
    find_cycles(
      graph({
        'a.js': ['b.js'],
        'b.js': ['c.js'],
        'c.js': ['a.js'],
      }),
    ),
    [['a.js', 'b.js', 'c.js', 'a.js']],
    '三节点环必须报成 a.js → b.js → c.js → a.js',
  );

  // 自环：单点分量也算环，否则靠自环维持的装载顺序无人管
  assert.deepEqual(
    find_cycles(graph({ 'a.js': ['a.js'] })),
    [['a.js', 'a.js']],
    '自环也是环，必须报成 a.js → a.js',
  );

  // 无环：链与菱形（多个前驱汇到同一节点）都不是环
  assert.deepEqual(
    find_cycles(
      graph({
        'a.js': ['b.js', 'c.js'],
        'b.js': ['d.js'],
        'c.js': ['d.js'],
        'd.js': [],
      }),
    ),
    [],
    '无环图不得报环',
  );

  // 两个互不相连的环：两个分量都要报，不能只报第一个
  assert.deepEqual(
    find_cycles(
      graph({
        'a.js': ['b.js'],
        'b.js': ['a.js'],
        'c.js': ['d.js'],
        'd.js': ['c.js'],
      }),
    ),
    [
      ['a.js', 'b.js', 'a.js'],
      ['c.js', 'd.js', 'c.js'],
    ],
    '两个不相连的环都要各报一条路径',
  );
});
