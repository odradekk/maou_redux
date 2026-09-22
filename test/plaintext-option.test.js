/**
 * 纯文本选项行的棘轮（issue #530）。
 *
 * 引擎的 input 只接受**本轮打印过的按钮快捷键**（渲染层 returnFromButton
 * 的 `rule.length > 0 && rule.indexOf(Number(val)) === -1` 即拒收、不回调
 * 游戏）。原作 Emuera 的 INPUT 收任意数值，所以 `PRINTL [1] …` + INPUT 在
 * 那边能用；EraElectron 不行——`era.print('…[N] …')` 这种纯文本选项行会变成
 * 死路。#129（主菜单 [109]）、PR #53（[100] 调教按钮）、#530（战役招募的
 * 「您还满意吗？」）是同一个病灶的三次发作。
 *
 * 为什么夹具拦不住：夹具的 input 校验判据是
 * `input_rules.length > 0 && !input_rules.includes(值)`——**本轮没打印过按钮
 * 时集合为空，引擎放行自由输入，纯文本选项行因此照常能喂进去**（#530 那一
 * 步恰好落在空集合上，离线复现不出来；名单轮次那种白名单非空的场景才拦得住，
 * 见 test/chara-info-show.test.js 的 #530 用例）。这条棘轮是离线唯一能守住的
 * 形态：按文件计数冻结现状，只许收紧不许放松。
 *
 * 扫描规则与逐处判定见 tools/plaintext-options.mjs 与
 * docs/research/plaintext-options.md。**计数不符时不要直接改基线**：先按报告
 * 判断新增的那一行是选项还是排版文字，是选项就改成 printButton。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  count_by_file,
  scan_repo,
  scan_text,
  strip_interpolation,
} = require('../tools/plaintext-options.mjs');
const BASELINE = require('../tools/plaintext-option-baseline.mjs').default;

test('扫描器自证：命中与跳过的形态各钉一条（判定面收窄的地方也要站住）', () => {
  const source = [
    "era.print('[1] 选项甲');", // 命中：纯文本选项行
    "era.print(' [0] - 好的');", // 命中：左空格是原作的排版
    'era.println(`[2] 选项${label}`);', // 命中：模板串照算
    'era.print(',
    '  `[3] - ${clothtype(target)}\\n  ${more}`,',
    ');', // 命中：跨行实参（原样保留 \\n 转义）
    "era.printButton('选项乙', 4);", // 跳过：按钮，不是纯文本
    "era.printMultiColumns([{ type: 'button', content: '[5] 选项丙' }]);", // 跳过：按钮格
    'era.print(`下标不算：${items[0]}`);', // 跳过：插值里的下标
    "// era.print('[6] 注释掉的不算');", // 跳过：整行注释
    "era.print('不带编号的说明文字');", // 跳过：没有 [N]
  ].join('\n');

  assert.deepEqual(
    scan_text(source).map((hit) => [hit.line, hit.literal]),
    [
      [1, '[1] 选项甲'],
      [2, ' [0] - 好的'],
      [3, '[2] 选项${label}'],
      [4, '[3] - ${clothtype(target)}\\n  ${more}'],
    ],
    '命中面 = print/println/printAndWait 的首实参字面量里含 [数字]',
  );
  assert.equal(
    strip_interpolation('${items[0]} 不带编号'),
    ' 不带编号',
    '插值先剥掉（否则下标会被当成选项编号）',
  );
});

test('纯文本选项行的按文件计数与棘轮基线一致（新增即红，修掉也要同步删数）', () => {
  const counts = count_by_file(scan_repo());
  const files = [
    ...new Set([...Object.keys(counts), ...Object.keys(BASELINE)]),
  ].sort();

  const grown = files.filter(
    (file) => (counts[file] ?? 0) > (BASELINE[file] ?? 0),
  );
  const shrunk = files.filter(
    (file) => (counts[file] ?? 0) < (BASELINE[file] ?? 0),
  );

  assert.deepEqual(
    grown,
    [],
    `新增了纯文本选项行（引擎会把编号拒收，#530）：${grown
      .map((file) => `${file} ${BASELINE[file] ?? 0} → ${counts[file]}`)
      .join('、')}。改成 era.printButton 或 era.printMultiColumns 的按钮格；` +
      '确属排版文字的话在 tools/plaintext-options.mjs 的判定面里说明并重生基线',
  );
  assert.deepEqual(
    shrunk,
    [],
    `基线里这些文件的条数变少了（修掉了就同步删数，棘轮不许留过期条目）：${shrunk
      .map((file) => `${file} ${BASELINE[file]} → ${counts[file] ?? 0}`)
      .join('、')}。执行 node tools/plaintext-options.mjs --write`,
  );
  assert.equal(
    files.reduce((sum, file) => sum + (counts[file] ?? 0), 0),
    Object.values(BASELINE).reduce((sum, count) => sum + count, 0),
    '总条数',
  );
});
