/**
 * @file 引擎排版能力（issue #870）：横幅、页脚与设置页顶栏改用引擎的
 * 排版能力。
 *
 * 三条验收钉在三类证据上：
 *
 * 1. **横幅不再用字符拼接**——静态扫描 `ere/` 的字符串字面量：源码里不再
 *    出现连续 8 个以上的 `*` 或 `-`（含夹着全角空格与文字的「框」）。
 *    横幅一律走 `era.drawLine()`，带文字的走 `era.drawLine({content})`
 *    或居中输出。
 * 2. **页脚按钮在同一行**——`print_button_grid` 折成的多列行：三枚导航键
 *    共享同一个 Row（夹具的 `row` 字段）。
 * 3. **设置页与侵略页顶栏对齐**——网格格宽是显式的：设置项两格各 12 列，
 *    状态列因此从同一列起算，不再靠全角空格补位（引擎渲染按钮时把连续
 *    空白折叠成一个空格，补位在实机上不起作用）。
 *
 * 线型断言看夹具的 `border`（solid/dashed）：引擎 `drawLine` 的 `content`
 * 是分隔线中央的标签文字、不是线型字符，星号框以实线近似、减号线以虚线
 * 近似（test/helpers/era-fixture.js 的 drawLine 记录）。
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { create_era_fixture } = require('./helpers/era-fixture');

const ROOT = path.join(__dirname, '..');

/** `dir` 下全部 .js 的绝对路径（递归） */
function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(target, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(target);
    }
  }
  return out;
}

/** 装饰横幅字面量：引号串里连续 8 个以上的 `*` 或 `-` */
const BANNER_LITERAL = /(['"])([^'"\n]*[-*]{8,}[^'"\n]*)\1/;

test('横幅：ere/ 的字符串字面量里不再有星号/减号拼的装饰行', () => {
  const offenders = [];
  for (const file of walk_js(path.join(ROOT, 'ere'))) {
    const source = fs.readFileSync(file, 'utf8');
    const hit = source.match(BANNER_LITERAL);
    if (hit) {
      const line = source.slice(0, hit.index).split('\n').length;
      offenders.push(
        `${path.relative(ROOT, file)}:${line} ${JSON.stringify(hit[2])}`,
      );
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `横幅一律走 era.drawLine（带文字用 content），不要用字符拼接：\n${offenders.join('\n')}`,
  );
});

test('kyoten_event 的横幅：实线 + 居中文本 + 实线', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 2000); // FLAG:81 人间界侵攻度首档下沿
  fixture.store.set('flag:93', 0); // FLAG:93 事件状态字
  const { kyoten_event } = fixture.load_module(
    'system/invasion/invasion-kyoten',
  );

  assert.equal(await kyoten_event(1), 0);
  assert.deepEqual(
    fixture.lines.map((line) => [
      line.type,
      line.border ?? '',
      line.text ?? '',
    ]),
    [
      ['divider', 'solid', ''],
      ['text', '', '占领了村庄'],
      ['divider', 'solid', ''],
    ],
    '七行星号框改成分隔线 + 一行居中文本',
  );
  assert.equal(fixture.store.get('flag:93'), 1, '状态字照常推进');
});

test('config_menu：设置项两格各 12 列，页脚三键同行', async () => {
  const fixture = create_era_fixture();
  const { config_menu } = fixture.load_module('page/page-config');
  fixture.set_inputs(100);
  assert.equal(await config_menu(), 0);

  const options = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator <= 13,
  );
  assert.equal(options.length, 14, 'page 0 的十四条设置项');
  for (const button of options) {
    const cells = fixture.lines.filter((line) => line.row === button.row);
    assert.deepEqual(
      cells.map((cell) => [cell.type, cell.grid_width]),
      [
        ['button', 12],
        ['text', 12],
      ],
      `[${button.accelerator}] 应是「按钮格 12 列 + 状态格 12 列」`,
    );
    assert.ok(
      cells[1].text.startsWith('现在：'),
      `[${button.accelerator}] 状态格从同一列起算：${cells[1].text}`,
    );
  }

  const footer = fixture.lines.filter(
    (line) =>
      line.type === 'button' && [102, 100, 101].includes(line.accelerator),
  );
  assert.equal(footer.length, 3, '页脚三键');
  assert.equal(
    new Set(footer.map((line) => line.row)).size,
    1,
    '三枚页脚键共享同一个 Row（引擎 24 列网格）',
  );
});
