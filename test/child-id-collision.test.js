/**
 * @file 后代 ID 与页面固定按钮编号的撞号防护（issue #560，与 #561 同票实施）。
 *
 * 背景：列表页把角色 ID 直接当按钮快捷键（#530/#535 的名册、#543 的批量处刑
 * 页、#395 的目标选择页），同屏还有固定编号的功能按钮（返回/翻页/排序表头
 * 等）。后代 ID 由 ere 自己分配（chara-pregnancy.js 的 allocate_child_id），
 * 一旦落进固定编号区间就会撞号：点角色行触发的是功能按钮，这个角色反而选不
 * 中（#543 验收逐行对照时发现）。
 *
 * 做法（#560 主 agent 2026-09-24 的决定）：把 FIRST_CHILD_ID 抬到全部页面固定
 * 按钮编号之上（100000），「每个来源预设保留 100 位」的区间结构不变，于是
 * template_no_of 的反推照常成立。代价是旧档里已有的后代 ID 会被算错，按
 * ADR-0006 同抬存档版本（yml/GameBase.yml 的 0.0.8）。
 *
 * 本文件守两件事：
 *   1. 静态不变量——扫 ere/ 全部按钮快捷键，「纯数字的固定编号」必须小于
 *      FIRST_CHILD_ID（注释与字符串里的示例不算）；角色预设 ID
 *      （yml/Chara*.yml 的键）同样必须小于它。扫描只认纯数字字面量，
 *      「常量 + 变量」型（chara-family.js 的 `15_000 + 角色 ID`）与变量型
 *      （`accelerator: cid`）不参与——它们的撞号面在完成评论的普查表里
 *      逐页列明；
 *   2. 行为——构造一个真后代，它在名册页与批量处刑页都能被选中，同屏的
 *      固定按钮照常可用。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');
const YML_DIR = path.resolve(__dirname, '..', 'yml');

// —— 静态扫描 ——

/** 递归收集 ere/ 下的全部 .js（扫描面：游戏源码，不含 tools/ 与 test/） */
function ere_sources(dir = ERE_DIR, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      ere_sources(full, out);
    } else if (name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * 把字符串字面量与注释抹成等长空白，只留代码骨架。长度保持一致，行号因此
 * 仍是原文件的；注释里的示例（page-tailor.js 文件头有一条 `printButton(…, n)`）
 * 不会被当成真调用。
 * @param {string} text 源码
 * @returns {string}
 */
function code_skeleton(text) {
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === "'" || c === '"' || c === '`') {
      out += ' ';
      i += 1;
      while (i < text.length) {
        if (text[i] === '\\') {
          out += '  ';
          i += 2;
        } else if (text[i] === c) {
          out += ' ';
          i += 1;
          break;
        } else {
          out += ' ';
          i += 1;
        }
      }
    } else if (c === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') {
        out += ' ';
        i += 1;
      }
    } else if (c === '/' && text[i + 1] === '*') {
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) {
        out += ' ';
        i += 1;
      }
      out += '  ';
      i += 2;
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

/** 与 `open` 处的 `(` 配对的 `)` 下标（骨架里没有字符串与注释，直接数括号） */
function match_paren(skeleton, open) {
  let depth = 0;
  for (let i = open; i < skeleton.length; i += 1) {
    if (skeleton[i] === '(') depth += 1;
    else if (skeleton[i] === ')') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return skeleton.length;
}

/** 按顶层逗号切分实参表 */
function split_args(body) {
  const args = [];
  let depth = 0;
  let current = '';
  for (const c of body) {
    if (c === '(' || c === '[' || c === '{') depth += 1;
    else if (c === ')' || c === ']' || c === '}') depth -= 1;
    if (c === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
      continue;
    }
    current += c;
  }
  if (current.trim() !== '') args.push(current.trim());
  return args;
}

/** 纯数字字面量（含 `_` 分隔符）：只有这种快捷键算「固定编号」 */
const FIXED_NUMBER = /^\d[\d_]*$/;

/**
 * 扫一段源码里的按钮快捷键，只收纯数字的固定编号：
 *   - `printButton(<正文>, <快捷键>[, <config>])` 的第 2 个实参
 *   - `printMultiColumns` 按钮格里的 `accelerator: <快捷键>` 字段
 * @param {string} text 源码
 * @returns {{value: number, line: number}[]}
 */
function fixed_button_numbers(text) {
  const skeleton = code_skeleton(text);
  const found = [];
  const line_of = (index) => skeleton.slice(0, index).split('\n').length;
  const record = (expr, index) => {
    const value = expr.trim();
    if (FIXED_NUMBER.test(value)) {
      found.push({
        value: Number(value.replace(/_/g, '')),
        line: line_of(index),
      });
    }
  };

  const print_button = /(?<![\w$])printButton\s*\(/g;
  let m;
  while ((m = print_button.exec(skeleton)) !== null) {
    const open = m.index + m[0].length - 1;
    const args = split_args(
      skeleton.slice(open + 1, match_paren(skeleton, open)),
    );
    if (args.length >= 2) record(args[1], m.index);
  }
  const accelerator = /accelerator\s*:\s*([^,}\n]+)/g;
  while ((m = accelerator.exec(skeleton)) !== null) {
    record(m[1], m.index);
  }
  return found;
}

/** chara-pregnancy.js 里声明的 FIRST_CHILD_ID（值即源码字面量，不经运行时） */
function declared_first_child_id() {
  const text = fs.readFileSync(
    path.join(ERE_DIR, 'chara', 'chara-pregnancy.js'),
    'utf8',
  );
  const m = /^const FIRST_CHILD_ID = (\d+);$/m.exec(text);
  assert.ok(m, 'chara-pregnancy.js 必须声明 FIRST_CHILD_ID 常量');
  return Number(m[1]);
}

test('静态：全部固定按钮编号都小于 FIRST_CHILD_ID（撞号的防线，#560）', () => {
  const first_child_id = declared_first_child_id();
  const offenders = [];
  let max = 0;
  let sites = 0;
  for (const file of ere_sources()) {
    const relative = path.relative(path.resolve(__dirname, '..'), file);
    for (const { value, line } of fixed_button_numbers(
      fs.readFileSync(file, 'utf8'),
    )) {
      sites += 1;
      if (value > max) max = value;
      if (value >= first_child_id) {
        offenders.push(`${relative}:${line} 的固定编号 [${value}]`);
      }
    }
  }
  assert.ok(sites > 50, `扫描面异常：只找到 ${sites} 个固定编号按钮`);
  assert.deepEqual(
    offenders,
    [],
    `固定按钮编号必须小于 FIRST_CHILD_ID = ${first_child_id}（后代 ID 从它起，` +
      '同屏撞号后点角色会触发功能按钮）：\n' +
      offenders.join('\n'),
  );
  assert.ok(
    max < first_child_id,
    `固定编号上限 ${max} 不得达到 FIRST_CHILD_ID = ${first_child_id}`,
  );
});

test('静态：角色预设 ID（yml/Chara*.yml）都小于 FIRST_CHILD_ID', () => {
  const first_child_id = declared_first_child_id();
  const presets = fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara\d+\.yml$/.test(name))
    .map((name) => Number(/^Chara(\d+)\.yml$/.exec(name)[1]))
    .sort((a, b) => a - b);
  assert.ok(presets.length > 30, `预设表数量异常：${presets.length}`);
  assert.ok(
    presets[presets.length - 1] < first_child_id,
    `预设 ID 上限 ${presets[presets.length - 1]}（Chara${presets[presets.length - 1]}.yml）` +
      ` 不得达到 FIRST_CHILD_ID = ${first_child_id}`,
  );
});

// —— 行为 ——

/**
 * 世界：魔王 + 温妮（31）+ 一个真后代。后代走 gb_add_slave，与
 * chara-pregnancy.test.js 的构造方式一致——EX_TALENT:2 落盘，ID 由
 * FIRST_CHILD_ID 段分配。
 *
 * `template` 是来源预设号，决定后代落在哪个 100 位区间：断言「与固定按钮
 * 不撞号」的用例要挑**旧常量下正好撞号**的那一档（模板 3 → 旧 ID 1200 撞
 * 名册排序表头 [1200]；模板 11 → 旧 ID 2000 撞批量处刑 [2000] 上一页），
 * 否则把 FIRST_CHILD_ID 改回 1000 这些用例照样绿，守不住「撞号」这件事。
 * @param {number} template 来源预设号（须在 1-16 内，且本函数会 seed 它）
 */
async function seed_world_with_child(template = 1) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(template, {
    id: template,
    name: `后代模板${template}`,
    callname: `后代模板${template}`,
  });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('talent:31:314', 5); // 种族（后代继承用）
  fixture.store.set('cflag:31:9', 4); // 等级
  const child = await fixture
    .load_module('chara/chara-pregnancy')
    .gb_add_slave(template, -4, () => 0);
  return { fixture, child };
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

function accelerators(fixture) {
  return buttons(fixture).map((button) => button.accelerator);
}

test('后代不在固定按钮区间内：FIRST_CHILD_ID 起分配，与同屏编号不撞', async () => {
  const { fixture, child } = await seed_world_with_child();

  assert.equal(child, declared_first_child_id(), '模板 1 的后代落在区间起点');
  assert.ok(
    fixture.era.getAddedCharacters().includes(child),
    '后代进入已加入角色列表',
  );
  assert.equal(
    fixture.store.get(`ex_talent:${child}:2`),
    1,
    'EX_TALENT:2 后代',
  );
});

test('名册页：后代行是可点的按钮，排序表头/翻页/返回照常可用（#560）', async () => {
  // 模板 3：旧常量（1000）下这个后代的 ID 是 1200，正撞名册排序表头
  // [1200]——改回旧常量时本用例必须红
  const { fixture, child } = await seed_world_with_child(3);
  assert.equal(child, declared_first_child_id() + 2 * 100, '模板 3 的区间');
  const { chara_info } = fixture.load_module('page/page-chara-info');
  // 后代行 → 个别信息页（[500] 前一人）→ 返回，再 [999] 退出名册
  fixture.set_inputs(child, 500, 100, 999);

  const result = await chara_info();

  assert.equal(result, 0);
  assert.ok(
    accelerators(fixture).includes(child),
    `后代 ${child} 的行必须是按钮（快捷键 = 后代 ID）`,
  );
  assert.ok(
    accelerators(fixture).includes(500),
    '输入后代 ID 后进的是该角色的个别信息页——[500] 前一人只在那一页渲染',
  );
  for (const fixed of [1200, 1300, 1400, 1500, 1600, 1700, 997, 998, 999]) {
    assert.ok(
      accelerators(fixture).includes(fixed),
      `固定按钮 [${fixed}] 仍须渲染`,
    );
  }
});

test('批量处刑页：后代能被选中切标签，[121]/[100]/[1999] 照常可用（#560）', async () => {
  // 模板 11：旧常量（1000）下这个后代的 ID 是 2000，正撞批量处刑的
  // [2000] 上一页——改回旧常量时「选中切标签」会落到翻页分支、本用例必红
  const { fixture, child } = await seed_world_with_child(11);
  assert.equal(child, declared_first_child_id() + 10 * 100, '模板 11 的区间');
  const { batch_execution } = fixture.load_module(
    'event/event-execution-batch',
  );
  // 后代行 → 切处刑标签 → [121] 方法界面 → [100] 停止 → [1999] 結束处刑
  fixture.set_inputs(child, 121, 100, 1999);

  await batch_execution(() => 0);

  assert.equal(
    fixture.store.get(`cflag:${child}:777`),
    1,
    '后代行被选中后切到处刑标签（角色行与固定按钮不撞号）',
  );
  for (const fixed of [1999, 2000, 2001]) {
    assert.ok(
      accelerators(fixture).includes(fixed),
      `固定按钮 [${fixed}] 仍须渲染`,
    );
  }
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('请选出处刑对象(可复选)')),
    '批量处刑列表照常渲染',
  );
});
