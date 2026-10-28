/**
 * 跨模块顶层 require 检查（issue #288）：ere 全树 里对「装载责任属于
 * 主启动图」的族模块的**顶层** require（模块作用域）即红。
 *
 * == 检查什么 ==
 *
 * `ere/system/train/com-*.js` 与 `ere/kojo/kojo-*.js` 靠副作用注册进
 * COM / KOJO 分发族，注册与否全看有没有人 require 它（#274/#282 两把
 * 接入锁的前提）。主启动图（ere/system/flow/startup.js）显式 require
 * 这些族模块，是「这些族在游戏运行时确实被注册」的唯一保证。
 *
 * 漏洞：某文件若在**模块顶层** `require('#/system/train/com-hardcore')`，
 * 则装配表里那行同名 require 被删掉也没事——模块经这个文件间接照样
 * 装上，COM80-90 照常注册。三处同时失明：
 *
 *   - #226 的 M1249（「主启动图删重度调教系注册」）改坏了却没有测试红；
 *   - #274 的 com-family-wiring：判断条件是「只加载主启动图后族里实际有的
 *     号 == 源码扫出的号」，间接装上后号照样齐；
 *   - #282 的 kojo-family-wiring：同理。
 *
 * 这不是假想：#233（K2）与 #234（K3）两次都是全量变异抓到 `kojo-*.js`
 * 顶层 require `com-hardcore`，在 #233 已定先例之后重犯。#228 的
 * com-cloth 漏接入（玩家脱不了衣服而全绿）就是同种写法藏住的。后面十五张
 * 口上票都要从 com-* 取工具函数，这种写法还会再来。
 *
 * == 保护集合：不是黑名单，是「主启动图的装载责任」 ==
 *
 * 判断条件**不**写成「禁止 kojo 顶层 require com-*」——那太粗，正当的顶层
 * 依赖（`#/kojo/kojo-text`、`#/facade/*`、`#/utils/*`，乃至底座
 * `#/kojo/kojo-system` / `#/system/event/registry` / `#/system/flow/game-state`
 * ——它们被几十个文件正当顶层 require）不该被拦。
 *
 * 要拦的是「**被装配表显式 require 的族模块**」被别处顶层 require。
 * 两步定义，不手写名单：
 *
 *   1. 从 startup.js 扫出它 require 的模块清单——这就是「装载责任属于
 *      主启动图」的定义（装配表自己豁免）；
 *   2. 清单内、且有副作用族注册的模块才进保护集合。族注册用
 *      test/helpers/register-scan.js 的 extract_register_ids 判定（#274/
 *      #282 同款扫描器，已覆盖字面量 / for-of / Object.entries 三种写法，
 *      解析不了就抛）。底座（kojo-system、event/registry、begin-signal、
 *      com-family、train-loop 等无 register 的模块）不进保护集合——它们
 *      被别处顶层 require 是正当的，不削弱接入锁。
 *
 * 保护集合当前 31 个：12 个 com-* 指令族 + 19 个 kojo-* 口上。新族模块
 * 并入装配表清单即自动纳入；新口上文件若顶层 require 任一保护模块，
 * 锁当场红并点名「哪个文件顶层 require 了哪个族模块」。
 *
 * == 顶层 vs 函数体（这张工单的核心难点） ==
 *
 * require 在**模块作用域**（文件顶层、或顶层的 `const {…} = require(...)`）
 * 才拦；在函数体、方法体、回调里的不拦——延迟 require 是正解，检查必须
 * 让它们保持绿。扫描器跟踪函数体区间（function / 箭头 / 方法定义引入的
 * 花括号做括号平衡），require 落在任一函数体区间内 = 不拦。
 *
 * 现存四处正确写法（阳性对照，防检查把正解也拦下）：
 *
 *   - `ere/system/train/com-tentacle.js` 的 `com208`（函数内 require
 *     com-colosseum，原来是顶层，检查上线即红——与 #233/#234 两次被全量
 *     变异抓到的写法完全同构，只是还没被变异抓到）；
 *   - `ere/system/train/com-toy.js` 的 `equip_com93`（函数内 require
 *     com-tentacle 取 syokusyu_milk，同族互引，#288 的接入锁要求它保持
 *     延迟）；
 *   - `ere/page/components/chara-info-title.js` 的 `quest_now`（函数内 require
 *     dungeon-quest 取 quest_select；迷宫任务的顶层闭包经房间 / 自动调教 /
 *     结局演出绕回页面层，顶层引用即成环）；
 *   - `ere/page/page-life-list.js` 的 `base_field_text`（函数内 require
 *     page-select-target；page-select-target 顶层经 monster-play 取
 *     monster-data，而 monster-data 顶层取本文件）。
 *
 * #889 拆掉循环依赖之后，原先列在这里的 dungeon-trap → dungeon 与
 * kojo-k2/k3 → com-hardcore 三格已改成顶层引用，不再是阳性对照。
 *
 * 阳性对照按「文件 × target」聚合断言：该文件所有指向该 target 的 require
 * 都在函数体内（#520）。不写生产行号——行号不承载契约，只用于区分同文件
 * 同 target 的多处 require；写死后任何无关增删行都会撞红（#402/#469/#500/
 * #514 四张票记六次，计数方式见 #520）。当前四格都不存在「同 target 顶层
 * 与函数内并存」（各 target 在各自文件里的顶层出现次数为 0）；若将来出现
 * 这种情形，聚合断言会报出顶层那处，届时再议区分手段。
 *
 * 解析不了的 require（非字符串参数）抛错，不许静默漏过（#274 的既有
 * 约定：扫描器解析不了新写法必须红，不能假装看不见）。
 *
 * == 与既有锁的分工 ==
 *
 * - #274 com-family-wiring：族模块必须被装配表 / replay 清单 require
 *   （号集合对账）；
 * - #282 kojo-family-wiring：口上模块必须被装配表 require（号集合
 *   对账）；
 * - 本锁：主启动图清单里的**族模块**不许被别处**顶层** require（间接
 *   装载会让上面两把锁对「漏 require」失明）。
 *
 * 本锁只扫主启动图那一张清单，不扫 replay——replay 清单里也是族模块，
 * 但比对回放是独立世界，别处顶层 require 不影响主启动图的注册语义；
 * 回放侧漏装由 #274 的对账覆盖。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { extract_register_ids } = require('./helpers/register-scan');
const { scan_requires } = require('./helpers/require-scan');

const REPO = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO, 'ere');
const STARTUP = path.join(ERE_DIR, 'system', 'flow', 'startup.js');

// 判定「族模块」的四个分发族：指令族两个 + 口上族两个（#274/#282 同款）
const FAMILIES = [
  'com_family',
  'com_able_family',
  'kojo_message_com_family',
  'self_kojo_family',
];

// —— 文件清单与保护集合 ——

function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    for (const entry of fs.readdirSync(path.join(REPO, rel), {
      withFileTypes: true,
    })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (entry.name.endsWith('.js')) out.push(child);
    }
  };
  walk(dir);
  return out.sort();
}

/** startup.js 的 require 清单（这就是「装载责任属于主启动图」的定义） */
function startup_targets() {
  const src = fs.readFileSync(STARTUP, 'utf8');
  return scan_requires(src)
    .filter((r) => r.target)
    .map((r) => r.target);
}

/**
 * 保护集合：装配表 require 的 ∩ 有副作用族注册的模块。
 * 族注册用 #274/#282 同款扫描器判定（解析不了就抛）。
 * @returns {Map<string, string>} target → 相对路径（无 .js 后缀）
 */
function protected_modules() {
  const out = new Map();
  for (const target of startup_targets()) {
    const rel = target.replace(/^#\//, '');
    const full = path.join(ERE_DIR, `${rel}.js`);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, 'utf8');
    const has_reg = FAMILIES.some((f) => extract_register_ids(src, f).size > 0);
    if (has_reg) out.set(target, rel);
  }
  return out;
}

// —— 用例 ——

test('扫描器：正确区分顶层与函数体内 require（现存阳性对照）', () => {
  // 四处正确写法的延迟 require 必须判「函数体内」（不拦）。按「文件 ×
  // target」聚合断言：该文件中所有指向 target 的 require 都在函数体内，
  // 且至少存在一处（零处则阳性对照失去意义）。不写生产行号——行号不承载
  // 契约，只用于区分同文件同 target 的多处 require；写死后任何无关增删行
  // 都会撞红（四张票记六次，计数方式见文件头，#520 解耦）。对照来源见文件头。
  const cases = [
    ['ere/system/train/com-tentacle.js', '#/system/train/com-colosseum'],
    ['ere/system/train/com-toy.js', '#/system/train/com-tentacle'],
    [
      'ere/page/components/chara-info-title.js',
      '#/system/dungeon/dungeon-quest',
    ],
    ['ere/page/page-life-list.js', '#/page/page-select-target'],
  ];
  for (const [rel, target] of cases) {
    const src = fs.readFileSync(
      path.join(ERE_DIR, rel.replace(/^ere\//, '')),
      'utf8',
    );
    const hits = scan_requires(src).filter((r) => r.target === target);
    assert.ok(hits.length > 0, `${rel} 应存在指向 ${target} 的 require`);
    for (const hit of hits) {
      assert.equal(
        hit.top_level,
        false,
        `${rel}:${hit.line} → ${hit.target} 应判「函数体内」（延迟 require 是正解）`,
      );
    }
  }
  // 反向对照：顶层 require 必须判 true——否则把 top_level 恒置 false 的
  // 扫描器也能让上面四格全绿（规范审查 F1，#520）。用内联字符串字面量，
  // 不读生产文件，天然对行号免疫。
  assert.equal(
    scan_requires("const x = require('#/a');")[0].top_level,
    true,
    '顶层 require 应判 top_level=true',
  );
  assert.equal(
    scan_requires("function f() {\n  const x = require('#/a');\n }")[0]
      .top_level,
    false,
    '函数体内 require 应判 top_level=false',
  );
});

test('保护集合：装配表清单 ∩ 族注册，底座不进表', () => {
  const protected_map = protected_modules();
  // 族模块在表
  for (const t of [
    '#/system/train/com-hardcore',
    '#/system/train/com-colosseum',
    '#/kojo/kojo-k3-noble',
    '#/kojo/kojo-k5-mao',
  ]) {
    assert.ok(
      protected_map.has(t),
      `${t} 应进保护集合（装配表 require 的族模块）`,
    );
  }
  // 底座不在表（被别处顶层 require 是正当的）
  for (const t of [
    '#/kojo/kojo-system',
    '#/system/event/registry',
    '#/system/flow/game-state',
    '#/system/train/com-family',
    '#/system/train/train-loop',
  ]) {
    assert.ok(!protected_map.has(t), `${t} 是底座，不应进保护集合`);
  }
});

test('全树：主启动图清单里的族模块不被别处顶层 require', () => {
  // 违规时报「顶层 require：ere/xxx.js → #/system/train/com-yyy」——
  // M2118/M2120 的 must_mention 定位串（#288 原编号 M1790/M1791，#295 消重后改号）
  const protected_map = protected_modules();
  const violations = [];
  for (const rel of list_js_files('ere')) {
    if (rel === 'ere/system/flow/startup.js') continue; // 装配表自己豁免
    const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
    for (const r of scan_requires(src)) {
      if (r.target && protected_map.has(r.target) && r.top_level) {
        violations.push(`顶层 require：${rel}:${r.line} → ${r.target}`);
      }
    }
  }
  assert.deepEqual(violations, [], violations.join('\n'));
});

test('扫描器：解析不了的 require 抛错（不许静默漏过）', () => {
  // 变量参数 / 模板串参数 / 表达式参数都必须抛
  for (const bad of [
    'require(mod);',
    'require(`#/${name}`);',
    "require('#' + name);",
  ]) {
    assert.throws(() => scan_requires(bad), /无法静态解析/, bad);
  }
  // 正常写法不抛
  assert.doesNotThrow(() =>
    scan_requires("const { x } = require('#/utils/stub-line');"),
  );
});
